"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, ChevronLeft, ChevronRight, Play, MapPin, Clock, Users } from "lucide-react";

const CHAPTERS = [
  {
    id: 1, label: "Beginnings", year: "1997", title: "Born from clay and salt water", desc: "A small pottery studio on the Cornish coast. Two sisters, a wheel, and a kiln that barely worked. The first collection sold out at a village market in three hours.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", color: "#e8c547",
  },
  {
    id: 2, label: "Expansion", year: "2007", title: "When the world started watching", desc: "A feature in Wallpaper* changed everything overnight. Orders from Tokyo, New York, Paris. We hired our first ten potters and moved into the old mill.", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80", color: "#f43f5e",
  },
  {
    id: 3, label: "Craft", year: "2015", title: "Slowing down to speed up", desc: "We refused to automate. Every piece still thrown by hand. The waiting list grew to 14 months. We said no to every private equity offer that came.", image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1200&q=80", color: "#34d399",
  },
  {
    id: 4, label: "Today", year: "2026", title: "The work is still the same", desc: "28 years. Still the same clay. Still the same process. 60 potters now, in three studios. Still family-owned. Still sold out every season.", image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1200&q=80", color: "#818cf8",
  },
];

const TEAM = [
  { name: "Rosa Vane", role: "Co-Founder & Lead Potter", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Mira Vane", role: "Co-Founder & Creative Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Theo Marsh", role: "Head of Production", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Lila Osei", role: "Glaze Chemist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = Math.max(1, Math.ceil(target / 55));
    const t = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(t); } else setCount(n); }, 24);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.a ref={ref} style={{ x: sx, y: sy }} onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); }} onMouseLeave={() => { x.set(0); y.set(0); }} href="#" className={className}>{children}</motion.a>
  );
}

export default function HorizontalNarrative() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const prev = () => setActiveChapter(c => (c - 1 + CHAPTERS.length) % CHAPTERS.length);
  const next = () => setActiveChapter(c => (c + 1) % CHAPTERS.length);

  const faqs = [
    { q: "Can I visit the studio?", a: "Open studio days run every second Saturday from April to October. Booking required — maximum 12 visitors per session." },
    { q: "How long is the waiting list?", a: "Currently 14 months for new customers. Returning customers receive priority access to seasonal releases." },
    { q: "Do you accept commissions?", a: "A small commission programme opens each January. Pieces take 3–4 months from clay to delivery." },
    { q: "Is the clay local?", a: "All clay sourced within 40 miles of the studio. We've worked with the same supplier since 1997." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-[#1c1810]" style={{ fontFamily: "Georgia, serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between bg-[#f5f1eb]/90 backdrop-blur-lg border-b border-black/5">
        <span className="text-base font-black tracking-[0.1em] italic">Vane & Sisters</span>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
          {["Our Story", "Collection", "Process", "Studio", "Contact"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <MagneticBtn className="hidden md:block px-5 py-2 border border-[#1c1810]/20 text-[10px] tracking-widest uppercase hover:bg-[#1c1810]/5 transition-colors" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
          Shop Now →
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-[#1c1810] mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#f5f1eb] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Our Story", "Collection", "Process", "Studio", "Contact"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 italic tracking-wide hover:opacity-50 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src={CHAPTERS[activeChapter].image} alt="hero" fill unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f1eb] via-[#f5f1eb]/20 to-transparent" />
        </motion.div>
        <div className="relative z-10 px-8 md:px-16 pb-16 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.3em] uppercase mb-4 opacity-40" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
            Est. 1997 · Cornwall, UK
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-9xl font-black italic leading-none mb-8">
            Made by<br />hand, always.
          </motion.h1>
          <MagneticBtn className="inline-flex items-center gap-3 px-8 py-4 bg-[#1c1810] text-white font-black text-xs tracking-widest uppercase" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
            Explore the Collection <ArrowRight size={14} />
          </MagneticBtn>
        </div>
      </section>

      {/* Horizontal Chapter Narrative */}
      <section className="py-32 px-6 bg-[#1c1810] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Reveal>
              <h2 className="text-3xl font-black italic">Our Story</h2>
            </Reveal>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronLeft size={16} /></button>
              <button onClick={next} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatePresence mode="wait">
              <motion.div key={activeChapter} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.6 }} className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src={CHAPTERS[activeChapter].image} alt={CHAPTERS[activeChapter].title} fill unoptimized className="object-cover" />
                <div className="absolute top-4 left-4 text-xs font-bold tracking-widest px-3 py-2" style={{ background: CHAPTERS[activeChapter].color, color: "#1c1810", fontFamily: "Helvetica Neue, sans-serif" }}>
                  {CHAPTERS[activeChapter].year}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={activeChapter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-4 opacity-40" style={{ color: CHAPTERS[activeChapter].color, fontFamily: "Helvetica Neue, sans-serif" }}>
                  {CHAPTERS[activeChapter].label}
                </p>
                <h3 className="text-3xl font-black italic mb-6 leading-snug">{CHAPTERS[activeChapter].title}</h3>
                <p className="text-base opacity-60 leading-relaxed mb-8">{CHAPTERS[activeChapter].desc}</p>
                <div className="flex gap-4 items-center">
                  {CHAPTERS.map((_, i) => (
                    <button key={i} onClick={() => setActiveChapter(i)} className="w-8 h-1 transition-all" style={{ background: i === activeChapter ? CHAPTERS[activeChapter].color : "rgba(255,255,255,0.2)" }} />
                  ))}
                  <span className="text-[10px] opacity-20 tracking-widest ml-4" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
                    {String(activeChapter + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-b border-black/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ label: "Years Making", value: 28, suffix: "" }, { label: "Potters", value: 60, suffix: "" }, { label: "Pieces / Year", value: 4200, suffix: "+" }, { label: "Month Waitlist", value: 14, suffix: "m" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-5xl font-black italic mb-2" style={{ color: "#e8c547" }}><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[10px] tracking-[0.2em] uppercase opacity-40" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal><h2 className="text-3xl font-black italic mb-16">The Hands Behind the Work</h2></Reveal>
        <div className="grid md:grid-cols-4 gap-6">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }}>
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                  <Image src={m.image} alt={m.name} fill unoptimized className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-base font-black italic mb-1">{m.name}</h3>
                <p className="text-xs opacity-40 tracking-wider" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>{m.role}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#edeae3] px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-2xl font-black italic mb-12">Questions</h2></Reveal>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-black/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-sm font-bold" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
                  {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pb-5 text-sm opacity-60 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Studio CTA */}
      <section className="py-32 px-6 text-center bg-[#1c1810] text-white">
        <Reveal>
          <div className="flex items-center justify-center gap-2 mb-4 opacity-40 text-xs tracking-widest uppercase" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
            <MapPin size={12} /> Mousehole, Cornwall · <Clock size={12} /> Open Saturdays
          </div>
        </Reveal>
        <Reveal delay={0.1}><h2 className="text-5xl md:text-8xl font-black italic mb-4 leading-none">Come and<br /><span className="text-[#e8c547]">watch us work.</span></h2></Reveal>
        <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">Open studio days every second Saturday. See clay become something that lasts a century.</p></Reveal>
        <Reveal delay={0.3}>
          <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#e8c547] text-[#1c1810] font-black text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
            Book a Studio Visit <ArrowRight size={14} />
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#1c1810] text-white py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-30 tracking-wider uppercase" style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
        <span className="italic font-bold normal-case text-sm">Vane & Sisters</span>
        <div className="flex gap-8">{["Instagram", "Newsletter", "Stockists", "Press"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
