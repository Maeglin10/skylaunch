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
  { id: 1, title: "Oakwood Residence", cat: "Residential", score: 95, loc: "Portland, OR", size: "12,500 sqft", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742" },
  { id: 2, title: "Green Harbor Office", cat: "Commercial", score: 88, loc: "San Francisco, CA", size: "45,000 sqft", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
  { id: 3, title: "Civic Commons Plaza", cat: "Public", score: 92, loc: "Seattle, WA", size: "8,500 sqft", img: "https://images.unsplash.com/photo-1486611146926-c627a92ad1ab" },
  { id: 4, title: "Urban Commons", cat: "Urban", score: 85, loc: "Denver, CO", size: "35,000 sqft", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607" },
  { id: 5, title: "Zenith Tower", cat: "Residential", score: 93, loc: "Austin, TX", size: "65,000 sqft", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18" },
  { id: 6, title: "Watershed Center", cat: "Public", score: 90, loc: "Boston, MA", size: "18,000 sqft", img: "https://images.unsplash.com/photo-1505142468610-359e7d316be0" },
]

const MATERIALS = [
  { name: "Mass Timber", desc: "Engineered wood systems", benefit: "50% carbon reduction" },
  { name: "Rammed Earth", desc: "Ancient-modern building", benefit: "Thermal mass efficiency" },
  { name: "Recycled Steel", desc: "Post-consumer alloys", benefit: "Zero waste approach" },
  { name: "Green Roof", desc: "Living roof systems", benefit: "Urban biodiversity" },
]

const TEAM = [
  { name: "Alex Chen", role: "Lead Architect", avatar: "AC" },
  { name: "Sofia Rodriguez", role: "Sustainability Director", avatar: "SR" },
  { name: "James Okonkwo", role: "Structural Engineer", avatar: "JO" },
]

export default function VerdaArchitecture() {
  const [activeProject, setActiveProject] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#3d3d3d]">
      <motion.section style={{ y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-196645?w=800&q=80" alt="Sustainable Architecture" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-light mb-6">
            VERDE
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl font-light">
            Sustainable Architecture for the Future
          </motion.p>
        </div>
      </motion.section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Our Projects</h2>
        </Reveal>
        <Tabs defaultValue="Residential" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#f8f6f2] border border-[#4a7c59]/20">
            {["Residential", "Commercial", "Public", "Urban"].map((cat) => (
              <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-[#4a7c59] data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {["Residential", "Commercial", "Public", "Urban"].map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PROJECTS.filter(p => p.cat === cat).map((proj, idx) => (
                  <Reveal key={proj.id} delay={idx * 0.1}>
                    <motion.div onClick={() => { setActiveProject(PROJECTS.indexOf(proj)); setDialogOpen(true); }} className="cursor-pointer group" whileHover={{ y: -8 }}>
                      <div className="relative h-80 overflow-hidden rounded-lg mb-4">
                        <Image src={proj.img + "?w=500"} alt={proj.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-light text-[#3d3d3d]">{proj.title}</h3>
                        <Badge className="bg-[#4a7c59] text-white">Sustainability: {proj.score}</Badge>
                      </div>
                      <p className="text-sm text-[#3d3d3d]/60">{proj.cat}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-3xl text-[#3d3d3d]">{PROJECTS[activeProject]?.title}</DialogTitle>
          </DialogHeader>
          <Carousel className="w-full">
            <CarouselContent>
              {[0, 1, 2].map((idx) => (
                <CarouselItem key={idx}>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image src={PROJECTS[activeProject]?.img + `?w=800&h=450&crop=entropy`} alt={`Render ${idx + 1}`} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-[#3d3d3d]/60">Energy Savings</p>
                <p className="text-2xl font-light text-[#4a7c59]">40%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-[#3d3d3d]/60">Carbon Reduction</p>
                <p className="text-2xl font-light text-[#4a7c59]">850 tons</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-[#3d3d3d]/60">Green Space</p>
                <p className="text-2xl font-light text-[#4a7c59]">5 acres</p>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-24 px-6 md:px-12 bg-[#4a7c59]/5">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Materials We Love</h2>
        </Reveal>
        <Tabs defaultValue="Mass Timber">
          <TabsList className="grid w-full grid-cols-4">
            {MATERIALS.map((mat) => (
              <TabsTrigger key={mat.name} value={mat.name}>{mat.name}</TabsTrigger>
            ))}
          </TabsList>
          {MATERIALS.map((mat) => (
            <TabsContent key={mat.name} value={mat.name} className="mt-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <h3 className="text-3xl font-light text-[#3d3d3d] mb-4">{mat.name}</h3>
                    <p className="text-lg text-[#3d3d3d]/70 mb-6">{mat.desc}</p>
                    <p className="text-sm font-light text-[#4a7c59]">Benefit: {mat.benefit}</p>
                  </div>
                </Reveal>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Bio-Climate Performance</h2>
        </Reveal>
        <div className="max-w-2xl">
          <Reveal delay={0.1}>
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-[#3d3d3d] font-light">Energy Saved vs Conventional</span>
                <span className="text-[#4a7c59] font-light">40%</span>
              </div>
              <Progress value={40} className="h-3 bg-[#4a7c59]/20" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-[#3d3d3d] font-light">Water Reclamation</span>
                <span className="text-[#4a7c59] font-light">60%</span>
              </div>
              <Progress value={60} className="h-3 bg-[#4a7c59]/20" />
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-[#3d3d3d] font-light">Biodiversity Index</span>
                <span className="text-[#4a7c59] font-light">85%</span>
              </div>
              <Progress value={85} className="h-3 bg-[#4a7c59]/20" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#4a7c59]/5">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">By The Numbers</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Projects Completed", value: 80 },
            { label: "Years Experience", value: 20 },
            { label: "Avg Energy Reduction", value: 40, suffix: "%" },
            { label: "Awards Received", value: 12 },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-light text-[#4a7c59] mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-[#3d3d3d]/60">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Our Team</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-[#4a7c59] text-white text-lg">
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-light text-[#3d3d3d]">{member.name}</h3>
                <Badge variant="outline" className="mt-2">{member.role}</Badge>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 border-t border-[#4a7c59]/20">
        <Reveal>
          <p className="text-center text-sm text-[#3d3d3d]/60 mb-6">Featured In</p>
        </Reveal>
        <div className="flex justify-center gap-8 flex-wrap">
          {["Dezeen", "Architectural Digest", "Wallpaper*", "Icon"].map((pub, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <p className="text-[#3d3d3d]/40 font-light">{pub}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Client Testimonials</h2>
        </Reveal>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {[1, 2, 3].map((idx) => (
              <CarouselItem key={idx}>
                <Card className="bg-[#4a7c59]/5 border-none">
                  <CardContent className="p-8">
                    <p className="text-lg text-[#3d3d3d] mb-6 italic">"VERDE transformed our vision into reality. Their commitment to sustainability never wavered."</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 bg-[#4a7c59] text-white">
                        <AvatarFallback>C{idx}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-light text-[#3d3d3d]">Client {idx}</p>
                        <p className="text-sm text-[#3d3d3d]/60">Project Lead</p>
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

      <section className="py-24 px-6 md:px-12 bg-[#4a7c59]/5">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { q: "What is your design process?", a: "We conduct extensive site analysis, stakeholder interviews, and climate modeling before design." },
            { q: "How long does a project take?", a: "Residential projects typically take 18-24 months from concept to completion." },
            { q: "Do you handle permits?", a: "Yes, we manage all permitting and regulatory compliance processes." },
            { q: "What green certifications do you pursue?", a: "We target LEED Platinum, Living Building Challenge, and Fitwel certifications." },
          ].map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Design Philosophy</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Regenerative Design", desc: "Buildings that give back to their ecosystems more than they take, creating net-positive environmental impact." },
            { title: "Human-Centered", desc: "Spaces designed around occupant wellness, with natural light, ventilation, and connection to nature." },
            { title: "Future-Proof", desc: "Adaptive designs that anticipate climate change and evolving needs, standing the test of time." },
          ].map((phil, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div>
                <h3 className="text-2xl font-light text-[#4a7c59] mb-4">{phil.title}</h3>
                <p className="text-[#3d3d3d]/70">{phil.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#4a7c59]/5">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Recent Case Studies</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            { title: "Oakwood Residence", challenge: "Mixed-use residential in fire zone", solution: "Fire-resistant timber systems with passive survivability design" },
            { title: "Green Harbor Office", challenge: "Zero-carbon office building", solution: "Solar + wind hybrid with geothermal heating/cooling" },
          ].map((study, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#4a7c59]/20">
                <CardContent className="p-6">
                  <h4 className="text-lg font-light text-[#3d3d3d] mb-3">{study.title}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#4a7c59] font-light">Challenge</p>
                      <p className="text-[#3d3d3d]/70">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#4a7c59] font-light">Solution</p>
                      <p className="text-[#3d3d3d]/70">{study.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Certifications & Recognition</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["LEED Platinum", "WELL Certified", "Passive House", "Living Building Challenge", "Fitwel", "Net Zero Ready", "Carbon Trust", "AIA Committee"].map((cert, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <Card className="bg-[#f8f6f2] border-[#4a7c59]/10 text-center">
                <CardContent className="p-6">
                  <p className="text-sm font-light text-[#4a7c59]">{cert}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#4a7c59]/5">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Awards & Accolades</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { year: "2024", award: "Architectural Record Design Awards - Residential", project: "Zenith Tower, Austin TX" },
            { year: "2023", award: "AIA Committee for the Environment Award", project: "Green Harbor Office Complex" },
            { year: "2023", award: "Dezeen Awards - Sustainable Buildings", project: "Watershed Center, Boston MA" },
            { year: "2022", award: "International Architecture Award", project: "Civic Commons Plaza" },
          ].map((award, idx) => (
            <AccordionItem key={idx} value={`award-${idx}`}>
              <AccordionTrigger>{award.year} - {award.award}</AccordionTrigger>
              <AccordionContent>Project: {award.project}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Contact & Services</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <Reveal>
            <div>
              <h3 className="text-2xl font-light text-[#3d3d3d] mb-6">Get In Touch</h3>
              <div className="space-y-4 text-[#3d3d3d]/70">
                <div>
                  <p className="font-light text-[#4a7c59] text-sm">New York Office</p>
                  <p>220 Park Avenue South, Suite 1800</p>
                  <p>New York, NY 10003</p>
                </div>
                <div>
                  <p className="font-light text-[#4a7c59] text-sm">Phone</p>
                  <p>+1 (212) 555-0100</p>
                </div>
                <div>
                  <p className="font-light text-[#4a7c59] text-sm">Email</p>
                  <p>info@verdearchs.com</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="text-2xl font-light text-[#3d3d3d] mb-6">Services We Offer</h3>
              <ul className="space-y-3 text-[#3d3d3d]/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#4a7c59] font-light">›</span>
                  <span>Master Planning & Urban Design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4a7c59] font-light">›</span>
                  <span>LEED/Passive House Certification</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4a7c59] font-light">›</span>
                  <span>Energy Modeling & Optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4a7c59] font-light">›</span>
                  <span>Material Specification & Sourcing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4a7c59] font-light">›</span>
                  <span>Retrofit & Renovation Consulting</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#4a7c59]">Start Your Sustainable Project</h2>
        </Reveal>
        <div className="text-center">
          <p className="text-lg text-[#3d3d3d]/70 mb-8">Schedule a consultation with our team to discuss your vision</p>
          <MagneticBtn className="px-12 py-4 bg-[#4a7c59] text-white font-light rounded-lg hover:bg-[#3d6345] transition-colors">
            Book Consultation
          </MagneticBtn>
        </div>
      </section>
    </div>
  )
}
