"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, ChevronDown, ArrowUpRight, Award, MapPin, Play } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "VOID TOWER", location: "Oslo, NO", year: "2026", type: "Mixed Use", awards: 2, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop", hero: true, desc: "72 floors. Zero extrusion from the silhouette. Every service element folded into the structural logic." },
  { id: 2, title: "THERMAL WING", location: "Lyon, FR", year: "2025", type: "Cultural", awards: 1, img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop", hero: false, desc: "An arts center whose envelope harvests geothermal energy and redistributes it as radiant heat." },
  { id: 3, title: "MEMBRANE BRIDGE", location: "Copenhagen, DK", year: "2025", type: "Infrastructure", awards: 3, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop", hero: false, desc: "A pedestrian crossing that flexes under load, actively reducing wind-induced vibration." },
  { id: 4, title: "STRATA CAMPUS", location: "Zurich, CH", year: "2024", type: "Education", awards: 0, img: "https://images.unsplash.com/photo-1490750967868-88df5691cc5c?q=80&w=1000&auto=format&fit=crop", hero: false, desc: "A university research facility organized around a central void — social infrastructure made spatial." },
];

const FACTS = [
  { value: 31, suffix: "", label: "Built Projects" },
  { value: 14, suffix: "", label: "Awards" },
  { value: 7, suffix: "", label: "Countries" },
  { value: 2026, suffix: "", label: "Active Since (est.)" },
];

const PROCESS = [
  { step: "01", title: "Brief & Site", desc: "We read sites like texts — their geology, history, light, and social context all inform the first sketch." },
  { step: "02", title: "Structural Concept", desc: "Structure and program are designed simultaneously. We do not add a structure to a floor plan." },
  { step: "03", title: "Environmental Logic", desc: "Every project targets passive energy performance before active systems are considered." },
  { step: "04", title: "Material Selection", desc: "Material honesty: structure visible, services legible, joints celebrated, not hidden." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
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

export default function ArchitectureStory() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 220]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="premium-theme bg-[#f6f4f0] text-[#111] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-[#f6f4f0]/85 backdrop-blur-xl border-b border-[#111]/6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.35em]">STRATUM</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] opacity-40">
          {["Projects", "Practice", "Process", "Contact"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[100] bg-[#111] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase">
              {["Projects", "Practice", "Process", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO — Full screen feature project */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src={PROJECTS[0].img} alt={PROJECTS[0].title} fill className="object-cover opacity-65" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/10 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 text-white/40 mb-6 text-[9px] uppercase tracking-widest">
            <span>{PROJECTS[0].type}</span>
            <span>·</span>
            <MapPin size={9} />
            <span>{PROJECTS[0].location}</span>
            <span>·</span>
            <span>{PROJECTS[0].year}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-white text-[9vw] md:text-[6vw] font-black uppercase leading-none tracking-tighter mb-6">
            {PROJECTS[0].title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-white/50 max-w-md text-sm leading-relaxed mb-8">{PROJECTS[0].desc}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex items-center gap-6">
            <a href="#" className="text-white border border-white/25 px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#111] transition-all">View Project</a>
            {PROJECTS[0].awards > 0 && (
              <div className="flex items-center gap-2 text-yellow-400 text-[9px] uppercase tracking-widest">
                <Award size={12} /> {PROJECTS[0].awards} Award{PROJECTS[0].awards > 1 ? "s" : ""}
              </div>
            )}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={16} className="text-white/30" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#111] py-4">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-white/20 shrink-0">Structural Design · Environmental Logic · Material Honesty · Built Architecture ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {FACTS.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.1} className="text-center">
            <div className="text-6xl font-black tracking-tighter mb-2"><Counter target={f.value} suffix={f.suffix} /></div>
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-40">{f.label}</div>
          </Reveal>
        ))}
      </section>

      {/* PROJECTS GRID */}
      <section className="px-8 md:px-16 py-16">
        <Reveal className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Selected Work</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Projects</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: i === 0 ? "65vh" : "45vh" }} onClick={() => setActiveProject(p.id)} whileHover={{ scale: 1.01 }}>
                <Image src={p.img} alt={p.title} fill className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/50 mb-2">
                    <span>{p.type}</span>
                    <span>·</span>
                    <MapPin size={8} />
                    <span>{p.location}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="text-white font-black text-3xl uppercase tracking-tight mb-2">{p.title}</h3>
                  {p.awards > 0 && (
                    <div className="flex items-center gap-1.5 text-yellow-400 text-[9px] uppercase tracking-widest">
                      <Award size={10} /> {p.awards} Award{p.awards > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject !== null && (() => {
          const p = PROJECTS.find(x => x.id === activeProject)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#111]/96 flex items-center justify-center p-8" onClick={() => setActiveProject(null)}>
              <motion.div initial={{ scale: 0.92, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 40 }} className="max-w-4xl w-full bg-[#1a1a1a]" onClick={e => e.stopPropagation()}>
                <div className="relative h-[55vh]">
                  <Image src={p.img} alt={p.title} fill className="object-cover" unoptimized />
                </div>
                <div className="p-8 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 mb-2">
                      <span>{p.type}</span><span>·</span><MapPin size={8} /><span>{p.location}</span><span>·</span><span>{p.year}</span>
                    </div>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight mb-2">{p.title}</h3>
                    <p className="text-white/40 text-sm max-w-md leading-relaxed">{p.desc}</p>
                  </div>
                  <a href="#" className="shrink-0 text-[10px] uppercase tracking-widest text-white border border-white/20 px-6 py-2.5 hover:bg-white hover:text-[#111] transition-all flex items-center gap-2">
                    Full Project <ArrowRight size={12} />
                  </a>
                </div>
                <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 text-white bg-black/60 p-1.5 rounded-full"><X size={16} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* PROCESS */}
      <section className="bg-[#111] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-14">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Method</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">How We<br />Design</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1} className="bg-[#111] p-8 border-t-2 border-white/10 hover:border-white/30 transition-colors">
              <p className="text-[10px] uppercase tracking-widest text-white/20 mb-4">{p.step}</p>
              <h3 className="font-black text-xl uppercase tracking-tight mb-3">{p.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-28 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6">New Commission</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-10">
            Start a<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #111" }}>Project.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-[#111] text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:bg-[#333] transition-colors inline-flex items-center gap-3">
            Brief Us <ArrowRight size={14} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] text-white px-8 md:px-16 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/5">
        <div>
          <p className="font-black text-lg uppercase tracking-[0.3em] mb-1">STRATUM</p>
          <p className="text-xs text-white/30">Architecture & Urban Practice</p>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["Instagram", "Awards", "Press", "Collaborate"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 Stratum Architecture</p>
      </footer>
    </div>
  );
}
