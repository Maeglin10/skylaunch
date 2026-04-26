"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Cpu, Zap, Shield, BarChart3, ChevronRight, Binary, Fingerprint } from "lucide-react";

export function TechTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#3b82f6"; // Tech Blue fallback

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 bg-[#050505]">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full opacity-20 blur-[150px] mix-blend-screen animate-pulse" style={{ background: brand }} />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full opacity-10 blur-[150px] mix-blend-screen" style={{ background: '#f43f5e' }} />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-zinc-400">
              <Binary className="w-4 h-4 text-white" /> Decentralized Infrastructure 3.0
            </div>
            <h1 className="text-6xl md:text-[9vw] font-black mb-12 leading-[0.8] tracking-tighter text-white uppercase italic">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-5 rounded-none font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_50px_rgba(59,130,246,0.3)]"
              >
                Launch Protocol
              </MagneticButton>
              <button className="px-12 py-5 border border-white/10 rounded-none font-black uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-all">
                Whitepaper
              </button>
            </div>
          </Reveal>
        </div>

        {/* 3D Bobbing Asset */}
        <Reveal delay={0.4} className="max-w-4xl mx-auto px-6 mt-32 relative">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-video rounded-[40px] border border-white/10 bg-zinc-900 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" className="w-full h-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                <div className="text-[8px] font-black uppercase tracking-[0.5em] text-white">SYSTEM ACTIVE · SYSTEM ACTIVE ·</div>
              </div>
            </div>
          </motion.div>
          {/* Decorative scanner line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-30 opacity-50"
          />
        </Reveal>
      </section>

      {/* Feature Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Cpu />, label: "Edge Computing", desc: "Low-latency processing at the global network edge." },
              { icon: <Shield />, label: "Encrypted Core", desc: "End-to-end security protocols for data integrity." },
              { icon: <BarChart3 />, label: "Real-time Metrics", desc: "Deep analytical insights with zero lag." },
            ].map((f, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-12 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[32px] hover:border-white/20 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-zinc-800 text-white group-hover:scale-110 transition-transform" style={{ color: brand }}>
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{f.label}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Kinetic Typography Section */}
      <section className="py-40 bg-white text-black relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic">High Performance<br/>By Design.</h2>
            <p className="text-xl text-zinc-500 leading-relaxed mb-16 font-light">
              {c?.aboutText}
            </p>
            <div className="space-y-8">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-black uppercase tracking-tight">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-zinc-900 rounded-[80px] p-20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80')] bg-cover" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border border-white/10 rounded-full flex items-center justify-center"
              >
                <div className="w-[80%] h-[80%] border border-white/10 rounded-full" />
              </motion.div>
              <div className="absolute text-center z-10">
                <div className="text-7xl font-black text-white italic leading-none">V2</div>
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mt-4">Protocol Version</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 relative z-10 bg-[#050505] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-white leading-none mb-16 italic">Initialize<br/>Deployment.</h2>
            <div className="flex flex-col items-center gap-12">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-16 py-8 rounded-none font-black uppercase tracking-[0.3em] text-sm shadow-[0_0_80px_rgba(59,130,246,0.4)]"
              >
                Access Terminal
              </MagneticButton>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
                <span>Core.v2.0</span>
                <span>System.Online</span>
                <span>{formData.city}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </ThemeWrapper>
  );
}
