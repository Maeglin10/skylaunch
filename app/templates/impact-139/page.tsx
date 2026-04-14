"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function AutomotiveHero() {
  return (
    <div className="premium-theme bg-[#0c0c0c] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-red-600">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1600" alt="Car" fill className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter">APEX</Link>
        <div className="flex gap-8 text-xs tracking-[0.3em] uppercase opacity-50"><span>Models</span><span>Configure</span><span>Dealers</span></div>
      </nav>
      <main className="relative z-10 h-full flex items-end pb-20 px-8 md:px-16">
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="max-w-2xl">
          <span className="text-red-500 text-xs tracking-[0.5em] uppercase block mb-4">The All-New 2026</span>
          <h1 className="text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.85] mb-6">PHANTOM<br/>GT-R</h1>
          <div className="flex gap-12 mb-10 text-xs tracking-[0.2em] uppercase opacity-40">
            <div><span className="block text-3xl text-white font-bold mb-1">820</span>Horsepower</div>
            <div><span className="block text-3xl text-white font-bold mb-1">2.4s</span>0-100 km/h</div>
            <div><span className="block text-3xl text-white font-bold mb-1">342</span>km/h Top Speed</div>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-red-600 text-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-red-500 transition-colors">Configure Yours</button>
            <button className="px-8 py-4 border border-white/20 text-xs tracking-[0.3em] uppercase hover:border-white/50 transition-colors">Book Test Drive</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
