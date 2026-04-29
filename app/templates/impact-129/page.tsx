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

const WATCHES = [
  { id: 1, name: "Chronosphere Sport", collection: "Sport", complication: "Chronograph", movement: "Automatic ETA 2824", price: "$4,200", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 2, name: "Heritage Dress", collection: "Dress", complication: "Date Window", movement: "Quartz Swiss", price: "$2,800", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500" },
  { id: 3, name: "Deep Explorer", collection: "Diver", complication: "Rotating Bezel", movement: "Automatic Seiko", price: "$3,600", img: "https://images.unsplash.com/photo-1518611505868-48510c2a2fe4?w=500" },
  { id: 4, name: "Aviation Pro", collection: "Pilot", complication: "GMT", movement: "Automatic Rolex", price: "$5,400", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 5, name: "Prestige Titanium", collection: "Limited", complication: "Perpetual", movement: "Automatic Titanium", price: "$8,900", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500" },
  { id: 6, name: "Classic Gold", collection: "Limited", complication: "Moon Phase", movement: "Manual Wind", price: "$7,200", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500" },
  { id: 7, name: "Modern Steel", collection: "Dress", complication: "Seconds", movement: "Automatic Seiko", price: "$3,100", img: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500" },
  { id: 8, name: "Desert Expedition", collection: "Diver", complication: "Depth Gauge", movement: "Automatic Helium", price: "$4,900", img: "https://images.unsplash.com/photo-1586941487556-a9bbd424c8af?w=500" },
]

const MOVEMENTS = [
  { type: "Power Reserve", percent: 45 },
  { type: "Water Resistance", percent: 92 },
  { type: "Accuracy", percent: 99 },
]

const TESTIMONIALS = [
  { name: "Richard Branson", role: "Collector", quote: "These watches transcend time itself." },
  { name: "Sofia Loren", role: "Aficionado", quote: "Perfection in every tick and tock." },
  { name: "David Beckham", role: "Investor", quote: "Legacy pieces for future generations." },
]

export default function EpochWatchesPage() {
  const [selectedWatch, setSelectedWatch] = useState<typeof WATCHES[0] | null>(null)
  const [strapOpen, setStrapOpen] = useState(false)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, 120])

  return (
    <div className="min-h-screen bg-[#080808] text-[#fdf8f0]">
      {/* Luxury Hero */}
      <section className="relative h-[100vh] overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600"
            alt="Luxury Watch"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        <div className="relative h-full flex items-center px-8 md:px-16 z-10">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[#b76e79] mb-4 uppercase tracking-widest text-sm">Est. 1987</p>
              <h1 className="text-6xl md:text-8xl font-light text-[#fdf8f0] mb-6">EPOCH</h1>
              <p className="text-xl text-[#fdf8f0]/60 mb-8">
                Independent watchmaker. 35-year legacy. Handcrafted precision.
              </p>
              <motion.button className="px-8 py-4 border-2 border-[#b76e79] text-[#b76e79] font-light uppercase tracking-wider hover:bg-[#b76e79] hover:text-[#080808] transition">
                View Collection
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Watch Collections */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-[#fdf8f0]">Collections</h2>
        </Reveal>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-12 bg-[#2a2420] p-2 rounded-none">
            {["All", "Sport", "Dress", "Diver", "Pilot", "Limited"].map(cat => (
              <TabsTrigger
                key={cat}
                value={cat.toLowerCase()}
                className="data-[state=active]:bg-[#b76e79] data-[state=active]:text-white text-xs md:text-sm"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {["all", "sport", "dress", "diver", "pilot", "limited"].map(cat => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {WATCHES.filter(w => cat === "all" || w.collection.toLowerCase() === cat).map((watch, i) => (
                  <Reveal key={watch.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -12 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedWatch(watch)}
                    >
                      <div className="relative h-72 mb-4 rounded-none overflow-hidden bg-[#2a2420] border border-[#b76e79]/20 group-hover:border-[#b76e79]">
                        <Image src={watch.img} alt={watch.name} fill className="object-cover group-hover:scale-110 transition duration-500" />
                      </div>
                      <Badge className="bg-[#b76e79] text-white mb-2">{watch.complication}</Badge>
                      <h3 className="text-lg font-light text-[#fdf8f0] mb-2">{watch.name}</h3>
                      <p className="text-sm text-[#b76e79]/70 mb-3">{watch.movement}</p>
                      <p className="font-semibold text-[#b76e79]">{watch.price}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Watch Detail Dialog */}
      <Dialog open={!!selectedWatch} onOpenChange={() => setSelectedWatch(null)}>
        <DialogContent className="max-w-2xl bg-[#2a2420] border border-[#b76e79]/30">
          <DialogHeader>
            <DialogTitle className="text-[#b76e79]">{selectedWatch?.name}</DialogTitle>
          </DialogHeader>
          {selectedWatch && (
            <div className="space-y-6">
              <div className="relative h-80 rounded-none overflow-hidden bg-[#080808]">
                <Image src={selectedWatch.img} alt={selectedWatch.name} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#b76e79]/60 mb-2">Movement</p>
                  <p className="font-light text-[#fdf8f0]">{selectedWatch.movement}</p>
                </div>
                <div>
                  <p className="text-sm text-[#b76e79]/60 mb-2">Specifications</p>
                  <ul className="space-y-2 text-[#fdf8f0]/70 font-light">
                    <li>Case: 42mm Stainless Steel</li>
                    <li>Crystal: Sapphire with Anti-Reflective</li>
                    <li>Water Resistance: 300m</li>
                    <li>Power Reserve: 48 hours</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#b76e79]/20">
                  <p className="text-[#b76e79]">Limited production. All pieces individually numbered.</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manufacture Tour */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-[#fdf8f0]">The Craft</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {["Design", "Assembly", "Testing", "Finishing"].map((step, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Reveal>
                  <div className="relative h-96 rounded-none overflow-hidden bg-[#2a2420] border border-[#b76e79]/20">
                    <Image
                      src={`https://images.unsplash.com/photo-${1523170000000 + i * 50000}?w=600`}
                      alt={step}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-light text-[#fdf8f0] mb-2">Step {i + 1}</h3>
                      <p className="text-[#b76e79]">{step}</p>
                    </div>
                  </div>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-[#b76e79]" />
          <CarouselNext className="text-[#b76e79]" />
        </Carousel>
      </section>

      {/* Movement Showcase */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-[#fdf8f0]">Movement Specifications</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {MOVEMENTS.map((mov, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-[#2a2420] border-[#b76e79]/20">
                <CardContent className="pt-8 space-y-4">
                  <h3 className="text-lg font-light text-[#fdf8f0]">{mov.type}</h3>
                  <Progress value={mov.percent} className="bg-[#b76e79]/20" />
                  <p className="text-[#b76e79] font-light">{mov.percent}%</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bespoke Strap Configurator */}
      <section className="py-24 px-8 md:px-16 bg-[#2a2420]/50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-light mb-12 text-[#fdf8f0]">Bespoke Strap</h2>
            <p className="text-[#fdf8f0]/60 mb-12">Customize your watch strap with your choice of materials and finishes.</p>
          </Reveal>
          <MagneticBtn
            onClick={() => setStrapOpen(true)}
            className="px-8 py-4 border-2 border-[#b76e79] text-[#b76e79] font-light uppercase tracking-wider hover:bg-[#b76e79] hover:text-[#080808] transition"
          >
            Design Your Strap
          </MagneticBtn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { number: 1987, label: "Founded", suffix: "" },
            { number: 12, label: "Pieces Per Year", suffix: "K" },
            { number: 45, label: "Countries", suffix: "" },
            { number: 35, label: "Year Warranty", suffix: "" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-light text-[#b76e79] mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-[#fdf8f0]/60 font-light">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-16 bg-[#2a2420]/50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-light mb-16 text-[#fdf8f0]">Collector Stories</h2>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((test, i) => (
                <CarouselItem key={i} className="md:basis-1/2">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#080808] border-[#b76e79]/20">
                      <CardContent className="pt-8 space-y-6">
                        <p className="text-lg italic text-[#fdf8f0]/60">"{test.quote}"</p>
                        <div>
                          <p className="font-light text-[#b76e79]">{test.name}</p>
                          <p className="text-sm text-[#fdf8f0]/40 font-light">{test.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-[#b76e79]" />
            <CarouselNext className="text-[#b76e79]" />
          </Carousel>
        </div>
      </section>

      {/* Heritage */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#fdf8f0]">Our Heritage</h2>
        </Reveal>
        <Accordion className="space-y-4">
          {["The Founding (1987)", "The Pioneer Years", "Recognition & Awards", "Today's Legacy"].map((item, i) => (
            <AccordionItem key={i} value={`history-${i}`} className="border border-[#b76e79]/20 rounded-none px-6">
              <AccordionTrigger className="text-lg font-light text-[#fdf8f0] hover:text-[#b76e79]">
                {item}
              </AccordionTrigger>
              <AccordionContent className="text-[#fdf8f0]/60 font-light">
                A remarkable journey of precision, innovation, and unwavering commitment to horological excellence.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 md:px-16 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#fdf8f0]">Frequently Asked</h2>
        </Reveal>
        <Accordion className="space-y-4">
          {["How often should I service my watch?", "What's your warranty?", "Can I customize my watch?", "How do I authenticate my EPOCH?"].map((q, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-[#b76e79]/20 rounded-none px-6">
              <AccordionTrigger className="text-lg font-light text-[#fdf8f0] hover:text-[#b76e79]">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-[#fdf8f0]/60 font-light">
                Every EPOCH comes with detailed documentation and lifetime support from our master craftspeople.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Strap Configurator Dialog */}
      <Dialog open={strapOpen} onOpenChange={setStrapOpen}>
        <DialogContent className="max-w-md bg-[#2a2420] border border-[#b76e79]/30">
          <DialogHeader>
            <DialogTitle className="text-[#b76e79]">Bespoke Strap Configuration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#b76e79]/60 mb-2">Material</p>
              <select className="w-full px-4 py-2 bg-[#080808] border border-[#b76e79]/20 rounded-none text-[#fdf8f0] focus:outline-none focus:border-[#b76e79]">
                <option>Leather (Natural)</option>
                <option>Leather (Crocodile)</option>
                <option>Rubber</option>
                <option>Metal</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-[#b76e79]/60 mb-2">Color</p>
              <div className="flex gap-2">
                {["Black", "Brown", "Tan", "Blue", "Burgundy"].map(c => (
                  <button key={c} className="px-3 py-2 border border-[#b76e79]/20 rounded-none text-xs font-light text-[#fdf8f0] hover:border-[#b76e79] transition">
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-[#b76e79]/60 mb-2">Buckle Type</p>
              <select className="w-full px-4 py-2 bg-[#080808] border border-[#b76e79]/20 rounded-none text-[#fdf8f0] focus:outline-none focus:border-[#b76e79]">
                <option>Stainless Steel</option>
                <option>Rose Gold</option>
                <option>Titanium</option>
              </select>
            </div>
            <MagneticBtn className="w-full py-3 border-2 border-[#b76e79] text-[#b76e79] font-light rounded-none hover:bg-[#b76e79] hover:text-[#080808] transition">
              Request Quote
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
