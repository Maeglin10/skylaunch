"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, X, ChevronDown, Palette, Brush, Frame, Tag, Heart, ShoppingBag, ZoomIn } from "lucide-react";

const ARTWORKS = [
  { id: "a1", title: "Chromatic Dissolution I", artist: "Sofia Nava", year: 2025, medium: "Oil on canvas", size: "120×160cm", price: "€8,400", edition: "Unique", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", tags: ["Abstract", "Large Format"], color: "#f43f5e" },
  { id: "a2", title: "Untitled (Grid Study 7)", artist: "Marcus Holt", year: 2025, medium: "Acrylic on panel", size: "80×80cm", price: "€3,200", edition: "Unique", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80", tags: ["Geometric", "Minimalist"], color: "#818cf8" },
  { id: "a3", title: "After Rain, Series III", artist: "Chen Wei", year: 2024, medium: "Watercolor", size: "50×70cm", price: "€1,800", edition: "1/3", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80", tags: ["Landscape", "Paper"], color: "#34d399" },
  { id: "a4", title: "Portrait of Nobody", artist: "Lara Voss", year: 2024, medium: "Oil on linen", size: "60×80cm", price: "€4,600", edition: "Unique", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", tags: ["Figurative", "Portrait"], color: "#f59e0b" },
  { id: "a5", title: "Blue Field Study", artist: "Sofia Nava", year: 2024, medium: "Mixed media", size: "100×140cm", price: "€6,200", edition: "Unique", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80", tags: ["Abstract", "Mixed Media"], color: "#0ea5e9" },
  { id: "a6", title: "Meridian Triptych", artist: "Marcus Holt", year: 2023, medium: "Digital print", size: "3×40×60cm", price: "€2,400", edition: "3/10", image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&q=80", tags: ["Digital", "Print"], color: "#e879f9" },
];

const ARTISTS = [
  { name: "Sofia Nava", bio: "Madrid-born, Paris-based. Works in oil and mixed media exploring chromatic dissolution.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80", works: 14 },
  { name: "Marcus Holt", bio: "British painter known for geometric minimalism. Royal Academy trained.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", works: 22 },
  { name: "Chen Wei", bio: "Shanghai-based watercolorist. Exhibited at Venice Biennale 2024.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", works: 8 },
  { name: "Lara Voss", bio: "Figurative painter exploring identity and anonymity. Berlin Studio.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", works: 11 },
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

export default function FloatCanvasSPA() {
  const [selectedWork, setSelectedWork] = useState<typeof ARTWORKS[0] | null>(null);
  const [activeTag, setActiveTag] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartFlash, setCartFlash] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const allTags = ["All", "Abstract", "Figurative", "Geometric", "Landscape", "Digital"];
  const filtered = activeTag === "All" ? ARTWORKS : ARTWORKS.filter(a => a.tags.includes(activeTag));

  const faqs = [
    { q: "Do you offer art advisory services?", a: "Yes — our team provides complimentary advisory for collectors building a collection or sourcing for a specific space." },
    { q: "How are works shipped?", a: "All works ship via white-glove art handlers with full insurance. Framing and installation available on request." },
    { q: "Can I view works in person?", a: "Our gallery is open Tuesday–Saturday 11–19h. Private viewings available by appointment outside opening hours." },
    { q: "Do you accept payment plans?", a: "Works over €3,000 are eligible for a 3-month payment plan at 0% interest. Contact us to arrange." },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1a1512]" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between bg-[#f8f6f2]/90 backdrop-blur-lg border-b border-black/5">
        <div className="flex items-center gap-2">
          <Frame size={16} className="opacity-50" />
          <span className="text-sm font-black tracking-[0.12em] uppercase">Float & Canvas</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase opacity-50">
          {["Exhibitions", "Artists", "Editions", "Advisory", "About"].map(l => (
            <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>
          ))}
        </div>
        <MagneticBtn className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#1a1512] text-white text-xs font-black tracking-widest uppercase hover:bg-[#c9a96e] transition-colors">
          <ShoppingBag size={12} /> Collect
        </MagneticBtn>
        <button onClick={() => setMobileOpen(true)} className="md:hidden">{[0,1,2].map(i => <span key={i} className="block w-5 h-px bg-[#1a1512] mb-1.5" />)}</button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-[#1a1512] text-white flex flex-col p-10">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-12"><X size={24} /></button>
            {["Exhibitions", "Artists", "Editions", "Advisory", "About"].map((l, i) => (
              <motion.a key={l} href="#" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="text-4xl font-black mb-6 uppercase tracking-wider hover:text-[#c9a96e] transition-colors" onClick={() => setMobileOpen(false)}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image src={ARTWORKS[0].image} alt="hero" fill unoptimized className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f2] via-[#f8f6f2]/20 to-transparent" />
        </motion.div>
        <div className="relative z-10 px-8 md:px-16 pb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-[10px] tracking-[0.3em] uppercase mb-4 opacity-50">
            Summer Exhibition — Now Open
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="text-5xl md:text-9xl font-black leading-none tracking-tight mb-8">
            Art that<br />stays with you.
          </motion.h1>
          <MagneticBtn className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1512] text-white font-black text-xs tracking-widest uppercase hover:bg-[#c9a96e] transition-colors">
            View Exhibition <ArrowRight size={14} />
          </MagneticBtn>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-black/5 py-4 overflow-hidden bg-[#1a1512]">
        <motion.div animate={{ x: [0, -2400] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array(8).fill(0).map((_, i) => ARTISTS.map(a => (
            <span key={`${i}-${a.name}`} className="text-[9px] tracking-[0.25em] uppercase text-white/30">{a.name} ·</span>
          )))}
        </motion.div>
      </div>

      {/* Works */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Available Works</h2>
            <p className="text-sm opacity-40">Original works and limited editions by represented artists.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {allTags.map(t => (
              <button key={t} onClick={() => setActiveTag(t)} className="px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors" style={{ background: activeTag === t ? "#1a1512" : "transparent", color: activeTag === t ? "white" : "inherit", border: "1px solid", borderColor: activeTag === t ? "#1a1512" : "rgba(0,0,0,0.12)" }}>
                {t}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <motion.div layout whileHover={{ y: -6 }} className="group cursor-pointer bg-white">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <Image src={a.image} alt={a.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button onClick={e => { e.stopPropagation(); setSelectedWork(a); }} className="border border-white text-white text-[10px] px-4 py-2 tracking-widest uppercase mr-2">
                        View
                      </button>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setWishlist(w => w.includes(a.id) ? w.filter(id => id !== a.id) : [...w, a.id]); }} className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white transition-colors">
                      <Heart size={14} fill={wishlist.includes(a.id) ? "#f43f5e" : "none"} stroke={wishlist.includes(a.id) ? "#f43f5e" : "currentColor"} />
                    </button>
                    <div className="absolute top-3 left-3 flex gap-1 flex-wrap max-w-[60%]">
                      {a.tags.map(t => <span key={t} className="text-[8px] font-bold px-2 py-0.5 bg-white/80 tracking-wider uppercase">{t}</span>)}
                    </div>
                  </div>
                  <div className="p-4 cursor-pointer" onClick={() => setSelectedWork(a)}>
                    <h3 className="text-sm font-black mb-1">{a.title}</h3>
                    <p className="text-[10px] opacity-40 mb-3">{a.artist} · {a.year} · {a.medium}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black" style={{ color: a.color }}>{a.price}</span>
                      <span className="text-[9px] opacity-30">{a.edition}</span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Artists */}
      <section className="py-24 bg-[#1a1512] text-white px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-3xl font-black tracking-tight mb-16">Represented Artists</h2></Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {ARTISTS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }}>
                  <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                    <Image src={a.image} alt={a.name} fill unoptimized className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <h3 className="text-sm font-black mb-1">{a.name}</h3>
                  <p className="text-xs opacity-40 leading-relaxed mb-2">{a.bio}</p>
                  <p className="text-[10px] opacity-20">{a.works} works available</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-black/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ label: "Artists Represented", value: 42, suffix: "" }, { label: "Works Sold", value: 1240, suffix: "+" }, { label: "Private Collections", value: 380, suffix: "+" }, { label: "Years in Business", value: 18, suffix: "" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl font-black mb-2" style={{ color: "#c9a96e" }}><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[9px] tracking-[0.2em] uppercase opacity-40">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#f0ede6] px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal><h2 className="text-2xl font-black tracking-tight mb-12">Collecting FAQ</h2></Reveal>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-black/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-5 flex items-center justify-between text-sm font-bold">
                  {f.q} <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pb-5 text-sm opacity-60 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-[#1a1512] text-white">
        <Reveal><h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none">Start Your<br /><em className="text-[#c9a96e] not-italic">Collection</em></h2></Reveal>
        <Reveal delay={0.2}><p className="text-sm opacity-40 mb-10 max-w-md mx-auto">Our advisors are available for private consultations — in-gallery, at your home, or virtually.</p></Reveal>
        <Reveal delay={0.3}>
          <MagneticBtn className="inline-flex items-center gap-3 px-10 py-5 bg-[#c9a96e] text-[#1a1512] font-black text-xs tracking-[0.2em] uppercase">
            Book an Advisory Session <ArrowRight size={14} />
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#1a1512] text-white py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] opacity-30 tracking-wider uppercase">
        <span>Float & Canvas © 2026</span>
        <div className="flex gap-8">{["Instagram", "Artsy", "Newsletter", "Press"].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}</div>
      </footer>

      {/* Work Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/75 flex items-center justify-center p-6" onClick={() => setSelectedWork(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={e => e.stopPropagation()} className="bg-[#f8f6f2] max-w-2xl w-full overflow-hidden flex flex-col md:flex-row">
              <div className="relative md:w-1/2" style={{ aspectRatio: "3/4" }}>
                <Image src={selectedWork.image} alt={selectedWork.title} fill unoptimized className="object-cover" />
              </div>
              <div className="p-6 flex-1">
                <button onClick={() => setSelectedWork(null)} className="float-right opacity-40 hover:opacity-100"><X size={18} /></button>
                <div className="clear-right pt-2">
                  <h3 className="text-xl font-black mb-1">{selectedWork.title}</h3>
                  <p className="text-xs opacity-40 mb-4">{selectedWork.artist} · {selectedWork.year}</p>
                  <div className="space-y-1.5 text-xs mb-6">
                    <div className="flex justify-between border-b border-black/5 py-2"><span className="opacity-40">Medium</span><span>{selectedWork.medium}</span></div>
                    <div className="flex justify-between border-b border-black/5 py-2"><span className="opacity-40">Dimensions</span><span>{selectedWork.size}</span></div>
                    <div className="flex justify-between border-b border-black/5 py-2"><span className="opacity-40">Edition</span><span>{selectedWork.edition}</span></div>
                  </div>
                  <div className="text-2xl font-black mb-4" style={{ color: selectedWork.color }}>{selectedWork.price}</div>
                  <button onClick={() => { setCartFlash(true); setSelectedWork(null); setTimeout(() => setCartFlash(false), 1000); }} className="w-full py-3 bg-[#1a1512] text-white font-black text-xs tracking-widest uppercase hover:bg-[#c9a96e] hover:text-[#1a1512] transition-colors">
                    Enquire to Purchase
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart flash */}
      <AnimatePresence>
        {cartFlash && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1512] text-white text-xs font-bold tracking-widest uppercase px-6 py-3 z-[300] flex items-center gap-2">
            <ShoppingBag size={14} className="text-[#c9a96e]" /> Enquiry Sent
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
