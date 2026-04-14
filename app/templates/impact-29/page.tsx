"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "AEON_V1", img: "/templates/tech_noir.png", class: "col-span-12 md:col-span-8" },
  { id: 2, title: "KRYPT", img: "/templates/agency_hero.png", class: "col-span-12 md:col-span-4" },
  { id: 3, title: "LUMINA", img: "/templates/editorial_lux.png", class: "col-span-12 md:col-span-4" },
  { id: 4, title: "VOID", img: "/templates/brutalist_staircase.png", class: "col-span-12 md:col-span-8" },
];

export default function GlitchGridPortfolio() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#030303] text-white min-h-screen p-8 md:p-12 overflow-x-hidden selection:bg-red-600">
      
      {/* Glitch Overlay (Constant very subtle) */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.02] animate-pulse">
         <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      {/* Header */}
      <header className="mb-32 flex justify-between items-end border-b border-white/10 pb-12">
        <h1 className="text-6xl md:text-[10vw] font-black uppercase italic tracking-tighter leading-none mix-blend-difference">
          Archive. <br /> <span className="opacity-20 italic">00//DX</span>
        </h1>
        <div className="text-right flex flex-col items-end">
           <div className="text-[10px] uppercase font-black tracking-[0.5em] mb-4 text-red-600 animate-pulse">Live_Sync_Active</div>
           <nav className="flex gap-8 text-[10px] uppercase font-black tracking-widest opacity-40">
              <a href="#" className="hover:opacity-100">Filter</a>
              <a href="#" className="hover:opacity-100 italic">Work</a>
           </nav>
        </div>
      </header>

      {/* Interactive Grid */}
      <main className="grid grid-cols-12 gap-8 md:gap-12">
         {PROJECTS.map((project) => (
           <motion.div 
             key={project.id}
             onMouseEnter={() => setHovered(project.id)}
             onMouseLeave={() => setHovered(null)}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className={`${project.class} relative aspect-video cursor-pointer group overflow-hidden bg-[#111]`}
           >
              {/* Normal Image */}
              <Image 
                src={project.img} 
                alt={project.title} 
                fill 
                className={`object-cover transition-all duration-700 ${hovered === project.id ? 'scale-110 grayscale-0 brightness-110' : 'grayscale brightness-50'}`} 
              />
              
              {/* Glitch Layers (Visible on Hover) */}
              {hovered === project.id && (
                <>
                  <div className="absolute inset-0 z-10 opacity-60 mix-blend-screen mix-blend-difference animate-[glitch_0.2s_infinite] translate-x-1">
                     <Image src={project.img} alt="glitch 1" fill className="object-cover hue-rotate-90 saturate-200" />
                  </div>
                  <div className="absolute inset-0 z-20 opacity-40 mix-blend-color-dodge animate-[glitch_0.3s_infinite] -translate-x-1">
                     <Image src={project.img} alt="glitch 2" fill className="object-cover invert grayscale" />
                  </div>
                </>
              )}

              {/* HUD Content */}
              <div className="absolute inset-x-8 bottom-8 z-30 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                 <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-red-600 mb-2 block font-mono">NODE_{project.id}44</span>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter mix-blend-difference">{project.title}</h2>
                 </div>
                 <div className="text-xs uppercase font-black tracking-tighter opacity-40 italic">Exp_Data_332.v</div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-red-600 transition-colors" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-red-600 transition-colors" />
           </motion.div>
         ))}
      </main>

      {/* Footer */}
      <footer className="mt-64 flex flex-col md:flex-row justify-between items-center opacity-40 text-[10px] uppercase tracking-[0.5em] font-black italic">
         <div>&copy; 2026 Archive Digital / Visual Unit</div>
         <div className="flex gap-12 mt-8 md:mt-0 font-mono">
            <span>Buffer_0x442</span>
            <span>Lat_45.322</span>
         </div>
      </footer>

      <style jsx global>{`
        @keyframes glitch {
          0% { clip-path: inset(10% 0 30% 0); transform: translate(-5px, 2px); }
          20% { clip-path: inset(40% 0 10% 0); transform: translate(5px, -2px); }
          40% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 5px); }
          60% { clip-path: inset(70% 0 5% 0); transform: translate(2px, -5px); }
          80% { clip-path: inset(5% 0 80% 0); transform: translate(-5px, 2px); }
          100% { clip-path: inset(50% 0 20% 0); transform: translate(5px, -2px); }
        }
      `}</style>
    </div>
  );
}
