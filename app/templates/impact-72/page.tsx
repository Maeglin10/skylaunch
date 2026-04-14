"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "RETRO_GEN", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, title: "VOID_DEEP", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, title: "LUX_STAY", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000" },
];

export default function Carousel3DStack() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="premium-theme bg-[#fcfcfc] text-black h-screen w-full overflow-hidden relative selection:bg-rose-500 flex items-center justify-center font-mono">
      
      {/* Background HUD Matrix */}
      <div className="absolute inset-x-12 top-12 flex justify-between items-center opacity-40 pointer-events-none text-[8px] font-black uppercase tracking-[1em]">
         <span>Node_Distribution_v72</span>
         <span>Fan_Angle: 45deg</span>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Stack.Unit</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Phase_0x072</div>
      </nav>

      {/* 3D Stack Stage */}
      <main className="relative perspective-2000" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
         <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[550px]">
            {PROJECTS.map((p, i) => (
               <motion.div 
                  key={p.id}
                  animate={{ 
                     rotateY: hovered ? (i - 1) * 35 : 0,
                     rotateZ: hovered ? (i - 1) * 5 : 0,
                     x: hovered ? (i - 1) * 200 : 0,
                     z: hovered ? -200 : (i * -40),
                     scale: hovered ? 1 : (1 - i * 0.05)
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="absolute inset-0 bg-white shadow-2xl rounded-[3rem] overflow-hidden border-8 border-white elevation-24 group cursor-crosshair"
               >
                  <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-black/10 transition-opacity opacity-40 group-hover:opacity-0" />
                  
                  <div className="absolute bottom-12 left-12 text-white mix-blend-difference">
                     <span className="text-[10px] font-black italic mb-2 block tracking-widest leading-none">REF_0x0{i}</span>
                     <h3 className="text-4xl font-black italic leading-none">{p.title}</h3>
                  </div>
               </motion.div>
            ))}
         </div>
      </main>

      {/* Interaction Label */}
      <div className="absolute bottom-24 text-center">
         <motion.div 
            animate={{ opacity: hovered ? 0 : 0.4 }}
            className="text-[10px] uppercase tracking-[1.5em] font-black italic"
         >
            Hover to fan projects
         </motion.div>
      </div>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>

    </div>
  );
}
