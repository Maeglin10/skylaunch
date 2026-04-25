"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Star, Clock, Flame, Leaf, ChevronLeft, ChevronRight, ShoppingCart, Plus, Check } from "lucide-react";
import "../premium.css";

const MENU_CATEGORIES = ["All", "Signatures", "Seasonal", "Vegan", "Desserts"];

const DISHES = [
  { id: 1, name: "Fumée Noire", cat: "Signatures", price: "€38", time: "25 min", heat: 2, img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200&auto=format&fit=crop", desc: "Charred octopus, squid ink emulsion, preserved lemon, crispy shallots.", tags: ["Signature", "Gluten-Free"] },
  { id: 2, name: "Terre Rouge", cat: "Seasonal", price: "€29", time: "18 min", heat: 1, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop", desc: "Heirloom beets three ways, whipped chèvre, walnut praline, bitter greens.", tags: ["Vegan", "Seasonal"] },
  { id: 3, name: "Beurre Blanc Moderne", cat: "Signatures", price: "€44", time: "30 min", heat: 0, img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop", desc: "Pan-seared halibut, saffron beurre blanc, sea vegetables, crispy capers.", tags: ["Signature", "Pescatarian"] },
  { id: 4, name: "Forêt Noire Revisitée", cat: "Desserts", price: "€19", time: "10 min", heat: 0, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop", desc: "Valrhona mousse, wild cherry compote, kirsch cream, crystallized violets.", tags: ["Vegetarian", "Dessert"] },
  { id: 5, name: "Risotto Carbone", cat: "Signatures", price: "€32", time: "22 min", heat: 1, img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000&auto=format&fit=crop", desc: "Activated charcoal risotto, truffle pecorino, black garlic, aged parmesan.", tags: ["Vegetarian"] },
  { id: 6, name: "Cèdre & Champignons", cat: "Vegan", price: "€28", time: "20 min", heat: 2, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop", desc: "Wild mushroom tart, cedar smoke infusion, pine nut crème, truffle oil.", tags: ["Vegan", "Gluten-Free"] },
];

const STATS = [
  { value: 2, suffix: "★", label: "Michelin Stars" },
  { value: 14, suffix: "yrs", label: "Since Opening" },
  { value: 48, suffix: "", label: "Covers per Evening" },
  { value: 4, suffix: "", label: "Menus" },
];

const TESTIMONIALS = [
  { name: "Gault & Millau", text: "An experience of rare coherence. Each dish is a complete thought, never decoration for its own sake.", rating: 5 },
  { name: "Le Monde", text: "Chef Vidal has found a register entirely her own — modern without fashion, rooted without nostalgia.", rating: 5 },
  { name: "Financial Times", text: "The most technically accomplished tasting menu in Paris. The halibut alone justifies the booking.", rating: 5 },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
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

export default function FoodLiquidMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [quickView, setQuickView] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const filtered = activeCategory === "All" ? DISHES : DISHES.filter(d => d.cat === activeCategory);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="premium-theme bg-[#faf8f5] text-[#1c1410] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#faf8f5]/90 backdrop-blur-xl border-b border-[#1c1410]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base uppercase tracking-[0.4em] text-[#8b5a2b]">ATELIER VIDAL</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.4em] opacity-40" style={{ fontFamily: "sans-serif" }}>
          {["Menu", "Chefs Table", "Wine", "Reservations"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="relative" onClick={() => {}}>
            <ShoppingCart size={16} className="text-[#8b5a2b]/60" style={{ fontFamily: "sans-serif" }} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#8b5a2b] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">{cart.length}</span>}
          </button>
          <a href="#" className="hidden md:block text-[9px] uppercase tracking-[0.3em] bg-[#1c1410] text-white px-5 py-2 hover:bg-[#2d2620] transition-colors" style={{ fontFamily: "sans-serif" }}>Book a Table</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "tween", duration: 0.35 }} className="fixed inset-0 z-[100] bg-[#1c1410] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl uppercase">
              {["Menu", "Chef's Table", "Wine", "Reservations"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2000&auto=format&fit=crop" alt="Restaurant" fill className="object-cover opacity-70" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1410]/95 via-[#1c1410]/20 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 mb-4">
            {Array(2).fill(null).map((_, i) => <Star key={i} size={14} fill="#d4af37" className="text-[#d4af37]" />)}
            <span className="text-[9px] uppercase tracking-widest text-[#d4af37]/80 ml-1" style={{ fontFamily: "sans-serif" }}>Michelin Guide 2026</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="text-white text-6xl md:text-[7vw] leading-none mb-6">Atelier<br /><em>Vidal.</em></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-white/50 text-sm max-w-md leading-relaxed mb-8" style={{ fontFamily: "sans-serif" }}>
            A 48-seat kitchen in the 6th arrondissement where modern French technique meets seasonal honesty.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} href="#" className="inline-block bg-white text-[#1c1410] px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-white/90 transition-colors" style={{ fontFamily: "sans-serif" }}>
            Reserve a Table
          </motion.a>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#1c1410] py-3.5">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.5em] text-white/20 shrink-0" style={{ fontFamily: "sans-serif" }}>Seasonal · Local · Sustainable · ★★ Michelin · Paris 6ème ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="bg-[#1c1410] text-white px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-5xl text-[#d4af37] mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/30" style={{ fontFamily: "sans-serif" }}>{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* MENU */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-10">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b5a2b] mb-4" style={{ fontFamily: "sans-serif" }}>Our Dishes</p>
          <h2 className="text-5xl md:text-6xl leading-none tracking-tight">The Menu</h2>
        </Reveal>
        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {MENU_CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className={`shrink-0 text-[9px] uppercase tracking-widest px-5 py-2 border transition-all ${activeCategory === c ? "bg-[#1c1410] text-white border-[#1c1410]" : "border-[#1c1410]/15 hover:border-[#1c1410]/40"}`} style={{ fontFamily: "sans-serif" }}>
              {c}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.07}>
                <motion.div className="group cursor-pointer" whileHover={{ y: -4 }} onClick={() => setQuickView(d.id)}>
                  <div className="relative overflow-hidden bg-[#f0ece5] mb-4" style={{ height: "42vh" }}>
                    <Image src={d.img} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1c1410]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs" style={{ fontFamily: "sans-serif" }}>{d.desc.slice(0, 60)}…</p>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1">
                      {d.tags.map(t => <span key={t} className="text-[8px] bg-white/90 text-[#1c1410]/70 px-2 py-0.5 uppercase tracking-widest" style={{ fontFamily: "sans-serif" }}>{t}</span>)}
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl leading-tight mb-1">{d.name}</h3>
                      <div className="flex items-center gap-3 text-[9px] text-[#1c1410]/40" style={{ fontFamily: "sans-serif" }}>
                        <span className="flex items-center gap-1"><Clock size={9} /> {d.time}</span>
                        <span className="flex items-center gap-1">
                          {Array(d.heat).fill(null).map((_, i) => <Flame key={i} size={9} className="text-red-500" />)}
                        </span>
                        {d.tags.includes("Vegan") && <Leaf size={9} className="text-green-600" />}
                      </div>
                    </div>
                    <span className="font-bold text-[#8b5a2b]" style={{ fontFamily: "sans-serif" }}>{d.price}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickView !== null && (() => {
          const d = DISHES.find(x => x.id === quickView)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-8" onClick={() => setQuickView(null)}>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-[#faf8f5] max-w-2xl w-full grid md:grid-cols-2" onClick={e => e.stopPropagation()}>
                <div className="relative h-64 md:h-auto">
                  <Image src={d.img} alt={d.name} fill className="object-cover" unoptimized />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {d.tags.map(t => <span key={t} className="text-[8px] bg-[#1c1410]/8 text-[#1c1410]/50 px-2 py-1 uppercase tracking-widest" style={{ fontFamily: "sans-serif" }}>{t}</span>)}
                    </div>
                    <h3 className="text-3xl leading-tight mb-3">{d.name}</h3>
                    <p className="text-sm text-[#1c1410]/50 leading-relaxed mb-4" style={{ fontFamily: "sans-serif" }}>{d.desc}</p>
                    <div className="flex items-center gap-4 text-[9px] text-[#1c1410]/40 mb-6" style={{ fontFamily: "sans-serif" }}>
                      <span className="flex items-center gap-1"><Clock size={9} /> {d.time}</span>
                      <span className="text-[#8b5a2b] font-bold text-base">{d.price}</span>
                    </div>
                  </div>
                  <a href="#" className="bg-[#1c1410] text-white px-6 py-3 text-[10px] uppercase tracking-widest text-center hover:bg-[#2d2620] transition-colors" style={{ fontFamily: "sans-serif" }}>
                    Reserve to Experience
                  </a>
                </div>
                <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 text-[#1c1410]/40 hover:text-[#1c1410]"><X size={16} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* PRESS */}
      <section className="bg-[#1c1410] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-10">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#d4af37]/50 mb-4" style={{ fontFamily: "sans-serif" }}>Press & Critics</p>
          <h2 className="text-4xl leading-tight">What They<br />Write</h2>
        </Reveal>
        <div className="relative min-h-[180px] max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <div className="flex gap-1 mb-5">{Array(TESTIMONIALS[activeTestimonial].rating).fill(null).map((_, i) => <Star key={i} size={12} fill="#d4af37" className="text-[#d4af37]" />)}</div>
              <p className="text-xl leading-relaxed text-white/60 mb-5">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <p className="text-[9px] uppercase tracking-widest text-[#d4af37]/60" style={{ fontFamily: "sans-serif" }}>— {TESTIMONIALS[activeTestimonial].name}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-px rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-[#d4af37]" : "w-3 bg-white/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b5a2b] mb-4" style={{ fontFamily: "sans-serif" }}>An Evening at Atelier Vidal</p>
          <h2 className="text-5xl leading-none tracking-tight">Reserve<br /><em>Your Table.</em></h2>
          <p className="text-sm text-[#1c1410]/50 mt-4 max-w-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>48 covers. Tuesday through Saturday. Sittings at 19h00 and 21h30.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-[#1c1410] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#2d2620] transition-colors inline-flex items-center gap-2" style={{ fontFamily: "sans-serif" }}>
            Book Online <ArrowRight size={12} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1c1410] text-white px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-[#d4af37] uppercase tracking-[0.4em] text-sm mb-1">Atelier Vidal</p>
          <p className="text-[9px] text-white/30" style={{ fontFamily: "sans-serif" }}>12 Rue des Arts, Paris 75006</p>
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30" style={{ fontFamily: "sans-serif" }}>
          {["Reservations", "Gift Cards", "Events", "Contact"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase" style={{ fontFamily: "sans-serif" }}>© 2026 Atelier Vidal</p>
      </footer>
    </div>
  );
}
