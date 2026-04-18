"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Globe, Zap, Shield, Activity, Plus, Play, ChevronRight, MessageSquare } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "ORBIT_X_STUDIO", tag: "Exhibition", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", desc: "A cinematic interactive landscape for the Venice Biennale 2026." },
  { id: 2, name: "GHOST_SHELL_ID", price: 1200, tag: "Branding", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop", desc: "Redefining the digital identity for a next-gen hardware collective." },
  { id: 3, name: "NEURAL_V_CORE", tag: "Interface", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop", desc: "A sub-millisecond latent interface for surgical-grade operations." },
  { id: 4, name: "SILK_MESH_UX", tag: "Design", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop", desc: "Fluid, organic interactions inspired by the movement of raw silk." },
];

export default function CreativeCollectiveSPA() {
  const [view, setView] = useState<"work" | "collective" | "brief">("work");
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-white min-h-screen selection:bg-rose-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] bg-gradient-to-br from-rose-900/20 via-transparent to-indigo-900/20 blur-[150px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-black/20 backdrop-blur-3xl border-b border-white/5">
        <button onClick={() => setView("work")} className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform">
           AEVIA_COLLECTIVE&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
           <button onClick={() => setView("work")} className={`hover:opacity-100 transition-opacity ${view === 'work' ? 'text-white opacity-100 underline decoration-rose-500 underline-offset-8' : ''}`}>THE_WORK</button>
           <button onClick={() => setView("collective")} className={`hover:opacity-100 transition-opacity ${view === 'collective' ? 'text-white opacity-100 underline decoration-rose-500 underline-offset-8' : ''}`}>THE_COLLECTIVE</button>
        </div>
        <div className="flex items-center gap-8">
           <button onClick={() => setView("brief")} className="hidden md:block px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-rose-500 hover:text-white transition-all italic">
              Initiate_Brief
           </button>
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE WORK VIEW (CAROUSEL) */}
        {view === "work" && (
          <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 px-8">
             <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-10">
                <h1 className="text-7xl md:text-[12vw] font-black italic uppercase tracking-tighter leading-[0.75]">
                   Defining <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>New Cinema.</span>
                </h1>
                <div className="text-right text-[10px] font-black uppercase tracking-widest opacity-20">Art_Direction // Digital_Ethics</div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {PROJECTS.map((p, i) => (
                  <motion.div 
                    key={p.id} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group flex flex-col cursor-pointer"
                    onClick={() => { setActiveItem(i); setView("collective"); }}
                  >
                     <div className="relative aspect-[4/5] bg-white/5 overflow-hidden mb-12 rounded-[3.5rem] border border-white/5">
                        <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-60 group-hover:opacity-100" />
                        <div className="absolute top-12 left-12 flex gap-4">
                           <div className="p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
                              <Play className="w-4 h-4 fill-white" />
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                     </div>
                     <div className="flex justify-between items-start pr-8">
                        <div>
                           <span className="text-[10px] uppercase font-black tracking-[0.4em] text-rose-500 mb-2 block">{p.tag}</span>
                           <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-6 group-hover:text-rose-500 transition-colors">{p.name}</h3>
                        </div>
                        <div className="text-2xl font-black italic tracking-tighter opacity-20 group-hover:opacity-100 transition-all font-mono">/0{p.id}</div>
                     </div>
                     <p className="text-lg font-light italic opacity-40 max-w-sm uppercase tracking-tight">{p.desc}</p>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.5em] opacity-20 group-hover:opacity-100 transition-all group-hover:gap-8 border-t border-white/5 pt-8 mt-12 w-full">
                        VIEW_PROCESS <ArrowRight className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* THE COLLECTIVE VIEW (INFO) */}
        {view === "collective" && (
          <motion.div key="collective" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative aspect-square glass rounded-[4rem] p-12 overflow-hidden border border-white/10 group">
                   <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" alt="Collective" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                   <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center opacity-40">
                      <span className="text-[10px] font-black tracking-widest uppercase italic">The Studio_NYC</span>
                      <Activity className="w-5 h-5 animate-pulse" />
                   </div>
                </div>
                <div className="space-y-12">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-rose-500 opacity-40 block">Founding_Principles</span>
                   <h2 className="text-7xl md:text-8xl font-black italic tracking-tighter leading-none text-white uppercase">Liquid <br/> Collective.</h2>
                   <p className="text-2xl md:text-3xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight">
                      We are a distributed network of artists, engineers, and philosophers obsessed with the structural truth of digital space. We don't solve problems; we define experiences.
                   </p>
                   <div className="space-y-12 pt-12">
                      {[
                        { icon: <Zap className="w-6 h-6" />, t: "Accelerated Delivery", d: "Zero-latency workflows built on a proprietary decentralised node network." },
                        { icon: <Globe className="w-6 h-6" />, t: "Global Vision", d: "A synthesis of cultural perspectives, from Tokyo's tech to Milan's minimalism." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-xl">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black mt-2 leading-relaxed">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="mt-48 pt-24 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center opacity-20 uppercase font-black tracking-widest text-[9px]">
                <div>Award_Winning_06</div>
                <div>Carbon_Neutral</div>
                <div>Decentralized_Core</div>
                <div>Global_Sync_Active</div>
             </div>
          </motion.div>
        )}

        {/* THE BRIEF VIEW (CONTACT) */}
        {view === "brief" && (
          <motion.div key="brief" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-4xl mx-auto min-h-screen">
             <div className="glass p-12 md:p-24 rounded-[4rem] border border-white/5 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                   <MessageSquare className="w-64 h-64" />
                </div>
                <span className="text-[10px] uppercase tracking-[1em] text-rose-500 opacity-40 mb-8 block">Project_Verification</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-12 text-white leading-none uppercase">Initiate <br/> The Bridge.</h2>
                <div className="space-y-12 text-left relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="border-b border-white/10 pb-6">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4 italic">Collaborator_ID</label>
                         <input type="text" placeholder="Alias_OR_Organization" className="bg-transparent border-none text-2xl italic tracking-tighter w-full outline-none focus:text-rose-500 transition-colors" />
                      </div>
                      <div className="border-b border-white/10 pb-6">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4 italic">Core_Objective</label>
                         <select className="bg-transparent border-none text-xl italic tracking-tighter w-full outline-none focus:text-rose-500 transition-colors appearance-none">
                            <option>Branding_Synthesis</option>
                            <option>Interface_Redesign</option>
                            <option>Digital_Exhibition</option>
                         </select>
                      </div>
                   </div>
                   <button className="w-full py-10 bg-white text-black font-black uppercase text-xs tracking-[1.5em] hover:bg-rose-500 hover:text-white transition-all shadow-2xl rounded-full">
                      Transmit_Signal
                   </button>
                </div>
                <div className="mt-24 pt-12 border-t border-white/5 flex justify-center gap-12 opacity-20 text-[9px] font-black tracking-widest uppercase italic">
                   <span>Secure_Protocol_Active</span>
                   <span>Lat: 35.6ms</span>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic">
         <div className="flex gap-12">
            <span>Aevia_Node:NYC</span>
            <span>Flux: Stable</span>
         </div>
         <div className="flex gap-4 items-end">
            <div className="text-right leading-tight italic">
               Creative_Collective <br /> v4.0.21
            </div>
            <div className="flex gap-[2px] h-3">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-white opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
