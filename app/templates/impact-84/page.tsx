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
  Menu, X, ArrowRight, Check, Star, TrendingUp, PieChart, Shield, Lock,
  Zap, BarChart3, Wallet, Target, Bell, ChevronRight, Globe, Smartphone,
  Apple, Users, DollarSign, Activity, Award
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

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const t = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(t)
  }, [isInView, target])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const NAV_LINKS = ["Features", "Security", "Pricing", "Enterprise", "App"]

const STATS = [
  { label: "Assets Under Management", value: 50, suffix: "B+", prefix: "$", icon: DollarSign },
  { label: "Active Users", value: 2.4, suffix: "M", prefix: "", icon: Users },
  { label: "Average Annual Savings", value: 6800, suffix: "", prefix: "$", icon: TrendingUp },
  { label: "App Store Rating", value: 4.9, suffix: "★", prefix: "", icon: Star },
  { label: "Bank Connections", value: 12000, suffix: "+", prefix: "", icon: Globe },
  { label: "Uptime SLA", value: 99.98, suffix: "%", prefix: "", icon: Activity },
]

const FEATURES_TABS = [
  {
    id: "budget",
    label: "Smart Budget",
    icon: PieChart,
    headline: "AI-Powered Spending Intelligence",
    description: "Clearpath's machine learning engine analyzes every transaction across all your accounts in real time, surfacing patterns you'd never spot manually — and acting on them automatically.",
    bullets: [
      "Auto-categorizes 99.7% of transactions with <0.3% error rate",
      "Predicts upcoming bills 7 days in advance based on historical patterns",
      "Rolling 90-day cash flow forecast with confidence bands",
      "Smart alerts: 'You spend 31% more on Fridays. Here's why.'",
      "Zero-based budgeting templates for FIRE, debt payoff, and homeownership goals",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: "invest",
    label: "Portfolio",
    icon: BarChart3,
    headline: "Institutional-Grade Portfolio Analytics",
    description: "Track every investment across brokerages, crypto wallets, real estate, and private equity in one unified view — with the same analytics tools used by hedge fund analysts.",
    bullets: [
      "Real-time P&L across Fidelity, Schwab, Vanguard, Coinbase, and 300+ brokers",
      "Factor-based attribution: know exactly what's driving your returns",
      "Tax-loss harvesting opportunities surfaced automatically",
      "Monte Carlo retirement projections with 10,000-scenario modeling",
      "Rebalancing alerts when allocation drifts beyond your threshold",
    ],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: "tax",
    label: "Tax Optimizer",
    icon: Shield,
    headline: "Save Thousands Before April",
    description: "Our CPA-reviewed tax engine works year-round — not just in April. It identifies every deduction, tracks cost basis across accounts, and generates IRS-ready reports in seconds.",
    bullets: [
      "Identifies an average of $4,200 in missed deductions per household",
      "Wash-sale rule enforcement across all connected brokerage accounts",
      "1099 consolidation and estimated quarterly tax calculations",
      "Direct export to TurboTax, H&R Block, and TaxAct",
      "Multi-state tax optimization for remote workers and investors",
    ],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    id: "goals",
    label: "Goals",
    icon: Target,
    headline: "Milestone Planning That Adapts",
    description: "Set any financial goal — retirement, college fund, down payment, or sabbatical — and Clearpath builds a living roadmap that adjusts in real time as your life changes.",
    bullets: [
      "Dynamic contribution scheduling based on income variability",
      "Scenario planning: 'What if I earn 20% more in 3 years?'",
      "Linked to actual account balances — no manual updates needed",
      "Social goal sharing with trusted advisors or family members",
      "On-track / off-track indicators with one-tap corrective actions",
    ],
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80",
  },
]

const TESTIMONIALS = [
  {
    name: "James Park",
    role: "Founder, Coastal Ventures",
    avatar: "JP",
    rating: 5,
    quote: "Clearpath's tax optimizer found $11,200 in deductions my accountant missed. I paid for a decade of subscriptions in a single year.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
  {
    name: "Dr. Sarah Chen",
    role: "Physician & Real Estate Investor",
    avatar: "SC",
    rating: 5,
    quote: "Managing 6 brokerage accounts, 4 rental properties, and a 529 plan used to take me 4 hours a week. Now it's a 10-minute Monday morning review.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Marcus Williams",
    role: "Head of Engineering, Stripe",
    avatar: "MW",
    rating: 5,
    quote: "As an engineer I'm obsessed with data quality. Clearpath's transaction categorization accuracy is genuinely impressive — 99.4% on my accounts over 18 months.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    name: "Priya Nair",
    role: "CFO, Series B Startup",
    avatar: "PN",
    rating: 5,
    quote: "The Monte Carlo retirement modeling changed how I think about FIRE. I'm now projected to hit my number 6 years earlier than my previous plan assumed.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    name: "Thomas Erikson",
    role: "Private Equity Associate",
    avatar: "TE",
    rating: 5,
    quote: "I've tested Mint, YNAB, Personal Capital, and Monarch. Clearpath is the only platform where the AI insights are actually actionable, not just decorative.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
]

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    badge: null,
    description: "For individuals getting started with their financial journey.",
    features: [
      "Up to 2 bank accounts",
      "Basic budget tracking",
      "30-day transaction history",
      "Manual goal tracking",
      "Mobile app access",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    badge: "Most Popular",
    description: "For serious individuals who want full financial clarity.",
    features: [
      "Unlimited accounts & institutions",
      "AI-powered budget + forecasting",
      "Full investment portfolio tracking",
      "Tax optimization engine",
      "Unlimited goal planning",
      "Priority support (2h response)",
      "Data export (CSV, PDF, API)",
    ],
    cta: "Start 30-Day Trial",
    highlighted: true,
  },
  {
    name: "Family",
    price: "$19",
    period: "/mo",
    badge: null,
    description: "For households managing shared finances and long-term wealth.",
    features: [
      "Everything in Pro",
      "Up to 6 family members",
      "Shared household budgets",
      "Inheritance & estate planning tools",
      "Family investment dashboard",
      "Dedicated advisor matching",
      "White-glove onboarding",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
]

const FAQS = [
  {
    q: "How does Clearpath connect to my bank accounts?",
    a: "We use Plaid — the same infrastructure trusted by Venmo, American Express, and 7,000+ financial apps — to establish a read-only connection with your institutions. Clearpath never has write access to your accounts and cannot initiate transactions of any kind.",
  },
  {
    q: "Is my financial data encrypted and secure?",
    a: "Yes. All data is encrypted in transit with TLS 1.3 and at rest with AES-256. We are SOC 2 Type II certified, undergo quarterly penetration testing by Bishop Fox, and maintain a zero-knowledge architecture for credentials. Your bank passwords are never stored on our servers.",
  },
  {
    q: "How accurate is the AI transaction categorization?",
    a: "Our model achieves 99.4% categorization accuracy across 200+ merchant categories, trained on over 2 billion anonymized transactions. You can correct any category with one tap, and the model learns your preferences immediately.",
  },
  {
    q: "What brokerages and investment platforms does Clearpath support?",
    a: "We connect directly to Fidelity, Schwab, Vanguard, TD Ameritrade, E*TRADE, Interactive Brokers, Robinhood, Coinbase, Kraken, and 300+ additional institutions. For unsupported platforms, you can import via CSV or our REST API.",
  },
  {
    q: "Can I use Clearpath with a financial advisor?",
    a: "Absolutely. Our Advisor Access feature lets you grant read-only access to a licensed RIA or fee-only CFP so they can view your full financial picture without any additional manual reporting. Used by advisors at Facet Wealth, Betterment, and major RIA firms.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You own your data. Upon cancellation, you can export your entire history in CSV, JSON, or OFX formats. We retain data for 90 days post-cancellation for recovery purposes, then permanently delete it from all systems. You can request immediate deletion at any time.",
  },
  {
    q: "Does Clearpath work outside the United States?",
    a: "We currently support US, Canada, UK, and Australia with full bank connectivity. The platform is available in 40+ countries for manual transaction entry and investment tracking. EU support with Open Banking connectivity launches Q3 2026.",
  },
]

export default function ClearpathFinance() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("Pro")
  const [demoOpen, setDemoOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, 180])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])
  const navBg = useTransform(scrollY, [0, 80], ["rgba(5,13,20,0)", "rgba(5,13,20,0.97)"])

  return (
    <div
      ref={wrapperRef}
      style={{ backgroundColor: "#050d14", color: "#ffffff", minHeight: "100vh", overflowX: "hidden", scrollBehavior: "smooth" }}
    >
      {/* ── NAVBAR ── */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-cyan-900/30"
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#0891b2,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={18} color="#fff" />
            </div>
            <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>CLEARPATH</span>
          </Link>

          <div className="hidden md:flex" style={{ gap: "2.5rem", alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                className="transition-all duration-200 hover:text-white cursor-pointer">{l}</a>
            ))}
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => setDemoOpen(true)}
              style={{ padding: "0.55rem 1.4rem", background: "linear-gradient(135deg,#0891b2,#0e7490)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
              className="transition-all duration-200"
            >
              Get Demo
            </motion.button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer" style={{ background: "none", border: "none", color: "#38bdf8" }}>
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "#050d14", borderLeft: "1px solid #0891b230" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "3rem", padding: "0 1rem" }}>
                {NAV_LINKS.map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                    style={{ fontSize: "1.1rem", fontWeight: 700, color: "#38bdf8", textDecoration: "none" }}
                    className="cursor-pointer">{l}</a>
                ))}
                <button style={{ padding: "0.8rem 1.5rem", background: "#0891b2", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                  Start Free
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 68 }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroParallaxY, opacity: heroOpacity }}>
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Finance dashboard"
            fill
            style={{ objectFit: "cover", opacity: 0.12 }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0891b218 0%, transparent 70%)" }} />
        </motion.div>

        {/* Animated grid lines */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />

        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "6rem 2rem", width: "100%" }}>
          <div style={{ maxWidth: 760 }}>
            <Reveal>
              <Badge style={{ backgroundColor: "#0891b220", color: "#38bdf8", border: "1px solid #0891b240", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
                #1 Personal Finance Platform — 2025 App Store Awards
              </Badge>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "1.75rem" }}>
                The last financial<br />
                app you'll ever need.<br />
                <span style={{ background: "linear-gradient(90deg,#0891b2,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Seriously.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 560 }}>
                Budget, invest, plan, and optimize taxes — all synced in real time across every account you own.
                Trusted by 2.4 million users managing over $50 billion in assets.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.85rem 2rem", background: "linear-gradient(135deg,#0891b2,#0e7490)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", letterSpacing: "-0.01em" }}
                  className="transition-all duration-200"
                >
                  Start Free — No Card Needed <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setDemoOpen(true)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.85rem 2rem", background: "transparent", border: "1.5px solid #0891b250", borderRadius: 10, color: "#38bdf8", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
                  className="transition-all duration-200 hover:border-cyan-500"
                >
                  Watch 2-min Demo
                </motion.button>
              </div>
            </Reveal>
          </div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex"
            style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", flexDirection: "column", gap: "1rem" }}
          >
            {[
              { label: "Portfolio Today", value: "+$1,847", sub: "+3.2% vs last month", color: "#22c55e" },
              { label: "Monthly Savings", value: "$2,340", sub: "94% of goal reached", color: "#38bdf8" },
              { label: "Tax Saved YTD", value: "$4,210", sub: "AI-identified deductions", color: "#a78bfa" },
            ].map((card, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.4 }}
                style={{ padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, minWidth: 220 }}
              >
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{card.label}</p>
                <p style={{ fontSize: "1.5rem", fontWeight: 900, color: card.color, letterSpacing: "-0.02em" }}>{card.value}</p>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem" }}>{card.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "2rem" }}>
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ textAlign: "center" }}>
                  <Icon size={20} style={{ color: "#0891b2", margin: "0 auto 0.6rem" }} />
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#38bdf8", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "0.4rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section id="features" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0891b2", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Platform Features</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
              Four engines. One dashboard.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", marginBottom: "3.5rem", maxWidth: 560 }}>
              Every Clearpath feature is designed to work in concert — your budget informs your investments, your investments inform your taxes, your taxes inform your goals.
            </p>
          </Reveal>

          <Tabs defaultValue="budget">
            <TabsList style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "0.3rem", display: "flex", gap: "0.25rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {FEATURES_TABS.map(tab => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.id} value={tab.id}
                    style={{ borderRadius: 8, padding: "0.6rem 1.2rem", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", gap: "0.4rem", alignItems: "center" }}
                    className="transition-all duration-200"
                  >
                    <Icon size={15} />{tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {FEATURES_TABS.map(tab => (
              <TabsContent key={tab.id} value={tab.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}
                  className="grid-cols-1 md:grid-cols-2"
                >
                  <div>
                    <Badge style={{ backgroundColor: "#0891b215", color: "#38bdf8", border: "1px solid #0891b230", marginBottom: "1.25rem", fontWeight: 700 }}>
                      {tab.label}
                    </Badge>
                    <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
                      {tab.headline}
                    </h3>
                    <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
                      {tab.description}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {tab.bullets.map((b, i) => (
                        <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0891b220", border: "1px solid #0891b240", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                            <Check size={11} color="#38bdf8" />
                          </div>
                          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{b}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/10", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Image src={tab.image} alt={tab.label} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0891b210 0%, transparent 60%)" }} />
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── SECURITY SECTION ── */}
      <section id="security" style={{ padding: "8rem 2rem", background: "rgba(8,145,178,0.04)", borderTop: "1px solid rgba(8,145,178,0.1)", borderBottom: "1px solid rgba(8,145,178,0.1)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0891b2", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Security Infrastructure</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
                Safer than your bank. Audited annually.
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto" }}>
                Clearpath is built on the same infrastructure as Goldman Sachs Marcus and Chime. Your credentials never touch our servers.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
            {[
              { icon: Lock, title: "AES-256 Encryption", desc: "All data encrypted at rest and in transit via TLS 1.3. Equivalent to NSA Suite B standards." },
              { icon: Shield, title: "SOC 2 Type II", desc: "Annual third-party audits by Deloitte. Zero critical findings in 3 consecutive years." },
              { icon: Award, title: "FDIC Partner Accounts", desc: "Cash balances held at FDIC-insured partner banks. Up to $2.5M coverage via sweep networks." },
              { icon: Zap, title: "Zero-Knowledge Architecture", desc: "We use Plaid's tokenized connection. Your bank passwords are cryptographically inaccessible to us." },
              { icon: Bell, title: "Real-Time Fraud Alerts", desc: "Anomaly detection fires within 90 seconds of suspicious activity across all connected accounts." },
              { icon: Activity, title: "99.98% Uptime SLA", desc: "Geo-redundant infrastructure across AWS us-east-1 and us-west-2. Backed by a contractual SLA." },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <Card className="transition-all duration-200 cursor-pointer" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                    <CardContent style={{ padding: "1.75rem" }}>
                      <Icon size={24} style={{ color: "#0891b2", marginBottom: "1rem" }} />
                      <h3 style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.6rem" }}>{item.title}</h3>
                      <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0891b2", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Customer Stories</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>
                2.4 million people chose Clearpath.
              </h2>
            </div>
          </Reveal>
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent style={{ padding: "0 0.5rem" }}>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} style={{ paddingLeft: "1.5rem", flex: "0 0 380px" }}>
                  <Card style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, height: "100%" }}>
                    <CardContent style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                      </div>
                      <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.7, flex: 1 }}>"{t.quote}"</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <Avatar>
                          <AvatarImage src={t.img} alt={t.name} />
                          <AvatarFallback style={{ background: "#0891b2", color: "#fff", fontWeight: 700 }}>{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p style={{ fontWeight: 800, fontSize: "0.9rem" }}>{t.name}</p>
                          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2.5rem" }}>
              <CarouselPrevious className="cursor-pointer" style={{ position: "static", transform: "none", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }} />
              <CarouselNext className="cursor-pointer" style={{ position: "static", transform: "none", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }} />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "8rem 2rem", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0891b2", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Pricing</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
                Transparent. No surprises.
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)" }}>
                Start free. Upgrade when you're ready. Cancel anytime — we mean it.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem", alignItems: "start" }}>
            {PLANS.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedPlan(plan.name)}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    padding: "2.5rem",
                    borderRadius: 18,
                    border: plan.highlighted ? "2px solid #0891b2" : "1px solid rgba(255,255,255,0.08)",
                    background: plan.highlighted ? "linear-gradient(145deg,rgba(8,145,178,0.12),rgba(8,145,178,0.04))" : "rgba(255,255,255,0.03)",
                    position: "relative",
                  }}
                >
                  {plan.badge && (
                    <Badge style={{ position: "absolute", top: "-0.75rem", right: "1.5rem", background: "#0891b2", color: "#fff", fontWeight: 700, border: "none" }}>
                      {plan.badge}
                    </Badge>
                  )}
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>{plan.name}</p>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, color: plan.highlighted ? "#38bdf8" : "#fff" }}>{plan.price}</span>
                    {plan.period && <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem" }}>{plan.period}</span>}
                  </div>
                  <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem", lineHeight: 1.5 }}>{plan.description}</p>
                  <Separator style={{ borderColor: "rgba(255,255,255,0.08)", marginBottom: "2rem" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2.5rem" }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <Check size={15} style={{ color: "#0891b2", flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%", padding: "0.85rem",
                      background: plan.highlighted ? "linear-gradient(135deg,#0891b2,#0e7490)" : "rgba(255,255,255,0.07)",
                      border: plan.highlighted ? "none" : "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer"
                    }}
                    className="transition-all duration-200"
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0891b2", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>FAQ</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>
                Questions worth asking
              </h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <AccordionTrigger className="cursor-pointer transition-all duration-200" style={{ fontSize: "1rem", fontWeight: 700, padding: "1.5rem 0", color: "rgba(255,255,255,0.9)", textAlign: "left" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, paddingBottom: "1.5rem" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              padding: "5rem 4rem", borderRadius: 24,
              background: "linear-gradient(135deg, #0c2a3a 0%, #0e3347 50%, #0c2a3a 100%)",
              border: "1px solid rgba(8,145,178,0.25)",
              textAlign: "center", position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: "-80px", right: "-80px", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.18),transparent)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.1),transparent)", pointerEvents: "none" }} />
              <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#38bdf8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Get Started Today
              </p>
              <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
                Your financial clarity<br />starts in under 3 minutes.
              </h2>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", marginBottom: "3rem", maxWidth: 520, margin: "0 auto 3rem" }}>
                Connect your accounts, and Clearpath's AI immediately begins building your complete financial picture. Free forever. No credit card required.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.95rem 2.25rem", background: "linear-gradient(135deg,#0891b2,#0e7490)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: "1rem", cursor: "pointer" }}
                  className="transition-all duration-200"
                >
                  <Apple size={20} /> Download on App Store
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.95rem 2.25rem", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: "1rem", cursor: "pointer" }}
                  className="transition-all duration-200"
                >
                  <Smartphone size={20} /> Get on Google Play
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "5rem 2rem 3rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3,1fr)", gap: "4rem", marginBottom: "4rem" }} className="grid-cols-1 md:grid-cols-4">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#0891b2,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={18} color="#fff" />
                </div>
                <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff" }}>CLEARPATH</span>
              </div>
              <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 280 }}>
                The all-in-one personal finance platform. Trusted by 2.4M users managing $50B+ in assets.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                {["X", "Li", "IG", "YT"].map(s => (
                  <div key={s} className="cursor-pointer transition-all duration-200 hover:opacity-100" style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", opacity: 0.8 }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            {[
              { heading: "Product", links: ["Features", "Security", "Pricing", "Enterprise", "API"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "CCPA", "GDPR"] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "rgba(255,255,255,0.9)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.heading}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {col.links.map(l => (
                    <a key={l} href="#" className="cursor-pointer transition-all duration-200 hover:text-white" style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Separator style={{ borderColor: "rgba(255,255,255,0.06)", marginBottom: "1.5rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>© 2026 Clearpath Financial Inc. All rights reserved.</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>Not a registered investment advisor. See disclosures.</p>
          </div>
        </div>
      </footer>

      {/* ── DEMO DIALOG ── */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent style={{ background: "#0d1f2d", border: "1px solid rgba(8,145,178,0.3)", borderRadius: 16, maxWidth: 560 }}>
          <DialogHeader>
            <DialogTitle style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 900 }}>See Clearpath in Action</DialogTitle>
          </DialogHeader>
          <div style={{ padding: "1rem 0" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Book a personalized 20-minute walkthrough with a Clearpath financial specialist. We'll show you exactly how much you could save.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["name", "email", "company"].map(field => (
                <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} style={{ padding: "0.8rem 1rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.95rem", outline: "none" }} />
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => setDemoOpen(false)}
                style={{ padding: "0.9rem", background: "linear-gradient(135deg,#0891b2,#0e7490)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: "0.95rem", marginTop: "0.5rem" }}
                className="transition-all duration-200"
              >
                Book My Demo <ArrowRight size={16} style={{ display: "inline", marginLeft: 6 }} />
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
