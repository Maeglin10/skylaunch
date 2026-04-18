"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Menu, Search, Award, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles } from "lucide-react";
import "../premium.css";

const COLLECTION = [
  { id: 1, title: "AETHER_01", cat: "Chrono", value: "Limited", img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "CARBON_IX", cat: "Structure", value: "Verified", img: "https://images.unsplash.com/photo-1523424296224-8d91b72a696c?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "GOLD_SYNC", cat: "Legacy", value: "Phase_Shift", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop" },
];

export default function HeritageArchiveSPA() {
  const [view, setView] = useState<"aether" | "archive" | "legacy">("aether");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-[#d4af37] min-h-screen selection:bg-[#d4af37] selection:text-black font-serif overflow-x-hidden">
      
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10" />
        <motion.div 
           animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="w-full h-full opacity-30 grayscale contrast-150 brightness-50"
        >
           <Image src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop" alt="Heritage" fill className="object-cover" priority />
        </motion.div>
        {/* Floating Particles Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
        </div>
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-[#d4af37]/10">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("aether")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors flex items-center gap-4 uppercase font-sans">
              HERITAGE_OS&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic font-sans">
              Status: Legacy_Verified
              <span className="text-white">Ref: 0x83_H</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 font-sans">
           <button onClick={() => setView("aether")} className={`hover:opacity-100 transition-opacity ${view === 'aether' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_AETHER</button>
           <button onClick={() => setView("archive")} className={`hover:opacity-100 transition-opacity ${view === 'archive' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_ARCHIVE</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE AETHER VIEW (LANDING) */}
        {view === "aether" && (
          <motion.div key="aether" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b-2 border-[#d4af37]/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12 font-sans">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#d4af37] opacity-40 mb-4 block underline decoration-[#d4af37]/10 underline-offset-8 italic">Heritage_Sync // Series_083</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] text-white">PURE. <br/> <span className="text-[#d4af37]">LEGACY.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic">Secure_Sync</div>
                   <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#d4af37]" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {COLLECTION.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-[3rem] overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all cursor-pointer shadow-2xl"
                    onClick={() => { setActiveItem(i); setView("archive"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between font-sans">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <Sparkles className="w-5 h-5 text-[#d4af37]" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity text-[#d4af37]">REF_0x{p.id}</div>
                        </div>
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest text-[#d4af37]/40 mb-2 block italic">{p.cat}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white group-hover:text-[#d4af37] transition-colors">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE ARCHIVE VIEW (COLLECTION) */}
        {view === "archive" && (
          <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("aether")} className="fixed top-12 left-12 z-[60] bg-[#d4af37] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#050505]">
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center text-[#d4af37] font-sans">
                      INDEX
                   </div>
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-[#d4af37]/10 group bg-white/5 shadow-2xl">
                         <Image src={COLLECTION[activeItem].img} alt="Heritage" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-2xl border border-white/10">
                            <Layers className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#d4af37]/40 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic font-sans">Archive_Sync // {COLLECTION[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">{COLLECTION[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-[#d4af37]">Allocation: SYNCHRONIZED</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed">
                            Structural allocation for {COLLECTION[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-[#d4af37]/10 text-[#d4af37] font-sans">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Class_A" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: COLLECTION[activeItem].value },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-sans">
                            <button onClick={() => setView("aether")} className="flex-grow py-8 bg-[#d4af37] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl">
                               Return_to_Aether
                            </button>
                            <button className="px-12 py-8 border border-[#d4af37]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-[#d4af37]">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE LEGACY VIEW (ABOUT) */}
        {view === "legacy" && (
          <motion.div key="legacy" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-[#d4af37] opacity-60 block underline decoration-[#d4af37]/20 underline-offset-8 italic font-sans">The_Legacy_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#d4af37]/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#d4af37]/20 text-[#d4af37] font-sans">
                      {[
                        { icon: <Award className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#d4af37]/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#1a1a1a] rounded-[4rem] p-12 overflow-hidden border border-[#d4af37]/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-sans">
                      <div className="px-12 py-6 border border-[#d4af37] text-[#d4af37] text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-[#d4af37] hover:text-black transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#d4af37] font-sans">
         <div className="flex gap-12 text-[#d4af37]">
            <span>Heritage_Archive_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-[#d4af37]">
            <div className="text-right leading-tight italic">
               Archive_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#d4af37] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
