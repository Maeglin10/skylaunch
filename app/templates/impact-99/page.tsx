"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../premium.css";

export default function TechBinaryRain() {
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const cols = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: i * 2.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      chars: Array.from({ length: 20 }).map(() => (Math.random() > 0.5 ? "1" : "0"))
    }));
    setColumns(cols);
  }, []);

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-white selection:text-black font-mono">
      
      {/* Binary Rain Layer */}
      <div className="absolute inset-0 z-0 opacity-20">
         {columns.map((col) => (
            <motion.div 
               key={col.id}
               initial={{ y: "-100%" }}
               animate={{ y: "100%" }}
               transition={{ 
                  duration: col.duration, 
                  repeat: Infinity, 
                  delay: col.delay,
                  ease: "linear"
               }}
               className="absolute text-[10px] leading-none whitespace-pre flex flex-col items-center"
               style={{ left: `${col.x}%` }}
            >
               {col.chars.map((char: string, i: number) => (
                  <span key={i} className={i === 0 ? "text-white opacity-100" : "opacity-40"}>{char}</span>
               ))}
            </motion.div>
         ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Binary.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">System_Output_v.099</div>
      </nav>

      {/* Main Impact Typography */}
      <main className="h-full w-full flex flex-col items-center justify-center p-12 relative z-10 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
         >
            <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40">Absolute Symbolic Saturation</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Logic <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Flow.</span>
            </h1>
            <p className="max-w-md mx-auto text-[8px] uppercase tracking-[0.6em] leading-relaxed italic opacity-40 font-black">
               Visualizing the fundamental stream of truth within the architecture of the void.
            </p>
         </motion.div>
      </main>

      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[8vw] font-black italic uppercase leading-none select-none">
         BINARY_SATURATION_v99
      </div>

    </div>
  );
}
