"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Film, Camera, Palette, Monitor, PenTool, Award, ChevronDown, Menu, X, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import "../premium.css";

const DISCIPLINES = [
  { icon: Film, title: "Film Direction", desc: "Narrative shorts, brand films, and documentary work that moves audiences and moves product.", tag: "Film" },
  { icon: Camera, title: "Photography", desc: "Editorial portraiture and campaign photography at top fashion weeks and cultural moments.", tag: "Photo" },
  { icon: Palette, title: "Art Direction", desc: "Visual concepts that define the visual language of a brand for a decade.", tag: "Direction" },
  { icon: Monitor, title: "Digital Creative", desc: "Interactive experiences and generative campaigns with measurable cultural impact.", tag: "Digital" },
  { icon: PenTool, title: "Creative Strategy", desc: "Strategic creative frameworks that bridge brand positioning and cultural relevance.", tag: "Strategy" },
  { icon: Award, title: "Installation", desc: "Site-specific physical installations for galleries, brands, and public spaces globally.", tag: "Installation" },
];

const WORK = [
  { title: "L'Instant Parfait", client: "Chanel", type: "Short Film", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop" },
  { title: "Human / Machine", client: "Nike", type: "Campaign", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop" },
  { title: "Terra Nova", client: "Self-Initiated", type: "Installation", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop" },
  { title: "Gravity Series", client: "Vogue", type: "Editorial", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop" },
  { title: "City Pulse", client: "BMW", type: "Brand Film", img: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1200&auto=format&fit=crop" },
];

const STATS = [
  { value: 22, suffix: "+", label: "Years directing" },
  { value: 140, suffix: "+", label: "Projects delivered" },
  { value: 28, suffix: "", label: "Cannes entries" },
  { value: 6, suffix: "", label: "D&AD Pencils" },
];

const TESTIMONIALS = [
  { name: "Claire Moreau", role: "VP Creative, Chanel", quote: "They don't just execute a brief — they transform it into something you could never have imagined alone.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Jordan Blake", role: "Global CD, Nike", quote: "The Human / Machine campaign changed how we think about athlete creative. It became our benchmark.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Mei Lin", role: "Editor-in-Chief, Vogue Asia", quote: "Working with them on Gravity was the most creatively expansive shoot I've experienced in 20 years.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "What scale of project do you take on?", a: "Everything from a short film for a micro-brand to multi-market campaign for a global house. The deciding factor is creative ambition, not budget." },
  { q: "How do you approach brand collaborations?", a: "We take an immersive briefing period of 2–4 weeks before any creative is presented. We want to understand the brand at a cellular level before making anything." },
  { q: "Do you work with agencies or direct brands?", a: "Both. We collaborate closely with agencies when they're right for the project, and work direct with brands who want unmediated creative leadership." },
  { q: "Are you open to self-initiated projects?", a: "Yes — self-initiated work is where some of our most significant work has emerged. We allocate time for these projects every year." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
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
      else setCount(Math.floor(cur));
    }, 1800 / steps);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-white mb-1">{count}{suffix}</div>
      <div className="text-sm text-white/40 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function CreativeDirectorSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 160]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 }); const sy = useSpring(my, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden">
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-white/5">
        <div className="font-black text-lg tracking-tight">MAISON CRÉATIF</div>
        <div className="hidden md:flex items-center gap-10 text-sm text-white/40">
          {["Work", "Disciplines", "Studio", "Contact"].map(item => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <motion.button style={{ x: sx, y: sy }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left - r.width / 2) * 0.3); my.set((e.clientY - r.top - r.height / 2) * 0.3); }} onMouseLeave={() => { mx.set(0); my.set(0); }} className="hidden md:block px-6 py-3 bg-white text-black text-sm font-black rounded-xl hover:bg-gray-100 transition-colors">
          Brief us
        </motion.button>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#0c0c0c] flex flex-col items-center justify-center gap-8 text-3xl font-black">
            {["Work", "Disciplines", "Studio", "Contact"].map(item => <a key={item} href="#" onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-733852?w=800&q=80" alt="Creative Director" fill className="object-cover opacity-25" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/40 via-transparent to-[#0c0c0c]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/40 text-xs uppercase tracking-[0.3em] mb-8">
            Film · Photography · Art Direction · Since 2002
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tight mb-12">
            WE MAKE<br />CULTURE<br /><em className="not-italic text-white/30">MOVE.</em>
          </motion.h1>
          <div className="flex items-end justify-between flex-wrap gap-8">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-white/60 max-w-sm leading-relaxed">
              Award-winning creative studio working at the intersection of film, photography, and cultural strategy.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-4">
              <motion.a href="#" whileHover={{ scale: 1.03 }} className="px-8 py-4 bg-white text-black font-black rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-colors">
                See work <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.03 }} className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" /> Showreel
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Work */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Selected work</p>
          <h2 className="text-5xl font-black">The work</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} className={i === 0 ? "md:row-span-2" : ""}>
              <motion.div
                className={`relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "h-[580px]" : "h-64"}`}
                onHoverStart={() => setHoveredWork(i)} onHoverEnd={() => setHoveredWork(null)}
                whileHover={{ scale: 1.01 }}
              >
                <Image src={w.img} alt={w.title} fill className="object-cover transition-transform duration-700" style={{ transform: hoveredWork === i ? "scale(1.05)" : "scale(1)" }} unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <AnimatePresence>
                  {hoveredWork === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/50 text-xs mb-1">{w.client} · {w.type}</p>
                  <p className="font-black text-white text-xl">{w.title}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Disciplines */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Disciplines</p>
          <h2 className="text-5xl font-black">What we do</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }} className="p-8 border border-white/5 rounded-2xl hover:border-white/10 transition-colors group">
                <span className="inline-block px-3 py-1 text-xs font-bold bg-white/10 text-white/60 rounded-full mb-4">{d.tag}</span>
                <d.icon className="w-6 h-6 text-white mb-4" />
                <h3 className="font-black text-white text-lg mb-3">{d.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{d.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-sm text-white/40 group-hover:text-white transition-colors font-bold">Learn more <ArrowUpRight className="w-4 h-4" /></div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white text-black px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><h2 className="text-4xl font-black mb-16">Client perspective</h2></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeT} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <p className="text-2xl font-black leading-tight mb-8">"{TESTIMONIALS[activeT].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={48} height={48} className="rounded-full object-cover" unoptimized />
                <div className="text-left">
                  <p className="font-bold">{TESTIMONIALS[activeT].name}</p>
                  <p className="text-gray-500 text-sm">{TESTIMONIALS[activeT].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeT ? "bg-black" : "bg-black/20"}`} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><h2 className="text-4xl font-black">How we work</h2></Reveal>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left">
                  <span className="font-bold">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-white/40 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="pb-6 text-white/50 text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-white text-black">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black leading-none mb-8">Let's make<br />something<br />unforgettable.</h2>
          <motion.a href="#" whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-10 py-5 bg-black text-white font-black text-lg rounded-2xl hover:bg-gray-900 transition-colors">
            Start a conversation <ArrowRight className="w-5 h-5" />
          </motion.a>
        </Reveal>
      </section>

      <footer className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30 border-t border-white/5">
        <div className="font-black text-white">MAISON CRÉATIF</div>
        <p>© 2026 Maison Créatif. All rights reserved.</p>
        <div className="flex gap-6">{["Privacy", "Terms", "Instagram"].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
