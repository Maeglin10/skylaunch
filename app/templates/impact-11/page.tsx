"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, title: "AETHER", subtitle: "NEURAL VISUALS", img: "/templates/tech_noir.png", color: "#ff2d55" },
  { id: 2, title: "MAVELLE", subtitle: "TIMELESS GOLD", img: "/templates/editorial_lux.png", color: "#d4b483" },
  { id: 3, title: "PORTAL", subtitle: "WORLD BRIDGE", img: "/templates/portal_frame.png", color: "#22d3ee" },
];

export default function VerticalSliderTemplate() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative">
      
      {/* HUD Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-bold tracking-[0.5em] uppercase">Slider.OS</Link>
        <div className="flex gap-4 items-center">
           <span className="text-[10px] opacity-40 font-black">PROGRESS</span>
           <div className="w-32 h-[1px] bg-white/20">
              <motion.div 
                animate={{ width: `${((index + 1) / SLIDES.length) * 100}%` }}
                className="h-full bg-white shadow-[0_0_10px_white]"
              />
           </div>
        </div>
      </nav>

      {/* Side Nav Controls */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
         {SLIDES.map((_, i) => (
           <button 
             key={i} 
             onClick={() => setIndex(i)}
             className={`w-3 h-3 rounded-full border transition-all ${i === index ? 'bg-white scale-150' : 'border-white/20'}`}
           />
         ))}
      </div>

      {/* Main Slide Content */}
      <div className="relative h-full w-full">
         <AnimatePresence mode="wait">
            <motion.div 
               key={index}
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -100 }}
               transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
               className="absolute inset-0 flex flex-col items-center justify-center p-12"
            >
               {/* Background Glow */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                 transition={{ duration: 5, repeat: Infinity }}
                 className="absolute inset-0 -z-10 blur-[150px]"
                 style={{ backgroundColor: SLIDES[index].color }}
               />

               <div className="relative w-full max-w-7xl grid grid-cols-12 gap-12 items-center">
                  <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
                     <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs uppercase tracking-[0.8em] font-black opacity-40 mb-4 block"
                     >
                        {SLIDES[index].subtitle}
                     </motion.span>
                     <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12"
                     >
                        {SLIDES[index].title}
                     </motion.h1>
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-12 text-[10px] uppercase font-black"
                     >
                        <button className="px-8 py-4 bg-white text-black hover:bg-transparent hover:text-white border border-white transition-all">View Project</button>
                        <button className="px-8 py-4 border border-white/20 hover:border-white transition-all">Next Case</button>
                     </motion.div>
                  </div>

                  <div className="col-span-12 lg:col-span-6 relative aspect-square order-1 lg:order-2">
                     <motion.div
                       initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                       animate={{ scale: 1, rotate: 0, opacity: 1 }}
                       transition={{ delay: 0.2, duration: 1 }}
                       className="w-full h-full relative"
                     >
                        <Image
                          src={SLIDES[index].img}
                          alt={SLIDES[index].title}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                     </motion.div>
                  </div>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Vertical Navigation Info */}
      <div className="absolute bottom-12 left-12 z-50 flex items-end gap-12 mix-blend-difference">
         <div className="flex flex-col">
            <span className="text-[40px] font-black leading-none">{index + 1}</span>
            <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">of 03</span>
         </div>
         <div className="h-24 w-[1px] bg-white/20 relative">
            <motion.div 
               animate={{ top: `${(index / (SLIDES.length - 1)) * 100}%` }}
               className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
            />
         </div>
         <div className="flex flex-col gap-4">
            <button onClick={prevSlide} className="text-xs uppercase hover:opacity-100 opacity-40 font-black tracking-widest italic">&uarr; Back</button>
            <button onClick={nextSlide} className="text-xs uppercase hover:opacity-100 opacity-40 font-black tracking-widest italic">&darr; Next</button>
         </div>
      </div>
    </div>
  );
}
