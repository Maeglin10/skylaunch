"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "../premium.css";

function KineticText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%", rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="bg-[#1a1a1a] text-white px-10 py-6 rounded-full font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-black transition-colors"
    >
      {children}
    </motion.button>
  );
}

export default function PremiumNewsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#EAE8E3] text-[#1a1a1a] min-h-screen font-serif flex flex-col items-center justify-center overflow-hidden selection:bg-[#1a1a1a] selection:text-white relative">
      
      {/* ANIMATED GRADIENT BLOB */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
         <motion.div 
            style={{ scale: bgScale, rotate: bgRotate }}
            className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] bg-gradient-to-tr from-[#d4cfc5] via-[#EAE8E3] to-[#e6dfd1] rounded-full blur-[100px] opacity-60"
         />
      </div>

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center min-h-screen justify-center">
         
         <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="w-20 h-20 bg-[#1a1a1a] text-[#EAE8E3] rounded-full flex items-center justify-center font-black text-4xl italic mb-12 shadow-2xl">
            L.
         </motion.div>
         
         <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.85] mb-12 uppercase text-[#1a1a1a]">
            <KineticText text="Better writing." /> <br />
            <span className="italic text-transparent" style={{ WebkitTextStroke: "2px #1a1a1a" }}><KineticText text="Better thinking." /></span>
         </h1>
         
         <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }} className="text-xl md:text-3xl font-light italic max-w-2xl mx-auto text-[#1a1a1a]/60 leading-relaxed mb-16">
            Join 15,000+ readers receiving a weekly dispatch on clarity, creativity, and the craft.
         </motion.p>
         
         <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
            <div className="w-full relative group">
               <input 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="w-full bg-transparent border-b-2 border-[#1a1a1a]/20 py-4 px-2 text-center text-2xl font-sans font-bold text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors"
               />
            </div>
            <MagneticButton>
               Subscribe <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40 mt-4">No spam. Unsubscribe anytime.</p>
         </motion.form>

         {/* ARTICLES PREVIEW */}
         <div className="mt-48 w-full border-t border-[#1a1a1a]/10 pt-16">
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#1a1a1a]/30 mb-12">Recent Dispatches</div>
            <div className="flex flex-col gap-8 text-left">
               {["The Illusion of Writer's Block", "Structuring the Messy Middle", "Why We Read (And Forget)"].map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                     <Link href="#" className="group flex justify-between items-end border-b border-[#1a1a1a]/5 pb-6">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic group-hover:text-[#1a1a1a]/50 transition-colors">{t}</h3>
                        <div className="text-[10px] font-sans font-bold uppercase tracking-widest hidden md:block">0{i+1}</div>
                     </Link>
                  </motion.div>
               ))}
            </div>
         </div>

      </main>
      
      <div className="fixed bottom-8 left-8 text-[10px] font-sans font-bold uppercase tracking-[0.2em] opacity-30 pointer-events-none hidden md:block">
         Est. 2026 // L. Dispatch
      </div>
    </div>
  );
}
