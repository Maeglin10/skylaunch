"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
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
import { X, Menu, ChevronDown, ArrowRight, PieChart, TrendingUp, Lock, Shield, Check, Star, Apple, Smartphone } from "lucide-react"

function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} >
      {children}
    </motion.div>
  )
}

function Counter({ target, suffix="" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = Math.ceil(target / 60)
    const t = setInterval(() => setCount(c => Math.min(c + step, target)), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className="" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * 0.35)
    y.set((e.clientY - r.top - r.height/2) * 0.35)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={className}>{children}</motion.button>
}

const integrations = [
  { name: "Stripe", logo: "💳" },
  { name: "Plaid", logo: "🔗" },
  { name: "TaxJar", logo: "📊" },
  { name: "Coinbase", logo: "₿" },
  { name: "Wise", logo: "🌍" },
  { name: "Nasdaq", logo: "📈" },
]

const faqs = [
  { q: "How secure is my data?", a: "Military-grade 256-bit encryption, SOC2 certification, FDIC insurance, and zero-knowledge architecture ensure your data is safer than a bank." },
  { q: "What are the fees?", a: "Starter: free. Pro: $7.99/mo with unlimited features. Family: $14.99/mo for up to 5 members." },
  { q: "Can I sync multiple banks?", a: "Yes. Unlimited bank accounts across all institutions. Real-time sync with Plaid integration." },
  { q: "How does tax optimization work?", a: "AI analyzes your transactions to identify deductions, tax-loss harvesting opportunities, and filing strategies." },
]

export default function ClearpathFinance() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("budget")
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [email, setEmail] = useState("")
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const tabs = [
    { id: "budget", name: "Budget", icon: PieChart, desc: "Real-time spending insights & analytics" },
    { id: "invest", name: "Invest", icon: TrendingUp, desc: "Portfolio tracking & growth strategies" },
    { id: "plan", name: "Plan", icon: TrendingUp, desc: "Retirement & milestone goal planning" },
    { id: "tax", name: "Tax", icon: Shield, desc: "Tax optimization & filing strategies" },
  ]

  const plans = [
    { name: "Starter", price: "Free", features: ["Budget tracking", "Bank sync", "Basic insights", "Limited to 1 account"] },
    { name: "Pro", price: "$7.99", period: "/mo", features: ["Everything in Starter", "Unlimited accounts", "Investment tracking", "Tax tools", "Priority support", "Advanced analytics"] },
    { name: "Family", price: "$14.99", period: "/mo", features: ["Everything in Pro", "Up to 5 members", "Shared budgets", "Family analytics", "Inheritance planning"] },
  ]

  return (
    <div style={{ backgroundColor: "#050d14", color: "#ffffff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(5,13,20,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #0891b230" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#0891b2", letterSpacing: "-0.02em" }}>CLEARPATH</h1>
          <div style={{ display: "none", gap: "2.5rem" }} className="md:flex">
            {["Features", "Security", "Pricing", "App"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#ffffff", opacity: 0.7, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button style={{ display: "none", cursor: "pointer", background: "none", border: "none", padding: 0 }} className="md:hidden">
                <Menu size={24} color="#0891b2" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "#050d14" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
                {["Features", "Security", "Pricing", "App"].map((item) => (
                  <a key={item} href="#" style={{ fontSize: "1rem", fontWeight: "600", color: "#0891b2", textDecoration: "none" }}>{item}</a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HERO */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0891b215 0%, #38bdf815 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.85rem", fontWeight: "900", letterSpacing: "0.12em", color: "#38bdf8", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>
              Personal Finance Platform
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: "clamp(2.5rem, 12vw, 7rem)", fontWeight: "900", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "900px" }}>
              Your Money, <span style={{ color: "#0891b2" }}>Simplified</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.1rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "650px" }}>
              Budget, invest, plan, and optimize taxes—all in one beautiful app. Trusted by 2M+ users managing $50B in assets.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <ChevronDown size={28} style={{ color: "#0891b2" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* FEATURE TABS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Core Features</h2>
          </Reveal>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList style={{ display: "flex", justifyContent: "center", gap: "1rem", backgroundColor: "transparent", padding: "1rem", flexWrap: "wrap" }}>
              {tabs.map((tab) => {
                const IconComp = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id} style={{ padding: "0.75rem 1.5rem", borderRadius: "0.35rem" }}>
                    <IconComp size={18} style={{ marginRight: "0.5rem" }} />
                    {tab.name}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "3rem",
                    backgroundColor: "#0f172a",
                    borderRadius: "1rem",
                    border: "1px solid #1e293b",
                    textAlign: "center",
                    marginTop: "2rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "1rem", color: "#0891b2" }}>{tab.name}</h3>
                  <p style={{ opacity: 0.8, marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
                    {tab.desc}
                  </p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "2rem",
                    marginBottom: "2rem",
                  }}>
                    {[
                      "Real-time sync",
                      "AI insights",
                      "Custom alerts",
                      "Export data",
                    ].map((feature, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div style={{ padding: "1.5rem", backgroundColor: "#050d14", borderRadius: "0.5rem", border: "1px solid #1e293b" }}>
                          <Check size={24} style={{ color: "#0891b2", marginBottom: "0.5rem" }} />
                          <p style={{ fontWeight: "600", fontSize: "0.95rem" }}>{feature}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* SECURITY BADGES */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0f172a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Bank-Grade Security</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { name: "256-Bit Encryption", icon: Lock, desc: "Military-grade data protection" },
              { name: "SOC2 Type II", icon: Shield, desc: "Third-party audited security" },
              { name: "FDIC Insured", icon: Check, desc: "Your money is protected" },
              { name: "2FA Protection", icon: Shield, desc: "Multi-factor authentication" },
            ].map((badge, i) => {
              const IconComp = badge.icon
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                      padding: "2rem",
                      backgroundColor: "#050d14",
                      borderRadius: "0.75rem",
                      border: "1px solid #1e293b",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "#0891b2", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                      <IconComp size={32} />
                    </div>
                    <p style={{ fontWeight: "700", marginBottom: "0.5rem" }}>{badge.name}</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>{badge.desc}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {[
            { label: "Active Users", value: 2, suffix: "M" },
            { label: "Assets Managed", value: 50, suffix: "B" },
            { label: "Uptime", value: 99.9, suffix: "%" },
            { label: "App Rating", value: 4.9, suffix: "★" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.8rem", fontWeight: "900", marginBottom: "0.5rem", color: "#0891b2" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p style={{ fontSize: "0.8rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600" }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING CARDS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0f172a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Simple, Transparent Pricing</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {plans.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                  style={{
                    padding: "2.5rem",
                    backgroundColor: selectedPlan === plan.name.toLowerCase() ? "#0891b2" : "#050d14",
                    borderRadius: "0.75rem",
                    border: selectedPlan === plan.name.toLowerCase() ? "2px solid #0891b2" : "2px solid #1e293b",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "900", marginBottom: "1rem" }}>{plan.name}</h3>
                  <div style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "0.5rem" }}>
                    {plan.price} <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>{plan.period}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2rem" }}>
                    {plan.features.map((feature, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontSize: "0.9rem" }}>
                        <Check size={18} style={{ marginTop: "0.1rem", flexShrink: 0 }} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem", textAlign: "center" }}>Connect Anything</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.6, textAlign: "center", marginBottom: "3rem" }}>Works with all major financial institutions and apps</p>
          </Reveal>

          <motion.div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {integrations.map((int, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    padding: "1.5rem 2rem",
                    backgroundColor: "#0f172a",
                    borderRadius: "0.5rem",
                    border: "1px solid #1e293b",
                    textAlign: "center",
                    minWidth: "120px",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{int.logo}</div>
                  <p style={{ fontSize: "0.9rem", fontWeight: "700" }}>{int.name}</p>
                </motion.div>
              </Reveal>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0f172a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Trusted by Millions</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { quote: "Clearpath saved me $8,000 in taxes last year. The AI recommendations are incredible.", author: "James Park", role: "Business Owner", rating: 5 },
              { quote: "Finally, a financial app that just works. The UI is beautiful and the insights are actionable.", author: "Sarah Chen", role: "Software Engineer", rating: 5 },
              { quote: "Switched from 3 different apps to Clearpath. One dashboard for everything.", author: "Michael Rodriguez", role: "Investor", rating: 5 },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "#050d14",
                    borderLeft: "3px solid #0891b2",
                    borderRadius: "0.25rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="#0891b2" color="#0891b2" />
                    ))}
                  </div>
                  <p style={{ fontSize: "1rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <p style={{ fontWeight: "900", fontSize: "0.95rem" }}>— {t.author}</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.5 }}>{t.role}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Common Questions</h2>
          </Reveal>

          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger style={{ fontSize: "1rem", fontWeight: "700", padding: "1.25rem", color: "white" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{ padding: "0 1.25rem 1.25rem", fontSize: "0.95rem", opacity: 0.8, color: "rgba(255,255,255,0.8)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0f172a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem" }}>Get Clearpath Today</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.7, marginBottom: "3rem" }}>
              Available on iOS and Android. Start free, upgrade anytime.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.9rem 2rem",
                  backgroundColor: "#0891b2",
                  color: "white",
                  fontWeight: "700",
                  borderRadius: "0.35rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <Apple size={20} /> App Store
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.9rem 2rem",
                  backgroundColor: "#0891b2",
                  color: "white",
                  fontWeight: "700",
                  borderRadius: "0.35rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <Smartphone size={20} /> Google Play
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem" }}>Start Your Financial Journey</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.7, marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
              Join 2M+ users who've taken control of their finances. No credit card required.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.9rem 2.25rem",
                  backgroundColor: "#0891b2",
                  color: "white",
                  fontWeight: "900",
                  fontSize: "0.9rem",
                  borderRadius: "0.35rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  gap: "0.75rem",
                  alignItems: "center",
                  textTransform: "uppercase",
                }}
              >
                Start Free <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.9rem 2.25rem",
                  backgroundColor: "transparent",
                  color: "#0891b2",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  border: "2px solid #0891b2",
                  borderRadius: "0.35rem",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                Book Demo
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
