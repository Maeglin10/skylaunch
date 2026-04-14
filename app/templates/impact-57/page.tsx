"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function MaskedVideoTypography() {
  return (
    <div className="premium-theme bg-white text-black h-screen w-full overflow-hidden relative selection:bg-black selection:text-white">
      
      {/* Background HUD Layers */}
      <div className="absolute inset-x-12 top-12 flex justify-between items-center opacity-10 pointer-events-none text-[8px] font-black uppercase tracking-[1em]">
         <span>Node_Capture_v57</span>
         <span>Mask_Density: 100%</span>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase pointer-events-auto">Mask.Unit</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Aevia_Creative_Lab</div>
      </nav>

      {/* Main Masked Content */}
      <main className="h-full w-full flex flex-col items-center justify-center p-12 overflow-hidden">
         
         <div className="relative">
            {/* The Masked Typography */}
            <motion.h1 
               initial={{ letterSpacing: "1em", opacity: 0 }}
               animate={{ letterSpacing: "-0.05em", opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="text-[25vw] font-black uppercase italic tracking-tighter leading-none relative z-20 mix-blend-screen bg-black text-white"
               style={{ 
                  backgroundImage: 'url(/templates/agency_hero.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  filter: 'contrast(150%) brightness(1.2)'
               }}
            >
               OCEAN.
            </motion.h1>

            {/* Ghost Shadow beneath Layer */}
            <h2 className="absolute inset-0 text-[25vw] font-black uppercase italic tracking-tighter leading-none text-black/5 -z-10 select-none">OCEAN.</h2>
         </div>

         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
         >
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.8em] leading-relaxed italic opacity-40 font-black mb-12">
               Exploring the depths of visual synthesis through high-fidelity masking.
            </p>
            <button className="px-12 py-6 border-2 border-black text-black font-black uppercase text-xs tracking-[1em] italic hover:bg-black hover:text-white transition-all">Dive Deeper</button>
         </motion.div>

      </main>

      {/* Side Status Indicators */}
      <div className="fixed left-12 bottom-12 z-50 flex flex-col gap-2 font-mono text-[8px] uppercase font-black opacity-20">
         <div>Frag: 0x57.A</div>
         <div className="flex gap-2 text-blue-600">
            <span>Status:</span>
            <span>SYMMETRICAL_MASK_ACTIVE</span>
         </div>
      </div>

    </div>
  );
}
