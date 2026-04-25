"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Target, Shield, Radio, Map, Crosshair, Layers, Eye, Zap } from "lucide-react";

const SYSTEMS = [
  { id: "s1", name: "OVERWATCH ARRAY", category: "Surveillance", status: "ACTIVE", coverage: "12km radius", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", color: "#00d4ff" },
  { id: "s2", name: "VECTOR STRIKE", category: "Precision", status: "STANDBY", coverage: "340km range", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", color: "#f43f5e" },
  { id: "s3", name: "MESH RELAY", category: "Communications", status: "ACTIVE", coverage: "Global", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", color: "#34d399" },
  { id: "s4", name: "GHOST SHIELD", category: "Defense", status: "CHARGING", coverage: "48km radius", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80", color: "#fb923c" },
];

const OPS = [
  { id: "OP-001", name: "OPERATION NIGHTFALL", region: "SECTOR 7-ALPHA", classified: true, image: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&q=80", color: "#00d4ff" },
  { id: "OP-002", name: "OPERATION FROSTLINE", region: "ARCTIC ZONE C", classified: false, image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80", color: "#f43f5e" },
  { id: "OP-003", name: "OPERATION MERIDIAN", region: "PACIFIC GRID", classified: false, image: "https://images.unsplash.com/photo-1561144257-e32e8a34c834?w=800&q=80", color: "#34d399" },
  { id: "OP-004", name: "OPERATION STARFALL", region: "ORBITAL CLUSTER 4", classified: true, image: "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800&q=80", color: "#fb923c" },
];

const STATS = [
  { label: "Systems Online", value: 148, suffix: "" },
  { label: "Active Ops", value: 12, suffix: "" },
  { label: "Uptime", value: 99.97, suffix: "%" },
  { label: "Response ms", value: 4, suffix: "ms" },
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
    let n = 0; const step = Math.max(1, Math.ceil(target / 55));
    const t = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(t); } else setCount(n); }, 24);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
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

export default function HoloTacticalSPA() {
  const [activeOp, setActiveOp] = useState<typeof OPS[0] | null>(null);
  const [activeSystem, setActiveSystem] = useState(SYSTEMS[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cx = useMotionValue(0); const cy = useMotionValue(0);
  const scx = useSpring(cx, { stiffness: 70, damping: 20 });
  const scy = useSpring(cy, { stiffness: 70, damping: 20 });

  const [scanLine, setScanLine] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScanLine(l => (l + 1) % 100), 40);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "What export compliance applies?", a: "All systems are ITAR/EAR controlled. End-user certification required prior to any demonstration or technical data transfer." },
    { q: "How is system integration scoped?", a: "Integration projects are scoped per client. Typical timelines range from 8 weeks (software-only) to 18 months (full hardware deployment)." },
    { q: "What clearance is needed for classified operations?", a: "TS/SCI clearance required for Operation NIGHTFALL and STARFALL access. DoD-approved personnel only." },
    { q: "Do you offer simulation environments?", a: "Yes — HOLO-SIM provides classified-equivalent testing with synthetic data injection for pre-deployment validation." },
  ];

  return (
    <div className="min-h-screen bg-[#04080e] text-white font-mono">
      {/* Scanline overlay */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.3) 2px, rgba(0,212,255,0.3) 4px)" }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-[#00d4ff]/10 bg-[#04080e]/90 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <Crosshair size={18} className="text-[#00d4ff]" />
          <span className="text-xs font-black tracking-[0.3em] uppercase text-[#00d4ff]">HOLO/TACTICAL</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-40">
          {["Systems", "Operations", "Intelligence", "Deployment", "Access"].map(l => (
            <a key={l} href="#" className="hover:text-[#00d4ff] hover:opacity-100 transition-all">{l}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[9px] text-[#00d4ff]/50 tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-pulse" /> SYS_NOMINAL
          </span>
          <MagneticBtn className="px-4 py-2 border border-[#00d4ff]/30 text-[#00d4ff] text-[10px] tracking-[0.2em] uppercase hover:bg-[#00d4ff]/10 transition-colors">
            Request Access
          </MagneticBtn>
        </div>
        <button onClick={() => setMobileOpen(true)} className="md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-[#00d4ff] mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#04080e] flex flex-col p-10 border-l border-[#00d4ff]/10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-[#00d4ff]"><X size={24} /></button>
            {["Systems", "Operations", "Intelligence", "Deployment", "Access"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-3xl font-black mb-6 uppercase tracking-wider text-[#00d4ff] hover:opacity-60 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={e => { cx.set(e.clientX - window.innerWidth / 2); cy.set(e.clientY - window.innerHeight / 2); }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" alt="tactical" fill unoptimized className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#04080e]/70" />
        </motion.div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.8) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Cursor orb */}
        <motion.div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl" style={{ x: scx, y: scy, background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }} />
        {/* Corner brackets */}
        {[["top-8 left-8 border-t border-l", ""], ["top-8 right-8 border-t border-r", ""], ["bottom-8 left-8 border-b border-l", ""], ["bottom-8 right-8 border-b border-r", ""]].map(([cls], i) => (
          <div key={i} className={`absolute w-8 h-8 border-[#00d4ff]/30 ${cls}`} />
        ))}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] tracking-[0.35em] text-[#00d4ff]/50 mb-6 flex items-center justify-center gap-3">
            CLASSIFICATION: RESTRICTED // TACTICAL OPERATIONS PLATFORM v7.4
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="text-5xl md:text-9xl font-black leading-none tracking-tight mb-6 text-[#00d4ff]">
            HOLO<br />TACTICAL
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs opacity-30 max-w-lg mx-auto mb-10 tracking-wider leading-loose">
            Multi-domain command & control. Autonomous threat assessment.<br />Sub-4ms response across 148 networked systems.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="px-8 py-4 bg-[#00d4ff] text-[#04080e] font-black text-[10px] tracking-[0.25em] uppercase">Request Briefing</a>
            <a href="#" className="px-8 py-4 border border-[#00d4ff]/30 text-[#00d4ff] text-[10px] tracking-[0.25em] uppercase hover:bg-[#00d4ff]/5 transition-colors">System Overview</a>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[#00d4ff]/10 py-3 overflow-hidden">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-[9px] tracking-[0.25em] text-[#00d4ff]/20 uppercase">SYS::NOMINAL · THREAT_LEVEL::AMBER · 148_SYSTEMS_ONLINE · LATENCY_4MS · UPTIME_99.97 · MULTI-DOMAIN_C2 ·</span>
          ))}
        </motion.div>
      </div>

      {/* Systems */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-xl font-black tracking-[0.25em] uppercase mb-2 text-[#00d4ff]">ACTIVE_SYSTEMS</h2></Reveal>
        <Reveal delay={0.1}><p className="text-[10px] opacity-30 tracking-wider mb-12">148 systems networked. Real-time status monitoring.</p></Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setActiveSystem(s)} className="cursor-pointer border bg-[#060c14] p-4 group transition-colors" style={{ borderColor: s.id === activeSystem.id ? s.color + "60" : "rgba(255,255,255,0.05)" }}>
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "16/9" }}>
                  <Image src={s.image} alt={s.name} fill unoptimized className="object-cover opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-2 right-2">
                    <span className={`text-[9px] font-bold px-2 py-1 tracking-widest ${s.status === "ACTIVE" ? "bg-green-500/20 text-green-400 border border-green-500/30" : s.status === "STANDBY" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-orange-500/20 text-orange-400 border border-orange-500/30"}`}>{s.status}</span>
                  </div>
                </div>
                <div className="text-[9px] opacity-30 tracking-wider mb-1">{s.category}</div>
                <div className="text-sm font-black tracking-wider mb-1" style={{ color: s.color }}>{s.name}</div>
                <div className="text-[9px] opacity-20 tracking-wider">{s.coverage}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Operations */}
      <section className="py-24 bg-[#060c14] px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal><h2 className="text-xl font-black tracking-[0.25em] uppercase mb-2 text-[#00d4ff]">ACTIVE_OPS</h2></Reveal>
          <Reveal delay={0.1}><p className="text-[10px] opacity-30 tracking-wider mb-12">12 operations active. Classified entries require clearance.</p></Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {OPS.map((op, i) => (
              <Reveal key={op.id} delay={i * 0.08}>
                <motion.div whileHover={{ x: 6 }} onClick={() => setActiveOp(op)} className="flex items-center gap-4 border border-white/5 p-4 cursor-pointer hover:border-white/10 transition-colors group">
                  <div className="relative w-20 h-14 shrink-0 overflow-hidden">
                    <Image src={op.image} alt={op.name} fill unoptimized className={`object-cover ${op.classified ? "grayscale opacity-20" : "opacity-40"} group-hover:opacity-60 transition-opacity`} />
                    {op.classified && <div className="absolute inset-0 flex items-center justify-center"><Shield size={16} className="text-red-400 opacity-60" /></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] opacity-30 tracking-wider mb-0.5">{op.id}</div>
                    <div className="text-sm font-black tracking-wider truncate" style={{ color: op.color }}>{op.classified ? "████████████████" : op.name}</div>
                    <div className="text-[9px] opacity-20 tracking-wider mt-0.5">{op.region}</div>
                  </div>
                  {op.classified ? (
                    <span className="text-[9px] border border-red-500/30 text-red-400 px-2 py-1 shrink-0">CLASSIFIED</span>
                  ) : (
                    <span className="text-[9px] border border-green-500/30 text-green-400 px-2 py-1 shrink-0">ACTIVE</span>
                  )}
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
              <div className="text-4xl font-black mb-2 text-[#00d4ff]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.25em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <Reveal><h2 className="text-lg font-black tracking-[0.25em] uppercase mb-12 text-[#00d4ff]">FAQ::CLASSIFIED</h2></Reveal>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="border-b border-white/5">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-xs tracking-wider">
                {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={14} /></motion.span>
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
        <div className="absolute inset-0 opacity-3" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px", opacity: 0.03 }} />
        <div className="relative z-10">
          <Reveal><h2 className="text-4xl md:text-7xl font-black tracking-tight mb-4 leading-none text-[#00d4ff]">REQUEST<br />BRIEFING</h2></Reveal>
          <Reveal delay={0.2}><p className="text-xs opacity-30 mb-10 max-w-sm mx-auto tracking-wider leading-loose">Cleared personnel only. Provide your unit ID and clearance level for system access.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#00d4ff] text-[#04080e] font-black text-[10px] tracking-[0.25em] uppercase">
              INITIATE CONTACT <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] opacity-20 tracking-[0.25em] uppercase">
        <span>HOLO TACTICAL SYSTEMS © 2026</span>
        <span>EXPORT CONTROLLED · ITAR/EAR · AUTHORIZED PERSONNEL ONLY</span>
      </footer>

      {/* Op Modal */}
      <AnimatePresence>
        {activeOp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6" onClick={() => setActiveOp(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-[#060c14] border max-w-md w-full" style={{ borderColor: activeOp.color + "40" }}>
              <div className="relative h-40 overflow-hidden">
                <Image src={activeOp.image} alt={activeOp.name} fill unoptimized className={`object-cover ${activeOp.classified ? "grayscale opacity-15" : "opacity-30"}`} />
                <button onClick={() => setActiveOp(null)} className="absolute top-3 right-3 opacity-60 hover:opacity-100"><X size={16} /></button>
              </div>
              <div className="p-6">
                <div className="text-[9px] opacity-30 tracking-wider mb-2">{activeOp.id} · {activeOp.region}</div>
                <h3 className="font-black text-sm tracking-wider mb-4" style={{ color: activeOp.color }}>
                  {activeOp.classified ? "█████ ██████████" : activeOp.name}
                </h3>
                {activeOp.classified ? (
                  <p className="text-[11px] opacity-30 tracking-wider leading-loose">ACCESS DENIED. TS/SCI CLEARANCE REQUIRED.<br />CONTACT YOUR SECURITY OFFICER FOR AUTHORIZATION.</p>
                ) : (
                  <p className="text-[11px] opacity-30 tracking-wider leading-loose">Operation ongoing. Multi-system coordination active across {activeOp.region}. Full briefing available to authorized personnel.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
