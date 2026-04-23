"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scissors, ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { name: "The Executive Cut", price: "55", time: "45 Min", desc: "Precision haircut, neck shave, wash & styling." },
  { name: "Hot Towel Shave", price: "40", time: "30 Min", desc: "Straight razor shave with essential oils and hot towels." },
  { name: "Beard Sculpting", price: "30", time: "20 Min", desc: "Detailed shaping, line-up, and beard oil treatment." },
  { name: "The Full Service", price: "85", time: "75 Min", desc: "Complete haircut, hot towel shave, and scalp massage." }
];

export default function PremiumBarber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="premium-theme bg-[#0A0A0A] text-[#E5E5E5] min-h-screen font-serif selection:bg-[#C0A080] selection:text-[#0A0A0A] overflow-hidden">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-8 mix-blend-difference pointer-events-none">
         <div className="flex items-center gap-4 pointer-events-auto">
            <div className="w-10 h-10 border border-[#C0A080] flex items-center justify-center rounded-full">
               <Scissors className="w-4 h-4 text-[#C0A080]" />
            </div>
            <Link href="/" className="font-black text-2xl tracking-[0.2em] uppercase italic">Shears.</Link>
         </div>
         
         <button className="bg-transparent border border-white/20 px-8 py-3 font-sans font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors pointer-events-auto backdrop-blur-md hidden md:block">
            Reserve Chair
         </button>
      </header>

      {/* SPLIT LAYOUT HERO */}
      <main className="min-h-screen flex flex-col lg:flex-row relative z-10">
         
         {/* LEFT TEXT CONTENT */}
         <div className="lg:w-1/2 flex flex-col justify-center px-8 py-32 lg:p-24 relative z-20 bg-[#0A0A0A]">
            <motion.div style={{ y: textY }}>
               <div className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-[#C0A080] mb-8 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-[#C0A080]" /> Est. 2026
               </div>
               
               <h1 className="text-6xl md:text-[7vw] lg:text-[6vw] font-black leading-[0.85] tracking-tighter mb-12 uppercase italic text-white drop-shadow-2xl">
                  Classic <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>Cuts.</span> <br />
                  <span className="not-italic font-normal">Modern Feel.</span>
               </h1>
               
               <p className="text-xl font-light text-white/50 mb-16 max-w-md leading-relaxed">
                  Premium grooming services for the modern gentleman. Precision, style, and our signature hot towel finish.
               </p>

               {/* SERVICES ACCORDION/HOVER */}
               <div className="space-y-4 mb-16 relative">
                  {SERVICES.map((srv, i) => (
                     <div 
                        key={i} 
                        onMouseEnter={() => setHoveredService(i)}
                        onMouseLeave={() => setHoveredService(null)}
                        className={`group border-b border-white/10 pb-6 cursor-pointer transition-all duration-500 ${hoveredService === i ? 'pl-4 border-[#C0A080]' : ''}`}
                     >
                        <div className="flex justify-between items-end mb-2">
                           <h3 className={`text-2xl font-black uppercase tracking-tighter transition-colors duration-500 ${hoveredService === i ? 'text-[#C0A080]' : 'text-white'}`}>
                              {srv.name}
                           </h3>
                           <div className="font-sans text-xl font-light">${srv.price}</div>
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ${hoveredService === i ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                           <p className="font-sans text-sm font-medium text-white/50 pt-2 flex items-center gap-4">
                              <span className="flex items-center gap-1 text-[#C0A080]"><Clock className="w-3 h-3" /> {srv.time}</span>
                              {srv.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               <button className="w-full bg-[#C0A080] text-[#0A0A0A] py-6 font-sans font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-colors flex items-center justify-center gap-4">
                  Book Your Appointment <ArrowRight className="w-4 h-4" />
               </button>
            </motion.div>
         </div>
         
         {/* RIGHT IMAGE PANEL */}
         <div className="lg:w-1/2 relative min-h-[500px] lg:h-screen lg:sticky top-0 overflow-hidden border-l border-white/10">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0 w-full h-full">
               <Image src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&q=80&w=2500" alt="Barber" fill className="object-cover grayscale brightness-75 contrast-125" priority />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent opacity-80" />
            
            {/* Hover Reveal Details */}
            <div className="absolute bottom-12 right-12 text-right pointer-events-none">
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: hoveredService !== null ? 1 : 0, x: hoveredService !== null ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#0A0A0A]/80 backdrop-blur-xl p-6 border border-[#C0A080]/30"
               >
                  {hoveredService !== null && (
                     <>
                        <div className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-[#C0A080] mb-2">Selected</div>
                        <div className="text-3xl font-black uppercase italic tracking-tighter mb-1">{SERVICES[hoveredService].name}</div>
                        <div className="font-sans font-light text-white/50">{SERVICES[hoveredService].time} Session</div>
                     </>
                  )}
               </motion.div>
            </div>
         </div>
      </main>

      {/* FOOTER INFO */}
      <footer className="relative z-20 bg-[#0A0A0A] border-t border-white/10 py-12 px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 font-sans text-xs font-bold uppercase tracking-widest text-white/50">
         <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#C0A080]" /> 123 Heritage Ave, NY
         </div>
         <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#C0A080]" /> Tue-Sun: 9AM - 8PM
         </div>
         <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#C0A080]" /> (555) 019-8372
         </div>
      </footer>
    </div>
  );
}
