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

export default function NomadHouse() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [destinationTab, setDestinationTab] = useState("Bali")
  const [membershipTab, setMembershipTab] = useState("nomad")

  const destinations = [
    { name: "Bali", cost: "$400-800/mo", members: "2,400", cowork: "12 spaces" },
    { name: "Lisbon", cost: "$600-1200/mo", members: "1,800", cowork: "8 spaces" },
    { name: "Medellín", cost: "$300-600/mo", members: "950", cowork: "5 spaces" },
    { name: "Chiang Mai", cost: "$200-500/mo", members: "1,200", cowork: "7 spaces" },
    { name: "Cape Town", cost: "$500-1000/mo", members: "680", cowork: "4 spaces" },
  ]

  const memberships = [
    { id: "nomad", name: "NOMAD PASS", price: "$49/mo", features: ["Coworking access", "Community events", "Visa guides", "Insurance partner discounts"] },
    { id: "community", name: "COMMUNITY", price: "$29/mo", features: ["Online community", "Resource library", "Monthly webinars", "Peer network"] },
    { id: "premium", name: "PREMIUM", price: "$149/mo", features: ["Everything in Nomad", "Private coaching", "Visa consultation", "Tax planning"] },
  ]

  const partners = ["Airbnb", "Wise", "SafetyWing", "Notion", "StartupVisas", "CloudFlare"]

  const testimonials = [
    { text: "Best decision ever. Found my people and built a life overseas.", author: "ALEX_NOMAD", location: "Bangkok" },
    { text: "The visa guidance alone saved me months of research. Worth it.", author: "JORDAN_ROAM", location: "Lisbon" },
    { text: "Community is so supportive. Found co-founder here. We're launching together.", author: "CASEY_DIGITAL", location: "Medellín" },
  ]

  const upcomingEvents = [
    { city: "Bali", event: "Monthly Beach Meetup", date: "May 5" },
    { city: "Lisbon", event: "Startup Founder Dinner", date: "May 8" },
    { city: "Medellín", event: "Hiking & Coffee Tour", date: "May 12" },
    { city: "Chiang Mai", event: "Digital Nomad Workshop", date: "May 15" },
  ]

  return (
    <div className="bg-[#faf5ef] text-[#1a1410] min-h-screen overflow-x-hidden">
      {/* PARALLAX HERO */}
      <motion.section style={{ opacity, scale }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop" alt="Digital Nomad" fill className="object-cover brightness-50" />
        <div className="relative z-10 text-center space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black uppercase tracking-tighter text-white">
            NOMAD HOUSE
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-white">
            WORK FROM ANYWHERE. BELONG EVERYWHERE.
          </motion.p>
        </div>
      </motion.section>

      {/* DESTINATION TABS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#d2714a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-white">DESTINATIONS</h2>
            <Tabs value={destinationTab} onValueChange={setDestinationTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-black/20 border-2 border-white">
                {destinations.map(dest => (
                  <TabsTrigger key={dest.name} value={dest.name} className="uppercase text-xs md:text-sm font-bold text-white">{dest.name}</TabsTrigger>
                ))}
              </TabsList>
              {destinations.map(dest => (
                <TabsContent key={dest.name} value={dest.name} className="mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                      <h3 className="text-4xl font-black mb-8">{dest.name}</h3>
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm uppercase font-bold mb-2 opacity-80">COST OF LIVING</p>
                          <p className="text-2xl font-bold">{dest.cost}</p>
                        </div>
                        <div>
                          <p className="text-sm uppercase font-bold mb-2 opacity-80">NOMADS HERE</p>
                          <p className="text-2xl font-bold">{dest.members}</p>
                        </div>
                        <div>
                          <p className="text-sm uppercase font-bold mb-2 opacity-80">COWORKING SPACES</p>
                          <p className="text-2xl font-bold">{dest.cowork}</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-96 bg-white/20 rounded-xl border-2 border-white" />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </Reveal>

      {/* MEMBERSHIP TIERS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">MEMBERSHIP PLANS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {memberships.map((plan, i) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`p-8 rounded-xl border-2 ${plan.id === "premium" ? "border-[#d2714a] bg-[#fef5f0]" : "border-[#7c9e6e] bg-white"}`}>
                  <h3 className="text-2xl font-black mb-2 text-[#1a1410]">{plan.name}</h3>
                  <div className="text-3xl font-black text-[#d2714a] mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="text-gray-700">✓ {feat}</li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 font-black rounded transition ${plan.id === "premium" ? "bg-[#d2714a] text-white hover:bg-[#1a1410]" : "bg-[#7c9e6e] text-white hover:bg-[#1a1410]"}`}>
                    JOIN NOW
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* RESOURCE LIBRARY ACCORDION */}
      <Reveal>
        <section className="py-20 px-6 bg-[#fef5f0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12">RESOURCE LIBRARY</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { title: "VISAS", items: ["Visa requirements by country", "Digital Nomad Visa guide", "Tax treaty database", "Insurance recommendations"] },
                { title: "BANKING", items: ["Best banks for expats", "Crypto onramps", "Currency conversion", "Money transfer apps"] },
                { title: "INSURANCE", items: ["Health insurance comparison", "Travel insurance guide", "Liability coverage", "COVID-19 policies"] },
                { title: "TAXES", items: ["FEIE filing guide", "Tax treaty strategies", "CPA directory", "Quarterly payment tracker"] },
              ].map((resource, i) => (
                <AccordionItem key={i} value={`resource-${i}`} className="border-[#d2714a]">
                  <AccordionTrigger className="text-2xl font-black hover:text-[#d2714a] text-[#1a1410]">{resource.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-gray-700">
                      {resource.items.map((item, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="font-black text-[#7c9e6e]">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* STATS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "MEMBERS", value: 12000 },
                { label: "COUNTRIES", value: 80 },
                { label: "CITIES", value: 200 },
                { label: "RATING", value: 4.9, suffix: "★" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <div className="text-4xl font-black text-[#d2714a]"><Counter target={stat.value} suffix={stat.suffix} /></div>
                    <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* MEMBER SPOTLIGHT CAROUSEL */}
      <Reveal>
        <section className="py-20 px-6 bg-[#d2714a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-white">MEMBER SPOTLIGHT</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { name: "SARAH CODE", location: "Lisbon" },
                  { name: "MARCO DESIGN", location: "Bali" },
                  { name: "ALEX STARTUP", location: "Medellín" },
                  { name: "JUNE BUILD", location: "Chiang Mai" },
                ].map((member, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/3">
                    <div className="p-8 bg-white rounded-xl">
                      <Avatar className="w-16 h-16 mb-4 border-4 border-[#d2714a]">
                        <AvatarFallback className="bg-[#d2714a] text-white font-black text-lg">{member.name.split(' ')[0][0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-black text-[#1a1410] mb-1">{member.name}</h3>
                      <Badge className="bg-[#7c9e6e] text-white">{member.location}</Badge>
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

      {/* EVENT CALENDAR */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">UPCOMING EVENTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-6 bg-[#fef5f0] border-2 border-[#d2714a] rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black text-[#1a1410]">{event.event}</h3>
                      <p className="text-[#d2714a] font-bold">{event.city}</p>
                    </div>
                    <Badge className="bg-[#d2714a] text-white">{event.date}</Badge>
                  </div>
                  <button className="text-sm font-bold text-[#7c9e6e] hover:text-[#d2714a]">Learn More →</button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* PARTNER MARQUEE */}
      <Reveal>
        <section className="py-20 px-6 bg-[#fef5f0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center">PARTNER PERKS</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {partners.map((partner, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 bg-white border-2 border-[#d2714a] rounded-lg text-center font-black text-[#1a1410]">
                  {partner}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">COMMUNITY VOICES</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testi, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/3">
                    <div className="p-8 bg-[#fef5f0] border-2 border-[#d2714a] rounded-xl">
                      <p className="text-lg mb-6 italic text-[#1a1410]">"{testi.text}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-[#d2714a] text-white font-black">{testi.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-black text-[#1a1410]">{testi.author}</p>
                          <p className="text-sm text-[#d2714a]">{testi.location}</p>
                        </div>
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
        <section className="py-20 px-6 bg-[#fef5f0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12">FAQS</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Do I need a visa to be a digital nomad?", a: "Depends on your passport and destination. We have guides for 150+ countries. Check our visa database." },
                { q: "How do taxes work while traveling?", a: "Generally you file in your home country. Digital Nomad Visas can simplify this. Consult a tax pro." },
                { q: "Which destination is cheapest?", a: "Chiang Mai ($200-500/mo) and Medellín ($300-600/mo) are most affordable. Lisbon and Bali are moderate." },
                { q: "Can I bring my family?", a: "Absolutely. Many Digital Nomad Visas include spouses and children. Resources available in member library." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#d2714a]">
                  <AccordionTrigger className="text-lg font-black hover:text-[#d2714a] text-[#1a1410]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#d2714a] to-[#1a1410]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6 text-white">JOIN THE MOVEMENT</h2>
          <p className="text-white mb-8 text-lg">Start your nomadic journey with community, resources, and support.</p>
          <MagneticBtn onClick={() => setShowJoinDialog(true)} className="px-8 py-4 bg-[#7c9e6e] text-white font-black text-lg hover:bg-white hover:text-[#d2714a] transition rounded">
            JOIN NOMAD HOUSE
          </MagneticBtn>
          <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
            <DialogContent className="bg-[#faf5ef] border-2 border-[#d2714a]">
              <DialogHeader>
                <DialogTitle className="text-[#d2714a] text-2xl">START YOUR NOMAD JOURNEY</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input type="email" placeholder="your@email.com" className="w-full p-3 bg-white border-2 border-[#d2714a] text-black placeholder-gray-600 rounded" />
                <input type="text" placeholder="Current location" className="w-full p-3 bg-white border-2 border-[#d2714a] text-black placeholder-gray-600 rounded" />
                <button className="w-full py-3 bg-[#d2714a] text-white font-black hover:bg-[#1a1410] transition rounded">GET STARTED</button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  )
}
