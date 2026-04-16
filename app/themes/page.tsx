"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, Search } from "lucide-react";
import { TEMPLATES_REGISTRY } from "@/lib/templates/registry";

// ── Site-builder themes ──────────────────────────────────────────────────────

const SITE_THEMES = [
  { id: "landing",      label: "Landing Page",        desc: "High-conversion single page with bold hero and tight CTA",         icon: "🚀", category: "Marketing",   premium: false },
  { id: "saas",         label: "SaaS Product",         desc: "Dark tech aesthetic with features, pricing and conversion flow",    icon: "⚡", category: "Tech",        premium: false },
  { id: "agency",       label: "Creative Agency",      desc: "Left-aligned bold typography, portfolio-first layout",             icon: "🎨", category: "Agency",      premium: false },
  { id: "vitrine",      label: "Business Vitrine",     desc: "Professional multi-page presence for established brands",          icon: "🏢", category: "Business",    premium: false },
  { id: "consultant",   label: "Consultant & Coach",   desc: "Authority-building personal brand with trust signals",             icon: "🎯", category: "Personal",    premium: false },
  { id: "portfolio",    label: "Portfolio",            desc: "Minimal work showcase for creatives and developers",               icon: "💼", category: "Personal",    premium: false },
  { id: "ecommerce",    label: "E-commerce Store",     desc: "Full-bleed product hero with gallery and cart CTA",               icon: "🛍️", category: "Commerce",    premium: false },
  { id: "restaurant",   label: "Restaurant & Food",    desc: "Warm full-bleed ambiance with menu and reservations",             icon: "🍽️", category: "Hospitality", premium: false },
  { id: "hotel",        label: "Hotel & B&B",          desc: "Luxury room gallery with booking CTA and amenities",              icon: "🏨", category: "Hospitality", premium: false },
  { id: "healthcare",   label: "Healthcare & Clinic",  desc: "Trust-first medical practice with clean white layout",            icon: "🏥", category: "Health",      premium: false },
  { id: "realestate",   label: "Real Estate",          desc: "Property listings with agent profile and local expertise",        icon: "🏠", category: "Property",    premium: false },
  { id: "fitness",      label: "Fitness & Wellness",   desc: "High-energy classes, trainers, transformation stories",           icon: "💪", category: "Health",      premium: false },
  { id: "event",        label: "Event & Conference",   desc: "Dark countdown, speakers, schedule and ticket CTA",               icon: "🎪", category: "Events",      premium: false },
  { id: "nonprofit",    label: "Non-profit & NGO",     desc: "Mission-driven, warm, donation-focused impact site",              icon: "❤️", category: "Social",      premium: false },
  { id: "startup",      label: "Startup Launch",       desc: "Pre-launch waitlist with social proof and vision",                icon: "🌟", category: "Tech",        premium: false },
  { id: "luxury",       label: "Luxury & Couture",     desc: "Dark marble texture, gold accents and cinematic parallax",        icon: "💎", category: "Premium",     premium: true },
  { id: "brutalist",    label: "Brutalist Editorial",  desc: "Massive raw typography, hard grid, confrontational by design",    icon: "◼", category: "Premium",     premium: true },
  { id: "magazine",     label: "Magazine & Editorial", desc: "Grid-based journalistic layout with rich typography hierarchy",   icon: "📰", category: "Premium",     premium: true },
  { id: "aurora",       label: "Aurora & Wellness",    desc: "Iridescent aurora gradients, soft glow, botanical wellness",     icon: "✦", category: "Premium",     premium: true },
  { id: "3d-tech",      label: "3D Tech & Web3",       desc: "Holographic grid, glitch text effects, cyber-neon palette",      icon: "⬡", category: "Premium",     premium: true },
  { id: "minimal-pro",  label: "Minimal Pro",          desc: "Architecture-grade negative space, Swiss precision typography",  icon: "—", category: "Premium",     premium: true },
];

const SITE_CATEGORY_ACCENT: Record<string, string> = {
  Marketing: "#7c3aed", Tech: "#2563eb", Agency: "#d97706", Business: "#059669",
  Personal: "#0891b2", Commerce: "#dc2626", Hospitality: "#d97706",
  Health: "#16a34a", Property: "#7c3aed", Events: "#9333ea",
  Social: "#e11d48", Premium: "#c9a96e",
};

const TYPE_FILTERS = [
  { label: "All", value: "all", ids: null as string[] | null },
  { label: "🚀 Landing", value: "landing", ids: ["landing", "startup", "vitrine", "consultant"] },
  { label: "🏢 Business", value: "business", ids: ["saas", "agency", "healthcare", "realestate", "fitness", "nonprofit"] },
  { label: "🛍️ E-commerce", value: "ecommerce", ids: ["ecommerce", "restaurant", "hotel"] },
  { label: "💎 Premium", value: "premium", ids: ["luxury", "brutalist", "magazine", "aurora", "3d-tech", "minimal-pro"] },
  { label: "💼 Portfolio", value: "portfolio", ids: ["portfolio", "event"] },
];

// ── Impact vault categories & colors ─────────────────────────────────────────

const IMPACT_CATS = ["All", "Tech", "Creative", "Minimal", "Luxury", "Editorial"] as const;
const IMPACT_CAT_ACCENT: Record<string, string> = {
  Tech: "#2563eb", Creative: "#a855f7", Minimal: "#71717a",
  Luxury: "#c9a96e", Editorial: "#f59e0b",
};
const STYLE_DOT: Record<string, string> = { Dark: "#6366f1", Light: "#10b981", Vibrant: "#f59e0b" };

// Implemented template IDs
const IMPLEMENTED = new Set(
  Array.from({ length: 145 }, (_, i) => `impact-${String(i + 1).padStart(2, "0")}`).concat(
    Array.from({ length: 42 }, (_, i) => `impact-${i + 103}`)
  )
);

// ── Subcomponents ─────────────────────────────────────────────────────────────

function SiteThemeCard({ theme, index }: { theme: typeof SITE_THEMES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const accent = SITE_CATEGORY_ACCENT[theme.category] ?? "#7c3aed";

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <Link href={`/themes/${theme.id}`} className="block h-full">
        <div className="relative h-full rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
          style={{ background: theme.premium ? "linear-gradient(135deg,#0f0f0f,#1a1208)" : "linear-gradient(135deg,#0f0f11,#13131a)", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%)` }} />
          <div className="relative p-6 flex flex-col h-full min-h-[240px]">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}>
                  {theme.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>{theme.category}</span>
                  {theme.premium && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3" style={{ color: "#c9a96e" }} />
                      <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "#c9a96e" }}>Premium</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ background: accent }}>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{theme.label}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{theme.desc}</p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-zinc-600 font-mono">{theme.id}</span>
              <span className="text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }}>
                Preview <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ImpactCard({ t, index, shown }: { t: typeof TEMPLATES_REGISTRY[0]; index: number; shown: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const catColor = IMPACT_CAT_ACCENT[t.category] ?? "#6366f1";
  const isLive = IMPLEMENTED.has(t.id);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView && shown ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: (index % 4) * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group ${!isLive ? "opacity-40" : ""}`}
    >
      {isLive ? (
        <Link href={`/templates/${t.id}`} className="block">
          <ImpactInner t={t} catColor={catColor} />
        </Link>
      ) : (
        <div>
          <ImpactInner t={t} catColor={catColor} />
        </div>
      )}
    </motion.div>
  );
}

function ImpactInner({ t, catColor }: { t: typeof TEMPLATES_REGISTRY[0]; catColor: string }) {
  return (
    <div className="relative rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 p-4"
      style={{ background: "linear-gradient(135deg,#0a0a0d,#111118)", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${catColor}10 0%, transparent 70%)` }} />
      <div className="relative flex items-center justify-between mb-3">
        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ color: catColor, background: `${catColor}15`, border: `1px solid ${catColor}20` }}>
          {t.category}
        </span>
        <span className="text-[9px] text-zinc-700 font-mono">{t.id}</span>
      </div>
      <div className="relative">
        <p className="text-white text-sm font-semibold leading-tight mb-1.5">{t.name}</p>
        <p className="text-zinc-500 text-[11px] leading-snug line-clamp-2">{t.description}</p>
        <div className="flex items-center gap-2 mt-2.5">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STYLE_DOT[t.style] }} />
          <span className="text-[9px] text-zinc-600">{t.style}</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ThemesGallery() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("All");
  const [impactFilter, setImpactFilter] = useState<typeof IMPACT_CATS[number]>("All");
  const [impactSearch, setImpactSearch] = useState("");
  const [showAllImpact, setShowAllImpact] = useState(false);

  const SITE_CATEGORIES = ["All", "Marketing", "Tech", "Agency", "Business", "Personal", "Commerce", "Hospitality", "Health", "Property", "Events", "Social", "Premium"];

  const typeFilteredThemes = typeFilter === "all"
    ? SITE_THEMES
    : SITE_THEMES.filter(t => TYPE_FILTERS.find(f => f.value === typeFilter)?.ids?.includes(t.id));

  const filteredSite = siteFilter === "All" ? typeFilteredThemes : typeFilteredThemes.filter(t => t.category === siteFilter);

  const filteredImpact = TEMPLATES_REGISTRY.filter(t => {
    const catMatch = impactFilter === "All" || t.category === impactFilter;
    const searchMatch = !impactSearch || t.name.toLowerCase().includes(impactSearch.toLowerCase()) || t.description.toLowerCase().includes(impactSearch.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(impactSearch.toLowerCase()));
    return catMatch && searchMatch;
  });

  const visibleImpact = showAllImpact ? filteredImpact : filteredImpact.slice(0, 48);

  return (
    <div id="main-content" className="min-h-screen bg-[#080809]">
      {/* Sticky header */}
      <div className="border-b border-white/5 bg-[#080809]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">AeviaLaunch</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-zinc-600 text-xs hidden sm:inline">181 themes total</span>
            <Link href="/configure" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
              Build my site <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">Theme Gallery</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-5" style={{ letterSpacing: "-0.03em", lineHeight: 1 }}>
            Pick your<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">perfect style.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8">
            181 themes across 2 collections. Click any theme to see a live preview with real content.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-zinc-500">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-400" />21 site builder themes</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400" />160 impact vault templates</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" />All free to preview</div>
          </div>
        </motion.div>

        {/* ── Section 1: Site Builder ────────────────────────────────── */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>Site Builder Themes</h2>
              <p className="text-zinc-500 text-sm mt-1">Choose one when generating your site — includes full AI copy</p>
            </div>
            <span className="text-zinc-600 text-sm font-mono shrink-0">21 themes</span>
          </div>

          {/* Type filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  typeFilter === f.value
                    ? "bg-violet-600 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SITE_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setSiteFilter(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: siteFilter === cat ? (cat === "Premium" ? "#c9a96e" : "#7c3aed") : "rgba(255,255,255,0.05)",
                  color: siteFilter === cat ? "#fff" : "rgba(255,255,255,0.45)",
                  border: siteFilter === cat ? `1px solid ${cat === "Premium" ? "#c9a96e" : "#7c3aed"}` : "1px solid rgba(255,255,255,0.08)",
                }}>
                {cat}
                {cat !== "All" && <span className="ml-1.5 opacity-50">{SITE_THEMES.filter(t => t.category === cat).length}</span>}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={siteFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSite.map((t, i) => <SiteThemeCard key={t.id} theme={t} index={i} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="relative mb-24">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
          <div className="relative flex justify-center">
            <div className="px-6 py-2 rounded-full border border-white/10 bg-[#080809] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Impact Template Vault</span>
            </div>
          </div>
        </div>

        {/* ── Section 2: Impact Vault ───────────────────────────────── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>Impact Template Vault</h2>
              <p className="text-zinc-500 text-sm mt-1">160 premium impact templates — Slider Revolution–level quality</p>
            </div>
            <span className="text-zinc-600 text-sm font-mono shrink-0">{filteredImpact.length} / 160</span>
          </div>

          {/* Filters + search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {IMPACT_CATS.map(cat => (
                <button key={cat} onClick={() => setImpactFilter(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: impactFilter === cat ? (IMPACT_CAT_ACCENT[cat] ?? "#7c3aed") : "rgba(255,255,255,0.05)",
                    color: impactFilter === cat ? "#fff" : "rgba(255,255,255,0.45)",
                    border: impactFilter === cat ? `1px solid ${IMPACT_CAT_ACCENT[cat] ?? "#7c3aed"}` : "1px solid rgba(255,255,255,0.08)",
                  }}>
                  {cat}
                  {cat !== "All" && <span className="ml-1.5 opacity-50">{TEMPLATES_REGISTRY.filter(t => t.category === cat).length}</span>}
                </button>
              ))}
            </div>
            <div className="relative sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input
                type="text"
                value={impactSearch}
                onChange={e => setImpactSearch(e.target.value)}
                placeholder="Search templates…"
                className="pl-9 pr-4 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 outline-none focus:border-violet-500/50 w-full sm:w-48"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`${impactFilter}-${impactSearch}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {visibleImpact.map((t, i) => <ImpactCard key={t.id} t={t} index={i} shown />)}
            </motion.div>
          </AnimatePresence>

          {filteredImpact.length > 48 && !showAllImpact && (
            <div className="text-center mt-10">
              <button onClick={() => setShowAllImpact(true)}
                className="px-8 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold transition-colors">
                Load all {filteredImpact.length} templates
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="mt-32 text-center">
          <div className="rounded-3xl p-10 sm:p-14 border relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#13091f,#1a0d2e 50%,#0d1340)", borderColor: "rgba(124,58,237,0.2)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(124,58,237,0.2) 0%, transparent 60%)" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-5" style={{ letterSpacing: "-0.03em" }}>Your site, live in 2 hours.</h2>
              <p className="text-zinc-300 text-base sm:text-lg mb-8 max-w-lg mx-auto">
                Pick a theme, fill the form, our AI writes your copy — we deploy it on your domain, fully optimised.
              </p>
              <Link href="/configure"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-all duration-200 hover:scale-105">
                Start building — it&apos;s free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
