"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Activity, Globe, Zap, Shield, Cpu, Layers, Maximize2, MoveRight, ArrowUpRight, BarChart3, Database } from "lucide-react";
import "../premium.css";

const GRID_ITEMS = [
  { id: 1, title: "CORE_ANALYSIS", cat: "Infrastructure", load: "42%", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "GRID_SYNC", cat: "Connectivity", load: "12%", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
  { id: 3, title: "VOID_ENCRYPT", cat: "Security", load: "08%", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
  { id: 4, title: "AETHER_HUB", cat: "Provisioning", load: "67%", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-1 md:row-span-2" },
  { id: 5, title: "NEXUS_CORE", cat: "Processing", load: "91%", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1" },
];

export default function GridSystemSPA() {
  const [view, setView] = useState<"grid" | "analytics" | "link">("grid");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#020617] text-[#38bdf8] min-h-screen selection:bg-[#38bdf8] selection:text-black font-mono overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#38bdf805_0%,_transparent_70%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen" />
        
        {/* Constant Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-[#38bdf8]/20 blur-sm"
        />
      </div>

      {/* Global Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 md:py-8 flex justify-between items-center bg-[#020617]/40 backdrop-blur-xl border-b border-[#38bdf8]/10">
        <button onClick={() => setView("grid")} className="text-xl font-black italic tracking-tighter hover:text-white transition-colors flex items-center gap-4">
           GRID_OS&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("grid")} className={`hover:opacity-100 transition-opacity ${view === 'grid' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_GRID</button>
           <button onClick={() => setView("link")} className={`hover:opacity-100 transition-opacity ${view === 'link' ? 'text-white opacity-100 underline decoration-white underline-offset-8' : ''}`}>THE_LINK</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest text-[#38bdf8]">
              Status: Uplink_Verified
           </div>
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* GRID VIEW (BENTO LANDING) */}
        {view === "grid" && (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-32 px-6 md:px-12 max-w-[1800px] mx-auto">
             <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-[#38bdf8]/20 pb-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] text-[#38bdf8] opacity-40 mb-4 block underline decoration-[#38bdf8]/10 underline-offset-8 italic">Architecture_Sync // Series_018</span>
                   <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">THE. <br/> <span className="text-[#38bdf8]">SYSTEM.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic">Secure_Uplink</div>
                   <div className="w-64 h-1 bg-[#38bdf8]/10 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '80%', '40%', '60%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#38bdf8]" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                {GRID_ITEMS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className={`${p.span} group relative rounded-[2.5rem] bg-[#020617] border border-[#38bdf8]/10 hover:border-[#38bdf8]/40 overflow-hidden cursor-pointer transition-all shadow-2xl overflow-hidden`}
                    onClick={() => { setActiveItem(i); setView("analytics"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover opacity-20 grayscale group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                           <div className="p-3 rounded-2xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowUpRight className="w-4 h-4 text-[#38bdf8]" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity">Ref: 0x{p.id}</div>
                        </div>
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest text-[#38bdf8] mb-2 block">{p.cat}</span>
                           <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-[#38bdf8] transition-colors">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
                
                {/* Stats Bento Tile */}
                <div className="col-span-1 row-span-1 rounded-[2.5rem] bg-[#38bdf8] p-10 flex flex-col justify-between text-[#020617]">
                   <BarChart3 className="w-10 h-10" />
                   <div>
                      <div className="text-4xl font-black italic tracking-tighter">99.9%</div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Uptime_Verification</div>
                   </div>
                </div>

                {/* Database Bento Tile */}
                <div className="col-span-1 row-span-1 rounded-[2.5rem] border border-[#38bdf8]/10 bg-white/5 p-10 flex flex-col justify-between">
                   <Database className="w-10 h-10 text-[#38bdf8]" />
                   <div>
                      <div className="text-4xl font-black italic tracking-tighter text-white">4.8PB</div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-30 text-[#38bdf8]">Data_Throughput</div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* ANALYTICS VIEW (DETAIL) */}
        {view === "analytics" && (
          <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("grid")} className="fixed top-12 left-12 z-[60] bg-[#38bdf8] text-black p-5 rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(56,189,248,0.3)]">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#020617]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={GRID_ITEMS[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]" />
                   
                   <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-[#38bdf8]/20 shadow-2xl group bg-white/5">
                         <Image src={GRID_ITEMS[activeItem].img} alt="Card" fill className="object-cover grayscale opacity-60" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-[#020617]/60 backdrop-blur-3xl rounded-xl border border-[#38bdf8]/20">
                            <Activity className="w-6 h-6 text-[#38bdf8] animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#38bdf8]/40 mb-8 block underline decoration-[#38bdf8]/20 underline-offset-8 italic">Node_Detail // 0x442_B</span>
                            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">{GRID_ITEMS[activeItem].title}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-10 italic text-[#38bdf8]">Allocation: SYNCHRONIZED</div>
                         </div>

                         <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#38bdf8]">
                            Structural allocation for {GRID_ITEMS[activeItem].title}. System integrity at 100%. Thermal load nominal at 32C. 
                         </p>

                         <div className="grid grid-cols-2 gap-8 py-10 border-y border-[#38bdf8]/10">
                            {[
                              { icon: <Activity className="w-5 h-5" />, l: "Load", v: GRID_ITEMS[activeItem].load },
                              { icon: <Globe className="w-5 h-5" />, l: "Network", v: "Global_Mesh" },
                              { icon: <Shield className="w-5 h-5" />, l: "Logic", v: "Encrypted" },
                              { icon: <Cpu className="w-5 h-5" />, l: "Compute", v: "X-Series" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-4 items-center text-[#38bdf8]">
                                 <div className="opacity-40">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-xs font-black uppercase italic tracking-tighter text-white">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6">
                            <button onClick={() => setView("grid")} className="flex-grow py-8 bg-[#38bdf8] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                               Establish_Link
                            </button>
                            <button className="px-12 py-8 border border-[#38bdf8]/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                               Data_Sheet
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* LINK VIEW (INFO) */}
        {view === "link" && (
          <motion.div key="link" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-[#38bdf8] opacity-30 block underline decoration-[#38bdf8]/20 underline-offset-8 italic">The_System_Foundations</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#38bdf8]/60">
                      We treat architecture as code. Every structure is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#38bdf8]/20 text-[#38bdf8]">
                      {[
                        { icon: <Activity className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Layers className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-[#38bdf8]">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-[#38bdf8]/10 group shadow-2xl bg-white/5">
                   <Image src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop" alt="The System" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-[#38bdf8] text-[#38bdf8] text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-[#38bdf8] hover:text-black transition-all">
                         Establish_Sync
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-[#38bdf8]">
         <div className="flex gap-12">
            <span>Uptime: 99.9%</span>
            <span>Ref_0x442_F</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-[#38bdf8] opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(56, 189, 248, 0.01);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(56, 189, 248, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
