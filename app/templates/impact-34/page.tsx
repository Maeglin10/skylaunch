"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function RealEstateHorizonView() {
  return (
    <div className="premium-theme bg-[#fbfcff] text-[#1a1c20] min-h-screen selection:bg-[#2563eb] selection:text-white">
      
      {/* Premium HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center transition-all bg-white/40 backdrop-blur-3xl border-b border-[#2563eb]/5">
        <Link href="/" className="text-xl font-black tracking-[0.2em] uppercase">Horizon&reg;</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-bold text-[#2563eb]">
           <a href="#listing" className="hover:opacity-60">Inventory</a>
           <a href="#contact" className="hover:opacity-60 font-black italic tracking-widest border border-[#2563eb]/20 px-6 py-2 rounded-full">Book View</a>
        </div>
      </nav>

      {/* Panoramic Hero */}
      <header className="h-screen relative flex items-center justify-center overflow-hidden">
         <motion.div 
           initial={{ scale: 1.2 }}
           animate={{ scale: 1 }}
           transition={{ duration: 3 }}
           className="absolute inset-0 z-0"
         >
            <Image src="/templates/portal_frame.png" alt="Horizon Asset" fill className="object-cover brightness-95 saturate-[0.8]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fbfcff] via-transparent to-transparent" />
         </motion.div>

         <div className="relative z-10 text-center px-12">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
            >
               <span className="text-[10px] uppercase tracking-[0.8em] font-black opacity-40 mb-8 block">Estate.Node 44_A</span>
               <h1 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-12">
                  Above <br /> The <span className="text-[#2563eb] italic">Rest.</span>
               </h1>
               <div className="flex flex-col md:flex-row justify-center gap-12 font-mono text-xs uppercase font-black opacity-30 italic">
                  <span>Sq.Ft 14,200</span>
                  <span className="hidden md:block">|</span>
                  <span>Lat: 34.0522 N</span>
                  <span className="hidden md:block">|</span>
                  <span>Lot 0.42AC</span>
               </div>
            </motion.div>
         </div>
      </header>

      {/* Feature Grid */}
      <main className="max-w-7xl mx-auto px-12 py-32 space-y-64">
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
               <h2 className="text-6xl font-black uppercase tracking-tighter leading-none italic">Infinite <br /> Aperture.</h2>
               <p className="max-w-md text-xl font-light opacity-60 leading-relaxed uppercase tracking-wider">
                  The architecture follows the terrain, creating a seamless transition from interior luxury to the vast expanse of the horizon.
               </p>
               <div className="pt-12 border-t-4 border-[#2563eb] w-32" />
            </div>
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative aspect-[3/4] bg-white shadow-2xl overflow-hidden rounded-[2rem]"
            >
               <Image src="/templates/brutalist_staircase.png" alt="Interior Details" fill className="object-cover contrast-125 saturate-0" />
               <div className="absolute top-8 left-8 glass p-4 rounded-xl border-black/5 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-widest italic font-mono">Structure_Scan_Active</span>
               </div>
            </motion.div>
         </div>

         {/* Technical Spec Banner */}
         <section className="bg-black text-white p-24 rounded-[4rem] text-center">
             <div className="text-[10vw] font-black uppercase italic tracking-tighter opacity-10 leading-none mb-12 select-none">Masterpiece.</div>
             <p className="text-2xl font-black uppercase tracking-tighter italic mb-12">Engineered for the 0.1%</p>
             <button className="px-12 py-6 bg-[#2563eb] text-white font-black uppercase text-xs tracking-widest hover:scale-110 transition-transform italic">Contact Curator</button>
         </section>

      </main>

      {/* Minimal Footer */}
      <footer className="p-12 text-center text-[10px] uppercase tracking-[1em] font-black opacity-10">
         Horizon Estates &copy; 2026 Archive
      </footer>

      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
