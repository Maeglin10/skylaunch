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
import { Wifi, Users, Zap, Lightbulb, Coffee, Menu, X, ChevronRight, MapPin, Clock, Laptop, Briefcase, Palette, Headphones, Shield, Leaf } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>{children}</motion.div>
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
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
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

const spaces = [
  { type: "Hot Desk", price: "€199/mo", amenities: ["WiFi", "Coffee", "Printing"], available: true },
  { type: "Dedicated", price: "€399/mo", amenities: ["24/7 Access", "Storage", "WiFi"], available: true },
  { type: "Private Studio", price: "€899/mo", amenities: ["Isolated", "Branded Door", "Window"], available: false },
  { type: "Event Space", price: "€150/hr", amenities: ["Presentation", "WiFi", "Catering"], available: true },
  { type: "Virtual Office", price: "€79/mo", amenities: ["Address", "Mail", "Phone"], available: true }
]

const amenities = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Coffee, label: "Premium Coffee" },
  { icon: Users, label: "Meeting Rooms" },
  { icon: Laptop, label: "IT Support" },
  { icon: Zap, label: "Fast Chargers" },
  { icon: Shield, label: "Security Access" },
  { icon: Palette, label: "Creative Hub" },
  { icon: Headphones, label: "Phone Booths" },
  { icon: Leaf, label: "Plants & Light" },
  { icon: Briefcase, label: "Lounge Space" },
  { icon: Lightbulb, label: "LED Desk Lights" },
  { icon: MapPin, label: "Central Location" }
]

const events = [
  { type: "Workshop", count: 4, examples: ["React Advanced", "UI/UX Design", "Startup Pitch", "Growth Hacking"] },
  { type: "Meetup", count: 8, examples: ["Dev Meetups", "Designer Drinks", "Tech Talks"] },
  { type: "Demo Day", count: 2, examples: ["Q1 Startup Demo"] },
  { type: "Social", count: 12, examples: ["Quarterly Parties"] }
]

const locations = [
  { city: "Berlin", hours: "24/7 Access", members: 180 },
  { city: "Amsterdam", hours: "6am-10pm", members: 120 },
  { city: "Stockholm", hours: "8am-8pm", members: 85 }
]

const team = [
  { initials: "A.H.", company: "TechStart Co", joined: "2022" },
  { initials: "M.K.", company: "Design Studio", joined: "2023" },
  { initials: "J.P.", company: "Startup Fund", joined: "2023" }
]

export default function CanvasCollective() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-[#fafaf8] text-[#1a1a1a] min-h-screen font-sans">
      {/* NAV */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[#c2714f]/20 bg-[#fafaf8]/80 px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#c2714f] to-[#7c9e6e] rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">CANVAS</span>
          </div>

          <div className="hidden lg:flex gap-12 text-sm font-medium text-[#1a1a1a]/60">
            <button className="hover:text-[#c2714f] transition-colors cursor-pointer duration-200">Spaces</button>
            <button className="hover:text-[#c2714f] transition-colors cursor-pointer duration-200">Events</button>
            <button className="hover:text-[#c2714f] transition-colors cursor-pointer duration-200">Community</button>
            <button className="hover:text-[#c2714f] transition-colors cursor-pointer duration-200">Locations</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer hidden md:inline-flex bg-[#c2714f] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a85a3f] transition-all duration-200 text-sm">
              Book Tour
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden cursor-pointer">
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#fafaf8] border-[#c2714f]/20">
                <div className="flex flex-col gap-6 mt-8">
                  <button className="hover:text-[#c2714f] transition-colors cursor-pointer">Spaces</button>
                  <button className="hover:text-[#c2714f] transition-colors cursor-pointer">Events</button>
                  <button className="hover:text-[#c2714f] transition-colors cursor-pointer">Community</button>
                  <button className="hover:text-[#c2714f] transition-colors cursor-pointer">Locations</button>
                  <Separator className="bg-[#c2714f]/20" />
                  <button onClick={() => { setDialogOpen(true); setMobileOpen(false); }} className="cursor-pointer bg-[#c2714f] text-white px-6 py-2 rounded-lg font-semibold w-full">
                    Book Tour
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section style={{ opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-209977?w=800&q=80" alt="Workspace" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#fafaf8] via-[#fafaf8]/80 to-[#fafaf8]" />
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <Badge className="bg-[#c2714f]/20 text-[#c2714f] border-[#c2714f]/40 text-xs font-semibold px-4 py-1.5">
              Creative Spaces for Makers
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black leading-tight tracking-tight"
          >
            Work Where <br /> <span className="bg-gradient-to-r from-[#c2714f] to-[#7c9e6e] bg-clip-text text-transparent">Inspiration</span> Lives
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto"
          >
            Flexible coworking spaces designed for creators, founders, and teams. 500 members across 3 premium locations with curated community events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 justify-center"
          >
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer bg-gradient-to-r from-[#c2714f] to-[#a85a3f] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c2714f]/50 transition-all duration-200 flex items-center gap-2">
              Schedule Tour <ChevronRight className="w-4 h-4" />
            </button>
            <button className="cursor-pointer border border-[#c2714f]/40 text-[#1a1a1a] px-8 py-3 rounded-lg font-semibold hover:border-[#c2714f] hover:bg-[#c2714f]/5 transition-all duration-200">
              View Plans
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* SPACES TABS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#fafaf8] to-[#f0ebe3]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Workspace Options</h2>
              <p className="text-[#1a1a1a]/60 text-lg">From hot desks to private studios, flexibility you need</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {spaces.map((space, i) => (
              <Reveal key={space.type} delay={i * 0.05}>
                <div className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer group hover:border-[#c2714f] ${space.available ? "border-[#c2714f]/20 bg-white" : "border-[#1a1a1a]/10 bg-[#1a1a1a]/5"}`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{space.type}</h3>
                      {!space.available && <Badge className="bg-[#1a1a1a]/10 text-[#1a1a1a]/60 text-xs">Waitlist</Badge>}
                    </div>
                    <div className="text-2xl font-black text-[#c2714f]">{space.price}</div>
                    <div className="space-y-2">
                      {space.amenities.map(amenity => (
                        <p key={amenity} className="text-sm text-[#1a1a1a]/60">✓ {amenity}</p>
                      ))}
                    </div>
                    <button className="w-full bg-[#c2714f]/10 text-[#c2714f] hover:bg-[#c2714f]/20 py-2 rounded-lg font-semibold text-sm transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES GRID */}
      <section className="py-24 px-6 md:px-12 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Premium Amenities</h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, i) => {
              const Icon = amenity.icon
              return (
                <Reveal key={amenity.label} delay={i * 0.03}>
                  <Card className="bg-gradient-to-br from-[#c2714f]/10 to-[#7c9e6e]/10 border border-[#c2714f]/20 hover:border-[#c2714f]/40 transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Icon className="w-8 h-8 text-[#c2714f] group-hover:text-[#7c9e6e] transition-colors mb-3" />
                      <p className="font-semibold text-sm">{amenity.label}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* EVENTS ACCORDION */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#fafaf8] to-[#f0ebe3]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Community Events</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {events.map((event, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-2 border-[#c2714f]/20 rounded-lg px-4 data-[state=open]:border-[#c2714f]/40 transition-all">
                  <AccordionTrigger className="cursor-pointer hover:text-[#c2714f] transition-colors py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{event.type}</span>
                      <Badge className="bg-[#7c9e6e]/20 text-[#7c9e6e] text-xs">{event.count}/month</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#1a1a1a]/60 pb-4 space-y-2">
                    {event.examples.map(ex => (
                      <p key={ex} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#c2714f] rounded-full" />
                        {ex}
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* COMMUNITY CAROUSEL */}
      <section className="py-24 px-6 md:px-12 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Member Spotlight</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { name: "TechStart GmbH", founder: "Alex H.", joined: "2022" },
                  { name: "Design Collective", founder: "Maria K.", joined: "2023" },
                  { name: "Venture Partners", founder: "Jonas P.", joined: "2023" },
                  { name: "Creators Lab", founder: "Sophie L.", joined: "2024" }
                ].map((member, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <Card className="bg-gradient-to-br from-[#c2714f]/10 to-[#7c9e6e]/10 border border-[#c2714f]/20">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <Avatar className="w-12 h-12 border-2 border-[#c2714f]/30">
                            <AvatarFallback className="bg-gradient-to-br from-[#c2714f] to-[#7c9e6e] text-white font-bold">
                              {member.founder.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p className="text-sm text-[#1a1a1a]/60">{member.founder}</p>
                          </div>
                        </div>
                        <Badge className="bg-[#7c9e6e]/20 text-[#7c9e6e]">Member since {member.joined}</Badge>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer" />
              <CarouselNext className="cursor-pointer" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#fafaf8] via-[#f0ebe3] to-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Members", value: 500, suffix: "" },
              { label: "Locations", value: 3, suffix: "" },
              { label: "Events/Month", value: 50, suffix: "" },
              { label: "Avg Rating", value: 4.9, suffix: "★" }
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#c2714f] mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[#1a1a1a]/60">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-24 px-6 md:px-12 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Our Locations</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc, i) => (
              <Reveal key={loc.city} delay={i * 0.1}>
                <Card className="bg-gradient-to-br from-[#c2714f]/10 to-[#7c9e6e]/10 border border-[#c2714f]/20 hover:border-[#c2714f]/40 transition-all duration-200 cursor-pointer">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-3 mb-6">
                      <MapPin className="w-6 h-6 text-[#c2714f] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-xl mb-2">{loc.city}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#1a1a1a]/60 mb-4">
                          <Clock className="w-4 h-4" />
                          {loc.hours}
                        </div>
                        <Badge className="bg-[#7c9e6e]/20 text-[#7c9e6e]">{loc.members} members</Badge>
                      </div>
                    </div>
                    <button className="w-full border border-[#c2714f]/40 text-[#c2714f] py-2 rounded-lg font-semibold hover:bg-[#c2714f]/10 transition-all duration-200 text-sm cursor-pointer">
                      Visit →
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#fafaf8] to-[#f0ebe3]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Member Reviews</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { name: "Emma", quote: "The community here is incredible. Found amazing collaborators." },
                  { name: "Michael", quote: "Best coworking space I've tried. Facilities are top-notch." },
                  { name: "Lisa", quote: "Great network. Events are well-organized and valuable." }
                ].map((review, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <Card className="bg-gradient-to-br from-[#c2714f]/10 to-[#7c9e6e]/10 border border-[#c2714f]/20">
                      <CardContent className="p-8">
                        <p className="text-[#1a1a1a] font-semibold mb-4">"{review.quote}"</p>
                        <p className="text-[#1a1a1a]/60">— {review.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer" />
              <CarouselNext className="cursor-pointer" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 bg-[#fafaf8]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">FAQ</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "What's included in membership?", a: "All memberships include 24/7 access (hot desk), WiFi, meeting room credits, and event access. Premium tiers add more amenities." },
                { q: "Can I change my membership?", a: "Yes, easily upgrade or downgrade anytime. Changes take effect the next billing cycle." },
                { q: "Is parking available?", a: "Yes, all locations offer discounted parking rates. Berlin has 50 spots, Amsterdam 30, Stockholm 20." },
                { q: "How do you handle mail?", a: "We provide mail forwarding service for all members. Physical mail is kept in your member mailbox." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-2 border-[#c2714f]/20 rounded-lg px-4 data-[state=open]:border-[#c2714f]/40 transition-all">
                  <AccordionTrigger className="cursor-pointer hover:text-[#c2714f] transition-colors py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#1a1a1a]/60 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* TOUR DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-[#c2714f]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule Your Tour</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Your name" className="w-full bg-[#fafaf8] border border-[#c2714f]/20 rounded-lg px-4 py-2 text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:border-[#c2714f] outline-none cursor-text" />
            <input type="email" placeholder="Your email" className="w-full bg-[#fafaf8] border border-[#c2714f]/20 rounded-lg px-4 py-2 text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:border-[#c2714f] outline-none cursor-text" />
            <select className="w-full bg-[#fafaf8] border border-[#c2714f]/20 rounded-lg px-4 py-2 text-[#1a1a1a] cursor-pointer focus:border-[#c2714f] outline-none">
              <option>Select location</option>
              <option>Berlin</option>
              <option>Amsterdam</option>
              <option>Stockholm</option>
            </select>
            <MagneticBtn className="w-full bg-gradient-to-r from-[#c2714f] to-[#a85a3f] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c2714f]/50 transition-all duration-200">
              Request Tour
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
