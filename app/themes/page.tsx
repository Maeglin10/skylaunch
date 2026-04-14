"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, ExternalLink } from "lucide-react";

const THEMES = [
  // Marketing
  { id: "landing", label: "Landing Page", desc: "High-conversion single page with bold hero and tight CTA", icon: "🚀", category: "Marketing", premium: false },
  { id: "saas", label: "SaaS Product", desc: "Dark tech aesthetic with features, pricing and conversion flow", icon: "⚡", category: "Tech", premium: false },
  { id: "agency", label: "Creative Agency", desc: "Left-aligned bold typography, portfolio-first layout", icon: "🎨", category: "Agency", premium: false },
  // Business
  { id: "vitrine", label: "Business Vitrine", desc: "Professional multi-page presence for established brands", icon: "🏢", category: "Business", premium: false },
  { id: "consultant", label: "Consultant & Coach", desc: "Authority-building personal brand with trust signals", icon: "🎯", category: "Personal", premium: false },
  { id: "portfolio", label: "Portfolio", desc: "Minimal work showcase for creatives and developers", icon: "💼", category: "Personal", premium: false },
  // Commerce
  { id: "ecommerce", label: "E-commerce Store", desc: "Full-bleed product hero with gallery and cart CTA", icon: "🛍️", category: "Commerce", premium: false },
  { id: "restaurant", label: "Restaurant & Food", desc: "Warm full-bleed ambiance with menu and reservations", icon: "🍽️", category: "Hospitality", premium: false },
  { id: "hotel", label: "Hotel & B&B", desc: "Luxury room gallery with booking CTA and amenities", icon: "🏨", category: "Hospitality", premium: false },
  // Services
  { id: "healthcare", label: "Healthcare & Clinic", desc: "Trust-first medical practice with clean white layout", icon: "🏥", category: "Health", premium: false },
  { id: "realestate", label: "Real Estate", desc: "Property listings with agent profile and local expertise", icon: "🏠", category: "Property", premium: false },
  { id: "fitness", label: "Fitness & Wellness", desc: "High-energy classes, trainers, transformation stories", icon: "💪", category: "Health", premium: false },
  // Events & Social
  { id: "event", label: "Event & Conference", desc: "Dark countdown, speakers, schedule and ticket CTA", icon: "🎪", category: "Events", premium: false },
  { id: "nonprofit", label: "Non-profit & NGO", desc: "Mission-driven, warm, donation-focused impact site", icon: "❤️", category: "Social", premium: false },
  { id: "startup", label: "Startup Launch", desc: "Pre-launch waitlist with social proof and vision", icon: "🌟", category: "Tech", premium: false },
  // Premium
  { id: "luxury", label: "Luxury & Couture", desc: "Dark marble texture, gold accents and cinematic parallax", icon: "💎", category: "Premium", premium: true },
  { id: "brutalist", label: "Brutalist Editorial", desc: "Massive raw typography, hard grid, confrontational by design", icon: "◼", category: "Premium", premium: true },
  { id: "magazine", label: "Magazine & Editorial", desc: "Grid-based journalistic layout with rich typography hierarchy", icon: "📰", category: "Premium", premium: true },
  { id: "aurora", label: "Aurora & Wellness", desc: "Iridescent aurora gradients, soft glow, botanical wellness", icon: "✦", category: "Premium", premium: true },
  { id: "3d-tech", label: "3D Tech & Web3", desc: "Holographic grid, glitch text effects, cyber-neon palette", icon: "⬡", category: "Premium", premium: true },
  { id: "minimal-pro", label: "Minimal Pro", desc: "Architecture-grade negative space, Swiss precision typography", icon: "—", category: "Premium", premium: true },
];

const ALL_CATEGORIES = ["All", "Marketing", "Tech", "Agency", "Business", "Personal", "Commerce", "Hospitality", "Health", "Property", "Events", "Social", "Premium"];

const CATEGORY_ACCENT: Record<string, string> = {
  Marketing: "#7c3aed",
  Tech: "#2563eb",
  Agency: "#d97706",
  Business: "#059669",
  Personal: "#0891b2",
  Commerce: "#dc2626",
  Hospitality: "#d97706",
  Health: "#16a34a",
  Property: "#7c3aed",
  Events: "#9333ea",
  Social: "#e11d48",
  Premium: "#c9a96e",
};

function ThemeCard({ theme, index }: { theme: typeof THEMES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const accent = CATEGORY_ACCENT[theme.category] ?? "#7c3aed";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <Link href={`/themes/${theme.id}`} className="block h-full">
        <div
          className="relative h-full rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer"
          style={{
            background: theme.premium
              ? "linear-gradient(135deg, #0f0f0f 0%, #1a1208 100%)"
              : "linear-gradient(135deg, #0f0f11 0%, #13131a 100%)",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%)`,
            }}
          />

          {/* Premium shimmer border */}
          {theme.premium && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${accent}22, transparent 50%, ${accent}11)`,
              }}
            />
          )}

          <div className="relative p-7 flex flex-col h-full min-h-[280px]">
            {/* Top row */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
                >
                  {theme.icon}
                </div>
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: accent }}
                  >
                    {theme.category}
                  </span>
                  {theme.premium && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3" style={{ color: "#c9a96e" }} />
                      <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "#c9a96e" }}>
                        Premium
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                style={{ background: accent }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3
                className="text-xl font-bold text-white mb-2.5 group-hover:text-opacity-90 transition-colors"
                style={{ letterSpacing: "-0.01em" }}
              >
                {theme.label}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {theme.desc}
              </p>
            </div>

            {/* Bottom */}
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-zinc-600 font-mono">{theme.id}</span>
              <span
                className="text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: accent }}
              >
                Preview <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ThemesGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? THEMES
    : THEMES.filter((t) => t.category === activeCategory);

  const premiumCount = THEMES.filter((t) => t.premium).length;
  const standardCount = THEMES.length - premiumCount;

  return (
    <div className="min-h-screen bg-[#080809]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#080809]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            AeviaLaunch
          </Link>
          <Link
            href="/configure"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
          >
            Build my site
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-7">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">Theme Gallery</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6" style={{ letterSpacing: "-0.03em", lineHeight: 1 }}>
            Pick your<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              perfect style.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            {THEMES.length} professionally designed themes — from minimal to premium. Click any theme to preview it live, then build your site in minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              {standardCount} standard themes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              {premiumCount} premium themes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              All included, no extra cost
            </div>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-14"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat
                  ? (cat === "Premium" ? "#c9a96e" : "#7c3aed")
                  : "rgba(255,255,255,0.05)",
                color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.5)",
                border: activeCategory === cat
                  ? `1px solid ${cat === "Premium" ? "#c9a96e" : "#7c3aed"}`
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-2 opacity-60 text-xs">
                  {THEMES.filter((t) => t.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((theme, i) => (
              <ThemeCard key={theme.id} theme={theme} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-32 text-center"
        >
          <div
            className="rounded-3xl p-14 border relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #13091f 0%, #1a0d2e 50%, #0d1340 100%)",
              borderColor: "rgba(124,58,237,0.2)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% -20%, rgba(124,58,237,0.2) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-7">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">Ready to launch?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-5" style={{ letterSpacing: "-0.03em" }}>
                Your site, live in 2 hours.
              </h2>
              <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
                Fill a 5-step form, our AI writes your copy, and we deploy your chosen theme to your domain — fully optimised and production-ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/configure"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-all duration-200 hover:scale-105"
                >
                  Start building — it&apos;s free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="mailto:hello@aevia.io"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white hover:border-white/30 font-semibold text-lg transition-all duration-200"
                >
                  Talk to us
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
