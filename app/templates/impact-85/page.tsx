"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const NODES = [
  { id: 1, label: "Sky Tower", x: "30%", y: "40%", price: "$2.4M" },
  { id: 2, label: "Harbor Unit", x: "65%", y: "60%", price: "$1.8M" },
  { id: 3, label: "Central Plaza", x: "50%", y: "25%", price: "$4.1M" },
];

export default function RealEstateNeighborhoodMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#050505] text-[#00e1ff] h-screen w-full overflow-hidden relative selection:bg-[#00e1ff] selection:text-black font-mono">
      
      {/* Background Satellite View */}
      <div className="absolute inset-0 z-0 opacity-40">
         <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
         >
            <Image 
               src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=2000" 
               alt="Satellite Map" 
               fill 
               className="object-cover grayscale contrast-150 brightness-50" 
            />
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#00e1ff]/20">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-[#00e1ff]">Map.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Sector_Mapping_v.085</div>
      </nav>

      {/* Interactive Map Layer */}
      <main className="relative z-20 h-full w-full flex items-center justify-center">
         <div className="relative w-full h-full">
            {NODES.map((node) => (
               <div 
                  key={node.id}
                  className="absolute cursor-crosshair group"
                  style={{ left: node.x, top: node.y }}
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
               >
                  <div className={`w-8 h-8 rounded-full border-2 border-[#00e1ff] flex items-center justify-center transition-all ${active === node.id ? 'scale-150 bg-[#00e1ff]/20' : 'scale-100'}`}>
                     <div className="w-2 h-2 bg-[#00e1ff] rounded-full animate-pulse" />
                  </div>
                  
                  <motion.div 
                     initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: active === node.id ? 1 : 0, y: active === node.id ? 0 : -20 }}
                     className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black border border-[#00e1ff] p-6 rounded-2xl backdrop-blur-3xl min-w-[200px]"
                  >
                     <span className="text-[8px] font-black uppercase tracking-widest opacity-40 block mb-1">Asset_Unit_Ref_0{node.id}</span>
                     <h3 className="text-sm font-black uppercase italic text-white">{node.label}</h3>
                     <div className="text-xl font-black text-[#00e1ff] mt-2">{node.price}</div>
                  </motion.div>

                  {/* Crosshair Animation */}
                  {active === node.id && (
                     <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute left-1/2 top-[-100vh] w-[1px] h-[200vh] bg-[#00e1ff]/20" />
                        <div className="absolute top-1/2 left-[-100vw] w-[200vw] h-[1px] bg-[#00e1ff]/20" />
                     </div>
                  )}
               </div>
            ))}
         </div>
      </main>

      {/* Floating Specs HUD */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-12 text-right hidden lg:flex">
         <div>
            <h4 className="text-[8px] font-black uppercase tracking-[1em] opacity-40">Coverage</h4>
            <p className="text-white text-xs font-black uppercase italic">98.4%_Mapped</p>
         </div>
         <div>
            <h4 className="text-[8px] font-black uppercase tracking-[1em] opacity-40">Assets</h4>
            <p className="text-[#00e1ff] text-xs font-black uppercase italic">442_Available</p>
         </div>
      </div>

      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[10vw] font-black italic uppercase leading-none select-none">
         GEOLOCATION_ACTIVE
      </div>

    </div>
  );
}
