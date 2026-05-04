"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Zap, Menu, Star, ChevronRight, Play, Shield, Cpu, Globe, Users, Award,
  Headphones, Monitor, Gamepad2, Brain, Activity, Building2, GraduationCap,
  HeartPulse, ArrowRight, CheckCircle2, Twitter, Linkedin, Youtube, Instagram,
  Layers, Sparkles, TrendingUp, Lock, Wifi
} from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-[#e879f9] text-[#e879f9]" : "text-gray-600"}`}
        />
      ))}
    </div>
  )
}

const TESTIMONIALS = [
  {
    name: "Marcus Weller",
    role: "CTO, AeroTraining Corp",
    avatar: "MW",
    rating: 5,
    text: "Voxel's enterprise VR training platform reduced our onboarding time by 62%. The immersion level is unlike anything else on the market — our teams retain information 3x better.",
  },
  {
    name: "Dr. Priya Nair",
    role: "Head of Simulation, MedCenter Chicago",
    avatar: "PN",
    rating: 5,
    text: "We've integrated Voxel's surgical simulation suite into residency programs. The haptic feedback accuracy is extraordinary. Patient outcomes have measurably improved.",
  },
  {
    name: "Jason Cho",
    role: "Lead Architect, SkyForm Studios",
    avatar: "JC",
    rating: 5,
    text: "Presenting architectural walkthroughs in Voxel's platform completely transformed our client pitches. We close deals 40% faster because clients can literally walk through their future building.",
  },
  {
    name: "Sofia Reinholt",
    role: "VP Product, Immersive Gaming",
    avatar: "SR",
    rating: 4,
    text: "The multiplayer synchronization is rock solid. 200ms ping and everything stays perfectly in sync. Our competitive VR esports leagues run flawlessly on Voxel infrastructure.",
  },
  {
    name: "David Okafor",
    role: "Founder, MindSpace Wellness",
    avatar: "DO",
    rating: 5,
    text: "Our anxiety treatment protocols built on Voxel's platform show a 71% reduction in patient-reported symptoms. The controlled immersive environments are clinically remarkable.",
  },
]

const PRICING_TIERS = [
  {
    name: "Explorer",
    price: "$29",
    period: "/month",
    description: "Perfect for indie developers and solo creators entering the VR space.",
    features: [
      "Access to 15+ base experience templates",
      "Up to 5 concurrent users per session",
      "Meta Quest + PC VR support",
      "Standard haptic feedback SDK",
      "Community support forum",
      "1 GB cloud asset storage",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Studio",
    price: "$149",
    period: "/month",
    description: "For growing studios and enterprise teams building production-grade VR.",
    features: [
      "Unlimited experience templates",
      "Up to 100 concurrent users",
      "All platforms: Quest, PSVR, Valve Index, PC",
      "Advanced haptic + spatial audio SDK",
      "AI-driven NPC behavior engine",
      "Priority 24/7 support",
      "50 GB cloud asset storage",
      "Custom branding & white-label",
    ],
    cta: "Start Studio Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure for large organizations with compliance requirements.",
    features: [
      "Unlimited concurrent users",
      "On-premise or private cloud deployment",
      "HIPAA & SOC 2 compliance",
      "Dedicated customer success manager",
      "SLA: 99.99% uptime guarantee",
      "Unlimited asset storage",
      "Custom integration & API access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

const STATS = [
  { value: "2.4M+", label: "Active Users" },
  { value: "98.7%", label: "Uptime SLA" },
  { value: "4.9★", label: "App Store Rating" },
  { value: "180ms", label: "Avg Latency" },
  { value: "62+", label: "Enterprise Clients" },
  { value: "14", label: "Industry Awards" },
]

export default function VoxelPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const [quoteOpen, setQuoteOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="min-h-screen bg-[#050208] text-white"
    >
      {/* ─── PARALLAX BG ─── */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_#8b5cf630_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,_#e879f920_0%,_transparent_60%)]" />
      </motion.div>

      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050208]/80 backdrop-blur-xl border-b border-[#8b5cf6]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#e879f9] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">VOXEL</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Solutions", "Platform", "Pricing", "Enterprise", "Docs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-gray-400 hover:text-white transition-all duration-200 cursor-pointer px-4 py-2">
              Sign In
            </button>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px #8b5cf660" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setQuoteOpen(true)}
              className="cursor-pointer px-5 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] text-white text-sm font-bold rounded-lg transition-all duration-200"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0d0718] border-[#8b5cf6]/20 text-white">
              <div className="flex flex-col gap-6 mt-8">
                {["Solutions", "Platform", "Pricing", "Enterprise", "Docs"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-lg font-semibold hover:text-[#e879f9] transition-all duration-200 cursor-pointer"
                  >
                    {item}
                  </a>
                ))}
                <Separator className="bg-[#8b5cf6]/20" />
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="cursor-pointer px-5 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] text-white font-bold rounded-lg transition-all duration-200"
                >
                  Get Started Free
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ─── HERO ─── */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden"
        >
          {/* Hero background image parallax */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]) }}
          >
            <Image
              src="https://images.unsplash.com/photo-1561336313-0dcd143d28ea?w=800&q=80"
              alt="VR Experience"
              fill
              className="object-cover opacity-10"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050208]/60 via-transparent to-[#050208]" />
          </motion.div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#e879f9] text-xs font-bold tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                NEXT-GEN IMMERSIVE EXPERIENCES
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 tracking-tight">
                Step Inside
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6 0%, #e879f9 50%, #a78bfa 100%)" }}
                >
                  The Future
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Voxel is the enterprise VR platform powering the world's most ambitious immersive
                experiences — from Fortune 500 training programs to cutting-edge medical simulation.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px #8b5cf650" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setQuoteOpen(true)}
                  className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] text-white font-bold text-sm rounded-xl transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, borderColor: "#8b5cf6" }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium text-sm rounded-xl transition-all duration-200 hover:bg-white/10"
                >
                  <Play className="w-4 h-4 text-[#e879f9]" />
                  Watch Demo
                </motion.button>
              </div>
            </Reveal>

            {/* Glassmorphism stat cards */}
            <Reveal delay={0.45}>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { label: "Active Users", value: "2.4M+" },
                  { label: "Avg Session Time", value: "47 min" },
                  { label: "Enterprise Clients", value: "62+" },
                  { label: "App Store Rating", value: "4.9 ★" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="cursor-default px-4 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-200"
                  >
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="py-14 px-6 border-y border-[#8b5cf6]/10 bg-[#0d0718]/60 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {STATS.map((stat, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="text-center">
                    <div className="text-3xl font-black text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #e879f9)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1.5 font-medium tracking-wide">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES WITH TABS ─── */}
        <section id="solutions" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-[#8b5cf6]/10 text-[#e879f9] border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/20">
                  Platform Solutions
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                  Built for Every
                  <br />
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #e879f9)" }}>
                    Industry
                  </span>
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                  One platform, infinite possibilities. From healthcare to entertainment, Voxel powers immersive experiences that move the needle.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Tabs defaultValue="enterprise" className="w-full">
                <TabsList className="w-full flex flex-wrap gap-2 bg-[#0d0718] border border-[#8b5cf6]/10 p-2 rounded-2xl mb-10 h-auto">
                  {[
                    { value: "enterprise", label: "Enterprise Training", icon: Building2 },
                    { value: "medical", label: "Medical Simulation", icon: HeartPulse },
                    { value: "arcade", label: "VR Arcade", icon: Gamepad2 },
                    { value: "education", label: "Education", icon: GraduationCap },
                  ].map(({ value, label, icon: Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="cursor-pointer flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b5cf6] data-[state=active]:to-[#e879f9] data-[state=active]:text-white text-gray-400 transition-all duration-200 hover:text-white"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="enterprise">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Badge className="mb-4 bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20">Enterprise Training</Badge>
                      <h3 className="text-3xl font-black mb-4">Workforce Training<br />That Actually Sticks</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Companies using Voxel for onboarding and compliance training see 3x better knowledge retention versus traditional video-based programs. Our adaptive AI adjusts scenarios in real time to each learner's pace.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "AI-adaptive scenario difficulty scaling",
                          "Detailed analytics dashboard per employee",
                          "SCORM & xAPI LMS integration ready",
                          "Multi-user collaborative training rooms",
                          "Role-based access control & SSO",
                        ].map((point, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video">
                      <Image
                        src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"
                        alt="Enterprise VR Training"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/30 to-transparent" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medical">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Badge className="mb-4 bg-pink-500/10 text-pink-400 border-pink-500/20">Medical & Clinical</Badge>
                      <h3 className="text-3xl font-black mb-4">Surgical Precision<br />Through Simulation</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Our medical simulation platform is HIPAA-compliant and used by 14 major hospital systems. Residents perform 200+ simulated procedures before their first real-world operation.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Sub-millimeter haptic feedback accuracy",
                          "Anatomical model library with 1,200+ structures",
                          "Performance benchmarking against cohort averages",
                          "HIPAA-compliant data handling end-to-end",
                          "Integrates with Epic & Cerner EHR systems",
                        ].map((point, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video">
                      <Image
                        src="https://images.unsplash.com/photo-1535223289827-a525885a4723?w=800&q=80"
                        alt="Medical VR Simulation"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/30 to-transparent" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="arcade">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">VR Arcade</Badge>
                      <h3 className="text-3xl font-black mb-4">Consumer Experiences<br />People Come Back For</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Run a high-revenue VR arcade with Voxel's turnkey commercial licensing. Our catalog includes 60+ game titles, fitness experiences, and social platforms with recurring session monetization built in.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "60+ licensed game and experience titles",
                          "Integrated POS and session booking system",
                          "Real-time fleet management dashboard",
                          "Multiplayer leaderboards and tournaments",
                          "Revenue share model starting at 70/30",
                        ].map((point, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video">
                      <Image
                        src="https://images.unsplash.com/photo-1561336313-0dcd143d28ea?w=800&q=80"
                        alt="VR Arcade"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/30 to-transparent" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="education">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Education</Badge>
                      <h3 className="text-3xl font-black mb-4">Learning Through<br />Living It</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        From K-12 to university, Voxel powers immersive field trips, science labs, and history lessons. Teachers report 89% higher student engagement versus traditional media.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Curriculum-aligned experience library (K-12 + HE)",
                          "Teacher dashboard with live classroom monitoring",
                          "Assessment tools tied to experience completion",
                          "Accessible design: 16 language localizations",
                          "Google Classroom & Canvas LMS integration",
                        ].map((point, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video">
                      <Image
                        src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"
                        alt="VR Education"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/30 to-transparent" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Reveal>
          </div>
        </section>

        {/* ─── PLATFORM SPECS ─── */}
        <section id="platform" className="py-24 px-6 bg-[#0d0718]/60">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-[#8b5cf6]/10 text-[#e879f9] border-[#8b5cf6]/20">Technical Platform</Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  Performance That
                  <br />
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #e879f9)" }}>
                    Doesn't Compromise
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Cpu,
                  title: "120Hz Rendering Pipeline",
                  desc: "Native 120fps rendering on Quest Pro and PC VR. Zero motion sickness design philosophy baked into every experience.",
                  metric: "120fps",
                },
                {
                  icon: Wifi,
                  title: "Edge-Networked Multiplayer",
                  desc: "28 global edge nodes ensure sub-180ms latency for multiplayer experiences anywhere on Earth.",
                  metric: "180ms",
                },
                {
                  icon: Brain,
                  title: "AI NPC Engine",
                  desc: "Large language model-driven characters that hold contextual conversations and adapt to player decisions in real time.",
                  metric: "GPT-4o",
                },
                {
                  icon: Activity,
                  title: "Haptic SDK",
                  desc: "Compatible with bHaptics, Ultraleap, and custom rig haptics. Microsecond-accurate force feedback synchronization.",
                  metric: "0.1ms",
                },
                {
                  icon: Shield,
                  title: "SOC 2 Type II Certified",
                  desc: "Annual third-party audits, end-to-end AES-256 encryption, and zero-knowledge architecture for sensitive deployments.",
                  metric: "SOC 2",
                },
                {
                  icon: Layers,
                  title: "Cross-Platform SDK",
                  desc: "Build once, deploy to Quest, PSVR2, Valve Index, Apple Vision Pro, and Pico. One codebase, eight platforms.",
                  metric: "8 Platforms",
                },
              ].map((feature, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 16px 48px #8b5cf620" }}
                    className="cursor-default p-6 rounded-2xl bg-[#0a0615] border border-[#8b5cf6]/10 hover:border-[#8b5cf6]/30 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#e879f9]/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-[#e879f9]" />
                      </div>
                      <Badge className="bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20 text-xs">
                        {feature.metric}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* Tech progress bars */}
            <Reveal delay={0.2}>
              <div className="mt-16 grid md:grid-cols-2 gap-6">
                {[
                  { name: "Rendering Fidelity Score", value: 97 },
                  { name: "Haptic Accuracy Index", value: 94 },
                  { name: "Multiplayer Sync Reliability", value: 99 },
                  { name: "AI NPC Coherence Rating", value: 91 },
                ].map((tech, i) => (
                  <div key={i} className="p-5 rounded-xl bg-[#0a0615] border border-[#8b5cf6]/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold">{tech.name}</span>
                      <span className="text-[#e879f9] text-sm font-bold">{tech.value}%</span>
                    </div>
                    <Progress
                      value={tech.value}
                      className="h-2 bg-[#1a0f2e]"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── TESTIMONIALS CAROUSEL ─── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-[#8b5cf6]/10 text-[#e879f9] border-[#8b5cf6]/20">Customer Stories</Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  Trusted by the
                  <br />
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #e879f9)" }}>
                    World's Best Teams
                  </span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  From hospital systems to Fortune 500 training divisions — here's what the people building on Voxel have to say.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Carousel className="w-full">
                <CarouselContent>
                  {TESTIMONIALS.map((t, i) => (
                    <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                      <Card className="bg-[#0d0718] border-[#8b5cf6]/10 hover:border-[#8b5cf6]/30 transition-all duration-200 h-full">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                          <div>
                            <StarRating rating={t.rating} />
                            <p className="text-gray-300 mt-4 mb-6 leading-relaxed text-sm">"{t.text}"</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-[#8b5cf6]/30">
                              <AvatarFallback className="bg-gradient-to-br from-[#8b5cf6] to-[#e879f9] text-white text-xs font-bold">
                                {t.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold text-sm">{t.name}</div>
                              <div className="text-gray-500 text-xs">{t.role}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-[#0d0718] border-[#8b5cf6]/20 text-white hover:bg-[#8b5cf6]/20 hover:text-white transition-all duration-200 cursor-pointer" />
                <CarouselNext className="bg-[#0d0718] border-[#8b5cf6]/20 text-white hover:bg-[#8b5cf6]/20 hover:text-white transition-all duration-200 cursor-pointer" />
              </Carousel>
            </Reveal>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="py-24 px-6 bg-[#0d0718]/60">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-[#8b5cf6]/10 text-[#e879f9] border-[#8b5cf6]/20">Pricing</Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  Transparent Plans,
                  <br />
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #e879f9)" }}>
                    No Surprises
                  </span>
                </h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  Start free. Scale as you grow. Enterprise pricing available for organizations needing custom infrastructure.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {PRICING_TIERS.map((tier, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`relative p-8 rounded-2xl border transition-all duration-200 cursor-default ${
                      tier.highlighted
                        ? "bg-gradient-to-b from-[#8b5cf6]/20 to-[#e879f9]/10 border-[#8b5cf6]/50 shadow-xl shadow-[#8b5cf6]/10"
                        : "bg-[#0a0615] border-[#8b5cf6]/10 hover:border-[#8b5cf6]/30"
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] text-white border-0 text-xs px-3 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl font-black mb-2">{tier.name}</h3>
                      <div className="flex items-end gap-1 mb-3">
                        <span className="text-4xl font-black text-transparent bg-clip-text"
                          style={{ backgroundImage: tier.highlighted ? "linear-gradient(135deg, #8b5cf6, #e879f9)" : "none", color: tier.highlighted ? "transparent" : "white" }}>
                          {tier.price}
                        </span>
                        {tier.period && <span className="text-gray-500 pb-1 text-sm">{tier.period}</span>}
                      </div>
                      <p className="text-gray-400 text-sm">{tier.description}</p>
                    </div>

                    <Separator className="bg-[#8b5cf6]/10 mb-6" />

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlighted ? "text-[#e879f9]" : "text-[#8b5cf6]"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: tier.highlighted ? "0 0 30px #8b5cf640" : "none" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setQuoteOpen(true)}
                      className={`cursor-pointer w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                        tier.highlighted
                          ? "bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] text-white"
                          : "bg-white/5 text-white border border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/10 hover:border-[#8b5cf6]/40"
                      }`}
                    >
                      {tier.cta}
                    </motion.button>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-[#8b5cf6]/10 text-[#e879f9] border-[#8b5cf6]/20">FAQ</Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  Common Questions,
                  <br />
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #e879f9)" }}>
                    Straight Answers
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  {
                    q: "What VR hardware does Voxel support?",
                    a: "Voxel supports Meta Quest 2/3/Pro, PlayStation VR2, Valve Index, HTC Vive Pro 2, Pico 4, and Apple Vision Pro. Our SDK handles hardware abstraction — you build once and deploy to all supported devices.",
                  },
                  {
                    q: "How does enterprise licensing work?",
                    a: "Enterprise plans are scoped per deployment. We offer seat-based licensing for training programs, session-based licensing for arcades, and unlimited user plans for internal tooling. All include a dedicated CSM and SLA.",
                  },
                  {
                    q: "Is Voxel HIPAA-compliant for medical use?",
                    a: "Yes. Our Medical tier is fully HIPAA-compliant with Business Associate Agreements (BAAs), end-to-end AES-256 encryption, audit logging, and annual SOC 2 Type II certification. PHI never leaves your designated data region.",
                  },
                  {
                    q: "What's the average implementation timeline?",
                    a: "Most Studio-tier customers are live within 2 weeks using our template library. Custom enterprise builds with bespoke environments typically take 6-12 weeks from signed contract to production deployment.",
                  },
                  {
                    q: "Can I run Voxel experiences offline?",
                    a: "Yes. Experiences can be packaged for offline deployment on-device. This is standard for healthcare and defense clients. Multiplayer and AI NPC features require connectivity but single-player modules run fully offline.",
                  },
                  {
                    q: "Do you offer white-label licensing?",
                    a: "Studio and Enterprise tiers include full white-labeling. This covers custom domain, branded loading screens, custom app names on Quest Store, and removal of all Voxel branding from the user-facing experience.",
                  },
                  {
                    q: "What kind of analytics do I get?",
                    a: "Our analytics suite tracks session duration, completion rates, interaction heatmaps, error/struggle points, cohort comparisons, and custom event tracking. Data exports to CSV, Mixpanel, Amplitude, or your data warehouse via webhooks.",
                  },
                ].map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-[#8b5cf6]/10 rounded-xl bg-[#0a0615] hover:border-[#8b5cf6]/30 transition-all duration-200 overflow-hidden px-0"
                  >
                    <AccordionTrigger className="cursor-pointer px-6 py-4 text-left font-semibold text-sm hover:no-underline hover:text-[#e879f9] transition-all duration-200 [&[data-state=open]]:text-[#e879f9]">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center cursor-default"
                style={{ background: "linear-gradient(135deg, #3b1c7a 0%, #8b5cf6 40%, #e879f9 100%)" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ffffff15_0%,_transparent_70%)]" />
                <div className="relative z-10">
                  <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    Limited Beta Access Open
                  </Badge>
                  <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                    Ready to Build
                    <br />
                    Something Incredible?
                  </h2>
                  <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                    Join 2.4 million users already living in Voxel. Start your free 14-day Studio trial — no credit card required.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 40px #ffffff40" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setQuoteOpen(true)}
                      className="cursor-pointer flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#3b1c7a] font-black rounded-xl text-sm transition-all duration-200"
                    >
                      Start Free Trial
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="cursor-pointer flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl text-sm transition-all duration-200 hover:bg-white/20"
                    >
                      Talk to Sales
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-[#8b5cf6]/10 bg-[#030106] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#e879f9] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-xl tracking-tight">VOXEL</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  The enterprise VR platform powering immersive experiences across healthcare, training, and entertainment.
                </p>
                <div className="flex gap-3">
                  {[Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.15, color: "#e879f9" }}
                      href="#"
                      className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-[#8b5cf6]/20 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Link columns */}
              {[
                {
                  title: "Platform",
                  links: ["VR Studio", "SDK Docs", "API Reference", "Changelog", "Status Page"],
                },
                {
                  title: "Solutions",
                  links: ["Enterprise", "Healthcare", "Education", "VR Arcade", "Defense"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Press Kit", "Blog", "Partners"],
                },
                {
                  title: "Legal",
                  links: ["Privacy Policy", "Terms of Service", "HIPAA BAA", "GDPR", "Cookie Policy"],
                },
              ].map((col, ci) => (
                <div key={ci}>
                  <h4 className="font-bold text-sm mb-4 text-white">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="cursor-pointer text-gray-500 text-sm hover:text-gray-200 transition-all duration-200">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Separator className="bg-[#8b5cf6]/10 mb-8" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
              <span>© 2026 Voxel Technologies Inc. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#" className="cursor-pointer hover:text-gray-400 transition-all duration-200">Privacy</a>
                <a href="#" className="cursor-pointer hover:text-gray-400 transition-all duration-200">Terms</a>
                <a href="#" className="cursor-pointer hover:text-gray-400 transition-all duration-200">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ─── GET STARTED DIALOG ─── */}
      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="bg-[#0d0718] border-[#8b5cf6]/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Start Your Free Trial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Alex Martinez"
                className="w-full px-4 py-3 bg-[#050208] border border-[#8b5cf6]/20 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8b5cf6]/50 transition-all duration-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Work Email</label>
              <input
                type="email"
                placeholder="alex@company.com"
                className="w-full px-4 py-3 bg-[#050208] border border-[#8b5cf6]/20 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8b5cf6]/50 transition-all duration-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Company / Organization</label>
              <input
                type="text"
                placeholder="Acme Corp"
                className="w-full px-4 py-3 bg-[#050208] border border-[#8b5cf6]/20 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#8b5cf6]/50 transition-all duration-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Use Case</label>
              <select className="w-full px-4 py-3 bg-[#050208] border border-[#8b5cf6]/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#8b5cf6]/50 transition-all duration-200 cursor-pointer">
                <option value="">Select your primary use case</option>
                <option>Enterprise Training</option>
                <option>Medical Simulation</option>
                <option>VR Arcade / Commercial</option>
                <option>Education</option>
                <option>Game Development</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px #8b5cf650" }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer w-full py-3.5 bg-gradient-to-r from-[#8b5cf6] to-[#e879f9] text-white font-bold rounded-xl text-sm transition-all duration-200 mt-2"
            >
              Create Free Account
            </motion.button>
            <p className="text-center text-xs text-gray-600">
              No credit card required. 14-day Studio trial, cancel anytime.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050208; }
        ::-webkit-scrollbar-thumb { background: #8b5cf6; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #e879f9; }
      `}</style>
    </div>
  )
}
