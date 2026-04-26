"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Award, Target, TrendingUp, Users, CheckCircle2, MessageSquare, ArrowRight, Shield } from "lucide-react";

export function ConsultantTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#1e293b";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 bg-slate-50 overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white border text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm text-slate-400">
              <Shield className="w-4 h-4 text-slate-900" /> Strategic Advisory // 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter text-slate-900">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-16 leading-relaxed italic">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton
                href="#contact"
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-xl font-bold text-lg shadow-xl shadow-slate-500/10"
              >
                Schedule Strategy Session
              </MagneticButton>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
              <img src={formData.heroImageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 p-8 bg-white rounded-3xl shadow-xl border z-20 hidden md:block">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-black text-slate-900 mb-1 italic">150+</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Global Clients</div>
                </div>
                <div className="w-[1px] h-12 bg-slate-100" />
                <div className="text-center">
                  <div className="text-4xl font-black text-slate-900 mb-1 italic">12yr</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Experience</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise & Services */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-slate-900">Specialized Expertise</h2>
              <p className="text-xl text-slate-500 font-light italic leading-relaxed">
                Driving measurable growth and operational excellence through data-driven strategies.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Target />, label: "Strategy", desc: "Long-term positioning and market dominance." },
              { icon: <TrendingUp />, label: "Growth", desc: "Scaling operations and revenue streams." },
              { icon: <Users />, label: "Leadership", desc: "Executive coaching and team alignment." },
            ].map((s, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-12 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-white shadow-sm" style={{ color: brand }}>
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 uppercase tracking-tight">{s.label}</h3>
                  <p className="text-slate-500 leading-relaxed mb-10">{s.desc}</p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                    View Methodology <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About & Performance */}
      <section className="py-40 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic text-white">Results <br/>Not Reports.</h2>
            <p className="text-xl text-slate-400 leading-relaxed italic mb-16 max-w-md">
              {c?.aboutText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs uppercase tracking-widest text-slate-300">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-slate-800 rounded-[80px] p-20 flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80')] bg-cover" />
              <div className="relative z-10 text-center">
                <div className="text-[10vw] font-black text-white italic leading-none">+40%</div>
                <div className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mt-6">Average ROI Increase</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-12">
              <MessageSquare className="w-8 h-8 text-slate-900" />
            </div>
            <p className="text-3xl md:text-4xl font-light italic text-slate-900 leading-relaxed mb-12">
              &quot;The insights provided by {formData.businessName} were pivotal in our successful Series B funding and subsequent market expansion.&quot;
            </p>
            <div className="flex flex-col items-center">
              <div className="font-black uppercase tracking-widest text-slate-900">David Henderson</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mt-2">CEO, Nexus Solutions</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-slate-900 leading-none mb-16 italic">Evolve Your <br/>Perspective<span style={{ color: brand }}>.</span></h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-6 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
              >
                Inquire About Availability
              </MagneticButton>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
                <span>London</span>
                <span>New York</span>
                <span>Dubai</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
