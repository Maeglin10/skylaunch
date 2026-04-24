"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Layers, Terminal, Wifi, Database, Code2, Eye, ChevronDown, Menu, X, ArrowRight, Crosshair, Shield, Zap } from "lucide-react";
import "../premium.css";

const MODULES = [
  { icon: Eye, title: "Perimeter Vision", desc: "360° surveillance overlay with AI threat classification and live heatmaps.", color: "#3b82f6" },
  { icon: Shield, title: "Shield Protocol", desc: "Adaptive firewall that evolves with attack patterns in under 50ms.", color: "#06b6d4" },
  { icon: Database, title: "DataCore Vault", desc: "Encrypted cold storage with quantum-resistant keys and air-gap backups.", color: "#8b5cf6" },
  { icon: Wifi, title: "MeshLink Pro", desc: "Point-to-point encrypted comms across your entire infrastructure graph.", color: "#10b981" },
  { icon: Code2, title: "API Guardian", desc: "Runtime injection prevention with behavioral ML anomaly scoring.", color: "#f59e0b" },
  { icon: Terminal, title: "SentinelCLI", desc: "Full-stack terminal access with biometric-locked root privilege.", color: "#ef4444" },
];

const DEPLOYMENTS = [
  { title: "OP PHANTOM", cat: "Network Defense", clearance: "TOP SECRET", img: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1200&auto=format&fit=crop" },
  { title: "GLASS WALL", cat: "Perimeter Security", clearance: "CLASSIFIED", img: "https://images.unsplash.com/photo-1542751110-97427bbecfd8?q=80&w=1200&auto=format&fit=crop" },
  { title: "DARK CIPHER", cat: "Data Encryption", clearance: "RESTRICTED", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" },
  { title: "IRON GRID", cat: "Infrastructure", clearance: "SECRET", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop" },
  { title: "NOVA TRACE", cat: "Threat Intel", clearance: "TOP SECRET", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop" },
];

const STATS = [
  { value: 99.97, suffix: "%", label: "Threat Intercept Rate" },
  { value: 12, suffix: "ms", label: "Avg Response Time" },
  { value: 500, suffix: "M+", label: "Packets/Day" },
  { value: 0, suffix: "", label: "Breaches in 5 Years" },
];

const TESTIMONIALS = [
  { name: "Col. James Erikson", role: "Cyber Command, DoD", quote: "GlassHUD replaced three separate tools. The unified interface is unlike anything in our arsenal.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
  { name: "Ana Petrov", role: "CISO, NordBank", quote: "We simulate attacks against GlassHUD weekly. It's never failed. That's not a product — that's a fortress.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. Rafi Al-Hassan", role: "Head of Infosec, CERN", quote: "Packet analysis at petabyte scale beyond anything available today.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "Is GlassHUD certified for government use?", a: "Yes — FedRAMP High, FIPS 140-3, and NATO COSMIC TOP SECRET certifications. We're the only commercial HUD cleared at this level." },
  { q: "How does the adaptive firewall work?", a: "Shield Protocol runs a behavioral ML engine trained on 2B+ attack signatures, dynamically rewriting firewall rules within 50ms without human intervention." },
  { q: "Can GlassHUD integrate with existing SIEM tools?", a: "Fully. GraphQL API and 60+ native connectors for Splunk, CrowdStrike, Palo Alto. Custom connectors deploy in under 4 hours." },
  { q: "What if the HUD itself is compromised?", a: "Impossible by design. GlassHUD's control plane is air-gapped from all monitored systems. Read access cannot modify firewall rules." },
];

const MARQUEE = ["FedRAMP High", "FIPS 140-3", "Zero Breaches", "AI-Adaptive", "Air-Gapped Control", "50ms Response", "NATO Certified", "500M+ Packets/Day"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    let current = 0;
    const increment = target / steps;
    const t = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(t); }
      else setCount(parseFloat(current.toFixed(target % 1 !== 0 ? 2 : 0)));
    }, 1800 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  const display = target === 0 ? "0" : target % 1 !== 0 ? count.toFixed(2) : count.toLocaleString();
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-white font-mono mb-1">{display}{suffix}</div>
      <div className="text-xs text-blue-400/70 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function GlassHUD_SPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const [hoveredDep, setHoveredDep] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#020714] text-white overflow-x-hidden font-mono">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.015) 2px, rgba(59,130,246,0.015) 4px)" }} />

      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#020714]/90 backdrop-blur-xl border-b border-blue-500/10">
        <div className="flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm font-bold tracking-widest">GLASS<span className="text-white">HUD</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs text-blue-400/60 tracking-widest uppercase">
          {["Modules", "Deploy", "Clearance", "Terminal"].map(item => (
            <a key={item} href="#" className="hover:text-blue-400 transition-colors">{item}</a>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.03 }} className="hidden md:block px-4 py-2 border border-blue-500/30 text-blue-400 text-xs rounded tracking-widest hover:bg-blue-500/10 transition-colors">
          ACCESS PORTAL
        </motion.button>
        <button className="md:hidden text-blue-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#020714] flex flex-col items-center justify-center gap-8">
            {["Modules", "Deploy", "Clearance", "Terminal"].map(item => (
              <a key={item} href="#" className="text-blue-400 text-xl tracking-widest font-bold" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2000&auto=format&fit=crop" alt="HUD background" fill className="object-cover opacity-10" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020714]/60 via-[#020714]/20 to-[#020714]" />
        </motion.div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 px-4 py-2 border border-blue-500/20 text-blue-400 text-xs tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            SYSTEM OPERATIONAL — ALL NODES ACTIVE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-7xl md:text-9xl font-black leading-none mb-6 tracking-tight">
            THE<br /><span className="text-blue-400">GLASS HUD</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-400 text-lg max-w-xl mx-auto mb-10 font-sans leading-relaxed">
            Military-grade cybersecurity interface. Real-time threat visualization, adaptive defense protocols, and quantum-encrypted comms — unified in one HUD.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.03 }} className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-black font-bold text-sm rounded tracking-wider flex items-center gap-2 transition-colors">
              REQUEST CLEARANCE <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} className="px-8 py-4 border border-blue-500/30 text-blue-400 text-sm font-bold rounded tracking-wider hover:bg-blue-500/10 transition-colors">
              VIEW DEMO
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-blue-400/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="py-4 bg-blue-950/20 border-y border-blue-500/10 overflow-hidden">
        <motion.div className="flex gap-16 whitespace-nowrap" animate={{ x: [0, -2400] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="text-blue-400/40 text-xs font-bold tracking-widest uppercase flex items-center gap-4">
              <span className="text-blue-400">/ /</span> {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border border-blue-500/10 rounded-2xl p-12 bg-blue-950/10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-blue-400 text-xs tracking-widest uppercase mb-3">// SYSTEM MODULES</p>
          <h2 className="text-4xl font-black">Six layers of defense</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${m.color}40, transparent)` }} />
                <m.icon className="w-6 h-6 mb-4" style={{ color: m.color }} />
                <h3 className="font-bold text-white mb-2 text-sm tracking-wider">{m.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-sans">{m.desc}</p>
                <div className="mt-4 text-xs font-bold tracking-widest" style={{ color: m.color }}>ACTIVE →</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Deployments */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-blue-400 text-xs tracking-widest uppercase mb-3">// ACTIVE DEPLOYMENTS</p>
          <h2 className="text-4xl font-black">Field operations</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEPLOYMENTS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <motion.div
                className={`relative rounded-xl overflow-hidden cursor-pointer ${i === 0 ? "md:col-span-2 h-72" : "h-52"}`}
                onHoverStart={() => setHoveredDep(i)}
                onHoverEnd={() => setHoveredDep(null)}
                whileHover={{ scale: 1.01 }}
              >
                <Image src={d.img} alt={d.title} fill className="object-cover opacity-60" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020714] via-transparent to-transparent" />
                <div className="absolute inset-0 border border-blue-500/20 rounded-xl" />
                <AnimatePresence>
                  {hoveredDep === i && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-blue-500/10" />}
                </AnimatePresence>
                <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 border border-blue-500/20 text-blue-400 text-xs tracking-widest">{d.clearance}</div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-blue-400/60 text-xs tracking-widest mb-1">{d.cat}</p>
                  <p className="font-black text-white tracking-wider">{d.title}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <Reveal><p className="text-blue-400 text-xs tracking-widest uppercase mb-3">// OPERATOR REPORTS</p></Reveal>
        <Reveal><h2 className="text-4xl font-black mb-16">From the field</h2></Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={activeT} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <p className="text-slate-300 text-lg italic mb-8 font-sans leading-relaxed">"{TESTIMONIALS[activeT].quote}"</p>
            <div className="flex items-center justify-center gap-3">
              <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={44} height={44} className="rounded-full object-cover border border-blue-500/20" unoptimized />
              <div className="text-left">
                <p className="text-white text-sm font-bold">{TESTIMONIALS[activeT].name}</p>
                <p className="text-blue-400/60 text-xs tracking-wider">{TESTIMONIALS[activeT].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-6 h-px transition-colors ${i === activeT ? "bg-blue-400" : "bg-blue-400/20"}`} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12">
          <p className="text-blue-400 text-xs tracking-widest uppercase mb-3">// CLASSIFIED BRIEFING</p>
          <h2 className="text-4xl font-black">Need-to-know</h2>
        </Reveal>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-blue-500/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-blue-500/5 transition-colors">
                  <span className="text-sm font-bold text-white">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-blue-400/60 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed font-sans">{f.a}</p>
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
          <div className="max-w-4xl mx-auto text-center border border-blue-500/20 rounded-2xl p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 to-transparent" />
            <div className="relative z-10">
              <p className="text-blue-400 text-xs tracking-widest uppercase mb-4">// AUTHORIZE ACCESS</p>
              <h2 className="text-5xl font-black mb-6">Request operational clearance</h2>
              <p className="text-slate-400 mb-10 font-sans max-w-lg mx-auto">GlassHUD is available to vetted enterprises, government agencies, and cleared defense contractors.</p>
              <motion.button whileHover={{ scale: 1.03 }} className="px-10 py-5 bg-blue-500 hover:bg-blue-400 text-black font-bold tracking-wider flex items-center gap-2 mx-auto transition-colors rounded">
                BEGIN AUTHORIZATION <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="py-8 px-6 border-t border-blue-500/10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-400/40 tracking-widest uppercase">
        <div className="flex items-center gap-2"><Crosshair className="w-4 h-4 text-blue-400" />GLASSHUD SYSTEMS</div>
        <p>© 2026 — ALL RIGHTS RESERVED</p>
        <div className="flex gap-6">{["Privacy", "Terms", "Portal"].map(l => <a key={l} href="#" className="hover:text-blue-400 transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
