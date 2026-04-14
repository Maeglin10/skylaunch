"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const INGREDIENTS = [
  { id: 1, name: "Sea Salt Fluid", amount: "5g", note: "Pure distilled mineral" },
  { id: 2, name: "Silicon Kelp", amount: "12g", note: "Crispy carbon mesh" },
  { id: 3, name: "Neon Emulsion", amount: "20ml", note: "Glowing zest" },
];

export default function FoodRecipeLab() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-rose-500 overflow-x-hidden font-mono">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Recipe.Lab</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Unit_Ref_0x66</div>
      </nav>

      <main className="grid grid-cols-12 min-h-screen pt-24">
         
         {/* Left: Dish Anatomy */}
         <div className="col-span-12 lg:col-span-7 relative h-[50vh] lg:h-screen bg-neutral-100/50 flex items-center justify-center p-12 lg:p-24">
            <motion.div 
               animate={{ 
                  scale: active ? 1.2 : 1,
                  rotate: active ? (active * 5 - 10) : 0
               }}
               className="relative w-full h-full max-w-2xl aspect-square rounded-[4rem] overflow-hidden shadow-2xl elevation-24 border-8 border-white"
            >
               <Image 
                  src="/templates/brutalist_staircase.png" 
                  alt="Dish" 
                  fill 
                  className="object-cover grayscale contrast-125" 
               />
               <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay" />
               
               {/* Interactive Overlay Markers */}
               {active && (
                  <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                     <div className="w-64 h-64 border-2 border-rose-600 rounded-full animate-ping opacity-20" />
                     <div className="w-32 h-32 border-2 border-rose-600 rounded-full animate-pulse opacity-40" />
                  </motion.div>
               )}
            </motion.div>

            {/* Background Specs */}
            <div className="absolute top-24 left-12 opacity-10 text-[8px] font-black uppercase tracking-[1em] leading-loose pointer-events-none">
               Anatomical_Scan_Active<br />
               Ref_Node_442_F<br />
               Composition_Stable
            </div>
         </div>

         {/* Right: Ingredient List */}
         <div className="col-span-12 lg:col-span-5 p-12 lg:p-24 flex flex-col justify-center bg-white border-l border-black/5">
            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-20 mb-8 block font-mono italic">Molecular Composition</span>
            <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-12">
               The <br /> <span className="text-rose-600">Aevia</span> <br /> Dish.
            </h2>

            <div className="space-y-8">
               {INGREDIENTS.map((ing) => (
                  <div 
                     key={ing.id}
                     onMouseEnter={() => setActive(ing.id)}
                     onMouseLeave={() => setActive(null)}
                     className={`p-10 border-b-2 transition-all cursor-crosshair group ${active === ing.id ? 'border-rose-600' : 'border-black/5'}`}
                  >
                     <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">{ing.name}</h3>
                        <span className="text-xl font-black opacity-20">{ing.amount}</span>
                     </div>
                     <p className={`text-[10px] uppercase tracking-[0.4em] transition-opacity ${active === ing.id ? 'opacity-100' : 'opacity-0'}`}>
                        {ing.note}
                     </p>
                  </div>
               ))}
            </div>

            <div className="mt-24">
               <button className="w-full px-12 py-6 bg-black text-white font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 transition-all">Download Protocol</button>
            </div>
         </div>

      </main>

    </div>
  );
}
