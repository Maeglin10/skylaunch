"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const PROJECTS = [
  { id: 1, title: "Museum of Light", loc: "Berlin", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Static Pavilion", loc: "Tokyo", img: "https://images.unsplash.com/photo-1503387762-592da58efbb3?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Glass Horizon", loc: "Dubai", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
];

export default function MinimalArchPortfolio() {
  return (
    <div className="premium-theme bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-black/5">
        <Link href="/" className="text-sm font-bold tracking-[0.4em] uppercase">VOID_ARCH</Link>
        <span className="text-[10px] tracking-widest uppercase opacity-40">Selected Projects 2026</span>
      </nav>

      <main className="pt-40 px-8 pb-32 max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-[12vw] font-black tracking-tighter leading-[0.8] mb-24 grayscale">
          FORM<br/>FOLLOWS<br/>FUNCTION.
        </motion.h1>

        <div className="space-y-32">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="group cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl">
                  <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div>
                  <span className="text-xs tracking-widest uppercase opacity-40 block mb-4">{String(i + 1).padStart(2, '0')} — {p.loc}</span>
                  <h2 className="text-5xl font-black tracking-tighter mb-8">{p.title}</h2>
                  <p className="text-sm opacity-50 leading-relaxed max-w-sm mb-10">An exploration of volumetric purity and the interaction between concrete, glass, and natural illumination.</p>
                  <button className="text-xs font-bold tracking-widest uppercase border-b-2 border-black pb-2 group-hover:tracking-[0.2em] transition-all">View Case Study</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
