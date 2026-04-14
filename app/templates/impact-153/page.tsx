"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

const TEAM = [
  { name: "Elena Volkov", role: "Design Lead", bio: "Sculpting digital experiences for 12+ years.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
  { name: "Marcus Thorne", role: "CTO", bio: "Pioneering distributed ledger technologies.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  { name: "Sarah J. Lin", role: "Product", bio: "Bridging the gap between code and community.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { name: "David Chen", role: "Engineer", bio: "Obsessed with low-latency performance tuning.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Aria Voss", role: "Research", bio: "Synthesizing human behavior into UX logic.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
  { name: "Leo Rossi", role: "Operations", bio: "Architecting scalable infrastructure flows.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
];

export default function StartupTeamGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="premium-theme bg-[#080808] text-white min-h-screen font-sans selection:bg-indigo-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-lg font-bold tracking-tight">VÉLOCE_SYSTEMS</Link>
        <div className="hidden md:flex gap-8 text-[10px] tracking-widest uppercase opacity-40">
            <span>Mission</span><span>Careers</span><span>Contact</span>
        </div>
      </nav>

      <main className="pt-40 px-6 pb-32 max-w-6xl mx-auto">
        <header className="mb-24">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-indigo-400 text-xs tracking-[0.5em] uppercase block mb-6">Humans Behind the Machine</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">Meet the<br/>Architects.</motion.h1>
            <p className="text-lg opacity-40 max-w-md leading-relaxed">A diverse collective of engineers, designers, and dreamers building the next evolution of the web.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {TEAM.map((m, i) => (
                <motion.div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl cursor-crosshair group bg-white/5">
                    <Image src={m.img} alt={m.name} fill className={`object-cover transition-all duration-700 ${hovered === i ? "scale-105 saturate-100" : "grayscale opacity-40 scale-100"}`} />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                        <div className="transition-all duration-500 transform translate-y-0 group-hover:-translate-y-2">
                            <span className="text-[10px] tracking-widest uppercase text-indigo-400 font-bold block mb-2">{m.role}</span>
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{m.name}</h3 >
                            <AnimatePresence>
                                {hovered === i && (
                                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs opacity-60 leading-relaxed overflow-hidden">
                                        {m.bio}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </main>
    </div>
  );
}
