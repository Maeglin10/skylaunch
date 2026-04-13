"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Palette, Rocket, CheckCircle2 } from "lucide-react";

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-white">Sky<span className="text-violet-400">Launch</span></span>
          <Link href="/configure" className="px-4 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
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

            <p className="text-zinc-400 text-xl max-w-xl mx-auto leading-relaxed mb-10">
              Tell us about your business. Our AI writes the copy, you validate the preview, we launch. That&apos;s it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/configure" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-colors">
                Build my site <ArrowRight className="w-5 h-5" />
              </Link>
              <span className="text-zinc-500 text-sm">Free preview — no credit card required</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-24">
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
          <Link href="/configure" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-colors">
            Start for free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-zinc-500 text-sm">
        © 2025 AeviaLaunch — A product by Valentin Milliand
      </footer>
    </div>
  );
}
