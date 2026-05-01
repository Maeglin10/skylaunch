"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Camera, Aperture, Sun, Zap, Eye, Award, Star, ShoppingCart } from "lucide-react";

const PRODUCTS = [
  { id: "p1", name: "APEX PRO X1", type: "Mirrorless Full-Frame", sensor: "61MP BSI-CMOS", iso: "50–819200", price: "$4,299", badge: "NEW", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", color: "#f59e0b" },
  { id: "p2", name: "SWIFT 8K", type: "Cinema Camera", sensor: "8K S35 CMOS", iso: "320–102400", price: "$7,999", badge: "PRO", image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&q=80", color: "#818cf8" },
  { id: "p3", name: "OPTIC 45", type: "APS-C Compact", sensor: "45MP APS-C", iso: "100–204800", price: "$1,899", badge: "POPULAR", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", color: "#34d399" },
  { id: "p4", name: "LENS PRO 85/1.2", type: "Prime Lens", sensor: "85mm f/1.2", iso: "—", price: "$2,499", badge: "AWARD", image: "https://images.unsplash.com/photo-1617297337000-5e3f5e8a4e2b?w=800&q=80", color: "#f43f5e" },
  { id: "p5", name: "WIDE 14/2.8", type: "Ultra-Wide Lens", sensor: "14mm f/2.8", iso: "—", price: "$1,249", badge: "", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80", color: "#0ea5e9" },
  { id: "p6", name: "TELE 400/2.8", type: "Super Telephoto", sensor: "400mm f/2.8", iso: "—", price: "$9,999", badge: "FLAGSHIP", image: "https://images.unsplash.com/photo-1480365501497-199581be0e66?w=800&q=80", color: "#e879f9" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
  "https://images.unsplash.com/photo-1520974735901-4c913e2d6c91?w=800&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
];

const AWARDS = [
  { org: "TIPA", year: "2025", title: "Camera of the Year" },
  { org: "EISA", year: "2025", title: "Best Innovation" },
  { org: "DPREVIEW", year: "2024", title: "Gold Award" },
  { org: "IMAGING RESOURCE", year: "2024", title: "Editors' Choice" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = Math.max(1, Math.ceil(target / 55));
    const t = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(t); } else setCount(n); }, 24);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.a ref={ref} style={{ x: sx, y: sy }} onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); }} onMouseLeave={() => { x.set(0); y.set(0); }} href="#" className={className}>{children}</motion.a>
  );
}

export default function EliteOpticsSPA() {
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [galleryIdx, setGalleryIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const categories = ["All", "Cameras", "Lenses"];
  const filtered = activeCategory === "All" ? PRODUCTS : activeCategory === "Cameras" ? PRODUCTS.filter(p => p.iso !== "—") : PRODUCTS.filter(p => p.iso === "—");

  const faqs = [
    { q: "Do you offer sensor cleaning?", a: "Yes — included free for the first year, then available as a paid service. Certified technicians only, 48h turnaround." },
    { q: "What's the warranty period?", a: "2 years full warranty on all cameras and lenses. Extended 5-year protection available at checkout." },
    { q: "Can I try before I buy?", a: "Authorised dealers offer 7-day loan programs. Check the dealer locator for your nearest participating store." },
    { q: "Do you offer student/professional discounts?", a: "NPS (Nikon Professional Services) and NPS equivalent programs available. 15% off for verified professionals and educators." },
  ];

  return (
    <div className="min-h-screen bg-[#f4f2ee] text-[#1a1612]" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between bg-[#f4f2ee]/90 backdrop-blur-lg border-b border-black/5">
        <div className="flex items-center gap-2">
          <Aperture size={20} className="text-[#f59e0b]" />
          <span className="text-sm font-black tracking-[0.15em] uppercase">OPTICX</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Cameras", "Lenses", "Accessories", "Software", "Dealers"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <MagneticBtn className="flex items-center gap-2 px-5 py-2 bg-[#1a1612] text-white text-xs font-black tracking-widest uppercase hover:bg-[#f59e0b] hover:text-[#1a1612] transition-colors">
            <ShoppingCart size={12} /> Shop Now
          </MagneticBtn>
        </div>
        <button onClick={() => setMobileOpen(true)} className="md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-[#1a1612] mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#1a1612] text-white flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-white"><X size={24} /></button>
            {["Cameras", "Lenses", "Accessories", "Software", "Dealers"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:text-[#f59e0b] transition-colors" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1629236?w=800&q=80" alt="camera hero" fill unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f2ee] via-transparent to-transparent" />
        </motion.div>
        <div className="relative z-10 px-8 md:px-16 pb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-[0.3em] uppercase mb-4 opacity-50">
            Introducing — APEX PRO X1
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }} className="text-5xl md:text-9xl font-black leading-none tracking-tight mb-6">
            SEE<br /><span className="text-[#f59e0b]">EVERYTHING</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-4 flex-wrap">
            <a href="#" onClick={e => { e.preventDefault(); setActiveProduct(PRODUCTS[0]); }} className="px-8 py-4 bg-[#1a1612] text-white font-black text-xs tracking-widest uppercase hover:bg-[#f59e0b] hover:text-[#1a1612] transition-colors">
              Discover APEX PRO X1
            </a>
            <a href="#" className="px-8 py-4 border border-[#1a1612]/20 text-xs tracking-widest uppercase hover:bg-[#1a1612]/5 transition-colors">
              Compare All Models
            </a>
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <div className="border-y border-black/5 py-5 overflow-hidden bg-[#1a1612]">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex gap-16 whitespace-nowrap">
          {Array(8).fill(0).map((_, i) => AWARDS.map(a => (
            <span key={`${i}-${a.org}`} className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/40">
              <Star size={10} className="text-[#f59e0b]" fill="#f59e0b" /> {a.org} {a.year} · {a.title} ·
            </span>
          )))}
        </motion.div>
      </div>

      {/* Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">The Collection</h2>
            <p className="text-sm opacity-50">Precision engineering. Uncompromising optics.</p>
          </div>
          <div className="flex gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className="px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors" style={{ background: activeCategory === c ? "#1a1612" : "transparent", color: activeCategory === c ? "white" : "inherit", border: "1px solid", borderColor: activeCategory === c ? "#1a1612" : "rgba(0,0,0,0.15)" }}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <motion.div layout whileHover={{ y: -6 }} onClick={() => setActiveProduct(p)} className="cursor-pointer group bg-white">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image src={p.image} alt={p.name} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    {p.badge && (
                      <div className="absolute top-3 left-3 bg-[#f59e0b] text-[#1a1612] text-[9px] font-black px-2 py-1 tracking-widest">{p.badge}</div>
                    )}
                    <div className="absolute inset-0 bg-[#1a1612]/0 group-hover:bg-[#1a1612]/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="border border-white text-white text-[10px] px-4 py-2 tracking-widest uppercase">Quick View</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] opacity-40 tracking-wider mb-1">{p.type}</div>
                    <h3 className="text-base font-black mb-3">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-[#f59e0b]">{p.price}</span>
                      <button onClick={e => { e.stopPropagation(); setCartFlash(true); setTimeout(() => setCartFlash(false), 800); }} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase border border-[#1a1612]/20 px-3 py-2 hover:bg-[#1a1612] hover:text-white transition-colors">
                        <ShoppingCart size={12} /> Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-2xl font-black tracking-tight mb-12">Shot on OPTICX</h2></Reveal>
        <div className="grid grid-cols-3 gap-2">
          {GALLERY.map((img, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setGalleryIdx(i)} className="relative overflow-hidden cursor-pointer" style={{ aspectRatio: i % 2 === 0 ? "1/1" : "4/3" }}>
                <Image src={img} alt={`shot ${i}`} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-[#1a1612] text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ label: "Years of Innovation", value: 60, suffix: "+" }, { label: "Pro Users Worldwide", value: 2, suffix: "M+" }, { label: "Patents Held", value: 1400, suffix: "+" }, { label: "Industry Awards", value: 280, suffix: "+" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2 text-[#f59e0b]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.2em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <Reveal><h2 className="text-2xl font-black tracking-tight mb-12">FAQ</h2></Reveal>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="border-b border-black/10">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-sm font-bold">
                {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-5 text-sm opacity-60 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-[#1a1612] text-white">
        <Reveal><h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none">CAPTURE<br /><span className="text-[#f59e0b]">THE MOMENT</span></h2></Reveal>
        <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">Free shipping on all orders over $500. 30-day returns. 2-year warranty standard.</p></Reveal>
        <Reveal delay={0.3}>
          <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#f59e0b] text-[#1a1612] font-black text-xs tracking-[0.2em] uppercase">
            Shop All Cameras <ArrowRight size={14} />
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#1a1612] text-white py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-30 tracking-wider uppercase">
        <span>OPTICX © 2026</span>
        <div className="flex gap-8">{["Instagram", "YouTube", "Dealers", "Support"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Cart flash */}
      <AnimatePresence>
        {cartFlash && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1612] text-white text-xs font-bold tracking-widest uppercase px-6 py-3 z-[300] flex items-center gap-2">
            <ShoppingCart size={14} className="text-[#f59e0b]" /> Added to cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-6" onClick={() => setActiveProduct(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-[#f4f2ee] max-w-2xl w-full overflow-hidden flex flex-col md:flex-row">
              <div className="relative md:w-1/2" style={{ aspectRatio: "1/1" }}>
                <Image src={activeProduct.image} alt={activeProduct.name} fill unoptimized className="object-cover" />
                {activeProduct.badge && <div className="absolute top-3 left-3 bg-[#f59e0b] text-[#1a1612] text-[9px] font-black px-2 py-1">{activeProduct.badge}</div>}
              </div>
              <div className="p-6 flex-1">
                <button onClick={() => setActiveProduct(null)} className="float-right mb-4 opacity-40 hover:opacity-100"><X size={18} /></button>
                <div className="clear-right">
                  <div className="text-[10px] opacity-40 tracking-wider mb-1">{activeProduct.type}</div>
                  <h3 className="text-2xl font-black mb-4">{activeProduct.name}</h3>
                  <div className="space-y-2 text-xs mb-6">
                    <div className="flex justify-between border-b border-black/5 py-2"><span className="opacity-40">Sensor</span><span className="font-bold">{activeProduct.sensor}</span></div>
                    <div className="flex justify-between border-b border-black/5 py-2"><span className="opacity-40">ISO Range</span><span className="font-bold">{activeProduct.iso}</span></div>
                  </div>
                  <div className="text-2xl font-black text-[#f59e0b] mb-4">{activeProduct.price}</div>
                  <button onClick={() => { setCartFlash(true); setActiveProduct(null); setTimeout(() => setCartFlash(false), 800); }} className="w-full py-3 bg-[#1a1612] text-white font-black text-xs tracking-widest uppercase hover:bg-[#f59e0b] hover:text-[#1a1612] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {galleryIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6" onClick={() => setGalleryIdx(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl" style={{ aspectRatio: "16/9" }}>
              <Image src={GALLERY[galleryIdx]} alt="shot" fill unoptimized className="object-contain" />
              <button onClick={() => setGalleryIdx(null)} className="absolute -top-10 right-0 text-white opacity-60 hover:opacity-100"><X size={20} /></button>
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                {GALLERY.map((_, i) => <button key={i} onClick={e => { e.stopPropagation(); setGalleryIdx(i); }} className="w-4 h-1 transition-all" style={{ background: i === galleryIdx ? "white" : "rgba(255,255,255,0.2)" }} />)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
