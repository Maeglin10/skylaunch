"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../premium.css";

const NODES = 40;

export default function ParticleNeuralWeb() {
  const [points, setPoints] = useState<any[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const pts = Array.from({ length: NODES }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      driftX: Math.random() * 10 - 5,
      driftY: Math.random() * 10 - 5,
    }));
    setPoints(pts);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="premium-theme bg-[#050505] text-[#eee] h-screen w-full overflow-hidden relative selection:bg-cyan-500 font-mono">
      
      {/* Neural Web Background */}
      <div className="absolute inset-0 z-0 opacity-40">
         {points.map((p) => (
            <motion.div 
               key={p.id}
               style={{ 
                  left: `${p.x}%`, 
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  translateX: smoothX,
                  translateY: smoothY,
               }}
               className="absolute bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"
            >
               {/* Decorative connections (Simulated with simple divs) */}
               {p.id % 4 === 0 && (
                  <div className="absolute top-1/2 left-1/2 w-48 h-[1px] bg-cyan-500/20 origin-left rotate-45" />
               )}
            </motion.div>
         ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all bg-black/40 backdrop-blur-xl border-b border-cyan-500/10">
        <Link href="/" className="text-xl font-black tracking-widest uppercase text-cyan-500">Neural.Mesh</Link>
        <div className="flex gap-12 text-[10px] uppercase font-black items-center">
            <div className="flex gap-2">
               <span className="opacity-40">Sync_Status:</span>
               <span className="text-white">OPTIMIZED</span>
            </div>
            <div className="hidden lg:block h-1 w-24 bg-cyan-500/20 relative overflow-hidden">
               <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-cyan-500 w-1/2" />
            </div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
         >
            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block italic">Cognitive Pattern Detection v.0.4.2</span>
            <h1 className="text-7xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-[0.8] mb-12">
               Connected <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #06b6d4' }}>Reality.</span>
            </h1>
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.5em] leading-relaxed italic opacity-40 font-black mb-12">
               Observing the invisible threads that bind our collective neural landscape.
            </p>
            <button className="px-12 py-6 border border-cyan-500/40 text-cyan-500 font-black uppercase text-xs tracking-[1em] rounded-full hover:bg-cyan-500 hover:text-black transition-all">Initialize Scan</button>
         </motion.div>
      </main>

      {/* Vertical Status Indicator */}
      <div className="fixed right-12 bottom-12 z-50 flex flex-col items-end gap-2 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
         <div>Node_ID: 0x442_F</div>
         <div>Cluster_Health: 100%</div>
      </div>

    </div>
  );
}
