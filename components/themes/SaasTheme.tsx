"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Code2, Zap, Shield, BarChart2, Github, Slack, Figma, Database } from "lucide-react";

export function SaasTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full opacity-20 blur-[120px]" style={{ background: `radial-gradient(circle, ${brand} 0%, transparent 70%)` }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: brand }} />
              Developer First Platform
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-white">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-16 leading-relaxed">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-4 rounded-xl font-bold text-lg shadow-2xl"
              >
                {c?.ctaText}
              </MagneticButton>
              <button className="px-10 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-zinc-400 font-bold">
                Read Documentation
              </button>
            </div>
          </Reveal>
        </div>

        {/* Dashboard Mockup */}
        <Reveal delay={0.4} className="max-w-6xl mx-auto px-6 mt-32 relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
          <motion.div 
            whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden transition-all duration-700"
          >
            <div className="h-10 bg-zinc-950 flex items-center gap-2 px-6 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80" className="w-full opacity-80" alt="SaaS Dashboard" />
          </motion.div>
        </Reveal>
      </section>

      {/* Metrics Section */}
      <section className="py-24 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { val: "99.9%", label: "System Uptime" },
            { val: "10M+", label: "API Requests" },
            { val: "<20ms", label: "Latency" },
            { val: "500+", label: "Integrations" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{m.val}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Terminal Section */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter">Scale with our powerful CLI.</h2>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed italic">
              {c?.aboutText}
            </p>
            <div className="space-y-6">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4 text-zinc-300">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-zinc-800" style={{ color: brand }}>
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-sm">{b}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative">
            <div className="bg-zinc-950 rounded-2xl border border-white/10 p-8 font-mono text-sm leading-relaxed overflow-hidden shadow-2xl">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
              </div>
              <div className="text-emerald-400">$ npx aevia-cli init my-project</div>
              <div className="text-zinc-500 mt-2">? Enter project name: (my-project)</div>
              <div className="text-zinc-500 mt-1">? Select template: (saas-premium)</div>
              <div className="text-zinc-300 mt-4">✔ Cloning project repository...</div>
              <div className="text-zinc-300 mt-1">✔ Installing dependencies...</div>
              <div className="text-zinc-300 mt-1">✔ Optimizing assets for production...</div>
              <div className="text-white mt-4 font-bold">🚀 Project ready at http://localhost:3000</div>
              <div className="absolute top-0 right-0 p-4 opacity-5"><Zap className="w-40 h-40" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal className="mb-24">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">Native Integrations</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">Connect your existing tech stack in seconds.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Github />, name: "GitHub" },
              { icon: <Slack />, name: "Slack" },
              { icon: <Figma />, name: "Figma" },
              { icon: <Database />, name: "PostgreSQL" },
            ].map((int, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 rounded-3xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-colors group cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-zinc-800 text-white group-hover:scale-110 transition-transform">
                    {int.icon}
                  </div>
                  <div className="text-white font-bold text-sm uppercase tracking-widest">{int.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-40 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter uppercase italic">Ready to Scale?</h2>
            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              Get Started Now
            </MagneticButton>
            <div className="mt-12 text-zinc-500 text-xs font-bold uppercase tracking-[0.3em]">No Credit Card Required</div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
