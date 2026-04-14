"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const DISHES = [
  { id: 1, name: "ORCHID_VALLEY", price: "$42", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, name: "CARBON_ROOT", price: "$38", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" },
];

export default function FoodLiquidMenuSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex(prev => (prev + 1) % DISHES.length);

  return (
    <div className="premium-theme bg-white text-black h-screen w-full overflow-hidden relative selection:bg-rose-500 font-serif" onClick={next}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase font-serif">Aevia.Kitchen</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 font-mono">Taste_Unit_v.074</div>
      </nav>

      <AnimatePresence mode="wait">
         <motion.div 
            key={index}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex items-center justify-center bg-neutral-100"
         >
            <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
               
               {/* Left: Text Content */}
               <div className="flex flex-col justify-center p-12 md:p-24 order-2 md:order-1">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs uppercase tracking-[1em] font-black italic text-rose-600 mb-8 block font-mono"
                  >
                     Protocol_Sequence_0{index}
                  </motion.span>
                  <motion.h2 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none mb-12"
                  >
                     {DISHES[index].name}.
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-5xl font-black italic opacity-30 mb-12"
                  >
                     {DISHES[index].price}
                  </motion.div>
                  <button className="w-fit px-12 py-6 border-2 border-black text-black font-black uppercase text-xs tracking-[1em] italic hover:bg-black hover:text-white transition-all">Request Course</button>
               </div>

               {/* Right: Immersive Image */}
               <div className="relative h-full w-full order-1 md:order-2">
                  <Image src={DISHES[index].img} alt={DISHES[index].name} fill className="object-cover contrast-110 saturate-[0.8]" />
                  <div className="absolute inset-0 bg-rose-500/5 mix-blend-overlay" />
               </div>

            </div>
         </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end opacity-20 text-[8px] font-black uppercase tracking-[1em] italic font-mono pointer-events-none">
         <span>Sensory_Calibration: STABLE</span>
         <span>0{index+1} / 0{DISHES.length}</span>
      </div>

    </div>
  );
}
