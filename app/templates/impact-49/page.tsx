"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const GALLERY = [
  { id: 1, title: "Lumina", img: "/templates/editorial_lux.png", leak: "from-orange-500/20" },
  { id: 2, title: "Aether", img: "/templates/tech_noir.png", leak: "from-indigo-500/20" },
  { id: 3, title: "Zenith", img: "/templates/portal_frame.png", leak: "from-rose-500/20" },
];

export default function PhotographyLightLeak() {
  return (
    <div className="premium-theme bg-[#fcfcfc] text-[#111] min-h-screen selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-end border-b border-black/5 bg-white/40 backdrop-blur-xl">
        <Link href="/" className="text-xl font-serif italic tracking-tighter uppercase">Leak.Journal</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <a href="#" className="hover:opacity-100">Exhibition</a>
           <a href="#" className="hover:opacity-100 italic">Journal</a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-48 pb-24 px-12 text-center relative overflow-hidden">
         {/* Simulated Floating Light Leaks */}
         <motion.div 
            animate={{ 
               x: [-100, 100, -100],
               opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-400/20 to-transparent blur-[120px] rounded-full"
         />
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5 }}
           className="max-w-4xl mx-auto relative z-10"
         >
            <span className="text-xs uppercase tracking-[1em] font-bold opacity-20 mb-8 block font-mono">Archive / Fragments / Light</span>
            <h1 className="text-7xl md:text-[12vw] font-serif italic tracking-tighter leading-none mb-12">
               Solar <br /> <span className="not-italic text-transparent" style={{ WebkitTextStroke: '2px #111' }}>Memories.</span>
            </h1>
         </motion.div>
      </header>

      {/* Gallery with Active Light Leaks */}
      <main className="px-12 pb-64 space-y-96">
         {GALLERY.map((item, i) => (
            <motion.div 
               key={item.id}
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2 }}
               className="relative grid grid-cols-12 gap-12 items-center"
            >
               <div className={`col-span-12 lg:col-span-10 ${i % 2 === 0 ? '' : 'lg:col-start-3'} relative aspect-video overflow-hidden border-[20px] md:border-[60px] border-white shadow-2xl elevation-24 bg-neutral-100`}>
                  <Image 
                     src={item.img} 
                     alt={item.title} 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-[2s]" 
                  />
                  
                  {/* Procedurally Pulsing Light Leak Overlay */}
                  <motion.div 
                    animate={{ 
                       opacity: [0.3, 0.6, 0.3],
                       scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: i * 2 }}
                    className={`absolute -top-1/2 -right-1/4 w-full h-[150%] bg-gradient-radial ${item.leak} via-transparent to-transparent blur-[100px] rounded-full pointer-events-none`}
                  />
                  <div className="absolute inset-0 bg-white/5 pointer-events-none" />
               </div>

               <div className={`col-span-12 lg:col-span-2 ${i % 2 === 0 ? 'text-right' : 'text-left lg:order-first'} mt-12 lg:mt-0`}>
                  <span className="text-[10px] uppercase font-mono tracking-widest opacity-20 mb-4 block">Frag_0${item.id+100}</span>
                  <h2 className="text-4xl font-serif italic font-black text-rose-500/80">{item.title}</h2>
                  <p className="max-w-xs text-sm font-medium uppercase tracking-widest leading-[1.8] opacity-40 mt-6 lg:ml-auto">
                     Captured at the brink of sunset. <br /> The physics of light meeting the architecture of silence.
                  </p>
               </div>
            </motion.div>
         ))}
      </main>

      {/* Minimal Footer */}
      <footer className="p-24 text-center border-t border-black/5 bg-white">
         <div className="text-[8px] uppercase tracking-[1em] font-black opacity-20 mb-8 italic">Solarized Archive &reg; 2026</div>
         <div className="font-serif italic text-2xl opacity-40">Fine Art Photography Unit.</div>
      </footer>

      <style>{`
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
