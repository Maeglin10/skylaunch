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

const ARTISTS = [
  { id: 1, name: "Luna Echoes", genre: "Synthwave", streams: "15M", bio: "Pioneering electronic dreamscapes", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
  { id: 2, name: "Vinyl Collective", genre: "Hip-Hop", streams: "32M", bio: "Raw beats, authentic stories", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" },
  { id: 3, name: "Neon Nights", genre: "Indie Pop", streams: "8M", bio: "Modern indie sensibilities", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
  { id: 4, name: "Echo Protocol", genre: "Ambient", streams: "12M", bio: "Atmospheric sound design", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" },
  { id: 5, name: "Pulse Drive", genre: "Electronic", streams: "28M", bio: "High-energy electronic", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
  { id: 6, name: "Midnight Jazz", genre: "Jazz Fusion", streams: "9M", bio: "Contemporary jazz exploration", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" }
]

const RELEASES = [
  { title: "Neon Dreams", artist: "Luna Echoes", date: "2024-04-15", genre: "Synthwave", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
  { title: "Urban Legends", artist: "Vinyl Collective", date: "2024-04-08", genre: "Hip-Hop", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" },
  { title: "Chromatic Shift", artist: "Echo Protocol", date: "2024-04-01", genre: "Ambient", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
  { title: "Electric Paradise", artist: "Neon Nights", date: "2024-03-25", genre: "Indie Pop", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" }
]

const SERVICES = [
  { title: "Digital Distribution", desc: "Global reach across all streaming platforms", includes: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music"] },
  { title: "Physical Distribution", desc: "Vinyl & CD pressing with fulfillment", includes: ["Vinyl Pressing", "CD Duplication", "Shipping", "Inventory"] },
  { title: "Sync Licensing", desc: "Music placement in film, TV & games", includes: ["Licensing Deals", "Royalty Tracking", "Rights Management", "Market Access"] },
  { title: "Publishing", desc: "Full publishing administration", includes: ["Mechanical Licensing", "Performance Rights", "Collection Services", "Legal Support"] }
]

const TESTIMONIALS = [
  { name: "Maya Chen", artist: "Luna Echoes", text: "Dusk Records transformed my career. Professional, supportive, and truly passionate about artists.", genre: "Synthwave" },
  { name: "James Rivera", artist: "Vinyl Collective", text: "The best record label partnership I've had. They handle everything while I focus on music.", genre: "Hip-Hop" },
  { name: "Sofia Andersson", artist: "Neon Nights", text: "From unknown to 8M streams in 2 years. Dusk Records believed in us from day one.", genre: "Indie Pop" }
]

export default function DuskRecords() {
  const [selectedArtist, setSelectedArtist] = useState<typeof ARTISTS[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#08080c] via-[#1a1824] to-[#0f0f14] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-1/4 right-10 w-64 h-64 rounded-full border border-[#f59e0b]/10 pointer-events-none" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-1/3 left-5 w-80 h-80 rounded-full border border-[#7c3aed]/10 pointer-events-none" />

      {/* Parallax Hero */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1536523?w=800&q=80"
            alt="Music"
            fill
            className="object-cover brightness-20"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08080c]/50 to-[#08080c]" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <Reveal>
            <motion.h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] via-[#7c3aed] to-white">
              Dusk Records
            </motion.h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-12 font-light">Independent music label & distribution. 500 artists. 8 years. 2 billion streams.</p>
            <motion.div whileHover={{ x: 5 }} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-[#7c3aed] text-white rounded-lg font-semibold cursor-pointer hover:opacity-90">
              Explore Artists →
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Artist Roster */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">Artist Roster</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {ARTISTS.map((artist, i) => (
            <Reveal key={artist.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                onClick={() => { setSelectedArtist(artist); setDialogOpen(true) }}
                className="group cursor-pointer"
              >
                <Card className="border border-[#f59e0b]/20 hover:border-[#f59e0b]/50 bg-gradient-to-br from-[#1a1824] to-[#0f0f14] overflow-hidden transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={artist.img} alt={artist.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080c]/80 to-transparent" />
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <Badge className="mb-3 bg-[#f59e0b] text-[#08080c]">{artist.genre}</Badge>
                    <h3 className="text-xl font-bold mb-2">{artist.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{artist.streams} Streams</p>
                    <p className="text-xs text-amber-200 italic">{artist.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl bg-[#1a1824] border-[#f59e0b]/20">
            <DialogHeader>
              <DialogTitle className="text-[#f59e0b] text-2xl">{selectedArtist?.name}</DialogTitle>
            </DialogHeader>
            {selectedArtist && (
              <div className="space-y-6 text-gray-200">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image src={selectedArtist.img} alt={selectedArtist.name} fill className="object-cover" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#f59e0b]/10 p-4 rounded-lg border border-[#f59e0b]/20">
                    <p className="text-xs text-[#f59e0b] uppercase font-semibold">Genre</p>
                    <p className="text-lg font-bold mt-1">{selectedArtist.genre}</p>
                  </div>
                  <div className="bg-[#7c3aed]/10 p-4 rounded-lg border border-[#7c3aed]/20">
                    <p className="text-xs text-[#7c3aed] uppercase font-semibold">Streams</p>
                    <p className="text-lg font-bold mt-1">{selectedArtist.streams}</p>
                  </div>
                  <div className="bg-amber-100/10 p-4 rounded-lg border border-amber-100/20">
                    <p className="text-xs text-amber-200 uppercase font-semibold">Status</p>
                    <p className="text-lg font-bold mt-1">Rising</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">Discography</h4>
                  <Accordion type="single" collapsible className="space-y-2">
                    {["Latest Album", "Recent EP", "Greatest Hits"].map((disc, i) => (
                      <AccordionItem key={i} value={String(i)} className="border border-[#f59e0b]/20">
                        <AccordionTrigger className="text-sm font-semibold text-[#f59e0b]">{disc}</AccordionTrigger>
                        <AccordionContent className="text-gray-400">
                          <ul className="space-y-2">
                            <li>• 12 tracks</li>
                            <li>• Available on all platforms</li>
                            <li>• Streaming & download</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-white">Links</h4>
                  <div className="flex gap-3 flex-wrap">
                    {["Spotify", "Apple Music", "YouTube", "Instagram"].map((platform, i) => (
                      <Badge key={i} variant="outline" className="text-xs cursor-pointer hover:bg-[#f59e0b]/20">{platform}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* New Releases */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">New Releases</h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6">
          {RELEASES.map((release, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5 }} className="group">
                <Card className="border border-[#f59e0b]/20 bg-gradient-to-br from-[#1a1824] to-[#0f0f14] overflow-hidden">
                  <div className="relative h-40">
                    <Image src={release.img} alt={release.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-[#f59e0b] text-[#08080c] text-xs">{release.genre}</Badge>
                    <h3 className="text-lg font-bold mb-1">{release.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{release.artist}</p>
                    <p className="text-xs text-amber-200">{new Date(release.date).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">Services</h2>
        </Reveal>

        <Tabs defaultValue="Digital Distribution" className="w-full">
          <TabsList className="grid w-full grid-cols-4 gap-2 bg-[#1a1824] p-2 rounded-lg mb-12 border border-[#f59e0b]/20">
            {SERVICES.map((svc) => (
              <TabsTrigger
                key={svc.title}
                value={svc.title}
                className="text-xs md:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f59e0b] data-[state=active]:to-[#7c3aed] data-[state=active]:text-white"
              >
                {svc.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICES.map((service) => (
            <TabsContent key={service.title} value={service.title} className="mt-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-4xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">{service.title}</h3>
                  <p className="text-lg text-gray-400 mb-8">{service.desc}</p>
                  <ul className="space-y-4 mb-8">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticBtn className="px-6 py-3 bg-gradient-to-r from-[#f59e0b] to-[#7c3aed] text-white rounded-lg font-bold hover:opacity-90">
                    Learn More →
                  </MagneticBtn>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden border border-[#f59e0b]/20">
                  <Image src={`https://images.unsplash.com/photo-1514525253161-7a46d19cd${Math.random().toString().slice(-2)}?w=600`} alt={service.title} fill className="object-cover" />
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-gradient-to-r from-[#f59e0b]/10 to-[#7c3aed]/10 rounded-2xl border border-[#f59e0b]/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[{ v: 500, l: "Artists" }, { v: 8, l: "Years" }, { v: 2, s: "B", l: "Streams" }, { v: 45, l: "Countries" }].map((stat, i) => (
            <Reveal key={i}>
              <div>
                <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]"><Counter target={stat.v} suffix={stat.s || ""} /></p>
                <p className="text-gray-400 mt-2">{stat.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Studio Sessions */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">Studio Moments</h2>
        </Reveal>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [-100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-4"
          >
            {[...Array(2)].map((_, batch) =>
              RELEASES.map((release, i) => (
                <motion.div key={`${batch}-${i}`} className="flex-shrink-0 w-64">
                  <div className="relative h-64 rounded-lg overflow-hidden border border-[#f59e0b]/20 group">
                    <Image src={release.img} alt={release.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                      <div>
                        <p className="text-white font-bold">{release.title}</p>
                        <p className="text-sm text-amber-200">{release.artist}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">Artist Voices</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((testimonial, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border border-[#f59e0b]/20 bg-gradient-to-br from-[#1a1824] to-[#0f0f14]">
                  <CardContent className="p-8">
                    <div className="flex gap-2 mb-4">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#f59e0b]">★</span>)}
                    </div>
                    <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`https://images.unsplash.com/photo-150${i + 1}?w=100`} />
                        <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white">{testimonial.artist}</p>
                        <p className="text-xs text-[#f59e0b]">{testimonial.genre}</p>
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

      {/* Submission Portal */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">Submission Portal</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "Who can submit?", a: "Independent artists and producers worldwide. We review all submissions regardless of current following." },
            { q: "What formats do you accept?", a: "WAV, MP3, FLAC. Minimum 320kbps. Include full track metadata and artist bio." },
            { q: "What's the timeline?", a: "Submissions reviewed within 4-6 weeks. Accepted artists notified via email." },
            { q: "Who are your A&R contacts?", a: "Submit through our portal and your music will be reviewed by our entire A&R team. Personalized feedback provided." }
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-[#f59e0b]/20 px-6 rounded-lg bg-[#1a1824]/50">
              <AccordionTrigger className="font-semibold text-[#f59e0b]">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] to-[#7c3aed]">FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "What royalty rate do you offer?", a: "Competitive rates: 20% for digital, 15% for physical, 50% for sync. Higher rates for exclusive deals." },
            { q: "Do you require exclusivity?", a: "No standard exclusivity requirement. Negotiable on a per-artist basis depending on support level." },
            { q: "Can I get an advance?", a: "Yes. Advance amounts depend on streaming potential and label support commitment. Discussed during signing." },
            { q: "What does radio support look like?", a: "We pitch to independent and commercial radio. Campaign strategy developed per release. Track record of success across formats." }
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-[#f59e0b]/20 px-6 rounded-lg bg-[#1a1824]/50">
              <AccordionTrigger className="font-semibold text-[#f59e0b]">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#f59e0b] via-[#7c3aed] to-white rounded-2xl p-16 text-center">
            <h2 className="text-4xl font-black mb-6 text-[#08080c]">Ready to Join Dusk Records?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto text-[#08080c]">Submit your music and be part of our growing artist community. 2 billion streams. Countless stories.</p>
            <MagneticBtn
              onClick={() => setSubmitOpen(true)}
              className="px-12 py-4 bg-[#08080c] text-white rounded-lg font-bold cursor-pointer hover:bg-[#1a1824]"
            >
              Submit Your Demo
            </MagneticBtn>
          </div>
        </Reveal>

        <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
          <DialogContent className="max-w-2xl bg-[#1a1824] border-[#f59e0b]/20">
            <DialogHeader>
              <DialogTitle className="text-[#f59e0b] text-2xl">Demo Submission</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-gray-200">
              <div>
                <label className="block text-sm font-semibold text-[#f59e0b] mb-2">Artist Name</label>
                <input type="text" className="w-full px-4 py-2 bg-[#08080c] border border-[#f59e0b]/20 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#f59e0b] mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 bg-[#08080c] border border-[#f59e0b]/20 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#f59e0b] mb-2">Genre</label>
                <select className="w-full px-4 py-2 bg-[#08080c] border border-[#f59e0b]/20 rounded-lg text-white">
                  <option>Synthwave</option>
                  <option>Hip-Hop</option>
                  <option>Indie Pop</option>
                  <option>Electronic</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#f59e0b] mb-2">Track URL (Dropbox/Drive)</label>
                <input type="url" className="w-full px-4 py-2 bg-[#08080c] border border-[#f59e0b]/20 rounded-lg text-white" />
              </div>
              <MagneticBtn className="w-full py-3 bg-gradient-to-r from-[#f59e0b] to-[#7c3aed] text-white rounded-lg font-bold hover:opacity-90">
                Submit Demo
              </MagneticBtn>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
