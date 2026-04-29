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

const SERVICES = [
  { icon: "🎨", title: "Product Design", desc: "End-to-end digital experiences" },
  { icon: "✨", title: "Brand Identity", desc: "Visual systems & guidelines" },
  { icon: "🔧", title: "Design Systems", desc: "Scalable component libraries" },
  { icon: "🔍", title: "UX Research", desc: "User insights & testing" },
  { icon: "🎬", title: "Prototyping", desc: "Interactive demonstrations" }
]

const PORTFOLIO = [
  { id: 1, title: "E-Commerce Platform", industry: "Retail", tools: ["Figma", "Framer"], challenge: "Redesign checkout flow", solution: "30% conversion increase", outcome: "250K users", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600" },
  { id: 2, title: "SaaS Dashboard", industry: "Analytics", tools: ["Figma", "Webflow"], challenge: "Complex data visualization", solution: "Intuitive dashboard UI", outcome: "4.9★ rating", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" },
  { id: 3, title: "Mobile App", industry: "Fintech", tools: ["Framer", "Webflow"], challenge: "High-security UX", solution: "Biometric-first design", outcome: "100K downloads", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
  { id: 4, title: "Brand Redesign", industry: "Tech", tools: ["Figma"], challenge: "Brand modernization", solution: "New visual identity", outcome: "40% engagement lift", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600" },
  { id: 5, title: "Design Platform", industry: "Creative", tools: ["Figma", "Framer"], challenge: "Collaborative features", solution: "Real-time design tools", outcome: "10K+ DAU", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600" },
  { id: 6, title: "Health App", industry: "Healthcare", tools: ["Webflow"], challenge: "HIPAA compliance", solution: "Accessible design", outcome: "5★ healthcare", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600" }
]

const TEAM = [
  { name: "Sarah Chen", role: "Creative Director", tools: "Figma, Brand Strategy", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { name: "Marcus Reid", role: "Lead Designer", tools: "Figma, Framer, Motion", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Nina Patel", role: "UX Researcher", tools: "Testing, Analytics", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  { name: "Alex Kim", role: "Motion Designer", tools: "After Effects, Framer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" }
]

export default function WaveStudio() {
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#fafaf9] via-white to-[#f5f5f5] text-[#09090b] overflow-hidden">
      {/* Floating Design Elements */}
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="fixed top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#4f46e5]/10 to-[#ec4899]/10 blur-3xl pointer-events-none" />
      <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} className="fixed bottom-1/4 left-5 w-40 h-40 rounded-full bg-gradient-to-br from-[#ec4899]/5 to-[#4f46e5]/5 blur-2xl pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#09090b] via-[#4f46e5] to-[#ec4899] mb-6">Wave Studio</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl">UI/UX design agency crafting digital experiences that move audiences. 80 projects. 6 years. Infinite possibilities.</p>
            <motion.div whileHover={{ x: 5 }} className="inline-flex items-center gap-3 px-8 py-4 bg-[#4f46e5] text-white rounded-lg font-semibold cursor-pointer hover:bg-[#4f46e5]/90">
              Start Project →
            </motion.div>
          </motion.div>
        </Reveal>

        {/* Floating UI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} animate={{ y: [0, -15, 0] }} transition={{ duration: 5, delay: i * 0.5, repeat: Infinity }} className="relative h-64 rounded-xl overflow-hidden border border-gray-200 hover:border-[#4f46e5]/50 transition-colors">
              <Image src={`https://images.unsplash.com/photo-155106929230${i}?w=400`} alt="Design" fill className="object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <Badge className="mb-3 bg-[#4f46e5]">Design Frame {i}</Badge>
                  <p className="text-sm opacity-80">Motion-responsive UI</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Our Services</h2>
        </Reveal>

        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-5 gap-2 bg-gray-100 p-2 rounded-lg mb-12">
            {SERVICES.map((s, i) => (
              <TabsTrigger key={i} value={String(i)} className="text-sm font-semibold">
                {s.icon}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICES.map((service, i) => (
            <TabsContent key={i} value={String(i)} className="mt-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-4xl font-bold mb-6">{service.title}</h3>
                  <p className="text-lg text-gray-600 mb-8">{service.desc}</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#4f46e5] mt-2" />
                      <p className="text-gray-700">Award-winning approach combining strategy and creativity</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#ec4899] mt-2" />
                      <p className="text-gray-700">Collaborative process with transparent communication</p>
                    </div>
                  </div>
                  <MagneticBtn className="mt-8 px-6 py-3 bg-[#4f46e5] text-white rounded-lg font-semibold hover:bg-[#4f46e5]/90">
                    View Case Studies →
                  </MagneticBtn>
                </div>
                <Image src={`https://images.unsplash.com/photo-15510669293${i}?w=600`} alt={service.title} width={600} height={400} className="rounded-xl border border-gray-200" />
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Featured Work</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {PORTFOLIO.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                onClick={() => { setSelectedProject(project); setDialogOpen(true) }}
                className="group cursor-pointer"
              >
                <Card className="border border-gray-200 hover:border-[#4f46e5]/50 overflow-hidden transition-all h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={project.img} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-[#4f46e5]/20 text-[#4f46e5]">{project.industry}</Badge>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex gap-2 mb-4">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">{tool}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{project.challenge}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProject?.title}</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image src={selectedProject.img} alt={selectedProject.title} fill className="object-cover" />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Challenge</p>
                    <p className="mt-2 text-gray-900">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Solution</p>
                    <p className="mt-2 text-gray-900">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Outcome</p>
                    <p className="mt-2 text-gray-900">{selectedProject.outcome}</p>
                  </div>
                </div>
                <Carousel className="w-full">
                  <CarouselContent>
                    {[1, 2, 3].map((i) => (
                      <CarouselItem key={i} className="basis-full">
                        <Image src={selectedProject.img} alt={`Screenshot ${i}`} width={500} height={300} className="w-full rounded-lg" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Process */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Our Process</h2>
        </Reveal>

        <div className="space-y-8 max-w-4xl mx-auto">
          {["Discovery", "Strategy", "Design", "Testing", "Launch"].map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="flex items-start gap-8 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-bold text-lg group-hover:bg-[#ec4899] transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{step}</h3>
                  <p className="text-gray-600">In-depth analysis and stakeholder alignment to define project scope and success metrics</p>
                  {i < 4 && <div className="w-0.5 h-12 bg-gradient-to-b from-[#4f46e5] to-transparent mt-6 ml-6" />}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-gradient-to-r from-[#4f46e5]/5 to-[#ec4899]/5 rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[{ v: 80, l: "Projects" }, { v: 6, l: "Years" }, { v: 40, l: "Clients" }, { v: 5, s: "★", l: "Rating" }].map((stat, i) => (
            <Reveal key={i}>
              <div>
                <p className="text-5xl font-bold text-[#4f46e5]"><Counter target={stat.v} suffix={stat.s || ""} /></p>
                <p className="text-gray-600 mt-2">{stat.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Meet the Team</h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8">
          {TEAM.map((member, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="border border-gray-200 overflow-hidden hover:border-[#4f46e5]/50 transition-colors">
                <div className="relative h-48">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-[#4f46e5] font-semibold mb-3">{member.role}</p>
                  <Badge variant="outline" className="text-xs">{member.tools}</Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Client Stories</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3].map((i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border border-gray-200">
                  <CardContent className="p-8">
                    <div className="flex gap-2 mb-4">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#4f46e5]">★</span>)}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"Wave Studio transformed our vision into reality. Their design expertise and collaborative approach made all the difference."</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`https://images.unsplash.com/photo-150${i}?w=100`} />
                        <AvatarFallback>C{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">Client Name</p>
                        <p className="text-xs text-gray-500">Company {i}</p>
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

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Frequently Asked</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "What is your design process?", a: "We follow a proven 5-step process: Discovery, Strategy, Design, Testing, and Launch. Each phase includes stakeholder feedback." },
            { q: "How long does a project take?", a: "Typical projects range from 6-12 weeks depending on scope and complexity. We'll establish a timeline during discovery." },
            { q: "Can you handle revisions?", a: "Yes, unlimited revisions are included during the design phase. We ensure your satisfaction with the final deliverables." },
            { q: "What's your timeline?", a: "We deliver progress milestones every 2 weeks with client reviews. Final delivery includes design files, documentation, and handoff support." }
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-gray-200 px-6 rounded-lg">
              <AccordionTrigger className="font-semibold text-gray-900">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#4f46e5] to-[#ec4899] rounded-2xl p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Let's collaborate to create something extraordinary. Schedule a free consultation with our team.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <MagneticBtn className="px-12 py-4 bg-white text-[#4f46e5] rounded-lg font-bold cursor-pointer hover:bg-gray-100">
                Start Your Journey
              </MagneticBtn>
            </motion.div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
