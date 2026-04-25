"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, X, ChevronDown, Film, Camera, Award, Clock, Eye, Star } from "lucide-react";

const FILMS = [
  { id: 1, title: "PARALLAX", director: "Elias Vorn", year: 2024, runtime: "2h 14m", genre: "Sci-Fi / Drama", awards: "3 Cannes Awards", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80", still: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80", color: "#f43f5e", rating: 9.1 },
  { id: 2, title: "MERIDIAN", director: "Sasha Klein", year: 2023, runtime: "1h 58m", genre: "Thriller / Neo-Noir", awards: "Venice Silver Lion", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80", still: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80", color: "#8b5cf6", rating: 8.7 },
  { id: 3, title: "SALT OCEAN", director: "Camille Reyes", year: 2023, runtime: "1h 44m", genre: "Documentary", awards: "Sundance Grand Jury", image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1200&q=80", still: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80", color: "#0ea5e9", rating: 8.4 },
  { id: 4, title: "AFTERGLOW", director: "Marcus Tan", year: 2022, runtime: "2h 02m", genre: "Romance / Drama", awards: "Palme d'Or", image: "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=1200&q=80", still: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&q=80", color: "#f59e0b", rating: 9.3 },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
];

const STATS = [
  { label: "Films Distributed", value: 240, suffix: "+" },
  { label: "Festival Awards", value: 89, suffix: "" },
  { label: "Countries", value: 47, suffix: "" },
  { label: "Avg Rating", value: 8.9, suffix: "" },
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
    let n = 0; const step = Math.max(1, Math.ceil(target / 60));
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

export default function CinematicMotionSPA() {
  const [activeFilm, setActiveFilm] = useState(FILMS[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const faqs = [
    { q: "How do you select films for distribution?", a: "We look for singular vision over commercial formula. If a film has something to say and a cinematic language to say it with, we want to talk." },
    { q: "Do you accept international submissions?", a: "Yes — all submissions are language and territory agnostic. We distribute in 47 countries with localised marketing support." },
    { q: "What does your distribution deal look like?", a: "Non-exclusive festival runs, theatrical windows, then VOD. We take 20% of net receipts — no upfront fees." },
    { q: "Can I screen one of your titles?", a: "Educational, festival, and repertory screenings available. Contact us with date, venue, and expected audience size." },
  ];

  return (
    <div className="min-h-screen bg-[#08060e] text-white" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08060e]/80 to-transparent pointer-events-none" />
        <span className="relative text-sm font-black tracking-[0.2em] uppercase">LUMIÈRE FILMS</span>
        <div className="relative hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Catalogue", "In Cinemas", "Festivals", "About", "Submit"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <MagneticBtn className="relative hidden md:block px-5 py-2 border border-white/20 text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 transition-colors">
          Submit Film →
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="relative md:hidden">{[0,1,2].map(i => <span key={i} className="block w-6 h-px bg-white mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#08060e] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Catalogue", "In Cinemas", "Festivals", "About", "Submit"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:opacity-50 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
          <Image src={activeFilm.image} alt={activeFilm.title} fill unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08060e] via-[#08060e]/40 to-[#08060e]/20" />
        </motion.div>
        <div className="relative z-10 px-8 md:px-16 pb-16 w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3 opacity-50">{activeFilm.genre} · {activeFilm.year} · {activeFilm.runtime}</p>
              <h1 className="text-6xl md:text-9xl font-black leading-none tracking-tight">{activeFilm.title}</h1>
              <p className="text-sm opacity-40 mt-2">Directed by {activeFilm.director} · {activeFilm.awards}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setTrailerOpen(true)} className="flex items-center gap-3 px-6 py-3 border border-white/20 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors">
                <Play size={12} /> Trailer
              </button>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: activeFilm.color }}>
                <Star size={14} fill="currentColor" /> {activeFilm.rating}
              </div>
            </div>
          </motion.div>
          {/* Film selectors */}
          <div className="flex gap-3 mt-8">
            {FILMS.map((f, i) => (
              <button key={f.id} onClick={() => setActiveFilm(f)} className="relative overflow-hidden w-16 h-10 transition-all" style={{ outline: f.id === activeFilm.id ? `2px solid ${f.color}` : "2px solid transparent" }}>
                <Image src={f.still} alt={f.title} fill unoptimized className="object-cover opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Catalogue</h2></Reveal>
        <Reveal delay={0.1}><p className="text-sm opacity-40 mb-16">240+ films from independent voices worldwide.</p></Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FILMS.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }} onClick={() => setActiveFilm(f)} className="cursor-pointer group">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "2/3" }}>
                  <Image src={f.still} alt={f.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-[10px] tracking-widest uppercase border border-white/40 px-3 py-1.5">View Film</span>
                  </div>
                  <div className="absolute top-3 left-3 text-[9px] font-bold px-2 py-1 text-white" style={{ background: f.color }}>{f.awards}</div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-bold" style={{ color: f.color }}>
                    <Star size={10} fill="currentColor" /> {f.rating}
                  </div>
                </div>
                <h3 className="text-base font-black tracking-wide">{f.title}</h3>
                <div className="flex items-center justify-between mt-1 text-[10px] opacity-40">
                  <span>{f.director}</span><span>{f.year} · {f.runtime}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-2xl font-black tracking-tight mb-12 uppercase">Production Stills</h2></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {GALLERY.map((img, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setGalleryOpen(i)} className="relative overflow-hidden cursor-pointer" style={{ aspectRatio: i % 3 === 0 ? "1/1" : "16/9" }}>
                <Image src={img} alt={`still ${i}`} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Eye size={20} className="opacity-0 group-hover:opacity-100" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-white/5 border-b border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-5xl font-black mb-2" style={{ color: FILMS[i % FILMS.length].color }}><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[10px] tracking-[0.2em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0e0b16] px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-tight uppercase mb-12">Distribution FAQ</h2></Reveal>
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
                      <p className="pb-5 text-sm opacity-50 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <motion.div animate={{ opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 6, repeat: Infinity }} className="absolute inset-0 bg-gradient-radial from-rose-500/20 to-transparent" />
        <div className="relative z-10">
          <Reveal><h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 leading-none uppercase">Your Film.<br /><em className="not-italic" style={{ color: activeFilm.color }}>Our Stage.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">We believe every singular film deserves an audience. Tell us about yours.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 font-black text-sm tracking-[0.2em] uppercase text-white" style={{ background: activeFilm.color }}>
              Submit Your Film <ArrowRight size={16} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-30 tracking-wider uppercase">
        <span>Lumière Films © 2026</span>
        <div className="flex gap-8">{["Instagram", "Letterboxd", "Vimeo", "Press"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Trailer Modal */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6" onClick={() => setTrailerOpen(false)}>
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()} className="w-full max-w-3xl bg-black aspect-video flex items-center justify-center relative border border-white/10">
              <button onClick={() => setTrailerOpen(false)} className="absolute top-4 right-4"><X size={20} /></button>
              <Play size={64} className="opacity-20" />
              <p className="absolute bottom-4 text-xs opacity-30 tracking-widest">TRAILER · {activeFilm.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6" onClick={() => setGalleryOpen(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl" style={{ aspectRatio: "16/9" }}>
              <Image src={GALLERY[galleryOpen]} alt="still" fill unoptimized className="object-contain" />
              <button onClick={() => setGalleryOpen(null)} className="absolute top-0 right-0 -mt-10 opacity-60 hover:opacity-100"><X size={20} /></button>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 -mb-8">
                {GALLERY.map((_, i) => (
                  <button key={i} onClick={e => { e.stopPropagation(); setGalleryOpen(i); }} className="w-4 h-1 transition-all" style={{ background: i === galleryOpen ? "white" : "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
