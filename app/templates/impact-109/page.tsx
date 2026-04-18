"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, Menu, Search, Camera, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Eye } from "lucide-react";
import "../premium.css";

const FRAMES = [
  { id: 1, title: "FJORD_CORE", cat: "Terroir", value: "Verified", img: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "LIT_VECTOR", cat: "Shadow", value: "Active", img: "https://images.unsplash.com/photo-1682687221038-404670f09439?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "VOID_SCAPE", cat: "Glacial", value: "Locked", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop" },
];

export default function LuminGallerySPA() {
  const [view, setView] = useState<"gallery" | "frame" | "curated">("gallery");
  const [activeItem, setActiveItem] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#faf9f6] text-[#1a1a1a] min-h-screen selection:bg-indigo-400 selection:text-white font-sans overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.02] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           LUMIN
        </div>
        <div className="absolute inset-0 bg-[#faf9f6]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#faf9f6_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-transparent backdrop-blur-3xl border-b border-black/5 font-mono">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("gallery")} className="text-xl font-bold tracking-tighter hover:scale-105 transition-transform font-sans uppercase">
              LUMIN_GALLERY&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Collection_Active
              <span className="text-indigo-600">Ref: 0x109</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("gallery")} className={`hover:opacity-100 transition-opacity ${view === 'gallery' ? 'text-indigo-600 opacity-100 underline decoration-indigo-600 decoration-2 underline-offset-8 italic' : ''}`}>THE_GALLERY</button>
           <button onClick={() => setView("curated")} className={`hover:opacity-100 transition-opacity ${view === 'curated' ? 'text-indigo-600 opacity-100 underline decoration-indigo-600 decoration-2 underline-offset-8 italic' : ''}`}>THE_CURATED</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE GALLERY VIEW (LANDING) */}
        {view === "gallery" && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b border-black/10 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-indigo-600/10 underline-offset-8 italic font-mono text-indigo-600">Creative_Sync // Series_109</span>
                   <h1 className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.75]">LIMITLESS. <br/> <span className="opacity-40">LANDSCAPES.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-black">Curated_Frame</div>
                   <div className="w-64 h-[2px] bg-black/5 rounded-none overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-indigo-500" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-mono">
                {FRAMES.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-[3rem] overflow-hidden border border-black/5 hover:border-black/20 transition-all cursor-pointer shadow-brutalist bg-[#ddd]"
                    onClick={() => { setActiveItem(i); setView("frame"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start text-white mix-blend-difference">
                           <div className="p-4 bg-white/10 border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <Camera className="w-5 h-5" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">FRAME_0x{i+109}</div>
                        </div>
                        <div className="mix-blend-difference text-white">
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none transition-all group-hover:tracking-widest">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
             <style>{`
               .shadow-brutalist {
                 box-shadow: 20px 20px 0px 0px #000;
               }
             `}</style>
          </motion.div>
        )}

        {/* THE FRAME VIEW (DETAIL) */}
        {view === "frame" && (
          <motion.div key="frame" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("gallery")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#faf9f6]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={FRAMES[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-black font-sans">
                      FRAME
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#faf9f6_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-sans">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border-8 border-white bg-white shadow-2xl group">
                         <Image src={FRAMES[activeItem].img} alt="Frame" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-white/10">
                            <Layers className="w-6 h-6 text-white animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8 italic text-indigo-600 font-mono">Archive_Sync // {FRAMES[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-black">{FRAMES[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-indigo-600">State: {FRAMES[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-black leading-relaxed">
                            Structural allocation for {FRAMES[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. Every coordinate synchronized.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-black/10 font-mono text-black/60">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Global_East" },
                              { icon: <Zap className="w-5 h-5" />, l: "Logic", v: "Phase_Shift" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "High_Impact" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: "Active" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20 text-indigo-600">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-black">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("gallery")} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-stone-800 transition-all shadow-2xl">
                               Return_to_Gallery
                            </button>
                            <button className="px-12 py-8 border border-black/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-black">
                               PDF_Spec
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE CURATED VIEW (INFO) */}
        {view === "curated" && (
          <motion.div key="curated" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-black">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-black decoration-2 underline-offset-8 italic font-mono text-indigo-600">The_Curated_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-black uppercase font-sans">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-black/60 font-sans">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/10 font-mono text-indigo-600">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-indigo-600 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-black leading-none mb-2 font-sans">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-indigo-600/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#ddd] rounded-[4rem] p-12 overflow-hidden border border-black/5 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-stone-800 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-indigo-600 leading-none font-mono">
         <div className="flex gap-12 text-indigo-600">
            <span>Lumin_Gallery_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-indigo-600">
            <div className="text-right leading-tight italic">
               Archival_Control <br /> v4.0.109
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-indigo-500 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
