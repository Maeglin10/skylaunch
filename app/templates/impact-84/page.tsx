"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const DISHES = [
  { id: 1, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" },
  { id: 2, img: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=600" },
  { id: 3, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600" },
  { id: 4, img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=600" },
];

export default function FoodFloatingDishStream() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const pts = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      dish: DISHES[i % DISHES.length],
      x: Math.random() * 80 + 10,
      y: i * 30 + (Math.random() * 10),
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20
    }));
    setItems(pts);
  }, []);

  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-rose-500 overflow-hidden relative font-mono">
      
      {/* Background HUD Labels */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase font-serif">Flux.Kitchen</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Stream_ID: 0x84</div>
      </nav>

      {/* Vertical Drifting Stream */}
      <main className="relative h-screen w-full">
         <div className="absolute inset-0 z-0">
            {items.map((item) => (
               <motion.div 
                  key={item.id}
                  initial={{ y: "120vh" }}
                  animate={{ y: "-120vh" }}
                  transition={{ 
                     duration: item.duration, 
                     repeat: Infinity, 
                     delay: item.delay,
                     ease: "linear"
                  }}
                  className="absolute w-48 h-48 md:w-64 md:h-64 rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl elevation-24"
                  style={{ left: `${item.x}%` }}
               >
                  <Image src={item.dish.img} alt="Dish" fill className="object-cover grayscale hover:grayscale-0 transition-grayscale duration-700" />
               </motion.div>
            ))}
         </div>

         {/* Fixed Content Overlay */}
         <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-12 text-center pointer-events-none">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5 }}
               className="bg-white/80 backdrop-blur-3xl p-24 border border-black/5 rounded-[5rem] shadow-[0_0_100px_rgba(0,0,0,0.05)] pointer-events-auto"
            >
               <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-20">Continuous Culinary Drift</span>
               <h1 className="text-7xl md:text-[10vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                  Taste <br /> <span className="text-rose-600">Motion.</span>
               </h1>
               <button className="px-12 py-6 bg-black text-white font-black uppercase text-xs tracking-[1em] italic hover:bg-rose-600 transition-all rounded-full">Book Experience</button>
            </motion.div>
         </div>

      </main>

      <div className="fixed left-12 bottom-12 opacity-[0.05] pointer-events-none text-[8vw] font-black italic uppercase leading-none select-none">
         GRAVITY_DISABLED_V.084
      </div>

    </div>
  );
}
