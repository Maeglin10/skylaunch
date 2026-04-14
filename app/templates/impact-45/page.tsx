"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "Aevia_X1", price: "2,499", img: "/templates/tech_noir.png" },
  { id: 2, name: "Gold_H", price: "48,200", img: "/templates/editorial_lux.png" },
  { id: 3, name: "Portal_V3", price: "12,400", img: "/templates/agency_hero.png" },
  { id: 4, name: "Stark_A", price: "1,250", img: "/templates/brutalist_staircase.png" },
];

export default function ProductCarousel3D() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="premium-theme bg-[#050505] text-white h-screen w-full overflow-hidden relative cursor-grab active:cursor-grabbing">
      
      {/* Background HUD Interface */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
         <div className="w-[80vw] h-[80vw] border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-[60vw] h-[60vw] border border-dashed border-white/20 rounded-full" />
         </div>
         {/* Vertical and Horizontal Axis Lines */}
         <div className="absolute w-full h-[1px] bg-white/5" />
         <div className="absolute h-full w-[1px] bg-white/5" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase pointer-events-auto">Shop.Ring</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">System_Selection_v2</div>
      </nav>

      {/* 3D Product Stage */}
      <main className="relative h-full w-full flex items-center justify-center perspective-[2000px]">
         
         {/* Ring Container */}
         <motion.div 
            drag="x"
            onDrag={(e, info) => setRotation(prev => prev + info.delta.x * 0.2)}
            className="relative w-full h-full flex items-center justify-center"
         >
            <motion.div 
               animate={{ rotateY: rotation }}
               transition={{ type: "spring", damping: 30, stiffness: 100 }}
               className="relative w-[400px] h-[500px] preserve-3d"
               style={{ transformStyle: 'preserve-3d' }}
            >
               {PRODUCTS.map((product, i) => {
                  const angle = (i / PRODUCTS.length) * 360;
                  return (
                     <div 
                        key={product.id}
                        className="absolute inset-0 flex items-center justify-center group"
                        style={{ 
                           transform: `rotateY(${angle}deg) translateZ(400px)`,
                           backfaceVisibility: 'visible'
                        }}
                     >
                        <motion.div 
                           animate={{ scale: [1, 1.05, 1] }}
                           transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                           className="relative w-full h-full glass border border-white/20 rounded-[3rem] overflow-hidden p-8 shadow-2xl elevation-24"
                        >
                           <div className="relative aspect-square mb-12">
                              <Image src={product.img} alt={product.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                           </div>
                           <div className="text-center space-y-4">
                              <span className="text-[10px] uppercase font-black tracking-widest text-[#ec4899] mb-2 block">Item_0{product.id}</span>
                              <h2 className="text-3xl font-black uppercase tracking-tighter italic">{product.name}</h2>
                              <div className="text-xl font-mono opacity-60 font-black italic">${product.price}</div>
                              <button className="mt-8 px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-110 transition-transform">Inquire</button>
                           </div>
                        </motion.div>
                     </div>
                  );
               })}
            </motion.div>
         </motion.div>

         {/* Center Information */}
         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 opacity-20">
            <h1 className="text-[20vw] font-black opacity-10 uppercase italic tracking-tighter leading-none select-none">SELECT</h1>
         </div>
      </main>

      {/* Floating Instructions */}
      <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 text-[10px] uppercase tracking-[1em] font-black italic opacity-40">
         Drag Horizontal to Rotate Collection
      </footer>

      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
      `}</style>
    </div>
  );
}
