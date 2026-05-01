"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, X, Menu, ArrowRight, Star, ChevronLeft, ChevronRight, Plus, Minus, Leaf, Droplets, Wind } from "lucide-react";
import "../premium.css";

const FRAGRANCES = [
  { id: 1, name: "VIDE", subtitle: "Eau de Parfum", price: "€320", notes: ["White Musk", "Vetiver", "Iso E Super"], family: "Woody", intensity: "Silage", img: "https://images.unsplash.com/photo-1541643600914-78b084683702?q=80&w=1200&auto=format&fit=crop", desc: "The scent of a room just vacated by someone who left a lasting impression. Quiet, luminous, and unsettling." },
  { id: 2, name: "OBSIDIAN", subtitle: "Parfum Extrait", price: "€490", notes: ["Oud", "Black Pepper", "Labdanum", "Smoke"], family: "Oriental", intensity: "Sillage", img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop", desc: "Volcanic stone ground at midnight. Dense, geological, unrepeatable." },
  { id: 3, name: "SALINE", subtitle: "Eau de Parfum", price: "€280", notes: ["Sea Salt", "Ambergris", "Skin", "Driftwood"], family: "Aquatic", intensity: "Moderate", img: "https://images.unsplash.com/photo-1547005327-834182f8e05a?q=80&w=1200&auto=format&fit=crop", desc: "The coast in January, stripped of any romance. Pure and cold and honest." },
  { id: 4, name: "TERRE ROUGE", subtitle: "Eau de Parfum", price: "€340", notes: ["Red Clay", "Geranium", "Patchouli", "Cedar"], family: "Earthy", intensity: "Moderate", img: "https://images.unsplash.com/photo-1457301353672-324d6d14f471?q=80&w=1200&auto=format&fit=crop", desc: "Rain on sun-baked laterite. The fragrance of memory displaced in space." },
];

const TESTIMONIALS = [
  { name: "Amélie R.", text: "VIDE is the first perfume I've worn that people ask me not to name. They want it to stay mysterious.", rating: 5 },
  { name: "S. Beaumont", text: "OBSIDIAN changed my relationship with fragrance. It's not decorative — it's a statement of presence.", rating: 5 },
  { name: "Yuki N.", text: "The packaging alone would justify the price. But the SALINE is extraordinary — like wearing winter.", rating: 5 },
];

const NOTE_ICONS: Record<string, typeof Leaf> = { Woody: Leaf, Aquatic: Droplets, Oriental: Wind, Earthy: Leaf };

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function GlassFragranceSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFragrance, setActiveFragrance] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartFlash, setCartFlash] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const f = FRAGRANCES[activeFragrance];

  const addToCart = () => {
    setCartCount(n => n + 1);
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 800);
  };

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="premium-theme bg-[#fdfcfb] text-[#1a1410] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#fdfcfb]/90 backdrop-blur-xl border-b border-[#1a1410]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.5em] text-[#8b7355]">VIDE PARFUMS</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.4em] opacity-40" style={{ fontFamily: "sans-serif" }}>
          {["Collection", "Ingredients", "Philosophy", "Boutiques"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <motion.button onClick={addToCart} animate={cartFlash ? { scale: [1, 1.2, 1] } : {}} className="relative" style={{ fontFamily: "sans-serif" }}>
            <ShoppingBag size={18} className="text-[#1a1410]/60" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#8b7355] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </motion.button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "tween", duration: 0.35 }} className="fixed inset-0 z-[100] bg-[#1a1410] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl uppercase">
              {["Collection", "Ingredients", "Philosophy", "Boutiques", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#f0ece5]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeFragrance} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute inset-0">
              <Image src={f.img} alt={f.name} fill className="object-cover opacity-50" unoptimized />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/80 via-transparent to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 w-full flex flex-col md:flex-row items-end gap-8">
          <div className="flex-1">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[9px] uppercase tracking-[0.6em] text-white/40 mb-4" style={{ fontFamily: "sans-serif" }}>
              {f.family} · {f.intensity}
            </motion.p>
            <motion.h1 key={`h-${activeFragrance}`} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="text-white text-7xl md:text-[9vw] leading-none mb-4">{f.name}</motion.h1>
            <motion.p key={`s-${activeFragrance}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 text-sm max-w-sm leading-relaxed mb-6">{f.desc}</motion.p>
            <div className="flex gap-3">
              <motion.button key={`b-${activeFragrance}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} onClick={addToCart} className="bg-white text-[#1a1410] px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white/90 transition-colors" style={{ fontFamily: "sans-serif" }}>
                Add to Cart — {f.price}
              </motion.button>
            </div>
          </div>
          {/* Fragrance selector */}
          <div className="flex md:flex-col gap-3">
            {FRAGRANCES.map((fr, i) => (
              <button key={fr.id} onClick={() => setActiveFragrance(i)} className={`w-10 h-10 overflow-hidden border-2 transition-all ${i === activeFragrance ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}>
                <Image src={fr.img} alt={fr.name} width={40} height={40} className="object-cover w-full h-full" unoptimized />
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#1a1410] py-3.5">
        <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.5em] text-white/20 shrink-0" style={{ fontFamily: "sans-serif" }}>Niche Perfumery · Natural Ingredients · Unisex · Cruelty-Free · Paris ·</span>
          ))}
        </motion.div>
      </div>

      {/* COLLECTION GRID */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b7355] mb-4" style={{ fontFamily: "sans-serif" }}>The Collection</p>
          <h2 className="text-5xl md:text-6xl leading-none tracking-tight">Four Compositions</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FRAGRANCES.map((fr, i) => {
            const Icon = NOTE_ICONS[fr.family] || Leaf;
            return (
              <Reveal key={fr.id} delay={i * 0.08}>
                <motion.div className="group cursor-pointer" whileHover={{ y: -6 }} onClick={() => setActiveFragrance(i)}>
                  <div className="relative overflow-hidden bg-[#f0ece5] mb-5" style={{ height: "50vh" }}>
                    <Image src={fr.img} alt={fr.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                    {activeFragrance === i && <div className="absolute inset-0 ring-2 ring-inset ring-[#8b7355]/50" />}
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-[#8b7355] mb-1" style={{ fontFamily: "sans-serif" }}>{fr.subtitle}</p>
                      <h3 className="text-2xl leading-none tracking-tight">{fr.name}</h3>
                    </div>
                    <p className="text-[#1a1410] font-bold text-sm" style={{ fontFamily: "sans-serif" }}>{fr.price}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon size={10} className="text-[#8b7355]" />
                    <p className="text-[9px] text-[#1a1410]/40 uppercase tracking-widest" style={{ fontFamily: "sans-serif" }}>{fr.notes.join(" · ")}</p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-[#1a1410] text-white px-8 md:px-16 py-28 flex flex-col md:flex-row gap-16 items-start">
        <Reveal className="md:w-1/2">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b7355] mb-6" style={{ fontFamily: "sans-serif" }}>Our Approach</p>
          <h2 className="text-5xl leading-tight mb-8">Fragrance as<br />Negative Space</h2>
          <p className="text-white/50 leading-relaxed text-sm mb-6">
            We do not build perfumes toward a goal. We remove — accord by accord — until only the essential remains. Like a sentence rewritten until it cannot lose a single word.
          </p>
          <p className="text-white/50 leading-relaxed text-sm">
            Every ingredient is ethically sourced, every extraction process documented. We believe transparency is not a marketing term but an obligation.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="md:w-1/2 relative h-80 md:h-auto">
          <div className="relative w-full" style={{ height: "60vh" }}>
            <Image src="https://images.unsplash.com/photo-1536523?w=800&q=80" alt="Atelier" fill className="object-cover opacity-40" unoptimized />
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b7355] mb-4" style={{ fontFamily: "sans-serif" }}>Wearers</p>
          <h2 className="text-5xl leading-none tracking-tight">Voices</h2>
        </Reveal>
        <div className="relative min-h-[180px] max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <div className="flex gap-1 mb-5">{Array(TESTIMONIALS[activeTestimonial].rating).fill(null).map((_, i) => <Star key={i} size={12} fill="#8b7355" className="text-[#8b7355]" />)}</div>
              <p className="text-xl leading-relaxed text-[#1a1410]/70 mb-6">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <p className="text-[9px] uppercase tracking-widest text-[#8b7355]" style={{ fontFamily: "sans-serif" }}>— {TESTIMONIALS[activeTestimonial].name}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-px rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-[#8b7355]" : "w-3 bg-[#1a1410]/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f0ece5] px-8 md:px-16 py-24 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[9px] uppercase tracking-[0.6em] text-[#8b7355] mb-6" style={{ fontFamily: "sans-serif" }}>Free Sample Program</p>
          <h2 className="text-5xl md:text-6xl leading-none tracking-tight mb-4">Discover<br /><em>Your Vide.</em></h2>
          <p className="text-[#1a1410]/50 text-sm leading-relaxed max-w-sm mb-8" style={{ fontFamily: "sans-serif" }}>Order a discovery set of all four compositions. €48 — credited to your first full bottle.</p>
          <a href="#" className="bg-[#1a1410] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#2d2620] transition-colors inline-flex items-center gap-2" style={{ fontFamily: "sans-serif" }}>
            Order Discovery Set <ArrowRight size={12} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1410] text-white px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-[#c9a96e] uppercase tracking-[0.4em] text-sm mb-1">VIDE PARFUMS</p>
          <p className="text-[9px] uppercase tracking-widest text-white/30" style={{ fontFamily: "sans-serif" }}>Niche Perfumery · Paris</p>
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30" style={{ fontFamily: "sans-serif" }}>
          {["Instagram", "Boutiques", "Press", "Wholesale"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase" style={{ fontFamily: "sans-serif" }}>© 2026 Vide Parfums SAS</p>
      </footer>
    </div>
  );
}
