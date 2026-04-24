"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, User, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const ARTICLES = [
  { id: 1, title: "QUIET_ART", cat: "Philosophy", value: "Verified", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "TYPO_RESONANCE", cat: "Interface", value: "Active", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "COLD_COMPUTE", cat: "Reality", value: "Locked", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1500" },
];

export default function JulianParkerSPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
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
    <div ref={containerRef} className="premium-theme bg-white text-slate-900 min-h-screen font-sans selection:bg-slate-900 selection:text-white overflow-hidden relative">
      
      {/* MINIMALIST GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-slate-900 opacity-[0.01] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-white/30 backdrop-blur-3xl border-b border-slate-900/5">
        <Link href="/" className="font-black text-2xl tracking-tighter text-slate-900 flex items-center gap-4 italic uppercase">
           JULIAN<span className="text-slate-900/20">_PARKER</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-slate-900/30">
            <Link href="#" className="hover:text-slate-900 transition-colors group">
               Journal<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-slate-900 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors group">
               Notes<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-slate-900 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors group">
               Archive<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-slate-900 italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-slate-900 text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-700 transition-all">
              Subscribe_
           </button>
           <Menu className="w-6 h-6 text-slate-900 cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2500" alt="Writer" fill className="object-cover opacity-10 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-slate-900/20 mb-16 border-l-2 border-slate-900/10 pl-10 italic font-mono">
                  Thought_Sync // 0163_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-slate-900">
                  PURE.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #0f172a" }}>WORDS.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-slate-900/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest">
                  Structural allocation for cognitive intent. Architecting the future of thought with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-slate-900/10 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-900">Read_Journal</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-slate-900/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-slate-900/10 italic">
                     Published // London // 2026
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-slate-900/10 hidden md:flex italic font-mono">
            <span>WORD_COUNT: 104,231</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-slate-900/20" />)}
            </div>
         </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-white">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-slate-900/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-slate-900/20 mb-8 block italic font-mono">Thought_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">The <span className="text-slate-900/5">Parker_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-slate-900/20 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {ARTICLES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-slate-50 border border-slate-900/5 overflow-hidden cursor-pointer hover:border-slate-900/20 transition-all shadow-sm"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/40 backdrop-blur-xl border border-slate-900/5 rounded-none group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                              <BookOpen className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-900/20 italic">Ref_0x{i+163}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-slate-900 mb-8 block italic font-black">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-slate-900 group-hover:tracking-widest transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-slate-900">
                              Read_Article <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-slate-900/5 relative z-10 bg-white">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-slate-900 mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Parker_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-slate-900/20 uppercase tracking-tighter mb-20">
                  WE TREAT WORDS AS ARCHITECTURE. EVERY THOUGHT A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-slate-900/40 italic font-mono">
                  <span>London</span>
                  <span>Berlin</span>
                  <span>Paris</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-slate-900 opacity-[0.02] leading-none mb-20">PARKER</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-slate-900/10">
                     <Link href="#" className="hover:text-slate-900 transition-colors group">
                        Instagram<span className="text-slate-900/0 group-hover:text-slate-900 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-slate-900 transition-colors group">
                        Medium<span className="text-slate-900/0 group-hover:text-slate-900 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-slate-900 transition-colors group">
                        Archives<span className="text-slate-900/0 group-hover:text-slate-900 transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-slate-900/5 mt-32 italic">
                  &copy; 2026 // JULIAN_PARKER_OFFICIAL&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
