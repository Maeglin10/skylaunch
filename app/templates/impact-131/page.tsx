"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function WineShowcaseHero() {
  return (
    <div className="premium-theme bg-[#1a0f0f] text-[#e8d5c4] h-screen w-full overflow-hidden relative font-serif selection:bg-red-800">
      <div className="absolute inset-0 opacity-20">
        <Image src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=1600" alt="Vineyard" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f0f] via-[#1a0f0f]/80 to-transparent" />
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-light tracking-[0.5em] uppercase text-red-300/60">Domaine</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-30">Grand Cru 2024</span>
      </nav>
      <main className="relative z-10 h-full grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }}>
          <span className="text-[10px] tracking-[1em] uppercase opacity-30 block mb-6">Château de la Vallée</span>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-wide leading-tight mb-6">Cuvée<br/>Prestige</h1>
          <div className="w-16 h-[1px] bg-red-400/20 mb-6" />
          <p className="text-sm font-light leading-relaxed opacity-50 max-w-sm mb-10">A masterful blend of Cabernet Sauvignon and Merlot from our oldest vines, aged 24 months in French oak.</p>
          <div className="flex gap-6 items-center">
            <span className="text-3xl font-light tracking-wider">€420</span>
            <button className="px-8 py-4 bg-red-800/40 border border-red-400/20 text-xs tracking-[0.4em] uppercase hover:bg-red-800 transition-colors">Order Now</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.5 }} className="hidden md:flex justify-center">
          <div className="relative w-48 aspect-[1/3]">
            <Image src="https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?auto=format&fit=crop&q=80&w=400" alt="Wine Bottle" fill className="object-contain drop-shadow-2xl" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
