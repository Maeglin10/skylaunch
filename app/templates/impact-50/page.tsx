"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Play, Pause, Volume2, VolumeX, Layers, Monitor, Smartphone, Tablet, Eye } from "lucide-react";

const LAYERS = [
  { id: 1, name: "BASE_LAYER", color: "#0ea5e9", opacity: 1.0, blur: 0, image: "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1200&q=80" },
  { id: 2, name: "CHROMA_LAYER", color: "#8b5cf6", opacity: 0.6, blur: 4, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80" },
  { id: 3, name: "NOISE_LAYER", color: "#f43f5e", opacity: 0.3, blur: 2, image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80" },
];

const WORK = [
  { id: "w1", title: "BRAND IDENTITY", client: "Nexus Corp", year: 2025, tags: ["Branding", "Motion"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80", color: "#0ea5e9" },
  { id: "w2", title: "CAMPAIGN 360", client: "Aurore Beauty", year: 2025, tags: ["Video", "Social"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", color: "#f43f5e" },
  { id: "w3", title: "APP EXPERIENCE", client: "Veldt Finance", year: 2024, tags: ["UI/UX", "Prototype"], image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80", color: "#34d399" },
  { id: "w4", title: "EDITORIAL FILM", client: "Maison Gallet", year: 2024, tags: ["Film", "Direction"], image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", color: "#f59e0b" },
  { id: "w5", title: "DIGITAL PLATFORM", client: "Strata AI", year: 2024, tags: ["Web", "Animation"], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", color: "#e879f9" },
  { id: "w6", title: "PRODUCT LAUNCH", client: "Volta Motors", year: 2023, tags: ["Strategy", "OOH"], image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", color: "#818cf8" },
];

const SERVICES = [
  { icon: Monitor, title: "Digital Experiences", desc: "Web, app, and interactive installations that respond, adapt, and surprise." },
  { icon: Layers, title: "Brand Systems", desc: "Visual identities built as living systems — not static guidelines." },
  { icon: Play, title: "Motion & Film", desc: "From 6-second social to 90-minute editorial. Always in motion." },
  { icon: Eye, title: "Creative Strategy", desc: "The thinking before the making. Positioning, narrative, channel strategy." },
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

export default function VideoMultiLayer() {
  const [activeWork, setActiveWork] = useState<typeof WORK[0] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const cx = useMotionValue(0); const cy = useMotionValue(0);
  const scx = useSpring(cx, { stiffness: 70, damping: 20 });
  const scy = useSpring(cy, { stiffness: 70, damping: 20 });

  useEffect(() => {
    const t = setInterval(() => setActiveLayer(l => (l + 1) % LAYERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const faqs = [
    { q: "What types of projects do you take on?", a: "Brand systems, campaign films, digital products, and cultural projects. We're format-agnostic and idea-led." },
    { q: "What's your typical project timeline?", a: "Identity projects run 8–12 weeks. Campaign productions 4–6 weeks. We don't do rushed work — but we do move fast when the brief is sharp." },
    { q: "Do you work with early-stage companies?", a: "Yes — some of our best work has been with ambitious startups. We offer a focused sprint format for pre-Series A brands." },
    { q: "Where are you based?", a: "Paris studio, with a network of collaborators in London, Berlin, and New York. We travel for production as needed." },
  ];

  return (
    <div className="min-h-screen bg-[#07050c] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07050c]/80 to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-3">
          {LAYERS.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i === activeLayer ? LAYERS[activeLayer].color : "rgba(255,255,255,0.2)", transform: i === activeLayer ? "scale(1.5)" : "scale(1)" }} />
          ))}
          <span className="ml-2 text-sm font-black tracking-[0.15em] uppercase">STRATA</span>
        </div>
        <div className="relative hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Work", "Services", "Studio", "Lab", "Contact"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <MagneticBtn className="relative hidden md:block px-5 py-2 border border-white/20 text-[10px] tracking-widest uppercase hover:bg-white/10 transition-colors">
          Start a Project →
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="relative md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-white mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#07050c] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Work", "Services", "Studio", "Lab", "Contact"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:opacity-50 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero — Multi-layer video composition */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={e => { cx.set(e.clientX - window.innerWidth / 2); cy.set(e.clientY - window.innerHeight / 2); }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {LAYERS.map((layer, i) => (
            <motion.div key={layer.id} animate={{ opacity: i === activeLayer ? layer.opacity : 0 }} transition={{ duration: 1.2 }} className="absolute inset-0" style={{ mixBlendMode: i === 0 ? "normal" : "screen", filter: `blur(${layer.blur}px)` }}>
              <Image src={layer.image} alt={layer.name} fill unoptimized className="object-cover" />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-[#07050c]/60" />
        </motion.div>
        {/* Cursor gradient */}
        <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl" style={{ x: scx, y: scy, background: `radial-gradient(circle, ${LAYERS[activeLayer].color}15 0%, transparent 70%)`, left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 mb-6">
            {LAYERS.map((l, i) => (
              <button key={l.id} onClick={() => setActiveLayer(i)} className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-colors" style={{ borderColor: i === activeLayer ? l.color : "rgba(255,255,255,0.1)", color: i === activeLayer ? l.color : "rgba(255,255,255,0.3)" }}>
                {l.name}
              </button>
            ))}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="text-5xl md:text-9xl font-black leading-none tracking-tight mb-6">
            STRATA<br /><span style={{ color: LAYERS[activeLayer].color }}>STUDIO</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm opacity-40 max-w-xl mx-auto mb-10 leading-relaxed">
            Creative direction, motion design, and digital production. We build what brands are afraid to dream up.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="px-8 py-4 font-black text-xs tracking-[0.2em] uppercase text-[#07050c]" style={{ background: LAYERS[activeLayer].color }}>View Our Work</a>
            <a href="#" className="px-8 py-4 border border-white/20 text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-colors">Start a Brief</a>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-white/5 py-3 overflow-hidden">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-[9px] tracking-[0.3em] uppercase opacity-20">BRAND IDENTITY · MOTION DESIGN · DIGITAL EXPERIENCES · FILM DIRECTION · STRATEGY ·</span>
          ))}
        </motion.div>
      </div>

      {/* Work */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-2xl font-black tracking-tight uppercase mb-16">Selected Work</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {WORK.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.02 }} onClick={() => setActiveWork(w)} className="cursor-pointer group relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src={w.image} alt={w.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07050c]/80 to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {w.tags.map(t => <span key={t} className="text-[9px] tracking-wider uppercase px-2 py-1 border border-white/20">{t}</span>)}
                  </div>
                  <h3 className="text-base font-black" style={{ color: w.color }}>{w.title}</h3>
                  <p className="text-[10px] opacity-40 mt-1">{w.client} · {w.year}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#0c0a12] px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-tight uppercase mb-16">Services</h2></Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="p-6 border border-white/5 hover:border-white/10 transition-colors">
                  <s.icon size={20} className="mb-4 opacity-50" style={{ color: LAYERS[i % LAYERS.length].color }} />
                  <h3 className="text-sm font-black mb-2">{s.title}</h3>
                  <p className="text-xs opacity-40 leading-relaxed">{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ label: "Projects Completed", value: 148, suffix: "" }, { label: "Brands Served", value: 64, suffix: "" }, { label: "Team Members", value: 22, suffix: "" }, { label: "Years in Business", value: 9, suffix: "" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2" style={{ color: LAYERS[i % LAYERS.length].color }}><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.2em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <Reveal><h2 className="text-xl font-black tracking-tight uppercase mb-12">FAQ</h2></Reveal>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="border-b border-white/10">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-sm font-bold">
                {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-5 text-sm opacity-50 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <motion.div animate={{ opacity: [0.04, 0.1, 0.04] }} transition={{ duration: 6, repeat: Infinity }} className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${LAYERS[activeLayer].color}20, transparent 60%)` }} />
        <div className="relative z-10">
          <Reveal><h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 leading-none uppercase">MAKE<br /><span style={{ color: LAYERS[activeLayer].color }}>SOMETHING</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">We work with 6–8 clients per year. Let's see if yours is one of them.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 font-black text-xs tracking-[0.2em] uppercase text-[#07050c]" style={{ background: LAYERS[activeLayer].color }}>
              Start a Brief <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-20 tracking-wider uppercase">
        <span>Strata Studio © 2026</span>
        <div className="flex gap-8">{["Instagram", "Vimeo", "LinkedIn", "Contact"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Work Modal */}
      <AnimatePresence>
        {activeWork && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-6" onClick={() => setActiveWork(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={e => e.stopPropagation()} className="bg-[#0c0a12] border max-w-2xl w-full overflow-hidden" style={{ borderColor: activeWork.color + "40" }}>
              <div className="relative h-56">
                <Image src={activeWork.image} alt={activeWork.title} fill unoptimized className="object-cover" />
                <button onClick={() => setActiveWork(null)} className="absolute top-4 right-4 bg-black/60 p-2"><X size={16} /></button>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">{activeWork.tags.map(t => <span key={t} className="text-[9px] tracking-wider uppercase px-2 py-1 border border-white/20">{t}</span>)}</div>
                <h3 className="text-2xl font-black mb-1" style={{ color: activeWork.color }}>{activeWork.title}</h3>
                <p className="text-xs opacity-40 mb-4">{activeWork.client} · {activeWork.year}</p>
                <p className="text-sm opacity-60 leading-relaxed mb-6">A full-stack creative engagement — strategy through execution. Built for visibility, designed to last.</p>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase" style={{ color: activeWork.color }}>
                  View Full Case Study <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
