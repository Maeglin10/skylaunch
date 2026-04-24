"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight, Activity, Zap, Shield, Menu, Search, ArrowRight, Layers } from "lucide-react";
import "../premium.css";

const IMAGES = [
  { url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1500", title: "SILENT ECHO", loc: "ICELAND", year: "2025" },
  { url: "https://images.unsplash.com/photo-1516106649774-4b533e7216a9?auto=format&fit=crop&q=80&w=1500", title: "URBAN VOID", loc: "TOKYO", year: "2026" },
  { url: "https://images.unsplash.com/photo-1528612198083-d34346808795?auto=format&fit=crop&q=80&w=1500", title: "DESERT GEOMETRY", loc: "NAMIBIA", year: "2024" },
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1500", title: "PORTRAIT 042", loc: "PARIS", year: "2026" },
  { url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1500", title: "MONOLITH", loc: "UTAH", year: "2025" },
];

export default function PremiumPhotographySPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Transform for horizontal scroll simulation in horizontal-style layouts
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#0a0a0a] text-[#e0e0e0] h-[500vh] font-serif selection:bg-white selection:text-black overflow-x-hidden relative">
      
      {/* CUSTOM CURSOR */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      >
         <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase opacity-40">View</span>
      </motion.div>

      {/* NOISE & GLOW */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white opacity-[0.01] blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-2xl font-black tracking-[0.3em] uppercase italic">N.STUDIO</Link>
        <div className="flex gap-12 items-center">
           <div className="hidden md:flex flex-col items-end text-[10px] font-sans font-bold uppercase tracking-[0.4em] opacity-40 italic font-mono">
              <span>Archive // 2026</span>
              <span>Metric // Alpha_166</span>
           </div>
           <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <Plus className="w-6 h-6" />
           </button>
        </div>
      </header>

      {/* HORIZONTAL CONTENT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
         <motion.div style={{ x: xTranslate }} className="flex gap-24 md:gap-48 px-[10vw] items-center h-full">
            
            {/* INTRO TEXT */}
            <div className="min-w-[80vw] md:min-w-[60vw] flex flex-col justify-center">
               <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               >
                  <div className="inline-flex items-center gap-4 font-sans font-black text-[10px] uppercase tracking-[1em] text-white/20 mb-16 border-l-2 border-white pl-10 italic">
                     Visual_Capture // Series_166
                  </div>
                  <h1 className="text-[15vw] md:text-[10vw] font-black italic tracking-tighter leading-[0.8] mb-12 uppercase">
                     CAPTURING <br /> <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>THE VOID.</span>
                  </h1>
                  <p className="max-w-md text-xl md:text-2xl font-sans font-light opacity-30 leading-relaxed uppercase tracking-tight">
                     A visual exploration of emptiness, structure, and the subtle interplay between light and form.
                  </p>
               </motion.div>
            </div>

            {/* IMAGES */}
            {IMAGES.map((img, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? 2 : -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative min-w-[85vw] md:min-w-[50vw] h-[65vh] md:h-[80vh] group cursor-none"
               >
                  <div className="absolute inset-0 overflow-hidden bg-white/5 rounded-sm border border-white/5">
                     <Image 
                        src={img.url} 
                        alt={img.title} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2.5s] group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                        priority={i === 0}
                     />
                  </div>
                  
                  {/* HUD Overlay for Image */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-between z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 font-sans">
                     <div className="flex justify-between items-start text-[10px] font-black uppercase tracking-[0.6em] text-white italic">
                        <span>Frame_0x{i+166}</span>
                        <span>{img.loc}</span>
                     </div>
                     <div className="flex justify-between items-end">
                        <div className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">{img.title}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 italic font-mono">{img.year}</div>
                     </div>
                  </div>

                  <div className="absolute -bottom-20 left-0 flex justify-between w-full font-sans text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 italic">
                     <span>{img.title}</span>
                     <span>Coord_0x{i+166}_Alpha</span>
                  </div>
               </motion.div>
            ))}
            
            {/* OUTRO */}
            <div className="min-w-[80vw] md:min-w-[50vw] flex flex-col items-center justify-center text-center">
               <h2 className="text-6xl md:text-[8vw] font-black italic tracking-tighter mb-12 uppercase leading-none">STRUCTURAL <br/> REASONING.</h2>
               <Link href="#" className="flex items-center gap-8 text-[12px] font-sans font-black uppercase tracking-[1em] hover:text-white transition-all group italic">
                  Contact_Studio <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
               </Link>
               <div className="mt-48 flex gap-16 font-sans text-[9px] uppercase tracking-[0.6em] text-white/10 italic">
                  <span>Berlin</span>
                  <span>London</span>
                  <span>Tokyo</span>
               </div>
            </div>

         </motion.div>
      </div>

      {/* HUD ELEMENTS */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[9px] uppercase font-black tracking-[0.6em] italic font-mono">
         <div className="flex gap-16">
            <span>N_STUDIO_OS_ALPHA</span>
            <span>Uptime_99.9%</span>
         </div>
         <div className="flex gap-6 items-end">
            <div className="text-right leading-tight">
               ARCHIVAL_CONTROL <br /> v4.0.166
            </div>
            <div className="flex gap-1 h-6 items-end">
               {[1, 2, 3, 4, 5].map(i => <motion.div key={i} animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-[1px] bg-white" />)}
            </div>
         </div>
      </footer>

      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
