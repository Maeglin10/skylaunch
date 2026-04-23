"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ticket, Clock, MapPin } from "lucide-react";
import "../premium.css";

const COLLECTIONS = [
  { title: "Plan Your Visit", txt: "Open daily 10:30a - 5:30p. Free admission for members." },
  { title: "Membership", txt: "Join today for unlimited free admission and exclusive previews." },
  { title: "Collections", txt: "Browse over 200,000 works of modern and contemporary art." }
];

export default function PremiumMuseum() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#E4E2DE] text-[#8B0000] min-h-screen font-serif selection:bg-[#8B0000] selection:text-[#E4E2DE] overflow-hidden flex flex-col md:flex-row">
      
      {/* VERTICAL SIDE NAVIGATION (BRUTALIST) */}
      <header className="fixed md:sticky top-0 left-0 w-full md:w-24 h-24 md:h-screen border-b md:border-b-0 md:border-r border-[#8B0000]/20 bg-[#E4E2DE] z-50 flex md:flex-col justify-between items-center p-6 md:py-12 shrink-0">
        <Link href="/" className="font-black text-3xl tracking-tighter uppercase md:origin-center md:-rotate-90 md:mt-12 text-[#8B0000] mix-blend-multiply">MoMA</Link>
        
        {/* Brutalist Hamburger */}
        <button className="w-12 h-12 border-2 border-[#8B0000] flex flex-col justify-center items-center gap-2 hover:bg-[#8B0000] group transition-colors duration-300">
            <span className="w-6 h-0.5 bg-[#8B0000] group-hover:bg-[#E4E2DE] transition-colors" />
            <span className="w-6 h-0.5 bg-[#8B0000] group-hover:bg-[#E4E2DE] transition-colors" />
        </button>
        
        <div className="hidden md:flex items-center gap-4 font-sans font-bold text-[10px] uppercase tracking-[0.4em] md:origin-center md:-rotate-90 md:mb-16 cursor-pointer hover:opacity-50 transition-opacity">
           <Ticket className="w-4 h-4 rotate-90" /> Tickets
        </div>
      </header>

      {/* MAIN CONTENT ZONE */}
      <main className="flex-1 flex flex-col pt-24 md:pt-0">
         
         {/* HERO SPLIT */}
         <section className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] md:min-h-screen border-b border-[#8B0000]/20">
            
            {/* Left Typographic Zone */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
               <div className="absolute top-8 left-8 md:top-16 md:left-16 font-sans text-[10px] font-black uppercase tracking-[0.4em] text-[#8B0000]/40 flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse" /> Current Exhibition
               </div>
               
               <motion.div style={{ x: textX }}>
                  <h1 className="text-7xl md:text-[9vw] font-black uppercase leading-[0.8] tracking-tighter mb-12 text-[#8B0000] mix-blend-multiply">
                     Form<br/>& <span className="italic font-light">Chaos.</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl font-light italic text-[#8B0000]/70 max-w-md leading-relaxed mb-16">
                     Explore the profound tension between structural design and organic breakdown in post-modern sculpture.
                  </p>
                  
                  <button className="flex items-center gap-4 font-sans font-black uppercase tracking-[0.3em] text-xs border-b-2 border-[#8B0000] pb-2 hover:opacity-50 hover:gap-6 transition-all group">
                     Explore Gallery <ArrowRight className="w-4 h-4" />
                  </button>
               </motion.div>
            </div>
            
            {/* Right Image Parallax Zone */}
            <div className="flex-1 relative border-t lg:border-t-0 lg:border-l border-[#8B0000]/20 bg-[#8B0000] overflow-hidden group min-h-[60vh] lg:min-h-screen">
               <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
                  <Image src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=2000" alt="Sculpture" fill className="object-cover opacity-60 mix-blend-multiply grayscale group-hover:grayscale-0 transition-all duration-[2s]" priority />
               </motion.div>
               <div className="absolute inset-0 bg-[#8B0000] mix-blend-color opacity-50" />
               
               {/* Brutalist Corner Badge */}
               <div className="absolute bottom-0 left-0 bg-[#E4E2DE] p-6 border-t border-r border-[#8B0000]/20 font-sans font-black text-[10px] uppercase tracking-widest flex items-center gap-4">
                  <Clock className="w-4 h-4" /> Until Oct 31
               </div>
            </div>
         </section>

         {/* BRUTALIST GRID */}
         <section className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#8B0000]/20">
            {COLLECTIONS.map((block, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-12 md:p-16 hover:bg-[#8B0000] hover:text-[#E4E2DE] transition-colors duration-500 cursor-pointer group flex flex-col justify-between min-h-[300px]"
               >
                  <h3 className="font-sans font-black uppercase tracking-[0.3em] text-sm md:text-base mb-8">{block.title}</h3>
                  <p className="font-serif text-lg md:text-xl font-light italic opacity-70 leading-relaxed mb-12">{block.txt}</p>
                  
                  <div className="w-12 h-12 border border-current rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                     <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
               </motion.div>
            ))}
         </section>

         {/* MINIMAL FOOTER */}
         <footer className="border-t border-[#8B0000]/20 p-12 flex flex-col md:flex-row justify-between items-center gap-8 font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-[#8B0000]/50">
            <div className="flex items-center gap-4">
               <MapPin className="w-4 h-4" /> 11 West 53 Street, Manhattan
            </div>
            <div>© 2026 The Museum of Modern Art</div>
         </footer>

      </main>
    </div>
  );
}
