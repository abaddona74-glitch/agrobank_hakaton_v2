import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">AgroTech</h3>
            <p className="text-gray-400 mb-4">
              Bizning maqsadimiz — Toshkent va butun O'zbekiston bo'ylab havo sifatini yaxshilash va ekologik barqarorlikni ta'minlashdir.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Tezkor havolalar</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-green-500">Yechimlar</a></li>
              <li><a href="#team" className="hover:text-green-500">Jamoa</a></li>
              <li><a href="#blog" className="hover:text-green-500">Blog</a></li>
              <li><a href="#about" className="hover:text-green-500">Loyiha haqida</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Bog'lanish</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-green-500" />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-green-500" />
                <span>eco@agrotech.uz</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-green-500" />
                <span>Toshkent sh., Ekologiya ko'chasi, 7-uy</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AgroTech. Toza havo uchun birgamiz.
        </div>
      </div>
    </footer>
  );
}
