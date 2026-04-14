"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const CHAPTERS = [
  { id: 1, title: "The Signal", img: "/templates/tech_noir.png", desc: "It began with a pulse, a faint geometric whisper in the dark." },
  { id: 2, title: "The Structure", img: "/templates/brutalist_staircase.png", desc: "Monolithic forms emerged from the void, defining the new boundaries." },
  { id: 3, title: "The Portal", img: "/templates/portal_frame.png", desc: "Thresholds were crossed. There was no returning to the previous state." },
];

export default function StorytellingJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="premium-theme bg-black text-white selection:bg-white selection:text-black">
      
      {/* VCR / Static Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Persistent HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-opacity hover:opacity-100 opacity-20 bg-gradient-to-b from-black to-transparent">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Journey.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic">Data_Fragment_004</div>
      </nav>

      {/* Chapters Stream */}
      <main>
         {CHAPTERS.map((chapter) => (
            <Section key={chapter.id} chapter={chapter} />
         ))}
      </main>

      {/* Minimal Footer */}
      <footer className="h-screen flex flex-col items-center justify-center p-12 text-center bg-white text-black">
         <h2 className="text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">END.</h2>
         <button className="px-12 py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] italic hover:scale-110 transition-transform">Restart Fragment</button>
      </footer>
    </div>
  );
}

function Section({ chapter }: { chapter: any }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={innerRef} className="h-screen relative flex items-center justify-center overflow-hidden snap-start">
       <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
          <Image 
            src={chapter.img} 
            alt={chapter.title} 
            fill 
            className="object-cover grayscale contrast-125 brightness-50" 
          />
       </motion.div>
       
       <div className="relative z-10 text-center space-y-12 px-12">
          <motion.div style={{ y }}>
             <span className="text-xs uppercase tracking-[1em] font-black opacity-40 mb-8 block font-mono">Chapter_0{chapter.id}</span>
             <h2 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                {chapter.title}
             </h2>
             <p className="max-w-md mx-auto text-sm uppercase tracking-[0.4em] leading-relaxed italic opacity-60 font-black">
                {chapter.desc}
             </p>
          </motion.div>
       </div>

       {/* Floating HUD Side Indicators */}
       <div className="absolute left-12 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase rotate-[-90deg] opacity-20 tracking-widest italic">
          FRAGMENT_SEQUENCE_v.0{chapter.id}
       </div>
    </section>
  );
}
