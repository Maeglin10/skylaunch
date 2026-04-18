"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Play, X, Menu, Search, Film, Activity, Globe, Zap, Shield, Command, MoveRight, Layers, Maximize2, Pause, Volume2, Share2 } from "lucide-react";
import "../premium.css";

const SCENES = [
  { id: 1, title: "SIREN_CALL", cat: "Feature_Film", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop", desc: "A psychological thriller exploring the depths of the human mind under extreme isolation." },
  { id: 2, title: "VOID_WALKER", cat: "Cinematography", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", desc: "An orbital journey through the silent debris of a forgotten civilization." },
  { id: 3, title: "NEBULA_IX", cat: "Visual_Effects", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop", desc: "Pushing the boundaries of simulated environments and sub-molecular rendering." },
];

export default function CinematicMotionSPA() {
  const [view, setView] = useState<"scene" | "reel" | "production">("scene");
  const [activeItem, setActiveItem] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="premium-theme bg-[#050505] text-[#f8fafc] min-h-screen selection:bg-rose-600 selection:text-white font-mono overflow-x-hidden">
      
      {/* Cinematic Frame Bars */}
      <div className="fixed inset-x-0 top-0 h-8 bg-black z-[100] opacity-80" />
      <div className="fixed inset-x-0 bottom-0 h-8 bg-black z-[100] opacity-80" />

      {/* Global Header */}
      <nav className="fixed top-8 left-0 w-full z-50 p-8 md:px-12 md:py-10 flex justify-between items-center bg-transparent mix-blend-difference">
        <button onClick={() => setView("scene")} className="text-xl font-black italic tracking-tighter hover:text-rose-500 transition-colors flex items-center gap-4">
           FILM_UNIT&trade;
        </button>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
           <button onClick={() => setView("scene")} className={`hover:opacity-100 transition-opacity ${view === 'scene' ? 'text-white opacity-100 underline decoration-rose-600 underline-offset-8 italic' : ''}`}>THE_SCENE</button>
           <button onClick={() => setView("production")} className={`hover:opacity-100 transition-opacity ${view === 'production' ? 'text-white opacity-100 underline decoration-rose-600 underline-offset-8 italic' : ''}`}>THE_PRODUCTION</button>
        </div>
        <div className="flex items-center gap-8">
           <Search className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
           <Menu className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE SCENE VIEW (CAROUSEL) */}
        {view === "scene" && (
          <motion.div key="scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-screen flex flex-col items-center justify-center pt-24">
             <div className="absolute inset-0 z-0">
                <motion.div 
                   key={activeItem}
                   initial={{ scale: 1.1, filter: 'blur(20px)', opacity: 0 }}
                   animate={{ scale: 1, filter: 'blur(0px)', opacity: 0.6 }}
                   transition={{ duration: 2 }}
                   className="w-full h-full relative"
                >
                   <Image src={SCENES[activeItem].img} alt="Background" fill className="object-cover grayscale brightness-50" priority />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
                </motion.div>
                {/* Film Grain */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             </div>

             <div className="relative z-10 max-w-6xl w-full px-12 text-center md:text-left">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                   <span className="text-xs uppercase tracking-[1em] font-black text-rose-500 mb-8 block italic">Project_Archive // Scene_00{activeItem + 1}</span>
                   <h1 className="text-7xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-[0.85] text-white">
                      {SCENES[activeItem].title.split('_')[0]} <br /> <span className="text-rose-600">{SCENES[activeItem].title.split('_')[1]}</span>
                   </h1>
                   <p className="text-2xl font-light italic leading-relaxed uppercase tracking-tight opacity-40 max-w-2xl mt-12 mb-16 leading-relaxed">
                      {SCENES[activeItem].desc} An architectural study involving multi-axis tension and structural transparency.
                   </p>
                   
                   <div className="flex flex-col md:flex-row gap-8 items-center">
                      <button onClick={() => setView("reel")} className="px-16 py-8 bg-white text-black font-black uppercase text-xs tracking-[1em] hover:bg-rose-600 hover:text-white transition-all shadow-2xl flex items-center gap-6">
                         <Play className="w-4 h-4" /> Watch_Trailer
                      </button>
                      <div className="flex gap-12 font-black text-[10px] uppercase tracking-widest opacity-20 italic">
                         <span>ARRI_ALEXA_65</span>
                         <span>|</span>
                         <span>ANAMORPHIC_RED</span>
                      </div>
                   </div>
                </motion.div>
             </div>

             {/* Bottom Navigation */}
             <div className="absolute bottom-24 left-12 right-12 z-20 flex justify-between items-end mix-blend-difference">
                <div className="flex flex-col gap-4">
                   <div className="text-[60px] font-black italic leading-none text-rose-600">0{activeItem + 1}</div>
                   <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">of 03</div>
                </div>
                <div className="flex gap-12 font-black uppercase text-[10px] tracking-[0.5em] opacity-20 italic">
                   <button onClick={() => setActiveItem((activeItem - 1 + SCENES.length) % SCENES.length)} className="hover:text-rose-500 transition-colors uppercaseTracking-[1em] uppercase">PREV_SCENE</button>
                   <button onClick={() => setActiveItem((activeItem + 1) % SCENES.length)} className="hover:text-rose-500 transition-colors uppercaseTracking-[1em] uppercase">NEXT_SCENE</button>
                </div>
             </div>

             {/* HUD Element Right */}
             <div className="fixed top-1/2 -translate-y-1/2 right-12 hidden lg:flex flex-col gap-12 opacity-20 font-black text-[10px] uppercase tracking-[1em] vertical-text italic">
                CAM_POS: 0x442_F // FOCAL: 35mm
             </div>
          </motion.div>
        )}

        {/* THE REEL VIEW (VIDEO GALLERY) */}
        {view === "reel" && (
          <motion.div key="reel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen bg-black">
             <button onClick={() => setView("scene")} className="fixed top-12 left-12 z-[60] bg-rose-600 text-white p-5 rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
             </button>

             <div className="relative w-full h-screen">
                <Image src={SCENES[activeItem].img} alt="Reel" fill className="object-cover opacity-40 brightness-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
                
                <div className="absolute inset-x-0 bottom-32 px-12 flex flex-col md:flex-row justify-between items-end gap-12">
                   <div className="max-w-3xl">
                      <span className="text-xs uppercase tracking-[1em] font-black text-rose-500 mb-6 block italic animate-pulse">Now_Streaming // HD_SYNC</span>
                      <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none text-white">{SCENES[activeItem].title}</h2>
                   </div>
                   <div className="flex gap-8 items-center bg-white/5 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10">
                      <button onClick={() => setPlaying(!playing)} className="w-20 h-20 rounded-full bg-rose-600 flex items-center justify-center hover:scale-110 transition-transform">
                         {playing ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                      </button>
                      <div className="space-y-2">
                         <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div animate={{ width: playing ? '100%' : '20%' }} transition={{ duration: 10, ease: "linear" }} className="h-full bg-rose-600" />
                         </div>
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                            <span>00:14:12</span>
                            <span>05:32:00</span>
                         </div>
                      </div>
                      <Volume2 className="w-6 h-6 opacity-40 hover:opacity-100 cursor-pointer" />
                      <Share2 className="w-6 h-6 opacity-40 hover:opacity-100 cursor-pointer" />
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* THE PRODUCTION VIEW (INFO) */}
        {view === "production" && (
          <motion.div key="production" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-white">
                <div className="space-y-16">
                   <span className="text-[10px] uppercase font-black tracking-[1.5em] text-rose-500 opacity-60 block underline decoration-rose-600/20 underline-offset-8 italic">The_Production_Protocol</span>
                   <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter leading-none text-white uppercase">The <br/> Truth.</h2>
                   <p className="text-3xl md:text-4xl font-light italic opacity-60 leading-relaxed uppercase tracking-tight text-white/60">
                      We treat cinema as an act of subtraction. We don't add; we reveal the emotional truth of the moment. 100% precision. Zero noise.
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-rose-600/20">
                      {[
                        { icon: <Film className="w-6 h-6" />, t: "E2E Rendering", v: "Sub-Atomic Accuracy" },
                        { icon: <Layers className="w-6 h-6" />, t: "Scalability", v: "Deep_Material_ID" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-16 h-16 rounded-full border border-rose-600/20 flex items-center justify-center text-rose-500 group-hover:bg-rose-600 group-hover:text-black transition-all shadow-[0_0_30px_rgba(225,29,72,0.1)]">
                              {item.icon}
                           </div>
                           <div className="text-left">
                              <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">{item.t}</h4>
                              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-black leading-relaxed text-rose-500">{item.v}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative aspect-square bg-[#ddd] rounded-[4rem] p-12 overflow-hidden border border-rose-600/10 group shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop" alt="The Studio" fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute inset-x-0 bottom-12 flex justify-center">
                      <div className="px-12 py-6 border border-rose-600 text-rose-500 text-[10px] font-black uppercase tracking-widest italic animate-pulse cursor-pointer hover:bg-rose-600 hover:text-white transition-all">
                         Establish_Sync
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global Status HUD */}
      <footer className="fixed bottom-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-end mix-blend-difference pointer-events-none opacity-20 text-[8px] uppercase font-black tracking-[0.5em] italic text-rose-500">
         <div className="flex gap-12 text-rose-500">
            <span>Uptime: 99.9%</span>
            <span>Ref_0x442_F</span>
         </div>
         <div className="flex gap-4 items-end text-rose-500">
            <div className="text-right leading-tight italic">
               Sequence_Control <br /> v4.0.21
            </div>
            <div className="flex gap-[4px] h-4">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-rose-500 opacity-${i*20}`}></div>)}
            </div>
         </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
