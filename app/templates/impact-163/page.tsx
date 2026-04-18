"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Award, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Target, Radio, CheckCircle2, User, BookOpen } from "lucide-react";
import "../premium.css";

const ARTICLES = [
  { id: 1, title: "QUIET_ART", cat: "Philosophy", value: "Verified", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "TYPO_RESONANCE", cat: "Interface", value: "Active", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "COLD_COMPUTE", cat: "Reality", value: "Locked", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
];

export default function JulianParkerSPA() {
  const [view, setView] = useState<"parker" | "article" | "logic">("parker");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-white text-slate-900 min-h-screen selection:bg-slate-900 selection:text-white font-sans overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-slate-900 font-sans">
           PARKER
        </div>
        <div className="absolute inset-x-0 top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/5 font-sans" />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] font-sans" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply font-sans" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#ffffff_100%)] opacity-80 font-sans" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-transparent backdrop-blur-3xl border-b border-black/10 font-mono text-slate-900">
        <div className="flex gap-12 items-center text-slate-900 font-sans">
           <button onClick={() => setView("parker")} className="text-xl font-black italic tracking-tighter hover:text-stone-800 transition-colors flex items-center gap-4 text-slate-900 uppercase font-sans">
              JULIAN_PARKER&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic font-mono font-sans">
              Status: Thought_Sync_Active
              <span className="text-black font-sans">Ref: 0x163</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 font-mono font-sans font-sans">
           <button onClick={() => setView("parker")} className={`hover:opacity-100 transition-opacity ${view === 'parker' ? 'text-black opacity-100 underline decoration-black underline-offset-8 italic' : ''}`}>THE_PARKER</button>
           <button onClick={() => setView("logic")} className={`hover:opacity-100 transition-opacity ${view === 'logic' ? 'text-black opacity-100 underline decoration-black underline-offset-8 italic' : ''}`}>THE_LOGIC</button>
        </div>
        <div className="flex items-center gap-8 text-black font-sans font-sans">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer font-sans" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer font-sans" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE PARKER VIEW (LANDING) */}
        {view === "parker" && (
          <motion.div key="parker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10 font-sans font-sans">
             <header className="mb-24 border-b border-black/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12 text-black font-sans font-sans">
                <div className="font-sans">
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-black/10 underline-offset-8 italic font-mono text-slate-900 font-sans font-sans">Visual_Capture // Series_163</span>
                   <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75] font-sans italic text-slate-900">PURE. <br/> <span className="text-transparent font-sans" style={{ WebkitTextStroke: "2px rgba(15,23,42,0.6)" }}>WORDS.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end font-sans font-sans">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-stone-600 font-mono font-sans font-sans">Thought_Sync</div>
                   <div className="w-64 h-[2px] bg-black/5 rounded-none overflow-hidden font-sans font-sans">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-slate-900 font-sans font-sans" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black font-sans font-sans">
                {ARTICLES.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-none overflow-hidden border border-black/5 hover:border-black/20 transition-all cursor-pointer shadow-2xl bg-white/5 font-sans font-sans"
                    onClick={() => { setActiveItem(i); setView("article"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100 font-sans font-sans" />
                     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-200/60 to-transparent font-sans font-sans" />
                     <div className="absolute inset-0 bg-slate-500/10 group-hover:bg-transparent transition-colors duration-1000 font-sans font-sans" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between font-sans font-sans">
                        <div className="flex justify-between items-start text-black font-sans font-sans">
                           <div className="p-4 bg-white/10 border border-black/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity font-mono font-sans font-sans">
                              <BookOpen className="w-5 h-5 text-slate-900 font-sans font-sans font-sans" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic font-mono font-sans font-sans">THOUGHT_0x{i+163}</div>
                        </div>
                        <div className="text-black font-sans font-sans">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-slate-800 font-mono font-sans font-sans font-sans font-sans">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none transition-all group-hover:tracking-widest font-sans font-sans font-sans font-sans font-sans">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE ARTICLE VIEW (DETAIL) */}
        {view === "article" && (
          <motion.div key="article" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen font-sans font-sans">
             <button onClick={() => setView("parker")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-none hover:scale-110 transition-transform shadow-2xl font-sans font-sans">
                <X className="w-6 h-6 font-sans font-sans font-sans font-sans font-sans" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0 font-sans font-sans font-sans">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-white font-sans font-sans font-sans font-sans font-sans">
                   <div className="absolute inset-0 opacity-10 font-sans font-sans font-sans font-sans font-sans">
                      <Image src={ARTICLES[activeItem].img} alt="Background" fill className="object-cover grayscale font-sans font-sans font-sans font-sans font-sans" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-slate-900 font-sans font-sans font-sans font-sans">
                      CORE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#ffffff_100%)] font-sans font-sans font-sans" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-sans text-black font-sans font-sans font-sans font-sans">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-none overflow-hidden border border-black/10 group bg-neutral-900 shadow-2xl font-sans font-sans font-sans">
                         <Image src={ARTICLES[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80 font-sans font-sans font-sans font-sans font-sans" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 font-sans font-sans font-sans font-sans font-sans" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10 z-20 font-sans font-sans font-sans">
                            <Layers className="w-6 h-6 text-slate-400 animate-pulse font-sans font-sans font-sans font-sans" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12 text-black font-sans font-sans font-sans font-sans font-sans">
                         <div className="space-y-6 font-sans font-sans font-sans font-sans font-sans font-sans">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8 italic font-mono text-slate-900 font-sans font-sans font-sans font-sans font-sans font-sans">Metric_Sync // {ARTICLES[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-black font-sans font-sans font-sans font-sans font-sans">{ARTICLES[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-slate-900 font-mono font-sans font-sans font-sans font-sans">Ref: {ARTICLES[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-black leading-relaxed font-sans font-sans font-sans font-sans font-sans">
                            Structural allocation for mission {ARTICLES[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-black/10 font-mono text-black/60 text-slate-900 font-sans font-sans font-sans font-sans font-sans">
                            {[
                              { icon: <User className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Zap className="w-5 h-5" />, l: "Sync", v: "Active" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Status", v: "Verified" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center font-sans font-sans font-sans font-sans font-sans">
                                 <div className="opacity-20 text-slate-900 font-sans font-sans font-sans font-sans font-sans">{s.icon}</div>
                                 <div className="text-left font-sans font-sans font-sans font-sans font-sans">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic text-black font-sans font-sans font-sans font-sans font-sans font-sans">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-black font-sans font-sans font-sans font-sans font-sans font-sans">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono font-sans font-sans font-sans font-sans font-sans">
                            <button onClick={() => setView("parker")} className="flex-grow py-8 bg-slate-900 text-white font-black uppercase text-xs tracking-[1em] hover:bg-slate-800 transition-all shadow-2xl font-mono font-sans font-sans font-sans font-sans font-sans">
                               Return_to_Parker
                            </button>
                            <button className="px-12 py-8 border border-black/10 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-black font-mono font-sans font-sans font-sans font-sans font-sans">
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
          <motion.div key="logic" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center font-sans font-sans font-sans font-sans">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-black font-sans font-sans font-sans font-sans font-sans font-sans">
                <div className="space-y-16 text-black font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-slate-900 decoration-2 underline-offset-8 italic font-mono text-slate-700 font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">The_Logic_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-slate-900 uppercase font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-black font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/10 font-mono text-slate-900 font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                           <div className="w-16 h-16 rounded-none border border-slate-900 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-xl font-mono font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                              {item.icon}
                           </div>
                           <div className="text-left text-black font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-black leading-none mb-2 font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-slate-900/40 text-slate-900 font-mono font-mono font-mono font-mono font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-slate-900/5 rounded-none p-12 overflow-hidden border border-black/10 group shadow-2xl font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s] font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono font-sans font-mono font-mono font-mono font-mono font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                      <div className="px-12 py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-slate-800 transition-all rounded-none font-mono font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-slate-900 leading-none font-mono font-sans font-mono font-mono font-mono font-mono font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
         <div className="flex gap-12 text-slate-900 font-mono font-sans font-mono font-sans font-mono font-sans font-mono font-sans font-mono font-sans">
            <span>Julian_Parker_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-slate-900 font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
            <div className="text-right leading-tight italic font-mono font-sans font-mono font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
               Archival_Control <br /> v4.0.163
            </div>
            <div className="flex gap-[4px] h-4 font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-slate-900 opacity-${i*20} font-sans font-sans font-sans font-sans font-sans font-sans font-sans font-sans`}></div>)}
            </div>
         </div>
      </footer>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
