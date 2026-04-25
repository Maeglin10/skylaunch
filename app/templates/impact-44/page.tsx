"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Brain, Network, Cpu, Eye, Zap, GitMerge, TrendingUp, Activity } from "lucide-react";

const MODELS = [
  { id: "m1", name: "SYNAPSE_7B", type: "Language", accuracy: 94.2, params: "7B", tasks: 847, image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", color: "#818cf8" },
  { id: "m2", name: "VISIO_12B", type: "Vision", accuracy: 97.1, params: "12B", tasks: 1240, image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80", color: "#34d399" },
  { id: "m3", name: "MESH_3B", type: "Graph Neural", accuracy: 89.7, params: "3B", tasks: 492, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", color: "#f472b6" },
  { id: "m4", name: "AXON_22B", type: "Multimodal", accuracy: 98.4, params: "22B", tasks: 2103, image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80", color: "#fb923c" },
  { id: "m5", name: "REFLEX_1B", type: "Edge / Mobile", accuracy: 86.3, params: "1B", tasks: 304, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", color: "#38bdf8" },
  { id: "m6", name: "CORTEX_70B", type: "Research", accuracy: 99.1, params: "70B", tasks: 3800, image: "https://images.unsplash.com/photo-1561144257-e32e8a34c834?w=800&q=80", color: "#e879f9" },
];

const STATS = [
  { label: "Models Deployed", value: 42, suffix: "" },
  { label: "Daily Inferences", value: 840, suffix: "M" },
  { label: "Avg Latency", value: 12, suffix: "ms" },
  { label: "Uptime", value: 99.98, suffix: "%" },
];

const USECASES = [
  { icon: Brain, title: "Cognitive Reasoning", desc: "Multi-step inference chains with structured chain-of-thought reasoning and self-consistency checks." },
  { icon: Eye, title: "Visual Understanding", desc: "Object detection, scene parsing, and document analysis from raw pixel inputs in real-time." },
  { icon: Network, title: "Graph Intelligence", desc: "Entity relationship extraction and knowledge graph construction from unstructured text corpora." },
  { icon: Zap, title: "Edge Inference", desc: "Quantized models running on resource-constrained devices with sub-16ms p99 latency." },
  { icon: GitMerge, title: "Multi-Agent Routing", desc: "Dynamic task decomposition and routing across specialized models with shared memory state." },
  { icon: TrendingUp, title: "Fine-Tuning API", desc: "Continuous learning pipelines with LoRA adapters. Production checkpoints in under 4 hours." },
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

function AccuracyBar({ value, color }: { value: number; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1 bg-white/10 rounded-full overflow-hidden">
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

export default function ParticleNeuralWeb() {
  const [activeModel, setActiveModel] = useState<typeof MODELS[0] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cx = useMotionValue(0); const cy = useMotionValue(0);
  const scx = useSpring(cx, { stiffness: 70, damping: 20 });
  const scy = useSpring(cy, { stiffness: 70, damping: 20 });

  // Neural pulse animation
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % 4), 1200);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "What inference backends do you support?", a: "CUDA, ROCm, Apple Neural Engine, and WebAssembly. Models auto-select the optimal backend based on the target hardware." },
    { q: "How does fine-tuning pricing work?", a: "Fine-tuning is billed per GPU-hour with LoRA adapters bringing most jobs under $50. Full fine-tunes for 70B models are project-quoted." },
    { q: "Is on-premise deployment available?", a: "Yes — AXON and SYNAPSE ship as Docker images with optional Kubernetes operators. Enterprise contracts include SLA and 24/7 support." },
    { q: "What's the context window for CORTEX_70B?", a: "256K tokens with sparse attention. Benchmarked at 99.1% MMLU accuracy with 18-second TTFT at 128K context." },
  ];

  return (
    <div className="min-h-screen bg-[#05060f] text-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#05060f]/90 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-full border border-[#818cf8]/40 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute inset-1.5 rounded-full bg-[#818cf8]" />
          </div>
          <span className="text-sm font-black tracking-[0.15em] uppercase">NEURALWEB</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Models", "API", "Research", "Pricing", "Status"].map(l => (
            <a key={l} href="#" className="hover:text-[#818cf8] hover:opacity-100 transition-all">{l}</a>
          ))}
        </div>
        <MagneticBtn className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#818cf8] text-[#05060f] text-xs font-black tracking-widest uppercase">
          Free API Key
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-white mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#05060f] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Models", "API", "Research", "Pricing", "Status"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:text-[#818cf8] transition-colors" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={e => { cx.set(e.clientX - window.innerWidth / 2); cy.set(e.clientY - window.innerHeight / 2); }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={MODELS[3].image} alt="hero" fill unoptimized className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-[#05060f]/80" />
        </motion.div>
        {/* Cursor orb */}
        <motion.div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl" style={{ x: scx, y: scy, background: "radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)", left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }} />
        {/* Node dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} animate={{ opacity: pulse === i % 4 ? 0.6 : 0.1, scale: pulse === i % 4 ? 1.5 : 1 }} transition={{ duration: 0.4 }} className="absolute w-1.5 h-1.5 rounded-full bg-[#818cf8]" style={{ left: `${10 + (i % 4) * 25}%`, top: `${20 + Math.floor(i / 4) * 30}%` }} />
        ))}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.3em] text-[#818cf8] mb-6 flex items-center justify-center gap-3">
            <Activity size={10} /> NEXT-GEN AI INFERENCE PLATFORM
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="text-5xl md:text-9xl font-black leading-none tracking-tight mb-6">
            NEURAL<br /><span className="text-[#818cf8]">WEB</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm opacity-40 max-w-xl mx-auto mb-10 leading-relaxed">
            6 specialized models. 840M daily inferences. One unified API for everything from edge to research-grade tasks.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="px-8 py-4 bg-[#818cf8] text-[#05060f] font-black text-xs tracking-[0.2em] uppercase">Get API Key</a>
            <a href="#" className="px-8 py-4 border border-white/20 text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-colors">Read Docs</a>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[#818cf8]/10 py-3 overflow-hidden bg-[#818cf8]/5">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-[9px] tracking-[0.2em] text-[#818cf8]/40 uppercase">SYNAPSE_7B · VISIO_12B · MESH_3B · AXON_22B · REFLEX_1B · CORTEX_70B · 840M INFERENCES/DAY · 12MS LATENCY ·</span>
          ))}
        </motion.div>
      </div>

      {/* Models */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-2xl font-black tracking-tight uppercase mb-2">Model Hub</h2></Reveal>
        <Reveal delay={0.1}><p className="text-sm opacity-40 mb-16">Select from 6 production-grade models or fine-tune your own.</p></Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {MODELS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setActiveModel(m)} className="cursor-pointer border border-white/5 hover:border-white/10 transition-colors bg-[#0a0b16] p-6 group">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "16/9" }}>
                  <Image src={m.image} alt={m.name} fill unoptimized className="object-cover opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 flex items-end p-3">
                    <span className="text-[9px] font-bold px-2 py-1 border tracking-widest" style={{ borderColor: m.color + "60", color: m.color }}>{m.type}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black tracking-wider" style={{ color: m.color }}>{m.name}</span>
                  <span className="text-[9px] opacity-30 tracking-wider">{m.params}</span>
                </div>
                <div className="space-y-2 text-[9px]">
                  <div>
                    <div className="flex justify-between mb-1.5 opacity-30 tracking-wider"><span>ACCURACY</span><span>{m.accuracy}%</span></div>
                    <AccuracyBar value={m.accuracy} color={m.color} />
                  </div>
                  <div className="flex justify-between opacity-30 tracking-wider pt-1"><span>TASKS COMPLETED</span><span>{m.tasks.toLocaleString()}</span></div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#0a0b16] px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-tight uppercase mb-16">Capabilities</h2></Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {USECASES.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="p-6 border border-white/5 hover:border-[#818cf8]/20 transition-colors">
                  <u.icon size={20} className="mb-4 text-[#818cf8]" />
                  <h3 className="text-sm font-black mb-2">{u.title}</h3>
                  <p className="text-xs opacity-40 leading-relaxed">{u.desc}</p>
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
              <div className="text-4xl font-black mb-2 text-[#818cf8]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.2em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <Reveal><h2 className="text-xl font-black tracking-tight uppercase mb-12">Technical FAQ</h2></Reveal>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="border-b border-white/5">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-sm font-bold">
                {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-5 text-sm opacity-40 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 8, repeat: Infinity }} className="absolute inset-0 rounded-full m-auto w-[800px] h-[800px] bg-[#818cf8] blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Reveal><h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 leading-none">BUILD ON<br /><span className="text-[#818cf8]">NEURALWEB</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">Free tier: 1M tokens/month. Production plans from $29/month. No credit card for signup.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#818cf8] text-[#05060f] font-black text-xs tracking-[0.2em] uppercase">
              Start Building <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] opacity-20 tracking-[0.2em] uppercase">
        <span>NeuralWeb AI © 2026</span>
        <div className="flex gap-8">{["GitHub", "Discord", "Docs", "Blog"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Model Modal */}
      <AnimatePresence>
        {activeModel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-6" onClick={() => setActiveModel(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-[#0a0b16] border max-w-lg w-full overflow-hidden" style={{ borderColor: activeModel.color + "40" }}>
              <div className="relative h-48">
                <Image src={activeModel.image} alt={activeModel.name} fill unoptimized className="object-cover opacity-40" />
                <button onClick={() => setActiveModel(null)} className="absolute top-4 right-4 opacity-60 hover:opacity-100"><X size={16} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black tracking-widest text-sm" style={{ color: activeModel.color }}>{activeModel.name}</h3>
                  <span className="text-[9px] tracking-wider border px-2 py-1" style={{ borderColor: activeModel.color + "40", color: activeModel.color }}>{activeModel.type}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-[10px]">
                  <div><div className="font-black text-lg" style={{ color: activeModel.color }}>{activeModel.params}</div><div className="opacity-30 tracking-wider">PARAMETERS</div></div>
                  <div><div className="font-black text-lg" style={{ color: activeModel.color }}>{activeModel.accuracy}%</div><div className="opacity-30 tracking-wider">ACCURACY</div></div>
                  <div><div className="font-black text-lg" style={{ color: activeModel.color }}>{activeModel.tasks.toLocaleString()}</div><div className="opacity-30 tracking-wider">TASKS</div></div>
                </div>
                <div>
                  <div className="text-[9px] tracking-wider opacity-30 mb-2">ACCURACY BENCHMARK</div>
                  <AccuracyBar value={activeModel.accuracy} color={activeModel.color} />
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="#" className="flex-1 py-3 font-black text-xs tracking-widest uppercase text-center text-[#05060f]" style={{ background: activeModel.color }}>Use This Model</a>
                  <a href="#" className="flex-1 py-3 border border-white/20 text-xs tracking-widest uppercase text-center hover:bg-white/5 transition-colors">View Docs</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
