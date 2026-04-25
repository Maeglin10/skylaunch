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
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
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
    let start = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); } else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── MagneticBtn ──────────────────────────────────────────────────────────────
function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
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
const COLLECTIONS = [
  { id: 1, name: "TOURBILLON NOIR", ref: "MTC-001", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1400&auto=format&fit=crop", price: "CHF 48,000", material: "18K Rose Gold" },
  { id: 2, name: "PERPETUEL BLANC", ref: "MTC-002", img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1400&auto=format&fit=crop", price: "CHF 32,000", material: "Platinum 950" },
  { id: 3, name: "CHRONO ECLIPSE", ref: "MTC-003", img: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1400&auto=format&fit=crop", price: "CHF 22,500", material: "Grade 5 Titanium" },
];

const FAQS = [
  { q: "What movements power your timepieces?", a: "Every Maison Aurum watch is equipped with in-house calibres hand-assembled in our Geneva atelier. We use only Swiss lever escapements with a minimum 72-hour power reserve." },
  { q: "Do you offer bespoke commissions?", a: "Our Haute Horlogerie programme accepts a limited number of bespoke commissions per year. Each piece requires 18–24 months of artisanal work and begins with a private consultation." },
  { q: "How is each case finished?", a: "Cases undergo a 14-step hand-finishing process alternating between bevelling, anglage, satin brushing, and mirror polishing performed entirely by our master watchmakers." },
  { q: "What is your warranty policy?", a: "All timepieces carry a five-year international warranty covering mechanical defects. We offer complimentary first service at 24 months in any of our 12 worldwide ateliers." },
];

const TESTIMONIALS = [
  { name: "Édouard de Vienne", title: "Collector, Geneva", quote: "The Tourbillon Noir is a feat of engineering that borders on sculpture. I have worn Patek and Vacheron — Maison Aurum stands among them." },
  { name: "Naomi Ashcroft", title: "Watch Editor, Hodinkee", quote: "Rarely does a new maison arrive with such mastery. The dial work alone justifies every franc." },
  { name: "Carlos Ibáñez", title: "CEO, Private Equity", quote: "I purchased the Perpetuel Blanc for my twentieth anniversary. It remains the finest object I have ever owned." },
];

const MARQUEE_WORDS = ["MAISON AURUM", "HAUTE HORLOGERIE", "GENÈVE", "EST. 1891", "TOURBILLON", "PERPÉTUEL", "CHRONOMÈTRE", "SAVOIR-FAIRE"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MousetrapElasticCursor() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWatch, setActiveWatch] = useState<number | null>(null);
  const [testIdx, setTestIdx] = useState(0);

  return (
    <div className="premium-theme bg-[#0a0905] text-[#c9a84c] font-serif overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6 bg-[#0a0905]/80 backdrop-blur-xl border-b border-[#c9a84c]/10">
        <span className="text-lg font-bold uppercase tracking-[0.3em] text-[#c9a84c]">Maison Aurum</span>
        <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] text-[#c9a84c]/50">
          {["Collections", "Atelier", "Heritage", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-[#c9a84c] transition-colors">{l}</a>
          ))}
        </div>
        <button className="md:hidden text-[#c9a84c]" onClick={() => setMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>

      {/* ── Mobile Nav ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0a0905] flex flex-col justify-center items-center gap-10"
          >
            <button className="absolute top-6 right-8 text-[#c9a84c]" onClick={() => setMenuOpen(false)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {["Collections", "Atelier", "Heritage", "Contact"].map((l, i) => (
              <motion.a
                key={l} href="#"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="text-3xl uppercase tracking-[0.3em] text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors"
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
            src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=2000&auto=format&fit=crop"
            alt="Hero watch"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0905] via-[#0a0905]/40 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.4em] text-[#c9a84c]/60 mb-6"
          >Genève · Haute Horlogerie · Est. 1891</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[8vw] font-bold leading-[0.9] uppercase tracking-tight text-[#f0d990] mb-8"
          >
            Time is<br />the ultimate<br />luxury.
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex gap-4">
            <MagneticBtn className="px-8 py-4 bg-[#c9a84c] text-[#0a0905] text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#f0d990] transition-colors">
              Discover Collections
            </MagneticBtn>
            <MagneticBtn className="px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] text-xs uppercase tracking-[0.3em] hover:border-[#c9a84c] transition-colors">
              Private Appointment
            </MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden py-5 border-y border-[#c9a84c]/15 bg-[#0d0b06]">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.4em] text-[#c9a84c]/30 shrink-0">
              {w} <span className="text-[#c9a84c]/15 mx-4">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Collections ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a84c]/40 mb-3">2026 Collections</p>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#f0d990] mb-20">The Timepieces</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => setActiveWatch(i)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6 border border-[#c9a84c]/10">
                  <img
                    src={w.img} alt={w.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    style={{ filter: "sepia(20%) brightness(0.85)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0905]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]/60">{w.material}</span>
                    <span className="text-lg font-bold text-[#f0d990]">{w.price}</span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]/40 mb-1">{w.ref}</p>
                <h3 className="text-xl uppercase tracking-[0.15em] text-[#f0d990] font-bold">{w.name}</h3>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Watch Modal ── */}
      <AnimatePresence>
        {activeWatch !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a0905]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setActiveWatch(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#100e07] border border-[#c9a84c]/20 max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={COLLECTIONS[activeWatch].img}
                  alt={COLLECTIONS[activeWatch].name}
                  className="w-full h-full object-cover"
                  style={{ filter: "sepia(15%) brightness(0.9)" }}
                />
              </div>
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <button onClick={() => setActiveWatch(null)} className="mb-8 text-[#c9a84c]/50 hover:text-[#c9a84c] text-xs uppercase tracking-[0.3em]">← Close</button>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c]/40 mb-2">{COLLECTIONS[activeWatch].ref}</p>
                  <h3 className="text-3xl font-bold uppercase tracking-[0.15em] text-[#f0d990] mb-2">{COLLECTIONS[activeWatch].name}</h3>
                  <p className="text-2xl font-bold text-[#c9a84c] mb-8">{COLLECTIONS[activeWatch].price}</p>
                  <p className="text-sm text-[#c9a84c]/50 leading-relaxed mb-8">Hand-assembled in Geneva over a period of six to eight months, each movement comprises upwards of 380 individual components finished to exhibition standard.</p>
                  <div className="space-y-2 mb-8">
                    {[["Case", COLLECTIONS[activeWatch].material], ["Diameter", "42mm"], ["Water Resistance", "50m"], ["Power Reserve", "72 hours"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs border-b border-[#c9a84c]/10 pb-2">
                        <span className="text-[#c9a84c]/40 uppercase tracking-[0.2em]">{k}</span>
                        <span className="text-[#c9a84c]/80">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <MagneticBtn className="w-full py-4 bg-[#c9a84c] text-[#0a0905] text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#f0d990] transition-colors">
                  Request Private Viewing
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stats ── */}
      <section className="py-24 px-8 md:px-16 bg-[#0d0b06] border-y border-[#c9a84c]/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Years of Mastery", to: 133, suffix: "" },
            { label: "Components per Movement", to: 380, suffix: "+" },
            { label: "Hours of Finishing", to: 240, suffix: "h" },
            { label: "Pieces per Year", to: 600, suffix: "" },
          ].map((s) => (
            <Reveal key={s.label}>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-[#f0d990] mb-2">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]/40">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Heritage ── */}
      <section className="py-32 px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1451335655316-cfd32fbd657f?q=80&w=1400&auto=format&fit=crop"
              alt="Geneva atelier"
              className="w-full aspect-[4/5] object-cover border border-[#c9a84c]/10"
              style={{ filter: "sepia(25%) brightness(0.8)" }}
            />
            <div className="absolute -bottom-6 -right-6 bg-[#c9a84c] text-[#0a0905] p-6 text-xs uppercase tracking-[0.3em] font-bold">
              Genève Atelier
            </div>
          </div>
        </Reveal>
        <div className="space-y-8">
          <Reveal delay={0.1}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#c9a84c]/40">Our Heritage</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#f0d990] leading-tight">
              Four generations of watchmaking excellence
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#c9a84c]/60 leading-relaxed">
              Founded in 1891 by Édouard Aurum in the heart of Geneva's watchmaking district, Maison Aurum has never compromised on the principle that a timepiece must outlive its wearer. Every complication is conceived, designed, and assembled within our original 19th-century atelier.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] text-xs uppercase tracking-[0.3em] hover:bg-[#c9a84c] hover:text-[#0a0905] transition-all">
              Discover Our Story
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-8 md:px-16 bg-[#0d0b06] border-y border-[#c9a84c]/10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a84c]/40 mb-12 text-center">What Collectors Say</p>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testIdx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-[#f0d990]/80 italic leading-relaxed mb-8">"{TESTIMONIALS[testIdx].quote}"</p>
              <p className="text-sm uppercase tracking-[0.3em] text-[#c9a84c] font-bold">{TESTIMONIALS[testIdx].name}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-[#c9a84c]/40 mt-1">{TESTIMONIALS[testIdx].title}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === testIdx ? "bg-[#c9a84c] w-6" : "bg-[#c9a84c]/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-8 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a84c]/40 mb-3">Questions</p>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-[#f0d990] mb-16">Frequently Asked</h2>
        </Reveal>
        <div className="space-y-0 divide-y divide-[#c9a84c]/10">
          {FAQS.map((f, i) => (
            <div key={i} className="py-6">
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-base text-[#f0d990]/90 tracking-wide pr-8">{f.q}</span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#c9a84c] text-2xl shrink-0"
                >+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-[#c9a84c]/55 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-8 md:px-16 text-center border-t border-[#c9a84c]/10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a84c]/40 mb-6">Geneva · Paris · New York · Tokyo</p>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#f0d990] mb-10 leading-tight">
            Begin your<br />acquisition
          </h2>
          <MagneticBtn className="px-12 py-5 bg-[#c9a84c] text-[#0a0905] text-xs uppercase tracking-[0.35em] font-bold hover:bg-[#f0d990] transition-colors">
            Request Private Appointment
          </MagneticBtn>
        </Reveal>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-[#c9a84c]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]/30">
        <span>Maison Aurum · Genève</span>
        <span>© 2026 All rights reserved</span>
        <span>Est. 1891</span>
      </footer>

      <style>{`::-webkit-scrollbar{width:6px;background:#0a0905}::-webkit-scrollbar-thumb{background:#c9a84c22}`}</style>
    </div>
  );
}
