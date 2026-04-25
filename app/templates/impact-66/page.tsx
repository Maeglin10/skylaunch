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
      initial={{ opacity: 0, y: 52 }}
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
  const sx = useSpring(mx, { stiffness: 160, damping: 16 });
  const sy = useSpring(my, { stiffness: 160, damping: 16 });

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
const PROJECTS = [
  {
    id: 1,
    title: "Villa Sasso",
    category: "Residential",
    location: "Como, Italy",
    year: "2025",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    title: "Atrium Collective",
    category: "Commercial",
    location: "Berlin, Germany",
    year: "2025",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    title: "The Croft House",
    category: "Interior",
    location: "Edinburgh, UK",
    year: "2024",
    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 4,
    title: "Pavillon Blanc",
    category: "Public",
    location: "Lyon, France",
    year: "2024",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
  },
];

const FAQS = [
  {
    q: "What is your design process from brief to delivery?",
    a: "We follow a four-phase process: Discovery (client immersion, site analysis), Concept (spatial narratives, material boards), Development (technical drawings, contractor coordination), and Delivery (site supervision, quality sign-off).",
  },
  {
    q: "Do you work on projects outside Europe?",
    a: "Yes. We have delivered projects across the Middle East, North America, and South-East Asia. Our network of trusted local contractors ensures consistent quality globally.",
  },
  {
    q: "How do you approach sustainability?",
    a: "Every project includes a passive-design strategy — orientation, natural ventilation, and thermal mass — before specifying any active systems. We target BREEAM Excellent as a baseline.",
  },
  {
    q: "What is a typical project timeline?",
    a: "A residential build typically runs 18–24 months from commission to handover. Commercial projects vary by complexity. We provide detailed Gantt charts at project kick-off.",
  },
];

const MARQUEE_ITEMS = [
  "ARCHITECTURE",
  "INTERIOR DESIGN",
  "URBAN PLANNING",
  "HERITAGE RESTORATION",
  "LANDSCAPE",
  "BRAND IDENTITY",
];

/* ── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Studio", "Work", "Process", "Contact"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6 bg-[#f5f0e8]/90 backdrop-blur-xl border-b border-stone-200">
        <Link href="/" className="font-black tracking-[-0.04em] text-xl text-stone-900 uppercase">
          FORMA<span className="text-stone-400">.</span>STUDIO
        </Link>
        <ul className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-widest text-stone-400">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-stone-900 transition-colors">{l}</a>
            </li>
          ))}
        </ul>
        <MagneticBtn className="hidden md:block px-6 py-2.5 bg-stone-900 text-[#f5f0e8] text-[11px] font-black uppercase tracking-widest hover:bg-stone-700 transition-colors">
          Commission Us
        </MagneticBtn>
        <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="8" width="20" height="2" fill="#1c1c1c" />
            <rect x="4" y="14" width="13" height="2" fill="#1c1c1c" />
            <rect x="4" y="20" width="20" height="2" fill="#1c1c1c" />
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
            className="fixed inset-0 z-[200] bg-[#f5f0e8] flex flex-col p-10"
          >
            <button onClick={() => setOpen(false)} className="self-end text-stone-400 hover:text-stone-900 mb-16 text-3xl">×</button>
            {links.map((l, i) => (
              <motion.a
                key={l}
                href="#"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => setOpen(false)}
                className="text-5xl font-black text-stone-800 hover:text-stone-400 uppercase tracking-tighter mb-6 transition-colors"
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
    <section ref={ref} className="relative h-screen flex items-end justify-start overflow-hidden bg-[#f5f0e8]">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2400"
          alt="Architecture hero"
          fill
          unoptimized
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e8] via-[#f5f0e8]/10 to-transparent" />
      </motion.div>

      <div className="relative z-10 px-10 pb-24 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-stone-500 text-xs font-black uppercase tracking-[0.5em] mb-6 font-mono"
        >
          Architecture & Interior Design — Est. 2009
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[13vw] md:text-[9vw] font-black tracking-[-0.04em] text-stone-900 uppercase leading-none"
        >
          SPACE
          <br />
          <span className="italic font-black text-stone-300">AS</span> ART.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-stone-500 max-w-sm leading-relaxed font-mono text-sm"
        >
          We design spaces that last — not trends. From private residences to civic landmarks,
          every detail is deliberate.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute right-10 bottom-24 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-16 bg-stone-400"
        />
        <span className="text-stone-400 text-[9px] font-black uppercase tracking-widest -rotate-90 mt-4">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-5 bg-stone-900 border-y border-stone-800">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2400] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((w, i) => (
          <span key={i} className="text-[#f5f0e8]/60 font-black uppercase text-xs tracking-[0.4em] mx-10 select-none">
            {w} <span className="opacity-30 mx-3">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Stats ───────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: 17, suffix: "+", label: "Years of Practice" },
    { value: 148, suffix: "", label: "Projects Built" },
    { value: 23, suffix: "", label: "Countries" },
    { value: 31, suffix: "", label: "Design Awards" },
  ];
  return (
    <section className="bg-stone-900 py-28 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-6xl font-black text-[#f5f0e8] tracking-tighter leading-none mb-2">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <p className="text-stone-500 text-[11px] uppercase tracking-widest font-black font-mono">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Projects ────────────────────────────────────────────── */
function Projects() {
  const [activeModal, setActiveModal] = useState<(typeof PROJECTS)[0] | null>(null);

  return (
    <section className="bg-[#f5f0e8] py-28 px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-stone-400 text-xs font-black uppercase tracking-[0.5em] mb-3 font-mono">Selected Work</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-[-0.04em] text-stone-900 uppercase">
            Our
            <br />
            <span className="text-stone-300 italic">Projects.</span>
          </h2>
        </Reveal>

        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ x: 6 }}
                onClick={() => setActiveModal(p)}
                className="group flex items-stretch gap-0 cursor-pointer border border-stone-200 hover:border-stone-900 transition-colors overflow-hidden"
              >
                <div className="relative w-48 md:w-72 flex-shrink-0 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between bg-white group-hover:bg-stone-50 transition-colors">
                  <div>
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest font-mono mb-1">{p.category} — {p.year}</p>
                    <h3 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tighter">{p.title}</h3>
                  </div>
                  <p className="text-stone-400 text-sm font-mono">{p.location}</p>
                </div>
                <div className="w-16 bg-stone-900 group-hover:bg-stone-800 transition-colors flex items-center justify-center flex-shrink-0">
                  <span className="text-[#f5f0e8] text-2xl rotate-[-45deg]">→</span>
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
            className="fixed inset-0 z-[300] bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#f5f0e8] max-w-2xl w-full overflow-hidden border border-stone-200"
            >
              <div className="relative h-72">
                <Image src={activeModal.img} alt={activeModal.title} fill unoptimized className="object-cover" />
              </div>
              <div className="p-10">
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest font-mono mb-2">{activeModal.category} · {activeModal.location} · {activeModal.year}</p>
                <h2 className="text-4xl font-black text-stone-900 tracking-tighter mb-4">{activeModal.title}</h2>
                <p className="text-stone-500 leading-relaxed text-sm mb-8">
                  A landmark project that redefined spatial language for its typology. Every material was sourced within 200km. Natural light is the primary design element throughout.
                </p>
                <div className="flex gap-4">
                  <MagneticBtn className="px-7 py-3 bg-stone-900 text-[#f5f0e8] font-black uppercase text-xs tracking-widest hover:bg-stone-700 transition-colors">
                    View Case Study
                  </MagneticBtn>
                  <button onClick={() => setActiveModal(null)} className="px-7 py-3 border border-stone-300 text-stone-500 font-black uppercase text-xs tracking-widest hover:border-stone-900 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Feature ─────────────────────────────────────────────── */
function Feature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-stone-900 py-36">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=2400"
          alt="Interior"
          fill
          unoptimized
          className="object-cover opacity-20"
        />
      </motion.div>
      <div className="relative z-10 max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-20 items-center">
        <Reveal>
          <p className="text-stone-500 text-xs font-black uppercase tracking-[0.5em] mb-4 font-mono">Our Philosophy</p>
          <h2 className="text-5xl md:text-7xl font-black text-[#f5f0e8] tracking-tighter uppercase leading-none mb-8">
            Craft over
            <br />
            <span className="italic text-stone-400">speed.</span>
          </h2>
          <p className="text-stone-400 leading-relaxed mb-8 max-w-md">
            We believe a building should outlive its architect by centuries. We decline any project
            that cannot be delivered to that standard. Our studio accepts only eight commissions per year.
          </p>
          <MagneticBtn className="px-8 py-4 border border-stone-600 text-stone-300 font-black uppercase text-xs tracking-widest hover:border-[#f5f0e8] hover:text-[#f5f0e8] transition-colors">
            About the Studio
          </MagneticBtn>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="space-y-px">
            {[
              ["Site Analysis", "Every commission begins with 4 weeks of on-site study."],
              ["Material Ethics", "We source within 200km wherever structurally feasible."],
              ["Client Partnership", "Bi-weekly design sessions from concept to handover."],
              ["Post-Occupancy", "Free 12-month evaluation after every project."],
            ].map(([title, desc]) => (
              <div key={title} className="p-6 border border-stone-700 hover:border-stone-500 transition-colors">
                <p className="text-[#f5f0e8] font-black mb-1">{title}</p>
                <p className="text-stone-500 text-sm">{desc}</p>
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
    <section className="bg-[#f5f0e8] py-28 px-10">
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-stone-400 text-xs font-black uppercase tracking-[0.5em] mb-3 font-mono">Common Questions</p>
          <h2 className="text-5xl font-black text-stone-900 tracking-tighter">FAQ</h2>
        </Reveal>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-7 text-left"
                >
                  <span className="text-stone-900 font-black pr-6 text-sm md:text-base">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-stone-900 text-2xl font-thin flex-shrink-0"
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
                      <p className="px-7 pb-7 text-stone-500 text-sm leading-relaxed font-mono">{faq.a}</p>
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
    <footer className="bg-stone-900 border-t border-stone-800 pt-24 pb-12 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          <div>
            <h3 className="text-[#f5f0e8] font-black tracking-tighter text-3xl uppercase mb-4">
              FORMA<span className="text-stone-600">.</span>STUDIO
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs font-mono">
              Architecture and interior design for those who believe permanence is a form of beauty.
            </p>
          </div>
          {[
            { title: "Practice", links: ["Residential", "Commercial", "Public", "Heritage"] },
            { title: "Studio", links: ["About", "Team", "Awards", "Press"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-5 font-mono">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-stone-500 text-sm hover:text-[#f5f0e8] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs uppercase tracking-widest font-mono">© 2026 Forma Studio. All rights reserved.</p>
          <p className="text-stone-700 text-xs uppercase tracking-widest font-mono">Template impact-66</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function FoodRecipeLab() {
  return (
    <div className="premium-theme bg-[#f5f0e8] text-stone-900 overflow-x-hidden selection:bg-stone-900/20">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Projects />
      <Feature />
      <FAQ />
      <Footer />
    </div>
  );
}
