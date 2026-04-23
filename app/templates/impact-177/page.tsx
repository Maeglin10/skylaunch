"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, FastForward, Rewind, Volume2, Headphones, Radio, Mic2 } from "lucide-react";
import "../premium.css";

const EPISODES = [
  { ep: "042", title: "Building in Public with Sarah Drasner", date: "Oct 12, 2026", dur: "45:20" },
  { ep: "041", title: "The Future of React & Server Components", date: "Oct 05, 2026", dur: "52:14" },
  { ep: "040", title: "Design Systems at Enterprise Scale", date: "Sep 28, 2026", dur: "38:45" },
  { ep: "039", title: "Mental Health for Indie Hackers", date: "Sep 21, 2026", dur: "60:02" }
];

export default function PremiumPodcast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEp, setActiveEp] = useState<number | null>(null);

  // Fake soundwave heights
  const [wave, setWave] = useState(Array(30).fill(10));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWave(prev => prev.map(() => 5 + Math.random() * 25));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#030014] text-[#E2D5F8] min-h-screen font-sans selection:bg-[#7C3AED] selection:text-white pb-32">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
               <Mic2 className="w-5 h-5" />
            </div>
            <div className="font-black text-2xl uppercase tracking-tighter italic text-white">AudioWaves</div>
         </div>
         
         <nav className="hidden md:flex gap-12 text-[10px] uppercase font-black tracking-[0.3em] text-white/50">
            <Link href="#" className="hover:text-white transition-colors">All Episodes</Link>
            <Link href="#" className="hover:text-white transition-colors">Hosts</Link>
            <Link href="#" className="hover:text-white transition-colors">Sponsors</Link>
         </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 min-h-[90vh]">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED] rounded-full blur-[150px] opacity-20 pointer-events-none" />

         <motion.div style={{ scale: heroScale }} className="flex-1 w-full max-w-lg mx-auto relative group z-10">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.3)] border border-white/10">
               <Image src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200" alt="Podcast Cover" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
               <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-50" />
            </div>
            
            {/* Floating Live Badge */}
            <motion.div 
               animate={{ y: [0, -10, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-6 -right-6 bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl"
            >
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> New Episode
            </motion.div>
         </motion.div>
         
         <motion.div style={{ opacity: heroOpacity }} className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#A78BFA] text-[10px] font-black uppercase tracking-widest mb-8">
               <Radio className="w-4 h-4" /> Tech & Culture
            </div>
            
            <h1 className="text-6xl md:text-[6vw] font-black tracking-tighter leading-[0.9] text-white mb-8 uppercase drop-shadow-2xl">
               Deep <br/> Conversations.
            </h1>
            
            <p className="text-xl font-light text-white/60 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
               Join us every week as we deconstruct the habits, routines, and workflows of world-class engineers.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
               <button 
                  onClick={() => { setIsPlaying(!isPlaying); setActiveEp(0); }}
                  className="bg-[#7C3AED] text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(124,58,237,0.4)]"
               >
                  {isPlaying && activeEp === 0 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  Listen to Latest
               </button>
               <button className="bg-transparent border border-white/20 text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Subscribe
               </button>
            </div>
         </motion.div>
      </section>

      {/* EPISODES LIST */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative z-20">
         <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Recent Episodes</h2>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
               <Headphones className="w-4 h-4" /> 100k+ Listeners
            </div>
         </div>
         
         <div className="space-y-4">
            {EPISODES.map((ep, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => {
                     if (activeEp === i) {
                        setIsPlaying(!isPlaying);
                     } else {
                        setActiveEp(i);
                        setIsPlaying(true);
                     }
                  }}
                  className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-300 cursor-pointer group flex flex-col md:flex-row items-start md:items-center gap-6 ${activeEp === i ? 'bg-[#7C3AED]/20 border-[#7C3AED]/50' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
               >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeEp === i ? 'bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'}`}>
                     {activeEp === i && isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                  </div>
                  
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] bg-[#7C3AED]/20 px-3 py-1 rounded-full">EP {ep.ep}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{ep.date}</span>
                     </div>
                     <h3 className={`text-2xl font-black tracking-tight transition-colors ${activeEp === i ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{ep.title}</h3>
                  </div>
                  
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30 hidden md:block">{ep.dur}</div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* STICKY AUDIO PLAYER */}
      <motion.div 
         initial={{ y: "100%" }}
         animate={{ y: activeEp !== null ? "0%" : "100%" }}
         transition={{ type: "spring", damping: 25, stiffness: 200 }}
         className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[800px] z-50 bg-[#1A1525]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4"
      >
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#7C3AED] shrink-0 overflow-hidden relative">
               <Image src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200" alt="Thumbnail" fill className="object-cover" />
            </div>
            
            <div className="flex-1 overflow-hidden">
               <div className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] mb-1">Now Playing</div>
               <div className="text-white font-bold truncate">{activeEp !== null ? EPISODES[activeEp].title : ""}</div>
            </div>

            <div className="flex items-center gap-4">
               <button className="text-white/50 hover:text-white transition-colors hidden md:block"><Rewind className="w-5 h-5 fill-current" /></button>
               <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
               >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
               </button>
               <button className="text-white/50 hover:text-white transition-colors hidden md:block"><FastForward className="w-5 h-5 fill-current" /></button>
            </div>
         </div>

         {/* Visualizer */}
         <div className="w-full h-8 flex items-end justify-center gap-[2px] md:gap-1">
            {wave.map((h, i) => (
               <div key={i} className="w-1 md:w-2 bg-[#7C3AED] rounded-t-sm transition-all duration-100 ease-out" style={{ height: isPlaying ? `${h}px` : '4px', opacity: isPlaying ? 0.8 : 0.2 }} />
            ))}
         </div>
      </motion.div>

    </div>
  );
}
