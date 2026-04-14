"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function VideoCinematicFull() {
  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-rose-600">
      
      {/* Simulated Video Background (Panning Image with Motion Blur) */}
      <div className="absolute inset-0 z-0">
         <motion.div 
            animate={{ 
               scale: [1, 1.1, 1],
               x: [-20, 20, -20],
               y: [-10, 10, -10]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
         >
            <Image src="/templates/editorial_lux.png" alt="Video BG" fill className="object-cover opacity-60 grayscale brightness-75 contrast-125 saturate-150" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
         </motion.div>
         {/* Film Grain & Scratches */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }} />
      </div>

      {/* Cinematic Frame Black Bars */}
      <div className="fixed inset-x-0 top-0 h-12 bg-black z-[100]" />
      <div className="fixed inset-x-0 bottom-0 h-12 bg-black z-[100]" />

      {/* Navigation */}
      <nav className="fixed top-12 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Film.Unit</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Scene_048 / Night_Vision</div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
         >
            <span className="text-xs uppercase tracking-[0.8em] font-black italic mb-8 block opacity-40">A Digital Feature Presentation</span>
            <h1 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
               Siren <br /> <span className="text-rose-600">Call.</span>
            </h1>
            <div className="flex justify-center gap-12 font-mono text-[10px] uppercase font-black tracking-widest opacity-60 mb-24">
               <span>ARRI ALEXA 65</span>
               <span>|</span>
               <span>ANAMORPHIC RED</span>
            </div>
            <button className="px-16 py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 hover:text-white transition-all shadow-2xl">Watch Trailer</button>
         </motion.div>
      </main>

      {/* Camera HUD Indicator */}
      <div className="fixed bottom-24 left-12 z-50 flex items-center gap-6 mix-blend-difference pointer-events-none uppercase font-black text-[10px]">
         <div className="w-4 h-4 rounded-full bg-rose-600 animate-pulse" />
         <span className="tracking-widest italic">RECORDING [00:14:12]</span>
         <span className="opacity-40 ml-4 font-mono">CODEC: PRORES 4444</span>
      </div>

    </div>
  );
}
