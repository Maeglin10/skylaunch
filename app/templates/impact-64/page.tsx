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
  ArrowRight, X, Menu, ChevronDown, Heart, ShoppingBag, ArrowUpRight,
} from "lucide-react";
import "../premium.css";

/* ─── DATA ─────────────────────────────────────────────── */
const COLLECTIONS = [
  {
    id: 1,
    name: "Éclat de Sable",
    season: "SS 2026",
    type: "Ready-to-Wear",
    price: "€ 1,240",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1400&auto=format&fit=crop",
    tag: "New Arrival",
  },
  {
    id: 2,
    name: "Brume de Lin",
    season: "SS 2026",
    type: "Tailoring",
    price: "€ 2,180",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
    tag: "Bestseller",
  },
  {
    id: 3,
    name: "Voile d'Ivoire",
    season: "SS 2026",
    type: "Eveningwear",
    price: "€ 3,950",
    img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1400&auto=format&fit=crop",
    tag: "Limited Edition",
  },
  {
    id: 4,
    name: "Grain de Sel",
    season: "SS 2026",
    type: "Accessories",
    price: "€ 680",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop",
    tag: "Exclusive",
  },
];

const FAQS = [
  { q: "Where are your garments produced?", a: "Every piece is crafted in our atelier in Lyon, France, and in a network of family-run Italian workshops in Biella and Florence. Production runs are intentionally small — never exceeding 200 units per piece." },
  { q: "What is your sustainability approach?", a: "We source exclusively from certified organic and recycled fabric suppliers. Our packaging is 100% compostable. Carbon neutrality was achieved in 2024 through supply chain restructuring, not offsets." },
  { q: "Do you offer made-to-measure?", a: "Our Atelier Service offers bespoke tailoring for all ready-to-wear shapes. Appointments are available at our Paris flagship and by arrangement in London, Milan, and Tokyo." },
  { q: "What is the return and alteration policy?", a: "We offer free returns within 30 days of delivery, with complimentary alteration on all full-price purchases. Our in-house seamstress team operates from our Paris and London studios." },
];

const STATS = [
  { value: 12, label: "Collections", suffix: "" },
  { value: 8, label: "Countries", suffix: "" },
  { value: 200, label: "Max units per piece", suffix: "" },
  { value: 100, label: "Organic Fabrics", suffix: "%" },
];

const MARQUEE_ITEMS = [
  "Ready-to-Wear", "Tailoring", "Eveningwear", "Accessories", "Atelier",
  "Lyon · Paris · Milan", "SS 2026", "Organic Textiles", "Made in France",
  "Ready-to-Wear", "Tailoring", "Eveningwear", "Accessories", "Atelier",
  "Lyon · Paris · Milan", "SS 2026", "Organic Textiles", "Made in France",
];

/* ─── SHARED COMPONENTS ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
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
export default function TechDataStream() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const activeItem = activeModal !== null ? COLLECTIONS[activeModal] : null;

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }, []);

  return (
    <div className="premium-theme bg-[#f7f4ef] text-[#1a1814] min-h-screen font-sans overflow-x-hidden selection:bg-[#1a1814] selection:text-[#f7f4ef]">

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-5 bg-[#f7f4ef]/85 backdrop-blur-xl border-b border-[#1a1814]/6">
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className="w-5 h-5 text-[#1a1814]" />
        </button>
        <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.3em] text-[#1a1814]/45 font-medium">
          {["Collections", "Atelier", "World"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#1a1814] transition-colors">{item}</a>
          ))}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <span className="text-xl tracking-[0.5em] uppercase text-[#1a1814] font-light" style={{ letterSpacing: "0.5em" }}>MARÉ</span>
        </div>
        <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.3em] text-[#1a1814]/45 font-medium">
          {["About", "Stockists", "Account"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#1a1814] transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <ShoppingBag className="w-5 h-5 text-[#1a1814]" />
        </div>
        <div className="hidden md:flex items-center gap-5">
          <ShoppingBag className="w-5 h-5 text-[#1a1814]/50 hover:text-[#1a1814] cursor-pointer transition-colors" />
        </div>
      </nav>

      {/* ── MOBILE NAV ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#f7f4ef] flex flex-col justify-center items-center gap-8"
          >
            <button className="absolute top-6 right-8" onClick={() => setMobileOpen(false)}>
              <X className="w-6 h-6 text-[#1a1814]" />
            </button>
            {["Collections", "Atelier", "World", "About", "Stockists", "Account"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.15 }}
                onClick={() => setMobileOpen(false)}
                className="text-3xl tracking-[0.3em] uppercase text-[#1a1814] hover:text-[#1a1814]/40 transition-colors font-light"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PRODUCT MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#1a1814]/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-16"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="bg-[#f7f4ef] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative md:w-1/2 aspect-[3/4] md:aspect-auto flex-shrink-0">
                <Image src={activeItem.img} alt={activeItem.name} fill unoptimized className="object-cover" />
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-5 right-5 w-9 h-9 bg-[#f7f4ef] flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X className="w-4 h-4 text-[#1a1814]" />
                </button>
              </div>
              <div className="p-10 md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-[#1a1814]/35 mb-2">{activeItem.season} · {activeItem.type}</div>
                  <h2 className="text-3xl text-[#1a1814] font-light tracking-[0.1em] mb-4" style={{ fontFamily: "Georgia, serif" }}>{activeItem.name}</h2>
                  <div className="text-2xl text-[#1a1814] mb-8">{activeItem.price}</div>
                  <div className="space-y-4 mb-8">
                    {[["Composition", "72% Organic Cotton, 28% Linen"], ["Origin", "Atelier Lyon, France"], ["Care", "Dry clean or cold hand wash"], ["Delivery", "3–5 business days · Free worldwide"]].map(([l, v]) => (
                      <div key={l} className="flex justify-between border-b border-[#1a1814]/6 pb-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#1a1814]/35">{l}</span>
                        <span className="text-[11px] text-[#1a1814]/70 text-right max-w-[60%] leading-relaxed">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mb-5">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#1a1814]/35 mb-3">Select Size</div>
                    <div className="flex gap-3">
                      {["XS", "S", "M", "L", "XL"].map((s) => (
                        <button key={s} className="w-10 h-10 border border-[#1a1814]/15 text-[11px] text-[#1a1814]/60 hover:border-[#1a1814] hover:text-[#1a1814] transition-colors">{s}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <MagneticBtn className="w-full py-4 bg-[#1a1814] text-[#f7f4ef] text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-[#2d2820] transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </MagneticBtn>
                  <button
                    onClick={() => { toggleWishlist(activeItem.id); }}
                    className="w-full py-4 border border-[#1a1814]/15 text-[11px] uppercase tracking-[0.3em] text-[#1a1814]/50 hover:border-[#1a1814]/40 hover:text-[#1a1814] transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(activeItem.id) ? "fill-[#1a1814] text-[#1a1814]" : ""}`} />
                    {wishlist.includes(activeItem.id) ? "Saved" : "Save to Wishlist"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1629236?w=800&q=80"
            alt="Fashion editorial"
            fill
            unoptimized
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef]/80 via-transparent to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 pb-16 px-8 md:px-20 max-w-5xl w-full">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#1a1814]/40 block mb-5">Printemps-Été 2026</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-[8vw] text-[#1a1814] font-light leading-[0.9] mb-8 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              Éclat<br />
              <em>de Lumière.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-[#1a1814]/50 max-w-md mb-10 leading-relaxed">
              A new collection born from the coast of Normandy and the light that moves through linen at six in the morning.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <MagneticBtn className="flex items-center gap-3 px-10 py-4 bg-[#1a1814] text-[#f7f4ef] text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-[#2d2820] transition-colors">
                Discover the Collection <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center gap-3 px-10 py-4 border border-[#1a1814]/20 text-[#1a1814] text-[11px] uppercase tracking-[0.3em] hover:border-[#1a1814]/50 transition-colors">
                Book Atelier Visit
              </button>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-[#1a1814]/6 py-4 bg-[#f0ece4]">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex gap-14 whitespace-nowrap"
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-[#1a1814]/30 flex-shrink-0 font-medium">
              {item} <span className="text-[#1a1814]/15 mx-5">—</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── COLLECTION ────────────────────────────────────── */}
      <section id="collections" className="px-8 md:px-16 py-28">
        <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a1814]/35 block mb-4">SS 2026 Selection</span>
            <h2 className="text-5xl md:text-6xl font-light text-[#1a1814]" style={{ fontFamily: "Georgia, serif" }}>
              The <em>Pieces.</em>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#1a1814]/45 hover:text-[#1a1814] transition-colors">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <div className="group cursor-pointer" onClick={() => setActiveModal(i)}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ede8e0] mb-5">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#1a1814]/0 group-hover:bg-[#1a1814]/10 transition-colors" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#f7f4ef] text-[#1a1814] text-[9px] uppercase tracking-[0.3em] font-medium">
                    {item.tag}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                    className="absolute top-4 right-4 w-8 h-8 bg-[#f7f4ef] flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(item.id) ? "fill-[#1a1814] text-[#1a1814]" : "text-[#1a1814]/40"}`} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1814]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-[#f7f4ef] text-[10px] uppercase tracking-[0.3em]">Quick View</span>
                  </div>
                </div>
                <div className="px-1">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-[#1a1814]/30 mb-1.5">{item.type}</div>
                  <h3 className="text-[#1a1814] mb-2 font-light tracking-wide" style={{ fontFamily: "Georgia, serif" }}>{item.name}</h3>
                  <div className="text-[#1a1814] text-sm">{item.price}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-[#1a1814] py-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl font-light text-[#f7f4ef] mb-3" style={{ fontFamily: "Georgia, serif" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#f7f4ef]/30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ATELIER ───────────────────────────────────────── */}
      <section id="atelier" className="px-8 md:px-16 py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a1814]/35 block mb-6">The Making</span>
            <h2 className="text-5xl font-light text-[#1a1814] leading-tight mb-8" style={{ fontFamily: "Georgia, serif" }}>
              Craft as<br /><em>Conviction.</em>
            </h2>
            <p className="text-[#1a1814]/50 leading-relaxed mb-6">
              MARÉ is built on the belief that fashion is at its most beautiful when it is also at its most considered. Every seam, every button, every fold is the result of a conversation between our designers and our craftspeople.
            </p>
            <p className="text-[#1a1814]/45 leading-relaxed mb-10">
              We limit each piece to 200 units. Not because of artificial scarcity, but because that is the number our atelier can produce without compromise.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-5">
              {[["Our Workshops", "Lyon & Biella"], ["Fibers", "Organic, traceable, certified"], ["Seasons", "Two per year — never more"], ["Packaging", "100% compostable materials"]].map(([title, desc]) => (
                <div key={title} className="border-t border-[#1a1814]/8 pt-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#1a1814]/30 mb-2">{title}</div>
                  <div className="text-sm text-[#1a1814]/70 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1629236?w=800&q=80"
                alt="Atelier at work"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-52 border border-[#1a1814]/10 hidden md:block" />
          </div>
        </Reveal>
      </section>

      {/* ── EDITORIAL ─────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {[
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop",
        ].map((src, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="relative aspect-[3/4] overflow-hidden group">
              <Image src={src} alt={`Editorial ${i + 1}`} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#1a1814]/0 group-hover:bg-[#1a1814]/20 transition-colors" />
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 bg-[#f0ece4]">
        <Reveal className="text-center mb-14">
          <h2 className="text-4xl font-light text-[#1a1814]" style={{ fontFamily: "Georgia, serif" }}>
            From Those Who Wear MARÉ.
          </h2>
        </Reveal>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { quote: "The linen coat from the SS 2026 collection is the most quietly extraordinary garment I have owned. It improves with every wear.", author: "C. Moreau", role: "Paris" },
            { quote: "There is a stillness to MARÉ that is extremely rare in fashion today. They are not trying to impress — they simply are.", author: "M. Svensson", role: "Stockholm" },
            { quote: "I wore the Voile d'Ivoire gown to a gallery opening and three separate people asked if it was vintage Balenciaga. It is not. It is better.", author: "A. Kimura", role: "Tokyo" },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-8 bg-[#f7f4ef]">
                <p className="text-[#1a1814]/55 text-sm leading-relaxed mb-7 italic" style={{ fontFamily: "Georgia, serif" }}>"{t.quote}"</p>
                <div className="border-t border-[#1a1814]/6 pt-5">
                  <div className="font-medium text-[#1a1814] text-sm">{t.author}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#1a1814]/30">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-w-4xl mx-auto">
        <Reveal className="mb-14">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a1814]/35 block mb-4">Questions</span>
          <h2 className="text-4xl font-light text-[#1a1814]" style={{ fontFamily: "Georgia, serif" }}>
            Before You Order.
          </h2>
        </Reveal>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-t border-[#1a1814]/8">
                <button
                  className="w-full flex justify-between items-center py-6 text-left hover:opacity-70 transition-opacity"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-[#1a1814] text-sm font-medium pr-8" style={{ fontFamily: "Georgia, serif" }}>{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 text-[#1a1814]/30 flex-shrink-0" />
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
                      <p className="pb-8 text-[#1a1814]/45 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 px-8 md:px-16 text-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1629236?w=800&q=80"
            alt="Collection"
            fill
            unoptimized
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#1a1814]/40 block mb-8">Atelier MARÉ</span>
            <h2 className="text-5xl md:text-7xl font-light text-[#1a1814] mb-8 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Worn With<br /><em>Intention.</em>
            </h2>
            <p className="text-[#1a1814]/45 text-lg leading-relaxed mb-12">
              The SS 2026 collection is available in limited quantities. Once gone, it will not return.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticBtn className="flex items-center justify-center gap-3 px-12 py-5 bg-[#1a1814] text-[#f7f4ef] text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-[#2d2820] transition-colors">
                Shop the Collection <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center justify-center gap-3 px-12 py-5 border border-[#1a1814]/20 text-[#1a1814] text-[11px] uppercase tracking-[0.3em] hover:border-[#1a1814]/50 transition-colors">
                Visit Our Atelier
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#1a1814] py-10 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-[#f7f4ef]/20">
        <span className="text-[#f7f4ef]/40 text-xl tracking-[0.5em]" style={{ letterSpacing: "0.5em" }}>MARÉ</span>
        <div className="flex flex-wrap justify-center gap-8">
          {["Collections", "Atelier", "Stockists", "Press", "Careers", "Legal"].map((item) => (
            <a key={item} href="#" className="hover:text-[#f7f4ef]/60 transition-colors">{item}</a>
          ))}
        </div>
        <span>© 2026 Atelier MARÉ</span>
      </footer>

      <style>{`::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #f7f4ef; } ::-webkit-scrollbar-thumb { background: #1a1814; }`}</style>
    </div>
  );
}
