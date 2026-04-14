"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EcommerceMinimalObjects() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-black selection:text-white">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black tracking-tight uppercase">Obj.01</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-bold text-black/40">
           <a href="#" className="hover:text-black hover:italic">Shop</a>
           <a href="#" className="hover:text-black">Cart (00)</a>
        </div>
      </nav>

      {/* Main Product Feature */}
      <main className="grid grid-cols-12 min-h-screen">
        
        {/* Left: Product Image */}
        <div className="col-span-12 lg:col-span-7 relative h-[60vh] lg:h-screen bg-[#f3f3f3] overflow-hidden group">
           <motion.div 
             initial={{ scale: 1.1, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.5 }}
             className="w-full h-full"
           >
              <Image 
                src="/templates/tech_noir.png" 
                alt="Minimal Object" 
                fill 
                className="object-contain scale-90 group-hover:scale-100 transition-transform duration-[2s]" 
              />
           </motion.div>
           {/* Static HUD Callouts */}
           <div className="absolute top-24 left-12 text-[8px] font-black uppercase tracking-[0.5em] opacity-20">
              Technical_Visual_v4
           </div>
        </div>

        {/* Right: Info & Pricing */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center p-12 lg:p-24 bg-white border-l border-black/5">
           <motion.div
             initial={{ x: 50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             transition={{ duration: 1 }}
           >
              <span className="text-xs font-mono font-bold opacity-30 mb-8 block uppercase tracking-widest">Limited Edition / Series One</span>
              <h1 className="text-7xl md:text-9xl font-black leading-[0.8] uppercase tracking-tighter mb-12">
                 Neural <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>Glass.</span>
              </h1>
              <p className="max-w-md text-xl font-light leading-relaxed mb-12 opacity-60">
                 A new benchmark in optical clarity and biometric integration. 
                 Designed for silent observers.
              </p>
              
              <div className="flex flex-col md:flex-row items-end gap-12 mb-24">
                 <div className="text-6xl font-black italic">$2,499</div>
                 <button className="w-full md:w-auto px-16 py-8 bg-black text-white font-black uppercase text-xs tracking-[0.5em] hover:bg-neutral-800 transition-colors">
                    Add to System
                 </button>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-black/5">
                 <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-20 mb-4 italic">Resolution</h3>
                    <p className="font-mono text-sm font-bold uppercase tracking-tighter">8K Ultra-HDR</p>
                 </div>
                 <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-20 mb-4 italic">Linkage</h3>
                    <p className="font-mono text-sm font-bold uppercase tracking-tighter">5G Low-Latency</p>
                 </div>
              </div>
           </motion.div>
        </div>

      </main>

      {/* Floating Side Info */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 font-mono text-[8px] uppercase font-black opacity-20 items-end">
         <div className="rotate-90 origin-right">Lat: 51.522 N</div>
         <div className="rotate-90 origin-right">Ref: 0x442_A</div>
      </div>

      <footer className="p-12 text-center text-[10px] font-mono font-bold uppercase tracking-[1em] opacity-10">
         End of Item _ 2026 Archive
      </footer>
    </div>
  );
}
