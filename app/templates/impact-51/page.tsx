"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Box, Cpu, Zap, Shield, Globe, Layers, Activity, Terminal } from "lucide-react";

const PRODUCTS = [
  { id: "p1", name: "HOLO_CORE", type: "AR Processor", power: "8W TDP", price: "$299", badge: "FLAGSHIP", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", color: "#00d4ff", specs: { FLOPS: "48 TFLOPS", RAM: "32GB HBM3", Interface: "USB4 / PCIe 5.0" } },
  { id: "p2", name: "PRISM_X", type: "Spatial Display", power: "12W", price: "$1,499", badge: "NEW", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80", color: "#a78bfa", specs: { Resolution: "8K per eye", FOV: "120°", Refresh: "240Hz" } },
  { id: "p3", name: "LATTICE_SDK", type: "Developer Platform", power: "Cloud", price: "$49/mo", badge: "PRO", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", color: "#34d399", specs: { APIs: "240+", Latency: "< 8ms", Support: "24/7" } },
  { id: "p4", name: "REFRACT", type: "Holographic Lens", power: "3W", price: "$599", badge: "", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", color: "#f59e0b", specs: { Resolution: "4K per eye", Weight: "42g", Battery: "8h" } },
];

const STATS = [
  { label: "Photons Rendered /s", value: 48, suffix: "T" },
  { label: "Latency", value: 8, suffix: "ms" },
  { label: "Global Partners", value: 340, suffix: "+" },
  { label: "Patents Filed", value: 92, suffix: "" },
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

export default function HolographicUnitSPA() {
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const cx = useMotionValue(0); const cy = useMotionValue(0);
  const scx = useSpring(cx, { stiffness: 70, damping: 20 });
  const scy = useSpring(cy, { stiffness: 70, damping: 20 });

  // Rotating rings
  const [ringAngle, setRingAngle] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRingAngle(a => a + 0.3), 16);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "What platforms does LATTICE_SDK support?", a: "iOS, Android, Windows, macOS, and WebXR. Native plugins for Unity and Unreal Engine included in all tiers." },
    { q: "What's the field of view on PRISM_X?", a: "120° horizontal, 90° vertical — the widest in the consumer market. No visible screen door effect above 6 PPD." },
    { q: "Does HOLO_CORE require a host device?", a: "Standalone mode available. Pairs with PC for maximum throughput via PCIe 5.0 or USB4 Gen 3." },
    { q: "Is enterprise licensing available?", a: "Yes — volume pricing from 10 units. Dedicated integration support and custom firmware branches for OEM partners." },
  ];

  return (
    <div className="min-h-screen bg-[#04060e] text-white font-mono">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-[#00d4ff]/10 bg-[#04060e]/90 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 border border-[#00d4ff]/40 rounded-full animate-spin" style={{ animationDuration: "4s" }} />
            <div className="w-2 h-2 bg-[#00d4ff] rounded-full" />
          </div>
          <span className="text-xs font-black tracking-[0.25em] uppercase text-[#00d4ff]">HOLOGRAPHIX</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-40">
          {["Products", "Developers", "Research", "Ecosystem", "About"].map(l => (
            <a key={l} href="#" className="hover:text-[#00d4ff] hover:opacity-100 transition-all">{l}</a>
          ))}
        </div>
        <MagneticBtn className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#04060e] text-[10px] font-black tracking-[0.2em] uppercase">
          <Zap size={10} /> Order Now
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-[#00d4ff] mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#04060e] flex flex-col p-10 border-l border-[#00d4ff]/10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-[#00d4ff]"><X size={24} /></button>
            {["Products", "Developers", "Research", "Ecosystem", "About"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-3xl font-black mb-6 uppercase tracking-wider text-[#00d4ff] hover:opacity-50 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={e => { cx.set(e.clientX - window.innerWidth / 2); cy.set(e.clientY - window.innerHeight / 2); }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={PRODUCTS[0].image} alt="hero" fill unoptimized className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#04060e]/80" />
        </motion.div>
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[120, 200, 300, 420].map((r, i) => (
            <div key={r} className="absolute rounded-full border border-[#00d4ff]/10" style={{ width: r, height: r, transform: `rotate(${ringAngle * (i % 2 === 0 ? 1 : -1)}deg)` }} />
          ))}
        </div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        {/* Cursor orb */}
        <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl" style={{ x: scx, y: scy, background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] tracking-[0.35em] text-[#00d4ff]/40 mb-6 flex items-center justify-center gap-3">
            <Activity size={9} /> SPATIAL COMPUTING PLATFORM v3.0
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="text-5xl md:text-9xl font-black leading-none tracking-tight mb-6 text-[#00d4ff]">
            HOLO<br />GRAPHIX
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs opacity-30 max-w-xl mx-auto mb-10 tracking-wider leading-loose">
            Spatial computing hardware for the physical–digital frontier.<br />48 TFLOPS. 8ms latency. Sub-42g headset.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="px-8 py-4 bg-[#00d4ff] text-[#04060e] font-black text-[10px] tracking-[0.2em] uppercase">Order HOLO_CORE</a>
            <a href="#" className="px-8 py-4 border border-[#00d4ff]/30 text-[#00d4ff] text-[10px] tracking-[0.2em] uppercase hover:bg-[#00d4ff]/5 transition-colors">Developer Docs</a>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[#00d4ff]/10 py-3 overflow-hidden">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-[9px] tracking-[0.25em] text-[#00d4ff]/20 uppercase">HOLO_CORE · PRISM_X · LATTICE_SDK · REFRACT · 48_TFLOPS · 8MS_LATENCY · SPATIAL_COMPUTE ·</span>
          ))}
        </motion.div>
      </div>

      {/* Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-xl font-black tracking-[0.2em] uppercase mb-2 text-[#00d4ff]">PRODUCT_LINE</h2></Reveal>
        <Reveal delay={0.1}><p className="text-[10px] opacity-30 tracking-wider mb-12">Four pillars of the spatial stack.</p></Reveal>
        <div className="grid md:grid-cols-4 gap-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.div whileHover={{ scale: 1.03, y: -4 }} onClick={() => setActiveProduct(p)} className="cursor-pointer border border-white/5 hover:border-white/10 bg-[#08090f] p-5 transition-colors group">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "1/1" }}>
                  <Image src={p.image} alt={p.name} fill unoptimized className="object-cover opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: p.color + "60" }}>
                      <Box size={24} style={{ color: p.color }} />
                    </div>
                  </div>
                  {p.badge && <div className="absolute top-2 left-2 text-[9px] font-black px-2 py-1 text-[#04060e]" style={{ background: p.color }}>{p.badge}</div>}
                </div>
                <div className="text-[9px] opacity-30 tracking-wider mb-1">{p.type}</div>
                <div className="font-black tracking-wider text-sm mb-1" style={{ color: p.color }}>{p.name}</div>
                <div className="text-base font-black mb-2">{p.price}</div>
                <div className="text-[9px] opacity-20">{p.power}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-[#00d4ff]/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2 text-[#00d4ff]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.25em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <Reveal><h2 className="text-lg font-black tracking-[0.2em] uppercase mb-12 text-[#00d4ff]">FAQ::HARDWARE</h2></Reveal>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="border-b border-white/5">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-xs tracking-wider">
                {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={14} /></motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-5 text-[11px] opacity-30 leading-relaxed tracking-wide">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10">
          <Reveal><h2 className="text-4xl md:text-7xl font-black tracking-tight mb-4 leading-none text-[#00d4ff]">ENTER THE<br />SPATIAL ERA</h2></Reveal>
          <Reveal delay={0.2}><p className="text-xs opacity-30 mb-10 max-w-sm mx-auto tracking-wider leading-loose">Pre-order HOLO_CORE. Ships Q2 2026 to 34 countries. Full refund if you change your mind.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#00d4ff] text-[#04060e] font-black text-[10px] tracking-[0.2em] uppercase">
              PRE-ORDER NOW <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00d4ff]/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] opacity-20 tracking-[0.2em] uppercase">
        <span>HOLOGRAPHIX © 2026</span>
        <div className="flex gap-8">{["GitHub", "Discord", "Docs", "Press"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-6" onClick={() => setActiveProduct(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-[#08090f] border max-w-lg w-full" style={{ borderColor: activeProduct.color + "40" }}>
              <div className="relative h-40">
                <Image src={activeProduct.image} alt={activeProduct.name} fill unoptimized className="object-cover opacity-25" />
                <button onClick={() => setActiveProduct(null)} className="absolute top-3 right-3 opacity-50 hover:opacity-100"><X size={16} /></button>
              </div>
              <div className="p-6">
                <div className="text-[9px] opacity-30 mb-1 tracking-wider">{activeProduct.type}</div>
                <h3 className="font-black tracking-wider text-lg mb-4" style={{ color: activeProduct.color }}>{activeProduct.name}</h3>
                <div className="space-y-2 text-[10px] mb-6">
                  {Object.entries(activeProduct.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/5 py-2">
                      <span className="opacity-30 tracking-wider">{k}</span><span style={{ color: activeProduct.color }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xl font-black mb-4">{activeProduct.price}</div>
                <div className="flex gap-3">
                  <a href="#" className="flex-1 py-3 font-black text-[10px] tracking-[0.2em] uppercase text-center text-[#04060e]" style={{ background: activeProduct.color }}>Order Now</a>
                  <a href="#" className="flex-1 py-3 border border-white/20 text-[10px] tracking-[0.2em] uppercase text-center hover:bg-white/5 transition-colors">Specs PDF</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
