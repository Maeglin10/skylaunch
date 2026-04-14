"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EcommerceLuxWatch() {
  return (
    <div className="premium-theme bg-[#0d0d0d] text-[#e5e5e5] min-h-screen selection:bg-[#c2a05e]">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-end bg-black/40 backdrop-blur-md">
        <Link href="/" className="text-3xl font-serif italic tracking-tighter">Gold.Heritage</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black tracking-[0.5em] opacity-40">
           <a href="#" className="hover:opacity-100">Bespoke</a>
           <a href="#" className="hover:opacity-100">Cart (01)</a>
        </div>
      </nav>

      {/* Main Showcase */}
      <main className="relative h-screen flex items-center justify-center pt-24">
        
        {/* Background Text Shadow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-[20vw] font-serif italic font-black text-white/5 pointer-events-none select-none tracking-tighter">
           Timeless
        </div>

        <div className="relative w-full max-w-[1400px] grid grid-cols-12 gap-12 items-center px-12">
           
           {/* Product Specs */}
           <div className="col-span-12 lg:col-span-3 order-2 lg:order-1 space-y-24">
              <div className="border-l border-[#c2a05e]/40 pl-8">
                 <h3 className="text-[10px] uppercase font-black tracking-widest text-[#c2a05e] mb-2">Structure</h3>
                 <p className="text-xl font-light opacity-60 font-serif leading-relaxed">18K Rose Gold with Charcoal dial.</p>
              </div>
              <div className="border-l border-[#c2a05e]/40 pl-8">
                 <h3 className="text-[10px] uppercase font-black tracking-widest text-[#c2a05e] mb-2">Movement</h3>
                 <p className="text-xl font-light opacity-60 font-serif leading-relaxed">Calibre 324 S C Automatic mechanical.</p>
              </div>
           </div>

           {/* Hero Product */}
           <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 flex flex-col items-center">
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative w-full aspect-square scale-110"
              >
                 <Image src="/templates/editorial_lux.png" alt="Heritage Watch" fill className="object-contain drop-shadow-2xl" />
              </motion.div>
              <div className="mt-12 text-center">
                 <h1 className="text-6xl md:text-8xl font-serif font-black italic tracking-tighter leading-none mb-4">Aether Era.</h1>
                 <p className="text-[10px] uppercase tracking-[1em] opacity-30 font-bold">Limited Edition 01/50</p>
              </div>
           </div>

           {/* Call to Action */}
           <div className="col-span-12 lg:col-span-3 order-3 flex flex-col items-end">
              <div className="text-right mb-12">
                 <span className="text-xs uppercase tracking-[0.5em] opacity-40 italic block mb-2">Price</span>
                 <div className="text-5xl font-serif italic text-[#c2a05e]">$48,200</div>
              </div>
              <button className="group relative px-12 py-6 bg-[#c2a05e] text-black font-black uppercase text-xs tracking-[0.5em] overflow-hidden">
                 <span className="relative z-10">Purchase Now</span>
                 <motion.div whileHover={{ scale: 1.5 }} className="absolute inset-0 bg-white/20 transition-transform" />
              </button>
              <div className="mt-12 text-right opacity-40 text-[10px] uppercase tracking-widest leading-loose">
                 Global Shipping Included <br /> Secure Vault Delivery Available
              </div>
           </div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-12 left-12 right-12 flex justify-between items-center text-[8px] uppercase tracking-[1em] font-black opacity-20 italic">
         <div>Heritage Crafted in Geneve</div>
         <div>(C) 2026 Gold Heritage Studio</div>
      </footer>
    </div>
  );
}
