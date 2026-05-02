"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Play,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  ChevronDown,
  Plus,
  Minus,
  Star,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Gem,
  Clock,
} from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES (REALISTIC & EXTENSIVE)
   ========================================================================== */

const COLLECTIONS = [
  {
    id: "c1",
    title: "Lumière",
    desc: "Radiant diamonds set in 18k white gold, capturing the essence of Parisian light.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c2",
    title: "Éternité",
    desc: "Timeless bands symbolizing unbreakable bonds, crafted with precision and passion.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f66150ce8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c3",
    title: "Sérénade",
    desc: "Sapphires and emeralds dancing in intricate settings, inspired by classical symphonies.",
    image:
      "https://images.unsplash.com/photo-1599643478524-fb66f7ca065b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c4",
    title: "Héritage",
    desc: "Vintage-inspired masterpieces reinventing the archives for the modern era.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
  },
];

const LATEST_ARRIVALS = [
  {
    id: "p1",
    name: "Lumière Solitaire Ring",
    price: "€12,500",
    carats: "2.5ct",
    material: "Platinum",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f66150ce8?q=80&w=800&auto=format&fit=crop",
    tag: "New",
  },
  {
    id: "p2",
    name: "Éternité Diamond Necklace",
    price: "€28,000",
    carats: "5.0ct",
    material: "18k White Gold",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Sérénade Sapphire Earrings",
    price: "€18,200",
    carats: "3.2ct",
    material: "Platinum",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    tag: "Limited",
  },
  {
    id: "p4",
    name: "Héritage Emerald Bracelet",
    price: "€45,000",
    carats: "8.5ct",
    material: "18k Yellow Gold",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Lumière Pavé Band",
    price: "€6,800",
    carats: "1.2ct",
    material: "18k Rose Gold",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "Éternité Pearl Drop",
    price: "€9,500",
    carats: "0.8ct",
    material: "Platinum",
    image:
      "https://images.unsplash.com/photo-1573408301145-b98c4af0107e?q=80&w=800&auto=format&fit=crop",
    tag: "Bestseller",
  },
];

const HERITAGE_TIMELINE = [
  {
    year: "1892",
    title: "The Foundation",
    desc: "Monsieur Prism opens the first atelier on Place Vendôme, redefining Parisian high jewelry.",
  },
  {
    year: "1924",
    title: "The Art Deco Era",
    desc: "Introduction of the iconic geometric cuts that would become the house's signature.",
  },
  {
    year: "1968",
    title: "Global Expansion",
    desc: "Opening of flagship boutiques in New York, Tokyo, and London, bringing Prism to the world.",
  },
  {
    year: "2010",
    title: "Sustainable Sourcing",
    desc: "Pioneering the industry's most rigorous ethical sourcing and tracebility standards.",
  },
  {
    year: "2026",
    title: "The Refractive Collection",
    desc: "A bold new chapter combining cutting-edge technology with century-old artisanal techniques.",
  },
];

const TESTIMONIALS = [
  {
    name: "Eleanor V.",
    role: "Private Client",
    text: "The craftsmanship is unparalleled. My engagement ring catches the light in a way that defies description. Prism doesn't just make jewelry; they capture magic.",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Collector",
    text: "Acquiring a piece from the Héritage collection was a milestone. The dedication to historical accuracy combined with modern brilliance is simply astounding.",
    rating: 5,
  },
  {
    name: "Sophia M.",
    role: "Vogue Editor",
    text: "Prism continues to lead the high jewelry sector, seamlessly blending their storied heritage with an avant-garde approach to gem-setting.",
    rating: 5,
  },
  {
    name: "Alexandra K.",
    role: "Private Client",
    text: "The bespoke process was flawless from sketch to final polish. They translated my vision into a masterpiece I will pass down for generations.",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "How do I schedule a bespoke consultation?",
    answer:
      "Consultations can be arranged by contacting our high jewelry concierge via phone or email. We offer both virtual appointments and private viewings at our flagship boutiques in Paris, New York, and Tokyo.",
  },
  {
    question: "What is your policy on diamond sourcing?",
    answer:
      "Prism is committed to 100% conflict-free sourcing. Every diamond above 0.5 carats is accompanied by a GIA certificate and a detailed provenance report tracing its journey from mine to masterpiece.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we provide secure, insured global delivery via specialized armored courier services. Delivery timelines vary by region and custom requirements.",
  },
  {
    question: "Can I upgrade my Prism diamond later?",
    answer:
      "We proudly offer a lifetime diamond upgrade program. You may exchange any Prism center diamond for full credit toward a new diamond of at least 50% greater value.",
  },
  {
    question: "How should I care for my jewelry?",
    answer:
      "We recommend bringing your pieces to a Prism boutique annually for complimentary professional cleaning and prong inspection. For daily care, avoid harsh chemicals and store in the provided suede-lined boxes.",
  },
];

const SERVICES = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Lifetime Warranty",
    desc: "Unwavering commitment to quality with complimentary maintenance.",
  },
  {
    icon: <Gem className="w-6 h-6" />,
    title: "Ethical Sourcing",
    desc: "Strict adherence to the Kimberley Process and beyond.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Bespoke Design",
    desc: "Collaborate with our master artisans to create unique heirlooms.",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Accordion({ items }: { items: typeof FAQS }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full border-t border-white/10">
      {items.map((item, i) => (
        <div key={i} className="border-b border-white/10">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-8 flex items-center justify-between text-left group"
          >
            <span
              className={`text-xl md:text-2xl font-light transition-colors ${openIndex === i ? "text-white" : "text-white/60 group-hover:text-white/90"}`}
            >
              {item.question}
            </span>
            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                className="absolute w-full h-[1px] bg-white/60 group-hover:bg-white transition-colors"
              />
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 90 }}
                className="absolute w-full h-[1px] bg-white/60 group-hover:bg-white transition-colors"
              />
            </div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-8 text-white/40 text-lg leading-relaxed max-w-3xl font-light">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function PrismOSPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Custom Cursor state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: 100, damping: 25 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // Scroll Parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const glassY = useTransform(scrollY, [0, 1000], [0, -150]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="premium-theme min-h-screen bg-[#030303] text-white selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
      {/* CUSTOM CURSOR */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-[999] hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: isHoveringImage ? 80 : 12,
            height: isHoveringImage ? 80 : 12,
            backgroundColor: isHoveringImage
              ? "rgba(255,255,255,0.1)"
              : "rgba(255,255,255,1)",
            border: isHoveringImage
              ? "1px solid rgba(255,255,255,0.5)"
              : "0px solid rgba(255,255,255,0)",
          }}
          className="rounded-full backdrop-blur-sm flex items-center justify-center transition-colors duration-300"
        >
          {isHoveringImage && (
            <span className="text-[10px] uppercase tracking-widest font-bold">
              View
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#030303]/80 backdrop-blur-2xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-3"
            >
              <div className="relative w-6 h-4">
                <span
                  className={`absolute left-0 w-full h-[1px] bg-white transition-all duration-300 ${menuOpen ? "top-2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 w-full h-[1px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : "top-[7px]"}`}
                />
                <span
                  className={`absolute left-0 w-full h-[1px] bg-white transition-all duration-300 ${menuOpen ? "top-2 -rotate-45" : "top-[14px]"}`}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium hidden md:block">
                Menu
              </span>
            </button>
            <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
              {["High Jewelry", "Collections", "Bridal", "Watches"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ),
              )}
            </div>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl tracking-[0.3em] font-light uppercase"
          >
            Prism
          </Link>

          <div className="flex items-center gap-6">
            <button className="text-white/60 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <MapPin className="w-5 h-5 hidden md:block" />
            </button>
            <button className="text-white/60 hover:text-white transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white text-black text-[8px] flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#030303] flex"
          >
            <div className="w-full lg:w-1/2 h-full p-6 md:p-16 flex flex-col justify-center">
              <div className="flex flex-col gap-6 md:gap-8 max-w-md mx-auto w-full">
                {[
                  "High Jewelry",
                  "Fine Jewelry",
                  "Engagement",
                  "Timepieces",
                  "The Maison",
                  "Client Care",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.7,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <Link
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl md:text-6xl font-light tracking-tight hover:italic hover:pl-4 transition-all duration-300 block"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 max-w-md mx-auto w-full border-t border-white/10 pt-8 flex justify-between text-xs text-white/50 uppercase tracking-widest font-medium"
              >
                <a href="#" className="hover:text-white">
                  Sign In
                </a>
                <a href="#" className="hover:text-white">
                  Find a Boutique
                </a>
              </motion.div>
            </div>
            <div className="hidden lg:block w-1/2 h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1599643478524-fb66f7ca065b?q=80&w=1200&auto=format&fit=crop"
                alt="Menu bg"
                fill
                className="object-cover opacity-60"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO SECTION (Refractive Parallax)
          ========================================== */}
      <section className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-transparent to-[#030303]" />
        </motion.div>

        {/* Refractive Glass Panels */}
        <motion.div
          style={{ y: glassY }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40"
        >
          <div className="w-[120%] h-[120%] bg-white/[0.02] backdrop-blur-[2px] border border-white/5 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        <div className="relative z-20 text-center px-6 mt-20 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium text-white/60 mb-6 block">
              The Refractive Collection
            </span>
          </motion.div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.7,
              }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-light tracking-[-0.02em] leading-none mix-blend-difference"
            >
              Lumière
              <br />
              <span className="italic font-extralight text-white/80">Pure</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <button className="mt-8 px-10 py-4 border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-medium hover:bg-white hover:text-black transition-colors backdrop-blur-md">
              Discover the Collection
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ==========================================
          2. INTRO / PHILOSOPHY
          ========================================== */}
      <section className="py-32 md:py-48 px-6 md:px-12 relative z-20 bg-[#030303]">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-white/90">
              "A diamond does not merely reflect light;{" "}
              <br className="hidden md:block" />
              <span className="italic text-white/50">it orchestrates it.</span>"
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-12 text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
              For over a century, Prism has mastered the interplay between
              precious stones and light. Every facet is calculated, every
              setting engineered to maximize brilliance. We do not just make
              jewelry—we sculpt radiance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          3. LATEST ARRIVALS (Horizontal Carousel)
          ========================================== */}
      <section className="py-20 md:py-32 overflow-hidden border-t border-white/5 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-4 block">
              Boutique
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Latest <span className="italic">Arrivals</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="#"
              className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-medium border-b border-white/20 pb-1 hover:border-white transition-colors"
            >
              View All Masterpieces <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* CSS-based drag carousel approximation using overflow-x-auto */}
        <div
          className="flex gap-6 md:gap-8 px-6 md:px-12 overflow-x-auto pb-20 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {LATEST_ARRIVALS.map((product, i) => (
            <Reveal
              key={product.id}
              delay={i * 0.1}
              className="shrink-0 snap-start"
            >
              <div
                className="w-[300px] md:w-[400px] group cursor-pointer"
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
              >
                <div className="relative aspect-[4/5] bg-[#0a0a0a] rounded-2xl overflow-hidden mb-6">
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white text-black text-[9px] uppercase tracking-widest font-bold rounded-full">
                      {product.tag}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-light mb-1">{product.name}</h3>
                    <p className="text-[11px] text-white/40 uppercase tracking-widest">
                      {product.material} · {product.carats}
                    </p>
                  </div>
                  <span className="text-lg font-medium">{product.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          4. HERITAGE TIMELINE (Scroll Linked)
          ========================================== */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#030303]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-4 block">
              Legacy
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              The Maison <span className="italic">Timeline</span>
            </h2>
          </Reveal>

          <div className="relative border-l border-white/10 ml-4 md:ml-1/2">
            {HERITAGE_TIMELINE.map((item, i) => (
              <Reveal
                key={i}
                delay={0.1}
                y={50}
                className="relative pl-12 md:pl-16 md:w-1/2 mb-24 last:mb-0 even:md:ml-auto even:md:pl-16 odd:md:pl-0 odd:md:pr-16 odd:md:text-right odd:md:-ml-[1px]"
              >
                {/* Dot */}
                <div
                  className={`absolute top-0 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] ${i % 2 === 0 ? "left-[-6.5px] md:right-[-6.5px] md:left-auto" : "left-[-6.5px]"}`}
                />

                <span className="text-5xl md:text-7xl font-extralight text-white/10 block mb-6 leading-none">
                  {item.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-light mb-4">
                  {item.title}
                </h3>
                <p className="text-white/50 text-lg font-light leading-relaxed max-w-sm ml-0 odd:md:ml-auto">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. CURATED COLLECTIONS (Bento Grid)
          ========================================== */}
      <section className="py-32 md:py-40 px-6 md:px-12 border-t border-white/5 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-16">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Curated <span className="italic">Collections</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((col, i) => (
              <Reveal
                key={col.id}
                delay={i * 0.1}
                className={
                  i === 0
                    ? "lg:col-span-2 lg:row-span-2"
                    : i === 3
                      ? "lg:col-span-3 lg:row-span-1"
                      : ""
                }
              >
                <div
                  className={`group relative rounded-3xl overflow-hidden bg-[#111] w-full ${i === 0 ? "h-[500px] lg:h-full" : i === 3 ? "h-[400px]" : "h-[400px]"}`}
                  onMouseEnter={() => setIsHoveringImage(true)}
                  onMouseLeave={() => setIsHoveringImage(false)}
                >
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="overflow-hidden">
                      <h3 className="text-3xl md:text-5xl font-light mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {col.title}
                      </h3>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-white/60 text-lg font-light max-w-md translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {col.desc}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. SERVICES
          ========================================== */}
      <section className="py-24 border-t border-white/5 bg-[#030303]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            {SERVICES.map((srv, i) => (
              <Reveal
                key={i}
                delay={i * 0.1}
                className="text-center md:text-left"
              >
                <div className="w-16 h-16 mx-auto md:mx-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white/70">
                  {srv.icon}
                </div>
                <h4 className="text-xl font-light mb-4">{srv.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  {srv.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. REVIEWS (Marquee)
          ========================================== */}
      <section className="py-32 overflow-hidden border-t border-white/5 bg-[#050505]">
        <Reveal className="mb-16 px-6 md:px-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-4 block">
            Clientele
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            A Legacy of <span className="italic">Trust</span>
          </h2>
        </Reveal>

        <div className="relative flex whitespace-nowrap">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 px-4"
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                className="w-[350px] md:w-[450px] bg-[#0a0a0a] border border-white/5 p-10 rounded-3xl shrink-0 whitespace-normal"
              >
                <div className="flex gap-1 mb-6 text-white">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-white" />
                  ))}
                </div>
                <p className="text-lg font-light text-white/80 leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          8. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-[#030303] border-t border-white/5">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
                Client <span className="italic">Care</span>
              </h2>
              <p className="text-white/50 text-lg font-light leading-relaxed mb-10">
                Everything you need to know about purchasing, maintaining, and
                cherishing your Prism pieces.
              </p>
              <button className="px-8 py-3 bg-white text-black text-[10px] uppercase tracking-widest font-bold rounded-full hover:scale-105 transition-transform">
                Contact Concierge
              </button>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <Accordion items={FAQS} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          9. CTA / NEWSLETTER
          ========================================== */}
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1600&auto=format&fit=crop"
            fill
            className="object-cover opacity-30"
            alt="CTA bg"
          />
          <div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-sm" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8">
              Enter the <span className="italic">Vault</span>
            </h2>
            <p className="text-white/60 text-xl font-light mb-12 max-w-2xl mx-auto">
              Join our private registry to receive exclusive invitations to high
              jewelry unveilings and private boutique events.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 bg-transparent border-b border-white/30 px-4 py-4 text-center sm:text-left text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-white text-black text-[11px] uppercase tracking-widest font-bold hover:bg-white/90 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          10. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#000] pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="text-3xl tracking-[0.3em] font-light uppercase block mb-8"
              >
                Prism
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8 font-light">
                High jewelry conceived in Paris, crafted by masters, and
                designed for eternity. Elevating the art of diamond setting
                since 1892.
              </p>
              <div className="flex gap-4">
                {[
                  <Instagram key="ig" className="w-5 h-5" />,
                  <Twitter key="tw" className="w-5 h-5" />,
                  <Facebook key="fb" className="w-5 h-5" />,
                ].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-6">
                Collections
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/40">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Lumière
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Éternité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sérénade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Héritage
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    High Jewelry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-6">
                The Maison
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/40">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our History
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Savoir-Faire
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ethical Sourcing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Boutiques
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-6">
                Client Care
              </h4>
              <ul className="space-y-4 text-sm font-light text-white/40">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Book an Appointment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Care Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-[10px] text-white/30 uppercase tracking-widest font-medium">
            <span>
              &copy; {new Date().getFullYear()} Prism High Jewelry. All Rights
              Reserved.
            </span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
