"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, ArrowRight, X, Phone, Globe, Shield, Calendar, MapPin, ChevronDown } from "lucide-react";
import "../premium.css";

export default function LuxuryHospitalitySPA() {
  const [view, setView] = useState<"stay" | "sanctuary" | "reserve">("stay");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const beamOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.4]);
  const beamRotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#050805] text-rose-50 min-h-screen selection:bg-rose-900 selection:text-white font-sans font-light overflow-x-hidden">
      
      {/* Cinematic Background Layer - Persistent */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
            <Image
               src="https://images.unsplash.com/photo-1544124499-58913cb3bb3a?q=80&w=2000&auto=format&fit=crop"
               alt="Luxury Sanctuary"
               fill
               className="object-cover brightness-50 contrast-125 saturate-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050805] via-transparent to-[#050805]/80 mix-blend-multiply" />
         </motion.div>
      </div>

      {/* Atmospheric Special FX: Silent Beams */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
         {[...Array(3)].map((_, i) => (
           <motion.div 
             key={i}
             style={{ 
               opacity: beamOpacity,
               rotate: beamRotate,
               x: `${(i - 1) * 35}%`
             }}
             className="absolute top-[-30%] left-1/2 w-[40vw] h-[160%] bg-gradient-to-b from-white/10 to-transparent blur-[120px] origin-top"
           />
         ))}
      </div>

      {/* Nav HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference">
        <button onClick={() => setView("stay")} className="text-2xl font-serif italic tracking-tighter uppercase text-white">Silent.Beams&trade;</button>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.6em] font-black opacity-40">
           <button onClick={() => setView("stay")} className={`hover:opacity-100 transition-opacity ${view === 'stay' ? 'text-white opacity-100' : ''}`}>THE_STAY</button>
           <button onClick={() => setView("sanctuary")} className={`hover:opacity-100 transition-opacity ${view === 'sanctuary' ? 'text-white opacity-100' : ''}`}>SANCTUARY</button>
           <button onClick={() => setView("reserve")} className={`hover:opacity-100 transition-opacity ${view === 'reserve' ? 'text-white opacity-100' : ''}`}>RESERVE</button>
        </div>
        <div className="flex gap-8 items-center">
           <div className="hidden lg:flex items-center gap-2 opacity-30 text-[9px] uppercase font-black tracking-widest">
              <MapPin className="w-3 h-3" /> Maldives / Private
           </div>
           <Menu className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer text-white" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        
        {/* THE STAY VIEW */}
        {view === "stay" && (
          <motion.div key="stay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
             <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32">
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
                   <span className="text-[10px] uppercase tracking-[1em] opacity-30 mb-12 block font-black">Escape the Surface</span>
                   <h1 className="text-7xl md:text-[14vw] font-serif italic leading-[0.75] tracking-tighter mb-12 drop-shadow-2xl">
                     Return <br /> <span className="not-italic font-black text-white/90">to Silence.</span>
                   </h1>
                   <div className="flex justify-center mt-12 mb-24">
                      <div className="h-32 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
                   </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col items-center">
                   <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40 mb-3 underline decoration-white/20 underline-offset-8">Explore Architecture</p>
                   <ChevronDown className="w-5 h-5 opacity-20 animate-bounce" />
                </motion.div>
             </main>

             <section className="min-h-screen py-48 px-8 md:px-24 bg-[#050805]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                   <div className="lg:col-span-12 mb-24">
                      <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-none mb-12">The Poetry of <br/> Unplugging.</h2>
                   </div>
                   <div className="lg:col-span-5 space-y-12">
                      <p className="text-2xl font-light italic leading-relaxed opacity-60">
                         We have removed the noise. We have removed the crowd. What remains is a curated dialogue between your soul and the island's rhythm.
                      </p>
                      <div className="space-y-8 pt-12">
                         {[
                           { t: "Ocean Villas", d: "Suspended over the abyss, designed for total visual immersion." },
                           { t: "Night Cycles", d: "Zero artificial light pollution. The stars are your only ceiling." },
                         ].map((item, i) => (
                           <div key={i} className="flex gap-8 group cursor-pointer border-t border-white/5 pt-8">
                              <span className="text-[10px] font-black opacity-20">0{i+1}</span>
                              <div>
                                 <h4 className="text-lg font-black uppercase italic tracking-tighter">{item.t}</h4>
                                 <p className="text-xs opacity-30 uppercase tracking-[0.3em] font-bold mt-2">{item.d}</p>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                   <div className="lg:col-span-7 relative aspect-video rounded-[4rem] overflow-hidden border border-white/10 p-4">
                      <Image src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1500&auto=format&fit=crop" alt="Resort" fill className="object-cover rounded-[3.5rem] opacity-80 transition-transform duration-[4s] hover:scale-105" />
                   </div>
                </div>
             </section>
          </motion.div>
        )}

        {/* SANCTUARY VIEW */}
        {view === "sanctuary" && (
          <motion.div key="sanctuary" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-12 max-w-7xl mx-auto min-h-screen">
             <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/5 pb-12">
                <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-none text-white">Sanctuary.</h1>
                <div className="text-[10px] uppercase font-black tracking-[0.5em] opacity-30 text-right">Wellness / Protocols</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { t: "Crystalline Spa", d: "Treatments using mineral-infused thermal waters and ancient volcanic salt.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop" },
                  { t: "Neural Audio", d: "Sound baths designed to synchronize brainwaves with the ocean's frequency.", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop" },
                  { t: "Botanical Lab", d: "Personalized nutrition extracted from the island's own curated medicinal garden.", img: "https://images.unsplash.com/photo-1532187806296-39629af8f175?q=80&w=800&auto=format&fit=crop" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group">
                     <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/10 mb-8 p-3">
                        <Image src={item.img} alt={item.t} fill className="object-cover rounded-[2.5rem] opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                     </div>
                     <h3 className="text-2xl font-serif italic tracking-tighter mb-4 text-white">{item.t}</h3>
                     <p className="text-xs opacity-40 uppercase tracking-widest leading-relaxed mb-8">{item.d}</p>
                     <button className="flex items-center gap-4 text-[9px] font-black tracking-[0.5em] group-hover:gap-8 transition-all">
                        EXPLORE_SANCTUARY <ArrowRight className="w-4 h-4" />
                     </button>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {/* RESERVE VIEW */}
        {view === "reserve" && (
          <motion.div key="reserve" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 pt-48 pb-32 px-8 max-w-4xl mx-auto min-h-screen">
             <div className="glass p-12 md:p-24 rounded-[4rem] border border-white/10 text-center">
                <span className="text-[10px] uppercase tracking-[1em] opacity-30 mb-8 block font-black">Limited Engagement</span>
                <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter mb-12 text-white leading-none">Initiate Your <br/> Departure.</h2>
                <div className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="text-left border-b border-white/10 pb-6">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4">Departure_Date</label>
                         <div className="flex justify-between items-center cursor-pointer">
                            <span className="text-2xl italic tracking-tighter">OCT_12_2026</span>
                            <Calendar className="w-5 h-5 opacity-40" />
                         </div>
                      </div>
                      <div className="text-left border-b border-white/10 pb-6">
                         <label className="text-[10px] uppercase font-black tracking-widest opacity-20 block mb-4">Guest_Count</label>
                         <div className="flex justify-between items-center cursor-pointer">
                            <span className="text-2xl italic tracking-tighter">02_ADULTS</span>
                            <ChevronDown className="w-5 h-5 opacity-40" />
                         </div>
                      </div>
                   </div>
                   <button className="w-full py-8 bg-rose-50 text-black font-black uppercase text-xs tracking-[1em] hover:bg-white transition-all shadow-xl rounded-full">
                      Request_Allocation
                   </button>
                </div>
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-30 text-[9px] font-black tracking-widest uppercase">
                   <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4" /> Secure Protocol
                   </div>
                   <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4" /> Global Support
                   </div>
                   <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4" /> Private Line
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="relative z-20 py-24 px-8 border-t border-white/5 bg-[#050805]/80 backdrop-blur-md">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 font-black uppercase text-[9px] tracking-[0.5em] opacity-30">
            <div className="text-center md:text-left">
               <div className="text-3xl font-serif italic mb-4 tracking-tighter text-white opacity-100 uppercase">Silent.Beams</div>
               <p>&copy; 2026 Archive Hospitality Group. All Rights Reserved.</p>
            </div>
            <div className="flex gap-12">
               <span className="hover:text-white cursor-pointer transition-colors">Press</span>
               <span className="hover:text-white cursor-pointer transition-colors">Protocol</span>
               <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            </div>
            <div className="flex gap-4 items-end">
               <div className="text-right leading-tight">Aevia_Resort <br /> Maldives_Node</div>
               <div className="flex gap-[2px] h-3">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-[2px] h-full bg-white opacity-${i*20}`}></div>)}
               </div>
            </div>
         </div>
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(60px);
          -webkit-backdrop-filter: blur(60px);
        }
      `}</style>
    </div>
  );
}
