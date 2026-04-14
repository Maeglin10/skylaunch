"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PRODUCTS = [
  { id: 1, name: "Aevia X1", price: "2,499", img: "/templates/tech_noir.png" },
  { id: 2, name: "Heritage", price: "48,200", img: "/templates/editorial_lux.png" },
  { id: 3, name: "Vison", price: "1,250", img: "/templates/agency_hero.png" },
];

export default function GlassBoutique() {
  return (
    <div className="premium-theme bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-white min-h-screen selection:bg-cyan-500">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center bg-black/20 backdrop-blur-3xl border-b border-white/5">
        <Link href="/" className="text-xl font-black tracking-[0.5em] uppercase text-cyan-400">Glass.Shop</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <a href="#" className="hover:opacity-100">Collection</a>
           <a href="#" className="hover:opacity-100 italic">Cart (03)</a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-48 pb-24 px-12 text-center relative overflow-hidden">
         <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 10, repeat: Infinity }}
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cyan-500/10 blur-[150px] -z-10 rounded-full"
         />
         <h1 className="text-8xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none mb-8 opacity-90 text-white">
            Transparency <br /> <span className="text-cyan-400">Defined.</span>
         </h1>
      </header>

      {/* Glass Product Grid */}
      <main className="max-w-7xl mx-auto px-12 pb-48">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
               <motion.div 
                 key={product.id}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass p-8 rounded-[3rem] border-white/10 group cursor-pointer relative overflow-hidden hover:border-cyan-500/40 transition-colors"
               >
                  <div className="relative aspect-square mb-12 overflow-hidden rounded-2xl">
                     <Image 
                        src={product.img} 
                        alt={product.name} 
                        fill 
                        className="object-contain transition-transform duration-700 group-hover:scale-110" 
                     />
                     <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="flex justify-between items-end mb-8 relative z-10">
                     <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400 mb-2 block">Item_0{product.id}</span>
                        <h2 className="text-3xl font-black uppercase tracking-tighter italic">{product.name}</h2>
                     </div>
                     <div className="text-xl font-mono font-bold">${product.price}</div>
                  </div>

                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] uppercase font-black tracking-[0.4em] hover:bg-cyan-500 hover:text-black transition-all">
                     Quick View
                  </button>

                  {/* Aesthetic HUD Line */}
                  <div className="absolute top-0 left-12 w-[1px] h-full bg-cyan-500/10 pointer-events-none" />
               </motion.div>
            ))}
         </div>
      </main>

      {/* Scrolling Text Bar */}
      <div className="bg-cyan-500 py-4 overflow-hidden flex whitespace-nowrap">
         {[...Array(10)].map((_, i) => (
           <span key={i} className="text-black text-[10px] font-black uppercase tracking-[1em] mx-12">
              Limited Edition _ Neural Grade _ Craftsmanship _ 2026
           </span>
         ))}
      </div>

      <footer className="p-24 text-center border-t border-white/5">
         <div className="text-[10px] font-black uppercase tracking-[2em] opacity-20">Aevia Collection</div>
      </footer>

      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
      `}</style>
    </div>
  );
}
