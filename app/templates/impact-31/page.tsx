"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Box, Layers, Zap, Activity, Globe, Shield, Command, MoveRight, ArrowUpRight, Cpu, Gauge } from "lucide-react";
import "../premium.css";

const NODES = [
  { id: 1, title: "SYNAPSE_CORE", cat: "Infrastructure", region: "Alpha", load: "42%", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "LITHE_NODE", cat: "Interface", region: "Bravo", load: "12%", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "ORBIT_PULSE", cat: "Connectivity", region: "Charlie", load: "08%", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "AETHER_LINK", cat: "Provisioning", region: "Delta", load: "67%", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop" },
];

export default function PerspectiveCoreSPA() {
  const [view, setView] = useState<"perspective" | "core" | "protocol">("perspective");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-[#38bdf8] min-h-screen selection:bg-[#38bdf8] selection:text-black font-mono overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#38bdf805_0%,_transparent_70%)] opacity-40" />
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen" />
        
        {/* Tilting Radial Glow */}
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#38bdf808_0%,_transparent_60%)]"
        />
      </div>

      {/* Global Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 md:py-8 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#38bdf8]/10">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("perspective")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors flex items-center gap-4">
              <Command className="w-6 h-6 animate-pulse" /> TILT_MATRIX&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Access: Level_04
              <span className="text-white">Ref: 0x31_P</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("perspective")} className={`hover:opacity-100 transition-opacity ${view === 'perspective' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_MATRIX</button>
           <button onClick={() => setView("protocol")} className={`hover:opacity-100 transition-opacity ${view === 'protocol' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_PROTOCOL</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* PERSPECTIVE VIEW (3D GRID) */}
        {view === "perspective" && (
          <motion.div key="perspective" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center">
             <header className="mb-24 border-b-2 border-[#38bdf8]/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#38bdf8] opacity-40 mb-4 block underline decoration-[#38bdf8]/10 underline-offset-8 italic">Core_Synthesis // Series_031</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] text-white">THE. <br/> <span className="text-[#38bdf8]">CORE.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic">Secure_Uplink</div>
                   <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '80%', '40%', '60%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#38bdf8]" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {NODES.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] md:h-[70vh] rounded-[3rem] overflow-hidden border border-[#38bdf8]/10 hover:border-[#38bdf8]/40 transition-all cursor-pointer shadow-2xl perspective-2000"
                    onClick={() => { setActiveItem(i); setView("core"); }}
                  >
                     <motion.div 
                        whileHover={{ rotateY: 10, rotateX: -5, translateZ: 20 }}
                        className="relative w-full h-full preserve-3d transition-transform duration-700"
                     >
                        <Image src={p.img} alt={p.title} fill className="object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-[2s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute inset-10 flex flex-col justify-between">
                           <div className="flex justify-between items-start">
                              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Plus className="w-5 h-5 text-[#38bdf8]" />
                              </div>
                              <div className="text-[10px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity text-[#38bdf8]">NODE_0x{p.id}</div>
                           </div>
                           <div>
                              <span className="text-[10px] uppercase font-black tracking-widest text-[#38bdf8]/40 mb-2 block">{p.cat}</span>
                              <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white group-hover:text-[#38bdf8] transition-colors">{p.title}</h3>
                           </div>
                        </div>
                     </motion.div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* CORE VIEW (DETAIL) */}
        {view === "core" && (
          <motion.div key="core" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("perspective")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#050505]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={NODES[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-[#38bdf8]/20 bg-white/5 shadow-2xl group">
                         <Image src={NODES[activeItem].img} alt="Project" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-2xl border border-white/10">
                            <Layers className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6 text-[#38bdf8]">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic">Archive_Sync // {NODES[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-none text-white uppercase">{NODES[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10">State: SYNCHRONIZED</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed">
                            Structural allocation for {NODES[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-[#38bdf8]/10 text-[#38bdf8]">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: NODES[activeItem].region },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Class_A_Core" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Throughput", v: NODES[activeItem].load },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("perspective")} className="flex-grow py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] hover:bg-white/80 transition-all shadow-2xl">
                               Explore_Matrix
                            </button>
                            <button className="px-12 py-8 border border-[#38bdf8]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-[#38bdf8]">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* PROTOCOL VIEW (INFO) */}
        {view === "protocol" && (
          <motion.div key="protocol" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-[#38bdf8] decoration-2 underline-offset-8 italic text-[#38bdf8]">The_Identity_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#38bdf8]/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#38bdf8]/20 text-[#38bdf8]">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#38bdf8] flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#38bdf8]/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-white/5 rounded-[4rem] p-12 overflow-hidden border border-[#38bdf8]/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop" alt="The Network" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-[#38bdf8] text-[#38bdf8] text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-[#38bdf8] hover:text-black transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#38bdf8]">
         <div className="flex gap-12 text-[#38bdf8]">
            <span>Tilt_Matrix_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-[#38bdf8]">
            <div className="text-right leading-tight italic">
               Sequence_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#38bdf8] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
