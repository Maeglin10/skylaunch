"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, X, ArrowUpRight } from "lucide-react";
import "../premium.css";

const IMAGES = [
  { url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200", title: "SILENT ECHO", loc: "ICELAND", year: "2025" },
  { url: "https://images.unsplash.com/photo-1516106649774-4b533e7216a9?auto=format&fit=crop&q=80&w=1200", title: "URBAN VOID", loc: "TOKYO", year: "2026" },
  { url: "https://images.unsplash.com/photo-1528612198083-d34346808795?auto=format&fit=crop&q=80&w=1200", title: "DESERT GEOMETRY", loc: "NAMIBIA", year: "2024" },
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200", title: "PORTRAIT 042", loc: "PARIS", year: "2026" },
  { url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200", title: "MONOLITH", loc: "UTAH", year: "2025" },
];

export default function PremiumPhotography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div ref={containerRef} className="premium-theme bg-[#0a0a0a] text-[#e0e0e0] h-[500vh] font-serif selection:bg-white selection:text-black">
      
      {/* CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-24 h-24 rounded-full border border-white/20 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
        animate={{ 
          x: mousePosition.x - 48, 
          y: mousePosition.y - 48,
          scale: hoveredImage !== null ? 1 : 0.2,
          opacity: hoveredImage !== null ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <AnimatePresence>
           {hoveredImage !== null && (
              <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
                 View
              </motion.span>
           )}
        </AnimatePresence>
      </motion.div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-2xl font-black tracking-widest uppercase pointer-events-auto">N.STUDIO</Link>
        <div className="flex gap-4 items-center pointer-events-auto">
           <div className="hidden md:flex flex-col items-end mr-8 text-[10px] font-sans font-bold uppercase tracking-[0.3em] opacity-40">
              <span>Archive 2026</span>
              <span>Scroll to navigate</span>
           </div>
           <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <Plus className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
         
         <motion.div style={{ x }} className="flex gap-12 md:gap-32 px-[10vw] items-center h-full">
            
            {/* INTRO TEXT */}
            <div className="min-w-[80vw] md:min-w-[50vw] flex flex-col justify-center">
               <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
                  <h1 className="text-[15vw] md:text-[8vw] font-black italic tracking-tighter leading-[0.8] mb-8">
                     CAPTURING <br /> THE VOID.
                  </h1>
                  <p className="max-w-md text-lg md:text-xl font-sans font-light opacity-50 leading-relaxed">
                     A visual exploration of emptiness, structure, and the subtle interplay between light and form.
                  </p>
               </motion.div>
            </div>

            {/* IMAGES */}
            {IMAGES.map((img, i) => (
               <div 
                  key={i} 
                  className="relative min-w-[80vw] md:min-w-[45vw] h-[60vh] md:h-[75vh] group cursor-none"
                  onMouseEnter={() => setHoveredImage(i)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onClick={() => setSelectedImage(i)}
               >
                  <div className="absolute inset-0 overflow-hidden bg-white/5 rounded-sm">
                     <Image 
                        src={img.url} 
                        alt={img.title} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] hover:scale-110" 
                        sizes="(max-width: 768px) 80vw, 45vw"
                     />
                  </div>
                  <div className="absolute -bottom-16 left-0 flex justify-between w-full font-sans text-xs font-bold uppercase tracking-[0.2em] opacity-40">
                     <span>{img.title}</span>
                     <span>{img.year} // {img.loc}</span>
                  </div>
               </div>
            ))}
            
            {/* OUTRO */}
            <div className="min-w-[80vw] md:min-w-[40vw] flex flex-col items-center justify-center">
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8">INQUIRIES</h2>
               <Link href="#" className="flex items-center gap-4 text-sm font-sans font-bold uppercase tracking-[0.2em] hover:text-[#00ffcc] transition-colors">
                  Contact Studio <ArrowUpRight className="w-5 h-5" />
               </Link>
            </div>

         </motion.div>
      </div>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
         {selectedImage !== null && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            >
               <button 
                  onClick={() => setSelectedImage(null)} 
                  className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors z-[210] cursor-pointer"
               >
                  <X className="w-6 h-6" />
               </button>
               
               <div className="relative w-[90vw] h-[80vh] md:w-[70vw] md:h-[85vh]">
                  <motion.div 
                     initial={{ scale: 0.9, y: 50 }} 
                     animate={{ scale: 1, y: 0 }} 
                     transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                     className="relative w-full h-full"
                  >
                     <Image src={IMAGES[selectedImage].url} alt={IMAGES[selectedImage].title} fill className="object-contain" />
                  </motion.div>
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                     className="absolute bottom-[-10%] md:bottom-0 left-0 w-full flex justify-between font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] bg-black/50 p-4 md:p-8 backdrop-blur-md"
                  >
                     <span>{IMAGES[selectedImage].title}</span>
                     <span>{IMAGES[selectedImage].loc}</span>
                  </motion.div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <style>{`
        body { cursor: default; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
