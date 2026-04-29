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

export default function GrindCoffee() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const [showSubBuilder, setShowSubBuilder] = useState(false)
  const [subscriptionTab, setSubscriptionTab] = useState("bean")
  const [frequency, setFrequency] = useState("monthly")

  const origins = [
    { name: "ETHIOPIA", notes: "Floral, Fruity, Balanced", farmers: "120 small farms" },
    { name: "COLOMBIA", notes: "Smooth, Chocolate, Nutty", farmers: "80 co-ops" },
    { name: "GUATEMALA", notes: "Bold, Spicy, Full-bodied", farmers: "60 estates" },
    { name: "JAPAN", notes: "Clean, Bright, Delicate", farmers: "12 artisans" },
  ]

  const brewMethods = [
    { name: "ESPRESSO", steps: 30, water: "1.5oz", grind: "Fine" },
    { name: "POUR-OVER", steps: 4, water: "8oz", grind: "Medium" },
    { name: "FRENCH PRESS", steps: 6, water: "8oz", grind: "Coarse" },
    { name: "COLD BREW", steps: 2, water: "8oz", grind: "Coarse" },
  ]

  const cafes = [
    { name: "ROASTERY BERLIN", address: "Friedrichshain District", roasters: "8 roasters" },
    { name: "CAFE TOKYO", address: "Shibuya-ku", roasters: "4 roasters" },
    { name: "ESPRESSO LAB NYC", address: "Brooklyn", roasters: "12 roasters" },
  ]

  const testimonials = [
    { text: "Best coffee subscription I've tried. Beans arrive fresh and perfectly roasted.", author: "COFFEE_GURU", avatar: "C" },
    { text: "The flavor profiles are incredible. Finally found my favorite origin.", author: "JAVA_LOVER", avatar: "J" },
    { text: "Customer service is amazing. They remembered my roast preference.", author: "BREW_MASTER", avatar: "B" },
  ]

  return (
    <div className="bg-[#fdf6ec] text-[#1a0d00] min-h-screen overflow-x-hidden">
      {/* PARALLAX HERO */}
      <motion.section style={{ opacity, scale }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=900&fit=crop" alt="Coffee" fill className="object-cover brightness-50" />
        <div className="relative z-10 text-center space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl md:text-8xl font-black uppercase tracking-tighter text-white">
            GRIND COFFEE
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-white">
            CRAFT ROASTED. DIRECT FROM ORIGIN. DELIVERED FRESH.
          </motion.p>
        </div>
      </motion.section>

      {/* ORIGIN STORY TABS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#6f4e37]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#fdf6ec]">ORIGINS</h2>
            <Tabs defaultValue="Ethiopia" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black/20 border-2 border-[#fdf6ec]">
                {origins.map(origin => (
                  <TabsTrigger key={origin.name} value={origin.name} className="uppercase text-sm font-bold text-[#fdf6ec]">{origin.name}</TabsTrigger>
                ))}
              </TabsList>
              {origins.map(origin => (
                <TabsContent key={origin.name} value={origin.name} className="mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-4xl font-black mb-6 text-[#fdf6ec]">{origin.name}</h3>
                      <div className="space-y-6 text-[#fdf6ec]">
                        <div>
                          <p className="text-sm uppercase font-bold mb-2 opacity-80">FLAVOR PROFILE</p>
                          <p className="text-2xl font-bold">{origin.notes}</p>
                        </div>
                        <div>
                          <p className="text-sm uppercase font-bold mb-2 opacity-80">PARTNER FARMS</p>
                          <p className="text-xl">{origin.farmers}</p>
                        </div>
                        <Badge className="bg-[#f97316] text-white text-base px-4 py-2">SPECIALTY</Badge>
                      </div>
                    </div>
                    <div className="h-96 bg-black/20 rounded-xl border-2 border-[#fdf6ec]" />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </Reveal>

      {/* BREW METHOD ACCORDION */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12">BREW GUIDE</h2>
            <Accordion type="single" collapsible className="w-full">
              {brewMethods.map((method, i) => (
                <AccordionItem key={i} value={`method-${i}`} className="border-[#6f4e37]">
                  <AccordionTrigger className="text-2xl font-black hover:text-[#f97316] text-[#1a0d00]">
                    {method.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-bold mb-1">TIME</p>
                        <p className="text-lg font-black text-[#6f4e37]">{method.steps} sec</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1">WATER</p>
                        <p className="text-lg font-black text-[#6f4e37]">{method.water}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1">GRIND</p>
                        <p className="text-lg font-black text-[#6f4e37]">{method.grind}</p>
                      </div>
                    </div>
                    <ol className="space-y-2 list-decimal list-inside">
                      <li>Add ground coffee to vessel</li>
                      <li>Pour hot water (200°F)</li>
                      <li>Stir gently</li>
                      <li>Let steep or drain</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* SUBSCRIPTION BUILDER */}
      <Reveal>
        <section className="py-20 px-6 bg-[#6f4e37]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#fdf6ec]">BUILD YOUR SUBSCRIPTION</h2>
            <Tabs value={subscriptionTab} onValueChange={setSubscriptionTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/20 border-2 border-[#fdf6ec]">
                {["bean", "ground", "capsule"].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="uppercase text-sm font-bold text-[#fdf6ec]">{tab}</TabsTrigger>
                ))}
              </TabsList>
              {["bean", "ground", "capsule"].map(tab => (
                <TabsContent key={tab} value={tab} className="mt-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white rounded-xl">
                      <h3 className="text-2xl font-black mb-6 text-[#1a0d00]">{tab.toUpperCase()}</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-[#fdf6ec] rounded border-2 border-[#6f4e37]">
                          <p className="font-bold text-[#6f4e37]">Type: {tab === "bean" ? "Whole Beans" : tab === "ground" ? "Ground" : "Compostable Pods"}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-3 text-[#1a0d00]">FREQUENCY</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["weekly", "biweekly", "monthly"].map(freq => (
                              <button key={freq} onClick={() => setFrequency(freq)} className={`p-3 border-2 font-bold rounded ${frequency === freq ? "bg-[#6f4e37] text-white border-[#6f4e37]" : "border-[#6f4e37] text-[#6f4e37]"}`}>
                                {freq}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-[#f97316] rounded-xl text-white">
                      <h4 className="text-2xl font-black mb-6">PREVIEW</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>1x Specialty Beans</span>
                          <span className="font-black">$12</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{frequency.charAt(0).toUpperCase() + frequency.slice(1)} Delivery</span>
                          <span className="font-black">$2</span>
                        </div>
                        <div className="border-t border-white pt-3 flex justify-between text-xl font-black">
                          <span>Total</span>
                          <span>$14</span>
                        </div>
                      </div>
                      <button className="w-full mt-6 py-3 bg-white text-[#f97316] font-black hover:bg-[#fdf6ec] transition rounded">
                        SUBSCRIBE NOW
                      </button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </Reveal>

      {/* STATS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "ORIGINS", value: 12 },
                { label: "ROASTERS", value: 8 },
                { label: "SUBSCRIBERS", value: 50000 },
                { label: "RATING", value: 4.9, suffix: "★" },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <div className="text-4xl font-black text-[#6f4e37]"><Counter target={stat.value} suffix={stat.suffix} /></div>
                    <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ROASTERY CAROUSEL */}
      <Reveal>
        <section className="py-20 px-6 bg-[#fdf6ec]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">ROASTERIES</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2, 3, 4].map(i => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <div className="aspect-video bg-gradient-to-br from-[#6f4e37] to-[#f97316] rounded-xl flex items-center justify-center">
                      <span className="text-3xl font-black text-white">Roastery {i}</span>
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

      {/* CAFE LOCATIONS */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12">CAFE LOCATIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cafes.map((cafe, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 bg-[#f97316] rounded-xl text-white text-center">
                  <h3 className="text-2xl font-black mb-4">{cafe.name}</h3>
                  <p className="mb-4">{cafe.address}</p>
                  <Badge className="bg-white text-[#f97316]">{cafe.roasters}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal>
        <section className="py-20 px-6 bg-[#6f4e37]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-[#fdf6ec]">COFFEE LOVERS</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testi, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/3">
                    <div className="p-8 bg-[#fdf6ec] rounded-xl">
                      <p className="text-lg mb-6 italic text-[#1a0d00]">"{testi.text}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-[#6f4e37] text-white font-black">{testi.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-black text-[#6f4e37]">{testi.author}</span>
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
            <h2 className="text-5xl font-black mb-12">FAQS</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "How long do beans stay fresh?", a: "Best within 2 weeks of roasting. Unopened bags stay fresh for 4 weeks. Store in airtight containers away from light." },
                { q: "What's your recommended grind?", a: "Depends on brew method. We include grind recommendations with each order. Ask our team anytime." },
                { q: "Do you offer gifts?", a: "Yes! Gift subscriptions available. Perfect for coffee lovers. Custom messages included." },
                { q: "Can I change my subscription?", a: "Absolutely. Skip weeks, change origins, or pause anytime. No penalty." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#6f4e37]">
                  <AccordionTrigger className="text-lg font-black hover:text-[#f97316] text-[#1a0d00]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#6f4e37] to-[#1a0d00]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6 text-[#fdf6ec]">START YOUR SUBSCRIPTION</h2>
          <p className="text-[#fdf6ec] mb-8 text-lg">Fresh beans delivered monthly. Perfect every time.</p>
          <MagneticBtn onClick={() => setShowSubBuilder(true)} className="px-8 py-4 bg-[#f97316] text-white font-black text-lg hover:bg-[#fdf6ec] hover:text-[#6f4e37] transition rounded">
            SUBSCRIBE NOW
          </MagneticBtn>
          <Dialog open={showSubBuilder} onOpenChange={setShowSubBuilder}>
            <DialogContent className="bg-[#fdf6ec] border-2 border-[#6f4e37]">
              <DialogHeader>
                <DialogTitle className="text-[#6f4e37] text-2xl">CUSTOMIZE YOUR ORDER</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input type="text" placeholder="Your name" className="w-full p-3 bg-white border-2 border-[#6f4e37] text-black placeholder-gray-600 rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 bg-white border-2 border-[#6f4e37] text-black placeholder-gray-600 rounded" />
                <button className="w-full py-3 bg-[#6f4e37] text-white font-black hover:bg-[#1a0d00] transition rounded">CONTINUE</button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  )
}
