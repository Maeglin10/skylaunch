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

const CLASSES = [
  { name: "Strength Training", times: ["6:00 AM", "12:00 PM", "6:00 PM"], coach: "Alex Johnson", spots: 8 },
  { name: "HIIT Blast", times: ["7:00 AM", "5:00 PM"], coach: "Sarah Chen", spots: 4 },
  { name: "Yoga Flow", times: ["8:00 AM", "6:00 PM"], coach: "Emma Davis", spots: 12 },
  { name: "Boxing Cardio", times: ["5:30 AM", "7:00 PM"], coach: "Mike Torres", spots: 6 },
  { name: "Cycling Rhythm", times: ["6:30 AM", "6:00 PM"], coach: "Lisa Park", spots: 10 },
]

const TRAINERS = [
  { name: "Alex Johnson", cert: "NASM-CPT", specialty: "Strength", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "Sarah Chen", cert: "CrossFit L2", specialty: "HIIT", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
  { name: "Emma Davis", cert: "RYT-500", specialty: "Yoga", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" },
  { name: "Mike Torres", cert: "USA Boxing", specialty: "Boxing", img: "https://images.unsplash.com/photo-1539571696357-5a69c006ae30?q=80&w=400" },
  { name: "Lisa Park", cert: "Cycling Spec", specialty: "Cycling", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "James Wilson", cert: "ISSA CFT", specialty: "Cross-Training", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
]

const TRANSFORMATIONS = [
  { before: "https://images.unsplash.com/photo-1516458239065-4f5f9a0ff861?q=80&w=500", after: "https://images.unsplash.com/photo-1540497077202-7c8bd3f2348a?q=80&w=500", months: "4 months" },
  { before: "https://images.unsplash.com/photo-1517836357463-d25dfeac3428?q=80&w=500", after: "https://images.unsplash.com/photo-1552882523-7fbe3b2eae6c?q=80&w=500", months: "6 months" },
  { before: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500", after: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500", months: "8 weeks" },
  { before: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=500", after: "https://images.unsplash.com/photo-1574680096145-91f3e7c29b77?q=80&w=500", months: "12 weeks" },
]

const MEMBERSHIPS = [
  { tier: "Basic", price: "€29/mo", features: ["4 classes/week", "Gym access", "1 intro session"] },
  { tier: "Pro", price: "€59/mo", features: ["Unlimited classes", "Gym access", "2 PT sessions/mo", "Nutrition guide"] },
  { tier: "Elite", price: "€99/mo", features: ["Unlimited everything", "Priority booking", "4 PT sessions/mo", "Nutrition + recovery plans"] },
]

export default function ForgeGymPage() {
  const [activeTab, setActiveTab] = useState("Strength")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div style={{ background: "#0a0a0a", color: "#fff" }}>
      {/* Hero Parallax */}
      <motion.section style={{ y: parallaxY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400"
          alt="gym"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-black mb-6" style={{ color: "#dc2626" }}>FORGE FITNESS</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl text-gray-300 mb-8">Transform Your Body. Unlock Your Potential.</p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-12 py-4 text-lg font-bold" style={{ background: "#dc2626", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
              CLAIM 3 FREE SESSIONS
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.section>

      {/* Class Schedule Tabs */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#dc2626" }}>CLASS SCHEDULE</h2>
        </Reveal>
        <Tabs defaultValue="Strength" className="w-full">
          <TabsList className="flex justify-center gap-2 mb-12 bg-transparent">
            {CLASSES.map((c) => (
              <TabsTrigger key={c.name} value={c.name} className="px-6 py-2 font-bold text-lg border border-red-600 data-[state=active]:bg-red-600 data-[state=active]:text-white">
                {c.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {CLASSES.map((cls) => (
            <TabsContent key={cls.name} value={cls.name}>
              <Reveal>
                <Card className="bg-neutral-900 border border-red-600/30">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-3xl font-black mb-4">{cls.name}</h3>
                        <p className="text-gray-400 mb-6">Expert-led training for maximum results.</p>
                        <div className="flex items-center gap-4 mb-6">
                          <Avatar>
                            <AvatarImage src={TRAINERS.find(t => t.name === cls.coach)?.img} />
                            <AvatarFallback>{cls.coach.split(" ")[0][0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold">{cls.coach}</p>
                            <p className="text-sm text-gray-400">{TRAINERS.find(t => t.name === cls.coach)?.cert}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-4">Available Times</p>
                        <div className="grid grid-cols-2 gap-3">
                          {cls.times.map((time) => (
                            <div key={time} className="p-3 bg-red-600/10 border border-red-600/30 rounded text-center font-semibold">
                              {time}
                            </div>
                          ))}
                        </div>
                        <Badge className="mt-6 px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/30">
                          {cls.spots} SPOTS AVAILABLE
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Trainer Roster */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#dc2626" }}>ELITE TRAINERS</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {TRAINERS.map((trainer, i) => (
            <Reveal key={trainer.name} delay={i * 0.1}>
              <Card className="bg-neutral-900 border border-red-600/30 overflow-hidden hover:border-red-600 transition-colors">
                <div className="relative h-64 mb-4">
                  <Image src={trainer.img} alt={trainer.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-2">{trainer.name}</h3>
                  <Badge className="mb-4 px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/30">{trainer.cert}</Badge>
                  <p className="text-gray-400">{trainer.specialty}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Transformations Carousel */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#dc2626" }}>CLIENT TRANSFORMATIONS</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {TRANSFORMATIONS.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Reveal>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-80">
                      <Image src={t.before} alt="before" fill className="object-cover rounded" />
                      <Badge className="absolute bottom-4 left-4 bg-gray-900/80">Before</Badge>
                    </div>
                    <div className="relative h-80">
                      <Image src={t.after} alt="after" fill className="object-cover rounded" />
                      <Badge className="absolute bottom-4 left-4 bg-red-600">{t.months}</Badge>
                    </div>
                  </div>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 2000, label: "Members" },
            { num: 50, label: "Classes/Week", suffix: "" },
            { num: 15, label: "Expert Trainers", suffix: "" },
            { num: 4.9, label: "Rating", suffix: "★" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="text-5xl font-black mb-2" style={{ color: "#dc2626" }}>
                  <Counter target={Math.floor(stat.num)} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#dc2626" }}>MEMBERSHIP PLANS</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {MEMBERSHIPS.map((m, i) => (
            <Reveal key={m.tier} delay={i * 0.1}>
              <Card className={`border-2 transition-transform hover:scale-105 ${i === 1 ? "border-red-600 bg-red-600/10" : "border-red-600/30 bg-neutral-900"}`}>
                <CardContent className="p-8">
                  <h3 className="text-3xl font-black mb-2">{m.tier}</h3>
                  <div className="text-4xl font-black mb-6" style={{ color: "#dc2626" }}>{m.price}</div>
                  <ul className="space-y-4">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full" style={{ background: "#dc2626" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-8 py-3 font-black rounded text-white" style={{ background: "#dc2626" }}>
                    JOIN NOW
                  </button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#dc2626" }}>FAQS</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "What's your commitment policy?", a: "Month-to-month flexibility with no long-term contracts." },
            { q: "Do I need my own equipment?", a: "No, we provide all equipment. Bring a towel and water bottle!" },
            { q: "Is there nutrition guidance?", a: "Yes, Pro & Elite tiers include personalized nutrition plans." },
            { q: "What about injury concerns?", a: "Our trainers are certified and will modify movements for your safety." },
            { q: "Can I try before buying?", a: "Yes, 3 free trial sessions to experience our community." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-red-600/20">
              <AccordionTrigger className="hover:text-red-600">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-400">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6">Ready to Transform?</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn className="px-16 py-5 text-xl font-bold" style={{ background: "#dc2626", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
            BOOK FREE TRIAL
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Trial Booking Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-neutral-900 border border-red-600/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black" style={{ color: "#dc2626" }}>CLAIM 3 FREE SESSIONS</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-2 rounded bg-neutral-800 border border-red-600/30 text-white placeholder:text-gray-500" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-neutral-800 border border-red-600/30 text-white placeholder:text-gray-500" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-2 rounded bg-neutral-800 border border-red-600/30 text-white placeholder:text-gray-500" />
            <button className="w-full py-3 font-black rounded text-white" style={{ background: "#dc2626" }}>
              SCHEDULE TRIAL
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
