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
import { Coffee, Droplets, Flame, Award, Menu, X, ChevronRight, Star, TrendingUp } from "lucide-react"

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

const origins = [
  { region: "Ethiopia", altitude: "1800-2200m", flavor: "Floral, Blueberry", desc: "Yirgacheffe highlands, ancient arabica genetics" },
  { region: "Colombia", altitude: "1400-1800m", flavor: "Chocolate, Caramel", desc: "Juan Valdez microlots, single-origin lots" },
  { region: "Guatemala", altitude: "1500-2000m", flavor: "Spice, Cocoa", desc: "Huehuetenango volcanic soils" },
  { region: "Kenya", altitude: "1600-2100m", flavor: "Citrus, Jasmine", desc: "AA graded, high acidity complexity" },
  { region: "Sumatra", altitude: "1000-1500m", flavor: "Earth, Herbal", desc: "Wet-hulled, full-bodied profile" },
]

const products = [
  { name: "Yirgacheffe Single-Origin", roast: "Light", price: "16€", rating: 4.8 },
  { name: "Colombian Reserve", roast: "Medium", price: "18€", rating: 4.9 },
  { name: "Espresso Blend", roast: "Dark", price: "14€", rating: 4.7 },
  { name: "Filter Profile", roast: "Light-Medium", price: "15€", rating: 4.8 },
  { name: "French Press", roast: "Full Body", price: "13€", rating: 4.6 },
  { name: "Seasonal Release", roast: "Varies", price: "19€", rating: 4.9 },
]

const grinds = ["Whole Bean", "Espresso", "Filter", "French Press", "Turkish"]

const team = [
  { initials: "M.B.", role: "Head Roaster", cred: "Q-Grader", bio: "20 years roasting heritage" },
  { initials: "S.L.", role: "Origins Manager", cred: "Q-Grader", bio: "Direct trade relationships" },
  { initials: "J.R.", role: "Café Operations", cred: "SCA Certified", bio: "4 locations managed" }
]

export default function VerveCoffee() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-[#1a0a00] text-[#fdf6ec] min-h-screen font-sans">
      {/* NAV */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[#b87333]/20 bg-[#1a0a00]/80 px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#b87333] to-[#6b8f71] rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#fdf6ec]" />
            </div>
            <span className="font-black text-lg tracking-tight">VERVE</span>
          </div>

          <div className="hidden lg:flex gap-12 text-sm font-medium text-[#fdf6ec]/60">
            <button className="hover:text-[#fdf6ec] transition-colors cursor-pointer duration-200">Origins</button>
            <button className="hover:text-[#fdf6ec] transition-colors cursor-pointer duration-200">Shop</button>
            <button className="hover:text-[#fdf6ec] transition-colors cursor-pointer duration-200">About</button>
            <button className="hover:text-[#fdf6ec] transition-colors cursor-pointer duration-200">Café</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer hidden md:inline-flex bg-[#b87333] text-[#fdf6ec] px-6 py-2 rounded-lg font-semibold hover:bg-[#a0632a] transition-all duration-200 text-sm">
              First Bag Deal
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden cursor-pointer">
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1a0a00] border-[#b87333]/20">
                <div className="flex flex-col gap-6 mt-8">
                  <button className="hover:text-[#b87333] transition-colors cursor-pointer">Origins</button>
                  <button className="hover:text-[#b87333] transition-colors cursor-pointer">Shop</button>
                  <button className="hover:text-[#b87333] transition-colors cursor-pointer">About</button>
                  <button className="hover:text-[#b87333] transition-colors cursor-pointer">Café</button>
                  <Separator className="bg-[#b87333]/20" />
                  <button onClick={() => { setDialogOpen(true); setMobileOpen(false); }} className="cursor-pointer bg-[#b87333] text-[#fdf6ec] px-6 py-2 rounded-lg font-semibold w-full">
                    First Bag Deal
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
          <Image src="https://images.unsplash.com/photo-209977?w=800&q=80" alt="Coffee" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#1a0a00]/80 to-[#1a0a00]" />
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <Badge className="bg-[#b87333]/20 text-[#b87333] border-[#b87333]/40 text-xs font-semibold px-4 py-1.5">
              Specialty Coffee Roasters
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black leading-tight tracking-tight"
          >
            Roasted with <br /> <span className="bg-gradient-to-r from-[#b87333] to-[#6b8f71] bg-clip-text text-transparent">Intention</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-[#fdf6ec]/60 max-w-2xl mx-auto"
          >
            Direct trade, single-origin beans from 15 origins. Roasted to order for peak freshness. Available in your preferred grind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 justify-center"
          >
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer bg-gradient-to-r from-[#b87333] to-[#a0632a] text-[#fdf6ec] px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#b87333]/50 transition-all duration-200 flex items-center gap-2">
              Start Subscription <ChevronRight className="w-4 h-4" />
            </button>
            <button className="cursor-pointer border border-[#b87333]/40 text-[#fdf6ec] px-8 py-3 rounded-lg font-semibold hover:border-[#b87333] hover:bg-[#b87333]/5 transition-all duration-200">
              Shop Now
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ORIGINS TABS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a0a00] to-[#220f04]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Single Origins</h2>
              <p className="text-[#fdf6ec]/60 text-lg">15 regions, hand-selected lots</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {origins.map((origin, i) => (
                <div key={origin.region} className="bg-[#220f04] border border-[#b87333]/20 rounded-xl p-6 hover:border-[#b87333]/40 transition-all duration-200 cursor-pointer group">
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg">{origin.region}</h3>
                    <Badge className="bg-[#b87333]/20 text-[#b87333] border-[#b87333]/40 w-fit text-xs">
                      {origin.altitude}
                    </Badge>
                    <div>
                      <p className="text-[#fdf6ec]/60 text-sm mb-2">Tasting Notes</p>
                      <p className="font-semibold text-sm">{origin.flavor}</p>
                    </div>
                    <p className="text-[#fdf6ec]/50 text-xs">{origin.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-24 px-6 md:px-12 bg-[#1a0a00]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Our Coffees</h2>
              <p className="text-[#fdf6ec]/60 text-lg">Select your grind profile</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3 justify-center mb-16">
              {grinds.map(grind => (
                <Badge key={grind} className="bg-[#b87333]/20 text-[#b87333] border-[#b87333]/40 px-4 py-2 cursor-pointer hover:bg-[#b87333]/30 transition-all duration-200">
                  {grind}
                </Badge>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod, i) => (
              <Reveal key={prod.name} delay={i * 0.05}>
                <Card className="bg-gradient-to-br from-[#b87333]/10 to-[#6b8f71]/10 border border-[#b87333]/20 hover:border-[#b87333]/40 transition-all duration-200 cursor-pointer group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{prod.name}</h3>
                          <p className="text-[#fdf6ec]/60 text-sm">{prod.roast}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-[#b87333]">{prod.price}</div>
                          <div className="flex items-center gap-1 text-xs text-[#fdf6ec]/60 mt-1">
                            <Star className="w-3 h-3 fill-current" /> {prod.rating}
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-[#b87333]/20 text-[#b87333] hover:bg-[#b87333]/30 py-2 rounded-lg font-semibold text-sm transition-all duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROASTING PROCESS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a0a00] to-[#220f04]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Roasting Process</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { stage: "1. Green Bean Selection", temp: "18-20°C", desc: "Carefully curated lots hand-sorted for defects" },
                { stage: "2. Preheating", temp: "200-220°C", desc: "Chamber brought to optimal roasting temperature" },
                { stage: "3. Drying Phase", temp: "150-160°C", desc: "6-7 minutes, moisture removal, development of precursor aromas" },
                { stage: "4. Maillard Reaction", temp: "160-190°C", desc: "5-6 minutes, complex flavor compounds form" },
                { stage: "5. Final Development", temp: "190-210°C", desc: "2-3 minutes, temperature & time adjusted per origin" }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-[#b87333]/20 rounded-lg px-4 data-[state=open]:border-[#b87333]/40 transition-all">
                  <AccordionTrigger className="cursor-pointer hover:text-[#b87333] transition-colors py-4">
                    <div className="flex items-center gap-4 text-left flex-1">
                      <Flame className="w-5 h-5 text-[#b87333] flex-shrink-0" />
                      <span className="font-semibold">{item.stage}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#fdf6ec]/60 pb-4">
                    <div className="pl-9">
                      <p className="font-semibold text-[#fdf6ec] mb-2">{item.temp}</p>
                      <p>{item.desc}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section className="py-24 px-6 md:px-12 bg-[#1a0a00]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Subscription Builder</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { freq: "Weekly", bags: 1, savings: "5%" },
              { freq: "Biweekly", bags: 2, savings: "10%" },
              { freq: "Monthly", bags: 4, savings: "15%" }
            ].map((sub, i) => (
              <Reveal key={sub.freq} delay={i * 0.1}>
                <Card className="bg-gradient-to-br from-[#b87333]/10 to-[#6b8f71]/10 border border-[#b87333]/20 hover:border-[#b87333]/40 transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-8 text-center space-y-6">
                    <h3 className="text-2xl font-black">{sub.freq}</h3>
                    <div>
                      <p className="text-[#fdf6ec]/60 text-sm mb-2">{sub.bags} bag{sub.bags > 1 ? 's' : ''}</p>
                      <Badge className="bg-[#6b8f71]/20 text-[#6b8f71] border-[#6b8f71]/40">
                        Save {sub.savings}
                      </Badge>
                    </div>
                    <button className="w-full bg-[#b87333] text-[#fdf6ec] py-3 rounded-lg font-semibold hover:bg-[#a0632a] transition-all duration-200">
                      Select Plan
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a0a00] via-[#220f04] to-[#1a0a00]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Origins", value: 15, suffix: "" },
              { label: "Bags Roasted", value: 1000000, suffix: "" },
              { label: "Years Roasting", value: 12, suffix: "" },
              { label: "Avg Rating", value: 4.9, suffix: "★" }
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#b87333] mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[#fdf6ec]/60">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-6 md:px-12 bg-[#1a0a00]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Our Roasters</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.role} delay={i * 0.1}>
                <Card className="bg-[#220f04] border border-[#b87333]/20 hover:border-[#b87333]/40 transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="w-16 h-16 mb-4 border-2 border-[#b87333]/30 group-hover:border-[#b87333] transition-colors">
                        <AvatarFallback className="bg-gradient-to-br from-[#b87333] to-[#6b8f71] text-[#fdf6ec] font-black">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="bg-[#6b8f71]/20 text-[#6b8f71] text-xs mb-3">{member.cred}</Badge>
                    </div>
                    <h3 className="font-bold mb-2">{member.role}</h3>
                    <p className="text-[#fdf6ec]/60 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a0a00] to-[#220f04]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Customer Stories</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { name: "Sarah", quote: "Freshest coffee I've ever tasted. Subscription is a game-changer.", rating: 5 },
                  { name: "Marco", quote: "Direct trade ethics + incredible flavor profile. Worth every euro.", rating: 5 },
                  { name: "Emma", quote: "Roasted to order makes all the difference. Highly recommend.", rating: 5 }
                ].map((review, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <Card className="bg-[#220f04] border border-[#b87333]/20">
                      <CardContent className="p-8">
                        <div className="flex gap-1 mb-4">
                          {[...Array(review.rating)].map((_, j) => (
                            <Star key={j} className="w-5 h-5 fill-[#b87333] text-[#b87333]" />
                          ))}
                        </div>
                        <p className="text-[#fdf6ec] mb-4 italic">"{review.quote}"</p>
                        <p className="font-semibold">{review.name}</p>
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
      <section className="py-24 px-6 md:px-12 bg-[#1a0a00]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">FAQ</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "How long does freshness last?", a: "Peak flavor window is 3-4 weeks from roast date. Vacuum-sealed bags extend this significantly." },
                { q: "Can I skip or pause my subscription?", a: "Yes, easily manage your subscription anytime. Skip months or pause without penalties." },
                { q: "Do you ship internationally?", a: "We ship to all EU countries. International rates apply for orders outside Europe." },
                { q: "What's your return policy?", a: "If you're not satisfied, we offer full refunds on unopened bags within 30 days." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-[#b87333]/20 rounded-lg px-4 data-[state=open]:border-[#b87333]/40 transition-all">
                  <AccordionTrigger className="cursor-pointer hover:text-[#b87333] transition-colors py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#fdf6ec]/60 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* INQUIRY DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#220f04] border-[#b87333]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl">Start Your Coffee Journey</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="email" placeholder="Your email" className="w-full bg-[#1a0a00] border border-[#b87333]/20 rounded-lg px-4 py-2 text-[#fdf6ec] placeholder-[#fdf6ec]/40 focus:border-[#b87333] outline-none cursor-text" />
            <select className="w-full bg-[#1a0a00] border border-[#b87333]/20 rounded-lg px-4 py-2 text-[#fdf6ec] cursor-pointer focus:border-[#b87333] outline-none">
              <option>Select your preferred grind</option>
              {grinds.map(g => <option key={g}>{g}</option>)}
            </select>
            <select className="w-full bg-[#1a0a00] border border-[#b87333]/20 rounded-lg px-4 py-2 text-[#fdf6ec] cursor-pointer focus:border-[#b87333] outline-none">
              <option>Choose subscription frequency</option>
              <option>Weekly</option>
              <option>Biweekly</option>
              <option>Monthly</option>
            </select>
            <MagneticBtn className="w-full bg-gradient-to-r from-[#b87333] to-[#a0632a] text-[#fdf6ec] py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#b87333]/50 transition-all duration-200">
              Subscribe Now
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
