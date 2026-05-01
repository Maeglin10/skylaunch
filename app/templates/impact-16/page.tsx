"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, MapPin, Wifi, Coffee, Waves, ChevronDown, Menu, X, ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon, Phone, Mail } from "lucide-react";
import "../premium.css";

const ROOMS = [
  { name: "Grand Palais Suite", size: "120 m²", view: "Ocean panoramic", price: "€1,200", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200&auto=format&fit=crop" },
  { name: "Jardin Privé Villa", size: "200 m²", view: "Private garden", price: "€2,400", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop" },
  { name: "Horizon Penthouse", size: "280 m²", view: "360° sea view", price: "€4,800", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop" },
  { name: "Côte d'Azur Room", size: "45 m²", view: "Garden terrace", price: "€480", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop" },
];

const AMENITIES = [
  { icon: Waves, title: "Infinity Pool", desc: "85m heated infinity pool overlooking the Mediterranean, open year-round." },
  { icon: Coffee, title: "La Table du Chef", desc: "3-Michelin-star dining from Chef Laurent Dubois, celebrated for his coastal Mediterranean cuisine." },
  { icon: Star, title: "Prestige Spa", desc: "3,000m² spa sanctuary with hydrotherapy pools, hammam, and bespoke treatment rituals." },
  { icon: Wifi, title: "Exclusive Transfers", desc: "Helicopter and private yacht transfers from Monaco, Cannes, and Nice on request." },
  { icon: MapPin, title: "Private Beach", desc: "400m of exclusive white sand beach with butler service and personalised cabanas." },
  { icon: Star, title: "Concierge 24h", desc: "Legendary service — from private island picnics to Formula 1 hospitality suites." },
];

const STATS = [
  { value: 34, suffix: "", label: "Years of excellence" },
  { value: 5, suffix: " stars", label: "Palace distinction" },
  { value: 48, suffix: "", label: "Suites & villas" },
  { value: 98, suffix: "%", label: "Guest return rate" },
];

const TESTIMONIALS = [
  { name: "Princess A.K.", role: "Royal guest, 12 stays", quote: "There is no hotel in the world that understands privacy, comfort, and elegance in quite the same measure.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "James & Claire Morton", role: "Honeymoon guests", quote: "The penthouse, the dinners, the morning sea views — we return every anniversary without question.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Emmanuel Leclerc", role: "CEO, guest since 2018", quote: "When I need to disappear from the world and return refreshed — this is the only address that delivers.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
];

const FAQ = [
  { q: "What is the minimum stay?", a: "We recommend a minimum of 3 nights to fully experience the property. During peak season (July–August) a 5-night minimum applies for suites and villas." },
  { q: "Is the hotel family-friendly?", a: "Yes, while we maintain an intimate atmosphere, we warmly welcome families. Children above 12 are welcomed in all areas; we offer a dedicated young guests programme." },
  { q: "Can you arrange helicopter transfers?", a: "Our concierge arranges helicopter transfers from Nice Côte d'Azur, Monaco Héliport, and private landing pads throughout the region. We require 48 hours notice." },
  { q: "Are pets welcome?", a: "We welcome small dogs up to 10kg with prior arrangement. A dedicated pet butler service is available, including gourmet pet menus and walking services." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
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
      <div className="text-5xl font-black text-[#d4af37] mb-2">{count}{suffix}</div>
      <div className="text-sm text-[#c9b592]/60 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function LuxuryHospitalitySPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const [activeRoom, setActiveRoom] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);

  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a12] text-[#e8dcc8] overflow-x-hidden">
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0a0a12]/90 backdrop-blur-xl border-b border-[#d4af37]/10">
        <div className="text-center">
          <div className="font-serif text-xl font-black tracking-widest text-[#d4af37]">GRAND PALAIS</div>
          <div className="text-xs tracking-[0.3em] text-[#c9b592]/50 uppercase">Côte d'Azur</div>
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs text-[#c9b592]/50 tracking-widest uppercase">
          {["Suites", "Experiences", "Dining", "Spa", "Weddings"].map(item => (
            <a key={item} href="#" className="hover:text-[#d4af37] transition-colors">{item}</a>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} className="hidden md:block px-6 py-3 border border-[#d4af37]/30 text-[#d4af37] text-xs tracking-widest uppercase hover:bg-[#d4af37]/10 transition-colors">
          Reserve
        </motion.button>
        <button className="md:hidden text-[#d4af37]" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#0a0a12] flex flex-col items-center justify-center gap-8">
            {["Suites", "Experiences", "Dining", "Spa"].map(item => (
              <a key={item} href="#" className="text-[#d4af37] text-2xl font-serif tracking-widest" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-209977?w=800&q=80" alt="Grand Palais Hotel" fill className="object-cover opacity-40" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/60 via-transparent to-[#0a0a12]" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />)}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#c9b592]/50 text-xs tracking-[0.4em] uppercase mb-8">
            Palace distinction · Côte d'Azur · Since 1992
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="text-6xl md:text-8xl font-black font-serif leading-none mb-8 text-white">
            Where the<br />Mediterranean<br /><em className="not-italic text-[#d4af37]">begins.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[#c9b592]/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed font-serif">
            A legendary palace hotel poised above the sea, where timeless elegance meets the eternal blue of the French Riviera.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.02 }} className="px-10 py-4 bg-[#d4af37] hover:bg-[#c9a830] text-black font-black tracking-wider flex items-center gap-2 transition-colors">
              Reserve a Suite <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} className="px-10 py-4 border border-[#d4af37]/30 text-[#d4af37] font-bold tracking-wider hover:bg-[#d4af37]/10 transition-colors">
              Discover
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-[#d4af37]/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* Stats */}
      <section className="py-20 border-y border-[#d4af37]/10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.1}><Counter target={s.value} suffix={s.suffix} label={s.label} /></Reveal>)}
        </div>
      </section>

      {/* Suites */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-[#c9b592]/40 text-xs tracking-[0.3em] uppercase mb-4">Accommodation</p>
          <h2 className="text-5xl font-black font-serif text-white">Our suites & villas</h2>
        </Reveal>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={activeRoom} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image src={ROOMS[activeRoom].img} alt={ROOMS[activeRoom].name} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[#d4af37] text-sm font-bold mb-1">{ROOMS[activeRoom].size} · {ROOMS[activeRoom].view}</p>
                  <p className="text-white font-black text-2xl font-serif">{ROOMS[activeRoom].name}</p>
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-black font-serif text-white mb-4">{ROOMS[activeRoom].name}</h3>
                <p className="text-[#c9b592]/60 mb-3 text-sm">{ROOMS[activeRoom].view} · {ROOMS[activeRoom].size}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-[#d4af37]">{ROOMS[activeRoom].price}</span>
                  <span className="text-[#c9b592]/40 text-sm">per night</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-[#c9b592]/70">
                  {["24h butler service", "Complimentary minibar", "Private terrace", "Premium toiletries", "Evening turndown"].map(f => (
                    <li key={f} className="flex items-center gap-3"><span className="w-1 h-1 bg-[#d4af37] rounded-full" />{f}</li>
                  ))}
                </ul>
                <motion.button whileHover={{ scale: 1.02 }} className="px-8 py-4 bg-[#d4af37] text-black font-black flex items-center gap-2 hover:bg-[#c9a830] transition-colors">
                  Reserve this suite <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={() => setActiveRoom(p => (p - 1 + ROOMS.length) % ROOMS.length)} className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {ROOMS.map((_, i) => <button key={i} onClick={() => setActiveRoom(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeRoom ? "bg-[#d4af37]" : "bg-[#d4af37]/20"}`} />)}
            <button onClick={() => setActiveRoom(p => (p + 1) % ROOMS.length)} className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-[#c9b592]/40 text-xs tracking-[0.3em] uppercase mb-4">Experiences</p>
          <h2 className="text-5xl font-black font-serif text-white">The art of the exceptional</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AMENITIES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }} className="p-8 border border-[#d4af37]/10 rounded-2xl hover:border-[#d4af37]/20 transition-colors">
                <a.icon className="w-8 h-8 text-[#d4af37] mb-6" />
                <h3 className="font-black text-white font-serif text-xl mb-3">{a.title}</h3>
                <p className="text-[#c9b592]/50 text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-[#d4af37]/10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><p className="text-[#c9b592]/40 text-xs tracking-[0.3em] uppercase mb-4">Guest perspectives</p></Reveal>
          <Reveal><h2 className="text-4xl font-black font-serif text-white mb-16">What our guests say</h2></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeT} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <div className="flex justify-center mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />)}</div>
              <p className="text-xl text-[#e8dcc8]/70 italic font-serif leading-relaxed mb-8">"{TESTIMONIALS[activeT].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <Image src={TESTIMONIALS[activeT].avatar} alt={TESTIMONIALS[activeT].name} width={48} height={48} className="rounded-full object-cover border border-[#d4af37]/20" unoptimized />
                <div className="text-left">
                  <p className="font-bold text-white text-sm">{TESTIMONIALS[activeT].name}</p>
                  <p className="text-[#c9b592]/40 text-xs">{TESTIMONIALS[activeT].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveT(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeT ? "bg-[#d4af37]" : "bg-[#d4af37]/20"}`} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <Reveal className="mb-12"><h2 className="text-4xl font-black font-serif text-white">Guest information</h2></Reveal>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-b border-[#d4af37]/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left">
                  <span className="font-semibold text-[#e8dcc8]">{f.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-[#d4af37]/40 shrink-0" /></motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="pb-6 text-[#c9b592]/50 text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1536523?w=800&q=80" alt="Reserve" fill className="object-cover opacity-15" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] to-[#0a0a12]/80" />
        </div>
        <Reveal className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#d4af37]/50 text-xs tracking-[0.3em] uppercase mb-6">Begin your stay</p>
          <h2 className="text-5xl font-black font-serif text-white mb-6">An address beyond compare</h2>
          <p className="text-[#c9b592]/50 text-lg mb-12 leading-relaxed">Contact our reservations team to begin crafting your stay.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.02 }} className="px-10 py-5 bg-[#d4af37] text-black font-black flex items-center gap-2 justify-center hover:bg-[#c9a830] transition-colors">
              Reserve now <ArrowRight className="w-4 h-4" />
            </motion.button>
            <div className="flex items-center gap-3 justify-center text-[#c9b592]/50 text-sm">
              <Phone className="w-4 h-4" /><span>+33 4 93 00 00 00</span>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="py-12 px-6 max-w-7xl mx-auto border-t border-[#d4af37]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#c9b592]/30 tracking-widest uppercase">
        <div className="font-serif font-black text-[#d4af37] text-base">GRAND PALAIS · CÔTE D'AZUR</div>
        <p>© 2026 Grand Palais. All rights reserved.</p>
        <div className="flex gap-6">{["Privacy", "Terms", "Contact"].map(l => <a key={l} href="#" className="hover:text-[#d4af37] transition-colors">{l}</a>)}</div>
      </footer>
    </div>
  );
}
