"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import "../premium.css";

export default function MagneticHUD() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#020205] text-cyan-400 h-screen w-full overflow-hidden selection:bg-cyan-500">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.2) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-cyan-500/10">
         <Link href="/" className="text-xl font-bold tracking-[0.5em] uppercase text-cyan-500">Magnetic_HUD</Link>
         <div className="flex gap-12 font-mono text-[10px] items-center">
            <div className="flex gap-2">
               <span className="opacity-40">Cursor_X:</span>
               <motion.span className="text-white">{useTransform(mouseX, (v) => v.toFixed(0))}</motion.span>
            </div>
            <div className="flex gap-2 text-rose-500">
               <span className="opacity-40 text-cyan-400">Stream:</span>
               <span className="font-bold">LIVE</span>
            </div>
         </div>
      </nav>

      {/* Magnetic Layout */}
      <main className="relative h-full w-full flex items-center justify-center p-24 z-10">
         <div className="grid grid-cols-12 gap-12 w-full max-w-7xl">
            
            {/* Main Interactive Card */}
            <motion.div 
               style={{ 
                  rotateX: useTransform(smoothY, [0, 1000], [10, -10]),
                  rotateY: useTransform(smoothX, [0, 1920], [-10, 10]),
               }}
               className="col-span-12 lg:col-span-8 glass p-12 rounded-[2.5rem] border-cyan-500/20 relative group elevation-24"
            >
               <div className="relative z-10">
                  <span className="text-xs uppercase tracking-[0.8em] font-black opacity-40 mb-8 block">Projected Neural Data</span>
                  <h1 className="text-8xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] mb-12 text-white">
                     Focus <br /> <span className="text-cyan-500 text-transparent" style={{ WebkitTextStroke: '2px #06b6d4' }}>Control.</span>
                  </h1>
                  <div className="flex gap-8">
                     <button className="px-12 py-6 bg-cyan-500 text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform rounded-xl">Initialize Node</button>
                     <button className="px-12 py-6 border border-cyan-500/20 text-cyan-500 font-black uppercase text-xs tracking-widest hover:bg-cyan-500/10 transition-all rounded-xl">Diagnostic</button>
                  </div>
               </div>

               {/* Magnetic Floating Elements */}
               <motion.div 
                 style={{ 
                    x: useTransform(smoothX, [0, 1920], [-40, 40]),
                    y: useTransform(smoothY, [0, 1000], [-40, 40])
                 }}
                 className="absolute top-12 right-12 w-32 h-32 border border-cyan-500/40 rounded-full flex items-center justify-center animate-spin"
               >
                  <div className="w-16 h-1 w-[80%] bg-cyan-500/40" />
               </motion.div>
            </motion.div>

            {/* Sidebar Diagnostic Panels */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
               {[
                 { label: "Core Sync", val: "99.8%" },
                 { label: "Neural Flow", val: "ACTIVE" },
                 { label: "Buffer", val: "CLEAR" }
               ].map((panel, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ scale: 1.05, x: 10 }}
                   className="glass p-8 rounded-2xl border-cyan-500/10 flex justify-between items-center"
                 >
                    <div>
                       <div className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">{panel.label}</div>
                       <div className="text-2xl font-black text-white">{panel.val}</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-cyan-500/20 flex items-center justify-center">
                       <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse" />
                    </div>
                 </motion.div>
               ))}
            </div>

         </div>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-12 left-12 right-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="flex flex-col gap-2">
            <div className="h-1 lg:w-96 bg-cyan-500/20 relative overflow-hidden">
               <motion.div 
                 animate={{ x: ['-100%', '100%'] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-cyan-500 w-1/2 shadow-[0_0_20px_#06b6d4]"
               />
            </div>
            <span className="text-[8px] uppercase tracking-widest font-black text-cyan-500">Real-time Stream Integration Alpha-45</span>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(2, 2, 5, 0.6);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(6, 182, 212, 0.1);
        }
      `}</style>
    </div>
  );
}
