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
    <div ref={containerRef} className="premium-theme bg-[#0A0A0A] text-amber-500 min-h-screen font-sans selection:bg-amber-600 selection:text-white overflow-hidden relative">
      
      {/* AMBER GLOW & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_100%)] opacity-80" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-amber-600 opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-soft-light" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 bg-[#0A0A0A]/50 backdrop-blur-xl border-b border-amber-500/10">
        <Link href="/" className="font-black text-2xl tracking-[0.25em] text-white flex items-center gap-4 italic uppercase">
           <Timer className="w-8 h-8 text-amber-500" />
           CHRONOS<span className="text-amber-500">_OS</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.5em] text-white/30">
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
           <div className="hidden md:flex flex-col items-end">
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-500/40 italic">Sync Status</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Nominal_v4</span>
           </div>
           <button className="bg-amber-600 text-white px-10 py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(217,119,6,0.2)]">
              Reserve_Now
           </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=2500" alt="Horology" fill className="object-cover opacity-30 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
         </motion.div>
         
         <div className="relative z-10 max-w-6xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.8em] text-amber-500/60 mb-12 border-l-2 border-amber-600 pl-8 italic">
                  Mechanical_Handshake // Verified
               </div>
               
               <h1 className="text-7xl md:text-[11vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-16 text-white drop-shadow-2xl">
                  PRECISION<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(217,119,6,0.6)" }}>ENGINEERED.</span>
               </h1>
               
               <p className="text-xl md:text-2xl font-light text-white/40 max-w-2xl mx-auto mb-20 leading-relaxed uppercase tracking-[0.3em] italic">
                  Haute horlogerie meets tectonic engineering. A singular pursuit of temporal perfection.
               </p>
               
               <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
                  <div className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-16 h-px bg-amber-600/30 group-hover:w-24 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">Explore_Calibres</span>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.5em] text-white/10 italic">
                     Established_1887 // Geneva
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative HUD Elements */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[0.5em] text-amber-500/20 hidden md:flex italic">
            <span>SYNC_LOAD: 0.003ms</span>
            <div className="flex gap-1 h-8 items-end">
               {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-[1px] bg-amber-500" style={{ height: `${Math.random() * 100}%` }} />)}
            </div>
         </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="py-40 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#0A0A0A]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-amber-500/10 pb-16 gap-12">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[1em] text-amber-600 mb-6 block italic">Current_Manifest</span>
               <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">The <span className="text-amber-500">Vertex_</span></h2>
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">
               <span>Filtered: [Mechanical]</span>
               <span>Available: [03]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {WATCHES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 60 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[80vh] bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer hover:border-amber-500/30 transition-all"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-amber-600/5 group-hover:bg-transparent transition-colors" />
                    
                    <div className="absolute inset-12 flex flex-col justify-between z-10 font-sans">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-white/5 border border-white/10 rounded-none group-hover:bg-amber-600 group-hover:text-black transition-all">
                              <Watch className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Calibre_0x{i+151}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500 mb-6 block italic font-black">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-12 text-white group-hover:text-amber-500 transition-colors leading-none">{p.title}</h3>
                           <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 text-white">
                              Specifications <ArrowRight className="w-5 h-5" />
                           </div>
                        </div>
                    </div>

                    {/* HUD Overlays */}
                    <div className="absolute top-1/2 left-0 w-8 h-px bg-amber-500/20" />
                    <div className="absolute top-1/2 right-0 w-8 h-px bg-amber-500/20" />
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-40 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#0A0A0A]">
         <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-between gap-32">
            <div className="max-w-2xl">
               <div className="text-amber-500 mb-12 flex items-center gap-4 font-black text-2xl italic uppercase tracking-widest">
                  <Activity className="w-8 h-8" /> Archive_0x151
               </div>
               <p className="text-3xl md:text-5xl font-light italic leading-tight text-white/30 uppercase tracking-tighter mb-16">
                  WE TREAT WATCHMAKING AS ARCHITECTURE. EVERY GEAR IS A FUNCTION OF ITS TECTONIC INTENT.
               </p>
               <div className="flex gap-16 font-black text-[10px] uppercase tracking-[0.5em] text-amber-500/40 italic">
                  <span>Geneva</span>
                  <span>London</span>
                  <span>Tokyo</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right">
               <div>
                  <h4 className="text-[10vw] font-black italic uppercase tracking-tighter text-white opacity-[0.03] leading-none mb-12">CHRONOS</h4>
                  <nav className="flex flex-col gap-6 font-black text-[10px] uppercase tracking-[0.6em] text-white/20">
                     <Link href="#" className="hover:text-amber-500 transition-colors">Instagram</Link>
                     <Link href="#" className="hover:text-amber-500 transition-colors">Journal</Link>
                     <Link href="#" className="hover:text-amber-500 transition-colors">Concierge</Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1em] text-white/5 mt-24">
                  &copy; 2026 // CHRONOS_OS&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
