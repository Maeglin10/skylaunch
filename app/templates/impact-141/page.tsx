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
import { Menu, X, Heart, MapPin, Clock, Droplets, Wind, Sun, Smile, Gift } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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
    const duration = 1500
    const step = target / (duration / 16)
    const t = setInterval(() => setCount(c => { const next = c + step; if (next >= target) { clearInterval(t); return target; } return next; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`cursor-pointer transition-all duration-200 ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default function OasisSpa() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedTreatment, setSelectedTreatment] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const { scrollY } = useScroll()

  const treatments = {
    massage: [
      { id: 1, name: "Swedish Massage", duration: "60 min", price: "€85", benefits: ["Relaxation", "Circulation", "Tension relief"] },
      { id: 2, name: "Deep Tissue", duration: "60 min", price: "€95", benefits: ["Muscle release", "Pain relief", "Recovery"] },
      { id: 3, name: "Hot Stone", duration: "75 min", price: "€110", benefits: ["Deep warmth", "Healing", "Renewal"] },
      { id: 4, name: "Thai Massage", duration: "90 min", price: "€125", benefits: ["Energy flow", "Flexibility", "Balance"] },
      { id: 5, name: "Lomi Lomi", duration: "60 min", price: "€95", benefits: ["Hawaiian healing", "Flow", "Joy"] },
      { id: 6, name: "Sports Massage", duration: "60 min", price: "€90", benefits: ["Athletic recovery", "Performance", "Prevention"] },
      { id: 7, name: "Prenatal Massage", duration: "60 min", price: "€90", benefits: ["Safe for pregnancy", "Comfort", "Support"] },
      { id: 8, name: "Couples Massage", duration: "60 min", price: "€170", benefits: ["Connection", "Relaxation", "Harmony"] },
    ],
    facial: [
      { id: 9, name: "HydraGlow Facial", duration: "60 min", price: "€75", benefits: ["Hydration", "Radiance", "Refresh"] },
      { id: 10, name: "Pure Oxygen", duration: "45 min", price: "€85", benefits: ["Oxygenation", "Glow", "Youth"] },
      { id: 11, name: "Crystal Rose", duration: "60 min", price: "€95", benefits: ["Anti-aging", "Rejuvenation", "Luminosity"] },
    ],
    body: [
      { id: 12, name: "Detox Wrap", duration: "75 min", price: "€105", benefits: ["Purification", "Softness", "Renewal"] },
      { id: 13, name: "Honey Exfoliate", duration: "50 min", price: "€65", benefits: ["Smoothness", "Glow", "Wellness"] },
    ],
    nails: [
      { id: 14, name: "Manicure Deluxe", duration: "45 min", price: "€45", benefits: ["Nourished hands", "Shine", "Strength"] },
      { id: 15, name: "Pedicure Bliss", duration: "60 min", price: "€55", benefits: ["Soft feet", "Rejuvenation", "Comfort"] },
    ],
    packages: [
      { id: 16, name: "Escape Package", duration: "3 hours", price: "€199", includes: ["Massage", "Facial", "Tea"] },
      { id: 17, name: "Revival Package", duration: "4 hours", price: "€279", includes: ["Massage", "Body", "Facial", "Nails"] },
    ],
  }

  const experiences = {
    halfDay: ["2 Treatments", "Healthy Lunch", "Wellness Tea", "Quiet Lounge Access"],
    fullDay: ["4 Treatments", "All Meals", "Meditation", "Hydrotherapy", "Private Space"],
    weekend: ["8 Treatments", "Full Board", "Workshops", "Guided Nature", "Renewal Rituals"],
  }

  const therapists = [
    { name: "Elena Moretti", specialty: "Swedish & Deep Tissue", years: "12", bio: "Certified massage therapist with healing touch" },
    { name: "Sofia Santos", specialty: "Facial & Body", years: "15", bio: "Skincare expert and wellness visionary" },
    { name: "Marco Rossi", specialty: "Thai & Sports", years: "10", bio: "Athletic recovery and energy specialist" },
    { name: "Lucia Bonetti", specialty: "Holistic Wellness", years: "18", bio: "Master therapist and meditation guide" },
  ]

  const products = [
    { name: "Luminous Serum", price: "€55", benefit: "Brightens & Protects" },
    { name: "Rose Oil", price: "€45", benefit: "Hydrates & Soothes" },
    { name: "Honey Mask", price: "€38", benefit: "Nourishes & Glows" },
    { name: "Detox Cream", price: "€52", benefit: "Purifies & Restores" },
    { name: "Eye Essence", price: "€48", benefit: "Firms & Rejuvenates" },
    { name: "Night Elixir", price: "€60", benefit: "Repairs & Renews" },
  ]

  const giftTiers = [
    { amount: "€50", perks: ["1 Treatment", "Welcome Drink", "Gift Card"] },
    { amount: "€100", perks: ["2 Treatments", "Spa Lunch", "Products"] },
    { amount: "€200", perks: ["5 Treatments", "Full Experience", "Premium Products"] },
  ]

  return (
    <div style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#fdf8f2] text-[#3d2014]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; font-weight: 600; }
      `}</style>

      {/* Mobile Nav */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button className="fixed top-6 left-6 z-50 md:hidden cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur p-2 rounded-lg">
            <Menu className="w-6 h-6 text-[#3d2014]" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#fdf8f2] border-[#c9847a]/20">
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="#treatments" className="text-lg font-light text-[#c9847a] cursor-pointer hover:text-[#3d2014]">Treatments</Link>
            <Link href="#experience" className="text-lg font-light text-[#c9847a] cursor-pointer hover:text-[#3d2014]">Experiences</Link>
            <Link href="#therapists" className="text-lg font-light text-[#c9847a] cursor-pointer hover:text-[#3d2014]">Therapists</Link>
            <Link href="#products" className="text-lg font-light text-[#c9847a] cursor-pointer hover:text-[#3d2014]">Products</Link>
            <Link href="#faq" className="text-lg font-light text-[#c9847a] cursor-pointer hover:text-[#3d2014]">FAQ</Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero with Petal Particles */}
      <motion.section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop" alt="Spa" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>

        {/* Floating Petals */}
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute"
            animate={{ y: [0, -300], opacity: [1, 0], rotate: [0, 360] }}
            transition={{ duration: 6 + i * 0.5, repeat: Infinity }}
            style={{ left: `${15 + i * 12}%`, top: `${30 + i * 5}%` }}
          >
            <Heart className="w-6 h-6 text-[#d4a017]/40" fill="currentColor" />
          </motion.div>
        ))}

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-light text-white mb-6 leading-tight">Oasis</h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8">Urban Luxury Spa & Wellness Sanctuary</p>
            <MagneticBtn className="px-8 py-4 bg-[#c9847a] text-white rounded-full font-light hover:bg-[#a86d64] shadow-lg">Book Treatment</MagneticBtn>
          </motion.div>
        </div>
      </motion.section>

      {/* Treatments Section */}
      <section id="treatments" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light text-[#3d2014] mb-4">Treatments</h2>
          <p className="text-lg text-[#999] font-light mb-12">Curated experiences for complete renewal</p>
        </Reveal>

        <Tabs defaultValue="massage" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-[#c9847a]/20 rounded-full p-1">
            <TabsTrigger value="massage" className="cursor-pointer text-xs">Massage</TabsTrigger>
            <TabsTrigger value="facial" className="cursor-pointer text-xs">Facial</TabsTrigger>
            <TabsTrigger value="body" className="cursor-pointer text-xs">Body</TabsTrigger>
            <TabsTrigger value="nails" className="cursor-pointer text-xs">Nails</TabsTrigger>
            <TabsTrigger value="packages" className="cursor-pointer text-xs">Packages</TabsTrigger>
          </TabsList>

          {Object.entries(treatments).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((treatment, idx) => (
                  <Reveal key={treatment.id} delay={idx * 0.08}>
                    <Card className="bg-white border-[#c9847a]/20 hover:shadow-2xl hover:scale-105 cursor-pointer transition-all duration-300 group"
                      onClick={() => { setSelectedTreatment(treatment); setDialogOpen(true); }}>
                      <CardContent className="p-6">
                        <h3 className="font-light text-[#3d2014] mb-2 text-lg">{treatment.name}</h3>
                        <p className="text-sm text-[#999] mb-4 font-light">{treatment.duration}</p>
                        <div className="space-y-1 mb-4">
                          {treatment.benefits.map((b, i) => (
                            <p key={i} className="text-xs text-[#c9847a] flex items-center gap-2">
                              <Sun className="w-3 h-3" /> {b}
                            </p>
                          ))}
                        </div>
                        <p className="text-2xl font-light text-[#d4a017]">{treatment.price}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Experience Selector */}
      <section id="experience" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light text-[#3d2014] mb-12">Experience Packages</h2>
        </Reveal>

        <Tabs defaultValue="halfDay" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-[#c9847a]/20 rounded-full p-1">
            <TabsTrigger value="halfDay" className="cursor-pointer">Half Day</TabsTrigger>
            <TabsTrigger value="fullDay" className="cursor-pointer">Full Day</TabsTrigger>
            <TabsTrigger value="weekend" className="cursor-pointer">Weekend</TabsTrigger>
          </TabsList>

          {["halfDay", "fullDay", "weekend"].map((key) => (
            <TabsContent key={key} value={key} className="mt-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {experiences[key as keyof typeof experiences].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <Card className="bg-white border-[#c9847a]/20 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <Droplets className="w-8 h-8 text-[#c9847a] mb-4" />
                        <p className="text-[#3d2014] font-light">{item}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Therapist Team */}
      <section id="therapists" className="py-20 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl">
        <Reveal>
          <h2 className="text-5xl font-light text-[#3d2014] mb-12">Our Therapists</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {therapists.map((therapist, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#c9847a]/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-[#c9847a]">
                    <AvatarFallback className="bg-[#c9847a] text-white text-lg font-light">{therapist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-light text-[#3d2014] mb-1">{therapist.name}</h3>
                  <Badge variant="outline" className="border-[#c9847a] text-[#c9847a] text-xs font-light mb-3">{therapist.specialty}</Badge>
                  <p className="text-xs text-[#999] font-light">{therapist.years} years</p>
                  <p className="text-xs text-[#666] font-light mt-2">{therapist.bio}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 10000, label: "Treatments Delivered" },
            { num: 12, label: "Expert Therapists" },
            { num: 4.9, suffix: "★", label: "Customer Rating" },
            { num: 15, label: "Years in Wellness" },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div>
                <p className="text-5xl font-light text-[#d4a017] mb-2"><Counter target={stat.num} suffix={stat.suffix || ""} /></p>
                <p className="text-[#999] font-light">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gift Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light text-[#3d2014] mb-12">Gift Cards</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {giftTiers.map((tier, idx) => (
            <Reveal key={idx} delay={idx * 0.15}>
              <Card className="bg-gradient-to-br from-white to-[#fdf8f2] border-[#c9847a]/20 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8">
                  <p className="text-4xl font-light text-[#d4a017] mb-6">{tier.amount}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#3d2014] font-light text-sm">
                        <Gift className="w-4 h-4 text-[#c9847a]" /> {perk}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 border-2 border-[#c9847a] text-[#c9847a] rounded-full hover:bg-[#c9847a] hover:text-white transition-all duration-200 font-light cursor-pointer">
                    Purchase
                  </button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl">
        <Reveal>
          <h2 className="text-5xl font-light text-[#3d2014] mb-12">Skincare Line</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {products.map((product, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <Card className="bg-white border-[#c9847a]/20 hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c9847a] to-[#d4a017] rounded-full mx-auto mb-4" />
                  <h3 className="text-sm font-light text-[#3d2014] mb-2">{product.name}</h3>
                  <p className="text-xs text-[#999] font-light mb-3">{product.benefit}</p>
                  <p className="text-lg font-light text-[#d4a017]">{product.price}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light text-[#3d2014] mb-12">Guest Stories</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {[
              { text: "Oasis transformed my entire wellness routine. Pure bliss.", name: "Charlotte M.", treatment: "Full Day Package" },
              { text: "Best spa experience of my life. Therapists truly understand healing.", name: "Michael R.", treatment: "Deep Tissue" },
              { text: "A sanctuary in the heart of the city. I return every month.", name: "Sophie L.", treatment: "Facial Package" },
            ].map((test, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Reveal>
                  <Card className="bg-white border-[#c9847a]/20">
                    <CardContent className="p-8">
                      <p className="text-[#3d2014] mb-6 italic font-light">"{test.text}"</p>
                      <div className="border-t border-[#c9847a]/20 pt-4">
                        <p className="font-light text-[#3d2014]">{test.name}</p>
                        <Badge variant="outline" className="border-[#c9847a] text-[#c9847a] text-xs mt-2 font-light">{test.treatment}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer border-[#c9847a] text-[#c9847a] hover:bg-[#c9847a] hover:text-white" />
          <CarouselNext className="cursor-pointer border-[#c9847a] text-[#c9847a] hover:bg-[#c9847a] hover:text-white" />
        </Carousel>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light text-[#3d2014] mb-12">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "How do I book a treatment?", a: "Call, email, or use our online booking system. We reserve time 48 hours in advance. Walk-ins welcome when available." },
            { q: "What's your cancellation policy?", a: "Free cancellation up to 24 hours before appointment. Late cancellations incur 50% charge. No-shows charged in full." },
            { q: "Do you accommodate medical conditions?", a: "Yes. Inform us of any conditions during booking. Our therapists modify treatments for pregnancy, injuries, and health concerns." },
            { q: "What should I bring?", a: "Bring comfortable clothing and arrive 15 minutes early. We provide robes, towels, and all spa amenities." },
            { q: "Is parking available?", a: "Yes. Free parking in our dedicated lot. Valet service available for weekend appointments." },
            { q: "Do you offer corporate packages?", a: "Absolutely. Team wellness programs, bulk gift cards, and on-site chair massage available for corporate clients." },
          ].map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border border-[#c9847a]/20 rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-[#3d2014] font-light cursor-pointer hover:text-[#c9847a] transition-colors">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-[#999] font-light">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Booking CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#c9847a] to-[#d4a017] rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-light mb-4">Find Your Oasis</h2>
            <p className="text-lg mb-8 font-light opacity-90">Book your transformation today</p>
            <MagneticBtn className="px-8 py-3 bg-white text-[#c9847a] rounded-full font-light hover:bg-[#f5f5f5]">Book Now</MagneticBtn>
          </div>
        </Reveal>
      </section>

      {/* Treatment Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-[#c9847a]/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#3d2014] font-light text-2xl">{selectedTreatment?.name}</DialogTitle>
          </DialogHeader>
          {selectedTreatment && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-light text-[#999] uppercase mb-2">Duration</p>
                  <p className="text-[#3d2014] font-light">{selectedTreatment.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-light text-[#999] uppercase mb-2">Price</p>
                  <p className="text-2xl font-light text-[#d4a017]">{selectedTreatment.price}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-light text-[#999] uppercase mb-3">Benefits</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTreatment.benefits?.map((b, i) => (
                    <Badge key={i} variant="outline" className="border-[#c9847a] text-[#c9847a] font-light">{b}</Badge>
                  ))}
                </div>
              </div>
              <button onClick={() => { setDialogOpen(false); setBookingOpen(true); }} className="w-full py-3 bg-[#c9847a] text-white rounded-full hover:bg-[#a86d64] transition-all duration-200 font-light cursor-pointer">
                Book Appointment
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="bg-white border-[#c9847a]/20">
          <DialogHeader>
            <DialogTitle className="text-[#3d2014] font-light">Book Your Treatment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-[#c9847a]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9847a] font-light" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-[#c9847a]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9847a] font-light" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-2 border border-[#c9847a]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9847a] font-light" />
            <input type="date" className="w-full px-4 py-2 border border-[#c9847a]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9847a] font-light" />
            <button className="w-full py-3 bg-[#c9847a] text-white rounded-full hover:bg-[#a86d64] transition-all duration-200 font-light cursor-pointer">Confirm Booking</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#3d2014] text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4 font-light text-xl">Oasis Spa</p>
          <p className="text-sm text-white/60 font-light">Urban sanctuary for wellness & renewal © 2024</p>
        </div>
      </footer>
    </div>
  )
}
