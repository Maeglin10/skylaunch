"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Search, MapPin, Globe, Building2, Filter, ChevronRight, ExternalLink } from "lucide-react";
import "../premium.css";

const ENTRIES = [
  { id: 1, name: "NOVA PARTNERS", type: "VC", stage: "Series A–C", focus: "Climate Tech", location: "Paris", aum: "€420M", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", tag: "Active" },
  { id: 2, name: "DEPTH CAPITAL", type: "Family Office", stage: "Growth", focus: "Deep Tech", location: "Zurich", aum: "€1.2B", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", tag: "Active" },
  { id: 3, name: "MERIDIAN LABS", type: "Accelerator", stage: "Pre-Seed", focus: "BioTech", location: "Berlin", aum: "€80M", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop", tag: "Active" },
  { id: 4, name: "ATLAS VENTURES", type: "Corporate VC", stage: "Seed–B", focus: "AI/ML", location: "Amsterdam", aum: "€680M", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", tag: "Active" },
  { id: 5, name: "CELADON FUND", type: "VC", stage: "Seed–A", focus: "Fintech", location: "London", aum: "€290M", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=800&auto=format&fit=crop", tag: "Raising" },
  { id: 6, name: "IRON GATE", type: "PE", stage: "Buyout", focus: "Industrial", location: "Frankfurt", aum: "€3.4B", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop", tag: "Active" },
  { id: 7, name: "SOLARIS IMPACT", type: "Impact Fund", stage: "Pre-Seed–B", focus: "Energy", location: "Stockholm", aum: "€150M", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop", tag: "Active" },
  { id: 8, name: "COBALT RIDGE", type: "VC", stage: "A–D", focus: "Defence Tech", location: "Brussels", aum: "€520M", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop", tag: "Active" },
];

const TYPES = ["All", "VC", "PE", "Family Office", "Accelerator", "Corporate VC", "Impact Fund"];
const FOCUSES = ["All Sectors", "Climate Tech", "Deep Tech", "BioTech", "AI/ML", "Fintech", "Industrial", "Energy", "Defence Tech"];

const STATS = [
  { value: 340, suffix: "+", label: "Firms Listed" },
  { value: 2, suffix: ".8T€", label: "AUM Tracked" },
  { value: 28, suffix: "", label: "Countries" },
  { value: 14, suffix: "K", label: "Deals Indexed" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      s += step;
      if (s >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function MatrixDirectorySPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeType, setActiveType] = useState("All");
  const [activeFocus, setActiveFocus] = useState("All Sectors");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const filtered = ENTRIES.filter(e => {
    const matchType = activeType === "All" || e.type === activeType;
    const matchFocus = activeFocus === "All Sectors" || e.focus === activeFocus;
    const matchSearch = !searchQuery || e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.focus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchFocus && matchSearch;
  });

  return (
    <div className="premium-theme bg-[#f8f9fb] text-[#0d1120] min-h-screen overflow-x-hidden" style={{ fontFamily: "sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-4 bg-white/90 backdrop-blur-xl border-b border-[#0d1120]/6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-black uppercase tracking-[0.35em]">MATRIX<span className="text-blue-500">.</span></motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] opacity-40">
          {["Directory", "Deals", "Reports", "Premium"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest bg-blue-500 text-white px-5 py-2 hover:bg-blue-400 transition-colors">Access Full Directory</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0d1120] text-white flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase">
              {["Directory", "Deals", "Reports", "Premium"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-[#0d1120] text-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="Finance" fill className="object-cover opacity-10" unoptimized />
        </motion.div>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-12 pb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-blue-500" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-blue-400/70">European Investment Directory — 340+ Firms</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }} className="text-6xl md:text-[7vw] font-black uppercase leading-none tracking-tighter mb-6">
            Find Your<br />
            <span className="text-blue-400">Next Investor.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-white/50 text-lg max-w-xl">
            The most comprehensive database of active European investment firms, updated weekly.
          </motion.p>
        </motion.div>
        {/* Hero stats */}
        <div className="relative z-10 px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-[#0d1120] p-8 border border-white/5">
              <div className="text-4xl font-black text-blue-400 mb-1"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] uppercase tracking-widest text-white/30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="sticky top-[60px] z-40 bg-white border-b border-[#0d1120]/6 px-8 md:px-16 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3 flex-1 border border-[#0d1120]/15 px-4 py-3 focus-within:border-blue-500 transition-colors">
            <Search size={14} className="text-[#0d1120]/30 shrink-0" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search firms, sectors…" className="flex-1 bg-transparent text-sm outline-none placeholder-[#0d1120]/30" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TYPES.map(t => (
              <button key={t} onClick={() => setActiveType(t)} className={`shrink-0 text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${activeType === t ? "bg-[#0d1120] text-white border-[#0d1120]" : "border-[#0d1120]/15 hover:border-[#0d1120]/40"}`}>{t}</button>
            ))}
          </div>
        </div>
        {/* Focus pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {FOCUSES.map(f => (
            <button key={f} onClick={() => setActiveFocus(f)} className={`shrink-0 text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${activeFocus === f ? "bg-blue-500 text-white border-blue-500" : "border-[#0d1120]/10 text-[#0d1120]/50 hover:border-blue-300"}`}>{f}</button>
          ))}
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="px-8 md:px-16 py-12">
        <div className="flex items-center justify-between mb-6">
          <Reveal>
            <p className="text-[10px] uppercase tracking-widest text-[#0d1120]/40">{filtered.length} firms found</p>
          </Reveal>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeType + activeFocus + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.05}>
                <motion.div className="group bg-white border border-[#0d1120]/6 hover:border-blue-400/40 hover:shadow-lg transition-all cursor-pointer p-0 overflow-hidden" whileHover={{ y: -4 }}>
                  <div className="relative h-32 overflow-hidden">
                    <Image src={e.img} alt={e.name} fill className="object-cover opacity-40 group-hover:opacity-60 transition-all duration-600 group-hover:scale-105" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`text-[8px] uppercase tracking-widest px-2 py-1 ${e.tag === "Raising" ? "bg-orange-500 text-white" : "bg-green-500 text-white"}`}>{e.tag}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[8px] uppercase tracking-widest text-blue-500 mb-1">{e.type} · {e.focus}</p>
                    <h3 className="font-black text-sm uppercase tracking-tight mb-3">{e.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-[9px] text-[#0d1120]/50">
                      <div className="flex items-center gap-1"><MapPin size={9} /> {e.location}</div>
                      <div className="flex items-center gap-1"><Building2 size={9} /> {e.stage}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#0d1120]/5 flex items-center justify-between">
                      <span className="font-black text-sm text-[#0d1120]">{e.aum}</span>
                      <ExternalLink size={12} className="text-[#0d1120]/20 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#0d1120]/30 text-sm">No firms match your filters.</div>
        )}
      </section>

      {/* CTA — Premium */}
      <section className="bg-[#0d1120] text-white px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[9px] uppercase tracking-widest text-blue-400/50 mb-4">Matrix Premium</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tighter">
            Unlock Full<br />
            <span className="text-blue-400">Director Access.</span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md">Contact data, fund cycle tracking, portfolio mapping, and direct introduction services.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-blue-500 text-white px-10 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-blue-400 transition-colors flex items-center gap-2">
            Get Premium Access <ArrowRight size={13} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080e1a] text-white px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-black text-sm uppercase tracking-[0.3em]">MATRIX<span className="text-blue-500">.</span></p>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30">
          {["About", "API", "Data Policy", "Contact"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 Matrix Intelligence Ltd.</p>
      </footer>
    </div>
  );
}
