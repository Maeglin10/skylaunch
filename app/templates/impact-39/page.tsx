"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Box, Layers, Shield, Activity, Plus, Maximize2, Compass, MoveDiagonal2, PenTool } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "STRUCT_VOID_01", location: "Berlin / Mitte", area: "12,400SQM", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of concrete tension and volume. Optimized for structural integrity." },
  { id: 2, name: "AXIS_LEVEL_04", location: "Tokyo / Shibuya", area: "8,500SQM", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop", desc: "Monolithic verticality in a dense urban environment. Advanced structural dampening." },
  { id: 3, name: "CORE_PLATE_99", location: "New York / Chelsea", area: "22,000SQM", img: "https://images.unsplash.com/photo-1518005020251-582c7eb8365d?q=80&w=1000&auto=format&fit=crop", desc: "A horizontal plate structure suspended over an industrial void. Carbon-reinforced core." },
];

export default function StructuralBlueprintSPA() {
  const [view, setView] = useState<"blueprints" | "analysis" | "studio">("blueprints");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#0a0a0a] text-[#00ff99] min-h-screen selection:bg-[#00ff99] selection:text-black font-mono overflow-x-hidden">
      
      {/* Blueprint Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#00ff99]/10">
        <button onClick={() => setView("blueprints")} className="text-xl font-black uppercase tracking-tighter hover:text-white transition-colors">
           STRUCT_NODE&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("blueprints")} className={`hover:opacity-100 transition-opacity ${view === 'blueprints' ? 'text-white opacity-100 underline decoration-[#00ff99] decoration-2 underline-offset-8' : ''}`}>BLUEPRINTS</button>
           <button onClick={() => setView("analysis")} className={`hover:opacity-100 transition-opacity ${view === 'analysis' ? 'text-white opacity-100 underline decoration-[#00ff99] decoration-2 underline-offset-8' : ''}`}>ANALYSIS</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest italic">
              System_Verification: OPTIMAL_LOAD
           </div>
           <button onClick={() => setView("studio")} className="px-8 py-3 bg-[#00ff99] text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all italic">
              Inquire_Core
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* BLUEPRINTS VIEW (CATALOG) */}
        {view === "blueprints" && (
          <motion.div key="blueprints" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-4 border-[#00ff99] pb-12">
                <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] text-white">
                   DESIGN. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #00ff99' }}>SYNTHESIS.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter uppercase opacity-20">Protocol_Ref: 0xF44.1</div>
                   <div className="flex gap-4">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Architectural Core <br /> Engineering v4.2</div>
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {PROJECTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer border border-[#00ff99]/10 p-8 rounded-2xl hover:bg-[#00ff99]/5 transition-all"
                    onClick={() => { setActiveItem(i); setView("analysis"); }}
                  >
                     <div className="relative aspect-video overflow-hidden mb-12 rounded-xl border border-[#00ff99]/10">
                        <Image src={p.img} alt={p.name} fill className="object-cover grayscale hue-rotate-180 brightness-50 contrast-150 group-hover:scale-110 transition-all duration-[3s]" />
                        <div className="absolute top-8 right-8 p-3 bg-black/80 backdrop-blur-xl rounded-full border border-[#00ff99]/20 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Maximize2 className="w-4 h-4" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                     </div>
                     <div className="flex justify-between items-end mb-6">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30 mb-2 block">{p.area} // {p.location}</span>
                           <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white group-hover:text-[#00ff99] transition-colors">{p.name}</h3>
                        </div>
                        <div className="text-2xl font-black italic tracking-tighter opacity-10 group-hover:opacity-100 transition-all">/0{p.id}</div>
                     </div>
                     <p className="text-xs font-light italic opacity-40 uppercase tracking-tight max-w-xs leading-relaxed">{p.desc}</p>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.6em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-12 border-t border-[#00ff99]/10 pt-10 mt-10">
                        ACTIVATE_SCHEMATIC <ArrowRight className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* ANALYSIS VIEW (DETAIL) */}
        {view === "analysis" && (
          <motion.div key="analysis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("blueprints")} className="fixed top-12 left-12 z-[60] bg-[#00ff99] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(0,255,153,0.3)]">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 h-screen overflow-hidden">
                   <div className="absolute inset-0 bg-black/40 z-[-1]" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vh] font-black opacity-[0.02] select-none pointer-events-none italic tracking-tighter">
                      SCHEMATIC
                   </div>
                   
                   <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#00ff99]/20 group">
                         <Image src={PROJECTS[activeItem].img} alt="Analysis" fill className="object-cover grayscale brightness-20 contrast-200 group-hover:brightness-50 transition-all duration-[3s]" priority />
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-80" />
                         <div className="absolute top-12 left-12 flex gap-4">
                            <div className="p-4 bg-black/60 backdrop-blur-md rounded-xl border border-[#00ff99]/20">
                               <Layers className="w-6 h-6 text-[#00ff99] animate-pulse" />
                            </div>
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#00ff99] mb-8 block underline decoration-[#00ff99]/40 underline-offset-8">Drafting_Synthesis // 0x442_A</span>
                            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-20">Load_Verified: OPTIMAL</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-50 text-white">
                            {PROJECTS[activeItem].desc} An architectural study involving multi-axis tension and structural transparency.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-[#00ff99]/10">
                            {[
                              { icon: <Compass className="w-5 h-5" />, l: "Coordinates", v: "34.05 / -118.24" },
                              { icon: <MoveDiagonal2 className="w-5 h-5" />, l: "Dimensions", v: PROJECTS[activeItem].area },
                              { icon: <Shield className="w-5 h-5" />, l: "Material", v: "Titanium_Reinforced" },
                              { icon: <Box className="w-5 h-5" />, l: "Status", v: "Drafting_Final" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="text-[#00ff99]/40">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("studio")} className="flex-grow py-8 bg-[#00ff99] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl">
                               Initiate_Sequence
                            </button>
                            <button className="px-12 py-8 border border-[#00ff99]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#00ff99]/10 transition-all text-[#00ff99]">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* STUDIO VIEW (ABOUT/CONTACT) */}
        {view === "studio" && (
          <motion.div key="studio" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block text-[#00ff99] underline decoration-[#00ff99] decoration-2 underline-offset-8 italic">The_Structural_Core</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Origin.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#00ff99]/20">
                      {[
                        { icon: <PenTool className="w-6 h-6" />, t: "Adaptive Flow", v: "AI-Optimized Drafting" },
                        { icon: <Activity className="w-6 h-6" />, t: "Structural Sync", v: "Real-Time Telemetry" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#00ff99] flex items-center justify-center text-[#00ff99] group-hover:bg-[#00ff99] group-hover:text-black transition-all shadow-[0_0_30px_rgba(0,255,153,0.2)]">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#00ff99]">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-black/20 rounded-[4rem] p-12 overflow-hidden border border-[#00ff99]/10 group">
                   <Image src="https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=1000&auto=format&fit=crop" alt="Studio" fill className="object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-[5s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex flex-col items-center">
                      <div className="px-12 py-6 border border-[#00ff99] text-[#00ff99] text-[10px] font-black uppercase tracking-widest italic hover:bg-[#00ff99] hover:text-black transition-all cursor-pointer">
                         Transmitting_Signal...
                      </div>
                      <div className="mt-4 text-[8px] font-black opacity-20 uppercase tracking-[0.5em] text-[#00ff99]">Node_Status: ONLINE</div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#00ff99]">
         <div className="flex gap-12">
            <span>Struct_Node // Alpha</span>
            <span>Est. 2026.04</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#00ff99] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
