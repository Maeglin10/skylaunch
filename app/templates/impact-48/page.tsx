"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const CHAPTERS = [
  { id: 1, title: "Origin", img: "/templates/tech_noir.png", cat: "0x00" },
  { id: 2, title: "Form", img: "/templates/brutalist_staircase.png", cat: "0x01" },
  { id: 3, title: "Portal", img: "/templates/portal_frame.png", cat: "0x02" },
  { id: 4, title: "Lumina", img: "/templates/editorial_lux.png", cat: "0x03" },
];

export default function HorizontalNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-white text-black h-[400vh] relative overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all border-b border-black/5 bg-white/40 backdrop-blur-xl">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Narrative.OS</Link>
        <div className="flex gap-4 items-center opacity-40">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Scroll Vertical / Move Horizontal</span>
        </div>
      </nav>

      {/* Horizontal Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
         <motion.div style={{ x }} className="flex">
            {CHAPTERS.map((chapter) => (
               <section key={chapter.id} className="relative w-screen h-screen flex flex-col items-center justify-center p-12 lg:p-48 bg-white border-r border-black/5">
                  
                  {/* Background Number */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vw] font-black opacity-[0.03] select-none pointer-events-none italic">
                     0{chapter.id}
                  </div>

                  <div className="grid grid-cols-12 gap-12 w-full max-w-7xl items-center relative z-10">
                     <div className="col-span-12 lg:col-span-5 space-y-12">
                        <span className="text-xs uppercase tracking-[0.8em] font-black italic opacity-20 block">{chapter.cat}</span>
                        <h2 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-[0.8] mb-12">
                           {chapter.title}
                        </h2>
                        <p className="max-w-md text-xl font-light opacity-60 leading-relaxed uppercase tracking-wider italic">
                           Defining the intersection of digital fragmentation and structural integrity.
                        </p>
                        <div className="h-1 lg:w-48 bg-black/10 relative overflow-hidden">
                           <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-black" />
                        </div>
                     </div>
                     <div className="col-span-12 lg:col-span-7 relative aspect-video overflow-hidden rounded-[4rem] shadow-2xl elevation-24 mt-12 lg:mt-0">
                        <Image src={chapter.img} alt={chapter.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] contrast-125" />
                        <div className="absolute inset-0 bg-white/10" />
                     </div>
                  </div>

               </section>
            ))}
         </motion.div>
      </div>

      {/* Horizontal Status Bar */}
      <div className="fixed bottom-12 left-12 right-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="flex flex-col gap-2">
            <div className="h-2 w-64 bg-black/5 relative overflow-hidden bg-white/10">
               <motion.div 
                 style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                 className="absolute inset-y-0 left-0 bg-black bg-white" 
               />
            </div>
         </div>
      </div>

    </div>
  );
}
