"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const FRAGMENTS = [
  "0x74_68_65_20_76_6f_69_64",
  "SYST_ERROR: NULL",
  "MAP_V0.89",
  "NODE_ACTIVE"
];

export default function TechMatrixTypography() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="premium-theme bg-black text-[#00ff41] h-screen w-full overflow-hidden relative selection:bg-[#00ff41] selection:text-black font-mono" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      
      {/* Background Matrix Asset */}
      <div className="absolute inset-0 z-0 opacity-20">
         <Image 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" 
            alt="Circuit" 
            fill 
            className="object-cover grayscale contrast-200" 
         />
         <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#00ff41]/20">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-[#00ff41]">Matrix.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Frequency_Node: 44.2Hz</div>
      </nav>

      {/* Main Matrix Typography */}
      <main className="h-full w-full flex flex-col items-center justify-center p-12 relative z-10">
         
         <div className="relative group">
            <motion.h1 
               animate={{ 
                  skewX: hovered ? [0, 5, -5, 0] : 0,
                  filter: hovered ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)"
               }}
               transition={{ duration: 0.2, repeat: hovered ? Infinity : 0 }}
               className="text-[15vw] font-black uppercase italic tracking-tighter leading-none text-white transition-colors group-hover:text-[#00ff41]"
            >
               SYSTEM. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #00ff41' }}>VOID.</span>
            </motion.h1>

            {/* Hover Floating Fragments */}
            {FRAGMENTS.map((text, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                     opacity: hovered ? 0.6 : 0,
                     x: hovered ? (Math.random() * 400 - 200) : 0,
                     y: hovered ? (Math.random() * 400 - 200) : 0,
                  }}
                  className="absolute pointer-events-none text-[8px] font-black uppercase tracking-widest bg-black/80 px-4 py-1 border border-[#00ff41]/20"
               >
                  {text}
               </motion.div>
            ))}
         </div>

         {/* Technical Footer Label */}
         <div className="mt-24 text-center max-w-lg">
            <span className="text-[10px] uppercase tracking-[1.5em] font-black italic mb-8 block opacity-40">Advanced Neural Mapping Interface</span>
            <p className="text-[8px] uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black">
               Executing procedural deconstruction of symbolic logic within the digital substrate.
            </p>
         </div>

      </main>

      {/* Numerical Sidebar HUD */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-20 font-mono text-[8px] font-black uppercase tracking-[0.5em] vertical-text">
         <span>89.00.41.FF</span>
         <div className="w-[1px] h-32 bg-[#00ff41]" />
         <span>DATA_STREAM</span>
      </div>

      <style jsx>{`
         .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
         }
      `}</style>

    </div>
  );
}
