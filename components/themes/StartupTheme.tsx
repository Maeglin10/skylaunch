"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Rocket, Zap, Shield, BarChart2, Globe, Users, TrendingUp, Check } from "lucide-react";

export function StartupTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#6366f1";

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#050505]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ background: brand }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-12 text-indigo-400">
              <Rocket className="w-3.5 h-3.5" /> Series A // Backed by Vision
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white uppercase italic">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg mb-16 leading-relaxed font-light italic">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-indigo-500/20"
              >
                Join The Mission
              </MagneticButton>
              <button className="px-10 py-5 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-widest">
                View Roadmap
              </button>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative group">
            <div className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src={formData.heroImageUrl || "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80"} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
            </div>
            {/* Floating metrics */}
            <div className="absolute -top-10 -right-10 p-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hidden md:block">
              <div className="text-4xl font-black text-white italic mb-1">+240%</div>
              <div className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Growth Q1</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-30">
            {["FORBES", "TECHCRUNCH", "WIRED", "VERGE"].map(logo => (
              <span key={logo} className="text-2xl font-black italic tracking-widest">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-32">
            <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 italic text-white leading-none">Designed for <br/>Infinite Scaling.</h2>
              <p className="text-xl text-zinc-500 font-light italic leading-relaxed">
                {c?.aboutText}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap />, title: "Velocity", desc: "Built for speed and rapid iteration." },
              { icon: <Shield />, title: "Security", desc: "Enterprise-grade protection by default." },
              { icon: <Globe />, title: "Edge Network", desc: "Local speed on a global scale." },
              { icon: <Users />, title: "Collaborative", desc: "Shared workflows for modern teams." },
            ].map((f, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-10 rounded-[32px] bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-zinc-800 group-hover:scale-110 transition-transform" style={{ color: brand }}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="aspect-video rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl relative group">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center animate-pulse"><TrendingUp className="w-8 h-8 text-white" /></div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic text-white">Break Free From <br/>Legacy Limits.</h2>
            <div className="space-y-6">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-400 group-hover:text-white transition-all">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-sm text-zinc-400 uppercase tracking-widest">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-white text-black text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter mb-16 italic leading-[0.8]">Build For <br/>The Future.</h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-16 py-8 rounded-full font-black uppercase tracking-[0.3em] text-sm shadow-2xl"
              >
                Apply For Early Access
              </MagneticButton>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                <span>Core.v1.0</span>
                <span>Open-Source</span>
                <span>Seed Phase</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
