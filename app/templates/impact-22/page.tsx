"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, title: "ALPHA", img: "/templates/tech_noir.png", cat: "CYBER" },
  { id: 2, title: "BETA", img: "/templates/editorial_lux.png", cat: "ELITE" },
  { id: 3, title: "GAMMA", img: "/templates/portal_frame.png", cat: "PORTAL" },
];

export default function ScreenSplitCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % SLIDES.length);

  return (
    <div className="premium-theme bg-[#050510] text-white h-screen w-full overflow-hidden relative">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
         <Link href="/" className="text-xl font-black italic tracking-tighter uppercase pointer-events-auto">Split.OS</Link>
         <div className="flex gap-4 items-center opacity-40">
            <span className="text-[10px] uppercase font-black tracking-widest italic">Node Selection</span>
         </div>
      </nav>

      <main className="h-full w-full flex relative">
         
         {/* Split Columns */}
         <AnimatePresence mode="wait">
            <div key={index} className="flex w-full h-full">
               
               {/* Left Column: Image (Slides Up) */}
               <motion.div 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "-100%" }}
                 transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                 className="flex-1 relative h-full bg-[#111] overflow-hidden"
               >
                  <Image 
                    src={SLIDES[index].img} 
                    alt="Split 1" 
                    fill 
                    className="object-cover brightness-50 contrast-125 saturate-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
               </motion.div>

               {/* Center Column: Text Content (Slides Down) */}
               <motion.div 
                 initial={{ y: "-100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%" }}
                 transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                 className="flex-1 relative h-full bg-black flex flex-col items-center justify-center p-12 text-center"
               >
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] uppercase tracking-[1em] opacity-40 mb-8 font-black"
                  >
                     {SLIDES[index].cat}
                  </motion.span>
                  <h2 className="text-[12vw] font-black uppercase italic leading-none mb-12 tracking-tighter">
                     {SLIDES[index].title}
                  </h2>
                  <button 
                    onClick={next}
                    className="px-12 py-6 border border-white/20 uppercase text-xs tracking-[0.5em] font-black hover:bg-white hover:text-black transition-all"
                  >
                     Switch Sequence
                  </button>
               </motion.div>

               {/* Right Column: Inverted Image (Slides Up) */}
               <motion.div 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "-100%" }}
                 transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                 className="flex-1 relative h-full bg-[#111] overflow-hidden"
               >
                  <Image 
                    src={SLIDES[index].img} 
                    alt="Split 2" 
                    fill 
                    className="object-cover brightness-150 grayscale invert" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
               </motion.div>

            </div>
         </AnimatePresence>

      </main>

      {/* Numerical Footer */}
      <footer className="fixed bottom-12 left-12 right-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="flex gap-4 items-baseline">
            <span className="text-4xl font-black">{index + 1}</span>
            <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">/ 03</span>
         </div>
         <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20">
            System Synchronization: 99.4%
         </div>
      </footer>
    </div>
  );
}
