"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PortfolioCircularScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-[400vh] relative selection:bg-rose-500 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Orbit.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 italic">Portfolio_Sequence_v.068</div>
      </nav>

      {/* Main Spinning Stage */}
      <main className="sticky top-0 h-screen flex items-center justify-center p-12 overflow-hidden">
         
         {/* Circular Text (Rotating) */}
         <motion.div 
            style={{ rotate }}
            className="absolute w-[80vh] h-[80vh] flex items-center justify-center pointer-events-none"
         >
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
               <path
                  id="circlePath"
                  d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  fill="transparent"
               />
               <text className="text-[6px] font-black uppercase italic tracking-[1em]">
                  <textPath href="#circlePath">
                     Aevia Creative Systems &bull; Architectural Vision &bull; Digital Core &bull;
                  </textPath>
               </text>
            </svg>
         </motion.div>

         {/* Central Content */}
         <div className="relative z-10 flex flex-col items-center">
            <motion.div 
               style={{ scale }}
               className="relative w-[30vw] md:w-[40vw] lg:w-[25vw] aspect-square rounded-full overflow-hidden shadow-2xl elevation-24 border-8 border-white bg-neutral-100"
            >
               <Image src="/templates/agency_hero.png" alt="Project" fill className="object-cover grayscale" />
               <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay" />
            </motion.div>

            <div className="text-center mt-12 bg-white/80 p-6 backdrop-blur-xl rounded-2xl border border-black/5 max-w-sm">
               <span className="text-[10px] uppercase font-black tracking-widest italic opacity-20 mb-4 block font-mono">Project_Ref_0x442</span>
               <h2 className="text-5xl font-black uppercase italic tracking-tighter text-rose-600">LUMINA.</h2>
               <p className="mt-4 text-xs font-black uppercase tracking-[0.4em] opacity-40 leading-relaxed italic">
                  Curating the intersection of structural form and light density.
               </p>
            </div>
         </div>

      </main>

      {/* Side HUD Index */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 opacity-20 text-[10vw] font-black italic tracking-tighter opacity-5 select-none pointer-events-none leading-none">
         CURATED.
      </div>

    </div>
  );
}
