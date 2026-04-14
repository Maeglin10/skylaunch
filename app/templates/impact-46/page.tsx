"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function GlitchVideoHero() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-theme bg-[#050505] text-white h-screen w-full overflow-hidden relative selection:bg-rose-500">
      
      {/* Background Animated Video-like Layer */}
      <div className="absolute inset-0 z-0">
         <motion.div 
            animate={{ 
               scale: glitch ? 1.05 : 1,
               filter: glitch ? 'hue-rotate(90deg) contrast(200%)' : 'hue-rotate(0deg) contrast(100%)'
            }}
            className="w-full h-full relative"
         >
            <Image 
               src="/templates/tech_noir.png" 
               alt="Glitch Background" 
               fill 
               className="object-cover brightness-50 contrast-125" 
            />
         </motion.div>
         {/* Noise Overlay */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <Link href="/" className="text-xl font-black tracking-[0.5em] uppercase text-rose-500">Glitch.OS</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <a href="#" className="hover:opacity-100">Access</a>
           <a href="#" className="hover:opacity-100 italic">Logs</a>
        </div>
      </nav>

      {/* Main Glitch Text Content */}
      <main className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
         <div className="relative">
            {/* Split Text Effect */}
            <motion.h1 
               animate={glitch ? { x: [-10, 10, -5, 0], opacity: [0.5, 1, 0.7, 1] } : {}}
               className="text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 relative z-20"
            >
               ERROR <br /> <span className="text-rose-600">STATE.</span>
            </motion.h1>
            
            {/* Glitch Shadow Layers */}
            {glitch && (
               <>
                  <div className="absolute inset-0 text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-cyan-400 opacity-50 z-10 translate-x-2 animate-pulse">ERROR <br /> STATE.</div>
                  <div className="absolute inset-0 text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-yellow-400 opacity-50 z-10 -translate-x-2 animate-pulse">ERROR <br /> STATE.</div>
               </>
            )}
         </div>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
         >
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.8em] leading-relaxed italic opacity-40 font-black mb-12">
               System breach detected at 04:00. <br /> Integrity verification required.
            </p>
            <button className="px-16 py-8 border-2 border-rose-600 text-rose-600 font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 hover:text-white transition-all">Recover System</button>
         </motion.div>
      </main>

      {/* HUD Data Strips */}
      <div className="fixed left-12 bottom-12 z-50 flex flex-col gap-2 font-mono text-[8px] uppercase font-black opacity-20">
         <div className="flex gap-2 text-rose-600">
            <span>Buffer:</span>
            <span>0x442_F_RECOVERY</span>
         </div>
         <div className="flex gap-2">
            <span>Lat:</span>
            <span>45.322.12</span>
         </div>
      </div>

      <div className="fixed right-12 bottom-12 z-50 flex flex-col items-end gap-2 text-[8px] font-black uppercase tracking-widest opacity-20 italic">
         <div>Sequence_v42.1</div>
         <div className="h-1 w-24 bg-white/10 relative">
            <motion.div animate={{ width: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-y-0 left-0 bg-rose-600" />
         </div>
      </div>

    </div>
  );
}
