"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Ghost, Zap, Shield, Eye, Cpu, Lock, ChevronDown, Menu, X, ArrowRight, Code2, Network } from "lucide-react";
import "../premium.css";

const CAPABILITIES = [
  { icon: Shield, title: "Phantom Defense", desc: "Multi-vector protection with adaptive countermeasures that learn attacker behavior in real-time.", glyph: "01" },
  { icon: Eye, title: "Shadow Recon", desc: "Passive intelligence gathering across dark web, surface web, and grey zones simultaneously.", glyph: "02" },
  { icon: Network, title: "Neural Mesh", desc: "Self-healing network topology that reroutes and isolates compromised nodes within 200ms.", glyph: "03" },
  { icon: Code2, title: "Ghost Protocol", desc: "Zero-footprint deployment leaving no traces in host system logs, memory, or network traffic.", glyph: "04" },
  { icon: Cpu, title: "Quantum Shell", desc: "Post-quantum cryptographic shell protecting against all known and theoretical attack vectors.", glyph: "05" },
  { icon: Lock, title: "Void Archive", desc: "Encrypted data vaults with multi-signature access and automatic self-destruct failsafes.", glyph: "06" },
];

const MISSIONS = [
  { codename: "WRAITH", clearance: "TS/SCI", status: "COMPLETE", img: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1200&auto=format&fit=crop" },
  { codename: "BANSHEE", clearance: "TOP SECRET", status: "ACTIVE", img: "https://images.unsplash.com/photo-1542751110-97427bbecfd8?q=80&w=1200&auto=format&fit=crop" },
  { codename: "SPECTRE", clearance: "CLASSIFIED", status: "COMPLETE", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop" },
  { codename: "PHANTOM", clearance: "TS/SCI", status: "ACTIVE", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop" },
  { codename: "ECLIPSE", clearance: "SECRET", status: "COMPLETE", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" },
];

const STATS = [
  { value: 99.97, suffix: "%", label: "Ghost-mode uptime" },
  { value: 0, suffix: "", label: "Footprint detected" },
  { value: 580, suffix: "+", label: "Missions completed" },
  { value: 18, suffix: " yrs", label: "Operational history" },
];

const TESTIMONIALS = [
  { name: "[REDACTED]", role: "Director, Cyber Operations — [AGENCY CLASSIFIED]", quote: "Ghost Shell has operated in environments where failure wasn't an option. It has never failed.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
  { name: "[REDACTED]", role: "VP Security, [COMPANY CLASSIFIED]", quote: "Six months. Zero detections. Our adversaries don't know we're watching.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "[REDACTED]", role: "Chief of Staff, [GOVERNMENT AGENCY]", quote: "The ghost protocol is not a feature. It's a doctrine. We've adopted it across all our operations.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "Who is Ghost Shell for?", a: "Ghost Shell is available exclusively to vetted government agencies, allied defense contractors, and select Fortune 50 security operations centers. All clients undergo a 60-day vetting process." },
  { q: "How does the zero-footprint guarantee work?", a: "Ghost Protocol operates entirely in encrypted memory with no disk writes. All network operations are routed through our proprietary dark-relay network. Forensic analysis leaves nothing." },
  { q: "What happens if Ghost Shell is discovered?", a: "Cascade Protocol activates automatically — overwriting all memory, triggering key destruction, and severing all relay connections within 50ms of any detection event." },
  { q: "Can Ghost Shell operate in air-gapped environments?", a: "Yes. Our Dark Bridge hardware module enables covert communication across air-gapped networks via timing and electromagnetic side-channels." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
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
    const steps = 60;
    let cur = 0;
    const t = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(parseFloat(cur.toFixed(target % 1 !== 0 ? 2 : 0)));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  const display = target === 0 ? "0" : target % 1 !== 0 ? count.toFixed(2) : count.toString();
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-white font-mono mb-2">{display}{suffix}</div>
      <div className="text-xs text-purple-400/60 uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function GhostShellSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const [hoveredMission, setHoveredMission] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#04020a] text-white overflow-x-hidden font-mono">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(124,58,237,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 50%)" }} />

      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#04020a]/95 backdrop-blur-xl border-b border-purple-900/20">
        <div className="flex items-center gap-2">
          <Ghost className="w-5 h-5 text-purple-400" />
          <span className="text-purple-400 text-sm font-bold tracking-widest">GHOST<span className="text-white">SHELL</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-xs text-purple-400/40 tracking-widest uppercase">
          {["Protocol", "Capabilities", "Missions", "Access"].map(item => (
            <a key={item} href="#" className="hover:text-purple-400 transition-colors">{item}</a>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} className="hidden md:block px-4 py-2 border border-purple-500/30 text-purple-400 text-xs tracking-widest hover:bg-purple-500/10 transition-colors rounded">
          REQUEST ACCESS
        </motion.button>
        <button className="md:hidden text-purple-400" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#04020a] flex flex-col items-center justify-center gap-8">
            {["Protocol", "Capabilities", "Missions", "Access"].map(item => (
              <a key={item} href="#" className="text-purple-400 text-xl tracking-widest" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-546819?w=800&q=80" alt="Ghost Shell" fill className="object-cover opacity-8" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04020a]/50 via-transparent to-[#04020a]" />
        </motion.div>
        <div className="absolute inset-0 opacity-3" style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-center gap-3 text-purple-400/50 text-xs tracking-widest uppercase mb-10">
            <span className="w-8 h-px bg-purple-500/30" />
            CLASSIFIED OPERATIONS PLATFORM
            <span className="w-8 h-px bg-purple-500/30" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="text-6xl md:text-9xl font-black leading-none mb-8 tracking-tight">
            GO<br /><span className="text-purple-400">GHOST.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-purple-300/40 text-lg max-w-lg mx-auto mb-12 font-sans leading-relaxed">
            Zero-footprint cyber operations platform for the most sensitive and contested environments on earth.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.02 }} className="px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-black tracking-wider flex items-center gap-2 rounded transition-colors">
              REQUEST ACCESS <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} className="px-8 py-4 border border-purple-500/20 text-purple-400 font-bold tracking-wider hover:bg-purple-500/10 transition-colors rounded">
              READ PROTOCOL
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-purple-400/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Stats */}
      <section className="py-20 border-y border-purple-900/20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-purple-400/40 text-xs tracking-widest uppercase mb-3">// CAPABILITIES</p>
          <h2 className="text-4xl font-black text-white">Six-vector operations</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.01, borderColor: "rgba(124,58,237,0.3)" }} className="p-6 border border-purple-900/20 rounded-xl transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <c.icon className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-900 text-xs font-black">{c.glyph}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2 tracking-wider">{c.title}</h3>
                <p className="text-purple-300/30 text-xs leading-relaxed font-sans">{c.desc}</p>
                <div className="mt-4 text-purple-400/50 text-xs tracking-widest group-hover:text-purple-400 transition-colors">CLASSIFIED →</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Missions */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-purple-400/40 text-xs tracking-widest uppercase mb-3">// MISSION LOG</p>
          <h2 className="text-4xl font-black text-white">Operation record</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {MISSIONS.map((m, i) => (
            <Reveal key={m.codename} delay={i * 0.06}>
              <motion.div
                className="relative rounded-xl overflow-hidden cursor-pointer h-52"
                onHoverStart={() => setHoveredMission(i)} onHoverEnd={() => setHoveredMission(null)}
                whileHover={{ scale: 1.02 }}
              >
                <Image src={m.img} alt={m.codename} fill className="object-cover opacity-40" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04020a] to-transparent" />
                <div className="absolute inset-0 border border-purple-500/10 rounded-xl" />
                <AnimatePresence>
                  {hoveredMission === i && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-purple-500/10" />}
                </AnimatePresence>
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2 py-1 rounded font-bold ${m.status === "ACTIVE" ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-purple-400"}`}>{m.status}</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-purple-400/50 text-xs mb-1">{m.clearance}</p>
                  <p className="font-black text-white text-sm tracking-wider">{m.codename}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <Reveal><p className="text-purple-400/40 text-xs tracking-widest uppercase mb-3">// FIELD REPORTS</p></Reveal>
        <Reveal><h2 className="text-4xl font-black mb-16 text-white">Operator testimony</h2></Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={activeT} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <p className="text-lg text-purple-300/50 font-sans italic mb-8 leading-relaxed">"{TESTIMONIALS[activeT].quote}"</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full bg-purple-900/40 border border-purple-500/20 flex items-center justify-center">
                <Ghost className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-bold">{TESTIMONIALS[activeT].name}</p>
                <p className="text-purple-400/40 text-xs">{TESTIMONIALS[activeT].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-6 h-px transition-colors ${i === activeT ? "bg-purple-400" : "bg-purple-900"}`} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><p className="text-purple-400/40 text-xs tracking-widest uppercase mb-3">// BRIEFING</p><h2 className="text-4xl font-black">Classified FAQ</h2></Reveal>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-purple-900/20 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-purple-900/10 transition-colors">
                  <span className="text-sm font-bold text-white">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-4 h-4 text-purple-400/40 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="px-5 pb-5 text-purple-300/40 text-sm font-sans leading-relaxed">{f.a}</p>
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
          <div className="max-w-4xl mx-auto text-center border border-purple-500/20 rounded-2xl p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 to-transparent" />
            <div className="relative z-10">
              <p className="text-purple-400/40 text-xs tracking-widest uppercase mb-4">// AUTHORIZATION</p>
              <h2 className="text-5xl font-black mb-6">Ready to go ghost?</h2>
              <p className="text-purple-300/40 mb-10 font-sans">Access is granted only to verified entities. Begin the vetting process.</p>
              <motion.button whileHover={{ scale: 1.02 }} className="px-10 py-5 bg-purple-500 hover:bg-purple-400 text-white font-black tracking-wider flex items-center gap-2 mx-auto rounded transition-colors">
                REQUEST ACCESS <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="py-8 px-6 border-t border-purple-900/20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-400/30 tracking-widest uppercase">
        <div className="flex items-center gap-2 text-purple-400"><Ghost className="w-4 h-4" />GHOST SHELL SYSTEMS</div>
        <p>© 2026 — CLASSIFIED — ALL RIGHTS RESERVED</p>
        <div className="flex gap-6">{["Protocol", "Terms", "Access"].map(l => <a key={l} href="#" className="hover:text-purple-400 transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
