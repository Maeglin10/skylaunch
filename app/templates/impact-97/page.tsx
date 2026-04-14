"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EditorialBrutalistOverlay() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-rose-500 overflow-x-hidden font-mono">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-end border-b border-black/10 bg-white/40 backdrop-blur-xl">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase font-mono">Void.Ed</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <span>Batch_097</span>
           <span>Monolith_Active</span>
        </div>
      </nav>

      <main className="pt-48 pb-64 relative">
         
         {/* Massive Background Image */}
         <div className="px-12 mb-32">
            <motion.div 
               initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
               whileInView={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
               transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
               className="relative w-full aspect-[21/9] rounded-[5rem] overflow-hidden bg-neutral-100 shadow-2xl elevation-24"
            >
               <Image 
                  src="https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&q=80&w=2000" 
                  alt="Brutalist Arch" 
                  fill 
                  className="object-cover grayscale contrast-125" 
               />
               <div className="absolute inset-0 bg-black/10 transition-opacity opacity-40 group-hover:opacity-0" />
            </motion.div>
         </div>

         {/* Overlapping Typeface */}
         <div className="relative -mt-[15vw] px-12 z-20 pointer-events-none">
            <motion.h1 
               initial={{ x: -100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="text-[20vw] font-black uppercase italic tracking-tighter leading-none mix-blend-difference text-white"
            >
               ATOMIC.<br />
               <span className="text-stone-300">BLOCK.</span>
            </motion.h1>
         </div>

         {/* Editorial Column */}
         <div className="px-12 mt-24 grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
               <span className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 mb-8 block">Project_Ref_v097</span>
               <p className="text-2xl font-black italic tracking-tighter leading-tight mb-8">
                  Deconstructing the weight of physical form through massive digital typographic anchors.
               </p>
               <div className="h-[2px] w-full bg-black mb-12 opacity-10" />
               <p className="text-xs font-black uppercase tracking-[0.4em] leading-relaxed italic opacity-40 mb-12">
                  Structural integrity redefined via the intersection of architectural geometry and absolute linguistic scale.
               </p>
               <button className="w-full px-12 py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 transition-all rounded-full pointer-events-auto">Inquire Space</button>
            </div>
         </div>

      </main>

      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none font-mono">
         VOID_STRUCT_MAPPING
      </div>

    </div>
  );
}
