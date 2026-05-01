"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Menu, Activity, Globe, Zap, Shield, Cpu, Layers, ArrowUpRight, BarChart3, Database, ChevronRight, TrendingUp, Lock } from "lucide-react";
import "../premium.css";

const GRID_ITEMS = [
  { id: 1, title: "CORE_ANALYSIS", cat: "Infrastructure", load: "94%", trend: "+12%", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "DATA_VAULT", cat: "Security", load: "78%", trend: "+5%", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop", span: "" },
  { id: 3, title: "NETWORK_HUB", cat: "Connectivity", load: "61%", trend: "+8%", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", span: "" },
  { id: 4, title: "STREAM_X9", cat: "Processing", load: "87%", trend: "+19%", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", span: "" },
  { id: 5, title: "SENTINEL_AI", cat: "Intelligence", load: "99%", trend: "+31%", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop", span: "" },
];

const METRICS = [
  { label: "Uptime SLA", value: 99, suffix: ".99%" },
  { label: "Nodes Active", value: 14, suffix: "K" },
  { label: "Data Processed", value: 4, suffix: "PB/day" },
  { label: "Response Time", value: 2, suffix: "ms avg" },
];

const FEATURES = [
  { icon: Shield, title: "Zero-Trust Security", desc: "Every request authenticated at the edge. No implicit trust, ever." },
  { icon: Cpu, title: "Edge Processing", desc: "Computation pushed to 200+ global PoPs for minimal latency." },
  { icon: Database, title: "Distributed Storage", desc: "Geo-replicated across 5 regions with automatic failover." },
  { icon: Activity, title: "Real-Time Telemetry", desc: "Sub-millisecond metrics streams from every node in the grid." },
  { icon: Globe, title: "Global Mesh", desc: "Anycast routing ensures packets take the optimal path, always." },
  { icon: Zap, title: "Instant Scaling", desc: "From 0 to 1M req/s in under 3 seconds. No cold start penalty." },
];

const TIERS = [
  { name: "Grid Observer", price: 49, features: ["Up to 100 nodes", "5TB data/month", "99.9% SLA", "Community support"] },
  { name: "Grid Operator", price: 299, features: ["Unlimited nodes", "50TB data/month", "99.99% SLA", "24/7 dedicated support", "Custom dashboards"], highlight: true },
  { name: "Grid Sovereign", price: 999, features: ["Dedicated cluster", "Unlimited data", "99.999% SLA", "White-glove onboarding", "Private PoPs"], },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
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

function LiveBar({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1 bg-white/10 rounded-full overflow-hidden mt-2">
      <motion.div initial={{ width: 0 }} animate={inView ? { width: `${value}%` } : {}} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" />
    </div>
  );
}

export default function GridSystemSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeTier, setActiveTier] = useState(1);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="premium-theme bg-[#040712] text-white min-h-screen font-mono overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#040712]/90 backdrop-blur-xl border-b border-white/5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-black uppercase tracking-[0.3em] text-blue-400">GRID_SYS</motion.div>
        <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {["Platform", "Infrastructure", "Pricing", "Docs"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest border border-blue-500/40 px-5 py-2 text-blue-400 hover:bg-blue-500/10 transition-all">Get Access</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#040712] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/50"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase text-white">
              {["Platform", "Infrastructure", "Pricing", "Docs"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-733852?w=800&q=80" alt="Grid System" fill className="object-cover opacity-20" unoptimized />
        </motion.div>
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040712] via-[#040712]/80 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 max-w-4xl pt-32">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-blue-400/70">System Online — 14,293 nodes active</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }} className="text-6xl md:text-[8vw] font-black uppercase leading-none tracking-tighter mb-6">
            The<br />
            <span className="text-blue-400">Intelligent</span><br />
            Grid
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-white/50 text-lg max-w-xl mb-10">
            A planetary-scale distributed computing mesh. Process anything, anywhere, at the speed of light.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="bg-blue-500 text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-blue-400 transition-colors flex items-center gap-2">
              Enter The Grid <Zap size={14} />
            </a>
            <a href="#" className="border border-white/15 text-white/60 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-white/40 hover:text-white transition-all">
              View Architecture
            </a>
          </motion.div>
        </motion.div>

        {/* Live metrics overlay */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }} className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
          {[{ l: "CPU Load", v: "42%" }, { l: "Network", v: "1.8 Tbps" }, { l: "Latency", v: "1.9ms" }].map(m => (
            <div key={m.l} className="bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-md text-right">
              <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1">{m.l}</p>
              <p className="text-blue-400 font-black text-lg">{m.v}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-blue-500/10 border-y border-blue-500/20 py-3">
        <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-10 whitespace-nowrap">
          {Array(20).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest text-blue-400/50 shrink-0">Global Infrastructure · Zero Latency · 99.999% Uptime · Infinite Scale ·</span>
          ))}
        </motion.div>
      </div>

      {/* METRICS */}
      <section className="px-8 md:px-16 py-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {METRICS.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.1} className="bg-[#040712] p-10 text-center">
            <div className="text-5xl font-black text-blue-400 mb-2"><Counter target={m.value} suffix={m.suffix} /></div>
            <div className="text-[10px] uppercase tracking-widest text-white/30">{m.label}</div>
          </Reveal>
        ))}
      </section>

      {/* GRID ITEMS */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Infrastructure Nodes</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Active<br />Systems</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GRID_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} className={item.span || ""}>
              <motion.div className="group relative overflow-hidden bg-white/5 border border-white/8 cursor-pointer" style={{ height: i === 0 ? "65vh" : "30vh" }} onClick={() => setActiveItem(item.id)} whileHover={{ borderColor: "rgba(59,130,246,0.4)" }}>
                <Image src={item.img} alt={item.title} fill className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-600" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040712]/90 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest bg-blue-500/20 text-blue-400 px-2 py-1 border border-blue-500/30">{item.cat}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[9px] text-green-400/70">LIVE</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1">{item.title}</p>
                    <LiveBar value={parseInt(item.load)} />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-white/40">Load: {item.load}</span>
                      <span className="text-[10px] text-green-400 flex items-center gap-1"><TrendingUp size={9} /> {item.trend}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} className="text-blue-400" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 md:px-16 py-24 bg-[#06091a]">
        <Reveal className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Capabilities</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Built for<br />Scale</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07} className="group p-6 border border-white/8 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all">
              <f.icon size={22} className="mb-5 text-blue-400/60 group-hover:text-blue-400 transition-colors" />
              <h3 className="font-black text-lg uppercase tracking-tight mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4">Pricing</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Choose<br />Your Tier</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div onClick={() => setActiveTier(i)} className={`p-8 border cursor-pointer transition-all ${activeTier === i || t.highlight ? "border-blue-500/60 bg-blue-500/8" : "border-white/10 hover:border-blue-500/30"}`} whileHover={{ y: -4 }}>
                {t.highlight && <div className="text-[9px] uppercase tracking-widest bg-blue-500 text-white px-3 py-1 mb-4 w-fit">Most Popular</div>}
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{t.name}</p>
                <div className="text-5xl font-black text-blue-400 mb-1">${t.price}</div>
                <p className="text-[10px] text-white/30 mb-6">/month</p>
                <ul className="space-y-2 mb-8">
                  {t.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <ChevronRight size={12} className="text-blue-400" />{f}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`block text-center py-3 text-[10px] uppercase tracking-widest border transition-all ${t.highlight ? "bg-blue-500 text-white border-transparent hover:bg-blue-400" : "border-white/20 hover:border-blue-500 hover:text-blue-400"}`}>
                  Get Started
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-500/10 border-y border-blue-500/20 px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-8">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Join the Grid.<br />
            <span className="text-blue-400">Go Live Today.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="shrink-0">
          <a href="#" className="bg-blue-500 text-white px-10 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-blue-400 transition-colors flex items-center gap-2">
            Start Free Trial <Lock size={12} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5">
        <p className="font-black text-sm uppercase tracking-[0.3em] text-blue-400">GRID_SYS™</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["Status", "Docs", "API", "Privacy"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase tracking-widest">© 2026 GRID_SYS™</p>
      </footer>
    </div>
  );
}
