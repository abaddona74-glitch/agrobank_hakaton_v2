import { CloudRain, Plane, Zap, ShieldAlert, Droplets } from 'lucide-react';

export default function IdeasSection() {
  return (
    <section className="py-16 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Kelajakdagi G'oyalar
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Sun'iy Yomg'ir (Cloud Seeding)</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Atmosfera sharoitlarini boshqarish orqali qurg'oqchilikka qarshi kurashish va havo sifatini yaxshilash texnologiyasi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {/* Card 1: How it works */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg shrink-0">
                  <CloudRain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Bu qanday ishlaydi?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bulut ichidagi suv tomchilari yoki muz kristallarini ko‘paytirib, yomg‘ir yoki qor yog‘ishini faollashtirish jarayoni.
                    Maxsus moddalar (kumush yodid, tuz, quruq muz) bulutga purkaladi va kondensatsiya yadrolari hosil qiladi.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Methods */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg shrink-0">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Amalga oshirish usullari</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>Samolyot orqali:</strong> Bulut ichiga kirib moddalar purkash.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>Yer usti generatorlari:</strong> Tog'lardan moddalarni havoga chiqarish.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>Raketalar:</strong> Kimyoviy moddalarni bulutga yetkazish.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3: Safety */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-lg shrink-0">
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Xavfsizlik va Nazorat</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bu jarayon faqat davlat va meteorologiya markazlari ruxsati bilan, qat'iy nazorat ostida amalga oshiriladi. 
                    Kumush yodid (AgI) juda kichik, xavfsiz miqdorda ishlatiladi va atrof-muhitga zarar yetkazmaydi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why it's needed & Quote */}
          <div className="flex flex-col h-full space-y-6">
             <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 grow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Droplets className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nima uchun bu kerak?</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    "Qurg'oqchilikka qarshi kurashish",
                    "Havo sifatini yaxshilash (changni yuvish)",
                    "Qishloq xo'jaligini suv bilan ta'minlash",
                    "Suv omborlarini to'ldirish"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition">
                      <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                      <p className="text-gray-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-1 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-gray-500 italic leading-relaxed">
                      "Sun’iy yomg‘ir chaqirish — bu sehr emas, balki aniq hisob-kitob va atmosfera fizikasiga asoslangan murakkab jarayon. Bu texnologiya BAA, AQSh, Xitoy kabi davlatlarda muvaffaqiyatli qo'llanilmoqda."
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
