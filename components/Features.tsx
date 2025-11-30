import { ScanSearch, CloudFog, HeartPulse, TrendingUp, Map, TreePine } from 'lucide-react';

const features = [
  {
    icon: <ScanSearch className="w-12 h-12 text-green-600" />,
    title: "Manbani Aniqlash",
    description: "Gaz va zararli moddalar qayerdan kelayotganini aniq lokatsiya bilan topamiz va xaritada ko'rsatamiz."
  },
  {
    icon: <CloudFog className="w-12 h-12 text-green-600" />,
    title: "Changlanish Monitoringi",
    description: "Sensorlar yordamida qaysi hududda changlanish va PM2.5 darajasi yuqori ekanligini aniqlaymiz."
  },
  {
    icon: <HeartPulse className="w-12 h-12 text-green-600" />,
    title: "Salomatlikka Ta'siri",
    description: "Ifloslanishning inson salomatligiga zararini tahlil qilib, himoyalanish bo'yicha tavsiyalar beramiz."
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-green-600" />,
    title: "Bashorat Qilish (AI)",
    description: "Sun'iy intellekt yordamida havo sifatining o'sishi yoki kamayishini oldindan bashorat qilamiz."
  },
  {
    icon: <Map className="w-12 h-12 text-green-600" />,
    title: "Ekin Zonalari",
    description: "Havo sifati va tuproq tarkibiga qarab qishloq xo'jaligi uchun xavfsiz ekin zonalarini ajratamiz."
  },
  {
    icon: <TreePine className="w-12 h-12 text-green-600" />,
    title: "Yashil Yechimlar",
    description: "Hudud ekologiyasini yaxshilash uchun daraxt ekish va yashil zonalar tashkil etish rejasini tuzamiz."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bizning Yechimlar</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Toshkent va hududlardagi ekologik muammolarni aniqlash va bartaraf etish uchun innovatsion texnologiyalar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100 group hover:border-green-200">
              <div className="flex justify-center mb-6 bg-white w-20 h-20 mx-auto rounded-full items-center shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
