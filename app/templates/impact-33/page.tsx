"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Music, Headphones, Radio, Play, Pause, ChevronRight, Volume2 } from "lucide-react";
import "../premium.css";

const RELEASES = [
  { id: 1, title: "ABSENCE", type: "Album", year: "2026", tracks: 10, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop", color: "#ff4060", genre: "Electronic / Ambient" },
  { id: 2, title: "DRIFT EP", type: "EP", year: "2025", tracks: 5, img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop", color: "#40c4ff", genre: "Techno / Experimental" },
  { id: 3, title: "NOCTURNE III", type: "Single", year: "2025", tracks: 1, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop", color: "#b040ff", genre: "Dark Ambient" },
  { id: 4, title: "SIGNAL LOSS", type: "Album", year: "2024", tracks: 12, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop", color: "#40ffb0", genre: "Noise / Industrial" },
];

const TRACKS = [
  { title: "Phantom Carrier", duration: "6:42", bpm: 128 },
  { title: "Depth Charge", duration: "8:14", bpm: 140 },
  { title: "Zero Echo", duration: "5:28", bpm: 0 },
  { title: "Thermal Drift", duration: "7:03", bpm: 134 },
  { title: "Absence I", duration: "4:55", bpm: 122 },
];

const SHOWS = [
  { venue: "Berghain", city: "Berlin", date: "15 March 2026", type: "Live A/V" },
  { venue: "Tresor", city: "Berlin", date: "22 March 2026", type: "DJ Set" },
  { venue: "Fabric", city: "London", date: "4 April 2026", type: "Live" },
  { venue: "Rex Club", city: "Paris", date: "18 April 2026", type: "Live A/V" },
  { venue: "De School", city: "Amsterdam", date: "2 May 2026", type: "DJ Set" },
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

export default function ParticleWaveFX() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const [activeRelease, setActiveRelease] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.12]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Animated waveform bars
  const [bars] = useState(() => Array.from({ length: 40 }, () => Math.random() * 60 + 20));
  const release = RELEASES[activeRelease];

  return (
    <div className="premium-theme bg-[#08060e] text-white min-h-screen overflow-x-hidden font-mono">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#08060e]/90 backdrop-blur-xl border-b border-white/5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: release.color }}>VOID_SIGNAL</motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Music", "Shows", "About", "Contact"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest border border-white/15 px-4 py-2 hover:bg-white/5 transition-all">Bandcamp</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#08060e] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/40"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase">
              {["Music", "Shows", "About", "Contact"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop" alt="Music" fill className="object-cover opacity-25" unoptimized />
        </motion.div>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 40%, ${release.color}15 0%, transparent 60%)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08060e]/40 to-[#08060e]" />
        {/* Animated waveform */}
        <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end gap-0.5 px-8 opacity-20">
          {bars.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t-sm" style={{ background: release.color }} animate={{ height: [h, h * (0.4 + Math.random() * 0.6), h] }} transition={{ duration: 0.8 + Math.random() * 0.8, repeat: Infinity, repeatType: "reverse" }} />
          ))}
        </div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-20">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[10px] uppercase tracking-[0.5em] mb-6" style={{ color: release.color + "90" }}>Electronic Music · Live A/V — Berlin Based</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="text-7xl md:text-[9vw] font-black uppercase leading-none tracking-tighter mb-6">
            VOID<br />
            <span style={{ color: release.color }}>SIGNAL</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-white/40 text-sm max-w-md mb-8 leading-relaxed">
            Electronic music, live audio-visual performances, and sound design from the periphery.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-4">
            <a href="#music" className="border px-8 py-3 text-[10px] uppercase tracking-widest hover:text-black transition-all flex items-center gap-2" style={{ borderColor: release.color, color: release.color, background: "transparent" }} onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = release.color; (e.currentTarget as HTMLAnchorElement).style.color = "black"; }} onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = release.color; }}>
              Listen Now <Headphones size={12} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* LATEST RELEASE */}
      <section id="music" className="px-8 md:px-16 py-24">
        <Reveal className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Discography</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Releases</h2>
        </Reveal>
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {RELEASES.map((r, i) => (
            <button key={r.id} onClick={() => setActiveRelease(i)} className={`text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${activeRelease === i ? "border-opacity-100" : "border-white/10 text-white/30 hover:text-white"}`} style={activeRelease === i ? { borderColor: r.color, color: r.color } : {}}>
              {r.type}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeRelease} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative" style={{ height: "55vh" }}>
              <Image src={release.img} alt={release.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08060e]/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: release.color }}>{release.genre}</p>
                <h3 className="font-black text-4xl uppercase tracking-tight">{release.title}</h3>
              </div>
            </div>
            <div className="flex flex-col justify-between py-4">
              <div>
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-white/30 mb-8">
                  <span>{release.type}</span><span>·</span><span>{release.year}</span><span>·</span><span>{release.tracks} Tracks</span>
                </div>
                {/* Tracklist */}
                <div className="divide-y divide-white/5">
                  {TRACKS.map((t, i) => (
                    <div key={t.title} className="flex items-center gap-4 py-4 group cursor-pointer" onClick={() => setPlaying(playing === i ? null : i)}>
                      <div className="w-6 text-center">
                        {playing === i ? <Pause size={12} style={{ color: release.color }} /> : <span className="text-[10px] text-white/20 group-hover:hidden">{String(i + 1).padStart(2, "0")}</span>}
                        <Play size={12} className="hidden group-hover:block text-white/50" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-black uppercase tracking-tight ${playing === i ? "" : "text-white/80"}`} style={playing === i ? { color: release.color } : {}}>
                          {t.title}
                        </p>
                        {t.bpm > 0 && <p className="text-[8px] text-white/20 mt-0.5">{t.bpm} BPM</p>}
                      </div>
                      <span className="text-[10px] text-white/25">{t.duration}</span>
                      {playing === i && (
                        <div className="flex gap-0.5 items-end h-4">
                          {[1, 2, 3, 4].map(b => (
                            <motion.div key={b} className="w-1 rounded-full" style={{ background: release.color }} animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.4 + b * 0.1, repeat: Infinity, repeatType: "reverse" }} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                {["Bandcamp", "Spotify", "Apple Music"].map(s => (
                  <a key={s} href="#" className="text-[9px] uppercase tracking-widest border border-white/10 px-4 py-2 hover:border-white/30 transition-colors">{s}</a>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SHOWS */}
      <section className="bg-[#0c0a14] px-8 md:px-16 py-24 border-y border-white/5">
        <Reveal className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Live</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">Upcoming<br />Shows</h2>
        </Reveal>
        <div className="divide-y divide-white/5">
          {SHOWS.map((s, i) => (
            <Reveal key={i} delay={i * 0.06} className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div className="flex items-center gap-6">
                <span className="text-[10px] text-white/20 w-5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-black text-lg uppercase tracking-tight group-hover:text-white transition-colors">{s.venue}</p>
                  <p className="text-[9px] text-white/30 mt-0.5">{s.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 ml-11 md:ml-0">
                <span className="text-[9px] uppercase tracking-widest border border-white/10 px-3 py-1" style={{ color: release.color, borderColor: release.color + "30" }}>{s.type}</span>
                <span className="text-sm text-white/40">{s.date}</span>
                <a href="#" className="text-[9px] uppercase tracking-widest text-white/25 hover:text-white transition-colors flex items-center gap-1">
                  Tickets <ChevronRight size={10} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-24 flex flex-col items-center text-center">
        <Reveal>
          <Music size={20} className="text-white/20 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10">
            Book VOID_SIGNAL<br />
            <span style={{ color: release.color }}>For Your Event.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="mailto:booking@voidsignal.com" className="border px-10 py-4 text-[11px] uppercase tracking-widest font-black transition-all flex items-center gap-2" style={{ borderColor: release.color, color: release.color }}>
            Booking Inquiries <ArrowRight size={13} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-8 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-black text-sm uppercase tracking-[0.3em]" style={{ color: release.color }}>VOID_SIGNAL</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/25">
          {["Bandcamp", "SoundCloud", "Resident Advisor", "Booking"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/15 uppercase">© 2026</p>
      </footer>
    </div>
  );
}
