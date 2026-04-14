"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../premium.css";

export default function GlassHUDTemplate() {
  const [metrics, setMetrics] = useState({ cpu: 45, mem: 62, net: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 20) + 40,
        mem: Math.floor(Math.random() * 10) + 60,
        net: Math.floor(Math.random() * 50) + 5,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="premium-theme bg-[#020408] text-cyan-50 min-h-screen overflow-hidden selection:bg-cyan-500">
      
      {/* Background Grid */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.2) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center border-b border-cyan-500/10 bg-black/50 backdrop-blur-xl">
        <Link href="/" className="text-xl font-bold tracking-[0.5em] uppercase text-cyan-400">Aeon_Interface</Link>
        <div className="flex gap-12 font-mono text-[10px] items-center">
           <div className="flex gap-2">
             <span className="opacity-40">System:</span>
             <span className="text-emerald-400">Online</span>
           </div>
           <div className="flex gap-2">
             <span className="opacity-40">Core:</span>
             <span className="text-cyan-400 tracking-widest uppercase">Aevia_X1</span>
           </div>
        </div>
      </nav>

      {/* Main HUD */}
      <main className="relative pt-48 px-12 pb-24 grid grid-cols-12 gap-12 h-screen max-w-[1600px] mx-auto">
        
        {/* Left Stats Panel */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-8">
           <motion.div 
             initial={{ x: -50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="glass p-8 rounded-2xl border-cyan-500/20"
           >
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400 mb-8 border-b border-cyan-500/10 pb-4">Biometric Data</h3>
              <div className="space-y-6">
                 {Object.entries(metrics).map(([key, val]) => (
                   <div key={key}>
                      <div className="flex justify-between text-[10px] uppercase mb-2">
                        <span>{key} Load</span>
                        <span>{val}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ width: `${val}%` }}
                          className="h-full bg-cyan-500"
                        />
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>

           <motion.div 
             initial={{ x: -50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="glass p-8 rounded-2xl border-cyan-500/20 flex-grow"
           >
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400 mb-8 pb-4 border-b border-cyan-500/10">Neural Log</h3>
              <div className="font-mono text-[8px] space-y-2 opacity-50 uppercase leading-relaxed">
                 <div>[14:22:01] Protocol Init...</div>
                 <div>[14:22:04] Fetching Data Stream...</div>
                 <div>[14:22:15] Buffer Clear (0x442)</div>
                 <div className="text-cyan-400 animate-pulse">[Active] Listening...</div>
              </div>
           </motion.div>
        </div>

        {/* Center Visual Context */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center relative">
           <motion.div 
             animate={{ 
               y: [0, -20, 0],
               rotate: [0, 5, 0]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-full aspect-square max-w-[500px]"
           >
              {/* Spinning Rings */}
              <div className="absolute inset-[-10%] border border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-[-5%] border border-dashed border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden border border-cyan-500/30 glass elevation-24">
                 <Image
                    src="/templates/agency_hero.png"
                    alt="Crystal HUD Visual"
                    fill
                    className="object-cover scale-150 rotate-45 brightness-150 saturate-150"
                  />
              </div>

              {/* Data Callouts */}
              <motion.div 
                 animate={{ opacity: [1, 0.4, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute top-0 right-0 glass p-4 rounded-xl border-cyan-400/40 translate-x-1/2"
              >
                  <div className="text-[10px] font-bold text-cyan-400">STRUCTURE_SCAN</div>
                  <div className="text-[8px] opacity-60 uppercase font-mono tracking-tighter">Polygons: 1.2M <br /> Vertices: 4.8M</div>
              </motion.div>
           </motion.div>

           <div className="text-center mt-24">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">Deep <br /> Analysis.</h1>
              <p className="text-sm uppercase tracking-[0.5em] opacity-40">Aeon Projection Alpha-09</p>
           </div>
        </div>

        {/* Right Action Panel */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-8">
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="glass p-8 rounded-2xl border-cyan-500/20 flex-grow"
           >
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400 mb-8 border-b border-cyan-500/10 pb-4">Actions</h3>
              <div className="space-y-4">
                 {['Rebuild Mesh', 'Flush Buffer', 'Sync Neural', 'Override'].map((act, i) => (
                   <button key={i} className="w-full py-4 border border-cyan-500/20 text-[10px] uppercase tracking-widest font-bold hover:bg-cyan-500 hover:text-black transition-all rounded-lg">
                      {act}
                   </button>
                 ))}
              </div>
           </motion.div>

           <div className="glass p-8 rounded-2xl border-cyan-500/20 bg-cyan-500/5">
              <div className="text-4xl font-black text-white/90 mb-2">99.8%</div>
              <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Accuracy Index</div>
           </div>
        </div>
      </main>

      <style jsx global>{`
        .glass {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(34, 211, 238, 0.1);
        }
      `}</style>
    </div>
  );
}
