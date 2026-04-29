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
import { Shield, AlertTriangle, Eye, TrendingDown, Zap, Award, FileText, ChevronDown, ArrowRight, Lock } from "lucide-react"

const COURSES = [
  { name: "Phishing Simulation", cert: "Phishing Certified", completion: 98, students: 1.2 },
  { name: "Security Awareness", cert: "SANS Aligned", completion: 95, students: 1.8 },
  { name: "Compliance Training", cert: "SOC2 Approved", completion: 92, students: 0.9 },
  { name: "Incident Response", cert: "NIST Aligned", completion: 88, students: 0.6 },
  { name: "Red Team Tactics", cert: "MITRE ATT&CK", completion: 85, students: 0.4 },
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

export default function Signal() {
  const [activeTab, setActiveTab] = useState("phishing")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [openAssessment, setOpenAssessment] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const [threatCount, setThreatCount] = useState(450)
  useEffect(() => {
    const interval = setInterval(() => setThreatCount(c => c + Math.floor(Math.random() * 3)), 2000)
    return () => clearInterval(interval)
  }, [])

  const industries = ["all", "finance", "healthcare", "gov", "retail"]

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-gradient-to-b from-[#060810] via-[#0a0e1a] to-[#060810] text-white min-h-screen font-mono">
      {/* Hero with Threat Visualization */}
      <motion.div style={{ opacity }} className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-12 p-12">
            {[...Array(48)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-[#2563eb]"
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 0.5
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <h1 className="text-6xl md:text-7xl font-black mb-6" style={{ color: '#06b6d4' }}>
              SIGNAL<br />SECURITY
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-cyan-300/80 max-w-2xl mb-8 font-light">
              Cybersecurity awareness training for 5M employees across 500 companies. Real threats. Real solutions.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-8 py-4 bg-[#2563eb] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#2563eb]/50 transition-all">
              Get Free Assessment
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.div>

      {/* Live Threat Counter */}
      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto border-y border-[#2563eb]/20">
        <Reveal>
          <div className="text-center">
            <p className="text-[#06b6d4] text-sm font-bold mb-2">ACTIVE THREATS DETECTED</p>
            <p className="text-5xl md:text-6xl font-black text-[#2563eb]">{threatCount}</p>
            <p className="text-gray-400 text-sm mt-2">Simulated threats stopped today</p>
          </div>
        </Reveal>
      </section>

      {/* Training Tabs */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#06b6d4' }}>Training Programs</h2>
          <p className="text-cyan-300/60 mb-12 text-lg">Comprehensive security awareness curriculum</p>
        </Reveal>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-[#0a1929]/50 p-2 rounded-lg mb-12">
            {COURSES.map((course) => (
              <TabsTrigger
                key={course.name}
                value={course.name.toLowerCase().replace(" ", "")}
                className="text-xs md:text-sm font-bold"
              >
                {course.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {COURSES.map((course) => (
            <TabsContent key={course.name} value={course.name.toLowerCase().replace(" ", "")} className="space-y-8">
              <Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-[#0a1929] border-[#2563eb]/30 hover:border-[#06b6d4] transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
                          <Badge className="bg-[#2563eb] text-white">{course.cert}</Badge>
                        </div>
                        <Shield className="w-8 h-8" style={{ color: '#06b6d4' }} />
                      </div>
                      <p className="text-gray-400 mb-6">Industry-aligned training with real-world scenarios</p>
                      <button className="w-full py-2 bg-[#2563eb] text-white font-bold rounded hover:opacity-90 transition-opacity">
                        Start Course
                      </button>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold">Completion Rate</span>
                        <span className="text-[#06b6d4] font-bold">{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2 bg-[#0a1929]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-3">Key Topics</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" style={{ color: '#06b6d4' }} />
                          <span className="text-sm">Threat recognition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" style={{ color: '#06b6d4' }} />
                          <span className="text-sm">Detection techniques</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" style={{ color: '#06b6d4' }} />
                          <span className="text-sm">Response protocols</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Breach Statistics */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#06b6d4' }}>Industry Impact</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Average Breach Cost", value: 4.24, unit: "M USD", icon: <TrendingDown /> },
            { label: "Detection Time", value: 212, unit: "Days", icon: <Eye /> },
            { label: "Recovery Time", value: 79, unit: "Days", icon: <Zap /> },
          ].map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.1}>
              <Card className="bg-[#0a1929] border-[#2563eb]/30">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-sm text-gray-400">{stat.label}</h3>
                    <div style={{ color: '#06b6d4' }}>{stat.icon}</div>
                  </div>
                  <div className="text-4xl font-black mb-2">
                    <Counter target={stat.value} />
                  </div>
                  <p className="text-gray-500 text-sm">{stat.unit}</p>
                  <Progress value={Math.floor(stat.value)} className="h-2 bg-[#0a2a4a] mt-4" />
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#06b6d4' }}>Client Case Studies</h2>
          <p className="text-cyan-300/60 mb-8">Filter by industry</p>
        </Reveal>

        <div className="flex flex-wrap gap-3 mb-12">
          {industries.map((ind) => (
            <Reveal key={ind} delay={industries.indexOf(ind) * 0.1}>
              <button
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded font-bold transition-all cursor-pointer ${
                  selectedIndustry === ind
                    ? "bg-[#2563eb] text-white"
                    : "bg-[#0a1929] text-cyan-300 border border-[#2563eb]/30 hover:border-[#06b6d4]"
                }`}
              >
                {ind.charAt(0).toUpperCase() + ind.slice(1)}
              </button>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { company: "Global Bank", reduction: 87, industry: "finance" },
            { company: "Health System", reduction: 92, industry: "healthcare" },
            { company: "Gov Agency", reduction: 78, industry: "gov" },
            { company: "Retail Corp", reduction: 84, industry: "retail" },
            { company: "Tech Firm", reduction: 91, industry: "finance" },
            { company: "Insurance Co", reduction: 85, industry: "healthcare" },
          ]
            .filter(c => selectedIndustry === "all" || c.industry === selectedIndustry)
            .map((case_, idx) => (
              <Reveal key={case_.company} delay={idx * 0.1}>
                <Card className="bg-[#0a1929] border-[#2563eb]/30">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">{case_.company}</h3>
                    <div className="text-4xl font-black mb-2" style={{ color: '#06b6d4' }}>
                      {case_.reduction}%
                    </div>
                    <p className="text-gray-400 text-sm">Incident reduction</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
        </div>
      </section>

      {/* Team Credentials */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#06b6d4' }}>Expert Team</h2>
          <p className="text-cyan-300/60 mb-12">Security certifications & credentials</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { role: "Chief Security", cred: "CISSP", name: "Dr. Helena" },
            { role: "Lead Trainer", cred: "CEH", name: "Marcus" },
            { role: "Red Team Lead", cred: "OSCP", name: "James" },
            { role: "Compliance", cred: "CISM", name: "Sofia" },
          ].map((member, idx) => (
            <Reveal key={member.role} delay={idx * 0.1}>
              <Card className="bg-[#0a1929] border-[#2563eb]/30 text-center">
                <CardContent className="p-6">
                  <Avatar className="w-12 h-12 mx-auto mb-4 border-2 border-[#06b6d4]">
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold mb-1">{member.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{member.role}</p>
                  <Badge className="bg-[#2563eb]">{member.cred}</Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Employees Trained", value: 5, suffix: "M" },
              { label: "Companies", value: 500 },
              { label: "Incident Reduction", value: 98, suffix: "%" },
              { label: "SOC2 Certified", value: 1, suffix: "" },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 0.1}>
                <div className="text-center p-6 bg-[#0a1929] rounded-lg border border-[#2563eb]/30">
                  <div className="text-4xl font-black mb-2" style={{ color: '#06b6d4' }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#06b6d4' }}>FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { q: "How is content delivered?", a: "Cloud-based LMS. Mobile app. Simulations. Phishing tests. Real-time dashboards." },
            { q: "Can you customize training?", a: "Fully customizable. White-label options. Industry-specific modules. Custom scenarios." },
            { q: "What's the ROI?", a: "Average 87% reduction in security incidents. Measurable through our analytics platform." },
            { q: "How do you measure success?", a: "Phishing click rates. Training completion. Incident trends. Security awareness scores." },
          ].map((item, idx) => (
            <Reveal key={item.q} delay={idx * 0.1}>
              <AccordionItem value={`faq-${idx}`} className="border-[#2563eb]/30">
                <AccordionTrigger className="hover:text-[#06b6d4] transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-cyan-300/80">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6" style={{ color: '#06b6d4' }}>Secure Your Organization</h2>
          <p className="text-cyan-300/60 mb-8 text-lg max-w-2xl mx-auto">
            Get a free security assessment. No obligation. Just insights.
          </p>
          <MagneticBtn
            onClick={() => setOpenAssessment(true)}
            className="px-10 py-4 bg-[#2563eb] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#2563eb]/50 transition-all"
          >
            Get Free Assessment
          </MagneticBtn>
        </Reveal>
      </section>

      <Dialog open={openAssessment} onOpenChange={setOpenAssessment}>
        <DialogContent className="bg-[#0a1929] border-[#2563eb]/30">
          <DialogHeader>
            <DialogTitle style={{ color: '#06b6d4' }}>Free Security Assessment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input placeholder="Company Name" className="w-full px-4 py-2 bg-[#060810] border border-[#2563eb]/30 rounded text-white placeholder-gray-500 font-sans" />
            <input placeholder="Email" type="email" className="w-full px-4 py-2 bg-[#060810] border border-[#2563eb]/30 rounded text-white placeholder-gray-500 font-sans" />
            <input placeholder="Employees" type="number" className="w-full px-4 py-2 bg-[#060810] border border-[#2563eb]/30 rounded text-white placeholder-gray-500 font-sans" />
            <button className="w-full py-3 bg-[#2563eb] text-white font-bold rounded hover:opacity-90 transition-opacity font-sans">
              Request Assessment
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
