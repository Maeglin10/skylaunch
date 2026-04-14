"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../premium.css";

export default function DynamicCountdownHero() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 7);
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="premium-theme bg-[#0d0d12] text-white h-screen w-full overflow-hidden relative font-mono selection:bg-fuchsia-500">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <nav className="fixed top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center bg-[#0d0d12]/80 backdrop-blur-xl border-b border-fuchsia-500/10">
        <Link href="/" className="text-lg font-bold tracking-tight text-fuchsia-400">DROP.OS</Link>
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Event Countdown</span>
      </nav>
      <main className="h-full flex flex-col items-center justify-center relative z-10 px-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="text-center">
          <span className="text-fuchsia-400/60 text-xs tracking-[1em] uppercase block mb-12">Next Drop In</span>
          <div className="flex gap-4 md:gap-8 mb-16">
            {[{ label: "HRS", val: time.h }, { label: "MIN", val: time.m }, { label: "SEC", val: time.s }].map((u) => (
              <div key={u.label} className="w-28 md:w-40">
                <motion.div key={u.val} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-9xl font-black text-white tabular-nums">{String(u.val).padStart(2, "0")}</motion.div>
                <span className="text-[10px] tracking-[0.5em] text-fuchsia-400/40 uppercase">{u.label}</span>
              </div>
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">EXCLUSIVE COLLECTION</h2>
          <p className="text-xs opacity-40 max-w-md mx-auto mb-10 tracking-wide">Limited edition release. 200 pieces worldwide. No restocks.</p>
          <button className="px-10 py-5 bg-fuchsia-500 text-white text-xs font-bold tracking-[0.4em] uppercase hover:bg-fuchsia-400 transition-colors">Get Notified</button>
        </motion.div>
      </main>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
    </div>
  );
}
