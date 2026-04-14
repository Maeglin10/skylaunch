"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import "../premium.css";

const SHAPES = [
  "M 20 20 L 80 20 L 80 80 L 20 80 Z", // Square
  "M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10", // Circle
  "M 50 15 L 90 85 L 10 85 Z" // Triangle
];

export default function CreativeMorphingGrid() {
  return (
    <div className="premium-theme bg-[#0a0a0f] text-white min-h-screen selection:bg-rose-500 overflow-x-hidden font-mono p-12 lg:p-24">
      
      {/* Background HUD Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600">Morph.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Geometry_Node_v.098</div>
      </nav>

      <header className="pt-48 pb-24 text-center relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5 }}
         >
            <span className="text-[10px] uppercase tracking-[2em] font-black italic opacity-20 mb-8 block">Procedural Geometric Flux</span>
            <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Shape <br /> <span className="text-rose-600">Shifter.</span>
            </h1>
         </motion.div>
      </header>

      {/* Morphing Grid */}
      <main className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto relative z-10">
         {Array.from({ length: 16 }).map((_, i) => (
            <MorphBlock key={i} i={i} />
         ))}
      </main>

      <div className="py-64 text-center">
         <h2 className="text-[10vw] font-black uppercase italic tracking-tighter opacity-10 leading-none mb-12">Metamorphosis.</h2>
         <p className="max-w-2xl mx-auto text-xs font-black uppercase tracking-[0.6em] leading-relaxed italic opacity-40">
            Exploring the instability of geometric primitives within a fluid digital coordinate system.
         </p>
      </div>

    </div>
  );
}

function MorphBlock({ i }: { i: number }) {
  const [index, setIndex] = useState(0);

  return (
    <motion.div 
      onMouseEnter={() => setIndex((prev) => (prev + 1) % SHAPES.length)}
      className="aspect-square flex items-center justify-center bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] group hover:bg-rose-600/20 hover:border-rose-600 transition-colors duration-500 cursor-crosshair"
    >
       <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
          <motion.path 
             animate={{ d: SHAPES[index] }}
             transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
             fill="none"
             stroke="currentColor"
             strokeWidth="4"
             className="text-[#00ff9d] group-hover:text-rose-600 transition-colors"
          />
       </svg>
       
       <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-40 transition-opacity">
          <span className="text-[8px] font-black italic uppercase">Node_0x{i+94}</span>
       </div>
    </motion.div>
  );
}
