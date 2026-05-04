"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wine,
  MapPin,
  Clock,
  Award,
  ShieldCheck,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Layers,
  ArrowRight,
  Check,
  Star,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  ChevronRight,
  Play,
  Search,
  ShoppingBag,
  Heart,
  Timer,
} from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const ESTATES = [
  {
    region: "Pauillac",
    soil: "Deep Gravel",
    focus: "Cabernet Sauvignon",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7ef?q=80&w=800&auto=format&fit=crop",
  },
  {
    region: "Saint-Émilion",
    soil: "Limestone Plateau",
    focus: "Merlot",
    image:
      "https://images.unsplash.com/photo-1528823331199-318e384ed84b?q=80&w=800&auto=format&fit=crop",
  },
  {
    region: "Pessac-Léognan",
    soil: "Sand & Clay",
    focus: "Sémillon",
    image:
      "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=800&auto=format&fit=crop",
  },
];

const WINES = [
  {
    id: 1,
    name: "Grand Cru Réserve",
    appellation: "Pomerol AOC",
    vintage: "2019",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
    price: "€ 480",
    desc: "Dense garnet robe. Notes of dark truffle, ripe plum, and violet. Silky tannins with a 40-year cellaring potential.",
    specs: {
      alcohol: "14.5%",
      acidity: "3.4 pH",
      aging: "24 months in French Oak",
    },
  },
  {
    id: 2,
    name: "Blanc de Pierres",
    appellation: "Chablis Grand Cru",
    vintage: "2021",
    img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=1200&auto=format&fit=crop",
    price: "€ 220",
    desc: "Pale gold with green glints. Mineral tension like struck flint. Crisp citrus bloom, white flower, and saline finish.",
    specs: { alcohol: "13.0%", acidity: "3.1 pH", aging: "12 months on lees" },
  },
  {
    id: 3,
    name: "Cuvée Prestige",
    appellation: "Champagne AOC",
    vintage: "NV",
    img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1200&auto=format&fit=crop",
    price: "€ 145",
    desc: "A precise assemblage of Chardonnay and Pinot Noir. Fine persistent mousse, brioche, and roasted hazelnut.",
    specs: { alcohol: "12.5%", dosage: "6g/L", aging: "48 months sur latte" },
  },
  {
    id: 4,
    name: "L'Éternité",
    appellation: "Margaux AOC",
    vintage: "2016",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1200&auto=format&fit=crop",
    price: "€ 890",
    desc: "A landmark vintage. Graphite and cigar box. Extraordinary structure; the tannins will reward another decade of patience.",
    specs: {
      alcohol: "14.0%",
      acidity: "3.5 pH",
      aging: "22 months in new oak",
    },
  },
];

const FAQS = [
  {
    q: "How do you source your vintages?",
    a: "Our cellar master travels to Bordeaux, Burgundy, Champagne, and the Loire each harvest. We source exclusively from domaines with whom we have cultivated long-term relationships spanning multiple generations.",
  },
  {
    q: "What are your storage and shipping conditions?",
    a: "All orders are shipped in temperature-controlled packaging with real-time tracking. Bottles remain in our climate-regulated cellar at 13°C and 70% humidity until the moment of dispatch.",
  },
  {
    q: "Do you offer en primeur subscriptions?",
    a: "Yes. Our En Primeur Programme grants subscribers first access to barrel samples and preferential pricing on futures, typically 18 to 24 months before commercial release.",
  },
  {
    q: "Can I arrange a private tasting?",
    a: "Our Paris and London salons host intimate guided tastings for up to eight guests. Each session is curated by our sommelier team around a specific theme or appellation.",
  },
];

const SOMMELIERS = [
  {
    name: "Marc-Antoine Lefebvre",
    role: "Master Sommelier",
    bio: "Former head sommelier at a 3-star Michelin establishment in Paris, Marc-Antoine brings 25 years of palate expertise.",
    avatar: "ML",
  },
  {
    name: "Elena Rossi",
    role: "Head of Curation",
    bio: "Specializing in Italian and Rhone varietals, Elena oversees our direct relationships with independent vignerons.",
    avatar: "ER",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function Reveal({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function ChateauVestigePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWine, setActiveWine] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#f5f0e8] text-[#2c1810] font-serif selection:bg-[#7b2d24] selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-[#f5f0e8]/90 backdrop-blur-md py-4 border-b border-[#2c1810]/10" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase"
          >
            CHÂTEAU<span className="italic font-light">VESTIGE</span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2c1810]/60">
            <Link href="#" className="hover:text-[#7b2d24] transition-colors">
              Cuvées
            </Link>
            <Link href="#" className="hover:text-[#7b2d24] transition-colors">
              Terroir
            </Link>
            <Link href="#" className="hover:text-[#7b2d24] transition-colors">
              En Primeur
            </Link>
            <Link href="#" className="hover:text-[#7b2d24] transition-colors">
              Salons
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[#2c1810]/40 hover:text-[#2c1810] transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative text-[#2c1810] hover:text-[#7b2d24] transition-colors cursor-pointer">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#7b2d24] text-white text-[8px] flex items-center justify-center rounded-full font-sans font-bold">
                1
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#2c1810] cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#f5f0e8] p-8 pt-32 flex flex-col items-center text-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#2c1810] cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-12 text-5xl font-light italic tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Cuvées
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Terroir
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                En Primeur
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Salons
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cinematic Split Reveal)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1536482?w=1600&q=80"
            alt="Vineyard Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e8] via-[#2c1810]/30 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-white/70 mb-8 block">
              Bordeaux · Depuis 1847
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mb-12">
              The soul <br />{" "}
              <span className="italic font-light">of the vine.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/80 leading-relaxed font-light mb-12">
              Château Vestige is more than a cellar; it is an inheritance of
              time. Experience the biological intelligence of our terroir,
              expressed through centuries of mastery.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-10 py-4 bg-[#7b2d24] text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-[#2c1810] transition-all cursor-pointer shadow-lg shadow-[#7b2d24]/20">
                Explore the Cave
              </button>
              <button className="px-10 py-4 border border-white/30 text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-[#2c1810] transition-all cursor-pointer">
                Reserve a Tasting
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/50">
              Scroll to Descend
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE PHILOSOPHY (Split Layout)
          ========================================== */}
      <section className="py-32 bg-[#f5f0e8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <Reveal className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1544450173-8c87924045cc?q=80&w=1200&auto=format&fit=crop"
              alt="Wine Barrel"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#7b2d24]/10 mix-blend-multiply" />
          </Reveal>

          <div>
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#7b2d24] mb-6 block">
                Our Heritage
              </span>
              <h2 className="text-5xl md:text-6xl font-light tracking-tighter leading-tight mb-10 uppercase">
                Terroir is <br />{" "}
                <span className="italic font-normal text-[#7b2d24]">
                  Responsibility.
                </span>
              </h2>
              <p className="text-xl text-[#2c1810]/60 leading-relaxed font-light mb-12">
                For 179 years, Château Vestige has maintained that the finest
                expression of any wine is inseparable from the land that
                produced it. We practice biodynamic viticulture with zero
                compromise.
              </p>

              <div className="grid grid-cols-2 gap-10 border-t border-[#2c1810]/10 pt-12">
                <div>
                  <h4 className="text-lg font-bold mb-4 uppercase flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#7b2d24]" /> Heritage
                  </h4>
                  <p className="text-sm text-[#2c1810]/50 leading-relaxed">
                    Fifth generation mastery across 64 hectares of prime
                    Bordeaux soil.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-4 uppercase flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-[#7b2d24]" /> Precision
                  </h4>
                  <p className="text-sm text-[#2c1810]/50 leading-relaxed">
                    Temperature-controlled aging at 13°C and 70% humidity since
                    1847.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. CUVÉES SELECTION (Vertical List)
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase">
                Les Grandes <span className="italic">Cuvées.</span>
              </h2>
            </Reveal>
            <div className="flex gap-4 md:gap-12 text-[10px] uppercase tracking-widest font-bold text-[#2c1810]/40">
              {["Red", "White", "Sparkling"].map((tab) => (
                <button
                  key={tab}
                  className="pb-2 border-b border-transparent hover:border-[#7b2d24] hover:text-[#2c1810] transition-all cursor-pointer"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WINES.map((wine, i) => (
              <Reveal key={wine.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveWine(i)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-[#f5f0e8] mb-8 shadow-md">
                    <Image
                      src={wine.img}
                      alt={wine.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-[#7b2d24]">
                        {wine.vintage}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/40 backdrop-blur-md border-t border-white/20">
                      <button className="w-full py-4 bg-[#2c1810] text-white text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-black transition-colors">
                        Quick Add &mdash; {wine.price}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-[#7b2d24] transition-colors">
                      {wine.name}
                    </h3>
                    <span className="text-lg font-light text-[#2c1810]/70">
                      {wine.price}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[#2c1810]/40 mb-4">
                    {wine.appellation}
                  </p>
                  <p className="text-sm text-[#2c1810]/50 leading-relaxed font-light italic">
                    "{wine.desc.slice(0, 80)}..."
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE ESTATES (Bento Grid)
          ========================================== */}
      <section className="py-32 bg-[#f5f0e8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#7b2d24] mb-6 block">
              Geographic Purity
            </span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tighter uppercase leading-tight">
              Mastery of <br /> <span className="italic">Terroir.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ESTATES.map((estate, i) => (
              <Reveal key={estate.region} delay={i * 0.1}>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-xl">
                  <Image
                    src={estate.image}
                    alt={estate.region}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <h4 className="text-3xl font-bold text-white mb-4 italic uppercase">
                      {estate.region}
                    </h4>
                    <div className="flex items-center gap-6 text-[9px] uppercase tracking-[0.2em] text-white/60">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3" /> {estate.soil}
                      </div>
                      <div className="flex items-center gap-2">
                        <Wine className="w-3 h-3" /> {estate.focus}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. EN PRIMEUR (Interactive Science)
          ========================================== */}
      <section className="py-32 bg-[#2c1810] text-[#f5f0e8] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#7b2d24] blur-[120px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4956a] mb-6 block">
                  Future Acquisitions
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-[0.9] mb-12">
                  En <br />{" "}
                  <span className="text-[#d4956a] italic font-normal">
                    Primeur.
                  </span>
                </h2>
                <p className="text-xl text-[#f5f0e8]/60 font-light leading-relaxed mb-12">
                  Secure the most sought-after vintages while they are still in
                  the barrel. Our subscription model provides exclusive access
                  to futures at preferential pricing.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Thermometer className="w-5 h-5" />,
                      title: "Atmospheric Precision",
                      desc: "Real-time monitoring of barrel maturation dynamics.",
                    },
                    {
                      icon: <ShieldCheck className="w-5 h-5" />,
                      title: "Chain of Custody",
                      desc: "Blockchain-verified provenance for every future bottle.",
                    },
                    {
                      icon: <Timer className="w-5 h-5" />,
                      title: "Optimal Dispatch",
                      desc: "Bottling and delivery timed to the peak of maturation.",
                    },
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="text-[#d4956a] shrink-0 mt-1">
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-[#f5f0e8]/40 mt-1 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl">
              <Reveal>
                <div className="flex justify-between items-center mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Maturation Index: 2026
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#d4956a]">
                    Status: Exceptional
                  </span>
                </div>
                <div className="space-y-12">
                  {[
                    { label: "Bordeaux Left Bank", val: 94, color: "#7b2d24" },
                    { label: "Saint-Émilion", val: 97, color: "#d4956a" },
                    { label: "Pomerol", val: 98, color: "#7b2d24" },
                    { label: "Sauternes", val: 89, color: "#d4956a" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-4">
                        <span>{stat.label}</span>
                        <span>{stat.val}/100</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full"
                          style={{ backgroundColor: stat.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-12 py-5 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#2c1810] transition-all">
                  Download Vintage Forecast
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. THE MASTERS (Team)
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#7b2d24] mb-6 block">
              The Curators
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic">
              The Palate.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            {SOMMELIERS.map((member, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="group flex flex-col md:flex-row gap-10 items-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden shrink-0 shadow-2xl border-4 border-[#f5f0e8] group-hover:border-[#7b2d24] transition-colors">
                    <div className="absolute inset-0 bg-[#7b2d24] flex items-center justify-center text-4xl font-bold text-white uppercase italic">
                      {member.avatar}
                    </div>
                    <Image
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?q=80&w=400&auto=format&fit=crop`}
                      alt={member.name}
                      fill
                      className="object-cover mix-blend-overlay grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">
                      {member.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#7b2d24] mb-4 block">
                      {member.role}
                    </span>
                    <p className="text-sm text-[#2c1810]/60 leading-relaxed font-light">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FAQ (The Cave Answers)
          ========================================== */}
      <section className="py-32 bg-[#f5f0e8] border-y border-[#2c1810]/10">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-20 text-center italic">
              Frequently Asked
            </h2>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group border-b border-[#2c1810]/10 pb-6 mb-6 cursor-pointer">
                  <summary className="flex justify-between items-center list-none text-lg font-bold uppercase tracking-tight hover:text-[#7b2d24] transition-colors">
                    {faq.q}
                    <span className="text-[#7b2d24] text-2xl group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-6 text-sm text-[#2c1810]/60 leading-relaxed font-light italic">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. GLOBAL SALONS (Locations)
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                city: "Paris",
                address: "Rue du Faubourg Saint-Honoré",
                phone: "+33 1 42 65 00 00",
              },
              {
                city: "London",
                address: "Mayfair, Conduit Street",
                phone: "+44 20 7493 0000",
              },
              {
                city: "New York",
                address: "Upper East Side, Madison Ave",
                phone: "+1 212 593 0000",
              },
              {
                city: "Tokyo",
                address: "Ginza, Chuo City",
                phone: "+81 3 3571 0000",
              },
            ].map((loc, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 border border-[#2c1810]/5 bg-[#f5f0e8]/30 hover:bg-[#f5f0e8]/80 transition-colors group cursor-pointer text-center">
                  <MapPin className="w-6 h-6 mx-auto mb-8 text-[#7b2d24] group-hover:scale-110 transition-transform" />
                  <h4 className="text-2xl font-bold uppercase tracking-tighter mb-4 italic">
                    {loc.city}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#2c1810]/40 mb-2">
                    {loc.address}
                  </p>
                  <p className="text-[10px] font-bold tracking-widest">
                    {loc.phone}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          9. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#2c1810] text-[#f5f0e8] pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-12">
                  Open the <br />{" "}
                  <span className="text-[#d4956a] italic font-normal">
                    right bottle.
                  </span>
                </h2>
                <form
                  className="flex border-b border-[#f5f0e8]/20 pb-4 w-full md:w-[400px]"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Cuvée Insights (Email)"
                    className="bg-transparent flex-1 text-lg font-light outline-none text-white placeholder-white/20"
                  />
                  <button
                    type="submit"
                    className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#d4956a] transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4956a] mb-10">
                Selections
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/40">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Grand Cru
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Limited Vintages
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Champagne
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    White & Rose
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4956a] mb-10">
                Atelier
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/40">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Our History
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sommeliers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cave Tours
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4956a] mb-10">
                Connect
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/40">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Instagram className="w-3 h-3" /> Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Facebook className="w-3 h-3" /> Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Twitter className="w-3 h-3" /> Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/10 text-[9px] uppercase tracking-widest font-bold text-white/20">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} Château Vestige Vignobles AB
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Trade Terms
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Bordeaux · Genéve · Paris</span>
              <span>Cellared with Intent</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WINE MODAL (Placeholder logic) */}
      <AnimatePresence>
        {activeWine !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveWine(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#f5f0e8] max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={WINES[activeWine].img}
                  alt="Wine"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-12 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#7b2d24] font-bold mb-4 block">
                    {WINES[activeWine].vintage} ·{" "}
                    {WINES[activeWine].appellation}
                  </span>
                  <h3 className="text-4xl font-bold uppercase tracking-tight text-[#2c1810] mb-6">
                    {WINES[activeWine].name}
                  </h3>
                  <p className="text-lg text-[#2c1810]/60 italic font-light leading-relaxed mb-8">
                    "{WINES[activeWine].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {Object.entries(WINES[activeWine].specs).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between text-xs border-b border-[#2c1810]/10 pb-2"
                      >
                        <span className="uppercase tracking-widest text-[#2c1810]/40">
                          {k}
                        </span>
                        <span className="font-bold text-[#2c1810]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-5 bg-[#7b2d24] text-white text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-[#2c1810] transition-colors cursor-pointer">
                  Add to Private Cellar &mdash; {WINES[activeWine].price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:6px;background:#f5f0e8}::-webkit-scrollbar-thumb{background:#7b2d2440}`}</style>
    </div>
  );
}
