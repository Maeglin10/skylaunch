"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1500", name: "COBALT_SYNC" },
  { id: 2, img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1500", name: "AMBER_NODE" },
];

export default function LiquidDisplacementSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex(prev => (prev + 1) % SLIDES.length);

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono" onClick={next}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/20 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600">Flux.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Liquid_Mapping_v.093</div>
      </nav>

      <AnimatePresence mode="wait">
         <motion.div 
            key={index}
            initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", filter: "blur(20px)", scale: 1.1 }}
            animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", filter: "blur(0px)", scale: 1 }}
            exit={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", filter: "blur(40px)", scale: 0.9 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-0 bg-neutral-900"
         >
            <Image src={SLIDES[index].img} alt="Flux" fill className="object-cover opacity-60 contrast-125" />
            <div className="absolute inset-0 bg-rose-600/5 mix-blend-overlay" />
         </motion.div>
      </AnimatePresence>

      {/* Static Content Overlay */}
      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center p-12 text-center pointer-events-none">
         <AnimatePresence mode="wait">
            <motion.div
               key={index}
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -50, opacity: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
            >
               <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40">Chromatic Displacement Active</span>
               <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                  {SLIDES[index].name}.
               </h1>
            </motion.div>
         </AnimatePresence>

         <button className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[1em] italic hover:scale-110 transition-transform pointer-events-auto">Switch Vector</button>
      </main>

      {/* Floating Status Specs */}
      <div className="fixed left-12 bottom-12 right-12 flex justify-between items-end opacity-20 text-[8px] font-black uppercase tracking-[1em] italic">
         <span>Pressure: STABLE</span>
         <span>Aevia_Flux_Unit &copy; 2026</span>
      </div>

    </div>
  );
}
