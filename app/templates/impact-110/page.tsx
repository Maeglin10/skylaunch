"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Rocket, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Target } from "lucide-react";
import "../premium.css";

const MISSIONS = [
  { id: 1, title: "VOID_CORE", cat: "Deep_Space", value: "Verified", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "NEBULA_UNIT", cat: "Observatory", value: "Active", img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "SIG_VECTOR", cat: "Search", value: "Locked", img: "https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?q=80&w=1000&auto=format&fit=crop" },
];

export default function CosmoSpaceSPA() {
  const [view, setView] = useState<"void" | "mission" | "observatory">("void");
  const [activeItem, setActiveItem] = useState(0);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const bgX = useSpring(useTransform(mouseX, [0, 1], [-50, 50]), { stiffness: 50, damping: 30 });
  const bgY = useSpring(useTransform(mouseY, [0, 1], [-50, 50]), { stiffness: 50, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  }

  return (
    <div className="premium-theme bg-[#050510] text-[#22d3ee] min-h-screen selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden" onMouseMove={handleMouseMove}>
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-[-100px] opacity-20">
           <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Deep Space" fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           COSMO
        </div>
        <div className="absolute inset-0 bg-[#050510]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050510_100%)] opacity-80" />
        
        {/* Dynamic Particles */}
        <div className="absolute inset-0 z-10 opacity-30">
           {Array.from({ length: 40 }).map((_, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                 transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 10 }}
                 className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                 style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
           ))}
        </div>
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-cyan-500/20 font-mono">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("void")} className="text-xl font-black tracking-tighter hover:scale-105 transition-transform font-sans uppercase text-cyan-400 flex items-center gap-4">
              <Rocket className="w-6 h-6 animate-pulse" /> COSMO_OS&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Mission_Lock_Active
              <span className="text-white">Ref: 0x110</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("void")} className={`hover:opacity-100 transition-opacity ${view === 'void' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_VOID</button>
           <button onClick={() => setView("observatory")} className={`hover:opacity-100 transition-opacity ${view === 'observatory' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_OBSERVATORY</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE VOID VIEW (LANDING) */}
        {view === "void" && (
          <motion.div key="void" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b border-cyan-500/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-cyan-400/10 underline-offset-8 italic font-mono text-cyan-400">Mission_Sync // Series_110</span>
                   <h1 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.75] text-white">BEYOND. <br/> <span className="text-cyan-900">THE_VOID.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-white">Secure_Sync</div>
                   <div className="w-64 h-[2px] bg-white/5 rounded-none overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-cyan-400" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono">
                {MISSIONS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-[4rem] overflow-hidden border border-cyan-500/10 hover:border-cyan-500/40 transition-all cursor-pointer shadow-2xl bg-white/5"
                    onClick={() => { setActiveItem(i); setView("mission"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-white/10 border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <Target className="w-5 h-5 text-cyan-400" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic text-cyan-400">MISSION_0x{i+110}</div>
                        </div>
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-cyan-400">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none text-white transition-all group-hover:tracking-widest">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE MISSION VIEW (DETAIL) */}
        {view === "mission" && (
          <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("void")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#050510]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={MISSIONS[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-cyan-500 font-sans">
                      CORE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050510_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-sans">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-cyan-500/20 group bg-neutral-900 shadow-2xl">
                         <Image src={MISSIONS[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute bottom-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10">
                            <Layers className="w-6 h-6 text-cyan-400 animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic text-cyan-400 font-mono">Mission_Sync // {MISSIONS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white">{MISSIONS[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-cyan-500">Tier: ARCHIVE_ALPHA</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed">
                            Structural allocation for mission {MISSIONS[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/10 font-mono text-white/60">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Global_East" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: "Active" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20 text-cyan-400">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("void")} className="flex-grow py-8 bg-cyan-400 text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl rounded-full">
                               Return_to_Void
                            </button>
                            <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-white rounded-full">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE OBSERVATORY VIEW (INFO) */}
        {view === "observatory" && (
          <motion.div key="observatory" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-cyan-400 decoration-2 underline-offset-8 italic font-mono text-cyan-400">The_Cosmo_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase font-sans">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60 font-sans">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10 font-mono text-cyan-400">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2 font-sans">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-cyan-400/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#1a1a1a] rounded-none p-12 overflow-hidden border border-cyan-500/20 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-white transition-all rounded-full">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-cyan-400 leading-none font-mono">
         <div className="flex gap-12 text-cyan-400">
            <span>Cosmo_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-cyan-400">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.110
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-cyan-400 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
