"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PARTICLE_COUNT = 60;

export default function ParticleFireflies() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    setParticles(pts);
  }, []);

  return (
    <div className="premium-theme bg-black text-amber-500 h-screen w-full overflow-hidden relative selection:bg-amber-600">
      
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-40">
         <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="w-full h-full relative"
         >
            <Image src="/templates/portal_frame.png" alt="Atmosphere" fill className="object-cover brightness-50 contrast-125 saturate-[0.1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
         </motion.div>
      </div>

      {/* Fireflies Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         {particles.map((p) => (
            <motion.div 
               key={p.id}
               animate={{ 
                  y: [0, -100, 0],
                  x: [0, 50, 0],
                  opacity: [0, 1, 0]
               }}
               transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
               className="absolute rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
               style={{ 
                  left: `${p.x}%`, 
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size 
               }}
            />
         ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all mix-blend-difference border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-amber-600">Lumina.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Sequence_0x054</div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
         >
            <span className="text-xs uppercase tracking-[1em] font-black italic mb-8 block opacity-40 text-amber-600/60">Molecular Light Dispersion</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-white shadow-2xl">
               Solar <br /> <span className="text-amber-500">Drift.</span>
            </h1>
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black mb-12 text-white">
               Observing the slow decay of light in the absence of form.
            </p>
            <button className="px-12 py-6 bg-amber-600 text-black font-black uppercase text-xs tracking-[1em] italic hover:scale-110 shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-all">Begin Observation</button>
         </motion.div>
      </main>

    </div>
  );
}
