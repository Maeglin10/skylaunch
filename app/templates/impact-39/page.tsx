"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function RealEstateBlueprintView() {
  return (
    <div className="premium-theme bg-[#0a0a0f] text-cyan-400 min-h-screen selection:bg-cyan-500 selection:text-black font-mono">
      
      {/* Blueprint Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all bg-black/40 backdrop-blur-xl border-b border-cyan-500/10">
        <Link href="/" className="text-xl font-bold tracking-[0.4em] uppercase text-cyan-500">Node_Architecture</Link>
        <div className="flex gap-12 text-[10px] uppercase font-black items-center">
            <div className="flex gap-2">
               <span className="opacity-40">Status:</span>
               <span className="text-white">DRAFTING</span>
            </div>
            <button className="px-6 py-2 border border-cyan-500/20 text-cyan-500 hover:bg-cyan-500/10 transition-all rounded">Inquire</button>
        </div>
      </nav>

      {/* Technical Hero Content */}
      <main className="pt-48 px-12 pb-24 grid grid-cols-12 gap-12 relative z-10">
         
         {/* Title Section */}
         <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
            >
               <span className="text-[10px] uppercase tracking-[1em] opacity-40 mb-8 block font-mono italic text-white">Project_Ref: 0xF44.1</span>
               <h1 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-12 text-white">
                  Design <br /> <span className="text-cyan-500 italic">V1.0</span>
               </h1>
               
               <div className="grid grid-cols-2 gap-8 max-w-md bg-cyan-500/5 p-8 border border-cyan-500/20 rounded-xl">
                  <div>
                    <h3 className="text-[8px] uppercase tracking-widest opacity-40 mb-2">Total Area</h3>
                    <p className="text-xl font-bold text-white tracking-widest leading-none">12,400SQF</p>
                  </div>
                  <div>
                    <h3 className="text-[8px] uppercase tracking-widest opacity-40 mb-2">Structural</h3>
                    <p className="text-xl font-bold text-white tracking-widest leading-none">OPTIMAL</p>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Blueprint Visual Section */}
         <div className="col-span-12 lg:col-span-6 relative aspect-square group border border-cyan-500/20 rounded-3xl overflow-hidden bg-black/40">
            <Image 
               src="/templates/brutalist_staircase.png" 
               alt="Structural Blueprint" 
               fill 
               className="object-cover grayscale hue-rotate-180 brightness-50 contrast-150 opacity-40 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100" 
            />
            
            {/* HUD Callouts */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-cyan-500/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-cyan-500/40" />
            
            <div className="absolute bottom-8 right-8 text-[8px] uppercase font-black flex flex-col items-end gap-2 p-4 glass rounded">
               <span className="text-cyan-500">Scan_Density: 99%</span>
               <span className="text-white opacity-40 italic">Render_Mode: WIREFRAME</span>
            </div>
         </div>

      </main>

      {/* Floating Specs Strip */}
      <div className="bg-cyan-500/5 py-8 border-y border-cyan-500/10 overflow-hidden whitespace-nowrap">
         <motion.div 
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 text-[10px] uppercase font-black italic opacity-40"
         >
            {[...Array(10)].map((_, i) => (
              <span key={i}>Concrete _ Steel _ Glass _ Carbon _ Neural _ Interface _ 0x442 _</span>
            ))}
         </motion.div>
      </div>

      <footer className="p-12 text-center text-[10px] uppercase tracking-[1em] font-black opacity-10 italic">
         Node_Architecture_Systems &copy; 2026 Archive
      </footer>

      <style jsx global>{`
        .glass {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
