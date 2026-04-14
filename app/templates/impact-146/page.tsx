"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function CryptoWalletLanding() {
  return (
    <div className="premium-theme bg-[#05050a] text-white min-h-screen font-sans selection:bg-cyan-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-[#05050a]/80 backdrop-blur-2xl border-b border-white/5">
        <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg rotate-12" />
          Velos
        </Link>
        <div className="flex gap-8 text-xs font-medium tracking-wide opacity-60">
          <span>Wallet</span><span>Exchange</span><span>Security</span>
        </div>
        <button className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-cyan-400 transition-colors">Connect</button>
      </nav>

      <main className="pt-40 pb-32 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>
          <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase mb-8">Next-Gen Asset Management</div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Ownership<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Redefined.</span>
          </h1>
          <p className="text-lg opacity-40 max-w-md mb-10 leading-relaxed">The most secure way to store, trade, and manage your digital assets across multiple networks.</p>
          <div className="flex gap-4">
            <button className="px-10 py-4 bg-cyan-500 text-black text-sm font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all">Download Extension</button>
            <button className="px-10 py-4 border border-white/10 text-sm font-bold rounded-2xl hover:border-white/30 transition-colors">Learn More</button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className="relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full" />
          <div className="relative p-1 bg-gradient-to-br from-white/20 to-transparent rounded-[3rem] backdrop-blur-3xl border border-white/10 shadow-2xl">
             <Image src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200" alt="Crypto Dashboard" width={1200} height={800} className="rounded-[2.8rem] opacity-90" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/40 blur-3xl" />
          </div>
        </motion.div>
      </main>

      <section className="px-6 md:px-16 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { label: "Total Volume", value: "$4.2B+" },
            { label: "Active Users", value: "850K" },
            { label: "Networks", value: "12+" },
            { label: "Security Score", value: "99.9" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl text-center">
              <div className="text-sm opacity-40 uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-3xl font-black text-cyan-400">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
