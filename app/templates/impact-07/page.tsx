"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Shield, Zap, Globe, Cpu, Lock, Bell, ChevronDown, Menu, X, ArrowRight, Check, Play, BarChart3, Activity, TrendingUp, Users } from "lucide-react";
import "../premium.css";

const FEATURES = [
  { icon: Shield, title: "Zero-Trust Security", desc: "Every packet verified through our 9-layer encryption mesh. No exceptions, no backdoors.", color: "from-cyan-500 to-blue-500" },
  { icon: Zap, title: "Sub-ms Latency", desc: "Neural relay nodes distributed across 42 global regions for instant response.", color: "from-yellow-400 to-orange-500" },
  { icon: Globe, title: "Global Mesh", desc: "Decentralized compute power spanning 6 continents with 99.99% uptime SLA.", color: "from-emerald-400 to-teal-500" },
  { icon: Cpu, title: "Quantum Core", desc: "Next-gen quantum processors optimize every computation in real-time.", color: "from-purple-500 to-violet-600" },
  { icon: Lock, title: "Homomorphic Keys", desc: "Process encrypted data without ever decrypting. Provably secure by design.", color: "from-rose-500 to-pink-600" },
  { icon: Bell, title: "Anomaly AI", desc: "12ms threat detection powered by models trained on 2B+ attack signatures.", color: "from-blue-500 to-indigo-600" },
];

const PROJECTS = [
  { title: "Neural Gateway", cat: "Infrastructure", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop" },
  { title: "Cipher Mesh", cat: "Security", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" },
  { title: "Quantum Relay", cat: "Network", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" },
  { title: "Sentinel Node", cat: "Defense", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop" },
  { title: "Data Vault", cat: "Storage", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop" },
];

const STATS = [
  { value: 8442, suffix: "", label: "Active Nodes", icon: Activity },
  { value: 99.99, suffix: "%", label: "Uptime SLA", icon: TrendingUp },
  { value: 2, suffix: "B+", label: "Threats Blocked", icon: Shield },
  { value: 340, suffix: "+", label: "Enterprise Clients", icon: Users },
];

const TESTIMONIALS = [
  { name: "Dr. Elena Voss", role: "CISO, Meridian Bank", quote: "QuantumAI stopped a nation-state attack in 8ms. Their mesh doesn't just detect — it eliminates.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Marcus Oyelaran", role: "CTO, Nexus Health", quote: "We process 40M patient records daily through their encrypted mesh. Zero breaches in 3 years.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Sarah Kim", role: "VP Infra, Prism Capital", quote: "Sub-millisecond latency at global scale. It's not infrastructure anymore — it's a superpower.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "What makes your encryption different from AES-256?", a: "We use post-quantum lattice-based cryptography layered with our proprietary Cipher Mesh protocol — resistant to both classical and quantum attacks." },
  { q: "How does the 99.99% uptime SLA work?", a: "Our mesh is fully decentralized. If any node fails, traffic is instantly rerouted across 42 remaining regions with zero user impact, backed by financial guarantees." },
  { q: "Can I run QuantumAI on-premise?", a: "Yes — our Sovereign tier includes dedicated on-premise hardware with our Sentinel OS, air-gapped from public internet, with full HSM key management." },
  { q: "How long does deployment take?", a: "Most enterprise deployments are live within 48 hours. Our neural onboarding AI handles config, existing infrastructure mapping, and compliance validation automatically." },
];

const PRICING = [
  { name: "Recon", price: "0", features: ["3 Neural nodes", "1K API calls/day", "Community forum", "Basic analytics"], cta: "Deploy free", popular: false },
  { name: "Command", price: "199", features: ["Unlimited nodes", "100K API calls", "Priority support", "Advanced analytics", "Custom mesh", "Team roles"], cta: "Start trial", popular: true },
  { name: "Sovereign", price: "Custom", features: ["Everything in Command", "On-premise option", "SSO/SAML", "HSM key mgmt", "SLA guarantee", "24/7 engineer"], cta: "Contact ops", popular: false },
];

const MARQUEE_ITEMS = ["Zero-Trust Architecture", "Quantum Encryption", "Neural Threat Detection", "Global Mesh Network", "Sub-ms Latency", "SOC 2 Type II", "ISO 27001", "GDPR Compliant"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", label, icon: Icon }: { target: number; suffix?: string; label: string; icon: React.ElementType }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  const display = target % 1 !== 0 ? count.toFixed(2) : count.toLocaleString();
  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center mb-2"><Icon className="w-5 h-5 text-cyan-400" /></div>
      <div className="text-4xl font-black text-white mb-1">{display}{suffix}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}

export default function QuantumAI_SPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 150, damping: 20 });
  const springY = useSpring(my, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }, [mx, my]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* Nav */}
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
          <span className="font-bold text-white">QuantumAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {["Platform", "Security", "Pricing", "Docs"].map(item => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Log in</a>
          <motion.button style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={() => { mx.set(0); my.set(0); }} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-colors">
            Deploy now
          </motion.button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-[#020617] flex flex-col items-center justify-center gap-8 text-2xl font-bold">
            {["Platform", "Security", "Pricing", "Docs"].map(item => <a key={item} href="#" className="text-white" onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-733852?w=800&q=80" alt="Hero" fill className="object-cover opacity-20" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617]" />
        </motion.div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            8,442 nodes active globally
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-6xl md:text-8xl font-black leading-none mb-6">
            Quantum-grade
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Security
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Post-quantum encryption meets neural threat intelligence. Protect your infrastructure with technology that doesn't exist yet — anywhere else.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl flex items-center gap-2 transition-colors">
              Deploy free <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 flex items-center gap-2 transition-colors">
              <Play className="w-4 h-4" /> Watch demo
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-slate-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="py-6 bg-white/[0.02] border-y border-white/5 overflow-hidden">
        <motion.div className="flex gap-12 whitespace-nowrap" animate={{ x: [0, -2000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-slate-500 text-sm font-medium flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />{item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <Counter target={s.value} suffix={s.suffix} label={s.label} icon={s.icon} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">The mesh that never sleeps</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Six layers of intelligent protection, working in concert across every packet.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Infrastructure at scale</h2>
          <p className="text-slate-400">Real deployments. Real threat environments. Real protection.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div
                className={`relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "md:row-span-2" : ""}`}
                style={{ height: i === 0 ? "480px" : "220px" }}
                onHoverStart={() => setHoveredProject(i)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ scale: 1.02 }}
              >
                <Image src={p.img} alt={p.title} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <AnimatePresence>
                  {hoveredProject === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs text-cyan-400 font-medium mb-1">{p.cat}</p>
                  <h3 className="font-bold text-white">{p.title}</h3>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><h2 className="text-4xl font-black mb-16">Trusted by the most security-conscious teams</h2></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <p className="text-xl text-slate-300 mb-8 italic leading-relaxed">"{TESTIMONIALS[activeTestimonial].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <Image src={TESTIMONIALS[activeTestimonial].avatar} alt={TESTIMONIALS[activeTestimonial].name} width={48} height={48} className="rounded-full object-cover" unoptimized />
                <div className="text-left">
                  <p className="font-bold text-white text-sm">{TESTIMONIALS[activeTestimonial].name}</p>
                  <p className="text-slate-400 text-xs">{TESTIMONIALS[activeTestimonial].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeTestimonial ? "bg-cyan-400" : "bg-white/20"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Reveal className="text-center mb-6">
          <h2 className="text-4xl font-black mb-4">Simple, transparent pricing</h2>
        </Reveal>
        <Reveal className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!billingAnnual ? "text-white" : "text-slate-500"}`}>Monthly</span>
          <button onClick={() => setBillingAnnual(!billingAnnual)} className={`w-12 h-6 rounded-full transition-colors ${billingAnnual ? "bg-cyan-500" : "bg-white/20"}`}>
            <motion.div animate={{ x: billingAnnual ? 24 : 2 }} className="w-5 h-5 bg-white rounded-full" />
          </button>
          <span className={`text-sm ${billingAnnual ? "text-white" : "text-slate-500"}`}>Annual <span className="text-cyan-400 ml-1">-20%</span></span>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div className={`p-8 rounded-2xl flex flex-col ${tier.popular ? "bg-cyan-950/30 border-2 border-cyan-500" : "bg-white/[0.03] border border-white/5"}`}>
                {tier.popular && <span className="self-start px-3 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full mb-4">MOST POPULAR</span>}
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-black">{tier.price === "Custom" ? tier.price : `$${tier.price}`}</span>
                  {tier.price !== "Custom" && <span className="text-slate-500 text-sm">/mo</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`py-3 rounded-xl font-bold text-sm transition-colors ${tier.popular ? "bg-cyan-500 text-black hover:bg-cyan-400" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"}`}>
                  {tier.cta}
                </motion.button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="text-center mb-16"><h2 className="text-4xl font-black">Questions answered</h2></Reveal>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/5 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors">
                  <span className="font-semibold text-white">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-slate-400 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-6 pb-6 text-slate-400 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center rounded-3xl p-16 bg-gradient-to-br from-cyan-950/50 to-blue-950/50 border border-cyan-500/20">
            <h2 className="text-5xl font-black mb-6">Ready to quantum-proof your stack?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">Join 340+ enterprises running on the most secure mesh network on earth.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-2xl flex items-center gap-2 mx-auto transition-colors">
              Deploy in 48 hours <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-2 font-bold text-white"><Zap className="w-4 h-4 text-cyan-400" />QuantumAI</div>
        <p>© 2026 QuantumAI Systems. All rights reserved.</p>
        <div className="flex gap-6">{["Privacy", "Terms", "Security", "Docs"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
