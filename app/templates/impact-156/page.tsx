"use client";

import { motion, AnimatePresence } from "pure-framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Award, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Target, Radio, CheckCircle2, Leaf, Wind } from "lucide-react";
import "../premium.css";

const SYSTEMS = [
  { id: 1, title: "SOLAR_GRID", cat: "Renewable", value: "Verified", img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "VERTICAL_BIOME", cat: "Ecological", value: "Active", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "LOOP_RECLAIM", cat: "Circular", value: "Locked", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop" },
];

export default function BioFormSustainableSPA() {
  const [view, setView] = useState<"bio" | "system" | "logic">("bio");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#f2f4f1] text-[#2d3a2d] min-h-screen selection:bg-[#2d3a2d] selection:text-[#f2f4f1] font-sans overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           BIO
        </div>
        <div className="absolute inset-x-0 top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/5" />
        <div className="absolute inset-0 bg-[#f2f4f1]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#f2f4f1_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-transparent backdrop-blur-3xl border-b border-[#2d3a2d]/10 font-mono text-[#2d3a2d]">
        <div className="flex gap-12 items-center text-[#2d3a2d]">
           <button onClick={() => setView("bio")} className="text-xl font-black italic tracking-tighter hover:text-stone-800 transition-colors flex items-center gap-4 text-[#2d3a2d] uppercase">
              BIO_FORM&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic font-mono">
              Status: Ecology_Sync_Active
              <span className="text-black font-mono">Ref: 0x156</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 font-mono">
           <button onClick={() => setView("bio")} className={`hover:opacity-100 transition-opacity ${view === 'bio' ? 'text-black opacity-100 underline decoration-black underline-offset-8 italic' : ''}`}>THE_BIO</button>
           <button onClick={() => setView("logic")} className={`hover:opacity-100 transition-opacity ${view === 'logic' ? 'text-black opacity-100 underline decoration-black underline-offset-8 italic' : ''}`}>THE_LOGIC</button>
        </div>
        <div className="flex items-center gap-8 text-black">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE BIO VIEW (LANDING) */}
        {view === "bio" && (
          <motion.div key="bio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10 font-sans">
             <header className="mb-24 border-b border-[#2d3a2d]/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12 text-[#2d3a2d] font-sans">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-[#2d3a2d]/10 underline-offset-8 italic font-mono text-[#2d3a2d] font-sans">Ecological_Capture // Series_156</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] font-sans text-[#2d3a2d]">PURE. <br/> <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(45,58,45,0.6)" }}>GROWTH.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end font-sans">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-[#2d3a2d] font-mono">Biome_Sync</div>
                   <div className="w-64 h-[2px] bg-black/5 rounded-none overflow-hidden font-sans">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-emerald-700 font-sans" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#2d3a2d] font-sans">
                {SYSTEMS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-none overflow-hidden border border-[#2d3a2d]/10 hover:border-[#2d3a2d]/40 transition-all cursor-pointer shadow-2xl bg-white/5 font-sans"
                    onClick={() => { setActiveItem(i); setView("system"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-100 font-sans" />
                     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f2f4f1]/80 to-transparent font-sans" />
                     <div className="absolute inset-0 bg-[#2d3a2d]/10 group-hover:bg-transparent transition-colors duration-1000 font-sans" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between font-sans">
                        <div className="flex justify-between items-start text-[#2d3a2d] font-sans">
                           <div className="p-4 bg-white/10 border border-black/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity font-mono font-sans">
                              <Leaf className="w-5 h-5 text-emerald-700 font-sans font-sans" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic font-mono font-sans font-sans">UNIT_0x{i+156}</div>
                        </div>
                        <div className="text-[#2d3a2d] font-sans">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-emerald-800 font-mono font-sans font-sans font-sans">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none transition-all group-hover:tracking-widest font-sans font-sans font-sans">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE SYSTEM VIEW (DETAIL) */}
        {view === "system" && (
          <motion.div key="system" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen font-sans">
             <button onClick={() => setView("bio")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-none hover:scale-110 transition-transform shadow-2xl font-sans font-sans">
                <X className="w-6 h-6 font-sans font-sans" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0 font-sans font-sans">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#f2f4f1] font-sans font-sans font-sans font-sans">
                   <div className="absolute inset-0 opacity-10 font-sans font-sans">
                      <Image src={SYSTEMS[activeItem].img} alt="Background" fill className="object-cover grayscale font-sans font-sans font-sans font-sans" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-[#2d3a2d] font-sans font-sans font-sans">
                      CORE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#f2f4f1_100%)] font-sans font-sans" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-sans text-[#2d3a2d] font-sans font-sans font-sans">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-none overflow-hidden border border-[#2d3a2d]/20 group bg-neutral-900 shadow-2xl font-sans font-sans font-sans">
                         <Image src={SYSTEMS[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80 font-sans font-sans font-sans" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 font-sans font-sans font-sans" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10 z-20 font-sans font-sans font-sans">
                            <Layers className="w-6 h-6 text-emerald-400 animate-pulse font-sans font-sans font-sans" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12 text-[#2d3a2d] font-sans font-sans font-sans font-sans">
                         <div className="space-y-6 font-sans font-sans font-sans font-sans font-sans">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-[#2d3a2d] decoration-4 underline-offset-8 italic font-mono text-[#2d3a2d] font-sans font-sans font-sans font-sans font-sans">Metric_Sync // {SYSTEMS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-[#2d3a2d] font-sans font-sans font-sans font-sans">{SYSTEMS[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-[#2d3a2d] font-sans font-sans font-sans">Ref: {SYSTEMS[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#2d3a2d] leading-relaxed font-sans font-sans font-sans">
                            Structural allocation for mission {SYSTEMS[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-black/10 font-mono text-[#2d3a2d]/60 text-[#2d3a2d] font-sans font-sans font-sans font-sans">
                            {[
                              { icon: <Wind className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Zap className="w-5 h-5" />, l: "Sync", v: "Active" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Status", v: "Verified" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center font-sans font-sans font-sans font-sans">
                                 <div className="opacity-20 text-emerald-700 font-sans font-sans font-sans font-sans">{s.icon}</div>
                                 <div className="text-left font-sans font-sans font-sans font-sans">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic text-black font-sans font-sans font-sans font-sans font-sans">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-[#2d3a2d] font-sans font-sans font-sans font-sans font-sans">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono font-sans font-sans font-sans font-sans">
                            <button onClick={() => setView("bio")} className="flex-grow py-8 bg-[#2d3a2d] text-white font-black uppercase text-xs tracking-[1em] hover:bg-[#3d4a3d] transition-all shadow-2xl font-mono font-sans font-sans font-sans font-sans">
                               Return_to_Bio
                            </button>
                            <button className="px-12 py-8 border border-black/10 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-black font-mono font-sans font-sans font-sans font-sans">
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
          <motion.div key="logic" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center font-sans font-sans font-sans">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-[#2d3a2d] font-sans font-sans font-sans">
                <div className="space-y-16 text-[#2d3a2d] font-sans font-sans font-sans font-sans font-sans">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-emerald-700 decoration-2 underline-offset-8 italic font-mono text-[#2d3a2d] font-sans font-sans font-sans font-sans font-sans">The_Logic_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-[#2d3a2d] uppercase font-sans font-sans font-sans font-sans font-sans">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#2d3a2d] font-sans font-sans font-sans font-sans font-sans">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/10 font-mono text-emerald-700 font-sans font-sans font-sans font-sans font-sans font-sans">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group font-sans font-sans font-sans font-sans font-sans">
                           <div className="w-16 h-16 rounded-none border border-emerald-700 flex items-center justify-center text-emerald-700 group-hover:bg-[#2d3a2d] group-hover:text-white transition-all shadow-xl font-mono font-sans font-sans font-sans font-sans font-sans">
                              {item.icon}
                           </div>
                           <div className="text-left text-[#2d3a2d] font-sans font-sans font-sans font-sans font-sans">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-[#2d3a2d] leading-none mb-2 font-sans font-sans font-sans font-sans font-sans">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-emerald-700/40 text-emerald-700 font-mono font-mono font-mono font-mono font-sans font-sans font-sans font-sans font-sans">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#2d3a2d]/5 rounded-none p-12 overflow-hidden border border-[#2d3a2d]/10 group shadow-2xl font-sans font-sans font-sans font-sans font-sans">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s] font-sans font-sans font-sans font-sans font-sans" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 font-sans font-sans font-sans font-sans font-sans" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono font-sans font-mono font-mono font-mono font-mono font-sans font-sans font-sans font-sans font-sans">
                      <div className="px-12 py-6 bg-[#2d3a2d] text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-[#3d4a3d] transition-all rounded-none font-mono font-sans font-sans font-sans font-sans">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#2d3a2d] leading-none font-mono font-sans font-mono font-mono font-mono font-mono font-sans font-sans font-sans font-sans font-sans">
         <div className="flex gap-12 text-[#2d3a2d] font-sans font-mono font-sans font-mono">
            <span>Bio_Form_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-[#2d3a2d] font-sans font-sans font-sans font-sans font-sans">
            <div className="text-right leading-tight italic font-mono font-sans font-mono font-sans font-sans font-sans font-sans">
               Archival_Control <br /> v4.0.156
            </div>
            <div className="flex gap-[4px] h-4 font-sans font-sans font-sans font-sans font-sans">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#2d3a2d] opacity-${i*20} font-sans font-sans font-sans font-sans font-sans`}></div>)}
            </div>
         </div>
      </footer>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
