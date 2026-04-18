"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, MapPin, Maximize2, Shield, Activity, Plus, Blueprint, Compass, Ruler } from "lucide-react";
import "../premium.css";

const PROPERTIES = [
  { id: 1, name: "MONOLITH_01", location: "Iceland / Highlands", sqft: "14,200", img: "https://images.unsplash.com/photo-1518005020251-582c7eb8365d?q=80&w=1000&auto=format&fit=crop", desc: "A singular concrete volume emerging from volcanic terrain. Zero-threshold living." },
  { id: 2, name: "OBSIDIAN_CUBE", location: "Norway / Fjords", sqft: "8,500", img: "https://images.unsplash.com/photo-1449156059431-789c6d4a90b5?q=80&w=1000&auto=format&fit=crop", desc: "Floating glass and steel structure suspended over the abyss. Complete visual silence." },
  { id: 3, name: "STARK_PLATEAU", location: "Switzerland / Alps", sqft: "22,000", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", desc: "An architectural study of concrete and light. Pinned against the mountain face." },
];

export default function BrutalistEstateSPA() {
  const [view, setView] = useState<"assets" | "blueprints" | "studio">("assets");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#f4f4f4] text-[#111] min-h-screen selection:bg-[#111] selection:text-white font-mono overflow-x-hidden">
      
      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <button onClick={() => setView("assets")} className="text-xl font-black uppercase tracking-tighter hover:opacity-100 transition-opacity">
           HORIZON_ESTATES&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("assets")} className={`hover:opacity-100 transition-opacity ${view === 'assets' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8' : ''}`}>THE_ASSETS</button>
           <button onClick={() => setView("blueprints")} className={`hover:opacity-100 transition-opacity ${view === 'blueprints' ? 'text-black opacity-100 underline decoration-black decoration-2 underline-offset-8' : ''}`}>BLUEPRINTS</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest italic">
              Inventory_Status: 100%_Verified
           </div>
           <button onClick={() => setView("studio")} className="px-8 py-3 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all italic">
              Book_View
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* ASSETS VIEW (STUDIO GRID) */}
        {view === "assets" && (
          <motion.div key="assets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-12">
                <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8]">
                   STARK. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>VOID.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter italic uppercase text-black/10">Architecture_Node_44</div>
                   <div className="flex gap-4">
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Curating Excellence <br /> Since 2012</div>
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {PROPERTIES.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("blueprints"); }}
                  >
                     <div className="relative aspect-video bg-white overflow-hidden mb-12 rounded-[2rem] border border-black/5 shadow-2xi">
                        <Image src={p.img} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" />
                        <div className="absolute top-8 right-8 p-3 bg-black/80 backdrop-blur-xl rounded-full text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Maximize2 className="w-4 h-4" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">{p.location}</div>
                           <h3 className="text-2xl font-black uppercase tracking-tighter text-white">{p.name}</h3>
                        </div>
                     </div>
                     <div className="flex justify-between items-end pr-4">
                        <div className="max-w-xs">
                           <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30 mb-2 block">{p.sqft}_SQFT</span>
                           <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6 group-hover:text-black transition-colors">{p.name}</h3>
                           <p className="text-sm font-light italic opacity-40 uppercase tracking-tight">{p.desc}</p>
                        </div>
                        <div className="text-3xl font-black italic tracking-tighter opacity-10 group-hover:opacity-100 transition-all">0{p.id}</div>
                     </div>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.6em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-12 border-t border-black/5 pt-10 mt-10">
                        REQUEST_PORTFOLIO <ArrowRight className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* BLUEPRINTS VIEW (DETAIL) */}
        {view === "blueprints" && (
          <motion.div key="blueprints" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("assets")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-12 relative flex items-center justify-center p-8 md:p-32 h-screen overflow-hidden">
                   <div className="absolute inset-0 bg-[#ebebeb] z-[-1]" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vh] font-black opacity-[0.03] select-none pointer-events-none italic tracking-tighter">
                      STRUCTURE
                   </div>
                   
                   <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                      <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.2 }} className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
                         <Image src={PROPERTIES[activeItem].img} alt="Property" fill className="object-cover grayscale" priority />
                      </motion.div>

                      <div className="flex flex-col justify-center space-y-12">
                         <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8">Asset_Profile // {PROPERTIES[activeItem].location}</span>
                            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">{PROPERTIES[activeItem].name}</h1>
                            <div className="text-4xl font-black italic tracking-tighter opacity-20 italic">Global_Allocation: Reserved</div>
                         </div>

                         <p className="text-3xl font-light italic leading-relaxed uppercase tracking-tight opacity-50">
                            {PROPERTIES[activeItem].desc} Every angle was computed to maximize silence and minimize human interference with the landscape.
                         </p>

                         <div className="grid grid-cols-2 gap-12 py-12 border-y border-black/10">
                            {[
                              { icon: <Ruler className="w-5 h-5" />, l: "Total Area", v: `${PROPERTIES[activeItem].sqft} SQFT` },
                              { icon: <Compass className="w-5 h-5" />, l: "Orientation", v: "Polar_South" },
                              { icon: <Shield className="w-5 h-5" />, l: "Security", v: "Military_Grade" },
                              { icon: <Maximize2 className="w-5 h-5" />, l: "Aperture", v: "Zero_Edge" },
                            ].map((s, i) => (
                              <div key={i} className="flex gap-6 items-center">
                                 <div className="text-black/20">{s.icon}</div>
                                 <div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 italic">{s.l}</div>
                                    <div className="text-sm font-black uppercase italic tracking-tighter text-black">{s.v}</div>
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="flex gap-6 pt-8">
                            <button onClick={() => setView("studio")} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-white hover:text-black transition-all">
                               Schedule_Visit
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

        {/* STUDIO VIEW (ABOUT/CONTACT) */}
        {view === "studio" && (
          <motion.div key="studio" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 p-12 md:p-32 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block">Since_2012</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-black uppercase">THE <br/> ORIGIN.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We don't sell houses. We manage digital and physical sovereignty through architectural truth.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                      {[
                        { icon: <MapPin className="w-6 h-6" />, t: "Global Hub", v: "Reykjavik / Tokyo" },
                        { icon: <Activity className="w-6 h-6" />, t: "Verified Assets", v: "4.2B_Value" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-black leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-white rounded-[4rem] p-12 overflow-hidden border border-black/5">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="Studio" fill className="object-cover grayscale" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-widest italic animate-pulse">
                         Studio_Protocol_Active
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Horizon_Estates_Node</span>
            <span>Est. 2012</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Inventory_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-black opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
