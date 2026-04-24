"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, Zap, Shield, Menu, Search, Layers } from "lucide-react";
import "../premium.css";

function KineticText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%", rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function BetterWritingSPA() {
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
    <div ref={containerRef} className="premium-theme bg-[#EAE8E3] text-[#1a1a1a] min-h-screen font-serif selection:bg-[#1a1a1a] selection:text-white overflow-hidden relative">
      
      {/* TYPOGRAPHY GRID & NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,26,26,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.03)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#1a1a1a] opacity-[0.01] blur-[150px] rounded-full mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-10 flex justify-between items-center z-50 bg-[#EAE8E3]/30 backdrop-blur-3xl border-b border-[#1a1a1a]/5">
        <Link href="/" className="font-black text-2xl tracking-tighter text-[#1a1a1a] flex items-center gap-4 italic uppercase">
           BETTER<span className="text-[#1a1a1a]/20">_WRITING</span>
        </Link>
        
        <nav className="hidden lg:flex gap-16 font-black text-[10px] uppercase tracking-[0.6em] text-[#1a1a1a]/30">
            <Link href="#" className="hover:text-[#1a1a1a] transition-colors group">
               Journal<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#1a1a1a] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#1a1a1a] transition-colors group">
               Notes<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#1a1a1a] italic">.</span>
            </Link>
            <Link href="#" className="hover:text-[#1a1a1a] transition-colors group">
               Archive<span className="inline-block w-0 group-hover:w-3 transition-all overflow-hidden text-[#1a1a1a] italic">.</span>
            </Link>
        </nav>
        
        <div className="flex items-center gap-10">
           <button className="bg-[#1a1a1a] text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-stone-800 transition-all">
              Subscribe_
           </button>
           <Menu className="w-6 h-6 text-[#1a1a1a] cursor-pointer" />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 pt-20 overflow-hidden">
         <motion.div style={{ scale: heroScale, y: yHero }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#EAE8E3] via-transparent to-[#EAE8E3]/40" />
         </motion.div>
         
         <div className="relative z-10 max-w-7xl w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-4 font-sans font-black text-[10px] uppercase tracking-[1em] text-[#1a1a1a]/20 mb-16 border-l-2 border-[#1a1a1a] pl-10 italic">
                  Thought_Sync // 0169_Alpha
               </div>
               
               <h1 className="text-7xl md:text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-20 text-[#1a1a1a]">
                  <KineticText text="BETTER WRITING." /> <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #1a1a1a" }}><KineticText text="BETTER THINKING." /></span>
               </h1>
               
               <p className="text-xl md:text-3xl font-light italic text-[#1a1a1a]/40 max-w-3xl mx-auto mb-24 leading-relaxed uppercase tracking-widest">
                  Structural allocation for cognitive intent. Architecting the future of clarity with tectonic precision.
               </p>
               
               <div className="flex flex-col md:flex-row gap-16 justify-center items-center font-mono">
                  <div className="flex items-center gap-8 group cursor-pointer">
                     <div className="w-20 h-px bg-[#1a1a1a]/10 group-hover:w-32 transition-all" />
                     <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1a1a1a]">Join_15,000_Readers</span>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-[#1a1a1a]/5" />
                  <div className="font-black text-[9px] uppercase tracking-[0.6em] text-[#1a1a1a]/10 italic">
                     Dispatch // Series_169
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Decorative Side HUD */}
         <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 font-sans font-black text-[8px] uppercase tracking-[1em] text-[#1a1a1a]/10 hidden md:flex italic">
            <span>SYNC_STATUS: ACTIVE</span>
            <div className="flex gap-1 h-12 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-[#1a1a1a]/20" />)}
            </div>
         </div>
      </section>

      {/* DISPATCHES GRID */}
      <section className="py-48 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10 bg-[#EAE8E3]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-40 border-b border-[#1a1a1a]/10 pb-20 gap-16">
            <div>
               <span className="text-[10px] font-sans font-black uppercase tracking-[2em] text-[#1a1a1a]/40 mb-8 block italic">Cognitive_Manifest</span>
               <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-[#1a1a1a] leading-none">The <span className="text-[#1a1a1a]/10">Dispatches_</span></h2>
            </div>
            <div className="flex gap-16 text-[10px] font-sans font-black uppercase tracking-[0.6em] text-[#1a1a1a]/20 italic">
               <span>Records: [03]</span>
               <span>Status: [Verified]</span>
            </div>
         </div>

         <div className="flex flex-col gap-12">
            {["The Illusion of Writer's Block", "Structuring the Messy Middle", "Why We Read (And Forget)"].map((t, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -100 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative border-b border-[#1a1a1a]/5 pb-12 cursor-pointer hover:bg-[#1a1a1a]/5 transition-all px-8"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                           <span className="text-[10px] font-sans font-black uppercase tracking-[0.8em] text-[#1a1a1a]/20 italic mb-6 block">Dispatch_0x{i+169}</span>
                           <h3 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-[#1a1a1a] group-hover:translate-x-10 transition-all duration-700">{t}</h3>
                        </div>
                        <ArrowRight className="w-12 h-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-700" />
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-48 px-6 md:px-12 border-t border-[#1a1a1a]/5 relative z-10 bg-[#EAE8E3]">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-40">
            <div className="max-w-2xl">
               <div className="text-[#1a1a1a] mb-16 flex items-center gap-6 font-black text-2xl italic uppercase tracking-widest font-sans">
                  <Activity className="w-10 h-10" /> Thought_Logs
               </div>
               <p className="text-4xl md:text-6xl font-light italic leading-[0.9] text-[#1a1a1a]/20 uppercase tracking-tighter mb-20">
                  WE TREAT WORDS AS ARCHITECTURE. EVERY THOUGHT A FUNCTION.
               </p>
               <div className="flex gap-20 font-black text-[10px] uppercase tracking-[0.8em] text-[#1a1a1a]/40 italic font-mono">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>NYC</span>
               </div>
            </div>
            <div className="flex flex-col justify-between items-end text-right font-sans">
               <div className="w-full">
                  <h4 className="text-[12vw] font-black italic uppercase tracking-tighter text-[#1a1a1a] opacity-[0.02] leading-none mb-20">BETTER</h4>
                  <nav className="flex flex-col gap-10 font-black text-[10px] uppercase tracking-[0.8em] text-[#1a1a1a]/10">
                     <Link href="#" className="hover:text-[#1a1a1a] transition-colors group">
                        Instagram<span className="text-[#1a1a1a]/0 group-hover:text-[#1a1a1a] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#1a1a1a] transition-colors group">
                        Medium<span className="text-[#1a1a1a]/0 group-hover:text-[#1a1a1a] transition-all">_</span>
                     </Link>
                     <Link href="#" className="hover:text-[#1a1a1a] transition-colors group">
                        Legal<span className="text-[#1a1a1a]/0 group-hover:text-[#1a1a1a] transition-all">_</span>
                     </Link>
                  </nav>
               </div>
               <div className="font-black text-[9px] uppercase tracking-[1.5em] text-[#1a1a1a]/5 mt-32 italic">
                  &copy; 2026 // BETTER_WRITING_DISPATCH&trade;
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
