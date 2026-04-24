"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, Calendar, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const SESSIONS = [
  { id: 1, title: "CORE_COMPUTE", cat: "Hardware", value: "Verified", img: "https://images.unsplash.com/photo-1540575861501-7ad058177a33?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "VOID_SYNAPSE", cat: "Neural", value: "Active", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "NEON_NETWORK", cat: "Protocol", value: "Locked", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=1500" },
];

export default function ReconConferenceSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#020205] text-purple-400 min-h-screen font-sans selection:bg-purple-600 selection:text-white overflow-hidden relative">
      
      {/* PURPLE GLOW & GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-purple-600 opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-screen" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#020205]/50 backdrop-blur-3xl border-b border-purple-500/10">
        <Link href="/" className="font-black text-2xl tracking-[0.2em] text-white flex items-center gap-4 italic uppercase">
           RE<span className="text-purple-500">_CON</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-white/30">
            <Link href="#" className="hover:text-purple-400 transition-colors group">
               Schedule<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-purple-500 italic">_</span>
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors group">
               Speakers<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-purple-500 italic">_</span>
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors group">
               Venue<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-purple-500 italic">_</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-purple-600 text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              Register_Now
           </button>
           <Menu className="w-6 h-6 text-purple-500 cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1540575861501-7ad058177a33?auto=format&fit=crop&q=80&w=2500" alt="Conference" fill className="object-cover opacity-20 grayscale contrast-125" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-[#020205]" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1em] text-purple-500/50 mb-16 border-l-2 border-purple-600 pl-10 italic font-mono">
                  Event_Sync // 0159_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-white drop-shadow-2xl">
                  BEYOND<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(168,85,247,0.6)" }}>SYNC.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-white/30 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-[0.2em]">
                  Architecting the future of neural interfaces. A curated index of tectonic shifts in computational reasoning.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-purple-600/30 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-purple-500">View_Schedule</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-white/10 italic">
                     Nov_2026 // San_Francisco
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-black text-[8px] uppercase tracking-[0.8em] text-purple-500/20 hidden md:flex italic font-mono">
            <span>SYNC_STATUS: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-purple-500" />)}
            </div>
         </div>
      </section>

      {/* SESSIONS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#020205]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-purple-500/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2em] text-purple-600 mb-8 block italic font-mono">Visual_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none">The <span className="text-purple-500">Re_Con_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic font-mono">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {SESSIONS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer hover:border-purple-500/40 transition-all shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-purple-600/5 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10 font-mono">
                        <div className="flex justify-between items-start">
                           <div className="p-5 bg-white/5 border border-white/10 rounded-none group-hover:bg-purple-600 group-hover:text-black transition-all shadow-xl">
                              <Calendar className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.8em] text-purple-500/30 italic">Ref_0x{i+159}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[0.8em] text-purple-500 mb-8 block italic font-black">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-white group-hover:tracking-widest transition-all leading-[0.8]">{p.title}</h3>
                           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-white">
                              Execute_Handshake <ArrowRight className="w-6 h-6" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-white/5 relative z-10 bg-[#020205]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-purple-500 mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-mono">
                  <Activity className="w-10 h-10" /> Re_Con_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-white/20 uppercase tracking-tighter mb-20">
                  WE TREAT ARCHITECTURE AS CODE. EVERY STRUCTURE IS A FUNCTION OF ITS TECTONIC INTENT.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-purple-500/40 italic font-mono">
                  <span>Berlin</span>
                  <span>SF</span>
                  <span>Tokyo</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-white opacity-[0.02] leading-none mb-20">RECON</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-white/10">
                     <Link href="#" className="hover:text-purple-400 transition-colors group">
                        Instagram<span className="text-purple-500/0 group-hover:text-purple-500 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-purple-400 transition-colors group">
                        Speakers<span className="text-purple-500/0 group-hover:text-purple-500 transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-purple-400 transition-colors group">
                        Archives<span className="text-purple-500/0 group-hover:text-purple-500 transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-white/5 mt-32 italic">
                  &copy; 2026 // RE_CON_CONFERENCE&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
