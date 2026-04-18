"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Plus, X, Menu, Search, Filter, Droplets, Sparkles, Wind } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "LUCID_AIR", price: 320, tag: "Ethereal", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop", desc: "A transparent dialogue of ozone, cold mineral water, and crushed mountain glass. Crisp, sharp, and hauntingly clear." },
  { id: 2, name: "AMBER_VOID", price: 450, tag: "Deep", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop", desc: "A heavy, refractive scent of smoked resin, dark vanilla, and ancient fossilized woods. Captured in a leaded crystal vessel." },
  { id: 3, name: "NEON_DEW", price: 280, tag: "Electric", img: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=1000&auto=format&fit=crop", desc: "Synthentic violet, green tea, and static electricity. A fragrance that vibrates on the skin like digital light." },
  { id: 4, name: "SILK_MESH", price: 380, tag: "Tactile", img: "https://images.unsplash.com/photo-1585218356057-dc042f340605?q=80&w=1000&auto=format&fit=crop", desc: "A soft, structural blend of white musk, raw silk fiber, and cold metallic iron. Impeccably balanced." },
];

export default function GlassFragranceSPA() {
  const [view, setView] = useState<"catalog" | "product" | "info">("catalog");
  const [activeItem, setActiveItem] = useState(0);
  const [cart, setCart] = useState(0);

  return (
    <div className="premium-theme bg-[#0a0a0f] text-white min-h-screen selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* Background Refractive Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-cyan-900/10 blur-[200px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2], x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/5 backdrop-blur-3xl border-b border-white/5">
        <button onClick={() => setView("catalog")} className="text-xl font-black uppercase tracking-[0.4em] text-cyan-400 hover:text-white transition-colors">
           GLASS.BOUTIQUE&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("catalog")} className={`hover:opacity-100 transition-opacity ${view === 'catalog' ? 'text-white opacity-100' : ''}`}>THE_ESSENCE</button>
           <button onClick={() => setView("info")} className={`hover:opacity-100 transition-opacity ${view === 'info' ? 'text-white opacity-100' : ''}`}>THE_GLASSHOUSE</button>
        </div>
        <div className="flex items-center gap-8">
           <button className="flex items-center gap-4 group">
              <ShoppingBag className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span className="text-[10px] font-black opacity-30 group-hover:opacity-100 font-mono">[{cart}]</span>
           </button>
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* CATALOG VIEW */}
        {view === "catalog" && (
          <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8 md:px-12 max-w-[1800px] mx-auto">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/10 pb-12">
                <h1 className="text-7xl md:text-[10vw] font-serif italic tracking-tighter leading-[0.8] text-white">
                   Transparency <br /> <span className="not-italic font-black text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Defined.</span>
                </h1>
                <div className="text-right flex flex-col items-end">
                   <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4 block">Refraction_Index: 1.45</div>
                   <div className="flex gap-4">
                      <Search className="w-5 h-5 opacity-40 hover:text-cyan-400 cursor-pointer" />
                      <Filter className="w-5 h-5 opacity-40 hover:text-cyan-400 cursor-pointer" />
                   </div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {PRODUCTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="glass rounded-[3rem] p-8 group border border-white/5 hover:border-cyan-400/30 transition-all cursor-pointer flex flex-col"
                    onClick={() => { setActiveItem(i); setView("product"); }}
                  >
                     <div className="relative aspect-square mb-12 rounded-[2rem] overflow-hidden bg-white/5 p-4 flex items-center justify-center">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 1.5 }} className="relative w-full h-full">
                           <Image src={p.img} alt={p.name} fill className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                        </motion.div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-20" />
                     </div>
                     <div className="flex justify-between items-end mb-8">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400 mb-2 block">{p.tag}</span>
                           <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">{p.name}</h3>
                        </div>
                        <div className="text-xl font-bold italic tracking-tighter opacity-40 group-hover:opacity-100 transition-all">${p.price}</div>
                     </div>
                     <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] uppercase font-black tracking-[0.4em] hover:bg-cyan-500 hover:text-black transition-all">
                        Experience_Notes
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* PRODUCT DETAIL VIEW */}
        {view === "product" && (
          <motion.div key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 pb-32">
             <button onClick={() => setView("catalog")} className="fixed top-12 left-12 z-[60] bg-white text-black p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                <div className="lg:col-span-7 relative h-[70vh] lg:h-screen sticky top-0 bg-transparent flex items-center justify-center p-12 lg:p-32 overflow-hidden">
                   <div className="absolute inset-0 bg-[#0a0a0f] z-[-1]" />
                   <motion.div 
                     initial={{ scale: 1.2, opacity: 0, rotate: -5 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 1.5 }}
                     className="relative w-full h-full"
                   >
                      <Image src={PRODUCTS[activeItem].img} alt="Product" fill className="object-contain" priority />
                   </motion.div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vh] font-serif italic font-black opacity-[0.02] select-none pointer-events-none capitalize">
                      {PRODUCTS[activeItem].tag}
                   </div>
                </div>

                <div className="lg:col-span-5 p-12 lg:p-24 bg-white/5 backdrop-blur-3xl border-l border-white/5 flex flex-col justify-center space-y-16">
                   <div className="space-y-8">
                      <span className="text-[10px] uppercase tracking-[1em] font-black opacity-30 block underline decoration-cyan-400 underline-offset-8">Olfactory_Sequence</span>
                      <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">{PRODUCTS[activeItem].name}</h1>
                      <div className="text-4xl font-bold tracking-tighter text-cyan-400">${PRODUCTS[activeItem].price}</div>
                   </div>

                   <p className="text-xl font-light italic leading-relaxed opacity-60 uppercase tracking-tight">
                      {PRODUCTS[activeItem].desc} A scent that exists at the limit of visibility and perception. 
                   </p>

                   <div className="grid grid-cols-3 gap-8 py-12 border-y border-white/5 text-center">
                      {[
                        { icon: <Wind className="w-5 h-5 mx-auto mb-3" />, l: "Top Notes", v: "Ozone/Steel" },
                        { icon: <Droplets className="w-5 h-5 mx-auto mb-3" />, l: "Heart Notes", v: "Iched Tea" },
                        { icon: <Sparkles className="w-5 h-5 mx-auto mb-3" />, l: "Base Notes", v: "White Musk" },
                      ].map((s, i) => (
                        <div key={i} className="group">
                           <div className="text-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                           <div className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">{s.l}</div>
                           <div className="text-[10px] font-black uppercase italic tracking-tighter">{s.v}</div>
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-col md:flex-row gap-6">
                      <button onClick={() => { setCart(c => c + 1); setView("catalog"); }} className="flex-grow py-8 bg-cyan-400 text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                         Acquire_Essence
                      </button>
                      <button className="px-12 py-8 border border-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                         Inquiry
                      </button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* INFO VIEW */}
        {view === "info" && (
          <motion.div key="info" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-white/10">
                   <Image src="https://images.unsplash.com/photo-1510250660352-0d19f27c7322?q=80&w=1000&auto=format&fit=crop" alt="Process" fill className="object-cover opacity-60 grayscale" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                </div>
                <div className="space-y-12">
                   <span className="text-[10px] uppercase tracking-[1.5em] font-black opacity-30 block">Refractive_Thinking</span>
                   <h2 className="text-7xl md:text-8xl font-serif italic tracking-tighter leading-none text-white font-black">Architecture <br/> of Air.</h2>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We treat fragrance as a structural element. A landscape of scent built through additive synthesis and material purity. Born in Geneva, refined in the void.
                   </p>
                   <div className="space-y-10 pt-12">
                      {[
                        { t: "Molecular Sourcing", d: "We utilize supercritical fluid extraction to ensure zero degradation of the organic profile." },
                        { t: "Refractive Crystal", d: "Our vessels are lead-free crystal, designed to interact with light like a prism." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-[1px] bg-cyan-400 mt-4 group-hover:w-24 transition-all" />
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black mt-2 leading-relaxed">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em]">
         <div className="flex gap-12">
            <span>Glass_Certified</span>
            <span>Batch_042</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Glass_Boutique <br /> Tokyo_Node
            </div>
            <div className="flex gap-[2px] h-3">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-cyan-400`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
