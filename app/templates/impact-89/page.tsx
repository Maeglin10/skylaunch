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
  Music, Play, Pause, Menu, Star, Check, Mic, Headphones,
  Radio, TrendingUp, Award, Users, Rss, Globe, Twitter,
  Instagram, Youtube, ChevronRight, Zap, Volume2
} from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const SHOWS = [
  {
    id: 1, title: "Crime Files", genre: "True Crime", episodes: 124, listeners: "680K",
    host: "Rachel Monroe", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    desc: "Cold cases, forensic science, and the psychology of killers — unfiltered."
  },
  {
    id: 2, title: "Silicon Stories", genre: "Tech", episodes: 87, listeners: "412K",
    host: "James Park", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    desc: "Interviews with founders who built billion-dollar companies from nothing."
  },
  {
    id: 3, title: "Business Bytes", genre: "Business", episodes: 156, listeners: "593K",
    host: "Diana Owens", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    desc: "Weekly breakdowns of market moves, M&A deals, and startup pivots."
  },
  {
    id: 4, title: "The Laugh Lab", genre: "Comedy", episodes: 203, listeners: "821K",
    host: "Marcus Bell", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    desc: "Stand-up specials, comedian roundtables, and unscripted chaos."
  },
  {
    id: 5, title: "Field Report", genre: "Sports", episodes: 167, listeners: "377K",
    host: "Anya Reyes", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    desc: "Behind-the-scenes access to pro locker rooms and coaching strategies."
  },
  {
    id: 6, title: "Culture Cast", genre: "Arts", episodes: 92, listeners: "249K",
    host: "Leo Fontaine", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    desc: "Film, music, fashion, and the ideas reshaping modern culture."
  },
]

const TESTIMONIALS = [
  {
    name: "Priya Sharma", role: "Marketing Director, Spotify", avatar: "PS", rating: 5,
    text: "Resonance FM is the only podcast network I recommend to every colleague. The production quality is leagues above anything else I've heard — and Crime Files completely ruined my sleep schedule in the best way."
  },
  {
    name: "Derek Walsh", role: "Founder, EarlyStage Capital", avatar: "DW", rating: 5,
    text: "Business Bytes alone is worth the premium subscription. Diana Owens consistently books guests that other shows can't get. I've discovered three portfolio companies through leads from her interviews."
  },
  {
    name: "Camille Rousseau", role: "Journalist, The Atlantic", avatar: "CR", rating: 5,
    text: "The audio engineering on every episode is cinematic. These shows feel like documentaries, not podcasts. Field Report in particular has broken actual sports journalism stories before print outlets caught on."
  },
  {
    name: "Jordan Tate", role: "Podcast Producer, iHeartMedia", avatar: "JT", rating: 5,
    text: "As someone in the industry, I study Resonance FM the same way designers study Apple. The storytelling structure, the pacing, the music cues — everything is intentional and exceptional."
  },
  {
    name: "Sofia Mendes", role: "CEO, Audify Analytics", avatar: "SM", rating: 5,
    text: "Our data shows Resonance FM listeners have 3.4× higher engagement rates than average podcast consumers. These are deeply loyal audiences. Advertising here is the most effective media buy we track."
  },
]

const STATS = [
  { value: "2.1M", label: "Monthly Listeners", icon: Headphones },
  { value: "48", label: "Active Shows", icon: Mic },
  { value: "850+", label: "Total Episodes", icon: Radio },
  { value: "4.9★", label: "App Store Rating", icon: Star },
  { value: "12", label: "Industry Awards", icon: Award },
  { value: "37", label: "Countries Reached", icon: Globe },
]

const FEATURES_TABS = [
  {
    value: "production",
    label: "Studio Production",
    icon: Mic,
    title: "Hollywood-Grade Audio Engineering",
    desc: "Every episode is recorded in our 5,000 sq ft Burbank facility, mixed by Grammy-nominated engineers, and mastered to broadcast standards that make other podcasts sound like voicemails.",
    bullets: [
      "Neumann U87 microphones — same model used by NPR",
      "Dolby Atmos spatial audio on premium tier",
      "Original music scoring for every show",
      "12-stage editorial review before publish",
      "ISO 9001-certified production workflow",
    ]
  },
  {
    value: "distribution",
    label: "Distribution",
    icon: Rss,
    title: "Everywhere Your Ears Go",
    desc: "Resonance FM feeds are live on every major platform within 90 seconds of publish. Our proprietary SmartSync technology ensures perfect chapter marks, transcripts, and artwork on every app.",
    bullets: [
      "Spotify, Apple, Amazon, Google — all simultaneous",
      "Automatic transcript generation in 14 languages",
      "Dynamic ad insertion with real-time targeting",
      "RSS, WebSub, and direct download support",
      "99.97% uptime SLA — monitored 24/7",
    ]
  },
  {
    value: "analytics",
    label: "Analytics",
    icon: TrendingUp,
    title: "Know Your Audience at Atomic Level",
    desc: "Our Creator Dashboard surfaces IAB-certified analytics that most networks charge $2,000/month for separately. Understand who listens, when they drop off, and what brings them back.",
    bullets: [
      "IAB 2.2-certified download tracking",
      "Listener retention heatmaps per episode",
      "Geographic and demographic cohort analysis",
      "A/B testing for episode titles and artwork",
      "Predictive listener churn alerts",
    ]
  },
]

const PRICING = [
  {
    tier: "Listener",
    price: "$0",
    period: "forever",
    description: "Full access to the free catalog — 300+ episodes with no paywall.",
    features: [
      "300+ free episodes",
      "Mobile app (iOS & Android)",
      "Offline listening (3 episodes)",
      "Standard audio quality",
      "New episode notifications",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    tier: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Ad-free, early access, and Dolby Atmos quality for true audio obsessives.",
    features: [
      "Everything in Listener",
      "Zero ads — ever",
      "Early access (48h before public)",
      "Dolby Atmos spatial audio",
      "Unlimited offline downloads",
      "Exclusive bonus episodes",
      "Host Q&A sessions monthly",
    ],
    cta: "Start 14-Day Trial",
    highlighted: true,
  },
  {
    tier: "Network Partner",
    price: "$299",
    period: "/month",
    description: "For brands and agencies. Dynamic host-read ads in front of 2.1M engaged listeners.",
    features: [
      "Everything in Premium",
      "Host-read ad placement",
      "IAB-certified reporting dashboard",
      "Dedicated campaign manager",
      "Brand safety controls",
      "Custom sponsorship integrations",
      "Quarterly audience deep-dives",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

const FAQS = [
  {
    q: "Which platforms can I listen on?",
    a: "Resonance FM is available on every major podcast app: Spotify, Apple Podcasts, Amazon Music, Google Podcasts, Pocket Casts, Overcast, and Castro. Our own iOS/Android app includes exclusive features like Dolby Atmos playback and offline caching."
  },
  {
    q: "What's included in the Premium subscription?",
    a: "Premium removes all ads network-wide, unlocks Dolby Atmos spatial audio on supported devices, gives you 48-hour early access to every episode, unlimited offline downloads, exclusive bonus episodes, and access to monthly live Q&A sessions with show hosts."
  },
  {
    q: "Can I cancel my Premium subscription anytime?",
    a: "Yes — cancel instantly from your account settings or the mobile app. There are no cancellation fees and no questions asked. Your access continues until the end of your billing period."
  },
  {
    q: "How often are new episodes released?",
    a: "Each show has its own schedule. Crime Files drops every Tuesday and Friday. Business Bytes is weekly on Mondays. The Laugh Lab publishes Wednesday and Sunday. Check each show's profile for exact schedules."
  },
  {
    q: "Do you offer advertising packages for brands?",
    a: "Yes. Our Network Partner plans start at $299/month and include host-read ads, IAB 2.2-certified delivery reporting, brand safety controls, and a dedicated campaign manager. Email partnerships@resonancefm.com for a media kit."
  },
  {
    q: "How do I pitch my show to join the Resonance FM network?",
    a: "We accept creator submissions via our Talent Portal. We evaluate audio quality, audience size, content originality, and host presence. Accepted shows get our full production and distribution infrastructure. Submissions open quarterly."
  },
]

export default function ResonanceFMPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [liveListeners, setLiveListeners] = useState(42318)
  const [openDialog, setOpenDialog] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveListeners(prev => Math.max(39000, prev + Math.floor(Math.random() * 120) - 60))
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const waveHeights = Array.from({ length: 36 }, (_, i) => 8 + Math.random() * 32)

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="min-h-screen bg-[#0c0a14] text-white"
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />
      {/* Radial glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#6d28d9] opacity-[0.07] blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#f59e0b] opacity-[0.04] blur-[100px]" />
      </motion.div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-all duration-200">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6d28d9] to-[#f59e0b] rounded-lg flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base tracking-tight">RESONANCE FM</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            {["Shows", "Features", "Pricing", "FAQ"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#f59e0b] transition-all duration-200 cursor-pointer">
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-semibold text-white/70 hover:text-white transition-all duration-200 cursor-pointer px-4 py-2">
              Sign In
            </button>
            <button
              onClick={() => setOpenDialog(true)}
              className="px-4 py-2 bg-[#6d28d9] hover:bg-[#7c3aed] text-white text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer hover:opacity-80 transition-all duration-200">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0c0a14] border-[#6d28d9]/20 text-white w-72">
              <div className="flex flex-col gap-6 pt-8">
                {["Shows", "Features", "Pricing", "FAQ"].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-lg font-semibold hover:text-[#f59e0b] transition-all duration-200 cursor-pointer">
                    {link}
                  </a>
                ))}
                <Separator className="bg-white/10" />
                <button
                  onClick={() => setOpenDialog(true)}
                  className="w-full py-3 bg-[#6d28d9] rounded-lg font-bold text-sm cursor-pointer hover:bg-[#7c3aed] transition-all duration-200"
                >
                  Start Free Trial
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <Image
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80"
              alt="Studio"
              fill
              className="object-cover opacity-10"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a14]/60 via-transparent to-[#0c0a14]" />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                <span className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase">
                  {liveListeners.toLocaleString()} Listening Live Now
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight mb-6">
                The Network
                <br />
                <span className="bg-gradient-to-r from-[#6d28d9] to-[#f59e0b] bg-clip-text text-transparent">
                  Built for Audio
                </span>
                <br />
                Obsessives
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                48 shows. 850+ episodes. Hollywood-grade production. Join 2.1 million monthly listeners who've made Resonance FM their daily ritual.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                <button
                  onClick={() => setOpenDialog(true)}
                  className="px-8 py-4 bg-[#6d28d9] hover:bg-[#7c3aed] text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-[#6d28d9]/30 hover:shadow-[#6d28d9]/50"
                >
                  Start Free Trial — No Card Needed
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-3 px-6 py-4 border border-white/15 hover:border-white/30 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-black" /> : <Play className="w-3.5 h-3.5 text-black ml-0.5" />}
                  </div>
                  {isPlaying ? "Now Playing: Crime Files Ep. 124" : "Play Latest Episode"}
                </button>
              </div>
            </Reveal>

            {/* Floating stat cards */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: "App Store", value: "4.9★ Rating" },
                  { label: "Spotify Charts", value: "#1 Network" },
                  { label: "Downloads", value: "850K/week" },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="px-5 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-center"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">{card.label}</div>
                    <div className="text-sm font-bold text-[#f59e0b]">{card.value}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </motion.div>

          {/* Waveform decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-0.5 px-8 pointer-events-none">
            {waveHeights.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [h, h * 0.4, h] }}
                transition={{ duration: 0.6 + Math.random() * 0.8, delay: i * 0.03, repeat: Infinity }}
                className="flex-1 max-w-[8px] bg-gradient-to-t from-[#6d28d9]/60 to-[#f59e0b]/30 rounded-t-sm opacity-40"
                style={{ height: h }}
              />
            ))}
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="py-16 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {STATS.map((stat, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="text-center">
                    <stat.icon className="w-5 h-5 text-[#f59e0b] mx-auto mb-2 opacity-70" />
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOWS ── */}
        <section id="shows" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="bg-[#6d28d9]/20 text-[#a78bfa] border-[#6d28d9]/30 mb-4">Show Roster</Badge>
                <h2 className="text-5xl font-black tracking-tight mb-4">
                  48 Shows. <span className="text-[#f59e0b]">One Standard.</span>
                </h2>
                <p className="text-white/50 text-lg max-w-xl mx-auto">
                  Every show on the Resonance network is produced to the same cinematic standard. No filler. No fluff.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SHOWS.map((show, i) => (
                <Reveal key={show.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-[#6d28d9]/40 transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={show.img}
                        alt={show.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a14] via-[#0c0a14]/20 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-[#0c0a14]/80 text-[#f59e0b] border-[#f59e0b]/30 text-[10px]">
                        {show.genre}
                      </Badge>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur">
                        <Headphones className="w-3 h-3 text-[#f59e0b]" />
                        <span className="text-xs font-bold text-white">{show.listeners}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-black mb-1">{show.title}</h3>
                      <p className="text-xs text-white/40 mb-2">Hosted by {show.host} · {show.episodes} episodes</p>
                      <p className="text-sm text-white/60 leading-relaxed">{show.desc}</p>
                      <button className="mt-4 flex items-center gap-1.5 text-[#f59e0b] text-xs font-bold hover:gap-2.5 transition-all duration-200 cursor-pointer">
                        Listen Now <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES WITH TABS ── */}
        <section id="features" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20 mb-4">Why Resonance FM</Badge>
                <h2 className="text-5xl font-black tracking-tight">
                  Not a Podcast App.{" "}
                  <span className="text-[#6d28d9]">An Audio Platform.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Tabs defaultValue="production" className="w-full">
                <TabsList className="bg-white/5 border border-white/10 rounded-xl p-1 w-full grid grid-cols-3 mb-10">
                  {FEATURES_TABS.map(tab => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-lg text-white/60 data-[state=active]:bg-[#6d28d9] data-[state=active]:text-white font-semibold text-sm cursor-pointer transition-all duration-200"
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {FEATURES_TABS.map(tab => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <Card className="bg-white/[0.03] border-white/10 rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="p-8 md:p-10">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#6d28d9]/20 mb-6">
                              <tab.icon className="w-6 h-6 text-[#a78bfa]" />
                            </div>
                            <h3 className="text-2xl font-black mb-3 text-white">{tab.title}</h3>
                            <p className="text-white/50 leading-relaxed mb-6">{tab.desc}</p>
                            <ul className="space-y-3">
                              {tab.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2.5">
                                  <Check className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-white/70">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="relative min-h-[280px] bg-gradient-to-br from-[#6d28d9]/20 to-[#f59e0b]/10 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                              <tab.icon className="w-48 h-48 text-[#6d28d9]" />
                            </div>
                            <div className="relative z-10 text-center p-8">
                              <div className="text-5xl font-black text-[#f59e0b] mb-2">
                                {tab.value === "production" ? "5K ft²" : tab.value === "distribution" ? "99.97%" : "3.4×"}
                              </div>
                              <div className="text-sm text-white/50">
                                {tab.value === "production" ? "Burbank Studio" : tab.value === "distribution" ? "Uptime SLA" : "Avg Engagement Lift"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </Reveal>
          </div>
        </section>

        {/* ── TESTIMONIALS CAROUSEL ── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="bg-[#6d28d9]/20 text-[#a78bfa] border-[#6d28d9]/30 mb-4">Listener Stories</Badge>
                <h2 className="text-5xl font-black tracking-tight">
                  2.1 Million Voices. <span className="text-[#f59e0b]">Here Are Five.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {TESTIMONIALS.map((t, i) => (
                    <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-4">
                      <Card className="bg-white/[0.04] border-white/8 rounded-2xl h-full">
                        <CardContent className="p-7">
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: t.rating }).map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                            ))}
                          </div>
                          <p className="text-white/70 leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-[#6d28d9]/30 text-[#a78bfa] text-xs font-bold">
                                {t.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-bold text-white">{t.name}</div>
                              <div className="text-xs text-white/40">{t.role}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer -left-4" />
                <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer -right-4" />
              </Carousel>
            </Reveal>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-14">
                <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20 mb-4">Pricing</Badge>
                <h2 className="text-5xl font-black tracking-tight mb-3">
                  Simple. <span className="text-[#6d28d9]">No Hidden Fees.</span>
                </h2>
                <p className="text-white/50">Cancel anytime. No contracts. No tricks.</p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {PRICING.map((plan, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`relative rounded-2xl p-7 h-full flex flex-col transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-[#6d28d9]/30 to-[#6d28d9]/10 border-2 border-[#6d28d9] shadow-xl shadow-[#6d28d9]/20"
                      : "bg-white/[0.03] border border-white/10"
                  }`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-[#f59e0b] text-black border-0 font-bold text-xs px-3">Most Popular</Badge>
                      </div>
                    )}
                    <div className="mb-6">
                      <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">{plan.tier}</div>
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-4xl font-black text-white">{plan.price}</span>
                        <span className="text-white/40 text-sm mb-1">{plan.period}</span>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed">{plan.description}</p>
                    </div>
                    <Separator className="bg-white/10 mb-6" />
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-[#f59e0b]" : "text-[#6d28d9]"}`} />
                          <span className="text-sm text-white/70">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setOpenDialog(true)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                        plan.highlighted
                          ? "bg-[#6d28d9] hover:bg-[#7c3aed] text-white shadow-lg shadow-[#6d28d9]/30"
                          : "border border-white/20 hover:border-white/40 text-white hover:bg-white/5"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="bg-[#6d28d9]/20 text-[#a78bfa] border-[#6d28d9]/30 mb-4">FAQ</Badge>
                <h2 className="text-5xl font-black tracking-tight">Got Questions?</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white/[0.03] border border-white/10 rounded-xl px-5 cursor-pointer hover:border-[#6d28d9]/30 transition-all duration-200"
                  >
                    <AccordionTrigger className="text-left font-semibold text-white hover:text-[#f59e0b] transition-all duration-200 hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/60 leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#6d28d9]/40 via-[#1a1040] to-[#0c0a14] border border-[#6d28d9]/30 p-12 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#6d28d920_0%,_transparent_70%)]" />
                <div className="relative z-10">
                  <Volume2 className="w-10 h-10 text-[#f59e0b] mx-auto mb-6 opacity-80" />
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Your Ears Deserve Better.
                  </h2>
                  <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                    Start your 14-day free trial. Premium audio. Zero ads. Cancel anytime.
                  </p>
                  <button
                    onClick={() => setOpenDialog(true)}
                    className="px-10 py-4 bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-black text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-xl shadow-[#f59e0b]/30 hover:shadow-[#f59e0b]/50"
                  >
                    Start Free Trial — 14 Days
                  </button>
                  <p className="text-white/30 text-xs mt-4">No credit card required. Cancel from your account settings anytime.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/5 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#6d28d9] to-[#f59e0b] rounded-lg flex items-center justify-center">
                    <Music className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-base">RESONANCE FM</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                  The world's most intentional podcast network. 48 shows. One standard: exceptional.
                </p>
                <div className="flex gap-4 mt-5">
                  {[Twitter, Instagram, Youtube, Rss].map((Icon, i) => (
                    <button key={i} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#6d28d9]/30 flex items-center justify-center transition-all duration-200 cursor-pointer">
                      <Icon className="w-4 h-4 text-white/50 hover:text-white" />
                    </button>
                  ))}
                </div>
              </div>

              {[
                { title: "Shows", links: ["True Crime", "Tech", "Business", "Comedy", "Sports", "Arts"] },
                { title: "Platform", links: ["iOS App", "Android App", "Web Player", "Apple CarPlay"] },
                { title: "Company", links: ["About", "Careers", "Press", "Advertising", "Contact"] },
              ].map(col => (
                <div key={col.title}>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">{col.title}</div>
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-sm text-white/50 hover:text-white transition-all duration-200 cursor-pointer">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Separator className="bg-white/5 mb-6" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
              <span>© 2025 Resonance FM Inc. All rights reserved.</span>
              <div className="flex gap-5">
                {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(link => (
                  <a key={link} href="#" className="hover:text-white/60 transition-all duration-200 cursor-pointer">{link}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ── SUBSCRIBE DIALOG ── */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-[#0c0a14] border-[#6d28d9]/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Start Your Free Trial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-white/50 text-sm">14 days free, then $9.99/month. Cancel anytime.</p>
            <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#6d28d9]/50 transition-all duration-200" />
            <button className="w-full py-3 bg-[#6d28d9] hover:bg-[#7c3aed] text-white font-bold rounded-xl transition-all duration-200 cursor-pointer">
              Get Free Access
            </button>
            <div className="flex items-center gap-4 text-xs text-white/30">
              {["No credit card", "Cancel anytime", "Instant access"].map(item => (
                <div key={item} className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#f59e0b]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0c0a14; }
        ::-webkit-scrollbar-thumb { background: #6d28d9; border-radius: 3px; }
      `}</style>
    </div>
  )
}
