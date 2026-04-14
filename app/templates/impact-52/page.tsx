"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const RAIN_COUNT = 50;

export default function DynamicWeatherNode() {
  const [drops, setDrops] = useState<any[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: RAIN_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 2,
    }));
    setDrops(pts);
  }, []);

  return (
    <div className="premium-theme bg-[#05050a] text-cyan-500 h-screen w-full overflow-hidden relative selection:bg-white selection:text-black">
      
      {/* Background Cinematic Scene */}
      <div className="absolute inset-0 z-0 opacity-40">
         <Image src="/templates/brutalist_staircase.png" alt="Weather BG" fill className="object-cover contrast-125 brightness-50 grayscale" />
         <div className="absolute inset-0 bg-gradient-to-b from-[#05050a]/20 to-[#05050a]" />
      </div>

      {/* Dynamic Rain Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         {drops.map((d) => (
            <motion.div 
               key={d.id}
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 1200, opacity: [0, 1, 0] }}
               transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "linear" }}
               className="absolute w-[1px] h-24 bg-cyan-400/20"
               style={{ left: `${d.x}%` }}
            />
         ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference bg-black/20 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black tracking-[0.5em] uppercase text-cyan-600">Weather.Node</Link>
        <div className="flex gap-12 font-mono text-[10px] items-center">
            <div className="flex gap-2 items-center">
               <span className="opacity-40">Temp:</span>
               <span className="text-white">12.4&deg;C</span>
            </div>
            <div className="flex gap-2 items-center">
               <span className="opacity-40">Wind:</span>
               <span className="text-white">SE 14KM/H</span>
            </div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-20 h-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
         >
            <span className="text-xs uppercase tracking-[0.8em] font-black italic mb-8 block opacity-40">Real-time Environmental Processing</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-white">
               Storm <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #22d3ee' }}>Front.</span>
            </h1>
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black mb-12">
               Synchronizing digital infrastructure with local meteorological variables.
            </p>
            <button className="px-12 py-6 border border-cyan-400/40 text-cyan-400 font-black uppercase text-xs tracking-[1em] italic hover:bg-cyan-500 hover:text-black transition-all">Enter Shelter</button>
         </motion.div>
      </main>

    </div>
  );
}
