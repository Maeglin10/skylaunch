"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Monitor, ShoppingBag, Globe, Sparkles } from "lucide-react";
import { AeviaHeader } from "@/components/AeviaHeader";

const templates = [
  {
    id: "landing",
    name: "Landing Page",
    tagline: "Convertir des visiteurs en clients",
    description: "Hero animé, section features, témoignages, pricing et formulaire de contact. Optimisée conversion et SEO.",
    url: "https://aevia-landing.vercel.app",
    accentFrom: "from-violet-500",
    accentTo: "to-fuchsia-500",
    icon: <Sparkles className="w-5 h-5" />,
    dot: "bg-violet-400",
    features: ["Hero section animé", "Features & bénéfices", "Témoignages", "Tableau de prix", "Formulaire contact"],
    useCases: ["SaaS", "Agence", "Startup", "App"],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    tagline: "Vendre des produits en ligne",
    description: "Boutique complète avec catalogue produits, panier, checkout et confirmation de commande. Prêt pour Stripe.",
    url: "https://aevia-ecommerce.vercel.app",
    accentFrom: "from-amber-500",
    accentTo: "to-orange-500",
    icon: <ShoppingBag className="w-5 h-5" />,
    dot: "bg-amber-400",
    features: ["Catalogue & filtres", "Panier & checkout", "Confirmation commande", "Page produit détaillée", "Stripe-ready"],
    useCases: ["Boutique", "Mode", "Produits physiques", "Digital"],
  },
  {
    id: "website",
    name: "Site Vitrine",
    tagline: "Une présence pro sans friction",
    description: "Site corporate clean pour les entreprises de service. Accueil, à propos, services, blog et contact.",
    url: "https://aevia-launch.vercel.app",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
    icon: <Globe className="w-5 h-5" />,
    dot: "bg-emerald-400",
    features: ["Accueil + À propos", "Page services", "Blog / Actualités", "Contact & réservation", "Multi-langue"],
    useCases: ["Consultant", "Agence", "Restaurant", "Commerce local"],
  },
];

function TemplatePanel({ template, isActive }: { template: typeof templates[number]; isActive: boolean }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className={`transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"}`}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Info — 2/5 */}
        <div className="lg:col-span-2 flex flex-col">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${template.accentFrom}/10 ${template.accentTo}/10 ring-1 ring-white/10 mb-5 w-fit`}>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${template.accentFrom} ${template.accentTo}`}>{template.icon}</span>
            <span className={`text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${template.accentFrom} ${template.accentTo}`}>{template.name}</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{template.tagline}</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-5">{template.description}</p>

          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Inclus</p>
            <div className="space-y-2">
              {template.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${template.accentFrom} ${template.accentTo} shrink-0`} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-7">
            {template.useCases.map((u) => (
              <span key={u} className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50">{u}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <a
              href="https://aevia.vercel.app/contact"
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${template.accentFrom} ${template.accentTo} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
            >
              Je veux ce site
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={template.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-sm font-semibold hover:border-zinc-500 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Plein écran
            </a>
          </div>
        </div>

        {/* Preview — 3/5 */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950" style={{ aspectRatio: "16/10" }}>
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-3 h-8 bg-zinc-900 border-b border-zinc-800 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="flex-1 mx-3 h-5 bg-zinc-800 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-zinc-500 font-mono truncate px-2">{template.url}</span>
              </div>
              <Monitor className="w-3.5 h-3.5 text-zinc-600" />
            </div>
            <div className="relative" style={{ height: "calc(100% - 32px)" }}>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 z-10">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${template.accentFrom}/20 ${template.accentTo}/10 border border-white/5 text-white`}>
                    {template.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-semibold">Chargement de la démo...</p>
                    <p className="text-zinc-500 text-xs mt-1">{template.url}</p>
                  </div>
                </div>
              )}
              <iframe
                src={template.url}
                className="w-full h-full border-0"
                title={`${template.name} preview`}
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-[#09090b]">
      <AeviaHeader />

      {/* Hero */}
      <section className="relative pt-28 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/8 blur-[120px]" />
          <div className="absolute top-40 -left-40 w-[400px] h-[400px] rounded-full bg-fuchsia-600/6 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 ring-1 ring-violet-500/20 text-violet-300 text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              Sites web sur mesure — livraison 7 jours
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-5">
              Choisissez votre type de site
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Naviguez entre les 3 templates, explorez la démo live, puis démarrez votre projet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab switcher */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 p-1.5 bg-zinc-900 rounded-2xl border border-zinc-800 w-fit mx-auto">
            {templates.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  active === i
                    ? "bg-zinc-800 text-white shadow-lg"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${t.dot} ${active === i ? "opacity-100" : "opacity-40"}`} />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Template panels */}
      <section className="px-6 py-8 pb-20">
        <div className="mx-auto max-w-6xl relative">
          {templates.map((t, i) => (
            <TemplatePanel key={t.id} template={t} isActive={active === i} />
          ))}
        </div>
      </section>

      {/* Also: AI builder CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 bg-violet-500/10 ring-1 ring-violet-500/20 px-2.5 py-1 rounded-full mb-3">
                <Sparkles className="w-3 h-3" />
                AeviaLaunch Builder IA
              </div>
              <h3 className="text-white font-bold text-xl mb-1">Vous avez une idée spécifique ?</h3>
              <p className="text-zinc-400 text-sm">Décrivez votre activité, choisissez parmi 21 templates IA et générez votre contenu en 60 secondes.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/themes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Explorer les templates
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
