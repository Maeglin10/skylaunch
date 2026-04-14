"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function OnepageSaasLanding() {
  return (
    <div className="premium-theme bg-[#08080f] text-white min-h-screen font-sans selection:bg-violet-500">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-[#08080f]/80 backdrop-blur-2xl border-b border-white/5">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-violet-400">●</span> Nexus
        </Link>
        <div className="flex gap-6 text-xs tracking-wide opacity-60 items-center">
          <span>Features</span><span>Pricing</span>
          <button className="px-5 py-2.5 bg-violet-500 text-white rounded-full text-xs font-semibold tracking-wide hover:bg-violet-400 transition-colors">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-16 text-center relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs text-violet-300 tracking-wide mb-8">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" /> Now in Beta
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] mb-6 max-w-4xl mx-auto">
            Your workflow,<br/><span className="text-violet-400">supercharged.</span>
          </h1>
          <p className="text-base md:text-lg opacity-40 max-w-xl mx-auto mb-10">Ship faster with AI-powered tools that integrate seamlessly into your existing stack.</p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-violet-500 text-white text-sm font-semibold rounded-xl hover:bg-violet-400 transition-colors">Start Free Trial</button>
            <button className="px-8 py-4 border border-white/10 text-sm rounded-xl hover:border-white/30 transition-colors">Watch Demo</button>
          </div>
        </motion.div>
      </section>

      {/* Feature Image */}
      <section className="px-6 md:px-16 pb-24">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative max-w-6xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/5">
          <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600" alt="Dashboard" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-6 md:px-16 pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "⚡", title: "Lightning Fast", desc: "Sub-second response times powered by edge computing." },
            { icon: "🔒", title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption." },
            { icon: "🔄", title: "Seamless Sync", desc: "Real-time collaboration across all your devices." },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-violet-500/20 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm opacity-40 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
