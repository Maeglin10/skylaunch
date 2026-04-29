"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"

const PROPERTIES = [
  { id: 1, city: "Paris", name: "Palais Lumière", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop", rooms: 45, amenities: ["Michelin-Star Restaurant", "Spa", "Wine Cellar"], rating: 4.9 },
  { id: 2, city: "Côte d'Azur", name: "Villa Azurea", image: "https://images.unsplash.com/photo-1564078516156-91b97c9eff7f?q=80&w=600&auto=format&fit=crop", rooms: 38, amenities: ["Private Beach", "Helipad", "Cinema"], rating: 4.8 },
  { id: 3, city: "Marrakech", name: "Riad Étoile", image: "https://images.unsplash.com/photo-1515266623033-32e4864c1f2a?q=80&w=600&auto=format&fit=crop", rooms: 32, amenities: ["Hammam", "Rooftop Bar", "Garden"], rating: 4.9 },
  { id: 4, city: "Maldives", name: "Coral Palace", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600&auto=format&fit=crop", rooms: 52, amenities: ["Overwater Villas", "Dive Center", "Sunset Bar"], rating: 5.0 },
]

const EXPERIENCES = [
  { title: "Spa & Wellness", desc: "Rejuvenate with world-class treatments in serene sanctuaries." },
  { title: "Gastronomy", desc: "Michelin-starred cuisine celebrating local and global flavors." },
  { title: "Adventures", desc: "Curated excursions from private yachts to mountain treks." },
  { title: "Culture", desc: "Exclusive access to art, heritage, and local masterpieces." },
]

const ROOM_TYPES = [
  { name: "Deluxe Queen", price: "€450/night", size: "42m²", amenities: ["Marble Bath", "City View", "Nespresso"] },
  { name: "Junior Suite", price: "€750/night", size: "62m²", amenities: ["Separate Living", "Spa Tub", "Terrace"] },
  { name: "Presidential", price: "€2,500/night", size: "180m²", amenities: ["Private Elevator", "Cinema", "Full Kitchen"] },
]

const CONCIERGE_SERVICES = [
  { service: "Private Transfers", desc: "Dedicated cars with English-speaking drivers worldwide." },
  { service: "Restaurant Reservations", desc: "Access to the finest dining establishments globally." },
  { service: "Private Tours", desc: "Expert-led immersive cultural and adventure experiences." },
  { service: "Special Events", desc: "Bespoke celebrations and gatherings coordination." },
]

const CHEFS = [
  { name: "Jean-Claude Arnaud", specialty: "French Cuisine", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", dishes: ["Coq au Vin", "Crème Brûlée", "Soufflé"] },
]

const TESTIMONIALS = [
  { text: "Palais Lumière redefined luxury for us. Every detail was perfection.", author: "The Marchands" },
  { text: "A sanctuary from the world. Service anticipated our every need.", author: "Sophie & Laurent" },
  { text: "Pure magic. We felt like royalty. Already planning our return.", author: "The Hakimi Family" },
]

const STATS = [
  { value: "8", label: "Properties" },
  { value: "500", label: "Rooms" },
  { value: "95%", label: "Satisfaction" },
  { value: "15", label: "Years Legacy" },
]

const FAQ_ITEMS = [
  { q: "What is your check-in/check-out time?", a: "Check-in is 3 PM and check-out is 11 AM. Early check-in and late check-out available on request." },
  { q: "What is your cancellation policy?", a: "Flexible cancellation up to 48 hours before arrival. Shorter notice incurs 50% charge." },
  { q: "Do you allow pets?", a: "Yes, select properties welcome pets. Please inquire directly for specific policies." },
  { q: "Can I host a wedding?", a: "Absolutely. We specialize in destination weddings with complete coordination." },
]

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
  return <span ref={ref}>{count}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

export default function LuxeStay() {
  const [selectedTab, setSelectedTab] = useState("Paris")
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <div className="bg-[#faf6f0] text-[#3d1f0f] overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#c9a84c]/20 z-50 flex items-center justify-between px-6">
        <div className="text-2xl font-serif tracking-wide">LUXE STAY</div>
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="#properties" className="hover:text-[#c9a84c] transition">Properties</Link>
          <Link href="#experiences" className="hover:text-[#c9a84c] transition">Experiences</Link>
          <Link href="#concierge" className="hover:text-[#c9a84c] transition">Concierge</Link>
        </div>
      </nav>

      <motion.section style={{ opacity: heroOpacity, y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop" alt="Luxury Hotel" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl md:text-7xl font-serif mb-6 text-white tracking-tight">
            RESORT LUXURY
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Eight exquisite properties across the globe's most coveted destinations.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Dialog>
              <DialogTrigger asChild>
                <MagneticBtn className="px-8 py-4 bg-[#c9a84c] text-[#3d1f0f] font-semibold rounded-full hover:bg-[#b8965f] transition">
                  Reserve Now
                </MagneticBtn>
              </DialogTrigger>
              <DialogContent className="bg-[#faf6f0] border-[#c9a84c]/20 max-w-md">
                <DialogTitle>Plan Your Escape</DialogTitle>
                <form className="space-y-4">
                  <input type="text" placeholder="Guest Name" className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#3d1f0f]" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#3d1f0f]" />
                  <input type="date" className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#3d1f0f]" />
                  <select className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#3d1f0f]">
                    <option>Select Property</option>
                    {PROPERTIES.map((p) => <option key={p.id}>{p.city}</option>)}
                  </select>
                  <button type="submit" className="w-full px-4 py-3 bg-[#c9a84c] text-[#3d1f0f] font-semibold rounded hover:bg-[#b8965f] transition">
                    Check Availability
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.section>

      <section id="properties" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-serif mb-4 text-center">Our Collection</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Handpicked havens in Paris, Côte d'Azur, Marrakech, and the Maldives.</p>
        </Reveal>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#f0e6d2] border border-[#c9a84c]/30 mb-8">
            {PROPERTIES.map((prop) => (
              <TabsTrigger key={prop.id} value={prop.city} className="text-sm data-[state=active]:bg-[#c9a84c] data-[state=active]:text-[#faf6f0]">
                {prop.city}
              </TabsTrigger>
            ))}
          </TabsList>

          {PROPERTIES.map((prop) => (
            <TabsContent key={prop.id} value={prop.city}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <Reveal delay={0.1}>
                  <div className="relative h-96 rounded-lg overflow-hidden border border-[#c9a84c]/20">
                    <Image src={prop.image} alt={prop.name} fill className="object-cover" unoptimized />
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <h3 className="text-4xl font-serif mb-4">{prop.name}</h3>
                  <p className="text-gray-600 mb-6">{prop.rooms} luxuriously appointed rooms across premier suite categories.</p>

                  <div className="mb-8">
                    <p className="text-sm text-gray-600 mb-3 font-semibold">KEY AMENITIES</p>
                    <div className="space-y-2">
                      {prop.amenities.map((amenity, i) => (
                        <Badge key={i} className="bg-[#c9a84c]/20 text-[#c9a84c] font-normal">{amenity}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-8">
                    <span className="font-semibold">{prop.rating} / 5</span>
                    <span className="text-sm text-gray-600">★★★★★</span>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <MagneticBtn className="px-6 py-3 bg-[#c9a84c] text-[#3d1f0f] font-semibold rounded hover:bg-[#b8965f] transition">
                        View Rooms & Book
                      </MagneticBtn>
                    </DialogTrigger>
                    <DialogContent className="bg-[#faf6f0] border-[#c9a84c]/20 max-w-2xl">
                      <DialogTitle>Room Categories</DialogTitle>
                      <div className="space-y-4">
                        {ROOM_TYPES.map((room, idx) => (
                          <Card key={idx} className="bg-white border-[#c9a84c]/20">
                            <CardContent className="p-6">
                              <h4 className="text-xl font-semibold mb-2">{room.name}</h4>
                              <p className="text-[#c9a84c] font-semibold mb-3">{room.price}</p>
                              <p className="text-sm text-gray-600 mb-4">{room.size}</p>
                              <button className="text-[#c9a84c] font-semibold hover:underline">Select Room →</button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </Reveal>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section id="experiences" className="py-24 px-6 bg-[#f0e6d2]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1} className="mb-16">
            <h2 className="text-5xl font-serif text-center mb-4">Curated Experiences</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">Beyond accommodation—moments that transform.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Card className="bg-white border-[#c9a84c]/20 h-full">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="text-center">
              <div className="text-4xl font-bold text-[#c9a84c] mb-2"><Counter target={parseInt(stat.value)} /></div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="concierge" className="py-24 px-6 bg-[#f0e6d2]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1} className="mb-16">
            <h2 className="text-5xl font-serif text-center mb-4">24/7 Concierge</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">Your personal wish-granter at your service.</p>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4 max-w-3xl mx-auto">
            {CONCIERGE_SERVICES.map((item, idx) => (
              <AccordionItem key={idx} value={`service-${idx}`} className="border-[#c9a84c]/20 bg-white rounded">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#c9a84c] transition px-6">
                  {item.service}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-6 pb-4">
                  {item.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-serif text-center mb-4">Culinary Excellence</h2>
          <p className="text-gray-600 text-center">Michelin-starred cuisine at every property.</p>
        </Reveal>

        {CHEFS.map((chef, idx) => (
          <Reveal key={idx} delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden border border-[#c9a84c]/20">
              <Image src={chef.image} alt={chef.name} fill className="object-cover" unoptimized />
            </div>
            <div>
              <h3 className="text-3xl font-serif mb-2">{chef.name}</h3>
              <p className="text-[#c9a84c] font-semibold mb-6">Executive Chef</p>
              <p className="text-gray-600 mb-6">Specializing in {chef.specialty.toLowerCase()}, crafting signature dishes that define our culinary identity.</p>
              <p className="text-sm text-gray-600 mb-4 font-semibold">SIGNATURE DISHES</p>
              <div className="space-y-2">
                {chef.dishes.map((dish, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">→</span>
                    <span>{dish}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="py-24 px-6 bg-[#f0e6d2]">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1} className="mb-16">
            <h2 className="text-5xl font-serif text-center mb-4">Guest Stories</h2>
            <p className="text-gray-600 text-center">Cherished memories from our beloved guests.</p>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, idx) => (
                <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white border-[#c9a84c]/20 h-full">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <p className="text-gray-700 italic mb-4 flex-1">"{testi.text}"</p>
                      <p className="text-sm font-semibold text-[#3d1f0f]">— {testi.author}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-[#c9a84c]/30" />
            <CarouselNext className="border-[#c9a84c]/30" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-12">
          <h2 className="text-5xl font-serif text-center mb-4">Frequently Asked</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-[#c9a84c]/20 bg-[#f0e6d2] rounded">
              <AccordionTrigger className="text-lg font-semibold hover:text-[#c9a84c] transition px-6">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 px-6 pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 bg-[#f0e6d2] text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Begin Your Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Luxury awaits at one of our exquisite properties.</p>
          <Dialog>
            <DialogTrigger asChild>
              <MagneticBtn className="px-8 py-4 bg-[#c9a84c] text-[#3d1f0f] font-semibold rounded-full hover:bg-[#b8965f] transition">
                Plan Your Escape
              </MagneticBtn>
            </DialogTrigger>
            <DialogContent className="bg-[#faf6f0] border-[#c9a84c]/20">
              <DialogTitle>Get in Touch</DialogTitle>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#3d1f0f]" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#3d1f0f]" />
                <textarea placeholder="Tell us about your ideal stay..." className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#3d1f0f] h-24" />
                <button type="submit" className="w-full px-4 py-3 bg-[#c9a84c] text-[#3d1f0f] font-semibold rounded hover:bg-[#b8965f] transition">
                  Submit Request
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
