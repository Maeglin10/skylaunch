"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SPECS = [
  { id: 1, label: "Core Rotor", x: "40%", y: "45%", value: "Titanium-X" },
  { id: 2, label: "Balance Spring", x: "60%", y: "55%", value: "Silicon-V" },
  { id: 3, label: "Mainframe", x: "20%", y: "30%", value: "Carbon-T" },
];

export default function TechHUDBlueprint() {
  const [hoveredSpec, setHoveredSpec] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#020202] text-[#00ff9d] h-screen w-full overflow-hidden relative selection:bg-[#00ff9d] selection:text-black font-mono">
      
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: 'linear-gradient(to right, #00ff9d 1px, transparent 1px), linear-gradient(to bottom, #00ff9d 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#00ff9d]/20">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-[#00ff9d] underline decoration-2 underline-offset-8">Blueprint.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Unit_Assembly_v.082</div>
      </nav>

      {/* Main Blueprint Stage */}
      <main className="h-full w-full flex items-center justify-center p-12 relative overflow-hidden">
         
         {/* Central Mechanical Asset */}
         <div className="relative w-full max-w-4xl aspect-video bg-black/80 rounded-[4rem] border border-[#00ff9d]/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,255,157,0.05)] flex items-center justify-center p-24 overflow-hidden">
            <motion.div 
               animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, 0]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="relative w-full h-full"
            >
               <Image 
                  src="https://images.unsplash.com/photo-1558223175-0b41517ae1bb?auto=format&fit=crop&q=80&w=1500" 
                  alt="Mechanical Blueprint" 
                  fill 
                  className="object-contain grayscale contrast-200 brightness-50 opacity-60" 
               />
               <div className="absolute inset-0 border border-[#00ff9d]/20 rounded-full scale-125 animate-pulse opacity-10" />
            </motion.div>

            {/* Interactive Callouts */}
            {SPECS.map((spec) => (
               <div 
                  key={spec.id}
                  className="absolute pointer-events-auto group cursor-crosshair"
                  style={{ left: spec.x, top: spec.y }}
                  onMouseEnter={() => setHoveredSpec(spec.id)}
                  onMouseLeave={() => setHoveredSpec(null)}
               >
                  <div className="w-4 h-4 rounded-full bg-[#00ff9d] shadow-[0_0_20px_#00ff9d] relative">
                     <div className="absolute inset-0 bg-[#00ff9d] rounded-full animate-ping" />
                  </div>
                  
                  <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: hoveredSpec === spec.id ? 1 : 0, x: hoveredSpec === spec.id ? 0 : 20 }}
                     className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black border border-[#00ff9d] p-4 rounded-xl z-20"
                  >
                     <span className="text-[8px] font-black uppercase tracking-widest block opacity-40 mb-1">Component_Ref_0{spec.id}</span>
                     <h3 className="text-sm font-black uppercase italic text-[#00ff9d]">{spec.label}</h3>
                     <div className="text-[10px] text-white mt-1 font-mono uppercase tracking-widest">{spec.value}</div>
                  </motion.div>

                  {/* Connecting Line (Pseudo) */}
                  <div className="absolute w-[200px] h-[1px] bg-gradient-to-r from-[#00ff9d] to-transparent left-4 top-1/2 -z-10 opacity-20" />
               </div>
            ))}
         </div>

         {/* Technical Text Column */}
         <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-12 text-right hidden lg:flex">
            <div>
               <h4 className="text-[8px] font-black uppercase tracking-[1em] opacity-40">System_Status</h4>
               <p className="text-white text-xs font-black uppercase italic">Assembly_Stable</p>
            </div>
            <div>
               <h4 className="text-[8px] font-black uppercase tracking-[1em] opacity-40">Frequency</h4>
               <p className="text-[#00ff9d] text-xs font-black uppercase italic">24,400_Hz</p>
            </div>
         </div>

      </main>

      {/* Floating Status Text */}
      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[8vw] font-black italic uppercase leading-none select-none">
         EXPERIMENTAL_BUILD_v82
      </div>

    </div>
  );
}
