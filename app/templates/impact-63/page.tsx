"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function LuxuryProductOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Rotation and scale based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-[400vh] relative selection:bg-rose-500 font-serif overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-serif italic tracking-tighter uppercase">Orbit.Unit</Link>
        <div className="flex gap-12 text-[10px] uppercase font-black italic opacity-40 items-baseline font-mono tracking-widest">
            <span>Mechanical_Precision: ACTIVE</span>
        </div>
      </nav>

      {/* Persistent Background Text */}
      <div className="fixed inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
         <h1 className="text-[40vw] font-black italic tracking-tighter uppercase">TIME.</h1>
      </div>

      {/* Orbit Stage */}
      <main className="sticky top-0 h-screen flex items-center justify-center p-12">
         
         <motion.div 
            style={{ rotate, scale, opacity }}
            className="relative w-full max-w-4xl aspect-square flex items-center justify-center"
         >
            <div className="absolute inset-0 border border-black/[0.03] rounded-full scale-110" />
            <div className="absolute inset-0 border border-black/[0.03] rounded-full scale-90" />
            
            <motion.div className="relative w-full h-full">
               <Image 
                  src="/templates/tech_noir.png" 
                  alt="Luxury Item" 
                  fill 
                  className="object-contain p-24 contrast-110 saturate-0" 
               />
            </motion.div>

            {/* Orbiting data points */}
            {[0, 90, 180, 270].map((angle, i) => (
               <div 
                  key={i}
                  className="absolute text-[8px] font-mono font-bold uppercase tracking-widest opacity-20"
                  style={{ 
                    transform: `rotate(${angle}deg) translateY(-40vh)`
                  }}
               >
                  REF_UNIT_0x0{i+63}
               </div>
            ))}
         </motion.div>

         {/* Centered Descriptive Overlay */}
         <div className="absolute inset-x-12 bottom-24 flex flex-col items-center text-center">
            <motion.div
               style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
               className="max-w-md"
            >
               <span className="text-xs uppercase tracking-[0.8em] font-black italic opacity-20 mb-8 block">Series 0xFF_A</span>
               <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-12">
                  Anatomy of <br /> Perfection.
               </h2>
               <div className="w-1 px-12 h-24 bg-black/10 mx-auto" />
            </motion.div>
         </div>

      </main>

      {/* Floating Price Indicator */}
      <div className="fixed left-12 bottom-12 z-50 mix-blend-difference flex flex-col gap-2 text-white">
         <div className="text-5xl font-black italic leading-none">$24,400</div>
         <div className="text-[8px] uppercase font-black tracking-widest opacity-40 italic">Limited Production Run</div>
      </div>

    </div>
  );
}
