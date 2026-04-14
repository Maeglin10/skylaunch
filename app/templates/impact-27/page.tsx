"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, title: "CYBER_01", img: "/templates/tech_noir.png" },
  { id: 2, title: "LUX_02", img: "/templates/editorial_lux.png" },
  { id: 3, title: "ARCH_03", img: "/templates/brutalist_staircase.png" },
];

export default function ParallaxPerspectiveCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="premium-theme bg-[#050505] text-white h-screen w-full overflow-hidden relative perspective-[2000px]">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-opacity hover:opacity-100 opacity-30">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Perspective.OS</Link>
        <div className="flex gap-4 items-center">
            <span className="text-[10px] font-black uppercase opacity-20">Mode_3D</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black">{index + 1}</div>
        </div>
      </nav>

      {/* 3D Slide Stage */}
      <div className="relative h-full w-full flex items-center justify-center">
         <AnimatePresence mode="wait">
            <motion.div 
               key={index}
               initial={{ rotateY: 90, x: 1000, opacity: 0 }}
               animate={{ rotateY: 0, x: 0, opacity: 1 }}
               exit={{ rotateY: -90, x: -1000, opacity: 0 }}
               transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
               className="relative w-full max-w-5xl aspect-[16/9] shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
               <Image 
                 src={SLIDES[index].img} 
                 alt="3D Perspective Slide" 
                 fill 
                 className="object-cover rounded-3xl brightness-75 border border-white/10" 
               />
               
               <div className="absolute inset-0 flex flex-col justify-end p-24 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl">
                  <motion.h2 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-4"
                  >
                     {SLIDES[index].title}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-8"
                  >
                     <button className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">Explore Node</button>
                  </motion.div>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Floating Side Info */}
      <div className="fixed left-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 font-mono text-[10px] uppercase font-black opacity-20">
         <div className="rotate-[-90deg]">X_AXIS: {index * 120}</div>
         <div className="rotate-[-90deg]">Z_DEPTH: -400</div>
      </div>

      {/* Cinematic Controls */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex gap-24 items-center z-50">
         <button onClick={prev} className="group relative overflow-hidden p-4">
            <span className="text-xs uppercase font-black tracking-widest italic group-hover:text-cyan-400 transition-colors">&larr; Previous</span>
         </button>
         <div className="h-2 w-48 bg-white/10 relative overflow-hidden">
            <motion.div 
               animate={{ x: `${(index / (SLIDES.length - 1)) * 100}%` }}
               className="absolute top-0 left-0 w-4 h-full bg-white shadow-[0_0_15px_white]"
            />
         </div>
         <button onClick={next} className="group relative overflow-hidden p-4">
            <span className="text-xs uppercase font-black tracking-widest italic group-hover:text-cyan-400 transition-colors">Next &rarr;</span>
         </button>
      </div>

      {/* Environment Dust / Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0">
         <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
}
