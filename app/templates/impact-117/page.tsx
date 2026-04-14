"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const CARDS = [
  { id: 1, title: "Solaris", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800", tag: "Exploration" },
  { id: 2, title: "Nebula", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800", tag: "Research" },
  { id: 3, title: "Quasar", img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=800", tag: "Discovery" },
];

export default function ExpandingCardCarousel() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#06060e] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-orange-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#06060e]/60 backdrop-blur-xl">
        <Link href="/" className="text-lg font-bold tracking-tight text-orange-400">STELLAR</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Carousel v.117</span>
      </nav>
      <main className="h-full flex items-center justify-center px-4 md:px-16">
        <div className="flex gap-4 w-full max-w-6xl h-[70vh]">
          {CARDS.map((card) => (
            <motion.div key={card.id} layout onClick={() => setActive(active === card.id ? null : card.id)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ${active === card.id ? "flex-[4]" : "flex-1"}`}>
              <Image src={card.img} alt={card.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <AnimatePresence>
                  {active === card.id && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400 text-xs tracking-[0.5em] uppercase block mb-3">{card.tag}</motion.span>
                  )}
                </AnimatePresence>
                <h3 className={`font-bold tracking-tight transition-all duration-500 ${active === card.id ? "text-5xl md:text-7xl" : "text-xl"}`}>{card.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
