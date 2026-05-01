"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Layers, Grid, Ruler, Compass, Building, ChevronDown, ArrowUpRight, Plus } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "AXIS TOWER", type: "High-Rise", phase: "Construction", location: "Frankfurt", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop", desc: "200m mixed-use tower integrating biophilic systems throughout all 54 floors.", year: 2026 },
  { id: 2, name: "RIVER QUAY", type: "Urban Plan", phase: "Design", location: "Lyon", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop", desc: "3km of former industrial waterfront transformed into civic infrastructure.", year: 2025 },
  { id: 3, name: "STRATUM CULTURAL CENTER", type: "Cultural", phase: "Complete", location: "Oslo", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop", desc: "Public arts complex designed around a geothermally heated civic plaza.", year: 2024 },
  { id: 4, name: "MINERAL CAMPUS", type: "Education", phase: "Complete", location: "Zurich", img: "https://images.unsplash.com/photo-1490750967868-88df5691cc5c?q=80&w=1000&auto=format&fit=crop", desc: "Research university organized around a passive-house courtyard spine.", year: 2023 },
];

const SERVICES = [
  { icon: Building, title: "Urban Design", desc: "City-scale thinking: blocks, corridors, and the spaces between buildings." },
  { icon: Layers, title: "Building Design", desc: "From schematic concept to construction documentation and site supervision." },
  { icon: Compass, title: "Landscape Integration", desc: "Ecological systems embedded in structure, not applied as ornament." },
  { icon: Ruler, title: "Interior Architecture", desc: "Spatial sequences that serve both function and phenomenological depth." },
];

const STATS = [
  { value: 41, suffix: "", label: "Built Projects" },
  { value: 9, suffix: "", label: "Countries" },
  { value: 18, suffix: "", label: "Awards" },
  { value: 2000, suffix: "+", label: "Housing Units" },
];

const PHASES = ["All", "Design", "Construction", "Complete"];

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

export default function StructuralBlueprintSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhase, setActivePhase] = useState("All");
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const filtered = activePhase === "All" ? PROJECTS : PROJECTS.filter(p => p.phase === activePhase);

  const FAQS = [
    { q: "What scale of projects do you take on?", a: "From single residential interventions to 50-hectare urban masterplans. We size the team to the project." },
    { q: "How do you approach sustainability?", a: "Passive performance first — orientation, thermal mass, natural ventilation. Active systems fill the remaining gap. We target BREEAM Outstanding on every project." },
    { q: "Do you work internationally?", a: "Yes. We have active projects in 9 countries and are registered to practice in France, Germany, Switzerland, the UK, and the Nordics." },
  ];

  return (
    <div className="premium-theme bg-[#f5f3ef] text-[#111] min-h-screen overflow-x-hidden">

      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#f5f3ef]/85 backdrop-blur-xl border-b border-[#111]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-black uppercase tracking-[0.35em]">BLUEPRINT</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] opacity-40">
          {["Projects", "Services", "Team", "Contact"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[100] bg-[#111] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase">
              {["Projects", "Services", "Team", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-574071?w=800&q=80" alt="Blueprint" fill className="object-cover opacity-55" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/15 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6">Architectural Practice — Urban Scale & Above</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }} className="text-white text-[9vw] md:text-[6vw] font-black uppercase leading-none tracking-tighter mb-8">
            Cities Are<br />Built on<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Drawings.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-5 items-center">
            <a href="#projects" className="text-white border border-white/30 px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#111] transition-all">View Projects</a>
            <ChevronDown size={14} className="text-white/30 animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#111] py-4">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-white/20 shrink-0">Urban Design · Structural Architecture · Environmental Performance · City Scale ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-6xl font-black tracking-tighter mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-40">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-8 md:px-16 py-16">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-3">Portfolio</p>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Projects</h2>
          </div>
          <div className="flex gap-2">
            {PHASES.map(p => (
              <button key={p} onClick={() => setActivePhase(p)} className={`text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${activePhase === p ? "bg-[#111] text-white border-[#111]" : "border-[#111]/15 hover:border-[#111]/40"}`}>{p}</button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={activePhase} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: i === 0 ? "60vh" : "40vh" }} onClick={() => setActiveProject(p.id)} whileHover={{ scale: 1.01 }}>
                  <Image src={p.img} alt={p.name} fill className="object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/40 mb-2">
                      <span>{p.type}</span><span>·</span><span>{p.location}</span><span>·</span><span className={`px-2 py-0.5 ${p.phase === "Complete" ? "bg-green-500/20 text-green-400" : p.phase === "Construction" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"}`}>{p.phase}</span>
                    </div>
                    <h3 className="font-black text-2xl text-white uppercase tracking-tight">{p.name}</h3>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight size={18} className="text-white" /></div>
                </motion.div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject !== null && (() => {
          const p = PROJECTS.find(x => x.id === activeProject)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#111]/95 flex items-center justify-center p-8" onClick={() => setActiveProject(null)}>
              <motion.div initial={{ scale: 0.92, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }} className="max-w-4xl w-full bg-[#1a1a1a]" onClick={e => e.stopPropagation()}>
                <div className="relative h-[55vh]"><Image src={p.img} alt={p.name} fill className="object-cover" unoptimized /></div>
                <div className="p-8 flex items-end justify-between">
                  <div>
                    <div className="flex gap-2 text-[9px] uppercase tracking-widest text-white/30 mb-2"><span>{p.type}</span><span>·</span><span>{p.location}</span><span>·</span><span>{p.year}</span></div>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight mb-2">{p.name}</h3>
                    <p className="text-white/40 text-sm max-w-md">{p.desc}</p>
                  </div>
                  <a href="#" className="shrink-0 text-[10px] uppercase tracking-widest text-white border border-white/20 px-5 py-2.5 hover:bg-white hover:text-[#111] transition-all flex items-center gap-2">Case Study <ArrowRight size={12} /></a>
                </div>
                <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 text-white bg-black/60 p-1.5 rounded-full"><X size={16} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* SERVICES */}
      <section className="bg-[#111] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-14">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Capabilities</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">What We<br />Deliver</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="bg-[#111] p-8 group hover:bg-[#1a1a1a] transition-colors">
              <s.icon size={22} className="text-white/30 group-hover:text-white transition-colors mb-5" />
              <h3 className="font-black text-base uppercase tracking-tight mb-2">{s.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Questions</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">FAQ</h2>
        </Reveal>
        <div className="max-w-3xl divide-y divide-[#111]/8">
          {FAQS.map((f, i) => (
            <div key={i} className="py-6">
              <button className="flex items-center justify-between w-full text-left gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-black text-lg uppercase tracking-tight">{f.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}><Plus size={16} className="opacity-40 shrink-0" /></motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-sm opacity-50 leading-relaxed mt-3 overflow-hidden">{f.a}</motion.p>}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] text-white px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4">New Commission</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
            Start a<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Project.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="border border-white/25 text-white px-10 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-white hover:text-[#111] transition-all flex items-center gap-2">
            Brief the Practice <ArrowRight size={13} />
          </a>
        </Reveal>
      </section>

      <footer className="bg-[#0a0a0a] text-white px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-black text-sm uppercase tracking-[0.3em]">BLUEPRINT</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["Instagram", "Awards", "Press", "Contact"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 Blueprint Architecture</p>
      </footer>
    </div>
  );
}
