"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function HeroGlitchVideo() {
  return (
    <div className="premium-theme bg-[#0a0a0f] text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background Glitch Asset */}
      <div className="absolute inset-0 z-0">
         <motion.div 
            animate={{ 
               opacity: [0.3, 0.4, 0.3],
               scale: [1, 1.05, 1],
               filter: ["contrast(150%) brightness(0.8)", "contrast(180%) brightness(1)", "contrast(150%) brightness(0.8)"]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-full h-full relative"
         >
            <Image 
               src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
               alt="Glitch Background" 
               fill 
               className="object-cover grayscale brightness-50" 
            />
         </motion.div>
         
         {/* Procedural Glitch Planes */}
         <motion.div 
            animate={{ 
               opacity: [0, 0.5, 0],
               y: ["-100%", "100%"]
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 bg-rose-600/20 mix-blend-screen z-10"
         />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600 underline decoration-2 underline-offset-8">Glitch.Unit</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Frequency_Jammer_v.073</div>
      </nav>

      {/* Hero Massive Content */}
      <main className="relative z-20 h-full w-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
         >
            <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-20 text-rose-500">System_Under_Attack</span>
            <h1 className="relative text-[15vw] font-black uppercase italic tracking-tighter leading-[0.8] mb-12">
               CORE <br /> <span className="text-transparent" style={{ WebkitTextStroke: '3px white' }}>BREACH.</span>
               
               {/* Glitch Shadow Effect */}
               <motion.span 
                  animate={{ x: [-2, 2, -1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="absolute inset-0 text-rose-600 -z-10 translate-x-2"
               >
                  CORE <br /> BREACH.
               </motion.span>
            </h1>
            
            <p className="max-w-md mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black mb-12">
               Synchronizing defensive sub-layers against autonomous structural fragmentation.
            </p>
            
            <div className="flex gap-12 justify-center">
               <button className="px-12 py-6 bg-rose-600 text-black font-black uppercase text-xs tracking-[1em] italic hover:scale-110 transition-transform shadow-[0_0_50px_rgba(225,29,72,0.4)]">Stabilize</button>
               <button className="px-12 py-6 border border-white/20 uppercase text-xs tracking-[1em] font-black italic hover:bg-white hover:text-black transition-all">Abort_Task</button>
            </div>
         </motion.div>
      </main>

      {/* Side Status Indicators */}
      <div className="fixed left-12 bottom-12 z-50 flex flex-col gap-2 font-mono text-[8px] font-black uppercase tracking-widest opacity-20">
         <div className="flex gap-2 text-rose-600 leading-none">
            <span>Critical:</span>
            <span>MEMORY_LEAK_IN_SECTOR_0x73</span>
         </div>
         <div className="w-64 h-2 bg-white/10 rounded-full relative overflow-hidden mt-4">
            <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-y-0 left-0 bg-rose-600" />
         </div>
      </div>

    </div>
  );
}
