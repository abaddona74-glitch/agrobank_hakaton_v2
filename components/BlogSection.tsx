"use client";

import { useEffect, useRef, useState } from 'react';

// Achievements removed as requested

const roadmap = [
  {
    id: 'r1',
    title: "⭐️ Monitoring tizimi (rejalashtirilgan)",
    subtitle: "Hududiy havo sifati monitoring tizimini yo‘lga qo‘yish",
    desc: "Hududlarning bir nechta nuqtalarida real vaqt AQI ma’lumotlarini yig‘ish mexanizmini ishga tushirish rejalashtirilmoqda. Ushbu tizim AI modelini yanada aniqroq o‘qitish uchun asos bo‘ladi.",
    badge: "Rejalashtirilgan"
  },
  {
    id: 'r2',
    title: "⭐️ AI prognoz modeli (ish jarayonida)",
    subtitle: "AI yordamida 1 kunlik AQI prognoz modelini yaratish",
    desc: "Vaqt qatorlari va mashinaviy o‘rganish metodlari asosida havoning ifloslanish darajasini +1 kunga oldindan aytadigan model ustida ish olib borilmoqda. Dastlabki natijalar olinishi kutilyapti.",
    badge: "Ish jarayonida"
  },
  {
    id: 'r3',
    title: "⭐️ Tavsiya va ogohlantirish tizimi (yaqin reja)",
    subtitle: "Foydalanuvchilar uchun ogohlantirish va tavsiyalar tizimini ishlab chiqish",
    desc: "AQI keskin o‘zgarganda foydalanuvchini ogohlantiradigan va sog‘liq bo‘yicha tavsiyalar beradigan interfeysni yaratish rejalashtirilgan. Bu xizmat foydalanuvchilarga xavfsiz vaqtni tanlashda yordam beradi.",
    badge: "Yaqin reja"
  }
];

export default function BlogSection({ speed = 60 }: { speed?: number }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // speed in pixels per second (can be passed as prop)
  // default is provided via function prop `speed`

  // certificate list (original set). Keep this in component scope so other handlers can use it.
  const CERTS = [
    '/cert-maxmudbek.jpg',
    '/cert-golibjon.jpg',
    '/cert-ayubkhon.jpg',
    '/group-turin.jpg',
    '/group-nasa.jpg',
    '/voucher-hackathon.jpg',
  ];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Continuous scroll using requestAnimationFrame for smooth infinite loop
    let rafId: number | null = null;
    let last = performance.now();

    const step = (now: number) => {
      const dt = now - last;
      last = now;
      if (!isPausedRef.current) {
        // advance scrollLeft by speed * secondsElapsed
        el.scrollLeft += speed * (dt / 1000);

        // compute slide width and update active index
        const firstChild = el.firstElementChild as HTMLElement | null;
        if (firstChild) {
          const gap = parseFloat(getComputedStyle(el).gap || '24');
          const slideWidth = firstChild.offsetWidth + gap;
          const half = el.scrollWidth / 2;
          if (half > 0 && el.scrollLeft >= half) {
            el.scrollLeft -= half;
          }

          const rawIndex = Math.round(el.scrollLeft / slideWidth) % (CERTS.length || 1);
          const idx = ((rawIndex % CERTS.length) + CERTS.length) % CERTS.length;
          setActiveIndex(idx);
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  const pause = () => { isPausedRef.current = true; };
  const resume = () => { isPausedRef.current = false; };

  const next = () => {
    const el = trackRef.current; if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null; if (!firstChild) return;
    const gap = parseFloat(getComputedStyle(el).gap || '24');
    const slideWidth = firstChild.offsetWidth + gap;
    el.scrollBy({ left: slideWidth, behavior: 'smooth' });
  };

  const prev = () => {
    const el = trackRef.current; if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null; if (!firstChild) return;
    const gap = parseFloat(getComputedStyle(el).gap || '24');
    const slideWidth = firstChild.offsetWidth + gap;
    el.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  };

  // No pointer/drag handlers — carousel is auto-scrolling only (with Prev/Next)
  return (
    <section id="achievements" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Reja va Ish jarayoni</h2>

        {/* Roadmap cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {roadmap.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{r.title}</h3>
              </div>
              {r.subtitle && (
                <p className="text-sm text-gray-700 font-semibold mb-2">{r.subtitle}</p>
              )}
              <p className="text-gray-600">{r.desc}</p>
              <div className="mt-4">
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">{r.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Slider - horizontal auto-scrolling carousel */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Sertifikatlarimiz</h3>

          <div
            className="marquee-container relative overflow-hidden"
            tabIndex={0}
            role="region"
            aria-label="Certificates carousel"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
            onKeyDown={(e: any) => {
              if (e.key === 'ArrowLeft') {
                prev();
                e.preventDefault();
              } else if (e.key === 'ArrowRight') {
                next();
                e.preventDefault();
              }
            }}
          >
            {/* Prev/Next controls */}
            <button aria-label="Previous" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-white">
              ‹
            </button>
            <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-white">
              ›
            </button>

            <div
              ref={trackRef}
              className="marquee-track flex gap-6 items-center overflow-x-auto scroll-smooth"
            >
              {/* Render duplicated certificate list for seamless looping */}
              {CERTS.concat(CERTS).map((src, i) => (
                <div key={src + '-' + i} className="w-44 sm:w-56 md:w-72 h-40 sm:h-44 md:h-56 flex items-center justify-center shrink-0 bg-white rounded shadow-lg overflow-hidden">
                  <img draggable={false} src={src} alt={`Sertifikat ${i + 1}`} className="w-full h-full object-cover" style={{ filter: 'contrast(1.08) saturate(1.06) brightness(1.04)' }} />
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4 absolute left-0 right-0 -bottom-10 z-20">
              {CERTS.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => {
                    const el = trackRef.current; if (!el) return;
                    const firstChild = el.firstElementChild as HTMLElement | null; if (!firstChild) return;
                    const gap = parseFloat(getComputedStyle(el).gap || '24');
                    const slideWidth = firstChild.offsetWidth + gap;
                    el.scrollTo({ left: idx * slideWidth, behavior: 'smooth' });
                    setActiveIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-pressed={activeIndex === idx}
                  className={"w-3 h-3 rounded-full " + (activeIndex === idx ? 'bg-gray-800' : 'bg-gray-300')}
                />
              ))}
            </div>
          </div>

          <style jsx>{`
            .marquee-container { }
            .marquee-track { display: flex; align-items:center; gap:1.5rem; }
            .marquee-track > div { flex-shrink: 0; }
            .marquee-track img { -webkit-user-drag: none; user-drag: none; user-select: none; -webkit-user-select: none; }
            .marquee-track::-webkit-scrollbar { display: none; }

            /* remove 3D rotation - images are static for clarity */
            .marquee-container { perspective: 1200px; }

            @media (max-width: 640px) {
              .marquee-track > div { width: 220px; height: 120px; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
