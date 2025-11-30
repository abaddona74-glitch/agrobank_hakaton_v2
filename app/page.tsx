import Navbar from '@/components/Navbar';
import TeamSlider from '@/components/TeamSlider';
import BlogSection from '@/components/BlogSection';
import ChatWidget from '@/components/ChatWidget';
import Features from '@/components/Features';
import SystemOverview from '@/components/SystemOverview';
import { ArrowRight, Wind } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-green-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 opacity-10 pointer-events-none">
          <Wind size={400} className="text-green-600" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Wind size={16} />
            <span>Toshkent havosi uchun maxsus yechim</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Toza Havo — <br />
            <span className="text-green-600">Sog'lom Kelajak</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Biz hududingizdagi havo ifloslanish darajasini aniqlab, unga qarshi samarali choralar ko'rishda yordam beramiz.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#features" className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Yechimlarimiz <ArrowRight size={20} />
            </a>
            <a href="#contact" className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition">
              Monitoringni Boshlash
            </a>
          </div>
        </div>
      </section>

      <Features />
      
      <SystemOverview />

      <TeamSlider />
      
      <BlogSection />
      
      <ChatWidget />

      <Footer />
    </main>
  );
}
