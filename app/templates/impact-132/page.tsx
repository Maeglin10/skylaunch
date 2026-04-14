"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PROJECTS = [
  { title: "TERRA", year: "2025", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800", cat: "Architecture" },
  { title: "AQUA", year: "2024", img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800", cat: "Interior" },
  { title: "IGNIS", year: "2024", img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=800", cat: "Installation" },
  { title: "VENTUS", year: "2023", img: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=800", cat: "Landscape" },
];

export default function PortfolioAlternatingRows() {
  return (
    <div className="premium-theme bg-white text-[#1a1a1a] min-h-screen font-sans selection:bg-stone-400">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-lg font-medium tracking-tight">Elementum</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-30">Portfolio</span>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="space-y-24">
          {PROJECTS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
              <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-xl">
                  <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
              <div className={`${i % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                <span className="text-xs tracking-[0.5em] uppercase opacity-30 block mb-4">{p.cat} — {p.year}</span>
                <h2 className="text-5xl md:text-8xl font-extralight tracking-wider mb-4">{p.title}</h2>
                <div className={`w-16 h-[1px] bg-black/10 my-6 ${i % 2 === 1 ? "md:ml-auto" : ""}`} />
                <p className="text-sm opacity-40 leading-relaxed max-w-sm">An exploration of form and material in dialogue with the natural environment.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
