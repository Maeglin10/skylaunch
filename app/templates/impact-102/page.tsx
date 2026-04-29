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
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={className}>{children}</motion.button>
}

const PROJECTS = [
  { id: 1, title: "MERIDIAN RESIDENCE", category: "Residential", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop", year: "2024", area: "1200m²" },
  { id: 2, title: "AURORA OFFICE", category: "Commercial", image: "https://images.unsplash.com/photo-1600607687644-c173306c1d23?w=800&auto=format&fit=crop", year: "2023", area: "5400m²" },
  { id: 3, title: "LUMIÈRE HOTEL", category: "Hospitality", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop", year: "2023", area: "8900m²" },
]

const TEAM = [
  { name: "Alexandra Chen", role: "Creative Director", image: "https://i.pravatar.cc/150?img=1" },
  { name: "Marco Rossi", role: "Principal Architect", image: "https://i.pravatar.cc/150?img=2" },
  { name: "Sophie Laurent", role: "Design Lead", image: "https://i.pravatar.cc/150?img=3" },
  { name: "James Morrison", role: "Sustainability Consultant", image: "https://i.pravatar.cc/150?img=4" },
]

const PROCESS = [
  { phase: "Discovery", description: "Deep understanding of client vision, site analysis, regulatory framework" },
  { phase: "Concept", description: "Spatial exploration, material research, climate-responsive design strategy" },
  { phase: "Design", description: "Detailed documentation, 3D visualization, sustainable systems integration" },
  { phase: "Build", description: "On-site coordination, quality assurance, craftsmen collaboration" },
  { phase: "Reveal", description: "Completion celebration, long-term stewardship planning, legacy building" },
]

const MATERIALS = [
  { name: "Sustainable Oak", properties: "FSC-certified, local-sourced, hand-finished" },
  { name: "Belgian Limestone", properties: "Timeless elegance, natural patina, low embodied carbon" },
  { name: "Reclaimed Steel", properties: "Industrial heritage, authentic texture, structural poetry" },
  { name: "Natural Plaster", properties: "Bio-based binders, breathable finish, warm acoustics" },
]

const TESTIMONIALS = [
  { author: "Victoria Sterling", text: "A transformative experience. They didn't build a house, they crafted our future." },
  { author: "Henri Dubois", text: "Every detail tells a story. The precision combined with poetry is unmatched." },
]

export default function MaisonBlancPage() {
  const [selectedProject, setSelectedProject] = useState(0)
  const [isProjectOpen, setIsProjectOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: "#fafaf8" }}>
      {/* Hero with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&auto=format&fit=crop"
          alt="Maison Blanc Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <motion.div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-7xl md:text-8xl font-light text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>MAISON BLANC</h1>
            <p className="text-xl text-white/80">Architecture Studio - Design with Purpose</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio Tabs */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#fafaf8" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-16" style={{ color: "#1a1a1a" }}>Selected Works</h2>
            <Tabs defaultValue="residential" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12" style={{ background: "transparent" }}>
                <TabsTrigger value="residential" className="text-lg" style={{ color: "#c2714f" }}>Residential</TabsTrigger>
                <TabsTrigger value="commercial" className="text-lg" style={{ color: "#c2714f" }}>Commercial</TabsTrigger>
                <TabsTrigger value="hospitality" className="text-lg" style={{ color: "#c2714f" }}>Hospitality</TabsTrigger>
                <TabsTrigger value="retail" className="text-lg" style={{ color: "#c2714f" }}>Retail</TabsTrigger>
              </TabsList>

              {["residential", "commercial", "hospitality", "retail"].map(cat => (
                <TabsContent key={cat} value={cat}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PROJECTS.slice(0, 3).map((p, idx) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          setSelectedProject(idx)
                          setIsProjectOpen(true)
                        }}
                        className="cursor-pointer group"
                      >
                        <div className="relative h-96 overflow-hidden rounded-lg mb-4">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Carousel className="absolute inset-0">
                            <CarouselContent>
                              <CarouselItem><Image src={p.image} alt={p.title} fill className="object-cover" /></CarouselItem>
                              <CarouselItem><Image src={PROJECTS[(idx + 1) % 3].image} alt="alt" fill className="object-cover" /></CarouselItem>
                              <CarouselItem><Image src={PROJECTS[(idx + 2) % 3].image} alt="alt" fill className="object-cover" /></CarouselItem>
                            </CarouselContent>
                          </Carousel>
                        </div>
                        <h3 className="text-2xl font-light mb-2" style={{ color: "#1a1a1a" }}>{p.title}</h3>
                        <p style={{ color: "#c4b8a4" }}>{p.category} • {p.year}</p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Reveal>
      </section>

      {/* Project Dialog */}
      <Dialog open={isProjectOpen} onOpenChange={setIsProjectOpen}>
        <DialogContent className="max-w-4xl" style={{ background: "#fafaf8" }}>
          <DialogHeader>
            <DialogTitle className="text-4xl font-light">{PROJECTS[selectedProject].title}</DialogTitle>
          </DialogHeader>
          <Carousel>
            <CarouselContent>
              {[0, 1, 2].map(i => (
                <CarouselItem key={i}>
                  <Image
                    src={PROJECTS[(selectedProject + i) % PROJECTS.length].image}
                    alt={PROJECTS[selectedProject].title}
                    width={800}
                    height={500}
                    className="w-full rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <p className="text-sm" style={{ color: "#c4b8a4" }}>Area</p>
              <p className="text-2xl font-light">{PROJECTS[selectedProject].area}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: "#c4b8a4" }}>Year</p>
              <p className="text-2xl font-light">{PROJECTS[selectedProject].year}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Accordion */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f0ebe0" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#1a1a1a" }}>Our Process</h2>
            <Accordion type="single" collapsible>
              {PROCESS.map((p, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b" style={{ borderColor: "#c2714f" }}>
                  <AccordionTrigger className="text-2xl font-light" style={{ color: "#1a1a1a" }}>
                    {p.phase}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg" style={{ color: "#c4b8a4" }}>
                    {p.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* Materials Cards */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#fafaf8" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#1a1a1a" }}>Curated Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {MATERIALS.map((m, idx) => (
                <Card key={idx} className="border-0" style={{ background: "#f0ebe0" }}>
                  <CardContent className="pt-8 text-center">
                    <h3 className="text-xl font-light mb-3" style={{ color: "#1a1a1a" }}>{m.name}</h3>
                    <p className="text-sm" style={{ color: "#c4b8a4" }}>{m.properties}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats Counter */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#c2714f" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
              <div><div className="text-5xl font-light mb-2"><Counter target={200} /></div><p className="text-sm opacity-80">Projects</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={15} /></div><p className="text-sm opacity-80">Years</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={12} /></div><p className="text-sm opacity-80">Awards</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={8} /></div><p className="text-sm opacity-80">Countries</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Team */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#fafaf8" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#1a1a1a" }}>Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {TEAM.map((t, idx) => (
                <div key={idx} className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={t.image} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="font-light text-lg" style={{ color: "#1a1a1a" }}>{t.name}</p>
                  <p className="text-sm" style={{ color: "#c4b8a4" }}>{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f0ebe0" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-center" style={{ color: "#1a1a1a" }}>Testimonials</h2>
            <Carousel>
              <CarouselContent>
                {TESTIMONIALS.map((t, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-12 rounded-lg text-center" style={{ background: "#fafaf8" }}>
                      <p className="text-xl italic mb-6" style={{ color: "#c2714f" }}>"{t.text}"</p>
                      <p className="font-light" style={{ color: "#1a1a1a" }}>— {t.author}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#fafaf8" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#1a1a1a" }}>Frequently Asked</h2>
            <Accordion type="single" collapsible>
              {[
                { q: "What is your design philosophy?", a: "We believe architecture should transcend aesthetics and create spaces that enhance human experience." },
                { q: "How long does a typical project take?", a: "Most residential projects span 18-24 months from concept to completion." },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* CTA Dialog */}
      <section className="py-24 px-8 md:px-20 text-center" style={{ background: "#c2714f" }}>
        <Reveal>
          <h2 className="text-5xl font-light text-white mb-8">Begin Your Project</h2>
          <Dialog>
            <motion.button
              as="button"
              onClick={() => { }}
              className="px-12 py-4 bg-white text-center font-light"
              style={{ color: "#c2714f" }}
              whileHover={{ scale: 1.05 }}
            >
              Schedule Consultation
            </motion.button>
            <DialogContent style={{ background: "#fafaf8" }}>
              <DialogHeader>
                <DialogTitle>Schedule Your Consultation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full p-3 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                <textarea placeholder="Project Vision" className="w-full p-3 border rounded" rows={4} />
                <button className="w-full py-3 text-white font-light" style={{ background: "#c2714f" }}>Send Inquiry</button>
              </div>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
