"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function VideoMultiLayer() {
  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-rose-500">
      
      {/* Background Layer 1: Base Video (Simulated) */}
      <div className="absolute inset-0 z-0 opacity-40">
         <motion.div 
            animate={{ 
               scale: [1, 1.05, 1],
               rotate: [0, 1, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
         >
            <Image src="/templates/tech_noir.png" alt="Base Layer" fill className="object-cover contrast-125" />
         </motion.div>
      </div>

      {/* Layer 2: Texture Overlay (Simulated) */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen">
         <motion.div 
            animate={{ 
               opacity: [0.1, 0.4, 0.1],
               x: [-50, 50, -50]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="w-full h-full bg-gradient-to-tr from-rose-500/20 via-transparent to-cyan-500/20"
         />
      </div>

      {/* Layer 3: HUD / Frame */}
      <div className="absolute inset-0 z-20 pointer-events-none border-[40px] border-black/40 backdrop-blur-[2px]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Layered.FX</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Sequence_0x051</div>
      </nav>

      {/* Main Content */}
      <main className="relative z-30 h-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
         >
            <span className="text-xs uppercase tracking-[0.8em] font-black italic mb-8 block opacity-40">Multi-Layered Visual Synthesis</span>
            <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">
               Depth <br /> <span className="text-rose-600">Sync.</span>
            </h1>
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black mb-12">
               Merging multiple temporal streams into a single perceptual event.
            </p>
            <button className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 hover:text-white transition-all">Generate Stream</button>
         </motion.div>
      </main>

      {/* Corner Specs */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 mix-blend-difference pointer-events-none opacity-20">
         <div className="w-1 h-32 bg-white/20 relative">
            <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-x-0 h-4 bg-white" />
         </div>
      </div>

    </div>
  );
}
