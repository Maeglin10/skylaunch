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
import { Users, Clock, Mountain } from "lucide-react"

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

const EXPERIENCES = [
  {
    id: 1,
    title: "Everest Base Camp Trek",
    type: "Hiking",
    difficulty: "Hard",
    duration: "14 days",
    group: "8-12",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500",
  },
  {
    id: 2,
    title: "Hawaiian Wave Mastery",
    type: "Surfing",
    difficulty: "Intermediate",
    duration: "7 days",
    group: "4-8",
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=500",
  },
  {
    id: 3,
    title: "Chamonix Ski Expedition",
    type: "Skiing",
    difficulty: "Hard",
    duration: "10 days",
    group: "6-10",
    img: "https://images.unsplash.com/photo-1551632786-91b9ed0b88b1?q=80&w=500",
  },
  {
    id: 4,
    title: "Great Barrier Reef Dive",
    type: "Diving",
    difficulty: "Beginner-Friendly",
    duration: "5 days",
    group: "4-6",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=500",
  },
  {
    id: 5,
    title: "Serengeti Safari Adventure",
    type: "Safari",
    difficulty: "Easy",
    duration: "8 days",
    group: "10-16",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=500",
  },
  {
    id: 6,
    title: "Japanese Temple Trek",
    type: "Cultural",
    difficulty: "Easy",
    duration: "9 days",
    group: "8-14",
    img: "https://images.unsplash.com/photo-1552836906-6bf0631f0fbe?q=80&w=500",
  },
  {
    id: 7,
    title: "Costa Rica Zip Line",
    type: "Adventure",
    difficulty: "Intermediate",
    duration: "6 days",
    group: "6-12",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=500",
  },
  {
    id: 8,
    title: "Iceland Ring Road",
    type: "Hiking",
    difficulty: "Moderate",
    duration: "7 days",
    group: "8-12",
    img: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=500",
  },
]

const DESTINATIONS = [
  { name: "Asia", count: 24 },
  { name: "South America", count: 18 },
  { name: "Africa", count: 16 },
  { name: "Europe", count: 21 },
  { name: "North America", count: 14 },
  { name: "Oceania", count: 12 },
]

const GUIDES = [
  { id: 1, name: "Raj Patel", expertise: "Himalayan Expert", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
  { id: 2, name: "Sofia Moreno", expertise: "Jungle & Safari", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
  { id: 3, name: "James Anderson", expertise: "Water Sports", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" },
  { id: 4, name: "Kenji Yamamoto", expertise: "Asia Specialist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" },
]

export default function DriftTravelLanding() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof EXPERIENCES)[0] | null>(null)
  const [showExperienceDialog, setShowExperienceDialog] = useState(false)
  const [showBookingDialog, setShowBookingDialog] = useState(false)

  return (
    <div className="bg-fef9f0 text-gray-900 min-h-screen overflow-hidden">
      {/* Hero with parallax particles */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200"
            alt="Adventure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-70"
            animate={{
              x: [Math.random() * 300 - 150, Math.random() * 300 - 150],
              y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-4 space-y-8">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
              Live on<br />the Edge
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-2xl font-light max-w-3xl mx-auto">
              Guided adventures to 80+ countries. Expert-led expeditions for every thrill level. No experience needed.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <MagneticBtn
              onClick={() => setShowBookingDialog(true)}
              className="px-12 py-4 bg-orange-500 text-white text-lg font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              Book Adventure
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Experience Tabs */}
      <section className="py-24 px-4 bg-gradient-to-b from-fef9f0 to-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Featured Experiences</h2>
          </Reveal>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-white border border-gray-200">
              {["All", "Hiking", "Water Sports", "Cultural"].map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat.toLowerCase()}
                  className="font-semibold data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {EXPERIENCES.map((exp, i) => (
                  <Reveal key={exp.id} delay={i * 0.08}>
                    <Card
                      className="group cursor-pointer hover:shadow-xl transition-shadow overflow-hidden"
                      onClick={() => {
                        setSelectedExperience(exp)
                        setShowExperienceDialog(true)
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <Image
                            src={exp.img}
                            alt={exp.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">{exp.difficulty}</Badge>
                            <Badge variant="outline">{exp.duration}</Badge>
                          </div>
                          <h3 className="font-bold group-hover:text-orange-500 transition-colors line-clamp-2">
                            {exp.title}
                          </h3>
                          <div className="flex gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {exp.group}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </motion.div>
            </TabsContent>

            {["hiking", "water-sports", "cultural"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-12">
                <p className="text-center text-gray-500 py-12">Filtering by category...</p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Destination Filter */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">By Destination</h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <Reveal key={dest.name} delay={i * 0.05}>
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer hover:border-orange-500">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-bold">{dest.name}</h3>
                    <Badge className="bg-orange-500 w-full justify-center">{dest.count} trips</Badge>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trip Carousel */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Featured Trip</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {EXPERIENCES.slice(0, 3).map((exp) => (
                <CarouselItem key={exp.id}>
                  <Reveal>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2">
                        <div className="relative h-96 md:h-auto overflow-hidden">
                          <Image
                            src={exp.img}
                            alt={exp.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-8 space-y-6 flex flex-col justify-center">
                          <div>
                            <h3 className="text-3xl font-bold mb-2">{exp.title}</h3>
                            <div className="flex gap-2">
                              <Badge>{exp.type}</Badge>
                              <Badge variant="outline">{exp.difficulty}</Badge>
                            </div>
                          </div>
                          <p className="text-gray-600">Experience the adventure of a lifetime with expert guides. Includes all meals, lodging, and safety equipment.</p>
                          <div className="flex gap-6 text-sm">
                            <div>
                              <p className="text-gray-500">Duration</p>
                              <p className="font-bold">{exp.duration}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Group Size</p>
                              <p className="font-bold">{exp.group} people</p>
                            </div>
                          </div>
                          <MagneticBtn
                            onClick={() => {
                              setSelectedExperience(exp)
                              setShowBookingDialog(true)
                            }}
                            className="w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-semibold"
                          >
                            Reserve Spot
                          </MagneticBtn>
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

      {/* Stats */}
      <section className="py-24 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: 5000, suffix: "+", label: "Travelers" },
              { value: 80, suffix: "", label: "Countries" },
              { value: 10, suffix: " years", label: "Experience" },
              { value: 4.9, suffix: "★", label: "Rating" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-orange-100">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Team */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Expert Guides</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GUIDES.map((guide, i) => (
              <Reveal key={guide.id} delay={i * 0.1}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <Avatar className="w-24 h-24 mx-auto border-2 border-orange-500">
                      <AvatarImage src={guide.img} />
                      <AvatarFallback>{guide.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{guide.name}</h3>
                      <Badge variant="outline">{guide.expertise}</Badge>
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
            <h2 className="text-5xl font-bold mb-16">Traveler Stories</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {[
                { name: "Alex Chen", quote: "Best decision ever. Changed my life forever.", trip: "Everest Trek" },
                { name: "Maria Santos", quote: "Safe, professional, and incredibly fun.", trip: "Great Barrier Reef" },
                { name: "David Kumar", quote: "Worth every penny. Memories for life.", trip: "Serengeti Safari" },
              ].map((testi, i) => (
                <CarouselItem key={i} className="basis-full md:basis-1/2">
                  <Reveal>
                    <Card className="bg-white">
                      <CardContent className="p-8 space-y-4">
                        <p className="text-xl italic text-gray-700">"{testi.quote}"</p>
                        <div>
                          <p className="font-semibold">{testi.name}</p>
                          <p className="text-sm text-orange-600">{testi.trip}</p>
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

      {/* Safety Accordion */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-12">Safety & Preparation</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "What insurance is included?", a: "Travel & emergency medical coverage up to $250K included." },
              { q: "Fitness requirements?", a: "Varies by trip. Beginners welcome with proper preparation." },
              { q: "Training provided?", a: "Yes. Pre-trip training calls and onsite orientation included." },
              { q: "Certifications required?", a: "For diving/skiing: optional. We offer certified instruction." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`safety-${i}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-12">FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "Can I travel solo?", a: "Absolutely. Join our community of solo adventurers." },
              { q: "What's the cancellation policy?", a: "Full refund up to 60 days before. 50% refund after." },
              { q: "How fit do I need to be?", a: "Most trips accommodate various fitness levels." },
              { q: "When are group deposits due?", a: "50% at booking, 50% 90 days before departure." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Experience Dialog */}
      <Dialog open={showExperienceDialog} onOpenChange={setShowExperienceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedExperience?.title}</DialogTitle>
          </DialogHeader>
          {selectedExperience && (
            <div className="space-y-6">
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={selectedExperience.img}
                  alt={selectedExperience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge>{selectedExperience.type}</Badge>
                <Badge variant="outline">{selectedExperience.difficulty}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-bold">{selectedExperience.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500">Group Size</p>
                  <p className="font-bold">{selectedExperience.group}</p>
                </div>
                <div>
                  <p className="text-gray-500">Difficulty</p>
                  <p className="font-bold">{selectedExperience.difficulty}</p>
                </div>
              </div>
              <p className="text-gray-600">
                This adventure includes expert guidance, all meals, lodging, and safety equipment. Transportation and visa assistance available.
              </p>
              <Accordion type="single" collapsible>
                <AccordionItem value="itinerary">
                  <AccordionTrigger>Full Itinerary</AccordionTrigger>
                  <AccordionContent>Day-by-day breakdown of your adventure with detailed descriptions.</AccordionContent>
                </AccordionItem>
              </Accordion>
              <MagneticBtn
                onClick={() => setShowBookingDialog(true)}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-semibold"
              >
                Book Now
              </MagneticBtn>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Reserve Your Adventure</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Select experience</option>
              {EXPERIENCES.map((exp) => (
                <option key={exp.id} value={exp.title}>
                  {exp.title}
                </option>
              ))}
            </select>
            <MagneticBtn className="w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-semibold">
              Request Booking
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
