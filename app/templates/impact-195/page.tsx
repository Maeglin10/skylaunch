"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Croissant, Coffee } from "lucide-react";
import "../premium.css";

const MENU = [
  { name: "Sourdough Country Loaf", price: "$9.50", desc: "Our signature 48-hour fermented pain de campagne." },
  { name: "Classic Croissant", price: "$4.50", desc: "Isigny Ste-Mère butter, 27 layers of perfection." },
  { name: "Pain au Chocolat", price: "$5.00", desc: "Valrhona dark chocolate batons wrapped in flaky dough." }
];

export default function PremiumBakery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rotateBadge = useTransform(scrollYProgress, [0, 1], [12, 120]);

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const xMarquee = useTransform(springScroll, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#FCF8F2] text-[#4A3B32] min-h-screen font-serif selection:bg-[#4A3B32] selection:text-[#FCF8F2] overflow-hidden">
      
      {/* HEADER */}
      <header className="px-8 py-8 flex justify-between items-center max-w-[1800px] mx-auto relative z-50">
        <nav className="hidden md:flex gap-12 font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#4A3B32]/60">
            <Link href="#" className="hover:text-[#4A3B32] transition-colors">Menu</Link>
            <Link href="#" className="hover:text-[#4A3B32] transition-colors">Process</Link>
            <Link href="#" className="hover:text-[#4A3B32] transition-colors">Locations</Link>
        </nav>
        
        <Link href="/" className="font-extrabold text-4xl tracking-tighter uppercase mx-auto md:mx-0 flex items-center gap-2">
           LUMIÈRE <span className="w-2 h-2 rounded-full bg-[#E57A44]" />
        </Link>
        
        <button className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] border border-[#4A3B32]/20 px-8 py-3 hover:bg-[#4A3B32] hover:text-[#FCF8F2] transition-all shadow-sm hidden md:flex items-center gap-2">
            <Coffee className="w-3 h-3" /> Pre-Order
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full max-w-[1800px] mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16 min-h-[85vh]">
        
        {/* Left Typography */}
        <motion.div 
           initial={{ opacity: 0, x: -30 }} 
           animate={{ opacity: 1, x: 0 }} 
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
           className="flex-1 text-center lg:text-left z-10"
        >
            <div className="inline-flex items-center gap-2 font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#E57A44] mb-8 bg-[#E57A44]/10 px-4 py-1.5 rounded-full">
               <Croissant className="w-3 h-3" /> Baked fresh daily
            </div>
            
            <h1 className="text-7xl md:text-[9vw] font-black tracking-tighter mb-8 leading-[0.85] text-[#4A3B32]">
               Artisanal.<br/>
               <span className="italic font-light text-[#4A3B32]/80">Every Day.</span>
            </h1>
            
            <p className="font-sans text-sm font-medium tracking-[0.2em] uppercase leading-loose text-[#4A3B32]/50 max-w-md mx-auto lg:mx-0 mb-12">
                Handcrafted pastries and wild-yeast sourdough breads baked fresh every morning in the heart of Paris.
            </p>
            
            <Link href="#" className="inline-flex items-center gap-4 font-sans font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-[#4A3B32] pb-2 hover:opacity-60 transition-all hover:gap-6">
               Explore Our Breads <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>

        {/* Right Image Parallax */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }} 
           animate={{ opacity: 1, scale: 1 }} 
           transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
           className="flex-1 w-full relative"
        >
            <div className="relative aspect-[3/4] w-full max-w-lg mx-auto rounded-t-[15rem] overflow-hidden shadow-2xl group">
                <motion.div style={{ y: heroImgY }} className="absolute inset-[-10%]">
                   <Image src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1500" alt="Sourdough Bread" fill className="object-cover group-hover:scale-110 transition-transform duration-[3s]" priority />
                </motion.div>
                <div className="absolute inset-0 ring-1 ring-inset ring-[#4A3B32]/10 rounded-t-[15rem] pointer-events-none" />
            </div>
            
            {/* Rotating Floating Badge */}
            <motion.div 
               style={{ rotate: rotateBadge }}
               className="absolute top-1/2 -left-8 md:left-4 lg:-left-16 transform -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center text-center shadow-[0_20px_40px_rgba(74,59,50,0.1)] border border-[#4A3B32]/5 z-20"
            >
                <span className="font-sans font-black text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#4A3B32] leading-relaxed">
                   Est.<br/><span className="text-[#E57A44] text-lg">1984</span>
                </span>
            </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="py-24 border-y border-[#4A3B32]/10 overflow-hidden bg-white">
         <motion.div style={{ x: xMarquee }} className="flex whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter text-[#4A3B32]">
            <span>SLOW FERMENTATION — PURE INGREDIENTS — SLOW FERMENTATION — PURE INGREDIENTS — </span>
         </motion.div>
      </section>

      {/* HIGHLIGHTED MENU */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
         <div className="text-center mb-24">
            <div className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-[#E57A44] mb-6">Signature Selection</div>
            <h2 className="text-5xl md:text-6xl font-light italic text-[#4A3B32]">The Daily Bake</h2>
         </div>

         <div className="space-y-12">
            {MENU.map((item, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
               >
                  <div className="flex justify-between items-end border-b border-[#4A3B32]/10 pb-4 mb-3 group-hover:border-[#4A3B32]/40 transition-colors">
                     <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[#4A3B32]">{item.name}</h3>
                     <span className="font-sans font-black text-sm text-[#4A3B32]">{item.price}</span>
                  </div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#4A3B32]/50">{item.desc}</p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#4A3B32] text-[#FCF8F2] pt-32 pb-12 px-8 text-center rounded-t-[4rem] mx-4 md:mx-12">
         <h2 className="text-6xl md:text-[10vw] font-black tracking-tighter uppercase mb-12">LUMIÈRE</h2>
         <div className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-white/50 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <span>75003 Paris, France</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
            <span>Open Tuesday - Sunday</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
         </div>
      </footer>
    </div>
  );
}
