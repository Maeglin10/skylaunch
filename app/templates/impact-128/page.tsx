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

const PROJECTS = [
  { id: 1, title: "Chromatic Singularity", category: "Generative Art", tech: "p5.js", img: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500" },
  { id: 2, title: "Particle Resonance", category: "Interactive", tech: "Three.js", img: "https://images.unsplash.com/photo-1517694712202-14819c9602d2?w=500" },
  { id: 3, title: "Data Flow Visualization", category: "Data Viz", tech: "D3.js", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500" },
  { id: 4, title: "Neural Landscape", category: "AI Art", tech: "WebGL", img: "https://images.unsplash.com/photo-1552800053-46a137ec3cf5?w=500" },
  { id: 5, title: "Meta Interface", category: "Brand Campaign", tech: "React", img: "https://images.unsplash.com/photo-1522869635100-ce306e50a817?w=500" },
  { id: 6, title: "NFT Genesis", category: "Blockchain", tech: "Solidity", img: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8a020?w=500" },
]

const COLLAB = [
  { name: "Adobe Creative Residency", desc: "12-month immersion in digital arts" },
  { name: "Ars Electronica", desc: "International media art festival partnership" },
  { name: "Google Creative Labs", desc: "Experimental technology exploration" },
  { name: "Rhizome / The New Museum", desc: "Contemporary digital culture initiative" },
]

const TESTIMONIALS = [
  { name: "Elena Vasquez", role: "Creative Director", quote: "Transformed our brand identity with bold, generative visuals." },
  { name: "Marcus Chen", role: "Tech Lead", quote: "Pushed the boundaries of what's possible with web technologies." },
  { name: "Yuki Tanaka", role: "Curator", quote: "Masterful fusion of art, code, and philosophy." },
]

const PRESS = ["Wired", "Creative Review", "Dezeen", "It's Nice That", "The Verge", "ARTFORUM"]

export default function CipherWorksPage() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const { scrollY } = useScroll()

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Animated Hero Canvas */}
      <section className="relative h-[100vh] overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-[#84cc16]/30"
              initial={{
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                rotate: 0
              }}
              animate={{
                rotate: 360,
                x: [Math.random() * 1000 - 500, Math.random() * 1000 - 500],
                y: [Math.random() * 1000 - 500, Math.random() * 1000 - 500],
              }}
              transition={{ duration: 20 + i * 2, repeat: Infinity }}
              style={{
                width: 100 + i * 20,
                height: 100 + i * 20,
                borderRadius: i % 2 === 0 ? "50%" : "0"
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-3xl px-8">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 text-[#84cc16]">CIPHER WORKS</h1>
            <p className="text-xl text-gray-300 mb-8">
              Generative art, interactive installations, and cutting-edge code
            </p>
          </Reveal>
        </div>
      </section>

      {/* Project Tabs */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-[#84cc16]">Portfolio</h2>
        </Reveal>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-12 bg-[#1a1a2e] p-2 rounded-lg">
            {["All", "Generative", "Interactive", "Data Viz", "Brand", "NFT"].map(cat => (
              <TabsTrigger
                key={cat}
                value={cat.toLowerCase()}
                className="data-[state=active]:bg-[#84cc16] data-[state=active]:text-black text-xs md:text-sm"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {["all", "generative", "interactive", "data viz", "brand", "nft"].map(cat => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PROJECTS.filter(p => cat === "all" || p.category.toLowerCase() === cat).map((proj, i) => (
                  <Reveal key={proj.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(proj)}
                    >
                      <div className="relative h-72 mb-4 rounded-lg overflow-hidden border border-[#84cc16]/30 group-hover:border-[#84cc16]">
                        <Image src={proj.img} alt={proj.title} fill className="object-cover group-hover:scale-110 transition duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                      </div>
                      <Badge className="bg-[#84cc16] text-black mb-2">{proj.tech}</Badge>
                      <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                      <p className="text-sm text-gray-400">{proj.category}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-[#1a1a2e] border border-[#84cc16]/30">
          <DialogHeader>
            <DialogTitle className="text-[#84cc16]">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              <div className="relative h-96 rounded-lg overflow-hidden border border-[#84cc16]/20">
                <Image src={selectedProject.img} alt={selectedProject.title} fill className="object-cover" />
              </div>
              <Carousel className="w-full">
                <CarouselContent>
                  {[1, 2, 3].map(i => (
                    <CarouselItem key={i} className="md:basis-1/2">
                      <div className="relative h-48 bg-[#050505] rounded-lg border border-[#84cc16]/20">
                        <Image
                          src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?w=500`}
                          alt="Screenshot"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-[#84cc16]" />
                <CarouselNext className="text-[#84cc16]" />
              </Carousel>
              <div className="space-y-3 pt-4 border-t border-[#84cc16]/20">
                <p className="text-gray-300">Tech Stack: {selectedProject.tech}</p>
                <p className="text-gray-300">Category: {selectedProject.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Code Showcase */}
      <section className="py-24 px-8 md:px-16 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-12 text-[#84cc16]">Code Snippets</h2>
        </Reveal>
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <Reveal key={i}>
              <motion.div
                animate={{ opacity: [0.6, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="p-6 bg-[#1a1a2e] rounded-lg border border-[#84cc16]/20 font-mono text-sm text-[#84cc16] overflow-x-auto"
              >
                <pre>{`function generatePattern(seed) {
  const noise = new Perlin(seed)
  const particles = []
  for (let i = 0; i < 1000; i++) {
    const x = noise.perlin2(i * 0.01, time)
    const y = noise.perlin2(i * 0.02, time + 100)
    particles.push({ x, y, hue: (x + y) % 360 })
  }
  return particles
}`}</pre>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Residencies */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-12 text-[#84cc16]">Residencies & Collaborations</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {COLLAB.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-[#1a1a2e] border-[#84cc16]/30 hover:border-[#84cc16] transition">
                <CardContent className="pt-8 space-y-4">
                  <h3 className="text-xl font-bold text-[#84cc16]">{item.name}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                  <motion.button className="text-[#84cc16] font-semibold hover:text-white transition">
                    Apply Now →
                  </motion.button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 md:px-16 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { number: 100, label: "Projects", suffix: "" },
            { number: 6, label: "Years", suffix: "" },
            { number: 30, label: "Clients", suffix: "" },
            { number: 15, label: "Exhibitions", suffix: "" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#84cc16] mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Press */}
      <section className="py-16 px-8 md:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wider">Featured In</p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-8">
            {PRESS.map((outlet, i) => (
              <Reveal key={i}>
                <p className="text-gray-400 font-semibold hover:text-[#84cc16] transition cursor-pointer">
                  {outlet}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16 text-[#84cc16]">Client Stories</h2>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((test, i) => (
                <CarouselItem key={i} className="md:basis-1/2">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#1a1a2e] border-[#84cc16]/30">
                      <CardContent className="pt-8 space-y-6">
                        <p className="text-lg italic text-gray-300">"{test.quote}"</p>
                        <div>
                          <p className="font-bold text-[#84cc16]">{test.name}</p>
                          <p className="text-sm text-gray-400">{test.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-[#84cc16]" />
            <CarouselNext className="text-[#84cc16]" />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 md:px-16 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-12 text-[#84cc16]">FAQ</h2>
        </Reveal>
        <Accordion className="space-y-4">
          {["What's your IP policy?", "How's your creative process?", "What should I include in a brief?", "What tech stack do you recommend?"].map((q, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-[#84cc16]/20 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-white hover:text-[#84cc16]">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Every project is unique. We adapt to your vision, timeline, and technical requirements.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Project Inquiry */}
      <section className="py-24 px-8 md:px-16 bg-[#1a1a2e]/50 max-w-4xl mx-auto rounded-2xl">
        <Reveal>
          <h2 className="text-4xl font-bold mb-8 text-[#84cc16]">Let's Create Something</h2>
          <p className="text-gray-300 mb-8">Have a project in mind? Let's talk about your vision.</p>
        </Reveal>
        <MagneticBtn
          onClick={() => setInquiryOpen(true)}
          className="px-8 py-4 bg-[#84cc16] text-black font-bold rounded-lg hover:bg-white transition"
        >
          Submit Project Inquiry
        </MagneticBtn>
      </section>

      {/* Inquiry Dialog */}
      <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
        <DialogContent className="max-w-md bg-[#1a1a2e] border border-[#84cc16]/30">
          <DialogHeader>
            <DialogTitle className="text-[#84cc16]">Project Inquiry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project name"
              className="w-full px-4 py-2 bg-[#050505] border border-[#84cc16]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#84cc16]"
            />
            <textarea
              placeholder="Tell us about your vision..."
              className="w-full px-4 py-2 bg-[#050505] border border-[#84cc16]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#84cc16] h-24"
            />
            <MagneticBtn className="w-full py-3 bg-[#84cc16] text-black font-bold rounded-lg hover:bg-white transition">
              Send Inquiry
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
