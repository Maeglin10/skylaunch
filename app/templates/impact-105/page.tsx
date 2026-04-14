"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const SLIDES = [
  { id: 1, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600", title: "Villa Meridian", location: "Malibu, CA", price: "$12.5M", beds: 6, sqft: "8,200" },
  { id: 2, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600", title: "Haus Elysium", location: "Zurich, CH", price: "CHF 9.8M", beds: 5, sqft: "6,400" },
  { id: 3, img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1600", title: "Le Domaine", location: "Provence, FR", price: "€7.2M", beds: 8, sqft: "12,000" },
];

export default function RealEstateCinematicSlider() {
  const [idx, setIdx] = useState(0);
  const s = SLIDES[idx];
  return (
    <div className="premium-theme bg-[#0c0c0c] text-white h-screen w-full overflow-hidden relative font-sans">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0">
          <Image src={s.img} alt={s.title} fill className="object-cover brightness-[0.4]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10" />
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg tracking-[0.4em] uppercase font-light">Elysium Estates</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Private Collection</span>
      </nav>
      <main className="relative z-20 h-full flex items-end p-8 md:p-16 pb-24">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 1, delay: 0.3 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.8em] uppercase opacity-40 block mb-4">{s.location}</span>
            <h1 className="text-5xl md:text-8xl font-extralight tracking-wide mb-6">{s.title}</h1>
            <div className="flex gap-8 mb-8 text-xs tracking-[0.3em] uppercase opacity-50">
              <span>{s.beds} Bedrooms</span><span>{s.sqft} sqft</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-3xl font-extralight tracking-wider">{s.price}</span>
              <button className="px-8 py-4 border border-white/30 text-xs tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all">Request Visit</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="absolute bottom-8 right-8 md:right-16 z-30 flex gap-4">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-12 h-1 transition-all ${i === idx ? "bg-white" : "bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}
