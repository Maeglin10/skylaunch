"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../premium.css";

const WORDS = ["VOXEL", "PULSE", "WAVE", "NODE"];

export default function ParticleWaveTypography() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="premium-theme bg-[#05050a] text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background Matrix Particle (Pseudo-animated) */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
         <div className="grid grid-cols-20 h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
               <motion.div 
                  key={i}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                  className="w-1 h-1 bg-white rounded-full mx-auto"
               />
            ))}
         </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600">Particle.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Molecular_Mapping_Unit_v.078</div>
      </nav>

      {/* Main Transitions Stage */}
      <main className="h-full w-full flex flex-col items-center justify-center p-12 overflow-hidden relative">
         
         <div className="relative">
            <AnimatePresence mode="popLayout">
               <motion.div 
                  key={index}
                  className="flex gap-4"
               >
                  {WORDS[index].split("").map((char, i) => (
                     <motion.h1 
                        key={`${index}-${i}`}
                        initial={{ y: 100, opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                        animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ 
                           y: -200, 
                           opacity: 0, 
                           scale: 2, 
                           filter: "blur(40px)",
                           rotateZ: Math.random() * 20 - 10
                        }}
                        transition={{ 
                           duration: 1.2, 
                           ease: [0.33, 1, 0.68, 1],
                           delay: i * 0.05
                        }}
                        className="text-[15vw] font-black uppercase italic tracking-tighter leading-none text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                     >
                        {char}
                     </motion.h1>
                  ))}
               </motion.div>
            </AnimatePresence>
         </div>

         {/* Center Label */}
         <div className="mt-24 text-center">
            <span className="text-xs uppercase tracking-[0.8em] font-black italic opacity-20 mb-8 block mb-12">Cognitive Atomic Reconstruction</span>
            <p className="max-w-md mx-auto text-[10px] uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black">
               Visualizing the dissolution of structural form into raw data particles.
            </p>
         </div>

      </main>

      {/* Floating Status Specs */}
      <div className="fixed left-12 bottom-12 right-12 flex justify-between items-end opacity-20 text-[8px] font-black uppercase tracking-[1em] italic">
         <span>Reconstruction: 98.4%</span>
         <span>Aevia_Creative_Lab &copy; 2026</span>
      </div>

    </div>
  );
}
