import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Initialize Redis
const redis = process.env.KV_REDIS_URL ? new Redis(process.env.KV_REDIS_URL) : null;

// Fallback
let localMessageStore: Record<string, string[]> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ---------------------------------------------------------
    // 1. HANDLE TELEGRAM UPDATES (Callback & Replies)
    // ---------------------------------------------------------
    
    // A) Handle Button Clicks (Accept / End)
    if (body.callback_query) {
      const { data, message: telegramMsg, from } = body.callback_query;
      const chatId = telegramMsg.chat.id;
      const messageId = telegramMsg.message_id;

      if (data.startsWith('accept_')) {
        const sessionId = data.split('_')[1];
        
        // 1. Close previous active session if exists
        if (redis) {
          const prevSession = await redis.get('admin:active_session');
          if (prevSession && prevSession !== sessionId) {
            // Notify previous user
            await redis.rpush(`session:${prevSession}`, "⚠️ Operator boshqa suhbatga o'tdi. Aloqa tugatildi.");
            await redis.expire(`session:${prevSession}`, 3600);
            await redis.del(`session:${prevSession}:status`);
          }
          
          // 2. Set new session as active
          await redis.set('admin:active_session', sessionId);
          await redis.set(`session:${sessionId}:status`, 'active');
          await redis.expire(`session:${sessionId}:status`, 3600);
          
          // 3. Notify new user
          await redis.rpush(`session:${sessionId}`, "👨‍💻 Operator suhbatga qo'shildi.");
          await redis.expire(`session:${sessionId}`, 3600);
        }

        // 4. Update Telegram Interface
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `${telegramMsg.text}\n\n✅ Qabul qildi: ${from.first_name}`,
            parse_mode: 'Markdown'
          })
        });

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Suhbat boshlandi (ID: ${sessionId}).\nJavob yozish uchun shu xabarga Reply qiling.`,
            reply_markup: {
              inline_keyboard: [[{ text: "❌ Suhbatni tugatish", callback_data: `end_${sessionId}` }]]
            }
          })
        });
      } 
      else if (data.startsWith('end_')) {
        const sessionId = data.split('_')[1];
        
        if (redis) {
          await redis.rpush(`session:${sessionId}`, "🛑 Suhbat operator tomonidan yakunlandi.");
          await redis.del(`session:${sessionId}:status`);
          await redis.del('admin:active_session');
        }

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `🏁 Suhbat yakunlandi (ID: ${sessionId})`
          })
        });
      }

      // Stop loading animation
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: body.callback_query.id })
      });

      return NextResponse.json({ success: true });
    }

    // B) Handle Admin Replies
    if (body.message && body.message.reply_to_message) {
      const replyText = body.message.text;
      const originalText = body.message.reply_to_message.text;
      const match = originalText.match(/ID: ([a-zA-Z0-9]+)/);
      
      if (match && match[1]) {
        const sessionId = match[1];
        if (redis) {
          await redis.rpush(`session:${sessionId}`, replyText);
          await redis.expire(`session:${sessionId}`, 3600);
        }
      }
      return NextResponse.json({ success: true });
    }

    // C) Ignore other Telegram updates (Prevent Loop)
    if (body.update_id || (body.message && typeof body.message === 'object')) {
      return NextResponse.json({ success: true });
    }

    // ---------------------------------------------------------
    // 2. HANDLE CLIENT MESSAGES (From Website)
    // ---------------------------------------------------------
    const { message, contact, sessionId } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if session is already active (to decide whether to show "Accept" button)
    let isActive = false;
    if (redis) {
      const status = await redis.get(`session:${sessionId}:status`);
      isActive = status === 'active';
    }

    const text = `
🚀 *Yangi Xabar* (ID: ${sessionId})
👤 *Aloqa:* ${contact || 'Kiritilmadi'}
📝 *Xabar:* ${message}
    `;

    // Only add button if NOT active
    const payload: any = {
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'Markdown',
    };

    if (!isActive) {
      payload.reply_markup = {
        inline_keyboard: [[{ text: "✅ Qabul qilish", callback_data: `accept_${sessionId}` }]]
      };
    }

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) return NextResponse.json({ messages: [] });

  let messages: string[] = [];
  if (redis) {
    messages = await redis.lrange(`session:${sessionId}`, 0, -1);
    if (messages.length > 0) await redis.del(`session:${sessionId}`);
  } else {
    messages = localMessageStore[sessionId] || [];
    localMessageStore[sessionId] = [];
  }

  return NextResponse.json({ messages });
}
