"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, X, Menu, ArrowRight, ChevronDown, Film, Award, Star, Clock } from "lucide-react";
import "../premium.css";

const FILMS = [
  { id: 1, title: "NEON REQUIEM", year: "2025", genre: "Thriller", duration: "112 min", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop", awards: "Cannes 2025 — Grand Prix", desc: "A night in the life of a jazz musician who witnesses an impossible crime in the city's last authentic district." },
  { id: 2, title: "THE LONG DARK", year: "2024", genre: "Drama", duration: "97 min", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1000&auto=format&fit=crop", awards: "Berlin — Silver Bear", desc: "A lighthouse keeper's winter isolation breaks open into something far stranger than solitude." },
  { id: 3, title: "CHROME ANGEL", year: "2024", genre: "Noir", duration: "106 min", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop", awards: "Venice — Special Jury Prize", desc: "Faded stardom, a forged painting, and a detective who asks the wrong questions." },
  { id: 4, title: "ZERO FREQUENCY", year: "2023", genre: "Sci-Fi Noir", duration: "121 min", img: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1000&auto=format&fit=crop", awards: "Toronto — Platform Prize", desc: "A radio engineer intercepts a signal from a city that was demolished 30 years ago." },
];

const CREDITS = [
  { role: "Director", name: "Élodie Voss" },
  { role: "Cinematographer", name: "Matteo Alari" },
  { role: "Production Design", name: "Sun Li" },
  { role: "Composer", name: "Jakob Nors" },
  { role: "Sound Design", name: "Petra Halm" },
  { role: "Editor", name: "Caleb Asante" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function FilmNoirStory() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilm, setActiveFilm] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 220]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.12]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const film = FILMS[activeFilm];

  return (
    <div className="premium-theme bg-[#080608] text-white min-h-screen overflow-x-hidden" ref={containerRef}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-gradient-to-b from-black/80 to-transparent">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.35em]">VOSS FILMS</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Work", "About", "Press", "Contact"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#080608] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-5xl font-black uppercase italic">
              {["Work", "About", "Press", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRAILER MODAL */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center" onClick={() => setShowTrailer(false)}>
            <div className="w-full max-w-4xl aspect-video bg-[#111] flex items-center justify-center relative">
              <p className="text-white/20 text-sm uppercase tracking-widest">[ Trailer — {film.title} ]</p>
              <button className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO — Full screen film feature */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilm} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
              <Image src={film.img} alt={film.title} fill className="object-cover opacity-70" unoptimized />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080608] via-[#080608]/30 to-[#080608]/60" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pb-24 w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              {film.awards && (
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-yellow-400/80 mb-4">
                  <Award size={10} /> {film.awards}
                </div>
              )}
              <h1 className="text-7xl md:text-[8vw] font-black uppercase leading-none tracking-tighter mb-4 italic">{film.title}</h1>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40 mb-4">
                <span>{film.year}</span>
                <span>·</span>
                <span>{film.genre}</span>
                <span>·</span>
                <Clock size={10} />
                <span>{film.duration}</span>
              </div>
              <p className="text-white/50 max-w-md text-sm leading-relaxed">{film.desc}</p>
            </div>
            <button onClick={() => setShowTrailer(true)} className="group flex items-center gap-4 border border-white/20 px-8 py-4 hover:border-white/60 transition-all shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors"><Play size={14} className="ml-0.5" /></div>
              <span className="text-[10px] uppercase tracking-widest">Watch Trailer</span>
            </button>
          </motion.div>
        </motion.div>
        {/* Film selector dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {FILMS.map((_, i) => (
            <button key={i} onClick={() => setActiveFilm(i)} className={`w-1 rounded-full transition-all ${i === activeFilm ? "h-8 bg-white" : "h-3 bg-white/25"}`} />
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown size={16} className="text-white/30" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-[#0f0d0f] border-y border-white/5 py-4">
        <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(18).fill(null).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-white/15 italic shrink-0">Cannes · Berlin · Venice · Toronto · Sundance · TIFF · Locarno ·</span>
          ))}
        </motion.div>
      </div>

      {/* FILMOGRAPHY */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Complete Work</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter italic">Filmography</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FILMS.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.1}>
              <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: "55vh" }} onClick={() => setActiveFilm(i)} whileHover={{ scale: 1.01 }}>
                <Image src={f.img} alt={f.title} fill className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080608]/90 via-transparent to-transparent" />
                {activeFilm === i && <div className="absolute inset-0 ring-2 ring-white/30 ring-inset" />}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {f.awards && (
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-yellow-400/70 mb-2">
                      <Award size={9} /> {f.awards}
                    </div>
                  )}
                  <h3 className="font-black text-3xl uppercase tracking-tight italic mb-2">{f.title}</h3>
                  <div className="flex gap-3 text-[10px] uppercase tracking-widest text-white/40">
                    <span>{f.year}</span>
                    <span>·</span>
                    <span>{f.genre}</span>
                    <span>·</span>
                    <span>{f.duration}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-full">
                    <Play size={10} />
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CREDITS */}
      <section className="bg-[#0f0d0f] px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">The Team</p>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tighter italic">Credits</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
          {CREDITS.map((c, i) => (
            <Reveal key={c.role} delay={i * 0.06} className="bg-[#0f0d0f] p-6">
              <p className="text-[9px] uppercase tracking-widest text-white/25 mb-2">{c.role}</p>
              <p className="font-black text-sm uppercase tracking-tight">{c.name}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRESS QUOTE */}
      <section className="px-8 md:px-16 py-28 flex flex-col items-center text-center">
        <Reveal>
          <Film size={24} className="text-white/20 mb-8 mx-auto" />
          <blockquote className="text-3xl md:text-4xl font-light italic leading-relaxed text-white/60 max-w-3xl">
            "Voss has created something that belongs to no movement and no period. It is simply, irresistibly, cinema."
          </blockquote>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/25 mt-6">— Cahiers du Cinéma, 2025</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-[#0f0d0f] px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-white/5">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/25 mb-4">Press & Distribution</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tighter italic">
            Screen<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Our Work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="border border-white/20 text-white px-10 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-white hover:text-[#080608] transition-all flex items-center gap-2">
            Contact for Rights <ArrowRight size={13} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5">
        <p className="font-black text-sm uppercase tracking-[0.3em] italic">VOSS FILMS™</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/25">
          {["Letterboxd", "IMDB", "Festival Press", "Distribution"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/15 uppercase">© 2026 Voss Films</p>
      </footer>
    </div>
  );
}
