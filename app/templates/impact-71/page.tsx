"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SHOTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1514864117828-40618018f407?auto=format&fit=crop&q=80&w=2000", cap: "Fragmentations of time." },
  { id: 2, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000", cap: "The structure of silence." },
];

export default function PhotographyFilmGrain() {
  return (
    <div className="premium-theme bg-[#0f0f0f] text-[#f5f5f5] min-h-screen selection:bg-rose-500 overflow-x-hidden font-serif">
      
      {/* Noise / Grain Overlay (Pseudo-animated) */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.08] contrast-150 brightness-150 grayscale" 
           style={{ backgroundImage: 'url("https://media.giphy.com/media/oEI9uWUic89Aos1dK2/giphy.gif")' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-end bg-black/20 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl italic tracking-tighter uppercase font-black">Archive.35mm</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <span>Batch_0x71</span>
           <span>Kodak_400_Sim</span>
        </div>
      </nav>

      <header className="pt-48 pb-24 px-12 text-center max-w-4xl mx-auto">
         <motion.div
           initial={{ opacity: 0, scale: 1.1 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 2 }}
         >
            <span className="text-[10px] uppercase tracking-[1.5em] font-black opacity-20 mb-8 block font-mono italic">Curated_Fragmentations</span>
            <h1 className="text-8xl md:text-[15vw] font-black italic tracking-tighter leading-none mb-12">
               Solar <br /> <span className="text-rose-600">Nocturne.</span>
            </h1>
         </motion.div>
      </header>

      {/* Film Stack */}
      <main className="px-6 md:px-12 pb-64 space-y-96">
         {SHOTS.map((shot, i) => (
            <motion.div 
               key={shot.id}
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5 }}
               className="relative max-w-7xl mx-auto"
            >
               {/* 35mm Simulation Frame */}
               <div className="relative aspect-[3/2] w-full bg-white/5 border-[10px] md:border-[30px] border-black shadow-2xl overflow-hidden ring-1 ring-white/10">
                  <Image 
                     src={shot.img} 
                     alt={shot.cap} 
                     fill 
                     className="object-cover grayscale contrast-125 saturate-0 group-hover:scale-110 transition-transform duration-[4s]" 
                  />
                  <div className="absolute inset-0 bg-rose-600/5 mix-blend-overlay" />
                  
                  {/* Sprocket Holes (Pseudo) */}
                  <div className="absolute left-0 inset-y-0 w-8 flex flex-col justify-around py-12 pointer-events-none">
                     {Array.from({ length: 12 }).map((_, j) => (
                        <div key={j} className="w-4 h-4 rounded-sm bg-black border border-white/20" />
                     ))}
                  </div>
               </div>

               <div className={`mt-12 flex flex-col ${i % 2 === 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                  <span className="text-[8px] font-mono font-black italic opacity-20 uppercase tracking-[1em] mb-4">Neg_Ref_0x0{shot.id}</span>
                  <h2 className="text-3xl md:text-5xl font-black italic text-white/90 uppercase tracking-tighter">{shot.cap}</h2>
               </div>
            </motion.div>
         ))}
      </main>

      <footer className="p-24 text-center border-t border-white/5 bg-black">
         <div className="text-[10vw] font-black italic tracking-tighter opacity-10 mb-12 leading-none uppercase">End of Film.</div>
         <div className="text-[10px] font-mono uppercase tracking-[1em] opacity-20">Archive Unit &copy; 2026</div>
      </footer>

    </div>
  );
}
