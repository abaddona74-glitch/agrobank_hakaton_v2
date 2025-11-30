import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const { message, contact } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      // For debugging locally without env vars, we can log it
      console.error('Telegram credentials missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const text = `
🚀 *Yangi Xabar (AgroTech)*
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
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
      throw new Error('Telegram API error');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending telegram message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
