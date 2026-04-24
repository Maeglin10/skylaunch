"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Palette, Eye, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const WORKS = [
  { id: 1, title: "FRACTAL_VOID", cat: "Abstract", value: "Verified", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "STATIC_RESONANCE", cat: "Digital", value: "Active", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "NEURAL_DRIFT", cat: "Generative", value: "Locked", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1500" },
];

export default function ArtIndexGallerySPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#050505] text-stone-400 min-h-screen font-sans selection:bg-stone-600 selection:text-white overflow-hidden relative">
      
      {/* STONE GLOW & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-90" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-stone-600 opacity-[0.03] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-soft-light" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#050505]/50 backdrop-blur-3xl border-b border-stone-500/10">
        <Link href="/" className="font-black text-2xl tracking-[0.4em] text-white flex items-center gap-4 italic uppercase">
           ART<span className="text-stone-500">_INDEX</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.8em] text-white/30">
            <Link href="#" className="hover:text-stone-400 transition-colors group">
               Exhibition<span className="inline-block w-0 group-hover:w-4 transition-all overflow-hidden text-stone-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-stone-400 transition-colors group">
               Artists<span className="inline-block w-0 group-hover:w-4 transition-all overflow-hidden text-stone-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-stone-400 transition-colors group">
               Journal<span className="inline-block w-0 group-hover:w-4 transition-all overflow-hidden text-stone-500 italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-stone-800 text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl">
              Subscribe_
           </button>
           <Menu className="w-6 h-6 text-stone-500 cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=2500" alt="Art" fill className="object-cover opacity-20 grayscale contrast-150" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-6 font-black text-[10px] uppercase tracking-[1.2em] text-stone-500/50 mb-20 border-l-2 border-stone-600 pl-12 italic font-mono">
                  Visual_Record // 0155_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[13vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-24 text-white drop-shadow-2xl">
                  BEYOND<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(120,113,108,0.6)" }}>STATIC.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-white/20 max-w-3xl mx-auto mb-28 leading-relaxed uppercase tracking-tight">
                  A curated index of visual tectonic shifts. Architectural intent redefined through generative resonance.
               </p>
               
               <div className="flex flex-col md:flex-row gap-20 justify-center items-center font-mono">
                  <div className="flex items-center gap-10 group cursor-pointer">
                     <div className="w-24 h-px bg-stone-600/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[1em] text-stone-500">Explore_Works</span>
                  </div>
                  <div className="hidden md:block w-px h-20 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.8em] text-white/10 italic">
                     Established_2026 // Global
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-6 font-black text-[8px] uppercase tracking-[1em] text-stone-500/10 hidden md:flex italic font-mono">
            <span>INDEX_STATUS: STABLE</span>
            <div className="flex gap-1 h-16 items-end">
               {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <motion.div key={i} animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }} className="w-[1px] bg-stone-500" />)}
            </div>
         </div>
      </section>

      {/* WORKS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#050505]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-48 border-b border-stone-500/10 pb-24 gap-20">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-stone-600 mb-10 block italic">Exhibition_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-white leading-none">The <span className="text-stone-500">Index_</span></h2>
            </div>
            <div className="flex gap-20 text-[10px] font-black uppercase tracking-[1em] text-white/20 italic font-mono">
               <span>Curated: [Active]</span>
               <span>Records: [03]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {WORKS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 100 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[90vh] bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer hover:border-stone-500/40 transition-all shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-stone-600/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-20 flex flex-col justify-between z-10 font-sans text-white">
                        <div className="flex justify-between items-start">
                           <div className="p-6 bg-white/5 border border-white/10 rounded-none group-hover:bg-stone-600 group-hover:text-black transition-all shadow-xl">
                              <Eye className="w-8 h-8" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[1em] text-stone-500/20 italic font-mono">Ref_0x{i+155}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[1em] text-stone-500 mb-10 block italic font-black font-mono">{p.cat} // {p.value}</span>
                           <h3 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter mb-20 text-white group-hover:tracking-[0.1em] transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[1em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-white">
                              View_Record <ArrowRight className="w-8 h-8" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-60 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#050505]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-60">
            <div className="max-w-2xl">
               <div className="text-stone-500 mb-20 flex items-center gap-8 font-black text-3xl italic uppercase tracking-[0.5em] font-mono">
                  <Activity className="w-12 h-12" /> Exhibition_Sync
               </div>
               <p className="text-5xl md:text-7xl font-light italic leading-[0.9] text-white/10 uppercase tracking-tighter mb-24">
                  VISUAL REASONING IS A FUNCTION OF ENVIRONMENTAL VARIABLES.
               </p>
               <div className="flex gap-24 font-black text-[10px] uppercase tracking-[1em] text-stone-500/30 italic font-mono">
                  <span>Berlin</span>
                  <span>New York</span>
                  <span>Tokyo</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[15vw] font-black italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-24">INDEX</h4>
                  <nav className="flex flex-col gap-12 font-black text-[10px] uppercase tracking-[1em] text-white/10">
                     <Link href="#" className="hover:text-stone-400 transition-colors group">
                        Instagram<span className="text-stone-500/0 group-hover:text-stone-500 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-stone-400 transition-colors group">
                        Archives<span className="text-stone-500/0 group-hover:text-stone-500 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-stone-400 transition-colors group">
                        Manifesto<span className="text-stone-500/0 group-hover:text-stone-500 transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[2em] text-white/5 mt-48 italic">
                  &copy; 2026 // ART_INDEX&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
