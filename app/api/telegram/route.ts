import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// In-memory storage for demo purposes (Note: This resets on server restart/redeploy)
// For production, use a database like Redis (Vercel KV) or PostgreSQL.
let messageStore: Record<string, string[]> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Handle Button Clicks (Callback Query)
    if (body.callback_query) {
      const { data, message: telegramMsg, from } = body.callback_query;
      const chatId = telegramMsg.chat.id;
      const messageId = telegramMsg.message_id;

      if (data.startsWith('accept_')) {
        const sessionId = data.split('_')[1];
        
        // Notify User
        if (!messageStore[sessionId]) messageStore[sessionId] = [];
        messageStore[sessionId].push("👨‍💻 Operator suhbatga qo'shildi.");

        // Update Telegram Message (Remove Accept button, show who accepted)
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

        // Send "End Chat" control to Admin
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Suhbat boshlandi (ID: ${sessionId}).\nJavob berish uchun xabarga Reply qiling.\nTugatish uchun pastdagi tugmani bosing:`,
            reply_markup: {
              inline_keyboard: [
                [{ text: "❌ Suhbatni tugatish", callback_data: `end_${sessionId}` }]
              ]
            }
          })
        });
      } 
      else if (data.startsWith('end_')) {
        const sessionId = data.split('_')[1];

        // Notify User
        if (!messageStore[sessionId]) messageStore[sessionId] = [];
        messageStore[sessionId].push("🛑 Suhbat operator tomonidan yakunlandi.");

        // Update Admin Message
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

      // Answer Callback Query (stop loading animation on button)
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: body.callback_query.id })
      });

      return NextResponse.json({ success: true });
    }

    // 2. Handle Replies (Admin -> User)
    if (body.message && body.message.reply_to_message) {
      const replyText = body.message.text;
      const originalText = body.message.reply_to_message.text;
      
      // Extract Session ID from the original message text
      // Format: "🚀 Yangi Xabar (ID: xyz)..." or "Suhbat boshlandi (ID: xyz)..."
      const match = originalText.match(/ID: ([a-zA-Z0-9]+)/);
      
      if (match && match[1]) {
        const sessionId = match[1];
        if (!messageStore[sessionId]) {
          messageStore[sessionId] = [];
        }
        messageStore[sessionId].push(replyText);
      }
      return NextResponse.json({ success: true });
    }

    // 3. Handle Client Messages (From Website)
    const { message, contact, sessionId } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const text = `
🚀 *Yangi Xabar* (ID: ${sessionId})
👤 *Aloqa:* ${contact || 'Kiritilmadi'}
📝 *Xabar:* ${message}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Qabul qilish", callback_data: `accept_${sessionId}` }]
          ]
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
      throw new Error('Telegram API error');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ messages: [] });
  }

  const messages = messageStore[sessionId] || [];
  // Clear messages after reading (Queue behavior)
  messageStore[sessionId] = [];

  return NextResponse.json({ messages });
}
