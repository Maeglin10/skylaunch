"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, title: "ALPHA", img: "/templates/tech_noir.png" },
  { id: 2, title: "BRAVO", img: "/templates/editorial_lux.png" },
  { id: 3, title: "CHARLIE", img: "/templates/brutalist_staircase.png" },
];

export default function TiltShiftCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="premium-theme bg-[#030303] text-white h-screen w-full overflow-hidden relative perspective-[1500px]">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-opacity hover:opacity-100 opacity-20">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Tilt.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic">Archive / 050</div>
      </nav>

      {/* Tilt Stage */}
      <main className="h-full w-full flex items-center justify-center p-12">
         <AnimatePresence mode="wait">
            <div className="relative w-full max-w-5xl aspect-video preserve-3d">
               
               {/* Left (Previous) Hint */}
               <motion.div 
                  initial={{ opacity: 0, x: -100, rotateY: 45 }}
                  animate={{ opacity: 0.2, x: -600, rotateY: 45 }}
                  className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
               >
                  <Image src={SLIDES[(index - 1 + SLIDES.length) % SLIDES.length].img} alt="prev" fill className="object-cover grayscale rounded-3xl" />
               </motion.div>

               {/* Current Slide */}
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                 animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                 exit={{ opacity: 0, rotateY: -90, scale: 1.2 }}
                 transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                 className="relative w-full h-full shadow-[0_50px_100px_rgba(0,0,0,1)] rounded-3xl overflow-hidden border border-white/10"
               >
                  <Image src={SLIDES[index].img} alt="tilt slide" fill className="object-cover brightness-75 contrast-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute inset-0 p-12 lg:p-24 flex flex-col justify-end">
                     <motion.h2 
                       initial={{ y: 50, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 0.4 }}
                       className="text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-8"
                     >
                        {SLIDES[index].title}
                     </motion.h2>
                  </div>
               </motion.div>

               {/* Right (Next) Hint */}
               <motion.div 
                  initial={{ opacity: 0, x: 100, rotateY: -45 }}
                  animate={{ opacity: 0.2, x: 600, rotateY: -45 }}
                  className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
               >
                  <Image src={SLIDES[(index + 1) % SLIDES.length].img} alt="next" fill className="object-cover grayscale rounded-3xl" />
               </motion.div>

            </div>
         </AnimatePresence>
      </main>

      {/* Interaction Controls */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex gap-12 items-center z-50">
         <button onClick={prev} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">&larr;</button>
         <div className="w-48 h-[1px] bg-white/10 relative">
            <motion.div 
               animate={{ x: `${(index / (SLIDES.length - 1)) * 100}%` }}
               className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-[2px] bg-white"
            />
         </div>
         <button onClick={next} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">&rarr;</button>
      </div>

    </div>
  );
}
