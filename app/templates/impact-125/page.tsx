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

const PORTFOLIO = [
  { cat: "Weddings", season: "Spring", loc: "Tuscany", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300" },
  { cat: "Weddings", season: "Summer", loc: "Greece", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300" },
  { cat: "Elopements", season: "Fall", loc: "Iceland", img: "https://images.unsplash.com/photo-1478291143081-80f7f84ca84d?w=300" },
  { cat: "Engagements", season: "Winter", loc: "Alps", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300" },
  { cat: "Couples", season: "Spring", loc: "Paris", img: "https://images.unsplash.com/photo-1529632066dd-637fac70e22f?w=300" },
  { cat: "Weddings", season: "Summer", loc: "Hawaii", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300" },
  { cat: "Engagements", season: "Fall", loc: "New York", img: "https://images.unsplash.com/photo-1516585427167-9f4af9627f6a?w=300" },
  { cat: "Elopements", season: "Spring", loc: "Colorado", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300" },
  { cat: "Couples", season: "Summer", loc: "Bali", img: "https://images.unsplash.com/photo-1529632066dd-637fac70e22f?w=300" },
  { cat: "Weddings", season: "Fall", loc: "Napa", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300" },
  { cat: "Engagements", season: "Winter", loc: "Maine", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300" },
  { cat: "Couples", season: "Spring", loc: "Portugal", img: "https://images.unsplash.com/photo-1478291143081-80f7f84ca84d?w=300" }
]

const PACKAGES = [
  { name: "Essential", price: "$2,500", includes: ["8 hours", "250+ photos", "Online gallery", "Engagement session"] },
  { name: "Signature", price: "$4,500", includes: ["12 hours", "500+ photos", "Print album", "Video highlight", "Two photographers"] },
  { name: "Premium", price: "$7,500", includes: ["16 hours", "750+ photos", "Premium album", "Full video", "3 photographers", "Drone footage"] }
]

const ADDONS = [
  { title: "Premium Album", price: "$800", desc: "Luxury leather-bound album" },
  { title: "Prints Package", price: "$500", desc: "High-quality canvas prints" },
  { title: "Drone Footage", price: "$1,200", desc: "Aerial photography & video" },
  { title: "Videography", price: "$2,000", desc: "Professional wedding film" },
  { title: "Engagement Session", price: "$400", desc: "Pre-wedding photoshoot" },
  { title: "Same-Day Edit", price: "$800", desc: "Video highlight reel" }
]

export default function GoldenHour() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof PORTFOLIO[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [addonsOpen, setAddonsOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#fdf8f0] via-amber-50 to-[#faf5f0] text-[#1a1209] overflow-hidden">
      {/* Parallax Hero */}
      <section className="relative h-screen overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"
            alt="Wedding"
            fill
            className="object-cover brightness-50"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdf8f0]/30 to-[#fdf8f0]" />

        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center z-10">
          <Reveal>
            <motion.h1 className="text-6xl md:text-8xl font-light mb-6 text-[#c9a04c]" style={{ fontFamily: "Georgia, serif" }}>
              Golden Hour
            </motion.h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-12 max-w-3xl font-light">Capturing love in light. 300 weddings. 8 years. Forever moments.</p>
            <motion.div whileHover={{ x: 5 }} className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9a04c] text-[#1a1209] rounded-lg font-semibold cursor-pointer hover:bg-[#c9a04c]/90">
              View Portfolio →
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-center text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>Portfolio Gallery</h2>
        </Reveal>

        <Tabs defaultValue="Weddings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 gap-2 bg-amber-100 p-2 rounded-lg mb-12">
            {["Weddings", "Elopements", "Engagements", "Couples"].map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-sm font-semibold data-[state=active]:bg-[#c9a04c] data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {["Weddings", "Elopements", "Engagements", "Couples"].map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-4 gap-4">
                {PORTFOLIO.filter(p => p.cat === category).map((photo, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() => { setSelectedPhoto(photo); setDialogOpen(true) }}
                      className="group cursor-pointer relative h-64 rounded-lg overflow-hidden"
                    >
                      <Image src={photo.img} alt={`${category} - ${photo.loc}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="text-white">
                          <Badge className="mb-2 bg-[#c9a04c] text-[#1a1209]">{photo.season}</Badge>
                          <p className="font-light text-sm">{photo.loc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl bg-[#fdf8f0]">
            <DialogHeader>
              <DialogTitle>{selectedPhoto?.cat} - {selectedPhoto?.loc}</DialogTitle>
            </DialogHeader>
            {selectedPhoto && (
              <div className="space-y-6">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image src={selectedPhoto.img} alt={selectedPhoto.loc} fill className="object-cover" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-amber-100 p-4 rounded-lg">
                    <p className="text-xs text-[#c9a04c] uppercase font-semibold">Category</p>
                    <p className="text-lg font-light mt-1">{selectedPhoto.cat}</p>
                  </div>
                  <div className="bg-amber-100 p-4 rounded-lg">
                    <p className="text-xs text-[#c9a04c] uppercase font-semibold">Season</p>
                    <p className="text-lg font-light mt-1">{selectedPhoto.season}</p>
                  </div>
                  <div className="bg-amber-100 p-4 rounded-lg">
                    <p className="text-xs text-[#c9a04c] uppercase font-semibold">Location</p>
                    <p className="text-lg font-light mt-1">{selectedPhoto.loc}</p>
                  </div>
                </div>

                <Carousel className="w-full">
                  <CarouselContent>
                    {[1, 2, 3].map((i) => (
                      <CarouselItem key={i} className="basis-full">
                        <Image src={selectedPhoto.img} alt={`Photo ${i}`} width={500} height={300} className="w-full rounded-lg" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Packages */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-center text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>Packages</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -10 }} className="group">
                <Card className={`border-2 ${i === 1 ? "border-[#c9a04c] bg-amber-50" : "border-amber-100"} overflow-hidden`}>
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-light text-[#d4a5a5] mb-2" style={{ fontFamily: "Georgia, serif" }}>{pkg.name}</h3>
                    <p className="text-4xl font-light text-[#c9a04c] mb-8">{pkg.price}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.includes.map((item, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#c9a04c]" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <MagneticBtn className="w-full py-3 bg-[#c9a04c] text-[#1a1209] rounded-lg font-semibold hover:bg-[#c9a04c]/90">
                      Select Package
                    </MagneticBtn>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-center text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>Add-ons</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ADDONS.map((addon, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="border border-amber-100 hover:border-[#c9a04c]/50 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light text-[#d4a5a5] mb-1">{addon.title}</h3>
                  <p className="text-[#c9a04c] font-light text-2xl mb-3">{addon.price}</p>
                  <p className="text-sm text-gray-600">{addon.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <MagneticBtn
            onClick={() => setAddonsOpen(true)}
            className="px-8 py-4 bg-[#c9a04c] text-[#1a1209] rounded-lg font-semibold hover:bg-[#c9a04c]/90"
          >
            View Full Price List
          </MagneticBtn>
        </div>

        <Dialog open={addonsOpen} onOpenChange={setAddonsOpen}>
          <DialogContent className="max-w-2xl bg-[#fdf8f0]">
            <DialogHeader>
              <DialogTitle>Add-ons & Pricing</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {ADDONS.map((addon, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-amber-100">
                  <div>
                    <p className="font-semibold text-[#1a1209]">{addon.title}</p>
                    <p className="text-sm text-gray-600">{addon.desc}</p>
                  </div>
                  <p className="text-[#c9a04c] font-semibold">{addon.price}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Process */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-center text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>Our Process</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            { title: "Inquiry", desc: "Contact us with your wedding date and vision. We'll respond within 24 hours." },
            { title: "Consultation", desc: "Schedule a call to discuss your style, timeline, and any special requests." },
            { title: "Shoot", desc: "We arrive early, capture every moment, and deliver full-day coverage." },
            { title: "Gallery Delivery", desc: "Receive your edited photos within 30 days with complete gallery access." }
          ].map((step, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-amber-200 px-6 rounded-lg">
              <AccordionTrigger className="font-light text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>{step.title}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{step.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-gradient-to-r from-[#d4a5a5]/10 to-[#c9a04c]/10 rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[{ v: 300, l: "Weddings" }, { v: 8, l: "Years" }, { v: 12, l: "Countries" }, { v: 5, s: "★", l: "Rating" }].map((stat, i) => (
            <Reveal key={i}>
              <div>
                <p className="text-5xl font-light text-[#c9a04c]"><Counter target={stat.v} suffix={stat.s || ""} /></p>
                <p className="text-gray-700 mt-2 font-light">{stat.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-center text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>Couple Stories</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3].map((i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Card className="border border-amber-200 bg-white">
                  <CardContent className="p-8">
                    <div className="flex gap-2 mb-4">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#c9a04c]">★</span>)}
                    </div>
                    <p className="text-gray-700 mb-6 italic font-light">"Golden Hour captured our love story perfectly. Every photo is a treasure we'll cherish forever."</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`https://images.unsplash.com/photo-150${i}?w=100`} />
                        <AvatarFallback>CP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-light text-[#1a1209]">Couple Name</p>
                        <p className="text-xs text-gray-500">Married {2024 - i}</p>
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

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-center text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>Questions</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "What's your deposit policy?", a: "We require a 50% deposit to secure your date. The remaining balance is due 30 days before your wedding." },
            { q: "How long until we get photos?", a: "You'll receive your complete edited gallery within 30 days of your wedding." },
            { q: "Can you shoot at multiple locations?", a: "Absolutely! Travel time is included in our standard packages. Some travel fees may apply for remote locations." },
            { q: "Do you offer same-day editing?", a: "Yes, available as an add-on. We'll create a highlight reel to play at your reception." }
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-amber-200 px-6 rounded-lg">
              <AccordionTrigger className="font-light text-[#d4a5a5]" style={{ fontFamily: "Georgia, serif" }}>{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#d4a5a5] to-[#c9a04c] rounded-2xl p-16 text-center text-white">
            <h2 className="text-4xl font-light mb-6" style={{ fontFamily: "Georgia, serif" }}>Let's Capture Your Story</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto font-light">Every love story deserves to be beautifully told. Book your wedding photographer today.</p>
            <MagneticBtn className="px-12 py-4 bg-white text-[#c9a04c] rounded-lg font-semibold cursor-pointer hover:bg-gray-100">
              Start Planning
            </MagneticBtn>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
