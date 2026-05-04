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
  Wind, Moon, Sun, Leaf, Brain, Heart, Menu, X, Star, Play, Clock,
  Instagram, Twitter, Youtube, Headphones, Sparkles, ChevronRight, Users, Target, Zap
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
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "fill-[#8b6fc5] text-[#8b6fc5]" : "text-[#8b6fc5]/25"}`} />
      ))}
    </div>
  )
}

function BreathingOrb() {
  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-[#8b6fc5]/30"
          style={{ width: ring * 64, height: ring * 64 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 4, delay: ring * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b6fc5] to-[#c084fc] flex items-center justify-center shadow-[0_0_40px_rgba(139,111,197,0.5)]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <Wind className="w-8 h-8 text-white" />
      </motion.div>
    </div>
  )
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  useEffect(() => {
    if (!isInView) return
    let current = 0
    const step = Math.ceil(target / 60)
    const interval = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(current)
      if (current >= target) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [isInView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function StillMeditation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [trialDialogOpen, setTrialDialogOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 600], [0, 180])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  const navLinks = ["Sessions", "Studio", "Programs", "Community", "Blog"]

  const stats = [
    { value: 2400000, suffix: "+", label: "Active Members" },
    { value: 98, suffix: "%", label: "Report Better Sleep" },
    { value: 1200, suffix: "+", label: "Guided Sessions" },
    { value: 4, suffix: ".8★", label: "App Store Rating" },
    { value: 7, suffix: " min", label: "Avg Daily Practice" },
    { value: 83, suffix: "%", label: "Reduced Anxiety" },
  ]

  const tabFeatures = [
    {
      value: "sleep",
      label: "Sleep",
      icon: Moon,
      title: "Deep Sleep Journeys",
      description: "Science-backed sleep meditations developed with sleep neuroscientists. Fall asleep 60% faster within two weeks of consistent practice.",
      bullets: [
        "Body Scan Deep Release — 25 min, progressive relaxation from feet to crown",
        "Rain on Leaves Sleep Story — 40 min, narrated by ASMR voice artist Lena Varese",
        "Delta Wave Soundscape — 60 min, binaural beats tuned to deep sleep frequencies",
        "Emergency Wind-Down — 8 min, for nights when the mind won't quiet",
      ],
    },
    {
      value: "breathe",
      label: "Breathwork",
      icon: Wind,
      title: "Breathing Techniques",
      description: "Pranayama, box breathing, Wim Hof, and somatic practices guided by certified breathwork facilitators. Transform your nervous system in minutes.",
      bullets: [
        "4-7-8 Anxiety Release — 12 min, clinically shown to lower cortisol by 23%",
        "Tummo Heat Activation — 20 min, Tibetan breathing for energy and focus",
        "Box Breathing for Focus — 10 min, used by Navy SEALs and elite athletes",
        "Morning Energize Flow — 15 min, activating breath patterns to replace coffee",
      ],
    },
    {
      value: "focus",
      label: "Focus",
      icon: Brain,
      title: "Concentration & Flow State",
      description: "Neuroscience-aligned focus sessions that train attention span and enter flow states. Used by 140,000 knowledge workers and creatives.",
      bullets: [
        "Deep Work Anchor — 25 min Pomodoro-aligned session with ambient noise",
        "Creative Flow Gateway — 18 min, theta brainwave induction for idea generation",
        "Attention Reset — 5 min micro-session, between meetings or tasks",
        "Pre-Performance Focus — 12 min, used by musicians, speakers, and athletes",
      ],
    },
    {
      value: "move",
      label: "Mindful Move",
      icon: Leaf,
      title: "Movement Meditation",
      description: "Qi gong, gentle yoga flows, walking meditations, and somatic movement — all designed to bring consciousness into the body.",
      bullets: [
        "Morning Qi Gong Flow — 22 min, gentle energy cultivation from traditional Chinese practice",
        "Somatic Anxiety Release — 16 min, gentle shaking and movement to discharge tension",
        "Walking in Nature — 20 min, guided outdoor awareness meditation",
        "Yoga Nidra — 35 min, the 'yogic sleep' that equals 4 hours of rest",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Priya Nair",
      role: "Neurosurgeon, Stanford Medical Center",
      avatar: "PN",
      rating: 5,
      text: "I was skeptical of meditation apps, but Still's sleep program genuinely changed my overnight recovery. After six weeks using the Delta Wave sessions, my Oura ring shows 40 more minutes of deep sleep per night.",
    },
    {
      name: "James Whitfield",
      role: "Founder, Whitfield Capital Partners",
      avatar: "JW",
      rating: 5,
      text: "I manage high-stakes investments under constant pressure. The 'Deep Work Anchor' session became non-negotiable before every major decision. My team has noticed the difference in my clarity and patience.",
    },
    {
      name: "Camille Fontaine",
      role: "Certified Yoga Teacher, 800-hr RYT",
      avatar: "CF",
      rating: 5,
      text: "I've practiced for 14 years and recommend Still to every student who asks about meditation apps. The Yoga Nidra library is extraordinary — not just adequate for an app, but genuinely exceptional by any standard.",
    },
    {
      name: "Theo Abramowitz",
      role: "Creative Director, Architecture Firm",
      avatar: "TA",
      rating: 5,
      text: "The Creative Flow Gateway session broke a three-month design block. I now start every project session with it. I've also convinced four colleagues to subscribe — all of them sent thank-you messages within two weeks.",
    },
    {
      name: "Mei-Lin Chung",
      role: "High School Counselor, San Francisco USD",
      avatar: "MC",
      rating: 5,
      text: "I introduced Still's school anxiety program to 60 of my students. After eight weeks, 74% reported measurable reductions in test anxiety. The research-backed structure makes it easy to justify to administrators.",
    },
  ]

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Begin your journey",
      features: [
        "7 starter meditations",
        "1 sleep story",
        "3-day streak tracking",
        "Basic breathing guide",
        "Progress journal",
      ],
      cta: "Start for Free",
      highlighted: false,
    },
    {
      name: "Still Premium",
      price: "$12.99",
      period: "/ month",
      description: "Full access — most popular",
      features: [
        "1,200+ guided sessions",
        "Offline downloads",
        "Personalized daily plan",
        "Sleep score tracking",
        "Live studio sessions (weekly)",
        "Ad-free, always",
        "Cancel anytime",
      ],
      cta: "Start 14-Day Trial",
      highlighted: true,
    },
    {
      name: "Still Teams",
      price: "$8.99",
      period: "/ user / month",
      description: "For organizations & studios",
      features: [
        "Everything in Premium",
        "Admin wellness dashboard",
        "Group session scheduling",
        "Usage analytics & reports",
        "Dedicated account manager",
        "Custom branded experience",
        "HIPAA-compliant options",
      ],
      cta: "Request Demo",
      highlighted: false,
    },
  ]

  const faqs = [
    {
      q: "Do I need meditation experience to use Still?",
      a: "No prior experience is needed. Our onboarding flow asks about your goals, experience level, and available time, then builds a customized 30-day beginner program. Our most advanced practitioners started as complete beginners. The app is designed to meet you exactly where you are.",
    },
    {
      q: "How long are the sessions and how much time do I need?",
      a: "Sessions range from 3-minute micro-meditations to 60-minute deep practices. Our data shows that members who start with just 7 minutes per day consistently build to 15–20 minutes within 60 days. You can practice in bed, on public transit, at your desk, or anywhere with headphones.",
    },
    {
      q: "What makes Still different from Calm or Headspace?",
      a: "Still is built around four scientifically distinct practices: sleep, breathwork, focus, and movement — not just sitting meditation. Our content is developed with neuroscientists, clinical psychologists, and master practitioners from contemplative traditions worldwide. We also offer weekly live sessions with teachers, which our competitors don't provide.",
    },
    {
      q: "Can I use Still offline, such as on flights or without Wi-Fi?",
      a: "Premium members can download up to 250 sessions for offline use on up to three devices. Downloads stay available for 30 days and refresh automatically when you reconnect. We also offer a compact 'Essential Pack' of 25 core sessions that are permanently cached at install.",
    },
    {
      q: "Is there a live studio component or is it only self-guided?",
      a: "Premium members get access to weekly live group sessions with our faculty — typically 45-minute guided practices followed by 15 minutes of open Q&A with the teacher. We also run monthly masterclasses on specific topics (grief, creativity, trauma-sensitive practice) with expert guest teachers.",
    },
    {
      q: "How do you approach mental health sensitivity in the content?",
      a: "All content carries sensitivity ratings. Sessions touching anxiety, grief, or trauma are clearly labeled and developed with licensed clinical psychologists. We include content warnings and always recommend professional support for clinical conditions. Still is a wellness tool, not a replacement for therapy.",
    },
    {
      q: "What devices and platforms does Still support?",
      a: "Still is available on iOS (iPhone & iPad), Android, Apple Watch, and web browser. We also integrate with Apple Health, Google Fit, Garmin, and Oura Ring. A Spotify-connected ambient audio mode is available for Premium members.",
    },
  ]

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#0d0b18] text-[#f2f0ff] min-h-screen">

      {/* ===== NAVBAR ===== */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0d0b18]/80 backdrop-blur-xl border-b border-[#8b6fc5]/15">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b6fc5] to-[#c084fc] flex items-center justify-center group-hover:scale-110 transition-all duration-200 shadow-[0_0_16px_rgba(139,111,197,0.4)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-[#f2f0ff] group-hover:text-[#c084fc] transition-all duration-200">
              Still
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-[#f2f0ff]/55 hover:text-[#c084fc] transition-all duration-200 cursor-pointer">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTrialDialogOpen(true)}
              className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] text-white font-bold text-sm rounded-full hover:scale-105 hover:shadow-[0_0_24px_rgba(139,111,197,0.45)] transition-all duration-200 cursor-pointer">
              Free Trial
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-[#f2f0ff] hover:text-[#c084fc] transition-all duration-200 cursor-pointer">
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0d0b18] border-[#8b6fc5]/20 text-[#f2f0ff] w-72">
                <div className="flex flex-col gap-6 mt-12">
                  {navLinks.map((link) => (
                    <a key={link} href={`#${link.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-semibold hover:text-[#c084fc] transition-all duration-200 cursor-pointer">
                      {link}
                    </a>
                  ))}
                  <button
                    onClick={() => { setTrialDialogOpen(true); setMobileOpen(false) }}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] text-white font-bold rounded-full transition-all duration-200 cursor-pointer">
                    Start Free Trial
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* ===== HERO WITH PARALLAX ===== */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
            alt="Still Meditation — serene practice environment"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b18]/70 via-[#0d0b18]/40 to-[#0d0b18]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b18]/50 via-transparent to-[#0d0b18]/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }}
          className="relative h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}>
            <Badge className="mb-6 bg-[#8b6fc5]/20 text-[#c084fc] border border-[#8b6fc5]/30 backdrop-blur-sm px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
              2.4 Million Members · App of the Year
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6 text-[#f2f0ff]">
            Find Your
            <br />
            <span className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] bg-clip-text text-transparent">
              Still
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-xl md:text-2xl text-[#f2f0ff]/60 font-light max-w-2xl mb-10 leading-relaxed">
            Science-backed meditation for sleep, focus, and anxiety. Practiced by 2.4 million people in 180 countries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setTrialDialogOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] text-white font-black uppercase text-sm tracking-widest rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(139,111,197,0.5)] transition-all duration-200 cursor-pointer">
              Start Free 14-Day Trial
            </button>
            <a href="#sessions"
              className="px-8 py-4 border-2 border-[#f2f0ff]/20 text-[#f2f0ff] font-bold uppercase text-sm tracking-widest rounded-full hover:border-[#c084fc] hover:text-[#c084fc] hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2">
              Explore Sessions <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Glassmorphism stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center px-6">
            {[
              { label: "Sessions Available", value: "1,200+" },
              { label: "App Store Rating", value: "4.8★" },
              { label: "Countries", value: "180" },
            ].map((card, i) => (
              <div key={i}
                className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 text-center hover:bg-white/12 hover:scale-105 transition-all duration-200 cursor-default">
                <div className="text-2xl font-black text-[#c084fc]">{card.value}</div>
                <div className="text-xs text-[#f2f0ff]/50 uppercase tracking-widest mt-0.5">{card.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-16 bg-gradient-to-r from-[#8b6fc5] via-[#a78bda] to-[#c084fc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center cursor-default">
                  <div className="text-3xl md:text-4xl font-black text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-bold text-white/60 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BREATHING ORB INTERLUDE ===== */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(139,111,197,0.08) 0%, transparent 70%)" }} />
        <Reveal>
          <Badge className="mb-4 bg-[#8b6fc5]/15 text-[#c084fc] border border-[#8b6fc5]/25 px-4 py-1 text-xs tracking-widest uppercase">
            Try It Now
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#f2f0ff] mb-4">
            A Moment of <span className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] bg-clip-text text-transparent">Stillness</span>
          </h2>
          <p className="text-[#f2f0ff]/50 max-w-md mx-auto mb-12 text-lg">
            Breathe with the orb — inhale as it expands, exhale as it contracts. This is what Still feels like.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <BreathingOrb />
          <p className="text-[#f2f0ff]/35 text-sm mt-8 uppercase tracking-widest">Inhale 4s · Hold 4s · Exhale 4s</p>
        </Reveal>
      </section>

      {/* ===== FEATURES WITH TABS ===== */}
      <section id="sessions" className="py-24 px-6 bg-[#110f1e]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#8b6fc5]/15 text-[#c084fc] border border-[#8b6fc5]/25 px-4 py-1 text-xs tracking-widest uppercase">
                Session Library
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#f2f0ff] mb-4">
                Practice What <span className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] bg-clip-text text-transparent">You Need</span>
              </h2>
              <p className="text-[#f2f0ff]/50 max-w-xl mx-auto text-lg">
                Four complete practice pathways — each backed by neuroscience and guided by world-class teachers.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Tabs defaultValue="sleep" className="w-full">
              <TabsList className="w-full flex flex-wrap h-auto bg-[#1a1830] border border-[#8b6fc5]/20 rounded-2xl p-2 gap-2 mb-12">
                {tabFeatures.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger key={tab.value} value={tab.value}
                      className="flex-1 min-w-[110px] flex items-center justify-center gap-2 py-3 rounded-xl text-[#f2f0ff]/40 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b6fc5] data-[state=active]:to-[#c084fc] data-[state=active]:text-white data-[state=active]:font-black transition-all duration-200 cursor-pointer hover:text-[#c084fc]">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{tab.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {tabFeatures.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsContent key={tab.value} value={tab.value}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="grid md:grid-cols-2 gap-10 items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b6fc5]/20 to-[#c084fc]/20 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#c084fc]" />
                          </div>
                          <h3 className="text-2xl font-black text-[#f2f0ff]">{tab.title}</h3>
                        </div>
                        <p className="text-[#f2f0ff]/55 text-lg leading-relaxed mb-8">{tab.description}</p>
                        <div className="space-y-3">
                          {tab.bullets.map((bullet, bi) => (
                            <div key={bi} className="flex items-start gap-3 p-4 bg-[#1a1830] rounded-xl border border-[#8b6fc5]/12 hover:border-[#8b6fc5]/30 hover:bg-[#1e1c38] transition-all duration-200 cursor-default">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8b6fc5]/20 to-[#c084fc]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Play className="w-3 h-3 text-[#c084fc]" />
                              </div>
                              <span className="text-[#f2f0ff]/70 text-sm leading-relaxed">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#8b6fc5]/20">
                        <Image
                          src={`https://images.unsplash.com/photo-${tab.value === "sleep" ? "1545389336-cf090fa0557c" : tab.value === "breathe" ? "1506126613408-eca07ce68773" : tab.value === "focus" ? "1599447292-94e0bde90e20" : "1545389336-cf090fa0557c"}?w=800&q=80`}
                          alt={tab.title}
                          fill
                          className="object-cover hover:scale-105 transition-all duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b18]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-[#8b6fc5]/80 backdrop-blur-sm text-white font-bold px-3 py-1">{tab.label}</Badge>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2">
                              <Headphones className="w-3 h-3 text-[#c084fc]" />
                              <span className="text-white text-xs font-bold">
                                {tab.value === "sleep" ? "250+ sessions" : tab.value === "breathe" ? "180+ sessions" : tab.value === "focus" ? "320+ sessions" : "200+ sessions"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#8b6fc5]/15 text-[#c084fc] border border-[#8b6fc5]/25 px-4 py-1 text-xs tracking-widest uppercase">
                Member Stories
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#f2f0ff] mb-4">
                2.4 Million <span className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] bg-clip-text text-transparent">Changed Lives</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-[#110f1e] border-[#8b6fc5]/15 hover:border-[#8b6fc5]/40 transition-all duration-200 cursor-default h-full">
                      <CardContent className="p-8 flex flex-col h-full">
                        <StarRating rating={t.rating} />
                        <p className="text-[#f2f0ff]/65 mt-4 mb-6 leading-relaxed text-sm flex-1 italic">
                          &ldquo;{t.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                          <Avatar className="w-10 h-10 border-2 border-[#8b6fc5]/30">
                            <AvatarFallback className="bg-gradient-to-br from-[#8b6fc5]/20 to-[#c084fc]/20 text-[#c084fc] text-xs font-bold">
                              {t.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-[#f2f0ff] text-sm">{t.name}</div>
                            <div className="text-[#f2f0ff]/35 text-xs">{t.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] border-none text-white hover:scale-110 transition-all duration-200 cursor-pointer -left-5" />
              <CarouselNext className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] border-none text-white hover:scale-110 transition-all duration-200 cursor-pointer -right-5" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ===== PROGRESS BARS / OUTCOMES ===== */}
      <section className="py-24 px-6 bg-[#110f1e]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#8b6fc5]/15 text-[#c084fc] border border-[#8b6fc5]/25 px-4 py-1 text-xs tracking-widest uppercase">
                Outcomes
              </Badge>
              <h2 className="text-5xl font-black tracking-tighter text-[#f2f0ff] mb-4">
                What Members <span className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] bg-clip-text text-transparent">Report</span>
              </h2>
              <p className="text-[#f2f0ff]/50 max-w-md mx-auto text-lg">After 30 days of consistent practice</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-8">
              {[
                { label: "Better sleep quality within 2 weeks", pct: 98 },
                { label: "Reduced anxiety & daily stress levels", pct: 83 },
                { label: "Improved focus and work performance", pct: 76 },
                { label: "Higher self-reported emotional resilience", pct: 91 },
                { label: "Continued practice after 90 days", pct: 67 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#f2f0ff]/80 text-sm font-medium">{item.label}</span>
                    <span className="text-[#c084fc] font-black text-sm">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-[#1a1830] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#8b6fc5]/15 text-[#c084fc] border border-[#8b6fc5]/25 px-4 py-1 text-xs tracking-widest uppercase">
                Plans
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#f2f0ff] mb-4">
                Simple, Honest <span className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] bg-clip-text text-transparent">Pricing</span>
              </h2>
              <p className="text-[#f2f0ff]/50 max-w-xl mx-auto text-lg">
                No tricks, no hidden fees. Start free, upgrade when you're ready.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8, scale: tier.highlighted ? 1.02 : 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`relative rounded-3xl p-8 border cursor-pointer h-full flex flex-col ${
                    tier.highlighted
                      ? "bg-gradient-to-b from-[#8b6fc5] to-[#7659b8] border-[#8b6fc5] text-white shadow-[0_0_60px_rgba(139,111,197,0.3)]"
                      : "bg-[#110f1e] border-[#8b6fc5]/20 hover:border-[#8b6fc5]/45 text-[#f2f0ff]"
                  }`}>
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#c084fc] text-white border-none font-black px-4 py-1 shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-lg font-black uppercase tracking-widest mb-1 ${tier.highlighted ? "text-white/80" : "text-[#c084fc]"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-4 ${tier.highlighted ? "text-white/60" : "text-[#f2f0ff]/45"}`}>
                      {tier.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-black ${tier.highlighted ? "text-white" : "text-[#f2f0ff]"}`}>
                        {tier.price}
                      </span>
                      <span className={`text-sm ${tier.highlighted ? "text-white/55" : "text-[#f2f0ff]/35"}`}>
                        {tier.period}
                      </span>
                    </div>
                  </div>
                  <Separator className={`mb-6 ${tier.highlighted ? "bg-white/20" : "bg-[#8b6fc5]/15"}`} />
                  <div className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${tier.highlighted ? "bg-white/20" : "bg-[#8b6fc5]/15"}`}>
                          <Sparkles className={`w-3 h-3 ${tier.highlighted ? "text-white" : "text-[#c084fc]"}`} />
                        </div>
                        <span className={`text-sm leading-relaxed ${tier.highlighted ? "text-white/75" : "text-[#f2f0ff]/60"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    tier.highlighted
                      ? "bg-white text-[#8b6fc5] hover:bg-white/90 hover:shadow-lg"
                      : "bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] text-white hover:shadow-[0_0_24px_rgba(139,111,197,0.4)]"
                  }`}>
                    {tier.cta}
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION ===== */}
      <section className="py-24 px-6 bg-[#110f1e]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#8b6fc5]/15 text-[#c084fc] border border-[#8b6fc5]/25 px-4 py-1 text-xs tracking-widest uppercase">
                FAQ
              </Badge>
              <h2 className="text-5xl font-black tracking-tighter text-[#f2f0ff] mb-4">
                Everything You <span className="bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] bg-clip-text text-transparent">Want to Know</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}
                  className="border border-[#8b6fc5]/15 rounded-2xl overflow-hidden bg-[#1a1830] px-2 hover:border-[#8b6fc5]/35 transition-all duration-200">
                  <AccordionTrigger className="text-left font-bold text-[#f2f0ff] hover:text-[#c084fc] px-4 py-5 transition-all duration-200 cursor-pointer hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-[#f2f0ff]/60 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b6fc5] via-[#a07ad6] to-[#c084fc]" />
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #fff 0%, transparent 50%)" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
              Begin Your
              <br />
              <span className="italic opacity-90">Still Practice</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              14 days free. No credit card required. Cancel anytime. Join 2.4 million people who chose to be Still.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setTrialDialogOpen(true)}
                className="px-10 py-5 bg-white text-[#8b6fc5] font-black uppercase text-sm tracking-widest rounded-full hover:bg-white/90 hover:scale-105 hover:shadow-2xl transition-all duration-200 cursor-pointer">
                Start Free Trial
              </button>
              <a href="#sessions"
                className="px-10 py-5 border-2 border-white/30 text-white font-black uppercase text-sm tracking-widest rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-200 cursor-pointer">
                Browse Sessions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#080611] border-t border-[#8b6fc5]/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b6fc5] to-[#c084fc] flex items-center justify-center shadow-[0_0_16px_rgba(139,111,197,0.4)]">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-xl tracking-tight text-[#f2f0ff]">Still</span>
              </div>
              <p className="text-[#f2f0ff]/35 text-sm leading-relaxed mb-6">
                Meditation for modern life. Science-backed, teacher-led, practiced by millions.
              </p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#1a1830] flex items-center justify-center text-[#f2f0ff]/35 hover:bg-gradient-to-br hover:from-[#8b6fc5] hover:to-[#c084fc] hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Sessions",
                links: ["Sleep Library", "Breathwork", "Focus & Flow", "Mindful Movement", "Live Studio"],
              },
              {
                title: "Programs",
                links: ["30-Day Beginner", "Anxiety Relief", "Better Sleep", "Peak Performance", "Corporate Wellness"],
              },
              {
                title: "Company",
                links: ["Our Research", "Our Teachers", "Careers", "Press", "Affiliates"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black text-[#f2f0ff] text-sm uppercase tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[#f2f0ff]/35 text-sm hover:text-[#c084fc] transition-all duration-200 cursor-pointer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-[#8b6fc5]/10 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[#f2f0ff]/25 text-xs">© 2026 Still Meditation Inc. All rights reserved.</span>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Accessibility", "Cookie Settings"].map((link) => (
                <a key={link} href="#" className="text-[#f2f0ff]/25 text-xs hover:text-[#c084fc] transition-all duration-200 cursor-pointer">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ===== TRIAL DIALOG ===== */}
      <Dialog open={trialDialogOpen} onOpenChange={setTrialDialogOpen}>
        <DialogContent className="bg-[#110f1e] border border-[#8b6fc5]/20 text-[#f2f0ff] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#c084fc] font-black text-2xl">Start Your Free Trial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-[#f2f0ff]/60 text-sm leading-relaxed">
              14 days of full Premium access. No credit card required. Cancel anytime with one tap.
            </p>
            <div className="space-y-3">
              <input type="email" placeholder="Your email address"
                className="w-full px-4 py-3 bg-[#1a1830] border border-[#8b6fc5]/25 rounded-xl text-[#f2f0ff] placeholder-[#f2f0ff]/30 focus:outline-none focus:border-[#c084fc] transition-all duration-200 text-sm" />
              <input type="password" placeholder="Create a password"
                className="w-full px-4 py-3 bg-[#1a1830] border border-[#8b6fc5]/25 rounded-xl text-[#f2f0ff] placeholder-[#f2f0ff]/30 focus:outline-none focus:border-[#c084fc] transition-all duration-200 text-sm" />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-[#8b6fc5] to-[#c084fc] text-white font-black uppercase text-sm tracking-widest rounded-2xl hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              Begin 14-Day Trial
            </button>
            <p className="text-center text-[#f2f0ff]/35 text-xs">No credit card · Cancel anytime · Full access</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
