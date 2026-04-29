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

const PRODUCTS = [
  { id: 1, name: "Alpine Jacket", category: "Apparel", terrain: "Mountain", rating: 4.9, specs: { temp: "-40°C", weight: "450g", fabric: "Gore-Tex Pro" }, img: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400" },
  { id: 2, name: "Trail Boots Pro", category: "Footwear", terrain: "Rugged", rating: 4.8, specs: { temp: "-20°C", weight: "680g", material: "Leather+Gore-Tex" }, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 3, name: "Expedition Pack 65L", category: "Packs", terrain: "Extreme", rating: 4.9, specs: { capacity: "65L", weight: "1.2kg", material: "Nylon" }, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 4, name: "Summit Tent", category: "Shelter", terrain: "Alpine", rating: 4.7, specs: { persons: "2", weight: "1.8kg", seasons: "4-Season" }, img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400" },
  { id: 5, name: "Arctic Compass", category: "Navigation", terrain: "Polar", rating: 4.9, specs: { accuracy: "1°", type: "Magnetic", casing: "Titanium" }, img: "https://images.unsplash.com/photo-1569163139394-de4798aa62b1?w=400" },
  { id: 6, name: "Thermal Gloves", category: "Apparel", terrain: "Winter", rating: 4.8, specs: { temp: "-50°C", material: "Merino Wool", grip: "Silicone" }, img: "https://images.unsplash.com/photo-1577720643272-265b2d4f1e6f?w=400" },
  { id: 7, name: "Hydration System", category: "Gear", terrain: "All", rating: 4.8, specs: { capacity: "3L", material: "BPA-Free", weight: "200g" }, img: "https://images.unsplash.com/photo-1545575074-4ee1f60fadf4?w=400" },
  { id: 8, name: "Emergency Kit", category: "Safety", terrain: "All", rating: 4.9, specs: { items: "24", weight: "450g", case: "Waterproof" }, img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400" }
]

const EXPEDITIONS = [
  { title: "Kilimanjaro Summit", destination: "Tanzania", athletes: "12", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500" },
  { title: "Everest Base Camp", destination: "Nepal", athletes: "8", img: "https://images.unsplash.com/photo-1464066736753-a98c9cb62fb5?w=500" },
  { title: "Patagonia Traverse", destination: "Argentina", athletes: "6", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500" },
  { title: "Norwegian Arctic", destination: "Norway", athletes: "10", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500" }
]

const ATHLETES = [
  { name: "Elena Vasquez", sport: "Mountaineering", achievement: "Everest Summiteer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { name: "Marcus Storm", sport: "Polar Explorer", achievement: "Arctic Expeditions", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Jenna peaks", sport: "Rock Climbing", achievement: "El Capitan Ascents", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  { name: "David Chen", sport: "Trail Running", achievement: "Ultra Marathon Champion", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" }
]

const INNOVATIONS = [
  { name: "DryShield", desc: "Advanced moisture-wicking technology", patent: "US Patent 2024-001" },
  { name: "ThermoCore", desc: "Heat-retention fiber composite", patent: "US Patent 2024-002" },
  { name: "ErgoPack", desc: "Weight-distribution system", patent: "US Patent 2024-003" },
  { name: "NanoGrip", desc: "All-weather traction coating", patent: "US Patent 2024-004" }
]

export default function ArcticOutdoor() {
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-blue-50 to-[#e0f2fe] text-[#1e293b] overflow-hidden">
      {/* Parallax Hero */}
      <section className="relative h-screen overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
            alt="Mountains"
            fill
            className="object-cover brightness-75"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fafc]/20 to-[#f8fafc]" />

        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center z-10">
          <Reveal>
            <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg">
              Arctic Outdoor
            </motion.h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl drop-shadow">Professional expedition gear trusted by adventurers worldwide. 30 years of excellence.</p>
            <motion.div whileHover={{ x: 5 }} className="inline-flex items-center gap-3 px-8 py-4 bg-[#0284c7] text-white rounded-lg font-semibold cursor-pointer hover:bg-[#0284c7]/90">
              Shop Collection →
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Gear Tabs */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Gear Collection</h2>
        </Reveal>

        <Tabs defaultValue="Apparel" className="w-full">
          <TabsList className="grid w-full grid-cols-5 gap-2 bg-blue-100 p-2 rounded-lg mb-12">
            {["Apparel", "Footwear", "Packs", "Shelter", "Navigation"].map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-sm font-semibold data-[state=active]:bg-[#0284c7] data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {["Apparel", "Footwear", "Packs", "Shelter", "Navigation"].map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-4 gap-6">
                {PRODUCTS.filter(p => p.category.includes(category.slice(0, 5))).map((product, i) => (
                  <Reveal key={product.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      onClick={() => { setSelectedProduct(product); setDialogOpen(true) }}
                      className="group cursor-pointer"
                    >
                      <Card className="border border-[#0284c7]/20 hover:border-[#0284c7]/50 overflow-hidden transition-all h-full">
                        <div className="relative h-40 overflow-hidden bg-blue-50">
                          <Image src={product.img} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-[#0284c7]">{product.terrain}</Badge>
                          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{product.rating}★ Rating</p>
                          <Progress value={product.rating * 20} className="h-1" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Reveal>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProduct?.name}</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden bg-blue-50">
                  <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-xs text-[#0284c7] uppercase font-semibold">Category</p>
                    <p className="text-lg font-bold mt-1">{selectedProduct.category}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-xs text-[#0284c7] uppercase font-semibold">Terrain</p>
                    <p className="text-lg font-bold mt-1">{selectedProduct.terrain}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-xs text-[#0284c7] uppercase font-semibold">Rating</p>
                    <p className="text-lg font-bold mt-1">{selectedProduct.rating}★</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4">Technical Specs</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="capitalize font-semibold">{key}:</span>
                        <span className="text-gray-600">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold">Conditions Rating</h4>
                  <div className="space-y-2">
                    {["Extreme Cold", "Wet Conditions", "High Altitude"].map((cond, i) => (
                      <div key={i}>
                        <p className="text-sm font-medium mb-1">{cond}</p>
                        <Progress value={85 + i * 5} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <MagneticBtn className="w-full py-3 bg-[#0284c7] text-white rounded-lg font-bold hover:bg-[#0284c7]/90">
                  Add to Cart
                </MagneticBtn>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Expedition Stories */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Expedition Stories</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {EXPEDITIONS.map((exp, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <motion.div whileHover={{ y: -10 }} className="group">
                  <Card className="border border-[#0284c7]/20 overflow-hidden hover:border-[#0284c7]/50 transition-all">
                    <div className="relative h-48">
                      <Image src={exp.img} alt={exp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-[#0284c7]">{exp.destination}</Badge>
                      <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                      <p className="text-sm text-gray-300">{exp.athletes} athletes participated</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Athlete Ambassadors */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Athlete Ambassadors</h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8">
          {ATHLETES.map((athlete, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="border border-[#0284c7]/20 overflow-hidden hover:border-[#0284c7]/50 transition-colors">
                <div className="relative h-48">
                  <Image src={athlete.img} alt={athlete.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-1">{athlete.name}</h3>
                  <Badge className="mb-3 bg-[#0284c7]/20 text-[#0284c7]">{athlete.sport}</Badge>
                  <p className="text-sm text-gray-600">{athlete.achievement}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-gradient-to-r from-[#0284c7]/10 to-blue-300/10 rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[{ v: 30, l: "Years" }, { v: 500, l: "Products" }, { v: 80, l: "Countries" }, { v: 5, s: "★", l: "Rating" }].map((stat, i) => (
            <Reveal key={i}>
              <div>
                <p className="text-5xl font-bold text-[#0284c7]"><Counter target={stat.v} suffix={stat.s || ""} /></p>
                <p className="text-gray-700 mt-2">{stat.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tech Innovations */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Tech Innovations</h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6">
          {INNOVATIONS.map((tech, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -10 }} className="group">
                <Card className="border border-[#0284c7]/20 hover:border-[#0284c7]/50 overflow-hidden transition-all h-full">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-[#0284c7]">Patent</Badge>
                    <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{tech.desc}</p>
                    <p className="text-xs text-[#0284c7] font-semibold">{tech.patent}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "What sizing guide should I follow?", a: "We provide detailed sizing charts for all products. Most items come with a 30-day exchange policy." },
            { q: "How long is the warranty?", a: "All Arctic Outdoor products include a 2-year manufacturer warranty covering defects." },
            { q: "Are your products sustainable?", a: "Yes, we use eco-friendly materials and ethical manufacturing processes across our line." },
            { q: "Do you ship internationally?", a: "We ship to 80+ countries. Shipping times vary by location, typically 7-14 business days." }
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-[#0284c7]/20 px-6 rounded-lg">
              <AccordionTrigger className="font-semibold text-[#1e293b]">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#0284c7] to-cyan-500 rounded-2xl p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Gear Up for Adventure</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Trusted by adventurers. Proven in the harshest conditions. Your next expedition awaits.</p>
            <MagneticBtn className="px-12 py-4 bg-white text-[#0284c7] rounded-lg font-bold cursor-pointer hover:bg-gray-100">
              Explore Gear Now
            </MagneticBtn>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
