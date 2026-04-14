"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, title: "CORE", img: "/templates/tech_noir.png", color: "#f43f5e" },
  { id: 2, title: "EDGE", img: "/templates/editorial_lux.png", color: "#06b6d4" },
];

export default function VerticalSplitRevealSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % SLIDES.length);

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-white selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase pointer-events-auto">Split.Slider</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Phase_0x056</div>
      </nav>

      <main className="h-full w-full relative flex items-center justify-center cursor-pointer" onClick={next}>
         <AnimatePresence mode="wait">
            <div key={index} className="absolute inset-0 flex">
               
               {/* Left Panel - Slides UP */}
               <motion.div 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                  className="w-1/2 h-full relative overflow-hidden border-r border-white/10"
               >
                  <Image src={SLIDES[index].img} alt="Left" fill className="object-cover grayscale" />
                  <div className="absolute inset-0 bg-black/40" />
               </motion.div>

               {/* Right Panel - Slides DOWN */}
               <motion.div 
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                  className="w-1/2 h-full relative overflow-hidden"
               >
                  <Image src={SLIDES[index].img} alt="Right" fill className="object-cover grayscale" />
                  <div className="absolute inset-0 bg-black/40" />
               </motion.div>

               {/* Centered Content Wrap */}
               <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <motion.h2 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-[20vw] font-black uppercase italic tracking-tighter leading-none"
                    style={{ color: SLIDES[index].color }}
                  >
                     {SLIDES[index].title}
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    className="text-[10px] uppercase tracking-[2em] font-black italic mt-12"
                  >
                     Click to Synchronize
                  </motion.div>
               </div>

            </div>
         </AnimatePresence>
      </main>

      {/* Floating Indicators */}
      <div className="fixed right-12 bottom-12 flex items-center gap-12 font-mono text-[10px] font-black opacity-20">
         <span>0{index + 1}</span>
         <div className="w-12 h-[1px] bg-white" />
         <span>0{SLIDES.length}</span>
      </div>

    </div>
  );
}
