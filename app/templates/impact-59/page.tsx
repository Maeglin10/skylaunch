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
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
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
const RETREATS = [
  { id: 1, name: "Sonoran Silence", location: "Arizona Desert, USA", duration: "7 Nights", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop", price: "from $4,200", theme: "Stillness" },
  { id: 2, name: "Icelandic Deep Reset", location: "Westfjords, Iceland", duration: "5 Nights", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1400&auto=format&fit=crop", price: "from $5,800", theme: "Clarity" },
  { id: 3, name: "Kyoto Forest Immersion", location: "Arashiyama, Japan", duration: "6 Nights", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1400&auto=format&fit=crop", price: "from $6,100", theme: "Presence" },
  { id: 4, name: "Patagonian Edge", location: "Torres del Paine, Chile", duration: "8 Nights", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1400&auto=format&fit=crop", price: "from $7,400", theme: "Solitude" },
];

const PILLARS = [
  { n: "Somatic Therapy", d: "Body-based trauma release through movement, breathwork, and proprioceptive re-patterning with certified somatic practitioners." },
  { n: "Contemplative Practice", d: "Vipassana-informed meditation, Zen walking sequences, and non-directive inquiry with teachers trained in lineage traditions." },
  { n: "Nature Immersion", d: "Shinrin-yoku (forest bathing), wilderness solitude, and ecological meditation restoring our fundamental connection to landscape." },
  { n: "Nutritional Restoration", d: "Biodynamic, plant-forward cuisine designed for nervous system repair. Alcohol-free. No screens. No agenda beyond your own unfolding." },
];

const FAQS = [
  { q: "Who is Luminal designed for?", a: "Luminal serves high-functioning individuals experiencing burnout, creative depletion, or a sustained sense of disconnection from meaning. We do not offer clinical therapy. We offer conditions for genuine rest and re-orientation at depth." },
  { q: "Is technology permitted during retreats?", a: "Devices are surrendered on arrival and returned on departure. This is non-negotiable and constitutes the first transformative act of the retreat. Exceptions are available for medical devices only." },
  { q: "How small are the groups?", a: "Every Luminal retreat is capped at nine participants. This is not scalable and is entirely intentional. The intimacy of small numbers is foundational to our method." },
  { q: "What if I have a significant mental health history?", a: "We require a 45-minute pre-intake call with our clinical advisor prior to booking. Certain conditions may require medical clearance. Your safety is the only constraint we refuse to negotiate." },
];

const TESTIMONIALS = [
  { name: "Isabelle Fontenay", title: "Investment Director, Paris", quote: "I arrived depleted to the point of invisibility. The Kyoto immersion gave me access to something I had not felt since childhood — genuine quiet inside my own mind." },
  { name: "David Achterberg", title: "Founder & CEO, Amsterdam", quote: "I was sceptical of the no-device policy. By day two I was grateful. By day four I had made a decision I had been avoiding for three years." },
  { name: "Nina Vasquez", title: "Architect, Mexico City", quote: "Luminal does not promise transformation. It creates conditions for it. I returned home unrecognisable to myself in the best possible way." },
];

const MARQUEE = ["LUMINAL RETREATS", "DEEP REST", "SOMATIC HEALING", "KYOTO", "ICELAND", "ARIZONA", "PATAGONIA", "STILLNESS AS PRACTICE"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HardwareInterfaceSPA() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeRetreat, setActiveRetreat] = useState<number | null>(null);
  const [testIdx, setTestIdx] = useState(0);

  return (
    <div className="premium-theme bg-[#f4f1ec] text-[#1a1a1a] overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-5 bg-[#f4f1ec]/88 backdrop-blur-xl border-b border-[#1a1a1a]/8">
        <span className="text-base tracking-[0.35em] uppercase text-[#1a1a1a] font-bold">Luminal</span>
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/40">
          {["Retreats", "Practice", "Philosophy", "Apply"].map((l) => (
            <a key={l} href="#" className="hover:text-[#1a1a1a] transition-colors">{l}</a>
          ))}
        </div>
        <button className="md:hidden text-[#1a1a1a]" onClick={() => setMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>

      {/* ── Mobile Nav ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#f4f1ec] flex flex-col justify-center items-center gap-10"
          >
            <button className="absolute top-6 right-8 text-[#1a1a1a]" onClick={() => setMenuOpen(false)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {["Retreats", "Practice", "Philosophy", "Apply"].map((l, i) => (
              <motion.a
                key={l} href="#"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="text-3xl uppercase tracking-[0.25em] text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors"
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
            src="https://images.unsplash.com/photo-546819?w=800&q=80"
            alt="Mountain lake at sunrise"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f1ec] via-[#f4f1ec]/20 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.5em] text-[#1a1a1a]/40 mb-6"
          >Immersive Retreats · Nine Participants Max · No Devices</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[7.5vw] font-bold leading-[0.88] text-[#1a1a1a] mb-8 tracking-tight"
          >
            Rest is not<br />a reward.<br /><em>It is the work.</em>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-4 flex-wrap">
            <MagneticBtn className="px-8 py-4 bg-[#1a1a1a] text-[#f4f1ec] text-xs uppercase tracking-[0.3em] hover:bg-[#3d7a5e] transition-colors">
              View Retreats
            </MagneticBtn>
            <MagneticBtn className="px-8 py-4 border border-[#1a1a1a]/20 text-[#1a1a1a] text-xs uppercase tracking-[0.3em] hover:bg-[#1a1a1a] hover:text-[#f4f1ec] transition-all">
              Our Philosophy
            </MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden py-4 border-y border-[#1a1a1a]/8 bg-[#3d7a5e]">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.45em] text-[#f4f1ec]/50 shrink-0">
              {w} <span className="text-[#f4f1ec]/15 mx-4">◌</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Retreats ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#1a1a1a]/35 mb-3">2026 Programme</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-20 leading-tight">Where We Go</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {RETREATS.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
                onClick={() => setActiveRetreat(i)}
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-[#1a1a1a]/5">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#3d7a5e] text-[#f4f1ec] text-[9px] uppercase tracking-[0.3em] px-3 py-1">{r.theme}</div>
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[#f4f1ec]/60">{r.location}</p>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[#f4f1ec]/40">{r.duration}</p>
                    </div>
                    <p className="text-base font-bold text-[#f4f1ec]">{r.price}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] tracking-[0.05em] uppercase">{r.name}</h3>
                <p className="text-xs text-[#1a1a1a]/40 mt-1 tracking-[0.2em] uppercase">{r.location}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Retreat Modal ── */}
      <AnimatePresence>
        {activeRetreat !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#1a1a1a]/70 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveRetreat(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#f4f1ec] max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <img src={RETREATS[activeRetreat].img} alt={RETREATS[activeRetreat].name} className="w-full h-full object-cover" />
              </div>
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <button onClick={() => setActiveRetreat(null)} className="mb-6 text-xs uppercase tracking-[0.3em] text-[#1a1a1a]/35 hover:text-[#3d7a5e] transition-colors">← Close</button>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#3d7a5e]/70 mb-1">{RETREATS[activeRetreat].location} · {RETREATS[activeRetreat].duration}</p>
                  <h3 className="text-2xl font-bold uppercase tracking-[0.08em] text-[#1a1a1a] mb-1">{RETREATS[activeRetreat].name}</h3>
                  <p className="text-xl font-bold text-[#3d7a5e] mb-6">{RETREATS[activeRetreat].price}</p>
                  <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mb-6 italic">
                    A seven-day withdrawal from the noise of continuous connectivity. Structured around somatic morning practice, guided nature immersion, contemplative inquiry, and a single evening of group sharing. No agenda beyond your own deepening.
                  </p>
                  <div className="space-y-2 mb-8">
                    {[["Location", RETREATS[activeRetreat].location], ["Duration", RETREATS[activeRetreat].duration], ["Group Size", "Max 9 participants"], ["Devices", "Surrendered on arrival"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs border-b border-[#1a1a1a]/8 pb-2">
                        <span className="text-[#1a1a1a]/35 uppercase tracking-[0.2em]">{k}</span>
                        <span className="text-[#1a1a1a]/70">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <MagneticBtn className="w-full py-4 bg-[#3d7a5e] text-[#f4f1ec] text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#1a1a1a] transition-colors">
                  Request Application
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stats ── */}
      <section className="py-24 px-8 md:px-16 bg-[#1a1a1a] text-[#f4f1ec]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Retreats Delivered", to: 214 },
            { label: "Locations Worldwide", to: 18 },
            { label: "Max Participants", to: 9 },
            { label: "Participants Served", to: 1830 },
          ].map((s) => (
            <Reveal key={s.label}>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-[#a8c5b8] mb-2">
                  <Counter to={s.to} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#f4f1ec]/30 mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#1a1a1a]/35 mb-3">Our Method</p>
          <h2 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] tracking-tight mb-20 leading-tight">The Four Pillars</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]/8">
          {PILLARS.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ backgroundColor: "rgba(61,122,94,0.04)" }} className="p-10 bg-[#f4f1ec] transition-colors">
                <span className="text-[10px] text-[#3d7a5e]/50 uppercase tracking-[0.35em] mb-4 block">0{i + 1}</span>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 tracking-[0.05em] uppercase">{p.n}</h3>
                <p className="text-sm text-[#1a1a1a]/50 leading-relaxed italic">{p.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-8 md:px-16 bg-[#e8e3da] border-y border-[#1a1a1a]/8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#1a1a1a]/35 mb-12 text-center">Participant Reflections</p>
        </Reveal>
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testIdx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-[#1a1a1a]/65 italic leading-relaxed mb-8">"{TESTIMONIALS[testIdx].quote}"</p>
              <p className="text-sm uppercase tracking-[0.3em] text-[#3d7a5e] font-bold">{TESTIMONIALS[testIdx].name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/35 mt-1">{TESTIMONIALS[testIdx].title}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestIdx(i)}
                className={`h-2 rounded-full transition-all ${i === testIdx ? "w-6 bg-[#3d7a5e]" : "w-2 bg-[#1a1a1a]/15"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-8 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#1a1a1a]/35 mb-3">Before You Apply</p>
          <h2 className="text-4xl font-bold text-[#1a1a1a] tracking-tight mb-16">Common Questions</h2>
        </Reveal>
        <div className="divide-y divide-[#1a1a1a]/8">
          {FAQS.map((f, i) => (
            <div key={i} className="py-6">
              <button className="w-full flex justify-between items-center text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-base text-[#1a1a1a]/80 pr-8 leading-relaxed">{f.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-[#3d7a5e] text-2xl shrink-0">+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-[#1a1a1a]/50 leading-relaxed italic">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-8 md:px-16 text-center bg-[#3d7a5e] text-[#f4f1ec]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.5em] text-[#f4f1ec]/40 mb-6">Applications reviewed in 72 hours</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#f4f1ec] mb-4 leading-tight">
            You already<br /><em>know it's time.</em>
          </h2>
          <p className="text-[#f4f1ec]/50 mb-10 text-xs tracking-[0.25em] uppercase max-w-sm mx-auto">Nine participants. No devices. One question: what would you discover in real silence?</p>
          <MagneticBtn className="px-12 py-5 bg-[#f4f1ec] text-[#3d7a5e] text-xs uppercase tracking-[0.4em] font-bold hover:bg-[#1a1a1a] hover:text-[#f4f1ec] transition-colors">
            Apply for a Retreat
          </MagneticBtn>
        </Reveal>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-[#1a1a1a]/8 bg-[#f4f1ec] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/25">
        <span>Luminal Retreats</span>
        <span>© 2026 All rights reserved</span>
        <span>Stillness as Practice</span>
      </footer>

      <style>{`::-webkit-scrollbar{width:6px;background:#f4f1ec}::-webkit-scrollbar-thumb{background:#1a1a1a15}`}</style>
    </div>
  );
}
