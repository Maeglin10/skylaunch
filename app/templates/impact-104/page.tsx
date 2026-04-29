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
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={className}>{children}</motion.button>
}

const FACILITIES = [
  { id: 1, name: "Bouldering", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop", description: "200+ indoor problems, all difficulty levels" },
  { id: 2, name: "Lead Climbing", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&auto=format&fit=crop", description: "45ft walls with top-rope and lead courses" },
  { id: 3, name: "Top-Rope", image: "https://images.unsplash.com/photo-1516960022422-92426e4e6bcd?w=800&auto=format&fit=crop", description: "Classic rope climbing with safety progression" },
  { id: 4, name: "Training Zone", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop", description: "Strength & conditioning equipment" },
  { id: 5, name: "Yoga Studio", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop", description: "Flexibility & injury prevention classes" },
]

const MEMBERSHIPS = [
  { tier: "Day Pass", price: "€15", features: ["Full gym access", "Equipment rental", "Beginner orientation"] },
  { tier: "Monthly", price: "€49", features: ["Unlimited visits", "Locker access", "Community events", "Discount lessons"] },
  { tier: "Annual", price: "€399", features: ["All monthly benefits", "Guest passes (12)", "Priority classes", "Exclusive merchandise"] },
]

const GRADES = [
  { range: "V0-V2", climbers: 45, color: "#ff6b2b" },
  { range: "V3-V5", climbers: 38, color: "#ff6b2b" },
  { range: "V6-V8", climbers: 15, color: "#2d5a3d" },
  { range: "V9+", climbers: 8, color: "#2d5a3d" },
]

const EVENTS = [
  { type: "Competition", description: "Monthly local & regional climbing competitions" },
  { type: "Social", description: "Weekly hangouts, film nights, group climbs" },
  { type: "Clinic", description: "Expert-led technique workshops and training sessions" },
  { type: "Youth", description: "After-school programs for ages 6-18" },
]

const COACHES = [
  { name: "Alex Rivera", cert: "IFSC Level 2", image: "https://i.pravatar.cc/150?img=9" },
  { name: "Jamie Park", cert: "Professional Guide", image: "https://i.pravatar.cc/150?img=10" },
  { name: "Chris Nowak", cert: "Youth Specialist", image: "https://i.pravatar.cc/150?img=11" },
  { name: "Sofia Mendez", cert: "Strength Coach", image: "https://i.pravatar.cc/150?img=12" },
]

export default function SummitClimbingPage() {
  const [selectedFacility, setSelectedFacility] = useState(0)

  return (
    <div className="min-h-screen" style={{ background: "#f8f8f6" }}>
      {/* Hero with Particles */}
      <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1600&auto=format&fit=crop"
          alt="Summit Climbing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Chalk particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{ background: "#f8f8f6", opacity: 0.6 }}
            animate={{
              y: [0, -400],
              x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              opacity: [1, 0],
            }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity }}
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight }}
          />
        ))}

        <motion.div className="relative z-10 text-center text-white">
          <h1 className="text-7xl md:text-8xl font-bold mb-4 uppercase tracking-tighter">SUMMIT</h1>
          <h2 className="text-5xl md:text-6xl font-light mb-6 uppercase tracking-wider">Climbing Gym</h2>
          <p className="text-xl opacity-90">Indoor climbing • Community • Challenge</p>
        </motion.div>
      </section>

      {/* Facilities Tabs */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8f8f6" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold mb-16" style={{ color: "#1c1c1a" }}>Our Facilities</h2>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-12" style={{ background: "transparent" }}>
                {FACILITIES.map((f, idx) => (
                  <TabsTrigger key={idx} value={`${idx}`} style={{ color: "#ff6b2b" }}>
                    {f.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {FACILITIES.map((facility, idx) => (
                <TabsContent key={idx} value={`${idx}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      width={600}
                      height={400}
                      className="w-full rounded-lg"
                    />
                    <div>
                      <h3 className="text-4xl font-bold mb-4" style={{ color: "#1c1c1a" }}>{facility.name}</h3>
                      <p className="text-xl mb-8" style={{ color: "#ff6b2b" }}>{facility.description}</p>
                      <Badge style={{ background: "#ff6b2b", color: "white" }}>Featured</Badge>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Reveal>
      </section>

      {/* Memberships */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f0ebe0" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold mb-12" style={{ color: "#1c1c1a" }}>Membership Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MEMBERSHIPS.map((m, idx) => (
                <Card key={idx} style={{ background: "#f8f8f6", borderColor: "#ff6b2b", borderWidth: "2px" }}>
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "#1c1c1a" }}>{m.tier}</h3>
                    <div className="text-4xl font-bold mb-6" style={{ color: "#ff6b2b" }}>{m.price}</div>
                    <ul className="space-y-3">
                      {m.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span style={{ color: "#ff6b2b" }}>✓</span>
                          <span style={{ color: "#1c1c1a" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Grade Progress */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8f8f6" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12" style={{ color: "#1c1c1a" }}>Community Progress</h2>
            <div className="space-y-8">
              {GRADES.map((g, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold" style={{ color: "#1c1c1a" }}>{g.range}</span>
                    <span style={{ color: "#ff6b2b" }}>{g.climbers} climbers</span>
                  </div>
                  <Progress value={(g.climbers / 50) * 100} className="h-3" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Events Accordion */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f0ebe0" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12" style={{ color: "#1c1c1a" }}>Upcoming Events</h2>
            <Accordion type="single" collapsible>
              {EVENTS.map((e, idx) => (
                <AccordionItem key={idx} value={`event-${idx}`}>
                  <AccordionTrigger style={{ color: "#1c1c1a" }}>{e.type}</AccordionTrigger>
                  <AccordionContent style={{ color: "#ff6b2b" }}>{e.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#ff6b2b" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
              <div><div className="text-5xl font-bold mb-2"><Counter target={2000} /></div><p className="text-sm opacity-80">Members</p></div>
              <div><div className="text-5xl font-bold mb-2"><Counter target={500} /></div><p className="text-sm opacity-80">Routes Set</p></div>
              <div><div className="text-5xl font-bold mb-2"><Counter target={15} /></div><p className="text-sm opacity-80">m Wall Height</p></div>
              <div><div className="text-5xl font-bold mb-2">Weekly</div><p className="text-sm opacity-80">New Routes</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Coaching Team */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8f8f6" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold mb-12" style={{ color: "#1c1c1a" }}>Our Coaches</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {COACHES.map((c, idx) => (
                <div key={idx} className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={c.image} />
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-lg" style={{ color: "#1c1c1a" }}>{c.name}</p>
                  <Badge style={{ background: "#ff6b2b", color: "white" }}>{c.cert}</Badge>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f0ebe0" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-center" style={{ color: "#1c1c1a" }}>Member Stories</h2>
            <Carousel>
              <CarouselContent>
                {[
                  { text: "Summit changed my life. I found my community here.", author: "Emma L." },
                  { text: "The coaches are patient, knowledgeable, and genuinely supportive.", author: "Marco K." },
                ].map((t, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-12 rounded-lg text-center" style={{ background: "#f8f8f6" }}>
                      <p className="text-xl italic mb-6" style={{ color: "#ff6b2b" }}>"{t.text}"</p>
                      <p className="font-bold" style={{ color: "#1c1c1a" }}>— {t.author}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8f8f6" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12" style={{ color: "#1c1c1a" }}>FAQ</h2>
            <Accordion type="single" collapsible>
              {[
                { q: "Do I need experience to start?", a: "No! We offer beginner orientations and classes for all levels." },
                { q: "What should I bring?", a: "Just yourself. We provide climbing shoes, harnesses, and chalk." },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger style={{ color: "#1c1c1a" }}>{item.q}</AccordionTrigger>
                  <AccordionContent style={{ color: "#ff6b2b" }}>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* Trial CTA */}
      <section className="py-24 px-8 md:px-20 text-center" style={{ background: "#2d5a3d" }}>
        <Reveal>
          <h2 className="text-5xl font-bold text-white mb-8">Start Your Climbing Journey</h2>
          <Dialog>
            <motion.button
              className="px-12 py-4 bg-white font-bold"
              style={{ color: "#ff6b2b" }}
              whileHover={{ scale: 1.05 }}
            >
              Book Free Trial
            </motion.button>
            <DialogContent style={{ background: "#f8f8f6" }}>
              <DialogHeader>
                <DialogTitle>Book Your Free Trial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full p-3 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                <select className="w-full p-3 border rounded">
                  <option>Select Experience Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <button className="w-full py-3 text-white font-bold" style={{ background: "#ff6b2b" }}>Reserve Trial</button>
              </div>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
