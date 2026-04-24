"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, Cpu, Zap, Shield, Activity, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const POSTS = [
  { id: 1, title: "DEATH_OF_INTERFACE", cat: "Philosophy", value: "Verified", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "GENESIS_CHIP", cat: "Hardware", value: "Active", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "COLD_COMPUTE", cat: "Intelligence", value: "Locked", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=1500" },
];

export default function ProtoLogBrutalistSPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
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
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-screen font-mono selection:bg-black selection:text-white overflow-hidden relative">
      
      {/* BRUTALIST GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-black opacity-[0.02] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-white/50 backdrop-blur-3xl border-b-2 border-black">
        <Link href="/" className="font-black text-2xl tracking-tighter text-black flex items-center gap-4 italic uppercase">
           PROTO<span className="bg-black text-white px-2 py-1">LOG</span>
        </Link>
        
        <nav className="hidden lg:flex gap-12 font-black text-[10px] uppercase tracking-[0.4em] text-black/30">
            <Link href="#" className="hover:text-black transition-colors group">
               Terminal<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">_</span>
            </Link>
            <Link href="#" className="hover:text-black transition-colors group">
               Hardware<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">_</span>
            </Link>
            <Link href="#" className="hover:text-black transition-colors group">
               Philosophy<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-black italic">_</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <div className="hidden md:flex flex-col items-end opacity-20">
              <span className="text-[9px] font-black uppercase tracking-widest italic">Core_Sync: 100%</span>
              <span className="text-[10px] font-black uppercase tracking-widest italic">Node_Ref_158</span>
           </div>
           <button className="bg-black text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-stone-800 transition-all shadow-2xl">
              Access_Logs
           </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2500" alt="Tech" fill className="object-cover opacity-10 grayscale contrast-150" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-[1.2em] text-black/40 mb-16 border-l-4 border-black pl-10 italic">
                  Visual_Capture // 0158_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-black">
                  PURE.<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #000" }}>LOGS.</span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-black/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-tighter">
                  We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. Zero noise.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-black/10 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[1em] text-black">Read_Manifesto</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-black/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.8em] text-black/10 italic">
                     Established // Berlin // Tokyo
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute left-12 bottom-12 flex flex-col items-start gap-4 font-black text-[8px] uppercase tracking-[1em] text-black/10 hidden md:flex italic">
            <span>METRIC_STATUS: ACTIVE</span>
            <div className="flex gap-2 w-48 h-[2px] bg-black/5 overflow-hidden">
               <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-black/40" />
            </div>
         </div>
      </section>

      {/* POSTS GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-white">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b-4 border-black pb-20 gap-16">
            <div>
               <span className="text-[10px] font-black uppercase tracking-[2.5em] text-black mb-8 block italic">Protocol_Manifest</span>
               <h2 className="text-6xl md:text-[12vw] font-black italic uppercase tracking-tighter text-black leading-none">The <span className="text-black/10">Proto_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-black uppercase tracking-[1em] text-black/20 italic">
               <span>Records: [03]</span>
               <span>Status: [Active]</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {POSTS.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 80 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative h-[85vh] bg-stone-50 border-2 border-black overflow-hidden cursor-pointer hover:bg-black transition-all shadow-2xl"
                >
                    <Image src={p.img} alt={p.title} fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-10 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95 group-hover:opacity-40 transition-opacity" />
                    
                    <div className="absolute inset-16 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                           <div className="p-6 bg-black text-white rounded-none group-hover:bg-white group-hover:text-black transition-all">
                              <Terminal className="w-8 h-8" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[1em] text-black/20 group-hover:text-white/20 italic">Post_0x{i+158}</div>
                        </div>
                        
                        <div>
                           <span className="text-[10px] uppercase tracking-[1em] text-black mb-10 block italic font-black group-hover:text-white transition-colors">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-20 text-black group-hover:text-white transition-colors leading-[0.85]">{p.title}</h3>
                           <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[1em] opacity-0 group-hover:opacity-100 transition-all translate-y-10 group-hover:translate-y-0 text-white">
                              Execute_Handshake <ArrowRight className="w-8 h-8" />
                           </div>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-60 px-6 md:px-12 border-t-4 border-black relative z-10 bg-white">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-black mb-20 flex items-center gap-8 font-black text-3xl italic uppercase tracking-[0.4em]">
                  <Cpu className="w-12 h-12" /> Protocol_v4.0.158
               </div>
               <p className="text-5xl md:text-8xl font-black italic leading-[0.8] text-black/10 uppercase tracking-tighter mb-24">
                  STRUCTURAL REASONING IS A FUNCTION OF ENVIRONMENTAL VARIABLES.
               </p>
               <div className="flex gap-24 font-black text-[10px] uppercase tracking-[1.5em] text-black/30 italic">
                  <span>Berlin</span>
                  <span>New York</span>
                  <span>Tokyo</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-mono">
               <div className="w-full">
                  <h4 className="text-[15vw] font-black italic uppercase tracking-tighter text-black opacity-[0.03] leading-none mb-24">PROTO</h4>
                  <nav className="flex flex-col gap-12 font-black text-[10px] uppercase tracking-[1.2em] text-black/20">
                     <Link href="#" className="hover:text-black transition-colors group">
                        Instagram<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-black transition-colors group">
                        Archives<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-black transition-colors group">
                        Terminal<span className="text-black/0 group-hover:text-black transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[2.5em] text-black/5 mt-48 italic">
                  &copy; 2026 // PROTO_LOG_OS&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
