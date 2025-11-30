'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Check, CheckCheck } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  status?: 'sending' | 'sent' | 'read';
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Assalomu alaykum! Savollaringiz bo'lsa yozib qoldiring, operatorlarimiz tez orada javob berishadi.",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or retrieve session ID
    let storedSessionId = localStorage.getItem('chatSessionId');
    if (!storedSessionId) {
      storedSessionId = Math.random().toString(36).substring(7);
      localStorage.setItem('chatSessionId', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  // Polling for new messages
  useEffect(() => {
    if (!isOpen || !sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/telegram?sessionId=${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            const newMsgs = data.messages.map((text: string) => ({
              id: Date.now() + Math.random(),
              text,
              sender: 'bot',
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }));
            setMessages(prev => [...prev, ...newMsgs]);
          }
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [isOpen, sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage.text, contact, sessionId }),
      });

      if (response.ok) {
        // Update to sent (1 tick)
        setMessages(prev => prev.map(m => 
          m.id === newMessage.id ? { ...m, status: 'sent' } : m
        ));

        // Simulate read (2 ticks) after 1.5s
        setTimeout(() => {
          setMessages(prev => prev.map(m => 
            m.id === newMessage.id ? { ...m, status: 'read' } : m
          ));
        }, 1500);
      } else {
        // Handle error visually if needed
        console.error('Failed to send message');
      }
    } catch (error) {
       console.error('Network error', error);
    }
  };

  return (
    <>
      {/* Trigger Button - Fixed to Right Side */}
      <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : 'block'}`}>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 flex items-center gap-2"
        >
          <MessageCircle size={28} />
          <span className="font-semibold hidden md:inline">Chat</span>
        </button>
      </div>

      {/* Sidebar / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Sidebar Content */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="bg-green-600 p-4 flex justify-between items-center text-white shadow-md">
              <div className="flex items-center gap-2">
                <MessageCircle size={24} />
                <h3 className="font-bold text-lg">Biz bilan aloqa</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded transition">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl shadow-sm relative ${
                      msg.text.includes('Suhbat operator tomonidan yakunlandi')
                        ? 'bg-red-50 text-red-600 border border-red-100 w-full text-center'
                        : msg.sender === 'user' 
                          ? 'bg-green-100 text-gray-900 rounded-tr-none' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm mb-1">{msg.text}</p>
                    {!msg.text.includes('Suhbat operator tomonidan yakunlandi') && (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                        {msg.sender === 'user' && (
                          <span className="text-green-600">
                            {msg.status === 'sending' && <Loader2 size={12} className="animate-spin" />}
                            {msg.status === 'sent' && <Check size={14} />}
                            {msg.status === 'read' && <CheckCheck size={14} />}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex flex-col gap-3">
               <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Telefon raqamingiz (ixtiyoriy)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Xabaringizni yozing..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition shadow-md shrink-0"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
