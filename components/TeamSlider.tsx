'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const teamMembers = [
  { id: 1, name: 'Aziz Rahimov', role: 'CEO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aziz' },
  { id: 2, name: 'Malika Karimova', role: 'CTO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Malika' },
  { id: 3, name: 'Jamshid Aliyev', role: 'Developer', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamshid' },
];

export default function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  // Show 3 items on desktop, 1 on mobile. 
  // For simplicity in this custom slider, I'll just show one main one or a window.
  // Let's do a simple responsive grid for "Team" usually looks better, but user asked for slider.
  // I will implement a simple card carousel.

  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Bizning Jamoa</h2>
        
        <div className="relative flex items-center justify-center">
          <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="w-full max-w-4xl overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamMembers.map((member) => (
                <div key={member.id} className="w-full shrink-0 px-4 md:w-1/3">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center h-full">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-32 h-32 mx-auto rounded-full mb-4 bg-gray-100"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-green-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Mobile hint: Swipe or click arrows */}
        <p className="text-center text-gray-400 mt-4 text-sm md:hidden">Jamoani ko'rish uchun tugmalarni bosing</p>
      </div>
    </section>
  );
}
