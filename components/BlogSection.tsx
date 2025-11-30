const achievements = [
  {
    id: 1,
    title: "Hududiy monitoring tarmog'i ishga tushirildi",
    desc: "5 ta hududda real vaqt monitoring stansiyalari o'rnatildi va ma'lumot yig'ila boshladi.",
    date: "May 2025"
  },
  {
    id: 2,
    title: "AI model yordamida xavfni aniqlash",
    desc: "AI va regressiya asosida havo ifloslanishi darajasini oldindan prognozlash modeli ishlab chiqildi.",
    date: "Avg 2025"
  },
  {
    id: 3,
    title: "Hamkorlik va ogohlantirish tizimi",
    desc: "Telegram + SMS integratsiyasi orqali aholini avtomatik ogohlantirish tizimi ishga tushirildi.",
    date: "Okt 2025"
  }
];

export default function BlogSection() {
  return (
    <section id="achievements" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Erishgan yutuqlarimiz</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((a) => (
            <div key={a.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{a.title}</h3>
                <span className="text-sm text-green-600 font-semibold">{a.date}</span>
              </div>
              <p className="text-gray-600">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
