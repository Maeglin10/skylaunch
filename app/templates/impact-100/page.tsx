"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SPECS = [
  { label: "Frequency Response", val: "20Hz - 40kHz" },
  { label: "Impedance", val: "32 Ohms" },
  { label: "Sensitivity", val: "105dB SPL/mW" },
  { label: "Driver Type", val: "Dynamic Neodymium" }
];

export default function MinimalMonoSpec() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-black selection:text-white font-mono overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Spec.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Unit_Batch_v.100</div>
      </nav>

      <main className="pt-48 pb-64 px-12 max-w-[1600px] mx-auto grid grid-cols-12 gap-12 items-center">
         
         {/* Left: Product Exploded View */}
         <div className="col-span-12 lg:col-span-7 relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5 }}
               className="relative aspect-square rounded-full border-2 border-black/5 p-12 flex items-center justify-center"
            >
               <div className="absolute inset-0 border-[40px] border-black/5 rounded-full animate-ping opacity-20" style={{ animationDuration: '4s' }} />
               <div className="relative w-full h-full rounded-full overflow-hidden grayscale contrast-150 shadow-2xl elevation-24">
                  <Image 
                     src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000" 
                     alt="Product" 
                     fill 
                     className="object-cover" 
                  />
               </div>
            </motion.div>
         </div>

         {/* Right: Technical Specs */}
         <div className="col-span-12 lg:col-span-5 space-y-12">
            <motion.div
               initial={{ x: 50, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               transition={{ duration: 1 }}
            >
               <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40">Hardware Specification Sheet</span>
               <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-12">
                  AETHEL <br /> <span className="text-stone-300">ONE.</span>
               </h1>
            </motion.div>

            <div className="space-y-4">
               {SPECS.map((spec, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="flex justify-between items-center py-6 border-b border-black/10"
                  >
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{spec.label}</span>
                     <span className="text-sm font-black italic uppercase">{spec.val}</span>
                  </motion.div>
               ))}
            </div>

            <button className="w-full px-12 py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] italic hover:bg-stone-800 transition-all rounded-[3rem]">Initialize Procurement</button>
         </div>

      </main>

      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[8vw] font-black italic uppercase leading-none select-none">
         HARDWARE_NODE_v100
      </div>

    </div>
  );
}
