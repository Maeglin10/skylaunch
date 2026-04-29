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
import { Separator } from "@/components/ui/separator"
import { Zap, MapPin, Gauge, DollarSign, FileText, ChevronDown, ArrowRight, Fuel } from "lucide-react"

const VEHICLES = [
  { make: "Ferrari", model: "SF90 Stradale", hp: "986 hp", accel: "2.5s", price: "€575K", cat: "Supercar" },
  { make: "Lamborghini", model: "Revuelto", hp: "1015 hp", accel: "2.4s", price: "€645K", cat: "Hypercar" },
  { make: "Porsche", model: "911 Turbo S", hp: "650 hp", accel: "2.7s", price: "€245K", cat: "Supercar" },
  { make: "Bugatti", model: "Bolide", hp: "1850 hp", accel: "2.2s", price: "€5.2M", cat: "Ultimate" },
  { make: "McLaren", model: "Speedtail", hp: "250 mph", accel: "2.8s", price: "€2.1M", cat: "Ultimate" },
  { make: "Rolls-Royce", model: "Phantom", hp: "563 hp", accel: "5.1s", price: "€450K", cat: "Luxury" },
]

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  )
}

const Counter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 90
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

const MagneticBtn = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * 0.3)
    y.set((e.clientY - r.top - r.height/2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
    onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

export default function ChromeMotors() {
  const [activeTab, setActiveTab] = useState("supercars")
  const [selectedCar, setSelectedCar] = useState<typeof VEHICLES[0] | null>(null)
  const [openBooking, setOpenBooking] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const categories = {
    supercars: VEHICLES.filter(v => v.cat === "Supercar"),
    ultimate: VEHICLES.filter(v => v.cat === "Ultimate"),
    luxury: VEHICLES.filter(v => v.cat === "Luxury"),
  }

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-gradient-to-b from-[#080808] via-[#0f0f0f] to-[#080808] text-white min-h-screen font-sans">
      {/* Parallax Hero */}
      <motion.div style={{ opacity }} className="relative h-screen flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200"
          alt="Luxury Car"
          fill
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <h1 className="text-6xl md:text-7xl font-black mb-6" style={{ color: '#c0c0c0' }}>
              CHROME<br />MOTORS
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-8 font-light">
              Exotic automobiles for the discerning collector. 300+ vehicles. 50 brands. 15 years of excellence.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-8 py-4 bg-[#c0c0c0] text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-[#c0c0c0]/50 transition-all">
              Explore Collection
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.div>

      {/* Vehicles Tabs */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#dc2626' }}>Our Collection</h2>
          <p className="text-gray-400 mb-12 text-lg">Hand-selected vehicles for passionate collectors</p>
        </Reveal>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 bg-[#1a1a1a] p-2 rounded-lg mb-12">
            <TabsTrigger value="supercars" className="font-bold">Supercars</TabsTrigger>
            <TabsTrigger value="ultimate" className="font-bold">Ultimate</TabsTrigger>
            <TabsTrigger value="luxury" className="font-bold">Luxury</TabsTrigger>
          </TabsList>

          {Object.entries(categories).map(([key, vehicles]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((car, idx) => (
                  <Reveal key={`${car.make}-${car.model}`} delay={idx * 0.1}>
                    <Card
                      className="bg-[#1a1a1a] border-[#c0c0c0]/20 hover:border-[#dc2626] transition-all group cursor-pointer"
                      onClick={() => setSelectedCar(car)}
                    >
                      <CardContent className="p-6">
                        <div className="aspect-video bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] rounded-lg mb-4 flex items-center justify-center">
                          <Zap className="w-12 h-12 text-[#dc2626]/30" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{car.make} {car.model}</h3>
                        <Badge className="mb-4 bg-[#dc2626]">{car.cat}</Badge>

                        <div className="space-y-2 text-sm text-gray-400 mb-4">
                          <div className="flex justify-between">
                            <span>Power</span>
                            <span className="text-white font-semibold">{car.hp}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>0-100 km/h</span>
                            <span className="text-white font-semibold">{car.accel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price</span>
                            <span className="text-[#c0c0c0] font-bold">{car.price}</span>
                          </div>
                        </div>

                        <button className="w-full py-2 border border-[#dc2626] text-[#dc2626] font-semibold rounded hover:bg-[#dc2626] hover:text-white transition-all">
                          View Details
                        </button>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Finance Calculator */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#dc2626' }}>Financing Options</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              term: "Down Payment Options",
              content: "Flexible structures from 10% to 50% down. We work with wealth managers and family offices."
            },
            {
              term: "APR Financing",
              content: "Competitive rates 2.9% - 6.5% depending on credit profile and down payment."
            },
            {
              term: "12, 24, 36, 48 Month Terms",
              content: "Choose your timeline. Shorter terms mean lower rates. All terms include full coverage insurance."
            },
            {
              term: "Trade-In Options",
              content: "We accept trade-ins from any exotic brand. Get premium valuations for your current vehicle."
            },
          ].map((item, idx) => (
            <Reveal key={item.term} delay={idx * 0.1}>
              <AccordionItem value={`fin-${idx}`} className="border-[#c0c0c0]/20">
                <AccordionTrigger className="hover:text-[#dc2626] transition-colors font-bold">
                  {item.term}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* Provenance Section */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#dc2626' }}>Car History & Provenance</h2>
          <p className="text-gray-400 mb-12 text-lg">Every vehicle comes with complete documentation</p>
        </Reveal>

        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {[
              { title: "Service Records", desc: "Complete maintenance history from day one" },
              { title: "Factory Certification", desc: "Original factory documentation intact" },
              { title: "Previous Ownership", desc: "Verified ownership chain and background" },
              { title: "Accident Report", desc: "Clean CarFax/Autocheck report" },
              { title: "Mileage Verification", desc: "Authenticated and verified mileage" },
            ].map((item, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#1a1a1a] border-[#c0c0c0]/20">
                  <CardContent className="p-8">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Vehicles", value: 300 },
              { label: "Years in Business", value: 15 },
              { label: "Brands", value: 50 },
              { label: "Satisfaction", value: 5, suffix: "★" },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 0.1}>
                <div className="text-center p-6 bg-[#1a1a1a] rounded-lg border border-[#c0c0c0]/20">
                  <div className="text-4xl font-black mb-2" style={{ color: '#c0c0c0' }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Test Drive Booking */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6" style={{ color: '#dc2626' }}>Experience the Drive</h2>
          <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
            Schedule a test drive with one of our exotic vehicles. Feel the power. Feel the precision.
          </p>
          <MagneticBtn
            onClick={() => setOpenBooking(true)}
            className="px-10 py-4 bg-[#dc2626] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#dc2626]/50 transition-all"
          >
            Book Test Drive
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#dc2626' }}>Collector Stories</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { text: "Got my dream Ferrari. Seamless process. Highly recommend.", author: "Paul M.", title: "CEO, Tech" },
            { text: "25 years I wanted a real Bugatti. Chrome Motors made it happen. Thank you!", author: "Elena R.", title: "Collector" },
            { text: "Best financing terms in Monaco. Professional crew. Will buy again.", author: "Jean-Claude", title: "Investor" },
          ].map((testimonial, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-[#1a1a1a] border-[#c0c0c0]/20">
                <CardContent className="p-8">
                  <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#dc2626' }}>FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { q: "Can you arrange transport?", a: "Yes. We provide white-glove delivery worldwide via specialized auto carriers." },
            { q: "Do you do CPO (Certified Pre-Owned)?", a: "Absolutely. Our certified vehicles go through multi-point inspections." },
            { q: "What about insurance?", a: "We can arrange coverage or connect you with specialists in exotic auto insurance." },
            { q: "International purchases?", a: "We handle EU/US/Middle East buyers. Complete documentation and export facilitation." },
          ].map((item, idx) => (
            <Reveal key={item.q} delay={idx * 0.1}>
              <AccordionItem value={`faq-${idx}`} className="border-[#c0c0c0]/20">
                <AccordionTrigger className="hover:text-[#dc2626] transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      <Dialog open={openBooking} onOpenChange={setOpenBooking}>
        <DialogContent className="bg-[#1a1a1a] border-[#dc2626]">
          <DialogHeader>
            <DialogTitle style={{ color: '#dc2626' }}>Book a Test Drive</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input placeholder="Full Name" className="w-full px-4 py-2 bg-[#080808] border border-[#c0c0c0]/30 rounded text-white placeholder-gray-500" />
            <input placeholder="Email" type="email" className="w-full px-4 py-2 bg-[#080808] border border-[#c0c0c0]/30 rounded text-white placeholder-gray-500" />
            <input placeholder="Preferred Vehicle" className="w-full px-4 py-2 bg-[#080808] border border-[#c0c0c0]/30 rounded text-white placeholder-gray-500" />
            <input placeholder="Preferred Date" type="date" className="w-full px-4 py-2 bg-[#080808] border border-[#c0c0c0]/30 rounded text-white placeholder-gray-500" />
            <button className="w-full py-3 bg-[#dc2626] text-white font-bold rounded hover:opacity-90 transition-opacity">
              Reserve Drive
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedCar && (
        <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
          <DialogContent className="bg-[#1a1a1a] border-[#dc2626] max-w-2xl">
            <DialogHeader>
              <DialogTitle style={{ color: '#dc2626' }}>{selectedCar.make} {selectedCar.model}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#0a0a0a] rounded">
                  <p className="text-gray-400 text-sm mb-1">Power Output</p>
                  <p className="text-2xl font-bold text-[#c0c0c0]">{selectedCar.hp}</p>
                </div>
                <div className="p-4 bg-[#0a0a0a] rounded">
                  <p className="text-gray-400 text-sm mb-1">0-100 km/h</p>
                  <p className="text-2xl font-bold text-[#c0c0c0]">{selectedCar.accel}</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#dc2626]/20 to-transparent rounded border border-[#dc2626]/50">
                <p className="text-gray-400 text-sm mb-1">Price</p>
                <p className="text-4xl font-black" style={{ color: '#c0c0c0' }}>{selectedCar.price}</p>
              </div>
              <button className="w-full py-3 bg-[#dc2626] text-white font-bold rounded hover:opacity-90 transition-opacity">
                Contact Specialist
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
