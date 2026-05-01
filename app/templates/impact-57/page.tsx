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
      initial={{ opacity: 0, y: 44 }}
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
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "APEX PRO X1", category: "Exoskeleton", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1400&auto=format&fit=crop", price: "$3,499", stat: "+34% Peak Power" },
  { id: 2, name: "NEURAL STRIDE", category: "Running Analysis", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop", price: "$899", stat: "2ms Gait Latency" },
  { id: 3, name: "CRYO RECOVERY", category: "Recovery Tech", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop", price: "$1,250", stat: "−40% Recovery Time" },
];

const ATHLETES = [
  { name: "SPRINT MODULE", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1400&auto=format&fit=crop" },
  { name: "POWER OUTPUT", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1400&auto=format&fit=crop" },
  { name: "NEURAL LOAD", img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1400&auto=format&fit=crop" },
];

const FAQS = [
  { q: "How does the APEX PRO X1 exoskeleton work?", a: "APEX PRO X1 uses carbon fibre actuators in concert with our proprietary muscle-synergy algorithm. Sensors embedded in the chassis read 1,200 data points per second and apply micro-force adjustments in real time, amplifying natural movement patterns without disrupting biomechanics." },
  { q: "Is this technology cleared for professional competition?", a: "APEX systems are currently approved under the World Athletics Technology-Assisted Performance category. NEURAL STRIDE and CRYO RECOVERY carry no competition restrictions under any governing body." },
  { q: "How long does calibration take?", a: "Initial biomechanical profiling via the STRYDE app takes 22 minutes. The system auto-adapts over the first five training sessions and reaches full personalisation by session 12." },
  { q: "What is the battery life of APEX PRO X1?", a: "The integrated graphene-polymer cell delivers 8 hours of continuous use at maximum actuator output, or 14 hours in adaptive assist mode. Charging from 0–100% takes 45 minutes via the included magnetic dock." },
];

const TESTIMONIALS = [
  { name: "Danielle Osei", title: "Olympic 200m Finalist", quote: "APEX PRO X1 changed everything I knew about peak power. My block-start data in the first week was better than anything I'd seen in three years of training." },
  { name: "Marco Trevisan", title: "Pro Triathlete, Ironman Champion", quote: "NEURAL STRIDE gave me biomechanical data that my coaching team couldn't get any other way. My run split dropped by four minutes." },
  { name: "Yuki Nakamoto", title: "NBA Performance Coach", quote: "We have integrated STRYDE technology into our full roster's conditioning programme. Recovery metrics across the team improved 38% in a single pre-season." },
];

const MARQUEE = ["APEX PRO", "NEURAL STRIDE", "STRYDE TECH", "BIOMECHANICS", "PEAK POWER", "CRYO RECOVERY", "0.2ms LATENCY", "ELITE PERFORMANCE"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function KineticMotionSPA() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [testIdx, setTestIdx] = useState(0);

  return (
    <div className="premium-theme bg-[#060810] text-white overflow-x-hidden font-mono">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-5 bg-[#060810]/80 backdrop-blur-xl border-b border-white/5">
        <span className="text-base font-black uppercase tracking-[0.2em]">
          <span className="text-[#00e5ff]">STRYDE</span> TECH
        </span>
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {["Systems", "Data", "Athletes", "Labs"].map((l) => (
            <a key={l} href="#" className="hover:text-[#00e5ff] transition-colors">{l}</a>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>

      {/* ── Mobile Nav ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#060810] flex flex-col justify-center items-center gap-10"
          >
            <button className="absolute top-6 right-8 text-white" onClick={() => setMenuOpen(false)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {["Systems", "Data", "Athletes", "Labs"].map((l, i) => (
              <motion.a
                key={l} href="#"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="text-3xl uppercase tracking-[0.25em] text-white/40 hover:text-[#00e5ff] transition-colors"
                onClick={() => setMenuOpen(false)}
              >{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end pb-24 px-8 md:px-16">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-196645?w=800&q=80"
            alt="Athlete performance"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/50 to-transparent" />
        </motion.div>
        {/* Scan line animation */}
        <motion.div
          animate={{ top: ["-2%", "102%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-px bg-[#00e5ff]/20 z-10 pointer-events-none"
          style={{ position: "absolute" }}
        />
        <div className="relative z-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-[10px] uppercase tracking-[0.5em] text-[#00e5ff]/60 mb-6"
          >Performance Tech · Neural Biomechanics · Series 2026</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[8vw] font-black uppercase leading-[0.85] tracking-tight mb-3"
          >
            <span className="text-[#00e5ff]">Human</span><br />performance.<br />
            <span className="text-white/20" style={{ WebkitTextStroke: "1px rgba(0,229,255,0.3)" }}>Redefined.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-4 mt-8 flex-wrap">
            <MagneticBtn className="px-8 py-4 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white transition-colors">
              Explore Systems
            </MagneticBtn>
            <MagneticBtn className="px-8 py-4 border border-[#00e5ff]/30 text-[#00e5ff] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-[#00e5ff]/10 transition-all">
              Watch Demo
            </MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden py-4 border-y border-[#00e5ff]/10 bg-[#00e5ff]/5">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-14 whitespace-nowrap"
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 shrink-0">
              {w} <span className="text-[#00e5ff]/15 mx-3">▶</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Products ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-3">2026 Systems</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-20">Performance Suite</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8, borderColor: "rgba(0,229,255,0.4)" }}
                className="group cursor-pointer border border-white/5 transition-all duration-500"
                onClick={() => setActiveProduct(i)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#00e5ff] text-[#060810] text-[9px] uppercase tracking-[0.3em] px-3 py-1 font-black">
                    {p.stat}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#00e5ff]/40 mb-1">{p.category}</p>
                  <div className="flex justify-between items-end">
                    <h3 className="text-xl font-black uppercase tracking-[0.1em] text-white group-hover:text-[#00e5ff] transition-colors">{p.name}</h3>
                    <span className="text-[#00e5ff] font-black">{p.price}</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Product Modal ── */}
      <AnimatePresence>
        {activeProduct !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#060810]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0c1020] border border-[#00e5ff]/15 max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <img src={PRODUCTS[activeProduct].img} alt={PRODUCTS[activeProduct].name} className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060810]/60 to-transparent" />
              </div>
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <button onClick={() => setActiveProduct(null)} className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-[#00e5ff] transition-colors">← Close</button>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#00e5ff]/40 mb-1">{PRODUCTS[activeProduct].category}</p>
                  <h3 className="text-2xl font-black uppercase tracking-[0.15em] text-white mb-1">{PRODUCTS[activeProduct].name}</h3>
                  <p className="text-2xl font-black text-[#00e5ff] mb-6">{PRODUCTS[activeProduct].price}</p>
                  <div className="inline-block bg-[#00e5ff] text-[#060810] text-[9px] uppercase tracking-[0.3em] px-3 py-1 font-black mb-6">{PRODUCTS[activeProduct].stat}</div>
                  <div className="space-y-2 mb-8">
                    {[["Sensor Rate", "1,200Hz"], ["Weight", "380g"], ["Battery", "8–14 hours"], ["Connectivity", "BLE 5.4 + USB-C"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[11px] border-b border-white/5 pb-2">
                        <span className="text-white/30 uppercase tracking-[0.2em]">{k}</span>
                        <span className="text-white/70">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <MagneticBtn className="w-full py-4 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white transition-colors">
                  Order System
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stats ── */}
      <section className="py-24 px-8 md:px-16 bg-[#00e5ff]/5 border-y border-[#00e5ff]/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Elite Athletes", to: 12000, suffix: "+" },
            { label: "Data Points/Second", to: 1200, suffix: "" },
            { label: "Performance Gain Avg", to: 34, suffix: "%" },
            { label: "Recovery Reduction", to: 40, suffix: "%" },
          ].map((s) => (
            <Reveal key={s.label}>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[#00e5ff] mb-2">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/30">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Athletes Grid ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-3">Neural Data</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-16">Live Performance Metrics</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ATHLETES.map((a, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative aspect-[3/4] overflow-hidden group">
                <img src={a.img} alt={a.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    animate={{ width: ["20%", "85%", "60%"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="h-0.5 bg-[#00e5ff] mb-3"
                  />
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#00e5ff] font-black">{a.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-8 md:px-16 bg-[#0c1020] border-y border-white/5">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-12 text-center">Verified Performance Data</p>
        </Reveal>
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testIdx}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-8 italic">"{TESTIMONIALS[testIdx].quote}"</p>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#00e5ff] font-black">{TESTIMONIALS[testIdx].name}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mt-1">{TESTIMONIALS[testIdx].title}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestIdx(i)}
                className={`h-1 rounded-full transition-all ${i === testIdx ? "w-8 bg-[#00e5ff]" : "w-2 bg-white/15"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-8 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-3">Specs & Intel</p>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-16">System FAQ</h2>
        </Reveal>
        <div className="divide-y divide-white/5">
          {FAQS.map((f, i) => (
            <div key={i} className="py-6">
              <button className="w-full flex justify-between items-center text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm text-white/80 pr-8 leading-relaxed">{f.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.22 }} className="text-[#00e5ff] text-2xl shrink-0">+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-white/40 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-8 md:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.06)_0%,_transparent_70%)] pointer-events-none" />
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-6">Pro · Elite · National · Olympic</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 leading-tight">
            Train beyond<br />
            <span className="text-[#00e5ff]">human limits.</span>
          </h2>
          <p className="text-white/30 mb-10 text-[10px] tracking-[0.3em] uppercase">Access requires verified athletic profile.</p>
          <MagneticBtn className="px-12 py-5 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white transition-colors">
            Apply for Access
          </MagneticBtn>
        </Reveal>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/20">
        <span><span className="text-[#00e5ff]/60">STRYDE</span> TECH</span>
        <span>© 2026 All rights reserved</span>
        <span>Performance Series</span>
      </footer>

      <style>{`::-webkit-scrollbar{width:4px;background:#060810}::-webkit-scrollbar-thumb{background:#00e5ff20}`}</style>
    </div>
  );
}
