"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function FilmNoirStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.6], [200, 0]);
  const grainOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.2]);

  return (
    <div ref={containerRef} className="premium-theme bg-black text-white min-h-[400vh] selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* VCR / Scanline Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] animate-[pulse_0.1s_infinite]">
         <div className="w-full h-full" style={{ 
           backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
           backgroundSize: '100% 4px, 3px 100%'
         }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-opacity hover:opacity-100 opacity-20">
         <Link href="/" className="text-2xl font-black italic tracking-tighter uppercase">Noir.Direct</Link>
         <div className="text-[10px] uppercase tracking-[1em] font-black italic">Scene_004</div>
      </nav>

      {/* Cinematic Main Section */}
      <main className="relative z-10">
         
         {/* Chapter 1: The Descent */}
         <section className="h-screen flex items-center justify-center p-12 relative overflow-hidden">
            <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
               <Image 
                 src="/templates/brutalist_staircase.png" 
                 alt="Noir Scene 1" 
                 fill 
                 className="object-cover grayscale contrast-150 brightness-50" 
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
            </motion.div>
            <div className="relative z-10 text-center max-w-5xl">
               <motion.h1 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 2 }}
                 className="text-[15vw] font-black uppercase italic leading-[0.8] mb-12 tracking-tighter"
               >
                  The <br /> Shadow.
               </motion.h1>
               <p className="text-xs uppercase tracking-[1em] opacity-40 italic font-black">Memory #448 / Fragmented</p>
            </div>
         </section>

         {/* Chapter 2: Echoes */}
         <section className="h-[200vh] flex flex-col items-center justify-center pb-64 px-12 relative">
            <div className="max-w-4xl w-full">
               <motion.div 
                 initial={{ opacity: 0, x: -100 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1 }}
                 className="mb-64"
               >
                  <h2 className="text-8xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12 italic">Missing <br /> Link.</h2>
                  <p className="text-2xl font-light opacity-60 leading-relaxed uppercase tracking-widest max-w-xl">
                     A digital reconstruction of a place that never existed. 
                     Searching for the signal in the static noise of time.
                  </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: 100 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1 }}
                 className="text-right flex flex-col items-end"
               >
                  <div className="relative w-full aspect-video border border-white/10 overflow-hidden mb-12">
                     <Image 
                        src="/templates/agency_hero.png" 
                        alt="Noir Scene 2" 
                        fill 
                        className="object-cover grayscale contrast-200 brightness-75 rotate-180" 
                      />
                  </div>
                  <h2 className="text-8xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12 italic">Cold <br /> Signal.</h2>
                  <p className="text-2xl font-light opacity-60 leading-relaxed uppercase tracking-widest max-w-xl">
                     Connection established at 04:00. <br />
                     The void stares back with calculated indifference.
                  </p>
               </motion.div>
            </div>
         </section>

         {/* Chapter 3: Static */}
         <section className="h-screen flex flex-col items-center justify-center bg-[#111]">
            <motion.h2 
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 0.1, repeat: Infinity }}
               className="text-[30vw] font-black uppercase italic tracking-tighter leading-none opacity-5 select-none"
            >
               EXIT
            </motion.h2>
            <button className="px-12 py-6 bg-white text-black font-black uppercase italic text-xs tracking-[1em] hover:scale-110 transition-transform">
               End Film
            </button>
         </section>

      </main>

      {/* Camera HUD Indicator */}
      <div className="fixed bottom-12 left-12 z-50 flex items-center gap-6 mix-blend-difference pointer-events-none uppercase font-black text-[10px]">
         <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse" />
         <span className="tracking-widest">REC [00:44:12]</span>
         <span className="opacity-40 italic">ISO 1600 / 24FPS</span>
      </div>
    </div>
  );
}
