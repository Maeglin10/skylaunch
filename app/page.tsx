"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Palette, Rocket, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { TEMPLATES_REGISTRY } from "@/lib/templates/registry";

const steps = [
  { icon: <Palette className="w-6 h-6" />, title: "Tell us about your business", desc: "Fill in a 5-step form — takes less than 3 minutes." },
  { icon: <Zap className="w-6 h-6" />, title: "AI generates your content", desc: "Claude writes your headlines, copy, and SEO metadata." },
  { icon: <Rocket className="w-6 h-6" />, title: "We build & launch your site", desc: "Preview instantly. We deploy it live within 2 hours." },
];

const trust = [
  "No design skills needed",
  "AI-powered copywriting",
  "Deployed on Vercel",
  "Mobile-first responsive",
  "SEO optimised",
  "Delivered in 2 hours",
];
 
const HOMEPAGE_TABS = [
  { label: "Landing", value: "landing", icon: "🚀" },
  { label: "Business", value: "business", icon: "🏢" },
  { label: "Shop", value: "ecommerce", icon: "🛍️" },
  { label: "Premium", value: "premium", icon: "💎" },
  { label: "Portfolio", value: "portfolio", icon: "💼" },
];

// Featured site-builder themes for homepage
const FEATURED_THEMES = [
  { id: "luxury",     label: "Luxury & Couture",    icon: "💎", color: "#c9a96e", desc: "Dark marble, gold accents" },
  { id: "aurora",     label: "Aurora Wellness",      icon: "✦",  color: "#a855f7", desc: "Iridescent gradients" },
  { id: "3d-tech",    label: "3D Tech & Web3",       icon: "⬡",  color: "#06b6d4", desc: "Holographic grid" },
  { id: "brutalist",  label: "Brutalist Editorial",  icon: "◼",  color: "#ffffff", desc: "Raw, massive type" },
  { id: "minimal-pro",label: "Minimal Pro",          icon: "—",  color: "#71717a", desc: "Swiss precision" },
  { id: "magazine",   label: "Magazine",             icon: "📰", color: "#f59e0b", desc: "Editorial grid" },
];

// Featured impact templates (one from each category)
const FEATURED_IMPACT = TEMPLATES_REGISTRY.filter((_, i) => [0, 4, 8, 15, 22, 30].includes(i));

const STYLE_COLOR: Record<string, string> = {
  Dark: "#6366f1",
  Light: "#10b981",
  Vibrant: "#f59e0b",
};

const CAT_COLOR: Record<string, string> = {
  Tech: "#2563eb",
  Luxury: "#c9a96e",
  Editorial: "#f59e0b",
  Creative: "#a855f7",
  Minimal: "#71717a",
};

function FeaturedThemeCard({ theme }: { theme: typeof FEATURED_THEMES[0] }) {
  return (
    <Link href={`/themes/${theme.id}`} className="group block">
      <div
        className="relative rounded-2xl border p-6 h-40 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, #0f0f11 0%, #13131a 100%)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${theme.color}15 0%, transparent 70%)` }}
        />
        <div className="relative">
          <span className="text-2xl">{theme.icon}</span>
        </div>
        <div className="relative">
          <div className="text-white font-bold text-sm leading-tight">{theme.label}</div>
          <div className="text-xs mt-1" style={{ color: theme.color }}>{theme.desc}</div>
        </div>
      </div>
    </Link>
  );
}

function ImpactCard({ t, index }: { t: typeof TEMPLATES_REGISTRY[0]; index: number }) {
  const implemented = true; // Featured ones are implemented
  const catColor = CAT_COLOR[t.category] ?? "#6366f1";
  const styleColor = STYLE_COLOR[t.style] ?? "#6366f1";
  return (
    <Link href={`/templates/${t.id}`} className="group block">
      <div
        className="relative rounded-xl border p-5 h-36 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, #0a0a0d 0%, #111118 100%)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${catColor}12 0%, transparent 70%)` }}
        />
        <div className="relative flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: catColor, background: `${catColor}15`, border: `1px solid ${catColor}25` }}>
            {t.category}
          </span>
          <span className="text-[9px] text-zinc-600 font-mono">{t.id}</span>
        </div>
        <div className="relative">
          <div className="text-white font-bold text-sm leading-tight">{t.name}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: styleColor }} />
            <span className="text-[10px] text-zinc-500">{t.style}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ThemesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 pb-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Theme Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              216 themes.<br />
              <span className="text-zinc-500">One click to preview.</span>
            </h2>
          </div>
          <Link
            href="/themes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 shrink-0"
          >
            Browse all themes <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Site builder themes row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Site Builder — 21 themes</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {FEATURED_THEMES.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              >
                <FeaturedThemeCard theme={t} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact templates row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8"
        >
          <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Impact Vault — 195 templates</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {FEATURED_IMPACT.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
              >
                <ImpactCard t={t} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 py-6 border-t border-zinc-800"
        >
          {[
            { n: "216", label: "Total themes" },
            { n: "6", label: "Style categories" },
            { n: "21", label: "Site builder templates" },
            { n: "195", label: "Impact vault templates" },
          ].map(({ n, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-black text-white">{n}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div id="main-content" className="min-h-screen bg-[#09090b] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-white">Aevia<span className="text-violet-400">Launch</span></span>
          
          {/* Category Tabs */}
          <div className="hidden lg:flex items-center gap-1">
            {HOMEPAGE_TABS.map(tab => (
              <Link key={tab.value} href={`/themes?type=${tab.value}`} 
                className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                {tab.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/themes" className="text-zinc-400 hover:text-white text-sm transition-colors">
              Browse themes
            </Link>
            <Link href="/configure" className="px-4 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/15 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 ring-1 ring-violet-500/20 text-violet-300 text-xs font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              Website delivery in 2 hours
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Your website,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                live in 2 hours.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-8">
              Tell us about your business. Our AI writes the copy, you pick a theme, we launch. That&apos;s it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/configure" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-all duration-200 hover:scale-105">
                Build my site <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/themes" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-lg transition-colors">
                Browse 216 themes
              </Link>
            </div>

            {/* Visual Tabs for Categories */}
            <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {HOMEPAGE_TABS.map(tab => (
                <Link key={tab.value} href={`/themes?type=${tab.value}`} 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group">
                  <span className="text-sm group-hover:scale-110 transition-transform">{tab.icon}</span>
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">{tab.label}</span>
                </Link>
              ))}
            </div>

            <p className="text-zinc-300 text-sm mt-8">Free preview — no credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-white mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-600/15 flex items-center justify-center text-violet-400 mb-4">
                  {s.icon}
                </div>
                <div className="text-xs font-bold text-violet-400 mb-2">Step {i + 1}</div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes showcase */}
      <ThemesSection />

      {/* Trust */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="p-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-violet-600/10 to-blue-600/5">
            <h2 className="text-center text-xl font-bold text-white mb-8">Everything included</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {trust.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to go live?</h2>
          <p className="text-zinc-400 mb-8">Join hundreds of businesses who got their website in 2 hours.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/configure" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-all duration-200 hover:scale-105">
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/themes" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-lg transition-colors">
              Explore themes <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-zinc-500 text-sm">
        © 2026 AeviaLaunch — A product by{" "}
        <a href="https://valentin-milliand.vercel.app" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Valentin Milliand</a> ·{" "}
        <Link href="/themes" className="hover:text-zinc-300 transition-colors">Themes</Link>
        {" · "}
        <Link href="/configure" className="hover:text-zinc-300 transition-colors">Build my site</Link>
      </footer>
    </div>
  );
}
