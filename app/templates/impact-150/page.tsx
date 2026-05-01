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
import { Hammer, Square3Stack3D, Sparkles, Menu, X, ChevronRight, Heart, Zap, MapPin, Truck } from "lucide-react"

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

const products = [
  { name: "Industrial Dining", material: "Steel/Oak", dims: "200×100cm", finishes: 4, price: "€4,200" },
  { name: "Canvas Sofa", material: "Glass/Concrete", dims: "180cm", finishes: 3, price: "€3,800" },
  { name: "Studio Shelving", material: "Steel", dims: "Custom", finishes: 5, price: "€2,400" },
  { name: "Workshop Table", material: "Reclaimed Oak", dims: "220cm", finishes: 2, price: "€3,100" },
  { name: "Cantilever Chair", material: "Steel/Leather", dims: "Std", finishes: 6, price: "€890" },
  { name: "Pendant Lighting", material: "Brass/Glass", dims: "Variable", finishes: 4, price: "€1,200" },
  { name: "Side Cabinet", material: "Oak/Steel", dims: "90×50cm", finishes: 3, price: "€1,600" },
  { name: "Floor Lamp", material: "Raw Steel", dims: "190cm", finishes: 2, price: "€680" }
]

const collections = [
  { name: "Dining", pieces: 8, lead: "12 weeks" },
  { name: "Living", pieces: 12, lead: "14 weeks" },
  { name: "Office", pieces: 6, lead: "10 weeks" },
  { name: "Outdoor", pieces: 5, lead: "16 weeks" },
  { name: "Lighting", pieces: 9, lead: "8 weeks" }
]

const workshops = [
  { title: "Forge Process", desc: "See steel shaping and heat treatment" },
  { title: "Finishing", desc: "Patina development and surface prep" },
  { title: "Assembly", desc: "Joinery and final fitting" },
  { title: "Quality", desc: "Inspection and testing protocols" }
]

export default function IronAndGlass() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-[#1a1a1a] text-[#f5f0e6] min-h-screen font-sans">
      {/* NAV */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[#8b4513]/20 bg-[#1a1a1a]/80 px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#8b4513] to-[#708090] rounded-lg flex items-center justify-center">
              <Hammer className="w-5 h-5 text-[#f5f0e6]" />
            </div>
            <span className="font-black text-lg tracking-tight">IRON & GLASS</span>
          </div>

          <div className="hidden lg:flex gap-12 text-sm font-medium text-[#f5f0e6]/60">
            <button className="hover:text-[#f5f0e6] transition-colors cursor-pointer duration-200">Collections</button>
            <button className="hover:text-[#f5f0e6] transition-colors cursor-pointer duration-200">Workshop</button>
            <button className="hover:text-[#f5f0e6] transition-colors cursor-pointer duration-200">Trade</button>
            <button className="hover:text-[#f5f0e6] transition-colors cursor-pointer duration-200">Custom</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer hidden md:inline-flex bg-[#8b4513] text-[#f5f0e6] px-6 py-2 rounded-lg font-semibold hover:bg-[#6d3810] transition-all duration-200 text-sm">
              Showroom Booking
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden cursor-pointer">
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1a1a1a] border-[#8b4513]/20">
                <div className="flex flex-col gap-6 mt-8">
                  <button className="hover:text-[#8b4513] transition-colors cursor-pointer">Collections</button>
                  <button className="hover:text-[#8b4513] transition-colors cursor-pointer">Workshop</button>
                  <button className="hover:text-[#8b4513] transition-colors cursor-pointer">Trade</button>
                  <button className="hover:text-[#8b4513] transition-colors cursor-pointer">Custom</button>
                  <Separator className="bg-[#8b4513]/20" />
                  <button onClick={() => { setDialogOpen(true); setMobileOpen(false); }} className="cursor-pointer bg-[#8b4513] text-[#f5f0e6] px-6 py-2 rounded-lg font-semibold w-full">
                    Book Showroom
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
          <Image src="https://images.unsplash.com/photo-1629236?w=800&q=80" alt="Industrial Design" fill className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a]/80 to-[#1a1a1a]" />
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <Badge className="bg-[#8b4513]/20 text-[#8b4513] border-[#8b4513]/40 text-xs font-semibold px-4 py-1.5">
              Handcrafted Industrial Furniture
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black leading-tight tracking-tight"
          >
            Forged with <br /> <span className="bg-gradient-to-r from-[#8b4513] to-[#708090] bg-clip-text text-transparent">Precision</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-[#f5f0e6]/60 max-w-2xl mx-auto"
          >
            Custom industrial furniture for residential and commercial spaces. Handcrafted in our Berlin workshop since 2008. 2,000+ pieces in 80 countries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 justify-center"
          >
            <button onClick={() => setDialogOpen(true)} className="cursor-pointer bg-gradient-to-r from-[#8b4513] to-[#6d3810] text-[#f5f0e6] px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#8b4513]/50 transition-all duration-200 flex items-center gap-2">
              Schedule Showroom Visit <ChevronRight className="w-4 h-4" />
            </button>
            <button className="cursor-pointer border border-[#8b4513]/40 text-[#f5f0e6] px-8 py-3 rounded-lg font-semibold hover:border-[#8b4513] hover:bg-[#8b4513]/5 transition-all duration-200">
              Browse Collections
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* COLLECTIONS TABS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a1a1a] to-[#242424]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Collections</h2>
              <p className="text-[#f5f0e6]/60 text-lg">Curated designs for every space</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-[#8b4513]/10 p-1 mb-8">
                {["all", "dining", "living", "office", "outdoor", "lighting"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="text-xs md:text-sm cursor-pointer data-[state=active]:bg-[#8b4513] data-[state=active]:text-white">
                    {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((prod, i) => (
                  <Reveal key={prod.name} delay={i * 0.05}>
                    <Card className="bg-[#242424] border border-[#8b4513]/20 hover:border-[#8b4513]/40 transition-all duration-200 cursor-pointer group overflow-hidden">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{prod.name}</h3>
                            <p className="text-[#f5f0e6]/60 text-sm">{prod.material}</p>
                          </div>
                          <button
                            onClick={() => setWishlist(w => w.includes(i) ? w.filter(x => x !== i) : [...w, i])}
                            className="cursor-pointer"
                          >
                            <Heart className={`w-5 h-5 transition-all ${wishlist.includes(i) ? "fill-[#8b4513] text-[#8b4513]" : "text-[#f5f0e6]/40 hover:text-[#f5f0e6]"}`} />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-[#f5f0e6]/60">{prod.dims}</p>
                          <Badge className="bg-[#8b4513]/20 text-[#8b4513] text-xs">{prod.finishes} finishes</Badge>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-[#8b4513]/10">
                          <span className="text-lg font-black text-[#8b4513]">{prod.price}</span>
                          <button className="bg-[#8b4513]/20 text-[#8b4513] hover:bg-[#8b4513]/30 px-3 py-1 rounded text-xs font-semibold transition-all duration-200">
                            View
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* WORKSHOP CAROUSEL */}
      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">The Workshop</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&q=80&w=1000", title: "Forge Station", desc: "Traditional metalworking" },
                  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000", title: "Finishing", desc: "Precision surface treatment" },
                  { img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000", title: "Assembly", desc: "Expert craftsmanship" },
                  { img: "https://images.unsplash.com/photo-1486262715619-67b519e0bbe3?auto=format&fit=crop&q=80&w=1000", title: "Quality Control", desc: "Final inspection" }
                ].map((item, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <Card className="bg-[#242424] border border-[#8b4513]/20 overflow-hidden">
                      <div className="relative h-64 w-full">
                        <Image src={item.img} alt={item.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-[#f5f0e6]/60 text-sm">{item.desc}</p>
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

      {/* TRADE PROGRAM */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a1a1a] to-[#242424]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Interior Designer Trade Program</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Tabs defaultValue="pricing" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#8b4513]/10 p-1 mb-8">
                {["pricing", "samples", "leads", "portfolio"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="text-xs md:text-sm cursor-pointer data-[state=active]:bg-[#8b4513] data-[state=active]:text-white">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="pricing" className="space-y-4">
                <Card className="bg-[#242424] border border-[#8b4513]/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Trade Pricing Benefits</h3>
                    <ul className="space-y-3">
                      {["25% discount on all collections", "Priority lead times (6-week expedited)", "Volume discounts available", "Dedicated account manager", "Sample program access"].map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#f5f0e6]/80">
                          <span className="w-2 h-2 bg-[#8b4513] rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* CUSTOM ORDER */}
      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Custom Orders</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1. Consultation", desc: "Discuss your vision, dimensions, and material preferences" },
                { step: "2. Custom Quote", desc: "Detailed estimate including timeline and specifications" },
                { step: "3. Production", desc: "Handcrafted in our workshop with regular updates" }
              ].map((item, i) => (
                <Card key={i} className="bg-gradient-to-br from-[#8b4513]/10 to-[#708090]/10 border border-[#8b4513]/20 cursor-pointer hover:border-[#8b4513]/40 transition-all duration-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-black text-[#8b4513] mb-3">{i + 1}</div>
                    <h3 className="font-bold mb-2">{item.step}</h3>
                    <p className="text-[#f5f0e6]/60 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 bg-[#242424] border-2 border-[#8b4513] rounded-lg p-8 text-center">
              <button onClick={() => setDialogOpen(true)} className="cursor-pointer bg-[#8b4513] text-[#f5f0e6] px-8 py-3 rounded-lg font-semibold hover:bg-[#6d3810] transition-all duration-200">
                Request Custom Quote
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Established", value: 2008, suffix: "" },
              { label: "Pieces Crafted", value: 2000, suffix: "" },
              { label: "Countries", value: 80, suffix: "" },
              { label: "Avg Rating", value: 4.9, suffix: "★" }
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#8b4513] mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[#f5f0e6]/60">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Client Stories</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { name: "Michael A.", quote: "The craftsmanship is incredible. Every piece is a statement." },
                  { name: "Sarah L.", quote: "Custom order was perfect. Lead time was faster than expected." },
                  { name: "James C.", quote: "Trade pricing saved us thousands on a major project." }
                ].map((review, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <Card className="bg-[#242424] border border-[#8b4513]/20">
                      <CardContent className="p-8">
                        <p className="text-[#f5f0e6] font-semibold mb-4">"{review.quote}"</p>
                        <p className="text-[#f5f0e6]/60">— {review.name}</p>
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
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a1a1a] to-[#242424]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">FAQ</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "What are typical lead times?", a: "Stock items ship within 2 weeks. Custom pieces take 12-16 weeks depending on complexity. Expedited 6-week options available." },
                { q: "Do you offer delivery?", a: "Yes, we ship internationally. Europe €200-500, rest of world via freight. White-glove assembly available in major cities." },
                { q: "Can I customize dimensions?", a: "Absolutely. All pieces can be adjusted for your space. Custom quotes include fabrication costs." },
                { q: "What's your return policy?", a: "30-day returns on stock items. Custom pieces are final sale but we stand behind our craftsmanship with lifetime support." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-[#8b4513]/20 rounded-lg px-4 data-[state=open]:border-[#8b4513]/40 transition-all">
                  <AccordionTrigger className="cursor-pointer hover:text-[#8b4513] transition-colors py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#f5f0e6]/60 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* BOOKING DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#242424] border-[#8b4513]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl">Book Showroom Visit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Your name" className="w-full bg-[#1a1a1a] border border-[#8b4513]/20 rounded-lg px-4 py-2 text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:border-[#8b4513] outline-none cursor-text" />
            <input type="email" placeholder="Your email" className="w-full bg-[#1a1a1a] border border-[#8b4513]/20 rounded-lg px-4 py-2 text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:border-[#8b4513] outline-none cursor-text" />
            <input type="tel" placeholder="Phone number" className="w-full bg-[#1a1a1a] border border-[#8b4513]/20 rounded-lg px-4 py-2 text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:border-[#8b4513] outline-none cursor-text" />
            <textarea placeholder="Project details" rows={3} className="w-full bg-[#1a1a1a] border border-[#8b4513]/20 rounded-lg px-4 py-2 text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:border-[#8b4513] outline-none resize-none cursor-text" />
            <MagneticBtn className="w-full bg-gradient-to-r from-[#8b4513] to-[#6d3810] text-[#f5f0e6] py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#8b4513]/50 transition-all duration-200">
              Request Showroom Visit
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
