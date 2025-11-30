'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Xabar yuborildi: ${message}`);
    setMessage('');
    setIsOpen(false);
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
            
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4 max-w-[85%] border border-gray-100">
                <p className="text-gray-800">Assalomu alaykum! <br/> Savollaringiz bo'lsa yozib qoldiring, operatorlarimiz tez orada javob berishadi.</p>
                <span className="text-xs text-gray-400 mt-2 block">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Xabaringizni yozing..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition"
                  required
                />
                <button type="submit" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition shadow-md flex-shrink-0">
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
