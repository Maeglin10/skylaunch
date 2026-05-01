"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Zap, Shield, Globe, BarChart3, Users, ChevronRight, Play, Check, TrendingUp } from "lucide-react";
import "../premium.css";

const FEATURES = [
  { icon: Zap, title: "Instant Automation", desc: "Build complex multi-step workflows without writing a single line of code.", color: "#f59e0b" },
  { icon: Shield, title: "Enterprise Security", desc: "SOC2 Type II, GDPR compliant. Your data stays in your chosen region.", color: "#3b82f6" },
  { icon: BarChart3, title: "Unified Analytics", desc: "One dashboard for every tool in your stack. Real decisions, not raw data.", color: "#10b981" },
  { icon: Globe, title: "1,200+ Integrations", desc: "Connect any tool in minutes. From legacy ERPs to modern SaaS.", color: "#8b5cf6" },
  { icon: Users, title: "Team Collaboration", desc: "Shared workflows, audit trails, and approval gates for regulated industries.", color: "#ef4444" },
  { icon: TrendingUp, title: "AI-Powered Insights", desc: "Proactive anomaly detection and optimization recommendations.", color: "#06b6d4" },
];

const STATS = [
  { value: 14, suffix: "K+", label: "Companies" },
  { value: 850, suffix: "M+", label: "Workflows Run/Month" },
  { value: 99, suffix: ".9%", label: "Uptime SLA" },
  { value: 1200, suffix: "+", label: "Integrations" },
];

const TIERS = [
  { name: "Starter", price: 29, desc: "For small teams getting started.", features: ["5 users", "10K runs/month", "100 integrations", "Email support"] },
  { name: "Growth", price: 149, desc: "For scaling operations.", features: ["25 users", "500K runs/month", "All integrations", "Priority support", "Custom domains"], highlight: true },
  { name: "Enterprise", price: null, desc: "For complex, regulated environments.", features: ["Unlimited users", "Unlimited runs", "Dedicated infra", "SLA guarantee", "SSO & SAML", "Custom contracts"] },
];

const LOGOS = ["Salesforce", "HubSpot", "Slack", "Notion", "Jira", "Linear", "Airtable", "Stripe"];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      s += step;
      if (s >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function FlowStreamSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTier, setActiveTier] = useState(1);
  const [showDemo, setShowDemo] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="premium-theme bg-[#040810] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-4 bg-[#040810]/90 backdrop-blur-xl border-b border-white/5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.3em]">FLOW<span className="text-emerald-400">STREAM</span></motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Features", "Integrations", "Pricing", "Docs"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Sign In</a>
          <a href="#" className="bg-emerald-500 text-white px-5 py-2 text-[10px] uppercase tracking-widest font-black hover:bg-emerald-400 transition-colors">Start Free</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#040810] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/40"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase">
              {["Features", "Integrations", "Pricing", "Docs", "Sign In"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDemo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-8" onClick={() => setShowDemo(false)}>
            <div className="w-full max-w-4xl bg-[#0d1120] border border-emerald-500/20 p-8 relative">
              <p className="text-emerald-400 text-sm uppercase tracking-widest text-center">[ Interactive Demo Placeholder ]</p>
              <button onClick={() => setShowDemo(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1536523?w=800&q=80" alt="Automation" fill className="object-cover opacity-8" unoptimized />
        </motion.div>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px]" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-28 max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[9px] uppercase tracking-widest px-4 py-2 mb-8">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            New: AI-Powered Workflow Optimization
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-6xl md:text-[8vw] font-black uppercase leading-none tracking-tighter mb-6">
            Automate<br />
            <span className="text-emerald-400">Everything.</span><br />
            Grow Fast.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-white/50 text-lg max-w-xl mb-10 leading-relaxed">
            FlowStream connects your entire stack and automates the work between them. No code, no DevOps, no limits.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="bg-emerald-500 text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-emerald-400 transition-colors flex items-center gap-2">
              Start Free — No CC <ArrowRight size={13} />
            </a>
            <button onClick={() => setShowDemo(true)} className="border border-white/10 text-white/60 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-white/30 hover:text-white transition-all flex items-center gap-2">
              <Play size={12} /> Watch Demo
            </button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-[9px] text-white/20 mt-4 uppercase tracking-widest">
            Trusted by 14,000+ companies
          </motion.p>
        </motion.div>
      </section>

      {/* LOGOS */}
      <div className="overflow-hidden bg-white/2 border-y border-white/5 py-4">
        <motion.div animate={{ x: [0, -1800] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-16 whitespace-nowrap items-center">
          {Array(4).fill(LOGOS).flat().map((l, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest text-white/20 shrink-0 font-black">{l}</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-[#040810] p-10 text-center border border-white/4">
            <div className="text-5xl font-black text-emerald-400 mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/30">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* FEATURES */}
      <section className="px-8 md:px-16 py-24 bg-[#07101a]">
        <Reveal className="mb-16">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-4">The Platform</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">One Platform.<br />Every Workflow.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07} className="group p-7 border border-white/6 hover:border-white/15 transition-all" style={{ background: `linear-gradient(135deg, ${f.color}06, transparent)` }}>
              <f.icon size={22} className="mb-5" style={{ color: f.color + "80" }} />
              <h3 className="font-black text-base uppercase tracking-tight mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="px-8 md:px-16 py-24">
        <Reveal className="text-center mb-14">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-4">Pricing</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Scale<br />Without Surprises</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div onClick={() => setActiveTier(i)} className={`p-8 border cursor-pointer transition-all ${t.highlight || activeTier === i ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/8 hover:border-emerald-500/25"}`} whileHover={{ y: -4 }}>
                {t.highlight && <div className="text-[8px] uppercase tracking-widest bg-emerald-500 text-white px-3 py-1 mb-4 w-fit font-black">Most Popular</div>}
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t.name}</p>
                <p className="text-[9px] text-white/25 mb-3">{t.desc}</p>
                {t.price !== null ? (
                  <>
                    <div className="text-4xl font-black text-emerald-400">${t.price}</div>
                    <p className="text-[9px] text-white/25 mb-6">/month</p>
                  </>
                ) : (
                  <div className="text-3xl font-black mb-7">Custom</div>
                )}
                <ul className="space-y-2.5 mb-8">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`block text-center py-3 text-[10px] uppercase tracking-widest border transition-all ${t.highlight ? "bg-emerald-500 text-white border-transparent hover:bg-emerald-400" : "border-white/15 hover:border-emerald-400 hover:text-emerald-400"}`}>
                  {t.price === null ? "Contact Sales" : "Get Started"}
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-500/8 border-y border-emerald-500/15 px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <Reveal>
          <p className="text-[9px] uppercase tracking-[0.5em] text-emerald-400/50 mb-4">Ready to Automate?</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Start today.<br />
            <span className="text-emerald-400">Scale tomorrow.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-emerald-500 text-white px-10 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-emerald-400 transition-colors flex items-center gap-2 shrink-0">
            Start Free Trial <ArrowRight size={13} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5">
        <p className="font-black text-sm uppercase tracking-[0.3em]">FLOW<span className="text-emerald-400">STREAM</span></p>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30">
          {["Features", "Docs", "Status", "Privacy"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 FlowStream Inc.</p>
      </footer>
    </div>
  );
}
