"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Search, Globe, BookOpen, Clock, Tag, ChevronRight, ArrowUpRight, Rss } from "lucide-react";
import "../premium.css";

const ENTRIES = [
  { id: 1, title: "On the Aesthetics of Absence", category: "Philosophy", year: "2026", readTime: "9 min", tags: ["Minimalism", "Perception"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", excerpt: "What remains when everything decorative has been stripped away? Not nothing — an intensified presence." },
  { id: 2, title: "The Cartography of Forgetting", category: "Memory", year: "2025", readTime: "14 min", tags: ["Neuroscience", "Identity"], img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop", excerpt: "Memory's geography is defined not by what we retain but by the topography of selective erasure." },
  { id: 3, title: "Silence as Structure", category: "Architecture", year: "2025", readTime: "11 min", tags: ["Space", "Sound"], img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1000&auto=format&fit=crop", excerpt: "The Japanese ma, the musical rest, the pregnant pause — silence does not interrupt; it constitutes." },
  { id: 4, title: "Against Velocity", category: "Culture", year: "2024", readTime: "7 min", tags: ["Time", "Technology"], img: "https://images.unsplash.com/photo-1490750967868-88df5691cc5c?q=80&w=1000&auto=format&fit=crop", excerpt: "When acceleration becomes the default mode of existence, slowness becomes a radical political act." },
  { id: 5, title: "Material Intelligence", category: "Design", year: "2024", readTime: "12 min", tags: ["Craft", "Matter"], img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop", excerpt: "Stone remembers pressure. Wood holds the ghost of its rings. Material is not passive — it thinks." },
  { id: 6, title: "The Ethics of Attention", category: "Philosophy", year: "2024", readTime: "8 min", tags: ["Focus", "Ethics"], img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop", excerpt: "In an age of engineered distraction, choosing what you pay attention to is a moral decision." },
];

const CATEGORIES = ["All", "Philosophy", "Architecture", "Memory", "Culture", "Design"];

const FEATURED = ENTRIES[0];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function OrbitalArchiveSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const filtered = activeCategory === "All" ? ENTRIES : ENTRIES.filter(e => e.category === activeCategory);

  return (
    <div className="premium-theme bg-[#f5f3ef] text-[#1c1a17] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#f5f3ef]/90 backdrop-blur-xl border-b border-[#1c1a17]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base uppercase tracking-[0.3em] font-bold">ORBITAL</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] opacity-40" style={{ fontFamily: "sans-serif" }}>
          {["Archive", "Categories", "About", "Subscribe"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(s => !s)} className="opacity-40 hover:opacity-100 transition-opacity"><Search size={16} /></button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      {/* SEARCH BAR */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} className="fixed top-[60px] left-0 w-full z-40 bg-[#f5f3ef] border-b border-[#1c1a17]/8 px-8 md:px-16 py-4">
            <input autoFocus placeholder="Search the archive…" className="w-full bg-transparent text-[#1c1a17] placeholder-[#1c1a17]/30 text-xl outline-none" style={{ fontFamily: "'Georgia', serif" }} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[100] bg-[#1c1a17] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-4xl uppercase">
              {["Archive", "Categories", "About", "Subscribe"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO — Featured essay */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={FEATURED.img} alt={FEATURED.title} fill className="object-cover opacity-40" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/95 via-[#1c1a17]/30 to-transparent" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-20 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3 text-white/40 mb-6">
            <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "sans-serif" }}>{FEATURED.category}</span>
            <span>·</span>
            <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "sans-serif" }}>{FEATURED.year}</span>
            <span>·</span>
            <Clock size={9} />
            <span className="text-[9px]" style={{ fontFamily: "sans-serif" }}>{FEATURED.readTime} read</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="text-5xl md:text-6xl text-white leading-tight mb-6">{FEATURED.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-white/50 max-w-xl leading-relaxed mb-8">{FEATURED.excerpt}</motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} href="#" className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-0.5 text-sm hover:border-white transition-colors" style={{ fontFamily: "sans-serif" }}>
            Read Essay <ArrowRight size={13} />
          </motion.a>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#1c1a17] py-3.5 border-y border-white/5">
        <motion.div animate={{ x: [0, -2600] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.5em] text-white/20 shrink-0" style={{ fontFamily: "sans-serif" }}>Philosophy · Architecture · Memory · Culture · Design · The Long Essay ·</span>
          ))}
        </motion.div>
      </div>

      {/* CATEGORIES */}
      <section className="px-8 md:px-16 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1c1a17]/8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className={`text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${activeCategory === c ? "bg-[#1c1a17] text-white border-[#1c1a17]" : "border-[#1c1a17]/15 hover:border-[#1c1a17]/40"}`} style={{ fontFamily: "sans-serif" }}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#1c1a17]/40" style={{ fontFamily: "sans-serif" }}>
          <Rss size={10} /> Subscribe to Archive
        </div>
      </section>

      {/* ARCHIVE GRID */}
      <section className="px-8 md:px-16 py-16">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.07}>
                <motion.a href="#" className="group block" whileHover={{ y: -4 }}>
                  <div className="relative overflow-hidden mb-4" style={{ height: "36vh" }}>
                    <Image src={e.img} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                  </div>
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#1c1a17]/40 mb-2" style={{ fontFamily: "sans-serif" }}>
                    <span>{e.category}</span>
                    <span>·</span>
                    <span>{e.year}</span>
                    <span>·</span>
                    <Clock size={8} />
                    <span>{e.readTime}</span>
                  </div>
                  <h3 className="text-xl leading-tight mb-2 group-hover:opacity-70 transition-opacity">{e.title}</h3>
                  <p className="text-sm text-[#1c1a17]/50 leading-relaxed">{e.excerpt}</p>
                  <div className="flex gap-2 mt-4">
                    {e.tags.map(t => (
                      <span key={t} className="text-[8px] uppercase tracking-widest bg-[#1c1a17]/5 text-[#1c1a17]/50 px-2 py-1" style={{ fontFamily: "sans-serif" }}>{t}</span>
                    ))}
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FEATURED LIST — Most read */}
      <section className="bg-[#1c1a17] text-white px-8 md:px-16 py-24">
        <Reveal className="mb-10">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-4" style={{ fontFamily: "sans-serif" }}>Most Read</p>
          <h2 className="text-4xl leading-tight">Enduring<br />Essays</h2>
        </Reveal>
        <div className="divide-y divide-white/8">
          {ENTRIES.slice(0, 5).map((e, i) => (
            <Reveal key={e.id} delay={i * 0.06} className="py-5 flex items-center gap-6 group">
              <span className="text-[10px] text-white/20 w-5 shrink-0" style={{ fontFamily: "sans-serif" }}>{String(i + 1).padStart(2, "0")}</span>
              <div className="w-14 h-10 shrink-0 overflow-hidden">
                <Image src={e.img} alt="" width={56} height={40} className="object-cover w-full h-full group-hover:scale-110 transition-transform" unoptimized />
              </div>
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1" style={{ fontFamily: "sans-serif" }}>{e.category}</p>
                <p className="text-base leading-tight group-hover:opacity-60 transition-opacity">{e.title}</p>
              </div>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 text-white/60 transition-opacity shrink-0" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-8 md:px-16 py-24 text-center">
        <Reveal>
          <BookOpen size={20} className="text-[#1c1a17]/30 mx-auto mb-6" />
          <h2 className="text-4xl mb-4">The Slow Letter</h2>
          <p className="text-[#1c1a17]/50 max-w-sm mx-auto text-sm leading-relaxed mb-8">One long essay. Once a month. No engagement bait.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 border border-[#1c1a17]/20 px-4 py-3 text-sm outline-none bg-transparent placeholder-[#1c1a17]/30 focus:border-[#1c1a17]/60 transition-colors" style={{ fontFamily: "sans-serif" }} />
            <button className="bg-[#1c1a17] text-white px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-[#2d2b28] transition-colors" style={{ fontFamily: "sans-serif" }}>Subscribe</button>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1c1a17] text-white px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-base uppercase tracking-[0.3em] font-bold mb-1">ORBITAL</p>
          <p className="text-xs text-white/30" style={{ fontFamily: "sans-serif" }}>The Long Essay Archive</p>
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30" style={{ fontFamily: "sans-serif" }}>
          {["Archive", "RSS", "About", "Contact"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase" style={{ fontFamily: "sans-serif" }}>© 2026 Orbital</p>
      </footer>
    </div>
  );
}
