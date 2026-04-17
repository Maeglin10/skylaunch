import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function PremiumFintech() {
  return (
    <div className="bg-[#030712] text-white min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      {/* ORB BACKGROUND */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* HEADER */}
      <header className="px-6 py-6 border-b border-white/5 bg-[#030712]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">V</div>
                <div className="font-bold text-xl tracking-tight">Vault</div>
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-400">
                <Link href="#" className="hover:text-white transition">Product</Link>
                <Link href="#" className="hover:text-white transition">Company</Link>
                <Link href="#" className="hover:text-white transition">Resources</Link>
            </nav>
            <div className="flex gap-4 items-center">
                <Link href="#" className="text-sm font-semibold text-gray-300 hover:text-white">Sign In</Link>
                <button className="bg-white text-black px-5 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-white/20 transition-all">Get Started</button>
            </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 py-24 md:py-32 text-center max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span> Vault 2.0 is Here
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
                Banking for the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Next Generation.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Seamless global transfers, intelligent wealth management, and crystal-clear analytics. Your financial life, simplified.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">Open Free Account</button>
                <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">See How it Works</button>
            </div>
        </motion.div>

        {/* DASHBOARD MOCKUP */}
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }} className="mt-24 relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#0a0f1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 text-left">
                {/* Mock UI */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 mb-1">Total Balance</div>
                        <div className="text-4xl font-bold text-white">$124,532.00</div>
                    </div>
                    <div className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full text-sm">+2.4% Today</div>
                </div>
                <div className="h-48 flex items-end justify-between gap-2">
                    {/* Simulated chart */}
                    {[20, 30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 100].map((h, i) => (
                        <div key={i} className="w-full bg-gradient-to-t from-blue-600 to-emerald-400 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.5 + (i * 0.05) }}></div>
                    ))}
                </div>
            </div>
        </motion.div>
      </section>
    </div>
  );
}
