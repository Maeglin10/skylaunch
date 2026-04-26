"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ArrowRight, ChevronRight, Globe, Shield, Zap } from "lucide-react";

export function MinimalProTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#000";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="pt-48 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 mb-20">System 01 // Minimal Professional</div>
            <h1 className="text-6xl md:text-[8vw] font-medium leading-[0.9] tracking-tighter text-black mb-32 max-w-4xl">
              {c?.heroHeadline}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-end">
              <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-lg">
                {c?.heroSubline}
              </p>
              <div className="flex md:justify-end">
                <MagneticButton
                  style={{ background: brand, color: "#fff" }}
                  className="px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl"
                >
                  Get Started
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-40 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            <Reveal>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12">Core Expertise.</h2>
              <p className="text-xl text-gray-400 leading-relaxed font-light mb-16 italic">
                {c?.aboutText}
              </p>
            </Reveal>
            
            <div className="space-y-1">
              {c?.services.map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group py-12 border-b flex justify-between items-center hover:px-8 transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-10">
                      <span className="text-xs font-bold text-gray-300">0{i+1}</span>
                      <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:tracking-widest transition-all">{s.title}</h3>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-200 group-hover:text-black transition-colors" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {formData.benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white p-16 rounded-[40px] shadow-sm border border-gray-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-black mb-12 border border-gray-100">
                    {i === 0 ? <Zap className="w-4 h-4" /> : i === 1 ? <Shield className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-6 tracking-tight">{b}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    Precision engineering meets thoughtful design to deliver exceptional value in {formData.businessType}.
                  </p>
                </div>
                <div className="mt-12 text-[10px] font-black uppercase tracking-widest text-gray-200">System_Module_{i+1}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-24">
            <h2 className="text-5xl font-bold uppercase tracking-tighter">Case Study // Excellence</h2>
          </Reveal>
          
          <Reveal className="relative group overflow-hidden rounded-[60px]">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" className="w-full h-[600px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs">View Project Analysis</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-6xl md:text-[8vw] font-bold uppercase tracking-tighter text-black mb-16 leading-[0.85]">Evolve Your <br/>Perspective.</h2>
            <div className="flex flex-col items-center gap-12">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-xs shadow-2xl"
              >
                Inquire About Availability
              </MagneticButton>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300">
                Precision // Clarity // Performance
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
