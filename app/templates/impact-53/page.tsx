"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ASSETS = [
  { id: 1, img: "/templates/tech_noir.png" },
  { id: 2, img: "/templates/editorial_lux.png" },
  { id: 3, img: "/templates/agency_hero.png" },
  { id: 4, img: "/templates/brutalist_staircase.png" },
  { id: 5, img: "/templates/portal_frame.png" },
];

export default function ClusterFloatGrid() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      img: ASSETS[i % ASSETS.length].img,
      delay: i * 0.2,
      duration: 3 + Math.random() * 2,
    }));
    setItems(pts);
  }, []);

  return (
    <div className="premium-theme bg-[#eee] text-black h-screen w-full overflow-hidden relative cursor-cell">
      
      {/* Background HUD Labels */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
         <div className="text-[40vw] font-black uppercase italic tracking-tighter">GRID.</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all bg-white/40 backdrop-blur-3xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Float.Unit</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">System_Grid_0x053</div>
      </nav>

      {/* Floating Cluster Grid */}
      <main className="h-full w-full flex items-center justify-center p-12 lg:p-48">
         <div className="grid grid-cols-3 gap-8 md:gap-12 relative z-10">
            {items.map((item) => (
               <motion.div 
                  key={item.id}
                  animate={{ 
                     y: [0, -20, 0],
                     rotateX: [0, 5, 0],
                     rotateY: [0, -5, 0]
                  }}
                  transition={{ 
                     duration: item.duration, 
                     repeat: Infinity, 
                     delay: item.delay,
                     ease: "easeInOut" 
                  }}
                  className="relative aspect-square w-full min-w-[120px] md:min-w-[200px] bg-white shadow-2xl rounded-3xl overflow-hidden group border border-black/5"
               >
                  <Image src={item.img} alt="Float Card" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-[10px] uppercase font-black tracking-widest italic">Node_{item.id}</span>
                  </div>
               </motion.div>
            ))}
         </div>
      </main>

      {/* Interaction Hint */}
      <div className="absolute inset-x-12 bottom-12 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] font-black uppercase tracking-[1em]">
         <span>Node_Density_Stable</span>
         <span>Latency_0ms</span>
      </div>

    </div>
  );
}
