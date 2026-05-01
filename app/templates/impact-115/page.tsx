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

const PRACTICES = [
  {
    name: "Corporate",
    services: ["M&A", "Securities", "Corporate Governance", "Contract Negotiation"],
    cases: "520+ cases",
    lead: "Margaret Chen",
  },
  {
    name: "Litigation",
    services: ["Civil Disputes", "Commercial Litigation", "Appellate", "Alternative Dispute Resolution"],
    cases: "890+ cases",
    lead: "James Mitchell",
  },
  {
    name: "Real Estate",
    services: ["Commercial Real Estate", "Residential", "Development", "Financing"],
    cases: "650+ cases",
    lead: "Sofia Rodriguez",
  },
  {
    name: "Intellectual Property",
    services: ["Patents", "Trademarks", "Copyright", "Licensing"],
    cases: "410+ cases",
    lead: "David Park",
  },
  {
    name: "Employment",
    services: ["Labor Law", "Employment Disputes", "Compliance", "Executive Compensation"],
    cases: "380+ cases",
    lead: "Rebecca Thompson",
  },
]

const ATTORNEYS = [
  { name: "Margaret Chen", title: "Managing Partner", bar: "NY, CA", specialty: "Corporate Law" },
  { name: "James Mitchell", title: "Senior Counsel", bar: "NY, NJ, PA", specialty: "Litigation" },
  { name: "Sofia Rodriguez", title: "Partner", bar: "NY, FL", specialty: "Real Estate" },
  { name: "David Park", title: "Partner", bar: "NY, MA", specialty: "IP Law" },
  { name: "Rebecca Thompson", title: "Counsel", bar: "NY, CT", specialty: "Employment" },
  { name: "Michael O'Brien", title: "Associate", bar: "NY", specialty: "General Practice" },
]

const ARTICLES = [
  { title: "M&A Trends in 2025", practice: "Corporate", date: "2025-01-15" },
  { title: "AI Liability and Compliance", practice: "Employment", date: "2025-01-10" },
  { title: "Real Estate Market Outlook", practice: "Real Estate", date: "2025-01-05" },
  { title: "Patent Strategy in Tech", practice: "IP", date: "2024-12-28" },
]

export default function ApexLaw() {
  const [activePractice, setActivePractice] = useState(0)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f1b2d]">
      <motion.section style={{ y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-733852?w=800&q=80" alt="Law Firm" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-light mb-6 text-white">
            APEX
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl font-light text-white">
            Modern Legal Excellence
          </motion.p>
        </div>
      </motion.section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Practice Areas</h2>
        </Reveal>
        <Tabs defaultValue="Corporate" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-[#c9a84c]/20">
            {PRACTICES.map((p) => (
              <TabsTrigger key={p.name} value={p.name} className="data-[state=active]:bg-[#0f1b2d] data-[state=active]:text-[#c9a84c]">
                {p.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {PRACTICES.map((practice) => (
            <TabsContent key={practice.name} value={practice.name} className="mt-12">
              <div className="grid md:grid-cols-2 gap-12">
                <Reveal>
                  <div>
                    <h3 className="text-3xl font-light text-[#0f1b2d] mb-6">{practice.name} Law</h3>
                    <div className="space-y-3 mb-8">
                      {practice.services.map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#c9a84c] rounded-full" />
                          <span className="text-[#0f1b2d]/70">{svc}</span>
                        </div>
                      ))}
                    </div>
                    <Badge className="bg-[#0f1b2d] text-[#c9a84c]">{practice.cases}</Badge>
                    <p className="text-sm text-[#0f1b2d]/60 mt-6">Led by {practice.lead}</p>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="relative h-96 bg-[#e8eef5] rounded-lg overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1109543?w=800&q=80" alt={practice.name} fill className="object-cover" />
                  </div>
                </Reveal>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#0f1b2d]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-white">Our Attorneys</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ATTORNEYS.map((atty, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-[#1a2a3d] border-[#c9a84c]/20">
                <CardContent className="p-6">
                  <Avatar className="w-16 h-16 mb-4" style={{ backgroundColor: "#c9a84c" }}>
                    <AvatarFallback className="text-[#0f1b2d]">{atty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-light text-white mb-1">{atty.name}</h3>
                  <p className="text-sm text-[#c9a84c] mb-3">{atty.title}</p>
                  <Badge variant="outline" className="border-[#c9a84c] text-[#c9a84c]">{atty.bar}</Badge>
                  <p className="text-xs text-white/60 mt-3">{atty.specialty}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Case Results</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Cases Won", value: 2000, suffix: "+" },
            { label: "Success Rate", value: 98, suffix: "%" },
            { label: "Years in Practice", value: 35 },
            { label: "Offices Worldwide", value: 12 },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-light mb-2 text-[#c9a84c]">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-[#0f1b2d]/60">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#e8eef5]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Thought Leadership</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((article, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-[#0f1b2d] text-[#c9a84c]">{article.practice}</Badge>
                  <h3 className="text-lg font-light text-[#0f1b2d] mb-3">{article.title}</h3>
                  <p className="text-sm text-[#0f1b2d]/60">{new Date(article.date).toLocaleDateString()}</p>
                  <button className="mt-4 text-[#c9a84c] font-light hover:underline">Read Article →</button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Client Testimonials</h2>
        </Reveal>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {[1, 2, 3].map((idx) => (
              <CarouselItem key={idx}>
                <Card className="bg-[#e8eef5]">
                  <CardContent className="p-8">
                    <p className="text-lg text-[#0f1b2d] mb-6 italic">"APEX delivered exceptional results on our most complex litigation. Their expertise is unparalleled."</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12" style={{ backgroundColor: "#c9a84c" }}>
                        <AvatarFallback className="text-[#0f1b2d]">C{idx}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-light text-[#0f1b2d]">Client {idx}</p>
                        <p className="text-sm text-[#0f1b2d]/60">Fortune 500 General Counsel</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="py-12 px-6 md:px-12 border-t border-[#c9a84c]/20">
        <Reveal>
          <p className="text-center text-sm text-[#0f1b2d]/60 mb-6">Recognized By</p>
        </Reveal>
        <div className="flex justify-center gap-8 flex-wrap">
          {["Martindale", "Chambers USA", "Super Lawyers", "Best Lawyers"].map((badge, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Badge variant="outline" className="border-[#c9a84c] text-[#c9a84c] font-light">{badge}</Badge>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#0f1b2d]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-white">Retainer Process</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { title: "Initial Consultation", desc: "Comprehensive case review and legal strategy discussion" },
            { title: "Engagement Agreement", desc: "Transparent fee structure and scope of representation" },
            { title: "Research & Planning", desc: "Detailed analysis and litigation roadmap development" },
            { title: "Representation", desc: "Full legal representation throughout proceedings" },
            { title: "Resolution & Follow-up", desc: "Case conclusion and ongoing advisory services" },
          ].map((step, idx) => (
            <AccordionItem key={idx} value={`step-${idx}`} className="border-[#c9a84c]/20">
              <AccordionTrigger className="text-white">Step {idx + 1}: {step.title}</AccordionTrigger>
              <AccordionContent className="text-white/70">{step.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { q: "What is your consultation process?", a: "Initial consultations are confidential and at no charge. We review your matter and provide preliminary legal assessment." },
            { q: "How do you structure fees?", a: "We offer hourly rates, flat fees, or contingency arrangements depending on case type and client needs." },
            { q: "How long does litigation typically take?", a: "Most cases resolve within 18-36 months, though complex matters may extend longer. Early settlement is often possible." },
            { q: "What about confidentiality?", a: "Attorney-client privilege protects all communications. We maintain strict confidentiality throughout representation." },
          ].map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-[#0f1b2d]">{item.q}</AccordionTrigger>
              <AccordionContent className="text-[#0f1b2d]/70">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Our Firm</h2>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-lg text-[#0f1b2d]/70 mb-6">APEX Law was founded in 1990 with a simple mission: provide exceptional legal representation to corporations, institutions, and individuals navigating complex legal challenges. Over 35 years, we've evolved into a full-service firm with 12 offices across North America and Europe.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-[#0f1b2d]/70 mb-6">Our 150+ attorneys bring diverse expertise, with deep specialization in corporate law, litigation, real estate, intellectual property, and employment matters. We pride ourselves on our collaborative approach, combining senior expertise with emerging talent.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-[#0f1b2d]/70">We measure success not just by case outcomes, but by long-term client relationships and our contribution to the legal profession.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#e8eef5]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Notable Cases</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { case: "Smith v. Corporate Giants LLC", outcome: "Won $475M settlement", practice: "Litigation" },
            { case: "TechFlow International Acquisition", outcome: "$2.1B cross-border M&A", practice: "Corporate" },
            { case: "IP Patent Infringement Defense", outcome: "Defeated claims, maintained patents", practice: "IP Law" },
            { case: "Real Estate Development Project", outcome: "Completed $850M mixed-use development", practice: "Real Estate" },
          ].map((notable, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h4 className="text-lg font-light text-[#0f1b2d] mb-2">{notable.case}</h4>
                  <p className="text-[#c9a84c] font-light mb-2">{notable.outcome}</p>
                  <Badge className="bg-[#0f1b2d] text-[#c9a84c]">{notable.practice}</Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Diversity & Inclusion</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { stat: "40%", label: "Female Partners & Counsel" },
            { stat: "38%", label: "Attorneys of Color" },
            { stat: "$2.5M", label: "Pro Bono Hours Annually" },
          ].map((diversity, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <p className="text-4xl font-light text-[#c9a84c] mb-2">{diversity.stat}</p>
                <p className="text-[#0f1b2d]/70">{diversity.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#e8eef5]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Practice Areas Deep Dive</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {[
            { area: "Corporate Law", sub: "M&A, Securities, Governance, Contracts" },
            { area: "Litigation", sub: "Commercial, Civil, Appellate, Mediation" },
            { area: "Real Estate", sub: "Commercial, Residential, Development, Finance" },
            { area: "IP Law", sub: "Patents, Trademarks, Copyright, Licensing" },
          ].map((practice, idx) => (
            <AccordionItem key={idx} value={`practice-${idx}`}>
              <AccordionTrigger className="text-[#0f1b2d]">{practice.area}</AccordionTrigger>
              <AccordionContent className="text-[#0f1b2d]/70">{practice.sub}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Professional Recognition</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Best Law Firms 2024", "AV Preeminent Rating", "World Class Legal Firm", "Regional Leader", "Client Choice Award", "Innovative Practice", "Diversity Leader", "Pro Bono Champion"].map((recognition, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Card className="bg-[#e8eef5] border-[#c9a84c]/10 text-center">
                <CardContent className="p-6">
                  <p className="text-sm font-light text-[#0f1b2d]">{recognition}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#e8eef5]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Contact Information</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <Reveal>
            <div>
              <h3 className="text-2xl font-light text-[#0f1b2d] mb-6">Main Office</h3>
              <div className="space-y-3 text-[#0f1b2d]/70">
                <p className="font-light text-[#c9a84c] text-sm">Address</p>
                <p>500 Park Avenue South, Suite 1500</p>
                <p>New York, NY 10010</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="text-2xl font-light text-[#0f1b2d] mb-6">Contact</h3>
              <div className="space-y-3 text-[#0f1b2d]/70">
                <div>
                  <p className="font-light text-[#c9a84c] text-sm">Phone</p>
                  <p>+1 (212) 555-0200</p>
                </div>
                <div>
                  <p className="font-light text-[#c9a84c] text-sm">Email</p>
                  <p>info@apexlaw.com</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#0f1b2d]">Schedule a Consultation</h2>
        </Reveal>
        <div className="text-center">
          <p className="text-lg text-[#0f1b2d]/70 mb-8">Let us help protect and advance your interests. Our experts are ready to discuss your matter.</p>
          <MagneticBtn className="px-12 py-4 rounded-lg font-light text-white transition-colors" style={{ backgroundColor: "#0f1b2d" }}>
            Request Consultation
          </MagneticBtn>
        </div>
      </section>
    </div>
  )
}
