"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ShoppingCart, Plus, X, Menu, Search, Filter, Info, ChevronRight } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "MONOLITH_CHAIR", price: 2850, tag: "Sculpture", img: "https://images.unsplash.com/photo-1592078615290-033ee584e226?q=80&w=1000&auto=format&fit=crop", desc: "A singular piece of cast aluminum, hand-polished to a mirror finish. Form follows purely structural logic." },
  { id: 2, name: "ORB_LIGHT_01", price: 950, tag: "Lighting", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop", desc: "Floating sphere of hand-blown frosted glass. Suspended by a surgical-grade steel thread." },
  { id: 3, name: "LIN_VASE", price: 420, tag: "Object", img: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop", desc: "Geometric reduction of a classical form. Matte black ceramic with zero-glaze finish." },
  { id: 4, name: "STARK_TABLE", price: 5400, tag: "Furniture", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop", desc: "Massive solid oak slab over a brutalist concrete base. A dialogue between organic and industrial." },
];

export default function MinimalistObjectSPA() {
  const [view, setView] = useState<"catalog" | "object" | "process">("catalog");
  const [activeItem, setActiveItem] = useState(0);
  const [cart, setCart] = useState(0);

  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-black selection:text-white font-sans overflow-x-hidden">
      
      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-black/5">
        <button onClick={() => setView("catalog")} className="text-xl font-black uppercase tracking-tighter hover:opacity-100 transition-opacity">
           NEO.OBJECT&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
           <button onClick={() => setView("catalog")} className={`hover:opacity-100 transition-opacity ${view === 'catalog' ? 'text-black opacity-100' : ''}`}>COLLECTION</button>
           <button onClick={() => setView("process")} className={`hover:opacity-100 transition-opacity ${view === 'process' ? 'text-black opacity-100' : ''}`}>PROCESS</button>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest">
              Stock: Globally_Verified
           </div>
           <button className="flex items-center gap-4 group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black opacity-30 group-hover:opacity-100">[{cart}]</span>
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* CATALOG VIEW */}
        {view === "catalog" && (
          <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-2 border-black pb-12">
                <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mix-blend-difference">
                   PURE. <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>FORM.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-2xl font-black mb-4 tracking-tighter italic">OBJ_COL_42</div>
                   <div className="flex gap-4">
                      <Search className="w-5 h-5 opacity-20" />
                      <Filter className="w-5 h-5 opacity-20" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("object"); }}
                  >
                     <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-8 border border-black/5">
                        <Image src={p.img} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                     </div>
                     <div className="flex justify-between items-start">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-[0.3em] opacity-30 block mb-2">{p.tag}</span>
                           <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4">{p.name}</h3>
                        </div>
                        <div className="text-xl font-bold italic tracking-tighter opacity-20 group-hover:opacity-100 transition-all">${p.price}</div>
                     </div>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.5em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-8 border-t border-black/5 pt-6">
                        ACQUIRE_OBJECT <Plus className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* OBJECT DETAIL VIEW */}
        {view === "object" && (
          <motion.div key="object" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen">
             <button onClick={() => setView("catalog")} className="fixed top-12 left-12 z-[60] bg-black text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-7 relative h-[70vh] lg:h-screen sticky top-0 bg-[#f5f5f5] flex items-center justify-center p-12 lg:p-32">
                   <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative w-full h-full">
                      <Image src={PRODUCTS[activeItem].img} alt="Object" fill className="object-contain grayscale" priority />
                   </motion.div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vh] font-black opacity-[0.02] select-none pointer-events-none italic">
                      {PRODUCTS[activeItem].name.split('_')[0]}
                   </div>
                </div>

                <div className="lg:col-span-5 p-12 lg:p-24 bg-white flex flex-col justify-center space-y-16">
                   <div className="space-y-8">
                      <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 mb-8 block underline decoration-black underline-offset-8">Specifications</span>
                      <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-black">{PRODUCTS[activeItem].name}</h1>
                      <div className="text-4xl font-black italic tracking-tighter">${PRODUCTS[activeItem].price}</div>
                   </div>

                   <p className="text-xl font-light italic leading-relaxed opacity-60">
                      {PRODUCTS[activeItem].desc} Every surface is inspected under polarized light to ensure absolute geometric truth.
                   </p>

                   <div className="grid grid-cols-2 gap-8 border-y border-black/5 py-12">
                      {[
                        { l: "Material", v: "Reinforced_Solid" },
                        { l: "Origin", v: "Crafted_Kyoto" },
                        { l: "Series", v: "Neo_Core" },
                        { l: "Weight", v: "Verified_Net" },
                      ].map((s, i) => (
                        <div key={i}>
                           <div className="text-[10px] font-black opacity-30 uppercase tracking-widest">{s.l}</div>
                           <div className="text-sm font-black uppercase italic tracking-tighter mt-1">{s.v}</div>
                        </div>
                      ))}
                   </div>

                   <div className="flex gap-6">
                      <button onClick={() => { setCart(c => c + 1); setView("catalog"); }} className="flex-grow py-8 bg-black text-white font-black uppercase text-xs tracking-[1em] hover:bg-[#111] transition-all">
                         Acquire_Asset
                      </button>
                      <button className="px-12 py-8 border border-black/10 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all">
                         Inquire
                      </button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* PROCESS VIEW */}
        {view === "process" && (
          <motion.div key="process" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen">
             <div className="flex justify-between items-end mb-32 border-b-2 border-black pb-12">
                <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mix-blend-difference">THE_METHOD</h1>
                <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20">Protocol // V_04</div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-48">
                <div className="relative aspect-square bg-[#f5f5f5] rounded-full overflow-hidden p-12">
                   <Image src="https://images.unsplash.com/photo-1544411047-c4915842273b?q=80&w=1000&auto=format&fit=crop" alt="Process" fill className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[2s]" />
                </div>
                <div className="space-y-12">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] opacity-30 block">Honesty_in_Void</span>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We do not design objects. We reduce noise until only the structure remains. Every Neo Object is a testament to the pursuit of structural honesty.
                   </p>
                   <div className="space-y-8 pt-12">
                      {[
                        { t: "Material Truth", d: "We respect the inherent properties of the elements we use." },
                        { t: "Geometric Logic", d: "Form is not chosen; it is deduced through mathematical necessity." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center font-black italic group-hover:bg-black group-hover:text-white transition-all text-xl">
                              0{i+1}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black mt-2 leading-relaxed">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="border-t border-black/5 pt-24 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center grayscale opacity-10">
                {[1, 2, 3, 4].map(i => (
                  <div key={i}>
                     <Search className="w-4 h-4 mx-auto mb-4" />
                     <div className="text-[8px] font-black uppercase tracking-[0.5em]">Verification_Point_0{i}</div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em]">
         <div className="flex gap-12">
            <span>Verified Origin</span>
            <span>Batch_042</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Neo_Studio <br /> Digital_Artifacts
            </div>
            <div className="flex gap-[2px] h-3">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-black`}></div>)}
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
