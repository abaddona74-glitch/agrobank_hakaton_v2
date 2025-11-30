export default function Footer() {
  return (
    <div className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src="/icon.avif" alt="AgroTech logo" className="w-8 h-8 object-contain" />
          <h3 className="text-2xl font-bold text-green-600">AgroTech</h3>
        </div>
        <p className="text-gray-600 font-bold max-w-2xl mx-auto">
          Bizning maqsadimiz — Toshkent va butun O'zbekiston bo'ylab havo sifatini yaxshilash va ekologik barqarorlikni ta'minlashdir.
        </p>
      </div>
    </div>
  );
}
