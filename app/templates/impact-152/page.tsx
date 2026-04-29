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
import { Lucide, Award, Users, FileText, Zap } from "lucide-react"

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

const portfolioWorks = [
  { id: 1, title: "Luminous Brand", category: "Brand Identity", tools: "Adobe, Figma", images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"], brief: "Complete identity overhaul", approach: "Strategic positioning through visual hierarchy", result: "500% engagement increase" },
  { id: 2, title: "Minimal Packaging", category: "Packaging", tools: "Adobe, After Effects", images: ["https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200"], brief: "Luxury cosmetics packaging", approach: "Material exploration", result: "Award winner 2024" },
  { id: 3, title: "Digital Narrative", category: "Editorial", tools: "Figma, After Effects", images: ["https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200"], brief: "Magazine redesign", approach: "Typographic innovation", result: "100+ publications" },
  { id: 4, title: "Motion Systems", category: "Motion", tools: "After Effects, Figma", images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"], brief: "Animated brand systems", approach: "Frame-by-frame precision", result: "30M+ impressions" },
  { id: 5, title: "Digital Experience", category: "Digital", tools: "Figma, Webflow", images: ["https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1561461231-4da0370b4a5f?auto=format&fit=crop&q=80&w=1200"], brief: "E-commerce platform", approach: "Conversion optimization", result: "45% AOV uplift" },
  { id: 6, title: "Brand Architecture", category: "Brand Identity", tools: "Adobe, Figma", images: ["https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=80&w=1200"], brief: "Multi-brand ecosystem", approach: "Systematic consistency", result: "Global rollout" }
]

const clientLogos = [
  "https://via.placeholder.com/160x80?text=Brand+A",
  "https://via.placeholder.com/160x80?text=Brand+B",
  "https://via.placeholder.com/160x80?text=Brand+C",
  "https://via.placeholder.com/160x80?text=Brand+D",
  "https://via.placeholder.com/160x80?text=Brand+E"
]

const teamMembers = [
  { name: "Alexandra Chen", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { name: "Marcus Williams", role: "Brand Strategist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Sofia Rodriguez", role: "Motion Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" }
]

export default function FoundryCreative() {
  const [selectedWork, setSelectedWork] = useState<typeof portfolioWorks[0] | null>(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] font-sans">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000" alt="hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7f4] via-transparent to-[#f8f7f4]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-8xl font-black tracking-tight mb-6">
            Foundry Creative
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-2xl text-[#6b6b6b] max-w-2xl mx-auto mb-12">
            Strategic brand identity design for forward-thinking companies
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setOpen(true)} className="px-8 py-4 bg-[#1a1a1a] text-white font-bold cursor-pointer hover:bg-[#f5d800] hover:text-[#1a1a1a] transition-all duration-200">
            Start Project
          </motion.button>
        </div>
      </section>

      {/* PORTFOLIO TABS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Portfolio</h2>
        </Reveal>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-12 bg-transparent">
            <TabsTrigger value="all" className="cursor-pointer">All</TabsTrigger>
            <TabsTrigger value="brand" className="cursor-pointer">Brand</TabsTrigger>
            <TabsTrigger value="packaging" className="cursor-pointer">Packaging</TabsTrigger>
            <TabsTrigger value="editorial" className="cursor-pointer">Editorial</TabsTrigger>
            <TabsTrigger value="motion" className="cursor-pointer">Motion</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioWorks.map((work, i) => (
                <Reveal key={work.id} delay={i * 0.1}>
                  <motion.div onClick={() => { setSelectedWork(work); setOpen(true); }} className="group relative cursor-pointer overflow-hidden bg-white border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <Image src={work.images[0]} alt={work.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3 bg-[#f5d800] text-[#1a1a1a] cursor-pointer">{work.category}</Badge>
                      <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                      <p className="text-sm text-[#6b6b6b] mb-4">Tools: {work.tools}</p>
                      <motion.div className="flex items-center gap-2 text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        View Project <span className="ml-auto">→</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CLIENT LOGOS */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#1a1a1a] text-white">
        <Reveal>
          <h3 className="text-center text-lg font-bold mb-12 opacity-60">Trusted by 150+ brands worldwide</h3>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {clientLogos.map((logo, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="h-12 w-32 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors duration-200">
              Brand {i + 1}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS ACCORDION */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Our Process</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { title: "Discovery", description: "Deep dive into brand essence, market positioning, and strategic objectives" },
            { title: "Strategy", description: "Competitive analysis, audience research, and positioning framework" },
            { title: "Concept", description: "Visual exploration, mood boards, and creative direction development" },
            { title: "Execution", description: "Refinement, precision design, and comprehensive brand guidelines" },
            { title: "Launch", description: "Rollout strategy, team training, and ongoing support" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`item-${i}`} className="border-b border-[#1a1a1a]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#f5d800] transition-colors">{item.title}</AccordionTrigger>
                <AccordionContent className="text-[#6b6b6b] py-4">{item.description}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Reveal><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={150} /></div><p className="text-sm opacity-60">Brands Created</p></div></Reveal>
          <Reveal delay={0.1}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={8} /></div><p className="text-sm opacity-60">Years Experience</p></div></Reveal>
          <Reveal delay={0.2}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={30} /></div><p className="text-sm opacity-60">Countries Served</p></div></Reveal>
          <Reveal delay={0.3}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={12} /></div><p className="text-sm opacity-60">Awards Won</p></div></Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Our Team</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="text-center hover:scale-105 transition-transform duration-300">
                <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-[#f5d800]">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <Badge variant="outline" className="cursor-pointer">{member.role}</Badge>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#f8f7f4]">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">What Clients Say</h2>
        </Reveal>
        <div className="max-w-4xl mx-auto">
          <Carousel>
            <CarouselContent>
              {[
                { text: "Foundry transformed our brand identity completely. Their strategic approach elevated our market position.", author: "Jane Doe, CEO" },
                { text: "The attention to detail and creative excellence exceeded all expectations. Highly recommended.", author: "John Smith, Director" },
                { text: "Working with Foundry was a game-changer for our business. Exceptional team.", author: "Maria Garcia, Founder" }
              ].map((testimonial, i) => (
                <CarouselItem key={i} className="md:basis-full">
                  <Card className="bg-white border-[#1a1a1a]/10">
                    <CardContent className="p-8 text-center">
                      <p className="text-lg mb-6 italic text-[#6b6b6b]">"{testimonial.text}"</p>
                      <p className="font-bold">{testimonial.author}</p>
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
          <h2 className="text-4xl md:text-6xl font-black mb-12">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "What's included in a brand package?", a: "Logo design, color palette, typography system, brand guidelines, and asset library" },
            { q: "How long does a project take?", a: "Typically 8-12 weeks depending on scope and complexity" },
            { q: "Do you offer revisions?", a: "Yes, unlimited revisions during the design phase" },
            { q: "What's your timeline?", a: "Projects start within 2 weeks of contract signing" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`faq-${i}`} className="border-b border-[#1a1a1a]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#f5d800] transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-[#6b6b6b] py-4">{item.a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* PROJECT DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedWork && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedWork.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <Carousel>
                  <CarouselContent>
                    {selectedWork.images.map((img, i) => (
                      <CarouselItem key={i}>
                        <div className="relative h-96 w-full">
                          <Image src={img} alt={`${selectedWork.title} ${i}`} fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="cursor-pointer" />
                  <CarouselNext className="cursor-pointer" />
                </Carousel>
                <div className="space-y-4">
                  <div><p className="text-sm font-bold opacity-60">Brief</p><p>{selectedWork.brief}</p></div>
                  <div><p className="text-sm font-bold opacity-60">Approach</p><p>{selectedWork.approach}</p></div>
                  <div><p className="text-sm font-bold opacity-60">Result</p><p>{selectedWork.result}</p></div>
                  <MagneticBtn className="w-full px-6 py-3 bg-[#f5d800] text-[#1a1a1a] font-bold hover:bg-[#1a1a1a] hover:text-[#f5d800] transition-all duration-300">
                    Inquire About This Project
                  </MagneticBtn>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* FOOTER CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#1a1a1a] text-white text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to elevate your brand?</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Let's create something extraordinary together</p>
          <MagneticBtn className="px-8 py-4 bg-[#f5d800] text-[#1a1a1a] font-bold cursor-pointer hover:bg-white transition-all duration-200">
            Start Your Project Today
          </MagneticBtn>
        </Reveal>
      </section>
    </div>
  )
}