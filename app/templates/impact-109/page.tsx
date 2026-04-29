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

export default function TerraSurf() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const [showBooking, setShowBooking] = useState(false)
  const [particles] = useState(Array.from({ length: 8 }))

  const instructors = [
    { name: "WAVE MASTER KAI", level: "PRO", avatar: "WK" },
    { name: "OCEAN RIDER JEN", level: "PRO", avatar: "OR" },
    { name: "REEF GUIDE MARK", level: "EXPERT", avatar: "RG" },
    { name: "SWELL COACH AYA", level: "PRO", avatar: "SC" },
  ]

  const campPackages = [
    { name: "DAY CAMP", price: "$149", lessons: "3 lessons", accommodation: "None" },
    { name: "WEEKEND", price: "$399", lessons: "6 lessons", accommodation: "2 nights hostel" },
    { name: "WEEK CAMP", price: "$899", lessons: "15 lessons", accommodation: "7 nights beachfront" },
  ]

  const conditions = {
    waveHeight: "4-6 ft",
    wind: "12 knots E",
    tide: "Low tide 6 AM",
    temp: "72°F"
  }

  const testimonials = [
    { text: "Best week of my life. Went from beginner to carving waves.", author: "ALEX_SURF", avatar: "A" },
    { text: "The instructors are patient and amazing. Can't wait to come back.", author: "JORDAN", avatar: "J" },
    { text: "Finally learned to stand up and ride real waves. Magical experience.", author: "CASEY", avatar: "C" },
  ]

  return (
    <div className="bg-white text-[#0369a1] min-h-screen overflow-x-hidden">
      {/* PARALLAX HERO WITH WAVE ANIMATION */}
      <motion.section style={{ opacity, scale }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1600&h=900&fit=crop" alt="Surfing" fill className="object-cover brightness-75" />

        {/* FLOATING PARTICLES */}
        <div className="absolute inset-0 z-10">
          {particles.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "100vh" }}
              animate={{ opacity: [0, 1, 0], y: "-100vh" }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-2 h-2 bg-[#f97316] rounded-full"
              style={{ left: `${(i * 12.5) % 100}%` }}
            />
          ))}
        </div>

        <div className="relative z-20 text-center space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black uppercase tracking-tighter text-white">
            TERRA SURF
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-white">
            LEARN. RIDE. LIVE THE OCEAN.
          </motion.p>
        </div>
      </motion.section>

      {/* LESSONS TABS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#fef3c7]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#0369a1]">LESSON LEVELS</h2>
            <Tabs defaultValue="beginner" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#0369a1]">
                {["beginner", "intermediate", "advanced", "private"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="uppercase text-sm font-bold text-[#0369a1]">{tab}</TabsTrigger>
                ))}
              </TabsList>
              {[
                { id: "beginner", price: "$79", duration: "2 hours", desc: "Master the basics on foam boards in shallow water." },
                { id: "intermediate", price: "$99", duration: "2.5 hours", desc: "Learn proper technique, paddling, and wave selection." },
                { id: "advanced", price: "$129", duration: "3 hours", desc: "Advanced maneuvers, barrel riding, and line selection." },
                { id: "private", price: "$199", duration: "1 hour", desc: "One-on-one coaching tailored to your skill level." },
              ].map(lesson => (
                <TabsContent key={lesson.id} value={lesson.id} className="mt-12">
                  <div className="space-y-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-4xl font-black text-[#0369a1] mb-4">{lesson.price}</h3>
                        <p className="text-gray-600">{lesson.duration}</p>
                      </div>
                      <Badge className="bg-[#f97316] text-white text-lg px-6 py-2">POPULAR</Badge>
                    </div>
                    <p className="text-xl text-gray-700">{lesson.desc}</p>
                    <button className="px-8 py-4 bg-[#0369a1] text-white font-black text-lg hover:bg-[#0284c7] transition rounded">
                      BOOK NOW
                    </button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </Reveal>

      {/* INSTRUCTORS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#0369a1]">MASTER INSTRUCTORS</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {instructors.map((instr, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-[#0369a1]">
                    <AvatarFallback className="bg-[#0369a1] text-white text-2xl font-black">{instr.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-black text-lg text-[#0369a1]">{instr.name}</h3>
                  <Badge className="bg-[#f97316] text-white mt-2">{instr.level}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CONDITIONS DISPLAY */}
      <Reveal>
        <section className="py-20 px-6 bg-[#0369a1] text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">TODAY'S CONDITIONS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {Object.entries(conditions).map(([key, value], i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 bg-white text-[#0369a1] rounded-xl">
                  <p className="text-sm uppercase font-black mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-3xl font-black">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CAMP PACKAGES */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#0369a1]">CAMP PACKAGES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {campPackages.map((pkg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 bg-[#fef3c7] border-4 border-[#0369a1] rounded-xl text-center">
                  <h3 className="text-2xl font-black text-[#0369a1] mb-4">{pkg.name}</h3>
                  <div className="text-4xl font-black text-[#f97316] mb-6">{pkg.price}</div>
                  <ul className="space-y-2 mb-8 text-gray-700">
                    <li>✓ {pkg.lessons}</li>
                    <li>✓ {pkg.accommodation}</li>
                    <li>✓ Breakfast daily</li>
                  </ul>
                  <button className="w-full py-3 bg-[#0369a1] text-white font-black hover:bg-[#0284c7] transition rounded">
                    RESERVE
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* STATS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#0369a1] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "STUDENTS", value: 5000 },
                { label: "INSTRUCTORS", value: 15 },
                { label: "YEARS LEGACY", value: 25 },
                { label: "RATING", value: 4.9, suffix: "★" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <div className="text-4xl font-black"><Counter target={stat.value} suffix={stat.suffix} /></div>
                    <p className="text-gray-200 text-sm mt-2">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* GEAR SHOP */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#0369a1]">GEAR SHOP</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {["Surfboards", "Wetsuits", "Accessories", "Protection"].map((gear, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="aspect-square bg-[#fef3c7] border-4 border-[#0369a1] rounded-xl flex items-center justify-center cursor-pointer">
                  <span className="text-2xl font-black text-[#0369a1]">{gear}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#fef3c7]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#0369a1]">STUDENT STORIES</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testi, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/3">
                    <div className="p-8 bg-white border-4 border-[#0369a1] rounded-xl">
                      <p className="text-lg mb-6 italic text-gray-700">"{testi.text}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-[#0369a1] text-white font-black">{testi.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-black text-[#0369a1]">{testi.author}</span>
                      </div>
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

      {/* FAQ */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#0369a1]">FAQS</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Is surfing hard to learn?", a: "Most students stand up on their first day! It takes patience and practice, but we make it fun." },
                { q: "What gear do I need?", a: "We provide everything. Just bring swimwear and sunscreen." },
                { q: "Will I get a good workout?", a: "Absolutely. Surfing is an intense full-body workout. Great cardio and strength." },
                { q: "Can I stay overnight?", a: "Yes. All camp packages include accommodation options." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#0369a1]">
                  <AccordionTrigger className="text-lg font-black hover:text-[#f97316] text-[#0369a1]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* BOOKING CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#fef3c7]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6 text-[#0369a1]">READY TO CATCH WAVES?</h2>
          <p className="text-gray-700 mb-8 text-lg">Book your lesson or camp today. Spots fill up fast.</p>
          <MagneticBtn onClick={() => setShowBooking(true)} className="px-8 py-4 bg-[#0369a1] text-white font-black text-lg hover:bg-[#0284c7] transition rounded">
            BOOK NOW
          </MagneticBtn>
          <Dialog open={showBooking} onOpenChange={setShowBooking}>
            <DialogContent className="bg-[#fef3c7] border-4 border-[#0369a1]">
              <DialogHeader>
                <DialogTitle className="text-[#0369a1] text-2xl">BOOK YOUR SESSION</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input type="text" placeholder="Your name" className="w-full p-3 bg-white border-2 border-[#0369a1] text-black placeholder-gray-600 rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 bg-white border-2 border-[#0369a1] text-black placeholder-gray-600 rounded" />
                <button className="w-full py-3 bg-[#0369a1] text-white font-black hover:bg-[#0284c7] transition rounded">BOOK SESSION</button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  )
}
