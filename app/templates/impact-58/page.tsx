"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "../premium.css";

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = to / 60;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) { setCount(to); clearInterval(t); } else { setCount(Math.floor(cur)); }
    }, 16);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── MagneticBtn ──────────────────────────────────────────────────────────────
function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.4);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ─── Glitch Text ──────────────────────────────────────────────────────────────
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3200 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className={`relative inline-block ${className}`}
      style={glitch ? { textShadow: "2px 0 #ff003c, -2px 0 #00e5ff", filter: "brightness(1.2)" } : {}}
    >
      {text}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const WORK = [
  { id: 1, title: "VOID IDENTITY", client: "Orbit Labs", tag: "Brand System", year: "2026", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1400&auto=format&fit=crop" },
  { id: 2, title: "CIPHER UI", client: "Nova Bank", tag: "Digital Experience", year: "2025", img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=1400&auto=format&fit=crop" },
  { id: 3, title: "BRUTAL MOTION", client: "Hyper Records", tag: "Motion Design", year: "2025", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop" },
  { id: 4, title: "DARK MATTER", client: "Epoch Films", tag: "Title Design", year: "2024", img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1400&auto=format&fit=crop" },
  { id: 5, title: "SIGNAL DROP", client: "Arc Studio", tag: "Campaign", year: "2024", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop" },
];

const SERVICES = [
  { n: "Brand Systems", d: "Identity architecture designed to survive cultural entropy. Logotypes, motion language, and sonic identity." },
  { n: "Digital Experience", d: "Interfaces that reward attention. From bespoke design systems to micro-interaction choreography." },
  { n: "Motion & Film", d: "Title sequences, brand films, and generative visuals for projects that demand presence." },
  { n: "Campaign Direction", d: "Concepting through execution. We operate as an embedded creative cell within your organisation." },
];

const FAQS = [
  { q: "How do you begin a new project?", a: "Every engagement opens with a two-day Creative Immersion — a structured provocation session where we map your brand territory, competitive landscape, and cultural ambition. No brief accepted, no deck produced. We meet in person." },
  { q: "What is your minimum engagement?", a: "Our minimum project scope is six weeks. We do not accept one-off logo briefs. We build systems, not assets. Retainer relationships begin at eight hours per month." },
  { q: "Do you work with early-stage startups?", a: "Occasionally. If the ambition is sufficiently uncommon, we will consider early-stage companies on a deferred payment structure. Contact us with your founding thesis, not a brief." },
  { q: "Where are you based?", a: "Our creative direction operates from Berlin, Paris, and Los Angeles. Production teams are distributed globally. We have delivered work in 34 countries." },
];

const TESTIMONIALS = [
  { name: "Zara Okonkwo", title: "CMO, Orbit Labs", quote: "VOID AGENCY is the only studio I've encountered that makes you feel slightly afraid of your own brand before you love it completely. The work is extraordinary." },
  { name: "Lars Henriksen", title: "Founder, Nova Bank", quote: "We instructed three agencies. VOID understood the brief in the first meeting and delivered something none of the others had even imagined." },
  { name: "Celeste Moreau", title: "Creative Director, Epoch Films", quote: "The Dark Matter title sequence they created became the most discussed element of the entire film. That is not a coincidence." },
];

const MARQUEE = ["VOID AGENCY", "BRAND SYSTEMS", "MOTION", "DIGITAL", "BERLIN · PARIS · LA", "CREATIVE DIRECTION", "SINCE 2017", "ANTI-ORDINARY"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MaskedVideoTypography() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWork, setActiveWork] = useState<number | null>(null);
  const [testIdx, setTestIdx] = useState(0);

  return (
    <div className="premium-theme bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-5 mix-blend-difference">
        <span className="text-base font-black uppercase tracking-[-0.02em]">VOID</span>
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
          {["Work", "Services", "Manifesto", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>

      {/* ── Mobile Nav ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#080808] flex flex-col justify-center items-start px-12 gap-8"
          >
            <button className="absolute top-6 right-8 text-white font-black" onClick={() => setMenuOpen(false)}>✕</button>
            {["Work", "Services", "Manifesto", "Contact"].map((l, i) => (
              <motion.a
                key={l} href="#"
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="text-4xl font-black uppercase tracking-[-0.02em] text-white/30 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center px-8 md:px-16">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-196645?w=800&q=80"
            alt="Creative work"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#080808]/75" />
        </motion.div>
        <div className="relative z-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-[10px] uppercase tracking-[0.55em] text-white/30 mb-8 font-bold"
          >Creative Agency · Berlin/Paris/LA · Est. 2017</motion.p>
          <h1 className="text-7xl md:text-[10vw] font-black uppercase leading-[0.82] tracking-[-0.03em] mb-6">
            <GlitchText text="We make" /><br />
            <span className="text-white/10" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>brands</span>{" "}
            <GlitchText text="feel" /><br />
            <span className="text-white">uncomfortable.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="text-sm text-white/40 uppercase tracking-[0.2em] mb-10 max-w-sm font-bold"
          >Brand systems, digital experience, and motion design for companies that refuse to be forgettable.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex gap-4 flex-wrap">
            <MagneticBtn className="px-8 py-4 bg-white text-[#080808] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-[#ff003c] hover:text-white transition-colors">
              View Work
            </MagneticBtn>
            <MagneticBtn className="px-8 py-4 border border-white/20 text-white text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white/5 transition-all">
              Start a Project
            </MagneticBtn>
          </motion.div>
        </div>
        {/* Glitch overlay */}
        <motion.div
          animate={{ opacity: [0, 0, 0.06, 0, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", times: [0, 0.45, 0.5, 0.55, 1] }}
          className="absolute inset-0 bg-[#ff003c] mix-blend-screen pointer-events-none"
        />
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden py-4 border-y border-white/5">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.5em] text-white/20 shrink-0 font-black">
              {w} <span className="text-white/8 mx-3">—</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Work ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.03em] text-white mb-20 leading-none">Selected Work</h2>
        </Reveal>
        <div className="space-y-4">
          {WORK.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ x: 6 }}
                className="group cursor-pointer border-t border-white/5 pt-6 pb-4 flex items-end justify-between gap-8"
                onClick={() => setActiveWork(i)}
              >
                <div className="flex items-end gap-8 flex-1">
                  <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] w-12 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white group-hover:text-[#ff003c] transition-colors leading-none">
                    <GlitchText text={w.title} />
                  </h3>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black">{w.tag}</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">{w.client} · {w.year}</p>
                </div>
                <svg className="w-6 h-6 text-white/20 group-hover:text-[#ff003c] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Work Modal ── */}
      <AnimatePresence>
        {activeWork !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#080808]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setActiveWork(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#111] border border-white/8 max-w-3xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={WORK[activeWork].img} alt={WORK[activeWork].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                <motion.div
                  animate={{ opacity: [0, 0.1, 0, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-[#ff003c] mix-blend-screen"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black mb-1">{WORK[activeWork].tag} · {WORK[activeWork].year}</p>
                    <h3 className="text-4xl font-black uppercase tracking-[-0.02em] text-white">{WORK[activeWork].title}</h3>
                    <p className="text-sm text-white/40 font-bold uppercase tracking-[0.2em] mt-1">Client: {WORK[activeWork].client}</p>
                  </div>
                  <button onClick={() => setActiveWork(null)} className="text-white/30 hover:text-white font-black text-lg">✕</button>
                </div>
                <p className="text-sm text-white/40 leading-relaxed mb-8">
                  A total brand system rebuilt from first principles. Typography, motion language, colour architecture, and environmental applications — all derived from a single conceptual gesture.
                </p>
                <MagneticBtn className="px-8 py-4 bg-white text-[#080808] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-[#ff003c] hover:text-white transition-colors">
                  View Full Case Study
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stats ── */}
      <section className="py-24 px-8 md:px-16 bg-[#111] border-y border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Projects Delivered", to: 194 },
            { label: "Countries Reached", to: 34 },
            { label: "Awards Won", to: 67 },
            { label: "Brand Systems Built", to: 89 },
          ].map((s) => (
            <Reveal key={s.label}>
              <div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2">
                  <Counter to={s.to} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-bold">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-[-0.03em] text-white mb-20 leading-none">What We Do</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ backgroundColor: "rgba(255,0,60,0.04)" }} className="p-10 bg-[#080808] border border-white/0 transition-colors">
                <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-4 block">0{i + 1}</span>
                <h3 className="text-2xl font-black uppercase tracking-[-0.02em] text-white mb-4">{s.n}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{s.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-8 md:px-16 bg-[#111] border-y border-white/5">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/25 mb-12 text-center font-black">Unverifiable Praise</p>
        </Reveal>
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testIdx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-white/65 leading-relaxed mb-8 font-bold uppercase tracking-[-0.01em]">"{TESTIMONIALS[testIdx].quote}"</p>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white font-black">{TESTIMONIALS[testIdx].name}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mt-1 font-bold">{TESTIMONIALS[testIdx].title}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestIdx(i)}
                className={`h-1 rounded-full transition-all ${i === testIdx ? "w-8 bg-[#ff003c]" : "w-2 bg-white/15"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-8 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-4xl font-black uppercase tracking-[-0.02em] text-white mb-16">How We Work</h2>
        </Reveal>
        <div className="divide-y divide-white/5">
          {FAQS.map((f, i) => (
            <div key={i} className="py-6">
              <button className="w-full flex justify-between items-center text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-base text-white/80 pr-8 font-bold leading-relaxed">{f.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-[#ff003c] text-2xl font-black shrink-0">+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-white/40 leading-relaxed font-medium">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-8 md:px-16 text-center relative overflow-hidden border-t border-white/5">
        <motion.div
          animate={{ opacity: [0, 0.03, 0, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-[#ff003c]"
        />
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-8 font-black">Applications Open · Q3 2026</p>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-[-0.03em] text-white leading-[0.85] mb-10">
            <GlitchText text="Make" /><br />
            <span className="text-white/12" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>something</span><br />
            <GlitchText text="brutal." />
          </h2>
          <MagneticBtn className="px-12 py-5 bg-[#ff003c] text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-[#080808] transition-colors">
            Start the Conversation
          </MagneticBtn>
        </Reveal>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/18 font-black">
        <span>VOID AGENCY</span>
        <span>© 2026 All rights reserved</span>
        <span>Berlin · Paris · LA</span>
      </footer>

      <style>{`::-webkit-scrollbar{width:4px;background:#080808}::-webkit-scrollbar-thumb{background:#ffffff10}`}</style>
    </div>
  );
}
