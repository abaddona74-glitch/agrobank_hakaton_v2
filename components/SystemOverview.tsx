import { Activity, Wind, AlertTriangle, ShieldAlert, Cpu, Database, BellRing, ThermometerSun } from 'lucide-react';

export default function SystemOverview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Tizim nima qiladi? */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tizim Qanday Ishlaydi?</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-green-600 max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 font-medium">
              ❗️ Tizim havoni real vaqt rejimida kuzatadi, zararli moddalar o‘sish dinamikasini aniqlaydi, 
              xavf darajasiga qarab avtomatik tavsiyalar va ogohlantirishlar beradi.
            </p>
          </div>
        </div>

        {/* 2. Asosiy Komponentlar */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Asosiy Komponentlar</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Wind className="text-blue-500" />, label: "PM2.5 va PM10 Chang" },
              { icon: <CloudFog className="text-gray-500" />, label: "CO (Uglerod oksidi)" },
              { icon: <Factory className="text-orange-500" />, label: "NO₂ va SO₂ (Zavod)" },
              { icon: <ThermometerSun className="text-yellow-500" />, label: "Ozon va Harorat" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <span className="font-semibold text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Xavf Darajalari */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Xavf Darajalari va Choralar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blue */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">1-bosqich</div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">Past Xavf (10%+)</h4>
              <ul className="space-y-2 text-blue-900 text-sm">
                <li className="flex items-start gap-2">🔹 Arzon uy purifikatori yoqilsin</li>
                <li className="flex items-start gap-2">🔹 Havo almashinuvi oshirilsin</li>
                <li className="flex items-start gap-2">🔹 Mashinalar oqimini kamaytirish</li>
              </ul>
            </div>

            {/* Yellow */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">2-bosqich</div>
              <h4 className="text-xl font-bold text-yellow-800 mb-2">O‘rta Xavf (20-40%)</h4>
              <ul className="space-y-2 text-yellow-900 text-sm">
                <li className="flex items-start gap-2">🔸 Kuchliroq ventilyatorlar</li>
                <li className="flex items-start gap-2">🔸 Havo filtrlari o'rnatish</li>
                <li className="flex items-start gap-2">🔸 Ko‘chada niqob taqish tavsiyasi</li>
              </ul>
            </div>

            {/* Red */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">3-bosqich</div>
              <h4 className="text-xl font-bold text-red-800 mb-2">Yuqori Xavf (50%+)</h4>
              <ul className="space-y-2 text-red-900 text-sm">
                <li className="flex items-start gap-2">🚨 Qurilishlarni vaqtincha to'xtatish</li>
                <li className="flex items-start gap-2">🚨 Zavodlar faoliyatini cheklash</li>
                <li className="flex items-start gap-2">🚨 Aholiga SMS/Telegram ogohlantirish</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Algoritm */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Algoritm Ishlash Jarayoni</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-green-500 z-0 transform -translate-y-1/2 rounded-full"></div>

            {/* Connecting Line (Mobile) */}
            <div className="md:hidden absolute top-0 left-1/2 w-1 h-full bg-green-500 z-0 transform -translate-x-1/2 rounded-full"></div>

            {[
              { icon: <Cpu />, title: "1. Sensorlar", desc: "Ma'lumot yig'ish" },
              { icon: <Database />, title: "2. Tahlil", desc: "AI & Regressiya" },
              { icon: <ShieldAlert />, title: "3. Xavf", desc: "Darajani aniqlash" },
              { icon: <BellRing />, title: "4. Xabar", desc: "SMS & Telegram" },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-full shadow-lg w-40 h-40 flex flex-col items-center justify-center text-center border-4 border-gray-50 z-10">
                <div className="text-green-600 mb-2">{step.icon}</div>
                <h5 className="font-bold text-gray-900">{step.title}</h5>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function CloudFog(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 17H7" />
      <path d="M17 21H9" />
    </svg>
  )
}

function Factory(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  )
}
