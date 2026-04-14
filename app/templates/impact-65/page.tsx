"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const BLOCKS = [
  { id: 1, title: "Lumina", img: "/templates/editorial_lux.png", size: "col-span-8 h-[600px]" },
  { id: 2, title: "Fragment", img: "/templates/tech_noir.png", size: "col-span-4 h-[400px]" },
  { id: 3, title: "Synthesis", img: "/templates/agency_hero.png", size: "col-span-4 h-[600px]" },
  { id: 4, title: "Structure", img: "/templates/brutalist_staircase.png", size: "col-span-8 h-[400px]" },
];

export default function EditorialMultiGrid() {
  return (
    <div className="premium-theme bg-[#fcfcfc] text-[#1a1c20] min-h-screen selection:bg-rose-500 overflow-x-hidden">
      
      {/* Editorial Header */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-end border-b border-black/5 bg-white/40 backdrop-blur-xl">
        <Link href="/" className="text-xl font-serif italic tracking-tighter uppercase">Magazine.OS</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <span>Vol.01</span>
           <span>Issue.65</span>
        </div>
      </nav>

      {/* Hero Massive Typography Overlay */}
      <header className="pt-48 pb-24 px-12 relative">
         <motion.div
           initial={{ opacity: 0, scale: 1.1 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="relative z-20 pointer-events-none"
         >
            <span className="text-xs uppercase tracking-[1em] font-black opacity-20 mb-8 block font-mono italic">A Digital Curated Archive</span>
            <h1 className="text-[15vw] font-serif italic font-black tracking-tighter leading-none mb-12 -ml-4">
               The <br /> <span className="not-italic text-rose-600">Complex.</span>
            </h1>
         </motion.div>
      </header>

      {/* Experimental Magazine Grid */}
      <main className="px-12 pb-64">
         <div className="grid grid-cols-12 gap-12 max-w-[1600px] mx-auto">
            {BLOCKS.map((block, i) => (
               <motion.div 
                  key={block.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${block.size} relative overflow-hidden group shadow-2xl elevation-24 rounded-[3rem] border-8 border-white bg-neutral-100`}
               >
                  <Image src={block.img} alt={block.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                     <span className="text-[10px] uppercase font-black tracking-widest text-white/60 italic font-mono mb-2">Item_Ref_0{block.id}</span>
                     <h2 className="text-4xl md:text-6xl font-serif italic font-black text-white">{block.title}</h2>
                  </div>
               </motion.div>
            ))}
         </div>
         
         {/* Interstitial Large Typography */}
         <div className="py-96 text-center">
            <h2 className="text-[10vw] font-black uppercase italic tracking-tighter opacity-10 leading-none">Perspective.</h2>
            <p className="max-w-2xl mx-auto mt-12 text-xl font-light opacity-60 uppercase tracking-widest leading-relaxed italic">
               Design is not just what it looks like and feels like. Design is how it works through layers of complexity.
            </p>
         </div>
      </main>

      {/* Brutalist Footer */}
      <footer className="p-24 bg-black text-white rounded-t-[5rem]">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="text-8xl md:text-[12vw] font-black italic tracking-tighter opacity-20 leading-none uppercase">Archive.</div>
            <div className="space-y-8">
               <h3 className="text-xs font-black uppercase tracking-[1em] text-rose-600 italic">Get the Issue</h3>
               <p className="max-w-md opacity-40 uppercase tracking-widest leading-relaxed">Join the curated stream of digital fragmentation and structural integrity.</p>
               <button className="px-12 py-6 border border-white uppercase text-[10px] tracking-[1em] font-black italic hover:bg-white hover:text-black transition-all">Subscribe Now</button>
            </div>
         </div>
      </footer>

    </div>
  );
}
