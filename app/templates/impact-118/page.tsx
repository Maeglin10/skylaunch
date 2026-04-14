"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function ArchitecturalBlueprintHero() {
  return (
    <div className="premium-theme bg-[#0a1628] text-[#8cb4e0] h-screen w-full overflow-hidden relative font-mono selection:bg-sky-400 selection:text-black">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#8cb4e0 1px, transparent 1px), linear-gradient(90deg, #8cb4e0 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tight text-sky-300">FORMWERK</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Blueprint Series</span>
      </nav>
      <main className="h-full grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>
          <span className="text-xs tracking-[0.8em] uppercase opacity-40 block mb-6">Residential Complex 04</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-white mb-8">HAUS<br/>ELEVA<br/><span className="text-sky-400">TION.</span></h1>
          <div className="flex gap-8 text-xs tracking-[0.3em] uppercase opacity-50 mb-10">
            <div><span className="block text-2xl text-white font-bold mb-1">240</span>Units</div>
            <div><span className="block text-2xl text-white font-bold mb-1">38</span>Floors</div>
            <div><span className="block text-2xl text-white font-bold mb-1">2027</span>Delivery</div>
          </div>
          <button className="px-8 py-4 border border-sky-400/30 text-sky-300 text-xs tracking-[0.4em] uppercase hover:bg-sky-400 hover:text-[#0a1628] transition-all">View Plans</button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="hidden md:block">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-sky-400/10">
            <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800" alt="Architecture" fill className="object-cover opacity-60 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1628]" />
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 500">
              <line x1="200" y1="0" x2="200" y2="500" stroke="#8cb4e0" strokeWidth="0.5" />
              <line x1="0" y1="250" x2="400" y2="250" stroke="#8cb4e0" strokeWidth="0.5" />
              <circle cx="200" cy="250" r="80" fill="none" stroke="#8cb4e0" strokeWidth="0.5" />
            </svg>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
