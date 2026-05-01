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

const ARTWORKS = [
  { id: 1, title: "Chromatic Void", artist: "Marina Kost", cat: "Featured", medium: "Oil on Canvas", price: "$45,000", img: "https://images.unsplash.com/photo-1578301978162-7aae4d755744" },
  { id: 2, title: "Ethereal Forms", artist: "James Chen", cat: "Emerging", medium: "Mixed Media", price: "$12,000", img: "https://images.unsplash.com/photo-1561214115-6e4b59552a31" },
  { id: 3, title: "Monumental Presence", artist: "Sofia Delgado", cat: "Established", medium: "Sculpture", price: "$95,000", img: "https://images.unsplash.com/photo-1561214115-6e4b59552a31" },
  { id: 4, title: "Digital Dreams", artist: "Yuki Tanaka", cat: "Digital", medium: "NFT/Digital", price: "$8,500", img: "https://images.unsplash.com/photo-1561214115-6e4b59552a31" },
  { id: 5, title: "Quantum Layers", artist: "Alex Rivera", cat: "NFT", medium: "Blockchain Art", price: "$5,200", img: "https://images.unsplash.com/photo-1578301978162-7aae4d755744" },
  { id: 6, title: "Intersection", artist: "Maria Volkov", cat: "Featured", medium: "Acrylic", price: "$28,000", img: "https://images.unsplash.com/photo-1578301978162-7aae4d755744" },
  { id: 7, title: "Temporal Space", artist: "David Wong", cat: "Emerging", medium: "Photography", price: "$6,800", img: "https://images.unsplash.com/photo-1561214115-6e4b59552a31" },
  { id: 8, title: "Emergence", artist: "Nicole St-Laurent", cat: "Established", medium: "Installation", price: "$120,000", img: "https://images.unsplash.com/photo-1578301978162-7aae4d755744" },
]

const ARTISTS = [
  { name: "Marina Kost", represented: "2015" },
  { name: "James Chen", represented: "2018" },
  { name: "Sofia Delgado", represented: "2012" },
]

const AUCTIONS = [
  { title: "Chromatic Void", current: "$42,000", ends: "2h 15m" },
  { title: "Monumental Presence", current: "$87,500", ends: "4h 30m" },
  { title: "Emergence", current: "$115,000", ends: "6h 45m" },
]

export default function PrismaGallery() {
  const [activeArtwork, setActiveArtwork] = useState(0)
  const [artworkDialog, setArtworkDialog] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <motion.section style={{ y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-196645?w=800&q=80" alt="Contemporary Art" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-light mb-6">
            PRISMA
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl font-light">
            Contemporary Art Gallery & NFT Platform
          </motion.p>
        </div>
      </motion.section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Current Exhibition</h2>
        </Reveal>
        <Tabs defaultValue="Featured" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[#1a1a1a] border border-[#8b5cf6]/20">
            {["Featured", "Emerging", "Established", "Digital", "NFT"].map((cat) => (
              <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {["Featured", "Emerging", "Established", "Digital", "NFT"].map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {ARTWORKS.filter(a => a.cat === cat).map((art, idx) => (
                  <Reveal key={art.id} delay={idx * 0.1}>
                    <motion.div className="cursor-pointer group" whileHover={{ y: -8 }}>
                      <div className="relative h-96 overflow-hidden rounded-sm mb-4 bg-[#1a1a1a]">
                        <Image src={art.img + "?w=400"} alt={art.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div onClick={() => { setActiveArtwork(ARTWORKS.indexOf(art)); setArtworkDialog(true); }}>
                        <h3 className="text-lg font-light text-white mb-1">{art.title}</h3>
                        <p className="text-sm text-white/60 mb-2">{art.artist}</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[#8b5cf6] text-white">{art.medium}</Badge>
                          <span className="text-[#f59e0b]">{art.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Dialog open={artworkDialog} onOpenChange={setArtworkDialog}>
        <DialogContent className="max-w-4xl bg-[#1a1a1a] border-[#8b5cf6]/20">
          <DialogHeader>
            <DialogTitle className="text-3xl text-white">{ARTWORKS[activeArtwork]?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-sm overflow-hidden bg-[#0a0a0a]">
              <Image src={ARTWORKS[activeArtwork]?.img + "?w=500"} alt={ARTWORKS[activeArtwork]?.title} fill className="object-cover" />
            </div>
            <div>
              <p className="text-[#f59e0b] mb-2">{ARTWORKS[activeArtwork]?.artist}</p>
              <p className="text-2xl font-light mb-6" style={{ color: "#8b5cf6" }}>{ARTWORKS[activeArtwork]?.price}</p>
              <p className="text-white/70 mb-6">{ARTWORKS[activeArtwork]?.medium}</p>
              <div className="mb-6">
                <h3 className="text-white font-light mb-3">Artist Statement</h3>
                <p className="text-white/60 text-sm leading-relaxed">A profound exploration of form and consciousness, merging digital abstraction with classical composition principles. This work challenges our perception of reality in the contemporary age.</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-3 rounded-sm font-light transition-colors bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                  Buy Now
                </button>
                <button className="flex-1 py-3 rounded-sm font-light border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10">
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Artist Roster</h2>
        </Reveal>
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {ARTISTS.map((artist, idx) => (
              <CarouselItem key={idx} className="md:basis-1/3">
                <Card className="bg-[#080808] border-[#8b5cf6]/20">
                  <CardContent className="p-6">
                    <Avatar className="w-16 h-16 mb-4" style={{ backgroundColor: "#8b5cf6" }}>
                      <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-light text-white mb-2">{artist.name}</h3>
                    <Badge variant="outline" className="border-[#f59e0b] text-[#f59e0b]">Represented since {artist.represented}</Badge>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Live Auctions</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AUCTIONS.map((auction, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-[#1a1a1a] border-[#8b5cf6]/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light text-white mb-4">{auction.title}</h3>
                  <div className="mb-6 p-4 bg-[#8b5cf6]/10 rounded-sm">
                    <p className="text-sm text-white/60 mb-1">Current Bid</p>
                    <p className="text-2xl font-light" style={{ color: "#8b5cf6" }}>{auction.current}</p>
                  </div>
                  <motion.div className="text-center p-3 bg-[#f59e0b]/10 rounded-sm mb-4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                    <p className="text-sm font-light" style={{ color: "#f59e0b" }}>Ends in {auction.ends}</p>
                  </motion.div>
                  <button className="w-full py-2 rounded-sm font-light border border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10">
                    Place Bid
                  </button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Gallery Stats</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Artists Represented", value: 200 },
            { label: "Years Active", value: 15 },
            { label: "Artworks Sold", value: 5, suffix: "K+" },
            { label: "Countries Served", value: 80 },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-light mb-2" style={{ color: "#8b5cf6" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>VIP Collector Benefits</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { q: "What are VIP benefits?", a: "Early access to new acquisitions, exclusive preview events, personalized curation, and priority bidding." },
            { q: "How do I become a collector?", a: "Purchase minimum $50K in artworks or request invitation. Annual membership fee applies." },
            { q: "Can I attend private events?", a: "Yes, VIP members receive invitations to gallery openings, artist talks, and private viewings." },
            { q: "What about acquisition support?", a: "Our curators provide professional advice on building collections and investment guidance." },
          ].map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-[#8b5cf6]/20">
              <AccordionTrigger className="text-white">{item.q}</AccordionTrigger>
              <AccordionContent className="text-white/70">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-12 px-6 md:px-12">
        <Reveal>
          <p className="text-center text-sm text-white/60 mb-6">Institutional Partners</p>
        </Reveal>
        <div className="flex justify-center gap-8 flex-wrap">
          {["MoMA", "Guggenheim", "Tate Modern", "Centre Pompidou"].map((inst, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <p className="text-white/40 font-light">{inst}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Testimonials</h2>
        </Reveal>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {[1, 2, 3].map((idx) => (
              <CarouselItem key={idx}>
                <Card className="bg-[#1a1a1a] border-[#8b5cf6]/20">
                  <CardContent className="p-8">
                    <p className="text-lg text-white mb-6 italic">"PRISMA curates exceptional contemporary art. Their expertise and service are unmatched in the industry."</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12" style={{ backgroundColor: "#8b5cf6" }}>
                        <AvatarFallback>C{idx}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-light text-white">Collector {idx}</p>
                        <p className="text-sm text-white/60">Major Collector</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { q: "How do you authenticate artworks?", a: "All artworks undergo professional authentication and certification. Provenance is fully documented." },
            { q: "What is your shipping process?", a: "White-glove delivery service with insurance. Professional installation assistance available." },
            { q: "Can I return artworks?", a: "Yes, 30-day return policy for gallery-sourced works. NFTs subject to blockchain verification." },
            { q: "How do NFT sales work?", a: "Smart contracts ensure ownership transfer. You receive wallet keys and provenance certificates." },
          ].map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-[#8b5cf6]/20">
              <AccordionTrigger className="text-white">{item.q}</AccordionTrigger>
              <AccordionContent className="text-white/70">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>About PRISMA</h2>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-white/70 mb-6 text-lg">Founded in 2010, PRISMA Gallery has established itself as a leading contemporary art platform, representing emerging and established artists from across the globe. Our commitment to artistic excellence and collector education sets us apart in the international art market.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/70 mb-6 text-lg">We operate a flagship gallery in New York, with additional spaces in London, Los Angeles, and Tokyo. PRISMA also leads the charge in NFT and digital art integration, ensuring contemporary artists thrive in Web3.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/70 text-lg">Our mission: democratize access to contemporary art while maintaining curatorial integrity and supporting artists at every career stage.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Exhibition Schedule</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { month: "May 2025", title: "Marina Kost: Void Series", desc: "New works exploring absence and presence in abstract form. Opening reception May 15." },
            { month: "June 2025", title: "Emerging Voices", desc: "Curated group exhibition of 12 emerging artists under 35. Rotating monthly features." },
            { month: "July 2025", title: "Sofia Delgado: Monumentality", desc: "Large-scale sculptural installations examining public space and collective memory." },
            { month: "August 2025", title: "Digital Futures", desc: "NFT and digital art showcase with virtual/physical hybrid experiences." },
          ].map((exhibit, idx) => (
            <AccordionItem key={idx} value={`exhibit-${idx}`} className="border-[#8b5cf6]/20">
              <AccordionTrigger className="text-white">{exhibit.month}: {exhibit.title}</AccordionTrigger>
              <AccordionContent className="text-white/70">{exhibit.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Artist Services</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <Reveal>
            <div>
              <h3 className="text-2xl font-light text-white mb-6">For Artists</h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>International representation and promotion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>Exhibition opportunities across global galleries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>Sales facilitation and collector matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>Catalog production and documentation</span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="text-2xl font-light text-white mb-6">For Collectors</h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>Expert acquisition and curation advice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>Portfolio management and insurance support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>Early access to new acquisitions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8b5cf6]">›</span>
                  <span>Exclusive private viewings and events</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Global Presence</h2>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { city: "New York", addr: "500 Park Avenue South", phone: "+1 (212) 555-0100" },
            { city: "London", addr: "45 Hoxton Street", phone: "+44 (0)20 7555 0100" },
            { city: "Los Angeles", addr: "8000 Sunset Boulevard", phone: "+1 (323) 555-0100" },
            { city: "Tokyo", addr: "Chiyoda-ku, Tokyo", phone: "+81 (0)3 5555 0100" },
          ].map((location, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-[#1a1a1a] border-[#8b5cf6]/20">
                <CardContent className="p-6">
                  <h4 className="text-lg font-light text-white mb-3">{location.city}</h4>
                  <p className="text-white/60 text-sm mb-2">{location.addr}</p>
                  <p className="text-[#8b5cf6] text-sm">{location.phone}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#8b5cf6" }}>Visit The Gallery</h2>
        </Reveal>
        <div className="text-center">
          <p className="text-lg text-white/70 mb-8">Schedule a private viewing, collector consultation, or artist inquiry</p>
          <MagneticBtn className="px-12 py-4 rounded-sm font-light text-white transition-colors" style={{ backgroundColor: "#8b5cf6" }}>
            Book Appointment
          </MagneticBtn>
        </div>
      </section>
    </div>
  )
}
