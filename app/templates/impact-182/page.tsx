"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Wind, Coffee, ArrowRight } from "lucide-react";
import "../premium.css";

const ROOMS = [
  { img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200", title: "The Panorama Suite", desc: "Floor-to-ceiling windows offering breathtaking city views, curated mid-century furnishings, and an oversized soaking tub." },
  { img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", title: "The Heritage Room", desc: "Classic architectural details meet modern luxury, featuring original hardwood floors and bespoke linens." }
];

export default function PremiumHotel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#F9F8F6] text-[#1A1A1A] min-h-screen font-serif selection:bg-[#B5A48B] selection:text-white">
      
      {/* FIXED HEADER */}
      <header className="fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="text-3xl font-normal tracking-[0.2em] uppercase">The Grand.</Link>
        <button className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white pb-1 hover:text-[#B5A48B] hover:border-[#B5A48B] transition-colors">
           Menu
        </button>
      </header>

      {/* FULLSCREEN PARALLAX HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1542314831-c6a4d42171ae?auto=format&fit=crop&q=80&w=2500" alt="Hotel Interior" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, y: textY }} className="relative z-10 text-center text-white px-6 w-full max-w-[1200px]">
            <div className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-[#B5A48B]">Welcome to Sanctuary</div>
            <h1 className="text-6xl md:text-[10vw] font-light tracking-tighter leading-[0.85] mb-12 drop-shadow-2xl">
               Refined <span className="italic font-normal">Elegance.</span>
            </h1>
            <button className="border border-white/30 bg-white/5 backdrop-blur-md px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
               Reserve Your Stay
            </button>
        </motion.div>
      </section>

      {/* INTRO PARALLAX TEXT */}
      <section className="py-32 md:py-48 px-8 max-w-5xl mx-auto text-center relative z-20 bg-[#F9F8F6]">
        <Compass className="w-8 h-8 mx-auto text-[#B5A48B] mb-12" />
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.3] mb-16 text-[#1A1A1A]">
            "A sanctuary of quiet luxury where classic architecture meets contemporary comfort."
        </h2>
        <div className="w-px h-32 bg-gradient-to-b from-[#1A1A1A] to-transparent mx-auto" />
      </section>

      {/* AMENITIES STRIP */}
      <section className="border-y border-[#1A1A1A]/10 py-16 px-8 bg-white">
         <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between gap-12 font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-[#1A1A1A]/50">
            <div className="flex items-center gap-4"><Coffee className="w-4 h-4 text-[#B5A48B]" /> Michelin Dining</div>
            <div className="flex items-center gap-4"><Wind className="w-4 h-4 text-[#B5A48B]" /> Thermal Spa</div>
            <div className="flex items-center gap-4"><Compass className="w-4 h-4 text-[#B5A48B]" /> Concierge Service</div>
         </div>
      </section>

      {/* ROOMS SHOWCASE */}
      <section className="py-32 px-8 max-w-[1600px] mx-auto">
        <div className="space-y-32">
            {ROOMS.map((room, i) => (
               <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
                  
                  {/* Image with Parallax Reveal */}
                  <motion.div 
                     initial={{ opacity: 0, clipPath: "inset(20% 20% 20% 20%)" }}
                     whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                     className="w-full md:w-1/2 relative aspect-[3/4] lg:aspect-[4/5] group overflow-hidden"
                  >
                     <Image src={room.img} alt={room.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  </motion.div>
                  
                  {/* Text Content */}
                  <motion.div 
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className="w-full md:w-1/2 max-w-lg"
                  >
                     <div className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-[#B5A48B] mb-6">Signature Collection</div>
                     <h3 className="text-5xl lg:text-7xl font-light tracking-tighter mb-8 leading-none">
                        {room.title.split(' ')[0]} <br/> <span className="italic font-normal">{room.title.split(' ').slice(1).join(' ')}</span>
                     </h3>
                     <p className="text-lg text-[#1A1A1A]/60 leading-relaxed font-sans font-light mb-12">
                        {room.desc}
                     </p>
                     
                     <button className="flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.3em] font-bold border-b border-[#1A1A1A] pb-2 hover:text-[#B5A48B] hover:border-[#B5A48B] transition-colors group">
                        Discover More <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                     </button>
                  </motion.div>

               </div>
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-[#F9F8F6] pt-32 pb-12 px-8">
         <div className="max-w-[1600px] mx-auto text-center">
            <h2 className="text-4xl md:text-[6vw] font-light tracking-widest uppercase mb-12 opacity-20">The Grand.</h2>
            <div className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-[#F9F8F6]/40 flex justify-center gap-12">
               <span>Paris</span>
               <span>London</span>
               <span>New York</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
