"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2, MoveRight, Send, X, Phone } from "lucide-react";
import "../premium.css";

const PROJECTS = [
  { id: 1, name: "MODULAR_UNIT_8", category: "Industrial", image: "https://images.unsplash.com/photo-1518005020251-095c1f0073e7?q=80&w=1000&auto=format&fit=crop", year: "2026" },
  { id: 2, name: "CONCRETE_VOID", category: "Residential", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", year: "2025" },
  { id: 3, name: "STARK_TOWER", category: "Corporate", image: "https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=1000&auto=format&fit=crop", year: "2026" },
];

export default function RawArchSPA() {
  const [view, setView] = useState<"home" | "projects" | "contact">("home");
  const accentColor = "#adff2f"; // Toxic Green

  return (
    <div className="premium-theme bg-[#f0f0f0] text-black min-h-screen selection:bg-black selection:text-white font-mono p-4 md:p-8">
      
      {/* Branding - Persistent */}
      <nav className="fixed top-8 left-8 md:left-16 z-[60] flex flex-col gap-1 items-start">
         <button onClick={() => setView("home")} className="text-3xl md:text-4xl font-black bg-black text-white px-4 py-1 leading-none shadow-[8px_8px_0px_0px_#adff2f]">
            RAW_ARCH
         </button>
         <div className="text-[10px] font-black uppercase tracking-widest bg-black text-[#adff2f] px-2 py-0.5 mt-2">Structure_Protocol_v4.2</div>
      </nav>

      {/* Main Menu - Persistent */}
      <div className="fixed top-8 right-8 md:right-16 z-50 flex gap-4 md:gap-8 font-black text-xs uppercase">
         <button onClick={() => setView("home")} className={`px-4 py-2 border-[3px] border-black transition-all ${view === 'home' ? 'bg-black text-white' : 'hover:bg-black hover:text-white bg-white'}`}>Index</button>
         <button onClick={() => setView("projects")} className={`px-4 py-2 border-[3px] border-black transition-all ${view === 'projects' ? 'bg-black text-white' : 'hover:bg-black hover:text-white bg-white'}`}>Projects</button>
         <button onClick={() => setView("contact")} className={`px-4 py-2 border-[3px] border-black transition-all ${view === 'contact' ? 'bg-black text-white' : 'hover:bg-black hover:text-white bg-white'}`}>Connect</button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE VIEW */}
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="pt-48 md:pt-64">
             <div className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 lg:col-span-7">
                   <h1 className="text-[15vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase mb-12">
                      Truth <br /> <span className="text-[#adff2f] bg-black px-4 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">Formed.</span>
                   </h1>
                   <p className="max-w-xl text-xl font-black uppercase leading-tight mb-16 border-l-[12px] border-black pl-8 italic">
                      Zero compromise. Honesty of materials. <br />
                      Distilling architecture into its most brutal, functional state.
                   </p>
                   <button onClick={() => setView("projects")} className="group flex items-center gap-6 px-12 py-6 border-[6px] border-black bg-white hover:bg-[#adff2f] transition-all font-black uppercase text-xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                      Explore Structures <MoveRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
                   </button>
                </div>
                <div className="col-span-12 lg:col-span-5 relative">
                   <div className="relative aspect-[4/5] border-[10px] border-black shadow-[30px_30px_0px_0px_#adff2f] overflow-hidden group">
                      <Image src="https://images.unsplash.com/photo-1543163152-ed48bb73c393?q=80&w=1500&auto=format&fit=crop" alt="Abstract Concrete" fill className="object-cover grayscale contrast-150 group-hover:grayscale-0 transition-all duration-[2s]" />
                      <div className="absolute top-4 right-4 bg-black text-[#adff2f] p-4 text-2xl font-black italic">V_01</div>
                   </div>
                </div>
             </div>

             <section className="mt-64 border-t-[8px] border-black pt-24 grid grid-cols-1 md:grid-cols-3 gap-0">
                {[
                  { t: "Material_Truth", d: "We reject the decorative. We embrace the raw texture of load-bearing structures." },
                  { t: "Spacial_Audit", d: "Every cubic meter must earn its existence through pure utility and volume." },
                  { t: "Cold_Efficiency", d: "Light is a structural component, not an ornament. We carve space with shadow." }
                ].map((item, i) => (
                  <div key={i} className="p-12 border-[4px] border-black mb-8 md:mb-0 md:mr-[-4px] hover:bg-black hover:text-[#adff2f] transition-colors">
                     <div className="text-3xl font-black mb-6 uppercase leading-none">{item.t}</div>
                     <p className="text-sm font-bold opacity-60 leading-relaxed uppercase">{item.d}</p>
                  </div>
                ))}
             </section>
          </motion.div>
        )}

        {/* PROJECTS VIEW */}
        {view === "projects" && (
          <motion.div key="projects" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="pt-48 md:pt-64">
             <div className="flex justify-between items-end mb-24 border-b-[8px] border-black pb-8">
                <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">PROJECT_INDEX</h2>
                <div className="text-2xl font-black italic mb-2">/ SELECTED</div>
             </div>

             <div className="flex flex-col gap-12">
                {PROJECTS.map((p, i) => (
                   <div key={p.id} className="group grid grid-cols-12 gap-8 items-center border-[4px] border-black p-8 hover:bg-black hover:text-white transition-all cursor-pointer relative overflow-hidden">
                      <div className="col-span-12 md:col-span-2 text-4xl md:text-6xl font-black opacity-20 group-hover:opacity-100 transition-opacity">0{p.id}</div>
                      <div className="col-span-12 md:col-span-6">
                         <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-2 group-hover:translate-x-4 transition-transform">{p.name}</h3>
                         <span className="text-xs uppercase tracking-[0.4em] font-bold text-zinc-500 group-hover:text-[#adff2f]">{p.category} // {p.year}</span>
                      </div>
                      <div className="col-span-12 md:col-span-4 relative aspect-video overflow-hidden border-[4px] border-black group-hover:border-[#adff2f] transition-colors">
                         <Image src={p.image} alt={p.name} fill className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                      </div>
                   </div>
                ))}
             </div>
          </motion.div>
        )}

        {/* CONTACT VIEW */}
        {view === "contact" && (
          <motion.div key="contact" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="pt-48 md:pt-64 min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                <div>
                   <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] mb-12">SEND_UP_ <br /> <span className="text-[#adff2f] bg-black px-2">_SIGNAL.</span></h2>
                   <div className="space-y-12 font-black">
                      <div>
                         <div className="text-xs opacity-40 mb-2 font-bold">Inquiries</div>
                         <div className="text-2xl hover:text-[#adff2f] hover:bg-black px-2 inline-block transition-colors cursor-pointer underline">HELLO@RAW_ARCH.IO</div>
                      </div>
                      <div>
                         <div className="text-xs opacity-40 mb-2 font-bold">Structure_Base</div>
                         <div className="text-2xl underline">LONDON_E1 6QL_UK</div>
                      </div>
                      <div className="flex gap-8">
                         <div className="w-12 h-12 border-[4px] border-black flex items-center justify-center hover:bg-[#adff2f] cursor-pointer"><Phone className="w-5 h-5" /></div>
                         <div className="w-12 h-12 border-[4px] border-black flex items-center justify-center hover:bg-[#adff2f] cursor-pointer"><Send className="w-5 h-5" /></div>
                      </div>
                   </div>
                </div>
                <div className="bg-black p-12 shadow-[20px_20px_0px_0px_#adff2f]">
                   <form className="space-y-8">
                      <div className="space-y-2">
                         <label className="text-xs text-[#adff2f] uppercase tracking-widest font-black">Subject_Identity</label>
                         <input type="text" className="w-full bg-transparent border-b-[4px] border-[#adff2f] py-4 text-white font-black text-2xl focus:outline-none" placeholder="FULL_NAME" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs text-[#adff2f] uppercase tracking-widest font-black">Brief_Payload</label>
                         <textarea className="w-full bg-transparent border-b-[4px] border-[#adff2f] py-4 text-white font-black text-2xl focus:outline-none h-32" placeholder="SITUATION_DESC" />
                      </div>
                      <button className="w-full py-6 bg-[#adff2f] text-black font-black uppercase text-xl hover:bg-white transition-colors">Launch_Message</button>
                   </form>
                </div>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Persistent Ticker Overlay */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden h-12 bg-black flex items-center z-50">
         <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="whitespace-nowrap flex text-white font-black uppercase italic italic text-xl">
            <span className="px-12">NO_COMPROMISE. MATERIAL_TRUTH. STRUCTURE_PROTOCOL. </span>
            <span className="px-12">NO_COMPROMISE. MATERIAL_TRUTH. STRUCTURE_PROTOCOL. </span>
            <span className="px-12">NO_COMPROMISE. MATERIAL_TRUTH. STRUCTURE_PROTOCOL. </span>
         </motion.div>
      </div>
    </div>
  );
}
