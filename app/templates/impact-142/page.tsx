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
import { Building2, TrendingUp, Award, Globe, FileText, ChevronDown, ArrowRight, Lock } from "lucide-react"

const SERVICES = [
  { name: "Wealth Planning", description: "Strategic asset allocation & retirement optimization", min: "€2.5M+" },
  { name: "Investments", description: "Global equities, alternatives & direct deals", min: "€2.5M+" },
  { name: "Tax Optimization", description: "International tax structuring & efficiency", min: "€2.5M+" },
  { name: "Estate Planning", description: "Multi-generational wealth transfer", min: "€2.5M+" },
  { name: "Philanthropy", description: "Impact investing & charitable structures", min: "€1.0M+" },
]

const TEAM_MEMBERS = [
  { name: "Marcus Rothschild", role: "CFA, Founder", aum: "€2.1B", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Elena Rossi", role: "CFP, Senior Advisor", aum: "€1.8B", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { name: "James Chen", role: "CFA, Portfolio Manager", aum: "€1.5B", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
  { name: "Sophie Laurent", role: "CFP, Estate Specialist", aum: "€1.2B", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
]

const TESTIMONIALS = [
  { text: "Exceptional wealth management across 5 continents. Turned complexity into clarity.", company: "Luxury Retail" },
  { text: "25 years of consistent outperformance. These advisors understand true wealth.", company: "Manufacturing" },
  { text: "Estate planning saved us millions. Professional, discreet, exceptional.", company: "Family Office" },
]

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  )
}

const Counter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 90
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

const MagneticBtn = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * 0.3)
    y.set((e.clientY - r.top - r.height/2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
    onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

export default function AurumFinance() {
  const [activeTab, setActiveTab] = useState("wealth")
  const [openConsult, setOpenConsult] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-gradient-to-b from-[#070d14] via-[#0a1120] to-[#070d14] text-white min-h-screen font-sans">
      {/* Parallax Hero */}
      <motion.div style={{ opacity }} className="relative h-screen flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200"
          alt="Wealth Management"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d14] via-transparent to-[#070d14]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <h1 className="text-6xl md:text-7xl font-black mb-6" style={{ color: '#d4af37' }}>
              AURUM<br />WEALTH
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-8 font-light">
              Private wealth management for discerning clients. €5B+ in assets under management across 200 ultra-high-net-worth families.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-8 py-4 bg-[#d4af37] text-[#070d14] font-bold rounded-lg hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all">
              Schedule Consultation
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.div>

      {/* Service Tabs */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#d4af37' }}>Our Services</h2>
          <p className="text-slate-400 mb-12 text-lg">Comprehensive wealth solutions tailored to your needs</p>
        </Reveal>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-[#1e2d40]/50 p-2 rounded-lg mb-8">
            {SERVICES.map((svc) => (
              <TabsTrigger
                key={svc.name}
                value={svc.name.toLowerCase().replace(" ", "")}
                className="text-xs md:text-sm font-bold"
              >
                {svc.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICES.map((svc) => (
            <TabsContent key={svc.name} value={svc.name.toLowerCase().replace(" ", "")} className="space-y-6">
              <Reveal>
                <Card className="bg-[#1e2d40]/50 border-[#d4af37]/30 overflow-hidden group cursor-pointer hover:border-[#d4af37] transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{svc.name}</h3>
                        <p className="text-slate-400">{svc.description}</p>
                      </div>
                      <Badge className="bg-[#d4af37] text-[#070d14] font-bold">Min. {svc.min}</Badge>
                    </div>
                    <div className="pt-4 border-t border-[#d4af37]/20">
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4" style={{ color: '#d4af37' }} /> Strategic allocation</li>
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4" style={{ color: '#d4af37' }} /> Risk management</li>
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4" style={{ color: '#d4af37' }} /> Tax optimization</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Portfolio Allocation */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#d4af37' }}>Portfolio Allocation</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[
            { name: "Equities", value: 35 },
            { name: "Fixed Income", value: 28 },
            { name: "Alternatives", value: 22 },
            { name: "Real Assets", value: 15 },
          ].map((item, idx) => (
            <Reveal key={item.name} delay={idx * 0.1}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span className="text-[#d4af37] font-bold">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2 bg-[#1e2d40]" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#d4af37' }}>Our Team</h2>
          <p className="text-slate-400 mb-12 text-lg">Industry veterans with 25+ years average experience</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 0.1}>
              <Card className="bg-[#1e2d40]/50 border-[#d4af37]/30 hover:border-[#d4af37] transition-all group cursor-pointer">
                <CardContent className="p-6">
                  <Avatar className="w-12 h-12 mb-4 border-2 border-[#d4af37]">
                    <AvatarImage src={member.img} />
                    <AvatarFallback>{member.name.split(" ")[0][0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-xs text-[#d4af37] mb-3">{member.role}</p>
                  <p className="text-sm text-slate-400">AUM: {member.aum}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "AUM", value: 5, suffix: "B", prefix: "€" },
              { label: "Clients", value: 200 },
              { label: "Years Experience", value: 25 },
              { label: "Performance", value: 1, suffix: "%", prefix: "Top " },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 0.1}>
                <div className="text-center p-6 bg-[#1e2d40]/30 rounded-lg border border-[#d4af37]/20">
                  <div className="text-4xl font-black mb-2" style={{ color: '#d4af37' }}>
                    <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-400">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Onboarding Process */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#d4af37' }}>Client Onboarding</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { step: "1. Initial Consultation", desc: "Confidential meeting to understand goals & assets" },
            { step: "2. Wealth Analysis", desc: "Comprehensive review of current portfolio & tax position" },
            { step: "3. Strategy Development", desc: "Custom wealth plan with 10-year projections" },
            { step: "4. Implementation", desc: "Execution of strategy with ongoing monitoring" },
            { step: "5. Quarterly Reviews", desc: "Regular updates and rebalancing as needed" },
          ].map((item, idx) => (
            <Reveal key={item.step} delay={idx * 0.1}>
              <AccordionItem value={`item-${idx}`} className="border-[#d4af37]/30">
                <AccordionTrigger className="hover:text-[#d4af37] transition-colors">
                  <span className="font-bold text-lg">{item.step}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  {item.desc}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#d4af37' }}>Client Testimonials</h2>
        </Reveal>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((testimonial, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#1e2d40]/50 border-[#d4af37]/30 h-full">
                  <CardContent className="p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Award key={i} className="w-4 h-4" style={{ color: '#d4af37' }} />
                        ))}
                      </div>
                      <p className="text-slate-300 italic mb-4">"{testimonial.text}"</p>
                    </div>
                    <Badge className="w-fit bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/50">{testimonial.company}</Badge>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Regulatory Badges */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#d4af37' }}>Regulatory Excellence</h2>
          <p className="text-slate-400 mb-12">Trusted by regulators worldwide</p>
        </Reveal>

        <div className="flex flex-wrap gap-4">
          {["FSA Regulated", "SEC Registered", "MAS Approved", "FINRA Member"].map((badge, idx) => (
            <Reveal key={badge} delay={idx * 0.1}>
              <Badge variant="outline" className="px-4 py-2 border-[#d4af37]/50 text-[#d4af37]">
                {badge}
              </Badge>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#d4af37' }}>FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { q: "What is the minimum to get started?", a: "Our typical minimum is €2.5M, though we work with selected clients from €1M." },
            { q: "How are fees structured?", a: "Tiered fee structure: 0.85% on first €10M, 0.65% on €10-50M, 0.45% above €50M." },
            { q: "How often do you rebalance?", a: "Quarterly reviews with rebalancing as market conditions warrant, minimum annually." },
            { q: "Where is my money held?", a: "With our custodian partners - global banks, never with us. Full segregation & insurance." },
          ].map((item, idx) => (
            <Reveal key={item.q} delay={idx * 0.1}>
              <AccordionItem value={`faq-${idx}`} className="border-[#d4af37]/30">
                <AccordionTrigger className="hover:text-[#d4af37] transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* Consultation CTA */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6" style={{ color: '#d4af37' }}>Ready to Grow Your Wealth?</h2>
          <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
            Our wealth advisors are standing by to discuss your financial goals.
          </p>
          <MagneticBtn
            onClick={() => setOpenConsult(true)}
            className="px-10 py-4 bg-[#d4af37] text-[#070d14] font-bold rounded-lg hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all"
          >
            Schedule Private Consultation
          </MagneticBtn>
        </Reveal>
      </section>

      <Dialog open={openConsult} onOpenChange={setOpenConsult}>
        <DialogContent className="bg-[#1e2d40] border-[#d4af37]/30">
          <DialogHeader>
            <DialogTitle style={{ color: '#d4af37' }}>Schedule a Consultation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input placeholder="Full Name" className="w-full px-4 py-2 bg-[#070d14] border border-[#d4af37]/30 rounded text-white placeholder-slate-500" />
            <input placeholder="Email" type="email" className="w-full px-4 py-2 bg-[#070d14] border border-[#d4af37]/30 rounded text-white placeholder-slate-500" />
            <input placeholder="Assets Under Management" className="w-full px-4 py-2 bg-[#070d14] border border-[#d4af37]/30 rounded text-white placeholder-slate-500" />
            <button className="w-full py-3 bg-[#d4af37] text-[#070d14] font-bold rounded hover:opacity-90 transition-opacity">
              Request Meeting
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
