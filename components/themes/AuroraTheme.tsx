"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Sparkles, ArrowRight, Zap, Globe, Layers, Shield } from "lucide-react";

export function AuroraTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Aurora Animated Background */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full opacity-30 blur-[150px]"
          style={{ background: `radial-gradient(circle, ${brand} 0%, transparent 70%)` }}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full opacity-20 blur-[150px]"
          style={{ background: `radial-gradient(circle, #f43f5e 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden z-10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-white/40">
              <Sparkles className="w-4 h-4 text-amber-400" /> New Frontier // 2026
            </div>
            <h1 className="text-6xl md:text-[9vw] font-black mb-12 leading-[0.85] tracking-tighter text-white uppercase italic">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-20 leading-relaxed font-light italic">
              {c?.heroSubline}
            </p>
            <div className="flex justify-center gap-8">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-[0_0_80px_rgba(124,58,237,0.4)]"
              >
                Enter Experience
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services in Glass Cards */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Zap />, title: "Quantum Speed" },
              { icon: <Globe />, title: "Global Mesh" },
              { icon: <Shield />, title: "Bio-Security" },
            ].map((s, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] hover:bg-white/10 transition-all duration-500 text-center">
                  <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-10 bg-white/5 group-hover:bg-white group-hover:text-black transition-all" style={{ color: brand }}>
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white mb-6 tracking-tight italic">{s.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">
                    Pioneering the next evolution of digital interaction with fluid architecture and organic motion.
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="aspect-square bg-gradient-to-br from-white/10 to-transparent p-1 border border-white/10 rounded-[80px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80" className="w-full h-full object-cover rounded-[79px] grayscale opacity-60" />
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.9] italic text-white">The Atmosphere <br/>Of Tomorrow.</h2>
            <p className="text-xl text-white/30 leading-relaxed italic mb-16">
              {c?.aboutText}
            </p>
            <div className="space-y-6">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-6 p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 group hover:bg-white/10 transition-all">
                  <div className="text-2xl font-black text-white/20 italic group-hover:text-white transition-colors">0{i+1}</div>
                  <div className="text-lg font-black uppercase tracking-tight text-white/60">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-white leading-none mb-16 italic">Evolve With Us<span style={{ color: brand }}>.</span></h2>
            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-16 py-8 rounded-full font-black uppercase tracking-[0.4em] text-xs shadow-2xl"
            >
              Start The Journey
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
