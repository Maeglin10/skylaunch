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

function WaveBar() {
  return (
    <div className="flex gap-1 h-16 items-end justify-center">
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <motion.div
          key={i}
          className="w-2 rounded-full"
          style={{ background: "#d4a017" }}
          animate={{ height: ["40px", "80px", "40px"] }}
          transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

const STUDIOS = [
  { id: 1, name: "Studio A", type: "Full-Service", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop", rate: "$3,500/day" },
  { id: 2, name: "Studio B", type: "Tracking Suite", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop", rate: "$2,800/day" },
  { id: 3, name: "Vocal Booth", type: "Vocal Isolation", image: "https://images.unsplash.com/photo-1514984879728-be0681b75d4f?w=800&auto=format&fit=crop", rate: "$1,200/day" },
  { id: 4, name: "Mixing Suite", type: "Mastering & Mix", image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&auto=format&fit=crop", rate: "$2,000/day" },
]

const SERVICES = [
  { name: "Recording", description: "Pristine vocal and instrumental capture with world-class engineers" },
  { name: "Mixing", description: "Comprehensive mixing with analog warmth and digital precision" },
  { name: "Mastering", description: "Final polish for vinyl, streaming, broadcast and theatrical release" },
  { name: "Production", description: "Full production from composition through final masters" },
]

const ARTISTS = [
  { name: "Luna Artistry", genre: "Indie Pop", image: "https://i.pravatar.cc/150?img=5" },
  { name: "The Nocturnes", genre: "Jazz", image: "https://i.pravatar.cc/150?img=6" },
  { name: "Echo Protocols", genre: "Electronic", image: "https://i.pravatar.cc/150?img=7" },
  { name: "Chromatic Shift", genre: "Classical", image: "https://i.pravatar.cc/150?img=8" },
]

const EQUIPMENT = ["SSL", "Neve", "Pro Tools", "Genelec", "Neumann", "Avalon", "Universal Audio"]

export default function SoundForgePage() {
  const [selectedStudio, setSelectedStudio] = useState(0)
  const [isStudioOpen, setIsStudioOpen] = useState(false)
  const [sessionDays, setSessionDays] = useState(5)

  const pricing = sessionDays * 3000

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      {/* Hero with WaveBar */}
      <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&auto=format&fit=crop"
          alt="Sound Forge Studios"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div className="relative z-10 text-center">
          <WaveBar />
          <h1 className="text-7xl md:text-8xl font-light text-white mt-8 mb-4" style={{ fontFamily: "Georgia, serif" }}>SOUND FORGE</h1>
          <p className="text-xl text-white/80">Premium Recording Studio - Where Artistry Meets Excellence</p>
        </motion.div>
      </section>

      {/* Studio Tabs */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#080808" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-16 text-white">Our Studios</h2>
            <Tabs defaultValue="studio-0" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12" style={{ background: "transparent" }}>
                {STUDIOS.map((s, idx) => (
                  <TabsTrigger key={idx} value={`studio-${idx}`} className="text-lg" style={{ color: "#d4a017" }}>
                    {s.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {STUDIOS.map((studio, idx) => (
                <TabsContent key={idx} value={`studio-${idx}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                      <Carousel>
                        <CarouselContent>
                          {[0, 1, 2].map(i => (
                            <CarouselItem key={i}>
                              <Image
                                src={studio.image}
                                alt={studio.name}
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
                    </div>
                    <div style={{ color: "#f0ebe0" }}>
                      <h3 className="text-4xl font-light mb-6">{studio.name}</h3>
                      <div className="space-y-4 mb-8">
                        <div>
                          <p className="text-sm opacity-70">Type</p>
                          <p className="text-xl">{studio.type}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-70">Rate</p>
                          <Badge style={{ background: "#d4a017", color: "#080808" }}>{studio.rate}</Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm opacity-70 mb-2">Equipment Highlights</p>
                        <ul className="space-y-1 text-sm">
                          {EQUIPMENT.slice(0, 3).map(e => <li key={e}>• {e}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Reveal>
      </section>

      {/* Services Cards */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#1c1c2e" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-white">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {SERVICES.map((s, idx) => (
                <Card key={idx} style={{ background: "#080808", border: "1px solid #d4a01733" }}>
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-light mb-3 text-white">{s.name}</h3>
                    <p style={{ color: "#f0ebe0" }} className="opacity-80">{s.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Equipment Marquee */}
      <section className="py-12 px-8 overflow-hidden" style={{ background: "#080808" }}>
        <Reveal>
          <div className="flex gap-8 whitespace-nowrap">
            {[...EQUIPMENT, ...EQUIPMENT].map((e, idx) => (
              <div key={idx} className="flex-shrink-0 text-2xl font-light text-white/40">
                {e}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#d4a017" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-black">
              <div><div className="text-5xl font-light mb-2"><Counter target={500} suffix="+" /></div><p className="text-sm opacity-80">Albums Recorded</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={30} /></div><p className="text-sm opacity-80">Years Excellence</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={12} /></div><p className="text-sm opacity-80">Grammy Awards</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={200} suffix="+" /></div><p className="text-sm opacity-80">Artists</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Artist Alumni */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#080808" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-white">Artist Alumni</h2>
            <Carousel>
              <CarouselContent>
                {ARTISTS.map((a, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2">
                    <div className="flex items-center gap-6 p-8" style={{ background: "#1c1c2e", borderRadius: "1rem" }}>
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={a.image} />
                        <AvatarFallback>{a.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xl font-light text-white">{a.name}</p>
                        <Badge style={{ background: "#d4a017", color: "#080808" }}>{a.genre}</Badge>
                      </div>
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

      {/* Session Pricing Slider */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#1c1c2e" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-light mb-8 text-white">Session Pricing</h2>
            <div className="mb-8">
              <p className="text-6xl font-light text-white mb-4">${pricing.toLocaleString()}</p>
              <p style={{ color: "#f0ebe0" }}>for {sessionDays} days</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span style={{ color: "#f0ebe0" }}>1 day</span>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={sessionDays}
                  onChange={(e) => setSessionDays(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span style={{ color: "#f0ebe0" }}>30 days</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#080808" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-center text-white">What Artists Say</h2>
            <Carousel>
              <CarouselContent>
                {[
                  { text: "Sound Forge captured my vision with technical brilliance and artistic intuition.", author: "Luna Artistry" },
                  { text: "The team understood my sound before I finished explaining it.", author: "Echo Protocols" },
                ].map((t, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-12 rounded-lg text-center" style={{ background: "#1c1c2e" }}>
                      <p className="text-xl italic mb-6 text-white">"{t.text}"</p>
                      <p style={{ color: "#d4a017" }}>— {t.author}</p>
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
      <section className="py-24 px-8 md:px-20" style={{ background: "#1c1c2e" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-white">FAQ</h2>
            <Accordion type="single" collapsible>
              {[
                { q: "What is included in a session?", a: "Studio time, engineering, mixing preparation, and access to all equipment." },
                { q: "Do you offer remote sessions?", a: "Yes, we facilitate remote collaboration with top-tier video conferencing and file transfer." },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="border-b" style={{ borderColor: "#d4a017" }}>
                  <AccordionTrigger style={{ color: "#f0ebe0" }}>{item.q}</AccordionTrigger>
                  <AccordionContent style={{ color: "#d4a017" }}>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* Booking CTA */}
      <section className="py-24 px-8 md:px-20 text-center" style={{ background: "#d4a017" }}>
        <Reveal>
          <h2 className="text-5xl font-light text-black mb-8">Book Your Session</h2>
          <Dialog>
            <motion.button
              className="px-12 py-4 bg-black text-white font-light"
              whileHover={{ scale: 1.05 }}
            >
              Reserve Studio Time
            </motion.button>
            <DialogContent style={{ background: "#1c1c2e" }}>
              <DialogHeader>
                <DialogTitle style={{ color: "#f0ebe0" }}>Book Your Recording Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input type="text" placeholder="Artist Name" className="w-full p-3 border rounded" style={{ background: "#080808", color: "#f0ebe0" }} />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" style={{ background: "#080808", color: "#f0ebe0" }} />
                <textarea placeholder="Project Details" className="w-full p-3 border rounded" rows={4} style={{ background: "#080808", color: "#f0ebe0" }} />
                <button className="w-full py-3 text-black font-light" style={{ background: "#d4a017" }}>Send Inquiry</button>
              </div>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
