"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const IMAGES = [
  { id: 1, img: "/templates/tech_noir.png", speed: 0.2 },
  { id: 2, img: "/templates/editorial_lux.png", speed: -0.1 },
  { id: 3, img: "/templates/agency_hero.png", speed: 0.3 },
  { id: 4, img: "/templates/brutalist_staircase.png", speed: -0.2 },
  { id: 5, img: "/templates/portal_frame.png", speed: 0.4 },
];

export default function PhotographyKineticGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-[300vh] selection:bg-black selection:text-white">
      
      {/* Editorial Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-opacity hover:opacity-100 opacity-20 bg-white/50 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="text-xl font-serif italic tracking-tighter uppercase">Kinetic.Lens</Link>
        <div className="text-[10px] uppercase tracking-[0.6em] font-black italic">Collection_v2.4</div>
      </nav>

      {/* Hero Title */}
      <header className="sticky top-0 h-screen flex flex-col items-center justify-center p-12 text-center overflow-hidden pointer-events-none">
         <motion.div
           style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
         >
            <span className="text-xs uppercase tracking-[1em] font-black opacity-30 mb-8 block font-mono">Archive / Rhythm / Light</span>
            <h1 className="text-8xl md:text-[15vw] font-serif font-black italic tracking-tighter leading-none mb-12">
               Moving <br /> <span className="not-italic text-transparent" style={{ WebkitTextStroke: '2px black' }}>Stillness.</span>
            </h1>
         </motion.div>
      </header>

      {/* Kinetic Photography Grid */}
      <main className="relative z-10 px-12 pb-64">
         <div className="grid grid-cols-12 gap-8 md:gap-24">
            {IMAGES.map((img, i) => {
               const y = useTransform(scrollYProgress, [0, 1], [0, i * 400 * img.speed]);
               
               return (
                  <motion.div 
                    key={img.id}
                    style={{ y }}
                    className={`col-span-12 md:col-span-6 lg:col-span-4 relative aspect-[3/4] overflow-hidden group border-8 border-white shadow-2xl elevation-24 mt-${(i % 3) * 24}`}
                  >
                     <Image 
                        src={img.img} 
                        alt="Kinetic Shot" 
                        fill 
                        className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
                     />
                     <div className="absolute inset-x-8 bottom-8 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] uppercase font-black tracking-widest italic font-mono mb-2 block">Phase_0{img.id}</span>
                        <h2 className="text-2xl font-serif italic">Archive_Item_{img.id+100}</h2>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
               );
            })}
         </div>
      </main>

      {/* Numerical Index Reveal */}
      <div className="fixed left-12 bottom-12 z-50 text-[10vw] font-serif italic opacity-[0.03] select-none pointer-events-none leading-none mix-blend-difference invert">
         {Math.floor(scrollYProgress.get() * 100)}%
      </div>

      <footer className="h-screen flex items-center justify-center p-12 text-center bg-black text-white">
         <div className="max-w-2xl">
            <h2 className="text-6xl font-serif italic mb-12 opacity-90">Experience the world through a different frequency.</h2>
            <button className="px-12 py-6 border border-white uppercase text-[10px] tracking-[1em] font-black italic hover:bg-white hover:text-black transition-all">Begin Capture</button>
         </div>
      </footer>
    </div>
  );
}
