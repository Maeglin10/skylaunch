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
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

/* ── Reveal ──────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Counter ─────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      setCount((c) => {
        if (c + step >= target) { clearInterval(id); return target; }
        return c + step;
      });
    }, 22);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── MagneticBtn ─────────────────────────────────────────── */
function MagneticBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 18 });
  const sy = useSpring(my, { stiffness: 160, damping: 18 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = btnRef.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }, [mx, my]);
  const onMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.button
      ref={btnRef}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Lumière Sérum",
    tag: "Brightening",
    volume: "30ml",
    price: "€148",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Velours Crème",
    tag: "Deep Hydration",
    volume: "50ml",
    price: "€196",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=1200",
    badge: "New",
  },
  {
    id: 3,
    name: "Éclat Oil",
    tag: "Radiance",
    volume: "20ml",
    price: "€124",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200",
    badge: "",
  },
  {
    id: 4,
    name: "Doux Masque",
    tag: "Pore Refining",
    volume: "75ml",
    price: "€88",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1200",
    badge: "Limited",
  },
];

const FAQS = [
  {
    q: "Are your ingredients certified organic?",
    a: "Yes — every active ingredient is COSMOS-certified organic. We source from small-scale producers in the South of France and Morocco, with full traceability from farm to formula.",
  },
  {
    q: "Are products suitable for sensitive skin?",
    a: "All formulas are dermatologist-tested and free from parabens, synthetic fragrances, mineral oils, and sulphates. The Doux Masque and Velours Crème are specifically formulated for reactive skin.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 30-day satisfaction guarantee. If your skin disagrees, we refund in full — no questions, no returns required.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to 42 countries with carbon-neutral logistics. All packaging is biodegradable. Orders over €150 ship free worldwide.",
  },
];

const MARQUEE_ITEMS = [
  "CLEAN BEAUTY",
  "COSMOS ORGANIC",
  "DERMATOLOGIST TESTED",
  "CRUELTY FREE",
  "MADE IN FRANCE",
  "BIODEGRADABLE",
  "ZERO PARABENS",
];

const RITUALS = [
  { step: "01", title: "Cleanse", desc: "Begin with the Doux Gel, massaged into damp skin for 60 seconds.", img: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf22?auto=format&fit=crop&q=80&w=800" },
  { step: "02", title: "Treat", desc: "Apply 3 drops of Lumière Sérum to freshly cleansed skin, press gently.", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
  { step: "03", title: "Seal", desc: "Finish with Velours Crème. Lock in moisture with a light effleurage.", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800" },
];

/* ── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Ritual", "Shop", "Science", "Journal"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6 bg-[#faf7f3]/90 backdrop-blur-xl border-b border-rose-100/80">
        <Link href="/" className="font-black tracking-[-0.04em] text-xl text-stone-800">
          AURA<span className="text-rose-300">.</span>
        </Link>
        <ul className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-widest text-stone-400">
          {links.map((l) => (
            <li key={l}><a href="#" className="hover:text-stone-800 transition-colors">{l}</a></li>
          ))}
        </ul>
        <MagneticBtn className="hidden md:block px-6 py-2.5 bg-stone-800 text-[#faf7f3] text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-stone-700 transition-colors">
          Shop Now
        </MagneticBtn>
        <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="8" width="20" height="2" fill="#3d3530" />
            <rect x="4" y="14" width="14" height="2" fill="#3d3530" />
            <rect x="4" y="20" width="20" height="2" fill="#3d3530" />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="fixed inset-0 z-[200] bg-[#faf7f3] flex flex-col p-10"
          >
            <button onClick={() => setOpen(false)} className="self-end text-stone-300 hover:text-stone-800 mb-16 text-3xl">×</button>
            {links.map((l, i) => (
              <motion.a
                key={l}
                href="#"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => setOpen(false)}
                className="text-5xl font-black text-stone-700 hover:text-rose-400 uppercase tracking-tighter mb-6 transition-colors"
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden bg-[#faf7f3]">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1109543?w=800&q=80"
          alt="Skincare hero"
          fill
          unoptimized
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f3] via-[#faf7f3]/70 to-transparent" />
      </motion.div>

      {/* Rose gold glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-rose-200/50 blur-[120px]"
      />

      <div className="relative z-10 px-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-rose-400 text-xs font-black uppercase tracking-[0.5em] mb-6"
        >
          Luxury Skincare — Clean Formula
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[13vw] md:text-[8.5vw] font-black tracking-[-0.04em] text-stone-800 leading-none uppercase"
        >
          SKIN
          <br />
          <span className="italic text-rose-300">AS</span>
          <br />
          RITUAL.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-stone-500 max-w-xs leading-relaxed text-sm"
        >
          COSMOS-certified organic formulas, ethically sourced in France. Luxury without compromise.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-10 flex gap-4 flex-wrap"
        >
          <MagneticBtn className="px-8 py-4 bg-stone-800 text-[#faf7f3] font-black uppercase text-xs tracking-widest rounded-full hover:bg-stone-700 transition-colors">
            Discover the Ritual
          </MagneticBtn>
          <MagneticBtn className="px-8 py-4 border border-rose-200 text-stone-600 font-black uppercase text-xs tracking-widest rounded-full hover:border-rose-400 hover:text-rose-500 transition-colors">
            Learn the Science
          </MagneticBtn>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-12 bg-stone-400" />
        <span className="text-stone-500 text-[9px] font-black uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-4 bg-stone-800 border-y border-stone-700">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2400] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((w, i) => (
          <span key={i} className="text-[#faf7f3]/40 font-black uppercase text-xs tracking-[0.4em] mx-10 select-none">
            {w} <span className="text-rose-400/50 mx-3">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Stats ───────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: 12, suffix: "", label: "Active Ingredients" },
    { value: 97, suffix: "%", label: "COSMOS Organic" },
    { value: 42, suffix: "", label: "Countries Sold" },
    { value: 30, suffix: "d", label: "Satisfaction Guarantee" },
  ];
  return (
    <section className="bg-[#f4ede4] py-24 px-10 border-b border-rose-100">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-5xl md:text-6xl font-black text-stone-800 tracking-tighter leading-none mb-2">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <p className="text-rose-400 text-[11px] uppercase tracking-widest font-black">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Products ────────────────────────────────────────────── */
function Products() {
  const [activeModal, setActiveModal] = useState<(typeof PRODUCTS)[0] | null>(null);

  return (
    <section className="bg-[#faf7f3] py-28 px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-rose-400 text-xs font-black uppercase tracking-[0.5em] mb-3">The Collection</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-[-0.04em] text-stone-800 uppercase">
            Pure
            <br />
            <span className="text-stone-300 italic">Formulas.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => setActiveModal(p)}
                className="group relative overflow-hidden rounded-3xl bg-[#f4ede4] border border-rose-100 hover:border-rose-200 cursor-pointer transition-colors"
              >
                {p.badge && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-stone-800 text-[#faf7f3] text-[9px] font-black uppercase tracking-widest rounded-full">
                    {p.badge}
                  </span>
                )}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-rose-400 text-[9px] font-black uppercase tracking-widest mb-0.5">{p.tag} · {p.volume}</p>
                  <div className="flex items-end justify-between mt-1">
                    <h3 className="text-stone-800 font-black tracking-tight text-lg">{p.name}</h3>
                    <span className="text-stone-400 font-black">{p.price}</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-[300] bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#faf7f3] rounded-3xl overflow-hidden max-w-md w-full border border-rose-100"
            >
              <div className="relative h-64">
                <Image src={activeModal.img} alt={activeModal.name} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f3] via-transparent" />
              </div>
              <div className="p-8">
                <p className="text-rose-400 text-[10px] font-black uppercase tracking-widest mb-2">{activeModal.tag} · {activeModal.volume}</p>
                <h2 className="text-3xl font-black text-stone-800 tracking-tighter mb-4">{activeModal.name}</h2>
                <p className="text-stone-400 text-sm leading-relaxed mb-8">
                  Formulated with cold-processed botanicals. No heating. No compromise. Every batch
                  third-party tested for purity and potency before shipping.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-stone-700">{activeModal.price}</span>
                  <MagneticBtn className="px-6 py-3 bg-stone-800 text-[#faf7f3] font-black uppercase text-xs tracking-widest rounded-full hover:bg-stone-700 transition-colors">
                    Add to Ritual
                  </MagneticBtn>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── The Ritual Steps ────────────────────────────────────── */
function RitualSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-stone-800 py-32">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-733852?w=800&q=80"
          alt="Ritual background"
          fill
          unoptimized
          className="object-cover opacity-15"
        />
      </motion.div>
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <Reveal className="mb-16 text-center">
          <p className="text-rose-300 text-xs font-black uppercase tracking-[0.5em] mb-3">The Method</p>
          <h2 className="text-5xl md:text-7xl font-black text-[#faf7f3] tracking-[-0.04em] uppercase">
            Your
            <br />
            <span className="italic text-stone-400">Morning</span> Ritual.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {RITUALS.map((r, i) => (
            <Reveal key={r.step} delay={i * 0.12}>
              <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/8 hover:border-rose-300/30 transition-colors">
                <div className="relative h-52">
                  <Image src={r.img} alt={r.title} fill unoptimized className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-800 via-transparent" />
                </div>
                <div className="p-7">
                  <p className="text-rose-300 text-[10px] font-black uppercase tracking-widest mb-1">Step {r.step}</p>
                  <h3 className="text-[#faf7f3] text-xl font-black tracking-tight mb-3">{r.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-[#faf7f3] py-28 px-10">
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-rose-400 text-xs font-black uppercase tracking-[0.5em] mb-3">Common Questions</p>
          <h2 className="text-5xl font-black text-stone-800 tracking-tighter">FAQ</h2>
        </Reveal>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border border-rose-100 overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-7 text-left"
                >
                  <span className="text-stone-800 font-black pr-6 text-sm md:text-base">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-rose-400 text-2xl font-thin flex-shrink-0"
                  >+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-7 text-stone-400 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-stone-800 border-t border-stone-700 pt-24 pb-12 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          <div>
            <h3 className="text-[#faf7f3] font-black tracking-tighter text-3xl mb-4">
              AURA<span className="text-rose-300">.</span>
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Luxury skincare with a conscience. Clean formulas. Ethical sourcing. Delivered in
              biodegradable packaging.
            </p>
          </div>
          {[
            { title: "Skin", links: ["Serums", "Moisturisers", "Oils", "Masks"] },
            { title: "Brand", links: ["Philosophy", "Ingredients", "Sustainability", "Press"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-rose-300/60 text-[10px] font-black uppercase tracking-widest mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-stone-400 text-sm hover:text-rose-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs uppercase tracking-widest">© 2026 Aura Skincare. All rights reserved.</p>
          <p className="text-stone-700 text-xs uppercase tracking-widest">Template impact-69</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function ParallaxDepthZoomSlider() {
  return (
    <div className="premium-theme bg-[#faf7f3] text-stone-800 overflow-x-hidden selection:bg-rose-200/60">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Products />
      <RitualSteps />
      <FAQ />
      <Footer />
    </div>
  );
}
