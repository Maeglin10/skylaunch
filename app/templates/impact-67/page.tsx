"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ROOMS = [
  { id: 1, name: "Main Gallery", img: "/templates/agency_hero.png", area: "120m²" },
  { id: 2, title: "Archive Wing", img: "/templates/tech_noir.png", area: "85m²" },
  { id: 3, title: "Lumina Lounge", img: "/templates/portal_frame.png", area: "45m²" },
];

export default function RealEstate360Floorplan() {
  const [index, setIndex] = useState(0);

  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Plan.067</Link>
        <div className="flex gap-12 text-[10px] uppercase font-black italic opacity-40 items-baseline">
            <span>Lat: 45.322</span>
            <span>Lon: 0.127</span>
        </div>
      </nav>

      <main className="h-full w-full flex items-center justify-center p-12">
         
         <div className="grid grid-cols-12 gap-12 w-full max-w-7xl items-center">
            
            {/* Left: Viewport */}
            <div className="col-span-12 lg:col-span-8 relative aspect-video bg-neutral-900 rounded-[3rem] overflow-hidden shadow-2xl elevation-24 group">
               <motion.div 
                  key={index}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="w-full h-full relative"
               >
                  <Image src={ROOMS[index].img} alt="Room" fill className="object-cover contrast-125 saturate-0" />
                  <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay" />
               </motion.div>

               {/* Viewport HUD */}
               <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                     <span className="text-[8px] font-black uppercase tracking-[1em] opacity-40">Visual_Sequence_0x0{index+1}</span>
                     <span className="text-[8px] font-black uppercase tracking-[1em] opacity-40 italic">360_Scan_Enabled</span>
                  </div>
                  <div className="h-0.5 w-full bg-white/10 relative">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((index + 1) / ROOMS.length) * 100}%` }}
                        className="absolute inset-y-0 left-0 bg-rose-600"
                     />
                  </div>
               </div>
            </div>

            {/* Right: Controls & Data */}
            <div className="col-span-12 lg:col-span-4 space-y-12">
               <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.8em] font-black italic text-rose-600 mb-8 block">Property_Anatomy</span>
                  <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">{ROOMS[index].name || ROOMS[index].title}</h2>
                  <div className="flex gap-12 text-[10px] items-baseline font-black opacity-40">
                     <span>Area: {ROOMS[index].area}</span>
                     <span>Ref: 0xFF_M{index}</span>
                  </div>
               </div>

               <div className="flex flex-col gap-4">
                  {ROOMS.map((room, i) => (
                     <button 
                        key={room.id}
                        onClick={() => setIndex(i)}
                        className={`text-left p-6 border transition-all ${index === i ? 'border-rose-600 bg-rose-600/5' : 'border-white/5 opacity-40 hover:opacity-100'} rounded-2xl flex justify-between items-center group`}
                     >
                        <span className="text-xs font-black uppercase tracking-widest italic">{room.name || room.title}</span>
                        <div className={`w-8 h-[1px] ${index === i ? 'bg-rose-600' : 'bg-white/20'} group-hover:w-16 transition-all`} />
                     </button>
                  ))}
               </div>

               <button className="w-full px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 hover:text-white transition-all">Schedule Tour</button>
            </div>

         </div>

      </main>

    </div>
  );
}
