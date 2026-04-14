"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, title: "CYBER", img: "/templates/tech_noir.png" },
  { id: 2, title: "LUSTRE", img: "/templates/editorial_lux.png" },
  { id: 3, title: "AEON", img: "/templates/agency_hero.png" },
  { id: 4, title: "BRUT", img: "/templates/brutalist_staircase.png" },
];

export default function FluidDynamicsCarousel() {
  const [active, setActive] = useState(0);

  return (
    <div className="premium-theme bg-[#050510] text-white h-screen w-full flex flex-col overflow-hidden selection:bg-cyan-500">
      
      {/* Dynamic Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase pointer-events-auto">Fluid.OS</Link>
        <div className="flex gap-4 items-center opacity-40">
           <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
           <span className="text-[10px] uppercase font-black tracking-widest italic">Sequence Active</span>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center relative p-12">
        
        {/* Carousel Container */}
        <div className="flex gap-4 w-full h-[70vh]">
          {SLIDES.map((slide, i) => (
            <motion.div
              key={slide.id}
              onClick={() => setActive(i)}
              animate={{ 
                flex: active === i ? 6 : 1,
                opacity: active === i ? 1 : 0.4
              }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="relative h-full overflow-hidden group cursor-pointer bg-white/5 border border-white/10 rounded-[2rem]"
            >
               <Image
                 src={slide.img}
                 alt={slide.title}
                 fill
                 className={`object-cover transition-all duration-1000 ${active === i ? 'scale-100 saturate-100' : 'scale-150 saturate-0'}`}
               />
               
               {/* Liquid Overlay Effect (CSS Mask) */}
               <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent mix-blend-overlay"></div>

               {/* Center Title for Active */}
               <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <motion.div
                    animate={{ 
                       y: active === i ? 0 : 50,
                       opacity: active === i ? 1 : 0
                    }}
                    transition={{ duration: 1 }}
                  >
                     <span className="text-[10px] uppercase font-black tracking-[0.5em] text-cyan-400 mb-4 block">Archive_Node_{slide.id}</span>
                     <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-4">{slide.title}</h2>
                     <p className="max-w-xs text-xs font-medium uppercase tracking-widest opacity-60 leading-relaxed italic">
                        Real-time displacement mapping across neural textures.
                     </p>
                  </motion.div>
               </div>

               {/* Collapsed Vertical Title */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] uppercase font-black tracking-[1em] opacity-20 pointer-events-none transition-opacity duration-500 ${active === i ? 'opacity-0' : 'opacity-100'}`}>
                  {slide.title}
               </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Numerical Footer Navigation */}
      <footer className="p-12 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest font-black italic opacity-40">
         <div className="flex gap-8">
            {SLIDES.map((_, i) => (
               <button key={i} onClick={() => setActive(i)} className={`hover:text-cyan-400 transition-colors ${active === i ? 'text-cyan-400' : ''}`}>
                  0{i + 1}
               </button>
            ))}
         </div>
         <div>SYSTEM_TIME: {new Date().toLocaleTimeString()}</div>
      </footer>
    </div>
  );
}
