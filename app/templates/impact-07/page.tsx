"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Activity, Shield, Zap, BarChart3, Globe, ChevronRight, LayoutDashboard, Settings, User, ChevronDown, ArrowRight, Check, Play, Cpu, Lock, Bell } from "lucide-react";
import "../premium.css";

const FEATURES = [
  { icon: <Shield className="w-6 h-6" />, title: "Encryption v9", desc: "Military grade data hardening for every calculation node across the mesh.", color: "cyan" },
  { icon: <Zap className="w-6 h-6" />, title: "Instant Neural", desc: "Latency reduced to sub-ms levels across continental relays.", color: "yellow" },
  { icon: <Globe className="w-6 h-6" />, title: "Global Mesh", desc: "Decentralized processing power distributed across 42 regions.", color: "emerald" },
  { icon: <Cpu className="w-6 h-6" />, title: "Quantum Core", desc: "Next-gen quantum processors optimizing every calculation in real-time.", color: "purple" },
  { icon: <Lock className="w-6 h-6" />, title: "Zero Trust", desc: "Every request verified. Every connection encrypted. No exceptions.", color: "rose" },
  { icon: <Bell className="w-6 h-6" />, title: "Smart Alerts", desc: "AI-driven anomaly detection with 12ms response time globally.", color: "blue" },
];

const STATS = [
  { label: "Active Nodes", value: "8,442", change: "+12%" },
  { label: "Uptime", value: "99.99%", change: "Stable" },
  { label: "Throughput", value: "1.2 GB/s", change: "+28%" },
  { label: "Threat Level", value: "Low", change: "Nominal" },
];

const PRICING = [
  { name: "Recon", price: "0", desc: "For individual researchers and tinkerers.", features: ["3 Neural nodes", "1,000 API calls", "Community forum", "Basic analytics"], cta: "Deploy free", popular: false },
  { name: "Command", price: "199", desc: "For teams building the future.", features: ["Unlimited nodes", "100K API calls", "Priority support", "Advanced analytics", "Custom mesh", "Team roles"], cta: "Start trial", popular: true },
  { name: "Sovereign", price: "Custom", desc: "For organizations that demand absolute control.", features: ["Everything in Command", "Dedicated infrastructure", "SSO/SAML", "On-prem option", "SLA guarantee", "24/7 engineer"], cta: "Contact ops", popular: false },
];

const LOGS = [
  "[14:22:01] PROTOCOL_INIT... OK",
  "[14:22:04] FETCHING_NODE_STREAM... (0x442)",
  "[14:22:15] BUFFER_FLUSHED...",
  "[14:22:20] ENCRYPTION_SYNC_ACTIVE",
  "[14:22:25] DETECTING_ANOMALIES... NONE",
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function QuantumAI_SPA() {
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [activeLog, setActiveLog] = useState(0);
  const [metrics, setMetrics] = useState({ cpu: 45, mem: 62, net: 12 });

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({ cpu: Math.floor(Math.random() * 20) + 40, mem: Math.floor(Math.random() * 10) + 60, net: Math.floor(Math.random() * 50) + 5 });
      setActiveLog(p => (p + 1) % LOGS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="premium-theme bg-[#020205] text-white min-h-screen selection:bg-cyan-500 font-sans overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-5 md:px-12 flex justify-between items-center border-b border-white/5 bg-[#020205]/70 backdrop-blur-xl">
        <button onClick={() => scrollTo("hero")} className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            <Activity className="w-full h-full text-white" />
          </div>
          Quantum.AI
        </button>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-white/40">
          <button onClick={() => scrollTo("features")} className="hover:text-white transition-colors">Neural Net</button>
          <button onClick={() => scrollTo("dashboard")} className="hover:text-white transition-colors">Dashboard</button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-white transition-colors">Pricing</button>
        </div>
        <button onClick={() => scrollTo("pricing")} className="hidden md:block px-5 py-2 glass rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all">
          Launch App
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div style={{ opacity: heroOpacity }} className="text-center max-w-5xl">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-10">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">Neural Engine v9 -- Live</span>
            </div>
            <h1 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-8">Analyze.<br/>Synthesize.</h1>
            <p className="max-w-xl mx-auto text-lg font-light text-white/40 leading-relaxed mb-12">
              The world&apos;s first predictive neural engine for real-time global logistics and data architecture.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => scrollTo("dashboard")} className="group px-10 py-4 bg-cyan-400 text-black font-bold uppercase text-sm tracking-widest hover:bg-white transition-all rounded-sm flex items-center gap-2">
                Start Tracking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo("features")} className="px-10 py-4 border border-white/10 glass font-semibold uppercase text-sm tracking-widest hover:bg-white/5 transition-all rounded-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-cyan-400" /> Watch Demo
              </button>
            </div>
          </motion.div>
        </motion.div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10"><ChevronDown className="w-5 h-5 text-white/20" /></motion.div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-16 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-1">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{s.label}</div>
              <span className="text-[10px] text-emerald-400 font-bold">{s.change}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-cyan-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Neural Infrastructure</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Built for the <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>impossible.</span></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass p-8 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all group h-full">
                  <div className={`text-${f.color}-400 mb-6 p-3 bg-white/5 inline-block rounded-xl group-hover:scale-110 transition-transform`}>{f.icon}</div>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section id="dashboard" className="relative z-10 py-32 px-6 md:px-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-cyan-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Live Preview</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">The Console.</h2>
          </Reveal>
          <Reveal>
            <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.05)]">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" /></div>
                <span className="text-[9px] font-mono text-white/20 ml-4">console.quantum.ai/dashboard</span>
              </div>
              <div className="p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map((s, i) => (
                  <div key={i} className="bg-white/[0.03] p-5 rounded-xl border border-white/5">
                    <div className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">{s.label}</div>
                    <div className="text-2xl font-black text-cyan-400">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-black/40 rounded-2xl p-6 border border-white/5">
                  <div className="flex justify-between mb-6">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Predictive Flow Index</span>
                    <span className="text-[10px] font-bold text-cyan-400">High Accuracy</span>
                  </div>
                  <div className="h-40 flex items-end gap-1.5">
                    {[60, 45, 80, 55, 90, 70, 85, 40, 65, 95, 20, 50, 75, 85, 42, 68].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i * 0.03 }} viewport={{ once: true }}
                        className="flex-grow bg-gradient-to-t from-cyan-600/20 to-cyan-400 rounded-sm" />
                    ))}
                  </div>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 mb-4">Audit Log</div>
                  <div className="space-y-2 font-mono text-[9px] uppercase tracking-tighter text-white/30">
                    {LOGS.map((log, i) => (
                      <div key={i} className={i === activeLog ? "text-cyan-400 opacity-100" : ""}>{log}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-cyan-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Deployment Tiers</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">Scale without <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>limits.</span></h2>
            <div className="inline-flex items-center gap-3 mt-4 bg-white/5 rounded-full p-1 border border-white/10">
              <button onClick={() => setBillingAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!billingAnnual ? "bg-cyan-400 text-black" : "text-white/40"}`}>Monthly</button>
              <button onClick={() => setBillingAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${billingAnnual ? "bg-cyan-400 text-black" : "text-white/40"}`}>Annual <span className="text-[10px] text-emerald-400 font-bold ml-1">-20%</span></button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative glass rounded-2xl p-8 border h-full flex flex-col transition-all hover:-translate-y-1 ${plan.popular ? "border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.1)]" : "border-white/5"}`}>
                  {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-400 text-black rounded-full text-[10px] uppercase tracking-wider font-bold">Recommended</div>}
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{plan.name}</h3>
                  <p className="text-sm text-white/30 mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    {plan.price !== "Custom" && <span className="text-white/30">$</span>}
                    <span className="text-4xl font-black">{plan.price === "Custom" ? plan.price : billingAnnual ? Math.round(Number(plan.price) * 0.8) : plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-white/30 text-sm">/mo</span>}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm text-white/50"><Check className="w-4 h-4 text-cyan-400 shrink-0" />{f}</li>)}
                  </ul>
                  <button className={`w-full py-3.5 rounded-sm text-sm font-bold uppercase tracking-wider transition-all ${plan.popular ? "bg-cyan-400 text-black hover:bg-white" : "border border-white/10 hover:border-cyan-500/50"}`}>{plan.cta}</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-widest font-bold text-white/15">
          <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /> Quantum.AI &copy; 2026</div>
          <div className="flex gap-8"><a href="#" className="hover:text-white/50 transition-colors">Protocol</a><a href="#" className="hover:text-white/50 transition-colors">Status</a><a href="#" className="hover:text-white/50 transition-colors">Legal</a></div>
        </div>
      </footer>

      <style>{`
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
      `}</style>
    </div>
  );
}
