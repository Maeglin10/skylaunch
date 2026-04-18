"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Menu, Search, Filter, Globe, Zap, Shield, Activity, Plus, Play, Radio, Satellite, Compass } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "ORION_NODE_01", cat: "Infrastructure", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop", desc: "A distributed compute network synchronized via quantum-entangled nodes." },
  { id: 2, name: "NEBULA_PULSE", cat: "Communication", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop", desc: "Sub-atomic signal stability for high-EMI zones in deep space transit." },
  { id: 3, name: "VOID_ENCRYPT", cat: "Security", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", desc: "Encryption layer that treat light as a cryptographic key. Zero-latency." },
  { id: 4, name: "STELLAR_UNIT", cat: "Habitat", img: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000&auto=format&fit=crop", desc: "Experimental habitat design for long-duration orbital deployment." },
];

export default function HoloTacticalSPA() {
  const [view, setView] = useState<"deck" | "scan" | "satellite">("deck");
  const [activeItem, setActiveItem] = useState(0);

  const next = () => setActiveItem((prev) => (prev + 1) % PROJECTS.length);
  const prev = () => setActiveItem((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <div className="premium-theme bg-[#050508] text-[#ff8800] min-h-screen selection:bg-[#ff8800] selection:text-black font-mono overflow-x-hidden">
      
      {/* HUD Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff880008_0%,_transparent_70%)] opacity-40" />
        
        {/* Scanning Grids */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
           <div className="w-full h-[1px] bg-[#ff8800] animate-pulse" />
           <div className="h-full w-[1px] bg-[#ff8800] animate-pulse" />
        </div>
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-[#ff8800]/10">
        <button onClick={() => setView("deck")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors">
           HOLO_DECK&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("deck")} className={`hover:opacity-100 transition-opacity ${view === 'deck' ? 'text-white underline underline-offset-8' : ''}`}>THE_DECK</button>
           <button onClick={() => setView("satellite")} className={`hover:opacity-100 transition-opacity ${view === 'satellite' ? 'text-white underline underline-offset-8' : ''}`}>THE_RECON</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest text-[#ff8800]">
              Uplink: ESTABLISHED
           </div>
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE DECK VIEW (3D CAROUSEL) */}
        {view === "deck" && (
          <motion.div key="deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full flex items-center justify-center perspective-[2000px] pt-24">
             <div className="relative w-full max-w-6xl aspect-video preserve-3d">
                <AnimatePresence mode="wait">
                   <motion.div 
                     key={activeItem}
                     initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                     animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                     exit={{ rotateY: -90, opacity: 0, scale: 1.2 }}
                     transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                     className="absolute inset-0 shadow-[0_50px_100px_rgba(255,136,0,0.1)] rounded-[3rem] overflow-hidden border border-[#ff8800]/20 bg-black"
                     onClick={() => setView("scan")}
                   >
                      <Image src={PROJECTS[activeItem].img} alt="Deck" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
                      
                      {/* Internal HUD */}
                      <div className="absolute inset-12 flex flex-col justify-end">
                         <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                            <span className="text-[10px] font-black uppercase tracking-[1em] text-[#ff8800] mb-4 block">Selected_Node</span>
                            <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white mb-8 select-none">
                               {PROJECTS[activeItem].name}
                            </h2>
                            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest opacity-40">
                               <div className="flex items-center gap-3">
                                  <Radio className="w-4 h-4" /> 0xF44.1_EST
                               </div>
                               <div className="flex items-center gap-3">
                                  <Compass className="w-4 h-4" /> Vector: Polar_Delta
                               </div>
                            </div>
                         </motion.div>
                      </div>
                   </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-12 z-50">
                   <button onClick={prev} className="w-16 h-16 rounded-full border border-[#ff8800]/20 flex items-center justify-center hover:bg-[#ff8800] hover:text-black transition-all">
                      <ArrowLeft className="w-6 h-6" />
                   </button>
                   <div className="w-64 h-[2px] bg-[#ff8800]/10 relative rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${((activeItem + 1) / PROJECTS.length) * 100}%` }}
                        className="absolute inset-y-0 left-0 bg-[#ff8800] shadow-[0_0_10px_#ff8800]"
                      />
                   </div>
                   <button onClick={next} className="w-16 h-16 rounded-full border border-[#ff8800]/20 flex items-center justify-center hover:bg-[#ff8800] hover:text-black transition-all">
                      <ArrowRight className="w-6 h-6" />
                   </button>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE SCAN VIEW (PROJECT DETAIL) */}
        {view === "scan" && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("deck")} className="fixed top-12 left-12 z-[60] bg-[#ff8800] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,136,0,0.3)]">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-black">
                   <div className="absolute inset-0 opacity-20">
                      <Image src={PROJECTS[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-[#ff8800]/20 shadow-2xl group">
                         <Image src={PROJECTS[activeItem].img} alt="Scan" fill className="object-cover grayscale" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-xl border border-white/10">
                            <Satellite className="w-6 h-6 animate-pulse text-[#ff8800]" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#ff8800]/40 mb-8 block underline decoration-[#ff8800]/20 underline-offset-8 italic">Recon_Sync // 0x442_D</span>
                            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10">Verification: ENCRYPTED</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#ff8800]">
                            {PROJECTS[activeItem].desc} Every coordinate was computed to ensure maximum signal integrity amidst the silence of the void.
                         </p>

                         <div className="grid grid-cols-2 gap-8 py-10 border-y border-[#ff8800]/10">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Region", v: "Deep_Space_Alpha" },
                              { icon: <Zap className="w-5 h-5" />, l: "Latency", v: "0.2ms_Verified" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "Phase_Shift_Core" },
                              { icon: <Activity className="w-5 h-5" />, l: "Sync", v: "Protocol_059" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-4 items-center text-[#ff8800]">
                                 <div className="opacity-40">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-xs font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6">
                            <button onClick={() => setView("deck")} className="flex-grow py-8 bg-[#ff8800] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl">
                               Initiate_Uplink
                            </button>
                            <button className="px-12 py-8 border border-[#ff8800]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* SATELLITE VIEW (INFO) */}
        {view === "satellite" && (
          <motion.div key="satellite" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-[#ff8800] opacity-30 block underline decoration-[#ff8800]/40 decoration-2 underline-offset-8 italic">The_Structural_Void</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#ff8800]/60">
                      We treat architecture as an act of subtraction. We don't add; we reveal the structural truth of the space. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#ff8800]/20">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#ff8800] flex items-center justify-center text-[#ff8800] group-hover:bg-[#ff8800] group-hover:text-black transition-all shadow-[0_0_30px_rgba(255,136,0,0.2)]">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#ff8800]">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-[#ff8800]/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1000&auto=format&fit=crop" alt="The Void" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-[#ff8800] text-[#ff8800] text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-[#ff8800] hover:text-black transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#ff8800]">
         <div className="flex gap-12">
            <span>Uptime: 99.9%</span>
            <span>Ref_0x442</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Signal_Protocol <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#ff8800] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 136, 0, 0.02);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 136, 0, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
