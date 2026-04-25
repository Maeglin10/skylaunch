"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown, X, Quote, BookOpen, Feather, Globe, Award, Users } from "lucide-react";

const CHAPTERS = [
  { id: 1, title: "The Origin", subtitle: "Where every story begins", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80", color: "#e8c547", year: "2019", words: "12,400" },
  { id: 2, title: "The Journey", subtitle: "Through conflict and growth", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80", color: "#7c3aed", year: "2020", words: "18,700" },
  { id: 3, title: "The Crisis", subtitle: "When everything changes", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80", color: "#ef4444", year: "2021", words: "22,100" },
  { id: 4, title: "The Resolution", subtitle: "Finding meaning in the end", image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1400&q=80", color: "#10b981", year: "2022", words: "15,900" },
];

const WORKS = [
  { title: "Letters to Nobody", genre: "Literary Fiction", year: "2023", pages: 312, award: "Booker Longlisted", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80" },
  { title: "The Salt & the Wound", genre: "Memoir", year: "2022", pages: 256, award: "James Tait Black", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80" },
  { title: "Ghosts of the Meridian", genre: "Novel", year: "2021", pages: 428, award: "Sunday Times Top 10", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80" },
  { title: "What the River Keeps", genre: "Short Stories", year: "2020", pages: 198, award: "Costa Winner", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80" },
  { title: "Borderless", genre: "Essay Collection", year: "2019", pages: 224, award: "Orwell Prize", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
  { title: "The Unlit Hours", genre: "Novel", year: "2018", pages: 380, award: "Man Booker Prize", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
];

const TESTIMONIALS = [
  { text: "A voice that rewires how you think about narrative. Essential reading for anyone who loves language.", author: "The Guardian", role: "Book of the Year" },
  { text: "Raw, precise, and devastatingly human. Every sentence earns its place.", author: "The New Yorker", role: "Staff Pick" },
  { text: "Stories that outlive the reading. You carry them like scars — beautiful ones.", author: "The Paris Review", role: "Featured Author" },
];

const STATS = [
  { label: "Books Published", value: 14, suffix: "" },
  { label: "Languages", value: 32, suffix: "+" },
  { label: "Copies Sold", value: 2, suffix: "M+" },
  { label: "Literary Awards", value: 18, suffix: "" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
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
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); } else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  return (
    <motion.a ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0); }} href="#" className={className}>
      {children}
    </motion.a>
  );
}

export default function StorytellingJourney() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof WORKS[0] | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "Do you offer writing workshops?", a: "Yes — intensive 3-day residential workshops twice yearly, plus online sessions throughout the year." },
    { q: "Are signed editions available?", a: "Personalised signed copies of all titles can be ordered directly through this site." },
    { q: "Do you accept manuscript submissions?", a: "I don't take editorial commissions, but I do mentor a small cohort through the Literary Fellowship." },
    { q: "Where can I hear you speak?", a: "Festival dates and lectures are listed in the Events section. I appear at around 20 events per year." },
  ];

  return (
    <div className="min-h-screen bg-[#0e0b07] text-[#f5f0e8] font-serif">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b07] to-transparent pointer-events-none" />
        <span className="relative text-lg font-black tracking-[0.12em] uppercase" style={{ fontFamily: "Georgia, serif" }}>Eleanor Vance</span>
        <div className="relative hidden md:flex gap-8 text-xs tracking-[0.15em] uppercase opacity-70">
          {["Works", "Chapters", "About", "Events", "Shop"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <MagneticBtn className="relative hidden md:block px-5 py-2 border border-[#e8c547]/40 text-[#e8c547] text-xs tracking-widest uppercase hover:bg-[#e8c547]/10 transition-colors">
          New Book →
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="relative md:hidden flex flex-col gap-1.5">
          {[0,1,2].map(i => <span key={i} className="block w-6 h-px bg-[#f5f0e8]" />)}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#0e0b07] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Works", "Chapters", "About", "Events", "Shop"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider text-[#f5f0e8] hover:text-[#e8c547] transition-colors" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src={CHAPTERS[activeChapter].image} alt="hero" fill unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b07]/50 via-[#0e0b07]/30 to-[#0e0b07]" />
        </motion.div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: CHAPTERS[activeChapter].color }}>
            New Book Available Now
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-6xl md:text-8xl font-black leading-none mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Letters to<br /><em>Nobody</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg opacity-70 max-w-lg mx-auto mb-10">
            A novel about grief, memory, and the stories we tell ourselves to survive.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="px-8 py-4 font-black text-sm tracking-widest uppercase text-[#0e0b07]" style={{ background: CHAPTERS[activeChapter].color }}>
              Order Now
            </a>
            <button onClick={() => setVideoOpen(true)} className="flex items-center gap-3 px-8 py-4 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors">
              <Play size={14} /> Book Trailer
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {CHAPTERS.map((_, i) => (
            <button key={i} onClick={() => setActiveChapter(i)} className="w-8 h-1 transition-all" style={{ background: i === activeChapter ? CHAPTERS[i].color : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#e8c547] py-4 overflow-hidden">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex gap-16 whitespace-nowrap">
          {Array(12).fill(0).map((_, i) => (
            <span key={i} className="text-xs font-black tracking-[0.2em] uppercase text-[#0e0b07]">BOOKER LONGLISTED · MAN BOOKER WINNER · COSTA PRIZE · ORWELL PRIZE · JAMES TAIT BLACK · 2M+ READERS ·</span>
          ))}
        </motion.div>
      </div>

      {/* Chapters */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <Reveal><h2 className="text-4xl md:text-6xl font-black mb-4 leading-none" style={{ fontFamily: "Georgia, serif" }}>The Journey</h2></Reveal>
        <Reveal delay={0.1}><p className="text-base opacity-60 mb-16 max-w-md">Four acts. One life's work. Explore the creative evolution behind the writing.</p></Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {CHAPTERS.map((ch, i) => (
            <Reveal key={ch.id} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: "16/9" }} onClick={() => setActiveChapter(i)}>
                <Image src={ch.image} alt={ch.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b07] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase mb-2 block" style={{ color: ch.color }}>{ch.year} · {ch.words} words</span>
                  <h3 className="text-2xl font-black" style={{ fontFamily: "Georgia, serif" }}>{ch.title}</h3>
                  <p className="text-sm opacity-60 mt-1">{ch.subtitle}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: ch.color }}>
                  <span className="text-[#0e0b07] text-xs font-black">{ch.id}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Works */}
      <section className="py-32 bg-[#130f0a] px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-4xl md:text-6xl font-black mb-4 leading-none" style={{ fontFamily: "Georgia, serif" }}>The Library</h2></Reveal>
          <Reveal delay={0.1}><p className="text-base opacity-60 mb-16">14 books. One obsession: the human story.</p></Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {WORKS.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} onClick={() => setSelectedWork(w)} className="cursor-pointer group">
                  <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                    <Image src={w.image} alt={w.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#0e0b07]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="border border-white/60 px-4 py-2 text-xs tracking-widest uppercase">Read More</span>
                    </div>
                    <div className="absolute top-3 left-3 bg-[#e8c547] text-[#0e0b07] text-[10px] font-black px-2 py-1 uppercase tracking-wider">{w.award}</div>
                  </div>
                  <h3 className="text-lg font-black mb-1" style={{ fontFamily: "Georgia, serif" }}>{w.title}</h3>
                  <div className="flex items-center justify-between text-xs opacity-50">
                    <span>{w.genre}</span><span>{w.year} · {w.pages}pp</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-5xl font-black mb-2" style={{ color: "#e8c547", fontFamily: "Georgia, serif" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs tracking-[0.15em] uppercase opacity-50">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 max-w-3xl mx-auto text-center">
        <Reveal><Quote size={32} className="mx-auto mb-8 opacity-30" /></Reveal>
        <div className="relative h-40 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={testimonialIdx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <p className="text-xl md:text-2xl font-bold mb-6 italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>"{TESTIMONIALS[testimonialIdx].text}"</p>
              <span className="text-xs tracking-[0.2em] uppercase text-[#e8c547]">{TESTIMONIALS[testimonialIdx].author}</span>
              <span className="text-xs opacity-40 mt-1">{TESTIMONIALS[testimonialIdx].role}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2 justify-center mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setTestimonialIdx(i)} className="w-6 h-1 transition-all" style={{ background: i === testimonialIdx ? "#e8c547" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#130f0a] px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-3xl font-black mb-12" style={{ fontFamily: "Georgia, serif" }}>Questions</h2></Reveal>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-sm font-bold">
                  {f.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
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

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <Reveal><h2 className="text-5xl md:text-7xl font-black mb-6 leading-none" style={{ fontFamily: "Georgia, serif" }}>Begin<br /><em style={{ color: "#e8c547" }}>Reading</em></h2></Reveal>
        <Reveal delay={0.2}><p className="text-base opacity-60 mb-10 max-w-md mx-auto">Every great story starts with a single sentence. Let this be yours.</p></Reveal>
        <Reveal delay={0.3}>
          <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#e8c547] text-[#0e0b07] font-black text-sm tracking-widest uppercase">
            Shop All Books <ArrowRight size={16} />
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs opacity-40 tracking-wider">
        <span style={{ fontFamily: "Georgia, serif" }}>© 2026 Eleanor Vance</span>
        <div className="flex gap-8">
          {["Instagram", "Substack", "Events", "Press"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6" onClick={() => setVideoOpen(false)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={e => e.stopPropagation()} className="w-full max-w-3xl bg-[#130f0a] aspect-video flex items-center justify-center relative">
              <button onClick={() => setVideoOpen(false)} className="absolute top-4 right-4"><X size={20} /></button>
              <Play size={64} className="opacity-30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Work Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-6" onClick={() => setSelectedWork(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-[#130f0a] border border-white/10 max-w-lg w-full overflow-hidden">
              <div className="relative h-56">
                <Image src={selectedWork.image} alt={selectedWork.title} fill unoptimized className="object-cover" />
                <button onClick={() => setSelectedWork(null)} className="absolute top-4 right-4 bg-[#0e0b07]/80 p-2"><X size={16} /></button>
                <div className="absolute top-4 left-4 bg-[#e8c547] text-[#0e0b07] text-[10px] font-black px-2 py-1">{selectedWork.award}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black mb-1" style={{ fontFamily: "Georgia, serif" }}>{selectedWork.title}</h3>
                <p className="text-sm opacity-50 mb-4">{selectedWork.genre} · {selectedWork.year} · {selectedWork.pages} pages</p>
                <p className="text-sm opacity-70 leading-relaxed mb-6">A deeply felt work that navigates the terrain between memory and imagination, between what we remember and what we invent to fill the gaps.</p>
                <div className="flex gap-3">
                  <a href="#" className="flex-1 py-3 bg-[#e8c547] text-[#0e0b07] text-xs font-black tracking-widest uppercase text-center">Order Signed Copy</a>
                  <a href="#" className="flex-1 py-3 border border-white/20 text-xs tracking-widest uppercase text-center hover:bg-white/5 transition-colors">Read Extract</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
