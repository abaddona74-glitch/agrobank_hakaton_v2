'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Phone, Send, Github, Mail, Check } from 'lucide-react';

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
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});
  const [modalId, setModalId] = useState<number | null>(null);

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

  const toggleExpand = (id: number) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (id: number) => {
    setModalId(id);
  };

  const closeModal = () => setModalId(null);

  // Close modal or collapse panels with Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalId(null);
        setExpandedMap({});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
                  <div onClick={() => openModal(member.id)} className="relative bg-white rounded-xl shadow-lg p-6 text-center h-full flex flex-col items-center cursor-pointer overflow-visible md:min-h-[360px]">
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

                    {/* Expand / Collapse arrow */}
                    <div className="mt-4 w-full">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleExpand(member.id); }}
                        className="mx-auto flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-50 px-3 py-2 rounded-full shadow-sm"
                        aria-expanded={!!expandedMap[member.id]}
                        aria-controls={`member-details-${member.id}`}
                      >
                        {expandedMap[member.id] ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            <span>Yopish</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            <span>Batafsil</span>
                          </>
                        )}
                      </button>

                      {/* Collapsible details (absolute so it doesn't affect sibling cards) */}
                      <div id={`member-details-${member.id}`} className={`absolute left-4 right-4 bottom-4 bg-white border border-gray-100 rounded-lg p-4 shadow-lg text-left text-sm text-gray-600 transition-all transform origin-bottom ${expandedMap[member.id] ? 'translate-y-0 opacity-100 pointer-events-auto z-20' : 'translate-y-3 opacity-0 pointer-events-none z-0'}`}>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleExpand(member.id); }}
                          aria-label="Close details"
                          className="absolute -top-3 -right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm"
                        >
                          <X className="w-4 h-4 text-gray-700" />
                        </button>
                        <p className="mb-2"><span className="font-semibold">Telefon:</span> {member.phone}</p>
                        <p className="mb-2"><span className="font-semibold">Email:</span> {member.email || '—'}</p>
                        <div className="mb-2">
                          <span className="font-semibold">GitHub:</span>
                          <ul className="mt-1 space-y-1">
                            {member.github && member.github.map((g, i) => (
                              <li key={i}><a href={g} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">{g}</a></li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-gray-500">Qo'shimcha: tajriba, loyihalar va kommunikatsiya ma'lumotlari shu yerda ko'rsatilishi mumkin.</p>
                      </div>
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
        {/* Modal for large detail view */}
        {modalId !== null && (
          (() => {
            const m = teamMembers.find(t => t.id === modalId);
            if (!m) return null;
            return (
                  <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 p-6 relative">
                  <button onClick={closeModal} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <X className="w-5 h-5 text-gray-700" />
                  </button>

                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src={m.image} alt={m.name} className="w-40 h-40 rounded-full object-cover border-4 border-green-100" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{m.name}</h3>
                      <p className="text-green-600 font-semibold mb-4">{m.role}</p>
                      <p className="text-gray-700 mb-4">Telefon: {m.phone}</p>
                      <p className="text-gray-700 mb-4">Email: {m.email}</p>
                      <div className="flex flex-wrap gap-3">
                        {m.telegram && <a href={m.telegram} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-600 p-2 rounded-full"><Send size={16} /></a>}
                        {m.phone && <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="bg-green-50 text-green-600 p-2 rounded-full"><Phone size={16} /></a>}
                        {m.email && <button onClick={() => handleCopyEmail(m.id, m.email)} className="bg-red-50 text-red-600 p-2 rounded-full">{copiedId === m.id ? <Check size={16} /> : <Mail size={16} />}</button>}
                        {m.github && m.github.map((g, i) => (
                          <a key={i} href={g} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full text-gray-800"><Github size={16} /></a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}
        
        {/* Mobile hint: Swipe or click arrows */}
        <p className="text-center text-gray-400 mt-4 text-sm md:hidden">Jamoani ko'rish uchun tugmalarni bosing</p>
      </div>
    </section>
  );
}
