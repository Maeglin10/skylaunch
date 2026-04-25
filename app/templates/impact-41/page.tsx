"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, Pause, X, ChevronDown, Radio, Zap, Eye, Heart, MessageSquare, Share2, Users, TrendingUp } from "lucide-react";

const STREAMS = [
  { id: 1, title: "NEON RITUAL", host: "DJ VEGA", genre: "Electronic / Techno", viewers: 14820, status: "LIVE", thumbnail: "https://images.unsplash.com/photo-1571266028243-d220c6a8e91b?w=800&q=80", color: "#f43f5e" },
  { id: 2, title: "BASSLINE THEORY", host: "KOVA", genre: "DnB / Jungle", viewers: 9340, status: "LIVE", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", color: "#8b5cf6" },
  { id: 3, title: "SOLAR DRIFT", host: "MIRAGE", genre: "Ambient / Downtempo", viewers: 5110, status: "LIVE", thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80", color: "#0ea5e9" },
  { id: 4, title: "VOLTAGE SURGE", host: "ELCID", genre: "Industrial / EBM", viewers: 3720, status: "LIVE", thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", color: "#f59e0b" },
  { id: 5, title: "FREQUENCY WARS", host: "PSYK", genre: "Hard Techno", viewers: 2890, status: "SCHEDULED", thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80", color: "#10b981" },
  { id: 6, title: "DEEP SIGNAL", host: "ANNA", genre: "Melodic Techno", viewers: 0, status: "REPLAY", thumbnail: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=800&q=80", color: "#e879f9" },
];

const LINEUP = [
  { time: "20:00", artist: "OPAQUE", genre: "Minimal / Deep" },
  { time: "21:30", artist: "DJ VEGA", genre: "Electronic / Techno", active: true },
  { time: "23:00", artist: "KOVA", genre: "DnB / Jungle" },
  { time: "00:30", artist: "MIRAGE", genre: "Ambient" },
  { time: "02:00", artist: "ELCID", genre: "Industrial" },
];

const STATS_DATA = [
  { label: "Total Viewers", value: 36000, suffix: "+" },
  { label: "Artists Broadcast", value: 1200, suffix: "+" },
  { label: "Hours Streamed", value: 48000, suffix: "+" },
  { label: "Countries", value: 94, suffix: "" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
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
    let n = 0; const step = Math.ceil(target / 60);
    const t = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(t); } else setCount(n); }, 24);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count >= 1000 ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "k" : count}{suffix}</span>;
}

function WaveBar({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.2, 1, 0.4] }}
      transition={{ duration: 1.4, delay, repeat: Infinity, ease: "easeInOut" }}
      className="w-1 rounded-full origin-bottom"
      style={{ height: 28, background: color }}
    />
  );
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.a ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); }}
      onMouseLeave={() => { x.set(0); y.set(0); }} href="#" className={className}>
      {children}
    </motion.a>
  );
}

export default function DynamicLiveStream() {
  const [activeStream, setActiveStream] = useState(STREAMS[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState(2841);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Live viewer count fluctuation
  const [liveViewers, setLiveViewers] = useState(activeStream.viewers);
  useEffect(() => {
    const t = setInterval(() => setLiveViewers(v => v + Math.floor(Math.random() * 40 - 15)), 2000);
    return () => clearInterval(t);
  }, [activeStream]);

  useEffect(() => {
    setLiveViewers(activeStream.viewers);
  }, [activeStream]);

  const faqs = [
    { q: "How do I stream on FLUX?", a: "Apply via our Artist Portal. We review applications weekly and onboard artists based on genre fit and audience reach." },
    { q: "Is there a viewer fee?", a: "Free tier includes all live streams. FLUX Pro unlocks HD quality, VOD archive, and ad-free viewing for €9/month." },
    { q: "Can I archive my streams?", a: "Pro artists get 90-day VOD storage. All streams are clippable and shareable in real-time." },
    { q: "What regions are supported?", a: "Global CDN coverage across 94 countries with sub-100ms latency on all live streams." },
  ];

  return (
    <div className="min-h-screen bg-[#06070f] text-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#06070f]/80 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#f43f5e] rounded-sm flex items-center justify-center">
            <Radio size={14} className="text-white" />
          </div>
          <span className="text-base font-black tracking-[0.12em] uppercase">FLUX</span>
          <span className="hidden md:flex items-center gap-1 text-[10px] bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30 px-2 py-0.5 rounded-sm font-bold tracking-wider">
            <span className="w-1.5 h-1.5 bg-[#f43f5e] rounded-full animate-pulse" /> LIVE
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-xs tracking-[0.15em] uppercase opacity-60">
          {["Live Now", "Schedule", "Artists", "Archive", "Pro"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <MagneticBtn className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#f43f5e] text-white text-xs font-black tracking-widest uppercase rounded-sm">
            <Zap size={12} /> Go Pro
          </MagneticBtn>
          <button onClick={() => setMobileOpen(true)} className="md:hidden flex flex-col gap-1.5">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-white" />)}</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#06070f] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Live Now", "Schedule", "Artists", "Archive", "Pro"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:text-[#f43f5e] transition-colors" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero — Main Stream */}
      <section ref={containerRef} className="relative h-screen flex flex-col justify-end overflow-hidden pt-20">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src={activeStream.thumbnail} alt={activeStream.title} fill unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070f] via-[#06070f]/50 to-transparent" />
        </motion.div>

        {/* Live badge + controls */}
        <div className="relative z-10 px-6 md:px-12 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 bg-[#f43f5e] text-white text-[10px] font-black px-3 py-1.5 tracking-widest uppercase rounded-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> {activeStream.status}
            </span>
            <span className="text-xs opacity-50 flex items-center gap-1.5"><Eye size={12} /> {liveViewers.toLocaleString()} watching</span>
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tight" style={{ color: activeStream.color }}>{activeStream.title}</h1>
              <p className="text-sm opacity-60 mt-2">{activeStream.host} · {activeStream.genre}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Waveform */}
              <div className="flex items-end gap-1">
                {[0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.08].map((d, i) => (
                  <WaveBar key={i} color={isPlaying ? activeStream.color : "rgba(255,255,255,0.2)"} delay={d} />
                ))}
              </div>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-full flex items-center justify-center border-2 hover:scale-110 transition-transform" style={{ borderColor: activeStream.color }}>
                {isPlaying ? <Pause size={18} style={{ color: activeStream.color }} /> : <Play size={18} style={{ color: activeStream.color }} />}
              </button>
              <button onClick={() => setLikeCount(n => n + 1)} className="flex items-center gap-2 text-xs opacity-60 hover:opacity-100 transition-opacity">
                <Heart size={16} /> {likeCount.toLocaleString()}
              </button>
              <button className="text-xs opacity-60 hover:opacity-100 transition-opacity"><Share2 size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Stream grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-wide uppercase">Live & Upcoming</h2>
          <a href="#" className="text-xs opacity-50 hover:opacity-100 tracking-widest uppercase flex items-center gap-1">View All <ArrowRight size={12} /></a>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {STREAMS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setActiveStream(s)} className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: "16/9" }}>
                <Image src={s.thumbnail} alt={s.title} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  {s.status === "LIVE" ? (
                    <span className="flex items-center gap-1 bg-[#f43f5e] text-white text-[9px] font-black px-2 py-1 tracking-widest">
                      <span className="w-1 h-1 bg-white rounded-full animate-pulse" /> LIVE
                    </span>
                  ) : s.status === "SCHEDULED" ? (
                    <span className="bg-[#0ea5e9]/80 text-white text-[9px] font-black px-2 py-1 tracking-widest">UPCOMING</span>
                  ) : (
                    <span className="bg-white/20 text-white text-[9px] font-black px-2 py-1 tracking-widest">REPLAY</span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-sm font-black" style={{ color: s.color }}>{s.title}</div>
                  <div className="text-xs opacity-50 mt-0.5 flex items-center justify-between">
                    <span>{s.host}</span>
                    {s.viewers > 0 && <span className="flex items-center gap-1"><Eye size={10} /> {s.viewers.toLocaleString()}</span>}
                  </div>
                </div>
                <div className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: s.color }} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live Lineup */}
      <section className="py-20 bg-[#0a0b14] px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-wide uppercase mb-12">Tonight's Lineup</h2></Reveal>
          {LINEUP.map((set, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div whileHover={{ x: 6 }} className={`flex items-center gap-6 py-5 border-b border-white/10 ${set.active ? "opacity-100" : "opacity-50"}`}>
                <span className="text-xs font-mono opacity-40 w-12 shrink-0">{set.time}</span>
                {set.active && (
                  <div className="flex items-end gap-0.5 shrink-0">
                    {[0, 0.1, 0.2].map((d, j) => (
                      <motion.div key={j} animate={{ scaleY: [0.4, 1, 0.3, 0.8, 0.5] }} transition={{ duration: 1.2, delay: d, repeat: Infinity }} className="w-1 rounded-full origin-bottom bg-[#f43f5e]" style={{ height: 14 }} />
                    ))}
                  </div>
                )}
                <div className="flex-1">
                  <div className={`text-sm font-black uppercase tracking-wider ${set.active ? "text-[#f43f5e]" : ""}`}>{set.artist}</div>
                  <div className="text-xs opacity-40 mt-0.5">{set.genre}</div>
                </div>
                {set.active && <span className="text-[10px] bg-[#f43f5e] text-white px-2 py-1 font-black tracking-widest">ON AIR</span>}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-white/5 border-b border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS_DATA.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2 text-[#f43f5e]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[10px] tracking-[0.2em] uppercase opacity-40">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal><h2 className="text-3xl font-black tracking-wide uppercase mb-16 text-center">Why FLUX</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Sub-100ms Latency", desc: "Global CDN ensures your audience is always in sync. No buffering, no delays — pure live experience.", color: "#f43f5e" },
            { icon: Users, title: "Artist-First Revenue", desc: "70/30 split on subscriptions. Direct tips. Merchandise integration. You keep what you earn.", color: "#8b5cf6" },
            { icon: TrendingUp, title: "Real-Time Analytics", desc: "Live viewer graphs, heatmaps, audience demographics. Know your crowd as it grows.", color: "#0ea5e9" },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }} className="p-8 border border-white/10 hover:border-white/20 transition-colors bg-[#0a0b14]">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ background: f.color + "22" }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-black mb-3">{f.title}</h3>
                <p className="text-sm opacity-50 leading-relaxed">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0a0b14] px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-wide uppercase mb-12">FAQ</h2></Reveal>
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
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.08, 0.03] }} transition={{ duration: 8, repeat: Infinity }} className="absolute inset-0 rounded-full m-auto w-[600px] h-[600px] bg-[#f43f5e] blur-3xl" />
        <div className="relative z-10">
          <Reveal><h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 uppercase leading-none">BROADCAST<br /><span className="text-[#f43f5e]">YOUR SIGNAL</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-sm opacity-50 mb-10 max-w-md mx-auto">Join 1,200+ artists streaming live to a global underground audience. Apply today.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#f43f5e] text-white font-black text-xs tracking-[0.2em] uppercase">
              Apply As Artist <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs opacity-30 tracking-wider">
        <span className="font-black">FLUX LIVE</span>
        <div className="flex gap-8">{["Twitter", "Instagram", "Discord", "Twitch"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
        <span>© 2026 FLUX MEDIA</span>
      </footer>
    </div>
  );
}
