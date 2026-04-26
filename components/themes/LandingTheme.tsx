"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Check, ChevronDown, Rocket, Shield, Zap, Globe, Cpu, BarChart } from "lucide-react";

const FEATURES = [
  { icon: <Zap />, title: "Lightning Fast", desc: "Performance optimized for sub-second load times across all devices." },
  { icon: <Shield />, title: "Secure by Design", desc: "Enterprise-grade protection to keep your data safe and compliant." },
  { icon: <Rocket />, title: "Infinite Scale", desc: "Built to handle peak traffic without compromising on stability." },
  { icon: <Globe />, title: "Global Reach", desc: "Deploy your presence to edge nodes for local speed, everywhere." },
  { icon: <Cpu />, title: "AI Powered", desc: "Smart automation built-in to streamline your complex workflows." },
  { icon: <BarChart />, title: "Deep Insights", desc: "Real-time analytics to understand your audience and growth." },
];

const FAQS = [
  { q: "How does the integration process work?", a: "Our system is designed to be plug-and-play. You can connect your existing tools in minutes via our secure API." },
  { q: "Can I customize the features for my team?", a: "Yes, every plan comes with advanced configuration options to tailor the experience to your specific needs." },
  { q: "Is there a long-term commitment?", a: "No, we offer flexible monthly plans. You can upgrade, downgrade, or cancel at any time." },
];

export function LandingTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";
  
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <ThemeWrapper session={session}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-48 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-[120px]" style={{ background: brand }} />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-60" style={{ background: brand }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border text-[10px] font-black uppercase tracking-[0.2em] mb-12">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: brand }} />
              Live Now: Version 2.0
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              {c?.heroHeadline}
            </h1>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-16 leading-relaxed">
              {c?.heroSubline}
            </p>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <MagneticButton
                href="#pricing"
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-indigo-500/20"
              >
                {c?.ctaText}
              </MagneticButton>
              <button className="flex items-center gap-2 font-bold text-gray-400 hover:text-black transition-colors group">
                Watch the Demo <span className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform">▶</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Dashboard Mockup */}
        <Reveal delay={0.6} y={100} className="max-w-6xl mx-auto px-6 mt-32">
          <div className="relative bg-white rounded-3xl border shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] p-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-50 flex gap-2 items-center px-4">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80" className="w-full rounded-2xl border" alt="App Dashboard" />
          </div>
        </Reveal>
      </section>

      {/* Social Proof Ticker */}
      <section className="py-20 border-y overflow-hidden bg-gray-50">
        <div className="flex gap-20 items-center justify-center whitespace-nowrap opacity-30 font-black text-2xl uppercase italic tracking-widest animate-marquee">
          <span>Trusted by Innovators</span>
          <span className="w-2 h-2 rounded-full" style={{ background: brand }} />
          <span>Industry Leading Tech</span>
          <span className="w-2 h-2 rounded-full" style={{ background: brand }} />
          <span>Global Excellence</span>
          <span className="w-2 h-2 rounded-full" style={{ background: brand }} />
          <span>Trusted by Innovators</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">Everything you need to <br/>scale with confidence.</h2>
              <p className="text-xl text-gray-500 leading-relaxed">
                {c?.aboutText}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((f, i) => (
              <StaggerItem key={i}>
                <div className="group p-8 rounded-3xl border bg-white hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ background: brand + '10', color: brand }}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Frequently Asked</h2>
              <div className="w-20 h-1 mx-auto" style={{ background: brand }} />
            </Reveal>
          </div>

          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div 
                  className={`border rounded-2xl transition-all overflow-hidden ${openFaq === i ? 'bg-white shadow-lg' : 'bg-transparent'}`}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-6 flex justify-between items-center text-left"
                  >
                    <span className="font-bold text-lg">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-6 text-gray-500 leading-relaxed"
                      >
                        {f.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Toggle Section */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">Simple, Transparent Pricing</h2>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-20">
              <span className={`text-sm font-bold ${!isAnnual ? 'text-black' : 'text-gray-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 rounded-full p-1 transition-colors"
                style={{ background: isAnnual ? brand : '#e5e7eb' }}
              >
                <motion.div 
                  animate={{ x: isAnnual ? 24 : 0 }}
                  className="w-6 h-6 rounded-full bg-white shadow-sm"
                />
              </button>
              <span className={`text-sm font-bold ${isAnnual ? 'text-black' : 'text-gray-400'}`}>Annually <span className="text-emerald-500 font-black">-20%</span></span>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Starter", "Pro", "Enterprise"].map((plan, i) => (
              <StaggerItem key={i}>
                <div className={`p-10 rounded-[32px] border text-left flex flex-col h-full transition-all ${i === 1 ? 'border-2 shadow-2xl relative scale-105' : 'bg-white'}`} style={{ borderColor: i === 1 ? brand : undefined }}>
                  {i === 1 && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white" style={{ background: brand }}>
                      Most Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">{plan}</div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black">${isAnnual ? (i === 0 ? 19 : i === 1 ? 49 : 99) : (i === 0 ? 25 : i === 1 ? 59 : 119)}</span>
                      <span className="text-gray-400 mb-1">/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-12 flex-1">
                    {["Unlimited Projects", "Core AI Analytics", "Custom Domain", "24/7 Support"].map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: brand + '20', color: brand }}><Check className="w-3 h-3" /></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${i === 1 ? 'text-white' : 'border hover:bg-gray-50'}`}
                    style={{ background: i === 1 ? brand : undefined }}
                  >
                    Get Started
                  </button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </ThemeWrapper>
  );
}
