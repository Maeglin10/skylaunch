"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EditorialGlitchMagazine() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-theme bg-[#f5f5f5] text-black min-h-screen selection:bg-rose-500 overflow-x-hidden font-serif">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-end border-b border-black/10 bg-white/40 backdrop-blur-xl">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase font-serif">Glitch.Ed</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <span>Vol.090</span>
           <span>Fragmentation_Unit</span>
        </div>
      </nav>

      <main className="pt-48 pb-64 px-12 max-w-[1600px] mx-auto">
         <div className="grid grid-cols-12 gap-12 items-start">
            
            {/* Left: Huge Vertical Title */}
            <div className="col-span-12 lg:col-span-8 relative">
               <motion.h1 
                  animate={glitch ? { 
                     x: [0, -10, 10, -5, 0],
                     y: [0, 5, -5, 2, 0],
                     skewX: [0, 10, -10, 0],
                     filter: ["blur(0px)", "blur(10px)", "blur(0px)"]
                  } : {}}
                  className="text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12 -ml-4"
               >
                  STRUCT <br /> <span className="text-rose-600">VOX.</span>
               </motion.h1>
               
               <div className="aspect-video relative overflow-hidden rounded-[4rem] group shadow-2xl elevation-24 mb-12 border-4 border-white">
                  <Image 
                     src="https://images.unsplash.com/photo-1492691523567-613d9685354e?auto=format&fit=crop&q=80&w=1500" 
                     alt="Editorial Asset" 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity opacity-40 group-hover:opacity-0" />
               </div>
            </div>

            {/* Right: Editorial Column */}
            <div className="col-span-12 lg:col-span-4 space-y-24">
               <div>
                  <span className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 mb-8 block font-mono">Archive_Ref_090</span>
                  <p className="text-3xl font-black italic tracking-tighter leading-tight mb-8">
                     Visualizing the instability of architectural form through the lens of digital entropy.
                  </p>
                  <p className="text-sm font-light opacity-60 leading-relaxed max-w-sm">
                     The intersection of structural integrity and digital fragmentation creates a new aesthetic paradigm for modern storytelling. Explore the decomposition of the visual frame.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl">
                     <Image src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600" alt="Small" fill className="object-cover grayscale" />
                  </div>
                  <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl">
                     <Image src="https://images.unsplash.com/photo-1523424296224-8d91b72a696c?auto=format&fit=crop&q=80&w=600" alt="Small" fill className="object-cover grayscale" />
                  </div>
               </div>

               <button className="w-full px-12 py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 transition-all rounded-full">Enter Archive</button>
            </div>

         </div>
      </main>

      {/* Floating status */}
      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[8vw] font-black italic uppercase leading-none select-none">
         FRAGMENT_MAPPING_V.090
      </div>

    </div>
  );
}
