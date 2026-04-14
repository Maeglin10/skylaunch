"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const GOLD_PARTICLES = 40;

export default function LuxuryGoldParticles() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: GOLD_PARTICLES }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }));
    setParticles(pts);
  }, []);

  return (
    <div className="premium-theme bg-[#050505] text-[#d4af37] h-screen w-full overflow-hidden relative selection:bg-[#d4af37] selection:text-black font-serif">
      
      {/* Background Cinematic Asset */}
      <div className="absolute inset-0 z-0">
         <motion.div 
            animate={{ scale: [1.1, 1], filter: ["blur(5px) contrast(150%)", "blur(0px) contrast(125%)"] }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="w-full h-full relative"
         >
            <Image 
               src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000" 
               alt="Luxury Watch" 
               fill 
               className="object-cover brightness-50 contrast-125 saturate-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
         </motion.div>
      </div>

      {/* Floating Gold Particles Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
         {particles.map((p) => (
            <motion.div 
               key={p.id}
               initial={{ opacity: 0, y: "100%" }}
               animate={{ 
                  opacity: [0, 0.8, 0],
                  y: "-100%",
                  x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
               }}
               transition={{ 
                  duration: p.duration, 
                  repeat: Infinity, 
                  delay: p.delay,
                  ease: "linear"
               }}
               className="absolute w-1 h-1 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]"
               style={{ left: `${p.x}%`, width: p.size, height: p.size }}
            />
         ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#d4af37]/20">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-[#d4af37]">Heritage.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 font-mono">Series_0xFF_Gold</div>
      </nav>

      {/* Main Narrative Content */}
      <main className="relative z-20 h-full w-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
         >
            <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40">Eternal Precision Mapping</span>
            <h1 className="text-7xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-white">
               The <br /> <span className="text-[#d4af37]">AETHER.</span>
            </h1>
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black mb-12 text-white">
               Capturing the essence of time through the molecular oscillation of gold and carbon.
            </p>
            <button className="px-16 py-8 border border-[#d4af37] text-[#d4af37] font-black uppercase text-xs tracking-[1em] italic hover:bg-[#d4af37] hover:text-black transition-all">Discover Archive</button>
         </motion.div>
      </main>

      {/* Numerical Data Index */}
      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         LIMITED_EDITION_NODE
      </div>

    </div>
  );
}
