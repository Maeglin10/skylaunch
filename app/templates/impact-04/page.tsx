"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Clock, MapPin, Phone, Mail, Star, ChevronDown, ArrowRight, Camera, Utensils, Wine, Flame, Leaf, CalendarDays, Users, ChevronLeft, ChevronRight } from "lucide-react";
import "../premium.css";

/* --- Data ----------------------------------------------------------- */

const MENU_CATEGORIES = [
  { id: "starters", label: "Starters", icon: <Leaf className="w-5 h-5" /> },
  { id: "mains", label: "Main Courses", icon: <Flame className="w-5 h-5" /> },
  { id: "desserts", label: "Desserts", icon: <Utensils className="w-5 h-5" /> },
  { id: "wines", label: "Wine List", icon: <Wine className="w-5 h-5" /> },
];

const MENU_ITEMS: Record<string, { name: string; desc: string; price: string; tag?: string }[]> = {
  starters: [
    { name: "Burrata Pugliese", desc: "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic reduction", price: "24", tag: "Chef's Pick" },
    { name: "Tartare de Saumon", desc: "Scottish salmon, avocado mousse, yuzu gel, crispy shallots", price: "28" },
    { name: "Velouté de Champignons", desc: "Wild mushroom soup, truffle cream, porcini dust, sourdough croutons", price: "19" },
    { name: "Carpaccio di Manzo", desc: "Wagyu beef, rocket, parmesan shavings, lemon-caper dressing", price: "32", tag: "New" },
  ],
  mains: [
    { name: "Filet de Bœuf Rossini", desc: "Prime beef tenderloin, seared foie gras, black truffle jus, pomme purée", price: "62", tag: "Signature" },
    { name: "Homard Breton", desc: "Whole Breton lobster, thermidor sauce, gratin dauphinois, seasonal greens", price: "78" },
    { name: "Risotto al Tartufo", desc: "Carnaroli rice, fresh black truffle, aged parmesan, brown butter", price: "44" },
    { name: "Canard Confit", desc: "48-hour duck confit, cherry reduction, roasted root vegetables", price: "48" },
  ],
  desserts: [
    { name: "Soufflé au Chocolat", desc: "Valrhona dark chocolate soufflé, vanilla bean crème anglaise", price: "22", tag: "Must Try" },
    { name: "Tarte Tatin", desc: "Caramelized apple tart, calvados ice cream, salted caramel drizzle", price: "18" },
    { name: "Crème Brûlée", desc: "Tahitian vanilla custard, caramelized sugar crust, fresh berries", price: "16" },
    { name: "Assiette de Fromages", desc: "Selection of five aged French cheeses, honeycomb, walnut bread", price: "26" },
  ],
  wines: [
    { name: "Chablis Premier Cru", desc: "Domaine William Fèvre · Burgundy, France · 2022", price: "85" },
    { name: "Châteauneuf-du-Pape", desc: "Château de Beaucastel · Rhône, France · 2019", price: "120", tag: "Sommelier Pick" },
    { name: "Barolo Riserva", desc: "Giacomo Conterno · Piedmont, Italy · 2017", price: "180" },
    { name: "Dom Pérignon", desc: "Vintage Champagne · Épernay, France · 2013", price: "320" },
  ],
};

const GALLERY = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
];

const REVIEWS = [
  { name: "Pierre M.", text: "An extraordinary dining experience. The Rossini is perfection incarnate. Worth every centime.", rating: 5, date: "March 2026" },
  { name: "Claire D.", text: "Impeccable service, stunning ambiance, and the sommelier's pairing was a revelation.", rating: 5, date: "February 2026" },
  { name: "Thomas W.", text: "We celebrated our anniversary here. The tasting menu was a journey through flavor and artistry.", rating: 5, date: "January 2026" },
];

/* --- Scroll Reveal -------------------------------------------------- */

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* --- Main Component ------------------------------------------------- */

export default function RestaurantVitrineSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState("starters");
  const [reservationOpen, setReservationOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [guests, setGuests] = useState(2);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.4, 0.7]);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview(prev => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="premium-theme bg-[#0c0a08] text-[#f5efe6] min-h-screen selection:bg-amber-700 selection:text-white overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <span className="text-2xl tracking-wide">
              <span className="font-light">L&apos;</span><span className="italic">Étoile</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {["Menu", "Ambiance", "Story", "Reviews"].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-[#f5efe6]/40 hover:text-[#f5efe6] transition-colors">
                {item}
              </button>
            ))}
            <button onClick={() => setReservationOpen(true)} className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-[10px] uppercase tracking-[0.2em] font-sans font-bold transition-colors rounded-sm">
              Reserve a Table
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden relative z-50">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#0c0a08]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
            {["Menu", "Ambiance", "Story", "Reviews"].map((item, i) => (
              <motion.button key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} onClick={() => scrollTo(item.toLowerCase())} className="text-3xl font-light italic hover:text-amber-500 transition-colors">
                {item}
              </motion.button>
            ))}
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onClick={() => { setMenuOpen(false); setReservationOpen(true); }} className="mt-4 px-8 py-3 bg-amber-700 text-sm font-sans font-bold uppercase tracking-wider">
              Reserve a Table
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===============================================================
          SECTION 1: HERO — Cinematic video-style with overlay
         ============================================================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1536482?w=800&q=80" fill className="object-cover" alt="Restaurant ambiance" priority />
        </motion.div>
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 z-[1] bg-[#0c0a08]" />

        {/* Warm vignette */}
        <div className="absolute inset-0 z-[2]" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(12,10,8,0.8) 100%)" }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-amber-600" />
              <span className="text-[11px] uppercase tracking-[0.5em] text-amber-500 font-sans font-semibold">Fine Dining · Paris</span>
              <div className="h-[1px] w-12 bg-amber-600" />
            </div>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }} className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-light tracking-[-0.02em] leading-[0.85]">
              L&apos;Étoile
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.9 }} className="text-lg md:text-xl text-[#f5efe6]/40 font-light italic">
              Where every dish tells a story
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button onClick={() => setReservationOpen(true)} className="px-10 py-4 bg-amber-700 hover:bg-amber-600 text-[11px] uppercase tracking-[0.3em] font-sans font-bold transition-colors flex items-center gap-3">
              <CalendarDays className="w-4 h-4" /> Reserve Your Table
            </button>
            <button onClick={() => scrollTo("menu")} className="px-10 py-4 border border-[#f5efe6]/20 text-[11px] uppercase tracking-[0.3em] font-sans font-semibold hover:border-amber-600 hover:text-amber-500 transition-all">
              View Menu
            </button>
          </motion.div>

          {/* Info bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex flex-wrap items-center justify-center gap-8 mt-16 text-[10px] font-sans text-[#f5efe6]/30 uppercase tracking-wider">
            <span className="flex items-center gap-2"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Michelin ★★</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Tue–Sun, 19h–23h</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> 8e Arrondissement</span>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown className="w-5 h-5 text-[#f5efe6]/20" />
        </motion.div>
      </section>

      {/* ===============================================================
          SECTION 2: INTRO STRIP
         ============================================================= */}
      <section className="py-20 px-6 md:px-12 border-y border-white/5 bg-[#0f0d0a]">
        <div className="max-w-6xl mx-auto text-center">
          <Reveal>
            <p className="text-xl md:text-3xl font-light leading-relaxed italic text-[#f5efe6]/60">
              &ldquo;Cuisine is an art form that engages all the senses. At L&apos;Étoile, we compose each plate as a symphony — where texture, aroma, color, and flavor harmonize into something transcendent.&rdquo;
            </p>
            <div className="mt-8 text-[10px] uppercase tracking-[0.3em] font-sans text-amber-600 font-semibold">— Chef Antoine Beaumont</div>
          </Reveal>
        </div>
      </section>

      {/* ===============================================================
          SECTION 3: MENU — Tabbed animated sections
         ============================================================= */}
      <section id="menu" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-sans font-semibold mb-4 block">La Carte</span>
            <h2 className="text-4xl md:text-6xl font-light">
              Our <span className="italic">Menu</span>
            </h2>
          </Reveal>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {MENU_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveMenuTab(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 ${
                  activeMenuTab === cat.id
                    ? "bg-amber-700 text-white"
                    : "border border-white/10 text-[#f5efe6]/40 hover:text-[#f5efe6] hover:border-white/30"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <AnimatePresence mode="wait">
            <motion.div key={activeMenuTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="space-y-0">
              {MENU_ITEMS[activeMenuTab].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="group flex items-start justify-between py-8 border-b border-white/5 hover:border-amber-700/30 transition-colors cursor-default"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-light group-hover:text-amber-500 transition-colors">{item.name}</h3>
                      {item.tag && (
                        <span className="px-2.5 py-0.5 bg-amber-700/20 text-amber-500 text-[8px] uppercase tracking-widest font-sans font-bold rounded-full border border-amber-700/30">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-sans text-[#f5efe6]/30 max-w-lg leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-8 shrink-0 pt-1">
                    <div className="hidden md:block h-[1px] w-12 bg-white/5 group-hover:bg-amber-700/30 transition-colors" />
                    <span className="text-xl font-light text-amber-500">{item.price}€</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal className="mt-16 text-center">
            <p className="text-[10px] font-sans text-[#f5efe6]/20 uppercase tracking-wider">
              Tasting menu available · 7 courses · 145€ per person · Wine pairing +85€
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===============================================================
          SECTION 4: AMBIANCE — Gallery grid
         ============================================================= */}
      <section id="ambiance" className="py-32 md:py-40 bg-[#0f0d0a]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-sans font-semibold mb-4 block">Ambiance</span>
                <h2 className="text-4xl md:text-6xl font-light">
                  A <span className="italic">Sensory</span> Journey
                </h2>
              </div>
              <a href="#" className="text-sm font-sans text-amber-500 flex items-center gap-2 hover:gap-4 transition-all">
                <Camera className="w-4 h-4" /> Follow @letoile.paris
              </a>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-2 md:px-6">
          {GALLERY.map((img, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className={`relative overflow-hidden group cursor-pointer ${i === 0 || i === 5 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}>
                <Image src={img} alt={`Ambiance ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===============================================================
          SECTION 5: STORY — Chef & restaurant story
         ============================================================= */}
      <section id="story" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" alt="Chef Antoine" fill className="object-cover" />
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 -right-6 bg-amber-700 text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-3xl font-light mb-1">★★</div>
                <div className="text-[9px] uppercase tracking-widest font-sans font-bold opacity-80">Michelin<br />Stars</div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <span className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-sans font-semibold mb-6 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-light leading-[1.1] mb-8">
              A passion born<br />in <span className="italic">Provence</span>
            </h2>
            <p className="text-[#f5efe6]/50 font-sans leading-relaxed mb-6">
              Chef Antoine Beaumont grew up in the lavender fields of Provence, where his grandmother taught him that great cooking begins with reverence for the ingredient. After training at Le Cordon Bleu and apprenticing under Alain Ducasse, he opened L&apos;Étoile in 2018 with a singular vision.
            </p>
            <p className="text-[#f5efe6]/30 font-sans leading-relaxed mb-10">
              Within two years, the restaurant earned its first Michelin star. The second followed in 2022. Today, L&apos;Étoile is recognized as one of Paris&apos;s most exciting culinary destinations — a place where tradition and innovation meet on every plate.
            </p>

            <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
              {[
                { value: "2018", label: "Founded" },
                { value: "★★", label: "Michelin" },
                { value: "#12", label: "France" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl text-amber-500 mb-1">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-wider font-sans text-[#f5efe6]/30 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===============================================================
          SECTION 6: REVIEWS — Auto-rotating testimonials
         ============================================================= */}
      <section id="reviews" className="py-32 md:py-40 bg-[#0f0d0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <span className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-sans font-semibold mb-4 block">Guest Reviews</span>
            <h2 className="text-4xl md:text-6xl font-light mb-20">
              What our guests <span className="italic">say</span>
            </h2>
          </Reveal>

          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeReview} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="flex flex-col items-center">
                <div className="flex gap-1 mb-8">
                  {[...Array(REVIEWS[activeReview].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xl md:text-3xl font-light leading-relaxed italic text-[#f5efe6]/70 mb-10 max-w-2xl">
                  &ldquo;{REVIEWS[activeReview].text}&rdquo;
                </p>
                <div className="text-sm font-sans font-semibold">{REVIEWS[activeReview].name}</div>
                <div className="text-[10px] font-sans text-[#f5efe6]/30 mt-1">{REVIEWS[activeReview].date}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button onClick={() => setActiveReview(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setActiveReview(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeReview ? "bg-amber-500 w-6" : "bg-white/10"}`} />
              ))}
            </div>
            <button onClick={() => setActiveReview(prev => (prev + 1) % REVIEWS.length)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===============================================================
          SECTION 7: RESERVATION CTA + CONTACT
         ============================================================= */}
      <section className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-sans font-semibold mb-6 block">Reservations</span>
            <h2 className="text-5xl md:text-7xl font-light mb-8">
              Your table <span className="italic">awaits</span>
            </h2>
            <p className="text-[#f5efe6]/40 font-sans max-w-lg mx-auto mb-12 leading-relaxed">
              We recommend booking at least two weeks in advance. Private dining rooms available for parties of 8–20 guests.
            </p>
            <button onClick={() => setReservationOpen(true)} className="px-12 py-5 bg-amber-700 hover:bg-amber-600 text-[11px] uppercase tracking-[0.3em] font-sans font-bold transition-colors inline-flex items-center gap-3">
              <CalendarDays className="w-4 h-4" /> Make a Reservation
            </button>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 pt-16 border-t border-white/5">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "42 Rue du Faubourg\nSaint-Honoré, 75008 Paris" },
                { icon: <Clock className="w-5 h-5" />, label: "Hours", value: "Tue–Sat: 19:00–23:00\nSun: 12:00–14:30" },
                { icon: <Phone className="w-5 h-5" />, label: "Contact", value: "+33 1 42 65 15 16\nreserve@letoile.paris" },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-700/10 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-700 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.3em] font-sans text-[#f5efe6]/30 font-semibold mb-2">{item.label}</div>
                  <div className="text-sm font-sans text-[#f5efe6]/60 whitespace-pre-line leading-relaxed">{item.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===============================================================
          FOOTER
         ============================================================= */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xl"><span className="font-light">L&apos;</span><span className="italic">Étoile</span></span>
          <div className="flex gap-6">
            {[<Camera key="ig" className="w-4 h-4" />, <Mail key="mail" className="w-4 h-4" />].map((icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#f5efe6]/30 hover:text-amber-500 hover:border-amber-600 transition-all">
                {icon}
              </a>
            ))}
          </div>
          <span className="text-[9px] font-sans text-[#f5efe6]/15 uppercase tracking-wider">&copy; 2026 L&apos;Étoile Paris</span>
        </div>
      </footer>

      {/* --- Reservation Modal --- */}
      <AnimatePresence>
        {reservationOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReservationOpen(false)} className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-full max-w-lg bg-[#1a1714] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <button onClick={() => setReservationOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-2xl md:text-3xl font-light mb-2">Reserve a <span className="italic">Table</span></h3>
              <p className="text-sm font-sans text-[#f5efe6]/30 mb-8">Complete the form below and we&apos;ll confirm within 24 hours.</p>

              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-sans text-[#f5efe6]/30 font-semibold mb-1.5 block">Date</label>
                    <input type="date" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-sans focus:border-amber-600 focus:outline-none transition-colors rounded-lg text-[#f5efe6]" />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-sans text-[#f5efe6]/30 font-semibold mb-1.5 block">Time</label>
                    <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-sans focus:border-amber-600 focus:outline-none transition-colors rounded-lg text-[#f5efe6] appearance-none">
                      {["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-sans text-[#f5efe6]/30 font-semibold mb-1.5 block">Guests</label>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:border-amber-600 transition-colors">−</button>
                    <span className="text-xl font-light w-8 text-center">{guests}</span>
                    <button type="button" onClick={() => setGuests(Math.min(12, guests + 1))} className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:border-amber-600 transition-colors">+</button>
                    <span className="text-xs font-sans text-[#f5efe6]/20 ml-2">{guests === 1 ? "guest" : "guests"}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-sans text-[#f5efe6]/30 font-semibold mb-1.5 block">Name</label>
                  <input type="text" placeholder="Your full name" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-sans placeholder:text-[#f5efe6]/15 focus:border-amber-600 focus:outline-none transition-colors rounded-lg text-[#f5efe6]" />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-sans text-[#f5efe6]/30 font-semibold mb-1.5 block">Special requests</label>
                  <textarea placeholder="Allergies, celebrations, seating preferences..." className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-sans placeholder:text-[#f5efe6]/15 focus:border-amber-600 focus:outline-none transition-colors rounded-lg h-20 resize-none text-[#f5efe6]" />
                </div>
                <button type="submit" className="w-full py-4 bg-amber-700 hover:bg-amber-600 text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-colors rounded-lg flex items-center justify-center gap-2">
                  Confirm Reservation <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
