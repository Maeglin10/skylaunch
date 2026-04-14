"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EcommerceVideoShowcase() {
  return (
    <div className="premium-theme bg-black text-white h-screen w-full overflow-hidden relative selection:bg-rose-500 font-mono">
      
      {/* Background Cinematic Asset */}
      <div className="absolute inset-0 z-0">
         <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="w-full h-full relative"
         >
            <Image 
               src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2000" 
               alt="Product Showcase" 
               fill 
               className="object-cover opacity-60 brightness-75 contrast-125" 
            />
         </motion.div>
         <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-rose-600">Pure.Ecom</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Series_Node_v.087</div>
      </nav>

      <main className="grid grid-cols-12 h-full items-center p-12">
         
         {/* Left: Product Specs HUD */}
         <div className="col-span-12 lg:col-span-7 space-y-12 relative z-10">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.5 }}
            >
               <span className="text-[10px] uppercase tracking-[2em] font-black italic mb-8 block opacity-40 text-rose-500">Kinetic_Engineering_Active</span>
               <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-12">
                  IGNITE <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>PRO_B.</span>
               </h1>
               
               <div className="flex gap-12 font-mono text-[8px] uppercase font-black opacity-20">
                  <div className="flex flex-col gap-2">
                     <span>Weight: 240g</span>
                     <div className="w-32 h-[1px] bg-white opacity-20" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <span>Traction: MAX</span>
                     <div className="w-32 h-[1px] bg-rose-600" />
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Right: Purchase Control Card */}
         <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end py-12">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className="bg-white/10 backdrop-blur-3xl p-12 lg:p-16 border border-white/20 rounded-[4rem] max-w-sm w-full"
            >
               <div className="flex justify-between items-baseline mb-8">
                  <h3 className="text-4xl font-black italic uppercase leading-none">Order.</h3>
                  <span className="text-2xl font-black opacity-40">$199</span>
               </div>
               
               <p className="text-xs uppercase tracking-widest leading-relaxed opacity-40 font-black mb-12">
                  Limited production batch for high-performance structural synchronization.
               </p>

               <div className="grid grid-cols-3 gap-4 mb-12 opacity-40">
                  {['8', '9', '10'].map(size => (
                     <div key={size} className="p-4 border border-white/20 text-center text-xs font-black italic hover:border-rose-600 hover:text-rose-600 transition-all cursor-pointer">US_{size}</div>
                  ))}
               </div>

               <button className="w-full px-12 py-8 bg-rose-600 text-black font-black uppercase text-xs tracking-[1em] italic hover:scale-105 transition-transform shadow-[0_0_50px_rgba(225,29,72,0.4)]">Initialize Order</button>
            </motion.div>
         </div>

      </main>

      {/* Floating Price Index */}
      <div className="fixed left-12 bottom-12 z-50 text-[10vw] font-black italic opacity-[0.03] select-none pointer-events-none leading-none">
         STOCK_NODE_v75
      </div>

    </div>
  );
}
