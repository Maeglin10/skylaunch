"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function SplitMinimalTemplate() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-12 flex justify-between items-center mix-blend-difference invert">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase">Editorial&reg;</Link>
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold">
           <a href="#" className="hover:opacity-40">Issue_04</a>
           <a href="#" className="hover:opacity-40">Index</a>
        </div>
      </nav>

      <main className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Pinned Content */}
        <div className="w-full lg:w-1/2 h-screen sticky top-0 bg-[#f9f9f9] flex flex-col justify-center p-12 lg:p-24 border-r border-black/5">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
           >
              <span className="text-xs uppercase tracking-[0.5em] opacity-40 mb-8 block font-bold">Volume Four / Series One</span>
              <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.85] tracking-tighter mb-12">
                Asymmetric <br /> 
                <span className="not-italic font-black">Balance.</span>
              </h1>
              <p className="max-w-md text-lg leading-relaxed opacity-60 mb-12 uppercase text-xs tracking-wider">
                 A study in negative space and editorial structure. 
                 Designed for high-end narratives and conceptual storytelling.
              </p>
              <button className="px-12 py-6 border border-black uppercase text-[10px] tracking-[0.5em] font-black hover:bg-black hover:text-white transition-all">
                Read Publication
              </button>
           </motion.div>
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="w-full lg:w-1/2 p-4 lg:p-24 space-y-24">
           {[
             { img: "/templates/editorial_lux.png", t: "The Gilded Age", d: "Exploration of gold and silk textures." },
             { img: "/templates/portal_frame.png", t: "Desert Silence", d: "Minimalist landscapes of the salt flats." },
             { img: "/templates/tech_noir.png", t: "Neural Rift", d: "Merging architecture with technology." }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="group"
             >
                <div className="relative aspect-[3/4] bg-[#eee] overflow-hidden mb-8">
                   <Image
                      src={item.img}
                      alt={item.t}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <h2 className="text-2xl font-serif italic mb-2">{item.t}</h2>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">{item.d}</p>
                   </div>
                   <div className="text-[10px] font-black opacity-20">REF_{i+100}</div>
                </div>
             </motion.div>
           ))}
           
           {/* Footer inside right side */}
           <footer className="pt-48 pb-12 flex justify-between items-center opacity-40 text-[10px] uppercase tracking-[0.4em] font-black">
              <div>&copy; 2026 Editorial.studio</div>
              <div>London / Paris / NYC</div>
           </footer>
        </div>
      </main>
    </div>
  );
}
