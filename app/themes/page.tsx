"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, Search } from "lucide-react";
import { TEMPLATES_REGISTRY } from "@/lib/templates/registry";
import { useLang } from "@/lib/LangContext";

const T = {
  fr: {
    badge: "Galerie de thèmes",
    h1a: "Choisissez votre",
    h1b: "style parfait.",
    sub: "181 thèmes en 2 collections. Cliquez sur un thème pour voir un aperçu en direct avec du vrai contenu.",
    stat1: "21 thèmes site builder",
    stat2: "195 templates impact vault",
    stat3: "Tous gratuits à prévisualiser",
    buildBtn: "Créer mon site",
    backLabel: "AeviaLaunch",
    totalLabel: "216 thèmes au total",
  },
  en: {
    badge: "Theme Gallery",
    h1a: "Pick your",
    h1b: "perfect style.",
    sub: "181 themes across 2 collections. Click any theme to see a live preview with real content.",
    stat1: "21 site builder themes",
    stat2: "195 impact vault templates",
    stat3: "All free to preview",
    buildBtn: "Build my site",
    backLabel: "AeviaLaunch",
    totalLabel: "216 themes total",
  },
  es: {
    badge: "Galería de temas",
    h1a: "Elige tu",
    h1b: "estilo perfecto.",
    sub: "181 temas en 2 colecciones. Haz clic en cualquier tema para ver una vista previa en vivo.",
    stat1: "21 temas site builder",
    stat2: "195 plantillas impact vault",
    stat3: "Todos gratuitos para previsualizar",
    buildBtn: "Crear mi sitio",
    backLabel: "AeviaLaunch",
    totalLabel: "216 temas en total",
  },
  de: {
    badge: "Theme-Galerie",
    h1a: "Wähle deinen",
    h1b: "perfekten Stil.",
    sub: "181 Themes in 2 Kollektionen. Klicke auf ein Theme für eine Live-Vorschau mit echten Inhalten.",
    stat1: "21 Site Builder Themes",
    stat2: "195 Impact Vault Vorlagen",
    stat3: "Alle kostenlos vorschaubar",
    buildBtn: "Meine Website erstellen",
    backLabel: "AeviaLaunch",
    totalLabel: "216 Themes insgesamt",
  },
  pt: {
    badge: "Galeria de temas",
    h1a: "Escolha seu",
    h1b: "estilo perfeito.",
    sub: "181 temas em 2 coleções. Clique em qualquer tema para ver uma prévia ao vivo com conteúdo real.",
    stat1: "21 temas site builder",
    stat2: "195 templates impact vault",
    stat3: "Todos gratuitos para pré-visualizar",
    buildBtn: "Criar meu site",
    backLabel: "AeviaLaunch",
    totalLabel: "216 temas no total",
  },
};

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
  { id: "marketplace",  label: "Marketplace",          desc: "Multi-vendor marketplace with listings, search and seller profiles", icon: "🏪", category: "Commerce",    premium: true },
  { id: "livestream",   label: "Live & Streaming",     desc: "Live events platform with real-time chat, replays and ticketing",  icon: "📡", category: "Events",      premium: true },
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

const IMPACT_CATS = ["All", "Tech", "Creative", "Minimal", "Luxury", "Editorial", "Free"] as const;
const IMPACT_CAT_ACCENT: Record<string, string> = {
  Tech: "#2563eb", Creative: "#a855f7", Minimal: "#71717a",
  Luxury: "#c9a96e", Editorial: "#f59e0b", Free: "#10b981",
};
const STYLE_DOT: Record<string, string> = { Dark: "#6366f1", Light: "#10b981", Vibrant: "#f59e0b" };

// Implemented template IDs (now covering all 195 registry items)
const IMPLEMENTED = new Set(
  Array.from({ length: 195 }, (_, i) => `impact-${String(i + 1).padStart(2, "0")}`)
);

// ── Subcomponents ─────────────────────────────────────────────────────────────

function SiteThemeCard({ theme, index }: { theme: typeof SITE_THEMES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const accent = SITE_CATEGORY_ACCENT[theme.category] ?? "#7c3aed";
  
  const [isHovered, setIsHovered] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      timeout = setTimeout(() => setShowIframe(true), 300);
    } else {
      setShowIframe(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <Link href={`/themes/${theme.id}`} className="block h-full">
        <div 
          className="relative h-full rounded-2xl flex flex-col border overflow-hidden transition-all duration-300 hover:-translate-y-1 group/card min-h-[300px]"
          style={{ background: theme.premium ? "linear-gradient(135deg,#0f0f0f,#1a1208)" : "linear-gradient(135deg,#0f0f11,#13131a)", borderColor: "rgba(255,255,255,0.07)" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%)` }} />
            
          {/* Thumbnail Area */}
          <div className="w-full aspect-[16/10] border-b border-white/5 relative overflow-hidden bg-[#050505]">
            {showIframe ? (
              <div className="absolute inset-0 opacity-0 animate-in fade-in duration-500 delay-100 fill-mode-forwards cursor-pointer">
                <iframe 
                   src={`/themes/${theme.id}`} 
                   className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-25 pointer-events-none opacity-80"
                   sandbox="allow-scripts allow-same-origin"
                   loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/40 to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center">
                 <div className="w-full h-full border border-white/5 flex items-center justify-center p-6"
                   style={{ background: `radial-gradient(ellipse at center, ${accent}20 0%, transparent 70%)` }}>
                   <div className="flex flex-col items-center gap-3">
                     <span className="text-4xl">{theme.icon}</span>
                     <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase opacity-50">Live Preview</span>
                   </div>
                 </div>
              </div>
            )}
          </div>

          <div className="relative p-5 flex flex-col flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>{theme.category}</span>
                {theme.premium && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" style={{ color: "#c9a96e" }} />
                    <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "#c9a96e" }}>Premium</span>
                  </div>
                )}
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-x-2 group-hover/card:translate-x-0 shrink-0" style={{ background: accent }}>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{theme.label}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-[90%]">{theme.desc}</p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-zinc-600 font-mono uppercase">{theme.id}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity" style={{ color: accent }}>
                Preview build <ChevronRight className="w-3 h-3" />
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
        <Link href={`/templates/${t.id}`} className="block h-full">
          <ImpactInner t={t} catColor={catColor} />
        </Link>
      ) : (
        <div className="h-full">
          <ImpactInner t={t} catColor={catColor} />
        </div>
      )}
    </motion.div>
  );
}

function ImpactInner({ t, catColor }: { t: typeof TEMPLATES_REGISTRY[0]; catColor: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      timeout = setTimeout(() => setShowIframe(true), 300); // 300ms delay to prevent network spam on quick swipe
    } else {
      setShowIframe(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  return (
    <div 
      className="relative rounded-xl border flex flex-col overflow-hidden h-full transition-all duration-300 hover:-translate-y-0.5 group/card"
      style={{ background: "linear-gradient(135deg,#0a0a0d,#111118)", borderColor: "rgba(255,255,255,0.06)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${catColor}15 0%, transparent 60%)` }} />
      
      {/* Thumbnail Area */}
      <div className="w-full aspect-video border-b border-white/5 relative overflow-hidden bg-[#050505]">
        {showIframe ? (
          <div className="absolute inset-0 opacity-0 animate-in fade-in duration-500 delay-100 fill-mode-forwards">
            <iframe 
               src={`/templates/${t.id}`} 
               className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-25 pointer-events-none opacity-80"
               sandbox="allow-scripts allow-same-origin"
               loading="lazy"
            />
            {/* Dark gradient overlay so text remains readable if iframe is bright */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/40 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            {/* Abstract Placeholder when not hovered */}
             <div className="w-full h-full rounded-lg border border-white/5 flex items-center justify-center"
               style={{ background: `radial-gradient(ellipse at center, ${catColor}20 0%, transparent 70%)` }}>
                <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase opacity-50">Preview</span>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 relative flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 font-sans shadow-sm"
            style={{ color: catColor, background: `${catColor}15`, border: `1px solid ${catColor}30` }}>
            {t.category}
          </span>
          <span className="text-[9px] text-zinc-600 font-mono z-10">{t.id}</span>
        </div>
        <div className="relative flex-1">
          <p className="text-white text-sm font-semibold leading-tight mb-1.5">{t.name}</p>
          <p className="text-zinc-500 text-[11px] leading-snug line-clamp-2">{t.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STYLE_DOT[t.style] }} />
          <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider">{t.style}</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function ThemesGalleryContent() {
  const { locale } = useLang();
  const t = T[locale as keyof typeof T] ?? T.fr;
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const catParam = searchParams.get("cat");

  const [typeFilter, setTypeFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("All");
  const [impactFilter, setImpactFilter] = useState<typeof IMPACT_CATS[number]>("All");
  const [impactSearch, setImpactSearch] = useState("");
  const [showAllImpact, setShowAllImpact] = useState(false);

  // Initialize filters from search params
  useEffect(() => {
    if (typeParam && TYPE_FILTERS.some(f => f.value === typeParam)) {
      setTypeFilter(typeParam);
    }
    if (catParam) {
      if (SITE_CATEGORIES.includes(catParam)) setSiteFilter(catParam);
      if (IMPACT_CATS.includes(catParam as any)) setImpactFilter(catParam as any);
    }
  }, [typeParam, catParam]);

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
            <span className="hidden sm:inline">{t.backLabel}</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-zinc-600 text-xs hidden sm:inline">{t.totalLabel}</span>
            <Link href="/configure" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
              {t.buildBtn} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">{t.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-5" style={{ letterSpacing: "-0.03em", lineHeight: 1 }}>
            {t.h1a}<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">{t.h1b}</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8">
            {t.sub}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-zinc-500">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-400" />{t.stat1}</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400" />{t.stat2}</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" />{t.stat3}</div>
          </div>
        </motion.div>

        {/* ── Section 1: Site Builder ────────────────────────────────── */}
        <div className="mb-24 flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar Filters for Site Builder */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="mb-6">
                <h2 className="text-xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>Site Builder</h2>
                <p className="text-zinc-500 text-xs mt-1">21 themes with full AI copy</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Type</h3>
                <div className="flex flex-col gap-1.5">
                  {TYPE_FILTERS.map(f => (
                    <button
                      key={f.value}
                      onClick={() => setTypeFilter(f.value)}
                      className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        typeFilter === f.value
                          ? "bg-violet-600/10 text-violet-400"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Category</h3>
                <div className="flex flex-wrap gap-1.5">
                  {SITE_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setSiteFilter(cat)}
                      className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200"
                      style={{
                        background: siteFilter === cat ? (cat === "Premium" ? "#c9a96e" : "#7c3aed") : "rgba(255,255,255,0.03)",
                        color: siteFilter === cat ? "#fff" : "rgba(255,255,255,0.4)",
                        border: siteFilter === cat ? `1px solid ${cat === "Premium" ? "#c9a96e" : "#7c3aed"}` : "1px solid rgba(255,255,255,0.05)",
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Grid for Site Builder Themes */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={siteFilter + typeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSite.map((t, i) => <SiteThemeCard key={t.id} theme={t} index={i} />)}
              </motion.div>
            </AnimatePresence>
          </div>
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
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar Filters for Impact Vault */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="mb-6">
                <h2 className="text-xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>Impact Vault</h2>
                <div className="flex items-center gap-2 mt-1 hidden lg:flex">
                  <span className="text-zinc-600 text-xs font-mono">{filteredImpact.length} / 195</span>
                </div>
              </div>

              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={impactSearch}
                  onChange={e => setImpactSearch(e.target.value)}
                  placeholder="Search templates…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>

              <div>
                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Category</h3>
                <div className="flex flex-col gap-1.5">
                  {IMPACT_CATS.map(cat => (
                    <button key={cat} onClick={() => setImpactFilter(cat)}
                      className="text-left flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: impactFilter === cat ? `${IMPACT_CAT_ACCENT[cat] ?? "#7c3aed"}15` : "transparent",
                        color: impactFilter === cat ? (IMPACT_CAT_ACCENT[cat] ?? "#7c3aed") : "rgba(255,255,255,0.4)",
                      }}>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: IMPACT_CAT_ACCENT[cat] ?? "#7c3aed", opacity: impactFilter === cat ? 1 : 0.3 }} />
                        {cat}
                      </div>
                      {cat !== "All" && <span className="text-[10px] font-mono opacity-50">{TEMPLATES_REGISTRY.filter(t => t.category === cat).length}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Grid for Impact Vault */}
          <div className="flex-1">
            <div className="flex lg:hidden items-center justify-between gap-4 mb-6">
               <span className="text-zinc-600 text-sm font-mono shrink-0">{filteredImpact.length} / 195</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={`${impactFilter}-${impactSearch}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {visibleImpact.map((t, i) => <ImpactCard key={t.id} t={t} index={i} shown />)}
              </motion.div>
            </AnimatePresence>

            {filteredImpact.length > 48 && !showAllImpact && (
              <div className="text-center mt-12 w-full">
                <button onClick={() => setShowAllImpact(true)}
                  className="px-8 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold transition-colors">
                  Load all {filteredImpact.length} templates
                </button>
              </div>
            )}
          </div>
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

export default function ThemesGallery() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080809] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
      </div>
    }>
      <ThemesGalleryContent />
    </Suspense>
  );
}
