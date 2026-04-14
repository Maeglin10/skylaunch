"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../premium.css";

export default function DynamicLiveStream() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toISOString());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="premium-theme bg-[#020202] text-rose-500 h-screen w-full overflow-hidden relative">
      
      {/* Background "Video" Layer (Animated Gradients + Grain) */}
      <div className="absolute inset-0 z-0 opacity-40">
         <motion.div 
            animate={{ 
               background: [
                  'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)',
                  'radial-gradient(circle at 40% 60%, #1a1a1a 0%, #000 100%)',
                  'radial-gradient(circle at 60% 40%, #1a1a1a 0%, #000 100%)'
               ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="w-full h-full"
         />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all border-b border-rose-500/10 bg-black/40 backdrop-blur-xl">
        <Link href="/" className="text-xl font-black tracking-[0.5em] uppercase text-rose-600">Dynamic.Live</Link>
        <div className="flex gap-12 font-mono text-[10px] items-center">
            <div className="flex gap-2 items-center">
               <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
               <span className="font-bold text-white tracking-[0.2em]">CONNECTION_STABLE</span>
            </div>
            <div className="hidden md:block opacity-40 text-rose-500">Latency: 14ms</div>
        </div>
      </nav>

      {/* HUD Overlays */}
      <main className="relative z-10 h-full w-full p-24 flex flex-col justify-between">
         
         {/* Top HUD */}
         <div className="flex justify-between items-start">
            <div className="space-y-4">
               <div className="text-[10px] uppercase font-black tracking-[0.4em] opacity-40 italic">Global_Signal_Index</div>
               <div className="text-4xl font-black text-white">FRAGMENT_004</div>
            </div>
            <div className="text-right">
               <div className="text-5xl font-mono font-black italic text-rose-600">LIVE</div>
               <div className="text-[10px] font-mono opacity-40 tracking-tighter">{timestamp}</div>
            </div>
         </div>

         {/* Center Content */}
         <div className="text-center">
            <motion.h1 
               animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
               transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
               className="text-[15vw] font-black uppercase italic tracking-tighter leading-none text-white mix-blend-difference"
            >
               STREAM.
            </motion.h1>
         </div>

         {/* Bottom HUD */}
         <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-4">
               <div className="glass p-8 rounded-2xl border border-rose-500/20">
                  <div className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-4">Input_Feed_v1</div>
                  <div className="flex gap-1 h-8 items-end">
                     {[...Array(24)].map((_, i) => (
                        <motion.div 
                           key={i} 
                           animate={{ height: [`${20 + Math.random()*80}%`, `${20 + Math.random()*80}%`] }}
                           className="flex-1 bg-rose-600" 
                        />
                     ))}
                  </div>
               </div>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col items-center">
               <button className="px-16 py-6 bg-rose-600 text-black font-black uppercase text-xs tracking-[1em] italic hover:scale-110 transition-transform shadow-[0_0_50px_rgba(225,29,72,0.4)]">Initialize Feed</button>
            </div>
            <div className="col-span-12 lg:col-span-4 text-right">
               <div className="text-[8px] uppercase font-black tracking-[1em] opacity-20 italic">Aevia Broadcast Systems &reg;</div>
            </div>
         </div>

      </main>

      <style jsx global>{`
        .glass {
          background: rgba(225, 29, 72, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
