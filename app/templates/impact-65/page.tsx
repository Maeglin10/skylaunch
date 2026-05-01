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

/* ── Reveal ───────────────────────────────────────────────── */
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
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Counter ──────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      setCount((c) => {
        if (c + step >= target) {
          clearInterval(id);
          return target;
        }
        return c + step;
      });
    }, 24);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
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
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = btnRef.current!.getBoundingClientRect();
      mx.set(e.clientX - rect.left - rect.width / 2);
      my.set(e.clientY - rect.top - rect.height / 2);
    },
    [mx, my]
  );
  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

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
    name: "AuraX Pro",
    tag: "Flagship Over-Ear",
    price: "$349",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
    color: "#ff5500",
  },
  {
    id: 2,
    name: "NovaBuds",
    tag: "True Wireless",
    price: "$179",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1200",
    color: "#ff7733",
  },
  {
    id: 3,
    name: "PulseStudio",
    tag: "Studio Monitor",
    price: "$499",
    img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1200",
    color: "#cc3300",
  },
  {
    id: 4,
    name: "VoidAir",
    tag: "Open-Back",
    price: "$279",
    img: "https://images.unsplash.com/photo-1546435770-a3e736a8f706?auto=format&fit=crop&q=80&w=1200",
    color: "#ff8844",
  },
];

const FAQS = [
  {
    q: "What codec does AuraX Pro support?",
    a: "AuraX Pro supports aptX Adaptive, LDAC, AAC, and SBC for the widest device compatibility and audiophile-grade wireless quality.",
  },
  {
    q: "How long does the battery last?",
    a: "Up to 38 hours of playback with ANC off. The quick-charge feature gives 4 hours of playback from a 10-minute charge.",
  },
  {
    q: "Is the headband replaceable?",
    a: "Yes — all SONIQ headbands and earcup pads are user-replaceable. We sell spare parts directly on this site.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Every product ships with a 2-year international warranty. Extended coverage plans are available at checkout.",
  },
];

const MARQUEE_WORDS = [
  "PURE AUDIO",
  "ZERO LATENCY",
  "40mm DRIVERS",
  "APTX ADAPTIVE",
  "HI-RES CERTIFIED",
  "ANC PRO",
  "SONIQ STUDIO",
];

/* ── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Sound", "Products", "Technology", "Studio"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-white font-black tracking-tighter text-xl">
          SONIQ<span className="text-[#ff5500]">.</span>
        </Link>
        <ul className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-widest text-white/50">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-[#ff5500] transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <MagneticBtn className="hidden md:block px-6 py-2.5 bg-[#ff5500] text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-[#ff7733] transition-colors">
          Shop Now
        </MagneticBtn>
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="8" width="20" height="2" fill="currentColor" />
            <rect x="4" y="14" width="14" height="2" fill="currentColor" />
            <rect x="4" y="20" width="20" height="2" fill="currentColor" />
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
            className="fixed inset-0 z-[200] bg-black flex flex-col p-10"
          >
            <button
              onClick={() => setOpen(false)}
              className="self-end text-white/40 hover:text-white mb-16 text-3xl"
            >
              ×
            </button>
            {links.map((l, i) => (
              <motion.a
                key={l}
                href="#"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => setOpen(false)}
                className="text-5xl font-black text-white/80 hover:text-[#ff5500] uppercase tracking-tighter mb-6 transition-colors"
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
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1536482?w=800&q=80"
          alt="Hero headphones"
          fill
          unoptimized
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
      </motion.div>

      {/* Orange glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-[#ff5500]/20 blur-[120px]"
      />

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#ff5500] text-xs font-black uppercase tracking-[0.5em] mb-6"
        >
          Premium Audio — 2026 Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[16vw] md:text-[11vw] font-black tracking-tighter text-white leading-none uppercase"
        >
          FEEL THE
          <br />
          <span className="text-[#ff5500]">SOUND.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-white/50 text-sm uppercase tracking-widest max-w-sm mx-auto"
        >
          Hi-res wireless headphones engineered for purists
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mt-12 flex gap-4 justify-center"
        >
          <MagneticBtn className="px-8 py-4 bg-[#ff5500] text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-[#ff7733] transition-colors">
            Shop the Drop
          </MagneticBtn>
          <MagneticBtn className="px-8 py-4 border border-white/20 text-white font-black uppercase text-xs tracking-widest rounded-full hover:border-[#ff5500] hover:text-[#ff5500] transition-colors">
            Watch Film
          </MagneticBtn>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-12 bg-white" />
        <span className="text-white text-[9px] font-black uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  const text = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="overflow-hidden py-5 bg-[#ff5500] border-y border-[#cc3300]">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2400] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {text.map((w, i) => (
          <span
            key={i}
            className="text-black font-black uppercase text-sm tracking-widest mx-8 select-none"
          >
            {w} <span className="opacity-30 mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Stats ───────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: 40, suffix: "mm", label: "Driver Size" },
    { value: 38, suffix: "h", label: "Battery Life" },
    { value: 97, suffix: "dB", label: "SNR Ratio" },
    { value: 20, suffix: "k", label: "Hz Range" },
  ];

  return (
    <section className="bg-[#0a0a0a] py-28 px-8 border-b border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-5xl md:text-6xl font-black text-[#ff5500] tracking-tighter leading-none mb-2">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <p className="text-white/30 text-[11px] uppercase tracking-widest font-black">
              {s.label}
            </p>
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
    <section className="bg-black py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-[#ff5500] text-xs font-black uppercase tracking-[0.5em] mb-3">
            The Collection
          </p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase">
            Engineered
            <br />
            <span className="text-white/20">for ears.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => setActiveModal(p)}
                className="group relative overflow-hidden rounded-3xl bg-[#111] cursor-pointer border border-white/5 hover:border-[#ff5500]/40 transition-colors"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <p className="text-[#ff5500] text-[10px] font-black uppercase tracking-widest mb-1">
                    {p.tag}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-black text-white tracking-tighter">{p.name}</h3>
                    <span className="text-2xl font-black text-white/40">{p.price}</span>
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
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] rounded-3xl overflow-hidden max-w-lg w-full border border-white/10"
            >
              <div className="relative h-64">
                <Image
                  src={activeModal.img}
                  alt={activeModal.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]" />
              </div>
              <div className="p-8">
                <p className="text-[#ff5500] text-[10px] font-black uppercase tracking-widest mb-2">
                  {activeModal.tag}
                </p>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
                  {activeModal.name}
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  Premium acoustic engineering meets bold industrial design. Every component
                  hand-tuned for reference-grade listening in any environment.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#ff5500]">{activeModal.price}</span>
                  <MagneticBtn className="px-6 py-3 bg-[#ff5500] text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-[#ff7733] transition-colors">
                    Add to Cart
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

/* ── Technology Feature ──────────────────────────────────── */
function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0d0d0d] py-32">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1536482?w=800&q=80"
          alt="Technology"
          fill
          unoptimized
          className="object-cover opacity-15"
        />
      </motion.div>
      <div className="relative z-10 max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-[#ff5500] text-xs font-black uppercase tracking-[0.5em] mb-4">
            Inside the Driver
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-8">
            Acoustic
            <br />
            <span className="text-[#ff5500]">Science.</span>
          </h2>
          <p className="text-white/40 leading-relaxed mb-8">
            Our 40mm beryllium-coated dynamic drivers deliver a frequency response of 5Hz–40kHz,
            tuned in our Berlin acoustic lab to achieve sub-0.1% THD at reference levels.
          </p>
          <MagneticBtn className="px-8 py-4 border border-[#ff5500] text-[#ff5500] font-black uppercase text-xs tracking-widest rounded-full hover:bg-[#ff5500] hover:text-black transition-colors">
            Explore Tech
          </MagneticBtn>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "Beryllium Driver", d: "0.3μm coating" },
              { n: "Hybrid ANC", d: "−42dB noise floor" },
              { n: "aptX Adaptive", d: "24-bit / 96kHz" },
              { n: "USB-C DAC", d: "768kHz capable" },
            ].map((feat) => (
              <div
                key={feat.n}
                className="p-5 bg-white/3 border border-white/5 rounded-2xl hover:border-[#ff5500]/30 transition-colors"
              >
                <p className="text-[#ff5500] text-[9px] font-black uppercase tracking-widest mb-1">
                  {feat.d}
                </p>
                <p className="text-white text-sm font-black">{feat.n}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black py-28 px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-[#ff5500] text-xs font-black uppercase tracking-[0.5em] mb-3">
            Questions
          </p>
          <h2 className="text-5xl font-black text-white tracking-tighter">FAQ</h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border border-white/8 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className="text-white font-black pr-6">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[#ff5500] text-2xl font-thin flex-shrink-0"
                  >
                    +
                  </motion.span>
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
                      <p className="px-6 pb-6 text-white/40 text-sm leading-relaxed">{faq.a}</p>
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
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div>
            <h3 className="text-white font-black tracking-tighter text-3xl mb-4">
              SONIQ<span className="text-[#ff5500]">.</span>
            </h3>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Premium audio instruments for those who refuse to compromise on sound.
            </p>
          </div>
          {[
            { title: "Products", links: ["Over-Ear", "In-Ear", "Studio", "Accessories"] },
            { title: "Company", links: ["About", "Technology", "Careers", "Press"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[#ff5500] text-[10px] font-black uppercase tracking-widest mb-5">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-[#ff5500] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © 2026 SONIQ Audio. All rights reserved.
          </p>
          <p className="text-white/10 text-xs uppercase tracking-widest">Template impact-65</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function EditorialMultiGrid() {
  return (
    <div className="premium-theme bg-black text-white overflow-x-hidden selection:bg-[#ff5500]/40">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Products />
      <Technology />
      <FAQ />
      <Footer />
    </div>
  );
}
