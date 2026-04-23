"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Utensils } from "lucide-react";
import "../premium.css";

const MENU = [
  { name: "Wild Scallop Crudo", price: "32", desc: "Yuzu, shiso, smoked daikon, caviar" },
  { name: "Aged Duck Breast", price: "48", desc: "Black cherry, endive, five-spice duck jus" },
  { name: "Wagyu Striploin A5", price: "85", desc: "Charred leeks, bone marrow emulsion, truffle" },
  { name: "Mille-Feuille", price: "24", desc: "Tahitian vanilla bean, caramelized puff pastry" }
];

export default function PremiumRestaurant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#121110] text-[#E8DCC4] min-h-screen font-serif selection:bg-[#E8DCC4] selection:text-[#121110]">
      
      {/* NOISE TEXTURE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none text-white">
        <nav className="hidden md:flex gap-12 font-sans font-bold text-[10px] tracking-[0.4em] uppercase pointer-events-auto">
            <Link href="#" className="hover:opacity-50 transition-opacity">Menus</Link>
            <Link href="#" className="hover:opacity-50 transition-opacity">Private Dining</Link>
        </nav>
        
        <Link href="/" className="font-black text-4xl uppercase tracking-[0.2em] pointer-events-auto mix-blend-difference">Aura.</Link>
        
        <button className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1 hover:text-[#E8DCC4] hover:border-[#E8DCC4] transition-colors pointer-events-auto">
            Reservations
        </button>
      </header>

      {/* CINEMATIC HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-[-10%] z-0">
             <Image src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=2500" alt="Restaurant interior" fill className="object-cover opacity-60 mix-blend-luminosity brightness-75" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-[#121110]/50" />
        </motion.div>
        
        <motion.div style={{ opacity: textOpacity }} className="relative z-10 w-full max-w-4xl px-6">
            <div className="font-sans text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-[#E8DCC4]/60 flex items-center justify-center gap-4">
               <Utensils className="w-4 h-4" /> Two Michelin Stars
            </div>
            <h1 className="text-7xl md:text-[9vw] font-light tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl">
               Culinary <br/>
               <span className="italic font-normal text-transparent" style={{ WebkitTextStroke: "1px #E8DCC4" }}>Poetry.</span>
            </h1>
            <p className="font-sans text-sm font-bold tracking-[0.3em] max-w-lg mx-auto opacity-70 leading-loose uppercase">
                An immersive tasting experience nestled in the heart of the city. Where fire meets absolute finesse.
            </p>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#E8DCC4]/50">
           <div className="font-sans text-[8px] font-black uppercase tracking-[0.4em]">Descend</div>
           <div className="w-px h-16 bg-current relative overflow-hidden">
              <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-full h-full bg-[#E8DCC4]" />
           </div>
        </div>
      </section>

      {/* MENU SHOWCASE */}
      <section className="py-32 px-6 max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            
            {/* Left: Image with organic mask */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="relative aspect-[3/4] w-full max-w-lg mx-auto group"
            >
                {/* Decorative border */}
                <div className="absolute -inset-4 border border-[#E8DCC4]/20 rounded-t-[12rem] pointer-events-none group-hover:inset-0 transition-all duration-[2s] ease-out z-10" />
                
                <div className="relative w-full h-full rounded-t-[12rem] overflow-hidden">
                   <Image src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1500" alt="Dish" fill className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-[0.16,1,0.3,1] grayscale-[30%]" />
                </div>
            </motion.div>
            
            {/* Right: Menu content */}
            <div className="max-w-xl mx-auto lg:mx-0 w-full">
                <div className="flex items-center gap-4 font-sans font-black text-[10px] tracking-[0.4em] uppercase text-[#E8DCC4]/50 mb-8">
                   <span className="w-12 h-px bg-current" /> Spring Collection
                </div>
                
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-16 leading-none">
                   Seasonal <br/><span className="italic font-normal">Signatures.</span>
                </h2>
                
                <div className="space-y-10">
                    {MENU.map((item, i) => (
                       <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="group cursor-pointer"
                       >
                           <div className="flex justify-between items-end mb-3 border-b border-[#E8DCC4]/10 pb-4 group-hover:border-[#E8DCC4]/40 transition-colors">
                              <h3 className="text-xl md:text-2xl font-light tracking-tight">{item.name}</h3>
                              <span className="font-sans font-black text-sm">${item.price}</span>
                           </div>
                           <p className="font-serif italic text-[#E8DCC4]/50 text-sm">{item.desc}</p>
                       </motion.div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-[#E8DCC4]/10">
                    <button className="font-sans font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors flex items-center gap-6 group">
                        View Complete Menu <span className="w-12 h-px bg-[#E8DCC4] group-hover:w-24 transition-all duration-500" />
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A09] text-[#E8DCC4] py-24 px-6 md:px-12 mt-32 border-t border-[#E8DCC4]/10 relative z-10">
         <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
            
            <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-[0.2em] leading-none opacity-10">AURA</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 font-sans text-xs font-bold uppercase tracking-widest text-[#E8DCC4]/60">
               <div className="space-y-4">
                  <div className="text-[#E8DCC4] flex items-center gap-2 mb-6"><MapPin className="w-4 h-4" /> Location</div>
                  <p className="leading-loose">742 Evergreen Terrace<br/>Metropolis, NY 10021</p>
               </div>
               <div className="space-y-4">
                  <div className="text-[#E8DCC4] flex items-center gap-2 mb-6"><Clock className="w-4 h-4" /> Hours</div>
                  <p className="leading-loose">Tue - Sun<br/>5:00 PM - 11:00 PM</p>
               </div>
               <div className="space-y-4">
                  <div className="text-[#E8DCC4] flex items-center gap-2 mb-6"><Phone className="w-4 h-4" /> Contact</div>
                  <p className="leading-loose">+1 (555) 019-8372<br/>info@aura-dining.com</p>
               </div>
            </div>
            
         </div>
      </footer>
    </div>
  );
}
