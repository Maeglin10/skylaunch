"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Zap, Shield, Globe, Cpu, BarChart3, Activity, ChevronDown, Lock, Server } from "lucide-react";
import "../premium.css";

const FEATURES = [
  { icon: Zap, title: "Sub-50ms Inference", desc: "Custom silicon, co-located training data, and inference pipelines optimized for production throughput.", color: "#f59e0b" },
  { icon: Shield, title: "Alignment by Design", desc: "Constitutional AI built into every model checkpoint. Safety is not a wrapper — it's structural.", color: "#3b82f6" },
  { icon: Globe, title: "Federated Deployment", desc: "Run at the edge, on-prem, or in your private cloud. Data never leaves your perimeter.", color: "#10b981" },
  { icon: Cpu, title: "Hardware Optimization", desc: "FP8 quantization, flash attention, and custom CUDA kernels for maximum utilization.", color: "#8b5cf6" },
  { icon: BarChart3, title: "Continuous Evaluation", desc: "Automated benchmarking against 340 capability and safety dimensions after each training run.", color: "#ef4444" },
  { icon: Activity, title: "Observability Stack", desc: "Real-time token-level tracing, latency histograms, and reasoning chain visualization.", color: "#06b6d4" },
];

const MODELS = [
  { name: "APEX-7B", context: "128K", speed: "1,200 tok/s", use: "Edge / Realtime", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop" },
  { name: "APEX-70B", context: "256K", speed: "340 tok/s", use: "Enterprise", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
  { name: "APEX-400B", context: "1M", speed: "80 tok/s", use: "Research / Frontier", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop" },
];

const STATS = [
  { value: 400, suffix: "B", label: "Parameters (largest)" },
  { value: 1, suffix: "M", label: "Context Tokens" },
  { value: 99, suffix: ".97%", label: "Safety Rate" },
  { value: 47, suffix: "ms", label: "P50 Latency" },
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
    const step = target / 60;
    const timer = setInterval(() => {
      s += step;
      if (s >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function MagneticHUD() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModel, setActiveModel] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Cursor tracker for hero orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX = useSpring(useTransform(mouseX, v => v * 0.04), { stiffness: 80, damping: 30 });
  const orbY = useSpring(useTransform(mouseY, v => v * 0.04), { stiffness: 80, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  }, [mouseX, mouseY]);

  // Magnetic CTA
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 22 });
  const sy = useSpring(my, { stiffness: 220, damping: 22 });
  const handleMag = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.35);
    my.set((e.clientY - r.top - r.height / 2) * 0.35);
  }, [mx, my]);
  const resetMag = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <div className="premium-theme bg-[#03040a] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#03040a]/90 backdrop-blur-xl border-b border-white/5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.3em]">APEX<span className="text-purple-400">AI</span></motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Models", "Platform", "Research", "Enterprise"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest border border-purple-500/30 text-purple-400 px-5 py-2 hover:bg-purple-500/10 transition-all">Get API Access</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#03040a] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/40"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase">
              {["Models", "Platform", "Research", "Enterprise", "Pricing"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove}>
        {/* Animated background orbs */}
        <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)", filter: "blur(50px)" }} />
        </motion.div>
        {/* Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-574071?w=800&q=80" alt="AI" fill className="object-cover opacity-10" unoptimized />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-28 max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[9px] uppercase tracking-widest px-4 py-2 mb-8">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            APEX-400B Now Available — 1M Context
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-6xl md:text-[8vw] font-black uppercase leading-none tracking-tighter mb-8">
            Intelligence<br />
            Without<br />
            <span className="text-purple-400">Compromise.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-white/50 text-lg max-w-xl mb-10 leading-relaxed">
            Production-grade frontier models with built-in alignment, sub-50ms latency, and full observability.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-col sm:flex-row gap-4">
            <motion.a href="#" style={{ x: sx, y: sy }} onMouseMove={handleMag} onMouseLeave={resetMag} className="bg-purple-500 text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-purple-400 transition-colors flex items-center gap-2">
              Start Building <ArrowRight size={13} />
            </motion.a>
            <a href="#models" className="border border-white/15 text-white/60 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-white/40 hover:text-white transition-all flex items-center gap-2">
              View Models <ChevronDown size={13} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-purple-500/8 border-y border-purple-500/15 py-3.5">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-10 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest text-purple-400/40 shrink-0">Frontier AI · Constitutional Alignment · 1M Context · Sub-50ms · Production-Ready ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-[#03040a] p-10 text-center border border-white/4">
            <div className="text-5xl font-black text-purple-400 mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* MODELS */}
      <section id="models" className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Available Now</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Model<br />Family</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MODELS.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <motion.div className={`group relative overflow-hidden cursor-pointer border transition-all ${activeModel === i ? "border-purple-500/60" : "border-white/8 hover:border-purple-500/30"}`} onClick={() => setActiveModel(i)} style={{ height: "45vh" }} whileHover={{ y: -4 }}>
                <Image src={m.img} alt={m.name} fill className="object-cover opacity-25 group-hover:opacity-40 transition-all duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03040a]/90 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {activeModel === i && <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />}
                  <p className="text-[9px] uppercase tracking-widest text-purple-400/70 mb-1">{m.use}</p>
                  <h3 className="font-black text-3xl uppercase tracking-tight mb-4">{m.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 p-2">
                      <p className="text-[8px] uppercase tracking-widest text-white/30 mb-0.5">Context</p>
                      <p className="text-sm font-black text-purple-300">{m.context}</p>
                    </div>
                    <div className="bg-white/5 p-2">
                      <p className="text-[8px] uppercase tracking-widest text-white/30 mb-0.5">Speed</p>
                      <p className="text-sm font-black text-purple-300">{m.speed}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#07091a] px-8 md:px-16 py-24 border-y border-white/5">
        <Reveal className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Platform</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Built for<br />Production</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07} className="group p-6 border border-white/6 hover:border-white/15 transition-all" style={{ background: `linear-gradient(135deg, ${f.color}05, transparent)` }}>
              <f.icon size={22} className="mb-5 transition-colors" style={{ color: f.color + "80" }} />
              <h3 className="font-black text-base uppercase tracking-tight mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-32 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-purple-400/50 mb-6">Developer Access</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-10">
            Build the<br />
            <span className="text-purple-400">Future.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4">
          <a href="#" className="bg-purple-500 text-white px-10 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-purple-400 transition-colors flex items-center gap-2">
            Get API Key <Lock size={12} />
          </a>
          <a href="#" className="border border-white/15 text-white/60 px-10 py-4 text-[11px] uppercase tracking-widest hover:border-white/40 hover:text-white transition-all flex items-center gap-2">
            Read Docs <Server size={12} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5">
        <p className="font-black text-sm uppercase tracking-[0.3em]">APEX<span className="text-purple-400">AI</span></p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["Research", "API Docs", "Status", "Privacy"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 Apex AI Inc.</p>
      </footer>
    </div>
  );
}
