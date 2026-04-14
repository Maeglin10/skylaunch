"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PANELS = [
  { id: 1, title: "ATMOS", desc: "System layer 01. Mapping environmental density.", pos: "top-24 left-12" },
  { id: 2, title: "LUMEN", desc: "Light refraction Unit. 0x442.", pos: "bottom-48 right-12" },
];

export default function VideoFloatingGlass() {
  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 opacity-40">
         <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="w-full h-full relative"
         >
            <Image 
               src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000" 
               alt="Nature Background" 
               fill 
               className="object-cover brightness-50 contrast-125" 
            />
         </motion.div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/20 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Glass.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Observation_Unit_v.076</div>
      </nav>

      {/* Floating Glass Panels */}
      <main className="relative z-20 h-full w-full">
         <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center pointer-events-none">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 2 }}
               className="bg-white/10 backdrop-blur-3xl p-24 border border-white/20 rounded-[5rem] shadow-[0_0_100px_rgba(255,255,255,0.05)] pointer-events-auto"
            >
               <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40">Aevia_Optical_Processing</span>
               <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                  Fractal <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Vision.</span>
               </h1>
               <button className="px-12 py-6 bg-white text-black font-black uppercase text-[10px] tracking-[1em] italic hover:scale-110 transition-transform">Initialize Scan</button>
            </motion.div>
         </div>

         {/* Secondary Floating Panels */}
         {PANELS.map((p) => (
            <motion.div 
               key={p.id}
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, delay: p.id * 0.5 }}
               className={`absolute ${p.pos} w-64 p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl hidden lg:block`}
            >
               <h3 className="text-rose-600 font-black italic mb-2 tracking-widest text-xs uppercase">{p.title}</h3>
               <p className="text-[8px] uppercase tracking-widest leading-relaxed opacity-40 font-black">{p.desc}</p>
            </motion.div>
         ))}
      </main>

      {/* Numerical Index Side */}
      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         OPTICS_ACTIVE
      </div>

    </div>
  );
}
