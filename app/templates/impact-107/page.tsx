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

function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>
}

function Counter({ target, suffix="" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = Math.ceil(target / 60)
    const t = setInterval(() => setCount(c => Math.min(c + step, target)), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className="" }: { children: React.ReactNode; className?: string }) {
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

export default function FluxStreeetwear() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const [dropTimer, setDropTimer] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 })
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("black")
  const [showEarlyAccess, setShowEarlyAccess] = useState(false)
  const [collectionTab, setCollectionTab] = useState("hoodies")

  useEffect(() => {
    const interval = setInterval(() => {
      setDropTimer(t => {
        let { days, hours, minutes, seconds } = t
        if (seconds > 0) seconds--
        else if (minutes > 0) { minutes--; seconds = 59 }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59 }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59 }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const products = [
    { id: 1, name: "VOLT HOODIE", price: "$120", colors: ["black", "yellow"], image: "https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=600&fit=crop" },
    { id: 2, name: "SHOCK TEE", price: "$45", colors: ["black", "yellow"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop" },
    { id: 3, name: "CIRCUIT PANTS", price: "$95", colors: ["black"], image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=600&fit=crop" },
  ]

  const lookbook = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1490578474895-699cd4e2cf6f?w=800&h=600&fit=crop",
  ]

  const collabs = [
    { artist: "NEON KING", avatar: "NK", date: "DEC 15" },
    { artist: "VOLT LAB", avatar: "VL", date: "JAN 10" },
    { artist: "CIRCUIT CO", avatar: "CC", date: "FEB 20" },
    { artist: "SPARK STUDIO", avatar: "SS", date: "MAR 05" },
  ]

  const testimonials = [
    { text: "Best streetwear in the game. Pure heat.", author: "MAYA_", avatar: "M" },
    { text: "Every drop sells out in minutes. Worth it.", author: "ALEX_FLUX", avatar: "A" },
    { text: "The quality is insane for the price.", author: "JORDAN_HYPE", avatar: "J" },
  ]

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      {/* PARALLAX HERO */}
      <motion.section style={{ opacity, scale }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=900&fit=crop" alt="Streetwear" fill className="object-cover brightness-50" />
        <div className="relative z-10 text-center space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black uppercase tracking-tighter">
            <span className="text-[#ffd700]">FLUX</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-gray-300">
            ELECTRIC STREETWEAR. LIMITED DROPS. INFINITE STYLE.
          </motion.p>
        </div>
      </motion.section>

      {/* DROP COUNTDOWN */}
      <Reveal>
        <section className="py-20 px-6 bg-[#1a1a1a] border-y border-[#ffd700]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center">NEXT DROP IN</h2>
            <div className="grid grid-cols-4 gap-6 text-center">
              {[
                { label: "DAYS", value: dropTimer.days },
                { label: "HOURS", value: dropTimer.hours },
                { label: "MINS", value: dropTimer.minutes },
                { label: "SECS", value: dropTimer.seconds },
              ].map((item, i) => (
                <motion.div key={i} initial={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="p-6 bg-black border-2 border-[#ffd700] rounded">
                  <div className="text-4xl font-black text-[#ffd700]">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-sm uppercase text-gray-400 mt-2">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* COLLECTION GRID WITH TABS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">COLLECTIONS</h2>
            <Tabs defaultValue="hoodies" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black border border-[#ffd700]">
                {["hoodies", "tees", "pants", "accessories"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="uppercase text-sm font-bold">{tab}</TabsTrigger>
                ))}
              </TabsList>
              {["hoodies", "tees", "pants", "accessories"].map(tab => (
                <TabsContent key={tab} value={tab} className="mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((prod, i) => (
                      <motion.div key={prod.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group relative">
                        <Dialog>
                          <motion.button className="w-full aspect-square relative overflow-hidden bg-[#1a1a1a] border border-gray-700 hover:border-[#ffd700] transition">
                            <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-110 transition duration-500" />
                            <Badge className="absolute top-4 right-4 bg-[#ffd700] text-black">LIMITED</Badge>
                          </motion.button>
                          <DialogContent className="bg-black border border-[#ffd700]">
                            <DialogHeader>
                              <DialogTitle className="text-[#ffd700] text-2xl">{prod.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="aspect-square relative">
                                <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold mb-3">SIZE</label>
                                <div className="grid grid-cols-5 gap-2">
                                  {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`p-3 border font-bold ${selectedSize === size ? "bg-[#ffd700] text-black border-[#ffd700]" : "border-gray-600 hover:border-[#ffd700]"}`}>
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-bold mb-3">COLOR</label>
                                <div className="flex gap-3">
                                  {prod.colors.map(color => (
                                    <button key={color} onClick={() => setSelectedColor(color)} className={`w-12 h-12 rounded border-2 ${selectedColor === color ? "border-[#ffd700]" : "border-gray-600"}`} style={{ backgroundColor: color === "yellow" ? "#ffd700" : "#000" }} />
                                  ))}
                                </div>
                              </div>
                              <button className="w-full py-3 bg-[#ffd700] text-black font-black text-lg hover:bg-white transition">
                                ADD TO CART {prod.price}
                              </button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <div className="mt-4">
                          <h3 className="font-black text-lg group-hover:text-[#ffd700] transition">{prod.name}</h3>
                          <p className="text-gray-400">{prod.price}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </Reveal>

      {/* LOOKBOOK CAROUSEL */}
      <Reveal>
        <section className="py-20 px-6 bg-[#1a1a1a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">STYLE LOOKBOOK</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {lookbook.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-video relative">
                      <Image src={img} alt={`Look ${i}`} fill className="object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </Reveal>

      {/* COLLAB TIMELINE */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">COLLAB TIMELINE</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {collabs.map((collab, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 bg-black border border-[#ffd700] text-center">
                  <Avatar className="mx-auto mb-4 w-16 h-16 border-2 border-[#ffd700]">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${collab.avatar}`} />
                    <AvatarFallback>{collab.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-black text-lg text-[#ffd700]">{collab.artist}</h3>
                  <p className="text-sm text-gray-400 mt-2">{collab.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* STATS COUNTER */}
      <Reveal>
        <section className="py-20 px-6 bg-[#1a1a1a]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "COMMUNITY", value: 250000 },
                { label: "DROPS", value: 12 },
                { label: "COUNTRIES", value: 40 },
                { label: "RATING", value: 4.9, suffix: "★" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <div className="text-4xl font-black text-[#ffd700]"><Counter target={stat.value} suffix={stat.suffix} /></div>
                    <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">COMMUNITY LOVE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 bg-black border border-[#ffd700]">
                  <p className="text-lg mb-6 italic">"{testi.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-[#ffd700] text-black font-black">{testi.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="font-black">{testi.author}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="py-20 px-6 bg-[#1a1a1a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12">FAQS</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "What sizes do you carry?", a: "We offer XS to XXL in most items. Check product details for specific sizes." },
                { q: "How fast is shipping?", a: "Standard shipping is 5-7 days. Express shipping available at checkout." },
                { q: "What's your return policy?", a: "30-day returns on all unworn items with original tags." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#ffd700]">
                  <AccordionTrigger className="text-lg font-black hover:text-[#ffd700]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-400">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* EARLY ACCESS CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-black to-[#1a1a1a]">
        <h2 className="text-5xl font-black mb-6">GET EARLY ACCESS</h2>
        <p className="text-gray-400 mb-8">Join our VIP list for drops before they go public.</p>
        <MagneticBtn onClick={() => setShowEarlyAccess(true)} className="px-8 py-4 bg-[#ffd700] text-black font-black text-lg hover:bg-white transition rounded">
          SIGN UP NOW
        </MagneticBtn>
        <Dialog open={showEarlyAccess} onOpenChange={setShowEarlyAccess}>
          <DialogContent className="bg-black border-2 border-[#ffd700]">
            <DialogHeader>
              <DialogTitle className="text-[#ffd700] text-2xl">EARLY ACCESS</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input type="email" placeholder="your@email.com" className="w-full p-3 bg-[#1a1a1a] border border-[#ffd700] text-white placeholder-gray-600" />
              <button className="w-full py-3 bg-[#ffd700] text-black font-black hover:bg-white transition">SUBSCRIBE</button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
