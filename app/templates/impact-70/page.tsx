"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
function Counter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const fps = 60;
    const frames = Math.floor((duration * fps) / 1000);
    const increment = target / frames;
    const interval = setInterval(() => {
      frame++;
      setCount(Math.min(Math.floor(frame * increment), target));
      if (frame >= frames) clearInterval(interval);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
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
      className="px-8 py-4 bg-white text-blue-950 font-black uppercase text-sm tracking-[0.1em] rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-shadow"
    >
      {children}
    </motion.button>
  );
}

/* ====== PARALLAX HERO ====== */
function ParallaxHero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => (r + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#050a1a] to-[#0a1a3a]">
      {/* Orbit Ring Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute w-96 h-96 border-2 border-[#0066ff]/30 rounded-full"
          animate={{ rotate: rotation }}
        />
        <motion.div
          style={{ y: backgroundY }}
          className="absolute w-64 h-64 border border-[#0066ff]/50 rounded-full"
          animate={{ rotate: -rotation * 1.5 }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-12 text-center text-white">
        <Reveal>
          <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Orbital
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl md:text-2xl opacity-60 font-light max-w-2xl">
            Advanced satellite constellation management. 42 successful missions. 99.7% uptime.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/* ====== SATELLITE PRODUCT MODAL ====== */
function SatelliteModal({
  satellite,
  onClose,
}: {
  satellite: { name: string; orbit: string; capacity: string; instruments: string };
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
          className="bg-[#0a1a3a] border border-[#0066ff]/20 rounded-3xl p-12 max-w-xl w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-4xl font-black text-[#0066ff] mb-6">{satellite.name}</h2>
          <div className="space-y-4 text-white">
            <div className="border-l-2 border-[#0066ff] pl-4 py-2">
              <p className="text-xs opacity-60 uppercase tracking-widest">Orbit</p>
              <p className="text-lg font-bold">{satellite.orbit}</p>
            </div>
            <div className="border-l-2 border-[#0066ff] pl-4 py-2">
              <p className="text-xs opacity-60 uppercase tracking-widest">Capacity</p>
              <p className="text-lg font-bold">{satellite.capacity}</p>
            </div>
            <div className="border-l-2 border-[#0066ff] pl-4 py-2">
              <p className="text-xs opacity-60 uppercase tracking-widest">Instruments</p>
              <p className="text-lg font-bold">{satellite.instruments}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-8 w-full px-6 py-3 bg-[#0066ff] text-white font-black uppercase rounded-lg hover:bg-[#0052cc] transition-colors"
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
    <div className="overflow-hidden bg-[#0a1a3a] border-y border-[#0066ff]/10 py-6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white font-bold text-lg tracking-widest flex-shrink-0">
            ★ {item}
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
        <motion.div key={i} className="border border-[#0066ff]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 flex justify-between items-center bg-[#0a1a3a] text-white hover:bg-[#0f2a4a] transition-colors"
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
                className="bg-[#050a1a] px-6 py-4 text-white/70 border-t border-[#0066ff]/10"
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
export default function ApexOrbital() {
  const [selectedSatellite, setSelectedSatellite] = useState<{
    name: string;
    orbit: string;
    capacity: string;
    instruments: string;
  } | null>(null);
  const [missionFilter, setMissionFilter] = useState("LEO");

  const missions = [
    { type: "LEO", count: 28 },
    { type: "GEO", count: 10 },
    { type: "Deep Space", count: 4 },
  ];

  const satellites = [
    {
      name: "APEX-1",
      orbit: "LEO",
      img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80&w=600",
      capacity: "2.5TB/day",
      instruments: "SAR + Optical",
    },
    {
      name: "APEX-2",
      orbit: "GEO",
      img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&q=80&w=600",
      capacity: "1.8TB/day",
      instruments: "Thermal IR",
    },
    {
      name: "APEX-3",
      orbit: "LEO",
      img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80&w=600",
      capacity: "3.2TB/day",
      instruments: "Multi-spectral",
    },
    {
      name: "APEX-4",
      orbit: "Deep Space",
      img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&q=80&w=600",
      capacity: "512GB/day",
      instruments: "Radiation Monitor",
    },
  ];

  const stats = [
    { label: "Missions", value: 42 },
    { label: "Success Rate", value: 99.7 },
    { label: "Stations", value: 3 },
    { label: "Countries", value: 14 },
  ];

  const partners = ["NASA", "ESA", "ISRO", "CNSA", "Roscosmos", "JAXA"];

  const faqs = [
    {
      q: "What is orbital constellation management?",
      a: "Our advanced system monitors and manages satellite fleets across multiple orbital planes, optimizing coverage and performance.",
    },
    {
      q: "How do we achieve 99.7% uptime?",
      a: "Redundant systems, predictive maintenance, and real-time monitoring across all orbital stations ensure maximum availability.",
    },
    {
      q: "What data do satellites collect?",
      a: "Our constellation collects SAR, optical, thermal, and multi-spectral data for earth observation and scientific research.",
    },
  ];

  return (
    <div className="bg-[#050a1a] text-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <ParallaxHero />

      {/* Mission Filter */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Mission Portfolio
          </h2>
        </Reveal>
        <div className="flex gap-6 justify-center mb-12 flex-wrap">
          {missions.map((m) => (
            <button
              key={m.type}
              onClick={() => setMissionFilter(m.type)}
              className={`px-8 py-3 font-black uppercase text-sm tracking-widest rounded-full transition-all ${
                missionFilter === m.type
                  ? "bg-[#0066ff] text-white"
                  : "bg-[#0a1a3a] text-white/60 border border-[#0066ff]/20 hover:border-[#0066ff]"
              }`}
            >
              {m.type} ({m.count})
            </button>
          ))}
        </div>

        {/* Satellite Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {satellites
            .filter((s) => s.orbit === missionFilter)
            .map((sat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <button
                  onClick={() =>
                    setSelectedSatellite({
                      name: sat.name,
                      orbit: sat.orbit,
                      capacity: sat.capacity,
                      instruments: sat.instruments,
                    })
                  }
                  className="group relative aspect-square rounded-xl overflow-hidden border border-[#0066ff]/20 hover:border-[#0066ff] transition-all cursor-pointer"
                >
                  <Image
                    src={sat.img}
                    alt={sat.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs opacity-60 mb-1">{sat.orbit}</p>
                    <p className="text-lg font-black">{sat.name}</p>
                  </div>
                </button>
              </Reveal>
            ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-12 bg-[#0a1a3a]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
              Mission Success
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center border border-[#0066ff]/20 rounded-lg p-6">
                  <div className="text-4xl md:text-5xl font-black text-[#0066ff] mb-2">
                    <Counter target={stat.value} />
                    {stat.value === 99.7 ? "%" : ""}
                  </div>
                  <p className="text-sm opacity-60 uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Marquee */}
      <InfiniteMarquee items={partners} />

      {/* Timeline */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Launch Timeline
          </h2>
        </Reveal>
        <div className="space-y-6">
          {[
            { year: "2020", title: "APEX-1 Launch", status: "Operational" },
            { year: "2021", title: "APEX-2 Launch", status: "Operational" },
            { year: "2022", title: "APEX-3 Launch", status: "Operational" },
            { year: "2024", title: "APEX-4 Launch", status: "Upcoming" },
          ].map((event, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-l-4 border-[#0066ff] pl-6 py-4 flex justify-between items-center bg-[#0a1a3a] px-6 rounded-r-lg">
                <div>
                  <p className="text-sm opacity-60 uppercase tracking-widest">{event.year}</p>
                  <p className="text-xl font-black">{event.title}</p>
                </div>
                <span className="text-sm font-bold text-[#0066ff]">{event.status}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-12 bg-[#0a1a3a] max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Frequently Asked
          </h2>
        </Reveal>
        <div className="max-w-2xl mx-auto">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-12 bg-gradient-to-t from-[#0066ff]/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">
              Ready to Launch?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl opacity-60 mb-12 max-w-xl mx-auto">
              Join the orbital revolution. Deploy your mission today.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticBtn>Launch Now</MagneticBtn>
          </Reveal>
        </div>
      </footer>

      {/* Modal */}
      {selectedSatellite && (
        <SatelliteModal satellite={selectedSatellite} onClose={() => setSelectedSatellite(null)} />
      )}
    </div>
  );
}
