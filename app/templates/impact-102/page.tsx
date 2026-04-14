"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PROJECTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600", color: "#f87171" },
  { id: 2, img: "https://images.unsplash.com/photo-1523424296224-8d91b72a696c?auto=format&fit=crop&q=80&w=600", color: "#60a5fa" },
  { id: 3, img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=600", color: "#a78bfa" },
];

export default function PortfolioStackedFan() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="premium-theme bg-[#0d0d0d] text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background HUD Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5 mx-auto">
        <Link href="/" className="px-12 text-xl font-black italic tracking-tighter uppercase text-rose-600">Fan.OS</Link>
        <div className="px-12 text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Radial_Series_v.102</div>
      </nav>

      {/* Main Fan Stage */}
      <main className="h-full w-full flex flex-col items-center justify-center p-12 relative z-10">
         <div 
            className="relative w-full max-w-sm h-96 cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
         >
            {PROJECTS.map((project, i) => (
               <motion.div
                  key={project.id}
                  initial={{ rotate: 0, x: 0 }}
                  animate={{ 
                     rotate: hovered ? (i - 1) * 25 : 0,
                     x: hovered ? (i - 1) * 150 : 0,
                     y: hovered ? -20 : 0,
                     scale: hovered ? 1.05 : 1
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute inset-0 bg-neutral-900 rounded-[3rem] border-4 border-white/10 overflow-hidden shadow-2xl overflow-hidden shadow-2xl"
                  style={{ zIndex: hovered ? project.id : 10 - project.id }}
               >
                  <Image src={project.img} alt="Project" fill className="object-cover" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                     <span className="text-[10px] font-black italic tracking-widest opacity-60">NODE_0{project.id}</span>
                  </div>
               </motion.div>
            ))}
         </div>

         <div className="mt-32 text-center">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6">Archive <br /> <span className="text-stone-400">Expander.</span></h1>
            <p className="max-w-md mx-auto text-[8px] uppercase tracking-[0.6em] leading-relaxed italic opacity-40 font-black">
               Hover to engage the radial expansion sequence of distributed asset nodes.
            </p>
         </div>
      </main>

      <div className="fixed left-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         RADIAL_MAPPING
      </div>

    </div>
  );
}
