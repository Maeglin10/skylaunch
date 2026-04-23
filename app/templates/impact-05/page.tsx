"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Menu, X, Sparkles, Zap, Shield, Globe, BarChart3, Users, Star, Play, Layers, Code2, Rocket, ArrowUpRight, MessageSquare, Clock, TrendingUp } from "lucide-react";
import "../premium.css";

/* --- Data ----------------------------------------------------------- */

const FEATURES = [
  { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Sub-second responses powered by edge computing. Your users never wait.", color: "#8b5cf6" },
  { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security", desc: "SOC 2 Type II certified. End-to-end encryption. Zero-trust architecture.", color: "#10b981" },
  { icon: <Globe className="w-6 h-6" />, title: "Global Scale", desc: "Deployed across 42 regions. 99.99% uptime SLA guaranteed.", color: "#3b82f6" },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Real-time Analytics", desc: "Actionable insights with AI-powered dashboards that evolve with your data.", color: "#f59e0b" },
  { icon: <Users className="w-6 h-6" />, title: "Team Collaboration", desc: "Built-in workflows, comments, and version control for modern teams.", color: "#ec4899" },
  { icon: <Code2 className="w-6 h-6" />, title: "Developer First", desc: "Comprehensive API, SDKs in 12 languages, and webhooks for everything.", color: "#6366f1" },
];

const STEPS = [
  { step: "01", title: "Connect your stack", desc: "Plug in your existing tools in minutes. We support 200+ integrations out of the box.", icon: <Layers className="w-8 h-8" /> },
  { step: "02", title: "Configure workflows", desc: "Drag-and-drop automation builder. No code required, but fully extensible for developers.", icon: <Code2 className="w-8 h-8" /> },
  { step: "03", title: "Launch & grow", desc: "Go live instantly. Our AI optimizes performance automatically as you scale.", icon: <Rocket className="w-8 h-8" /> },
];

const PRICING = [
  { name: "Starter", price: "0", period: "forever", desc: "Perfect for side projects and prototyping.", features: ["Up to 3 projects", "1,000 API calls/mo", "Community support", "Basic analytics"], cta: "Start free", popular: false },
  { name: "Pro", price: "49", period: "/month", desc: "For growing teams and serious products.", features: ["Unlimited projects", "100,000 API calls/mo", "Priority support", "Advanced analytics", "Custom domains", "Team collaboration"], cta: "Start 14-day trial", popular: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For organizations that demand the best.", features: ["Everything in Pro", "Unlimited API calls", "Dedicated support", "SSO & SAML", "Custom SLAs", "On-prem deployment"], cta: "Contact sales", popular: false },
];

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "CTO, Flowmatic", text: "We migrated from three separate tools to NovaPlatform in a weekend. Our engineering velocity doubled.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", metric: "2x faster" },
  { name: "David Kim", role: "CEO, CloudScale", text: "The analytics alone paid for the entire subscription. We spotted a $2M revenue opportunity in week one.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", metric: "$2M found" },
  { name: "Elena Ruiz", role: "VP Eng, DataNest", text: "Best developer experience I've seen in 15 years. The API documentation is a work of art.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", metric: "10x DX" },
];

const LOGOS = ["Vercel", "Stripe", "Notion", "Linear", "Figma", "GitHub"];

const STATS = [
  { value: "10K+", label: "Companies" },
  { value: "99.99%", label: "Uptime" },
  { value: "42", label: "Regions" },
  { value: "4.9/5", label: "Rating" },
];

/* --- Scroll Reveal -------------------------------------------------- */

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* --- Main Component ------------------------------------------------- */

export default function SaaSMarketplaceSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="premium-theme bg-[#09090b] text-white min-h-screen selection:bg-violet-500 overflow-x-hidden font-sans">

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">NovaPlatform</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {["Features", "How it works", "Pricing", "Testimonials"].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(/ /g, "-"))} className="text-sm text-zinc-400 hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="text-sm text-zinc-400 hover:text-white transition-colors">Log in</button>
            <button onClick={() => scrollTo("pricing")} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-full text-sm font-semibold transition-colors">
              Get Started Free
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#09090b]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6">
            {["Features", "How it works", "Pricing", "Testimonials"].map((item, i) => (
              <motion.button key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} onClick={() => scrollTo(item.toLowerCase().replace(/ /g, "-"))} className="text-2xl font-semibold hover:text-violet-400 transition-colors">
                {item}
              </motion.button>
            ))}
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 px-8 py-3 bg-violet-600 rounded-full font-semibold">
              Get Started Free
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===============================================================
          SECTION 1: HERO — Gradient mesh + floating UI elements
         ============================================================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px]" />
          <motion.div animate={{ x: [0, -40, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[150px]" />
          <motion.div animate={{ x: [0, 30, 0], y: [0, -40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] right-[30%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[11px] font-semibold text-violet-300 uppercase tracking-wider">Now with AI-powered automation</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]"
            >
              Ship faster.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.65 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]"
            >
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Scale smarter.</span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The all-in-one platform that replaces your entire development toolkit. Build, deploy, and scale products in record time.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => scrollTo("pricing")} className="group px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-full text-sm font-bold transition-all flex items-center gap-2 hover:gap-3">
              Start building for free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-white/10 rounded-full text-sm font-semibold hover:border-violet-500/50 transition-all flex items-center gap-2">
              <Play className="w-4 h-4 text-violet-400" /> Watch demo (2 min)
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex flex-col items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-2 border-[#09090b] flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-500">Trusted by <span className="text-white font-semibold">10,000+</span> companies worldwide</p>
          </motion.div>
        </motion.div>

        {/* Floating UI Cards */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[5%] hidden xl:block z-10"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl w-56">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">+47% this week</span>
            </div>
            <div className="text-2xl font-bold mb-1">$124.5K</div>
            <div className="text-[10px] text-zinc-500">Revenue processed</div>
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[25%] right-[5%] hidden xl:block z-10"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl w-52">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-semibold">Deploy time</span>
            </div>
            <div className="text-2xl font-bold mb-1">0.8s</div>
            <div className="text-[10px] text-zinc-500">Average worldwide</div>
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown className="w-5 h-5 text-zinc-600" />
        </motion.div>
      </section>

      {/* --- Logo Bar --- */}
      <section className="border-y border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-8 font-semibold">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {LOGOS.map(logo => (
              <span key={logo} className="text-xl font-bold text-zinc-700 hover:text-zinc-400 transition-colors cursor-default">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          SECTION 2: STATS
         ============================================================= */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===============================================================
          SECTION 3: FEATURES — Animated grid
         ============================================================= */}
      <section id="features" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-violet-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Features</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Everything you need.<br />
              <span className="text-zinc-500">Nothing you don&apos;t.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Built from the ground up for modern teams who refuse to compromise on speed, security, or developer experience.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 cursor-pointer h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                    style={{ background: `${feature.color}15`, color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-violet-300 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          SECTION 4: HOW IT WORKS — Timeline
         ============================================================= */}
      <section id="how-it-works" className="py-32 md:py-40 px-6 md:px-12 bg-[#0b0b0f] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-violet-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">How it works</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Three steps to <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">liftoff</span>
            </h2>
          </Reveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/50 via-fuchsia-500/50 to-pink-500/50 hidden md:block" />
            <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/50 via-fuchsia-500/50 to-pink-500/50 md:hidden" />

            <div className="space-y-16 md:space-y-24">
              {STEPS.map((step, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className={`flex items-start gap-8 md:gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    {/* Dot */}
                    <div className="relative z-10 shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
                        {step.icon}
                      </div>
                    </div>
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                      <span className="text-violet-400 text-[11px] uppercase tracking-widest font-bold mb-2 block">Step {step.step}</span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                      <p className="text-zinc-400 leading-relaxed max-w-md">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===============================================================
          SECTION 5: PRICING — Animated cards with toggle
         ============================================================= */}
      <section id="pricing" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-violet-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Pricing</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Start free, <span className="text-zinc-500">scale infinitely.</span>
            </h2>
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 mt-6 bg-white/5 rounded-full p-1 border border-white/10">
              <button onClick={() => setBillingAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!billingAnnual ? "bg-violet-600 text-white" : "text-zinc-400"}`}>
                Monthly
              </button>
              <button onClick={() => setBillingAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billingAnnual ? "bg-violet-600 text-white" : "text-zinc-400"}`}>
                Annual <span className="text-[10px] text-emerald-400 font-bold ml-1">-20%</span>
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative rounded-2xl p-8 border h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-transparent shadow-lg shadow-violet-500/10"
                    : "border-white/5 bg-white/[0.02]"
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-600 rounded-full text-[10px] uppercase tracking-wider font-bold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-zinc-500 mb-6">{plan.desc}</p>
                    <div className="flex items-baseline gap-1">
                      {plan.price !== "Custom" && <span className="text-sm text-zinc-500">$</span>}
                      <span className="text-5xl font-black">
                        {plan.price === "Custom" ? plan.price : billingAnnual ? Math.round(Number(plan.price) * 0.8) : plan.price}
                      </span>
                      {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                        <Check className="w-4 h-4 text-violet-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3.5 rounded-full text-sm font-bold transition-all ${
                    plan.popular
                      ? "bg-violet-600 hover:bg-violet-500 text-white"
                      : "border border-white/10 hover:border-violet-500/50 text-white"
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          SECTION 6: TESTIMONIALS
         ============================================================= */}
      <section id="testimonials" className="py-32 md:py-40 px-6 md:px-12 bg-[#0b0b0f] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="text-violet-400 text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Loved by <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">builders</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-zinc-300 leading-relaxed mb-8 flex-1">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image src={t.avatar} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-zinc-500">{t.role}</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400">
                      {t.metric}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          SECTION 7: CTA — Final conversion
         ============================================================= */}
      <section className="py-32 md:py-40 px-6 md:px-12">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 60%)" }} />

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
              Ready to build the<br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">future?</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
              Join 10,000+ teams already shipping faster with NovaPlatform. Free forever plan, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-10 py-4 bg-violet-600 hover:bg-violet-500 rounded-full font-bold transition-all flex items-center gap-2 hover:gap-3 text-lg">
                Get started — it&apos;s free <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Talk to sales
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===============================================================
          FOOTER
         ============================================================= */}
      <footer className="border-t border-white/5 py-16 px-6 md:px-12 bg-[#07070a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold">NovaPlatform</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">The all-in-one platform for modern teams. Build, deploy, and scale without limits.</p>
          </div>
          {[
            { title: "Product", items: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", items: ["Privacy", "Terms", "Security", "GDPR"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map(item => (
                  <li key={item}><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <span className="text-xs text-zinc-600 mb-4 md:mb-0">&copy; 2026 NovaPlatform, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "Discord"].map(s => (
              <a key={s} href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
