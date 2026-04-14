"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function NeonGlowHero() {
  return (
    <div className="premium-theme bg-[#0a0a0a] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-pink-500">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600" alt="Concert" fill className="object-cover opacity-40 saturate-150" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-black tracking-tighter text-pink-400">PULSE</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-50"><span>Events</span><span>Artists</span><span>Tickets</span></div>
      </nav>
      <main className="relative z-10 h-full flex items-center px-8 md:px-16">
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
            <span className="text-pink-400 text-xs tracking-[0.5em] uppercase">Live Now</span>
          </div>
          <h1 className="text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.85] mb-8">
            ELECTRIC<br/>NIGHTS<br/><span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(236,72,153,0.6)" }}>FESTIVAL</span>
          </h1>
          <p className="text-sm opacity-40 max-w-md mb-10">Three days of immersive sound, light, and connection. June 14-16, 2026.</p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-pink-500 text-white text-xs font-bold tracking-[0.3em] uppercase hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-shadow">Get Tickets</button>
            <button className="px-8 py-4 border border-pink-500/30 text-pink-300 text-xs tracking-[0.3em] uppercase hover:border-pink-500 transition-colors">Lineup</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
