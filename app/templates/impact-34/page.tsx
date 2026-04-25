"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, Phone, Mail, Star } from "lucide-react";
import "../premium.css";

const PROPERTIES = [
  { id: 1, name: "VILLA ABSENCE", location: "Cap d'Antibes, FR", price: "€18,500,000", beds: 7, baths: 6, sqm: 1240, tag: "Off-Market", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"] },
  { id: 2, name: "PENTHOUSE NOIR", location: "Monaco, MC", price: "€24,200,000", beds: 4, baths: 4, sqm: 680, tag: "New Listing", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop", gallery: [] },
  { id: 3, name: "DOMAINE STRATA", location: "Luberon, FR", price: "€6,800,000", beds: 9, baths: 7, sqm: 2100, tag: "Exclusive", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop", gallery: [] },
  { id: 4, name: "MAS MINÉRAL", location: "Saint-Rémy, FR", price: "€4,200,000", beds: 5, baths: 4, sqm: 860, tag: "Under Offer", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop", gallery: [] },
];

const STATS = [
  { value: 2, suffix: "B€+", label: "Portfolio Managed" },
  { value: 140, suffix: "+", label: "Properties Sold" },
  { value: 22, suffix: "yrs", label: "Market Experience" },
  { value: 96, suffix: "%", label: "Off-Market Access" },
];

const TESTIMONIALS = [
  { name: "Sir E. Ashton", text: "Aldoria found us a property in Cap d'Antibes that was never listed. The discretion and access are unmatched.", role: "Private Client" },
  { name: "Mme. C. Bertrand", text: "They do not waste your time with unsuitable properties. Every viewing was exactly what we had described.", role: "Geneva-Based Investor" },
  { name: "Baron von H.", text: "I have used four agencies across three countries. None operate at this level.", role: "Repeat Client" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = target / 55;
    const timer = setInterval(() => {
      s += step;
      if (s >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function BrutalistEstateSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="premium-theme bg-[#f8f6f2] text-[#1a1610] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#f8f6f2]/90 backdrop-blur-xl border-b border-[#1a1610]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base uppercase tracking-[0.4em] text-[#8b7355]">ALDORIA IMMOBILIER</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.4em] opacity-40" style={{ fontFamily: "sans-serif" }}>
          {["Properties", "Services", "Team", "Contact"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+33144000000" className="hidden md:flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#8b7355] border border-[#8b7355]/30 px-4 py-2 hover:bg-[#8b7355] hover:text-white transition-all" style={{ fontFamily: "sans-serif" }}>
            <Phone size={9} /> Private Line
          </a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#1a1610] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl uppercase">
              {["Properties", "Services", "Team", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop" alt="Luxury Property" fill className="object-cover opacity-70" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1610]/90 via-[#1a1610]/20 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[9px] uppercase tracking-[0.6em] text-white/40 mb-5" style={{ fontFamily: "sans-serif" }}>
            Exceptional Properties · South of France · Monaco
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="text-white text-6xl md:text-[7vw] leading-none mb-6">
            The Art of<br /><em>Extraordinary.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-white/50 max-w-md text-sm leading-relaxed mb-8" style={{ fontFamily: "sans-serif" }}>
            Discreet advisory for exceptional residential properties. We operate where standard agencies cannot.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} href="#properties" className="inline-block bg-white text-[#1a1610] px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-white/90 transition-colors" style={{ fontFamily: "sans-serif" }}>
            Current Portfolio
          </motion.a>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#1a1610] py-4">
        <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.5em] text-white/20 shrink-0" style={{ fontFamily: "sans-serif" }}>South of France · Monaco · Switzerland · Off-Market · Exclusive Mandate ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="bg-[#1a1610] text-white px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-5xl text-[#c9a96e] mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/30" style={{ fontFamily: "sans-serif" }}>{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* PROPERTIES */}
      <section id="properties" className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b7355] mb-4" style={{ fontFamily: "sans-serif" }}>Current Portfolio</p>
          <h2 className="text-5xl md:text-6xl leading-none tracking-tight">Exceptional<br />Properties</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROPERTIES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.div className="group cursor-pointer" onClick={() => setActiveProperty(p.id)} whileHover={{ y: -6 }}>
                <div className="relative overflow-hidden bg-[#f0ece4] mb-5" style={{ height: i === 0 ? "65vh" : "45vh" }}>
                  <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1610]/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-[8px] uppercase tracking-widest px-3 py-1.5 ${p.tag === "Under Offer" ? "bg-orange-500/90 text-white" : "bg-white/90 text-[#1a1610]"}`} style={{ fontFamily: "sans-serif" }}>{p.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 text-[9px] text-white/60 mb-2" style={{ fontFamily: "sans-serif" }}>
                      <MapPin size={9} /> {p.location}
                    </div>
                    <h3 className="text-white text-2xl leading-tight">{p.name}</h3>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-5 text-[9px] text-[#1a1610]/40" style={{ fontFamily: "sans-serif" }}>
                    <span className="flex items-center gap-1"><Bed size={9} /> {p.beds}</span>
                    <span className="flex items-center gap-1"><Bath size={9} /> {p.baths}</span>
                    <span className="flex items-center gap-1"><Square size={9} /> {p.sqm}m²</span>
                  </div>
                  <p className="text-[#8b7355] font-bold" style={{ fontFamily: "sans-serif" }}>{p.price}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROPERTY MODAL */}
      <AnimatePresence>
        {activeProperty !== null && (() => {
          const p = PROPERTIES.find(x => x.id === activeProperty)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-8" onClick={() => setActiveProperty(null)}>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-[#f8f6f2] max-w-4xl w-full" onClick={e => e.stopPropagation()} style={{ fontFamily: "'Georgia', serif" }}>
                <div className="relative h-72 md:h-96">
                  <Image src={p.img} alt={p.name} fill className="object-cover" unoptimized />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-[9px] uppercase tracking-widest px-3 py-1.5 text-[#1a1610]" style={{ fontFamily: "sans-serif" }}>{p.tag}</span>
                  </div>
                </div>
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#8b7355] mb-2 flex items-center gap-1" style={{ fontFamily: "sans-serif" }}><MapPin size={9} /> {p.location}</p>
                    <h3 className="text-3xl leading-tight mb-4">{p.name}</h3>
                    <div className="flex gap-5 text-[9px] text-[#1a1610]/40 mb-6" style={{ fontFamily: "sans-serif" }}>
                      <span className="flex items-center gap-1"><Bed size={9} /> {p.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath size={9} /> {p.baths} Baths</span>
                      <span className="flex items-center gap-1"><Square size={9} /> {p.sqm}m²</span>
                    </div>
                    <p className="text-2xl text-[#8b7355] font-bold">{p.price}</p>
                  </div>
                  <div className="flex flex-col gap-3 justify-center">
                    <a href="#" className="bg-[#1a1610] text-white px-6 py-3 text-[10px] uppercase tracking-widest text-center hover:bg-[#2d2620] transition-colors" style={{ fontFamily: "sans-serif" }}>Request Private Viewing</a>
                    <a href="tel:+33144000000" className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-[#8b7355] border border-[#8b7355]/30 px-6 py-3 hover:bg-[#8b7355] hover:text-white transition-all" style={{ fontFamily: "sans-serif" }}>
                      <Phone size={9} /> Call Private Line
                    </a>
                  </div>
                </div>
                <button onClick={() => setActiveProperty(null)} className="absolute top-4 right-4 bg-white/80 text-[#1a1610] p-1.5 rounded-full"><X size={16} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* TESTIMONIALS */}
      <section className="bg-[#1a1610] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-10">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a96e]/50 mb-4" style={{ fontFamily: "sans-serif" }}>Client Voices</p>
          <h2 className="text-4xl leading-tight">Private<br />Testimonials</h2>
        </Reveal>
        <div className="relative min-h-[180px] max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <div className="flex gap-1 mb-5">{Array(5).fill(null).map((_, i) => <Star key={i} size={11} fill="#c9a96e" className="text-[#c9a96e]" />)}</div>
              <p className="text-xl leading-relaxed text-white/60 mb-5 italic">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <div>
                <p className="text-sm uppercase tracking-widest text-white">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-[9px] text-white/30 mt-1" style={{ fontFamily: "sans-serif" }}>{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-px rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-[#c9a96e]" : "w-3 bg-white/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b7355] mb-4" style={{ fontFamily: "sans-serif" }}>Private Advisory</p>
          <h2 className="text-5xl leading-none tracking-tight">Find Your<br /><em>Exceptional.</em></h2>
          <p className="text-sm text-[#1a1610]/50 mt-4 max-w-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>We advise a select number of clients. Our off-market network covers 96% of premium transactions in the region.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-[#1a1610] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#2d2620] transition-colors inline-flex items-center gap-2" style={{ fontFamily: "sans-serif" }}>
            Private Consultation <ArrowRight size={12} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1610] text-white px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-[#c9a96e] uppercase tracking-[0.4em] text-sm mb-1">Aldoria Immobilier</p>
          <p className="text-[9px] text-white/30" style={{ fontFamily: "sans-serif" }}>Côte d'Azur · Monaco · Alps</p>
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30" style={{ fontFamily: "sans-serif" }}>
          {["Portfolio", "Services", "Privacy", "Legal"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase" style={{ fontFamily: "sans-serif" }}>© 2026 Aldoria Immobilier SAS</p>
      </footer>
    </div>
  );
}
