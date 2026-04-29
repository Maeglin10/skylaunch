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

const PORTFOLIO = {
  SaaS: [
    { name: "TechFlow", raise: "€45M", desc: "AI workflow automation", tags: ["Series B", "YC"] },
    { name: "CloudCore", raise: "€28M", desc: "Infrastructure scaling", tags: ["Series A", "Growth"] },
  ],
  Fintech: [
    { name: "PayScale", raise: "€62M", desc: "Open banking platform", tags: ["Series C", "Regulated"] },
    { name: "VestX", raise: "€35M", desc: "Algorithmic investing", tags: ["Series B", "Crypto"] },
  ],
  HealthTech: [
    { name: "HealthHub", raise: "€41M", desc: "Telemedicine network", tags: ["Series B", "Global"] },
    { name: "GenomeLabs", raise: "€52M", desc: "Gene sequencing AI", tags: ["Series C", "DeepTech"] },
  ],
  DeepTech: [
    { name: "NeuralCore", raise: "€78M", desc: "Quantum computing", tags: ["Series B", "R&D"] },
    { name: "SpaceTech", raise: "€55M", desc: "Satellite comms", tags: ["Series A", "Space"] },
  ],
  Consumer: [
    { name: "StyleAI", raise: "€33M", desc: "Fashion recommendation", tags: ["Series A", "DTC"] },
    { name: "FoodFlow", raise: "€29M", desc: "Supply chain logistics", tags: ["Series A", "Ops"] },
  ],
}

const TEAM = [
  { name: "Maria Rossi", role: "Founder/GP", bg: "Operator", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
  { name: "Hans Mueller", role: "Co-GP", bg: "Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "Dr. Chen Wei", role: "Investment Lead", bg: "Academic", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" },
  { name: "Amara Okafor", role: "Operations", bg: "Operator", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "Viktor Lebedev", role: "Tech Lead", bg: "Founder", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
  { name: "Sophie Laurent", role: "Operations", bg: "Operator", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" },
]

const THESIS = [
  { title: "Market Timing", desc: "Invest in founders solving problems at inflection points." },
  { title: "Deep Networks", desc: "Our team's domain expertise creates unfair advantages." },
  { title: "Value Add", desc: "Beyond capital: intros, strategy, and hands-on support." },
  { title: "Global Scope", desc: "European founders scaling to global markets." },
]

const TESTIMONIALS = [
  { lp: "Swiss Family Office", quote: "Nexus consistently identifies opportunities before the market.", return: "3.8x" },
  { lp: "Nordic Pension Fund", quote: "Exceptional deal flow and portfolio support.", return: "3.2x" },
  { lp: "European Tech Hub", quote: "Best returns in our venture allocation.", return: "4.1x" },
]

export default function NexusVenturesPage() {
  const [activeTab, setActiveTab] = useState("SaaS")
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div style={{ background: "#050d1f", color: "#fff" }}>
      {/* Hero Parallax */}
      <motion.section style={{ y: parallaxY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400"
          alt="boardroom"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-black mb-6" style={{ color: "#d4a017" }}>NEXUS VENTURES</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl text-gray-300 mb-8">European Deep Tech & Early-Stage Innovation</p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-12 py-4 text-lg font-bold" style={{ background: "#d4a017", color: "#050d1f", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
              SUBMIT PITCH DECK
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.section>

      {/* Portfolio Tabs */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#d4a017" }}>PORTFOLIO</h2>
        </Reveal>
        <Tabs defaultValue="SaaS" className="w-full">
          <TabsList className="flex justify-center gap-2 mb-12 bg-transparent flex-wrap">
            {Object.keys(PORTFOLIO).map((cat) => (
              <TabsTrigger key={cat} value={cat} className="px-6 py-2 font-bold text-lg border" style={{ borderColor: "#d4a017", color: "#d4a017" }}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(PORTFOLIO).map(([cat, companies]) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid md:grid-cols-2 gap-8">
                {companies.map((c) => (
                  <Reveal key={c.name}>
                    <Card className="bg-neutral-900/50 border" style={{ borderColor: "#d4a017" }} onClick={() => setSelectedCompany(c)} className="cursor-pointer hover:bg-neutral-900/80 transition-all">
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-black">{c.name}</h3>
                          <Badge className="px-4 py-1" style={{ background: "#d4a017", color: "#050d1f" }}>{c.raise}</Badge>
                        </div>
                        <p className="text-gray-300 mb-6">{c.desc}</p>
                        <div className="flex gap-2 flex-wrap">
                          {c.tags.map((tag) => (
                            <Badge key={tag} className="px-3 py-1 border" style={{ borderColor: "#d4a017", color: "#d4a017", background: "transparent" }}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Investment Thesis */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#d4a017" }}>INVESTMENT THESIS</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {THESIS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1}>
              <Card className="bg-neutral-900/50 border-b-4" style={{ borderBottomColor: "#d4a017" }}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-4" style={{ color: "#d4a017" }}>{t.title}</h3>
                  <p className="text-gray-300 text-lg">{t.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fund Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 500, label: "AUM (€M)", suffix: "" },
            { num: 80, label: "Investments", suffix: "" },
            { num: 12, label: "Exits", suffix: "" },
            { num: 3.2, label: "Avg Return", suffix: "x" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="text-5xl font-black mb-2" style={{ color: "#d4a017" }}>
                  <Counter target={Math.floor(stat.num)} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#d4a017" }}>TEAM</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <Card className="bg-neutral-900/50 border border-neutral-800 hover:border-yellow-700/50 transition-colors overflow-hidden">
                <div className="relative h-48">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-2">{member.name}</h3>
                  <p className="text-gray-400 mb-4">{member.role}</p>
                  <Badge className="px-3 py-1 border" style={{ borderColor: "#d4a017", color: "#d4a017", background: "transparent" }}>
                    {member.bg}
                  </Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LP Testimonials Carousel */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#d4a017" }}>LP TESTIMONIALS</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Reveal>
                  <Card className="bg-neutral-900/50 border" style={{ borderColor: "#d4a017" }}>
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-black">{t.lp}</h4>
                        <Badge className="px-4 py-1" style={{ background: "#d4a017", color: "#050d1f" }}>{t.return}</Badge>
                      </div>
                      <p className="text-gray-300 text-lg italic">"{t.quote}"</p>
                    </CardContent>
                  </Card>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Process Accordion */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#d4a017" }}>INVESTMENT PROCESS</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { stage: "Stage 1: Application", desc: "Submit pitch deck + founder background." },
            { stage: "Stage 2: Initial Review", desc: "Our investment committee evaluates market fit." },
            { stage: "Stage 3: Deep Dive", desc: "Technical due diligence + team assessment." },
            { stage: "Stage 4: Term Sheet", desc: "Standard terms for qualified startups." },
            { stage: "Stage 5: Closing", desc: "Legal docs, funding, and board seat assigned." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b" style={{ borderColor: "#d4a017" }}>
              <AccordionTrigger className="hover:text-yellow-700">{item.stage}</AccordionTrigger>
              <AccordionContent className="text-gray-400">{item.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#d4a017" }}>FAQS</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "What's your typical check size?", a: "€500K to €5M for pre-seed through Series A." },
            { q: "Geographic focus?", a: "Europe-first, with global ambitions." },
            { q: "Follow-on investments?", a: "Yes, we lead Series B rounds for portfolio companies." },
            { q: "Board participation?", a: "Always, to add value beyond capital." },
            { q: "What about international founders?", a: "We support founders building from EU hubs." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b" style={{ borderColor: "#d4a017" }}>
              <AccordionTrigger className="hover:text-yellow-700">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-400">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6">Ready to Scale Your Vision?</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn className="px-16 py-5 text-xl font-bold" style={{ background: "#d4a017", color: "#050d1f", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
            APPLY NOW
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Pitch Deck Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-neutral-900 border" style={{ borderColor: "#d4a017" }}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black" style={{ color: "#d4a017" }}>SUBMIT PITCH DECK</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Founder Name" className="w-full px-4 py-2 rounded bg-neutral-800 border text-white placeholder:text-gray-500" style={{ borderColor: "#d4a017" }} />
            <input type="text" placeholder="Company" className="w-full px-4 py-2 rounded bg-neutral-800 border text-white placeholder:text-gray-500" style={{ borderColor: "#d4a017" }} />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-neutral-800 border text-white placeholder:text-gray-500" style={{ borderColor: "#d4a017" }} />
            <textarea placeholder="Brief description" rows={4} className="w-full px-4 py-2 rounded bg-neutral-800 border text-white placeholder:text-gray-500" style={{ borderColor: "#d4a017" }} />
            <button className="w-full py-3 font-black rounded text-black" style={{ background: "#d4a017" }}>
              SUBMIT
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
