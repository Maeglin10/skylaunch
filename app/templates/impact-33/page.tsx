"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import "../premium.css";

const PARTICLE_COUNT = 80;

export default function ParticleWaveFX() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: (i / PARTICLE_COUNT) * 100,
      baseY: 50,
      phase: Math.random() * Math.PI * 2,
      amplitude: Math.random() * 10 + 5,
      speed: Math.random() * 2 + 1,
    }));
    setParticles(pts);
  }, []);

  const waveShift = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#030305] text-white min-h-[300vh] overflow-hidden selection:bg-purple-600">
      
      {/* Particle Wave Layer */}
      <div className="fixed inset-0 z-0">
         {particles.map((p) => {
           // We'll use a CSS animation or motion.div to create the wave
           return (
             <motion.div 
               key={p.id}
               style={{ 
                 left: `${p.x}%`, 
                 y: waveShift,
               }}
               className="absolute w-1 h-1 bg-purple-500 rounded-full blur-[1px]"
             >
                <motion.div 
                  animate={{ 
                    y: [p.amplitude, -p.amplitude, p.amplitude],
                  }}
                  transition={{ 
                    duration: p.speed, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: p.phase / 10
                  }}
                  className="w-full h-full bg-inherit rounded-full shadow-[0_0_10px_#a855f7]"
                />
             </motion.div>
           );
         })}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference">
         <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Wave.OS</Link>
         <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Frequency_9Hz</div>
      </nav>

      {/* Hero Content */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center p-12 overflow-hidden">
         <motion.div 
           style={{ opacity: textOpacity }}
           className="relative z-10 text-center"
         >
            <span className="text-xs uppercase tracking-[0.8em] font-black opacity-40 mb-8 block font-mono">Dynamic Wavefront Processing</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Pulse <br /> <span className="text-purple-500">Node.</span>
            </h1>
            <div className="h-32 w-[2px] bg-purple-500/40 mx-auto animate-pulse" />
         </motion.div>
      </section>

      {/* Detailed Content */}
      <section className="relative z-10 py-64 px-12 bg-black/20 backdrop-blur-3xl">
         <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-12 italic">Constant <br /> Flow.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-32 max-w-4xl">
               <div className="text-left space-y-8 border-l-2 border-purple-500/20 pl-8">
                  <h3 className="text-xl font-black uppercase italic tracking-widest">01_Oscillation</h3>
                  <p className="text-sm opacity-40 leading-relaxed uppercase tracking-widest font-black">
                     Mathematical sine patterns governing particle behavior across the neural mesh.
                  </p>
               </div>
               <div className="text-left space-y-8 border-l-2 border-purple-500/20 pl-8">
                  <h3 className="text-xl font-black uppercase italic tracking-widest">02_Interference</h3>
                  <p className="text-sm opacity-40 leading-relaxed uppercase tracking-widest font-black">
                     Real-time depth detection creating wave interference patterns on user interaction.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="h-screen flex items-center justify-center text-center pb-24">
         <motion.button 
           whileHover={{ scale: 1.1 }}
           className="px-12 py-8 bg-purple-600 text-white font-black uppercase text-xs tracking-[1em] italic hover:bg-white hover:text-black transition-all"
         >
            Resonate
         </motion.button>
      </footer>

      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-widest italic">
         <div>Engine: QuantumWave_v4</div>
         <div>Lat: 45.322 | Long: 0.127</div>
      </div>
    </div>
  );
}
