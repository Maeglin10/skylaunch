import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumWeb3() {
  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* FLOATING ORBS BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/40 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/30 blur-[120px]"></div>
      </div>

      <header className="relative z-50 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter">NEXUS<span className="text-purple-400">.fi</span></div>
        <nav className="glass px-6 py-3 rounded-full hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-white/70">
            <Link href="#" className="hover:text-white">Protocol</Link>
            <Link href="#" className="hover:text-white">Ecosystem</Link>
            <Link href="#" className="hover:text-white">Governance</Link>
        </nav>
        <button className="bg-white/10 hover:bg-white hover:text-black transition-colors px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">Launch App</button>
      </header>

      <main className="relative z-10">
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-4xl">
                <div className="inline-flex glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-purple-300 mb-8 border border-purple-500/30">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span> Mainnet is Live
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                    Decentralized <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Liquidity Matrix.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light">
                    Next-generation AMM providing institutional-grade liquidity, zero-slippage trades, and cross-chain composability.
                </p>
                <div className="flex gap-4 justify-center">
                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.4)]">Trade Now</button>
                    <button className="glass border border-white/10 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">Read Docs</button>
                </div>
            </motion.div>
        </section>

        <section className="py-32 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { val: "$4.2B", lbl: "Total Value Locked" },
                    { val: "$840M", lbl: "24h Volume" },
                    { val: "124K", lbl: "Active Traders" }
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass p-12 rounded-3xl text-center border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-5xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">{stat.val}</div>
                        <div className="text-xs uppercase tracking-widest font-bold text-white/40">{stat.lbl}</div>
                    </motion.div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}
