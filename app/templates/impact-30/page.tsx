"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, Zap, Globe, Shield, BarChart3, Users, ChevronRight, Star, Check } from "lucide-react";
import "../premium.css";

const FEATURES = [
  { icon: Zap, title: "Instant Deployment", desc: "Ship to 200+ regions in under 30 seconds. Zero cold starts, zero config.", color: "#f59e0b" },
  { icon: Shield, title: "Edge Security", desc: "DDoS mitigation, WAF, and rate limiting built in at every edge node.", color: "#3b82f6" },
  { icon: Globe, title: "Global Mesh", desc: "Anycast routing with automatic failover across continents.", color: "#10b981" },
  { icon: BarChart3, title: "Live Analytics", desc: "Real-time request tracing, error tracking, and performance insights.", color: "#8b5cf6" },
  { icon: Users, title: "Team Access", desc: "Granular RBAC, SSO, and audit logs for enterprise teams.", color: "#ef4444" },
];

const PRICING = [
  { name: "Starter", price: 0, features: ["3 projects", "100GB bandwidth", "Basic analytics", "Community support"], cta: "Get Started Free" },
  { name: "Pro", price: 49, features: ["Unlimited projects", "1TB bandwidth", "Advanced analytics", "Priority support", "Custom domains"], cta: "Start Pro Trial", highlight: true },
  { name: "Enterprise", price: null, features: ["Unlimited everything", "SLA guarantee", "Dedicated infra", "24/7 white-glove", "Custom contracts"], cta: "Contact Sales" },
];

const LOGOS = ["Stripe", "Notion", "Linear", "Vercel", "Figma", "GitHub", "Shopify", "Twilio"];

const TESTIMONIALS = [
  { name: "Marc Leblanc", role: "CTO, Nexus SaaS", text: "We went from 3-hour deploys to 28-second deploys on day one. Nothing else comes close.", stars: 5 },
  { name: "Aisha Johnson", role: "Lead Eng, Meridian AI", text: "The edge security alone has stopped six major DDoS attempts. We've had zero downtime in 8 months.", stars: 5 },
  { name: "Toru Yamamoto", role: "DevOps, FinTrack", text: "The observability stack is the best I've seen. We root-cause issues in minutes instead of hours.", stars: 5 },
];

const STATS = [
  { value: 400, suffix: "+", label: "Edge Locations" },
  { value: 99, suffix: ".99%", label: "SLA Uptime" },
  { value: 28, suffix: "s", label: "Avg Deploy Time" },
  { value: 12, suffix: "B+", label: "Monthly Requests" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
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

export default function MouseTrapParticles() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTier, setActiveTier] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);

  // Cursor-following gradient for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gradX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const gradY = useSpring(mouseY, { stiffness: 60, damping: 30 });
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width * 100);
    mouseY.set((e.clientY - r.top) / r.height * 100);
  }, [mouseX, mouseY]);

  // Magnetic CTA
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });
  const handleMag = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.3);
    my.set((e.clientY - r.top - r.height / 2) * 0.3);
  }, [mx, my]);
  const resetMag = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="premium-theme bg-[#05070e] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-[#05070e]/90 backdrop-blur-xl border-b border-white/5">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-black uppercase tracking-[0.3em]">LAUNCH<span className="text-sky-400">GRID</span></motion.div>
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/40">
          {["Features", "Pricing", "Docs", "Blog"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors">Sign In</a>
          <a href="#" className="hidden md:block bg-sky-500 text-white px-5 py-2 text-[10px] uppercase tracking-widest hover:bg-sky-400 transition-colors font-black">Start Free</a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#05070e] flex flex-col p-10">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-12 text-white/40"><X size={24} /></button>
            <div className="flex flex-col gap-8 text-3xl font-black uppercase">
              {["Features", "Pricing", "Docs", "Blog", "Sign In"].map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove}>
        {/* Cursor-following gradient */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: useTransform([gradX, gradY], ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, rgba(14,165,233,0.08) 0%, transparent 60%)`) }} />
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1109543?w=800&q=80" alt="Grid" fill className="object-cover opacity-8" unoptimized />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-8 md:px-16 pt-28 max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[9px] uppercase tracking-widest px-4 py-2 mb-8 font-mono">
            <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
            v3.0 — Now with 400+ edge locations
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-6xl md:text-[8vw] font-black uppercase leading-none tracking-tighter mb-6">
            Deploy<br />
            <span className="text-sky-400">Anywhere.</span><br />
            Instantly.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-white/50 text-lg max-w-xl mb-10 leading-relaxed">
            The global edge platform built for teams who can't afford downtime. 28-second deployments, 400+ locations, zero complexity.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-col sm:flex-row gap-4 items-start">
            <motion.a href="#" style={{ x: sx, y: sy }} onMouseMove={handleMag} onMouseLeave={resetMag} className="bg-sky-500 text-white px-8 py-4 text-[11px] uppercase tracking-widest font-black hover:bg-sky-400 transition-colors flex items-center gap-2">
              Start Free — No CC <ArrowRight size={13} />
            </motion.a>
            <a href="#" className="border border-white/10 text-white/50 px-8 py-4 text-[11px] uppercase tracking-widest hover:border-white/30 hover:text-white transition-all">
              View Docs
            </a>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-[9px] text-white/20 mt-4 uppercase tracking-widest">
            Trusted by 40,000+ developers
          </motion.p>
        </motion.div>
      </section>

      {/* LOGOS */}
      <div className="overflow-hidden bg-white/2 border-y border-white/5 py-5">
        <motion.div animate={{ x: [0, -1800] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="flex gap-16 whitespace-nowrap items-center">
          {Array(4).fill(LOGOS).flat().map((l, i) => (
            <span key={i} className="text-[10px] uppercase tracking-widest text-white/20 shrink-0 font-black">{l}</span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-[#05070e] p-10 text-center border border-white/4">
            <div className="text-5xl font-black text-sky-400 mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/30">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* FEATURES */}
      <section className="px-8 md:px-16 py-24 bg-[#080b14]">
        <Reveal className="mb-16">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-4">The Platform</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Everything<br />You Need</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="group p-7 border border-white/6 hover:border-white/15 transition-all cursor-default" style={{ background: `linear-gradient(135deg, ${f.color}06, transparent)` }}>
              <f.icon size={22} className="mb-5" style={{ color: f.color + "90" }} />
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
          <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">Simple,<br />Transparent</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PRICING.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div onClick={() => setActiveTier(i)} className={`p-8 border cursor-pointer transition-all ${t.highlight || activeTier === i ? "border-sky-500/50 bg-sky-500/5" : "border-white/8 hover:border-sky-500/25"}`} whileHover={{ y: -4 }}>
                {t.highlight && <div className="text-[8px] uppercase tracking-widest bg-sky-500 text-white px-3 py-1 mb-4 w-fit font-black">Most Popular</div>}
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{t.name}</p>
                {t.price !== null ? (
                  <>
                    <div className="text-5xl font-black text-sky-400">${t.price}</div>
                    <p className="text-[9px] text-white/25 mb-6">/month</p>
                  </>
                ) : (
                  <div className="text-3xl font-black mb-7">Custom</div>
                )}
                <ul className="space-y-2.5 mb-8">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <Check size={12} className="text-sky-400 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`block text-center py-3 text-[10px] uppercase tracking-widest border transition-all ${t.highlight ? "bg-sky-500 text-white border-transparent hover:bg-sky-400" : "border-white/15 hover:border-sky-400 hover:text-sky-400"}`}>
                  {t.cta}
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#080b14] px-8 md:px-16 py-24">
        <Reveal className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-4">Developers Love Us</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">What<br />They Say</h2>
        </Reveal>
        <div className="relative min-h-[180px] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }}>
              <div className="flex gap-1 mb-5">{Array(TESTIMONIALS[activeTestimonial].stars).fill(null).map((_, i) => <Star key={i} size={12} fill="#f59e0b" className="text-yellow-500" />)}</div>
              <p className="text-xl font-light leading-relaxed text-white/70 mb-6">"{TESTIMONIALS[activeTestimonial].text}"</p>
              <div>
                <p className="font-black text-sm uppercase tracking-tight">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-xs text-white/30 mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-1 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-sky-500" : "w-3 bg-white/15"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-28 flex flex-col items-center text-center">
        <Reveal>
          <p className="text-[9px] uppercase tracking-[0.6em] text-sky-400/40 mb-6">Get Started Today</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-10">
            Ship<br />
            <span className="text-sky-400">Faster.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#" className="bg-sky-500 text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:bg-sky-400 transition-colors inline-flex items-center gap-3">
            Start Free — No Credit Card <ArrowRight size={14} />
          </a>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-black text-sm uppercase tracking-[0.3em]">LAUNCH<span className="text-sky-400">GRID</span></p>
        <div className="flex gap-8 text-[9px] uppercase tracking-widest text-white/30">
          {["Docs", "Status", "Blog", "Privacy", "Legal"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <p className="text-[9px] text-white/20 uppercase">© 2026 LaunchGrid Inc.</p>
      </footer>
    </div>
  );
}
