"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Award, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Target, Radio, CheckCircle2, Mic2, PlayCircle, Headphones } from "lucide-react";
import "../premium.css";

const EPISODES = [
  { id: 1, title: "SOUND_ARCHITECTURE", num: "042", guest: "James Blake", cat: "Culture", value: "Verified", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "VOID_NOMAD", num: "041", guest: "Pieter Levels", cat: "Digital", value: "Active", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "NEON_EMOTION", num: "040", guest: "Aarron Walter", cat: "Design", value: "Locked", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop" },
];

export default function DeepcastPodcastSPA() {
  const [view, setView] = useState<"deepcast" | "episode" | "logic">("deepcast");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#1a1a2e] text-yellow-400 min-h-screen selection:bg-yellow-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           DEEPCAST
        </div>
        <div className="absolute inset-x-0 top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/5" />
        <div className="absolute inset-0 bg-[#1a1a2e]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1a1a2e_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-transparent backdrop-blur-3xl border-b border-yellow-500/10 font-mono text-white">
        <div className="flex gap-12 items-center text-yellow-400">
           <button onClick={() => setView("deepcast")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors flex items-center gap-4 text-yellow-500">
              DEEPCAST_OS&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Podcast_Sync_Active
              <span className="text-white">Ref: 0x145</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("deepcast")} className={`hover:opacity-100 transition-opacity ${view === 'deepcast' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_DEEPCAST</button>
           <button onClick={() => setView("logic")} className={`hover:opacity-100 transition-opacity ${view === 'logic' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_LOGIC</button>
        </div>
        <div className="flex items-center gap-8 text-white">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE DEEPCAST VIEW (LANDING) */}
        {view === "deepcast" && (
          <motion.div key="deepcast" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10 font-sans">
             <header className="mb-24 border-b border-yellow-500/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12 text-white">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-yellow-500/10 underline-offset-8 italic font-mono text-yellow-500">Aural_Capture // Series_145</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75]">PURE. <br/> <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(234,179,8,0.6)" }}>VOICE.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-yellow-600">Dynamic_Sync</div>
                   <div className="w-64 h-[2px] bg-white/5 rounded-none overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-yellow-500" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {EPISODES.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-none overflow-hidden border border-yellow-500/10 hover:border-yellow-500/40 transition-all cursor-pointer shadow-2xl bg-white/5"
                    onClick={() => { setActiveItem(i); setView("episode"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                     <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-transparent transition-colors duration-1000" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start text-white">
                           <div className="p-4 bg-white/10 border border-white/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                              <Mic2 className="w-5 h-5" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">EP_0x{p.num}</div>
                        </div>
                        <div className="text-white">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-yellow-300">{p.cat} // {p.guest}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none transition-all group-hover:tracking-widest font-sans">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE EPISODE VIEW (DETAIL) */}
        {view === "episode" && (
          <motion.div key="episode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("deepcast")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-none hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#1a1a2e]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={EPISODES[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-yellow-500 font-sans">
                      CORE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1a1a2e_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-sans text-white">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-none overflow-hidden border border-yellow-500/20 group bg-neutral-900 shadow-2xl">
                         <Image src={EPISODES[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10 z-20">
                            <Layers className="w-6 h-6 text-yellow-400 animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic font-mono text-yellow-600">Aural_Sync // {EPISODES[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">{EPISODES[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-yellow-500">State: {EPISODES[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed">
                            Structural allocation for mission {EPISODES[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/10 font-mono text-white/60 text-yellow-400">
                            {[
                              { icon: <Headphones className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Zap className="w-5 h-5" />, l: "Sync", v: "Active" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Status", v: "Verified" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic text-white">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("deepcast")} className="flex-grow py-8 bg-yellow-600 text-black font-black uppercase text-xs tracking-[1em] hover:bg-yellow-500 transition-all shadow-2xl rounded-none">
                               Return_to_Deepcast
                            </button>
                            <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-white rounded-none">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE LOGIC VIEW (INFO) */}
        {view === "logic" && (
          <motion.div key="logic" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center font-sans">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-yellow-400 decoration-2 underline-offset-8 italic font-mono text-yellow-700">The_Logic_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60 font-sans">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10 font-mono text-yellow-400">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-none border border-yellow-500 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left text-white">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-yellow-400/40 text-yellow-500 font-mono">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-yellow-900/10 rounded-none p-12 overflow-hidden border border-yellow-500/20 group shadow-2xl text-yellow-500">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-yellow-600 text-black text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-yellow-500 transition-all rounded-none font-mono">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-yellow-600 leading-none font-mono font-mono text-yellow-500">
         <div className="flex gap-12 text-yellow-600">
            <span>Deepcast_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-yellow-600">
            <div className="text-right leading-tight italic">
               Archival_Control <br /> v4.0.145
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-yellow-500 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
