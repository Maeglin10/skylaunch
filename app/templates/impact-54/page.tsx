"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Leaf, Sun, Droplets, Wind, TreePine, Recycle, Globe, Award } from "lucide-react";

const EXPERIENCES = [
  { id: 1, name: "Forest Bathing", location: "Black Forest, Germany", duration: "3 nights", price: "€1,480", guests: 8, image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", color: "#34d399", tags: ["Forest", "Wellness"] },
  { id: 2, name: "Desert Silence Retreat", location: "Sahara, Morocco", duration: "5 nights", price: "€2,200", guests: 6, image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80", color: "#f59e0b", tags: ["Desert", "Meditation"] },
  { id: 3, name: "Arctic Aurora Lodge", location: "Tromsø, Norway", duration: "4 nights", price: "€3,600", guests: 4, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80", color: "#818cf8", tags: ["Arctic", "Aurora"] },
  { id: 4, name: "Rainforest Canopy Stay", location: "Costa Rica", duration: "7 nights", price: "€2,900", guests: 6, image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80", color: "#10b981", tags: ["Rainforest", "Wildlife"] },
  { id: 5, name: "Coastal Dune Eco-Camp", location: "Namibia", duration: "6 nights", price: "€3,100", guests: 8, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", color: "#f43f5e", tags: ["Coastal", "Safari"] },
  { id: 6, name: "Mountain Silence", location: "Kyoto, Japan", duration: "4 nights", price: "€2,600", guests: 4, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", color: "#0ea5e9", tags: ["Mountain", "Culture"] },
];

const VALUES = [
  { icon: Leaf, title: "Carbon Neutral", desc: "Every stay is carbon-offset through verified reforestation projects in the destination region." },
  { icon: Droplets, title: "Zero-Waste Camps", desc: "All accommodation uses compostable materials, rainwater collection, and zero single-use plastic." },
  { icon: TreePine, title: "Forest Pledges", desc: "10% of every booking funds local tree-planting. Over 240,000 trees planted since 2019." },
  { icon: Globe, title: "Community-First", desc: "Local guides, local food, local ownership. At least 80% of every booking stays in the community." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
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

export default function ParticleFireflies() {
  const [activeExp, setActiveExp] = useState<typeof EXPERIENCES[0] | null>(null);
  const [activeTag, setActiveTag] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const allTags = ["All", "Forest", "Desert", "Arctic", "Rainforest", "Mountain"];
  const filtered = activeTag === "All" ? EXPERIENCES : EXPERIENCES.filter(e => e.tags.includes(activeTag));

  const faqs = [
    { q: "How are camps sustainably built?", a: "All structures use local natural materials, raised foundations to protect root systems, and are fully dismantlable. No permanent footprint." },
    { q: "What's included in the price?", a: "All accommodation, meals prepared from local ingredients, guided excursions, transfers from the nearest airport, and carbon offset credits." },
    { q: "What if I need to cancel?", a: "Full refund up to 60 days before. 50% refund 30–60 days. Within 30 days we offer a full credit valid for 2 years." },
    { q: "How small are the group sizes?", a: "4–8 guests maximum per experience. We believe small groups protect ecosystems and deepen connection." },
  ];

  return (
    <div className="min-h-screen bg-[#0b1209] text-white" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div key={i} animate={{ y: [0, -30, 0], x: [0, Math.sin(i) * 15, 0], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }} className="fixed rounded-full pointer-events-none z-[1]" style={{ width: 2 + (i % 3), height: 2 + (i % 3), background: "#34d399", left: `${5 + (i * 6) % 90}%`, top: `${10 + (i * 7) % 80}%` }} />
      ))}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1209]/80 to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-2">
          <Leaf size={16} className="text-[#34d399]" />
          <span className="text-sm font-black tracking-[0.15em] uppercase text-[#34d399]">TERRA</span>
        </div>
        <div className="relative hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Experiences", "Destinations", "Values", "Community", "Book"].map(l => (
            <a key={l} href="#" className="hover:text-[#34d399] hover:opacity-100 transition-all">{l}</a>
          ))}
        </div>
        <MagneticBtn className="relative hidden md:flex items-center gap-2 px-5 py-2 bg-[#34d399] text-[#0b1209] text-xs font-black tracking-widest uppercase">
          Book Now <ArrowRight size={12} />
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="relative md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-[#34d399] mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#0b1209] flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-[#34d399]"><X size={24} /></button>
            {["Experiences", "Destinations", "Values", "Community", "Book"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider text-[#34d399] hover:opacity-60 transition-opacity" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-209977?w=800&q=80" alt="forest" fill unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1209] via-[#0b1209]/40 to-transparent" />
        </motion.div>
        <div className="relative z-10 px-8 md:px-16 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-4 text-[#34d399]/60 text-[10px] tracking-[0.25em] uppercase">
            <Leaf size={10} /> Carbon Neutral · Zero-Waste · Community-First
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }} className="text-5xl md:text-9xl font-black leading-none mb-8">
            Sleep inside<br /><span className="text-[#34d399]">nature.</span>
          </motion.h1>
          <MagneticBtn className="inline-flex items-center gap-3 px-8 py-4 bg-[#34d399] text-[#0b1209] font-black text-xs tracking-widest uppercase">
            Explore Experiences <ArrowRight size={14} />
          </MagneticBtn>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[#34d399]/10 py-3 overflow-hidden">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(8).fill(0).map((_, i) => EXPERIENCES.map(e => (
            <span key={`${i}-${e.id}`} className="text-[9px] tracking-[0.25em] uppercase text-[#34d399]/25">{e.name} · {e.location} ·</span>
          )))}
        </motion.div>
      </div>

      {/* Experiences */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Experiences</h2>
            <p className="text-sm opacity-40">Immersive eco-stays in ecosystems that need protecting.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {allTags.map(t => (
              <button key={t} onClick={() => setActiveTag(t)} className="px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors" style={{ background: activeTag === t ? "#34d399" : "transparent", color: activeTag === t ? "#0b1209" : "rgba(255,255,255,0.5)", border: "1px solid", borderColor: activeTag === t ? "#34d399" : "rgba(255,255,255,0.1)" }}>
                {t}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.07}>
                <motion.div layout whileHover={{ y: -8 }} onClick={() => setActiveExp(e)} className="cursor-pointer group">
                  <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "4/3" }}>
                    <Image src={e.image} alt={e.name} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1209]/70 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-1">
                      {e.tags.map(t => <span key={t} className="text-[9px] font-bold px-2 py-1 tracking-wider uppercase" style={{ background: e.color + "33", color: e.color, border: `1px solid ${e.color}40` }}>{t}</span>)}
                    </div>
                    <div className="absolute bottom-3 right-3 text-right">
                      <div className="text-xs font-black" style={{ color: e.color }}>{e.price}</div>
                      <div className="text-[9px] opacity-40">{e.duration}</div>
                    </div>
                  </div>
                  <h3 className="text-base font-black mb-1">{e.name}</h3>
                  <div className="flex items-center gap-2 text-xs opacity-40">
                    <Globe size={11} /> {e.location} · Max {e.guests} guests
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0f1a0d] px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-tight mb-16 text-[#34d399]">How We Protect</h2></Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="p-6 border border-[#34d399]/10 hover:border-[#34d399]/20 transition-colors">
                  <v.icon size={20} className="text-[#34d399] mb-4" />
                  <h3 className="text-sm font-black mb-2">{v.title}</h3>
                  <p className="text-xs opacity-40 leading-relaxed">{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ label: "Trees Planted", value: 240, suffix: "k+" }, { label: "Ecosystems Protected", value: 14, suffix: "" }, { label: "Travellers", value: 8400, suffix: "+" }, { label: "CO₂ Offset Tonnes", value: 3200, suffix: "+" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2 text-[#34d399]"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.2em] uppercase opacity-30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <Reveal><h2 className="text-xl font-black tracking-tight mb-12 text-[#34d399]">Questions</h2></Reveal>
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
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.1, 0.04] }} transition={{ duration: 8, repeat: Infinity }} className="absolute inset-0 rounded-full m-auto w-[700px] h-[700px] bg-[#34d399] blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Reveal><h2 className="text-5xl md:text-8xl font-black mb-4 leading-none">LEAVE NO<br /><span className="text-[#34d399]">TRACE.</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">Every TERRA experience is designed to give back more than it takes. Come experience the wild — and help protect it.</p></Reveal>
          <Reveal delay={0.3}>
            <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#34d399] text-[#0b1209] font-black text-xs tracking-[0.2em] uppercase">
              Find Your Experience <ArrowRight size={14} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-20 tracking-wider uppercase">
        <span className="flex items-center gap-2"><Leaf size={12} className="text-[#34d399]" /> TERRA ECO-EXPERIENCES © 2026</span>
        <div className="flex gap-8">{["Instagram", "Newsletter", "Press", "B-Corp"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Experience Modal */}
      <AnimatePresence>
        {activeExp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-6" onClick={() => setActiveExp(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={e => e.stopPropagation()} className="bg-[#0f1a0d] border max-w-2xl w-full overflow-hidden flex flex-col md:flex-row" style={{ borderColor: activeExp.color + "40" }}>
              <div className="relative md:w-1/2" style={{ aspectRatio: "4/3" }}>
                <Image src={activeExp.image} alt={activeExp.name} fill unoptimized className="object-cover" />
              </div>
              <div className="p-6 flex-1">
                <button onClick={() => setActiveExp(null)} className="float-right opacity-40 hover:opacity-100"><X size={18} /></button>
                <div className="clear-right pt-2">
                  <h3 className="text-xl font-black mb-1" style={{ color: activeExp.color }}>{activeExp.name}</h3>
                  <p className="text-xs opacity-40 mb-4 flex items-center gap-1"><Globe size={11} /> {activeExp.location}</p>
                  <div className="space-y-1.5 text-xs mb-6">
                    <div className="flex justify-between border-b border-white/5 py-2"><span className="opacity-30">Duration</span><span>{activeExp.duration}</span></div>
                    <div className="flex justify-between border-b border-white/5 py-2"><span className="opacity-30">Max Group</span><span>{activeExp.guests} guests</span></div>
                    <div className="flex justify-between py-2"><span className="opacity-30">From</span><span className="font-black text-lg" style={{ color: activeExp.color }}>{activeExp.price}</span></div>
                  </div>
                  <a href="#" className="block w-full py-3 font-black text-xs tracking-widest uppercase text-center text-[#0b1209]" style={{ background: activeExp.color }}>
                    Request to Book
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
