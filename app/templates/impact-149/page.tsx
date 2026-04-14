"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const ITEMS = [
  { id: 1, name: "Archi Lounge", designer: "K. Nielsen", img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800", price: "$2,840" },
  { id: 2, name: "Modul Dining", designer: "M. Rossi", img: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&q=80&w=800", price: "$4,120" },
  { id: 3, name: "Zenith Sofa", designer: "S. Chen", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", price: "$6,900" },
];

export default function FurnitureShowcase() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((prev) => (prev + 1) % ITEMS.length);

  return (
    <div className="premium-theme bg-[#121212] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-stone-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-black/40 backdrop-blur-xl">
        <Link href="/" className="text-lg font-black tracking-tighter italic">NØRDIC.</Link>
        <span className="text-[10px] tracking-widest uppercase opacity-40">2026 Collection</span>
      </nav>

      <div className="h-full flex items-center justify-center relative px-8">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.9, rotateX: 20 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 1.1, rotateX: -20 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl shadow-black">
              <Image src={ITEMS[idx].img} alt={ITEMS[idx].name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
            </div>
            
            <div className="space-y-8">
              <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-xs uppercase tracking-[0.5em] text-stone-500 font-bold block">Designed by {ITEMS[idx].designer}</motion.span>
              <motion.h2 initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none">{ITEMS[idx].name}</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg opacity-40 leading-relaxed max-w-sm">A sculptural statement piece that marries ergonomic comfort with avant-garde aesthetics.</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex items-center gap-12">
                <span className="text-3xl font-bold italic">{ITEMS[idx].price}</span>
                <button className="px-10 py-4 bg-white text-black text-xs font-black tracking-widest uppercase rounded-full hover:scale-110 transition-transform">Inquire</button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-12 right-12 flex gap-4">
          <button onClick={next} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
