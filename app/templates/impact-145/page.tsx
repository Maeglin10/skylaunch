"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PodcastLanding() {
  const episodes = [
    { num: "042", title: "The Architecture of Sound", guest: "James Blake", dur: "58 min", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400" },
    { num: "041", title: "Digital Nomad Economy", guest: "Pieter Levels", dur: "1h 12min", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400" },
    { num: "040", title: "Designing for Emotion", guest: "Aarron Walter", dur: "45 min", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="premium-theme bg-[#1a1a2e] text-white min-h-screen font-sans selection:bg-yellow-400 selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#1a1a2e]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-lg font-bold tracking-tight">🎙 Deepcast</Link>
        <button className="px-5 py-2.5 bg-yellow-400 text-black rounded-full text-xs font-bold tracking-wide">Subscribe</button>
      </nav>
      <main className="pt-36 pb-32 px-6 md:px-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-20">
          <span className="text-yellow-400 text-xs tracking-[0.5em] uppercase block mb-6">Weekly Conversations</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">Stories that<br/><span className="text-yellow-400">resonate.</span></h1>
          <p className="text-sm opacity-40 max-w-md mx-auto">Long-form interviews with the minds shaping culture, technology, and design.</p>
        </motion.div>
        <div className="space-y-4">
          {episodes.map((ep, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-5 p-5 bg-white/[0.04] border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors group cursor-pointer">
              <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                <Image src={ep.img} alt={ep.title} width={128} height={128} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-yellow-400/60 tracking-widest uppercase block mb-1">EP {ep.num} • {ep.guest}</span>
                <h3 className="text-base font-semibold truncate">{ep.title}</h3>
              </div>
              <span className="text-xs opacity-30 flex-shrink-0">{ep.dur}</span>
              <button className="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">▶</button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
