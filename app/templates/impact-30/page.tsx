"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import "../premium.css";

const PARTICLE_COUNT = 60;

export default function MouseTrapParticles() {
  const [particles, setParticles] = useState<any[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const pts = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10,
    }));
    setParticles(pts);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="premium-theme bg-[#020202] text-white h-screen w-full overflow-hidden relative selection:bg-cyan-500">
      
      {/* Interactive Particle Field */}
      <div className="absolute inset-0 z-0">
         {particles.map((p) => (
           <motion.div 
             key={p.id}
             style={{ 
                left: `${p.x}%`, 
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                x: useTransform(smoothX, (v) => (v - (p.x/100 * 1920)) / p.speed),
                y: useTransform(smoothY, (v) => (v - (p.y/100 * 1080)) / p.speed),
             }}
             className="absolute bg-cyan-500/40 rounded-full blur-[1px]"
           />
         ))}
      </div>

      {/* Background HUD Rings */}
      <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
         className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
      >
         <div className="w-[80vw] h-[80vw] border border-dashed border-cyan-500 rounded-full" />
         <div className="absolute w-[60vw] h-[60vw] border border-cyan-500 rounded-full opacity-20" />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase pointer-events-auto">Mousetrap.FX</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">System Alpha-v9</div>
      </nav>

      {/* Main Content Card */}
      <main className="relative z-10 h-full flex items-center justify-center p-12">
         <motion.div 
            style={{ 
               rotateX: useTransform(smoothY, [0, 1080], [15, -15]),
               rotateY: useTransform(smoothX, [0, 1920], [-15, 15]),
            }}
            className="glass-card p-12 md:p-24 rounded-[4rem] text-center border border-white/10 backdrop-blur-3xl relative overflow-hidden"
         >
            <div className="relative z-10">
               <span className="text-xs uppercase tracking-[0.8em] font-black opacity-30 mb-8 block font-mono">Particle Engine Interaction</span>
               <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                  Fluid <br /> <span className="text-cyan-500">Physics.</span>
               </h1>
               <div className="flex justify-center gap-8">
                  <button className="px-12 py-6 bg-white text-black font-black uppercase italic text-xs tracking-widest hover:scale-110 transition-transform">Initialize View</button>
               </div>
            </div>

            {/* Background Glow inside Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent -z-10" />
         </motion.div>
      </main>

      {/* Status Indicators */}
      <footer className="fixed bottom-12 left-12 right-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="flex flex-col gap-2">
            <div className="text-[8px] uppercase font-black tracking-widest opacity-40 mb-2">Magnetic Attraction Active</div>
            <div className="flex gap-2 h-4 items-end">
               {[1, 2, 3, 4, 5, 6].map(i => (
                  <motion.div 
                     key={i}
                     animate={{ height: [`${20 + i*10}%`, `${80 - i*10}%`, `${20 + i*10}%`] }}
                     transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                     className="w-1 bg-cyan-500"
                  />
               ))}
            </div>
         </div>
         <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20 italic">
            Orbital Physics v4.0.12
         </div>
      </footer>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
