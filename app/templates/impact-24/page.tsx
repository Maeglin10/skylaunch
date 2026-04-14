"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ITEMS = [
  { id: 1, img: "/templates/tech_noir.png" },
  { id: 2, img: "/templates/editorial_lux.png" },
  { id: 3, img: "/templates/agency_hero.png" },
  { id: 4, img: "/templates/portal_frame.png" },
  { id: 5, img: "/templates/brutalist_staircase.png" },
];

export default function CircularFlowPortfolio() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-white h-screen w-full overflow-hidden relative cursor-grab active:cursor-grabbing">
      
      {/* Background HUD */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
         <div className="w-[80vw] h-[80vw] border border-white rounded-full" />
         <div className="w-[60vw] h-[60vw] border border-dashed border-white rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
         <Link href="/" className="text-xl font-black italic tracking-tighter uppercase pointer-events-auto">Orbital.OS</Link>
         <div className="text-[10px] uppercase tracking-[1em] font-black italic">Archive / 2026</div>
      </nav>

      {/* Center Narrative */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
         <h1 className="text-8xl md:text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-4 text-center">
            The <br /> Center.
         </h1>
         <div className="w-16 h-1 bg-white/40 mb-12" />
         <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Drag to Explore the Perimeter</p>
      </div>

      {/* Circular Item Ring */}
      <motion.div 
         drag="x"
         onDrag={(e, info) => setRotation(prev => prev + info.delta.x * 0.2)}
         className="absolute inset-0 flex items-center justify-center"
      >
         <motion.div 
           animate={{ rotate: rotation }}
           transition={{ type: "spring", damping: 30, stiffness: 100 }}
           className="relative w-[30vh] h-[30vh]"
         >
            {ITEMS.map((item, i) => {
               const angle = (i / ITEMS.length) * 360;
               return (
                  <motion.div 
                    key={item.id}
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center group"
                    style={{ 
                       transform: `rotate(${angle}deg) translateY(-50vh)`,
                    }}
                  >
                     <motion.div 
                       animate={{ rotate: -rotation - angle }}
                       className="relative w-48 h-64 bg-white/5 border border-white/10 overflow-hidden hover:scale-110 transition-transform"
                     >
                        <Image src={item.img} alt="Orbital Item" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="text-[10px] uppercase font-black tracking-widest italic">View_0{item.id}</span>
                        </div>
                     </motion.div>
                  </motion.div>
               );
            })}
         </motion.div>
      </motion.div>

      {/* Status Bar */}
      <footer className="fixed bottom-12 left-12 right-12 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="flex flex-col gap-2">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-20">Centripetal Velocity: {Math.abs(rotation).toFixed(2)}</div>
            <div className="flex gap-1 h-2">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-full bg-white/20"></div>)}
            </div>
         </div>
         <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20 italic">
            Orbital Indexing v2.0
         </div>
      </footer>
    </div>
  );
}
