"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, Disc, Sparkles } from "lucide-react";
import "../premium.css";

const LINEUP = [
  "Daft System", "Neon Cult", "Acid Rain", "Voidwalker", 
  "Synthetic Soul", "Laser Beam", "Bass Drop", "Cyber Punk"
];

export default function PremiumFestival() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const xMarquee1 = useTransform(springScroll, [0, 1], ["0%", "-50%"]);
  const xMarquee2 = useTransform(springScroll, [0, 1], ["-50%", "0%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#090014] text-white min-h-screen font-sans selection:bg-[#00F3FF] selection:text-black overflow-hidden relative">
      
      {/* VIBRANT NEON GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#9D00FF] blur-[150px] rounded-full mix-blend-screen" 
         />
         <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#00F3FF] blur-[150px] rounded-full mix-blend-screen" 
         />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 mix-blend-difference border-b border-white/5">
        <Link href="/" className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-[#00F3FF] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
           ECHO<span className="text-[#9D00FF]">STATE</span>
        </Link>
        <button className="bg-[#00F3FF] text-black px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] skew-x-[-15deg] hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.8)]">
            <span className="block skew-x-[15deg] flex items-center gap-2"><Ticket className="w-4 h-4" /> Get Tickets</span>
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
             <Image src="https://images.unsplash.com/photo-1540039155732-68473678c96e?auto=format&fit=crop&q=80&w=2500" alt="Festival Crowd" fill className="object-cover opacity-60 mix-blend-screen grayscale-[50%] contrast-125" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#090014] via-[#090014]/50 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center w-full max-w-5xl pt-20">
            <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="inline-flex items-center gap-3 font-black uppercase tracking-[0.3em] text-[10px] mb-8 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-[#00F3FF] shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                   <Sparkles className="w-4 h-4" /> Edition V
               </div>
               
               <h1 className="text-[12vw] md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter mb-12 drop-shadow-2xl">
                   The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F3FF] to-[#9D00FF]">Frequencies</span><br/>
                   <span className="italic">Unite Us.</span>
               </h1>
               
               <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                   <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#00F3FF] animate-pulse shadow-[0_0_10px_rgba(0,243,255,1)]" /> 
                      Aug 14-16, 2026
                   </div>
                   <div className="hidden md:block w-px h-8 bg-white/20" />
                   <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#9D00FF] shadow-[0_0_10px_rgba(157,0,255,1)]" /> 
                      Ibiza, Spain
                   </div>
               </div>
            </motion.div>
        </div>
      </section>

      {/* KINETIC TYPOGRAPHY LINEUP */}
      <section className="py-32 relative z-10 overflow-hidden bg-[#090014]">
         <div className="text-center mb-16">
            <h2 className="font-black text-sm uppercase tracking-[0.5em] text-[#00F3FF] flex items-center justify-center gap-4">
               <Disc className="w-5 h-5 animate-spin-slow" /> Phase 1 Lineup
            </h2>
         </div>
         
         <div className="space-y-6 rotate-[-2deg] scale-105">
            <motion.div style={{ x: xMarquee1 }} className="flex whitespace-nowrap gap-8 text-[8vw] font-black uppercase tracking-tighter italic">
               {[...LINEUP, ...LINEUP].map((artist, i) => (
                  <span key={i} className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}>{artist} <span className="text-[#9D00FF]">/</span></span>
               ))}
            </motion.div>
            
            <motion.div style={{ x: xMarquee2 }} className="flex whitespace-nowrap gap-8 text-[8vw] font-black uppercase tracking-tighter">
               {[...LINEUP, ...LINEUP].reverse().map((artist, i) => (
                  <span key={i} className={i % 2 === 0 ? "text-[#00F3FF]" : "text-white"}>{artist} <span className="text-white/20">•</span></span>
               ))}
            </motion.div>
         </div>
      </section>

      {/* TICKET CTA */}
      <section className="py-32 px-6 relative z-10">
         <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#9D00FF]/20 to-[#00F3FF]/20 border border-white/10 rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-xl shadow-[0_0_100px_rgba(157,0,255,0.2)]">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Secure Your <br/><span className="italic text-[#00F3FF]">Pass</span></h2>
            <p className="font-bold text-xs uppercase tracking-[0.3em] text-white/50 mb-12">Tier 1 Tickets almost sold out.</p>
            <button className="bg-white text-black px-12 py-5 font-black uppercase tracking-[0.3em] text-xs skew-x-[-15deg] hover:bg-[#00F3FF] hover:scale-110 transition-all shadow-2xl">
               <span className="block skew-x-[15deg]">Buy Now</span>
            </button>
         </div>
      </section>

    </div>
  );
}
