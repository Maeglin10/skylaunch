"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, TrendingUp, Shield, Activity, BarChart3, Globe, Cpu, ChevronDown, Plus, Check } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { icon: TrendingUp, title: "Growth Strategy", desc: "Market entry, expansion, and competitive repositioning for mid-market and enterprise clients.", tag: "Strategy" },
  { icon: Shield, title: "Risk Architecture", desc: "Board-level scenario planning, stress-testing, and enterprise risk frameworks.", tag: "Risk" },
  { icon: BarChart3, title: "Capital Advisory", desc: "M&A structuring, capital stack optimization, and pre-IPO preparation.", tag: "Finance" },
  { icon: Globe, title: "Global Operations", desc: "Cross-border supply chain redesign and international entity structuring.", tag: "Operations" },
  { icon: Activity, title: "Performance Turnaround", desc: "EBITDA recovery, working capital optimization, and operational transformation.", tag: "Performance" },
  { icon: Cpu, title: "Digital Transformation", desc: "Technology-led business model reinvention with measurable ROI targets.", tag: "Technology" },
];

const CASES = [
  { name: "Restructured €2.4B portfolio", client: "European Infrastructure Group", result: "+34% EBITDA in 18 months", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" },
  { name: "Market entry into 12 markets", client: "SaaS Platform, Series D", result: "€340M ARR achieved", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" },
  { name: "Post-merger integration", client: "Retail Conglomerate", result: "€180M synergies unlocked", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" },
];

const STATS = [
  { value: 240, suffix: "+", label: "Engagements" },
  { value: 18, suffix: "B€", label: "Value Advised" },
  { value: 94, suffix: "%", label: "Client Return Rate" },
  { value: 32, suffix: "", label: "Senior Partners" },
];

const TESTIMONIALS = [
  { name: "Henri Mercier", role: "CEO, Groupe Aldoria", text: "Their ability to synthesize complexity into decisive action plans is without peer. We achieved in 18 months what would have taken our team five years." },
  { name: "Clare Zhang", role: "CFO, Arctis Capital", text: "The risk architecture framework they built now underpins every investment decision we make. It has paid for itself twenty times over." },
  { name: "Marcus Bauer", role: "Chairman, PanEuro Logistics", text: "Rigorous, discreet, and consistently right. They are our first call on any strategic question above €50M." },
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
    const step = target / 55;
    const timer = setInterval(() => {
      s += step;
      if (s >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ExecutiveStrategySPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });
  const handleMag = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.3);
    my.set((e.clientY - r.top - r.height / 2) * 0.3);
  }, [mx, my]);
  const resetMag = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="premium-theme bg-[#06080f] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#06080f]/90 backdrop-blur-xl border-b border-white/5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.35em] text-white">ALDORIA<span className="text-[#3b82f6]">.</span></motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Expertise", "Cases", "Leadership", "Insights", "Contact"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest border border-blue-500/30 text-blue-400 px-5 py-2 hover:bg-blue-500/10 transition-all">Request a Briefing</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#06080f] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/50"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase">
              {["Expertise", "Cases", "Leadership", "Insights", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-574071?w=800&q=80" alt="Strategy" fill className="object-cover opacity-15" unoptimized />
        </motion.div>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080f] via-[#06080f]/70 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-24 max-w-5xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-blue-400/70">Global Strategy Practice</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-6xl md:text-[7.5vw] font-black uppercase leading-none tracking-tighter mb-8">
            Strategic<br />Clarity.<br />
            <span className="text-blue-400">Decisive</span><br />Results.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-white/50 text-lg max-w-xl mb-10 leading-relaxed">
            We advise boards and leadership teams on the decisions that define the next decade. Not slides — outcomes.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex items-center gap-5">
            <motion.a href="#" style={{ x: sx, y: sy }} onMouseMove={handleMag} onMouseLeave={resetMag} className="bg-blue-500 text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-blue-400 transition-colors flex items-center gap-2">
              Request a Briefing <ArrowRight size={13} />
            </motion.a>
            <a href="#cases" className="text-white/40 text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
              Case Studies <ChevronDown size={12} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-blue-500/10 border-y border-blue-500/15 py-3.5">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(16).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest text-blue-400/40 shrink-0">Strategy · M&A Advisory · Risk Architecture · Capital Markets · Board Advisory · Transformation ·</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-[#06080f] p-10 text-center border border-white/5">
            <div className="text-5xl font-black text-blue-400 mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* SERVICES */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Capabilities</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">Our<br />Expertise</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="group bg-[#06080f] p-8 hover:bg-[#0d1120] transition-colors border border-white/5 hover:border-blue-500/20">
              <div className="flex items-start justify-between mb-6">
                <s.icon size={22} className="text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                <span className="text-[9px] uppercase tracking-widest text-white/20 border border-white/10 px-2 py-1">{s.tag}</span>
              </div>
              <h3 className="font-black text-lg uppercase tracking-tight mb-3">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="px-8 md:px-16 py-24 bg-[#09101d]">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Track Record</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Selected<br />Cases</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {CASES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <motion.div className="group bg-[#09101d] overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500/20 transition-colors" whileHover={{ y: -4 }} onClick={() => setActiveCase(i)}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={c.img} alt={c.name} fill className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09101d] to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-[9px] uppercase tracking-widest text-blue-400/60 mb-2">{c.client}</p>
                  <h3 className="font-black text-base uppercase tracking-tight mb-3">{c.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-green-400">
                    <Check size={10} /> {c.result}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Client Perspectives</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">What<br />Leaders Say</h2>
        </Reveal>
        <div className="relative min-h-[200px] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }}>
              <div className="w-8 h-px bg-blue-500 mb-6" />
              <p className="text-2xl font-light leading-relaxed text-white/70 mb-8">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <div>
                <p className="font-black uppercase tracking-tight text-sm">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-xs text-white/30 mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-1 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-blue-500" : "w-3 bg-white/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-500/8 border-y border-blue-500/15 px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-blue-400/50 mb-4">Engage Aldoria</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            The right advice<br />
            <span className="text-blue-400">at the right moment.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="shrink-0 flex flex-col gap-3 items-center">
          <a href="#" className="bg-blue-500 text-white px-10 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-blue-400 transition-colors">Request a Briefing</a>
          <p className="text-[9px] text-white/20 uppercase tracking-widest">Confidential. No obligation.</p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5">
        <p className="font-black text-sm uppercase tracking-[0.3em]">ALDORIA<span className="text-blue-500">.</span></p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {["LinkedIn", "Insights", "Privacy", "Careers"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 Aldoria Partners</p>
      </footer>
    </div>
  );
}
