"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowRight, X, Menu, Search, Filter, Hash, Fingerprint, MapPin, Plus } from "lucide-react";
import "../premium.css";

const POTTERY = [
  { id: 1, name: "KILN_DRAFT_01", price: 340, tag: "Vessel", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop", desc: "A raw, unglazed vessel for internal reflection. Captured in the first morning fire." },
  { id: 2, name: "ASH_PLATE_04", price: 180, tag: "Ceramic", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop", desc: "Forged from volcanic ash and deep sea minerals. A structural study of flatness." },
  { id: 3, name: "VOID_CUP", price: 95, tag: "Object", img: "https://images.unsplash.com/photo-1514228742587-6b1558fbed20?q=80&w=1000&auto=format&fit=crop", desc: "The absence of weight. Hand-turned until the clay reaches its breaking point." },
  { id: 4, name: "STARK_BOWL", price: 550, tag: "Masterpiece", img: "https://images.unsplash.com/photo-1493106641515-6b5ca27e4dbe?q=80&w=1000&auto=format&fit=crop", desc: "A monolithic statement of utility. Matte charcoal exterior with a white silica core." },
];

export default function CeramicsAtelierSPA() {
  const [view, setView] = useState<"kiln" | "object" | "philosophy">("kiln");
  const [activeItem, setActiveItem] = useState(0);
  const [cart, setCart] = useState(0);

  return (
    <div className="premium-theme bg-[#f8f7f4] text-[#1a1a1a] min-h-screen selection:bg-[#1a1a1a] selection:text-white font-sans overflow-x-hidden">
      
      {/* Editorial HUD Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <button onClick={() => setView("kiln")} className="text-xl font-black uppercase tracking-tighter hover:opacity-100 transition-opacity">
           ATELIER_036&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("kiln")} className={`hover:opacity-100 transition-opacity ${view === 'kiln' ? 'opacity-100' : ''}`}>THE_KILN</button>
           <button onClick={() => setView("philosophy")} className={`hover:opacity-100 transition-opacity ${view === 'philosophy' ? 'opacity-100' : ''}`}>PHILOSOPHY</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest italic">
              Batch: 0x442_A
           </div>
           <button className="flex items-center gap-4 group">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black opacity-30 group-hover:opacity-100 font-mono">[{cart}]</span>
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* KILN VIEW (CATALOG) */}
        {view === "kiln" && (
          <motion.div key="kiln" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-2 border-black pb-12">
                <h1 className="text-[10vw] font-serif italic font-black uppercase tracking-tighter leading-[0.8]">
                   Fire. <br /> <span className="not-italic text-transparent" style={{ WebkitTextStroke: '1px black' }}>Silence.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter uppercase opacity-10">Kyoto_Digital</div>
                   <div className="flex gap-4">
                      <Search className="w-5 h-5 opacity-20" />
                      <Filter className="w-5 h-5 opacity-20" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {POTTERY.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("object"); }}
                  >
                     <div className="relative aspect-[3/4] bg-[#eae9e6] overflow-hidden mb-8 border border-black/5 rounded-3xl p-6">
                        <Image src={p.img} alt={p.name} fill className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                        <div className="absolute top-8 left-8 text-[8px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity">
                           <Hash className="w-3 h-3 mb-1" /> REF_{p.id}
                        </div>
                     </div>
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-[0.3em] opacity-30 block mb-2">{p.tag}</span>
                           <h3 className="text-3xl font-black uppercase tracking-tighter leading-none hover:text-orange-950">{p.name}</h3>
                        </div>
                        <div className="text-xl font-bold italic tracking-tighter opacity-20 group-hover:opacity-100 transition-all">${p.price}</div>
                     </div>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.5em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-8 border-t border-black/5 pt-6">
                        STUDY_OBJECT <Plus className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* OBJECT VIEW (DETAIL) */}
        {view === "object" && (
          <motion.div key="object" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen pt-24 lg:pt-0">
             <button onClick={() => setView("kiln")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-7 relative h-[60vh] lg:h-screen sticky top-0 bg-[#eae9e6] flex items-center justify-center p-12 lg:p-32">
                   <motion.div initial={{ scale: 1.1, opacity: 0, rotate: -5 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 1.5 }} className="relative w-full h-full">
                      <Image src={POTTERY[activeItem].img} alt="Object" fill className="object-contain grayscale" priority />
                   </motion.div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vh] font-serif italic font-black opacity-[0.02] select-none pointer-events-none capitalize">
                      {POTTERY[activeItem].tag}
                   </div>
                </div>

                <div className="lg:col-span-5 p-12 lg:p-24 bg-white flex flex-col justify-center space-y-16">
                   <div className="space-y-8">
                      <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black decoration-4 underline-offset-8">Material_Data</span>
                      <h1 className="text-6xl md:text-8xl font-serif italic font-black uppercase tracking-tighter leading-none">{POTTERY[activeItem].name}</h1>
                      <div className="text-4xl font-black italic tracking-tighter opacity-40">${POTTERY[activeItem].price}</div>
                   </div>

                   <p className="text-2xl font-light italic leading-relaxed opacity-60 uppercase tracking-tight">
                      {POTTERY[activeItem].desc} Every ridge and imperfection is preserved as a timestamp of the human-clay interface.
                   </p>

                   <div className="grid grid-cols-2 gap-8 border-y border-black/5 py-12">
                      {[
                        { icon: <MapPin className="w-4 h-4" />, l: "Origin", v: "Bizen_Kiln" },
                        { icon: <Fingerprint className="w-4 h-4" />, l: "Texture", v: "Coarse_Grain" },
                        { icon: <Plus className="w-4 h-4" />, l: "Firing", v: "1280°C_RED" },
                        { icon: <X className="w-4 h-4" />, l: "Batch", v: "0x442_A" },
                      ].map((s, i) => (
                        <div key={i} className="flex gap-4 items-center">
                           <div className="text-black/20">{s.icon}</div>
                           <div>
                              <div className="text-[10px] font-black opacity-30 uppercase tracking-widest">{s.l}</div>
                              <div className="text-xs font-black uppercase italic tracking-tighter mt-1">{s.v}</div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-col md:flex-row gap-6">
                      <button onClick={() => { setCart(c => c + 1); setView("kiln"); }} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-[#111] transition-all">
                         Acquire_Object
                      </button>
                      <button onClick={() => setView("philosophy")} className="px-12 py-8 border border-black/10 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all">
                         Atelier_Note
                      </button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* PHILOSOPHY VIEW */}
        {view === "philosophy" && (
          <motion.div key="philosophy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                <div className="space-y-12">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block">Slow_Production</span>
                   <h2 className="text-7xl md:text-[10vw] font-serif italic tracking-tighter leading-none text-black font-black uppercase">THE <br/> BREADTH.</h2>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We reject the digital perfection for the honest flaw. Every piece is a meditation on entropy and the endurance of fired earth.
                   </p>
                </div>
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-black/5 bg-[#eae9e6]">
                   <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000&auto=format&fit=crop" alt="Process" fill className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[2s]" />
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5 pt-12 text-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                {[
                  { t: "The Turn", d: "Manual rotation at 12 RPM ensures the clay retains its structural memory." },
                  { t: "The Glaze", d: "No glazes. Only the reaction between wood ash and minerals during firing." },
                  { t: "The Break", d: "Objects are intentionally pushed to their structural limits before release." },
                ].map((item, i) => (
                  <div key={i}>
                     <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-black">{item.t}</h4>
                     <p className="text-[10px] opacity-60 uppercase tracking-[0.2em] font-black leading-relaxed">{item.d}</p>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Kyoto_Atelier</span>
            <span>Batch_042</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Atelier_036 <br /> Digital_Artifacts
            </div>
            <div className="flex gap-[2px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[3px] h-full bg-black opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>
    </div>
  );
}
