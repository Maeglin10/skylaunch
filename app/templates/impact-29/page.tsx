"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Menu, Terminal, Zap, Shield, Activity, Plus, Share2, ArrowRight, Layers, Fingerprint } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "NEURAL_LINK_V1", cat: "Interface", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", desc: "A sub-millisecond latent interface for surgical-grade operations. Neural-sync verified." },
  { id: 2, name: "KRYPT_NODE", cat: "Security", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop", desc: "Decentralized encryption layer that treats light as a cryptographic key. Zero-leak protocol." },
  { id: 3, name: "AXON_CORE", cat: "Compute", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", desc: "A structural study of photonic processing and thermal inertia. 4.8GHz stable." },
  { id: 4, name: "VOID_SHELL", cat: "Housing", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "Minimalist hardware chassis forged in high-altitude environments for purity." },
];

export default function GlitchCyberPortfolioSPA() {
  const [view, setView] = useState<"index" | "core" | "signal">("index");
  const [activeItem, setActiveItem] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 200);
  };

  return (
    <div className={`premium-theme bg-[#030303] text-[#ff2244] min-h-screen selection:bg-[#ff2244] selection:text-black font-mono overflow-x-hidden ${glitch ? 'grayscale invert' : ''}`}>
      
      {/* HUD Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#ff2244]/20 shadow-[0_0_20px_#ff2244]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff224408_0%,_transparent_70%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-[#ff2244]/30 blur-sm z-10"
        />

        {/* Binary Rain (Subtle) */}
        <div className="absolute inset-0 opacity-[0.02] text-[8px] overflow-hidden whitespace-pre pointer-events-none p-12">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i}>{Math.random() > 0.5 ? '10101010101010101010101010' : '01010101010101010101010101'}</div>
            ))}
        </div>
      </div>

      {/* Global Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-[#ff2244]/10">
        <button onClick={() => { setView("index"); triggerGlitch(); }} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors">
           SIGNAL_ARCHIVE&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("index")} className={`hover:opacity-100 transition-opacity ${view === 'index' ? 'text-white opacity-100' : ''}`}>THE_SIGNAL</button>
           <button onClick={() => setView("signal")} className={`hover:opacity-100 transition-opacity ${view === 'signal' ? 'text-white opacity-100' : ''}`}>THE_PROTOCOL</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest text-[#ff2244]">
              Status: Uplink_Verified
           </div>
           <Terminal className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* INDEX VIEW (GLITCHY GRID) */}
        {view === "index" && (
          <motion.div key="index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8 max-w-[1800px] mx-auto">
             <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-[#ff2244]/20 pb-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#ff2244] opacity-40 mb-4 block">Archives // Series_029</span>
                   <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">GLITCH.</h1>
                </div>
                <div className="text-right flex gap-12 items-end">
                   <div className="space-y-2">
                      <div className="text-[9px] font-black opacity-20 uppercase tracking-widest leading-tight">NODE_LOAD: 82%</div>
                      <div className="w-32 h-1 bg-[#ff2244]/10 rounded-full overflow-hidden">
                         <motion.div animate={{ width: ['20%', '80%', '40%'] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-[#ff2244]" />
                      </div>
                   </div>
                   <Activity className="w-10 h-10 opacity-20 text-[#ff2244] animate-pulse" />
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PROJECTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group relative aspect-square border border-[#ff2244]/10 p-2 hover:bg-[#ff2244]/5 transition-all cursor-pointer rounded-2xl overflow-hidden"
                    onClick={() => { setActiveItem(i); setView("core"); triggerGlitch(); }}
                  >
                     <div className="absolute top-4 left-4 z-10 opacity-20 group-hover:opacity-100 group-hover:text-white transition-opacity font-black text-[10px]">
                        ID_0x0{p.id}
                     </div>
                     <Image src={p.img} alt={p.name} fill className="object-cover opacity-20 grayscale group-hover:opacity-80 transition-all duration-700 group-hover:scale-110" />
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     <div className="absolute bottom-8 left-8 right-8">
                        <span className="text-[8px] uppercase font-black tracking-[0.4em] opacity-40 mb-2 block">{p.cat}</span>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-[#ff2244] transition-colors">{p.name}</h2>
                     </div>

                     {/* Glitch Overlay on Hover */}
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-40 pointer-events-none mix-blend-screen animate-[glitch_0.3s_infinite]">
                        <Image src={p.img} alt="glitch" fill className="object-cover hue-rotate-90 contrast-200" />
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* CORE VIEW (PROJECT DETAIL) */}
        {view === "core" && (
          <motion.div key="core" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => { setView("index"); triggerGlitch(); }} className="fixed top-12 left-12 z-[60] bg-[#ff2244] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,34,68,0.4)]">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-black">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff224405_0%,_transparent_70%)]" />
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#ff2244]/20 group shadow-2xl">
                         <Image src={PROJECTS[activeItem].img} alt="Core" fill className="object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[3s]" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-[#ff2244]/20">
                            <Layers className="w-6 h-6 text-[#ff2244] animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#ff2244]/40 mb-8 block underline decoration-[#ff2244]/20 underline-offset-8 italic">Core_Synthesis // 0x442_A</span>
                            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white">{PROJECTS[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10">Verification: 100%_PASS</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#ff2244]">
                            {PROJECTS[activeItem].desc} An architectural study involving multi-axis tension and structural transparency in virtual space.
                         </p>

                         <div className="grid grid-cols-2 gap-8 py-10 border-y border-[#ff2244]/10">
                            {[
                              { icon: <Fingerprint className="w-5 h-5" />, l: "Identity", v: "Class_Alpha_ID" },
                              { icon: <Zap className="w-5 h-5" />, l: "Processing", v: "Cold_Logic" },
                              { icon: <Shield className="w-5 h-5" />, l: "Encryption", v: "Sub_Atomic" },
                              { icon: <Activity className="w-5 h-5" />, l: "Latency", v: "Synced" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-4 items-center text-[#ff2244]">
                                 <div className="opacity-40">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6">
                            <button onClick={() => { triggerGlitch(); setView("index"); }} className="flex-grow py-8 bg-[#ff2244] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl">
                               Process_Sequence
                            </button>
                            <button className="px-12 py-8 border border-[#ff2244]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* SIGNAL VIEW (INFO) */}
        {view === "signal" && (
          <motion.div key="signal" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-[#ff2244] opacity-30 block underline decoration-[#ff2244] decoration-2 underline-offset-8 italic">The_Structural_Void</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#ff2244]/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#ff2244]/20">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Layers className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#ff2244] flex items-center justify-center text-[#ff2244] group-hover:bg-[#ff2244] group-hover:text-black transition-all shadow-[0_0_30px_rgba(255,34,68,0.2)]">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#ff2244]">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-[#ff2244]/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop" alt="The Void" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-[#ff2244] text-[#ff2244] text-[10px] font-black uppercase tracking-widest italic animate-pulse cursor-pointer hover:bg-[#ff2244] hover:text-black transition-all">
                         Transmit_Signal...
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#ff2244]">
         <div className="flex gap-12">
            <span>Uptime: 99.9%</span>
            <span>Ref_0x442</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Signal_Protocol <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#ff2244] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 34, 68, 0.02);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 34, 68, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
        @keyframes glitch {
          0% { clip-path: inset(10% 0 30% 0); transform: translate(-5px, 2px); }
          20% { clip-path: inset(40% 0 10% 0); transform: translate(5px, -2px); }
          40% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 5px); }
          60% { clip-path: inset(70% 0 5% 0); transform: translate(2px, -5px); }
          80% { clip-path: inset(5% 0 80% 0); transform: translate(-5px, 2px); }
          100% { clip-path: inset(50% 0 20% 0); transform: translate(5px, -2px); }
        }
      `}</style>
    </div>
  );
}
