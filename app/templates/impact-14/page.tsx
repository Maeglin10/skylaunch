"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowRight, ArrowDown, Circle } from "lucide-react";
import "../premium.css";

const CHAPTERS = [
  { num: "01", title: "The Beginning", desc: "Every great brand starts with a singular conviction — a belief about the world that only you hold.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" },
  { num: "02", title: "The Conflict", desc: "Growth reveals tension between the original vision and the demands of scale. This is where most brands lose themselves.", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop" },
  { num: "03", title: "The Turn", desc: "The brands that endure find a way to hold their truth while evolving their expression. That moment of resolution is everything.", img: "https://images.unsplash.com/photo-1617791160505-6f00504f3519?q=80&w=1200&auto=format&fit=crop" },
  { num: "04", title: "The Resolution", desc: "A brand that knows its story can navigate any disruption, any market shift, any generation of customers.", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format&fit=crop" },
];

const SERVICES = [
  { title: "Brand Narrative", desc: "The singular story that makes every decision obvious and every communication coherent." },
  { title: "Visual Identity", desc: "A visual system that carries the weight of your story across every surface and medium." },
  { title: "Voice & Tone", desc: "The language and rhythm that makes your brand unmistakable before you say what it is." },
  { title: "Campaign Architecture", desc: "Multi-year creative frameworks that evolve with your audience without losing their thread." },
];

const STATS = [
  { value: 95, suffix: "%", label: "Client retention over 5 years" },
  { value: 80, suffix: "+", label: "Brand narratives crafted" },
  { value: 14, suffix: "", label: "Countries, 4 continents" },
  { value: 2, suffix: "B+", label: "People reached by our work" },
];

const TESTIMONIALS = [
  { name: "Isabelle Fontaine", role: "Founder, Maison Blanc", quote: "They gave us a story we could believe in. Now our customers believe in it too — and they stay.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "David Park", role: "CMO, NEXUS Health", quote: "In six months, our brand went from confusing to magnetic. It wasn't a rebrand — it was a revelation.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Amara Osei", role: "CEO, Volta Energy", quote: "They found the human story inside a deep-tech company. Our fundraise closed in half the expected time.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "What makes a brand narrative different from a brand strategy?", a: "Strategy answers 'what' and 'how.' Narrative answers 'why' — and in a way that resonates emotionally, not just rationally. We do both, but narrative is what makes strategy stick." },
  { q: "How long does a brand narrative engagement take?", a: "A foundational brand narrative takes 8–12 weeks. We move through deep discovery, narrative architecture, testing with real audiences, and a final creative framework." },
  { q: "Do you work with startups?", a: "Yes. Some of our best narrative work has been with pre-launch brands where the story was everything they had. We offer a focused Founding Narrative package." },
  { q: "Can you work with an existing brand identity?", a: "Always. We frequently layer narrative work onto existing visual systems. The story informs how the identity is deployed, not the identity itself." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
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
    let cur = 0;
    const t = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(parseFloat(cur.toFixed(target % 1 !== 0 ? 0 : 0)));
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-white mb-2">{count}{suffix}</div>
      <div className="text-sm text-white/50 max-w-[160px] mx-auto leading-snug">{label}</div>
    </div>
  );
}

export default function ImmersiveNarrativeSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference">
        <div className="font-black text-white tracking-tight">NARRATIVE STUDIO</div>
        <div className="hidden md:flex items-center gap-10 text-sm text-white/60">
          {["Work", "Process", "About", "Contact"].map(item => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} className="hidden md:block px-6 py-3 border border-white/30 text-white text-sm font-bold rounded-xl hover:bg-white/10 transition-colors">
          Start a story
        </motion.button>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center gap-8 text-3xl font-black">
            {["Work", "Process", "About", "Contact"].map(item => <a key={item} href="#" onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero — full-screen cinematic */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2400&auto=format&fit=crop" alt="Narrative" fill className="object-cover opacity-30" unoptimized />
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#080808]" style={{ background: "radial-gradient(ellipse at center, transparent 0%, #080808 70%)" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/30 text-xs uppercase tracking-[0.4em] mb-10">
            Brand Narrative Studio
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }} className="text-6xl md:text-9xl font-black leading-none mb-10">
            Every brand
            <br />
            <em className="not-italic text-white/20">is a story</em>
            <br />
            waiting.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl text-white/50 max-w-xl mx-auto leading-relaxed mb-12">
            We find the human truth inside your brand and turn it into a narrative that every audience can feel.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-4 justify-center flex-wrap">
            <motion.a href="#" whileHover={{ scale: 1.03 }} className="px-8 py-4 bg-white text-black font-black rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-colors">
              See our work <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.03 }} className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">
              Read our story
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
          <span className="uppercase tracking-wider text-[10px]">Scroll to explore</span>
        </motion.div>
      </div>

      {/* Story chapters — scroll narrative */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-24">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Every brand follows a story arc</p>
          <h2 className="text-5xl font-black">The four chapters</h2>
        </Reveal>
        <div className="space-y-32">
          {CHAPTERS.map((ch, i) => (
            <Reveal key={ch.num} delay={0.1}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <span className="text-white/10 text-8xl font-black mb-4 block">{ch.num}</span>
                  <h3 className="text-4xl font-black mb-6">{ch.title}</h3>
                  <p className="text-xl text-white/50 leading-relaxed">{ch.desc}</p>
                </div>
                <motion.div className={`relative h-80 rounded-2xl overflow-hidden ${i % 2 === 1 ? "md:order-1" : ""}`} whileHover={{ scale: 1.02 }}>
                  <Image src={ch.img} alt={ch.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-white/[0.03] border-y border-white/5 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <h2 className="text-5xl font-black">What we craft</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <motion.div whileHover={{ x: 8 }} className="p-8 border border-white/5 rounded-2xl hover:border-white/10 transition-colors flex items-start gap-6">
                <Circle className="w-3 h-3 text-white/20 shrink-0 mt-2" />
                <div>
                  <h3 className="text-xl font-black mb-3">{s.title}</h3>
                  <p className="text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><h2 className="text-4xl font-black mb-16">What our clients say</h2></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeT} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <p className="text-2xl text-white/70 leading-relaxed mb-8 font-serif italic">"{TESTIMONIALS[activeT].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={48} height={48} className="rounded-full object-cover border border-white/10" unoptimized />
                <div className="text-left">
                  <p className="font-bold">{TESTIMONIALS[activeT].name}</p>
                  <p className="text-white/40 text-sm">{TESTIMONIALS[activeT].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeT ? "bg-white" : "bg-white/20"}`} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><h2 className="text-4xl font-black">Questions</h2></Reveal>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left">
                  <span className="font-bold pr-4">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-white/30 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="pb-6 text-white/50 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 overflow-hidden relative">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1617791160505-6f00504f3519?q=80&w=2000&auto=format&fit=crop" alt="CTA" fill className="object-cover opacity-10" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]" />
        </div>
        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black leading-none mb-8">What's your<br />story?</h2>
          <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto">Every conversation starts the same way — with a question we've never heard before.</p>
          <motion.a href="#" whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-black text-lg rounded-2xl hover:bg-gray-100 transition-colors">
            Start a conversation <ArrowRight className="w-5 h-5" />
          </motion.a>
        </Reveal>
      </section>

      <footer className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30 border-t border-white/5">
        <div className="font-black text-white">NARRATIVE STUDIO</div>
        <p>© 2026 Narrative Studio. All rights reserved.</p>
        <div className="flex gap-6">{["Privacy", "Terms", "Contact"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
