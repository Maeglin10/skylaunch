"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function OnePageStoryTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const section1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.6], [300, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 1], [300, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-black text-white min-h-[400vh] selection:bg-rose-500">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black italic tracking-tighter mix-blend-difference pointer-events-auto uppercase">Aethel.Story</Link>
        <div className="flex gap-4 items-center">
           <div className="h-32 w-[2px] bg-white/20 relative">
              <motion.div 
                style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                className="absolute top-0 left-0 w-full bg-white shadow-[0_0_15px_white]"
              />
           </div>
        </div>
      </nav>

      {/* STICKY BACKGROUNDS */}
      <div className="fixed inset-0 pointer-events-none">
         <motion.div style={{ opacity: section1Opacity }} className="absolute inset-0">
            <Image src="/templates/portal_frame.png" alt="Scene 1" fill className="object-cover brightness-50 grayscale" />
         </motion.div>
         <motion.div style={{ opacity: section2Opacity }} className="absolute inset-0">
            <Image src="/templates/tech_noir.png" alt="Scene 2" fill className="object-cover brightness-50" />
         </motion.div>
         <motion.div style={{ opacity: section3Opacity }} className="absolute inset-0">
            <Image src="/templates/portal_inner.png" alt="Scene 3" fill className="object-cover brightness-50" />
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* SCROLLABLE STORY CONTENT */}
      <main className="relative z-10 flex flex-col items-center">
         
         {/* Chapter 1 */}
         <section className="h-screen flex items-center justify-center p-12">
            <motion.div style={{ y: y1 }} className="max-w-4xl text-center">
               <span className="text-xs uppercase tracking-[0.8em] font-black italic opacity-40 mb-8 block">Chapter_01: The Threshold</span>
               <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">Beyond <br /> Sight.</h1>
               <div className="h-[2px] w-32 bg-white/40 mx-auto" />
            </motion.div>
         </section>

         {/* Chapter 2 */}
         <section className="h-screen flex items-center justify-center p-12">
            <motion.div style={{ y: y2 }} className="max-w-4xl">
               <span className="text-xs uppercase tracking-[0.8em] font-black italic opacity-40 mb-8 block">Chapter_02: Neural Bridge</span>
               <h2 className="text-8xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">Direct <br /> Intel.</h2>
               <p className="max-w-md text-xl font-light opacity-60 leading-relaxed uppercase tracking-wider">
                  The intersection of biology and silicon. A transition that redefines what it means to experience reality.
               </p>
            </motion.div>
         </section>

         {/* Chapter 3 */}
         <section className="h-screen flex items-center justify-center p-12">
            <motion.div style={{ y: y3 }} className="max-w-4xl text-right flex flex-col items-end">
               <span className="text-xs uppercase tracking-[0.8em] font-black italic opacity-40 mb-8 block">Chapter_03: Convergence</span>
               <h2 className="text-8xl md:text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-12">Return to <br /> Nature.</h2>
               <p className="max-w-md text-xl font-light opacity-60 leading-relaxed uppercase tracking-wider">
                  Finding the organic in the digital void. A sanctuary built from pure light and neural signals.
               </p>
               <button className="mt-12 px-12 py-6 border border-white uppercase text-[10px] tracking-[0.8em] font-black hover:bg-white hover:text-black transition-all">Begin Again</button>
            </motion.div>
         </section>

      </main>

      {/* HUD FOOTER */}
      <footer className="fixed bottom-12 left-12 z-50 mix-blend-difference pointer-events-none">
         <div className="flex flex-col gap-2">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">System Status</div>
            <div className="flex gap-2">
               {[1, 2, 3].map(i => <div key={i} className="w-12 h-1 bg-white/20 overflow-hidden"><div className="w-full h-full bg-white opacity-40 animate-pulse" /></div>)}
            </div>
         </div>
      </footer>
    </div>
  );
}
