"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SECTIONS = [
  { id: 1, title: "LUMINA", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1500" },
  { id: 2, title: "AETHER", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1500" },
  { id: 3, title: "VOID_0", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1500" },
];

export default function OnePageHorizontalReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-black text-white min-h-[400vh] relative selection:bg-rose-500 font-mono">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 p-12 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">Reveal.OS</Link>
        <div className="text-[10px] uppercase tracking-[1em] font-black italic opacity-40">Horizontal_Sync_v.079</div>
      </nav>

      {/* Main Track */}
      <main className="sticky top-0 h-screen overflow-hidden">
         <motion.div 
            style={{ x }}
            className="flex h-full w-[300vw]"
         >
            {SECTIONS.map((s, i) => (
               <section key={s.id} className="h-full w-screen relative flex items-center justify-center p-24">
                  <div className="absolute inset-0 z-0">
                     <Image src={s.img} alt={s.title} fill className="object-cover grayscale brightness-50 contrast-125" />
                     <div className="absolute inset-0 bg-rose-600/5 mix-blend-overlay" />
                  </div>
                  
                  <div className="relative z-10 text-center">
                     <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs uppercase tracking-[2em] font-black italic opacity-40 mb-8 block text-rose-600"
                     >
                        Section_0{i}
                     </motion.span>
                     <h2 className="text-8xl md:text-[15vw] font-black uppercase italic tracking-tighter leading-none mb-12 drop-shadow-2xl">
                        {s.title}.
                     </h2>
                  </div>

                  {/* Progressive index */}
                  <div className="absolute bottom-12 right-12 text-[10vw] font-black italic opacity-[0.05] selection:bg-transparent">
                     0{i+1}
                  </div>
               </section>
            ))}
         </motion.div>
      </main>

      <footer className="fixed bottom-12 left-12 opacity-20 text-[8px] font-black uppercase tracking-[1em] italic pointer-events-none">
         Scroll_Progress_Active
      </footer>

    </div>
  );
}
