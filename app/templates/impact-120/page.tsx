"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, Menu, Search, Award, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Eye, Droplet } from "lucide-react";
import "../premium.css";

const COLLECTIONS = [
  { id: 1, title: "NUIT_ROSE", cat: "Chypre", value: "€285", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "OUI_VECTOR", cat: "Floral", value: "€320", img: "https://images.unsplash.com/photo-1594035910387-fea477a4a3a9?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "VOID_SHELL", cat: "Woody", value: "€450", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop" },
];

export default function EclatLuxurySPA() {
  const [view, setView] = useState<"essence" | "fragrance" | "maison">("essence");
  const [activeItem, setActiveItem] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#1a0a1e] text-[#fbcfe8] min-h-screen selection:bg-pink-600 selection:text-white font-serif overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.02] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           ÉCLAT
        </div>
        <div className="absolute inset-0 bg-[#1a0a1e]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1a0a1e_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-transparent backdrop-blur-3xl border-b border-pink-500/10 font-mono">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("essence")} className="text-xl font-light tracking-[0.5em] hover:text-white transition-colors flex items-center gap-4 text-[#fbcfe8]">
              ÉCLAT&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic text-white">
              Status: Essence_Sync_Active
              <span className="text-pink-400">Ref: 0x120</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 text-white">
           <button onClick={() => setView("essence")} className={`hover:opacity-100 transition-opacity ${view === 'essence' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_ESSENCE</button>
           <button onClick={() => setView("maison")} className={`hover:opacity-100 transition-opacity ${view === 'maison' ? 'text-white opacity-100 underline decoration-white underline-offset-8 italic' : ''}`}>THE_MAISON</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer text-white" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer text-white" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE ESSENCE VIEW (LANDING) */}
        {view === "essence" && (
          <motion.div key="essence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b border-pink-500/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-pink-500/10 underline-offset-8 italic font-mono text-pink-400">Fragrance_Capture // Series_120</span>
                   <h1 className="text-7xl md:text-[12vw] font-extralight uppercase tracking-tighter leading-[0.75] text-white">PURE. <br/> <span className="text-pink-900">NUIANCE.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end text-white">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono">Atmospheric_Sync</div>
                   <div className="w-64 h-[1px] bg-white/5 rounded-none overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-pink-500" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-mono text-white">
                {COLLECTIONS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-[4rem] overflow-hidden border border-pink-500/10 hover:border-pink-500/40 transition-all cursor-pointer shadow-2xl bg-white/5"
                    onClick={() => { setActiveItem(i); setView("fragrance"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors duration-1000" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start text-white mix-blend-difference">
                           <div className="p-4 bg-white/10 border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <Droplet className="w-5 h-5" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">ESSENCE_0x{i+120}</div>
                        </div>
                        <div className="mix-blend-difference text-white">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-pink-300">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-extralight italic uppercase tracking-tighter leading-none transition-all group-hover:tracking-widest font-serif">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE FRAGRANCE VIEW (DETAIL) */}
        {view === "fragrance" && (
          <motion.div key="fragrance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("essence")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#1a0a1e]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={COLLECTIONS[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-pink-500 font-serif">
                      SCENT
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1a0a1e_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-serif text-white">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-[2/3] w-full max-w-md mx-auto rounded-[8rem] overflow-hidden border border-pink-500/20 shadow-2xl group bg-neutral-900">
                         <Image src={COLLECTIONS[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute bottom-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10 z-20">
                            <Layers className="w-6 h-6 text-pink-400 animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-white decoration-4 underline-offset-8 italic text-pink-400 font-mono">Essence_Sync // {COLLECTIONS[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-extralight uppercase tracking-tighter leading-none text-white">{COLLECTIONS[activeItem].title}</h1>
                            <div className="text-4xl font-extralight italic tracking-tighter opacity-10 italic text-pink-600">Price: {COLLECTIONS[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-extralight italic leading-relaxed uppercase tracking-tight opacity-40 text-white leading-relaxed">
                            Structural allocation for fragrance {COLLECTIONS[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/10 font-mono text-white/60">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Origin", v: "Global_East" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: "Active" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20 text-pink-400">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic text-white">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("essence")} className="flex-grow py-8 bg-pink-600 text-white font-black uppercase text-xs tracking-[1em] hover:bg-pink-500 transition-all shadow-2xl rounded-full">
                               Return_to_Essence
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

        {/* THE MAISON VIEW (INFO) */}
        {view === "maison" && (
          <motion.div key="maison" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-pink-400 decoration-2 underline-offset-8 italic font-mono text-pink-400">The_Maison_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-extralight italic tracking-tighter leading-none text-white uppercase font-serif">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-extralight italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60 font-serif">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10 font-mono text-pink-400">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-pink-400 flex items-center justify-center text-pink-400 group-hover:bg-pink-400 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2 font-serif">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-pink-400/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-pink-900/10 rounded-none p-12 overflow-hidden border border-pink-500/20 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-pink-500 transition-all rounded-full">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-pink-400 leading-none font-mono">
         <div className="flex gap-12 text-pink-400">
            <span>Éclat_OS_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-pink-400">
            <div className="text-right leading-tight italic">
               Archival_Control <br /> v4.0.120
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-pink-500 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
