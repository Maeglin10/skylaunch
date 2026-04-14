"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EditorialLuxTemplate() {
  return (
    <div className="premium-theme bg-[#fdfcf9] text-[#1a1a1a] min-h-screen selection:bg-[#d4b483]">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-end border-b border-black/5 bg-white/50 backdrop-blur-md">
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold">
          <a href="#" className="hover:text-[#d4b483] transition-colors">Spring / 26</a>
          <a href="#" className="hover:text-[#d4b483] transition-colors">Archive</a>
        </div>
        <Link href="/" className="text-4xl font-serif italic tracking-tighter absolute left-1/2 -translate-x-1/2">
          Mavelle
        </Link>
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold">
          <a href="#" className="hover:text-[#d4b483] transition-colors">Atelier</a>
          <a href="#" className="hover:text-[#d4b483] transition-colors">Account (0)</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-12 pt-48 pb-24 grid grid-cols-12 gap-12">
        {/* Left Column - Text content */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center pt-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.5em] opacity-40 mb-6 block font-bold">The Ethereal Collection</span>
            <h1 className="text-8xl md:text-[10rem] font-serif leading-[0.85] mb-12 tracking-tighter">
              Timeless <br />
              <span className="italic">Essence.</span>
            </h1>
            <p className="text-xl font-light leading-relaxed max-w-md opacity-70 mb-12">
              Discover the new collection where heritage meets the avant-garde. A symphony of gold and silk, crafted for those who define the moment.
            </p>
            <button className="group relative flex items-center gap-6 text-sm uppercase tracking-[0.3em] font-bold">
              <span className="bg-[#1a1a1a] text-white px-8 py-5 group-hover:bg-[#d4b483] transition-colors">Explore Selection</span>
              <div className="w-12 h-[1px] bg-black/20 group-hover:w-24 transition-all duration-500"></div>
            </button>
          </motion.div>
        </div>

        {/* Right Column - Hero Image */}
        <div className="col-span-12 lg:col-span-7 relative h-[80vh] bg-[#f0ede6] overflow-hidden group">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src="/templates/editorial_lux.png"
              alt="Luxury Watch"
              fill
              className="object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-1000"
            />
          </motion.div>
          
          {/* Circular Badge Overlay */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-black/10 flex items-center justify-center p-8 bg-[#fdfcf9]/80 backdrop-blur-sm shadow-xl"
          >
            <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-center leading-tight">
              Crafted in Geneve • Est. 1984 • Authentic Legacy •
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-48 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-24">
           <div className="w-full md:w-1/3 aspect-[3/4] bg-[#f5f5f5] relative overflow-hidden">
             <Image
                src="/templates/editorial_lux.png"
                alt="Detail view"
                fill
                className="object-cover opacity-40 mix-blend-multiply"
              />
           </div>
           <div className="w-full md:w-2/3">
              <h2 className="text-6xl font-serif mb-12 leading-tight">Precision. <br /> In Every <span className="italic">Gilded</span> Second.</h2>
              <div className="grid grid-cols-2 gap-12">
                <div>
                   <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Master Craftsmanship</h3>
                   <p className="opacity-60 leading-relaxed uppercase text-xs tracking-wider">Over 400 hours of manual assembly for each timepiece in the collection.</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Sustainable Luxury</h3>
                   <p className="opacity-60 leading-relaxed uppercase text-xs tracking-wider">Responsibly sourced materials, traceably harvested for a better tomorrow.</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Full Width Impact */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
         <motion.div 
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="z-10 text-center"
         >
            <h2 className="text-[15vw] font-serif italic tracking-tighter leading-none text-white drop-shadow-2xl mix-blend-difference">Aura</h2>
            <button className="mt-8 text-xs uppercase tracking-[0.8em] font-bold border-b border-black/20 pb-4">View Campaign</button>
         </motion.div>
         <Image
            src="/templates/editorial_lux.png"
            alt="Full background"
            fill
            className="object-cover fixed top-0 left-0 -z-10 brightness-75 scale-110"
          />
      </section>

      <footer className="bg-[#1a1a1a] text-white py-32 px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-24 mb-24">
          <div className="col-span-2">
            <h2 className="text-5xl font-serif italic mb-8">Mavelle</h2>
            <p className="opacity-40 max-w-sm">Elevating the everyday through exceptional design and uncompromising quality.</p>
          </div>
          <div>
            <h4 className="uppercase text-[10px] tracking-widest font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 opacity-60 text-sm">
              <li><a href="#">Collections</a></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Bespoke</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-[10px] tracking-widest font-bold mb-8">Connect</h4>
            <ul className="space-y-4 opacity-60 text-sm">
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest opacity-20">
          <span>&copy; 2026 MAVELLE KORR</span>
          <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
}
