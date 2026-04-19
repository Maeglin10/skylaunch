"use client";

import { motion, type Variants } from "framer-motion";
import { Zap, Shield, BarChart3, ArrowRight, Check, Sparkles } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Workflows automatisés",
    description: "Connectez vos outils en quelques clics. FlowAI automatise vos tâches répétitives et libère votre équipe pour ce qui compte vraiment.",
    accent: "from-violet-500 to-fuchsia-500",
    glow: "violet",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Analytics en temps réel",
    description: "Tableaux de bord intelligents, rapports automatisés et insights actionnables. Prenez des décisions basées sur des données, pas des intuitions.",
    accent: "from-fuchsia-500 to-pink-500",
    glow: "fuchsia",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Sécurité enterprise",
    description: "Chiffrement end-to-end, SSO, audit logs et conformité GDPR. Vos données restent les vôtres, en sécurité, pour toujours.",
    accent: "from-pink-500 to-rose-500",
    glow: "pink",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mois",
    description: "Parfait pour démarrer",
    cta: "Commencer gratuitement",
    featured: false,
    features: [
      "5 workflows actifs",
      "1 000 exécutions/mois",
      "Intégrations de base",
      "Support communauté",
      "Analytics 7 jours",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mois",
    description: "Pour les équipes qui grandissent",
    cta: "Démarrer l'essai gratuit",
    featured: true,
    features: [
      "Workflows illimités",
      "100 000 exécutions/mois",
      "Toutes les intégrations",
      "Support prioritaire 24/7",
      "Analytics 90 jours",
      "Collaboration équipe",
      "API access",
    ],
  },
];

export default function LandingDemo() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full bg-fuchsia-600/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600/6 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">FlowAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["Produit", "Tarifs", "Docs", "Blog"].map((item) => (
              <a key={item} href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
              Connexion
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Essai gratuit
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 ring-1 ring-violet-500/25 text-violet-300 text-xs font-semibold mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nouveau — Intelligence artificielle intégrée</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-violet-500/30 text-violet-200 text-[10px] font-bold">BETA</span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            L&apos;espace de travail{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              IA
            </span>{" "}
            qui travaille pour vous
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            FlowAI automatise vos workflows, analyse vos données et connecte tous vos outils en un seul endroit. Gagnez 10h par semaine dès le premier jour.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
            >
              Commencer gratuitement
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-zinc-700 text-zinc-300 font-semibold hover:border-zinc-500 hover:text-white transition-colors"
            >
              Voir la démo
            </a>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="text-xs text-zinc-600 mt-5"
          >
            Aucune carte bancaire requise · 14 jours d&apos;essai gratuit · Annulation à tout moment
          </motion.p>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-5xl mt-16"
        >
          <div className="rounded-2xl border border-white/8 bg-zinc-900/50 backdrop-blur-sm p-1 shadow-2xl shadow-black/50">
            <div className="rounded-xl bg-zinc-900 p-6 flex items-start gap-4 border border-white/5">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-zinc-500 font-mono">flow_builder.ai</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Workflows actifs", value: "147", change: "+12" },
                    { label: "Exécutions aujourd'hui", value: "8.4K", change: "+23%" },
                    { label: "Temps économisé", value: "312h", change: "ce mois" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-zinc-800/60 border border-white/5 p-4">
                      <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-emerald-400 mt-1">{stat.change}</p>
                    </div>
                  ))}
                </div>
                <div className="h-20 rounded-xl bg-zinc-800/40 border border-white/5 flex items-center px-4 gap-2">
                  <div className="flex gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="w-3 rounded-sm bg-gradient-to-t from-violet-600/40 to-fuchsia-500/60"
                        style={{ height: `${h * 0.5}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social proof */}
      <section className="py-8 px-6 border-y border-white/5">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-6">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["Stripe", "Linear", "Notion", "Vercel", "Figma", "Loom"].map((brand) => (
              <span key={brand} className="text-zinc-600 font-bold text-sm tracking-wide hover:text-zinc-400 transition-colors cursor-pointer">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 ring-1 ring-fuchsia-500/25 text-fuchsia-300 text-xs font-semibold mb-5">
              Fonctionnalités
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Tout ce dont votre équipe a besoin
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Une plateforme unifiée qui remplace 12 outils différents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="relative group rounded-2xl border border-white/8 bg-zinc-900/50 p-6 hover:border-white/15 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${feature.glow === "violet" ? "#7c3aed18" : feature.glow === "fuchsia" ? "#d946ef18" : "#ec489918"} 0%, transparent 70%)` }}
                />
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${feature.accent} mb-4 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-zinc-900/30">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 ring-1 ring-violet-500/25 text-violet-300 text-xs font-semibold mb-5">
              Tarifs simples
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Commencez gratuitement</h2>
            <p className="text-zinc-400 text-lg">Évoluez selon vos besoins. Pas de surprise.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className={`relative rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-violet-500/50 bg-gradient-to-b from-violet-900/20 to-zinc-900/80 shadow-xl shadow-violet-500/10"
                    : "border-white/8 bg-zinc-900/50"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold">
                      Plus populaire
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-zinc-400 mb-1">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold">{plan.price}</span>
                    <span className="text-zinc-400">{plan.period}</span>
                  </div>
                  <p className="text-zinc-500 text-sm mt-1">{plan.description}</p>
                </div>

                <a
                  href="#"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm mb-6 transition-all ${
                    plan.featured
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 shadow-lg shadow-violet-500/25"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.featured ? "bg-violet-500/20 text-violet-400" : "bg-zinc-800 text-zinc-500"}`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm">FlowAI</span>
          </div>
          <div className="flex gap-6">
            {["Confidentialité", "Conditions", "Sécurité", "Contact"].map((link) => (
              <a key={link} href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-zinc-700">© 2025 FlowAI, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
