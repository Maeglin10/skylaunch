"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ShoppingCart, Plus, X, Menu, ChevronRight, Search, Minus, Star } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "MONOLITH CHAIR", price: 2850, tag: "Sculpture", img: "https://images.unsplash.com/photo-1592078615290-033ee584e226?q=80&w=1200&auto=format&fit=crop", desc: "Cast aluminum, hand-polished to a mirror finish. Form follows structural logic." },
  { id: 2, name: "VOID SHELF", price: 1640, tag: "Storage", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop", desc: "Blackened steel. Three cantilever arms project from a single wall anchor." },
  { id: 3, name: "STRATUM LAMP", price: 980, tag: "Lighting", img: "https://images.unsplash.com/photo-1513506003901-1e6a35f8b12b?q=80&w=1000&auto=format&fit=crop", desc: "Stacked travertine discs with hidden LED edge lighting. Dimmable via touch." },
  { id: 4, name: "PLINTH TABLE", price: 3200, tag: "Furniture", img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1000&auto=format&fit=crop", desc: "Solid marble slab. Monolithic base. Nothing is bolted — gravity does the work." },
  { id: 5, name: "MEMBRANE DIVIDER", price: 4100, tag: "Spatial", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop", desc: "Tensile steel mesh stretched between two titanium arches. 2.4m tall." },
  { id: 6, name: "AXIS VASE", price: 480, tag: "Object", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop", desc: "Turned black ceramic. Off-center axis creates visual instability at rest." },
];

const TAGS = ["All", "Sculpture", "Storage", "Lighting", "Furniture", "Spatial", "Object"];

const STATS = [
  { value: 34, suffix: "", label: "Objects in Collection" },
  { value: 8, suffix: "yrs", label: "Practice" },
  { value: 12, suffix: "", label: "Materials Mastered" },
  { value: 200, suffix: "+", label: "Private Commissions" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
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

export default function MinimalistObjectSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const filtered = activeTag === "All" ? PRODUCTS : PRODUCTS.filter(p => p.tag === activeTag);

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
    setCartOpen(true);
  };

  const cartItems = cart.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean);
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="premium-theme bg-white text-[#111] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-white/90 backdrop-blur-xl border-b border-[#111]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-black uppercase tracking-[0.35em]">FORMA STUDIO</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] opacity-40">
          {["Objects", "Materials", "Commission", "About"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block opacity-40 hover:opacity-100 transition-opacity"><Search size={16} /></button>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-1.5 text-[10px] uppercase tracking-widest">
            <ShoppingCart size={16} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#111] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
            )}
          </button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[100] bg-[#111] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase">
              {["Objects", "Materials", "Commission", "About"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/30" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.35 }} className="fixed top-0 right-0 h-full w-full max-w-sm z-[91] bg-white flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#111]/8">
                <p className="font-black uppercase tracking-widest text-sm">Cart ({cart.length})</p>
                <button onClick={() => setCartOpen(false)}><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-[#111]/40 mt-4">Your cart is empty.</p>
                ) : cartItems.map((p, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 h-16 shrink-0 overflow-hidden bg-[#f5f5f5]">
                      <Image src={p.img} alt={p.name} width={64} height={64} className="object-cover w-full h-full" unoptimized />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-xs uppercase tracking-tight">{p.name}</p>
                      <p className="text-xs text-[#111]/40 mt-0.5">{p.tag}</p>
                      <p className="text-sm font-black mt-1">€{p.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-[#111]/8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm uppercase tracking-widest opacity-50">Total</span>
                    <span className="font-black text-xl">€{cartTotal.toLocaleString()}</span>
                  </div>
                  <a href="#" className="block w-full bg-[#111] text-white text-center py-3 text-[10px] uppercase tracking-widest hover:bg-[#333] transition-colors">Proceed to Checkout</a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#111]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-733852?w=800&q=80" alt="Minimalist Objects" fill className="object-cover opacity-60" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-6">Objects of Radical Simplicity</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }} className="text-white text-[9vw] md:text-[6vw] font-black uppercase leading-none tracking-tighter mb-8">
            Less is<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Everything</span>
          </motion.h1>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} href="#objects" className="inline-flex items-center gap-2 text-white border border-white/30 px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#111] transition-all">
            Browse Objects <ArrowRight size={12} />
          </motion.a>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#f5f5f5] py-4 border-y border-[#111]/6">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-[#111]/30 shrink-0">Material Honesty · Structural Minimalism · Radical Reduction · Objects That Last ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="bg-[#111] text-white px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-[#111] p-10 text-center">
            <div className="text-5xl font-black tracking-tighter text-white mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* PRODUCTS */}
      <section id="objects" className="px-8 md:px-16 py-24">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-3">The Collection</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Objects</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {TAGS.map(t => (
              <button key={t} onClick={() => setActiveTag(t)} className={`text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${activeTag === t ? "bg-[#111] text-white border-[#111]" : "border-[#111]/15 hover:border-[#111]/40"}`}>{t}</button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={activeTag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <motion.div className="group" whileHover={{ y: -4 }}>
                  <div className="relative overflow-hidden bg-[#f5f5f5] mb-4 cursor-pointer" style={{ height: "55vh" }} onClick={() => setQuickView(p.id)}>
                    <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                    <div className="absolute inset-0 bg-[#111]/0 group-hover:bg-[#111]/20 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white text-[#111] text-[9px] uppercase tracking-widest px-5 py-2 font-black">Quick View</div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-[#111] text-[9px] uppercase tracking-widest px-2 py-1">{p.tag}</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-black text-base uppercase tracking-tight">{p.name}</p>
                      <p className="text-sm text-[#111]/40 mt-0.5">{p.desc.slice(0, 48)}…</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-black text-lg">€{p.price.toLocaleString()}</p>
                      <button onClick={() => addToCart(p.id)} className="bg-[#111] text-white p-2 hover:bg-[#333] transition-colors"><Plus size={14} /></button>
                    </div>
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
          const p = PRODUCTS.find(x => x.id === quickView)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-8" onClick={() => setQuickView(null)}>
              <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} className="bg-white max-w-3xl w-full grid md:grid-cols-2" onClick={e => e.stopPropagation()}>
                <div className="relative h-72 md:h-auto bg-[#f5f5f5]">
                  <Image src={p.img} alt={p.name} fill className="object-cover" unoptimized />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest bg-[#f5f5f5] text-[#111]/50 px-2 py-1 mb-4 inline-block">{p.tag}</span>
                    <h3 className="font-black text-3xl uppercase tracking-tight mb-3">{p.name}</h3>
                    <p className="text-[#111]/50 text-sm leading-relaxed mb-6">{p.desc}</p>
                    <div className="flex gap-1 mb-6">{Array(5).fill(null).map((_, i) => <Star key={i} size={12} fill="#111" className="text-[#111]" />)}</div>
                  </div>
                  <div>
                    <p className="font-black text-3xl mb-6">€{p.price.toLocaleString()}</p>
                    <button onClick={() => { addToCart(p.id); setQuickView(null); }} className="w-full bg-[#111] text-white py-3 text-[10px] uppercase tracking-widest hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
                      Add to Cart <ShoppingCart size={12} />
                    </button>
                  </div>
                </div>
                <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 text-[#111]/50 hover:text-[#111] transition-colors"><X size={18} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* MANIFESTO */}
      <section className="bg-[#111] text-white px-8 md:px-16 py-28">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">Our Philosophy</p>
          <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-white/80">
            "We do not add detail to justify a price. We remove everything until the object cannot be reduced further. Then we stop."
          </blockquote>
          <div className="w-12 h-px bg-white/20 mx-auto mt-10" />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-28 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6">Bespoke Objects</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-10">
            Commission<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #111" }}>Yours.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-[#111] text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:bg-[#333] transition-colors inline-flex items-center gap-3">
            Start a Commission <ArrowRight size={14} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] text-white px-8 md:px-16 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/5">
        <div>
          <p className="font-black text-base uppercase tracking-[0.25em] mb-1">FORMA STUDIO</p>
          <p className="text-xs text-white/30">Objects of Radical Simplicity</p>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["Instagram", "Shop", "Press", "Stockists"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 Forma Studio</p>
      </footer>
    </div>
  );
}
