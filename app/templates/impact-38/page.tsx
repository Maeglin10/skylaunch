"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const DISHES = [
  { id: 1, name: "Neural Tea", price: "18", img: "/templates/agency_hero.png" },
  { id: 2, name: "Glass Seed", price: "24", img: "/templates/tech_noir.png" },
];

export default function FoodZenMinimal() {
  return (
    <div className="premium-theme bg-[#fafafa] text-[#222] min-h-screen selection:bg-[#cc0000] selection:text-white">
      
      {/* Zen Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center border-b border-black/5 bg-white/40 backdrop-blur-3xl">
        <Link href="/" className="text-xl font-serif italic tracking-tighter uppercase">Zen.OS</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-bold opacity-40">
           <a href="#" className="hover:opacity-100">Philosophy</a>
           <a href="#" className="hover:opacity-100 font-black italic">Book_Table</a>
        </div>
      </nav>

      {/* Hero Narrative */}
      <main className="pt-48 px-12 pb-24 grid grid-cols-12 gap-12 min-h-screen items-center max-w-7xl mx-auto">
        
        {/* Left: Philosophy Text */}
        <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.5 }}
           >
              <span className="text-[10px] uppercase font-serif italic tracking-[0.5em] opacity-40 mb-8 block">Chapter One / The Void</span>
              <h1 className="text-7xl md:text-9xl font-serif italic font-black tracking-tighter leading-none mb-12">
                 Silent <br /> <span className="not-italic">Flavor.</span>
              </h1>
              <p className="max-w-md text-xl font-light leading-relaxed opacity-60 mb-12 italic">
                 Traditional mastery meeting neural refinement. We serve silence on a plate.
              </p>
              <div className="w-16 h-[1px] bg-black mb-12" />
           </motion.div>
        </div>

        {/* Right: Minimal Frame */}
        <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 relative aspect-[4/5] overflow-hidden group border-8 border-white shadow-2xl elevation-24">
           <Image 
             src="/templates/portal_frame.png" 
             alt="Zen Interior" 
             fill 
             className="object-cover contrast-75 brightness-110 saturate-[0.2] group-hover:saturate-[0.5] transition-all duration-1000" 
           />
           <div className="absolute inset-0 bg-white/10" />
        </div>
      </main>

      {/* Menu Highlight */}
      <section className="bg-white py-64 px-12">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xs uppercase tracking-[1em] font-black opacity-30 mb-24">The Collection</h2>
            <div className="space-y-24">
               {DISHES.map((dish, i) => (
                  <div key={dish.id} className="flex flex-col md:flex-row justify-between items-center border-b border-black/5 pb-12 group cursor-pointer">
                     <div className="flex items-center gap-8">
                        <span className="text-xs font-serif italic opacity-40">0{dish.id}</span>
                        <h3 className="text-4xl md:text-6xl font-serif italic font-black group-hover:pl-4 transition-all">{dish.name}</h3>
                     </div>
                     <div className="flex items-center gap-12 mt-8 md:mt-0">
                        <div className="text-2xl font-mono font-bold">${dish.price}</div>
                        <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           &rarr;
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Minimal Footer */}
      <footer className="p-24 text-center">
         <div className="text-[10px] uppercase tracking-[0.8em] font-black opacity-20 italic">Kyoto / Paris / New York</div>
         <div className="mt-8 text-[8px] opacity-10 font-bold uppercase tracking-widest">Aevia Hospitality Group &copy; 2026</div>
      </footer>
    </div>
  );
}
