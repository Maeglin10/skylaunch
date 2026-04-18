"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, Menu, Search, Mountain, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Map } from "lucide-react";
import "../premium.css";

const CHAPTERS = [
  { id: 1, title: "THE_AWAKENING", cat: "Fjords", value: "Verified", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop", text: "Deep in the Norwegian fjords, where light bends around ancient stone." },
  { id: 2, title: "THE_TRAVERSE", cat: "Glacial", value: "Active", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop", text: "Across glacial ridges where silence becomes a language of its own." },
  { id: 3, title: "THE_SUMMIT", cat: "Celestial", value: "Reserve", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop", text: "Above the clouds, perspective shifts and the world reveals its architecture." },
];

export default function MeridianStorySPA() {
  const [view, setView] = useState<"journey" | "chapter" | "archive">("journey");
  const [activeItem, setActiveItem] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050505] text-[#2dd4bf] min-h-screen selection:bg-teal-500 selection:text-white font-serif overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.02] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           MERIDIAN
        </div>
        <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-80" />
      </div>

      {/* Progress HUD */}
      <div className="fixed top-0 left-0 h-1 bg-teal-500/20 w-full z-[100]">
        <motion.div style={{ width: progress }} className="h-full bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-teal-500/10 font-mono">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("journey")} className="text-xl font-light tracking-[0.3em] hover:scale-105 transition-transform font-serif uppercase text-[#f8f8f8]">
              MERIDIAN_ED&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Narrative_Live
              <span className="text-teal-400">Ref: 0x107</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("journey")} className={`hover:opacity-100 transition-opacity ${view === 'journey' ? 'text-teal-400 opacity-100 underline decoration-teal-400 decoration-2 underline-offset-8 italic' : ''}`}>THE_JOURNEY</button>
           <button onClick={() => setView("archive")} className={`hover:opacity-100 transition-opacity ${view === 'archive' ? 'text-teal-400 opacity-100 underline decoration-teal-400 decoration-2 underline-offset-8 italic' : ''}`}>THE_ARCHIVE</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE JOURNEY VIEW (LANDING) */}
        {view === "journey" && (
          <motion.div key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b border-teal-900/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-teal-900/10 underline-offset-8 italic font-mono text-teal-400">Narrative_Sync // Series_107</span>
                   <h1 className="text-7xl md:text-[12vw] font-light uppercase tracking-tighter leading-[0.75]">LONG. <br/> <span className="text-teal-900">FORM.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-teal-400">Cinematic_Flow</div>
                   <div className="w-64 h-[1px] bg-teal-900/20 rounded-none overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-teal-400" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-mono">
                {CHAPTERS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-none overflow-hidden border border-teal-900/10 hover:border-teal-900/40 transition-all cursor-pointer shadow-2xl bg-[#0a0a0a]"
                    onClick={() => { setActiveItem(i); setView("chapter"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-teal-900/10 border border-teal-900/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                              <Mountain className="w-5 h-5 text-teal-400" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic text-teal-400">CHAPTER_0x0{i+1}</div>
                        </div>
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-teal-600">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-light italic uppercase tracking-tighter leading-none font-serif text-[#f8f8f8] transition-all group-hover:tracking-widest">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE CHAPTER VIEW (DETAIL) */}
        {view === "chapter" && (
          <motion.div key="chapter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("journey")} className="fixed top-12 left-12 z-[60] bg-[#f8f8f8] text-black p-5 rounded-none hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#050505]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={CHAPTERS[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-teal-800 font-serif">
                      SCENE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-serif">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-none overflow-hidden border border-teal-900/10 group bg-neutral-900 shadow-2xl">
                         <Image src={CHAPTERS[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-teal-900/10">
                            <Layers className="w-6 h-6 text-teal-400 animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-teal-400 decoration-4 underline-offset-8 italic text-teal-500 font-mono">Meridian_Sync // {CHAPTERS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-light italic uppercase tracking-tighter leading-none text-[#f8f8f8]">{CHAPTERS[activeItem].title}</h1>
                            <div className="text-4xl font-light italic tracking-tighter opacity-10 italic text-teal-400">State: {CHAPTERS[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#f8f8f8] leading-relaxed">
                            {CHAPTERS[activeItem].text}
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-teal-900/20 font-mono text-teal-400/60">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Nordic_West" },
                              { icon: <Zap className="w-5 h-5" />, l: "Light", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Silence", v: "Absolute" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: "Active" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20 text-teal-400">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-[#f8f8f8]">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("journey")} className="flex-grow py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] hover:bg-teal-400 transition-all shadow-2xl">
                               Return_to_Journey
                            </button>
                            <button className="px-12 py-8 border border-teal-900/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-white">
                               PDF_Story
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE ARCHIVE VIEW (INFO) */}
        {view === "archive" && (
          <motion.div key="archive" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-teal-100">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-teal-400 decoration-2 underline-offset-8 italic font-mono text-teal-400">The_Archive_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-light italic tracking-tighter leading-none text-white uppercase font-serif">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-teal-100/60 font-serif">
                      We treat architecture as code. Every story is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-teal-900/20 font-mono text-teal-400">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-none border border-teal-900 flex items-center justify-center text-teal-400 group-hover:bg-teal-400 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-[#f8f8f8] leading-none mb-2 font-serif">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-teal-400/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#0a0a0a] rounded-none p-12 overflow-hidden border border-teal-900/20 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-teal-400 text-black text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-teal-300 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-teal-400 leading-none font-mono">
         <div className="flex gap-12 text-teal-400">
            <span>Meridian_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-teal-400">
            <div className="text-right leading-tight italic">
               Archival_Control <br /> v4.0.107
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-teal-400 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
