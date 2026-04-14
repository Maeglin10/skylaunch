"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ITEMS = [
  { id: 1, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000", title: "LUMINA_A" },
  { id: 2, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000", title: "VOID_B" },
];

export default function PhotographyDuoToneReveal() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#0f0f0f] text-white min-h-screen selection:bg-rose-500 overflow-x-hidden font-mono">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Duo.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Phase_Shift_v.086</div>
      </nav>

      {/* Hero Header */}
      <header className="pt-48 pb-24 px-12 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 1.1 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
         >
            <span className="text-xs uppercase tracking-[2em] font-black italic opacity-20 mb-8 block">Chromatic Realignment</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Rose <br /> <span className="text-rose-600">Spectre.</span>
            </h1>
         </motion.div>
      </header>

      {/* Duo-Tone Grid */}
      <main className="px-6 md:px-12 pb-64 space-y-48">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {ITEMS.map((item) => (
               <motion.div 
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-8 border-white group cursor-crosshair elevation-24"
               >
                  {/* Duo-Tone Layer */}
                  <div className="absolute inset-0 bg-rose-600 z-10 mix-blend-color group-hover:opacity-0 transition-opacity duration-[1.5s]" />
                  <div className="absolute inset-0 bg-black z-10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-[1.5s]" />
                  
                  <Image 
                     src={item.img} 
                     alt={item.title} 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-[1.5s] group-hover:scale-110 transition-transform duration-[4s]" 
                  />

                  <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                     <span className="text-[10px] font-black tracking-widest opacity-40 italic mb-2">FRAGMENT_REF_0x0{item.id}</span>
                     <h2 className="text-5xl font-black italic leading-none">{item.title}</h2>
                  </div>
               </motion.div>
            ))}
         </div>
         
         <div className="py-24 text-center">
            <h2 className="text-[10vw] font-black uppercase italic tracking-tighter opacity-10 leading-none mb-12">Atmosphere.</h2>
            <p className="max-w-2xl mx-auto text-xs font-black uppercase tracking-[0.4em] leading-relaxed italic opacity-40">
               Deciphering the emotional resonance of chromatic fragmentation in high-fashion portraiture.
            </p>
         </div>
      </main>

      {/* Floating specs */}
      <div className="fixed right-12 bottom-12 z-50 text-[10px] font-black uppercase tracking-[1em] opacity-20 italic">
         Aevia_Creative_Lab &copy; 2026
      </div>

    </div>
  );
}
