"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Terminal, Shield, Zap, Activity, Globe, Cpu, ChevronRight, X, Menu, Search, Command, Layers } from "lucide-react";
import "../premium.css";

const NODES = [
  { id: 1, name: "CORE_SYNAPSE_VX", cat: "Infrastructure", status: "Online", load: "42%", uptime: "99.99%", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "SPECTRA_LINK", cat: "Connectivity", status: "Online", load: "12%", uptime: "100.00%", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "VOID_ENCRYPT", cat: "Security", status: "Critical", load: "08%", uptime: "94.22%", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "AETHER_HUB", cat: "Provisioning", status: "Online", load: "67%", uptime: "99.98%", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop" },
];

export default function TerminalConsoleSPA() {
  const [view, setView] = useState<"terminal" | "manual" | "console">("terminal");
  const [activeNode, setActiveNode] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 200);
  };

  return (
    <div className={`premium-theme bg-[#050505] text-[#00ff99] min-h-screen selection:bg-[#00ff99] selection:text-black font-mono overflow-x-hidden ${glitch ? 'grayscale invert' : ''}`}>
      
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] animate-pulse">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>

      {/* Global Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center bg-[#050505]/40 backdrop-blur-xl border-b border-[#00ff99]/10">
        <div className="flex gap-8 items-center">
           <button onClick={() => { setView("terminal"); triggerGlitch(); }} className="text-xl font-black tracking-tighter hover:text-white transition-colors flex items-center gap-4">
              <Terminal className="w-6 h-6 animate-pulse" /> TERMINAL_OS&trade;
           </button>
           <div className="hidden lg:flex gap-6 text-[10px] font-black uppercase tracking-widest opacity-20">
              <span className="text-[#00ff99]">Uplink: VERIFIED</span>
              <span>Ref: 0x442_F</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("terminal")} className={`hover:opacity-100 transition-opacity ${view === 'terminal' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_TERMINAL</button>
           <button onClick={() => setView("manual")} className={`hover:opacity-100 transition-opacity ${view === 'manual' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_MANUAL</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE TERMINAL VIEW (LANDING) */}
        {view === "terminal" && (
          <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-32 px-6 md:px-24">
             <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b-2 border-[#00ff99]/20 pb-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#00ff99] opacity-40 mb-4 block underline decoration-[#00ff99]/10 underline-offset-8 italic">Initialization_Stream // v4.0.21</span>
                   <h1 className="text-7xl md:text-[10vw] font-black italic uppercase tracking-tighter leading-[0.85] text-white">DEEP. <br/> <span className="text-[#00ff99]">LOGIC.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic">Secure_Uplink</div>
                   <div className="w-64 h-1 bg-[#00ff99]/10 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#00ff99]" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Node List */}
                <div className="lg:col-span-7 space-y-4">
                   {NODES.map((node, i) => (
                      <motion.div 
                        key={node.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className={`group relative p-10 border border-[#00ff99]/10 hover:border-[#00ff99]/40 cursor-pointer transition-all ${activeNode === i ? 'bg-[#00ff99]/5 border-[#00ff99]' : ''}`}
                        onMouseEnter={() => setActiveNode(i)}
                        onClick={() => setView("console")}
                      >
                         <div className="flex justify-between items-center relative z-10">
                            <div className="flex gap-12 items-center">
                               <span className="text-4xl font-black italic opacity-10 group-hover:opacity-100 transition-opacity">0{node.id}</span>
                               <div>
                                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">{node.name}</h3>
                                  <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                                     <span>{node.cat}</span>
                                     <span className={node.status === 'Critical' ? 'text-red-500' : 'text-[#00ff99]'}>{node.status}</span>
                                  </div>
                               </div>
                            </div>
                            <ChevronRight className={`w-6 h-6 transition-all ${activeNode === i ? 'translate-x-4 text-[#00ff99]' : 'opacity-0'}`} />
                         </div>
                         {/* Static Glitch Decoration */}
                         <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-40 font-black text-[8px] uppercase tracking-tighter">
                            CheckSum_0x{node.id}44A
                         </div>
                      </motion.div>
                   ))}
                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-5 relative h-[60vh] lg:h-auto rounded-3xl overflow-hidden border border-[#00ff99]/10 group">
                   <AnimatePresence mode="wait">
                      <motion.div key={activeNode} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                         <Image src={NODES[activeNode].img} alt="Node" fill className="object-cover grayscale opacity-40 group-hover:opacity-80 transition-all duration-[3s]" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                         <div className="absolute inset-x-10 bottom-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00ff99] mb-4">Transmission_Active</div>
                            <p className="text-xl font-light italic leading-relaxed uppercase tracking-tight text-white/60">
                               Real-time synchronization for {NODES[activeNode].name}. Load balancing at {NODES[activeNode].load} with a total uptime of {NODES[activeNode].uptime}.
                            </p>
                         </div>
                      </motion.div>
                   </AnimatePresence>
                   <div className="absolute top-10 right-10 flex gap-4">
                      <div className="p-4 bg-[#00ff99]/10 backdrop-blur-xl border border-[#00ff99]/20 rounded-full">
                         <Activity className="w-5 h-5 animate-pulse text-[#00ff99]" />
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE MANUAL VIEW (INFO) */}
        {view === "manual" && (
          <motion.div key="manual" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-[#00ff99] opacity-30 block underline decoration-[#00ff99]/20 underline-offset-8 italic">Operating_Manual // v04</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Logic.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#00ff99]/60">
                      We treat infrastructure as code. Every deployment is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#00ff99]/20">
                      {[
                        { icon: <Shield className="w-6 h-6" />, t: "E2E Encryption", v: "Sub-Atomic Security" },
                        { icon: <Layers className="w-6 h-6" />, t: "Scalability", v: "Dynamic Node Sync" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#00ff99]/20 flex items-center justify-center text-[#00ff99] group-hover:bg-[#00ff99] group-hover:text-black transition-all shadow-[0_0_30px_rgba(0,255,153,0.1)]">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#00ff99]">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-[#00ff99]/10 group shadow-2xl bg-white/5">
                   <Image src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop" alt="Manual" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-[#00ff99] text-[#00ff99] text-[10px] font-black uppercase tracking-widest italic animate-pulse cursor-pointer hover:bg-[#00ff99] hover:text-black transition-all">
                         Download_Protocol.pdf
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE CONSOLE VIEW (DETAILED NODE) */}
        {view === "console" && (
          <motion.div key="console" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => { setView("terminal"); triggerGlitch(); }} className="fixed top-12 left-12 z-[60] bg-[#00ff99] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(0,255,153,0.3)]">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#050505]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={NODES[activeNode].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-[#00ff99]/20 shadow-2xl group bg-white/5">
                         <Image src={NODES[activeNode].img} alt="Console" fill className="object-cover grayscale opacity-60" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-xl border border-[#00ff99]/20">
                            <Command className="w-6 h-6 text-[#00ff99] animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#00ff99]/40 mb-8 block underline decoration-[#00ff99]/20 underline-offset-8 italic">Console_Sync // Node_0x{NODES[activeNode].id}</span>
                            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">{NODES[activeNode].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic">Allocation: SYNCHRONIZED</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#00ff99]">
                            {NODES[activeNode].cat} allocation for current cycle. System integrity at 100%. Thermal load nominal at 32C. 
                         </p>

                         <div className="grid grid-cols-2 gap-8 py-10 border-y border-[#00ff99]/10">
                            {[
                              { icon: <Activity className="w-5 h-5" />, l: "Load", v: NODES[activeNode].load },
                              { icon: <Cpu className="w-5 h-5" />, l: "Uptime", v: NODES[activeNode].uptime },
                              { icon: <Shield className="w-5 h-5" />, l: "Logic", v: "Sync_Verified" },
                              { icon: <Globe className="w-5 h-5" />, l: "Global", v: "Node_Active" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-4 items-center text-[#00ff99]">
                                 <div className="opacity-40">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-xs font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6">
                            <button onClick={() => { triggerGlitch(); setView("terminal"); }} className="flex-grow py-8 bg-[#00ff99] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,153,0.3)]">
                               Initiate_Uplink
                            </button>
                            <button className="px-12 py-8 border border-[#00ff99]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#00ff99]">
         <div className="flex gap-12">
            <span>Uptime: 99.9%</span>
            <span>Ref_0x442_F</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Terminal_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#00ff99] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(0, 255, 153, 0.01);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(0, 255, 153, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
