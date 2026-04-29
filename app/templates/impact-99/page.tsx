"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const SERVICES = [
  { id: 1, name: "Strategy", items: ["Brand positioning", "Market analysis", "Growth planning", "Competitive audit"] },
  { id: 2, name: "Design", items: ["UI/UX design", "Brand identity", "Motion design", "Design systems"] },
  { id: 3, name: "Development", items: ["Web apps", "Mobile apps", "Custom solutions", "API integration"] },
  { id: 4, name: "Growth", items: ["SEO optimization", "Analytics setup", "Conversion rate", "Performance tuning"] },
]

const PORTFOLIO = [
  { title: "Project Alpha", category: "E-commerce", image: "https://images.unsplash.com/photo-1460925895917-adf4e11526ab?q=80&w=500&auto=format&fit=crop", result: "+340% Revenue" },
  { title: "Project Beta", category: "SaaS", image: "https://images.unsplash.com/photo-1639762681033-cb46dbb64755?q=80&w=500&auto=format&fit=crop", result: "+520 Clients" },
  { title: "Project Gamma", category: "Mobile", image: "https://images.unsplash.com/photo-1555949752-afba4c3d2f65?q=80&w=500&auto=format&fit=crop", result: "4.8★ Rating" },
  { title: "Project Delta", category: "Brand", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format&fit=crop", result: "+45% Engagement" },
  { title: "Project Epsilon", category: "Platform", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop", result: "$2M Valuation" },
  { title: "Project Zeta", category: "Integration", image: "https://images.unsplash.com/photo-1553531088-df340cf313d8?q=80&w=500&auto=format&fit=crop", result: "+98% Uptime" },
]

const TECH_STACK = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Vercel", "Tailwind"]

const PROCESS_STEPS = [
  { step: 1, title: "Discovery", desc: "Understanding your goals and market landscape" },
  { step: 2, title: "Strategy", desc: "Building the roadmap to success" },
  { step: 3, title: "Design", desc: "Crafting beautiful user experiences" },
  { step: 4, title: "Development", desc: "Building scalable technology" },
  { step: 5, title: "Launch & Scale", desc: "Go live and optimize for growth" },
]

const STATS = [{ value: 150, label: "Projects" }, { value: 8, label: "Years" }, { value: 40, label: "Clients" }, { value: 2000000, label: "Generated" }]

const FAQ_ITEMS = [
  { q: "What's your typical project timeline?", a: "Most projects take 8-16 weeks depending on complexity and scope. We work in agile sprints." },
  { q: "Do you offer post-launch support?", a: "Yes. All projects include 3 months of free support, with extended maintenance packages available." },
  { q: "What's your process for revisions?", a: "Unlimited revisions during the design phase, then 2 rounds included in development." },
  { q: "Can you scale an existing platform?", a: "Absolutely. We specialize in scaling and modernizing existing applications." },
]

const TESTIMONIALS = [
  { text: "Zenith transformed our startup from idea to product-market fit in 4 months. Exceptional.", author: "CEO, FinTech Startup" },
  { text: "Their strategic guidance alone was worth the investment. Highly recommend.", author: "Founder, E-commerce" },
  { text: "Best digital partner we've had. Proactive, skilled, genuinely invested.", author: "CMO, Fortune 500" },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
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

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false)
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      const newText = text.split('').map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join('')
      setGlitchText(newText)
      setTimeout(() => { setGlitchText(text); setGlitch(false) }, 150)
    }, 4000)
    return () => clearInterval(interval)
  }, [text])

  return <span className={glitch ? "opacity-60" : ""}>{glitchText}</span>
}

export default function ZenithDigital() {
  const [selectedTab, setSelectedTab] = useState("Strategy")
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <div className="bg-[#08080f] text-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-md border-b border-[#7c3aed]/10 z-50 flex items-center justify-between px-6">
        <div className="text-2xl font-bold tracking-wider text-[#7c3aed]">ZENITH</div>
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="#services" className="hover:text-[#7c3aed] transition">Services</Link>
          <Link href="#portfolio" className="hover:text-[#7c3aed] transition">Portfolio</Link>
          <Link href="#process" className="hover:text-[#7c3aed] transition">Process</Link>
        </div>
      </nav>

      <motion.section style={{ opacity: heroOpacity, y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 to-[#22d3ee]/20" />
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <GlitchText text="DIGITAL EXCELLENCE" />
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Strategy, design, and development for brands that demand innovation.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Dialog>
              <DialogTrigger asChild>
                <MagneticBtn className="px-8 py-4 bg-[#7c3aed] text-white font-bold rounded-full hover:bg-[#6d28d9] transition">
                  Start Discovery Call
                </MagneticBtn>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a2e] border-[#7c3aed]/20 max-w-md">
                <DialogTitle>Discovery Call</DialogTitle>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#7c3aed]/30 rounded text-white" />
                  <input type="email" placeholder="Work Email" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#7c3aed]/30 rounded text-white" />
                  <input type="text" placeholder="Company" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#7c3aed]/30 rounded text-white" />
                  <button type="submit" className="w-full px-4 py-3 bg-[#7c3aed] text-white font-bold rounded hover:bg-[#6d28d9] transition">
                    Schedule Call
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.section>

      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-bold mb-4 text-center">Our Services</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">End-to-end digital solutions for ambitious brands.</p>
        </Reveal>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#1a1a2e] border border-[#7c3aed]/20 mb-8">
            {SERVICES.map((svc) => (
              <TabsTrigger key={svc.name} value={svc.name} className="data-[state=active]:bg-[#7c3aed] data-[state=active]:text-white">
                {svc.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICES.map((svc) => (
            <TabsContent key={svc.id} value={svc.name}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="bg-[#1a1a2e] border-[#7c3aed]/20 cursor-pointer hover:border-[#7c3aed]/50 transition overflow-hidden group p-8">
                    <h3 className="text-2xl font-bold mb-4 text-[#7c3aed]">{svc.name}</h3>
                    <ul className="space-y-3">
                      {svc.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-[#22d3ee] mt-1">→</span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a2e] border-[#7c3aed]/20 max-w-2xl">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-[#7c3aed]">{svc.name} Solutions</h2>
                    <p className="text-gray-300">We combine strategic thinking with cutting-edge technology to deliver measurable results.</p>
                    <div className="space-y-3">
                      {svc.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-[#0d0d15] rounded">
                          <span className="text-[#22d3ee]">✓</span>
                          <span className="text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-bold text-center mb-4">Work Portfolio</h2>
          <p className="text-gray-400 text-center">Recent projects that moved the needle.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((project, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="bg-[#1a1a2e] border-[#7c3aed]/20 cursor-pointer hover:border-[#7c3aed]/50 transition overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition" unoptimized />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                        <span className="text-[#22d3ee] text-2xl opacity-0 group-hover:opacity-100 transition">→</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                      <Badge className="bg-[#7c3aed] text-white">{project.category}</Badge>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a2e] border-[#7c3aed]/20 max-w-2xl">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-[#7c3aed]">{project.title}</h2>
                    <div className="aspect-video bg-black rounded overflow-hidden">
                      <Image src={project.image} alt={project.title} width={500} height={280} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="font-bold text-white">{project.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Result</p>
                        <p className="font-bold text-[#22d3ee]">{project.result}</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1} className="mb-16">
            <h2 className="text-5xl font-bold text-center mb-4">Tech Stack</h2>
            <p className="text-gray-400 text-center">Modern tools for modern problems.</p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-4">
            {TECH_STACK.map((tech, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <Badge className="bg-[#7c3aed] text-white px-6 py-3 text-base">{tech}</Badge>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-bold text-center mb-4">Our Process</h2>
        </Reveal>

        <div className="space-y-8">
          {PROCESS_STEPS.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="flex gap-8 items-start">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white font-bold text-lg flex items-center justify-center flex-shrink-0">{step.step}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="text-center">
              <div className="text-4xl font-bold text-[#7c3aed] mb-2"><Counter target={stat.value} /></div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-bold text-center mb-4">Client Stories</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((testi, idx) => (
              <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#1a1a2e] border-[#7c3aed]/20 h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <p className="text-gray-300 italic mb-4 flex-1">"{testi.text}"</p>
                    <p className="text-sm text-[#7c3aed] font-semibold">— {testi.author}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-[#7c3aed]/30" />
          <CarouselNext className="border-[#7c3aed]/30" />
        </Carousel>
      </section>

      <section className="py-24 px-6 bg-[#1a1a2e]">
        <div className="max-w-3xl mx-auto">
          <Reveal delay={0.1} className="mb-12">
            <h2 className="text-5xl font-bold text-center mb-4">FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-[#7c3aed]/20">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#7c3aed] transition">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Let's explore how we can drive growth for your brand.</p>
          <Dialog>
            <DialogTrigger asChild>
              <MagneticBtn className="px-8 py-4 bg-[#7c3aed] text-white font-bold rounded-full hover:bg-[#6d28d9] transition">
                Book Discovery Call
              </MagneticBtn>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a2e] border-[#7c3aed]/20">
              <DialogTitle>Schedule a Discovery Call</DialogTitle>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#7c3aed]/30 rounded text-white" />
                <input type="email" placeholder="Work Email" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#7c3aed]/30 rounded text-white" />
                <input type="text" placeholder="Company & Role" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#7c3aed]/30 rounded text-white" />
                <textarea placeholder="What's on your mind?" className="w-full px-4 py-2 bg-[#0d0d15] border border-[#7c3aed]/30 rounded text-white h-24" />
                <button type="submit" className="w-full px-4 py-3 bg-[#7c3aed] text-white font-bold rounded hover:bg-[#6d28d9] transition">
                  Schedule Now
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
