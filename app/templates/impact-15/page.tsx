"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EcommerceGhostShell() {
  return (
    <div className="premium-theme bg-[#030303] text-white min-h-screen overflow-hidden selection:bg-rose-600">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-start">
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase group">
          <span className="text-rose-600">G</span>HOST_SHELL
        </Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase opacity-40">
           <span>Model: AEV-01</span>
           <span>Stock: 04 Units</span>
        </div>
      </nav>

      {/* Product Hub */}
      <main className="relative h-screen flex items-center justify-center p-12">
        
        {/* Background Technical Grid */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,45,85,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,85,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />

        {/* Center Product Area */}
        <div className="relative w-full max-w-6xl grid grid-cols-12 gap-12 items-center">
          
          {/* Left: Metadata */}
          <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
             <motion.div 
               initial={{ x: -50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="glass p-8 rounded-2xl border-rose-500/20"
             >
                <div className="text-[10px] uppercase tracking-widest text-rose-500 font-bold mb-4">Specs</div>
                <ul className="space-y-4 font-mono text-[9px] opacity-60 uppercase">
                   <li className="flex justify-between border-b border-white/5 pb-2"><span>Resolution</span> <span className="text-white">8K Micro-OLED</span></li>
                   <li className="flex justify-between border-b border-white/5 pb-2"><span>Latency</span> <span className="text-white">0.04ms</span></li>
                   <li className="flex justify-between border-b border-white/5 pb-2"><span>Neural Link</span> <span className="text-white">v4.0 Alpha</span></li>
                </ul>
             </motion.div>
          </div>

          {/* Center: Hero Image */}
          <div className="col-span-12 lg:col-span-6 relative aspect-square order-1 lg:order-2 flex items-center justify-center">
             <motion.div 
               animate={{ 
                 y: [0, -20, 0],
                 rotateY: [0, 10, 0]
               }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative w-full h-full"
             >
                <Image
                  src="/templates/tech_noir.png"
                  alt="Aether VR"
                  fill
                  className="object-contain drop-shadow-[0_0_50px_rgba(225,29,72,0.3)]"
                />
             </motion.div>
             
             {/* Circular HUD Elements */}
             <div className="absolute inset-0 border border-rose-500/5 rounded-full scale-110 animate-pulse" />
             <div className="absolute inset-0 border border-dashed border-rose-500/10 rounded-full scale-125 animate-[spin_30s_linear_infinite]" />
          </div>

          {/* Right: Pricing & CTA */}
          <div className="col-span-12 lg:col-span-3 order-3">
             <motion.div 
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="glass p-8 rounded-2xl border-rose-500/20"
             >
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic text-rose-500">Aevia_X1</h1>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-8 font-bold">The Neural Visionary</p>
                <div className="text-5xl font-mono font-black mb-8 leading-none">$2,499<span className="text-sm opacity-20">.00</span></div>
                <button className="w-full py-5 bg-rose-600 text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-rose-600 transition-all rounded-lg">
                   Secure Unit
                </button>
             </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Status UI */}
      <footer className="fixed bottom-12 left-12 right-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none">
         <div className="flex flex-col gap-2">
            <div className="h-1 w-64 bg-white/10 overflow-hidden relative">
               <motion.div 
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-32 h-full bg-rose-600"
               />
            </div>
            <span className="text-[8px] uppercase tracking-widest font-black opacity-40">System_Integrity_Check: Nominal</span>
         </div>
         <div className="text-right text-[8px] uppercase tracking-widest font-black opacity-20">
            Design_By_Skylaunch_Industrial
         </div>
      </footer>
    </div>
  );
}
