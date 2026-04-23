"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import "../premium.css";

const NOTES = [
  { name: "Top Notes", desc: "Bergamot, Pink Pepper, Elemi" },
  { name: "Heart Notes", desc: "Damascus Rose, Smoked Tea, Iris" },
  { name: "Base Notes", desc: "Amber, Vetiver, Vanilla Absolute" }
];

export default function PremiumFragrance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#0A0908] text-[#F2EDD9] min-h-screen font-serif selection:bg-[#D4AF37] selection:text-[#0A0908] overflow-hidden">
      
      {/* AMBER GLOW BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
           style={{ x: springX, y: springY }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D4AF37] opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-soft-light" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <nav className="hidden md:flex gap-12 font-sans font-bold text-[9px] tracking-[0.4em] uppercase pointer-events-auto">
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Collections</Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">La Maison</Link>
        </nav>
        
        <Link href="/" className="text-4xl font-light tracking-[0.2em] uppercase mx-auto md:mx-0 text-center pointer-events-auto">
            Aurae
        </Link>
        
        <div className="hidden md:flex gap-8 font-sans font-bold text-[9px] tracking-[0.4em] uppercase items-center pointer-events-auto">
            <button className="hover:text-[#D4AF37] transition-colors"><Search className="w-4 h-4" /></button>
            <button className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> (0)</button>
        </div>
      </header>

      {/* LUXURY HERO */}
      <section className="relative min-h-[120vh] flex flex-col justify-start items-center text-center pt-32 md:pt-48 pb-32">
        
        {/* Animated Bottle Container */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9, y: 50 }} 
           animate={{ opacity: 1, scale: 1, y: 0 }} 
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
           style={{ opacity: heroOpacity }}
           className="relative z-10 w-full max-w-[320px] md:max-w-[400px] aspect-[2/3] mx-auto mb-16 border border-[#D4AF37]/20 p-4 rounded-t-[15rem] overflow-hidden group shadow-[0_0_100px_rgba(212,175,55,0.1)]"
        >
            <motion.div style={{ y: heroImgY }} className="absolute inset-[-10%]">
                <Image src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1500" alt="Perfume Bottle" fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent" />
            </motion.div>
            
            {/* Inner Glow line */}
            <div className="absolute inset-4 rounded-t-[14rem] border border-[#D4AF37]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, y: 30 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.8, duration: 1 }} 
           className="relative z-10 max-w-2xl px-6"
        >
            <h1 className="text-6xl md:text-[8vw] font-light italic tracking-tight leading-none mb-8 text-[#D4AF37] drop-shadow-lg">
               L'Essence.
            </h1>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#A39E8C] max-w-md mx-auto leading-loose mb-12">
                The new signature autumn collection. An intoxicating blend capturing the warmth of twilight.
            </p>
            <button className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] border border-[#D4AF37]/40 px-12 py-5 hover:bg-[#D4AF37] hover:text-[#0A0908] transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
               Discover Now
            </button>
        </motion.div>
        
        {/* Floating elements */}
        <div className="absolute bottom-12 left-12 font-sans font-bold text-[8px] uppercase tracking-[0.5em] text-[#D4AF37]/40 [writing-mode:vertical-lr] hidden md:block">
           Extrait de Parfum
        </div>
      </section>

      {/* OLFACTORY PYRAMID */}
      <section className="py-32 px-6 max-w-5xl mx-auto relative z-10 border-t border-[#D4AF37]/10">
         <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light italic mb-6">Olfactory Pyramid</h2>
            <div className="w-12 h-px bg-[#D4AF37]/50 mx-auto" />
         </div>

         <div className="space-y-16">
            {NOTES.map((note, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 md:gap-12 border-b border-[#D4AF37]/10 pb-8"
               >
                  <div className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] shrink-0 w-32">
                     {note.name}
                  </div>
                  <div className="text-xl md:text-2xl font-light tracking-wide text-[#F2EDD9]/80">
                     {note.desc}
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 text-center border-t border-[#D4AF37]/10 relative z-10 mt-24">
         <div className="text-[10vw] font-light tracking-widest uppercase mb-12 opacity-[0.03]">AURAE</div>
         <p className="font-sans text-[8px] uppercase tracking-[0.4em] text-[#A39E8C]">Paris • London • New York</p>
      </footer>
    </div>
  );
}
