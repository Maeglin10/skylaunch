"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function Ecommerce360Rotate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 200 });
  
  // Map drag to rotation
  const rotateY = useTransform(springX, [-500, 500], [-180, 180]);
  const scale = useTransform(springX, [-500, 0, 500], [0.8, 1, 0.8]);

  return (
    <div className="premium-theme bg-white text-black h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono cursor-grab active:cursor-grabbing">
      
      {/* Background HUD Labels */}
      <div className="absolute inset-x-12 top-12 flex justify-between items-center opacity-40 pointer-events-none text-[8px] font-black uppercase tracking-[1em]">
         <span>System_Rotate_v75</span>
         <span>Drag_To_Inspect: ENABLED</span>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Spin.Unit</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Phase_0x075</div>
      </nav>

      <main 
         ref={containerRef}
         className="h-full w-full flex flex-col items-center justify-center p-12 overflow-hidden"
      >
         <motion.div 
            drag="x"
            dragConstraints={{ left: -500, right: 500 }}
            style={{ x, rotateY, scale }}
            className="relative w-full max-w-2xl aspect-square flex items-center justify-center perspective-2000"
         >
            <div className="absolute inset-0 border-[40px] border-black/5 rounded-full scale-110 pointer-events-none" />
            
            <motion.div className="relative w-full h-full">
               <Image 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
                  alt="360 Product" 
                  fill 
                  className="object-contain p-24 drop-shadow-2xl" 
               />
            </motion.div>
         </motion.div>

         {/* Product Info Overlay */}
         <div className="text-center mt-12 bg-white/80 p-6 backdrop-blur-xl rounded-2xl border border-black/5 max-w-sm pointer-events-none">
            <span className="text-[10px] uppercase font-black tracking-widest italic opacity-20 mb-4 block">Product_Ref_0x75</span>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-rose-600">IGNITE_X1.</h2>
            <div className="text-2xl font-black italic opacity-30 mt-4">$189.00</div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.4em] opacity-40 leading-relaxed italic">
               High-performance thermal mesh for maximum kinetic efficiency.
            </p>
         </div>

      </main>

      <footer className="fixed bottom-12 left-12 right-12 flex justify-between items-end opacity-20 text-[8px] font-black uppercase tracking-[1em] italic">
         <span>Atomic_Spin_Stable</span>
         <span>Aevia_Ecom_Systems &copy; 2026</span>
      </footer>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>

    </div>
  );
}
