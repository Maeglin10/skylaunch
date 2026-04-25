"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Eye, Layers, Cpu, Globe, Zap, ArrowUpRight, ChevronDown, Play } from "lucide-react";
import "../premium.css";

const WORKS = [
  { id: 1, title: "AXIS_SHIFT", type: "XR Installation", year: "2026", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200&auto=format&fit=crop", color: "#e040fb", desc: "A spatial computing environment that remaps proprioception in real time." },
  { id: 2, title: "DEPTH_FIELD", type: "Generative Film", year: "2025", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", color: "#40c4ff", desc: "Cosmos rendered in 16K via procedural gravity simulation." },
  { id: 3, title: "SOMA_NET", type: "Biometric Art", year: "2025", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop", color: "#69ff47", desc: "Audience biometrics drive a live audiovisual topology in shared space." },
  { id: 4, title: "PARALLAX_IX", type: "Interactive Web", year: "2024", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop", color: "#ff6d00", desc: "Browser-based narrative using WebGPU for full ray-tracing at 60fps." },
  { id: 5, title: "FLUID_STATE", type: "Performance", year: "2024", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop", color: "#f50057", desc: "Live fluid simulation reacting to dancers' motion via depth cameras." },
  { id: 6, title: "ZERO_LAYER", type: "Sound Design", year: "2023", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1000&auto=format&fit=crop", color: "#ffea00", desc: "Spatial audio installation mapping city noise into harmonic structures." },
];

const SERVICES = [
  { icon: Eye, title: "XR & Spatial Computing", desc: "Mixed reality environments for brand activations, cultural institutions, and public space." },
  { icon: Layers, title: "Generative Systems", desc: "Procedural visuals and parametric design using custom GPU-accelerated pipelines." },
  { icon: Cpu, title: "Interactive Technology", desc: "WebGPU, WASM, and real-time processing for browser and native contexts." },
  { icon: Globe, title: "Immersive Events", desc: "Full-service production of large-scale live experiences with technical direction." },
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

export default function PerspectiveCoreSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showReel, setShowReel] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.12]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="premium-theme bg-[#06030a] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#06030a]/85 backdrop-blur-xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.35em]">PERSPECTIVE<span className="text-[#e040fb]">.</span></motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Work", "Studio", "Services", "Contact"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest border border-[#e040fb]/30 text-[#e040fb] px-5 py-2 hover:bg-[#e040fb]/10 transition-all">New Project</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#06030a] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/40"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase">
              {["Work", "Studio", "Services", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#e040fb] transition-colors">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REEL MODAL */}
      <AnimatePresence>
        {showReel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center" onClick={() => setShowReel(false)}>
            <div className="w-full max-w-5xl aspect-video bg-[#111] flex items-center justify-center relative">
              <p className="text-white/20 text-sm uppercase tracking-widest font-mono">[ Showreel 2026 ]</p>
              <button className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2000&auto=format&fit=crop" alt="Immersive" fill className="object-cover opacity-35" unoptimized />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(224,64,251,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(64,196,255,0.1) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06030a]/90 via-[#06030a]/50 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-20">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[10px] uppercase tracking-[0.5em] text-[#e040fb]/60 mb-8">Immersive Experience Studio — Paris · Berlin · Tokyo</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-7xl md:text-[9vw] font-black uppercase leading-none tracking-tighter mb-8">
            We Build<br />
            <span className="text-[#e040fb]">Worlds</span><br />
            People Feel.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex items-center gap-6">
            <a href="#work" className="bg-[#e040fb] text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-[#c030d0] transition-colors">See Our Work</a>
            <button onClick={() => setShowReel(true)} className="flex items-center gap-3 text-white/50 text-[11px] uppercase tracking-widest hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors"><Play size={12} className="ml-0.5" /></div>
              Watch Reel
            </button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown size={16} className="text-white/25" /></div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#e040fb]/8 border-y border-[#e040fb]/15 py-3.5">
        <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest text-[#e040fb]/40 shrink-0">XR · Generative Art · Interactive Web · Biometric Performance · Spatial Audio · WebGPU ·</span>
          ))}
        </motion.div>
      </div>

      {/* WORKS */}
      <section id="work" className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Portfolio — 2023/2026</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Selected<br />Work</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKS.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.07}>
              <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: "48vh" }} onHoverStart={() => setHovered(w.id)} onHoverEnd={() => setHovered(null)} onClick={() => setActiveWork(w.id)} whileHover={{ scale: 1.01 }}>
                <Image src={w.img} alt={w.title} fill className="object-cover opacity-40 group-hover:opacity-65 transition-all duration-700 group-hover:scale-105" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06030a]/90 via-transparent to-transparent" />
                <motion.div initial={{ opacity: 0 }} animate={hovered === w.id ? { opacity: 1 } : { opacity: 0 }} className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${w.color}15, transparent 70%)` }} />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest px-2 py-1 border" style={{ color: w.color, borderColor: w.color + "40" }}>{w.type}</span>
                    <span className="text-[9px] text-white/25">{w.year}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-2xl uppercase tracking-tight mb-1" style={{ color: w.color }}>{w.title}</h3>
                    <p className="text-white/40 text-xs">{w.desc}</p>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, x: 10 }} animate={hovered === w.id ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }} className="absolute top-4 right-4">
                  <ArrowUpRight size={16} style={{ color: w.color }} />
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WORK MODAL */}
      <AnimatePresence>
        {activeWork !== null && (() => {
          const w = WORKS.find(x => x.id === activeWork)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#06030a]/96 flex items-center justify-center p-8" onClick={() => setActiveWork(null)}>
              <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
                <div className="relative h-64 overflow-hidden" style={{ border: `1px solid ${w.color}30` }}>
                  <Image src={w.img} alt={w.title} fill className="object-cover opacity-50" unoptimized />
                </div>
                <div className="bg-[#0d0812] p-8" style={{ borderLeft: `2px solid ${w.color}` }}>
                  <p className="text-[9px] uppercase tracking-widest mb-2" style={{ color: w.color + "80" }}>{w.type} — {w.year}</p>
                  <h3 className="font-black text-3xl uppercase tracking-tight mb-3" style={{ color: w.color }}>{w.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">{w.desc}</p>
                  <a href="#" className="text-[10px] uppercase tracking-widest border px-5 py-2.5 inline-flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: w.color, borderColor: w.color + "40" }}>
                    View Full Case <ArrowRight size={12} />
                  </a>
                </div>
                <button onClick={() => setActiveWork(null)} className="absolute top-4 right-4 text-white/30 hover:text-white"><X size={18} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* SERVICES */}
      <section className="bg-[#0a0612] px-8 md:px-16 py-24 border-y border-white/5">
        <Reveal className="mb-14">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">What We Do</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Services</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="bg-[#0a0612] p-8 group hover:bg-[#120918] transition-colors">
              <s.icon size={22} className="text-[#e040fb]/40 group-hover:text-[#e040fb] transition-colors mb-5" />
              <h3 className="font-black text-base uppercase tracking-tight mb-3">{s.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-28 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#e040fb]/40 mb-6">New Commission</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-10">
            Create<br />
            <span className="text-[#e040fb]">Something</span><br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>New.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-[#e040fb] text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:bg-[#c030d0] transition-colors inline-flex items-center gap-3">
            Start a Project <ArrowRight size={14} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#06030a] px-8 md:px-16 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/5">
        <div>
          <p className="font-black text-base uppercase tracking-[0.2em] mb-1">PERSPECTIVE<span className="text-[#e040fb]">.</span></p>
          <p className="text-xs text-white/25">Immersive Experience Studio</p>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["Instagram", "Vimeo", "Awards", "Press"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/15 uppercase">© 2026 Perspective Studio</p>
      </footer>
    </div>
  );
}
