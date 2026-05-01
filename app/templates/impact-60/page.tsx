"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, X, Menu, ChevronDown, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import "../premium.css";

/* ─── DATA ─────────────────────────────────────────────── */
const PROPERTIES = [
  {
    id: 1,
    name: "Maison Dorée",
    type: "Private Villa",
    location: "Saint-Tropez, Côte d'Azur",
    price: "€ 8,400,000",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
    sqm: "680 m²",
    rooms: "7 rooms",
  },
  {
    id: 2,
    name: "Le Palais Blanc",
    type: "Penthouse",
    location: "Monaco, Fontvieille",
    price: "€ 14,200,000",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1400&auto=format&fit=crop",
    sqm: "420 m²",
    rooms: "5 rooms",
  },
  {
    id: 3,
    name: "Château Lumière",
    type: "Historic Estate",
    location: "Bordeaux, Aquitaine",
    price: "€ 22,800,000",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop",
    sqm: "1,240 m²",
    rooms: "18 rooms",
  },
  {
    id: 4,
    name: "Villa Ossidiana",
    type: "Contemporary",
    location: "Positano, Amalfi Coast",
    price: "€ 6,100,000",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1400&auto=format&fit=crop",
    sqm: "390 m²",
    rooms: "6 rooms",
  },
];

const FAQS = [
  { q: "What markets do you specialize in?", a: "We specialize in ultra-prime residential markets across the French Riviera, Monaco, Tuscany, and select Swiss Alpine destinations, focusing exclusively on properties above €3M." },
  { q: "How do you ensure privacy for high-profile clients?", a: "All transactions are handled with full NDA coverage. We maintain a private off-market portfolio accessible only to vetted clients, ensuring absolute discretion from initial inquiry through completion." },
  { q: "Do you offer architectural visualization services?", a: "Our atelier partners with leading architectural studios to provide photorealistic renders, VR walkthroughs, and bespoke interior design consultations for every acquisition." },
  { q: "What is your typical transaction timeline?", a: "For off-market properties, the process typically spans 60–90 days from initial viewing to notarial signing. We manage every legal, fiscal, and logistical dimension end-to-end." },
];

const STATS = [
  { value: 340, label: "Properties Sold", suffix: "+" },
  { value: 2, label: "Billion in Transactions", prefix: "€", suffix: "B+" },
  { value: 18, label: "Years of Excellence", suffix: "" },
  { value: 97, label: "Client Satisfaction", suffix: "%" },
];

const MARQUEE_ITEMS = [
  "Saint-Tropez", "Monaco", "Cannes", "Côte d'Azur", "Tuscany", "Positano",
  "Lake Como", "Geneva", "Courchevel", "Marbella", "Ibiza", "Capri",
  "Saint-Tropez", "Monaco", "Cannes", "Côte d'Azur", "Tuscany", "Positano",
  "Lake Como", "Geneva", "Courchevel", "Marbella", "Ibiza", "Capri",
];

/* ─── SHARED COMPONENTS ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 24);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export default function PhotographyArchiveSPA() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const activeProperty = activeModal !== null ? PROPERTIES[activeModal] : null;

  return (
    <div className="premium-theme bg-[#f5f0e8] text-[#1a1614] min-h-screen font-sans overflow-x-hidden selection:bg-[#c9a96e] selection:text-white">

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6 bg-[#f5f0e8]/80 backdrop-blur-xl border-b border-[#c9a96e]/20">
        <span className="text-xl font-serif tracking-widest uppercase text-[#1a1614]">Lumière Estates</span>
        <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] font-medium text-[#1a1614]/60">
          {["Portfolio", "Services", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#c9a96e] transition-colors">{item}</a>
          ))}
        </div>
        <MagneticBtn className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#1a1614] text-[#f5f0e8] text-xs uppercase tracking-[0.2em] hover:bg-[#c9a96e] transition-colors">
          Private Access <ArrowRight className="w-3 h-3" />
        </MagneticBtn>
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6 text-[#1a1614]" />
        </button>
      </nav>

      {/* ── MOBILE NAV ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#1a1614] flex flex-col justify-center items-center gap-10"
          >
            <button className="absolute top-6 right-8" onClick={() => setMobileOpen(false)}>
              <X className="w-7 h-7 text-[#f5f0e8]" />
            </button>
            {["Portfolio", "Services", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-serif text-[#f5f0e8] tracking-widest hover:text-[#c9a96e] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} id="hero" className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1109543?w=800&q=80"
            alt="Luxury estate"
            fill
            unoptimized
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614]/80 via-[#1a1614]/20 to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 pb-24 px-8 md:px-16 max-w-5xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] mb-6 block font-medium">Exclusive Real Estate Atelier</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-[8vw] font-serif text-white leading-[0.9] mb-8">
              Architecture<br />
              <span className="italic text-[#c9a96e]">of Desire.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
              Ultra-prime properties curated for those who understand that a home is more than an address — it is a declaration.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <MagneticBtn className="flex items-center gap-3 px-8 py-4 bg-[#c9a96e] text-[#1a1614] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-[#b8934a] transition-colors">
                View Portfolio <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-[0.2em] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors">
                Private Listings
              </button>
            </div>
          </Reveal>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-white/40"
        >
          <ChevronDown className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        </motion.div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#1a1614] py-5 border-y border-[#c9a96e]/20">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="text-xs font-medium uppercase tracking-[0.4em] text-[#c9a96e]/60 flex-shrink-0">
              {item} <span className="text-[#c9a96e]/30 mx-4">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── PORTFOLIO ─────────────────────────────────────── */}
      <section id="portfolio" className="px-8 md:px-16 py-32">
        <Reveal className="mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] block mb-4">Curated Selection</span>
          <h2 className="text-5xl md:text-7xl font-serif leading-tight">
            Exceptional<br /><em>Properties.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROPERTIES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] cursor-pointer"
                onClick={() => setActiveModal(i)}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#c9a96e] text-[#1a1614] text-[10px] uppercase tracking-[0.2em] font-semibold">
                    {p.type}
                  </div>
                </div>
                <div className="p-8 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-serif mb-1">{p.name}</h3>
                    <p className="text-sm text-[#1a1614]/50 flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</p>
                    <p className="text-xs text-[#1a1614]/40 mt-1">{p.sqm} · {p.rooms}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-serif text-[#c9a96e]">{p.price}</div>
                    <div className="mt-2 w-10 h-10 rounded-full border border-[#c9a96e] flex items-center justify-center group-hover:bg-[#c9a96e] transition-colors ml-auto">
                      <ArrowUpRight className="w-4 h-4 text-[#c9a96e] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROPERTY MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {activeProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-[#f5f0e8] rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80">
                <Image src={activeProperty.img} alt={activeProperty.name} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614]/80 to-transparent" />
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-6 left-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">{activeProperty.type}</span>
                  <h2 className="text-4xl font-serif text-white mt-1">{activeProperty.name}</h2>
                </div>
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-8">
                <div>
                  <p className="flex items-center gap-2 text-[#1a1614]/60 mb-6"><MapPin className="w-4 h-4 text-[#c9a96e]" />{activeProperty.location}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[["Surface", activeProperty.sqm], ["Rooms", activeProperty.rooms], ["Status", "Available"], ["Year", "2024"]].map(([l, v]) => (
                      <div key={l} className="p-4 bg-white rounded-xl">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#1a1614]/40 mb-1">{l}</div>
                        <div className="font-semibold text-[#1a1614]">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-3xl font-serif text-[#c9a96e] mb-6">{activeProperty.price}</div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-[#1a1614]/60 leading-relaxed text-sm">
                    An exceptional property offering unparalleled views, seamless indoor-outdoor living, and the finest finishes by award-winning artisans. Available for private viewing by appointment.
                  </p>
                  <MagneticBtn className="w-full py-4 bg-[#1a1614] text-[#f5f0e8] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#c9a96e] hover:text-[#1a1614] transition-colors">
                    Request Private Viewing
                  </MagneticBtn>
                  <button className="w-full py-4 border border-[#1a1614]/20 text-[#1a1614] text-sm uppercase tracking-[0.2em] hover:border-[#c9a96e] transition-colors">
                    Download Brochure
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-[#1a1614] py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-6xl font-serif text-[#c9a96e] mb-3">
                <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="px-8 md:px-16 py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-733852?w=800&q=80"
              alt="Architecture studio"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-[#f5f0e8]/95 backdrop-blur-sm rounded-xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] mb-1">Our Commitment</div>
              <p className="text-sm text-[#1a1614] font-medium leading-relaxed">Every mandate is handled with the silence and precision of a Swiss watch.</p>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] block mb-6">Est. 2006</span>
            <h2 className="text-5xl font-serif leading-tight mb-8">Where Vision Meets<br /><em>Architecture.</em></h2>
            <p className="text-[#1a1614]/60 leading-relaxed mb-6">
              Lumière Estates was founded on the conviction that true luxury is invisible to the eye but felt in every proportioned space, every material chosen, every view framed with intention.
            </p>
            <p className="text-[#1a1614]/60 leading-relaxed mb-10">
              Our atelier operates on three continents, with a portfolio that reads like a map of desire — from sun-drenched hillside villas to glacial-view chalets.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {[["Off-Market Access", "Private portfolio of unadvertised mandates"], ["White Glove Service", "Dedicated advisor from search to keys"], ["Legal Mastery", "Full notarial and fiscal management"], ["Design Consulting", "Partner architects and interior designers"]].map(([title, desc]) => (
                <div key={title} className="p-5 border border-[#c9a96e]/20 rounded-xl hover:border-[#c9a96e]/60 transition-colors">
                  <div className="w-1 h-6 bg-[#c9a96e] mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-[11px] text-[#1a1614]/50 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-white px-8 md:px-16 py-24">
        <Reveal className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] block mb-4">Client Voices</span>
          <h2 className="text-4xl md:text-5xl font-serif">Those Who Know.</h2>
        </Reveal>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { quote: "Lumière found us a property we hadn't dared to imagine. The process was seamless, private, and utterly extraordinary.", author: "Madame S.L.", location: "Geneva" },
            { quote: "Beyond real estate — an atelier that understands architecture as art. Our Côte d'Azur estate is a masterpiece.", author: "Mr. K.A.", location: "Dubai" },
            { quote: "The level of discretion and attention to our specific vision was unmatched. We found home in the truest sense.", author: "Dr. H.V.", location: "Singapore" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-8 bg-[#f5f0e8] rounded-2xl">
                <div className="text-3xl text-[#c9a96e] font-serif mb-4">"</div>
                <p className="text-[#1a1614]/70 leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="border-t border-[#c9a96e]/20 pt-4">
                  <div className="font-semibold text-sm">{t.author}</div>
                  <div className="text-xs text-[#1a1614]/40 uppercase tracking-[0.2em]">{t.location}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section id="services" className="px-8 md:px-16 py-24 max-w-4xl mx-auto">
        <Reveal className="mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] block mb-4">Frequently Asked</span>
          <h2 className="text-4xl md:text-5xl font-serif">Your Questions,<br /><em>Answered.</em></h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-[#c9a96e]/20 rounded-xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-7 py-5 text-left hover:bg-[#c9a96e]/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-[#1a1614] pr-4">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-[#c9a96e] flex-shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-[#1a1614]/60 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────── */}
      <section id="contact" className="relative overflow-hidden px-8 md:px-16 py-32 bg-[#1a1614] text-white text-center">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-733852?w=800&q=80"
            alt="Estate"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] block mb-6">Private Consultation</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-8">Your Next Home<br /><em>Awaits.</em></h2>
            <p className="text-white/50 mb-12 text-lg leading-relaxed">
              Begin your journey with a confidential consultation. We will listen, understand, and then — and only then — present.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <MagneticBtn className="flex items-center justify-center gap-3 px-10 py-5 bg-[#c9a96e] text-[#1a1614] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors">
                Schedule a Meeting <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center justify-center gap-3 px-10 py-5 border border-white/20 text-white text-sm uppercase tracking-[0.2em] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors">
                <Phone className="w-4 h-4" /> +33 1 42 00 00 00
              </button>
            </div>
            <div className="flex justify-center gap-8 text-sm text-white/30">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#c9a96e]" /> contact@lumiere-estates.com</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#c9a96e]" /> Place Vendôme, Paris</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#0f0d0b] py-8 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/20 uppercase tracking-[0.2em]">
        <span>© 2026 Lumière Estates · All Rights Reserved</span>
        <span>Atelier of Ultra-Prime Real Estate</span>
        <span>Privacy · Legal · Mandates</span>
      </footer>

      <style>{`::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f5f0e8; } ::-webkit-scrollbar-thumb { background: #c9a96e; border-radius: 3px; }`}</style>
    </div>
  );
}
