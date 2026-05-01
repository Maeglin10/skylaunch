"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Zap, Code, Terminal, Cpu, Shield, Globe, ArrowUpRight, ChevronRight } from "lucide-react";
import "../premium.css";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?\\0123456789ABCDEF";

const PROJECTS = [
  { id: 1, name: "PHANTOM_OS", type: "System Hack", year: "2026", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop", color: "#00ff88", tags: ["Rust", "WASM", "Custom Kernel"] },
  { id: 2, name: "NEURAL_NET_X", type: "AI Research", year: "2025", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", color: "#ff4488", tags: ["PyTorch", "CUDA", "Transformer"] },
  { id: 3, name: "VOID_PROTOCOL", type: "Blockchain", year: "2025", img: "https://images.unsplash.com/photo-1518005020251-582c7eb8365d?q=80&w=1000&auto=format&fit=crop", color: "#44aaff", tags: ["Solidity", "ZK-Proofs", "EVM"] },
  { id: 4, name: "CIPHER_ENGINE", type: "Cryptography", year: "2024", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop", color: "#ffaa00", tags: ["C++", "Assembly", "AES-256"] },
  { id: 5, name: "GHOST_MESH", type: "Networking", year: "2024", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop", color: "#aa44ff", tags: ["Go", "eBPF", "P2P"] },
  { id: 6, name: "DARK_MATRIX", type: "Security Research", year: "2023", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop", color: "#00ffdd", tags: ["Python", "Exploit Dev", "RE"] },
];

const SKILLS = [
  { name: "Systems Programming", pct: 95, color: "#00ff88" },
  { name: "Machine Learning", pct: 88, color: "#ff4488" },
  { name: "Cryptography", pct: 82, color: "#44aaff" },
  { name: "Distributed Systems", pct: 90, color: "#ffaa00" },
  { name: "Security Research", pct: 78, color: "#aa44ff" },
];

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const handleHover = useCallback(() => {
    setIsGlitching(true);
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((c, i) => i < iter ? text[i] : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join(""));
      iter += 1;
      if (iter > text.length) { clearInterval(interval); setDisplay(text); setIsGlitching(false); }
    }, 30);
  }, [text]);
  return <span onMouseEnter={handleHover} className="cursor-default">{display}</span>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function SkillBar({ name, pct, color, delay = 0 }: { name: string; pct: number; color: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest" style={{ color }}>{name}</span>
        <span className="text-[10px]" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1 bg-white/8 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}} transition={{ duration: 1.2, delay, ease: "easeOut" }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
      </div>
    </div>
  );
}

export default function GlitchCyberPortfolioSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [termLines, setTermLines] = useState<string[]>(["$ system boot...", "$ loading profile..."]);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const LOG_LINES = [
    "$ profile loaded — @ghost_dev",
    "$ 6 active projects",
    "$ security clearance: LEVEL_5",
    "$ kernel version: 7.3.1-custom",
    "$ all systems nominal",
  ];

  useEffect(() => {
    let i = 2;
    const t = setInterval(() => {
      if (i >= LOG_LINES.length) { clearInterval(t); return; }
      setTermLines(l => [...l, LOG_LINES[i++]]);
    }, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="premium-theme bg-[#030507] text-white min-h-screen overflow-x-hidden font-mono">

      {/* Scanline overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,136,0.015) 3px, rgba(0,255,136,0.015) 4px)", backgroundSize: "100% 4px" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#030507]/95 backdrop-blur-xl border-b border-[#00ff88]/10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-black uppercase tracking-[0.3em] text-[#00ff88]">GHOST_DEV<span className="animate-pulse">_</span></motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Projects", "Skills", "Research", "Contact"].map(l => (
            <a key={l} href="#" className="hover:text-[#00ff88] transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest border border-[#00ff88]/30 text-[#00ff88] px-5 py-2 hover:bg-[#00ff88]/10 transition-all">Hire Me</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#030507] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/40"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl uppercase text-[#00ff88]">
              {["Projects", "Skills", "Research", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-574071?w=800&q=80" alt="Cyber" fill className="object-cover opacity-8" unoptimized />
        </motion.div>
        {/* Grid background */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-8" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-28 max-w-5xl">
          {/* Terminal block */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-black/60 border border-[#00ff88]/20 p-4 mb-10 max-w-sm">
            <div className="flex gap-1.5 mb-3"><div className="w-2.5 h-2.5 rounded-full bg-red-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/70" /></div>
            <div className="space-y-1">
              {termLines.map((l, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] text-[#00ff88]/80">{l}</motion.p>
              ))}
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="text-6xl md:text-[8vw] font-black uppercase leading-none tracking-tighter mb-6">
            <GlitchText text="GHOST" /><br />
            <span className="text-[#00ff88]"><GlitchText text="DEV" /></span><br />
            <GlitchText text="PORTFOLIO" />
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-white/40 text-sm max-w-xl mb-8 leading-relaxed">
            Systems programmer, security researcher, and ML engineer. Building things that shouldn't exist — and making sure they work when they do.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-4">
            <a href="#projects" className="bg-[#00ff88] text-black px-8 py-3 text-[10px] uppercase tracking-widest font-black hover:bg-[#00cc70] transition-colors flex items-center gap-2">
              View Projects <ArrowRight size={12} />
            </a>
            <a href="#" className="border border-white/10 text-white/50 px-8 py-3 text-[10px] uppercase tracking-widest hover:border-[#00ff88]/40 hover:text-white transition-all">
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#00ff88]/5 border-y border-[#00ff88]/15 py-3">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-10 whitespace-nowrap">
          {Array(20).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest text-[#00ff88]/30 shrink-0">Rust · Go · Python · C++ · CUDA · WASM · Solidity · eBPF · ZK-Proofs ·</span>
          ))}
        </motion.div>
      </div>

      {/* PROJECTS */}
      <section id="projects" className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#00ff88]/50 mb-4">Work</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">
            <GlitchText text="Projects" />
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <motion.div className="group relative overflow-hidden border border-white/6 cursor-pointer" style={{ height: "40vh" }} onClick={() => setActiveProject(p.id)} whileHover={{ borderColor: p.color + "50" }}>
                <Image src={p.img} alt={p.name} fill className="object-cover opacity-20 group-hover:opacity-35 transition-all duration-600 group-hover:scale-105" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030507] to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest px-2 py-1 border" style={{ color: p.color, borderColor: p.color + "40" }}>{p.type}</span>
                    <span className="text-[9px] text-white/20">{p.year}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-2xl uppercase tracking-tight mb-2" style={{ color: p.color }}>{p.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map(t => <span key={t} className="text-[8px] uppercase tracking-widest bg-white/5 text-white/40 px-2 py-1">{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} style={{ color: p.color }} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-8 md:px-16 py-24 bg-[#060a0d] border-y border-white/5">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#00ff88]/50 mb-4">Capabilities</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">Skill<br />Matrix</h2>
        </Reveal>
        <div className="max-w-2xl">
          {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 0.12} />)}
        </div>
      </section>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject !== null && (() => {
          const p = PROJECTS.find(x => x.id === activeProject)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#030507]/95 flex items-center justify-center p-8" onClick={() => setActiveProject(null)}>
              <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
                <div className="relative h-60 overflow-hidden">
                  <Image src={p.img} alt={p.name} fill className="object-cover opacity-40" unoptimized />
                  <div className="absolute inset-0 border-2" style={{ borderColor: p.color + "50" }} />
                </div>
                <div className="bg-[#0d1117] border border-white/8 p-6">
                  <span className="text-[9px] uppercase tracking-widest px-2 py-1 border mb-3 inline-block" style={{ color: p.color, borderColor: p.color + "40" }}>{p.type}</span>
                  <h3 className="font-black text-3xl uppercase tracking-tight mb-3" style={{ color: p.color }}>{p.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map(t => <span key={t} className="text-[9px] uppercase tracking-widest bg-white/5 text-white/50 px-3 py-1.5">{t}</span>)}
                  </div>
                  <a href="#" className="text-[10px] uppercase tracking-widest border flex items-center gap-2 px-5 py-2.5 w-fit hover:opacity-80 transition-opacity" style={{ color: p.color, borderColor: p.color + "40" }}>
                    View on GitHub <ArrowUpRight size={12} />
                  </a>
                </div>
                <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={18} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* CTA */}
      <section className="px-8 md:px-16 py-28 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#00ff88]/40 mb-6">Available for Hire</p>
          <h2 className="text-6xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-10">
            <GlitchText text="Let's Build" /><br />
            <span className="text-[#00ff88]"><GlitchText text="Something" /></span><br />
            <GlitchText text="Dangerous." />
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="mailto:ghost@dev.null" className="bg-[#00ff88] text-black px-12 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-[#00cc70] transition-colors inline-flex items-center gap-3">
            ghost@dev.null <ArrowRight size={14} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#00ff88]/10 px-8 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-[#00ff88] font-black text-sm uppercase tracking-[0.3em]">GHOST_DEV</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/25">
          {["GitHub", "X", "Keybase", "Matrix"].map(l => <a key={l} href="#" className="hover:text-[#00ff88] transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/15 uppercase">© 2026</p>
      </footer>
    </div>
  );
}
