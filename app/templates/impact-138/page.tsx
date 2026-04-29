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
import { Menu, X, Award, Building2, MapPin, Calendar, ArrowRight } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const step = target / (duration / 16)
    const t = setInterval(() => setCount(c => { const next = c + step; if (next >= target) { clearInterval(t); return target; } return next; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`cursor-pointer transition-all duration-200 ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default function StratumArchitecture() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollY } = useScroll()

  const projects = {
    residential: [
      { id: 1, name: "Twin Towers Residence", year: "2022", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=400&auto=format&fit=crop", challenge: "Sustainable luxury in dense urban context", approach: "Passive design + green facades", result: "+40% energy efficiency", awards: ["RIBA", "World Arch"] },
      { id: 2, name: "Coastal Cliff House", year: "2021", img: "https://images.unsplash.com/photo-1512207736139-a2c5572f6d82?q=80&w=400&auto=format&fit=crop", challenge: "Minimize environmental impact", approach: "Cantilevered design with local materials", result: "Zero net carbon", awards: ["AIA"] },
      { id: 3, name: "Garden Pavilion", year: "2023", img: "https://images.unsplash.com/photo-1513161455079-7ef1a827e90c?q=80&w=400&auto=format&fit=crop", challenge: "Integrate with landscape", approach: "Transparent floor + natural ventilation", result: "Seamless indoor-outdoor flow", awards: ["Dezeen"] },
      { id: 4, name: "Penthouse Studio", year: "2022", img: "https://images.unsplash.com/photo-1572120471610-62d05e9e5e78?q=80&w=400&auto=format&fit=crop", challenge: "Maximize 360° views", approach: "Structural glass shell", result: "65% transparency", awards: ["WA"] },
      { id: 5, name: "Wellness Retreat", year: "2023", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop", challenge: "Health-focused design", approach: "Biophilic architecture + air quality", result: "100% natural light", awards: ["Wallpaper*"] },
      { id: 6, name: "Heritage Conversion", year: "2023", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop", challenge: "Preserve historic facade", approach: "Hidden modern structure", result: "Certificate of Merit", awards: ["Historic Trust"] },
    ],
    commercial: [
      { id: 7, name: "Tech HQ Campus", year: "2023", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop", challenge: "Collaborative spaces", approach: "Modular cluster design", result: "Productivity +35%", awards: ["RIBA"] },
      { id: 8, name: "Retail Innovation", year: "2022", img: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=400&auto=format&fit=crop", challenge: "Experiential retail", approach: "Interactive facades + AI integration", result: "Sales growth", awards: [] },
    ],
    cultural: [
      { id: 9, name: "Museum of Light", year: "2022", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=400&auto=format&fit=crop", challenge: "Perfect lighting control", approach: "Parametric skylights", result: "Daylight optimization", awards: ["Dezeen"] },
    ],
  }

  const awards = [
    { year: 2023, name: "Pritzker Architecture Prize" },
    { year: 2022, name: "AIA National Honors" },
    { year: 2021, name: "RIBA Stirling Prize" },
    { year: 2020, name: "Wallpaper* Design Award" },
  ]

  const services = [
    { name: "Concept Design", items: ["Vision & Strategy", "Site Analysis", "Feasibility Studies"] },
    { name: "Schematic Design", items: ["Space Planning", "Massing Studies", "Preliminary Renders"] },
    { name: "Design Development", items: ["3D Coordination", "Material Selection", "Systems Integration"] },
    { name: "Construction Docs", items: ["Detailed Drawings", "Specifications", "Coordination"] },
  ]

  const team = [
    { name: "Patricia Chen", role: "Principal Architect", uni: "Harvard GSD", bio: "30 years in transformative design" },
    { name: "Marco Rossi", role: "Design Director", uni: "Politecnico di Milano", bio: "Parametric design pioneer" },
    { name: "Amara Okafor", role: "Sustainability Lead", uni: "TU Delft", bio: "Carbon-neutral specialists" },
    { name: "James Sullivan", role: "Project Director", uni: "Yale", bio: "Complex delivery expert" },
  ]

  return (
    <div style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Rubik:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Rubik', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Mono', monospace; letter-spacing: 0.1em; }
      `}</style>

      {/* Mobile Nav */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button className="fixed top-6 left-6 z-50 md:hidden cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur p-2 rounded-lg">
            <Menu className="w-6 h-6 text-[#1a1a1a]" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white border-[#d4c5b0]/20">
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="#portfolio" className="text-lg font-semibold text-[#bf5b2a] cursor-pointer hover:text-[#1a1a1a]">Portfolio</Link>
            <Link href="#services" className="text-lg font-semibold text-[#bf5b2a] cursor-pointer hover:text-[#1a1a1a]">Services</Link>
            <Link href="#team" className="text-lg font-semibold text-[#bf5b2a] cursor-pointer hover:text-[#1a1a1a]">Team</Link>
            <Link href="#faq" className="text-lg font-semibold text-[#bf5b2a] cursor-pointer hover:text-[#1a1a1a]">FAQ</Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop" alt="Architecture" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight uppercase">Stratum</h1>
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="h-1 bg-[#bf5b2a]" animate={{ width: [20, 60, 20] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
              ))}
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8">Award-Winning Architecture Firm</p>
            <MagneticBtn className="px-8 py-4 bg-[#bf5b2a] text-white rounded-sm font-semibold hover:bg-[#9d4819]">View Portfolio</MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-4 uppercase">Our Projects</h2>
          <p className="text-lg text-[#666] mb-12">80 projects across 20 countries. Every one a statement.</p>
        </Reveal>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-[#d4c5b0] rounded-sm p-1">
            <TabsTrigger value="residential" className="cursor-pointer uppercase text-xs">Residential</TabsTrigger>
            <TabsTrigger value="commercial" className="cursor-pointer uppercase text-xs">Commercial</TabsTrigger>
            <TabsTrigger value="cultural" className="cursor-pointer uppercase text-xs">Cultural</TabsTrigger>
            <TabsTrigger value="urban" className="cursor-pointer uppercase text-xs">Urban</TabsTrigger>
            <TabsTrigger value="adaptive" className="cursor-pointer uppercase text-xs">Adaptive</TabsTrigger>
          </TabsList>

          {["residential", "commercial", "cultural"].map((category) => (
            <TabsContent key={category} value={category} className="mt-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects[category as keyof typeof projects]?.map((proj, idx) => (
                  <Reveal key={proj.id} delay={idx * 0.1}>
                    <Card className="bg-white border-[#d4c5b0] hover:shadow-xl cursor-pointer transition-all duration-300 group overflow-hidden"
                      onClick={() => { setSelectedProject(proj.id); setDialogOpen(true); }}>
                      <CardContent className="p-0 relative aspect-square overflow-hidden">
                        <Image src={proj.img} alt={proj.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div />
                          <div>
                            <h3 className="font-bold text-lg mb-2">{proj.name}</h3>
                            <p className="text-sm opacity-90">{proj.year}</p>
                          </div>
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

      {/* Awards Marquee */}
      <section className="py-12 px-6 bg-white/50 border-y border-[#d4c5b0] my-12 overflow-hidden">
        <Reveal>
          <p className="text-center text-sm uppercase text-[#666] mb-8 font-bold tracking-wider">Recognition & Awards</p>
        </Reveal>
        <div className="flex gap-16 animate-scroll">
          {["Pritzker Prize", "AIA Honors", "RIBA Stirling", "Dezeen Award", "Wallpaper*", "World Architecture", ...Array(4).fill(null)].map((award, i) => (
            <div key={i} className="whitespace-nowrap text-lg font-bold text-[#bf5b2a] uppercase tracking-wider">
              {award}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12 uppercase">Our Services</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#d4c5b0] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <h3 className="font-bold text-[#1a1a1a] mb-4 uppercase text-lg">{svc.name}</h3>
                  <ul className="space-y-2">
                    {svc.items.map((item, i) => (
                      <li key={i} className="text-sm text-[#666] flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-[#bf5b2a]" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-[#d4c5b0]/10 rounded-3xl">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 80, label: "Projects Delivered" },
            { num: 20, label: "Years in Practice" },
            { num: 15, label: "Countries Represented" },
            { num: 12, label: "Major Awards" },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div>
                <p className="text-5xl font-bold text-[#bf5b2a] mb-2"><Counter target={stat.num} /></p>
                <p className="text-[#666] uppercase text-sm font-semibold tracking-wider">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12 uppercase">Leadership Team</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#d4c5b0] hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-[#bf5b2a]">
                    <AvatarFallback className="bg-[#d4c5b0] text-[#1a1a1a] text-lg font-bold">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-[#1a1a1a] text-center mb-1 uppercase text-sm">{member.name}</h3>
                  <p className="text-xs text-[#bf5b2a] text-center mb-4 uppercase tracking-wider">{member.role}</p>
                  <Badge variant="outline" className="block w-full text-center border-[#d4c5b0] text-[#666] text-xs mb-3">{member.uni}</Badge>
                  <p className="text-xs text-[#666] text-center">{member.bio}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process Accordion */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12 uppercase">Design Process</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { title: "Concept & Strategy", desc: "Deep site analysis, stakeholder interviews, and competitive research to establish a clear architectural vision aligned with project goals." },
            { title: "Schematic Design", desc: "Conceptual layouts, massing studies, and initial renderings to explore design directions and gain client buy-in early." },
            { title: "Design Development", desc: "Refinement of materials, systems, and details. 3D coordination ensures all disciplines work seamlessly together." },
            { title: "Construction Documents", desc: "Comprehensive drawings, specifications, and coordination drawings that guide construction with precision." },
            { title: "Site Administration", desc: "Regular site visits, RFI reviews, and quality assurance to ensure design intent is realized in the built form." },
          ].map((step, idx) => (
            <AccordionItem key={idx} value={`step-${idx}`} className="border border-[#d4c5b0] rounded-sm px-6">
              <AccordionTrigger className="text-[#1a1a1a] font-bold cursor-pointer hover:text-[#bf5b2a] transition-colors uppercase text-sm tracking-wider">{step.title}</AccordionTrigger>
              <AccordionContent className="text-[#666]">{step.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12 uppercase">Client Testimonials</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: "Stratum understood our vision and elevated it beyond expectations. A true partner.", company: "Tech Startup", project: "HQ Campus" },
            { text: "Working with Stratum set a new standard for how architecture should be practiced.", company: "Luxury Developer", project: "Residential" },
            { text: "From concept to completion, their attention to every detail was remarkable.", company: "Museum", project: "Cultural" },
          ].map((test, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#d4c5b0]">
                <CardContent className="p-6">
                  <p className="text-[#666] mb-6 italic">"{test.text}"</p>
                  <div className="border-t border-[#d4c5b0] pt-4">
                    <p className="font-semibold text-[#1a1a1a]">{test.company}</p>
                    <Badge variant="outline" className="border-[#d4c5b0] text-[#666] text-xs mt-2">{test.project}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12 uppercase">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "How do you establish your fees?", a: "We use a hybrid model: hourly rates for pre-design, fixed fees for design phases, and cost-plus for administration. We're transparent about costs." },
            { q: "What's your typical project timeline?", a: "Residential: 18-24 months. Commercial: 24-36 months. This includes design, permitting, and construction administration." },
            { q: "Do you help with planning permissions?", a: "Yes. We manage all regulatory interactions and have strong relationships with city planning departments." },
            { q: "How do you approach sustainability?", a: "Carbon-neutral design is standard. We target net-zero energy, material reuse, and circular economy principles." },
            { q: "Can you work on adaptive reuse projects?", a: "Absolutely. We specialize in breathing new life into historic structures while meeting modern standards." },
            { q: "What's your geographic reach?", a: "We work globally. Our team has experience in 15 countries with diverse climates and regulations." },
          ].map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border border-[#d4c5b0] rounded-sm px-6">
              <AccordionTrigger className="text-[#1a1a1a] font-semibold cursor-pointer hover:text-[#bf5b2a] transition-colors">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-[#666]">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4 uppercase">Ready to Build?</h2>
            <p className="text-lg mb-8 opacity-90">Schedule a consultation to discuss your next transformative project.</p>
            <MagneticBtn className="px-8 py-3 bg-[#bf5b2a] text-white rounded-sm font-semibold hover:bg-[#9d4819]">Start Consultation</MagneticBtn>
          </div>
        </Reveal>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-[#d4c5b0] max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a] uppercase tracking-wider">Project Details</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image src={`https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop`} alt="Project" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] uppercase mb-2">Project {selectedProject}</h3>
                <p className="text-[#666] mb-4">Challenge: Complex urban integration with sustainability at core</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#bf5b2a] uppercase mb-2">Approach</p>
                    <p className="text-[#666]">Parametric design + biomimicry principles</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#bf5b2a] uppercase mb-2">Result</p>
                    <p className="text-[#666]">65% energy reduction + user satisfaction +45%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4 uppercase font-bold tracking-wider">Stratum Architecture</p>
          <p className="text-sm text-[#999]">Designing buildings that shape futures © 2024</p>
        </div>
      </footer>
    </div>
  )
}
