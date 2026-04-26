"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Sparkles, ArrowRight, Layers, Layout, MousePointer2, Smartphone } from "lucide-react";

export function VitrineModernTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Vibrant Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20" style={{ background: brand }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20" style={{ background: '#f43f5e' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-xl border border-white text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-500" /> Shaping The Future
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter text-black">
                {c?.heroHeadline}
              </h1>
              <p className="text-xl text-gray-500 max-w-lg mb-16 leading-relaxed font-medium">
                {c?.heroSubline}
              </p>
              <div className="flex gap-6">
                <MagneticButton
                  style={{ background: brand, color: "#fff" }}
                  className="px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/20"
                >
                  Get Started <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </MagneticButton>
              </div>
            </Reveal>
            
            <Reveal delay={0.3} className="relative">
              <div className="relative z-10 p-4 bg-white/30 backdrop-blur-3xl rounded-[40px] border border-white shadow-2xl overflow-hidden group">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={formData.heroImageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"} 
                  className="w-full rounded-[32px] shadow-lg transition-all duration-700" 
                />
              </div>
              {/* Floating glass element */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-xl z-20 hidden lg:flex items-center justify-center p-6 text-center"
              >
                <div className="text-xs font-black uppercase tracking-widest leading-tight">Next Gen Solution</div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid (Modern) */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Modern Capabilities</h2>
              <p className="text-xl text-gray-500 font-light italic">
                Pushing the boundaries of what&apos;s possible in {formData.businessType}.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Layout />, label: "Interface Systems" },
              { icon: <MousePointer2 />, label: "Interactivity" },
              { icon: <Smartphone />, label: "Mobile First" },
              { icon: <Layers />, label: "Architecture" },
            ].map((s, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-10 rounded-[32px] bg-white border border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gray-50 group-hover:bg-white group-hover:shadow-lg transition-all" style={{ color: brand }}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{s.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    High-end implementation with focus on premium quality and performance.
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About Section with Big Text */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <Reveal className="relative">
              <div className="aspect-square rounded-[60px] bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full flex items-center justify-center animate-spin-slow">
                <div className="text-[10px] font-black uppercase tracking-widest">Premium Quality · Excellence ·</div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
                Redefining the <br/><span style={{ color: brand }}>Standards</span>.
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-16 italic">
                {c?.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {formData.benefits.map((b, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: brand + '20', color: brand }}>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest leading-tight">{b}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 bg-white text-center relative overflow-hidden">
        {/* Background Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <div className="text-[30vw] font-black uppercase tracking-tighter whitespace-nowrap">CONTACT</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-16 italic">Let&apos;s Build.</h2>
            <p className="text-xl text-gray-400 mb-20 max-w-xl mx-auto">
              Ready to elevate your digital presence to the next level?
            </p>
            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
            >
              Start The Project
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </ThemeWrapper>
  );
}
