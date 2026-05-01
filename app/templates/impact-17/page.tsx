"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Maximize2, Layers, Shield, Ruler, Grid, Eye, ChevronDown, ArrowUpRight, Play, Plus, Minus } from "lucide-react";
import "../premium.css";

const WORKS = [
  { id: 1, title: "TOWER_SYNTHESIS", cat: "Structural", year: "2025", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2", desc: "A vertical study in load-bearing poetry. Cast concrete meets spatial narrative." },
  { id: 2, title: "STAIRCASE_01", cat: "Interior", year: "2024", img: "https://images.unsplash.com/photo-1518005020251-582c7eb8365d?q=80&w=1000&auto=format&fit=crop", span: "", desc: "Helical tension resolved through material dialogue." },
  { id: 3, title: "BRUTALFORM_X", cat: "Urban", year: "2025", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop", span: "", desc: "Monolithic presence in contested terrain." },
  { id: 4, title: "MEMBRANE_III", cat: "Facade", year: "2026", img: "https://images.unsplash.com/photo-1490750967868-88df5691cc5c?q=80&w=1000&auto=format&fit=crop", span: "", desc: "A tensile skin reading wind as structural data." },
  { id: 5, title: "ARCHIVE_ZERO", cat: "Cultural", year: "2024", img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=1000&auto=format&fit=crop", span: "", desc: "Memory embedded in the section cut." },
];

const STATS = [
  { value: 47, suffix: "", label: "Built Projects" },
  { value: 12, suffix: "yrs", label: "Practice" },
  { value: 23, suffix: "", label: "Awards" },
  { value: 6, suffix: "M m²", label: "Realized" },
];

const SERVICES = [
  { icon: Ruler, title: "Structural Design", desc: "Load analysis, material specification, and tectonic resolution across scales." },
  { icon: Layers, title: "Urban Masterplan", desc: "Systems-level thinking for cities, blocks, and contested territories." },
  { icon: Grid, title: "Facade Engineering", desc: "Skins that breathe, filter, and perform across seasons and climates." },
  { icon: Eye, title: "Heritage Retrofit", desc: "Interventions that respect existing matter while enabling new programs." },
  { icon: Shield, title: "Seismic Resilience", desc: "Structures designed to absorb, adapt, and recover under ground motion." },
  { icon: Maximize2, title: "Digital Fabrication", desc: "Parametric form-finding translated directly to CNC and robotic output." },
];

const FAQS = [
  { q: "What defines your structural philosophy?", a: "We reject the separation of structure and architecture. Every beam, column, and joint carries expressive weight — it is both engineered and authored." },
  { q: "Do you work with historic buildings?", a: "Heritage retrofits constitute 30% of our portfolio. We believe existing matter contains encoded knowledge that new construction rarely achieves." },
  { q: "How do you handle sustainability?", a: "Our approach is material-first: local sourcing, structural honesty (no false ceilings hiding systems), and designing for disassembly from the outset." },
  { q: "What is your typical project timeline?", a: "From concept to construction completion, most projects span 3 to 7 years. We do not rush structural work — the built outcome outlives our practice." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
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
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StructuralMasonrySPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.08]);

  // Magnetic CTA
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });
  const handleMag = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.35);
    my.set((e.clientY - r.top - r.height / 2) * 0.35);
  }, [mx, my]);
  const resetMag = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <div className="premium-theme bg-[#f7f5f2] text-[#111] min-h-screen font-mono overflow-x-hidden" ref={containerRef}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-[#f7f5f2]/80 backdrop-blur-xl border-b border-[#111]/8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.3em]">CONCRETE_VISIONS™</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] opacity-50">
          {["Practice", "Projects", "Research", "Contact"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#111]/20 px-4 py-2 hover:bg-[#111] hover:text-white transition-all">
            {view === "grid" ? <Grid size={12} /> : <Layers size={12} />} {view === "grid" ? "List" : "Grid"}
          </button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[100] bg-[#111] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tight">
              {["Practice", "Projects", "Research", "Contact"].map(l => (
                <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">{l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#111]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-196645?w=800&q=80" alt="Architecture" fill className="object-cover opacity-50" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[10px] uppercase tracking-[0.5em] text-white/50 mb-6">Structural Design Practice — Est. 2013</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-white text-[10vw] md:text-[7vw] font-black uppercase leading-none tracking-tighter mb-8">
            Structure<br />is<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Language</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-center gap-6">
            <a href="#works" className="text-white border border-white/30 px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#111] transition-all">View Work</a>
            <ChevronDown size={16} className="text-white/50 animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#111] py-4 border-y border-white/10">
        <motion.div animate={{ x: [0, -2400] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(20).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-white/30 shrink-0">Structural Design · Tectonic Research · Material Honesty · Built Environment ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="px-8 md:px-16 py-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#111]/10">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-[#f7f5f2] p-10 text-center">
            <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-40">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* WORKS GALLERY */}
      <section id="works" className="px-8 md:px-16 py-24">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-3">Selected Works — 2024/2026</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">The<br />Portfolio</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView("grid")} className={`p-2 border transition-all ${view === "grid" ? "bg-[#111] text-white border-[#111]" : "border-[#111]/20"}`}><Grid size={14} /></button>
            <button onClick={() => setView("list")} className={`p-2 border transition-all ${view === "list" ? "bg-[#111] text-white border-[#111]" : "border-[#111]/20"}`}><Layers size={14} /></button>
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {WORKS.map((w, i) => (
                <Reveal key={w.id} delay={i * 0.08} className={w.span || ""}>
                  <motion.div className="group relative overflow-hidden cursor-pointer bg-[#111]" style={{ height: i === 0 ? "60vh" : "35vh" }} onClick={() => setActiveWork(w.id)} whileHover={{ scale: 1.01 }}>
                    <Image src={w.img} alt={w.title} fill className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/60 mb-1">{w.cat} / {w.year}</p>
                        <p className="text-white font-black text-lg uppercase tracking-tight">{w.title}</p>
                        <p className="text-white/60 text-xs mt-1">{w.desc}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={20} className="text-white" />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col divide-y divide-[#111]/10">
              {WORKS.map((w, i) => (
                <motion.div key={w.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-6 py-6 group cursor-pointer hover:pl-4 transition-all" onClick={() => setActiveWork(w.id)}>
                  <span className="text-[10px] opacity-30 w-6">{String(i + 1).padStart(2, "0")}</span>
                  <div className="w-16 h-10 overflow-hidden shrink-0">
                    <Image src={w.img} alt={w.title} width={64} height={40} className="object-cover w-full h-full group-hover:scale-110 transition-transform" unoptimized />
                  </div>
                  <p className="font-black uppercase tracking-tight flex-1 text-lg">{w.title}</p>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 hidden md:block">{w.cat}</span>
                  <span className="text-[10px] opacity-30">{w.year}</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* WORK LIGHTBOX */}
      <AnimatePresence>
        {activeWork !== null && (() => {
          const w = WORKS.find(x => x.id === activeWork)!;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#111]/95 flex items-center justify-center p-8" onClick={() => setActiveWork(null)}>
              <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                <div className="relative h-[60vh]">
                  <Image src={w.img} alt={w.title} fill className="object-cover" unoptimized />
                </div>
                <div className="bg-[#1a1a1a] p-8 flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">{w.cat} — {w.year}</p>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight">{w.title}</h3>
                    <p className="text-white/50 text-sm mt-2 max-w-md">{w.desc}</p>
                  </div>
                  <a href="#" className="shrink-0 text-[10px] uppercase tracking-widest text-white border border-white/20 px-5 py-2 hover:bg-white hover:text-[#111] transition-all flex items-center gap-2">View Full <ArrowRight size={12} /></a>
                </div>
                <button onClick={() => setActiveWork(null)} className="absolute top-4 right-4 text-white bg-[#111]/80 p-2 rounded-full"><X size={16} /></button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* SERVICES */}
      <section className="bg-[#111] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4">Expertise</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">What<br />We Build</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="bg-[#111] p-8 group hover:bg-[#1a1a1a] transition-colors border border-white/5">
              <s.icon size={24} className="mb-6 text-white/40 group-hover:text-white transition-colors" />
              <h3 className="font-black uppercase text-xl tracking-tight mb-3">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">How We Work</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">The Process</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-[#111]/15 hidden md:block" />
          {["01 — Brief", "02 — Concept", "03 — Engineering", "04 — Delivery"].map((step, i) => (
            <Reveal key={step} delay={i * 0.15} className="relative pt-16 pr-8">
              <div className="absolute top-6 left-0 w-4 h-4 bg-[#111] rounded-full hidden md:block" style={{ left: i === 0 ? 0 : "calc(0% - 8px)" }} />
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">{step.split(" — ")[0]}</p>
              <p className="font-black text-xl uppercase tracking-tight">{step.split(" — ")[1]}</p>
              <p className="text-sm opacity-40 mt-2">
                {["Listening carefully to spatial and structural ambitions.", "Developing structural systems that carry expressive intent.", "Detailed drawings, material specifications, coordinated consultants.", "On-site presence until the last joint is closed."][i]}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 md:px-16 py-24 bg-[#111] text-white">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4">Questions</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">FAQ</h2>
        </Reveal>
        <div className="max-w-3xl divide-y divide-white/10">
          {FAQS.map((f, i) => (
            <div key={i} className="py-6">
              <button className="flex items-center justify-between w-full text-left gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-black text-lg uppercase tracking-tight">{f.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <Plus size={18} className="shrink-0 text-white/40" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-white/50 text-sm leading-relaxed mt-4 overflow-hidden">{f.a}</motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-32 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6">Start a Conversation</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-10">Build<br />Something<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #111" }}>Lasting</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <motion.button style={{ x: sx, y: sy }} onMouseMove={handleMag} onMouseLeave={resetMag} className="bg-[#111] text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:bg-[#333] transition-colors flex items-center gap-3">
            Commission a Project <ArrowRight size={14} />
          </motion.button>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] text-white px-8 md:px-16 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-white/10">
        <div>
          <p className="font-black text-lg uppercase tracking-[0.2em] mb-2">CONCRETE_VISIONS™</p>
          <p className="text-xs text-white/30">Structural Design Practice</p>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/40">
          {["Instagram", "LinkedIn", "Awards", "Press"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] uppercase tracking-widest text-white/20">© 2026 CONCRETE_VISIONS™</p>
      </footer>
    </div>
  );
}
