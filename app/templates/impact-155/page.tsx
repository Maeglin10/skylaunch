"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Award, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Target, Radio, CheckCircle2, Palette, Eye } from "lucide-react";
import "../premium.css";

const WORKS = [
  { id: 1, title: "FRACTAL_VOID", cat: "Abstract", value: "Verified", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "STATIC_RESONANCE", cat: "Digital", value: "Active", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "NEURAL_DRIFT", cat: "Generative", value: "Locked", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
];

export default function ArtIndexGallerySPA() {
  const [view, setView] = useState<"index" | "work" | "logic">("index");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-stone-400 min-h-screen selection:bg-stone-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           INDEX
        </div>
        <div className="absolute inset-x-0 top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/5" />
        <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-transparent backdrop-blur-3xl border-b border-stone-500/10 font-mono text-white">
        <div className="flex gap-12 items-center text-stone-400">
           <button onClick={() => setView("index")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors flex items-center gap-4 text-stone-500 uppercase">
              ART_INDEX&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic font-mono">
              Status: Exhibition_Sync_Active
              <span className="text-white">Ref: 0x155</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 font-mono">
           <button onClick={() => setView("index")} className={`hover:opacity-100 transition-opacity ${view === 'index' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_INDEX</button>
           <button onClick={() => setView("logic")} className={`hover:opacity-100 transition-opacity ${view === 'logic' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_LOGIC</button>
        </div>
        <div className="flex items-center gap-8 text-white">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE INDEX VIEW (LANDING) */}
        {view === "index" && (
          <motion.div key="index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10 font-sans">
             <header className="mb-24 border-b border-stone-500/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12 text-white font-sans">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-stone-500/10 underline-offset-8 italic font-mono text-stone-500 font-sans">Visual_Capture // Series_155</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] font-sans">PURE. <br/> <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(120,113,108,0.6)" }}>ART.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-stone-600 font-mono">Exhibition_Sync</div>
                   <div className="w-64 h-[2px] bg-white/5 rounded-none overflow-hidden font-sans">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-stone-500 font-sans" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white font-sans">
                {WORKS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-none overflow-hidden border border-stone-500/10 hover:border-stone-500/40 transition-all cursor-pointer shadow-2xl bg-white/5 font-sans"
                    onClick={() => { setActiveItem(i); setView("work"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-100" />
                     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                     <div className="absolute inset-0 bg-stone-500/10 group-hover:bg-transparent transition-colors duration-1000" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between font-sans">
                        <div className="flex justify-between items-start text-white font-sans">
                           <div className="p-4 bg-white/10 border border-white/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                              <Eye className="w-5 h-5 text-stone-400 font-sans" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic font-mono">UNIT_0x{i+155}</div>
                        </div>
                        <div className="text-white font-sans">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-stone-300 font-mono">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none transition-all group-hover:tracking-widest font-sans">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE WORK VIEW (DETAIL) */}
        {view === "work" && (
          <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen font-sans">
             <button onClick={() => setView("index")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-none hover:scale-110 transition-transform shadow-2xl font-sans">
                <X className="w-6 h-6 font-sans" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0 font-sans">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#050505] font-sans">
                   <div className="absolute inset-0 opacity-10 font-sans">
                      <Image src={WORKS[activeItem].img} alt="Background" fill className="object-cover grayscale font-sans" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-stone-500 font-sans">
                      CORE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-sans text-white font-sans">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-none overflow-hidden border border-stone-500/20 group bg-neutral-900 shadow-2xl font-sans">
                         <Image src={WORKS[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 font-sans" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10 z-20 font-sans">
                            <Layers className="w-6 h-6 text-stone-400 animate-pulse font-sans" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12 text-white font-sans">
                         <div className="space-y-6 font-sans">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic font-mono text-stone-600 font-sans">Dynamic_Sync // {WORKS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-white font-sans">{WORKS[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-stone-500 font-mono font-sans font-sans font-sans">Ref: {WORKS[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed font-sans font-sans">
                            Structural allocation for mission {WORKS[activeItem].title}. System integrity at 100%. Every coordinate synchronized. Perfect exhibition.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/10 font-mono text-white/60 text-stone-400 font-sans">
                            {[
                              { icon: <Palette className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Zap className="w-5 h-5" />, l: "Sync", v: "Active" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Status", v: "Verified" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20 text-stone-400">{s.icon}</div>
                                 <div className="text-left font-sans font-sans">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic text-white font-mono font-sans">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white font-mono font-sans">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono font-sans">
                            <button onClick={() => setView("index")} className="flex-grow py-8 bg-stone-600 text-white font-black uppercase text-xs tracking-[1em] hover:bg-stone-500 transition-all shadow-2xl font-mono">
                               Return_to_Index
                            </button>
                            <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-white font-mono">
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
          <motion.div key="logic" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center font-sans font-sans">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white font-sans font-sans">
                <div className="space-y-16 text-white font-sans font-sans font-sans">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-stone-400 decoration-2 underline-offset-8 italic font-mono text-stone-700 font-sans font-sans">The_Logic_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase font-sans font-sans font-sans">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60 font-sans font-sans">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10 font-mono text-stone-400 font-sans font-sans font-sans font-sans">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group font-sans font-sans font-sans">
                           <div className="w-16 h-16 rounded-none border border-stone-500 flex items-center justify-center text-stone-500 group-hover:bg-stone-500 group-hover:text-black transition-all shadow-xl font-mono font-sans font-sans font-sans">
                              {item.icon}
                           </div>
                           <div className="text-left text-white font-sans font-sans font-sans">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2 font-sans font-sans">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-stone-400/40 text-stone-500 font-mono font-mono font-mono font-mono font-sans font-sans">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-stone-900/10 rounded-none p-12 overflow-hidden border border-stone-500/20 group shadow-2xl font-sans font-sans font-sans">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s] font-sans" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 font-sans font-sans font-sans" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono font-sans font-mono font-mono font-mono font-mono font-sans font-sans">
                      <div className="px-12 py-6 bg-stone-600 text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-stone-500 transition-all rounded-none font-mono">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-stone-600 leading-none font-mono font-sans font-mono font-mono font-mono font-mono font-sans font-sans">
         <div className="flex gap-12 text-stone-600 font-mono font-sans font-mono">
            <span>Art_Index_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-stone-600 font-sans font-sans font-sans">
            <div className="text-right leading-tight italic font-mono font-sans font-mono font-sans font-sans">
               Archival_Control <br /> v4.0.155
            </div>
            <div className="flex gap-[4px] h-4 font-sans font-sans font-sans">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-stone-500 opacity-${i*20} font-sans font-sans font-sans`}></div>)}
            </div>
         </div>
      </footer>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
