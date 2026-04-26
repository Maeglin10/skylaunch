"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Watch, Timer, Shield, Activity, Menu, Search, ArrowRight, Layers, Box } from "lucide-react";
import "../premium.css";

const WATCHES = [
  { id: 1, title: "VERTEX_ZERO", cat: "Technical", value: "Verified", img: "https://images.unsplash.com/photo-1547996160-81dfa63595ee?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "VOID_CALIBER", cat: "Skeleton", value: "Active", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "NEON_HORIZON", cat: "Titanium", value: "Locked", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1500" },
];

function TextScramble({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

export default function ChronosHorologySPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#0A0A0A] text-amber-500 min-h-screen font-sans selection:bg-amber-600 selection:text-white overflow-hidden relative uppercase">
      
      {/* AMBER GLOW & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_100%)] opacity-80" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-amber-600 opacity-[0.03] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-soft-light" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 bg-[#0A0A0A]/50 backdrop-blur-xl border-b border-amber-500/10">
        <Link href="/" className="font-black text-2xl tracking-[0.25em] text-white flex items-center gap-4 italic uppercase text-center md:text-left">
           <Timer className="w-8 h-8 text-amber-500 text-center md:text-left" />
           CHRONOS<span className="text-amber-500">_OS</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.5em] text-white/30 text-center">
            <Link href="#" className="hover:text-amber-500 transition-colors group">
               Collection<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-amber-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-amber-500 transition-colors group">
               Calibres<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-amber-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-amber-500 transition-colors group">
               Heritage<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-amber-500 italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-8">
           <button className="bg-amber-600 text-white px-10 py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl">
              Reserve_Now
           </button>
           <Menu className="w-6 h-6 text-amber-500 cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden text-center">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=2500" alt="Horology" fill className="object-cover opacity-30 grayscale contrast-125 text-center" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
         </motion.div>
         
         <div className="relative z-10 max-w-6xl w-full text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.8em] text-amber-500/60 mb-12 border-l-2 border-amber-600 pl-8 italic font-mono text-center">
                  Mechanical_Handshake // Verified
               </div>
               
               <h1 className="text-7xl md:text-[11vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-16 text-white drop-shadow-2xl text-center">
                  <TextScramble text="PRECISION." /><br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(217,119,6,0.6)" }}>ENGINEERED.</span>
               </h1>
               
               <p className="text-xl md:text-2xl font-light text-white/40 max-w-2xl mx-auto mb-20 leading-relaxed uppercase tracking-[0.3em] italic text-center">
                  Haute horlogerie meets tectonic engineering. A singular pursuit of temporal perfection.
               </p>
               
               <div className="flex flex-col md:flex-row gap-12 justify-center items-center font-mono text-center">
                  <div className="flex items-center gap-4 group cursor-pointer text-center">
                     <div className="w-16 h-px bg-amber-600/30 group-hover:w-24 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">Explore_Calibres</span>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.5em] text-white/10 italic text-center">
                     Established_1887 // Geneva
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Time HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[0.5em] text-amber-500/20 hidden md:flex italic font-mono text-center">
            <span>TIME_SYNC: ACTIVE</span>
            <div className="flex gap-1 h-8 items-end">
               {[1, 2, 3, 4, 5, 6].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-amber-500" />)}
            </div>
         </div>
         
         <div className="absolute left-12 bottom-12 hidden md:block text-center">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-white/10 italic font-mono text-center">
               <span>BPM: 28,800</span>
               <span>ERROR: 0.00MS</span>
               <span>STATUS: OSCILLATING</span>
            </div>
         </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="py-40 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#0A0A0A]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-amber-500/10 pb-16 gap-12 text-center md:text-left">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[1em] text-amber-600 mb-6 block italic font-mono text-center md:text-left">Current_Manifest</span>
               <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none text-center md:text-left">The <span className="text-amber-500">Vertex_</span></h2>
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic font-mono text-center md:text-left">
               <span>Filtered: [Mechanical]</span>
               <span>Available: [03]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center">
            {WATCHES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 60 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[80vh] bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer hover:border-amber-500/30 transition-all text-center shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 text-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90 text-center" />
                    
                    <div className="absolute inset-12 flex flex-col justify-between z-10 font-mono text-white text-center">
                        <div className="flex justify-between items-start text-center">
                           <div className="p-4 bg-white/5 border border-white/10 rounded-none group-hover:bg-amber-600 group-hover:text-black transition-all text-center">
                              <Watch className="w-6 h-6 text-center" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic font-mono text-center">Calibre_0x{i+151}</div>
                        </div>
                        
                        <div className="text-center">
                           <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500 mb-6 block italic font-black text-center">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-12 text-white group-hover:text-amber-500 transition-colors leading-none text-center">{p.title}</h3>
                           <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 text-white text-center justify-center">
                              Specifications <ArrowRight className="w-5 h-5 text-center" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-40 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#0A0A0A]">
         <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-between gap-32 text-center md:text-left">
            <div className="max-w-2xl text-center md:text-left">
               <div className="text-amber-500 mb-12 flex items-center gap-4 font-black text-2xl italic uppercase tracking-widest font-mono justify-center md:justify-start">
                  <Activity className="w-8 h-8 text-center md:text-left" /> Archive_0x151
               </div>
               <p className="text-3xl md:text-5xl font-light italic leading-tight text-white/30 uppercase tracking-tighter mb-16 text-center md:text-left">
                  WE TREAT WATCHMAKING AS ARCHITECTURE. EVERY GEAR IS A FUNCTION.
               </p>
               <div className="flex gap-16 font-black text-[10px] uppercase tracking-[0.5em] text-amber-500/40 italic font-mono justify-center md:justify-start">
                  <span>Geneva</span>
                  <span>London</span>
                  <span>Tokyo</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono text-center md:text-right text-amber-500">
               <div className="w-full text-center md:text-right">
                  <h4 className="text-[10vw] font-black italic uppercase tracking-tighter text-white opacity-[0.03] leading-none mb-12 text-center md:text-right">CHRONOS</h4>
                  <nav className="flex flex-col gap-6 font-black text-[10px] uppercase tracking-[0.6em] text-white/20 text-center md:text-right">
                     <Link href="#" className="hover:text-amber-500 transition-colors group">Instagram</Link>
                     <Link href="#" className="hover:text-amber-500 transition-colors group">Journal</Link>
                     <Link href="#" className="hover:text-amber-500 transition-colors group">Concierge</Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1em] text-white/5 mt-24 text-center md:text-right">
                  &copy; 2026 // CHRONOS_OS&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
