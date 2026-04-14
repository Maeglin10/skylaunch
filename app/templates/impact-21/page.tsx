"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EcommerceNeoMinimal() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-black selection:text-white">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference invert">
        <Link href="/" className="text-xl font-black tracking-tight uppercase">Neo.Object</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-bold opacity-40">
           <a href="#" className="hover:opacity-100">Boutique</a>
           <a href="#" className="hover:opacity-100">Cart (0)</a>
        </div>
      </nav>

      {/* Hero Product Section */}
      <main className="pt-32 px-12 pb-24 grid grid-cols-12 gap-12 min-h-screen items-center">
        
        {/* Left: Huge Vertical Text */}
        <div className="col-span-12 lg:col-span-2 hidden lg:flex flex-col justify-center border-r-2 border-black/5 h-full">
           <div className="rotate-[-90deg] whitespace-nowrap text-[8vh] font-black uppercase tracking-tighter opacity-5">
              NEW_COLLECTION_26
           </div>
        </div>

        {/* Center: Image Content */}
        <div className="col-span-12 lg:col-span-5 relative aspect-[3/4] overflow-hidden group">
           <motion.div 
             initial={{ scale: 1.1, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.2 }}
             className="w-full h-full"
           >
              <Image 
                src="/templates/tech_noir.png" 
                alt="Product" 
                fill 
                className="object-contain grayscale hover:grayscale-0 transition-all duration-1000" 
              />
           </motion.div>
           <div className="absolute bottom-8 left-8 bg-black text-white p-6 font-mono font-black italic text-xl">
              OBJ_01
           </div>
        </div>

        {/* Right: Info & Shop */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
           <motion.div
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
           >
              <span className="text-xs font-mono font-bold opacity-30 mb-6 block uppercase tracking-widest">Minimalist Essentials / v1</span>
              <h1 className="text-8xl md:text-[10vw] font-black leading-[0.8] uppercase tracking-tighter mb-12">
                 Pure <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Form.</span>
              </h1>
              <p className="max-w-md text-xl font-light leading-relaxed mb-12 opacity-60">
                 Removing the excess to reveal the essence of high-performance optics. 
                 Designed for the modern pioneer.
              </p>
              
              <div className="flex items-center gap-12 mb-12">
                 <div className="text-4xl font-mono font-bold">$1,250</div>
                 <button className="flex-grow py-6 bg-black text-white font-black uppercase text-xs tracking-[0.5em] hover:tracking-[0.8em] transition-all">
                    Inquire
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-black/5 opacity-40 font-mono text-[10px] uppercase font-bold">
                 <div>
                    Designed in London <br /> Crafted in Italy
                 </div>
                 <div>
                    2-Year Warranty <br /> Secure Delivery
                 </div>
              </div>
           </motion.div>
        </div>
      </main>

      {/* Feature Grid */}
      <section className="px-12 py-48 bg-black text-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-24">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">The Vision <br /> Is Clear.</h2>
            <div className="max-w-md text-right">
               <div className="text-xs uppercase font-mono font-bold text-white/40 mb-8 block tracking-widest">Tech Stack</div>
               <p className="text-lg font-light leading-relaxed opacity-60">
                  Every lens is calibrated via neural feedback loops to ensure 100% optical alignment with human eye patterns.
               </p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="p-12 text-center text-[10px] font-mono font-bold uppercase tracking-[1em] opacity-20">
         End of Object _ 2026
      </footer>
    </div>
  );
}
