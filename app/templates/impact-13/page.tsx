"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ITEMS = [
  { id: 1, title: "LUMINA", img: "/templates/tech_noir.png" },
  { id: 2, title: "VEIL", img: "/templates/editorial_lux.png" },
  { id: 3, title: "KRYPT", img: "/templates/agency_hero.png" },
  { id: 4, title: "DRIFT", img: "/templates/brutalist_staircase.png" },
  { id: 5, title: "VOX", img: "/templates/portal_frame.png" },
];

export default function FluidCarouselTemplate() {
  const constraintsRef = useRef(null);

  return (
    <div className="premium-theme bg-[#050505] text-white min-h-screen overflow-hidden cursor-crosshair">
      
      {/* Dynamic Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-start mix-blend-difference">
         <Link href="/" className="text-3xl font-black italic tracking-tighter">FLUIDITY&trade;</Link>
         <div className="flex flex-col items-end gap-2 text-[10px] uppercase font-black opacity-40">
            <span>Scroll & Drag</span>
            <div className="w-12 h-[1px] bg-white"></div>
         </div>
      </nav>

      <main className="h-screen flex items-center">
         <motion.div 
           ref={constraintsRef}
           className="px-[20vw] flex gap-24 cursor-grab active:cursor-grabbing h-[60vh]"
           drag="x"
           dragConstraints={{ left: -1500, right: 0 }}
           transition={{ type: "spring", damping: 30, stiffness: 200 }}
         >
           {ITEMS.map((item, i) => (
             <motion.div 
               key={item.id}
               className="relative min-w-[60vw] md:min-w-[40vw] h-full group bg-white/5 border border-white/5 rounded-3xl overflow-hidden"
             >
                {/* Background Large Index */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vh] font-black opacity-[0.03] select-none italic pointer-events-none">
                   0{i + 1}
                </div>

                <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase font-black tracking-widest opacity-20">Production_X1</span>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-xs group-hover:bg-white group-hover:text-black transition-all">
                         &nearr;
                      </div>
                   </div>

                   <div className="max-w-xs transition-transform duration-500 group-hover:translate-x-4">
                      <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">{item.title}</h2>
                      <p className="text-xs uppercase tracking-[0.4em] opacity-40 leading-relaxed font-bold">
                         Advanced neural networks meeting high-end design principles.
                      </p>
                   </div>
                </div>

                {/* Floating Product Image - Partial View */}
                <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-full aspect-square opacity-20 group-hover:opacity-100 transition-all duration-1000 scale-125 group-hover:scale-100">
                   <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                </div>
             </motion.div>
           ))}
         </motion.div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-12 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="text-[10px] uppercase font-black tracking-[0.5em] opacity-20">Continuous Deployment Active</div>
         <div className="flex gap-4 items-end">
            <div className="text-right text-[10px] uppercase font-black tracking-widest leading-tight">
               Aeon System <br /> v4.0.21
            </div>
            <div className="flex gap-1 h-3">
               {[1, 2, 3, 4].map(i => <div key={i} className={`w-1 h-full bg-white opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>
    </div>
  );
}
