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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
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
    let current = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= to) { setCount(to); clearInterval(timer); } else { setCount(Math.floor(current)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── MagneticBtn ──────────────────────────────────────────────────────────────
function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16 });
  const sy = useSpring(y, { stiffness: 180, damping: 16 });
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
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
const WINES = [
  { id: 1, name: "Grand Cru Réserve", appellation: "Pomerol AOC", vintage: "2019", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1400&auto=format&fit=crop", price: "€ 480", desc: "Dense garnet robe. Notes of dark truffle, ripe plum, and violet. Silky tannins with a 40-year cellaring potential." },
  { id: 2, name: "Blanc de Pierres", appellation: "Chablis Grand Cru", vintage: "2021", img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1400&auto=format&fit=crop", price: "€ 220", desc: "Pale gold with green glints. Mineral tension like struck flint. Crisp citrus bloom, white flower, and saline finish." },
  { id: 3, name: "Cuvée Prestige", appellation: "Champagne AOC", vintage: "NV", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1400&auto=format&fit=crop", price: "€ 145", desc: "A precise assemblage of Chardonnay and Pinot Noir. Fine persistent mousse, brioche, and roasted hazelnut." },
  { id: 4, name: "L'Éternité", appellation: "Margaux AOC", vintage: "2016", img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1400&auto=format&fit=crop", price: "€ 890", desc: "A landmark vintage. Graphite and cigar box. Extraordinary structure; the tannins will reward another decade of patience." },
];

const FAQS = [
  { q: "How do you source your vintages?", a: "Our cellar master travels to Bordeaux, Burgundy, Champagne, and the Loire each harvest. We source exclusively from domaines with whom we have cultivated long-term relationships spanning multiple generations." },
  { q: "What are your storage and shipping conditions?", a: "All orders are shipped in temperature-controlled packaging with real-time tracking. Bottles remain in our climate-regulated cellar at 13°C and 70% humidity until the moment of dispatch." },
  { q: "Do you offer en primeur subscriptions?", a: "Yes. Our En Primeur Programme grants subscribers first access to barrel samples and preferential pricing on futures, typically 18 to 24 months before commercial release." },
  { q: "Can I arrange a private tasting?", a: "Our Paris and London salons host intimate guided tastings for up to eight guests. Each session is curated by our sommelier team around a specific theme or appellation." },
];

const TESTIMONIALS = [
  { name: "Pierre-Henri Morel", title: "Wine Critic, La Revue du Vin de France", quote: "Château Vestige presents wines of uncommon precision. The 2019 Pomerol is among the finest I have encountered in a decade." },
  { name: "Sophia Wentworth", title: "Private Collector, London", quote: "I have trusted my cellar to Vestige for six years. Their selection is beyond reproach and the service is unrivalled." },
  { name: "Marco Andreotti", title: "Michelin 3-star Sommelier, Milan", quote: "Every bottle we have sourced from Château Vestige has been flawless. They understand what a great restaurant demands." },
];

const MARQUEE = ["CHÂTEAU VESTIGE", "GRAND CRU", "BORDEAUX", "BOURGOGNE", "CHAMPAGNE", "EN PRIMEUR", "MILLÉSIME 2026", "TERROIR"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VerticalSplitRevealSlider() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWine, setActiveWine] = useState<number | null>(null);
  const [testIdx, setTestIdx] = useState(0);

  return (
    <div className="premium-theme bg-[#f5f0e8] text-[#2c1810] overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-5 bg-[#f5f0e8]/90 backdrop-blur-xl border-b border-[#2c1810]/10">
        <span className="text-lg tracking-[0.25em] uppercase text-[#2c1810] font-bold">Château Vestige</span>
        <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.22em] text-[#2c1810]/50">
          {["Cuvées", "Terroir", "Atelier", "Cave"].map((l) => (
            <a key={l} href="#" className="hover:text-[#2c1810] transition-colors">{l}</a>
          ))}
        </div>
        <button className="md:hidden text-[#2c1810]" onClick={() => setMenuOpen(true)}>
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
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#f5f0e8] flex flex-col justify-center items-center gap-10"
          >
            <button className="absolute top-6 right-8 text-[#2c1810]" onClick={() => setMenuOpen(false)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {["Cuvées", "Terroir", "Atelier", "Cave"].map((l, i) => (
              <motion.a
                key={l} href="#"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="text-3xl uppercase tracking-[0.25em] text-[#2c1810]/60 hover:text-[#2c1810] transition-colors"
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
            src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2000&auto=format&fit=crop"
            alt="Vineyard at dusk"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e8] via-[#2c1810]/30 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.4em] text-[#2c1810]/50 mb-6"
          >Bordeaux · Vignobles d'Excellence · Depuis 1847</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[7.5vw] font-bold leading-[0.88] text-[#2c1810] mb-8 tracking-tight"
          >
            The soul<br />of the vine<br /><em>in every glass.</em>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex gap-4 flex-wrap">
            <MagneticBtn className="px-8 py-4 bg-[#7b2d24] text-[#f5f0e8] text-xs uppercase tracking-[0.3em] hover:bg-[#2c1810] transition-colors">
              Explore the Cave
            </MagneticBtn>
            <MagneticBtn className="px-8 py-4 border border-[#2c1810]/30 text-[#2c1810] text-xs uppercase tracking-[0.3em] hover:bg-[#2c1810] hover:text-[#f5f0e8] transition-all">
              Reserve a Tasting
            </MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden py-4 border-y border-[#2c1810]/12 bg-[#2c1810]">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.45em] text-[#f5f0e8]/40 shrink-0">
              {w} <span className="text-[#f5f0e8]/15 mx-4">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Cuvées ── */}
      <section className="py-32 px-8 md:px-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#2c1810]/40 mb-3">Our Selection</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2c1810] mb-20 leading-tight">Les Grandes Cuvées</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WINES.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="group cursor-pointer" onClick={() => setActiveWine(i)}>
                <div className="relative aspect-[2/3] overflow-hidden mb-5 bg-[#2c1810]/5">
                  <img src={w.img} alt={w.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#7b2d24] text-[#f5f0e8] text-[9px] uppercase tracking-[0.3em] px-3 py-1">{w.vintage}</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#f5f0e8]/60 mb-1">{w.appellation}</p>
                    <p className="text-xl font-bold text-[#f5f0e8]">{w.price}</p>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#2c1810] tracking-[0.1em] uppercase">{w.name}</h3>
                <p className="text-xs text-[#2c1810]/50 mt-1 tracking-[0.15em] uppercase">{w.appellation}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Wine Modal ── */}
      <AnimatePresence>
        {activeWine !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#2c1810]/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveWine(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#f5f0e8] max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <img src={WINES[activeWine].img} alt={WINES[activeWine].name} className="w-full h-full object-cover" />
              </div>
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <button onClick={() => setActiveWine(null)} className="mb-6 text-xs uppercase tracking-[0.3em] text-[#2c1810]/40 hover:text-[#2c1810] transition-colors">← Close</button>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#7b2d24]/60 mb-1">{WINES[activeWine].appellation} · {WINES[activeWine].vintage}</p>
                  <h3 className="text-2xl font-bold uppercase tracking-[0.1em] text-[#2c1810] mb-2">{WINES[activeWine].name}</h3>
                  <p className="text-2xl font-bold text-[#7b2d24] mb-6">{WINES[activeWine].price}</p>
                  <p className="text-sm text-[#2c1810]/60 leading-relaxed mb-6 italic">{WINES[activeWine].desc}</p>
                  <div className="space-y-2 mb-8">
                    {[["Appellation", WINES[activeWine].appellation], ["Vintage", WINES[activeWine].vintage], ["Service", "16–18°C"], ["Cellaring", "10–25 years"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs border-b border-[#2c1810]/10 pb-2">
                        <span className="text-[#2c1810]/40 uppercase tracking-[0.2em]">{k}</span>
                        <span className="text-[#2c1810]/80">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <MagneticBtn className="w-full py-4 bg-[#7b2d24] text-[#f5f0e8] text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#2c1810] transition-colors">
                  Add to Cellar
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stats ── */}
      <section className="py-24 px-8 md:px-16 bg-[#2c1810] text-[#f5f0e8]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Years of Heritage", to: 179 },
            { label: "Appellations Sourced", to: 28 },
            { label: "Hectares of Terroir", to: 64 },
            { label: "Distinguished Vintages", to: 312 },
          ].map((s) => (
            <Reveal key={s.label}>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-[#d4956a] mb-2">
                  <Counter to={s.to} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5f0e8]/40 mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Terroir ── */}
      <section className="py-32 px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="space-y-8 order-2 md:order-1">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-[#2c1810]/40">Our Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2c1810] tracking-tight leading-tight">
              Terroir is not a concept.<br /><em>It is a responsibility.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[#2c1810]/60 leading-relaxed">
              For 179 years, Château Vestige has maintained that the finest expression of any wine is inseparable from the land that produced it. We practise biodynamic viticulture across all estates, with zero compromise on organic methods and harvest timing determined solely by lunar and climatic cycles.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <MagneticBtn className="px-8 py-4 border border-[#2c1810]/30 text-[#2c1810] text-xs uppercase tracking-[0.3em] hover:bg-[#2c1810] hover:text-[#f5f0e8] transition-all">
              Discover Our Terroir
            </MagneticBtn>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="order-1 md:order-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1400&auto=format&fit=crop"
              alt="Wine barrel cellar"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-5 -left-5 bg-[#7b2d24] text-[#f5f0e8] p-5 text-xs uppercase tracking-[0.3em]">
              Chai de Vieillissement
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-8 md:px-16 bg-[#ede6d6] border-y border-[#2c1810]/10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#2c1810]/40 mb-12 text-center">Voices of Connoisseurs</p>
        </Reveal>
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testIdx}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.55 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-[#2c1810]/80 italic leading-relaxed mb-8">"{TESTIMONIALS[testIdx].quote}"</p>
              <p className="text-sm uppercase tracking-[0.3em] text-[#7b2d24] font-bold">{TESTIMONIALS[testIdx].name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#2c1810]/40 mt-1">{TESTIMONIALS[testIdx].title}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestIdx(i)}
                className={`h-2 rounded-full transition-all ${i === testIdx ? "w-6 bg-[#7b2d24]" : "w-2 bg-[#2c1810]/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-8 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#2c1810]/40 mb-3">La Cave Répond</p>
          <h2 className="text-4xl font-bold text-[#2c1810] tracking-tight mb-16">Frequently Asked</h2>
        </Reveal>
        <div className="divide-y divide-[#2c1810]/10">
          {FAQS.map((f, i) => (
            <div key={i} className="py-6">
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-base text-[#2c1810]/90 pr-8">{f.q}</span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#7b2d24] text-2xl shrink-0"
                >+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-[#2c1810]/55 leading-relaxed italic">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-8 md:px-16 text-center bg-[#2c1810] text-[#f5f0e8]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#f5f0e8]/30 mb-6">Paris · Bordeaux · London · New York</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#f5f0e8] mb-4 leading-tight">
            Open the<br />right bottle.
          </h2>
          <p className="text-[#f5f0e8]/50 mb-10 text-sm tracking-[0.1em] uppercase">Private cave selections curated by our sommeliers.</p>
          <MagneticBtn className="px-12 py-5 bg-[#d4956a] text-[#2c1810] text-xs uppercase tracking-[0.35em] font-bold hover:bg-[#f5f0e8] transition-colors">
            Begin Your Selection
          </MagneticBtn>
        </Reveal>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-[#2c1810]/10 bg-[#f5f0e8] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#2c1810]/30">
        <span>Château Vestige · Bordeaux</span>
        <span>© 2026 All rights reserved</span>
        <span>Depuis 1847</span>
      </footer>

      <style>{`::-webkit-scrollbar{width:6px;background:#f5f0e8}::-webkit-scrollbar-thumb{background:#2c181020}`}</style>
    </div>
  );
}
