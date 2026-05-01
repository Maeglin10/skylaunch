"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BookMarked, Archive, Search, Clock, Tag, ChevronDown, Menu, X, ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import "../premium.css";

const ESSAYS = [
  { title: "On the Permanence of Impermanence", cat: "Philosophy", year: "2024", read: "14 min", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop", featured: true },
  { title: "The Economy of Attention in Late Modernity", cat: "Society", year: "2023", read: "9 min", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop", featured: false },
  { title: "Architecture as Political Statement", cat: "Culture", year: "2023", read: "11 min", img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop", featured: false },
  { title: "Against Productivity: A Manifesto", cat: "Philosophy", year: "2022", read: "7 min", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop", featured: false },
  { title: "Memory, Place, and the Digital Archive", cat: "Tech", year: "2022", read: "12 min", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop", featured: false },
  { title: "The Topology of Grief", cat: "Society", year: "2021", read: "8 min", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop", featured: false },
];

const YEARS = ["All", "2024", "2023", "2022", "2021"];
const CATS = ["All", "Philosophy", "Society", "Culture", "Tech"];

const STATS = [
  { value: 180, suffix: "+", label: "Published essays" },
  { value: 9, suffix: " years", label: "Archive depth" },
  { value: 42, suffix: "", label: "Contributing voices" },
  { value: 3, suffix: "M+", label: "Words in archive" },
];

const TESTIMONIALS = [
  { name: "Sofia Beltrán", role: "Professor of Literature, Madrid", quote: "The archive is indispensable. I assign it to every graduate seminar I teach.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Thomas Hale", role: "Cultural Editor, FT", quote: "There is no outlet doing long-form criticism at this level. It's a national treasure.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Naomi Okafor", role: "Curator, Serpentine Gallery", quote: "They think in essays the way galleries think in exhibitions — with curatorial depth.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "How far back does the archive go?", a: "Our full archive spans from 2015 to present. All 180+ essays are available to subscribers. The most recent 12 months are partially open-access." },
  { q: "Can I cite these essays in academic work?", a: "Yes. All essays have persistent DOI links. We follow Chicago citation style. Contact us if you need any additional publication details for citations." },
  { q: "Are guest essays commissioned or submitted?", a: "Both. We commission most essays but accept unsolicited pitches from thinkers whose work aligns with our editorial focus. A pitch document is on our site." },
  { q: "Is there a print edition?", a: "We publish an annual print anthology each December — a curated selection of the year's best essays, beautifully designed and printed on archival paper." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    let cur = 0;
    const t = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-[#1a1a1a] mb-1">{count}{suffix}</div>
      <div className="text-sm text-[#9ca3af]">{label}</div>
    </div>
  );
}

export default function EditorialArchiveSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeYear, setActiveYear] = useState("All");
  const [activeCat, setActiveCat] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const filtered = ESSAYS.filter(e =>
    (activeYear === "All" || e.year === activeYear) &&
    (activeCat === "All" || e.cat === activeCat)
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#1a1a1a] overflow-x-hidden">
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#f8f6f3]/95 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center gap-2">
          <Archive className="w-4 h-4" />
          <span className="font-black text-lg tracking-tight font-serif">The Archive</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#9ca3af]">
          {["Essays", "Authors", "Themes", "About", "Print"].map(item => (
            <a key={item} href="#" className="hover:text-[#1a1a1a] transition-colors">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-[#1a1a1a] transition-colors">
            <Search className="w-4 h-4" /> Search
          </button>
          <motion.button whileHover={{ scale: 1.02 }} className="px-5 py-2 bg-[#1a1a1a] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors">
            Subscribe
          </motion.button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#f8f6f3] flex flex-col items-center justify-center gap-8 text-2xl font-serif font-black">
            {["Essays", "Authors", "Themes", "About"].map(item => <a key={item} href="#" onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative overflow-hidden pt-24">
        <motion.div style={{ y: heroY }} className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <Image src="https://images.unsplash.com/photo-1109543?w=800&q=80" alt="Archive" fill className="object-cover" unoptimized />
        </motion.div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-28">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs uppercase tracking-[0.3em] text-[#9ca3af] mb-6">
            Nine years of independent criticism
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="text-6xl md:text-8xl font-black leading-none mb-8 font-serif">
            The
            <br />
            <em className="not-italic">editorial</em>
            <br />
            archive.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl text-[#6b7280] max-w-xl leading-relaxed mb-10">
            180+ essays on culture, philosophy, society, and technology — curated for the reader who still believes in slow thinking.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-4 flex-wrap">
            <motion.a href="#" whileHover={{ scale: 1.02 }} className="px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-black transition-colors">
              Browse archive <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.02 }} className="px-8 py-4 border border-black/10 text-[#1a1a1a] font-bold rounded-xl hover:bg-black/5 transition-colors">
              Latest essay
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Archive grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 className="text-3xl font-black font-serif">Browse essays</h2>
          </div>
          <div className="flex gap-3 flex-wrap mb-4">
            <span className="text-xs text-[#9ca3af] uppercase tracking-wider self-center">Year:</span>
            {YEARS.map(y => (
              <button key={y} onClick={() => setActiveYear(y)} className={`px-3 py-1 rounded text-sm font-medium transition-colors ${activeYear === y ? "bg-[#1a1a1a] text-white" : "bg-black/5 text-[#6b7280] hover:bg-black/10"}`}>{y}</button>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <span className="text-xs text-[#9ca3af] uppercase tracking-wider self-center">Category:</span>
            {CATS.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} className={`px-3 py-1 rounded text-sm font-medium transition-colors ${activeCat === c ? "bg-[#1a1a1a] text-white" : "bg-black/5 text-[#6b7280] hover:bg-black/10"}`}>{c}</button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((essay, i) => (
              <Reveal key={essay.title} delay={i * 0.06} className={essay.featured ? "md:col-span-2 lg:col-span-2" : ""}>
                <motion.a href="#" whileHover={{ y: -4 }} className="group block">
                  <div className={`relative overflow-hidden rounded-2xl mb-4 ${essay.featured ? "h-64" : "h-44"}`}>
                    <Image src={essay.img} alt={essay.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 text-xs font-bold rounded text-[#1a1a1a]">{essay.cat}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#9ca3af] mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{essay.year}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{essay.read}</span>
                  </div>
                  <h3 className={`font-black font-serif leading-tight group-hover:underline decoration-1 ${essay.featured ? "text-2xl" : "text-lg"}`}>{essay.title}</h3>
                  <div className="mt-3 flex items-center gap-1 text-sm text-[#9ca3af] group-hover:text-[#1a1a1a] transition-colors font-medium">
                    Read <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#1a1a1a] text-white px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><h2 className="text-4xl font-black font-serif mb-16">From our readers</h2></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeT} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <p className="text-xl text-white/80 italic leading-relaxed mb-8 font-serif">"{TESTIMONIALS[activeT].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={44} height={44} className="rounded-full object-cover" unoptimized />
                <div className="text-left">
                  <p className="font-bold text-sm">{TESTIMONIALS[activeT].name}</p>
                  <p className="text-white/50 text-xs">{TESTIMONIALS[activeT].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeT ? "bg-white" : "bg-white/20"}`} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><h2 className="text-3xl font-black font-serif">Questions</h2></Reveal>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-black/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left">
                  <span className="font-bold">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-[#9ca3af] shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="pb-5 text-[#6b7280] text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1a1a1a] text-white px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black font-serif mb-6">Access the full archive</h2>
          <p className="text-white/60 text-lg mb-10">Unlimited access to 180+ essays, the weekly dispatch, and the annual print edition.</p>
          <motion.button whileHover={{ scale: 1.03 }} className="px-10 py-5 bg-white text-black font-black rounded-2xl flex items-center gap-2 mx-auto hover:bg-white/90 transition-colors">
            Subscribe — €9/month <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Reveal>
      </section>

      <footer className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9ca3af] border-t border-black/5">
        <div className="font-black text-[#1a1a1a] font-serif flex items-center gap-2"><Archive className="w-4 h-4" />The Archive</div>
        <p>© 2026 The Archive. Independent since 2015.</p>
        <div className="flex gap-6">{["About", "Privacy", "Contact", "Print"].map(l => <a key={l} href="#" className="hover:text-[#1a1a1a] transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
