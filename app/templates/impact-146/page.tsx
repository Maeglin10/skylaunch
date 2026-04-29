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
import { Wine, MapPin, Gauge, Star, FileText, ChevronDown, ArrowRight, Gift } from "lucide-react"

const SUBSCRIPTIONS = [
  { name: "Discovery", price: 39, bottles: 3, regions: 3, sommelier: "Email", color: "from-amber-600 to-amber-800" },
  { name: "Collector", price: 79, bottles: 6, regions: 6, sommelier: "Monthly call", color: "from-red-700 to-red-900" },
  { name: "Sommelier", price: 149, bottles: 12, regions: 8, sommelier: "Quarterly masterclass", color: "from-purple-700 to-purple-900" },
]

const WINEMAKERS = [
  { name: "Pierre Dubois", region: "Burgundy", grapes: "Pinot Noir, Chardonnay", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { name: "Anna Rossi", region: "Tuscany", grapes: "Sangiovese, Brunello", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { name: "James Chen", region: "Napa Valley", grapes: "Cabernet, Chardonnay", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { name: "Sofia Garcia", region: "Rioja", grapes: "Tempranillo, Garnacha", img: "https://images.unsplash.com/photo-1534528741775-53994a69be16?w=150" },
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

export default function Terroir() {
  const [activeTab, setActiveTab] = useState("discovery")
  const [openGift, setOpenGift] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-gradient-to-b from-[#4a0e2d] via-[#2d0a1a] to-[#4a0e2d] text-[#f5ede0] min-h-screen font-serif">
      {/* Parallax Hero */}
      <motion.div style={{ opacity }} className="relative h-screen flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200"
          alt="Vineyard"
          fill
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a0e2d] via-transparent to-[#4a0e2d]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <h1 className="text-6xl md:text-7xl font-black mb-6" style={{ color: '#c9a84c' }}>
              TERROIR<br />WINE
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-[#f5ede0]/80 max-w-2xl mb-8 font-light">
              Wine & gastronomy subscription. 5K members. 200 estates. 40 regions. Curated by sommeliers.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-8 py-4 bg-[#c9a84c] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#c9a84c]/50 transition-all">
              Start Subscription
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.div>

      {/* Subscription Tabs */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#c9a84c' }}>Subscription Plans</h2>
          <p className="text-[#f5ede0]/70 mb-12 text-lg">Choose your journey</p>
        </Reveal>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 bg-[#2d0a1a]/50 p-2 rounded-lg mb-12">
            {SUBSCRIPTIONS.map((sub) => (
              <TabsTrigger
                key={sub.name}
                value={sub.name.toLowerCase()}
                className="text-xs md:text-sm font-bold"
              >
                {sub.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {SUBSCRIPTIONS.map((sub) => (
            <TabsContent key={sub.name} value={sub.name.toLowerCase()} className="space-y-8">
              <Reveal>
                <div className={`bg-gradient-to-br ${sub.color} rounded-lg p-12 text-white`}>
                  <h3 className="text-4xl font-black mb-2">{sub.name}</h3>
                  <div className="text-5xl font-black mb-8">${sub.price}<span className="text-2xl font-normal">/month</span></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                      <p className="text-sm opacity-80 mb-2">Bottles Per Month</p>
                      <p className="text-3xl font-bold">{sub.bottles}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-2">Regions Covered</p>
                      <p className="text-3xl font-bold">{sub.regions}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-2">Sommelier Access</p>
                      <p className="text-lg font-semibold">{sub.sommelier}</p>
                    </div>
                  </div>

                  <MagneticBtn className="w-full py-3 bg-white text-[#4a0e2d] font-bold rounded-lg hover:opacity-90 transition-opacity">
                    Subscribe Now
                  </MagneticBtn>
                </div>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Winemakers */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#c9a84c' }}>Winemaker Profiles</h2>
          <p className="text-[#f5ede0]/70 mb-12 text-lg">Meet the artisans behind your wine</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WINEMAKERS.map((winemaker, idx) => (
            <Reveal key={winemaker.name} delay={idx * 0.1}>
              <Card className="bg-[#2d0a1a] border-[#c9a84c]/30 hover:border-[#c9a84c] transition-all">
                <CardContent className="p-6">
                  <Avatar className="w-12 h-12 mb-4 border-2 border-[#c9a84c]">
                    <AvatarImage src={winemaker.img} />
                    <AvatarFallback>{winemaker.name.split(" ")[0][0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{winemaker.name}</h3>
                  <p className="text-sm text-[#c9a84c] mb-3">{winemaker.region}</p>
                  <p className="text-xs text-[#f5ede0]/60">{winemaker.grapes}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tasting Notes Template */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#c9a84c' }}>Tasting Notes</h2>
          <p className="text-[#f5ede0]/70 mb-12 text-lg">Understanding wine characteristics</p>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { wine: "Burgundy Pinot Noir 2018", notes: "Appearance: Deep ruby | Nose: Cherry, earth, leather | Palate: Silky, elegant | Pairing: Duck confit, aged cheeses" },
            { wine: "Tuscany Brunello 2015", notes: "Appearance: Garnet | Nose: Dark berries, tobacco | Palate: Full-bodied, structured | Pairing: Beef steak, truffles" },
            { wine: "Napa Cabernet 2016", notes: "Appearance: Dark ruby | Nose: Cassis, cedar, oak | Palate: Bold, complex | Pairing: Wagyu beef, dark chocolate" },
            { wine: "Rioja Tempranillo 2017", notes: "Appearance: Ruby red | Nose: Red fruits, spice | Palate: Balanced, fruit-forward | Pairing: Lamb, Spanish sausages" },
          ].map((item, idx) => (
            <Reveal key={item.wine} delay={idx * 0.1}>
              <AccordionItem value={`wine-${idx}`} className="border-[#c9a84c]/30">
                <AccordionTrigger className="hover:text-[#c9a84c] transition-colors font-semibold">
                  {item.wine}
                </AccordionTrigger>
                <AccordionContent className="text-[#f5ede0]/80 font-serif">
                  {item.notes}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* Cellar Tracker */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#c9a84c' }}>Cellar Management</h2>
          <p className="text-[#f5ede0]/70 mb-12 text-lg">Track, rate, and cellar your collection</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Track Bottles", desc: "Add, organize, and monitor your cellar inventory", icon: <Wine /> },
            { title: "Rate & Review", desc: "Personal tasting notes and ratings for every bottle", icon: <Star /> },
            { title: "Cellar Predictions", desc: "AI-powered aging curve and drinking window alerts", icon: <Gauge /> },
          ].map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 0.1}>
              <Card className="bg-[#2d0a1a] border-[#c9a84c]/30 hover:border-[#c9a84c] transition-all">
                <CardContent className="p-8">
                  <div className="mb-4" style={{ color: '#c9a84c' }}>{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#f5ede0]/70">{feature.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Members", value: 5, suffix: "K" },
              { label: "Estates", value: 200 },
              { label: "Regions", value: 40 },
              { label: "Rating", value: 4.9, suffix: "★" },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 0.1}>
                <div className="text-center p-6 bg-[#2d0a1a] rounded-lg border border-[#c9a84c]/30">
                  <div className="text-4xl font-black mb-2" style={{ color: '#c9a84c' }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[#f5ede0]/70">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Regional Origin */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#c9a84c' }}>Wine Regions</h2>
          <p className="text-[#f5ede0]/70 mb-12 text-lg">Global selections from premier wine regions</p>
        </Reveal>

        <div className="overflow-hidden bg-[#2d0a1a] rounded-lg border border-[#c9a84c]/30 p-8">
          <div className="flex gap-8 md:gap-12 items-center overflow-x-auto pb-4">
            {["Burgundy", "Barossa", "Napa", "Tuscany", "Rioja", "Champagne", "Alsace", "Douro"].map((region, idx) => (
              <Reveal key={region} delay={idx * 0.1}>
                <span className="font-bold text-[#c9a84c] whitespace-nowrap">{region}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#c9a84c' }}>Member Stories</h2>
        </Reveal>

        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {[
              { text: "Elevated my wine knowledge from novice to confident. Sommeliers are incredible.", author: "Michael P.", member: "Collector" },
              { text: "Every bottle is a discovery. Amazing value. Best subscription I have.", author: "Catherine R.", member: "Sommelier" },
              { text: "Learning wine pairing with professional guidance. Life-changing.", author: "David K.", member: "Collector" },
            ].map((testimonial, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#2d0a1a] border-[#c9a84c]/30 h-full">
                  <CardContent className="p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4" style={{ color: '#c9a84c' }} fill="#c9a84c" />
                        ))}
                      </div>
                      <p className="text-[#f5ede0] italic mb-4">"{testimonial.text}"</p>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <Badge className="bg-[#c9a84c] text-[#4a0e2d]">{testimonial.member}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#c9a84c' }}>FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { q: "Can I pause my subscription?", a: "Yes. Pause anytime, no penalty. Cancel anytime with 30 days notice." },
            { q: "How is shipping handled?", a: "Insulated shipping. Temperature controlled. Full insurance. Free for US/EU." },
            { q: "What about storage?", a: "Wine storage guide included. Sommelier consultations on proper cellar conditions." },
            { q: "Can I gift a subscription?", a: "Absolutely. Gift subscriptions start immediately. Recipient chooses their plan." },
          ].map((item, idx) => (
            <Reveal key={item.q} delay={idx * 0.1}>
              <AccordionItem value={`faq-${idx}`} className="border-[#c9a84c]/30">
                <AccordionTrigger className="hover:text-[#c9a84c] transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#f5ede0]/80">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6" style={{ color: '#c9a84c' }}>Gift the Gift of Wine</h2>
          <p className="text-[#f5ede0]/70 mb-8 text-lg max-w-2xl mx-auto">
            Give a wine subscription that keeps giving. Every month, a new discovery.
          </p>
          <MagneticBtn
            onClick={() => setOpenGift(true)}
            className="px-10 py-4 bg-[#c9a84c] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#c9a84c]/50 transition-all"
          >
            Gift a Subscription
          </MagneticBtn>
        </Reveal>
      </section>

      <Dialog open={openGift} onOpenChange={setOpenGift}>
        <DialogContent className="bg-[#2d0a1a] border-[#c9a84c]/30">
          <DialogHeader>
            <DialogTitle style={{ color: '#c9a84c' }}>Gift a Wine Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input placeholder="Recipient Name" className="w-full px-4 py-2 bg-[#4a0e2d] border border-[#c9a84c]/30 rounded text-[#f5ede0] placeholder-[#f5ede0]/50 font-serif" />
            <input placeholder="Recipient Email" type="email" className="w-full px-4 py-2 bg-[#4a0e2d] border border-[#c9a84c]/30 rounded text-[#f5ede0] placeholder-[#f5ede0]/50 font-serif" />
            <select className="w-full px-4 py-2 bg-[#4a0e2d] border border-[#c9a84c]/30 rounded text-[#f5ede0] font-serif">
              <option>Discovery - $39/month</option>
              <option>Collector - $79/month</option>
              <option>Sommelier - $149/month</option>
            </select>
            <button className="w-full py-3 bg-[#c9a84c] text-white font-bold rounded hover:opacity-90 transition-opacity">
              Send Gift
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
