"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { BookOpen, TrendingUp, Users, FileText, Phone, Mail, MapPin, ChevronRight, Award, CheckCircle2 } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

const services = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Comptabilité",
    description: "Tenue comptable, bilan annuel, comptes de résultat. Nous gérons vos obligations avec précision et ponctualité.",
    features: ["Tenue de comptabilité", "Bilan annuel", "Déclarations TVA"],
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Fiscalité",
    description: "Optimisation fiscale, déclarations IR/IS, contrôle fiscal. Nous défendons vos intérêts face à l'administration.",
    features: ["Déclarations fiscales", "Optimisation IR/IS", "Assistance contrôle fiscal"],
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Conseil de gestion",
    description: "Pilotage de performance, tableaux de bord, prévisions financières. Nous éclairons vos décisions stratégiques.",
    features: ["Tableaux de bord", "Budget prévisionnel", "Analyse financière"],
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Social & Paie",
    description: "Gestion de la paie, contrats de travail, conseil RH. Vos obligations sociales entre de bonnes mains.",
    features: ["Bulletins de paie", "Déclarations sociales", "Conseil RH"],
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

const stats = [
  { value: "20+", label: "Années d'expérience", icon: <Award className="w-5 h-5" /> },
  { value: "350+", label: "Clients accompagnés", icon: <Users className="w-5 h-5" /> },
  { value: "98%", label: "Taux de satisfaction", icon: <CheckCircle2 className="w-5 h-5" /> },
  { value: "12", label: "Experts dédiés", icon: <BookOpen className="w-5 h-5" /> },
];

const navLinks = ["Services", "Le cabinet", "Notre équipe", "Actualités", "Contact"];

export default function VitrineDemo() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-blue-600/5 blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/6 bg-[#080810]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Lumière Conseil</p>
              <p className="text-[10px] text-zinc-500 leading-tight">Expertise comptable</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a key={item} href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Phone className="w-3.5 h-3.5" />
            Prendre RDV
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20 text-blue-300 text-xs font-semibold mb-6">
                <Award className="w-3 h-3" />
                Cabinet Expert-Comptable certifié OEC
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6">
                Votre expert{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  comptable
                </span>{" "}
                de confiance
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
                Depuis 20 ans, Lumière Conseil accompagne les PME, artisans et professions libérales dans leur développement. Comptabilité, fiscalité, conseil de gestion — nous gérons tout pour que vous vous concentriez sur votre métier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                >
                  Prendre rendez-vous
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-zinc-700 text-zinc-300 font-semibold hover:border-zinc-500 hover:text-white transition-colors"
                >
                  Nos services
                </a>
              </div>
            </motion.div>

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border border-white/8 bg-zinc-900/50 backdrop-blur-sm p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-zinc-300">Tableau de bord client</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25">En direct</span>
                </div>
                {[
                  { label: "Chiffre d'affaires YTD", value: "284 700 €", change: "+12.4%", positive: true },
                  { label: "Résultat net estimé", value: "47 200 €", change: "+8.1%", positive: true },
                  { label: "TVA à déclarer", value: "3 850 €", change: "Échéance 15/04", positive: null },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-t border-white/5">
                    <p className="text-sm text-zinc-400">{row.label}</p>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{row.value}</p>
                      <p className={`text-xs ${row.positive === true ? "text-emerald-400" : row.positive === false ? "text-red-400" : "text-amber-400"}`}>
                        {row.change}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 flex items-center gap-2 text-xs text-zinc-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Comptes à jour au 17 avril 2025
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="inline-flex p-2 rounded-xl bg-blue-500/10 text-blue-400 mb-3">
                  {stat.icon}
                </div>
                <p className="text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-zinc-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 ring-1 ring-violet-500/20 text-violet-300 text-xs font-semibold mb-5">
              Nos services
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Un accompagnement complet</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Nous prenons en charge toutes vos obligations pour vous permettre de vous concentrer sur votre activité.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className={`rounded-2xl border ${service.border} ${service.bg} p-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
              >
                <div className={`${service.accent} mb-4`}>{service.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="space-y-1.5">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${service.accent}`} />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 px-6 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-300 text-xs font-semibold mb-5">
                Pourquoi nous choisir
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-5">
                La confiance, ça se construit sur la durée
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Depuis 2005, nous avons accompagné des centaines d&apos;entrepreneurs à chaque étape de leur développement. Notre approche : être un partenaire, pas juste un prestataire.
              </p>
              <div className="space-y-4">
                {[
                  "Interlocuteur unique dédié à votre dossier",
                  "Réponse garantie sous 24h ouvrées",
                  "Accès permanent à vos documents en ligne",
                  "Conseil proactif tout au long de l'année",
                  "Tarifs transparents, sans surprise",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-zinc-300 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-white/8 bg-zinc-900/40 p-8"
            >
              <p className="text-sm font-semibold text-zinc-400 mb-1 uppercase tracking-widest">Témoignage client</p>
              <blockquote className="text-xl font-medium text-white leading-relaxed mb-6 mt-3">
                &ldquo;Lumière Conseil m&apos;a permis de passer de 0 à 800K€ de CA en 3 ans en me déchargeant de toute la gestion administrative. Une équipe exceptionnelle.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-sm font-bold">
                  MS
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Marie S.</p>
                  <p className="text-xs text-zinc-500">Fondatrice, Studio Atelier (Lyon)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20 text-blue-300 text-xs font-semibold mb-5">
              Contact
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Prenez rendez-vous</h2>
            <p className="text-zinc-400 text-lg max-w-md mx-auto">
              Premier entretien gratuit et sans engagement. Répondons ensemble à vos questions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="space-y-5"
            >
              <div>
                <p className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Nos coordonnées</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium">04 72 00 00 00</p>
                      <p className="text-xs text-zinc-500">Lun–Ven, 9h–18h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium">contact@lumiere-conseil.fr</p>
                      <p className="text-xs text-zinc-500">Réponse sous 24h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium">12 rue de la République</p>
                      <p className="text-xs text-zinc-500">69001 Lyon, France</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/8">
                <p className="text-xs text-zinc-500 mb-3">Premier RDV gratuit · Sans engagement</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <p className="text-xs text-zinc-400">Réponse garantie sous 24h</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="h-full rounded-2xl border border-emerald-500/25 bg-emerald-500/10 flex items-center justify-center p-8 text-center">
                  <div>
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <p className="text-white font-bold text-lg mb-1">Message envoyé !</p>
                    <p className="text-zinc-400 text-sm">Nous vous répondrons sous 24h ouvrées.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-zinc-900/50 p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Nom complet *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marie Dupont"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-white/8 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marie@entreprise.fr"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-white/8 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="06 00 00 00 00"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-white/8 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Sujet *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-white/8 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-zinc-900">Choisir...</option>
                        <option value="compta" className="bg-zinc-900">Comptabilité</option>
                        <option value="fiscal" className="bg-zinc-900">Fiscalité</option>
                        <option value="conseil" className="bg-zinc-900">Conseil de gestion</option>
                        <option value="social" className="bg-zinc-900">Social & Paie</option>
                        <option value="autre" className="bg-zinc-900">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez votre situation et vos besoins..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-white/8 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
                  >
                    Envoyer ma demande
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-xs text-zinc-600">
                    Données protégées · Conformité RGPD
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Lumière Conseil</p>
              <p className="text-[10px] text-zinc-600">Expert-Comptable inscrit à l&apos;OEC</p>
            </div>
          </div>
          <div className="flex gap-6">
            {["Politique de confidentialité", "Mentions légales", "CGU"].map((link) => (
              <a key={link} href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-zinc-700">© 2025 Lumière Conseil</p>
        </div>
      </footer>
    </div>
  );
}
