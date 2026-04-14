"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "ORBIT_01", price: "$299", img: "https://images.unsplash.com/photo-1542219173-2df61244ef39?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, name: "NEBULA_X", price: "$450", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, name: "VOID_PRO", price: "$180", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000" },
];

export default function EcommerceGlassCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % PRODUCTS.length);

  return (
    <div className="premium-theme bg-[#0a0a0f] text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background Hub Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ 
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600">Sphere.Ecom</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Series_Batch_v.103</div>
      </nav>

      <main className="h-full w-full flex items-center justify-center relative z-10 p-12 overflow-hidden">
         
         <div className="grid grid-cols-12 w-full max-w-7xl items-center gap-12">
            
            {/* Left: Product Info */}
            <div className="col-span-12 lg:col-span-5 space-y-12">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={index}
                     initial={{ x: -100, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: 100, opacity: 0 }}
                     transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  >
                     <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40 text-rose-500">Inventory_Status: ACTIVE</span>
                     <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-12">
                        {PRODUCTS[index].name}.
                     </h1>
                     <div className="text-4xl font-black opacity-20 mb-12">{PRODUCTS[index].price}</div>
                  </motion.div>
               </AnimatePresence>
               
               <button onClick={next} className="px-12 py-8 border-2 border-white/20 rounded-full font-black uppercase text-xs tracking-[1em] italic hover:border-rose-600 hover:text-rose-600 transition-all">Next Asset</button>
            </div>

            {/* Right: Glass Bubble Carousel */}
            <div className="col-span-12 lg:col-span-7 flex justify-center lg:justify-end relative h-[600px] items-center">
               <AnimatePresence>
                  <motion.div
                     key={index}
                     initial={{ scale: 0, opacity: 0, rotate: -45 }}
                     animate={{ scale: 1, opacity: 1, rotate: 0 }}
                     exit={{ scale: 2, opacity: 0, rotate: 45 }}
                     transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                     className="relative aspect-square w-full max-w-md bg-white/10 backdrop-blur-[100px] border border-white/20 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden p-12"
                  >
                     <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 to-transparent" />
                     <div className="relative w-full h-full">
                        <Image src={PRODUCTS[index].img} alt="Product" fill className="object-contain" />
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Decorative Circles */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none scale-90" />
            </div>

         </div>

      </main>

      <div className="fixed right-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         STOCK_NODE_v103
      </div>

    </div>
  );
}
