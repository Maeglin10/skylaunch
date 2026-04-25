"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Camera, Sun, Aperture, Award, Star, Heart, ShoppingBag, ZoomIn } from "lucide-react";

const SERIES = [
  { id: 1, name: "GOLDEN HOUR", tag: "Landscape", count: 48, cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", color: "#f59e0b" },
  { id: 2, name: "STREET SILENCE", tag: "Street", count: 62, cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80", color: "#818cf8" },
  { id: 3, name: "MINERAL DRIFT", tag: "Abstract", count: 35, cover: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1200&q=80", color: "#34d399" },
  { id: 4, name: "TIDE & SALT", tag: "Ocean", count: 54, cover: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1200&q=80", color: "#0ea5e9" },
];

const PRINTS = [
  { id: "p1", title: "Cerulean Break", series: "TIDE & SALT", size: "60×90cm", price: "€420", edition: "1/25", image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80" },
  { id: "p2", title: "Urban Exhale", series: "STREET SILENCE", size: "40×60cm", price: "€280", edition: "3/25", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80" },
  { id: "p3", title: "Last Light Atlas", series: "GOLDEN HOUR", size: "90×120cm", price: "€680", edition: "1/10", image: "https://images.unsplash.com/photo-1463288889890-a56b2853c40f?w=600&q=80" },
  { id: "p4", title: "Quartzite Vein", series: "MINERAL DRIFT", size: "50×70cm", price: "€360", edition: "5/25", image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&q=80" },
  { id: "p5", title: "Fog Station", series: "STREET SILENCE", size: "60×90cm", price: "€420", edition: "2/25", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" },
  { id: "p6", title: "Equinox Bleed", series: "GOLDEN HOUR", size: "120×160cm", price: "€1,200", edition: "1/5", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80" },
];

const TESTIMONIALS = [
  { text: "Hung the triptych in my studio — every day it looks different in the changing light. That's what a great photograph does.", author: "C. Alder", role: "Collector, Berlin" },
  { text: "Received 'Fog Station' this week. The archival paper, the depth — it's flawless. Worth every cent.", author: "M. Fontaine", role: "Interior Designer, Paris" },
  { text: "She sees what a camera shouldn't be able to see. One of the most distinctive voices working today.", author: "TIME Magazine", role: "Year-End Selection" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
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

export default function PhotographyLightLeak() {
  const [activeSeries, setActiveSeries] = useState(SERIES[0]);
  const [selectedPrint, setSelectedPrint] = useState<typeof PRINTS[0] | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cartFlash, setCartFlash] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "How are prints produced?", a: "All prints are pigment inkjet on Hahnemühle Photo Rag 308gsm, printed in-house on Epson SC-P9000. Archival guaranteed 75+ years." },
    { q: "Are editions strictly limited?", a: "Yes — each edition is signed, numbered, and comes with a certificate of authenticity. Once sold out, the edition is retired permanently." },
    { q: "Do you offer custom sizing?", a: "Certain images are available in custom dimensions for interior designers and collectors. Contact us with your requirements." },
    { q: "What's the delivery timeline?", a: "Prints are produced on order and ship within 10–14 business days. International shipping available to 40 countries." },
  ];

  return (
    <div className="min-h-screen bg-[#0d0b09] text-white" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Light leak overlays */}
      <motion.div animate={{ opacity: [0.04, 0.09, 0.04] }} transition={{ duration: 8, repeat: Infinity }} className="fixed top-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none z-[2]" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.6), transparent)" }} />
      <motion.div animate={{ opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 10, repeat: Infinity, delay: 4 }} className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none z-[2]" style={{ background: "radial-gradient(circle, rgba(129,140,248,0.4), transparent)" }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b09]/80 to-transparent pointer-events-none" />
        <span className="relative text-sm font-black tracking-[0.15em] uppercase">Elara Voss</span>
        <div className="relative hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Portfolio", "Shop", "Editions", "About", "Contact"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <MagneticBtn className="relative hidden md:flex items-center gap-2 px-5 py-2 border border-white/20 text-[10px] tracking-widest uppercase hover:bg-white/10 transition-colors">
          <ShoppingBag size={12} /> Shop Prints
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="relative md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-white mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#0d0b09] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Portfolio", "Shop", "Editions", "About", "Contact"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:opacity-50 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={activeSeries.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} style={{ y: heroY }} className="absolute inset-0">
            <Image src={activeSeries.cover} alt={activeSeries.name} fill unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/30 to-transparent" />
          </motion.div>
        </AnimatePresence>
        <div className="relative z-10 px-8 md:px-16 pb-16 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeSeries.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">{activeSeries.tag} · {activeSeries.count} Images</p>
              <h1 className="text-5xl md:text-9xl font-black leading-none tracking-tight mb-8">{activeSeries.name}</h1>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-6 flex-wrap">
            {SERIES.map((s, i) => (
              <button key={s.id} onClick={() => setActiveSeries(s)} className="relative overflow-hidden w-16 h-10 transition-all" style={{ outline: s.id === activeSeries.id ? `2px solid ${s.color}` : "none" }}>
                <Image src={s.cover} alt={s.name} fill unoptimized className="object-cover opacity-60 hover:opacity-80 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-white/5 py-3 overflow-hidden">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(8).fill(0).map((_, i) => SERIES.map(s => (
            <span key={`${i}-${s.id}`} className="text-[9px] tracking-[0.3em] uppercase opacity-20">{s.name} · {s.tag} ·</span>
          )))}
        </motion.div>
      </div>

      {/* Prints */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-2">Limited Edition Prints</h2>
            <p className="text-sm opacity-40">Archival pigment. Signed and numbered.</p>
          </div>
          <a href="#" className="text-xs opacity-40 hover:opacity-100 tracking-widest uppercase flex items-center gap-1">View All <ArrowRight size={12} /></a>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {PRINTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }} className="group cursor-pointer" onClick={() => setSelectedPrint(p)}>
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                  <Image src={p.image} alt={p.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn size={24} className="text-white" />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-[9px] font-bold px-2 py-1 tracking-wider">{p.edition}</div>
                </div>
                <h3 className="text-sm font-black mb-1">{p.title}</h3>
                <div className="flex items-center justify-between text-xs opacity-50">
                  <span>{p.series} · {p.size}</span>
                  <span className="font-bold text-white opacity-80">{p.price}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ label: "Series Published", value: 4, suffix: "" }, { label: "Prints in Collection", value: 199, suffix: "+" }, { label: "Countries Collected", value: 28, suffix: "" }, { label: "Years Shooting", value: 18, suffix: "" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2 text-[#f59e0b]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.2em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <div className="relative h-36 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={testimonialIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-lg italic opacity-70 mb-4 leading-relaxed">"{TESTIMONIALS[testimonialIdx].text}"</p>
              <span className="text-[10px] tracking-[0.25em] uppercase opacity-50">{TESTIMONIALS[testimonialIdx].author} · {TESTIMONIALS[testimonialIdx].role}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2 justify-center mt-6">
          {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setTestimonialIdx(i)} className="w-6 h-1 transition-all" style={{ background: i === testimonialIdx ? "#f59e0b" : "rgba(255,255,255,0.2)" }} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#120f0b] px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-xl font-black tracking-tight uppercase mb-12">Print FAQ</h2></Reveal>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-sm font-bold">
                  {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pb-5 text-sm opacity-50 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <motion.div animate={{ opacity: [0.04, 0.1, 0.04] }} transition={{ duration: 7, repeat: Infinity }} className="absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: `radial-gradient(circle, ${activeSeries.color}40, transparent)` }} />
        <div className="relative z-10">
          <Reveal><h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 leading-none uppercase">COLLECT<br /><span style={{ color: activeSeries.color }}>THE LIGHT</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">Limited editions. Archival quality. One of a kind. Each print ships in custom packaging with a signed certificate.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 font-black text-xs tracking-[0.2em] uppercase" style={{ background: activeSeries.color, color: "#0d0b09" }}>
              Browse All Prints <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-20 tracking-wider uppercase">
        <span>Elara Voss Photography © 2026</span>
        <div className="flex gap-8">{["Instagram", "Newsletter", "Press", "Contact"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Print Modal */}
      <AnimatePresence>
        {selectedPrint && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-6" onClick={() => setSelectedPrint(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={e => e.stopPropagation()} className="bg-[#120f0b] max-w-2xl w-full overflow-hidden flex flex-col md:flex-row">
              <div className="relative md:w-1/2" style={{ aspectRatio: "3/4" }}>
                <Image src={selectedPrint.image} alt={selectedPrint.title} fill unoptimized className="object-cover" />
              </div>
              <div className="p-6 flex-1">
                <button onClick={() => setSelectedPrint(null)} className="float-right opacity-40 hover:opacity-100"><X size={18} /></button>
                <div className="clear-right pt-2">
                  <div className="text-[9px] tracking-[0.25em] uppercase opacity-40 mb-1">{selectedPrint.series}</div>
                  <h3 className="text-xl font-black mb-4">{selectedPrint.title}</h3>
                  <div className="space-y-2 text-xs mb-6 border-t border-white/10 pt-4">
                    <div className="flex justify-between py-2 border-b border-white/5"><span className="opacity-40">Size</span><span>{selectedPrint.size}</span></div>
                    <div className="flex justify-between py-2 border-b border-white/5"><span className="opacity-40">Edition</span><span>{selectedPrint.edition}</span></div>
                    <div className="flex justify-between py-2"><span className="opacity-40">Medium</span><span>Archival pigment</span></div>
                  </div>
                  <div className="text-2xl font-black text-[#f59e0b] mb-4">{selectedPrint.price}</div>
                  <button onClick={() => { setCartFlash(true); setSelectedPrint(null); setTimeout(() => setCartFlash(false), 1000); }} className="w-full py-3 bg-white text-[#0d0b09] font-black text-xs tracking-widest uppercase hover:bg-[#f59e0b] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart flash */}
      <AnimatePresence>
        {cartFlash && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-[#0d0b09] text-xs font-bold tracking-widest uppercase px-6 py-3 z-[300] flex items-center gap-2">
            <ShoppingBag size={14} className="text-[#f59e0b]" /> Print Added to Cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
