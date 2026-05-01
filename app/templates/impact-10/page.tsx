"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Type, Layers, PenTool, Monitor, Zap, Award, ChevronDown, Menu, X, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { icon: Type, title: "Type Design", desc: "Custom typefaces from concept to variable font, optimised for every screen and print medium.", tag: "Typography" },
  { icon: PenTool, title: "Art Direction", desc: "Editorial systems that unify brand voice, visual hierarchy, and motion across all channels.", tag: "Direction" },
  { icon: Monitor, title: "Motion Type", desc: "Kinetic typography and animated titles that command attention across video and web.", tag: "Motion" },
  { icon: Layers, title: "Brand Systems", desc: "Comprehensive identity systems built for consistency from business cards to billboards.", tag: "Branding" },
  { icon: Zap, title: "Digital Design", desc: "High-impact web experiences with meticulous grid systems and typographic rhythm.", tag: "Digital" },
  { icon: Award, title: "Print & Editorial", desc: "Precision-crafted books, magazines, and editorial layouts with award-winning results.", tag: "Print" },
];

const WORK = [
  { title: "Axis Type", client: "Fontsmith", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop", year: "2026" },
  { title: "Nord Identity", client: "NordBank", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop", year: "2025" },
  { title: "Echo Magazine", client: "Echo Media", img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop", year: "2025" },
  { title: "Lumen Annual", client: "Lumen Capital", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop", year: "2024" },
  { title: "Form Typeface", client: "Self-initiated", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop", year: "2024" },
];

const CLIENTS = ["Vogue", "LVMH", "Nike", "Apple", "MoMA", "The Guardian", "Hermès", "UNESCO"];

const STATS = [
  { value: 18, suffix: "+", label: "Years practice" },
  { value: 240, suffix: "+", label: "Type projects" },
  { value: 34, suffix: "", label: "Design awards" },
  { value: 62, suffix: "", label: "Typefaces released" },
];

const TESTIMONIALS = [
  { name: "Helena Russo", role: "CD, Vogue International", quote: "Their typographic intelligence is extraordinary. Every project becomes a landmark.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Marc Fontaine", role: "Partner, TBWA Paris", quote: "The rare studio that treats every letterform as a philosophical statement.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Soo-Yeon Lim", role: "VP Design, Samsung", quote: "Impeccable craft. They elevated our entire brand language with a single typeface.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "How long does a custom typeface take?", a: "A single-weight custom typeface typically takes 12–16 weeks. A full variable font family with multiple axes is a 6–12 month engagement. We scope every project individually." },
  { q: "Do you work with startups?", a: "Yes. We offer a focused Brand Type package for early-stage companies — a single signature typeface and usage guidelines designed to scale with your brand." },
  { q: "Can you work within existing brand guidelines?", a: "Always. We frequently partner with in-house teams to extend or refine existing systems, always working within the established brand framework unless asked to evolve it." },
  { q: "What's your revision policy?", a: "Two rounds of revisions are included in all projects. Additional rounds are billed at our hourly rate. Our detailed brief process minimises surprises at every stage." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    let cur = 0;
    const t = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 1800 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-black mb-1">{count}{suffix}</div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const handleHover = useCallback(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, i) => i < iter ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iter >= text.length) clearInterval(interval);
      iter += 0.5;
    }, 30);
  }, [text]);
  return <span onMouseEnter={handleHover} className="cursor-pointer">{display}</span>;
}

export default function TypoAgencySPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 140]);

  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 }); const sy = useSpring(my, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Nav */}
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="font-black text-xl tracking-tight"><ScrambleText text="TYPO STUDIO" /></div>
        <div className="hidden md:flex items-center gap-10 text-sm text-gray-400">
          {["Work", "Services", "Type", "Studio"].map(item => (
            <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
          ))}
        </div>
        <motion.button style={{ x: sx, y: sy }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left - r.width / 2) * 0.3); my.set((e.clientY - r.top - r.height / 2) * 0.3); }} onMouseLeave={() => { mx.set(0); my.set(0); }} className="hidden md:block px-5 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors">
          Brief us
        </motion.button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-3xl font-black">
            {["Work", "Services", "Type", "Studio"].map(item => <a key={item} href="#" onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative min-h-screen flex items-end pb-24 overflow-hidden pt-20">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-196645?w=800&q=80" alt="Typography" fill className="object-cover opacity-6" unoptimized />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8">
            Type · Direction · Identity · Since 2008
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tight mb-8 -ml-1">
            THE
            <br />
            <span className="text-stroke text-transparent" style={{ WebkitTextStroke: "2px black" }}>TYPE</span>
            <br />
            STUDIO
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p className="text-lg text-gray-500 max-w-sm leading-relaxed">
              Award-winning typographic studio specialising in custom typefaces, editorial systems, and kinetic type.
            </p>
            <div className="flex gap-4">
              <motion.a href="#" whileHover={{ scale: 1.03 }} className="px-8 py-4 bg-black text-white font-bold rounded-xl flex items-center gap-2 hover:bg-gray-900 transition-colors">
                See our work <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.03 }} className="px-8 py-4 border border-black/10 text-black font-bold rounded-xl hover:bg-black/5 transition-colors">
                About
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee clients */}
      <div className="py-6 border-y border-black/5 overflow-hidden bg-black">
        <motion.div className="flex gap-16 whitespace-nowrap" animate={{ x: [0, -2000] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="text-white/40 text-sm font-black tracking-widest uppercase">{c}</span>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Services</p>
          <h2 className="text-5xl font-black">What we do</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="group border-t border-black/10 pt-8">
                <span className="inline-block px-3 py-1 text-xs font-bold bg-black text-white rounded-full mb-4">{s.tag}</span>
                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all">Learn more <ArrowUpRight className="w-4 h-4" /></div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work gallery */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Work</p>
          <h2 className="text-5xl font-black">Selected projects</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} className={i === 0 ? "md:row-span-2" : ""}>
              <motion.div
                className={`relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "h-[600px]" : "h-72"}`}
                onHoverStart={() => setHoveredWork(i)} onHoverEnd={() => setHoveredWork(null)}
                whileHover={{ scale: 1.01 }}
              >
                <Image src={w.img} alt={w.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <AnimatePresence>
                  {hoveredWork === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/20" />
                  )}
                </AnimatePresence>
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/60 text-xs mb-1">{w.client} · {w.year}</p>
                  <p className="font-black text-white text-2xl">{w.title}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><h2 className="text-4xl font-black mb-16">Client voices</h2></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeT} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white text-white" />)}</div>
              <p className="text-xl text-white/80 italic leading-relaxed mb-8">"{TESTIMONIALS[activeT].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={44} height={44} className="rounded-full object-cover" unoptimized />
                <div className="text-left">
                  <p className="font-bold text-sm">{TESTIMONIALS[activeT].name}</p>
                  <p className="text-white/50 text-xs">{TESTIMONIALS[activeT].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeT ? "bg-white" : "bg-white/20"}`} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><h2 className="text-4xl font-black">FAQ</h2></Reveal>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-black/10 pb-4">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-3 text-left">
                  <span className="font-bold">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-gray-400 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="pt-2 pb-4 text-gray-500 text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-black text-white">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black leading-none mb-8">
            Let's make<br />something<br /><em className="not-italic text-white/40">lasting.</em>
          </h2>
          <motion.a href="#" whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-black text-lg rounded-2xl hover:bg-gray-100 transition-colors">
            Brief us <ArrowRight className="w-5 h-5" />
          </motion.a>
        </Reveal>
      </section>

      <footer className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 border-t border-black/5">
        <div className="font-black text-black">TYPO STUDIO</div>
        <p>© 2026 Typo Studio. All rights reserved.</p>
        <div className="flex gap-6">{["Privacy", "Terms", "Contact"].map(l => <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
