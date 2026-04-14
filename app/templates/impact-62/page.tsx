"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../premium.css";

const WORDS = ["LIQUID", "FLOW", "MELT", "SYNC"];

export default function LiquidLetterTransition() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="premium-theme bg-[#0a0a0f] text-white h-screen w-full overflow-hidden relative selection:bg-rose-500">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Liquid.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Fluid_Processing_Unit</div>
      </nav>

      {/* Main Transitions Stage */}
      <main className="h-full w-full flex flex-col items-center justify-center p-12 overflow-hidden relative">
         
         <div style={{ filter: 'url(#gooey)' }} className="relative">
            <AnimatePresence mode="wait">
               <motion.h1 
                  key={index}
                  initial={{ y: 100, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -100, opacity: 0, scale: 1.2 }}
                  transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                  className="text-[20vw] font-black uppercase italic tracking-tighter leading-none text-rose-600"
               >
                  {WORDS[index]}
               </motion.h1>
            </AnimatePresence>
         </div>

         {/* Center Label */}
         <div className="mt-24 text-center">
            <span className="text-xs uppercase tracking-[0.8em] font-black italic opacity-20 mb-8 block">Organic Digital Synthesis</span>
            <p className="max-w-md mx-auto text-[10px] uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black">
               Visualizing the atomic fluidity of data through simulated surface tension.
            </p>
         </div>

      </main>

      {/* SVG Gooey Filter definitions */}
      <svg className="hidden">
         <defs>
            <filter id="gooey">
               <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
               <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
               <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
         </defs>
      </svg>

      {/* Interaction Controls Hint */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end opacity-20 text-[8px] font-black uppercase tracking-[1em] italic">
         <span>Fluid_Integrity: 100%</span>
         <span>Aevia_Creative_Lab &copy; 2026</span>
      </div>

    </div>
  );
}
