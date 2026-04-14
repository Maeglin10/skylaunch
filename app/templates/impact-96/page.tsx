"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function LuxuryGemstoneReveal() {
  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-stone-500 font-serif">
      
      {/* Background Cinematic Asset */}
      <div className="absolute inset-0 z-0 opacity-60">
         <motion.div 
            animate={{ scale: [1, 1.1, 1], filter: ["blur(0px)", "blur(10px)", "blur(0px)"] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="w-full h-full relative"
         >
            <Image 
               src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=2000" 
               alt="Gemstone" 
               fill 
               className="object-cover brightness-50 contrast-150 saturate-0" 
            />
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Refractive Glass Overlays */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-12">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-full w-full">
            {Array.from({ length: 4 }).map((_, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 1.5 }}
                  className="h-full bg-white/5 backdrop-blur-[100px] border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(255,255,255,0.02)] hidden md:block"
               />
            ))}
         </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-stone-400">Prism.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 font-mono">Refraction_Series: 0xFF</div>
      </nav>

      {/* Main Narrative Content */}
      <main className="relative z-20 h-full w-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="p-12 md:p-24 bg-black/20 backdrop-blur-3xl rounded-[5rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
         >
            <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40">Molecular Chromatic Mapping</span>
            <h1 className="text-7xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-white">
               LUX <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>REFRACT.</span>
            </h1>
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black mb-12 text-white">
               Deconstructing the brilliance of crystalline form through speculative refractive analysis.
            </p>
            <button className="px-16 py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] italic hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.1)]">Request Private Viewing</button>
         </motion.div>
      </main>

      {/* Numerical Data Sidebar */}
      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         GEMSTONE_PROTOCOL
      </div>

    </div>
  );
}
