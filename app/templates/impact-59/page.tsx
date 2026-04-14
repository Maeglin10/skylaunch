"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SPECS = [
  { id: 1, label: "01. Chrono_Core", desc: "Atomic precision at 4hz.", highlight: "top-1/4 left-1/2" },
  { id: 2, label: "02. Glass_Flux", desc: "Sapphire crystal with 9H coating.", highlight: "top-1/2 left-1/4" },
  { id: 3, label: "03. Node_Link", desc: "Biometric sensor integration.", highlight: "bottom-1/4 right-1/2" },
];

export default function EcommerceInteractiveSpecs() {
  const [activeSpec, setActiveSpec] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#050505] text-white min-h-screen selection:bg-rose-500 font-mono">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Spec.059</Link>
        <div className="flex gap-12 text-[10px] uppercase font-black opacity-40 italic items-baseline">
            <span>In_Stock: True</span>
            <span className="text-rose-600">Secure_Server_Linked</span>
        </div>
      </nav>

      <main className="grid grid-cols-12 min-h-screen pt-24">
         
         {/* Left: Product Stage */}
         <div className="col-span-12 lg:col-span-7 relative h-[60vh] lg:h-screen bg-neutral-900/50 overflow-hidden flex items-center justify-center">
            <motion.div 
               animate={{ 
                  scale: activeSpec ? 1.4 : 1.1,
                  rotate: activeSpec ? (activeSpec === 1 ? -10 : 10) : 0
               }}
               transition={{ type: "spring", damping: 30, stiffness: 100 }}
               className="relative w-full h-full"
            >
               <Image 
                  src="/templates/tech_noir.png" 
                  alt="Product" 
                  fill 
                  className="object-contain p-24 contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700" 
               />
               
               {/* Pulse Points for Active Spec */}
               {activeSpec && (
                 <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`absolute ${SPECS.find(s => s.id === activeSpec)?.highlight} w-12 h-12 bg-rose-600 rounded-full blur-xl z-20`}
                 />
               )}
            </motion.div>

            {/* Background Data Matrix */}
            <div className="absolute inset-0 z-0 opacity-[0.03] select-none pointer-events-none p-12 overflow-hidden text-[8px] leading-tight">
               {Array.from({ length: 40 }).map((_, i) => (
                 <div key={i} className="flex gap-4">
                    {Array.from({ length: 20 }).map((_, j) => (
                      <span key={j}>0x{Math.floor(Math.random()*255).toString(16).toUpperCase()}</span>
                    ))}
                 </div>
               ))}
            </div>
         </div>

         {/* Right: Interactive Spec List */}
         <div className="col-span-12 lg:col-span-5 p-12 lg:p-24 border-l border-white/5 bg-black flex flex-col justify-center">
            <h2 className="text-xs uppercase tracking-[0.8em] font-black italic text-rose-600 mb-12">Sub-System Verification</h2>
            <div className="space-y-12">
               {SPECS.map((spec) => (
                  <div 
                     key={spec.id}
                     onMouseEnter={() => setActiveSpec(spec.id)}
                     onMouseLeave={() => setActiveSpec(null)}
                     className={`p-12 border ${activeSpec === spec.id ? 'border-rose-600 bg-rose-600/5' : 'border-white/5'} transition-all cursor-crosshair rounded-2xl group`}
                  >
                     <div className="flex justify-between items-baseline mb-4">
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">{spec.label}</h3>
                        <span className={`text-[10px] ${activeSpec === spec.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}>[0x0{spec.id}]</span>
                     </div>
                     <p className="text-sm font-light opacity-40 uppercase tracking-widest">{spec.desc}</p>
                  </div>
               ))}
            </div>

            <div className="mt-24 pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
               <div className="text-5xl font-black italic">$4,850</div>
               <button className="w-full md:w-auto px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 hover:text-white transition-all">Add to System</button>
            </div>
         </div>

      </main>

    </div>
  );
}
