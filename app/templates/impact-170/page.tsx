"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Activity, Zap, Shield, Menu, Search, Layers, Mail, Linkedin, Twitter, Download } from "lucide-react";
import "../premium.css";

const EXP = [
  { role: "Fractional CMO", comp: "TechFlow Inc.", time: "2023 - Present", desc: "Engineered a product-led growth strategy that scaled enterprise pipeline by 150% in 12 months. Redefined brand positioning for the AI era." },
  { role: "VP of Marketing", comp: "CloudSync", time: "2020 - 2023", desc: "Built and scaled a 15-person marketing engine from scratch. Instrumental in securing $40M Series B funding through strategic narrative design." },
  { role: "Director of Growth", comp: "DataNova", time: "2017 - 2020", desc: "Architected the initial growth loop resulting in 1M+ active users within the first two years of launch." }
];

export default function DavidMitchellSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#F7F7F7] text-[#111111] min-h-screen font-sans selection:bg-[#4F46E5] selection:text-white overflow-hidden relative">
      
      {/* GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#4F46E5] opacity-[0.03] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#F7F7F7]/30 backdrop-blur-3xl border-b border-[#111111]/5">
        <Link href="/" className="font-black text-2xl tracking-tighter text-[#111111] flex items-center gap-4 italic uppercase">
           DAVID<span className="text-[#4F46E5]">_MITCHELL</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-[#111111]/30">
            <Link href="#" className="hover:text-[#4F46E5] transition-colors group">
               Career<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#4F46E5] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#4F46E5] transition-colors group">
               Expertise<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#4F46E5] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#4F46E5] transition-colors group">
               Work<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#4F46E5] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#111111] text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#4F46E5] transition-all">
              Initiate_Dialogue
           </button>
           <Menu className="w-6 h-6 text-[#111111] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2500" alt="David Mitchell" fill className="object-cover opacity-10 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F7F7F7] via-transparent to-[#F7F7F7]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1.2em] text-[#4F46E5] mb-16 border-l-2 border-[#4F46E5] pl-10 italic font-mono">
                  Career_Archive // 0170_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-[#111111]">
                  STRATEGIC.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #111" }}>GROWTH.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#111111]/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest">
                  Structural allocation for market intent. Architecting the future of SaaS growth with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#4F46E5]/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#4F46E5]">Explore_Trajectory</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-[#111111]/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-[#111111]/10 italic">
                     Fractional CMO // Series A/B
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[1em] text-[#4F46E5]/20 hidden md:flex italic font-mono">
            <span>SYNC_STATUS: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#4F46E5]" />)}
            </div>
         </div>
      </section>

      {/* EXPERIENCE GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#F7F7F7]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#111111]/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-[#4F46E5] mb-8 block italic font-mono">Career_Manifest</span>
               <h2 className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#111111] leading-none">The <span className="text-[#4F46E5]/20">Trajectory_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-[#111111]/20 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {EXP.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[60vh] bg-white border border-[#111111]/5 p-16 flex flex-col justify-between hover:border-[#4F46E5]/30 transition-all shadow-sm"
                >
                    <div className="flex justify-between items-start">
                        <div className="p-4 bg-[#111111]/5 border border-[#111111]/5 rounded-none group-hover:bg-[#4F46E5] group-hover:text-white transition-all shadow-sm">
                           <Activity className="w-6 h-6" />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.8em] text-[#4F46E5] italic font-mono">Ref_0x{i+170}</div>
                    </div>
                    
                    <div>
                       <span className="text-[10px] uppercase tracking-[0.8em] text-[#4F46E5] mb-6 block italic font-black font-mono">{p.time}</span>
                       <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-8 text-[#111111] group-hover:tracking-widest transition-all leading-[0.8]">{p.role}</h3>
                       <div className="text-sm font-black uppercase tracking-widest text-[#111111]/40 mb-8">{p.comp}</div>
                       <p className="text-lg text-[#111111]/50 font-light leading-relaxed group-hover:text-[#111111] transition-all">{p.desc}</p>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-[#111111]/5 relative z-10 bg-[#F7F7F7]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-[#4F46E5] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Mitchell_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#111111]/20 uppercase tracking-tighter mb-20">
                  WE TREAT GROWTH AS ARCHITECTURE. EVERY STRATEGY A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#4F46E5]/40 italic font-mono">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-[#111111] opacity-[0.02] leading-none mb-20">MITCHELL</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#111111]/10">
                     <Link href="#" className="hover:text-[#4F46E5] transition-colors group">
                        Linkedin<span className="text-[#4F46E5]/0 group-hover:text-[#4F46E5] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#4F46E5] transition-colors group">
                        Twitter<span className="text-[#4F46E5]/0 group-hover:text-[#4F46E5] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#4F46E5] transition-colors group">
                        Dossier<span className="text-[#4F46E5]/0 group-hover:text-[#4F46E5] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-[#111111]/5 mt-32 italic">
                  &copy; 2026 // DAVID_MITCHELL_OFFICIAL&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
