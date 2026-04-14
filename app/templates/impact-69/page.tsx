"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { 
    id: 1, 
    title: "SUMMIT", 
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000", 
    sub: "Reach the zenith of structural design." 
  },
  { 
    id: 2, 
    title: "ABYSS", 
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000", 
    sub: "Deep dive into minimalist logic." 
  },
];

export default function ParallaxDepthZoomSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((p) => (p + 1) % SLIDES.length);

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 cursor-pointer" onClick={next}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase pointer-events-auto">Depth.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Phase_0x069</div>
      </nav>

      <AnimatePresence mode="wait">
         <motion.div 
            key={index}
            className="absolute inset-0 flex items-center justify-center"
         >
            {/* Background Zooming Layer */}
            <motion.div 
               initial={{ scale: 1.5, opacity: 0 }}
               animate={{ scale: 1.1, opacity: 0.6 }}
               exit={{ scale: 1.8, opacity: 0 }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="absolute inset-0"
            >
               <Image 
                  src={SLIDES[index].img} 
                  alt="Depth BG" 
                  fill 
                  className="object-cover contrast-125 saturate-0" 
               />
            </motion.div>

            {/* Foreground Content */}
            <div className="relative z-10 text-center px-12">
               <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs uppercase tracking-[1.5em] font-black italic mb-8 block opacity-40 text-rose-600"
               >
                  Atmospheric Entry
               </motion.span>
               <motion.h2 
                  initial={{ scale: 0.8, opacity: 0, letterSpacing: "1em" }}
                  animate={{ scale: 1, opacity: 1, letterSpacing: "0em" }}
                  transition={{ delay: 0.7, duration: 1.2 }}
                  className="text-8xl md:text-[18vw] font-black uppercase italic tracking-tighter leading-none mb-12 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
               >
                  {SLIDES[index].title}
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.5 }}
                  className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic font-black"
               >
                  {SLIDES[index].sub}
               </motion.p>
            </div>

            {/* Simulated HUD scanner */}
            <motion.div 
               animate={{ x: ['-20%', '120%'], opacity: [0, 0.2, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent mix-blend-overlay"
            />
         </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end opacity-20 text-[8px] font-black uppercase tracking-[1em] italic">
         <span>Time_Dilation: ACTIVE</span>
         <span>0{index+1} / 0{SLIDES.length}</span>
      </div>

    </div>
  );
}
