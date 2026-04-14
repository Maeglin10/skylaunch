"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const GALLERY = [
  { id: 1, title: "SYNAPSE", img: "/templates/tech_noir.png" },
  { id: 2, title: "LITHE", img: "/templates/editorial_lux.png" },
  { id: 3, title: "ORBIT", img: "/templates/agency_hero.png" },
];

export default function PhotographyFrameFocus() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen selection:bg-black selection:text-white">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-end border-b border-black/5 bg-white/50 backdrop-blur-xl">
        <Link href="/" className="text-xl font-serif italic tracking-tighter">Lens.Studio</Link>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-black opacity-40">
           <a href="#" className="hover:opacity-100">Gallery</a>
           <a href="#" className="hover:opacity-100 italic">Journal</a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-48 pb-24 px-12 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="max-w-4xl mx-auto"
         >
            <span className="text-xs uppercase tracking-[0.5em] font-bold opacity-30 mb-8 block">Issue No. 042 / Visual Archive</span>
            <h1 className="text-7xl md:text-9xl font-serif font-black italic tracking-tighter leading-none mb-12">
               Captured <br /> <span className="not-italic text-transparent" style={{ WebkitTextStroke: '2px black' }}>Emotions.</span>
            </h1>
         </motion.div>
      </header>

      {/* Frame Focused Gallery */}
      <main className="px-12 pb-64 space-y-64">
         {GALLERY.map((item, i) => (
            <motion.div 
               key={item.id}
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ margin: "-100px" }}
               transition={{ duration: 1 }}
               className="relative grid grid-cols-12 gap-12 items-center group"
            >
               {/* Large Decorative Index */}
               <div className="absolute top-0 right-0 text-[30vw] font-serif italic opacity-[0.03] select-none pointer-events-none leading-none">
                  0{item.id}
               </div>

               <div className={`col-span-12 lg:col-span-10 ${i % 2 === 0 ? '' : 'lg:col-start-3'} relative aspect-video overflow-hidden border-[20px] md:border-[40px] border-white shadow-2xl elevation-24`}>
                  <Image 
                     src={item.img} 
                     alt={item.title} 
                     fill 
                     className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
                  />
                  {/* Internal Frame Overlay */}
                  <div className="absolute inset-4 border border-white/20 pointer-events-none" />
               </div>

               <div className={`col-span-12 lg:col-span-2 ${i % 2 === 0 ? 'text-right' : 'text-left order-first'} space-y-4`}>
                  <h2 className="text-4xl font-serif italic font-black">{item.title}</h2>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 leading-relaxed font-bold">
                     35mm Digital Reconstruction <br /> ISO 100 / f1.8
                  </p>
                  <button className="text-[10px] uppercase font-black tracking-widest border-b-2 border-black pb-2 hover:opacity-40 transition-opacity">Explore Asset</button>
               </div>
            </motion.div>
         ))}
      </main>

      {/* Footer */}
      <footer className="p-24 bg-black text-white text-center">
         <div className="text-[10vw] font-black uppercase italic tracking-tighter opacity-10 mb-12">Fine Art</div>
         <div className="flex justify-center gap-12 font-mono text-[10px] uppercase font-black tracking-widest opacity-40 italic">
            <span>&copy; 2026 Archive</span>
            <span>All Rights Reserved</span>
         </div>
      </footer>
    </div>
  );
}
