"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Sunrise, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import "../premium.css";

const STEPS = [
  { id: 1, title: "AWAKE", desc: "Sensory calibration sequence initiated.", time: "06:00", cat: "Bio" },
  { id: 2, title: "BREATH", desc: "Molecular oxygen saturation reset.", time: "06:15", cat: "Fluid" },
  { id: 3, title: "FUEL", desc: "Organic nutrient absorption protocol.", time: "07:00", cat: "Energy" },
  { id: 4, title: "FLOW", desc: "Cognitive focus stream established.", time: "08:00", cat: "Logic" },
];

export default function RitualProtocolSPA() {
  const [view, setView] = useState<"protocol" | "sync" | "essence">("protocol");
  const [complete, setComplete] = useState<number[]>([]);

  const toggle = (id: number) => {
    setComplete(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="premium-theme bg-[#fafaf8] text-[#1a1a1a] min-h-screen selection:bg-black selection:text-white font-serif overflow-x-hidden">
      
      {/* Background Subtle HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#fafaf8_100%)] opacity-80" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-3xl border-b border-black/5 font-mono">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("protocol")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform font-serif uppercase">
              RITUAL_OS&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Sequential_Sync
              <span className="text-black">Phase: 0x91</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("protocol")} className={`hover:opacity-100 transition-opacity ${view === 'protocol' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8 italic' : ''}`}>THE_PROTOCOL</button>
           <button onClick={() => setView("essence")} className={`hover:opacity-100 transition-opacity ${view === 'essence' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8 italic' : ''}`}>THE_ESSENCE</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE PROTOCOL VIEW (LANDING) */}
        {view === "protocol" && (
          <motion.div key="protocol" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b-2 border-black/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-black/10 underline-offset-8 italic font-mono">Lifecycle_Sync // Series_091</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] font-serif">PURE. <br/> <span className="text-stone-400">RITUAL.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono">Secure_Sync</div>
                   <div className="w-64 h-2 bg-black/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-black" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-mono">
                {STEPS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className={`group relative h-[60vh] rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl transition-all cursor-pointer ${complete.includes(p.id) ? 'bg-stone-100' : 'bg-neutral-100'}`}
                    onClick={() => toggle(p.id)}
                  >
                     <Image src={`https://images.unsplash.com/photo-${[
                       '1490818387583-1baba5e638af',
                       '1506126613408-eca07ce68773',
                       '1464349153735-7db50ed83c84',
                       '1518531933037-91b2f5f229cc'
                     ][i]}?q=80&w=1000&auto=format&fit=crop`} alt={p.title} fill className={`object-cover transition-all duration-[2s] ${complete.includes(p.id) ? 'grayscale opacity-20' : 'grayscale group-hover:grayscale-0'}`} />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-white/80 backdrop-blur-xl rounded-2xl">
                              {complete.includes(p.id) ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Plus className="w-5 h-5 text-black" />}
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">REF_0x{p.id}</div>
                        </div>
                        <div className="mix-blend-difference">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-white">{p.cat} // {p.time}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none font-serif text-white">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>

             <div className="mt-24 p-12 bg-black text-white rounded-[4rem] text-center font-mono relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
                <div className="absolute inset-0 bg-stone-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-12">
                   <span className="text-[10px] uppercase tracking-[1em] font-black opacity-40 mb-4 md:mb-0">System_Phase_Sync</span>
                   <div className="text-3xl font-black italic uppercase">
                      PROTOCOL_EFFICIENCY: {Math.round((complete.length / STEPS.length) * 100)}%
                   </div>
                   <button onClick={() => setView("sync")} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest italic rounded-full shadow-xl">Detailed_View</button>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE SYNC VIEW (CHECKLIST) */}
        {view === "sync" && (
          <motion.div key="sync" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("protocol")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#fafaf8]">
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center font-serif uppercase">
                      SYNC
                   </div>
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border-8 border-white bg-white shadow-2xl group">
                         <Image src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000&auto=format&fit=crop" alt="Synd" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute top-12 left-12 p-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-black/5">
                            <Activity className="w-6 h-6 text-black animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6 font-mono">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8 italic">Protocol_Sync // Automated</span>
                            <h1 className="text-7xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-none text-black font-serif">THE. SYNC.</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic">Integrity: {Math.round((complete.length / STEPS.length) * 100)}%</div>
                         </div>

                         <div className="space-y-4">
                            {STEPS.map((s, i) => (
                              <button 
                                key={i} 
                                onClick={() => toggle(s.id)}
                                className={`w-full flex justify-between items-center p-8 rounded-3xl border-2 transition-all ${complete.includes(s.id) ? 'bg-black text-white border-black' : 'bg-white text-black border-black/5 hover:border-black'}`}
                              >
                                 <div className="flex gap-6 items-center">
                                    <div className="text-xl font-black italic font-mono opacity-20">0{s.id}</div>
                                    <div className="text-left">
                                       <div className="text-2xl font-black italic uppercase tracking-tighter font-serif">{s.title}</div>
                                       <div className="text-[10px] uppercase font-mono opacity-40">{s.time} // {s.cat}</div>
                                    </div>
                                 </div>
                                 {complete.includes(s.id) ? <CheckCircle2 className="w-6 h-6" /> : <Plus className="w-6 h-6 opacity-20" />}
                              </button>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("protocol")} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-stone-800 transition-all shadow-2xl">
                               Return_to_Protocol
                            </button>
                            <button className="px-12 py-8 border border-black/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-black">
                               Print_Report
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE ESSENCE VIEW (ABOUT) */}
        {view === "essence" && (
          <motion.div key="essence" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-black">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-black decoration-2 underline-offset-8 italic font-mono">The_Essence_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none uppercase font-serif">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-black/60 font-serif">
                      We treat lifestyle as code. Every routine is a function of its biological variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/10 font-mono">
                      {[
                        { icon: <Sunrise className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Routine Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-2 font-serif">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-black/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#ddd] rounded-[4rem] p-12 overflow-hidden border-8 border-white group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-stone-800 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-black font-mono">
         <div className="flex gap-12 text-black">
            <span>Ritual_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-black">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-black opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
