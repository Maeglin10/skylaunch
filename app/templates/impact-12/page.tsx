"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Menu, Search, Filter, Globe, Zap, Shield, Plus, Play, ChevronRight, Share2 } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "AETHEL_STUDIOS", tag: "Creative", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop", desc: "A structural exploration of digital identity and presence. Built on the edge." },
  { id: 2, name: "SILK_OS", tag: "Interface", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop", desc: "Fluid, organic interactions inspired by the movement of raw silk and digital mesh." },
  { id: 3, name: "ORBIT_X", tag: "Hardware", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", desc: "Next-gen computing cores forged in the heart of industrial minimalism." },
  { id: 4, name: "NEO_TYPE", tag: "Visual", img: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=1000&auto=format&fit=crop", desc: "Experimental typography systems designed for high-end editorial narratives." },
];

export default function EditorialArchiveSPA() {
  const [view, setView] = useState<"index" | "story" | "collect">("index");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-white min-h-screen selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] bg-gradient-to-br from-indigo-950/20 to-transparent blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/20 backdrop-blur-3xl border-b border-white/5">
        <button onClick={() => setView("index")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform">
           ARCHIVE_CORP&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("index")} className={`hover:opacity-100 transition-opacity ${view === 'index' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_INDEX</button>
           <button onClick={() => setView("collect")} className={`hover:opacity-100 transition-opacity ${view === 'collect' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_COLLECTIVE</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE INDEX VIEW (GRID) */}
        {view === "index" && (
          <motion.div key="index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/10 pb-10">
                <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75]">
                   Structural <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Narratives.</span>
                </h1>
                <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20">Protocol_Archive // v4.2</div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {PROJECTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer border-l-2 border-white/0 hover:border-white transition-all pl-0 hover:pl-8"
                    onClick={() => { setActiveItem(i); setView("story"); }}
                  >
                     <div className="relative aspect-video bg-white/5 overflow-hidden mb-12 rounded-[2rem] border border-white/5">
                        <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
                        <div className="absolute top-12 left-12 flex gap-4">
                           <div className="p-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
                              <Plus className="w-4 h-4 text-white" />
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                     </div>
                     <div className="flex justify-between items-start pr-8">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30 mb-2 block">{p.tag}</span>
                           <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-6 group-hover:text-white transition-colors">{p.name}</h3>
                        </div>
                        <div className="text-2xl font-black italic tracking-tighter opacity-10 group-hover:opacity-100 transition-all font-mono">/0{p.id}</div>
                     </div>
                     <p className="text-lg font-light italic opacity-40 max-w-sm uppercase tracking-tight">{p.desc}</p>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.5em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-8 border-t border-white/5 pt-8 mt-12 w-full">
                        ACTIVATE_STUDY <ArrowUpRight className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE STORY VIEW (DETAIL) */}
        {view === "story" && (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("index")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-24 overflow-hidden h-screen">
                   <div className="absolute inset-0 z-[-1]">
                      <Image src={PROJECTS[activeItem].img} alt="Background" fill className="object-cover opacity-20 grayscale brightness-50" />
                   </div>
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden border border-white/10 group shadow-2xl">
                         <Image src={PROJECTS[activeItem].img} alt="Story" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                         <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center">
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase italic opacity-40">Series_Alpha</span>
                            <Share2 className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-white/40 mb-8 block underline decoration-white/20 underline-offset-8 italic">Case_Study // 0x442_B</span>
                            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10">Status: ARCHIVED</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-40">
                            {PROJECTS[activeItem].desc} Every pixel is a dialogue between human machine interface and organic structure.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/10">
                            {[
                              { l: "Year", v: "2026.04" },
                              { l: "Client", v: "Aeon_Labs" },
                              { l: "Protocol", v: "High_End_UX" },
                              { l: "Security", v: "0_Latency" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="w-2 h-2 rounded-full bg-white opacity-20" />
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <button onClick={() => setView("index")} className="w-full py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] hover:bg-black hover:text-white border border-white transition-all shadow-2xl skew-x-[-10deg]">
                            Explore_Next_Cycle
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE COLLECTIVE VIEW (INFO) */}
        {view === "collect" && (
          <motion.div key="collect" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-white/10 group">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Void" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                   <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center opacity-40">
                      <span className="text-[10px] font-black tracking-widest uppercase italic">Berlin_HQ</span>
                      <Activity className="w-5 h-5 animate-pulse" />
                   </div>
                </div>
                <div className="space-y-12">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block">The_Philosophical_Void</span>
                   <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Pulse.</h2>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="space-y-12 pt-12 border-t border-white/10">
                      {[
                         { icon: <Zap className="w-6 h-6" />, t: "Adaptive Flow", d: "Zero-latency workflows built on a proprietary decentralized node network." },
                         { icon: <Globe className="w-6 h-6" />, t: "Global Vision", d: "A synthesis of cultural perspectives, from Tokyo's tech to Milan's minimalism." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">{item.t}</h4>
                              <p className="text-[10px] opacity-20 uppercase tracking-[0.3em] font-black mt-2 leading-relaxed">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12 text-white">
            <span>Archive_Node:BERLIN</span>
            <div className="flex gap-1">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-3 bg-white opacity-${i*20}`}></div>)}
            </div>
         </div>
         <div className="flex gap-4 items-end text-white">
            <div className="text-right leading-tight italic">
               Protocol_Archive <br /> v4.0.21
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
