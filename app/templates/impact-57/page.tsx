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
  Activity, Zap, Shield, ChevronRight, Star, Check, Menu, X,
  ArrowRight, Play, TrendingUp, Timer, Cpu, BarChart3, Bolt,
  Radio, Layers, Gauge, Twitter, Instagram, Youtube, Linkedin
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

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let cur = 0
    const step = to / 70
    const t = setInterval(() => {
      cur += step
      if (cur >= to) { setCount(to); clearInterval(t) } else { setCount(Math.floor(cur)) }
    }, 16)
    return () => clearInterval(t)
  }, [isInView, to])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const PRODUCTS = [
  {
    id: 1, name: "APEX PRO X1", category: "Exoskeleton", price: "$3,499",
    stat: "+34% Peak Power", badge: "FLAGSHIP",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    specs: [["Sensor Rate", "1,200 Hz"], ["Weight", "380 g"], ["Battery", "8–14 hr"], ["Connectivity", "BLE 5.4"]],
    desc: "Carbon-fibre actuators driven by our proprietary muscle-synergy algorithm. 1,200 data points per second. Real-time micro-force amplification that feels like an extension of your own nervous system.",
  },
  {
    id: 2, name: "NEURAL STRIDE", category: "Running Analysis", price: "$899",
    stat: "2ms Gait Latency", badge: "BEST SELLER",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: [["Latency", "2 ms"], ["Sensors", "48 IMUs"], ["App Sync", "Real-time"], ["Water Rating", "IP68"]],
    desc: "48 inertial measurement units capture every millisecond of your stride. Neural Stride translates raw biomechanical data into actionable coaching — in real time, mid-run.",
  },
  {
    id: 3, name: "CRYO RECOVERY", category: "Recovery Tech", price: "$1,250",
    stat: "−40% Recovery Time", badge: "NEW 2026",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    specs: [["Temp Range", "−5°C–15°C"], ["Cycle Time", "12 min"], ["Sessions", "Unlimited"], ["Control", "App + Voice"]],
    desc: "Precision cryotherapy calibrated to your tissue temperature in real time. The only recovery system that adapts its protocol based on your current HRV and lactate proxy data.",
  },
]

const TESTIMONIALS = [
  { name: "Danielle Osei", role: "Olympic 200m Finalist", avatar: "DO", rating: 5, quote: "APEX PRO X1 changed everything I knew about peak power. My block-start data in the first week was better than anything I'd seen in three years of training. I ran a personal best at the World Championships wearing it." },
  { name: "Marco Trevisan", role: "Pro Triathlete, 3× Ironman Champion", avatar: "MT", rating: 5, quote: "Neural Stride gave my coaching team biomechanical data we couldn't get any other way. My run split at Kona dropped by four minutes and twelve seconds. That is not marginal. That is career-defining." },
  { name: "Yuki Nakamoto", role: "NBA Performance Director, Golden State Warriors", avatar: "YN", rating: 5, quote: "We've integrated STRYDE across our full roster's conditioning program. Recovery metrics improved 38% in a single pre-season. Two players who were injury-prone became available for 94% of games." },
  { name: "Priya Mehta", role: "Elite Marathon Runner, World Record Holder", avatar: "PM", rating: 5, quote: "The precision of the data alone is worth every cent. But it's the way APEX adapts in real time that genuinely shocked me. It's like having a biomechanics lab on your body at every training session." },
]

const STATS_DATA = [
  { label: "Elite Athletes Equipped", to: 12400, suffix: "+", icon: Activity },
  { label: "Data Points / Second", to: 1200, suffix: "", icon: Cpu },
  { label: "Avg. Performance Gain", to: 34, suffix: "%", icon: TrendingUp },
  { label: "Recovery Time Reduction", to: 40, suffix: "%", icon: Timer },
  { label: "Countries Deployed", to: 58, suffix: "", icon: Radio },
  { label: "Scientific Publications", to: 127, suffix: "+", icon: BarChart3 },
]

const PRICING = [
  {
    name: "Athlete", price: "$149", period: "/mo", highlight: false,
    desc: "For competitive amateur and semi-professional athletes.",
    features: ["Neural Stride hardware included", "Real-time gait analytics", "Weekly performance reports", "STRYDE mobile app", "Email support", "1 athlete profile"],
  },
  {
    name: "Elite", price: "$349", period: "/mo", highlight: true,
    desc: "For professional athletes and Olympic-tier competitors.",
    features: ["APEX PRO X1 exoskeleton included", "CRYO RECOVERY module", "Live coaching dashboard", "Biomechanics AI assistant", "Priority 24/7 support", "5 athlete profiles", "Custom calibration session"],
  },
  {
    name: "Team", price: "$1,200", period: "/mo", highlight: false,
    desc: "For professional franchises and national programs.",
    features: ["Full hardware suite for 12 athletes", "Centralized team analytics", "White-label reporting", "Dedicated performance engineer", "On-site installation", "Unlimited athlete profiles", "API data export"],
  },
]

const FAQS_DATA = [
  { q: "How does the APEX PRO X1 exoskeleton work?", a: "APEX PRO X1 uses carbon-fibre actuators in concert with our proprietary muscle-synergy algorithm. Sensors embedded in the chassis read 1,200 data points per second and apply micro-force adjustments in real time, amplifying natural movement patterns without disrupting biomechanics. The system calibrates to your specific muscle-fibre composition within three sessions." },
  { q: "Is STRYDE technology approved for professional competition?", a: "APEX systems are currently approved under the World Athletics Technology-Assisted Performance category for training use. NEURAL STRIDE and CRYO RECOVERY carry no competition restrictions under any governing body, including the IOC, World Athletics, NBA, NFL, and FIFA." },
  { q: "How long does initial calibration take?", a: "Initial biomechanical profiling via the STRYDE app takes 22 minutes. The system auto-adapts across the first five training sessions and reaches full personalisation by session 12, at which point performance gains are typically most pronounced." },
  { q: "What is the battery life on APEX PRO X1?", a: "The integrated graphene-polymer cell delivers 8 hours of continuous use at maximum actuator output, or 14 hours in adaptive assist mode. Charging from 0–100% takes 45 minutes via the magnetic dock. A low-battery alert triggers at 20% with a recommended protocol to complete your session safely." },
  { q: "Does STRYDE work with existing coaching platforms?", a: "Yes. STRYDE exports via a REST API to TrainingPeaks, Garmin Connect, Whoop, Polar Flow, and all major coaching platforms. An open webhook system allows custom integrations. Our Team tier includes a dedicated integration engineer for bespoke setups." },
  { q: "What is the warranty and return policy?", a: "All hardware carries a 3-year comprehensive warranty including accidental damage in competitive settings. You may return any product within 90 days for a full refund if your measurable performance metrics do not improve from baseline. We stand behind the data." },
]

const NAV_LINKS = ["Systems", "Data", "Athletes", "Research", "Pricing"]

export default function StrydePerformancePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const [activeProduct, setActiveProduct] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#060810] text-white font-mono min-h-screen">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-[#060810]/95 backdrop-blur-xl border-b border-white/5 py-4" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <span className="text-lg font-black uppercase tracking-[0.18em]">
              <span className="text-[#00e5ff]">STRYDE</span> TECH
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[11px] uppercase tracking-[0.28em] text-white/45 hover:text-[#00e5ff] transition-all duration-200 cursor-pointer">{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="#pricing" className="cursor-pointer px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] text-[#00e5ff] border border-[#00e5ff]/30 hover:bg-[#00e5ff]/10 transition-all duration-200">
              View Pricing
            </a>
            <a href="#systems" className="cursor-pointer px-5 py-2.5 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.3em] font-black hover:bg-white transition-all duration-200">
              Get Access
            </a>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer text-white hover:text-[#00e5ff] transition-all duration-200">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#060810] border-l border-[#00e5ff]/10 w-72">
              <div className="flex flex-col gap-8 pt-12">
                {NAV_LINKS.map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="text-2xl font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#00e5ff] transition-all duration-200 cursor-pointer">{l}</a>
                ))}
                <Separator className="bg-white/5" />
                <a href="#pricing" className="cursor-pointer px-6 py-4 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.3em] font-black text-center">Get Access</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} id="systems" className="relative h-screen overflow-hidden flex items-end pb-28 px-6 md:px-16">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
            alt="Elite athlete performance"
            fill unoptimized
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060810]/70 via-transparent to-transparent" />
        </motion.div>

        {/* Scan line */}
        <motion.div
          animate={{ top: ["-2%", "102%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-px bg-[#00e5ff]/15 z-10 pointer-events-none"
          style={{ position: "absolute" }}
        />

        <div className="relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-7">
            <Badge className="bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-[9px] uppercase tracking-[0.4em] rounded-none px-3 py-1">Performance Tech · Series 2026</Badge>
            <Badge className="bg-white/5 border border-white/10 text-white/40 text-[9px] uppercase tracking-[0.3em] rounded-none px-3 py-1">Neural Biomechanics</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[8.5vw] font-black uppercase leading-[0.82] tracking-tight mb-6"
          >
            <span className="text-[#00e5ff]">Human</span><br />
            performance.<br />
            <span className="text-white/15" style={{ WebkitTextStroke: "1px rgba(0,229,255,0.35)" }}>Redefined.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="text-sm text-white/45 max-w-lg mb-10 leading-relaxed uppercase tracking-[0.15em]">
            Carbon-fibre exoskeletons. Neural gait analysis. Cryogenic recovery. The only integrated performance system trusted by 12,400+ elite athletes worldwide.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="flex flex-wrap gap-4">
            <a href="#systems" className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white transition-all duration-200">
              Explore Systems <ArrowRight className="w-4 h-4" />
            </a>
            <button className="cursor-pointer flex items-center gap-2 px-8 py-4 border border-[#00e5ff]/25 text-[#00e5ff] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-[#00e5ff]/8 transition-all duration-200">
              <Play className="w-3.5 h-3.5" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute right-8 md:right-16 bottom-28 hidden lg:flex flex-col gap-3 z-10">
          {[
            { label: "Peak Power Increase", val: "+34%", color: "#00e5ff" },
            { label: "Recovery Acceleration", val: "−40%", color: "#00e5ff" },
            { label: "Gait Latency", val: "2ms", color: "#00e5ff" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.15 }}
              className="bg-[#060810]/80 backdrop-blur-xl border border-[#00e5ff]/15 px-5 py-3 flex items-center gap-4"
            >
              <span className="text-2xl font-black text-[#00e5ff]">{stat.val}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-20 px-6 md:px-16 bg-[#00e5ff]/4 border-y border-[#00e5ff]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {STATS_DATA.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <s.icon className="w-4 h-4 text-[#00e5ff]/40 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-black text-[#00e5ff] mb-1">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 leading-snug">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCT FEATURES TABS ── */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto" id="systems">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-3">2026 Performance Suite</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4">Three Systems.<br />One Organism.</h2>
          <p className="text-sm text-white/35 max-w-xl mb-16 leading-relaxed uppercase tracking-[0.12em]">Each product in the STRYDE ecosystem is built to perform independently — and designed to compound exponentially when used together.</p>
        </Reveal>
        <Tabs defaultValue="apex" className="w-full">
          <TabsList className="bg-transparent border border-[#00e5ff]/10 rounded-none p-0 mb-12 w-full md:w-auto flex">
            {[
              { val: "apex", label: "APEX PRO X1", icon: Bolt },
              { val: "neural", label: "NEURAL STRIDE", icon: Activity },
              { val: "cryo", label: "CRYO RECOVERY", icon: Gauge },
            ].map(({ val, label, icon: Icon }) => (
              <TabsTrigger key={val} value={val} className="cursor-pointer rounded-none flex-1 md:flex-none px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white/35 data-[state=active]:bg-[#00e5ff] data-[state=active]:text-[#060810] data-[state=active]:font-black transition-all duration-200 flex items-center gap-2">
                <Icon className="w-3.5 h-3.5" />{label}
              </TabsTrigger>
            ))}
          </TabsList>
          {[
            {
              val: "apex", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
              title: "APEX PRO X1 Exoskeleton", price: "$3,499", stat: "+34% Peak Power",
              desc: "Carbon-fibre actuators driven by our proprietary muscle-synergy algorithm. 1,200 data points per second applied as real-time micro-force corrections that amplify your natural movement patterns at the neuromuscular level.",
              bullets: ["12 carbon-fibre actuators per leg segment", "Real-time biomechanical feedback at 1,200Hz", "Fully adaptive to individual muscle-fibre profiles", "World Athletics approved for training use", "8–14 hour battery with 45-min rapid charge"],
              progress: [["Peak Force Output", 94], ["Adaptive Accuracy", 98], ["Energy Recovery", 87], ["Comfort Score", 92]],
            },
            {
              val: "neural", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
              title: "NEURAL STRIDE Running Analysis", price: "$899", stat: "2ms Gait Latency",
              desc: "48 inertial measurement units embedded in lightweight insoles and leg bands capture every millisecond of your stride cycle. Neural Stride translates raw biomechanical data into live coaching recommendations mid-run.",
              bullets: ["48 IMUs across 6 body segments", "2ms real-time gait latency", "Cadence, ground contact, vertical oscillation", "IP68 waterproof — all weather, all terrain", "Syncs to TrainingPeaks, Garmin, Polar, Whoop"],
              progress: [["Latency", 99], ["Measurement Accuracy", 97], ["Battery Life", 88], ["Sensor Coverage", 96]],
            },
            {
              val: "cryo", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
              title: "CRYO RECOVERY System", price: "$1,250", stat: "−40% Recovery Time",
              desc: "Precision cryotherapy calibrated to your tissue temperature in real time. The only recovery system that adapts its protocol based on your current HRV and lactate proxy data, delivering the optimal thermal dose — no more, no less.",
              bullets: ["Adaptive temperature range: −5°C to +15°C", "HRV-linked protocol adjustment", "12-minute standard recovery cycle", "Voice and app control", "Unlimited sessions, no consumables"],
              progress: [["Recovery Acceleration", 96], ["HRV Improvement", 91], ["Tissue Temp Accuracy", 99], ["Protocol Adaptability", 94]],
            },
          ].map(({ val, img, title, price, stat, desc, bullets, progress }) => (
            <TabsContent key={val} value={val} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/3] overflow-hidden border border-[#00e5ff]/10">
                  <Image src={img} alt={title} fill unoptimized className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060810]/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#00e5ff] text-[#060810] rounded-none text-[9px] uppercase tracking-[0.3em] font-black px-3 py-1">{stat}</Badge>
                  </div>
                  <div className="absolute bottom-5 right-5 text-2xl font-black text-[#00e5ff]">{price}</div>
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">{title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-8">{desc}</p>
                  <ul className="space-y-3 mb-10">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[11px] text-white/60 uppercase tracking-[0.12em]">
                        <Check className="w-3.5 h-3.5 text-[#00e5ff] mt-0.5 shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-4 mb-10">
                    {progress.map(([label, val]) => (
                      <div key={label}>
                        <div className="flex justify-between text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2">
                          <span>{label}</span><span className="text-[#00e5ff]">{val}%</span>
                        </div>
                        <Progress value={val as number} className="h-0.5 bg-white/8 [&>div]:bg-[#00e5ff]" />
                      </div>
                    ))}
                  </div>
                  <a href="#pricing" className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white transition-all duration-200">
                    Order System <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* ── PRODUCT CARDS GRID ── */}
      <section className="py-20 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <Card className="bg-transparent border-white/8 rounded-none overflow-hidden cursor-pointer group hover:border-[#00e5ff]/35 transition-all duration-200"
                onClick={() => setActiveProduct(i)}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.img} alt={p.name} fill unoptimized className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/25 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#00e5ff] text-[#060810] rounded-none text-[9px] font-black uppercase tracking-[0.25em] px-2 py-0.5">{p.badge}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#00e5ff]/45 mb-1">{p.category}</p>
                  <div className="flex justify-between items-end mb-3">
                    <h3 className="text-lg font-black uppercase tracking-[0.08em] text-white group-hover:text-[#00e5ff] transition-all duration-200">{p.name}</h3>
                    <span className="text-[#00e5ff] font-black text-sm">{p.price}</span>
                  </div>
                  <p className="text-[11px] text-white/35 leading-relaxed">{p.desc.slice(0, 80)}...</p>
                  <div className="flex items-center gap-2 mt-4 text-[9px] uppercase tracking-[0.3em] text-[#00e5ff]/50 cursor-pointer group-hover:text-[#00e5ff] transition-all duration-200">
                    View Details <ChevronRight className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCT MODAL ── */}
      <Dialog open={activeProduct !== null} onOpenChange={() => setActiveProduct(null)}>
        <DialogContent className="bg-[#0c1020] border border-[#00e5ff]/15 text-white max-w-2xl rounded-none p-0 overflow-hidden">
          {activeProduct !== null && (
            <>
              <div className="relative aspect-video">
                <Image src={PRODUCTS[activeProduct].img} alt={PRODUCTS[activeProduct].name} fill unoptimized className="object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1020] to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[#00e5ff] text-[#060810] rounded-none text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1">{PRODUCTS[activeProduct].stat}</Badge>
              </div>
              <div className="p-8">
                <DialogHeader>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#00e5ff]/45 mb-1">{PRODUCTS[activeProduct].category}</p>
                  <DialogTitle className="text-2xl font-black uppercase tracking-[0.1em] text-white">{PRODUCTS[activeProduct].name}</DialogTitle>
                  <p className="text-2xl font-black text-[#00e5ff]">{PRODUCTS[activeProduct].price}</p>
                </DialogHeader>
                <p className="text-sm text-white/45 leading-relaxed mt-4 mb-6">{PRODUCTS[activeProduct].desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-7">
                  {PRODUCTS[activeProduct].specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[10px] border-b border-white/5 pb-2">
                      <span className="text-white/30 uppercase tracking-[0.2em]">{k}</span>
                      <span className="text-white/65 font-bold">{v}</span>
                    </div>
                  ))}
                </div>
                <a href="#pricing" className="cursor-pointer w-full block text-center py-4 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white transition-all duration-200" onClick={() => setActiveProduct(null)}>
                  Order System
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-32 px-6 md:px-16 bg-[#0c1020] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-3 text-center">Verified Performance Data</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-16 text-center">Athletes Don't Lie.</h2>
          </Reveal>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="bg-[#060810] border-[#00e5ff]/10 rounded-none h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-[#00e5ff] fill-[#00e5ff]" />
                        ))}
                      </div>
                      <p className="text-sm text-white/55 leading-relaxed italic flex-1 mb-6">"{t.quote}"</p>
                      <Separator className="bg-white/5 mb-5" />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 rounded-none">
                          <AvatarFallback className="bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-black rounded-none">{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.25em] text-white font-black">{t.name}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 bg-[#060810] border-[#00e5ff]/20 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#060810] rounded-none transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-4 bg-[#060810] border-[#00e5ff]/20 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#060810] rounded-none transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-32 px-6 md:px-16" id="pricing">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-3 text-center">Access Tiers</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 text-center">Performance Has a Price.</h2>
            <p className="text-sm text-white/35 text-center max-w-md mx-auto mb-20 leading-relaxed uppercase tracking-[0.12em]">Hardware is included. Cancel anytime within 90 days if your metrics don't improve.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#00e5ff]/10">
            {PRICING.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div className={`p-8 h-full flex flex-col border-r border-[#00e5ff]/10 last:border-r-0 cursor-pointer transition-all duration-200 ${tier.highlight ? "bg-[#00e5ff]/5 border-[#00e5ff]/25" : "hover:bg-white/2"}`}>
                  {tier.highlight && (
                    <Badge className="bg-[#00e5ff] text-[#060810] rounded-none text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-5 w-fit">Recommended</Badge>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/35 mb-2">{tier.name}</p>
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-5xl font-black ${tier.highlight ? "text-[#00e5ff]" : "text-white"}`}>{tier.price}</span>
                    <span className="text-white/30 text-sm pb-2">{tier.period}</span>
                  </div>
                  <p className="text-[11px] text-white/35 leading-relaxed mb-8">{tier.desc}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[11px] text-white/55 uppercase tracking-[0.1em]">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tier.highlight ? "text-[#00e5ff]" : "text-white/35"}`} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`cursor-pointer w-full py-4 text-[10px] uppercase tracking-[0.35em] font-black transition-all duration-200 ${tier.highlight ? "bg-[#00e5ff] text-[#060810] hover:bg-white" : "border border-white/15 text-white hover:border-[#00e5ff]/50 hover:text-[#00e5ff]"}`}>
                    Get {tier.name}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#00e5ff]/40 mb-3">Specs & Intel</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-16">System FAQ</h2>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-0">
            {FAQS_DATA.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-white/5 border-t-0">
                <AccordionTrigger className="cursor-pointer text-left text-sm text-white/75 hover:text-[#00e5ff] hover:no-underline transition-all duration-200 py-6 uppercase tracking-[0.08em] font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/40 leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-32 px-6 md:px-16 relative overflow-hidden border-t border-[#00e5ff]/8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.06)_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#00e5ff]/40 mb-6">Pro · Elite · National · Olympic</p>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-white mb-5 leading-[0.85]">
              Train beyond<br />
              <span className="text-[#00e5ff]">human limits.</span>
            </h2>
            <p className="text-white/30 mb-12 text-[11px] tracking-[0.3em] uppercase max-w-sm mx-auto leading-relaxed">90-day performance guarantee. If your metrics don't improve, we refund everything.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#pricing" className="cursor-pointer flex items-center gap-2 px-12 py-5 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.35em] font-black hover:bg-white transition-all duration-200">
                Apply for Access <ArrowRight className="w-4 h-4" />
              </a>
              <button className="cursor-pointer flex items-center gap-2 px-12 py-5 border border-white/15 text-white text-[10px] uppercase tracking-[0.35em] font-black hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-200">
                Talk to a Specialist
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[#060810]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <span className="text-lg font-black uppercase tracking-[0.18em] mb-4 block">
                <span className="text-[#00e5ff]">STRYDE</span> TECH
              </span>
              <p className="text-[11px] text-white/30 leading-relaxed max-w-xs mb-6 uppercase tracking-[0.1em]">The integrated performance system trusted by the world's elite athletes. Neural biomechanics. Carbon actuation. Cryogenic recovery.</p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <button key={i} className="cursor-pointer w-8 h-8 border border-white/10 flex items-center justify-center text-white/30 hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-200">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Systems", links: ["APEX PRO X1", "NEURAL STRIDE", "CRYO RECOVERY", "STRYDE App"] },
              { title: "Company", links: ["About", "Research Lab", "Athletes", "Press"] },
              { title: "Support", links: ["Documentation", "Warranty", "Returns", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[9px] uppercase tracking-[0.4em] text-[#00e5ff]/40 mb-5 font-black">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="cursor-pointer text-[11px] uppercase tracking-[0.15em] text-white/30 hover:text-[#00e5ff] transition-all duration-200">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-white/5 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-white/20">
            <span><span className="text-[#00e5ff]/50">STRYDE</span> TECH · Performance Series 2026</span>
            <span>© 2026 Stryde Technologies Inc. All rights reserved.</span>
            <span className="flex gap-6">
              <a href="#" className="cursor-pointer hover:text-[#00e5ff] transition-all duration-200">Privacy</a>
              <a href="#" className="cursor-pointer hover:text-[#00e5ff] transition-all duration-200">Terms</a>
            </span>
          </div>
        </div>
      </footer>

      <style>{`::-webkit-scrollbar{width:4px;background:#060810}::-webkit-scrollbar-thumb{background:#00e5ff20}`}</style>
    </div>
  )
}
