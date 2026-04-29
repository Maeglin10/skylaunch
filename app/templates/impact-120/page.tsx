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

const PRODUCTS = {
  Compute: { specs: ["4-96 vCPU", "Up to 768GB RAM", "NVMe SSD storage", "99.999% SLA"], perf: 95 },
  Storage: { specs: ["Object storage", "Block volumes", "Archive tier", "99.9999% durability"], perf: 98 },
  Networking: { specs: ["DDoS protection", "CDN included", "Global egress", "Low latency routing"], perf: 92 },
  Security: { specs: ["End-to-end encryption", "WAF included", "DLP tools", "Compliance ready"], perf: 99 },
  "AI Infra": { specs: ["GPU acceleration", "TPU support", "ML framework ready", "Auto-scaling"], perf: 97 },
}

const REGIONS = ["US-East", "US-West", "EU-West", "EU-Central", "APAC-Singapore", "MEA-Dubai", "AU-Sydney", "CA-Toronto"]

const COMPLIANCE = ["SOC2 Type II", "ISO 27001", "HIPAA", "FedRAMP", "GDPR", "PCI-DSS", "CCPA", "SOX"]

const LOGOS = [
  "https://images.unsplash.com/photo-1599720868235-4834c1b5d8c2?q=80&w=200",
  "https://images.unsplash.com/photo-1599720863235-4834c1b5d8c2?q=80&w=200",
  "https://images.unsplash.com/photo-1599720868235-4834c1b5d8c2?q=80&w=200",
  "https://images.unsplash.com/photo-1599720863235-4834c1b5d8c2?q=80&w=200",
  "https://images.unsplash.com/photo-1599720868235-4834c1b5d8c2?q=80&w=200",
  "https://images.unsplash.com/photo-1599720863235-4834c1b5d8c2?q=80&w=200",
]

const PRICING_TIERS = [
  { tier: "Pay-as-You-Go", desc: "Perfect for variable workloads", price: "From €0.001/hour", features: ["Flexible scaling", "No commitment", "Burst capacity", "Full features"] },
  { tier: "Reserved", desc: "Save up to 40%", price: "From €1,200/year", features: ["1-3 year terms", "Predictable costs", "Priority support", "Discount tiers"] },
  { tier: "Spot", desc: "Up to 70% savings", price: "Market rate", features: ["Spare capacity", "Flexible workloads", "Real-time pricing", "Instant scaling"] },
]

export default function AxiomCloudPage() {
  const [activeTab, setActiveTab] = useState("Compute")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const AnimatedNetworkNode = () => {
    const nodes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.cos((i / 8) * Math.PI * 2) * 150,
      y: Math.sin((i / 8) * Math.PI * 2) * 150,
    }))

    return (
      <svg viewBox="0 0 400 400" className="w-96 h-96" style={{ filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))" }}>
        {nodes.map((n, i) => (
          <motion.g key={n.id}>
            {nodes.map((target, j) => {
              if (i < j) {
                return (
                  <motion.line
                    key={`line-${i}-${j}`}
                    x1={200 + n.x}
                    y1={200 + n.y}
                    x2={200 + target.x}
                    y2={200 + target.y}
                    stroke="#3b82f6"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                )
              }
            })}
            <motion.circle
              cx={200 + n.x}
              cy={200 + n.y}
              r="8"
              fill="#3b82f6"
              animate={{ r: [8, 12, 8] }}
              transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
            />
          </motion.g>
        ))}
        <circle cx="200" cy="200" r="6" fill="#06b6d4" />
      </svg>
    )
  }

  return (
    <div style={{ background: "#060b14", color: "#fff" }}>
      {/* Hero with Network Animation */}
      <motion.section style={{ y: parallaxY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatedNetworkNode />
        </div>
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-black mb-6" style={{ color: "#06b6d4" }}>AXIOM CLOUD</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl text-gray-300 mb-8">Enterprise-Grade Infrastructure at Scale</p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-12 py-4 text-lg font-bold text-black" style={{ background: "#3b82f6", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
              GET STARTED FREE
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.section>

      {/* Product Tabs with Specs */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#06b6d4" }}>PRODUCTS</h2>
        </Reveal>
        <Tabs defaultValue="Compute" className="w-full">
          <TabsList className="flex justify-center gap-2 mb-12 bg-transparent flex-wrap">
            {Object.keys(PRODUCTS).map((cat) => (
              <TabsTrigger key={cat} value={cat} className="px-6 py-2 font-bold text-lg border border-blue-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(PRODUCTS).map(([cat, data]) => (
            <TabsContent key={cat} value={cat}>
              <Reveal>
                <Card className="bg-neutral-900/50 border border-blue-600/30">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-3xl font-black mb-6">{cat}</h3>
                        <ul className="space-y-4">
                          {data.specs.map((spec) => (
                            <li key={spec} className="flex items-center gap-3 text-gray-300">
                              <div className="w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-4">Performance Rating</p>
                        <Progress value={data.perf} className="h-4 mb-6" />
                        <Badge className="px-4 py-2 text-lg font-bold" style={{ background: "#06b6d4", color: "#060b14" }}>
                          {data.perf}% Optimized
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Global Regions Marquee */}
      <section className="py-24 px-6 overflow-hidden">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#06b6d4" }}>GLOBAL PRESENCE</h2>
        </Reveal>
        <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: [0, -1000] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {[...REGIONS, ...REGIONS].map((region, i) => (
            <div key={i} className="flex-shrink-0 px-6 py-3 rounded border border-blue-600/30 bg-blue-600/5">
              <p className="font-bold whitespace-nowrap">{region}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 10000, label: "Customers", suffix: "K" },
            { num: 99.999, label: "Uptime", suffix: "%" },
            { num: 150, label: "Regions", suffix: "" },
            { num: 2, label: "Avg Latency", suffix: "ms" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="text-5xl font-black mb-2" style={{ color: "#06b6d4" }}>
                  <Counter target={Math.floor(stat.num)} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#06b6d4" }}>SECURITY & COMPLIANCE</h2>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-6">
          {COMPLIANCE.map((cert, i) => (
            <Reveal key={cert} delay={i * 0.05}>
              <div className="p-6 rounded border border-blue-600/30 bg-blue-600/5 text-center">
                <Badge className="px-4 py-2 font-bold" style={{ background: "#06b6d4", color: "#060b14" }}>
                  {cert}
                </Badge>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Customer Logos Carousel */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#06b6d4" }}>TRUSTED BY LEADERS</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {LOGOS.map((logo, i) => (
              <CarouselItem key={i} className="md:basis-1/3">
                <Reveal>
                  <div className="relative h-32 rounded border border-blue-600/20 bg-blue-600/5 flex items-center justify-center">
                    <Image src={logo} alt="customer" fill className="object-cover opacity-50" />
                  </div>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Pricing Tabs */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#06b6d4" }}>PRICING</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((p, i) => (
            <Reveal key={p.tier} delay={i * 0.1}>
              <Card className={`border-2 transition-transform hover:scale-105 ${i === 0 ? "border-blue-600 bg-blue-600/10" : "border-blue-600/30 bg-neutral-900/50"}`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-2" style={{ color: "#06b6d4" }}>{p.tier}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{p.desc}</p>
                  <div className="text-3xl font-black mb-6">{p.price}</div>
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full" style={{ background: "#06b6d4" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#06b6d4" }}>FAQS</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "How do you handle migrations?", a: "Free migration services with zero downtime guarantee." },
            { q: "What's your SLA?", a: "99.999% uptime SLA with automated failover." },
            { q: "Do you support hybrid deployments?", a: "Yes, full hybrid and multi-cloud support." },
            { q: "How is egress priced?", a: "Competitive rates; free within our network." },
            { q: "Can you scale automatically?", a: "Yes, auto-scaling based on demand with custom policies." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-blue-600/20">
              <AccordionTrigger className="hover:text-blue-400">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-400">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6">Ready to Scale?</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn className="px-16 py-5 text-xl font-bold text-black" style={{ background: "#3b82f6", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
            START FREE TRIAL
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Sales Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-neutral-900 border border-blue-600/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black" style={{ color: "#06b6d4" }}>CONTACT SALES</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-2 rounded bg-neutral-800 border border-blue-600/30 text-white placeholder:text-gray-500" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-neutral-800 border border-blue-600/30 text-white placeholder:text-gray-500" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-2 rounded bg-neutral-800 border border-blue-600/30 text-white placeholder:text-gray-500" />
            <select className="w-full px-4 py-2 rounded bg-neutral-800 border border-blue-600/30 text-white">
              <option>Use case...</option>
              <option>Web hosting</option>
              <option>AI/ML</option>
              <option>Database</option>
              <option>Enterprise</option>
            </select>
            <button className="w-full py-3 font-black rounded text-black" style={{ background: "#3b82f6" }}>
              SCHEDULE DEMO
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
