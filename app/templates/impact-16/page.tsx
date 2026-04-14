"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function SilentBeamsTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const beamOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const beamRotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#020502] text-white min-h-[200vh] overflow-x-hidden selection:bg-emerald-600">
      
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0">
         <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
            <Image
               src="/templates/portal_inner.png"
               alt="Rainforest Depth"
               fill
               className="object-cover brightness-50 contrast-125 saturate-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
         </motion.div>
      </div>

      {/* Special FX: Silent Beams (Light Rays) */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
         {[...Array(5)].map((_, i) => (
           <motion.div 
             key={i}
             style={{ 
               opacity: beamOpacity,
               rotate: beamRotate,
               x: `${(i - 2) * 20}%`
             }}
             className="absolute top-[-50%] left-1/2 w-[200px] h-[200%] bg-gradient-to-b from-white/20 to-transparent blur-[60px] origin-top"
           />
         ))}
      </div>

      {/* HUD Content Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-serif italic tracking-tighter mix-blend-difference pointer-events-auto">Silent.Beams</Link>
        <div className="flex flex-col items-end gap-2">
            <div className="text-[10px] uppercase tracking-[0.6em] font-black opacity-40 italic">Nature_Protocol</div>
            <div className="w-16 h-[2px] bg-white animate-pulse"></div>
        </div>
      </nav>

      {/* Center Content */}
      <main className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
           whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           transition={{ duration: 2 }}
           className="max-w-4xl"
        >
           <h1 className="text-8xl md:text-[15vw] font-serif italic leading-[0.8] mb-12 tracking-tighter drop-shadow-2xl">
             Breath <br /> 
             <span className="not-italic font-black text-transparent" style={{ WebkitTextStroke: '2px white' }}>Deeply.</span>
           </h1>
           <p className="max-w-md mx-auto text-lg md:text-xl font-light opacity-60 leading-relaxed uppercase tracking-widest mb-16">
              An immersive exploration of light and environment. <br />
              Layered for total focus.
           </p>
           <button className="group relative px-12 py-6 overflow-hidden">
              <span className="relative z-10 text-[10px] uppercase tracking-[1em] font-black italic">Start Sequence</span>
              <div className="absolute inset-0 border border-white/20 group-hover:bg-white group-hover:text-black transition-all" />
           </button>
        </motion.div>
      </main>

      {/* Detail Section (Scroll Down) */}
      <section className="relative z-20 h-screen flex items-end p-24">
         <div className="max-w-xl text-left">
            <div className="h-1 w-24 bg-white/40 mb-12" />
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-8 leading-none">Immersive <br /> Layers.</h2>
            <p className="text-sm opacity-40 leading-relaxed uppercase tracking-widest font-bold">
               We use advanced parallax masking to separate light from shadow, creating a 3D window into another reality.
            </p>
         </div>
      </section>

      {/* Footer Info */}
      <div className="fixed bottom-12 right-12 z-50 text-right mix-blend-difference pointer-events-none">
         <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">FX_ENGINE_4.0</div>
      </div>
    </div>
  );
}
