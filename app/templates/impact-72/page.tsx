"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

/* ====== REVEAL COMPONENT ====== */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ====== COUNTER COMPONENT ====== */
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const increment = target / 100;
    const interval = setInterval(() => {
      setCount((c) => (c < target ? c + increment : target));
    }, 20);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <div ref={ref}>{Math.floor(count)}</div>;
}

/* ====== PARALLAX HERO ====== */
function ParallaxHero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-733852?w=800&q=80"
          alt="Golden Ridge Brewing"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1209]" />
      </motion.div>

      <div className="relative h-full flex flex-col items-center justify-center px-12 text-center text-[#f5f0e8]">
        <Reveal>
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Golden Ridge
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-2xl opacity-70 font-light max-w-2xl">
            Craft brewing since 2012. 47 beers. 8 medals. 3 tap rooms.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/* ====== BEER GALLERY LIGHTBOX ====== */
function BeerLightbox({ image, onClose }: { image: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl aspect-square rounded-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image src={image} alt="Brewery" fill className="object-cover" unoptimized />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-12 h-12 bg-[#d4890a] text-white rounded-full flex items-center justify-center font-black text-xl"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ====== INFINITE MARQUEE ====== */
function InfiniteMarquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden bg-[#d4890a] py-6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[#1a1209] font-black text-lg tracking-widest flex-shrink-0">
            🍺 {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ====== FAQ ACCORDION ====== */
function FAQAccordion({
  items,
}: {
  items: Array<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div key={i} className="border border-[#d4890a]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 flex justify-between items-center bg-[#2a2015] text-[#f5f0e8] hover:bg-[#3a3025] transition-colors"
          >
            <span className="font-bold text-left">{item.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }}>
              ▼
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#1a1209] px-6 py-4 text-[#d4890a]/80 border-t border-[#d4890a]/10"
              >
                {item.a}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

/* ====== MAIN PAGE ====== */
export default function GoldenRidgeBrewing() {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [styleFilter, setStyleFilter] = useState("IPA");

  const styles = [
    { name: "IPA", count: 12 },
    { name: "Stout", count: 8 },
    { name: "Lager", count: 15 },
    { name: "Sour", count: 12 },
  ];

  const beers = [
    {
      name: "Ridge Hopper",
      style: "IPA",
      abv: "6.8%",
      ibu: 65,
      desc: "Citrus forward with a clean finish",
    },
    {
      name: "Midnight Ridge",
      style: "Stout",
      abv: "7.2%",
      ibu: 45,
      desc: "Rich chocolate and coffee notes",
    },
    {
      name: "Golden Pilsner",
      style: "Lager",
      abv: "5.2%",
      ibu: 35,
      desc: "Crisp, clean, refreshing",
    },
    {
      name: "Sour Sunset",
      style: "Sour",
      abv: "5.8%",
      ibu: 20,
      desc: "Tart raspberry with a smooth finish",
    },
  ];

  const stats = [
    { label: "Est.", value: 2012 },
    { label: "Beers Brewed", value: 47 },
    { label: "Medals Won", value: 8 },
    { label: "Tap Rooms", value: 3 },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1608270861620-7c3fdf5ae063?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1608270861619-91ec68f12193?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600788214784-c2a60db70e12?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1608270861618-a8e6b19cda39?auto=format&fit=crop&q=80&w=800",
  ];

  const pairings = [
    { beer: "Ridge Hopper", food: "Fish Tacos" },
    { beer: "Midnight Ridge", food: "Chocolate Cake" },
    { beer: "Golden Pilsner", food: "Light Salads" },
    { beer: "Sour Sunset", food: "Spicy Curry" },
  ];

  const faqs = [
    {
      q: "What makes Golden Ridge unique?",
      a: "We combine traditional brewing techniques with innovative flavor development, using locally sourced ingredients whenever possible.",
    },
    {
      q: "Do you offer brewery tours?",
      a: "Yes! Tours are available every Saturday and Sunday at 2 PM and 4 PM. Reservations recommended.",
    },
    {
      q: "Where can I buy your beer?",
      a: "Our beers are available at all 3 Golden Ridge tap rooms, plus select retailers throughout the region.",
    },
  ];

  return (
    <div className="bg-[#1a1209] text-[#f5f0e8] min-h-screen overflow-x-hidden">
      {/* Hero */}
      <ParallaxHero />

      {/* Style Filter & Beer Grid */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Beer Styles
          </h2>
        </Reveal>
        <div className="flex gap-6 justify-center mb-12 flex-wrap">
          {styles.map((s) => (
            <button
              key={s.name}
              onClick={() => setStyleFilter(s.name)}
              className={`px-8 py-3 font-black uppercase text-sm tracking-widest rounded-full transition-all ${
                styleFilter === s.name
                  ? "bg-[#d4890a] text-[#1a1209]"
                  : "bg-[#2a2015] text-[#d4890a] border border-[#d4890a]/20 hover:border-[#d4890a]"
              }`}
            >
              {s.name} ({s.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beers
            .filter((b) => b.style === styleFilter)
            .map((beer, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border border-[#d4890a]/20 rounded-xl p-6 bg-[#2a2015] hover:border-[#d4890a] transition-all">
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-[#d4890a] mb-2">{beer.name}</h3>
                    <p className="text-sm opacity-60">{beer.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#d4890a]/10">
                    <div>
                      <p className="text-xs opacity-60 uppercase tracking-widest">ABV</p>
                      <p className="text-lg font-bold text-[#d4890a]">{beer.abv}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 uppercase tracking-widest">IBU</p>
                      <p className="text-lg font-bold text-[#d4890a]">{beer.ibu}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-12 bg-[#2a2015]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
              Our Legacy
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center border border-[#d4890a]/20 rounded-lg p-6">
                  <div className="text-4xl md:text-5xl font-black text-[#d4890a] mb-2">
                    <Counter target={stat.value} />
                  </div>
                  <p className="text-sm opacity-60 uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Releases Marquee */}
      <InfiniteMarquee
        items={[
          "Winter Spice",
          "Spring Wheat",
          "Summer Pale",
          "Autumn Harvest",
        ]}
      />

      {/* Tap Room Gallery */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Tap Room Gallery
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <button
                onClick={() => setSelectedGallery(img)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-[#d4890a]/20 hover:border-[#d4890a] transition-all cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Food Pairings */}
      <section className="py-20 px-12 bg-[#2a2015]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
              Food Pairings
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pairings.map((pair, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border border-[#d4890a]/20 rounded-lg p-6 hover:border-[#d4890a] transition-all">
                  <p className="text-[#d4890a] font-black mb-2 text-sm uppercase tracking-widest">
                    Beer
                  </p>
                  <p className="text-lg font-bold mb-4">{pair.beer}</p>
                  <p className="text-[#d4890a] font-black text-sm uppercase tracking-widest">
                    Food
                  </p>
                  <p className="text-lg">{pair.food}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Questions?
          </h2>
        </Reveal>
        <FAQAccordion items={faqs} />
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-12 bg-[#d4890a] text-[#1a1209]">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">
              Visit Golden Ridge
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg font-light mb-12 max-w-xl mx-auto">
              Experience craft brewing at its finest. Book your tour today.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <button className="px-8 py-4 bg-[#1a1209] text-[#d4890a] font-black uppercase text-sm tracking-[0.1em] rounded-full hover:shadow-[0_0_40px_rgba(212,137,10,0.3)] transition-shadow">
              Book Tour
            </button>
          </Reveal>
        </div>
      </footer>

      {/* Lightbox */}
      {selectedGallery && (
        <BeerLightbox image={selectedGallery} onClose={() => setSelectedGallery(null)} />
      )}
    </div>
  );
}
