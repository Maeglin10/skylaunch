"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "AETHER_01", img: "/templates/tech_noir.png" },
  { id: 2, title: "MAVELLE_02", img: "/templates/editorial_lux.png" },
  { id: 3, title: "PORTAL_03", img: "/templates/portal_frame.png" },
  { id: 4, title: "STUDIO_04", img: "/templates/agency_hero.png" },
  { id: 5, title: "BRUTAL_05", img: "/templates/brutalist_staircase.png" },
];

export default function GridRevealTemplate() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-white text-black min-h-screen p-8 md:p-12 overflow-x-hidden">
      
      {/* Header */}
      <header className="mb-24 flex justify-between items-end border-b-8 border-black pb-12">
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
          Archive. <br /> <span className="opacity-20 italic">Index.</span>
        </h1>
        <div className="text-right flex flex-col items-end">
           <div className="text-2xl font-black mb-2">(05)</div>
           <nav className="flex gap-8 text-[10px] uppercase font-black tracking-widest">
              <a href="#" className="hover:underline">All_Work</a>
              <a href="#" className="hover:underline">Contact</a>
           </nav>
        </div>
      </header>

      {/* Dynamic Grid */}
      <div className="flex flex-col lg:flex-row h-[70vh] gap-4">
         {PROJECTS.map((project) => (
           <motion.div
              key={project.id}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              animate={{ 
                flex: hovered === project.id ? 3 : 1,
                opacity: hovered === null || hovered === project.id ? 1 : 0.4
              }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="relative h-full overflow-hidden group border border-black/5 bg-[#f5f5f5] cursor-pointer"
           >
              <Image
                src={project.img}
                alt={project.title}
                fill
                className={`object-cover transition-all duration-700 ${hovered === project.id ? 'scale-110 grayscale-0' : 'grayscale brightness-90'}`}
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                 <motion.div
                   animate={{ y: hovered === project.id ? 0 : 20 }}
                 >
                    <span className="text-[10px] uppercase font-black text-white/40 mb-2 block tracking-widest">Case_Study</span>
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{project.title}</h2>
                    <button className="mt-8 text-white border border-white/20 px-6 py-2 text-[10px] uppercase font-black hover:bg-white hover:text-black transition-all">Explore</button>
                 </motion.div>
              </div>

              {/* Collapsed Label */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] uppercase font-black tracking-[1em] transition-opacity duration-500 ${hovered === project.id ? 'opacity-0' : 'opacity-20'}`}>
                 {project.title}
              </div>
           </motion.div>
         ))}
      </div>

      {/* Footer Info */}
      <footer className="mt-24 pt-12 flex flex-col md:flex-row justify-between items-center opacity-40 text-[10px] uppercase tracking-[0.5em] font-black italic">
         <div>&copy; 2026 Archive Digital Assets</div>
         <div className="flex gap-8">
            <span>Lat: 51.5074</span>
            <span>Long: 0.1278</span>
         </div>
      </footer>
    </div>
  );
}
