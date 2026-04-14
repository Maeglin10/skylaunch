"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../premium.css";

const TRAIL_COUNT = 15;

export default function CreativeLiquidCursor() {
  const [points, setPoints] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPoints((prev) => {
        const newPoints = [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev];
        return newPoints.slice(0, TRAIL_COUNT);
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="premium-theme bg-[#0a0a0f] text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Lava.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Kinetic_Fluid_Mapping</div>
      </nav>

      <main className="h-full w-full flex flex-col items-center justify-center p-12 overflow-hidden relative">
         
         <div className="relative z-10 text-center pointer-events-none">
            <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-20 text-rose-500">Organic_Digital_Output</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Liquid <br /> <span className="text-rose-600">Trace.</span>
            </h1>
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black">
               Visualizing the persistence of interaction through simulated surface tension.
            </p>
         </div>

         {/* Liquid Trail Implementation */}
         <div style={{ filter: 'url(#liquid-goo)' }} className="absolute inset-0 z-0 pointer-events-none">
            <AnimatePresence>
               {points.map((p, i) => (
                  <motion.div 
                     key={p.id}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1.5 - (i * 0.1), opacity: 1 }}
                     exit={{ scale: 0, opacity: 0 }}
                     className="absolute w-24 h-24 bg-rose-600 rounded-full"
                     style={{ 
                        left: p.x - 48, 
                        top: p.y - 48,
                        zIndex: TRAIL_COUNT - i 
                     }}
                  />
               ))}
            </AnimatePresence>
         </div>

      </main>

      {/* SVG Liquid Filter definitions */}
      <svg className="hidden">
         <defs>
            <filter id="liquid-goo">
               <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
               <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
               <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
         </defs>
      </svg>

      {/* Interaction Hint */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end opacity-20 text-[8px] font-black uppercase tracking-[1em] italic">
         <span>Fluid_Integrity: 100%</span>
         <span>Aevia_Creative_Lab &copy; 2026</span>
      </div>

    </div>
  );
}
