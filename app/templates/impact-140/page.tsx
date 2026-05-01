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
import { Menu, X, BookOpen, TrendingUp, Users, Building2, CheckCircle2, ArrowRight } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const step = target / (duration / 16)
    const t = setInterval(() => setCount(c => { const next = c + step; if (next >= target) { clearInterval(t); return target; } return next; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`cursor-pointer transition-all duration-200 ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default function MeridianConsulting() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [words, setWords] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollY } = useScroll()

  const wordRotations = ["Strategy", "Growth", "Results", "Impact"]

  useEffect(() => {
    const timer = setInterval(() => setWords((w) => (w + 1) % wordRotations.length), 3000)
    return () => clearInterval(timer)
  }, [])

  const services = {
    strategy: [
      { name: "Business Strategy", desc: "Market positioning, competitive advantage, 5-year roadmaps" },
      { name: "Growth Strategy", desc: "Revenue expansion, market entry, M&A planning" },
    ],
    operations: [
      { name: "Process Optimization", desc: "Supply chain, cost reduction, efficiency gains" },
      { name: "Organization Design", desc: "Structure, roles, governance transformation" },
    ],
    digital: [
      { name: "Digital Transformation", desc: "Technology adoption, business model innovation" },
      { name: "Data & Analytics", desc: "Insight generation, decision support systems" },
    ],
    people: [
      { name: "Talent Management", desc: "Recruitment, development, retention strategies" },
      { name: "Change Management", desc: "Organizational change, culture transformation" },
    ],
    finance: [
      { name: "Financial Planning", desc: "Budgeting, forecasting, financial modeling" },
      { name: "M&A Advisory", desc: "Valuation, due diligence, integration planning" },
    ],
    sustainability: [
      { name: "ESG Strategy", desc: "Sustainability goals, impact measurement" },
      { name: "Climate Action", desc: "Carbon reduction, renewable transition" },
    ],
  }

  const caseStudies = [
    { industry: "Technology", result: "+40% Revenue", title: "SaaS Scaling Success", company: "Innovate Systems" },
    { industry: "Healthcare", result: "+35% Efficiency", title: "Clinic Network Optimization", company: "HealthCare Plus" },
    { industry: "Financial", result: "+50% Profitability", title: "Asset Manager Restructuring", company: "Prime Capital" },
    { industry: "Retail", result: "+65% Digital Sales", title: "Omnichannel Transformation", company: "Modern Retail" },
    { industry: "Manufacturing", result: "+25% Output", title: "Production Excellence", company: "Global Manufacturing" },
    { industry: "Energy", result: "+$80M Savings", title: "Cost Optimization Program", company: "Energy Solutions" },
  ]

  const articles = [
    { title: "The Future of Work: 5 Trends Shaping 2025", reading: "8 min", topic: "Workforce" },
    { title: "Sustainability as Competitive Advantage", reading: "10 min", topic: "ESG" },
    { title: "AI & Augmented Intelligence in Consulting", reading: "12 min", topic: "Technology" },
    { title: "Building Resilient Supply Chains", reading: "7 min", topic: "Operations" },
  ]

  const team = [
    { name: "Sarah Williams", role: "Managing Partner", prev: "McKinsey", mba: "Harvard MBA" },
    { name: "David Chen", role: "Senior Partner", prev: "BCG", mba: "Stanford MBA" },
    { name: "Emma Rodriguez", role: "Partner", prev: "Bain", mba: "Wharton MBA" },
    { name: "James Patterson", role: "Partner", prev: "Goldman Sachs", mba: "Oxford MBA" },
  ]

  const clients = ["Apple", "Amazon", "Netflix", "Tesla", "Microsoft", "Google", "Meta", "NVIDIA"]

  return (
    <div style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#f8f9fa] text-[#0d1b2a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Inter', sans-serif; letter-spacing: 0.02em; }
      `}</style>

      {/* Mobile Nav */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button className="fixed top-6 left-6 z-50 md:hidden cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur p-2 rounded-lg">
            <Menu className="w-6 h-6 text-[#0d1b2a]" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white border-[#c9a84c]/20">
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="#services" className="text-lg font-semibold text-[#c9a84c] cursor-pointer hover:text-[#0d1b2a]">Services</Link>
            <Link href="#cases" className="text-lg font-semibold text-[#c9a84c] cursor-pointer hover:text-[#0d1b2a]">Case Studies</Link>
            <Link href="#team" className="text-lg font-semibold text-[#c9a84c] cursor-pointer hover:text-[#0d1b2a]">Team</Link>
            <Link href="#faq" className="text-lg font-semibold text-[#c9a84c] cursor-pointer hover:text-[#0d1b2a]">FAQ</Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero with Word Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1109543?w=800&q=80" alt="Consulting" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span>Meridian</span><br />
              <AnimatePresence mode="wait">
                <motion.span key={words}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#c9a84c]"
                >
                  {wordRotations[words]}
                </motion.span>
              </AnimatePresence>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">Strategy & Management Consulting</p>
            <MagneticBtn className="px-8 py-4 bg-[#c9a84c] text-[#0d1b2a] rounded-lg font-bold hover:bg-[#b89936]">Start Engagement</MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#0d1b2a] mb-4">Services</h2>
          <p className="text-lg text-[#666] mb-12">Strategic advice across every business function</p>
        </Reveal>

        <Tabs defaultValue="strategy" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-[#c9a84c]/20 rounded-lg p-1">
            <TabsTrigger value="strategy" className="cursor-pointer text-xs">Strategy</TabsTrigger>
            <TabsTrigger value="operations" className="cursor-pointer text-xs">Operations</TabsTrigger>
            <TabsTrigger value="digital" className="cursor-pointer text-xs">Digital</TabsTrigger>
            <TabsTrigger value="people" className="cursor-pointer text-xs">People</TabsTrigger>
            <TabsTrigger value="finance" className="cursor-pointer text-xs">Finance</TabsTrigger>
            <TabsTrigger value="sustainability" className="cursor-pointer text-xs">Sustainability</TabsTrigger>
          </TabsList>

          {Object.entries(services).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-8 grid md:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <Card className="bg-white border-[#c9a84c]/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-[#0d1b2a] mb-2 text-lg">{item.name}</h3>
                      <p className="text-[#666] text-sm">{item.desc}</p>
                      <Badge variant="outline" className="border-[#c9a84c] text-[#c9a84c] mt-4 text-xs">Typical: 3-6 months</Badge>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#0d1b2a] mb-12">Case Studies</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <Card className="bg-white border-[#c9a84c]/20 hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 group overflow-hidden"
                onClick={() => setDialogOpen(true)}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="outline" className="border-[#c9a84c] text-[#c9a84c] text-xs">{cs.industry}</Badge>
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] mb-2 group-hover:text-[#c9a84c] transition-colors">{cs.title}</h3>
                  <p className="text-sm text-[#666] mb-4">{cs.company}</p>
                  <p className="text-2xl font-bold text-[#c9a84c]">{cs.result}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Thought Leadership */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#0d1b2a] mb-12">Thought Leadership</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#c9a84c]/20 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <Badge variant="outline" className="border-[#c9a84c] text-[#c9a84c] text-xs mb-4">{article.topic}</Badge>
                  <h3 className="font-bold text-[#0d1b2a] mb-4">{article.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#666]">{article.reading} read</span>
                    <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 200, label: "Client Engagements" },
            { num: 15, label: "Years in Practice" },
            { num: 8, label: "Industries Served" },
            { num: 2, suffix: "B", label: "Value Created" },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div>
                <p className="text-5xl font-bold text-[#c9a84c] mb-2"><Counter target={stat.num} suffix={stat.suffix || ""} /></p>
                <p className="text-[#666] font-semibold">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#0d1b2a] mb-12">Leadership</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#c9a84c]/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-[#c9a84c]">
                    <AvatarFallback className="bg-[#c9a84c] text-white font-bold">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-[#0d1b2a] text-center mb-1">{member.name}</h3>
                  <p className="text-xs text-[#c9a84c] text-center mb-4 font-semibold">{member.role}</p>
                  <Badge variant="outline" className="block w-full text-center border-[#c9a84c] text-[#666] text-xs mb-2">{member.prev}</Badge>
                  <Badge variant="secondary" className="block w-full text-center bg-[#c9a84c]/10 text-[#c9a84c] text-xs">{member.mba}</Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 px-6 bg-white/50 border-y border-[#c9a84c]/20">
        <Reveal>
          <p className="text-center text-sm font-bold text-[#666] mb-12 uppercase tracking-wider">Trusted by industry leaders</p>
        </Reveal>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {clients.map((client, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="text-center font-bold text-[#0d1b2a]/40 hover:text-[#c9a84c] transition-colors cursor-pointer text-sm">
                {client}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Approach Accordion */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#0d1b2a] mb-12">Our Approach</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { title: "Diagnose", desc: "Deep situation assessment through data analysis, interviews, and benchmarking. We uncover root causes, not symptoms." },
            { title: "Design", desc: "Co-create tailored solutions with your team. Detailed implementation roadmap with clear milestones and KPIs." },
            { title: "Deploy", desc: "Hand-in-hand implementation support. We build internal capability and change management to ensure adoption." },
            { title: "Sustain", desc: "Ongoing support and monitoring. We track results, adjust course, and ensure lasting impact beyond our engagement." },
          ].map((step, idx) => (
            <AccordionItem key={idx} value={`step-${idx}`} className="border border-[#c9a84c]/20 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-[#0d1b2a] font-bold cursor-pointer hover:text-[#c9a84c] transition-colors">{step.title}</AccordionTrigger>
              <AccordionContent className="text-[#666]">{step.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#0d1b2a] mb-12">Client Feedback</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: "Meridian helped us unlock $50M in value we didn't know existed. Transformative.", company: "Fortune 500 Tech" },
            { text: "Their strategic clarity and execution discipline are unmatched in our industry.", company: "Global Consumer" },
            { text: "They didn't just consult—they built capability within our team for sustained success.", company: "Healthcare Leader" },
          ].map((test, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#c9a84c]/20">
                <CardContent className="p-6">
                  <p className="text-[#666] mb-4 italic">"{test.text}"</p>
                  <p className="font-semibold text-[#0d1b2a]">{test.company}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#0d1b2a] mb-12">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "How do you calculate your fees?", a: "Value-based pricing model. We align our success with yours through outcome guarantees on key metrics." },
            { q: "What's the typical engagement timeline?", a: "3-6 months for most engagements. Complex multi-phase programs can extend 12-24 months with different team compositions." },
            { q: "Do you work with startups?", a: "Yes. We work across all stages—from Series A through Fortune 500. Different approaches for different scales." },
            { q: "What makes you different?", a: "Deep industry expertise + execution focus. We don't just create plans; we drive results and build lasting capability." },
            { q: "Can you guarantee results?", a: "We structure risk-sharing arrangements where our fees are partially tied to achieving defined outcomes." },
            { q: "How do you ensure knowledge transfer?", a: "Embedded teams + knowledge transfer workshops + documentation. Your team leads by engagement end." },
          ].map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border border-[#c9a84c]/20 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-[#0d1b2a] font-bold cursor-pointer hover:text-[#c9a84c] transition-colors">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-[#666]">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#0d1b2a] to-[#1a2a3a] rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Start Your Transformation</h2>
            <p className="text-lg mb-8 opacity-90">Let's unlock your organization's full potential together.</p>
            <MagneticBtn className="px-8 py-3 bg-[#c9a84c] text-[#0d1b2a] rounded-lg font-bold hover:bg-[#b89936]">Schedule Kickoff</MagneticBtn>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4 font-bold">Meridian Consulting</p>
          <p className="text-sm text-[#999]">Strategic counsel for transformative change © 2024</p>
        </div>
      </footer>
    </div>
  )
}
