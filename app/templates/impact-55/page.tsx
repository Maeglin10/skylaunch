"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../premium.css";

export default function MousetrapElasticCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Elastic Springs
  const springX = useSpring(mouseX, { damping: 10, stiffness: 50 });
  const springY = useSpring(mouseY, { damping: 10, stiffness: 50 });

  const lagX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const lagY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: Math.floor(e.clientX), y: Math.floor(e.clientY) });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="premium-theme bg-white text-black h-screen w-full overflow-hidden relative cursor-none select-none">
      
      {/* Background HUD Labels */}
      <div className="absolute inset-x-12 top-12 flex justify-between items-center opacity-20 pointer-events-none text-[8px] font-black uppercase tracking-[1em]">
         <span>System_Capture_v55</span>
         <span>Elasticity: 100%</span>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Elastic.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Lag_Processing_Unit</div>
      </nav>

      {/* Main Elastic Typography */}
      <main className="h-full w-full flex flex-col items-center justify-center p-12 overflow-hidden pointer-events-none">
         
         {/* Main Lagging Title */}
         <motion.h1 
            style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
            className="fixed top-0 left-0 text-[20vw] font-black uppercase italic tracking-tighter leading-none whitespace-nowrap opacity-10"
         >
            TRAPPED.
         </motion.h1>

         {/* Second Shadow Layer */}
         <motion.h1 
            style={{ x: lagX, y: lagY, translateX: '-50%', translateY: '-50%' }}
            className="fixed top-0 left-0 text-[20vw] font-black uppercase italic tracking-tighter leading-none whitespace-nowrap text-rose-600 opacity-20"
         >
            TRAPPED.
         </motion.h1>

         {/* Minimal Center Info */}
         <div className="relative z-10 text-center">
            <span className="text-xs uppercase tracking-[0.5em] font-black opacity-20 mb-8 block font-mono">Input / Physics / Bounce</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-12">
               Physics of <br /> Interaction.
            </h2>
            <div className="w-1 px-12 h-24 bg-black/10 mx-auto" />
         </div>

      </main>

      {/* Physical Cursor Replacement */}
      <motion.div 
         style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
         className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-black z-[100] flex items-center justify-center pointer-events-none"
      >
         <div className="w-1 h-1 bg-black rounded-full" />
      </motion.div>

      {/* Numerical Data Bottom */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end opacity-20 font-mono text-[8px] font-black uppercase tracking-widest pointer-events-none">
         <div className="flex flex-col gap-1">
            <div>X_Coord: {coords.x}</div>
            <div>Y_Coord: {coords.y}</div>
         </div>
         <div className="text-right italic">Aevia Human_Interface_Guidelines &copy; 2026</div>
      </div>

    </div>
  );
}
