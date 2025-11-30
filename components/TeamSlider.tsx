'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Phone, Send, Github, Mail, Check } from 'lucide-react';

const teamMembers = [
  { 
    id: 1, 
    name: 'Muzaffarov Maxmudbek', 
    role: 'Fullstack Web dev + AI (5 yil tajriba)', 
    image: '/images/maxmudbek.jpg',
    telegram: 'https://t.me/TheDarkLord_555',
    phone: '+998 88 022 13 08',
    email: 'muzaffarovmahmudbek@gmail.com',
    github: ['https://github.com/abaddona74-glitch', 'https://github.com/TheDarkLord777']
  },
  {
    id: 2,
    name: 'Ayubkhon Kariyev',
    role: 'Project Manager + OS + Kotlin (3 yil tajriba)',
    image: '/images/ayubxon.jpg',
    telegram: 'https://t.me/AyubxonK',
    email: 'ayubkhankariyev@gmail.com',
    phone: '+998935241616',
     github: ['https://github.com/ayubkhankariev']
  },
  { id: 3, name: 'G`olib To`rayev',
    role: 'Backend developer (3 yil tajriba)',
    image: '/images/golib.jpg',
    telegram: 'https://t.me/golibbek1',
    email: 'turaev.golibjon2004@gmail.com',
    phone: '+998901137199', 
    github: ['https://github.com/GolibjonTuraev']
},
 
];

export default function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleCopyEmail = (id: number, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Bizning Jamoa</h2>
        
        <div className="relative flex items-center justify-center">
          <button 
            onClick={prevSlide} 
            className={`absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 ${teamMembers.length <= 3 ? 'md:hidden' : ''}`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="w-full max-w-4xl overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamMembers.map((member) => (
                <div key={member.id} className="w-full shrink-0 px-4 md:w-1/3">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center h-full flex flex-col items-center">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-4 border-green-100"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-green-600 mb-4 text-sm font-medium">{member.role}</p>
                    
                    <div className="flex flex-wrap justify-center gap-3 mt-auto">
                      {/* Telegram */}
                      {member.telegram && (
                        <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 bg-blue-50 p-2 rounded-full transition">
                          <Send size={18} />
                        </a>
                      )}
                      
                      {/* Phone */}
                      {member.phone && (
                        <a href={`tel:${member.phone?.replace(/\s/g, '')}`} className="text-green-600 hover:text-green-700 bg-green-50 p-2 rounded-full transition">
                          <Phone size={18} />
                        </a>
                      )}

                      {/* Email */}
                      {member.email && (
                        <>
                          {/* Mobile: Mailto */}
                          <a 
                            href={`mailto:${member.email}`} 
                            className="md:hidden text-red-600 hover:text-red-700 bg-red-50 p-2 rounded-full transition"
                          >
                            <Mail size={18} />
                          </a>

                          {/* Desktop: Copy to clipboard */}
                          <button 
                            onClick={() => handleCopyEmail(member.id, member.email)}
                            className="hidden md:block relative text-red-600 hover:text-red-700 bg-red-50 p-2 rounded-full transition group"
                            title="Email nusxalash"
                          >
                            {copiedId === member.id ? <Check size={18} /> : <Mail size={18} />}
                            
                            {/* Tooltip */}
                            {copiedId === member.id && (
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap z-20">
                                Copied!
                              </span>
                            )}
                          </button>
                        </>
                      )}

                      {/* GitHub Links */}
                      {member.github && member.github.map((link, idx) => (
                        <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black bg-gray-100 p-2 rounded-full transition">
                          <Github size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide} 
            className={`absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 ${teamMembers.length <= 3 ? 'md:hidden' : ''}`}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Mobile hint: Swipe or click arrows */}
        <p className="text-center text-gray-400 mt-4 text-sm md:hidden">Jamoani ko'rish uchun tugmalarni bosing</p>
      </div>
    </section>
  );
}
