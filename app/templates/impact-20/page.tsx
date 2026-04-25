"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowRight, X, Phone, Shield, Crown, ChevronLeft, ChevronRight, Star, Clock, Award } from "lucide-react";
import "../premium.css";

const COLLECTION = [
  { id: 1, name: "CHRONO NOIR I", ref: "CV-001", price: "€48,500", category: "Tourbillon", limited: "12/50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop", desc: "A midnight-dialled perpetual calendar tourbillon in 18k black gold. Movement visible through sapphire exhibition caseback." },
  { id: 2, name: "SOLSTICE GMT", ref: "CV-002", price: "€28,900", category: "GMT", limited: "28/100", img: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1200&auto=format&fit=crop", desc: "Sunburst dial in guilloché silver. 72-hour power reserve. Three-city time display at 6 o'clock." },
  { id: 3, name: "ULTRA SLIM", ref: "CV-003", price: "€19,200", category: "Dress", limited: null, img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop", desc: "3.7mm total thickness. Integrated bracelet in grade-5 titanium. The thinnest piece we have ever made." },
  { id: 4, name: "AQUA MASTER", ref: "CV-004", price: "€22,750", category: "Sport", limited: "45/200", img: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1200&auto=format&fit=crop", desc: "500m water-resistant. Unidirectional ceramic bezel. Helium escape valve machined to ±0.001mm." },
];

const STATS = [
  { value: 1962, suffix: "", label: "Founded", prefix: "" },
  { value: 38, suffix: "", label: "Complications Mastered" },
  { value: 9, suffix: "K", label: "Watches Made" },
  { value: 24, suffix: "", label: "Craftsmen" },
];

const CRAFTS = [
  { title: "Hand-Finishing", desc: "Every surface is hand-finished by a single artisan. Anglage, perlage, côtes de Genève — each taking between 4 and 14 hours." },
  { title: "In-House Movement", desc: "From raw metal to regulated calibre, our movements never leave the atelier. 387 individual components, all machined on-site." },
  { title: "Sapphire Crystal", desc: "Single-crystal sapphire grown and cut in our facility. Anti-reflective coating applied in 7 layers at sub-atomic thickness." },
];

const TESTIMONIALS = [
  { name: "Count H. Beaumont", text: "The Chrono Noir I is not a watch. It is a philosophy rendered tangible. I wear it to every state dinner.", role: "Collector, Paris" },
  { name: "Ms. Yuki Nishida", text: "I have worn twenty grands complications in my career. The Ultra Slim sits closest to skin and closest to perfection.", role: "Horological Journalist, Tokyo" },
  { name: "Mr. A. Rothbury", text: "What distinguishes Chrono Vaulted is the finish on unseen surfaces. Most houses do not bother. They do.", role: "Independent Watchmaker, Geneva" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      s += step;
      if (s >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function LuxuryHorologySPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActiveItem(p => (p - 1 + COLLECTION.length) % COLLECTION.length);
  const next = () => setActiveItem(p => (p + 1) % COLLECTION.length);
  const item = COLLECTION[activeItem];

  return (
    <div className="premium-theme bg-[#f9f7f4] text-[#1a1410] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-[#f9f7f4]/90 backdrop-blur-xl border-b border-[#1a1410]/8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.4em] text-[#8b7355]">Chrono Vaulted</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] opacity-40">
          {["Maison", "Collection", "Atelier", "Boutiques"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#8b7355]/40 text-[#8b7355] px-5 py-2 hover:bg-[#8b7355] hover:text-white transition-all">
            <Phone size={10} /> Bespoke Inquiry
          </a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><ShoppingBag size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#1a1410] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl uppercase tracking-tight">
              {["Maison", "Collection", "Atelier", "Boutiques", "Contact"].map(l => (
                <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#c9a96e] transition-colors">{l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop" alt="Luxury Watch" fill className="object-cover opacity-60" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-[#1a1410]/30 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-24 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-[10px] uppercase tracking-[0.6em] text-[#c9a96e]/70 mb-6">Haute Horlogerie — Since 1962</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-white text-[8vw] md:text-[6vw] leading-none tracking-tight mb-8">
            Time<br />
            <em>Perfected.</em>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-center gap-6">
            <a href="#collection" className="bg-[#c9a96e] text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-[#b8925a] transition-colors">Discover Collection</a>
            <a href="#" className="text-white/60 text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors">About the Maison</a>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#1a1410] py-4">
        <motion.div animate={{ x: [0, -3200] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.6em] text-[#c9a96e]/30 shrink-0">Tourbillon · Perpetual Calendar · Grand Complications · In-House Manufacture · Haute Horlogerie ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="bg-[#1a1410] text-white px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-5xl font-light tracking-tight text-[#c9a96e] mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/30">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* COLLECTION CAROUSEL */}
      <section id="collection" className="py-24">
        <Reveal className="px-8 md:px-16 mb-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#8b7355] mb-4">Current Collection</p>
          <h2 className="text-5xl md:text-7xl leading-none tracking-tight">New Arrivals</h2>
        </Reveal>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={activeItem} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-[70vh] bg-[#f0ece4]">
                <Image src={item.img} alt={item.name} fill className="object-cover" unoptimized />
                {item.limited && (
                  <div className="absolute top-6 left-6 bg-[#1a1410] text-[#c9a96e] text-[9px] uppercase tracking-widest px-3 py-1.5">
                    Limited Edition {item.limited}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center px-12 md:px-20 py-16 bg-[#f9f7f4]">
                <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b7355] mb-3">{item.category} — Ref. {item.ref}</p>
                <h3 className="text-4xl md:text-5xl leading-none tracking-tight mb-6">{item.name}</h3>
                <p className="text-[#8b7355]/80 leading-relaxed text-sm mb-8">{item.desc}</p>
                <div className="text-3xl text-[#1a1410] font-light mb-8">{item.price}</div>
                <div className="flex gap-4">
                  <a href="#" className="bg-[#1a1410] text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-[#2d2620] transition-colors flex items-center gap-2">
                    Inquire <ArrowRight size={12} />
                  </a>
                  <a href="#" className="border border-[#1a1410]/20 text-[#1a1410] px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:border-[#1a1410] transition-colors">
                    3D View
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between px-8 md:px-16 mt-8">
            <div className="flex gap-3">
              {COLLECTION.map((_, i) => (
                <button key={i} onClick={() => setActiveItem(i)} className={`w-8 h-1 rounded-full transition-all ${i === activeItem ? "bg-[#c9a96e]" : "bg-[#1a1410]/15"}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prev} className="w-10 h-10 border border-[#1a1410]/20 flex items-center justify-center hover:bg-[#1a1410] hover:text-white transition-all"><ChevronLeft size={16} /></button>
              <button onClick={next} className="w-10 h-10 border border-[#1a1410]/20 flex items-center justify-center hover:bg-[#1a1410] hover:text-white transition-all"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="bg-[#1a1410] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a96e]/50 mb-4">The Atelier</p>
          <h2 className="text-5xl md:text-6xl leading-none tracking-tight">Craftsmanship<br />
            <em className="text-[#c9a96e]">Without Compromise</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {CRAFTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="bg-[#1a1410] p-8 border-t border-[#c9a96e]/20">
              <div className="w-6 h-px bg-[#c9a96e] mb-6" />
              <h3 className="text-xl tracking-tight mb-4">{c.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <Crown size={20} className="text-[#c9a96e] mb-6" />
          <h2 className="text-5xl leading-none tracking-tight">Connoisseur<br />Voices</h2>
        </Reveal>
        <div className="relative min-h-[220px] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <div className="flex gap-1 mb-6">{Array(5).fill(null).map((_, i) => <Star key={i} size={12} fill="#c9a96e" className="text-[#c9a96e]" />)}</div>
              <p className="text-2xl font-light leading-relaxed text-[#4a3728] mb-8 italic">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <div>
                <p className="text-sm uppercase tracking-widest text-[#1a1410]">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-[#8b7355] text-xs mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-px rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-[#c9a96e]" : "w-3 bg-[#1a1410]/20"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1410] text-white px-8 md:px-16 py-28 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a96e]/50 mb-4">Private Consultation</p>
          <h2 className="text-5xl md:text-6xl leading-none tracking-tight">
            Commission<br />
            <em className="text-[#c9a96e]">Your Timepiece.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="shrink-0 flex flex-col gap-4">
          <a href="#" className="bg-[#c9a96e] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#b8925a] transition-colors text-center">Request Consultation</a>
          <a href="tel:+41227000000" className="flex items-center gap-2 text-[#c9a96e]/70 text-[10px] uppercase tracking-widest justify-center hover:text-[#c9a96e] transition-colors">
            <Phone size={10} /> +41 22 700 0000
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0c09] text-white/30 px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-[#c9a96e] uppercase tracking-[0.4em] text-sm mb-1">Chrono Vaulted</p>
          <p className="text-[9px] uppercase tracking-widest">Haute Horlogerie · Genève</p>
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest">
          {["Boutiques", "Press", "Heritage", "Legal"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] uppercase">© 2026 Chrono Vaulted SA</p>
      </footer>
    </div>
  );
}
