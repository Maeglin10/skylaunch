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
import {
  ArrowRight, X, Menu, ChevronDown, Star, Clock, MapPin, Phone,
} from "lucide-react";
import "../premium.css";

/* ─── DATA ─────────────────────────────────────────────── */
const MENUS = [
  {
    id: 1,
    category: "To Begin",
    items: [
      { name: "Osciètre Dore", desc: "30g Iranian caviar, blini au beurre noisette, crème d'oursin", price: "€ 110" },
      { name: "Langoustines Rôties", desc: "Langoustines de Saint-Gilles, beurre blanc à l'estragon, gel citron yuzu", price: "€ 68" },
      { name: "Foie Gras Mi-Cuit", desc: "Torchon de foie gras, pain brioché, confiture de figue noire", price: "€ 52" },
    ],
  },
  {
    id: 2,
    category: "The Heart",
    items: [
      { name: "Bœuf Wagyu A5", desc: "Entrecôte 200g, jus de truffe noire, gratin dauphinois, haricots verts fins", price: "€ 145" },
      { name: "Turbot Sauvage", desc: "Turbot de ligne, beurre mousseux aux câpres, pommes château, épinards", price: "€ 98" },
      { name: "Pigeon en Deux Services", desc: "Filet rôti à la braise, cuisse confite, sauce au sang, gnocchi truffés", price: "€ 115" },
    ],
  },
  {
    id: 3,
    category: "Finale",
    items: [
      { name: "Soufflé au Grand Marnier", desc: "Soufflé chaud, glace vanille Bourbon, tuiles dentelles", price: "€ 38" },
      { name: "Chocolat Araguani", desc: "Fondant 72%, sorbet cacao, praliné feuilleté, fleur de sel", price: "€ 32" },
      { name: "Tarte Fine aux Pommes", desc: "Pâte feuilletée caramélisée, pommes Golden, crème Calvados", price: "€ 28" },
    ],
  },
];

const FAQS = [
  { q: "Do you accommodate dietary requirements?", a: "Chef Anatol personally oversees all dietary adaptations. Please inform us at reservation — vegetarian, vegan, and allergen-free menus are crafted with the same integrity as our signature tasting menu." },
  { q: "What is your dress code policy?", a: "We welcome smart to formal attire. Jacket is preferred for gentlemen in the main dining room. Our private dining rooms allow slightly more relaxed dress at your discretion." },
  { q: "Is there a sommelier-led wine pairing?", a: "Our Maître Caviste offers three pairing options: a classic Old World journey (9 wines), a Grand Cru experience (7 wines), and an artisan natural selection (8 wines). Each curated glass for glass." },
  { q: "How far in advance should we reserve?", a: "The main dining room books 6–8 weeks ahead. The Chef's Table requires a minimum of 8 weeks. For special occasions, we recommend contacting us as early as 12 weeks in advance." },
];

const STATS = [
  { value: 3, label: "Michelin Stars", suffix: "" },
  { value: 18, label: "Years of Excellence", suffix: "" },
  { value: 42, label: "Producers & Artisans", suffix: "" },
  { value: 100, label: "Exceptional Vintages", suffix: "%" },
];

const MARQUEE_ITEMS = [
  "Foie Gras", "Turbot de Ligne", "Wagyu A5", "Caviar Osciètre", "Truffe Noire",
  "Homard Breton", "Soufflé", "Chablis Premier Cru", "Petits Fours",
  "Foie Gras", "Turbot de Ligne", "Wagyu A5", "Caviar Osciètre", "Truffe Noire",
  "Homard Breton", "Soufflé", "Chablis Premier Cru", "Petits Fours",
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
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
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

  return <span ref={ref}>{count}{suffix}</span>;
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
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
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
export default function LiquidLetterTransition() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState(0);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div
      className="premium-theme text-[#f5efe0] min-h-screen font-sans overflow-x-hidden selection:bg-[#b8860b] selection:text-black"
      style={{ background: "#120d08" }}
    >

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6 bg-[#120d08]/80 backdrop-blur-xl border-b border-[#b8860b]/15">
        <div className="text-center">
          <span className="text-sm tracking-[0.4em] uppercase text-[#b8860b] block leading-none" style={{ fontFamily: "Georgia, serif" }}>Restaurant</span>
          <span className="text-2xl font-bold tracking-widest text-[#f5efe0] block" style={{ fontFamily: "Georgia, serif" }}>SATORI</span>
        </div>
        <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] text-[#f5efe0]/50 font-medium">
          {["Menu", "Wine", "Chef", "Reservations", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#b8860b] transition-colors">{item}</a>
          ))}
        </div>
        <MagneticBtn
          onClick={() => setReserveOpen(true)}
          className="hidden md:flex items-center gap-2 px-6 py-3 border border-[#b8860b]/60 text-[#b8860b] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#b8860b] hover:text-black transition-all"
        >
          Reserve a Table
        </MagneticBtn>
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6 text-[#f5efe0]" />
        </button>
      </nav>

      {/* ── MOBILE NAV ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-center items-center gap-10"
            style={{ background: "#0a0603" }}
          >
            <button className="absolute top-6 right-8" onClick={() => setMobileOpen(false)}>
              <X className="w-7 h-7 text-[#f5efe0]" />
            </button>
            {["Menu", "Wine", "Chef", "Reservations", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-bold text-[#f5efe0] tracking-widest hover:text-[#b8860b] transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RESERVATION MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {reserveOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setReserveOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="rounded-2xl p-10 max-w-lg w-full shadow-2xl border border-[#b8860b]/20"
              style={{ background: "#1a1108" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] block mb-1">Reserve</span>
                  <h2 className="text-2xl text-[#f5efe0]" style={{ fontFamily: "Georgia, serif" }}>Your Evening at Satori</h2>
                </div>
                <button onClick={() => setReserveOpen(false)} className="w-9 h-9 border border-[#f5efe0]/15 flex items-center justify-center hover:border-[#b8860b] transition-colors">
                  <X className="w-4 h-4 text-[#f5efe0]/60" />
                </button>
              </div>
              <div className="space-y-5">
                {[
                  { label: "Date", type: "date", placeholder: "" },
                  { label: "Time", type: "time", placeholder: "" },
                  { label: "Guests", type: "number", placeholder: "2" },
                  { label: "Name", type: "text", placeholder: "Full Name" },
                  { label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-[#f5efe0]/40 block mb-2 font-medium">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full bg-[#f5efe0]/5 border border-[#b8860b]/20 text-[#f5efe0] placeholder-[#f5efe0]/25 px-4 py-3 text-sm focus:outline-none focus:border-[#b8860b]/60 transition-colors"
                    />
                  </div>
                ))}
                <MagneticBtn className="w-full py-4 bg-[#b8860b] text-black font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#d4a017] transition-colors mt-4">
                  Confirm Reservation
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-196645?w=800&q=80"
            alt="Fine dining"
            fill
            unoptimized
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,13,8,0.9) 0%, rgba(18,13,8,0.3) 60%, transparent 100%)" }} />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 pb-24 px-8 md:px-20 max-w-4xl w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              {[1, 2, 3].map((i) => <Star key={i} className="w-4 h-4 text-[#b8860b] fill-[#b8860b]" />)}
              <span className="text-xs uppercase tracking-[0.3em] text-[#f5efe0]/50 font-medium ml-1">Michelin 2026</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-[8vw] leading-[0.85] mb-8 text-[#f5efe0]" style={{ fontFamily: "Georgia, serif" }}>
              Where fire<br />
              <em className="text-[#b8860b]">becomes art.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-[#f5efe0]/55 max-w-xl mb-10 leading-relaxed">
              Chef Anatol Voss transforms memory, season, and flame into a dining experience that transcends cuisine. An evening at Satori is unrepeatable.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <MagneticBtn
                onClick={() => setReserveOpen(true)}
                className="flex items-center gap-3 px-8 py-4 bg-[#b8860b] text-black font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#d4a017] transition-colors"
              >
                Reserve a Table <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center gap-3 px-8 py-4 border border-[#f5efe0]/20 text-[#f5efe0] text-sm uppercase tracking-[0.2em] hover:border-[#b8860b] hover:text-[#b8860b] transition-colors">
                View Menu
              </button>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-[#b8860b]/15 py-5" style={{ background: "#0a0603" }}>
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-14 whitespace-nowrap"
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="text-xs tracking-[0.4em] uppercase flex-shrink-0 text-[#f5efe0]/30" style={{ fontFamily: "Georgia, serif" }}>
              {item} <span className="text-[#b8860b]/40 mx-4">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="py-20 px-8 md:px-16 border-b border-[#b8860b]/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-6xl mb-3 text-[#b8860b]" style={{ fontFamily: "Georgia, serif" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#f5efe0]/35 font-medium">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MENU ──────────────────────────────────────────── */}
      <section id="menu" className="px-8 md:px-16 py-28">
        <Reveal className="mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#b8860b] block mb-4 font-medium">À La Carte</span>
          <h2 className="text-5xl md:text-7xl text-[#f5efe0]" style={{ fontFamily: "Georgia, serif" }}>
            The <em>Menu.</em>
          </h2>
        </Reveal>
        {/* Menu tabs */}
        <div className="flex gap-0 mb-12 border border-[#b8860b]/20 max-w-xl overflow-hidden">
          {MENUS.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActiveMenu(i)}
              className={`flex-1 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all ${activeMenu === i ? "bg-[#b8860b] text-black" : "text-[#f5efe0]/40 hover:text-[#f5efe0]/70"}`}
            >
              {m.category}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            {MENUS[activeMenu].items.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <div className="flex justify-between items-start py-7 border-b border-[#f5efe0]/8 group">
                  <div className="flex-1 pr-8">
                    <h3 className="text-xl text-[#f5efe0] mb-2 group-hover:text-[#b8860b] transition-colors" style={{ fontFamily: "Georgia, serif" }}>{item.name}</h3>
                    <p className="text-sm text-[#f5efe0]/40 leading-relaxed italic">{item.desc}</p>
                  </div>
                  <span className="text-[#b8860b] font-medium text-sm whitespace-nowrap pt-1" style={{ fontFamily: "Georgia, serif" }}>{item.price}</span>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── CHEF ──────────────────────────────────────────── */}
      <section id="chef" className="px-8 md:px-16 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <Reveal>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-733852?w=800&q=80"
              alt="Chef Anatol"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,13,8,0.8) 0%, transparent 50%)" }} />
            <div className="absolute bottom-8 left-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] mb-1">Executive Chef</div>
              <div className="text-3xl text-[#f5efe0]" style={{ fontFamily: "Georgia, serif" }}>Anatol Voss</div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <span className="text-xs uppercase tracking-[0.4em] text-[#b8860b] block mb-6 font-medium">The Man Behind the Fire</span>
            <h2 className="text-5xl text-[#f5efe0] leading-tight mb-8" style={{ fontFamily: "Georgia, serif" }}>
              A Life<br /><em>in Flames.</em>
            </h2>
            <p className="text-[#f5efe0]/55 leading-relaxed mb-6">
              Anatol Voss trained under Ferran Adrià in Barcelona before earning his first star at 27. Today, three stars and eighteen years later, his philosophy remains unchanged: respect the ingredient, master the flame, surrender to the season.
            </p>
            <p className="text-[#f5efe0]/45 leading-relaxed mb-10">
              Satori sources from 42 artisan producers — each visited by Anatol personally, twice a year. No compromise. No exceptions.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-5">
              {[["2006", "First Michelin Star"], ["2011", "Second Star"], ["2018", "Three Stars"], ["2022", "World's Best 50 No.7"]].map(([year, title]) => (
                <div key={year} className="p-5 border border-[#b8860b]/20 hover:border-[#b8860b]/50 transition-colors">
                  <div className="text-[#b8860b] text-xs font-bold uppercase tracking-[0.3em] mb-1">{year}</div>
                  <div className="text-[#f5efe0] font-medium text-sm" style={{ fontFamily: "Georgia, serif" }}>{title}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="px-8 md:px-16 py-20 border-y border-[#b8860b]/10" style={{ background: "#0a0603" }}>
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl text-[#f5efe0]" style={{ fontFamily: "Georgia, serif" }}>What Our Guests Say.</h2>
        </Reveal>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { quote: "An evening at Satori is not a dinner — it is a memory you will carry for decades.", author: "Le Figaro", role: "Gastronomy" },
            { quote: "The pigeon en deux services is the single most extraordinary dish I have tasted in thirty years of criticism.", author: "Joël Rebuchon", role: "Legendary Chef" },
            { quote: "Anatol Voss speaks through fire. You eat light, memory, and precision all at once.", author: "The World's 50 Best", role: "2026 Jury" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-8 border border-[#b8860b]/15 hover:border-[#b8860b]/40 transition-colors">
                <div className="text-4xl text-[#b8860b] mb-4" style={{ fontFamily: "Georgia, serif" }}>"</div>
                <p className="text-[#f5efe0]/60 text-sm leading-relaxed italic mb-6">{t.quote}</p>
                <div className="border-t border-[#b8860b]/15 pt-4">
                  <div className="text-[#f5efe0] font-semibold text-sm" style={{ fontFamily: "Georgia, serif" }}>{t.author}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8860b]/60">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-w-4xl mx-auto">
        <Reveal className="mb-14">
          <span className="text-xs uppercase tracking-[0.4em] text-[#b8860b] block mb-4 font-medium">Guest Information</span>
          <h2 className="text-4xl text-[#f5efe0]" style={{ fontFamily: "Georgia, serif" }}>
            Before You Dine.
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-[#b8860b]/15 overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-7 py-5 text-left hover:bg-[#b8860b]/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-[#f5efe0] text-sm font-medium pr-4" style={{ fontFamily: "Georgia, serif" }}>{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-[#b8860b] flex-shrink-0" />
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
                      <p className="px-7 pb-6 text-[#f5efe0]/45 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────── */}
      <section id="contact" className="relative overflow-hidden py-32 px-8 md:px-16 text-center">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-733852?w=800&q=80"
            alt="Restaurant ambiance"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0" style={{ background: "rgba(18,13,8,0.8)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <div className="flex justify-center gap-1 mb-8">
              {[1, 2, 3].map((i) => <Star key={i} className="w-5 h-5 text-[#b8860b] fill-[#b8860b]" />)}
            </div>
            <h2 className="text-5xl md:text-6xl text-[#f5efe0] mb-6" style={{ fontFamily: "Georgia, serif" }}>
              Your Table<br /><em>Awaits.</em>
            </h2>
            <p className="text-[#f5efe0]/45 text-lg leading-relaxed mb-12">
              A meal here is a singular thing. We welcome you to dine with us — and experience Satori as it was meant to be felt.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <MagneticBtn
                onClick={() => setReserveOpen(true)}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-[#b8860b] text-black font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#d4a017] transition-colors"
              >
                Reserve a Table <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center justify-center gap-3 px-10 py-5 border border-[#f5efe0]/20 text-[#f5efe0] text-sm uppercase tracking-[0.2em] hover:border-[#b8860b] hover:text-[#b8860b] transition-colors">
                <Phone className="w-4 h-4" /> +33 1 47 20 00 00
              </button>
            </div>
            <div className="flex justify-center gap-8 text-[11px] text-[#f5efe0]/25 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-[#b8860b]" /> Tue–Sat: 19h30 – 23h00</span>
              <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-[#b8860b]" /> 8 Rue de l'Amiral, Paris 8e</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="py-8 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#f5efe0]/20 uppercase tracking-[0.2em] border-t border-[#b8860b]/10" style={{ background: "#080503" }}>
        <span style={{ fontFamily: "Georgia, serif" }}>Restaurant Satori © 2026</span>
        <span>Menu · Wine · Reservations · Private Dining</span>
        <span>Paris · Geneva · Tokyo</span>
      </footer>

      <style>{`::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #120d08; } ::-webkit-scrollbar-thumb { background: #b8860b; }`}</style>
    </div>
  );
}
