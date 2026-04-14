"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function MinimalLightStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], ["brightness(1)", "brightness(0.3)", "brightness(1.5)"]);
  const contrast = useTransform(scrollYProgress, [0, 0.5, 1], ["contrast(1)", "contrast(2)", "contrast(1.2)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-[300vh] relative selection:bg-rose-500 font-mono">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Light.Ed</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Study_ID: 0x95</div>
      </nav>

      <main className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-12 overflow-hidden">
         
         <div className="relative w-full max-w-6xl aspect-video rounded-[5rem] overflow-hidden shadow-2xl elevation-24 border-[24px] border-white">
            <motion.div style={{ filter: brightness, scale }} className="w-full h-full relative">
               <Image 
                  src="https://images.unsplash.com/photo-1449156001533-cb39c7314260?auto=format&fit=crop&q=80&w=2000" 
                  alt="Architecture" 
                  fill 
                  className="object-cover grayscale" 
               />
            </motion.div>
            
            {/* Dynamic Label Overlay */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end mix-blend-difference pointer-events-none">
               <span className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 mb-4 text-white">Lumen_Calibration_Active</span>
               <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none text-white">
                  Shadow <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Volume.</span>
               </h2>
            </div>
         </div>

         {/* Editorial Footnote */}
         <div className="mt-24 text-center max-w-lg">
            <motion.p 
               style={{ opacity: scrollYProgress }}
               className="text-xs font-black uppercase tracking-[0.6em] leading-relaxed italic opacity-40"
            >
               Exploring the temporal instability of structural form under shifting chromatic exposures.
            </motion.p>
         </div>

      </main>

      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[8vw] font-black italic uppercase leading-none select-none">
         EXPOSURE_SYNC_v95
      </div>

    </div>
  );
}
