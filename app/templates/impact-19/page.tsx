"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Globe, Zap, Shield, Play, ChevronRight, MessageSquare, Star, Users, Award, Palette, Camera, Code, Music } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "ORBIT_X", tag: "Exhibition", color: "#ff6b35", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop", desc: "Immersive digital installation, Venice Biennale 2026." },
  { id: 2, name: "SABLE_WAVE", tag: "Brand Identity", color: "#7c3aed", img: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=1000&auto=format&fit=crop", desc: "Complete identity system for luxury fashion house." },
  { id: 3, name: "DEEP_FIELD", tag: "Motion Design", color: "#0891b2", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop", desc: "Generative cosmos for science documentary series." },
  { id: 4, name: "KINESIS_IV", tag: "Interactive", color: "#16a34a", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop", desc: "Biometric responsive installation for tech campus." },
  { id: 5, name: "NEON_ARCH", tag: "Spatial Design", color: "#dc2626", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop", desc: "Architectural light narrative, Tokyo Midtown." },
  { id: 6, name: "FORMA_I", tag: "Product Design", color: "#d97706", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop", desc: "Sculptural audio device for a Berlin collective." },
];

const STATS = [
  { value: 89, suffix: "", label: "Projects Delivered" },
  { value: 14, suffix: "", label: "Team Members" },
  { value: 26, suffix: "", label: "Awards Won" },
  { value: 8, suffix: "yrs", label: "In Practice" },
];

const DISCIPLINES = [
  { icon: Palette, label: "Brand Identity" },
  { icon: Camera, label: "Art Direction" },
  { icon: Code, label: "Digital Experience" },
  { icon: Music, label: "Sound Design" },
  { icon: Globe, label: "Spatial Narrative" },
  { icon: Zap, label: "Motion Design" },
];

const TESTIMONIALS = [
  { name: "Léa Fontaine", role: "Creative Director, Maison Sable", text: "An extraordinarily rare fusion of conceptual depth and technical mastery. The SABLE_WAVE system elevated our brand beyond expectation." },
  { name: "Dr. Ryo Tanaka", role: "Curator, Tokyo Design Week", text: "NEON_ARCH transformed the entire reading of the pavilion. Visitors were transfixed — we extended the run by three weeks." },
  { name: "Sasha Klein", role: "Head of Brand, NeuralSpace", text: "Working with this team changed how we think about creative direction. Not just a vendor — a genuine intellectual partner." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
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

export default function CreativeCollectiveSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showReel, setShowReel] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="premium-theme bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.3em]">COLLECTIVE™</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Studio", "Work", "Process", "Contact"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition-all">Start a Project</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "tween", duration: 0.35 }} className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-5xl font-black uppercase">
              {["Studio", "Work", "Process", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" alt="Creative Collective" fill className="object-cover opacity-40" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-20">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-8">Creative Direction · Digital Experience · Brand Identity</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-7xl md:text-[10vw] font-black uppercase leading-none tracking-tighter mb-10">
            We<br />Make<br />
            <em className="not-italic text-transparent" style={{ WebkitTextStroke: "2px white" }}>Culture.</em>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex items-center gap-6">
            <a href="#work" className="bg-white text-black px-8 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-white/80 transition-colors">View Work</a>
            <button onClick={() => setShowReel(true)} className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center"><Play size={12} className="ml-0.5" /></div>
              Watch Reel
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showReel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={() => setShowReel(false)}>
            <div className="w-full max-w-4xl aspect-video bg-[#111] flex items-center justify-center relative">
              <p className="text-white/30 text-sm uppercase tracking-widest">[ Reel Placeholder ]</p>
              <button onClick={() => setShowReel(false)} className="absolute top-4 right-4 text-white/60 hover:text-white"><X size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-white text-black py-4 border-y border-black/10">
        <motion.div animate={{ x: [0, -3000] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-black/40 shrink-0">Creative Direction · Digital Experience · Art Direction · Motion Design · Brand Identity ·</span>
          ))}
        </motion.div>
      </div>

      {/* DISCIPLINES */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
        {DISCIPLINES.map((d, i) => (
          <Reveal key={d.label} delay={i * 0.07} className="bg-[#0a0a0a] p-8 flex flex-col items-center gap-4 hover:bg-[#161616] transition-colors cursor-default">
            <d.icon size={22} className="text-white/40" />
            <p className="text-[10px] uppercase tracking-widest text-white/40 text-center">{d.label}</p>
          </Reveal>
        ))}
      </section>

      {/* STATS */}
      <section className="px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-6xl font-black tracking-tighter mb-2 text-white"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="work" className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Selected Work — 2024/2026</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Recent<br />Projects</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: "42vh" }} onHoverStart={() => setHovered(p.id)} onHoverEnd={() => setHovered(null)}>
                <Image src={p.img} alt={p.name} fill className="object-cover transition-all duration-700 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <motion.div initial={{ opacity: 0, y: 10 }} animate={hovered === p.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[9px] uppercase tracking-widest px-2 py-1 border text-white/70 border-white/20 mb-3 inline-block" style={{ borderColor: p.color + "50", color: p.color }}>{p.tag}</span>
                  <h3 className="font-black text-2xl uppercase tracking-tight text-white">{p.name}</h3>
                  <p className="text-white/50 text-xs mt-1">{p.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-8 md:px-16 py-24 bg-white text-black">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Client Voices</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">What They<br />Say</h2>
        </Reveal>
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="flex gap-1 mb-6">{Array(5).fill(null).map((_, i) => <Star key={i} size={14} fill="currentColor" className="text-yellow-500" />)}</div>
              <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <div>
                <p className="font-black uppercase tracking-tight">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-sm opacity-50 mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-1 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-black" : "w-3 bg-black/20"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-32 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-6">Let's Work Together</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-10">
            Your Next<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Bold Thing.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-white text-black px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:bg-white/80 transition-colors flex items-center gap-3">
            Start a Project <ArrowRight size={14} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d0d0d] px-8 md:px-16 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/5">
        <div>
          <p className="font-black text-lg uppercase tracking-[0.2em] mb-1">COLLECTIVE™</p>
          <p className="text-xs text-white/30">Creative Direction & Digital Experience</p>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["Instagram", "Behance", "LinkedIn", "Dribbble"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 COLLECTIVE™</p>
      </footer>
    </div>
  );
}
