'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600">
              AgroTech
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#team" className="text-gray-700 hover:text-green-600">Jamoa</Link>
            <Link href="#blog" className="text-gray-700 hover:text-green-600">Yangiliklar</Link>
            <Link href="#about" className="text-gray-700 hover:text-green-600">Biz haqimizda</Link>
            <Link href="#contact" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-green-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#team" className="block px-3 py-2 text-gray-700 hover:text-green-600">Jamoa</Link>
            <Link href="#blog" className="block px-3 py-2 text-gray-700 hover:text-green-600">Yangiliklar</Link>
            <Link href="#about" className="block px-3 py-2 text-gray-700 hover:text-green-600">Biz haqimizda</Link>
            <Link href="#contact" className="block px-3 py-2 text-green-600 font-bold">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
