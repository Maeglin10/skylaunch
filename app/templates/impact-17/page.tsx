"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const WORKS = [
  { id: 1, title: "STAIRCASE_01", class: "col-span-12 lg:col-span-8 h-[60vh]", img: "/templates/brutalist_staircase.png" },
  { id: 2, title: "ABSTRACT_02", class: "col-span-12 lg:col-span-4 h-[40vh] self-end", img: "/templates/agency_hero.png" },
  { id: 3, title: "VISION_03", class: "col-span-12 lg:col-span-4 h-[50vh]", img: "/templates/tech_noir.png" },
  { id: 4, title: "SILK_04", class: "col-span-12 lg:col-span-8 h-[80vh]", img: "/templates/editorial_lux.png" },
];

export default function PortfolioArchitectureGrid() {
  return (
    <div className="premium-theme bg-[#f8f8f8] text-black min-h-screen p-8 md:p-12 selection:bg-black selection:text-white">
      
      {/* Editorial Header */}
      <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12 border-b-2 border-black pb-12">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.5em] font-bold opacity-30 mb-6 block">Curated Works / 2026</span>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
             Concrete <br /> <span className="italic opacity-20">Visions.</span>
          </h1>
        </div>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-bold text-right">
           <Link href="/" className="hover:underline">Index</Link>
           <a href="#" className="hover:underline">About</a>
           <a href="#" className="hover:underline">Inquiry</a>
        </div>
      </header>

      {/* Masonry Grid */}
      <main className="grid grid-cols-12 gap-8 md:gap-12">
         {WORKS.map((work, i) => (
           <motion.div 
             key={work.id}
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: i * 0.1 }}
             viewport={{ once: true }}
             className={`${work.class} relative group cursor-pointer overflow-hidden bg-white shadow-2xl`}
           >
              <Image
                src={work.img}
                alt={work.title}
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
              />
              {/* Floating ID label */}
              <div className="absolute top-8 left-8 bg-black text-white px-4 py-2 text-[10px] uppercase font-black italic tracking-widest z-10">
                 PROJ_{work.id + 100}
              </div>
              
              {/* Overlay Content on Hover */}
              <div className="absolute inset-x-8 bottom-8 z-20 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                 <div className="glass p-6 border-black/10 backdrop-blur-xl">
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">{work.title}</h2>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 mt-2 font-bold">Architecture / Visual Design</p>
                 </div>
              </div>
           </motion.div>
         ))}
      </main>

      {/* Simple Footer */}
      <footer className="mt-48 pt-12 border-t border-black/10 flex justify-between items-center text-[10px] uppercase tracking-[1em] font-black opacity-20 italic">
         <div>End of Archive</div>
         <div className="text-right">Aevia Studio (C) 2026</div>
      </footer>
    </div>
  );
}
