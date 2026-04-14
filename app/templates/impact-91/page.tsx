"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const STEPS = [
  { id: 1, title: "AWAKE", desc: "Sensory calibration sequence initiated.", time: "06:00" },
  { id: 2, title: "BREATH", desc: "Molecular oxygen saturation reset.", time: "06:15" },
  { id: 3, title: "FUEL", desc: "Organic nutrient absorption protocol.", time: "07:00" },
  { id: 4, title: "FLOW", desc: "Cognitive focus stream established.", time: "08:00" },
];

export default function InteractiveMorningRitual() {
  const [complete, setComplete] = useState<number[]>([]);

  const toggle = (id: number) => {
    setComplete(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="premium-theme bg-[#fafaf8] text-black min-h-screen selection:bg-rose-500 font-serif">
      
      {/* Background Subtle Asset */}
      <div className="fixed right-0 top-0 w-1/2 h-full z-0 opacity-40 hidden lg:block">
         <Image 
            src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1500" 
            alt="Morning Aesthetic" 
            fill 
            className="object-cover grayscale contrast-75 brightness-110" 
         />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-stone-400">Ritual.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40 font-mono">Sequence_Mapping: PHASE_01</div>
      </nav>

      <main className="relative z-10 pt-48 pb-64 px-12 max-w-4xl">
         <motion.header 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="mb-32"
         >
            <span className="text-[10px] uppercase tracking-[1.5em] font-black italic mb-8 block opacity-20 font-mono">Automated Lifecycle Management</span>
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-12">
               Morning <br /> <span className="text-stone-300">Protocol.</span>
            </h1>
         </motion.header>

         {/* Interactive Ritual Steps */}
         <div className="space-y-12">
            {STEPS.map((step, i) => (
               <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative p-12 border-l-4 transition-all cursor-pointer ${complete.includes(step.id) ? 'border-black bg-stone-100' : 'border-stone-200 hover:border-black'}`}
                  onClick={() => toggle(step.id)}
               >
                  <div className="flex justify-between items-baseline mb-4">
                     <span className="text-xs font-mono font-black opacity-20">[{step.time}]</span>
                     <AnimatePresence>
                        {complete.includes(step.id) && (
                           <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="text-xs text-rose-600 font-mono font-black"
                           >
                              PROCESSED
                           </motion.span>
                        )}
                     </AnimatePresence>
                  </div>
                  <h2 className={`text-4xl font-black italic uppercase tracking-tighter transition-all ${complete.includes(step.id) ? 'line-through opacity-20' : ''}`}>
                     {step.title}.
                  </h2>
                  <p className="text-xs uppercase tracking-[0.4em] leading-relaxed italic opacity-40 font-black mt-4 max-w-md">
                     {step.desc}
                  </p>
               </motion.div>
            ))}
         </div>

         <div className="mt-32 p-12 bg-black text-white rounded-[4rem] text-center">
            <span className="text-[8px] uppercase tracking-[1em] font-black block opacity-40 mb-4">System_Status</span>
            <div className="text-3xl font-black italic uppercase italic">
               RITUAL_COMPLETION: {Math.round((complete.length / STEPS.length) * 100)}%
            </div>
         </div>
      </main>

      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         AESTHETIC_SYNC
      </div>

    </div>
  );
}
