const blogs = [
  {
    id: 1,
    title: "Toshkentda havo ifloslanishi: PM2.5 nima?",
    excerpt: "PM2.5 zarrachalari inson salomatligi va qishloq xo'jaligi mahsulotlariga qanday ta'sir qiladi?",
    date: "30 Nov 2025",
    image: "https://images.unsplash.com/photo-1611273426728-c009c9eb8475?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Aqlli Sensorlar va Monitoring",
    excerpt: "Bizning IoT sensorlarimiz yordamida hududingizdagi havo sifatini 24/7 nazorat qiling.",
    date: "29 Nov 2025",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Chang bo'ronlaridan himoyalanish",
    excerpt: "Ekinlarni va issiqxonalarni chang bo'ronlaridan asrashning zamonaviy usullari.",
    date: "28 Nov 2025",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=500&auto=format&fit=crop&q=60"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Ekologiya va Texnologiya</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-green-600 font-semibold">{blog.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <button className="text-green-600 font-semibold hover:text-green-700">Batafsil o'qish &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
