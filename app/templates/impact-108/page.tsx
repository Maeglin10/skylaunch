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

function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>
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

export default function ClarityData() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const [showTrial, setShowTrial] = useState(false)
  const [dashboardBars, setDashboardBars] = useState([45, 78, 32, 91, 67, 54])

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardBars(prev => prev.map(() => Math.random() * 100))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const integrations = [
    { name: "Salesforce", logo: "SF" },
    { name: "HubSpot", logo: "HS" },
    { name: "Shopify", logo: "SH" },
    { name: "Stripe", logo: "ST" },
    { name: "PostgreSQL", logo: "PG" },
    { name: "BigQuery", logo: "BQ" },
  ]

  const pricingPlans = [
    { name: "Starter", price: "$49", features: ["5 data sources", "10M data points/mo", "Basic reports"] },
    { name: "Pro", price: "$149", features: ["Unlimited sources", "1B data points/mo", "Advanced dashboards", "Custom alerts"], badge: true },
    { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "99.99% SLA", "Dedicated support"] },
  ]

  const testimonials = [
    { text: "Clarity cut our data analysis time by 70%. Game changer.", company: "TechCorp", logo: "TC" },
    { text: "The best analytics platform we've used. Seamless integrations.", company: "DataViz Inc", logo: "DV" },
    { text: "Enterprise-grade insights at SaaS pricing. Incredible value.", company: "GrowthCo", logo: "GC" },
  ]

  return (
    <div className="bg-[#060b14] text-white min-h-screen overflow-x-hidden">
      {/* ANIMATED HERO */}
      <motion.section style={{ opacity, scale }} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2563eb]/20 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black mb-6">
            DATA CLARITY
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-2xl text-[#14b8a6] mb-12">
            Real-time analytics. Actionable insights. Enterprise scale.
          </motion.p>

          {/* LIVE DASHBOARD MOCKUP */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-black border-2 border-[#2563eb] p-12 rounded-xl">
            <div className="grid grid-cols-6 gap-4">
              {dashboardBars.map((height, i) => (
                <motion.div key={i} className="relative h-32 bg-[#1a2332] rounded border border-[#14b8a6]">
                  <motion.div animate={{ height: `${height}%` }} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2563eb] to-[#14b8a6]" transition={{ duration: 0.5 }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURES TABS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#0a1421]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">POWERFUL FEATURES</h2>
            <Tabs defaultValue="reports" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black border border-[#2563eb]">
                {["reports", "dashboards", "alerts", "integrations"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="uppercase text-sm font-bold text-[#14b8a6]">{tab}</TabsTrigger>
                ))}
              </TabsList>
              {[
                { id: "reports", title: "Custom Reports", desc: "Build and schedule reports in minutes. Export to any format." },
                { id: "dashboards", title: "Live Dashboards", desc: "Real-time visualizations with 50ms average query latency." },
                { id: "alerts", title: "Smart Alerts", desc: "Anomaly detection. Threshold monitoring. Instant notifications." },
                { id: "integrations", title: "Native Integrations", desc: "Connect 100+ data sources. API-first architecture." },
              ].map(feature => (
                <TabsContent key={feature.id} value={feature.id} className="mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-4xl font-black mb-6 text-[#14b8a6]">{feature.title}</h3>
                      <p className="text-xl text-gray-400 mb-8">{feature.desc}</p>
                      <ul className="space-y-4">
                        {["Point 1", "Point 2", "Point 3"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <Badge className="bg-[#2563eb]">✓</Badge>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="h-96 bg-gradient-to-br from-[#2563eb]/20 to-[#14b8a6]/20 rounded-xl border border-[#2563eb]" />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </Reveal>

      {/* INTEGRATIONS MARQUEE */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center">TRUSTED INTEGRATIONS</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {integrations.map((int, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 bg-[#0a1421] border border-[#2563eb] rounded-lg text-center">
                  <div className="w-12 h-12 bg-[#2563eb] rounded-lg mx-auto mb-3 flex items-center justify-center font-black text-sm">{int.logo}</div>
                  <p className="font-bold">{int.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* STATS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#0a1421]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "COMPANIES", value: 5000 },
                { label: "DATA POINTS", value: 1000000000, suffix: "B" },
                { label: "UPTIME", value: 99.9, suffix: "%" },
                { label: "AVG QUERY", value: 50, suffix: "ms" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <div className="text-4xl font-black text-[#2563eb]"><Counter target={stat.value} suffix={stat.suffix} /></div>
                    <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PRICING */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center">SIMPLE PRICING</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`p-8 rounded-xl border-2 ${plan.badge ? "border-[#14b8a6] bg-[#0a1421]" : "border-[#2563eb] bg-black"}`}>
                  {plan.badge && <Badge className="bg-[#14b8a6] text-black mb-4">POPULAR</Badge>}
                  <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                  <div className="text-4xl font-black text-[#2563eb] mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="text-gray-300">✓ {feat}</li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 font-black rounded transition ${plan.badge ? "bg-[#14b8a6] text-black hover:bg-white" : "bg-[#2563eb] text-white hover:bg-blue-600"}`}>
                    GET STARTED
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECURITY */}
      <Reveal>
        <section className="py-20 px-6 bg-[#0a1421]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-12">ENTERPRISE GRADE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["SOC2 Type II", "GDPR Compliant", "ISO 27001"].map((cert, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-8 bg-black border-2 border-[#2563eb] rounded-lg">
                  <div className="text-3xl font-black text-[#14b8a6] mb-2">✓</div>
                  <p className="font-bold">{cert}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS CAROUSEL */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">CUSTOMER LOVE</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testi, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/3">
                    <div className="p-8 bg-black border border-[#2563eb] rounded-xl h-full">
                      <p className="text-lg mb-6 italic">"{testi.text}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="border border-[#2563eb]">
                          <AvatarFallback className="bg-[#2563eb] text-white font-black">{testi.logo}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold">{testi.company}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="py-20 px-6 bg-[#0a1421]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12">FAQS</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "How do you protect data privacy?", a: "We're SOC2 Type II certified and GDPR compliant. All data is encrypted at rest and in transit." },
                { q: "Can I migrate existing data?", a: "Yes. We offer free migration support for all plans. Zero downtime guaranteed." },
                { q: "What are the API rate limits?", a: "Pro and Enterprise plans have unlimited API calls. Starter has 100K/month." },
                { q: "What's your support SLA?", a: "Enterprise: 1hr response. Pro: 4hrs. Starter: 24hrs via community." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#2563eb]">
                  <AccordionTrigger className="text-lg font-black hover:text-[#14b8a6]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-400">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-5xl font-black mb-6">START FREE TRIAL</h2>
        <p className="text-gray-400 mb-8 text-lg">No credit card required. Full access for 14 days.</p>
        <MagneticBtn onClick={() => setShowTrial(true)} className="px-8 py-4 bg-[#14b8a6] text-black font-black text-lg hover:bg-white transition rounded">
          CLAIM FREE TRIAL
        </MagneticBtn>
        <Dialog open={showTrial} onOpenChange={setShowTrial}>
          <DialogContent className="bg-[#0a1421] border-2 border-[#2563eb]">
            <DialogHeader>
              <DialogTitle className="text-[#14b8a6] text-2xl">START YOUR FREE TRIAL</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input type="email" placeholder="your@company.com" className="w-full p-3 bg-black border border-[#2563eb] text-white placeholder-gray-600 rounded" />
              <button className="w-full py-3 bg-[#14b8a6] text-black font-black hover:bg-white transition rounded">GET STARTED</button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
