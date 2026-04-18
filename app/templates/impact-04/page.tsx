"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { Compass, Wind, Zap, ChevronRight, ArrowLeft, Menu } from "lucide-react";
import "../premium.css";

export default function AlphaPortalSPA() {
  const [view, setView] = useState<"node" | "expedition" | "world">("node");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePortalEntry = (target: "world" | "node") => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView(target);
      setIsTransitioning(false);
    }, 1500);
  };

  return (
    <div className="premium-theme bg-black text-white min-h-screen overflow-hidden selection:bg-cyan-500 font-sans">
      
      {/* HUD UI - Persistent */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("node")} className="text-xl font-black tracking-[0.5em] uppercase hover:opacity-70 transition-opacity">Portal.OS</button>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
           <button onClick={() => setView("node")} className="hover:opacity-100 transition-opacity">Node_Alpha</button>
           <button onClick={() => setView("expedition")} className="hover:opacity-100 transition-opacity">Expeditions</button>
        </div>
        <div className="flex gap-6 items-center">
           <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 animate-pulse">Sync_Active</div>
           <Menu className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* NODE VIEW (LANDING) */}
        {view === "node" && (
          <motion.div key="node" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
             {/* Background: Desert Salt Flats */}
             <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1445197147274-246a5fbad1db?q=80&w=2000&auto=format&fit=crop" alt="Desert Base" fill className="object-cover brightness-50 grayscale hover:grayscale-0 transition-all duration-[3s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
             </div>

             <div className="relative z-10 text-center px-8">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="mb-12">
                   <h1 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter leading-none mb-8 strike-text">ALPHA<br/>NODE</h1>
                   <p className="max-w-xl mx-auto text-sm md:text-md font-light opacity-50 uppercase tracking-[0.6em] mb-12">Sequence_Start [88.4 / 29.1]</p>
                </motion.div>
                
                <button 
                  onClick={() => handlePortalEntry("world")}
                  className="group relative px-16 py-8 overflow-hidden border border-white/10 hover:border-cyan-500 transition-colors"
                >
                   <span className="relative z-10 text-[10px] uppercase tracking-[0.8em] font-black">Initialize Portal</span>
                   <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 animate-scan" style={{ top: 'auto', bottom: 0 }} />
                </button>
             </div>
          </motion.div>
        )}

        {/* WORLD VIEW (THE DESTINATION) */}
        {view === "world" && (
          <motion.div key="world" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative h-screen w-full flex items-center justify-center">
             <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=2000&auto=format&fit=crop" alt="Paradise" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
             </div>

             <div className="relative z-10 text-center px-8 max-w-4xl">
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-cyan-400 text-[10px] uppercase tracking-[1em] mb-8 block font-black">Stabilization Complete</motion.span>
                <motion.h2 initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 1.5 }} className="text-6xl md:text-[10rem] font-serif italic italic leading-none mb-12 drop-shadow-2xl">Eden_01.</motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-xl md:text-2xl font-light opacity-80 leading-relaxed mb-16 max-w-2xl mx-auto">
                   A temporal sanctuary where the laws of physics are merely suggestions. Explore the quiet architecture of light.
                </motion.p>
                <button onClick={() => setView("expedition")} className="px-12 py-5 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black hover:bg-cyan-500 hover:text-white transition-all duration-500">
                   Begin Expedition
                </button>
             </div>
          </motion.div>
        )}

        {/* EXPEDITION VIEW (DETAILS) */}
        {view === "expedition" && (
          <motion.div key="expedition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-7xl mx-auto min-h-screen">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-40">
                <div>
                   <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12">Expedition<br/><span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>Logs.</span></h3>
                   <div className="space-y-12">
                      {[
                        { time: "04:12", log: "Coordinates shifted toward the northern vertex. Atmospheric pressure remains stable at 1.2 bar.", icon: <Compass className="w-5 h-5 text-cyan-400" /> },
                        { time: "09:45", log: "Bio-signature detected in the lower canopy. Samples retrieved for molecular audit.", icon: <Wind className="w-5 h-5 text-cyan-400" /> },
                        { time: "22:30", log: "Neural link showing 99.8% synchronization with the host environment.", icon: <Zap className="w-5 h-5 text-cyan-400" /> },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="h-full pt-1 opacity-40 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                           <div>
                              <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-2 font-bold">{item.time}</div>
                              <p className="opacity-60 text-sm leading-relaxed max-w-sm">{item.log}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {[
                     "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1510784722466-f2aa9c52fed6?q=80&w=800&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1551009175-8a88ed149624?q=80&w=800&auto=format&fit=crop"
                   ].map((url, i) => (
                     <div key={i} className="aspect-[4/5] bg-white/5 relative overflow-hidden group">
                        <Image src={url} alt="Expedition Snapshot" fill className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="flex justify-center">
                <button onClick={() => setView("node")} className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30 hover:opacity-100 transition-opacity border-b border-white/20 pb-4">
                   Terminate Connection
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal Transition Overlay */}
      {isTransitioning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
           <motion.div 
             initial={{ scale: 0, opacity: 1 }} 
             animate={{ scale: 4, opacity: 0 }} 
             transition={{ duration: 1.5, ease: "easeOut" }} 
             className="w-40 h-40 bg-cyan-400 rounded-full blur-3xl"
           />
           <div className="absolute text-black text-[10px] uppercase tracking-[1em] font-black animate-pulse">Relocating...</div>
        </motion.div>
      )}

      {/* Floating Meta Details */}
      <footer className="fixed bottom-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-end mix-blend-difference pointer-events-none text-[8px] uppercase tracking-[0.5em] font-bold opacity-30">
        <div className="font-mono">Lat: 29.9792 | Long: 31.1342</div>
        <div className="text-right">Portal Sequence: Active <br /> Core Temp: Nominal</div>
      </footer>

      <style>{`
        .strike-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
          color: transparent;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
