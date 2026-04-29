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

const FILMS = [
  { id: 1, title: "The Silent Canvas", director: "Marie Leclerc", type: "Narrative", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop", festivals: ["Cannes", "Berlin"], awards: "Palme d'Or" },
  { id: 2, title: "Urban Echoes", director: "Jean Dupont", type: "Documentary", image: "https://images.unsplash.com/photo-1533050487297-86d7930ac412?q=80&w=500&auto=format&fit=crop", festivals: ["Venice"], awards: "Best Doc" },
  { id: 3, title: "Chromatic Pulse", director: "Sofia Rossi", type: "Short", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=500&auto=format&fit=crop", festivals: ["Sundance"], awards: "Jury Prize" },
  { id: 4, title: "Luminous Dreams", director: "Alex Nolan", type: "Animation", image: "https://images.unsplash.com/photo-1485579149c0-123123db6f42?q=80&w=500&auto=format&fit=crop", festivals: ["Annecy"], awards: "Grand Prize" },
]

const FESTIVALS = [
  { name: "Cannes Film Festival", year: 2024, award: "Palme d'Or", month: "May" },
  { name: "Berlin Festival", year: 2024, award: "Golden Bear", month: "February" },
  { name: "Venice Festival", year: 2024, award: "Golden Lion", month: "September" },
  { name: "Sundance Festival", year: 2024, award: "Grand Jury Prize", month: "January" },
]

const DIRECTORS = [
  { name: "Marie Leclerc", role: "Narrative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", bio: "3x Palme d'Or nominee" },
  { name: "Jean Dupont", role: "Documentary Master", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", bio: "Emmy Award winner" },
  { name: "Sofia Rossi", role: "Short Films", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", bio: "Breakthrough 2023" },
  { name: "Alex Nolan", role: "Animation", image: "https://images.unsplash.com/photo-1517849845537-1d51a20414de?q=80&w=200&auto=format&fit=crop", bio: "Annecy Champion" },
]

const TESTIMONIALS = [
  { text: "Impact-97 transformed our film's career. Festival strategy to distribution was seamless.", author: "Director, Oscar Nominee" },
  { text: "Their post-production excellence elevated everything. Color grading was extraordinary.", author: "Producer, International Selection" },
  { text: "Finally a collective that understands independent cinema deeply.", author: "Emerging Filmmaker" },
]

const STATS = [{ value: 150, label: "Films" }, { value: 40, label: "Festivals" }, { value: 22, label: "Awards" }, { value: 15, label: "Countries" }]

const FAQ_ITEMS = [
  { q: "What formats do you accept?", a: "DCP, ProRes, 4K RAW. Minimum 2K for theatrical release eligibility." },
  { q: "What are submission fees?", a: "Zero submission fees. We partner commission-based, aligned with your success." },
  { q: "Distribution timeline?", a: "6-12 months from acquisition to theatrical release, depending on festival windows." },
  { q: "Do you handle all rights?", a: "Yes. Theatrical, digital, ancillary, and international rights management included." },
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

export default function IndieFilmCollective() {
  const [selectedTab, setSelectedTab] = useState("Narrative")
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <div className="bg-[#0d0d0d] text-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-md border-b border-[#f5c842]/10 z-50 flex items-center justify-between px-6">
        <div className="text-2xl font-bold tracking-wider">IMPACT-97</div>
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="#films" className="hover:text-[#f5c842] transition">Films</Link>
          <Link href="#festivals" className="hover:text-[#f5c842] transition">Festivals</Link>
          <Link href="#directors" className="hover:text-[#f5c842] transition">Directors</Link>
        </div>
      </nav>

      <motion.section style={{ opacity: heroOpacity, y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop" alt="Cinema" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f5c842 0%, transparent 50%)", opacity: 0.15 }} />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            INDEPENDENT CINEMA COLLECTIVE
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Empowering filmmakers worldwide. Festival strategy to theatrical distribution.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Dialog>
              <DialogTrigger asChild>
                <MagneticBtn className="px-8 py-4 bg-[#f5c842] text-black font-bold rounded-full hover:bg-[#f5c842]/90 transition">
                  Submit Your Film
                </MagneticBtn>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] border-[#f5c842]/20 max-w-md">
                <DialogTitle>Submit Your Film</DialogTitle>
                <form className="space-y-4">
                  <input type="text" placeholder="Film Title" className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#f5c842]/30 rounded text-white" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#f5c842]/30 rounded text-white" />
                  <input type="text" placeholder="Director Name" className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#f5c842]/30 rounded text-white" />
                  <input type="url" placeholder="Trailer or Festival Link" className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#f5c842]/30 rounded text-white" />
                  <button type="submit" className="w-full px-4 py-3 bg-[#f5c842] text-black font-bold rounded hover:bg-[#f5c842]/90 transition">
                    Submit Now
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.section>

      <section id="films" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-bold mb-4 text-center">Featured Catalog</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Award-winning films across narrative, documentary, short, and animation formats.</p>
        </Reveal>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#1a1a1a] border border-[#f5c842]/20 mb-8">
            {["Narrative", "Documentary", "Short", "Animation"].map((type) => (
              <TabsTrigger key={type} value={type} className="data-[state=active]:bg-[#f5c842] data-[state=active]:text-black">
                {type}
              </TabsTrigger>
            ))}
          </TabsList>

          {["Narrative", "Documentary", "Short", "Animation"].map((type) => (
            <TabsContent key={type} value={type} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FILMS.filter((f) => f.type === type).map((film, idx) => (
                <Reveal key={film.id} delay={idx * 0.1}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="bg-[#1a1a1a] border-[#f5c842]/20 cursor-pointer hover:border-[#f5c842]/50 transition overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                          <Image src={film.image} alt={film.title} fill className="object-cover group-hover:scale-110 transition" unoptimized />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                            <div className="w-12 h-12 text-[#f5c842] opacity-0 group-hover:opacity-100 transition">▶</div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">{film.title}</h3>
                          <p className="text-sm text-gray-400 mb-3">Director: {film.director}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="border-[#f5c842]/30 text-[#f5c842]">{film.awards}</Badge>
                            <Badge variant="outline" className="border-[#f5c842]/30 text-gray-300">{film.festivals[0]}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1a1a1a] border-[#f5c842]/20 max-w-2xl">
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold">{film.title}</h2>
                        <div className="aspect-video bg-black rounded overflow-hidden">
                          <Image src={film.image} alt={film.title} width={500} height={280} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Director</p>
                            <p className="font-bold">{film.director}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Award</p>
                            <p className="font-bold text-[#f5c842]">{film.awards}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-400 text-sm">Festival Selections</p>
                            <p className="font-bold">{film.festivals.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Reveal>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section id="festivals" className="py-24 px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1}>
            <h2 className="text-5xl font-bold text-center mb-4">Festival Timeline</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">Global premiere circuit across the world's most prestigious festivals.</p>
          </Reveal>

          <div className="space-y-8">
            {FESTIVALS.map((fest, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex items-center gap-6 group">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-sm text-gray-400">{fest.month}</p>
                    <p className="font-bold text-lg">{fest.year}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{fest.name}</h3>
                    <p className="text-gray-400">🏆 {fest.award}</p>
                  </div>
                  <Badge className="bg-[#f5c842] text-black font-bold">SELECTED</Badge>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="directors" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-bold text-center mb-4">Director Spotlights</h2>
          <p className="text-gray-400 text-center mb-12">Visionary storytellers shaping independent cinema.</p>
        </Reveal>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {DIRECTORS.map((dir) => (
              <CarouselItem key={dir.name} className="basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#1a1a1a] border-[#f5c842]/20 text-center">
                  <CardContent className="p-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={dir.image} alt={dir.name} />
                      <AvatarFallback>{dir.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{dir.name}</h3>
                    <p className="text-sm text-[#f5c842] mb-2">{dir.role}</p>
                    <p className="text-sm text-gray-400">{dir.bio}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-[#f5c842]/30" />
          <CarouselNext className="border-[#f5c842]/30" />
        </Carousel>
      </section>

      <section className="py-24 px-6 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <Reveal delay={0.1} className="mb-12">
            <h2 className="text-5xl font-bold text-center mb-4">Submissions FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-[#f5c842]/20">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#f5c842] transition">
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

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-bold text-center mb-4">Press Recognition</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((testi, idx) => (
              <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#1a1a1a] border-[#f5c842]/20 h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <p className="text-gray-300 italic mb-4 flex-1">"{testi.text}"</p>
                    <p className="text-sm text-[#f5c842] font-semibold">— {testi.author}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-[#f5c842]/30" />
          <CarouselNext className="border-[#f5c842]/30" />
        </Carousel>
      </section>

      <section className="py-24 px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="text-center">
              <div className="text-4xl font-bold text-[#f5c842] mb-2"><Counter target={stat.value} /></div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Share Your Vision?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join 150+ filmmakers who transformed their careers with Impact-97.</p>
          <Dialog>
            <DialogTrigger asChild>
              <MagneticBtn className="px-8 py-4 bg-[#f5c842] text-black font-bold rounded-full hover:bg-[#f5c842]/90 transition inline-flex items-center gap-2">
                Start Your Journey
              </MagneticBtn>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a1a] border-[#f5c842]/20">
              <DialogTitle>Get Started</DialogTitle>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#f5c842]/30 rounded text-white" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#f5c842]/30 rounded text-white" />
                <textarea placeholder="Tell us about your film..." className="w-full px-4 py-2 bg-[#0d0d0d] border border-[#f5c842]/30 rounded text-white h-24" />
                <button type="submit" className="w-full px-4 py-3 bg-[#f5c842] text-black font-bold rounded hover:bg-[#f5c842]/90 transition">
                  Submit
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
