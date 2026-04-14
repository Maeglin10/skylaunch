"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, title: "LITHE", img: "/templates/editorial_lux.png", cat: "VOL_01" },
  { id: 2, title: "SILK", img: "/templates/tech_noir.png", cat: "VOL_02" },
  { id: 3, title: "GOLD", img: "/templates/portal_frame.png", cat: "VOL_03" },
];

export default function FashionFlipCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % SLIDES.length);

  return (
    <div className="premium-theme bg-white text-black h-screen w-full overflow-hidden relative perspective-[1500px]">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-opacity hover:opacity-100 opacity-20">
        <Link href="/" className="text-xl font-serif italic tracking-tighter uppercase">Flip.Studio</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic">Collection_26</div>
      </nav>

      <main className="h-full w-full flex items-center justify-center p-12">
         <AnimatePresence mode="wait">
            <motion.div 
               key={index}
               initial={{ rotateX: 90, opacity: 0 }}
               animate={{ rotateX: 0, opacity: 1 }}
               exit={{ rotateX: -90, opacity: 0 }}
               transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
               className="relative w-full max-w-4xl h-[70vh] group cursor-pointer"
               onClick={next}
            >
               {/* Large Decorative Text beneath */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic">
                  FLY
               </div>

               <div className="relative w-full h-full shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden rounded-[2rem] border-8 border-white">
                  <Image src={SLIDES[index].img} alt="Fashion Flip" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                     <motion.span 
                       initial={{ x: -20, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ delay: 0.3 }}
                       className="text-xs uppercase tracking-[0.8em] font-black italic mb-4 opacity-60"
                     >
                        {SLIDES[index].cat}
                     </motion.span>
                     <motion.h2 
                       initial={{ y: 50, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 0.4 }}
                       className="text-8xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] italic"
                     >
                        {SLIDES[index].title}
                     </motion.h2>
                  </div>
               </div>

               {/* Flip Helper Indicator */}
               <div className="absolute -bottom-8 right-12 text-[10px] uppercase font-black tracking-widest opacity-40 italic animate-bounce">
                  Next_Flip &darr;
               </div>
            </motion.div>
         </AnimatePresence>
      </main>

      {/* Floating Index */}
      <div className="fixed left-12 bottom-12 z-50 flex items-end gap-12 mix-blend-difference">
         <span className="text-[60px] font-black leading-none italic">{index + 1}</span>
         <div className="h-24 w-[1px] bg-black/10 relative">
            <motion.div 
               animate={{ top: `${(index / (SLIDES.length - 1)) * 100}%` }}
               className="absolute left-1/2 -translate-x-1/2 w-4 h-[2px] bg-black"
            />
         </div>
      </div>
    </div>
  );
}
