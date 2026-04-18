"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, ArrowRight, Shield, Zap, Box, Lock, Terminal, Activity, Crosshair, Plus } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "AEVIA_X1_HELMET", price: 2499, tag: "Optics", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop", desc: "Next-gen neural optics with 8K Micro-OLED projection. Integrated air filtration." },
  { id: 2, name: "QUANTUM_CORE_POD", price: 899, tag: "Storage", img: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop", desc: "Edge-computed cryptographic vault for high-latency environments." },
  { id: 3, name: "HAPTIC_RIG_GLOVE", price: 450, tag: "Interface", img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop", desc: "Sub-millisecond tactile feedback loop. Carbon-fiber mesh construction." },
  { id: 4, name: "SENS_DRIVE_04", price: 299, tag: "Media", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=1000&auto=format&fit=crop", desc: "Optical lattice drive with 4TB encrypted cold storage." },
];

export default function GhostShellSPA() {
  const [view, setView] = useState<"catalog" | "product" | "lab">("catalog");
  const [activeProject, setActiveProject] = useState(0);
  const [cart, setCart] = useState(0);

  return (
    <div className="premium-theme bg-[#030303] text-white min-h-screen selection:bg-rose-600 selection:text-white font-mono overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_100%)] opacity-80" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }}
        />
      </div>

      {/* Global Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <button onClick={() => setView("catalog")} className="text-xl font-black italic tracking-tighter hover:opacity-100 transition-opacity">
           GHOST_SHELL&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("catalog")} className={`hover:opacity-100 transition-opacity ${view === 'catalog' ? 'text-white opacity-100' : ''}`}>ARCHIVE</button>
           <button onClick={() => setView("lab")} className={`hover:opacity-100 transition-opacity ${view === 'lab' ? 'text-white opacity-100' : ''}`}>THE_LAB</button>
        </div>
        <div className="flex items-center gap-8">
           <button className="flex items-center gap-4 group">
              <ShoppingCart className="w-5 h-5 group-hover:text-rose-500 transition-colors" />
              <span className="text-[10px] font-black opacity-30 group-hover:opacity-100">[{cart}]</span>
           </button>
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* CATALOG VIEW */}
        {view === "catalog" && (
          <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8 md:px-12 max-w-[1800px] mx-auto">
             <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-10">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-30 mb-4 block underline decoration-rose-500 underline-offset-8">Series / Release_042</span>
                   <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">THE_ARCHIVE</h1>
                </div>
                <div className="flex gap-4 items-end text-right">
                   <div className="text-[10px] font-black opacity-20 uppercase tracking-widest leading-tight">Sync_Active <br /> Latency: 12ms</div>
                   <Terminal className="w-8 h-8 opacity-20" />
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                {PRODUCTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] md:h-[70vh] border border-white/5 overflow-hidden flex flex-col justify-end p-8 hover:bg-white/5 transition-all cursor-pointer"
                    onClick={() => { setActiveProject(i); setView("product"); }}
                  >
                     <div className="absolute top-8 right-8 z-10 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Crosshair className="w-6 h-6" />
                     </div>
                     
                     <div className="absolute inset-0 z-0 scale-110 group-hover:scale-100 transition-transform duration-[2s]">
                        <Image src={p.img} alt={p.name} fill className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                     </div>

                     <div className="relative z-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-2">{p.tag}</div>
                        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-rose-500 transition-colors mb-6">{p.name}</h2>
                        <div className="flex justify-between items-center pr-4">
                           <span className="text-xl font-black italic opacity-20 group-hover:opacity-100 transition-all">${p.price}</span>
                           <Plus className="w-5 h-5 opacity-40 group-hover:rotate-90 transition-transform" />
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* PRODUCT DETAIL VIEW */}
        {view === "product" && (
          <motion.div key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 pb-32">
             <button onClick={() => setView("catalog")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <div className="relative h-[70vh] lg:h-screen sticky top-0 bg-[#111]">
                   <Image src={PRODUCTS[activeProject].img} alt="Product" fill className="object-cover" priority />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                      <div className="max-w-xl">
                         <span className="text-[10px] uppercase tracking-[0.6em] font-black opacity-40 mb-4 block">Hardware_Spec / {PRODUCTS[activeProject].tag}</span>
                         <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">{PRODUCTS[activeProject].name}</h1>
                      </div>
                      <div className="text-right pb-4">
                         <div className="text-3xl font-black italic text-rose-500">${PRODUCTS[activeProject].price}</div>
                      </div>
                   </div>
                </div>

                <div className="p-12 lg:p-24 flex flex-col justify-center space-y-16">
                   <div className="space-y-8">
                      <h3 className="text-xs uppercase tracking-[0.5em] font-black opacity-20">The_Brief</h3>
                      <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-70">
                         {PRODUCTS[activeProject].desc} Built for the nomadic explorer who demands zero compromise on structural integrity.
                      </p>
                   </div>

                   <div className="space-y-8">
                      <h3 className="text-xs uppercase tracking-[0.5em] font-black opacity-20">Technical_Data</h3>
                      <div className="grid grid-cols-2 gap-8">
                         {[
                           { l: "Material", v: "Carbon_Plate" },
                           { l: "Protocol", v: "AES_SYNTH_09" },
                           { l: "Battery", v: "48H_EXO" },
                           { l: "Weight", v: "240g" },
                         ].map((s, i) => (
                           <div key={i} className="border-t border-white/10 pt-4">
                              <span className="text-[10px] font-black opacity-30 block mb-1">{s.l}</span>
                              <span className="text-sm font-black uppercase italic tracking-widest">{s.v}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="pt-12 flex flex-col md:flex-row gap-6">
                      <button onClick={() => { setCart(c => c + 1); setView("catalog"); }} className="flex-grow py-8 bg-white text-black font-black uppercase text-xs tracking-[0.8em] hover:bg-rose-500 hover:text-white transition-all">
                         Acquire_Asset
                      </button>
                      <button onClick={() => setView("lab")} className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                         Spec_Analysis
                      </button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE LAB VIEW */}
        {view === "lab" && (
          <motion.div key="lab" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 p-12 md:p-32 max-w-7xl mx-auto min-h-screen">
             <div className="flex justify-between items-end mb-32 border-b border-white/5 pb-12">
                <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none">THE_LAB</h1>
                <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20">Procedural_Synthesis</div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-48">
                <div className="relative aspect-square glass rounded-[3rem] p-4">
                   <Image src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop" alt="Lab" fill className="object-cover opacity-40 rounded-[2.5rem] grayscale" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 bg-rose-600/20 backdrop-blur-3xl rounded-full border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                         Live_Testing_Active
                      </div>
                   </div>
                </div>
                <div className="space-y-12">
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-30 block">Since_2012</span>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-widest">
                      Every piece is stress-tested in simulated high-vibration urban environments. We don't make products; we make components for human evolution.
                   </p>
                   <div className="space-y-8">
                      {[
                        { t: "Lattice_Encryption", d: "Zero-latency data protection integrated into hardware." },
                        { t: "Aerospace_Grade", d: "Thermal-stabilized polymers for extreme variance." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-black italic text-rose-500 group-hover:scale-110 transition-transform">
                              0{i+1}
                           </div>
                           <div>
                              <h4 className="text-lg font-black uppercase italic tracking-tighter">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-bold mt-2 leading-relaxed">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-30 grayscale">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex flex-col items-center">
                     <Activity className="w-8 h-8 mb-4 animate-pulse" />
                     <span className="text-[8px] font-black uppercase tracking-widest">Core_Module_0{i}</span>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Persistence Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em]">
         <div className="flex gap-12">
            <span>Lat: 35.6762 | Long: 139.6503</span>
            <span>Flux: Stable</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight">
               Ghost_Shell <br /> v4.0.21
            </div>
            <div className="flex gap-[2px] h-3">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-white opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(60px);
          -webkit-backdrop-filter: blur(60px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
