"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function GlassmorphismDashboard() {
  return (
    <div className="premium-theme bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white h-screen w-full overflow-hidden relative font-sans selection:bg-violet-400">
      <div className="absolute inset-0 opacity-30">
        <Image src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1600" alt="Gradient" fill className="object-cover blur-3xl" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tight"><span className="text-violet-400">◆</span> Prism</Link>
        <div className="flex gap-4 text-xs tracking-wide opacity-60 items-center"><span>Dashboard</span><span>Settings</span></div>
      </nav>
      <main className="relative z-10 h-full flex items-center px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="md:col-span-2 md:row-span-2 p-8 bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl">
            <span className="text-xs tracking-widest uppercase opacity-40 block mb-4">Revenue Overview</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-2">$284,920</h2>
            <span className="text-emerald-400 text-sm">↑ 24.5% from last month</span>
            <div className="mt-8 flex items-end gap-2 h-32">
              {[40,65,45,80,55,90,70,95,60,85,75,100].map((h,i) => (
                <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i*0.05, duration: 0.8 }}
                  className="flex-1 bg-violet-500/30 rounded-t-lg hover:bg-violet-500/60 transition-colors" />
              ))}
            </div>
          </motion.div>
          {[
            { label: "Active Users", val: "12,847", change: "+18%", color: "text-emerald-400" },
            { label: "Conversion", val: "3.42%", change: "+0.8%", color: "text-sky-400" },
            { label: "Avg Session", val: "4m 23s", change: "-12s", color: "text-amber-400" },
            { label: "Bounce Rate", val: "24.1%", change: "-3.2%", color: "text-rose-400" },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}
              className="p-6 bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-3xl">
              <span className="text-[10px] tracking-widest uppercase opacity-40 block mb-3">{card.label}</span>
              <div className="text-2xl font-bold mb-1">{card.val}</div>
              <span className={`text-xs ${card.color}`}>{card.change}</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
