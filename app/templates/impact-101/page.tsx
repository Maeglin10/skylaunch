"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function Impact101Centurion() {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div 
      className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-purple-600 font-mono" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      {/* Background Immersive Asset */}
      <div className="absolute inset-0 z-0">
         <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
         >
            <Image 
               src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=2000" 
               alt="Centurion Scene" 
               fill 
               className="object-cover opacity-60 brightness-75 contrast-150 saturate-[0.2]" 
            />
         </motion.div>
         {/* Particle Rain Layer */}
         <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
               <motion.div 
                  key={i}
                  initial={{ y: -10, x: `${Math.random() * 100}%` }}
                  animate={{ y: "110vh" }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 5 }}
                  className="absolute w-[1px] h-32 bg-purple-500"
               />
            ))}
         </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-purple-500/20">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-purple-600">Century.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Milestone_Node_v.101</div>
      </nav>

      {/* Main 3D Stage */}
      <main className="h-full w-full flex items-center justify-center p-12 perspective-[2000px]">
         <motion.div 
            style={{ rotateX, rotateY }}
            className="relative w-full max-w-6xl aspect-video bg-white/5 backdrop-blur-3xl border border-purple-500/30 rounded-[6rem] overflow-hidden shadow-[0_0_150px_rgba(147,51,234,0.1)] p-12 md:p-24 flex flex-col justify-center items-center text-center group"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5 }}
            >
               <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-12 block text-purple-400">Centennial Substrate Synchronization</span>
               <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                  THE <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">PRIME.</span>
               </h1>
            </motion.div>

            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="max-w-xl mx-auto text-[10px] uppercase tracking-[0.8em] leading-relaxed italic opacity-40 font-black mb-16"
            >
               Celebrating 100 architectural nodes within the Skylaunch ecosystem. A synthesis of physics, geometry, and pure aesthetic intent.
            </motion.p>
            
            <button className="px-12 py-8 bg-purple-600 text-white font-black uppercase text-xs tracking-[1.5em] italic hover:scale-110 transition-transform shadow-[0_0_80px_rgba(147,51,234,0.4)]">Initialize Phase_02</button>
         </motion.div>
      </main>

      {/* Floating Meta Stats */}
      <div className="fixed left-12 bottom-12 z-50 flex gap-24 text-[8px] font-black uppercase tracking-[1em] opacity-20 italic">
         <div>Nodes: 101/200</div>
         <div>Integrity: 100%</div>
      </div>

    </div>
  );
}
