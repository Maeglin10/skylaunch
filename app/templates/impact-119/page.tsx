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

const EVENT_TYPES = {
  Weddings: {
    gallery: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600", "https://images.unsplash.com/photo-1546032996-6dfacbacbf91?q=80&w=600"],
    price: "From €8,000"
  },
  Corporate: {
    gallery: ["https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600", "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600"],
    price: "From €5,000"
  },
  Galas: {
    gallery: ["https://images.unsplash.com/photo-1519915212116-7cfef71f8b3d?q=80&w=600", "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600", "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600"],
    price: "From €12,000"
  },
  Birthdays: {
    gallery: ["https://images.unsplash.com/photo-1530268729831-4be0ea6ce141?q=80&w=600", "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=600", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600"],
    price: "From €3,000"
  },
  "Brand Launches": {
    gallery: ["https://images.unsplash.com/photo-1519915212116-7cfef71f8b3d?q=80&w=600", "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600", "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600"],
    price: "From €10,000"
  }
}

const SERVICES = [
  { name: "Venue Sourcing", desc: "Curated locations matching your vision" },
  { name: "Florals", desc: "Bespoke arrangements & installations" },
  { name: "Catering", desc: "Michelin-inspired menus" },
  { name: "AV & Lighting", desc: "Professional sound & immersive design" },
  { name: "Décor", desc: "Custom themed environments" },
  { name: "Entertainment", desc: "Live bands, DJs, performers" },
  { name: "Photography", desc: "Full event coverage + albums" },
  { name: "Coordination", desc: "Day-of management & logistics" },
]

const TESTIMONIALS = [
  { client: "Jane & Mark", event: "Wedding", feedback: "Bloom exceeded every expectation. Magical night.", rating: 5 },
  { client: "Luxury Brand Co", event: "Product Launch", feedback: "Perfect execution. Our guests are still talking about it.", rating: 5 },
  { client: "Sarah's 50th", event: "Birthday Gala", feedback: "Best party ever. Worth every penny.", rating: 5 },
]

const PACKAGES = [
  { name: "Full Service", desc: "Complete planning from concept to execution", features: ["Venue sourcing", "All décor", "Catering", "Entertainment", "Photography", "Day-of coordination"] },
  { name: "Day-Of", desc: "On-site management only", features: ["Timeline coordination", "Vendor management", "Guest flow", "Troubleshooting", "Timeline adherence"] },
  { name: "Partial", desc: "Pick your services", features: ["Venue + catering", "Décor only", "Entertainment + AV", "Photography package", "Florals design"] },
]

export default function BloomEventsPage() {
  const [activeTab, setActiveTab] = useState("Weddings")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div style={{ background: "#fff", color: "#1e293b" }}>
      {/* Hero Parallax */}
      <motion.section style={{ y: parallaxY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1400"
          alt="luxury event"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-black mb-6 text-white drop-shadow-lg">BLOOM EVENTS</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl text-white mb-8 drop-shadow-md">Luxury Event Planning for Unforgettable Moments</p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-12 py-4 text-lg font-bold text-black" style={{ background: "#d4af37", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
              PLAN YOUR EVENT
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.section>

      {/* Event Type Tabs */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center">EVENT TYPES</h2>
        </Reveal>
        <Tabs defaultValue="Weddings" className="w-full">
          <TabsList className="flex justify-center gap-2 mb-12 bg-transparent flex-wrap">
            {Object.keys(EVENT_TYPES).map((type) => (
              <TabsTrigger key={type} value={type} className="px-6 py-2 font-bold text-lg border border-slate-300 data-[state=active]:bg-amber-100 data-[state=active]:text-black data-[state=active]:border-amber-400">
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(EVENT_TYPES).map(([type, data]) => (
            <TabsContent key={type} value={type}>
              <Reveal>
                <Card className="bg-white border-2 border-slate-200">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-4xl font-black mb-6">{type}</h3>
                        <p className="text-lg text-slate-600 mb-8">Create memorable moments with our expert coordination and design.</p>
                        <Badge className="px-4 py-2 text-lg font-bold" style={{ background: "#d4af37", color: "#1e293b" }}>
                          {data.price}
                        </Badge>
                      </div>
                      <Carousel className="w-full">
                        <CarouselContent>
                          {data.gallery.map((img, i) => (
                            <CarouselItem key={i}>
                              <div className="relative h-96 rounded-lg overflow-hidden">
                                <Image src={img} alt={`${type} ${i}`} fill className="object-cover" />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center">OUR SERVICES</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <Card className="bg-amber-50 border-2 border-amber-200 hover:border-amber-400 transition-colors">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-3" style={{ color: "#d4af37" }}>{s.name}</h3>
                  <p className="text-slate-600">{s.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 500, label: "Events Planned" },
            { num: 12, label: "Years of Excellence", suffix: "" },
            { num: 4.9, label: "Rating", suffix: "★" },
            { num: 98, label: "Exceeded Expectations", suffix: "%" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="text-5xl font-black mb-2" style={{ color: "#d4af37" }}>
                  <Counter target={Math.floor(stat.num)} suffix={stat.suffix || ""} />
                </div>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-100 rounded-lg">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center">CLIENT TESTIMONIALS</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Reveal>
                  <Card className="bg-white border-2 border-amber-200">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(t.rating)].map((_, j) => (
                          <span key={j} className="text-2xl">★</span>
                        ))}
                      </div>
                      <p className="text-lg text-slate-700 mb-4 italic">"{t.feedback}"</p>
                      <p className="font-black">{t.client}</p>
                      <p className="text-sm text-slate-500">{t.event}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Packages */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center">PACKAGES</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <Card className={`border-2 transition-transform hover:scale-105 ${i === 0 ? "border-amber-400 bg-amber-50" : "border-amber-200 bg-white"}`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-2" style={{ color: "#d4af37" }}>{p.name}</h3>
                  <p className="text-slate-600 mb-6">{p.desc}</p>
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: "#d4af37" }} />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center">FAQS</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "What's the typical deposit?", a: "50% upfront to secure dates and begin planning." },
            { q: "How much lead time do you need?", a: "Ideally 3-6 months for weddings, 4 weeks for corporate events." },
            { q: "Do you recommend vendors?", a: "Yes, we have trusted partnerships with the best in the industry." },
            { q: "Can you handle international events?", a: "Absolutely, we've coordinated events across Europe." },
            { q: "Are there hidden fees?", a: "No, we provide transparent, detailed quotes upfront." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-amber-200">
              <AccordionTrigger className="hover:text-amber-600">{item.q}</AccordionTrigger>
              <AccordionContent className="text-slate-600">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6">Let's Create Magic</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn className="px-16 py-5 text-xl font-bold text-black" style={{ background: "#d4af37", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
            SCHEDULE CONSULTATION
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Inquiry Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-2 border-amber-300">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black" style={{ color: "#d4af37" }}>EVENT INQUIRY</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 rounded border-2 border-amber-200 text-black placeholder:text-gray-500" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded border-2 border-amber-200 text-black placeholder:text-gray-500" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-2 rounded border-2 border-amber-200 text-black placeholder:text-gray-500" />
            <select className="w-full px-4 py-2 rounded border-2 border-amber-200 text-black bg-white">
              <option>Event Type...</option>
              <option>Wedding</option>
              <option>Corporate</option>
              <option>Gala</option>
              <option>Birthday</option>
              <option>Brand Launch</option>
            </select>
            <textarea placeholder="Tell us about your vision" rows={4} className="w-full px-4 py-2 rounded border-2 border-amber-200 text-black placeholder:text-gray-500" />
            <button className="w-full py-3 font-black rounded text-black" style={{ background: "#d4af37" }}>
              REQUEST CONSULTATION
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
