"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, Menu, Search, Utensils, Zap, Activity, Globe, Shield, Command, Plus, ArrowUpRight, Maximize2, MoveRight, Layers, Box, Compass, Sparkles, MoveVertical, Wine } from "lucide-react";
import "../premium.css";

const PLATES = [
  { id: 1, title: "WAGYU_A5", cat: "Terroir", value: "€120", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "TRUFFLE_NODE", cat: "Season", value: "€85", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "VOID_LOBSTER", cat: "Reserve", value: "€95", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" },
];

export default function GastronomyMaisonSPA() {
  const [view, setView] = useState<"menu" | "plate" | "terroir">("menu");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#0a0806] text-[#e8dcc8] min-h-screen selection:bg-amber-600 selection:text-white font-serif overflow-x-hidden">
      
      {/* Background HUD Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[45vw] font-black opacity-[0.02] select-none pointer-events-none italic tracking-tighter text-center uppercase">
           MAISON
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0806_100%)] opacity-80" />
      </div>

      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-transparent backdrop-blur-3xl border-b border-amber-900/10 font-mono">
        <div className="flex gap-12 items-center">
           <button onClick={() => setView("menu")} className="text-xl font-light tracking-[0.3em] hover:scale-105 transition-transform font-serif uppercase text-[#e8dcc8]">
              MAISON_DORÉE&trade;
           </button>
           <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-20 italic">
              Status: Service_Active
              <span className="text-amber-600">Ref: 0x104</span>
           </div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("menu")} className={`hover:opacity-100 transition-opacity ${view === 'menu' ? 'text-amber-600 opacity-100 underline decoration-amber-600 decoration-2 underline-offset-8 italic' : ''}`}>THE_MENU</button>
           <button onClick={() => setView("terroir")} className={`hover:opacity-100 transition-opacity ${view === 'terroir' ? 'text-amber-600 opacity-100 underline decoration-amber-600 decoration-2 underline-offset-8 italic' : ''}`}>THE_TERROIR</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE MENU VIEW (LANDING) */}
        {view === "menu" && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
             <header className="mb-24 border-b border-amber-900/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                   <span className="text-[10px] uppercase font-black tracking-[1em] opacity-40 mb-4 block underline decoration-amber-900/10 underline-offset-8 italic font-mono">Saison_Deployment // Series_104</span>
                   <h1 className="text-7xl md:text-[12vw] font-light uppercase tracking-tighter leading-[0.75] font-serif">CARTE. <br/> <span className="text-amber-900">BLANCHE.</span></h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black mb-4 tracking-tighter uppercase opacity-10 italic font-mono text-amber-600">Fine_Dining</div>
                   <div className="w-64 h-[1px] bg-amber-900/20 rounded-none overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '40%', '75%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-amber-600" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-mono">
                {PLATES.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group relative h-[60vh] rounded-none overflow-hidden border border-amber-900/10 hover:border-amber-900/40 transition-all cursor-pointer shadow-2xl bg-[#141210]"
                    onClick={() => { setActiveItem(i); setView("plate"); }}
                  >
                     <Image src={p.img} alt={p.title} fill className="object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-[2s] group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     
                     <div className="absolute inset-10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                           <div className="p-4 bg-amber-900/10 border border-amber-900/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                              <Utensils className="w-5 h-5 text-amber-600" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-20 italic text-amber-600">PLATE_0x{i+104}</div>
                        </div>
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-2 block italic text-amber-700">{p.cat} // {p.value}</span>
                           <h3 className="text-5xl font-light italic uppercase tracking-tighter leading-none font-serif text-[#e8dcc8] transition-all group-hover:tracking-widest">{p.title}</h3>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE PLATE VIEW (DETAIL) */}
        {view === "plate" && (
          <motion.div key="plate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("menu")} className="fixed top-12 left-12 z-[60] bg-[#e8dcc8] text-black p-5 rounded-none hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24 lg:pt-0">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 overflow-hidden h-screen bg-[#0a0806]">
                   <div className="absolute inset-0 opacity-10">
                      <Image src={PLATES[activeItem].img} alt="Background" fill className="object-cover grayscale" />
                   </div>
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter text-center uppercase text-amber-800 font-serif">
                      CUISINE
                   </div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0806_100%)]" />
                   
                   <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 font-serif">
                      <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative aspect-square w-full rounded-full overflow-hidden border-8 border-amber-900/10 group bg-neutral-900 shadow-2xl">
                         <Image src={PLATES[activeItem].img} alt="Spec" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] opacity-80" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                         <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-3xl rounded-none border-2 border-amber-900/10">
                            <Layers className="w-6 h-6 text-amber-600 animate-pulse" />
                         </div>
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-amber-600 decoration-4 underline-offset-8 italic text-amber-500 font-mono">Gastronomy_Sync // {PLATES[activeItem].cat}</span>
                            <h1 className="text-7xl md:text-[8vw] font-light italic uppercase tracking-tighter leading-none text-[#e8dcc8]">{PLATES[activeItem].title}</h1>
                            <div className="text-4xl font-light italic tracking-tighter opacity-10 italic text-amber-600">Price: {PLATES[activeItem].value}</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 text-[#e8dcc8] leading-relaxed">
                            A sculptural exploration of {PLATES[activeItem].title}. Prepared with precision at the intersection of terroir and tectonic intent. Season Spring MMXXVI.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-amber-900/20 font-mono text-[#e8dcc8]/60">
                            {[
                              { icon: <Globe className="w-5 h-5" />, l: "Terroir", v: "Alpine_High" },
                              { icon: <Wine className="w-5 h-5" />, l: "Pairing", v: "Reserve_2012" },
                              { icon: <Shield className="w-5 h-5" />, l: "Source", v: "Traceable_ID" },
                              { icon: <Activity className="w-5 h-5" />, l: "Service", v: "Active" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="opacity-20 text-amber-600">{s.icon}</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-[#e8dcc8]">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8 font-mono">
                            <button onClick={() => setView("menu")} className="flex-grow py-8 bg-[#e8dcc8] text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-2xl">
                               Return_to_Menu
                            </button>
                            <button className="px-12 py-8 border border-amber-900/20 text-[10px] font-black uppercase tracking-[0.5em] hover:scale-105 transition-all text-[#e8dcc8]">
                               PDF_Carte
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE TERROIR VIEW (INFO) */}
        {view === "terroir" && (
          <motion.div key="terroir" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-[#e8dcc8]">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block underline decoration-amber-600 decoration-2 underline-offset-8 italic font-mono text-amber-500">The_Terroir_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-light italic tracking-tighter leading-none text-white uppercase font-serif">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-[#e8dcc8]/60 font-serif">
                      We treat architecture as code. Every plate is a function of its environmental variables and tectonic intent. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-amber-900/20 font-mono text-amber-500">
                      {[
                        { icon: <Sparkles className="w-6 h-6" />, t: "Adaptive Flow", v: "Dynamic Load Sync" },
                        { icon: <Plus className="w-6 h-6" />, t: "Structural Sync", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-none border border-amber-900 flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-black transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-[#e8dcc8] leading-none mb-2 font-serif">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-amber-500/40">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#1a1210] rounded-none p-12 overflow-hidden border border-amber-900/20 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="The Archive" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center font-mono">
                      <div className="px-12 py-6 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest italic animate-bounce cursor-pointer hover:bg-amber-700 transition-all">
                         Establish_Handshake
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-amber-600 leading-none font-mono">
         <div className="flex gap-12 text-amber-600">
            <span>Maison_Alpha</span>
            <span>Uptime: 99.9%</span>
         </div>
         <div className="flex gap-4 items-end text-amber-600">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.104
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-amber-600 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
