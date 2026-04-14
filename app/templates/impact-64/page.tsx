"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../premium.css";

const STREAMS = 30;
const FRAGMENTS = [
  "0x442_F", "NODE_ACTIVE", "LINK_SYNC", "ASYNC_VOID", "FRAGMENT_00", "SIGNAL_POS"
];

export default function TechDataStream() {
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: STREAMS }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      fragments: Array.from({ length: 10 }).map(() => FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)])
    }));
    setColumns(pts);
  }, []);

  return (
    <div className="premium-theme bg-[#020202] text-emerald-500 h-screen w-full overflow-hidden relative selection:bg-emerald-600 font-mono">
      
      {/* Background Data Matrix Stream */}
      <div className="absolute inset-0 z-0 opacity-40">
         {columns.map((col) => (
            <motion.div 
               key={col.id}
               initial={{ y: -1000 }}
               animate={{ y: 1200 }}
               transition={{ duration: col.duration, repeat: Infinity, delay: col.delay, ease: "linear" }}
               className="absolute flex flex-col gap-4 text-[8px] font-black uppercase tracking-widest"
               style={{ left: `${col.x}%` }}
            >
               {col.fragments.map((f: string, idx: number) => (
                  <span key={idx} className="block whitespace-nowrap">{f}</span>
               ))}
            </motion.div>
         ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-emerald-600 underline decoration-2 underline-offset-8">Data_Stream.OS</Link>
        <div className="text-[10px] uppercase font-black italic opacity-40">Frequency_Mapping_Unit_0x64</div>
      </nav>

      {/* Hero Content Overlay */}
      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center p-12 text-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="bg-black/80 backdrop-blur-3xl p-24 border border-emerald-500/20 rounded-[4rem] shadow-[0_0_100px_rgba(16,185,129,0.1)]"
         >
            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block mb-12">Cognitive System Breach Detected</span>
            <h1 className="text-7xl md:text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-12 text-white">
               Matrix <br /> <span className="text-emerald-500">Node_442.</span>
            </h1>
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-12 opacity-60">
               <div className="text-left">
                  <h3 className="text-[8px] font-black uppercase italic mb-2">Integrity</h3>
                  <div className="h-1 w-full bg-white/10 relative overflow-hidden">
                     <motion.div animate={{ width: ['0%', '80%', '40%', '90%'] }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-y-0 left-0 bg-emerald-500" />
                  </div>
               </div>
               <div className="text-left">
                  <h3 className="text-[8px] font-black uppercase italic mb-2">Sync_Rate</h3>
                  <div className="h-1 w-full bg-white/10 relative overflow-hidden">
                     <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-y-0 left-0 bg-white" />
                  </div>
               </div>
            </div>
            <button className="px-16 py-8 bg-emerald-600 text-black font-black uppercase text-xs tracking-[1em] italic hover:scale-110 transition-transform shadow-[0_0_50px_rgba(16,185,129,0.4)]">Access Kernel</button>
         </motion.div>
      </main>

      {/* Numerical Index Side */}
      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         0x64F
      </div>

    </div>
  );
}
