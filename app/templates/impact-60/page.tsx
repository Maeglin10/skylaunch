"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const STACK = [
  { id: 1, img: "/templates/editorial_lux.png", title: "Archive_01", color: "#f43f5e" },
  { id: 2, img: "/templates/tech_noir.png", title: "Archive_02", color: "#06b6d4" },
  { id: 3, img: "/templates/brutalist_staircase.png", title: "Archive_03", color: "#fbbf24" },
];

export default function PhotographyBrutalistStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="premium-theme bg-white text-black min-h-screen selection:bg-black selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Stack.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Photography_Unit_0x60</div>
      </nav>

      {/* Hero Header */}
      <header className="h-[50vh] flex flex-col items-center justify-center p-12 text-center">
         <span className="text-xs uppercase tracking-[0.8em] font-black opacity-20 mb-8 block">Collection / Fragments / Unity</span>
         <h1 className="text-7xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
            The <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Stack.</span>
         </h1>
      </header>

      {/* Reveal Stack */}
      <main className="pb-64">
         {STACK.map((item, i) => (
            <Section key={item.id} item={item} i={i} />
         ))}
      </main>

      {/* Minimal Footer */}
      <footer className="h-screen flex items-center justify-center p-12 text-center bg-black text-white">
         <div className="max-w-4xl">
            <h2 className="text-[10vw] font-black uppercase italic tracking-tighter mb-12 opacity-90">End of Session.</h2>
            <button className="px-16 py-8 border-2 border-white text-white font-black uppercase text-xs tracking-[1em] italic hover:bg-white hover:text-black transition-all">Reset Sequence</button>
         </div>
      </footer>

    </div>
  );
}

function Section({ item, i }: { item: any, i: number }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={innerRef} className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
       <motion.div 
         style={{ scale, opacity, y }}
         className="relative w-full h-full max-w-[1400px] max-h-[800px] border-[20px] md:border-[60px] border-white shadow-2xl elevation-24 bg-neutral-100 overflow-hidden"
       >
          <Image src={item.img} alt={item.title} fill className="object-cover grayscale contrast-125 hover:grayscale-0 transition-grayscale duration-[2s]" />
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          
          <div className="absolute top-12 left-12 text-[10vw] font-black uppercase italic text-white mix-blend-difference opacity-20 leading-none pointer-events-none">
             0{item.id}
          </div>

          <div className="absolute bottom-12 right-12 text-right">
             <span className="text-[10px] uppercase font-black tracking-widest italic text-white mix-blend-difference opacity-40 mb-4 block">Archive_Ref_0x{item.id+100}</span>
             <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mix-blend-difference">{item.title}</h2>
          </div>
       </motion.div>
    </section>
  );
}
