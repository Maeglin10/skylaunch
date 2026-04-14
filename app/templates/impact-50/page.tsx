"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const MENU = [
  { id: 1, cat: "STARTERS", items: ["Oyster / Neural Salt", "Charred Silicon", "Glass Foam"] },
  { id: 2, cat: "MAINS", items: ["Brutal Bass", "Carbon Aged Rib", "Isis Scallops"] },
  { id: 3, cat: "VOIDS", items: ["Dark Matter", "Spectral Ice", "Liquid Neon"] },
];

export default function FoodModernGrid() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all bg-white/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase italic">Modern.Kitchen</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <a href="#" className="hover:opacity-100 italic">Menu_V.4</a>
           <a href="#" className="hover:opacity-100 border border-black/10 px-6 py-2 rounded-full">Book_Table</a>
        </div>
      </nav>

      {/* Hero Showcase */}
      <header className="pt-48 px-12 grid grid-cols-12 gap-12 items-end max-w-7xl mx-auto mb-32">
         <div className="col-span-12 lg:col-span-8">
            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-20 mb-8 block">Culinary_Reconstruction_2026</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-[0.8]">
               Raw <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Impact.</span>
            </h1>
         </div>
         <div className="col-span-12 lg:col-span-4 text-right hidden lg:block">
            <p className="text-xs uppercase tracking-[0.4em] leading-relaxed opacity-40 font-black italic">
               Where precision meets the primal. <br /> A new standard for the experimental palate.
            </p>
         </div>
      </header>

      {/* Modern Grid Layout */}
      <main className="px-12 pb-64 overflow-hidden">
         <div className="grid grid-cols-12 gap-8 md:gap-12 max-w-[1400px] mx-auto">
            
            {/* Massive Vertical Panel */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="col-span-12 lg:col-span-6 aspect-[4/5] bg-neutral-100 relative overflow-hidden group rounded-[4rem] shadow-2xl elevation-24"
            >
               <Image src="/templates/brutalist_staircase.png" alt="Kitchen Prep" fill className="object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-[2s]" />
               <div className="absolute inset-0 bg-white/10" />
               <div className="absolute bottom-12 left-12 text-6xl font-black uppercase italic text-white mix-blend-difference">STAGE_04</div>
            </motion.div>

            {/* Menu Stream */}
            <div className="col-span-12 lg:col-span-6 space-y-24 py-12">
               {MENU.map((section, i) => (
                  <motion.div 
                     key={section.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="border-t-2 border-black/5 pt-12 group"
                  >
                     <div className="flex justify-between items-baseline mb-12">
                        <h3 className="text-xs font-black uppercase tracking-[1em] opacity-20 italic font-mono">{section.cat}</h3>
                        <span className="text-xs font-black opacity-10">/ 0{section.id+100}</span>
                     </div>
                     <div className="space-y-4">
                        {section.items.map((item, j) => (
                           <div key={j} className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter hover:pl-8 transition-all cursor-crosshair">
                              {item}
                           </div>
                        ))}
                     </div>
                  </motion.div>
               ))}
            </div>

         </div>
      </main>

      {/* Static Footer Overlays */}
      <footer className="p-24 bg-black text-white text-center rounded-t-[5rem]">
         <div className="text-[10vw] font-black uppercase italic tracking-tighter opacity-10 mb-12 leading-none">Vanguard.</div>
         <div className="grid grid-cols-3 gap-12 font-mono text-[8px] uppercase font-black tracking-widest opacity-40">
            <span>Lat: 45.322</span>
            <span>Ref: 0x442_K</span>
            <span>Lon: 0.127</span>
         </div>
      </footer>

    </div>
  );
}
