"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Layers, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Box, Compass, Sparkles, MoveVertical, Fan } from "lucide-react";
import "../premium.css";

const NODES = [
  { id: 1, title: "RADIAL_ARCH", cat: "Structural", value: "Locked", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "BLOCK_NODE", cat: "Brutalist", value: "Active", img: "https://images.unsplash.com/photo-1523424296224-8d91b72a696c?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "VOID_FAN", cat: "Speculative", value: "Verified", img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1000&auto=format&fit=crop" },
];

export default function FanArchiveSPA() {
  const [view, setView] = useState<"fan" | "node" | "mapping">("fan");
  const [activeItem, setActiveItem] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#0d0d0d] text-[#f87171] min-h-screen selection:bg-[#f87171] selection:text-white font-mono overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.02] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           RADIAL
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0d0d0d_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-white/5 mx-auto">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("fan")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors flex items-center gap-4">
              <Fan className="w-6 h-6 animate-pulse" /> FAN_OS&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Radial_Series_Active
              <span className="text-white">Ref: 0x102</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("fan")} className={`hover:opacity-100 transition-opacity ${view === 'fan' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_FAN</button>
           <button onClick={() => setView("mapping")} className={`hover:opacity-100 transition-opacity ${view === 'mapping' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_MAPPING</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE FAN VIEW (LANDING) */}
        {view === "fan" && (
          <motion.div key="fan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b-2 border-white/10 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-white/10 underline-offset-8 italic text-rose-400 font-mono">Radial_Deployment // Series_102</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] text-white">ARCHIVE. <br/> <span className="text-stone-400">FAN.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-white">Radial_Sync</div>
                   <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-rose-500" />
                   </div>
                </div>
             </header>

             <div className="flex justify-center items-center h-[50vh] perspective-[2000px] relative">
                {NODES.map((p, i) => (
                  <motion.div 
                    key={p.id}
                    initial={{ rotate: 0, x: 0 }}
                    animate={{ 
                       rotate: hovered !== null ? (i - 1) * 20 : 0,
                       x: hovered !== null ? (i - 1) * 300 : 0,
                       y: hovered === i ? -50 : 0,
                       scale: hovered === i ? 1.1 : 1,
                       z: hovered === i ? 100 : 0
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => { setActiveItem(i); setView("node"); }}
                    className="absolute w-[400px] h-[500px] rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl bg-neutral-900 cursor-pointer shadow-brutalist"
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                     <div className="absolute inset-10 flex flex-col justify-between mix-blend-difference text-white">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">UNIT_0x{i+102}</div>
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic">{p.cat} // {p.value}</span>
                           <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
             
             <style>{`
               .shadow-brutalist {
                 box-shadow: 20px 20px 0px 0px rgba(0,0,0,0.5);
               }
             `}</style>
          </motion.div>
        )}

        {/* THE NODE VIEW (DETAIL) */}
        {view === "node" && (
          <motion.div key="node" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("fan")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#0d0d0d]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={NODES[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-rose-500">
                      NODE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0d0d0d_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border-8 border-white bg-white shadow-2xl group">
                         <Image src={NODES[activeItem].img} alt="Node" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10">
                            <Layers className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6 font-mono">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic text-rose-400">Radial_Sync // {NODES[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">{NODES[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-rose-500">State: SYNCHRONIZED</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed">
                            Structural allocation for {NODES[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y-2 border-white/10 font-mono text-white/60">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Global_East" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: NODES[activeItem].value },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20 text-rose-500">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("fan")} className="flex-grow py-8 bg-rose-600 text-white font-black uppercase text-xs tracking-[1em] hover:bg-rose-700 transition-all shadow-2xl">
                               Return_to_Fan
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

        {/* THE MAPPING VIEW (INFO) */}
        {view === "mapping" && (
          <motion.div key="mapping" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-rose-500 decoration-2 underline-offset-8 italic font-mono text-rose-400">The_Mapping_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/20 font-mono text-rose-400">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Radial Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-rose-500 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-rose-400/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#1a1a1a] rounded-[4rem] p-12 overflow-hidden border border-white/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-rose-700 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-rose-500 leading-none font-mono">
         <div className="flex gap-12 text-rose-500">
            <span>Fan_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-rose-500">
            <div className="text-right leading-tight italic">
               Archival_Control <br /> v4.0.102
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-rose-500 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
