"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function MusicPlayerHero() {
  return (
    <div className="premium-theme bg-gradient-to-b from-[#1a0a2e] to-[#0a0a0a] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-purple-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tight text-purple-300">SONIC</Link>
        <div className="flex gap-6 text-xs tracking-widest uppercase opacity-50"><span>Library</span><span>Discover</span></div>
      </nav>
      <main className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="relative w-64 md:w-80 aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(147,51,234,0.3)] mb-12">
          <Image src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800" alt="Album" fill className="object-cover" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-purple-500/20 rounded-[3rem]" />
        </motion.div>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">Midnight Eclipse</h2>
        <p className="text-sm text-purple-300/60 mb-8">Aurora Synthetics</p>
        <div className="w-full max-w-sm mb-6">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden"><motion.div initial={{ width: "0%" }} animate={{ width: "45%" }} transition={{ duration: 3 }} className="h-full bg-purple-500 rounded-full" /></div>
          <div className="flex justify-between mt-2 text-[10px] opacity-30"><span>1:42</span><span>3:48</span></div>
        </div>
        <div className="flex items-center gap-8">
          <button className="text-2xl opacity-40 hover:opacity-100 transition-opacity">⏮</button>
          <button className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform shadow-[0_0_40px_rgba(147,51,234,0.4)]">▶</button>
          <button className="text-2xl opacity-40 hover:opacity-100 transition-opacity">⏭</button>
        </div>
      </main>
    </div>
  );
}
