"use client"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Scale, Users, Briefcase } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>{children}</motion.div>
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
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

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * 0.3)
    y.set((e.clientY - r.top - r.height/2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

const caseResults = [
  { title: "Wrongful Termination Victory", settlement: "$2.8M", industry: "Tech", brief: "Employee wrongly terminated after injury report", outcome: "Full settlement + damages" },
  { title: "Wage Theft Recovery", settlement: "$1.5M", industry: "Retail", brief: "Wage and hour violations for 500+ employees", outcome: "Class action success" },
  { title: "Discrimination Settlement", settlement: "$3.2M", industry: "Finance", brief: "Gender-based discrimination and harassment", outcome: "Company policy reform" },
  { title: "Wrongful Termination Case", settlement: "$1.8M", industry: "Healthcare", brief: "Retaliation for safety reporting", outcome: "Reinstatement + damages" },
  { title: "Age Discrimination Win", settlement: "$2.1M", industry: "Manufacturing", brief: "Age-based layoffs and replacement", outcome: "Significant precedent" },
  { title: "Hostile Workplace", settlement: "$2.5M", industry: "Education", brief: "Severe workplace harassment", outcome: "Training & oversight mandated" }
]

const attorneys = [
  { name: "Patricia Monroe", specialty: "Employment Law", bar: "NY, CA, TX", wins: "450+ cases", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { name: "James Richardson", specialty: "Labor Rights", bar: "FL, GA, OH", wins: "380+ cases", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Diana Foster", specialty: "Class Actions", bar: "CA, WA, OR", wins: "290+ cases", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
  { name: "Robert Chen", specialty: "Discrimination", bar: "IL, MN, MI", wins: "310+ cases", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
]

export default function PeakLegal() {
  const [selectedCase, setSelectedCase] = useState<typeof caseResults[0] | null>(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#f5f5f3] text-[#0d1b2d] font-sans">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" alt="hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f3] via-transparent to-[#f5f5f3]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-8xl font-black tracking-tight mb-6 text-[#0d1b2d]">
            Peak Legal
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-2xl text-[#0d1b2d]/60 max-w-2xl mx-auto mb-12">
            Employment & labor law firm fighting for worker justice
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setOpen(true)} className="px-8 py-4 bg-[#c9a84c] text-[#0d1b2d] font-bold cursor-pointer hover:bg-[#0d1b2d] hover:text-[#c9a84c] transition-all duration-200">
            Free Consultation
          </motion.button>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Practice Areas</h2>
        </Reveal>

        <Tabs defaultValue="employment" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-12 bg-transparent">
            <TabsTrigger value="employment" className="cursor-pointer">Employment</TabsTrigger>
            <TabsTrigger value="discrimination" className="cursor-pointer">Discrimination</TabsTrigger>
            <TabsTrigger value="wrongful" className="cursor-pointer">Wrongful Term.</TabsTrigger>
            <TabsTrigger value="wage" className="cursor-pointer">Wage Theft</TabsTrigger>
            <TabsTrigger value="class" className="cursor-pointer">Class Action</TabsTrigger>
          </TabsList>

          {[
            { value: "employment", services: ["Contract negotiations", "Severance review", "Non-compete disputes", "Employment agreements"] },
            { value: "discrimination", services: ["Race discrimination", "Gender discrimination", "Age discrimination", "Disability rights"] },
            { value: "wrongful", services: ["Retaliatory termination", "Medical leave violations", "Constructive dismissal", "Whistleblower protection"] },
            { value: "wage", services: ["Unpaid wages recovery", "Overtime violations", "Misclassification claims", "Wage statements"] },
            { value: "class", services: ["Multi-employee actions", "Systemic discrimination", "Wage & hour collective", "Class certification"] }
          ].map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tab.services.map((service, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <Card className="bg-white border-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-2">{service}</h3>
                        <Badge className="bg-[#c9a84c] text-[#0d1b2d] cursor-pointer">Free Consultation</Badge>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* CASE RESULTS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Case Results</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseResults.map((caseItem, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div onClick={() => { setSelectedCase(caseItem); setOpen(true); }} className="group relative cursor-pointer bg-white border border-[#0d1b2d]/10 hover:border-[#c9a84c] transition-all duration-300 p-6 hover:shadow-lg">
                <Badge className="mb-3 bg-[#c9a84c] text-[#0d1b2d] cursor-pointer">${(parseInt(caseItem.settlement) / 1000000).toFixed(1)}M</Badge>
                <h3 className="text-lg font-bold mb-2">{caseItem.title}</h3>
                <p className="text-sm text-[#0d1b2d]/60 mb-4">{caseItem.industry} • {caseItem.brief.substring(0, 30)}...</p>
                <motion.div className="flex items-center gap-2 text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all duration-300">
                  View Details <span className="ml-auto">→</span>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ATTORNEYS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Our Attorneys</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {attorneys.map((attorney, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="text-center hover:scale-105 transition-transform duration-300">
                <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-[#c9a84c]">
                  <AvatarImage src={attorney.image} alt={attorney.name} />
                  <AvatarFallback>{attorney.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold mb-1">{attorney.name}</h3>
                <Badge variant="outline" className="mb-3 cursor-pointer">{attorney.specialty}</Badge>
                <div className="text-xs text-[#0d1b2d]/60 space-y-1">
                  <p>Bar: {attorney.bar}</p>
                  <p className="font-bold text-[#c9a84c]">{attorney.wins}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0d1b2d] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Reveal><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={5000} />+</div><p className="text-sm opacity-60">Cases Won</p></div></Reveal>
          <Reveal delay={0.1}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={20} /></div><p className="text-sm opacity-60">Years Experience</p></div></Reveal>
          <Reveal delay={0.2}><div><div className="text-4xl md:text-5xl font-black mb-2">98<span className="text-2xl">%</span></div><p className="text-sm opacity-60">Success Rate</p></div></Reveal>
          <Reveal delay={0.3}><div><div className="text-4xl md:text-5xl font-black mb-2">$200<span className="text-2xl">M+</span></div><p className="text-sm opacity-60">Recovered</p></div></Reveal>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Client Resources</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { title: "Know Your Rights", description: "Federal and state employment law protections, minimum wage requirements, and workplace safety standards you should know about" },
            { title: "Filing Deadlines", description: "Critical timelines for filing complaints, including EEOC deadlines (180-300 days), statute of limitations, and notice requirements" },
            { title: "Documentation Tips", description: "How to properly document workplace issues, keep records, gather evidence, and prepare for legal action" },
            { title: "Class Action Info", description: "Understanding class action lawsuits, eligibility, opt-in/opt-out processes, and settlement distribution" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`item-${i}`} className="border-b border-[#0d1b2d]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#c9a84c] transition-colors">{item.title}</AccordionTrigger>
                <AccordionContent className="text-[#0d1b2d]/60 py-4">{item.description}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#f5f5f3]">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">Client Testimonials</h2>
        </Reveal>
        <div className="max-w-4xl mx-auto">
          <Carousel>
            <CarouselContent>
              {[
                { text: "Peak Legal fought relentlessly for my case. The outcome exceeded my expectations. They truly care about justice.", author: "Sarah M., Former Employee" },
                { text: "Professional, compassionate, and results-driven. The entire team was supportive throughout the process.", author: "Michael J., Wrongful Termination" },
                { text: "Finally found attorneys who understood my situation and delivered. Highly recommend Peak Legal.", author: "Lisa T., Discrimination Case" }
              ].map((testimonial, i) => (
                <CarouselItem key={i} className="md:basis-full">
                  <Card className="bg-white border-[#c9a84c]/20">
                    <CardContent className="p-8 text-center">
                      <p className="text-lg mb-6 italic text-[#0d1b2d]/60">"{testimonial.text}"</p>
                      <p className="font-bold text-[#0d1b2d]">{testimonial.author}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Frequently Asked</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "Do you work on contingency?", a: "Yes, we handle most employment cases on a contingency basis. You don't pay unless we win." },
            { q: "What's the typical timeline?", a: "Cases vary from 6 months to 2 years depending on complexity and whether litigation is necessary." },
            { q: "What documents do I need?", a: "Emails, performance reviews, pay stubs, and any documentation of the workplace issue. We'll guide you through the rest." },
            { q: "Can I still file if I'm working elsewhere?", a: "Yes, you can file claims for past employers or current employment issues with another company." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`faq-${i}`} className="border-b border-[#0d1b2d]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#c9a84c] transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-[#0d1b2d]/60 py-4">{item.a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* CASE DETAIL DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCase.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/20 p-6 rounded">
                  <div className="text-3xl font-black text-[#c9a84c] mb-2">{selectedCase.settlement}</div>
                  <p className="text-sm opacity-60">Settlement Amount</p>
                </div>
                <div className="space-y-4">
                  <div><p className="text-sm font-bold opacity-60">Industry</p><p>{selectedCase.industry}</p></div>
                  <div><p className="text-sm font-bold opacity-60">Case Details</p><p>{selectedCase.brief}</p></div>
                  <div><p className="text-sm font-bold opacity-60">Outcome</p><p className="text-[#c9a84c] font-bold">{selectedCase.outcome}</p></div>
                  <MagneticBtn className="w-full px-6 py-3 bg-[#c9a84c] text-[#0d1b2d] font-bold hover:bg-[#0d1b2d] hover:text-[#c9a84c] transition-all duration-300">
                    Schedule Free Consultation
                  </MagneticBtn>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* FOOTER CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0d1b2d] text-white text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Don't face workplace injustice alone</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Get expert legal representation with no upfront costs</p>
          <MagneticBtn className="px-8 py-4 bg-[#c9a84c] text-[#0d1b2d] font-bold cursor-pointer hover:bg-white transition-all duration-200">
            Schedule Your Free Consultation
          </MagneticBtn>
        </Reveal>
      </section>
    </div>
  )
}