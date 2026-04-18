"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Box, Zap, ChevronLeft, Volume2, Share2, Play, Pause } from "lucide-react";
import "../premium.css";

export default function ImmersiveNarrativeSPA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isPlaying, setIsPlaying] = useState(false);

  // Transitions for each chapter
  const s1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const s2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0]);
  const s3Opacity = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);

  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0.3, 0.6], [1.1, 1]);
  const scale3 = useTransform(scrollYProgress, [0.6, 1], [1.2, 1]);

  const yMove = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-black text-rose-50 min-h-[400vh] selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <button className="text-xl font-black italic tracking-tighter mix-blend-difference pointer-events-auto uppercase text-white">
          AETHEL_LOGIC
        </button>
        <div className="flex gap-12 items-center pointer-events-auto">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Chapter_Sequence</span>
              <div className="h-1 w-32 bg-white/10 mt-2 relative">
                 <motion.div 
                   style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                   className="absolute top-0 left-0 h-full bg-rose-500 shadow-[0_0_15px_#f43f5e]"
                 />
              </div>
           </div>
           <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition-all opacity-40 hover:opacity-100">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
           </button>
        </div>
      </nav>

      {/* STICKY VISUAL ENGINE */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div style={{ opacity: s1Opacity, scale: scale1 }} className="absolute inset-0">
             <Image src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop" alt="Scene 1" fill className="object-cover brightness-50" />
          </motion.div>
          <motion.div style={{ opacity: s2Opacity, scale: scale2 }} className="absolute inset-0">
             <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Scene 2" fill className="object-cover brightness-50 contrast-125" />
          </motion.div>
          <motion.div style={{ opacity: s3Opacity, scale: scale3 }} className="absolute inset-0">
             <Image src="https://images.unsplash.com/photo-1464802686167-b939a67e06a1?q=80&w=2000&auto=format&fit=crop" alt="Scene 3" fill className="object-cover brightness-50" />
          </motion.div>
          
          {/* Grain & Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      {/* STORY LAYERS */}
      <main className="relative z-10 flex flex-col items-center">
         
         {/* Chapter 1: The Void */}
         <section className="h-screen flex flex-col items-center justify-center p-12 text-center">
            <motion.div 
               initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}
               className="max-w-5xl"
            >
               <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-12 block">Series_01 / Origin</span>
               <h1 className="text-7xl md:text-[14vw] font-black uppercase italic leading-[0.75] tracking-tighter mb-16">
                  BEYOND_ <br /> <span className="text-rose-500">SIGHT.</span>
               </h1>
               <div className="mt-12 flex justify-center gap-12 text-[10px] items-center">
                  <div className="flex items-center gap-3 opacity-30">
                     <Volume2 className="w-4 h-4" /> <span>NARRATIVE_AUDIO_ACTIVE</span>
                  </div>
                  <div className="px-6 py-3 border border-white/20 rounded-full font-black tracking-widest uppercase opacity-40">Scroll to Initiate</div>
               </div>
            </motion.div>
         </section>

         {/* Chapter 2: The Transition */}
         <section className="h-screen flex items-center justify-between p-12 md:p-32 max-w-[1800px] w-full">
            <motion.div 
               initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
               className="max-w-xl"
            >
               <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30 mb-8 block font-mono">_Protocol: NEURAL_BRIDGE</span>
               <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-12">DIRECT_ <br/> INTEL.</h2>
               <p className="text-xl md:text-2xl font-light opacity-50 leading-relaxed uppercase tracking-widest mb-12">
                  The intersection of biology and silicon. A threshold that redefines the very essence of localized reality.
               </p>
               <button className="flex items-center gap-4 group">
                  <div className="w-20 h-[2px] bg-rose-500 group-hover:w-32 transition-all" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">Sync_Nodes</span>
               </button>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
               className="hidden lg:block w-96 aspect-[3/4] glass rounded-[3rem] p-4 animate-float"
            >
               <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" alt="Abstract" fill className="object-cover opacity-60 grayscale" />
                  <div className="absolute inset-0 bg-rose-500/20 mix-blend-overlay" />
               </div>
            </motion.div>
         </section>

         {/* Chapter 3: The Convergence */}
         <section className="h-screen flex flex-col items-center justify-center p-12 text-center bg-black/40 backdrop-blur-sm w-full">
            <motion.div 
               initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}
               className="max-w-5xl"
            >
               <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-12 block">Series_03 / Synthesis</span>
               <h1 className="text-7xl md:text-[12vw] font-black uppercase italic leading-[0.8] tracking-tighter mb-16 underline decoration-rose-500 decoration-[1rem] underline-offset-[2rem]">
                  RETURN TO <br /> NATURE.
               </h1>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-32 text-center">
                  {[
                    { l: "Frequency", v: "432 Hz" },
                    { l: "Stability", v: "Optimal" },
                    { l: "Phase", v: "Alpha" },
                    { l: "Uptime", v: "100%" }
                  ].map((s, i) => (
                    <div key={i}>
                       <div className="text-2xl font-black italic tracking-tighter mb-2">{s.v}</div>
                       <div className="text-[10px] uppercase font-black tracking-widest opacity-20">{s.l}</div>
                    </div>
                  ))}
               </div>
               <button className="mt-32 px-16 py-8 bg-rose-500 text-white font-black uppercase text-xs tracking-[1em] hover:scale-105 transition-transform shadow-[0_0_50px_rgba(244,63,94,0.4)]">
                  RESTART_LOGIC
               </button>
            </motion.div>
         </section>

      </main>

      {/* PERSISTENT HUB FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none text-[8px] uppercase font-black tracking-[0.5em] opacity-40">
         <div className="flex flex-col gap-4">
            <div className="flex gap-4">
               <span>LAT: 48.8566</span>
               <span>LONG: 2.3522</span>
            </div>
            <div className="flex gap-2">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-[1px] bg-white" />)}
            </div>
         </div>
         <div className="flex gap-12 items-end">
            <div className="text-right">
               Aevia_OS <br /> Experimental_Build
            </div>
            <Share2 className="w-4 h-4" />
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-30px) rotate(2deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
