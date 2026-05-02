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
  Activity, ArrowRight, BarChart2, ChevronDown, Lock, Menu,
  Shield, Terminal, TrendingDown, TrendingUp, X, Zap,
  Globe, Twitter, Github, Linkedin, Star, Check, AlertTriangle, Clock
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

function Counter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 80
    const t = setInterval(() => setCount(c => {
      const next = c + step
      if (next >= target) { clearInterval(t); return target }
      return next
    }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} onClick={onClick} className={`cursor-pointer ${className}`}>
      {children}
    </motion.button>
  )
}

const ASSETS = [
  { symbol: "BTC/USD", price: "67,432.80", change: "+3.24%", up: true, vol: "42.1B" },
  { symbol: "ETH/USD", price: "3,891.55", change: "+1.87%", up: true, vol: "18.6B" },
  { symbol: "SOL/USD", price: "182.40", change: "-0.93%", up: false, vol: "4.2B" },
  { symbol: "ARB/USD", price: "1.24", change: "+8.11%", up: true, vol: "920M" },
  { symbol: "AVAX/USD", price: "38.72", change: "-1.55%", up: false, vol: "2.1B" },
  { symbol: "INJ/USD", price: "28.40", change: "+12.4%", up: true, vol: "1.8B" },
]

const STATS = [
  { value: 400, suffix: "B+", label: "Monthly Volume" },
  { value: 2.1, suffix: "M+", label: "Registered Users", decimals: 1 },
  { value: 312, suffix: "+", label: "Trading Pairs" },
  { value: 99, suffix: ".97%", label: "Uptime SLA" },
  { value: 0.28, suffix: "ms", label: "Avg Execution", decimals: 2 },
  { value: 500, suffix: "M", label: "Insurance Coverage" },
]

const TESTIMONIALS = [
  { name: "Marcus Kovacs", role: "Head of Prop Desk, Nexus Capital Zurich", text: "KryptaX execution benchmarks across 11 institutional venues — nothing comes within 2x of this latency tier. The FIX 4.4 implementation is the cleanest I've seen in DeFi.", avatar: "MK", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", rating: 5 },
  { name: "Takashi Nakamura", role: "Quantitative Strategist, Arclight Capital Tokyo", text: "After migrating our VWAP execution to KryptaX, slippage dropped 31 basis points on average. The WebSocket stream stability is remarkable — not one disconnect in 14 months.", avatar: "TN", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", rating: 5 },
  { name: "James Osei", role: "Digital Asset Fund Manager, Meridian Ventures London", text: "MPC cold storage with real-time proof-of-reserve is the first implementation that makes institutional-grade custody feel native, not bolted on.", avatar: "JO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", rating: 5 },
  { name: "Elif Yilmaz", role: "CTO, Strata Algorithmic Trading Istanbul", text: "KryptaX REST and WebSocket APIs saved us 6 weeks of integration. The documentation is exceptional — every edge case documented with working examples.", avatar: "EY", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", rating: 5 },
  { name: "Dmitri Volkov", role: "Portfolio Director, Baltic Crypto Asset Management", text: "Running 200+ concurrent WebSocket streams with zero performance degradation. Co-location in Frankfurt cut our round-trip to 0.18ms. Exceptional.", avatar: "DV", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", rating: 5 },
]

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "",
    desc: "Individuals and casual traders",
    features: ["100 trades/day", "Spot trading only", "REST API access", "Standard order types", "Email support", "Mobile app"],
    highlight: false,
    cta: "Open Account",
  },
  {
    name: "Professional",
    price: "$299",
    period: "/mo",
    desc: "Active traders and small funds",
    features: ["Unlimited trades", "Spot + Perpetuals", "FIX & WebSocket API", "All order types incl. TWAP", "0.025% maker fee", "Dedicated account manager", "Priority execution queue", "Portfolio margin"],
    highlight: true,
    cta: "Start Free Trial",
  },
  {
    name: "Institutional",
    price: "Custom",
    period: "",
    desc: "Funds, market makers & HFT desks",
    features: ["Co-location access", "Sub-0.18ms round-trip", "Custom market-making tiers", "OTC desk access", "White-label API", "Compliance reporting suite", "99.99% SLA guarantee", "24/7 dedicated support"],
    highlight: false,
    cta: "Contact Sales",
  },
]

const FAQS = [
  { q: "What asset classes and instruments are supported?", a: "KryptaX supports 312+ spot pairs, 180+ perpetual futures with up to 100x leverage, quarterly futures, and European-style options on BTC, ETH, and SOL. Tokenized equity indices and synthetic commodities are available to verified institutional accounts." },
  { q: "How is custody handled for institutional-sized positions?", a: "Assets above $500K are automatically swept to MPC cold wallets with 3-of-5 threshold signing. All cold storage positions are covered by a $500M insurance policy underwritten through Lloyd's of London syndicate partners. Real-time proof-of-reserve is published every 4 hours." },
  { q: "What are the exact maker/taker fee structures?", a: "Retail accounts: 0.04% maker / 0.06% taker. Professional tier: 0.025% maker / 0.045% taker. Institutional accounts receive custom tiered schedules starting at $5M monthly volume — negative maker rebates available above $100M/month. Market-making agreements available on request." },
  { q: "What API protocols do you support for algorithmic trading?", a: "FIX 4.4, REST (OpenAPI 3.1 spec), and WebSocket (200 simultaneous streams per connection). Co-location is available in Frankfurt, Singapore, Tokyo, and New York. Average round-trip from Frankfurt co-lo is 0.18ms. SLA guarantees 0.3ms 99th percentile." },
  { q: "How do you handle regulatory compliance and KYC/AML?", a: "We are registered with FINMA (Switzerland), FCA (UK), and MAS (Singapore). Full KYC/AML pipeline with real-time OFAC and EU sanctions screening via Chainalysis. Travel Rule compliance for transfers above $1,000. Institutional clients receive a dedicated compliance officer." },
  { q: "Is there a testnet or sandbox environment for API integration?", a: "Yes. Our sandbox environment mirrors production with full order book depth, real-time market data feeds, and identical API schemas. Sandbox access is free for all account tiers. We also provide a Docker image for local development and CI/CD pipeline testing." },
]

const NAV_LINKS = ["Markets", "Trade", "Earn", "Institutional", "API", "Docs"]

export default function KryptaXPro() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  const MARQUEE = ["BTC +3.24%", "ETH +1.87%", "SOL -0.93%", "ARB +8.11%", "AVAX -1.55%", "MATIC +2.30%", "LINK +4.70%", "INJ +12.4%", "TIA +5.80%", "NEAR +1.20%", "BTC +3.24%", "ETH +1.87%", "SOL -0.93%", "ARB +8.11%"]

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#060c08] text-[#e8f5e9] min-h-screen font-mono selection:bg-[#00ff9d] selection:text-black">

      {/* TICKER */}
      <div className="overflow-hidden bg-[#040a06]/90 border-b border-[#00ff9d]/10 py-2.5 z-[60] relative">
        <motion.div animate={{ x: [0, -2800] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {MARQUEE.map((item, i) => {
            const up = item.includes("+")
            return (
              <span key={i} className={`text-[11px] font-bold flex-shrink-0 ${up ? "text-[#00ff9d]" : "text-[#ff4560]"}`}>{item}</span>
            )
          })}
        </motion.div>
      </div>

      {/* NAVBAR */}
      <nav className={`sticky top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-14 py-4 transition-all duration-200 border-b ${scrolled ? "bg-[#060c08]/98 backdrop-blur-xl border-[#00ff9d]/10 shadow-[0_4px_40px_rgba(0,255,157,0.04)]" : "bg-transparent border-transparent"}`}>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-7 h-7 bg-[#00ff9d] rounded flex items-center justify-center">
            <Activity className="w-4 h-4 text-black" />
          </div>
          <span className="text-base font-bold tracking-tight text-[#e8f5e9]">Krypta<span className="text-[#00ff9d]">X</span></span>
          <Badge className="hidden md:inline-flex bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20 text-[9px] tracking-widest px-2 py-0.5 rounded-none">BETA</Badge>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] text-[#e8f5e9]/40">
          {NAV_LINKS.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00ff9d] transition-all duration-200 cursor-pointer">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-[#e8f5e9]/50 hover:text-[#00ff9d] transition-all duration-200 cursor-pointer">Log In</button>
          <MagneticBtn onClick={() => setSignupOpen(true)} className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#00ff9d] text-black text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#00e68a] transition-all duration-200 rounded-sm">
            Start Trading <ArrowRight className="w-3 h-3" />
          </MagneticBtn>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer"><Menu className="w-5 h-5 text-[#e8f5e9]" /></button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#030806] border-l border-[#00ff9d]/10 flex flex-col justify-center">
              <div className="flex flex-col gap-8">
                {NAV_LINKS.map((item, i) => (
                  <motion.a key={item} href={`#${item.toLowerCase()}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} onClick={() => setMobileOpen(false)}
                    className="text-3xl font-bold text-[#e8f5e9] uppercase tracking-widest hover:text-[#00ff9d] transition-all duration-200 cursor-pointer">{item}</motion.a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-14 pt-16">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" alt="Trading interface" fill unoptimized className="object-cover opacity-[0.08]" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#060c08] via-transparent to-[#060c08]" />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,255,157,0.05)_0%,transparent_70%)]" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-5xl py-20 w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/70">Markets Open · 24/7/365 · 0 Downtime</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-[7.5vw] font-bold text-[#e8f5e9] leading-[0.88] mb-8 tracking-tight">
              Institutional Edge.<br />
              <span className="text-[#00ff9d]">Sub-Millisecond</span><br />
              Precision.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-[#e8f5e9]/45 leading-relaxed mb-10 max-w-xl">
              The trading infrastructure built for those who can&apos;t afford to lose an edge. Co-located across 12 global data centers, $400B+ monthly flow, and zero-compromise MPC custody.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-16">
              <MagneticBtn onClick={() => setSignupOpen(true)} className="flex items-center gap-2 px-8 py-4 bg-[#00ff9d] text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#00e68a] transition-all duration-200 shadow-[0_0_40px_rgba(0,255,157,0.2)] rounded-sm">
                Start Trading <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center gap-2 px-8 py-4 border border-[#00ff9d]/20 text-[#00ff9d]/70 text-[11px] uppercase tracking-[0.2em] hover:border-[#00ff9d]/60 hover:text-[#00ff9d] transition-all duration-200 cursor-pointer rounded-sm">
                <Terminal className="w-4 h-4" /> View API Docs
              </button>
            </div>
          </Reveal>

          {/* Floating asset cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {ASSETS.map((a, i) => (
              <Reveal key={a.symbol} delay={0.35 + i * 0.05}>
                <motion.div whileHover={{ borderColor: "rgba(0,255,157,0.35)", y: -4 }} className="border border-[#00ff9d]/8 p-4 hover:bg-[#00ff9d]/[0.02] transition-all duration-200 cursor-pointer bg-[#060c08]/80 rounded-sm">
                  <div className="text-[9px] text-[#e8f5e9]/30 uppercase tracking-[0.2em] mb-2">{a.symbol}</div>
                  <div className="text-sm font-bold text-[#e8f5e9] mb-1">${a.price}</div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${a.up ? "text-[#00ff9d]" : "text-[#ff4560]"}`}>
                    {a.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {a.change}
                  </div>
                  <div className="text-[9px] text-[#e8f5e9]/20 mt-1">Vol: {a.vol}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#030806] border-y border-[#00ff9d]/8 py-14 px-6 md:px-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 text-center">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="text-4xl font-bold text-[#00ff9d] mb-2 tabular-nums">
                <Counter target={s.value} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#e8f5e9]/30">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES TABS */}
      <section id="trade" className="px-6 md:px-14 py-24 max-w-7xl mx-auto">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-3">Infrastructure</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#e8f5e9] leading-tight mb-14">
            Built for<br /><span className="text-[#00ff9d]">Professionals.</span>
          </h2>
        </Reveal>
        <Tabs defaultValue="execution">
          <TabsList className="bg-[#00ff9d]/5 border border-[#00ff9d]/10 p-1 mb-10 rounded-sm h-auto flex-wrap gap-1">
            <TabsTrigger value="execution" className="text-[11px] uppercase tracking-widest data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black rounded-sm px-4 py-2 cursor-pointer transition-all duration-200">
              Execution
            </TabsTrigger>
            <TabsTrigger value="custody" className="text-[11px] uppercase tracking-widest data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black rounded-sm px-4 py-2 cursor-pointer transition-all duration-200">
              Custody
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-[11px] uppercase tracking-widest data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black rounded-sm px-4 py-2 cursor-pointer transition-all duration-200">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="execution">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#e8f5e9] mb-4">Sub-Millisecond Execution Engine</h3>
                <p className="text-[#e8f5e9]/45 text-sm leading-relaxed mb-6">Our matching engine processes 1.2M orders per second with deterministic sequencing. Smart order routing automatically selects the optimal execution path across 24 integrated liquidity venues.</p>
                <ul className="space-y-3">
                  {["0.28ms average round-trip from Frankfurt co-location", "FIX 4.4 protocol with full institutional support", "Market, Limit, Stop, Trailing Stop, TWAP, VWAP order types", "100x leverage on majors with portfolio margin netting", "Segregated client accounts — no rehypothecation"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[11px] text-[#e8f5e9]/60">
                      <Check className="w-3.5 h-3.5 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-[#00ff9d]/10 p-6 bg-[#030806] font-mono rounded-sm">
                <div className="text-[10px] text-[#00ff9d]/50 uppercase tracking-[0.3em] mb-4">// LIVE ORDER BOOK — BTC/USD</div>
                {[["67,450.00", "1.243 BTC", "ask"], ["67,445.00", "0.450 BTC", "ask"], ["67,432.80", "—", "mid"], ["67,420.10", "2.130 BTC", "bid"], ["67,418.50", "0.891 BTC", "bid"]].map(([price, size, side]) => (
                  <div key={price} className={`flex justify-between py-1.5 border-b border-[#e8f5e9]/4 text-[11px] ${side === "ask" ? "text-[#ff4560]/80" : side === "bid" ? "text-[#00ff9d]/80" : "text-[#e8f5e9]/30 font-bold text-[10px]"}`}>
                    <span className="font-bold">${price}</span>
                    <span className="opacity-60">{size}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-[#060c08] border border-[#00ff9d]/10 text-[11px]">
                  <span className="text-[#00ff9d]/60">EXEC</span> <span className="text-[#e8f5e9]/80">BUY 1.00 BTC @ MARKET</span> <span className="text-[#00ff9d]">FILLED 0.28ms</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custody">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#e8f5e9] mb-4">MPC Cold Storage & Insurance</h3>
                <p className="text-[#e8f5e9]/45 text-sm leading-relaxed mb-6">Multi-party computation wallets with threshold signing ensure no single party can access funds. 98% of assets are held in cold storage by default, with Lloyd&apos;s of London coverage.</p>
                <ul className="space-y-3">
                  {["3-of-5 threshold signing — no single point of failure", "$500M insurance via Lloyd's of London syndicate", "Real-time proof-of-reserve published every 4 hours", "Automatic cold sweep for balances above $500K", "Hardware Security Module (HSM) for key ceremonies", "SOC 2 Type II audited annually by Deloitte"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[11px] text-[#e8f5e9]/60">
                      <Shield className="w-3.5 h-3.5 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ icon: Shield, label: "Cold Storage", value: "98%" }, { icon: Lock, label: "Insurance Coverage", value: "$500M" }, { icon: AlertTriangle, label: "Security Incidents", value: "0" }, { icon: Clock, label: "Proof-of-Reserve", value: "4hr" }].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <Card className="bg-[#030806] border-[#00ff9d]/10 p-6">
                      <CardContent className="p-0 text-center">
                        <item.icon className="w-6 h-6 text-[#00ff9d] mx-auto mb-3" />
                        <div className="text-2xl font-bold text-[#e8f5e9] mb-1">{item.value}</div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#e8f5e9]/30">{item.label}</div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#e8f5e9] mb-4">Quantitative Analytics Suite</h3>
                <p className="text-[#e8f5e9]/45 text-sm leading-relaxed mb-6">On-chain and off-chain data fused into a single analytics layer. Liquidation cascade detection, funding rate heatmaps, and order flow imbalance — updated in real-time.</p>
                <ul className="space-y-3">
                  {["On-chain order flow imbalance scoring", "Funding rate heatmaps across 8 venues", "Liquidation cascade proximity alerts", "Open interest divergence signals", "Institutional-grade backtesting environment", "Custom Python/R SDK for quant research"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[11px] text-[#e8f5e9]/60">
                      <BarChart2 className="w-3.5 h-3.5 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                {[{ label: "BTC Funding Rate (8h)", val: 72 }, { label: "ETH Open Interest", val: 58 }, { label: "Cross-venue Arb Signal", val: 41 }, { label: "Liquidation Cascade Risk", val: 24 }].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] text-[#e8f5e9]/50 mb-1.5 uppercase tracking-widest">
                      <span>{item.label}</span><span className="text-[#00ff9d]">{item.val}%</span>
                    </div>
                    <Progress value={item.val} className="h-1.5 bg-[#00ff9d]/10 [&>div]:bg-[#00ff9d]" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="bg-[#030806] border-y border-[#00ff9d]/8 px-6 md:px-14 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-3">Trusted by Elite Traders</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#e8f5e9]">Those Who Trade<br />at the Institutional Tier.</h2>
          </Reveal>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="bg-[#060c08] border-[#00ff9d]/10 hover:border-[#00ff9d]/25 transition-all duration-200 h-full">
                      <CardContent className="p-7 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[#00ff9d] text-[#00ff9d]" />)}
                        </div>
                        <p className="text-[#e8f5e9]/55 text-[11px] leading-relaxed mb-6 italic flex-1">&ldquo;{t.text}&rdquo;</p>
                        <Separator className="bg-[#00ff9d]/8 mb-4" />
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 border border-[#00ff9d]/20">
                            <AvatarImage src={t.img} />
                            <AvatarFallback className="bg-[#00ff9d]/10 text-[#00ff9d] text-[10px] font-bold">{t.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-[#e8f5e9] text-xs font-bold">{t.name}</div>
                            <div className="text-[#00ff9d]/40 text-[10px] uppercase tracking-[0.15em]">{t.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-[#00ff9d]/10 border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/20 cursor-pointer transition-all duration-200" />
            <CarouselNext className="bg-[#00ff9d]/10 border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/20 cursor-pointer transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* PRICING */}
      <section id="institutional" className="px-6 md:px-14 py-24 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-3">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8f5e9]">Trade at Your Scale.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <motion.div whileHover={{ y: -6 }} className={`relative border rounded-sm p-8 transition-all duration-200 cursor-pointer ${plan.highlight ? "border-[#00ff9d]/50 bg-[#00ff9d]/[0.03] shadow-[0_0_60px_rgba(0,255,157,0.07)]" : "border-[#00ff9d]/8 hover:border-[#00ff9d]/25"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00ff9d] text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-sm">
                    Most Popular
                  </div>
                )}
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#00ff9d]/60 mb-3">{plan.name}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-[#e8f5e9]">{plan.price}</span>
                  <span className="text-[#e8f5e9]/30 text-sm pb-1">{plan.period}</span>
                </div>
                <p className="text-[11px] text-[#e8f5e9]/35 mb-6">{plan.desc}</p>
                <Separator className="bg-[#00ff9d]/8 mb-6" />
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[11px] text-[#e8f5e9]/60">
                      <Check className="w-3.5 h-3.5 text-[#00ff9d] mt-0.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-200 rounded-sm cursor-pointer ${plan.highlight ? "bg-[#00ff9d] text-black hover:bg-[#00e68a]" : "border border-[#00ff9d]/20 text-[#00ff9d]/70 hover:border-[#00ff9d]/60 hover:text-[#00ff9d]"}`}>
                  {plan.cta}
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-14 py-20 max-w-4xl mx-auto">
        <Reveal className="mb-12">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#00ff9d]/60 block mb-3">Documentation</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e8f5e9]">Technical Q&amp;A.</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-2">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`f${i}`} className="border border-[#00ff9d]/8 rounded-sm overflow-hidden">
              <AccordionTrigger className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#e8f5e9] hover:text-[#00ff9d] hover:bg-[#00ff9d]/[0.02] transition-all duration-200 cursor-pointer [&[data-state=open]]:text-[#00ff9d]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-[#e8f5e9]/40 text-[11px] leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA BANNER */}
      <section className="px-6 md:px-14 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(0,255,157,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d]/8 border border-[#00ff9d]/15 text-[#00ff9d] text-[10px] uppercase tracking-[0.3em] mb-8 rounded-sm">
              <span className="w-1.5 h-1.5 bg-[#00ff9d] rounded-full animate-pulse" />
              Institutional Onboarding Available
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-[#e8f5e9] mb-6 leading-tight tracking-tight">
              Ready to<br /><span className="text-[#00ff9d]">Execute?</span>
            </h2>
            <p className="text-[#e8f5e9]/40 mb-10 leading-relaxed text-sm max-w-md mx-auto">
              Create an account in under 3 minutes. Full KYC, institutional onboarding, and co-location access available from day one.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticBtn onClick={() => setSignupOpen(true)} className="flex items-center justify-center gap-2 px-10 py-4 bg-[#00ff9d] text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#00e68a] transition-all duration-200 shadow-[0_0_40px_rgba(0,255,157,0.2)] rounded-sm">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center justify-center gap-2 px-10 py-4 border border-[#00ff9d]/20 text-[#00ff9d]/70 text-[11px] uppercase tracking-[0.2em] hover:border-[#00ff9d]/60 hover:text-[#00ff9d] transition-all duration-200 cursor-pointer rounded-sm">
                <BarChart2 className="w-4 h-4" /> Institutional Inquiry
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030806] border-t border-[#00ff9d]/8 py-14 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="w-6 h-6 bg-[#00ff9d] rounded flex items-center justify-center"><Activity className="w-3.5 h-3.5 text-black" /></div>
                <span className="font-bold text-[#e8f5e9]">Krypta<span className="text-[#00ff9d]">X</span></span>
              </div>
              <p className="text-[10px] text-[#e8f5e9]/25 leading-relaxed">Institutional-grade crypto infrastructure. FINMA · FCA · MAS registered.</p>
            </div>
            {[
              { title: "Platform", links: ["Markets", "Trade", "Earn", "API", "Docs"] },
              { title: "Institutional", links: ["Co-location", "Market Making", "OTC Desk", "Compliance"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Security", "Status"] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#00ff9d]/40 mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-[11px] text-[#e8f5e9]/30 hover:text-[#00ff9d] transition-all duration-200 cursor-pointer">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-[#00ff9d]/8 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-[#e8f5e9]/20 uppercase tracking-[0.2em]">© 2026 KryptaX Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin, Globe].map((Icon, i) => (
                <button key={i} className="w-8 h-8 border border-[#00ff9d]/10 flex items-center justify-center hover:border-[#00ff9d]/40 hover:text-[#00ff9d] text-[#e8f5e9]/30 transition-all duration-200 cursor-pointer rounded-sm">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#ff4560]/30 uppercase tracking-[0.15em]">Trading involves risk of loss · Not financial advice</p>
          </div>
        </div>
      </footer>

      {/* SIGNUP DIALOG */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="bg-[#080f0a] border border-[#00ff9d]/15 rounded-sm max-w-md text-[#e8f5e9] shadow-[0_0_80px_rgba(0,255,157,0.05)]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#e8f5e9]">Start Trading in Minutes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {[["Email", "email", "trader@example.com"], ["Password", "password", "••••••••••"], ["Referral Code", "text", "Optional"]].map(([label, type, placeholder]) => (
              <div key={label}>
                <label className="text-[10px] uppercase tracking-[0.25em] text-[#e8f5e9]/35 block mb-2">{label}</label>
                <input type={type} placeholder={placeholder} className="w-full bg-[#e8f5e9]/4 border border-[#00ff9d]/12 text-[#e8f5e9] placeholder-[#e8f5e9]/20 px-4 py-3 text-sm focus:outline-none focus:border-[#00ff9d]/50 transition-all duration-200 font-mono rounded-sm" />
              </div>
            ))}
            <button className="w-full py-4 bg-[#00ff9d] text-black font-bold text-sm uppercase tracking-[0.15em] hover:bg-[#00e68a] transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer rounded-sm">
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-[#e8f5e9]/25 leading-relaxed">By continuing you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#060c08}::-webkit-scrollbar-thumb{background:#00ff9d55}`}</style>
    </div>
  )
}
