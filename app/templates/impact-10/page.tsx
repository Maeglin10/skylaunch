"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import "../premium.css";

export default function TypoHeroTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const textBlur = useTransform(scrollYProgress, [0.3, 0.5], ["0px", "20px"]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  const marqueeX1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const marqueeX2 = useTransform(scrollYProgress, [0, 1], [-1000, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-white min-h-[300vh] selection:bg-[#fdff00] selection:text-black overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-black italic tracking-tighter">TYPOGRAPHY_V1</Link>
        <div className="flex gap-12 text-[10px] uppercase font-black">
           <span className="opacity-40 tracking-[0.5em]">Session.44</span>
        </div>
      </nav>

      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Marquees */}
        <div className="absolute inset-0 flex flex-col justify-center gap-4 pointer-events-none opacity-10">
           {[...Array(6)].map((_, i) => (
             <motion.div 
               key={i}
               style={{ x: i % 2 === 0 ? marqueeX1 : marqueeX2 }}
               className="text-8xl md:text-[15vh] font-black uppercase whitespace-nowrap leading-none border-t border-b border-white/20 py-4"
             >
                EXPLORE THE LIMITS OF FORM EXPLORE THE LIMITS OF FORM 
             </motion.div>
           ))}
        </div>

        {/* Central Typo Hero */}
        <motion.div 
          style={{ scale: textScale, filter: `blur(${textBlur})`, opacity: textOpacity }}
          className="relative z-10 text-center px-12"
        >
           <h1 className="text-7xl md:text-[12vw] font-black uppercase italic leading-[0.8] tracking-tighter mix-blend-difference">
             Think <br />
             <span className="text-[#fdff00]">Bigger.</span>
           </h1>
           <div className="mt-24 h-24 w-[2px] bg-[#fdff00] mx-auto animate-bounce opacity-40" />
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="relative z-20 bg-[#fdff00] text-black py-48 px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
           <div>
              <h2 className="text-6xl md:text-9xl font-black uppercase italic leading-none mb-12 tracking-tighter">Pure <br /> Logic.</h2>
              <p className="text-xl md:text-2xl font-black uppercase leading-tight max-w-md">
                 We remove the noise. We amplify the message. 
                 Typography is not just reading, it's feeling.
              </p>
           </div>
           <div className="space-y-12">
              <div className="border-t-[8px] border-black pt-8">
                 <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">01. Precision</h3>
                 <p className="opacity-60 font-bold text-sm leading-relaxed uppercase">Every pixel governed by mathematical harmony and typographic rigor.</p>
              </div>
              <div className="border-t-[8px] border-black pt-8">
                 <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">02. Impact</h3>
                 <p className="opacity-60 font-bold text-sm leading-relaxed uppercase">Designs that command the viewport and demand attention from the first second.</p>
              </div>
              <div className="border-t-[8px] border-black pt-8">
                 <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">03. Scale</h3>
                 <p className="opacity-60 font-bold text-sm leading-relaxed uppercase">Fluid scaling from mobile screens to massive digital installations.</p>
              </div>
           </div>
        </div>
      </section>

      <footer className="h-screen flex flex-col items-center justify-center p-12 text-center bg-black">
         <div className="text-[15vw] font-black uppercase italic tracking-tighter text-white/5 mb-12">AGAIN.</div>
         <button className="px-12 py-6 bg-[#fdff00] text-black font-black uppercase text-xs tracking-[1em] hover:scale-110 transition-transform">
           Start Project
         </button>
      </footer>
    </div>
  );
}
