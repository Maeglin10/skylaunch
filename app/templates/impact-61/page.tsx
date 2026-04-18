"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import "../premium.css";

const SECTIONS = [
  { id: 1, title: "Origin", color: "bg-white", text: "text-black" },
  { id: 2, title: "Form", color: "bg-black", text: "text-white" },
  { id: 3, title: "Void", color: "bg-zinc-900", text: "text-rose-600" },
  { id: 4, title: "Unity", color: "bg-rose-600", text: "text-white" },
];

export default function OnePageDotNav() {
  const [active, setActive] = useState(1);

  return (
    <div className="premium-theme h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative no-scrollbar">
      
      {/* Floating Dot Navigation */}
      <nav className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 items-center">
         {SECTIONS.map((s) => (
            <button 
               key={s.id}
               onClick={() => {
                  setActive(s.id);
                  document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="group relative flex items-center justify-end"
            >
               <span className={`mr-4 text-[8px] font-black uppercase tracking-widest transition-opacity duration-300 ${active === s.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                  {s.title}
               </span>
               <div className={`w-3 h-3 rounded-full border transition-all duration-300 ${active === s.id ? 'bg-current scale-125' : 'border-current/20 scale-100'}`} />
            </button>
         ))}
      </nav>

      {/* Floating Header */}
      <div className="fixed top-0 left-0 w-full z-40 p-12 mix-blend-difference">
         <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-white">Segment.OS</Link>
      </div>

      {/* Snapping Sections */}
      <main className="h-full w-full">
         {SECTIONS.map((s) => (
            <section 
               key={s.id} 
               id={`section-${s.id}`}
               onMouseEnter={() => setActive(s.id)}
               className={`h-screen w-full snap-start flex flex-col items-center justify-center p-12 text-center transition-colors duration-700 ${s.color} ${s.text}`}
            >
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl"
               >
                  <span className="text-xs uppercase tracking-[1em] font-black opacity-40 mb-8 block">Segment_0{s.id} / Fragment_{s.id*100}</span>
                  <h2 className="text-7xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                     {s.title}.
                  </h2>
                  <p className="max-w-md mx-auto text-sm uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black">
                     Defining the architectural boundaries of digital experience through segmented motion.
                  </p>
               </motion.div>
            </section>
         ))}
      </main>

      {/* Side Status Overlays */}
      <div className="fixed left-12 bottom-12 z-50 mix-blend-difference pointer-events-none opacity-20 text-[8px] font-black uppercase tracking-[1em] italic text-white">
         Segment_Mapping_Active_v.061
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
