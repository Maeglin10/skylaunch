"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Cpu, GitBranch, Globe, Shield, Zap, TrendingUp, Activity, Terminal } from "lucide-react";

const NODES = [
  { id: "n1", name: "NEXUS_ALPHA", region: "EU-WEST", status: "ACTIVE", load: 82, latency: 12, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", color: "#00ff88" },
  { id: "n2", name: "NEXUS_BETA", region: "US-EAST", status: "ACTIVE", load: 67, latency: 8, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", color: "#0ea5e9" },
  { id: "n3", name: "NEXUS_GAMMA", region: "APAC", status: "SYNC", load: 45, latency: 23, image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80", color: "#f59e0b" },
  { id: "n4", name: "NEXUS_DELTA", region: "SA-EAST", status: "ACTIVE", load: 91, latency: 31, image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80", color: "#8b5cf6" },
  { id: "n5", name: "NEXUS_EPSILON", region: "AF-SOUTH", status: "OFFLINE", load: 0, latency: 0, image: "https://images.unsplash.com/photo-1561144257-e32e8a34c834?w=800&q=80", color: "#ef4444" },
  { id: "n6", name: "NEXUS_ZETA", region: "ME-CENTRAL", status: "ACTIVE", load: 58, latency: 19, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", color: "#ec4899" },
];

const SERVICES = [
  { icon: Cpu, title: "Distributed Compute", desc: "Heterogeneous workloads spread intelligently across 1,200+ nodes for zero-downtime processing." },
  { icon: Shield, title: "Zero-Trust Fabric", desc: "Every inter-node connection cryptographically verified. No implicit trust, ever." },
  { icon: GitBranch, title: "Consensus Protocol", desc: "Byzantine fault-tolerant consensus with sub-200ms finality across 6 global regions." },
  { icon: Globe, title: "Geo-Routing", desc: "Traffic auto-routes to the nearest healthy node. Regional failover in under 800ms." },
  { icon: Activity, title: "Live Telemetry", desc: "Real-time metrics ingested at 50k events/sec. Alerting thresholds configurable per node." },
  { icon: Zap, title: "Edge Execution", desc: "Wasm modules deployed to edge nodes. Execute at 5ms latency from any major metro area." },
];

const STATS = [
  { label: "Active Nodes", value: 1247, suffix: "" },
  { label: "Uptime SLA", value: 99.97, suffix: "%" },
  { label: "Req/sec Peak", value: 8400, suffix: "k" },
  { label: "Regions", value: 6, suffix: "" },
];

const LOG_LINES = [
  "[12:41:02] NODE::alpha heartbeat OK — 12ms",
  "[12:41:03] CONSENSUS achieved — block #8841293",
  "[12:41:05] FAILOVER detected node epsilon — rerouting",
  "[12:41:07] GEO-ROUTE update: EU→US-EAST 14ms",
  "[12:41:09] SYNC delta→gamma — 45k txn batch",
  "[12:41:11] ALERT: delta load 91% — scaling trigger",
  "[12:41:13] SPAWN replica::delta_2 — EU-WEST",
  "[12:41:15] NODE::beta checkpoint stored",
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(t); } else setCount(n); }, 24);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{typeof target === "number" && target < 100 ? count.toFixed(target % 1 !== 0 ? 2 : 0) : count}{suffix}</span>;
}

function LoadBar({ value, color }: { value: number; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={inView ? { width: `${value}%` } : {}} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full rounded-full" style={{ background: color }} />
    </div>
  );
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.a ref={ref} style={{ x: sx, y: sy }} onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); }} onMouseLeave={() => { x.set(0); y.set(0); }} href="#" className={className}>{children}</motion.a>
  );
}

export default function NexusClusterSPA() {
  const [activeNode, setActiveNode] = useState<typeof NODES[0] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [logIdx, setLogIdx] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([LOG_LINES[0]]);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cx = useMotionValue(0); const cy = useMotionValue(0);
  const scx = useSpring(cx, { stiffness: 80, damping: 20 });
  const scy = useSpring(cy, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const t = setInterval(() => {
      setLogIdx(i => {
        const next = (i + 1) % LOG_LINES.length;
        setVisibleLogs(prev => [...prev.slice(-4), LOG_LINES[next]]);
        return next;
      });
    }, 1800);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "What consensus mechanism does Nexus use?", a: "A variant of HotStuff BFT with pipelined rounds. Provides liveness guarantees under ⅓ Byzantine faults with sub-200ms finality." },
    { q: "How is node onboarding handled?", a: "Operators stake tokens for node admission. Automated health checks gate cluster entry — no manual review required." },
    { q: "What SLA do you offer?", a: "99.97% network uptime guaranteed by contract. Credits issued automatically for any measured breach." },
    { q: "Is the protocol open source?", a: "Core consensus and routing code is MIT licensed. Enterprise extensions are proprietary but fully audited." },
  ];

  return (
    <div className="min-h-screen bg-[#040810] text-white font-mono">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-[#00ff88]/10 bg-[#040810]/90 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-[#00ff88]/60 rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#00ff88]" />
          </div>
          <span className="text-sm font-black tracking-[0.25em] uppercase text-[#00ff88]">NEXUS</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Network", "Nodes", "Protocol", "Developers", "Status"].map(l => (
            <a key={l} href="#" className="hover:text-[#00ff88] hover:opacity-100 transition-all">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-[10px] text-[#00ff88] opacity-60">
            <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" /> 1,247 NODES ONLINE
          </span>
          <MagneticBtn className="hidden md:block px-4 py-2 border border-[#00ff88]/40 text-[#00ff88] text-[10px] tracking-[0.2em] uppercase hover:bg-[#00ff88]/10 transition-colors">
            Run Node
          </MagneticBtn>
          <button onClick={() => setMobileOpen(true)} className="md:hidden flex flex-col gap-1.5">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-[#00ff88]" />)}</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#040810] flex flex-col p-10 border-l border-[#00ff88]/10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-[#00ff88]"><X size={24} /></button>
            {["Network", "Nodes", "Protocol", "Developers", "Status"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-3xl font-black mb-6 uppercase tracking-wider text-[#00ff88] hover:opacity-70 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden" onMouseMove={e => { cx.set(e.clientX - window.innerWidth / 2); cy.set(e.clientY - window.innerHeight / 2); }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={NODES[0].image} alt="network" fill unoptimized className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#040810]/80" />
        </motion.div>
        {/* Cursor gradient */}
        <motion.div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl" style={{ x: scx, y: scy, background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)", left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-[10px] tracking-[0.3em] text-[#00ff88] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#00ff88]/40" />
            DISTRIBUTED CLUSTER PROTOCOL v4.2.1
            <span className="w-8 h-px bg-[#00ff88]/40" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="text-5xl md:text-8xl font-black leading-none tracking-tight mb-6">
            THE <span className="text-[#00ff88]">NEXUS</span><br />CLUSTER
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm opacity-40 max-w-lg mx-auto mb-10 tracking-wider leading-loose">
            1,247 nodes. 6 regions. Zero single point of failure.<br />The backbone of decentralized compute at global scale.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="px-8 py-4 bg-[#00ff88] text-[#040810] font-black text-xs tracking-[0.2em] uppercase">
              Explore Network
            </a>
            <a href="#" className="px-8 py-4 border border-[#00ff88]/30 text-[#00ff88] text-xs tracking-[0.2em] uppercase hover:bg-[#00ff88]/5 transition-colors">
              Read Whitepaper
            </a>
          </motion.div>
        </div>

        {/* Live terminal */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="absolute bottom-12 right-8 hidden md:block w-72 bg-[#040810]/90 border border-[#00ff88]/20 p-4">
          <div className="flex items-center gap-2 mb-3 text-[9px] tracking-[0.2em] text-[#00ff88]/50">
            <Terminal size={10} /> LIVE LOG
          </div>
          <div className="space-y-1">
            {visibleLogs.map((l, i) => (
              <motion.p key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-[9px] font-mono opacity-50 leading-relaxed">{l}</motion.p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[#00ff88]/10 py-3 overflow-hidden bg-[#00ff88]/5">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-[9px] font-mono tracking-[0.2em] text-[#00ff88]/40">NEXUS_PROTOCOL · BFT_CONSENSUS · ZERO_TRUST · GEO_ROUTING · 1247_NODES · 99.97%_UPTIME · OPEN_SOURCE ·</span>
          ))}
        </motion.div>
      </div>

      {/* Node Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-2xl font-black tracking-[0.2em] uppercase mb-2 text-[#00ff88]">CLUSTER_MAP</h2></Reveal>
        <Reveal delay={0.1}><p className="text-xs opacity-30 tracking-wider mb-12">Real-time node status across 6 global regions</p></Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {NODES.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setActiveNode(n)} className="cursor-pointer border border-white/5 hover:border-white/10 transition-colors bg-[#070b14] p-5 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.2em] font-black" style={{ color: n.color }}>{n.name}</span>
                  <span className="text-[9px] tracking-wider opacity-30">{n.region}</span>
                </div>
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "16/9" }}>
                  <Image src={n.image} alt={n.name} fill unoptimized className="object-cover opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-[10px] font-black tracking-widest px-3 py-1.5 border ${n.status === "ACTIVE" ? "border-green-500/40 text-green-400 bg-green-500/10" : n.status === "OFFLINE" ? "border-red-500/40 text-red-400 bg-red-500/10" : "border-yellow-500/40 text-yellow-400 bg-yellow-500/10"}`}>
                      {n.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 text-[9px]">
                  <div>
                    <div className="flex justify-between mb-1.5 opacity-40 tracking-wider">
                      <span>NODE LOAD</span><span>{n.load}%</span>
                    </div>
                    <LoadBar value={n.load} color={n.color} />
                  </div>
                  <div className="flex justify-between opacity-30 tracking-wider">
                    <span>LATENCY</span><span style={{ color: n.color }}>{n.latency > 0 ? `${n.latency}ms` : "—"}</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#070b14] px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-[0.2em] uppercase mb-16 text-[#00ff88]">PROTOCOL_STACK</h2></Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="p-6 border border-white/5 hover:border-[#00ff88]/20 transition-colors">
                  <s.icon size={20} className="mb-4 opacity-50" style={{ color: "#00ff88" }} />
                  <h3 className="text-xs font-black tracking-[0.2em] uppercase mb-2">{s.title}</h3>
                  <p className="text-[11px] opacity-30 leading-relaxed tracking-wide">{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2 text-[#00ff88]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.25em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <Reveal><h2 className="text-xl font-black tracking-[0.2em] uppercase mb-12 text-[#00ff88]">FAQ::PROTOCOL</h2></Reveal>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="border-b border-white/5">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-xs tracking-wider">
                {f.q}
                <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={14} /></motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-5 text-[11px] opacity-30 leading-relaxed tracking-wide">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10">
          <Reveal><h2 className="text-4xl md:text-7xl font-black tracking-tight mb-4 leading-none">JOIN THE<br /><span className="text-[#00ff88]">CLUSTER</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-xs opacity-30 mb-10 max-w-sm mx-auto tracking-wider leading-loose">Run a node. Earn rewards. Strengthen the network. No minimum stake required for observer nodes.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#00ff88] text-[#040810] font-black text-xs tracking-[0.2em] uppercase">
              RUN A NODE <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] opacity-20 tracking-[0.2em]">
        <span>NEXUS PROTOCOL © 2026</span>
        <div className="flex gap-8">{["GitHub", "Discord", "Docs", "Status"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Node Modal */}
      <AnimatePresence>
        {activeNode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-6" onClick={() => setActiveNode(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-[#070b14] border max-w-lg w-full overflow-hidden" style={{ borderColor: activeNode.color + "40" }}>
              <div className="relative h-48">
                <Image src={activeNode.image} alt={activeNode.name} fill unoptimized className="object-cover opacity-40" />
                <button onClick={() => setActiveNode(null)} className="absolute top-4 right-4 opacity-60 hover:opacity-100"><X size={16} /></button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black tracking-[0.2em] text-sm" style={{ color: activeNode.color }}>{activeNode.name}</h3>
                  <span className="text-[9px] tracking-widest opacity-40">{activeNode.region}</span>
                </div>
                <div className="space-y-3 text-[10px] tracking-wider">
                  <div className="flex justify-between"><span className="opacity-30">STATUS</span><span style={{ color: activeNode.color }}>{activeNode.status}</span></div>
                  <div className="flex justify-between"><span className="opacity-30">LATENCY</span><span>{activeNode.latency > 0 ? `${activeNode.latency}ms` : "OFFLINE"}</span></div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-2 opacity-30"><span>LOAD</span><span>{activeNode.load}%</span></div>
                    <LoadBar value={activeNode.load} color={activeNode.color} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
