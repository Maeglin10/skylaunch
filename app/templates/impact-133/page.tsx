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
import { MapPin, Bed, Bath } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
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
    const step = Math.ceil(target / 60)
    const t = setInterval(() => setCount((c) => Math.min(c + step, target)), 16)
    return () => clearInterval(t)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

const PROPERTIES = [
  { id: 1, title: "Penthouse Downtown", price: "€2.8M", beds: 4, baths: 3, m2: 320, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500" },
  { id: 2, title: "Waterfront Villa", price: "€4.2M", beds: 5, baths: 4, m2: 450, img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=500" },
  { id: 3, title: "Hills Modern Estate", price: "€3.1M", beds: 3, baths: 3, m2: 280, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500" },
  { id: 4, title: "Contemporary Loft", price: "€1.8M", beds: 2, baths: 2, m2: 200, img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=500" },
  { id: 5, title: "Luxury Apartment", price: "€2.2M", beds: 3, baths: 2, m2: 240, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500" },
  { id: 6, title: "Beachfront House", price: "€3.5M", beds: 4, baths: 3, m2: 380, img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=500" },
]

const NEIGHBORHOODS = [
  { name: "Downtown", amenities: "Shopping, Dining, Transit", count: 28 },
  { name: "Waterfront", amenities: "Marina, Beach, Parks", count: 15 },
  { name: "Hills", amenities: "Views, Privacy, Nature", count: 12 },
]

const AGENTS = [
  { id: 1, name: "Isabella Monaco", spec: "Waterfront Expert", sold: "€850M", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
  { id: 2, name: "Marco Giuliano", spec: "Luxury Homes", sold: "€720M", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
  { id: 3, name: "Sophia Rossi", spec: "Commercial", sold: "€640M", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" },
  { id: 4, name: "Andrea Bianchi", spec: "Investment", sold: "€510M", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" },
]

export default function PinnacleRealtyLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const [selectedListing, setSelectedListing] = useState<(typeof PROPERTIES)[0] | null>(null)
  const [showPropertyDialog, setShowPropertyDialog] = useState(false)
  const [showViewingDialog, setShowViewingDialog] = useState(false)

  return (
    <div ref={containerRef} className="bg-white text-gray-900 min-h-screen">
      {/* Parallax Hero */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: parallax }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src="https://images.unsplash.com/photo-1109543?w=800&q=80"
            alt="Luxury home"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-4 space-y-8">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
              Live<br />Luxuriously
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-2xl font-light max-w-3xl mx-auto">
              Curated properties in the world's most coveted locations. From waterfront villas to penthouse estates.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <MagneticBtn
              onClick={() => setShowViewingDialog(true)}
              className="px-12 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Schedule Viewing
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Property Tabs */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Featured Listings</h2>
          </Reveal>

          <Tabs defaultValue="for-sale" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-white border border-gray-200">
              {["For Sale", "For Rent", "New Development", "Commercial"].map((category) => (
                <TabsTrigger
                  key={category}
                  value={category.toLowerCase()}
                  className="font-semibold data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="for-sale" className="mt-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {PROPERTIES.map((prop, i) => (
                  <Reveal key={prop.id} delay={i * 0.1}>
                    <Card
                      className="group cursor-pointer hover:shadow-2xl transition-shadow overflow-hidden"
                      onClick={() => {
                        setSelectedListing(prop)
                        setShowPropertyDialog(true)
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-64 overflow-hidden bg-gray-200">
                          <Image
                            src={prop.img}
                            alt={prop.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-3xl font-bold text-amber-600">{prop.price}</p>
                              <h3 className="text-lg font-bold mt-2 group-hover:text-amber-600 transition-colors">
                                {prop.title}
                              </h3>
                            </div>
                          </div>
                          <div className="flex gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4" />
                              {prop.beds} beds
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4" />
                              {prop.baths} baths
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {prop.m2} m²
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </motion.div>
            </TabsContent>

            {["for-rent", "new-development", "commercial"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-12">
                <p className="text-center text-gray-500 py-12">Coming soon</p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Neighborhood Guide */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Neighborhoods</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEIGHBORHOODS.map((neighborhood, i) => (
              <Reveal key={neighborhood.name} delay={i * 0.1}>
                <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-amber-50 to-white">
                  <CardContent className="p-8 space-y-6">
                    <h3 className="text-2xl font-bold">{neighborhood.name}</h3>
                    <p className="text-gray-600">{neighborhood.amenities}</p>
                    <Badge className="bg-amber-500 w-fit">{neighborhood.count} Properties</Badge>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Team */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Our Agents</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 0.1}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <Avatar className="w-24 h-24 mx-auto border-2 border-amber-500">
                      <AvatarImage src={agent.img} />
                      <AvatarFallback>{agent.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{agent.name}</h3>
                      <Badge variant="outline">{agent.spec}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Sold: {agent.sold}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: 500, suffix: "", label: "Sales Closed" },
              { value: 15, suffix: " years", label: "Experience" },
              { value: 2000000000, suffix: "€", label: "Total Volume" },
              { value: 98, suffix: "%", label: "Satisfaction" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-amber-100">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Market Insights</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Waterfront Premium", value: 42, change: "+8% YoY" },
              { label: "Downtown Growth", value: 35, change: "+5% YoY" },
              { label: "Hills Appreciation", value: 28, change: "+12% YoY" },
            ].map((trend, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="bg-gray-50">
                  <CardContent className="p-8 space-y-4">
                    <h3 className="font-bold text-lg">{trend.label}</h3>
                    <div className="space-y-2">
                      <Progress value={trend.value} className="h-3 bg-gray-200" />
                      <p className="text-sm text-amber-600 font-semibold">{trend.change}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Client Stories</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {[
                {
                  name: "Catherine & James",
                  quote: "Found our dream home in 3 viewings. Pinnacle's expertise is unmatched.",
                  location: "Waterfront Villa",
                },
                {
                  name: "Dr. Michael Chen",
                  quote: "Investment guidance that increased our portfolio by 28% in 2 years.",
                  location: "Downtown Penthouse",
                },
                {
                  name: "Sophie Laurent",
                  quote: "Seamless process from search to closing. Professional and thorough.",
                  location: "Hills Modern Estate",
                },
              ].map((testi, i) => (
                <CarouselItem key={i} className="basis-full md:basis-1/2">
                  <Reveal>
                    <Card className="bg-white">
                      <CardContent className="p-8 space-y-4">
                        <p className="text-xl italic text-gray-700">"{testi.quote}"</p>
                        <div>
                          <p className="font-semibold">{testi.name}</p>
                          <p className="text-sm text-amber-600">{testi.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-12">FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "How long does buying take?", a: "Typical timeline is 6-12 weeks from offer to closing." },
              { q: "Do you handle financing?", a: "We work with top mortgage partners. Pre-approval guidance available." },
              { q: "What about foreign buyers?", a: "We assist international clients with all legal requirements and visas." },
              { q: "Can I view properties virtually?", a: "Yes, 3D tours and video walkthroughs available for all listings." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Property Dialog */}
      <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedListing?.title}</DialogTitle>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {[selectedListing.img, selectedListing.img].map((img, i) => (
                    <CarouselItem key={i}>
                      <div className="relative h-80 rounded-lg overflow-hidden bg-gray-200">
                        <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
              </Carousel>

              <div className="space-y-4">
                <p className="text-3xl font-bold text-amber-600">{selectedListing.price}</p>
                <div className="flex gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" />
                    <span>{selectedListing.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    <span>{selectedListing.baths} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedListing.m2} m²</span>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="features" className="border-t">
                  <AccordionTrigger>Features & Amenities</AccordionTrigger>
                  <AccordionContent>
                    Premium appliances, heated pool, smart home, wine cellar, private elevator, terrace.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="neighborhood" className="border-t">
                  <AccordionTrigger>Neighborhood Info</AccordionTrigger>
                  <AccordionContent>
                    Walking distance to restaurants, galleries, and marina. 10 min to international school.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <MagneticBtn
                onClick={() => setShowViewingDialog(true)}
                className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
              >
                Schedule Private Viewing
              </MagneticBtn>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Viewing Dialog */}
      <Dialog open={showViewingDialog} onOpenChange={setShowViewingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Schedule Viewing</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <MagneticBtn className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold">
              Request Viewing
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
