"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PenTool, Layout, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { id: 1, title: "BRAND_IDENTITY", cat: "Visual", value: "Verified", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "WEB_ARCHITECTURE", cat: "Core", value: "Active", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "DIGITAL_CRAFT", cat: "Experience", value: "Locked", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1500" },
];

export default function ObliqStudioSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#0D0D0D] text-rose-400 min-h-screen font-sans selection:bg-rose-600 selection:text-white overflow-hidden relative">
      
      {/* ROSE GLOW & TEXTURE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0D0D0D_100%)] opacity-90" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-rose-600 opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#0D0D0D]/50 backdrop-blur-2xl border-b border-rose-500/10">
        <Link href="/" className="font-black text-2xl tracking-[0.3em] text-white flex items-center gap-4 italic uppercase">
           OBLIQ<span className="text-rose-500">_STUDIO</span>
        </Link>
        
        <nav className="hidden lg:flex gap-12 font-black text-[10px] uppercase tracking-[0.6em] text-white/30">
            <Link href="#" className="hover:text-rose-400 transition-colors group">
               Craft<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-rose-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-rose-400 transition-colors group">
               Visuals<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-rose-500 italic">.</span>
            </Link>
            <Link href="#" className="hover:text-rose-400 transition-colors group">
               Archives<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-rose-500 italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-8">
           <button className="border border-rose-500/20 text-white px-10 py-3 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-rose-600 hover:border-rose-600 transition-all shadow-[0_0_20px_rgba(244,63,94,0.1)]">
              Start_Project
           </button>
           <Menu className="w-6 h-6 text-rose-500 cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2500" alt="Design" fill className="object-cover opacity-20 grayscale contrast-150" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
         </motion.div>
         
         <div className="relative z-10 max-w-6xl w-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-rose-500/50 mb-16 border-l-2 border-rose-600 pl-10 italic font-mono">
                  Studio_Sync // 0154_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[12vw] font-black italic uppercase leading-[0.8] tracking-tighter mb-20 text-white drop-shadow-2xl">
                  VISUAL<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(244,63,94,0.6)" }}>RESONANCE.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light text-white/30 max-w-2xl mx-auto mb-24 leading-relaxed uppercase tracking-[0.2em] italic">
                  Architectural intent meets visual precision. We don't just design; we synthesize digital experiences.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-rose-600/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-rose-500">Read_Manifesto</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-white/10 italic">
                     Established_2026 // NYC
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative HUD Elements */}
         <div className="absolute left-12 bottom-12 flex flex-col items-start gap-4 font-black text-[8px] uppercase tracking-[0.8em] text-rose-500/20 hidden md:flex italic font-mono">
            <span>METRIC_CAPTURE: ACTIVE</span>
            <div className="flex gap-2 w-40 h-[1px] bg-white/5 overflow-hidden">
               <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-rose-500/40" />
            </div>
         </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#0D0D0D]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-rose-500/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[1.5em] text-rose-600 mb-8 block italic">Studio_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none">The <span className="text-rose-500">Obliq_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic font-mono">
               <span>Capacity: 100%</span>
               <span>Records: 03</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {SERVICES.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer hover:border-rose-500/40 transition-all"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-rose-600/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-sans text-white">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/5 border border-white/10 rounded-none group-hover:bg-rose-600 group-hover:text-black transition-all">
                              <Layers className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-rose-500/30 italic font-mono">Ref_0x{i+154}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-rose-500 mb-8 block italic font-black font-mono">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-white group-hover:text-rose-500 transition-colors leading-[0.85]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-8 group-hover:translate-y-0 text-white">
                              Specifications <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#0D0D0D]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-rose-500 mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Studio_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-tight text-white/20 uppercase tracking-tighter mb-20">
                  WE TREAT ARCHITECTURE AS CODE. EVERY STRUCTURE IS A FUNCTION OF ITS TECTONIC INTENT.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-rose-500/40 italic font-mono">
                  <span>New York</span>
                  <span>Paris</span>
                  <span>London</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-20">OBLIQ</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-white/10 font-mono">
                     <Link href="#" className="hover:text-rose-400 transition-colors">Instagram</Link>
                     <Link href="#" className="hover:text-rose-400 transition-colors">Behance</Link>
                     <Link href="#" className="hover:text-rose-400 transition-colors">Manifesto</Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-white/5 mt-32 italic font-mono">
                  &copy; 2026 // OBLIQ_STUDIO&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
