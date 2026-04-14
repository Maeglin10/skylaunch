"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const BLOCKS = [
  { id: 1, title: "CORE", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1000", span: "col-span-8 h-[500px]" },
  { id: 2, title: "DATA", img: "https://images.unsplash.com/photo-1523424296224-8d91b72a696c?auto=format&fit=crop&q=80&w=1000", span: "col-span-4 h-[300px]" },
  { id: 3, title: "NODE", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000", span: "col-span-4 h-[500px]" },
  { id: 4, title: "UNIT", img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=1000", span: "col-span-8 h-[300px]" },
];

export default function EditorialBrutalistMosaic() {
  return (
    <div className="premium-theme bg-[#f0f0f0] text-black min-h-screen selection:bg-rose-500 overflow-x-hidden font-mono">
      
      {/* Editorial Header */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-end border-b border-black/5 bg-white/40 backdrop-blur-xl">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Mosaic.OS</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <span>Vol.81</span>
           <span>Fragmentation_Active</span>
        </div>
      </nav>

      <header className="pt-48 pb-24 px-12 relative overflow-hidden">
         <motion.div
           initial={{ opacity: 0, x: -100 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.5 }}
           className="relative z-20"
         >
            <span className="text-xs uppercase tracking-[1.5em] font-black opacity-20 mb-8 block italic">Curated Structural Decomposition</span>
            <h1 className="text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12 -ml-4 underline decoration-8 underline-offset-8">
               THE <br /> <span className="text-rose-600">FRAG.</span>
            </h1>
         </motion.div>
      </header>

      {/* Mosaic Grid */}
      <main className="px-12 pb-64">
         <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
            {BLOCKS.map((block, i) => (
               <motion.div 
                  key={block.id}
                  initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${block.span} relative overflow-hidden group shadow-2xl elevation-24 rounded-[3rem] border-4 border-white bg-neutral-200`}
               >
                  <Image src={block.img} alt={block.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-[2s]" />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                     <span className="text-[10px] font-black tracking-widest text-white/60 italic mb-2">BLOCK_REF_0{block.id}</span>
                     <h2 className="text-5xl font-black italic text-white leading-none">{block.title}</h2>
                     
                     {/* Simulated Technical Overlay */}
                     <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-4 py-1 bg-rose-600 text-white text-[8px] font-black uppercase tracking-widest italic">Stable</div>
                        <div className="px-4 py-1 bg-white text-black text-[8px] font-black uppercase tracking-widest italic">Primary</div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </main>

      {/* Large Typography Footnote */}
      <div className="py-64 text-center border-t border-black/5 bg-white">
         <h2 className="text-[8vw] font-black uppercase italic tracking-tighter opacity-10 leading-none mb-12">Perspective.</h2>
         <p className="max-w-2xl mx-auto text-xs font-black uppercase tracking-[0.6em] leading-relaxed italic opacity-40">
            Structural integrity is found within the fragmentation of digital memory.
         </p>
      </div>

    </div>
  );
}
