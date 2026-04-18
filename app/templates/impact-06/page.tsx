"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Star, ArrowUpRight, Zap, Droplets, Wind, Plus, Minus, X } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "Neural Mist", price: 290, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop", desc: "A molecular hydration spray for long-term focus and cognitive clarity." },
  { id: 2, name: "Bio-Glass Pro", price: 850, image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000&auto=format&fit=crop", desc: "AR-integrated lenses designed for seamless digital-biological blending." },
  { id: 3, name: "Flow Core X", price: 1200, image: "https://images.unsplash.com/photo-1614729939124-03290b5609ce?q=80&w=1000&auto=format&fit=crop", desc: "A portable haptic relay for tactile interaction in virtual spaces." },
];

export default function FluiditySPA() {
  const [view, setView] = useState<"home" | "shop" | "product">("home");
  const [activeProduct, setActiveProduct] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="premium-theme bg-[#050510] text-white min-h-screen overflow-x-hidden selection:bg-pink-500 font-sans">
      
      {/* Dynamic Ambient Background - Persistent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 50, -30, 0], y: [0, -50, 50, 0], scale: [1, 1.1, 0.9, 1], rotate: 180 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-15%] w-[80%] h-[80%] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, -50, 30, 0], y: [0, 50, -50, 0], scale: [1.1, 0.9, 1.1, 1], rotate: -180 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-15%] right-[-15%] w-[80%] h-[80%] bg-gradient-to-tr from-pink-600/20 to-rose-600/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:px-12 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("home")} className="text-2xl font-black lowercase tracking-tighter flex items-center gap-2 group">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full group-hover:scale-125 transition-transform duration-500 shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
          fluidity.
        </button>
        <div className="hidden md:flex gap-12 text-[11px] uppercase tracking-[0.4em] font-black opacity-40">
           <button onClick={() => setView("home")} className="hover:opacity-100 transition-opacity">Philosophy</button>
           <button onClick={() => setView("shop")} className="hover:opacity-100 transition-opacity">The_Vault</button>
        </div>
        <div className="flex gap-6 items-center">
           <button onClick={() => setView("shop")} className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[8px] flex items-center justify-center font-bold">2</span>
           </button>
           <button onClick={() => setIsMenuOpen(true)} className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 lg:hidden">
              <Plus className="w-4 h-4" />
           </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE VIEW */}
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
             <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }} 
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                  transition={{ duration: 1.5 }}
                  className="max-w-5xl"
                >
                   <h1 className="text-[14vw] md:text-[9vw] font-black leading-none mb-12 tracking-tighter">
                      Organic <br /> 
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-slow">Ambition.</span>
                   </h1>
                   <p className="text-lg md:text-2xl font-light opacity-50 max-w-2xl mx-auto leading-relaxed mb-16 uppercase tracking-[0.2em]">
                      We craft tools for the evolutionary digital citizen. Fluid tech for a fluid world.
                   </p>
                   <button onClick={() => setView("shop")} className="group relative px-12 py-6 overflow-hidden rounded-full font-black text-xs uppercase tracking-[0.6em] transition-all">
                      <span className="relative z-10">Enter the Ecosystem</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-600 group-hover:scale-105 transition-transform duration-500" />
                   </button>
                </motion.div>
             </section>

             <section className="py-32 px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="relative aspect-square rounded-[4rem] overflow-hidden glass group">
                   <Image src="https://images.unsplash.com/photo-1615397323755-e7a8e7456d6a?q=80&w=1000&auto=format&fit=crop" alt="Fluid Glass" fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[3s]" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#050510] to-transparent mix-blend-overlay" />
                </div>
                <div>
                   <span className="text-pink-400 font-black text-[10px] uppercase tracking-[0.6em] mb-4 block">Bio-Dynamics</span>
                   <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tight">The Core <br/> Of Flow.</h2>
                   <p className="text-lg opacity-50 font-light leading-relaxed mb-12">
                      Our hardware is built using synthetic-biological lattice structures. Lightweight, self-healing, and perfectly attuned to the human frequency.
                   </p>
                   <div className="flex gap-8">
                      {['98% Sync', 'Zero Mass', 'Neural Bio'].map((tag, i) => (
                         <div key={i} className="text-[10px] uppercase tracking-widest font-black py-2 border-b border-white/10 opacity-40">{tag}</div>
                      ))}
                   </div>
                </div>
             </section>
          </motion.div>
        )}

        {/* SHOP VIEW */}
        {view === "shop" && (
          <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
                <div>
                   <span className="text-pink-400 font-black text-[10px] uppercase tracking-[0.8em] mb-4 block">Series 08 / 2026</span>
                   <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">The Vault</h1>
                </div>
                <div className="flex gap-4">
                   <button className="px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Neural</button>
                   <button className="px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Sensory</button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map((p, i) => (
                   <motion.div 
                     initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                     key={p.id} onClick={() => { setActiveProduct(i); setView("product"); }}
                     className="group glass rounded-[2.5rem] p-8 hover:bg-white/10 transition-all cursor-pointer border border-white/5"
                   >
                      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8">
                         <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute top-4 right-4 p-4 bg-black/40 backdrop-blur-xl rounded-full text-xs font-black tracking-widest">${p.price}</div>
                      </div>
                      <div className="flex justify-between items-start">
                         <div>
                            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{p.name}</h3>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">In-Stock / Priority_Loom</p>
                         </div>
                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-pink-500 group-hover:border-pink-500 transition-all">
                            <Plus className="w-4 h-4" />
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* SINGLE PRODUCT VIEW */}
        {view === "product" && (
          <motion.div key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 md:pt-48 pb-32 px-8 max-w-7xl mx-auto min-h-screen">
             <button onClick={() => setView("shop")} className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black opacity-40 hover:opacity-100 transition-opacity">
               &larr; Return to Vault
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass p-4">
                   <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <Image src={PRODUCTS[activeProduct].image} alt={PRODUCTS[activeProduct].name} fill className="object-cover" priority />
                   </div>
                </div>
                
                <div className="flex flex-col">
                   <div className="flex items-center gap-4 mb-8">
                      <span className="text-xs px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full font-black uppercase tracking-widest">Verified_Sync</span>
                      <div className="flex gap-1 text-pink-500">
                         {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                   </div>
                   
                   <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">{PRODUCTS[activeProduct].name}</h1>
                   <div className="text-3xl font-light mb-12 opacity-80 tracking-widest">${PRODUCTS[activeProduct].price}.00</div>
                   
                   <p className="text-lg font-light leading-relaxed opacity-50 mb-12 uppercase tracking-[0.1em]">
                      {PRODUCTS[activeProduct].desc} Constructed with advanced molecular integrity and designed for zero-mass feeling.
                   </p>

                   <div className="grid grid-cols-2 gap-4 mb-12">
                      <button className="flex-1 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-pink-500 hover:text-white transition-all rounded-full">Reserve_Unit</button>
                      <button className="flex-1 py-6 border border-white/20 hover:bg-white/5 font-black uppercase text-xs tracking-[0.4em] transition-all rounded-full">Wishlist</button>
                   </div>

                   <div className="border-t border-white/10 pt-12 space-y-8">
                      {[
                        { icon: <Droplets className="w-5 h-5" />, title: "Molecular Fusion", desc: "Seamless bonding with biological dermal layers." },
                        { icon: <Zap className="w-5 h-5" />, title: "Quantum Link", desc: "Encoded sensory encryption for maximum privacy." },
                      ].map((feature, i) => (
                        <div key={i} className="flex gap-6">
                           <div className="text-pink-500">{feature.icon}</div>
                           <div>
                              <div className="text-xs font-black uppercase tracking-widest mb-1">{feature.title}</div>
                              <p className="text-sm opacity-40 uppercase tracking-wider">{feature.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="relative z-10 py-32 border-t border-white/5 px-8">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
               <div className="text-4xl font-black tracking-tighter lowercase mb-4">fluidity.</div>
               <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-20">Looming the future of human tech. © 2026</p>
            </div>
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-black opacity-30">
               <span className="hover:opacity-100 cursor-pointer">Terminal</span>
               <span className="hover:opacity-100 cursor-pointer">Protocol</span>
               <span className="hover:opacity-100 cursor-pointer">Instagram</span>
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% auto;
          animation: gradient-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
