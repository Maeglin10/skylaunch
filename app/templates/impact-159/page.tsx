"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function TechEventCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, mins: 42, secs: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="premium-theme bg-[#020205] text-white min-h-screen font-sans selection:bg-purple-500">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-[#020205]/40 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 italic">RE_CON.</Link>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase opacity-40 font-bold"><span>Speakers</span><span>Schedule</span><span>Venue</span></div>
      </nav>

      <main className="relative z-10 pt-40 px-6 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <span className="inline-block px-4 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-400 font-bold tracking-[0.2em] uppercase mb-12 italic">June 24-26, 2026 // Berlin, DE</span>
            <h1 className="text-7xl md:text-[12vw] font-black tracking-tighter leading-[0.8] uppercase italic mb-16">The Future<br/><span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(168,85,247,0.5)" }}>In Sync.</span></h1>
            
            <div className="grid grid-cols-4 gap-4 md:gap-12 mb-20 max-w-3xl mx-auto">
                {[
                    { val: timeLeft.days, unit: "Days" },
                    { val: timeLeft.hours, unit: "Hours" },
                    { val: timeLeft.mins, unit: "Mins" },
                    { val: timeLeft.secs, unit: "Secs" }
                ].map((t, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="text-5xl md:text-8xl font-black italic tracking-tighter tabular-nums text-purple-400">{String(t.val).padStart(2, '0')}</div>
                        <span className="text-[10px] tracking-widest uppercase opacity-40 mt-4 font-bold">{t.unit}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:shadow-[0_0_50px_rgba(147,51,234,0.4)] transition-all">Secure Access</button>
                <button className="px-12 py-5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/5 transition-colors">View Lineup</button>
            </div>
        </motion.div>

        <section className="mt-48 w-full max-w-5xl overflow-hidden rounded-[3rem] border border-white/10 glass p-1">
            <div className="relative aspect-video">
                <Image src="https://images.unsplash.com/photo-1540575861501-7ad058177a33?auto=format&fit=crop&q=80&w=1600" alt="Venue" fill className="object-cover rounded-[2.8rem] opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent" />
            </div>
        </section>
      </main>
    </div>
  );
}
