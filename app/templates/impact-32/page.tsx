"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const MENU_ITEMS = [
  { id: 1, name: "Neural Truffle", price: "84", desc: "Digital foam, silicon essence, carbon structure.", img: "/templates/agency_hero.png", color: "#6366f1" },
  { id: 2, name: "Glass Consomé", price: "52", desc: "Refractive broth, silica scales, distilled light.", img: "/templates/tech_noir.png", color: "#ec4899" },
  { id: 3, name: "Brutal Carpaccio", price: "125", desc: "Concrete-aged protein, marble salt, iron reduction.", img: "/templates/brutalist_staircase.png", color: "#10b981" },
];

export default function FoodLiquidMenu() {
  const [active, setActive] = useState(0);

  return (
    <div className="premium-theme bg-[#050510] text-[#eee] h-screen w-full overflow-hidden relative selection:bg-[#ec4899]">
      
      {/* Background Fluid Glow */}
      <AnimatePresence mode="wait">
         <motion.div 
           key={active}
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 0.3, scale: 1.2 }}
           exit={{ opacity: 0, scale: 1.5 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0 z-0 blur-[150px]"
           style={{ backgroundColor: MENU_ITEMS[active].color }}
         />
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference">
         <Link href="/" className="text-xl font-serif italic tracking-tighter uppercase text-[#ec4899]">Aevia.Kitchen</Link>
         <div className="flex gap-4 items-center">
            <span className="text-[10px] uppercase font-black opacity-40">Reservation_Active</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black">BK</div>
         </div>
      </nav>

      <main className="relative z-10 h-full w-full flex flex-col lg:flex-row">
         
         {/* Left: Menu Selection */}
         <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-12 lg:p-24 space-y-12">
            <span className="text-xs uppercase tracking-[0.5em] font-black opacity-20 mb-8 block font-mono italic">Signature_Degustation_v4</span>
            {MENU_ITEMS.map((item, i) => (
               <motion.button 
                 key={item.id}
                 onMouseEnter={() => setActive(i)}
                 className={`text-left transition-all ${active === i ? 'pl-8' : 'opacity-20 hover:opacity-40'}`}
               >
                  <div className="flex items-baseline gap-4">
                     <span className="text-xs font-mono font-black italic">0{item.id}</span>
                     <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-none">{item.name}</h2>
                  </div>
               </motion.button>
            ))}
         </div>

         {/* Right: Dish Detail (Visual) */}
         <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-12">
            <AnimatePresence mode="wait">
               <motion.div 
                 key={active}
                 initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                 animate={{ opacity: 1, rotate: 0, scale: 1 }}
                 exit={{ opacity: 0, rotate: -45, scale: 1.2 }}
                 transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                 className="relative w-full aspect-square max-w-[500px]"
               >
                  {/* Circular Rotating Frame */}
                  <div className="absolute inset-[-10%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-[-5%] border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 glass elevation-24 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                     <Image 
                        src={MENU_ITEMS[active].img} 
                        alt={MENU_ITEMS[active].name} 
                        fill 
                        className="object-cover scale-150 saturate-150 brightness-75 hover:scale-100 transition-transform duration-[2s]" 
                     />
                  </div>

                  {/* Floating Specs */}
                  <div className="absolute top-12 right-0 glass px-6 py-4 border-white/10 rounded-2xl flex flex-col items-end">
                     <span className="text-[10px] uppercase font-black tracking-widest text-[#ec4899] mb-2">Refinement</span>
                     <div className="text-xl font-mono font-black italic">${MENU_ITEMS[active].price}</div>
                  </div>
                  
                  <div className="absolute bottom-12 left-0 max-w-xs text-left mix-blend-difference">
                     <p className="text-sm font-medium uppercase tracking-widest leading-relaxed italic opacity-80">
                        {MENU_ITEMS[active].desc}
                     </p>
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>

      </main>

      {/* Numerical Footer */}
      <footer className="fixed bottom-12 left-12 right-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="text-[10px] font-black uppercase tracking-[1em] opacity-20">Continuous Culinary Evolution</div>
         <div className="text-right text-[8px] font-black uppercase tracking-widest opacity-20 italic font-mono">
            Kitchen_Sync_v9.42 <br /> Temp_84&deg;C
         </div>
      </footer>

      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
      `}</style>
    </div>
  );
}
