"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
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

/* ====== MAGNETIC BUTTON ====== */
function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 3, stiffness: 100 });
  const ySpring = useSpring(y, { damping: 3, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    if (distance < 100) {
      x.set(distX * 0.3);
      y.set(distY * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-4 bg-[#c9a84c] text-[#030b18] font-black uppercase text-sm tracking-[0.1em] rounded-full hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-shadow"
    >
      {children}
    </motion.button>
  );
}

/* ====== PARALLAX HERO ====== */
function ParallaxHero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200"
          alt="Azure Yachts"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030b18]" />
      </motion.div>

      <div className="relative h-full flex flex-col items-center justify-center px-12 text-center text-white">
        <Reveal>
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Azure Yachts
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-2xl opacity-70 font-light max-w-2xl">
            Luxury yacht charters. 50 vessels. 200+ destinations. 15 years of excellence.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/* ====== YACHT QUICK-VIEW MODAL ====== */
function YachtModal({
  yacht,
  onClose,
}: {
  yacht: { name: string; length: string; capacity: string; range: string; crew: string };
  onClose: () => void;
}) {
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
          className="bg-[#030b18] border border-[#c9a84c]/20 rounded-3xl p-12 max-w-xl w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-4xl font-black text-[#c9a84c] mb-6">{yacht.name}</h2>
          <div className="space-y-4 text-white">
            <div className="border-l-2 border-[#c9a84c] pl-4 py-2">
              <p className="text-xs opacity-60 uppercase tracking-widest">Length</p>
              <p className="text-lg font-bold">{yacht.length}</p>
            </div>
            <div className="border-l-2 border-[#c9a84c] pl-4 py-2">
              <p className="text-xs opacity-60 uppercase tracking-widest">Capacity</p>
              <p className="text-lg font-bold">{yacht.capacity}</p>
            </div>
            <div className="border-l-2 border-[#c9a84c] pl-4 py-2">
              <p className="text-xs opacity-60 uppercase tracking-widest">Range</p>
              <p className="text-lg font-bold">{yacht.range}</p>
            </div>
            <div className="border-l-2 border-[#c9a84c] pl-4 py-2">
              <p className="text-xs opacity-60 uppercase tracking-widest">Crew</p>
              <p className="text-lg font-bold">{yacht.crew}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-8 w-full px-6 py-3 bg-[#c9a84c] text-[#030b18] font-black uppercase rounded-lg hover:bg-[#b39639] transition-colors"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ====== INFINITE MARQUEE ====== */
function InfiniteMarquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden bg-[#0a1420] border-y border-[#c9a84c]/10 py-6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[#c9a84c] font-bold text-lg tracking-widest flex-shrink-0">
            ⚓ {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ====== TESTIMONIALS CAROUSEL ====== */
function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Array<{ name: string; text: string }>;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center px-6"
        >
          <p className="text-2xl mb-6 italic opacity-80">&quot;{testimonials[current].text}&quot;</p>
          <p className="text-lg font-black text-[#c9a84c]">{testimonials[current].name}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 justify-center mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-[#c9a84c] w-8" : "bg-[#c9a84c]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ====== PRICING CARD ====== */
function PricingCard({
  tier,
  duration,
  price,
  features,
}: {
  tier: string;
  duration: string;
  price: string;
  features: string[];
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="border border-[#c9a84c]/20 rounded-2xl p-8 hover:border-[#c9a84c] transition-all bg-[#0a1420]"
    >
      <h3 className="text-2xl font-black mb-2 text-[#c9a84c]">{tier}</h3>
      <p className="text-sm opacity-60 mb-4">{duration}</p>
      <div className="mb-6">
        <p className="text-4xl font-black text-white">{price}</p>
        <p className="text-xs opacity-40 mt-1">per day</p>
      </div>
      <div className="space-y-3 mb-8">
        {features.map((f, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-[#c9a84c] font-black mt-1">✓</span>
            <span className="opacity-70">{f}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-3 bg-[#c9a84c] text-[#030b18] font-black rounded-lg hover:bg-[#b39639] transition-colors">
        Book Now
      </button>
    </motion.div>
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
        <motion.div key={i} className="border border-[#c9a84c]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 flex justify-between items-center bg-[#0a1420] text-white hover:bg-[#0f1a28] transition-colors"
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
                className="bg-[#030b18] px-6 py-4 text-white/70 border-t border-[#c9a84c]/10"
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
export default function AzureYachts() {
  const [selectedYacht, setSelectedYacht] = useState<{
    name: string;
    length: string;
    capacity: string;
    range: string;
    crew: string;
  } | null>(null);
  const [fleetFilter, setFleetFilter] = useState("Motor");

  const fleets = [
    { type: "Motor", count: 20 },
    { type: "Sailing", count: 15 },
    { type: "Catamaran", count: 15 },
  ];

  const yachts = [
    {
      name: "Azure Dream",
      type: "Motor",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
      length: "180ft",
      capacity: "12 guests",
      range: "3,000nm",
      crew: "8",
    },
    {
      name: "Golden Horizon",
      type: "Sailing",
      img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=600",
      length: "150ft",
      capacity: "10 guests",
      range: "2,500nm",
      crew: "6",
    },
    {
      name: "Serenity Blue",
      type: "Catamaran",
      img: "https://images.unsplash.com/photo-1535202712614-4ee1b72c82ac?auto=format&fit=crop&q=80&w=600",
      length: "120ft",
      capacity: "8 guests",
      range: "2,000nm",
      crew: "5",
    },
    {
      name: "Infinity",
      type: "Motor",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
      length: "200ft",
      capacity: "16 guests",
      range: "4,000nm",
      crew: "10",
    },
    {
      name: "Wind Dancer",
      type: "Sailing",
      img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=600",
      length: "140ft",
      capacity: "9 guests",
      range: "2,200nm",
      crew: "5",
    },
    {
      name: "Tropical Paradise",
      type: "Catamaran",
      img: "https://images.unsplash.com/photo-1535202712614-4ee1b72c82ac?auto=format&fit=crop&q=80&w=600",
      length: "130ft",
      capacity: "10 guests",
      range: "2,300nm",
      crew: "6",
    },
  ];

  const stats = [
    { label: "Destinations", value: 200 },
    { label: "Vessels", value: 50 },
    { label: "Years", value: 15 },
    { label: "Charters", value: 1000 },
  ];

  const destinations = [
    "Mediterranean",
    "Caribbean",
    "Pacific",
    "Adriatic",
    "Seychelles",
    "Maldives",
  ];

  const crew = [
    { name: "Captain James", role: "Master Sailor", img: "⛵" },
    { name: "Chef Maria", role: "Executive Chef", img: "👨‍🍳" },
    { name: "Ava", role: "Concierge", img: "👩‍💼" },
  ];

  const testimonials = [
    { name: "David & Lisa", text: "The most magical vacation of our lives. Every detail was perfect." },
    { name: "Alex", text: "Professional crew, incredible service, unforgettable memories." },
    { name: "Sophie", text: "Azure Yachts exceeded all expectations. Absolutely recommend!" },
  ];

  const faqs = [
    {
      q: "What's included in a charter?",
      a: "All charters include the yacht, crew, fuel, meals, and all equipment. Optional extras include water sports and special events.",
    },
    {
      q: "What's the minimum charter duration?",
      a: "Minimum 7-day charters, with flexible options for groups. Contact our team for special arrangements.",
    },
    {
      q: "Do I need sailing experience?",
      a: "No experience needed! Our professional crew handles all navigation and operations.",
    },
  ];

  return (
    <div className="bg-[#030b18] text-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <ParallaxHero />

      {/* Fleet Filter */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Fleet Collection
          </h2>
        </Reveal>
        <div className="flex gap-6 justify-center mb-12 flex-wrap">
          {fleets.map((f) => (
            <button
              key={f.type}
              onClick={() => setFleetFilter(f.type)}
              className={`px-8 py-3 font-black uppercase text-sm tracking-widest rounded-full transition-all ${
                fleetFilter === f.type
                  ? "bg-[#c9a84c] text-[#030b18]"
                  : "bg-[#0a1420] text-[#c9a84c] border border-[#c9a84c]/20 hover:border-[#c9a84c]"
              }`}
            >
              {f.type} ({f.count})
            </button>
          ))}
        </div>

        {/* Yacht Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yachts
            .filter((y) => y.type === fleetFilter)
            .map((yacht, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <button
                  onClick={() =>
                    setSelectedYacht({
                      name: yacht.name,
                      length: yacht.length,
                      capacity: yacht.capacity,
                      range: yacht.range,
                      crew: yacht.crew,
                    })
                  }
                  className="group relative aspect-square rounded-xl overflow-hidden border border-[#c9a84c]/20 hover:border-[#c9a84c] transition-all cursor-pointer"
                >
                  <Image
                    src={yacht.img}
                    alt={yacht.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs opacity-60 mb-1">{yacht.type}</p>
                    <p className="text-lg font-black">{yacht.name}</p>
                  </div>
                </button>
              </Reveal>
            ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-12 bg-[#0a1420]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
              By The Numbers
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center border border-[#c9a84c]/20 rounded-lg p-6">
                  <div className="text-4xl md:text-5xl font-black text-[#c9a84c] mb-2">
                    <Counter target={stat.value} />
                    {stat.value === 200 ? "+" : ""}
                  </div>
                  <p className="text-sm opacity-60 uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Marquee */}
      <InfiniteMarquee items={destinations} />

      {/* Pricing */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Charter Packages
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal delay={0.1}>
            <PricingCard
              tier="Classic"
              duration="7-10 days"
              price="$8,500"
              features={["Yacht charter", "Professional crew", "Meals included", "Standard destinations"]}
            />
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <PricingCard
                tier="Luxury"
                duration="7-14 days"
                price="$15,000"
                features={[
                  "Premium yacht",
                  "Elite crew",
                  "Gourmet dining",
                  "Water sports",
                  "Concierge service",
                ]}
              />
            </motion.div>
          </Reveal>
          <Reveal delay={0.3}>
            <PricingCard
              tier="Exclusive"
              duration="Custom"
              price="Custom"
              features={[
                "Any vessel",
                "Custom itinerary",
                "Premium services",
                "Private chef",
                "24/7 concierge",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Crew Spotlight */}
      <section className="py-20 px-12 bg-[#0a1420] max-w-7xl mx-auto w-full">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Meet The Crew
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {crew.map((member, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center border border-[#c9a84c]/20 rounded-lg p-8">
                <div className="text-6xl mb-4">{member.img}</div>
                <h3 className="text-2xl font-black text-[#c9a84c] mb-2">{member.name}</h3>
                <p className="opacity-60">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Guest Reviews
          </h2>
        </Reveal>
        <div className="border border-[#c9a84c]/20 rounded-2xl p-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-12 bg-[#0a1420] max-w-4xl mx-auto w-full">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Questions?
          </h2>
        </Reveal>
        <FAQAccordion items={faqs} />
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-12 bg-gradient-to-t from-[#c9a84c]/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">
              Ready to Set Sail?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl opacity-60 mb-12 max-w-xl mx-auto">
              Book your luxury yacht charter today and create memories that last forever.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticBtn>Reserve Your Charter</MagneticBtn>
          </Reveal>
        </div>
      </footer>

      {/* Modal */}
      {selectedYacht && (
        <YachtModal yacht={selectedYacht} onClose={() => setSelectedYacht(null)} />
      )}
    </div>
  );
}
