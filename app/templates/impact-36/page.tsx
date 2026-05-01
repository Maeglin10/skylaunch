"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, ShoppingBag, Star, Leaf, Droplets, Flame, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import "../premium.css";

const PIECES = [
  { id: 1, name: "Coupelle Vide", price: "€380", clay: "Stoneware", finish: "Raw matte", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop", desc: "A single thrown form, unglazed. The thumb marks of the maker remain visible at the base." },
  { id: 2, name: "Vase Colonne", price: "€620", clay: "Porcelain", finish: "Crackle celadon", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop", desc: "Wheel-thrown and stretched by hand. Each crackle in the glaze is unique and irreproducible." },
  { id: 3, name: "Bol Cendré", price: "€280", clay: "Raku", finish: "Carbon smoked", img: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?q=80&w=1000&auto=format&fit=crop", desc: "Raku-fired in a reduction atmosphere. Carbon deposits create a unique surface that evolves with use." },
  { id: 4, name: "Assiette Terrain", price: "€240", clay: "Earthenware", finish: "Oxide wash", img: "https://images.unsplash.com/photo-1558618047-f4fd15a54e2c?q=80&w=1000&auto=format&fit=crop", desc: "Hand-built from local earthenware clay. Iron oxide wash reveals texture on each piece." },
  { id: 5, name: "Pichet Noir", price: "€450", clay: "Stoneware", finish: "Ash glaze", img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4084?q=80&w=1000&auto=format&fit=crop", desc: "Wood-fired for 48 hours. The natural ash glaze creates patterns that cannot be replicated." },
  { id: 6, name: "Tasse Minérale", price: "€195", clay: "Porcelain", finish: "Shino", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop", desc: "Hand-thrown porcelain cup. Shino glaze develops pinholes during firing — each one intentional." },
];

const PROCESS = [
  { icon: Droplets, title: "Throwing", desc: "Each piece begins on the wheel. Clay from three regions, chosen for specific properties." },
  { icon: Flame, title: "Firing", desc: "Wood-fired kiln at 1280°C. A 48-hour process we cannot fully control — which is the point." },
  { icon: Leaf, title: "Glazing", desc: "Natural ash glazes, oxide washes, and unglazed surfaces. Nothing synthetic enters our kiln." },
];

const TESTIMONIALS = [
  { name: "Maria S.", text: "The Coupelle Vide lives on my desk. Every morning it changes slightly — the light, the shadow, the mood. It is the most alive object I own.", rating: 5 },
  { name: "T. Nakamura", text: "I have collected ceramics for 20 years. This work has the quietness of the best Japanese pieces — without imitation.", rating: 5 },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function CeramicsAtelierSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePiece, setActivePiece] = useState<number | null>(null);
  const [cart, setCart] = useState<number[]>([]);
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
    <div className="premium-theme bg-[#f6f2ec] text-[#1e1a14] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#f6f2ec]/90 backdrop-blur-xl border-b border-[#1e1a14]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base uppercase tracking-[0.5em] text-[#8b6b4a]">ARGILE</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.4em] opacity-40" style={{ fontFamily: "sans-serif" }}>
          {["Collection", "Process", "Atelier", "Bespoke"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <ShoppingBag size={16} className="text-[#8b6b4a]/60" />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#8b6b4a] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">{cart.length}</span>}
          </button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[100] bg-[#1e1a14] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl uppercase">
              {["Collection", "Process", "Atelier", "Bespoke"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#e8e0d5]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-196645?w=800&q=80" alt="Ceramics" fill className="object-cover opacity-60" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a14]/80 via-transparent to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[9px] uppercase tracking-[0.6em] text-white/40 mb-5" style={{ fontFamily: "sans-serif" }}>Céramique Artisanale · Atelier Rural · Bourgogne</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="text-white text-6xl md:text-[8vw] leading-none mb-6">
            Form<br />Follows<br /><em>Fire.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-white/50 max-w-sm text-sm leading-relaxed mb-8" style={{ fontFamily: "sans-serif" }}>
            Handmade ceramics from a wood-fired kiln in rural Burgundy. Every piece unique — intentionally so.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} href="#collection" className="inline-block bg-white text-[#1e1a14] px-8 py-3 text-[10px] uppercase tracking-[0.3em] hover:bg-white/90 transition-colors" style={{ fontFamily: "sans-serif" }}>
            Browse Collection
          </motion.a>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#1e1a14] py-3.5">
        <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.5em] text-white/20 shrink-0" style={{ fontFamily: "sans-serif" }}>Wood-Fired · Stoneware · Porcelain · Raku · Natural Glazes · Burgundy ·</span>
          ))}
        </motion.div>
      </div>

      {/* COLLECTION */}
      <section id="collection" className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b6b4a] mb-4" style={{ fontFamily: "sans-serif" }}>The Collection</p>
          <h2 className="text-5xl md:text-6xl leading-none tracking-tight">Current<br />Pieces</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PIECES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <motion.div className="group cursor-pointer" whileHover={{ y: -5 }} onClick={() => setActivePiece(p.id)}>
                <div className="relative overflow-hidden bg-[#ede8e0] mb-5" style={{ height: "55vh" }}>
                  <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white text-[9px] uppercase tracking-widest px-5 py-2" style={{ fontFamily: "sans-serif" }}>View Details</div>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl leading-tight mb-1">{p.name}</h3>
                    <p className="text-[9px] text-[#1e1a14]/40 uppercase tracking-widest" style={{ fontFamily: "sans-serif" }}>{p.clay} · {p.finish}</p>
                  </div>
                  <p className="font-bold text-[#8b6b4a]" style={{ fontFamily: "sans-serif" }}>{p.price}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PIECE MODAL */}
      <AnimatePresence>
        {activePiece !== null && (() => {
          const p = PIECES.find(x => x.id === activePiece)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-8" onClick={() => setActivePiece(null)}>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-[#f6f2ec] max-w-3xl w-full grid md:grid-cols-2" onClick={e => e.stopPropagation()}>
                <div className="relative h-72 md:h-auto">
                  <Image src={p.img} alt={p.name} fill className="object-cover" unoptimized />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#8b6b4a] mb-2" style={{ fontFamily: "sans-serif" }}>{p.clay} · {p.finish}</p>
                    <h3 className="text-3xl leading-tight mb-3">{p.name}</h3>
                    <p className="text-sm text-[#1e1a14]/50 leading-relaxed mb-6" style={{ fontFamily: "sans-serif" }}>{p.desc}</p>
                  </div>
                  <div>
                    <p className="text-2xl text-[#8b6b4a] font-bold mb-5" style={{ fontFamily: "sans-serif" }}>{p.price}</p>
                    <button onClick={() => { setCart(c => [...c, p.id]); setActivePiece(null); }} className="w-full bg-[#1e1a14] text-white py-3 text-[10px] uppercase tracking-widest hover:bg-[#2d2820] transition-colors flex items-center justify-center gap-2" style={{ fontFamily: "sans-serif" }}>
                      Add to Bag <ShoppingBag size={12} />
                    </button>
                    <p className="text-[9px] text-[#1e1a14]/30 text-center mt-3" style={{ fontFamily: "sans-serif" }}>One of a kind. Once sold, gone.</p>
                  </div>
                </div>
                <button onClick={() => setActivePiece(null)} className="absolute top-4 right-4 text-[#1e1a14]/40 hover:text-[#1e1a14]"><X size={16} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* PROCESS */}
      <section className="bg-[#1e1a14] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-14">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a96e]/50 mb-4" style={{ fontFamily: "sans-serif" }}>How Each Piece is Made</p>
          <h2 className="text-4xl md:text-5xl leading-tight">The<br />Process</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="bg-[#1e1a14] p-8 border-t-2 border-[#c9a96e]/20">
              <p.icon size={20} className="text-[#c9a96e]/40 mb-5" />
              <h3 className="text-xl mb-3">{p.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-10">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b6b4a] mb-4" style={{ fontFamily: "sans-serif" }}>Collectors</p>
          <h2 className="text-4xl leading-tight">What They<br />Hold</h2>
        </Reveal>
        <div className="relative min-h-[160px] max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <div className="flex gap-1 mb-5">{Array(TESTIMONIALS[activeTestimonial].rating).fill(null).map((_, i) => <Star key={i} size={11} fill="#8b6b4a" className="text-[#8b6b4a]" />)}</div>
              <p className="text-xl leading-relaxed text-[#1e1a14]/60 mb-5">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <p className="text-[9px] uppercase tracking-widest text-[#8b6b4a]" style={{ fontFamily: "sans-serif" }}>— {TESTIMONIALS[activeTestimonial].name}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-px rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-[#8b6b4a]" : "w-3 bg-[#1e1a14]/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e8e0d5] px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b6b4a] mb-4" style={{ fontFamily: "sans-serif" }}>Commission a Piece</p>
          <h2 className="text-5xl leading-none tracking-tight">Something<br /><em>Made for You.</em></h2>
          <p className="text-sm text-[#1e1a14]/50 mt-4 max-w-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>Bespoke commissions accepted twice yearly. 12-week minimum lead time.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-[#1e1a14] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#2d2820] transition-colors inline-flex items-center gap-2" style={{ fontFamily: "sans-serif" }}>
            Enquire About Commission <ArrowRight size={12} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1e1a14] text-white px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-[#c9a96e] uppercase tracking-[0.5em] text-sm mb-1">ARGILE</p>
          <p className="text-[9px] text-white/30" style={{ fontFamily: "sans-serif" }}>Céramique · Bourgogne, France</p>
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30" style={{ fontFamily: "sans-serif" }}>
          {["Instagram", "Shop", "Commission", "Contact"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase" style={{ fontFamily: "sans-serif" }}>© 2026 Argile</p>
      </footer>
    </div>
  );
}
