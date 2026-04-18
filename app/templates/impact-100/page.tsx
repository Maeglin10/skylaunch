"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Menu, Search, Award, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Crown } from "lucide-react";
import "../premium.css";

const LANDMARKS = [
  { id: 1, title: "AETHEL_ONE", cat: "Milestone", value: "CENTURY_01", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "CORE_LANDMARK", cat: "Structural", value: "Verified", img: "https://images.unsplash.com/photo-1449156001533-cb39c7314260?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "VOID_RESERVE", cat: "Strategic", value: "Alpha_Unit", img: "https://images.unsplash.com/photo-1492691523567-613d9685354e?q=80&w=1000&auto=format&fit=crop" },
];

export default function CenturyLandmarkSPA() {
  const [view, setView] = useState<"century" | "landmark" | "protocol">("century");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-[#f8f8f8] min-h-screen selection:bg-white selection:text-black font-serif overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           100
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-white/10 font-mono">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("century")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform font-serif uppercase flex items-center gap-4">
              <Crown className="w-6 h-6 animate-pulse" /> CENTURY_OS&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Landmark_Sync_Active
              <span className="text-white">Batch: 0x100</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("century")} className={`hover:opacity-100 transition-opacity ${view === 'century' ? 'text-white opacity-100 underline decoration-white decoration-2 underline-offset-8 italic' : ''}`}>THE_CENTURY</button>
           <button onClick={() => setView("protocol")} className={`hover:opacity-100 transition-opacity ${view === 'protocol' ? 'text-white opacity-100 underline decoration-white decoration-2 underline-offset-8 italic' : ''}`}>THE_PROTOCOL</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE CENTURY VIEW (LANDING) */}
        {view === "century" && (
          <motion.div key="century" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b-2 border-white/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-white/10 underline-offset-8 italic font-mono">Milestone_Sync // Series_100</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] font-serif">CENTURY. <br/> <span className="text-stone-400">ONE.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-white">Secure_Sync</div>
                   <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-white" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-mono">
                {LANDMARKS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-[4rem] overflow-hidden border-8 border-white/10 hover:border-white transition-all cursor-pointer shadow-2xl bg-white/5"
                    onClick={() => { setActiveItem(i); setView("landmark"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[4s]" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus className="w-5 h-5" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic text-white">UNIT_0x{i+100}</div>
                        </div>
                        <div className="mix-blend-difference text-white">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none font-serif">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE LANDMARK VIEW (DETAIL) */}
        {view === "landmark" && (
          <motion.div key="landmark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("century")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#050505]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={LANDMARKS[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center font-serif uppercase">
                      CENTURY
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border-8 border-white/10 group bg-white/5 shadow-2xl">
                         <Image src={LANDMARKS[activeItem].img} alt="Landmark" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[5s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10">
                            <Layers className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6 font-mono">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic">Phased_Sync // {LANDMARKS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white font-serif">{LANDMARKS[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic">Tier: ARCHIVE_ALPHA</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed font-serif">
                            Structural allocation for {LANDMARKS[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized for the next century of operation.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y-2 border-white/10 font-mono text-white/60">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Global_East" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: LANDMARKS[activeItem].value },
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

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("century")} className="flex-grow py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] hover:bg-stone-200 transition-all shadow-2xl">
                               Return_to_Century
                            </button>
                            <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-white">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE PROTOCOL VIEW (ABOUT) */}
        {view === "protocol" && (
          <motion.div key="protocol" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-white decoration-2 underline-offset-8 italic font-mono">The_Century_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase font-serif">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60 font-serif">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise. 100 iterations of perfection.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/20 font-mono">
                      {[
                        { icon: <Award className="w-6 h-6" />, t: "E2E Mastery", v: "100_Batch_Verification" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2 font-serif">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-white/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#1a1a1a] rounded-[4rem] p-12 overflow-hidden border-8 border-white/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Landmark" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-stone-200 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-white leading-none font-mono">
         <div className="flex gap-12 text-white">
            <span>Century_OS_Milestone</span>
            <span>Batch_Index: 100/100</span>
         </div>
         <div className="flex gap-4 items-end text-white">
            <div className="text-right leading-tight italic">
               Archival_Control <br /> v4.0.100
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-white opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
