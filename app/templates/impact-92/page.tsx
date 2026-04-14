"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const FRAMES = [
  { id: 1, img: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, img: "https://images.unsplash.com/photo-1523424296224-8d91b72a696c?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000" },
];

export default function PhotographyFilmStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-white min-h-[300vh] relative selection:bg-rose-500 font-mono">
      
      {/* Cinematic Film Texture Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-20 contrast-150 mix-blend-overlay noise-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600">Archive.35mm</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Film_Unit_v.092</div>
      </nav>

      {/* Vertical Film Strip Track */}
      <main className="relative z-10 pt-[20vh] flex flex-col items-center">
         <motion.div style={{ y: drift }} className="relative w-full max-w-2xl px-12 md:px-0">
            
            {/* Sprocket Holes Left */}
            <div className="absolute left-[-2rem] top-0 bottom-0 flex flex-col justify-around opacity-20">
               {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-4 h-6 border-2 border-white rounded-sm mb-4" />
               ))}
            </div>

            {/* Sprocket Holes Right */}
            <div className="absolute right-[-2rem] top-0 bottom-0 flex flex-col justify-around opacity-20">
               {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-4 h-6 border-2 border-white rounded-sm mb-4" />
               ))}
            </div>

            {/* Content Frames */}
            <div className="space-y-48">
               {FRAMES.map((frame, i) => (
                  <motion.div 
                     key={frame.id}
                     initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? 1 : -1 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     transition={{ duration: 1.5 }}
                     className="relative aspect-video bg-neutral-900 border-2 border-white/10 overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] group"
                  >
                     <Image src={frame.img} alt="Film Frame" fill className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-[2s] group-hover:scale-110 transition-transform duration-[4s]" />
                     <div className="absolute top-8 left-8 text-white mix-blend-difference">
                        <span className="text-[10px] font-black italic tracking-widest leading-none">STRIP_REF_0{i}</span>
                     </div>
                  </motion.div>
               ))}
            </div>

         </motion.div>
      </main>

      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         EMULSION_ACTIVE
      </div>

      <style jsx>{`
         .noise-bg {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
         }
      `}</style>

    </div>
  );
}
