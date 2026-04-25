"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from "lucide-react";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*!?<>";

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const [hovering, setHovering] = useState(false);
  const scramble = useCallback(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, idx) => {
        if (char === " ") return " ";
        if (idx < iter) return text[idx];
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }).join(""));
      if (iter >= text.length) clearInterval(interval);
      iter += 0.5;
    }, 40);
  }, [text]);
  return (
    <span className={`cursor-default select-none ${className}`} onMouseEnter={() => { setHovering(true); scramble(); }} onMouseLeave={() => { setHovering(false); setDisplay(text); }}>
      {display}
    </span>
  );
}

const FILMS = [
  { id: 1, title: "SIGNAL LOST", genre: "Sci-Fi Short", year: 2025, duration: "12m", thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80", color: "#ff2d55" },
  { id: 2, title: "NEON PULSE", genre: "Music Video", year: 2025, duration: "4m", thumbnail: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1200&q=80", color: "#bf5af2" },
  { id: 3, title: "LAST FRAME", genre: "Experimental", year: 2024, duration: "8m", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80", color: "#30d158" },
  { id: 4, title: "VOID WALK", genre: "Documentary", year: 2024, duration: "22m", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80", color: "#ffd60a" },
];

const CLIENTS = ["NETFLIX", "A24", "BBC", "CANAL+", "ARTE", "HBO", "MUBI", "SUNDANCE"];

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

export default function GlitchVideoHero() {
  const [activeFilm, setActiveFilm] = useState(FILMS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [filmIdx, setFilmIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Auto-cycle hero films
  useEffect(() => {
    const t = setInterval(() => {
      setFilmIdx(i => {
        const next = (i + 1) % FILMS.length;
        setActiveFilm(FILMS[next]);
        return next;
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "Do you shoot on film or digital?", a: "Both — 35mm and 16mm for narrative projects, ALEXA 35 and RED V-RAPTOR for commercial. Format driven by vision, not budget." },
    { q: "What's your typical lead time?", a: "Concept-to-delivery is typically 6–12 weeks for shorts, 3–6 months for branded content campaigns." },
    { q: "Do you handle post-production?", a: "Full in-house post: color grading on DaVinci Resolve, sound design, VFX compositing. One stop." },
    { q: "Can you shoot internationally?", a: "Yes — we've shot in 24 countries. Travel and fixers are costed into production budgets on request." },
  ];

  return (
    <div className="min-h-screen bg-[#060408] text-white" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Scanlines */}
      <div className="fixed inset-0 z-[3] pointer-events-none opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)" }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060408] to-transparent pointer-events-none" />
        <span className="relative text-sm font-black tracking-[0.2em] uppercase">
          <GlitchText text="DEAD_FRAME" />
        </span>
        <div className="relative hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Work", "Process", "Awards", "Contact"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity"><GlitchText text={l} /></a>
          ))}
        </div>
        <MagneticBtn className="relative hidden md:block px-5 py-2 border border-white/20 text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 transition-colors">
          <GlitchText text="HIRE US" />
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="relative md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-white mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#060408] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Work", "Process", "Awards", "Contact"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:opacity-50 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={activeFilm.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
            <Image src={activeFilm.thumbnail} alt={activeFilm.title} fill unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060408] via-[#060408]/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Glitch overlay */}
        <motion.div animate={{ opacity: [0, 0.04, 0, 0.02, 0] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }} className="absolute inset-0 bg-white pointer-events-none z-10" />

        <div className="relative z-20 px-8 md:px-16 pb-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilm.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: activeFilm.color }}>{activeFilm.genre} · {activeFilm.year} · {activeFilm.duration}</p>
              <h1 className="text-6xl md:text-[10rem] font-black leading-none tracking-tight mb-6">
                <GlitchText text={activeFilm.title} className="text-white" />
              </h1>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-3 border border-white/20 px-5 py-3 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors">
                {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? "Pause" : "Play Reel"}
              </button>
              <button onClick={() => setMuted(!muted)} className="opacity-40 hover:opacity-100 transition-opacity">
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
            {/* Film selector dots */}
            <div className="flex gap-3">
              {FILMS.map((f, i) => (
                <button key={f.id} onClick={() => { setFilmIdx(i); setActiveFilm(f); }} className="w-10 h-1 transition-all" style={{ background: i === filmIdx ? activeFilm.color : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Film counter */}
        <div className="absolute top-24 right-8 z-20 text-right hidden md:block">
          <div className="text-[10px] tracking-[0.3em] opacity-30">{String(filmIdx + 1).padStart(2, "0")} / {String(FILMS.length).padStart(2, "0")}</div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-white/5 py-3 overflow-hidden">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(10).fill(0).map((_, i) => CLIENTS.map(c => (
            <span key={`${i}-${c}`} className="text-[10px] tracking-[0.3em] uppercase opacity-20">{c} ·</span>
          )))}
        </motion.div>
      </div>

      {/* Work Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-3xl font-black tracking-tight mb-2 uppercase"><GlitchText text="Selected Work" /></h2></Reveal>
        <Reveal delay={0.1}><p className="text-sm opacity-40 mb-16">Films, videos, and moving images that don't play it safe.</p></Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {FILMS.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setActiveFilm(f)} className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: "16/9" }}>
                <Image src={f.thumbnail} alt={f.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060408]/80 to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-colors" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-[10px] tracking-widest uppercase mb-1 opacity-50">{f.genre} · {f.duration}</p>
                  <h3 className="text-xl font-black tracking-wide" style={{ color: f.color }}>{f.title}</h3>
                </div>
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={20} className="text-white" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ label: "Films Completed", value: 64, suffix: "" }, { label: "Festival Selections", value: 120, suffix: "+" }, { label: "Countries", value: 24, suffix: "" }, { label: "Awards", value: 38, suffix: "" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2" style={{ color: FILMS[i % FILMS.length].color }}><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.25em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <Reveal><h2 className="text-2xl font-black tracking-tight mb-16 uppercase"><GlitchText text="How We Work" /></h2></Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Development", desc: "Script, storyboard, mood. We don't pre-visualise — we pre-feel." },
            { num: "02", title: "Production", desc: "Single-camera. Real locations. Minimal crew. Maximum intent." },
            { num: "03", title: "Post", desc: "Color, sound, edit. Every frame earns its place or gets cut." },
          ].map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div className="border-t border-white/10 pt-6">
                <div className="text-[10px] tracking-[0.3em] opacity-20 mb-4">{s.num}</div>
                <h3 className="text-lg font-black mb-3">{s.title}</h3>
                <p className="text-sm opacity-40 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0a0810] px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-xl font-black tracking-tight uppercase mb-12"><GlitchText text="FAQ" /></h2></Reveal>
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
        <motion.div animate={{ opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${activeFilm.color}30, transparent 60%)` }} />
        <div className="relative z-10">
          <Reveal><h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 leading-none uppercase">
            <GlitchText text="LET'S MAKE" /><br /><span style={{ color: activeFilm.color }}><GlitchText text="SOMETHING" /></span>
          </h2></Reveal>
          <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">We work with brands, agencies, and independent artists who have something real to say.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 font-black text-xs tracking-[0.2em] uppercase text-[#060408]" style={{ background: activeFilm.color }}>
              Start a Project <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-20 tracking-wider uppercase">
        <GlitchText text="DEAD_FRAME © 2026" />
        <div className="flex gap-8">{["Instagram", "Vimeo", "Festival", "Contact"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>
    </div>
  );
}
