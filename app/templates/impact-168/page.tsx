"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search, Menu, ArrowRight } from "lucide-react";
import "../premium.css";

const PRODUCTS = [
  { name: "HEAVYWEIGHT BOX TEE", price: 45, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000", imgHover: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000" },
  { name: "STRUCTURED OVERSHIRT", price: 120, img: "https://images.unsplash.com/photo-1593998066526-65fcab3021a2?auto=format&fit=crop&q=80&w=1000", imgHover: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000" },
  { name: "EVERYDAY TOTE", price: 65, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000", imgHover: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000" },
  { name: "MINIMAL SNEAKER", price: 150, img: "https://images.unsplash.com/photo-1560769623-688fd61376d2?auto=format&fit=crop&q=80&w=1000", imgHover: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000" },
];

export default function PremiumEcommerce() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="premium-theme bg-[#e5e5e5] text-black min-h-screen font-sans selection:bg-black selection:text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="flex gap-8 items-center pointer-events-auto">
           <Menu className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
           <Search className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer hidden md:block" />
        </div>
        <Link href="/" className="font-black text-3xl tracking-tighter uppercase pointer-events-auto">BASICS.</Link>
        <div className="flex gap-8 items-center pointer-events-auto">
           <div className="hidden md:flex gap-6 text-[10px] uppercase font-bold tracking-[0.2em]">
              <span className="hover:underline cursor-pointer">Shop</span>
              <span className="hover:underline cursor-pointer">Archive</span>
           </div>
           <button className="flex items-center gap-2 hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] font-bold">[2]</span>
           </button>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="fixed top-1/2 left-0 w-full -translate-y-1/2 z-0 opacity-[0.03] overflow-hidden whitespace-nowrap pointer-events-none mix-blend-difference">
         <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="text-[30vw] font-black uppercase tracking-tighter leading-none inline-block">
            BASICS. BASICS. BASICS. BASICS.
         </motion.div>
      </div>

      {/* HERO BANNER */}
      <section className="relative w-full h-[90vh] md:h-screen p-4 md:p-8 pt-24 md:pt-8 z-10">
         <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black">
            <motion.div style={{ y }} className="absolute inset-0">
               <Image src="https://images.unsplash.com/photo-1445205170230-053b830160b0?auto=format&fit=crop&q=80&w=2500" alt="Collection" fill className="object-cover opacity-70" priority />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
               <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block border border-white/30 px-6 py-2 rounded-full backdrop-blur-sm">
                  Collection_001
               </motion.span>
               <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] mb-12">
                  The Autumn <br /> Silhouette.
               </motion.h1>
               <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition-colors shadow-2xl">
                  Explore Collection
               </motion.button>
            </div>
         </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="relative z-10 py-32 px-4 md:px-8 max-w-[1800px] mx-auto bg-[#e5e5e5]">
         <div className="flex justify-between items-end mb-16 px-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Selected Items</h2>
            <Link href="#" className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:underline">
               View Complete Catalog <ArrowRight className="w-4 h-4" />
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {PRODUCTS.map((p, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative cursor-pointer"
               >
                  <div className="relative aspect-[3/4] bg-[#d5d5d5] rounded-[1.5rem] overflow-hidden mb-6">
                     <Image src={p.img} alt={p.name} fill className="object-cover transition-opacity duration-700 group-hover:opacity-0" />
                     <Image src={p.imgHover} alt={p.name + " alternate"} fill className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 scale-105" />
                     
                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                        +
                     </div>
                     
                     <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="bg-black/80 backdrop-blur-md text-white flex justify-between p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                           <span>Size: S / M / L</span>
                           <span className="hover:text-gray-400">Add to Cart</span>
                        </div>
                     </div>
                  </div>
                  <div className="px-2 flex justify-between items-start">
                     <div>
                        <h3 className="font-black text-sm md:text-base uppercase tracking-tight mb-1">{p.name}</h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Essential Series</p>
                     </div>
                     <div className="font-black">${p.price}</div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER BANNER */}
      <section className="relative z-10 p-4 md:p-8 pb-12">
         <div className="bg-black text-white rounded-[2rem] p-12 md:p-32 text-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
            <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">Less, but <br/> Better.</h2>
            <div className="flex justify-center gap-4">
               <input type="email" placeholder="JOIN THE LIST" className="bg-transparent border-b-2 border-white/30 px-4 py-2 text-center text-sm font-bold uppercase tracking-widest outline-none focus:border-white transition-colors placeholder:text-white/30" />
               <button className="bg-white text-black px-6 py-2 font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors">Submit</button>
            </div>
         </div>
      </section>

    </div>
  );
}
