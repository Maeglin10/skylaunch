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
import { Heart, MapPin, Calendar } from "lucide-react"

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

const SERVICES = [
  {
    name: "Full Planning",
    price: "€4,500+",
    desc: "Complete wedding management from engagement to honeymoon",
    items: ["Venue selection", "Vendor coordination", "Design & styling", "Budget management", "Day-of coordination"],
  },
  {
    name: "Partial Planning",
    price: "€2,500+",
    desc: "Focused planning for specific elements you need",
    items: ["Vendor selection", "Timeline creation", "Partial coordination", "Design consultation"],
  },
  {
    name: "Day-of Coordination",
    price: "€1,200+",
    desc: "Expert management on your wedding day only",
    items: ["Timeline execution", "Vendor liaison", "Emergency handling", "Guest management"],
  },
  {
    name: "Destination Weddings",
    price: "€5,000+",
    desc: "Complete management for weddings abroad",
    items: ["International logistics", "Local vendor networks", "Travel coordination", "Cultural planning"],
  },
]

const WEDDINGS = [
  { id: 1, venue: "Villa Tuscany", season: "Spring", style: "Romantic", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500" },
  { id: 2, venue: "Château Provence", season: "Summer", style: "Elegant", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500" },
  { id: 3, venue: "Mountain Lodge", season: "Fall", style: "Intimate", img: "https://images.unsplash.com/photo-1507838871357-7326363a3f81?q=80&w=500" },
  { id: 4, venue: "Beachfront Resort", season: "Summer", style: "Modern", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500" },
  { id: 5, venue: "Urban Loft", season: "Winter", style: "Contemporary", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500" },
  { id: 6, venue: "Garden Estate", season: "Spring", style: "Whimsical", img: "https://images.unsplash.com/photo-1507838871357-7326363a3f81?q=80&w=500" },
]

const VENDORS = [
  { name: "Venues", count: 200, icon: "🏛️" },
  { name: "Catering", count: 150, icon: "🍽️" },
  { name: "Photography", count: 120, icon: "📷" },
  { name: "Florals", count: 85, icon: "🌹" },
  { name: "Music & DJ", count: 90, icon: "🎵" },
  { name: "Transport", count: 70, icon: "🚗" },
]

const TIMELINE = [
  { phase: "12 Months Before", tasks: "Vision setting, budget planning, save-the-date design" },
  { phase: "6 Months Before", tasks: "Venue booking, catering tasting, vendor contracts" },
  { phase: "3 Months Before", tasks: "Invitations sent, final fittings, seating charts" },
  { phase: "Final Week", tasks: "Rehearsal, vendor confirmations, timeline execution" },
]

export default function PrismWeddingsLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  const [selectedWedding, setSelectedWedding] = useState<(typeof WEDDINGS)[0] | null>(null)
  const [showWeddingDialog, setShowWeddingDialog] = useState(false)
  const [showInquiryDialog, setShowInquiryDialog] = useState(false)

  return (
    <div ref={containerRef} className="bg-fdf8f0 text-gray-900 min-h-screen overflow-hidden">
      {/* Romantic Hero */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: parallax }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src="https://images.unsplash.com/photo-1109543?w=800&q=80"
            alt="Wedding ceremony"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-4 space-y-8">
          <Reveal>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-4"
            >
              <Heart className="w-16 h-16 mx-auto text-rose-300" />
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
              Your Day,<br />Perfectly Planned
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-2xl font-light max-w-3xl mx-auto">
              Expert planning & coordination for every wedding style. From intimate gatherings to destination celebrations.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <MagneticBtn
              onClick={() => setShowInquiryDialog(true)}
              className="px-12 py-4 bg-rose-500 text-white text-lg font-semibold rounded-full hover:bg-rose-600 transition-colors"
            >
              Plan Your Wedding
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-24 px-4 bg-gradient-to-b from-fdf8f0 to-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Our Services</h2>
          </Reveal>

          <Tabs defaultValue="full" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-white border border-rose-200">
              {SERVICES.map((service) => (
                <TabsTrigger
                  key={service.name}
                  value={service.name.toLowerCase()}
                  className="font-semibold data-[state=active]:bg-rose-500 data-[state=active]:text-white"
                >
                  {service.name.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {SERVICES.map((service) => (
              <TabsContent
                key={service.name}
                value={service.name.toLowerCase()}
                className="mt-12"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <Reveal>
                    <Card className="bg-gradient-to-br from-rose-50 to-white border-rose-200">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-3xl font-bold">{service.name}</h3>
                            <p className="text-gray-600 mt-2">{service.desc}</p>
                          </div>
                          <p className="text-3xl font-bold text-rose-600">{service.price}</p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-rose-200">
                          <p className="font-semibold">What's Included:</p>
                          <ul className="space-y-2">
                            {service.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <Heart className="w-4 h-4 text-rose-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Real Wedding Gallery */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Real Weddings</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {WEDDINGS.map((wedding, i) => (
                <CarouselItem key={wedding.id} className="basis-full md:basis-1/2">
                  <Reveal>
                    <Card
                      className="group cursor-pointer hover:shadow-2xl transition-shadow overflow-hidden"
                      onClick={() => {
                        setSelectedWedding(wedding)
                        setShowWeddingDialog(true)
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-96 overflow-hidden bg-gray-200">
                          <Image
                            src={wedding.img}
                            alt={wedding.venue}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 space-y-3">
                          <h3 className="text-2xl font-bold group-hover:text-rose-600 transition-colors">
                            {wedding.venue}
                          </h3>
                          <div className="flex gap-3">
                            <Badge className="bg-rose-500">{wedding.season}</Badge>
                            <Badge variant="outline">{wedding.style}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Explore how we brought this vision to life</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </div>
      </section>

      {/* Vendor Network */}
      <section className="py-24 px-4 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Our Vendor Network</h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {VENDORS.map((vendor, i) => (
              <Reveal key={vendor.name} delay={i * 0.08}>
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer hover:border-rose-500">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-5xl">{vendor.icon}</div>
                    <div>
                      <h3 className="font-bold">{vendor.name}</h3>
                      <Badge className="bg-rose-500 mt-2">{vendor.count}+ partners</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Timeline */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Planning Timeline</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {TIMELINE.map((item, i) => (
              <AccordionItem key={i} value={`timeline-${i}`} className="border border-rose-200 rounded-lg px-6">
                <AccordionTrigger className="font-semibold text-lg text-rose-600">
                  {item.phase}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.tasks}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: 250, suffix: "", label: "Weddings Planned" },
              { value: 10, suffix: " years", label: "Experience" },
              { value: 4.9, suffix: "★", label: "Rating" },
              { value: 100, suffix: "%", label: "Happy Couples" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-rose-100">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Love Stories</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {[
                {
                  couple: "Emma & Lucas",
                  quote: "Our wedding exceeded every dream. Prism made it effortless.",
                  venue: "Villa Tuscany",
                },
                {
                  couple: "Sophie & Marc",
                  quote: "Stress-free, gorgeous, and unforgettable. Best investment ever.",
                  venue: "Château Provence",
                },
                {
                  couple: "Marie & Jean",
                  quote: "Every detail was perfect. They understood our vision completely.",
                  venue: "Mountain Lodge",
                },
              ].map((testi, i) => (
                <CarouselItem key={i} className="basis-full md:basis-1/2">
                  <Reveal>
                    <Card className="bg-gradient-to-br from-rose-50 to-white">
                      <CardContent className="p-8 space-y-4">
                        <p className="text-xl italic text-gray-700">"{testi.quote}"</p>
                        <div>
                          <p className="font-semibold text-rose-600">{testi.couple}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {testi.venue}
                          </p>
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
      <section className="py-24 px-4 bg-rose-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-12">FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "What's the typical cost?", a: "Ranges €1,200-€5,000+ depending on services. Custom quotes provided." },
              { q: "Can you work with my vendors?", a: "Absolutely. We coordinate seamlessly with any vendor you choose." },
              { q: "Do you handle international weddings?", a: "Yes. We specialize in destination weddings and manage all logistics." },
              { q: "What about elopements?", a: "Yes! We offer intimate elopement planning for 2-20 guests." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-rose-200 rounded-lg px-6">
                <AccordionTrigger className="font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Wedding Dialog */}
      <Dialog open={showWeddingDialog} onOpenChange={setShowWeddingDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedWedding?.venue}</DialogTitle>
          </DialogHeader>
          {selectedWedding && (
            <div className="space-y-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {[selectedWedding.img, selectedWedding.img, selectedWedding.img, selectedWedding.img].map((img, i) => (
                    <CarouselItem key={i}>
                      <div className="relative h-80 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={img}
                          alt={`Photo ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
              </Carousel>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Badge className="bg-rose-500">{selectedWedding.season}</Badge>
                  <Badge variant="outline">{selectedWedding.style}</Badge>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  A stunning celebration featuring timeless elegance and personalized touches. This wedding showcases our expertise in coordinating every element from venue styling to guest experience.
                </p>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="story" className="border-t">
                  <AccordionTrigger>How We Did It</AccordionTrigger>
                  <AccordionContent>
                    From initial vision to final moment, we managed every detail. Custom florals, bespoke menu design, and seamless coordination created an unforgettable celebration.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <MagneticBtn
                onClick={() => setShowInquiryDialog(true)}
                className="w-full px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors font-semibold"
              >
                Plan Your Wedding Like This
              </MagneticBtn>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Inquiry Dialog */}
      <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Let's Plan Together</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <select className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500">
              <option>Select service</option>
              {SERVICES.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            <MagneticBtn className="w-full px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors font-semibold">
              Schedule Consultation
            </MagneticBtn>
            <p className="text-xs text-gray-500 text-center">We'll be in touch within 24 hours</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
