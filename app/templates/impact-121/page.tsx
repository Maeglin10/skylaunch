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

const PRODUCTS = {
  Adaptogens: [
    { name: "Ashwagandha", benefits: ["Stress relief", "Sleep quality", "Energy boost"], certs: ["Organic", "3rd party tested"] },
    { name: "Reishi", benefits: ["Immune support", "Relaxation", "Recovery"], certs: ["Organic", "Lab verified"] },
  ],
  Vitamins: [
    { name: "D3+K2", benefits: ["Bone health", "Mood", "Immune"], certs: ["Vegan", "Certified pure"] },
    { name: "B-Complex", benefits: ["Energy", "Cognitive", "Metabolism"], certs: ["Organic", "Lab tested"] },
  ],
  Proteins: [
    { name: "Plant Protein Blend", benefits: ["Muscle recovery", "Complete amino", "Digestion"], certs: ["Vegan", "Hypoallergenic"] },
    { name: "Hemp Protein", benefits: ["Omega-3s", "Sustainable", "Complete protein"], certs: ["Organic", "Fair trade"] },
  ],
  Teas: [
    { name: "Mushroom Blend", benefits: ["Focus", "Energy", "Antioxidants"], certs: ["Organic", "Wildcrafted"] },
    { name: "Adaptogenic Tea", benefits: ["Calm", "Balance", "Wellness"], certs: ["Organic", "Fair trade"] },
  ],
  Bundles: [
    { name: "Wellness Starter", benefits: ["30-day supply", "4 bestsellers", "Savings"], certs: ["Popular", "Best value"] },
    { name: "Recovery Bundle", benefits: ["Post-workout", "Sleep support", "Joint care"], certs: ["Popular", "Recommended"] },
  ],
}

const INGREDIENTS = [
  { name: "Ashwagandha", origin: "India", efficacy: 92, benefits: "Stress & sleep" },
  { name: "Reishi", origin: "Japan", efficacy: 88, benefits: "Immunity & calm" },
  { name: "Maca", origin: "Peru", efficacy: 85, benefits: "Energy & focus" },
  { name: "Turmeric", origin: "India", efficacy: 95, benefits: "Anti-inflammatory" },
]

const PRACTITIONERS = [
  { name: "Dr. Sarah Chen", title: "Functional Medicine MD", cred: "Board Certified", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
  { name: "James Wilson", title: "Holistic Nutritionist", cred: "CNTP, NNCP", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "Elena Rodriguez", title: "Wellness Coach", cred: "ISSN Certified", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" },
]

const TESTING = [
  { test: "Heavy Metals", result: "Non-detectable", status: "Certified" },
  { test: "Purity", result: "99.2%", status: "Verified" },
  { test: "Potency", result: "Within spec", status: "Validated" },
]

export default function TerraBotanicaPage() {
  const [activeTab, setActiveTab] = useState("Adaptogens")
  const [frequency, setFrequency] = useState("Monthly")
  const [quantity, setQuantity] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const savingsCalc = quantity * (frequency === "Quarterly" ? 10 : frequency === "Monthly" ? 8 : 5)

  return (
    <div style={{ background: "#fefce8", color: "#1f2937" }}>
      {/* Hero Parallax */}
      <motion.section style={{ y: parallaxY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1400"
          alt="botanicals"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-black mb-6 text-white drop-shadow-lg" style={{ color: "#166534" }}>TERRA BOTANICA</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl text-white mb-8 drop-shadow-md">Plant-Based Wellness from Nature to You</p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-12 py-4 text-lg font-bold text-white" style={{ background: "#166534", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
              EXPLORE COLLECTION
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.section>

      {/* Product Tabs */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#166534" }}>PRODUCTS</h2>
        </Reveal>
        <Tabs defaultValue="Adaptogens" className="w-full">
          <TabsList className="flex justify-center gap-2 mb-12 bg-transparent flex-wrap">
            {Object.keys(PRODUCTS).map((cat) => (
              <TabsTrigger key={cat} value={cat} className="px-6 py-2 font-bold text-lg border data-[state=active]:bg-green-100 data-[state=active]:text-green-900 data-[state=active]:border-green-600" style={{ borderColor: "#166534", color: "#166534" }}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(PRODUCTS).map(([cat, products]) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid md:grid-cols-2 gap-8">
                {products.map((p) => (
                  <Reveal key={p.name}>
                    <Card className="bg-white border-2 border-green-200 hover:border-green-600 transition-colors cursor-pointer">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-black mb-4" style={{ color: "#166534" }}>{p.name}</h3>
                        <div className="mb-6">
                          <p className="text-sm text-gray-600 mb-3 font-bold">Key Benefits</p>
                          <div className="flex gap-2 flex-wrap">
                            {p.benefits.map((b) => (
                              <Badge key={b} className="px-3 py-1 bg-green-100 text-green-900 border-green-600">{b}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-3 font-bold">Certifications</p>
                          <div className="flex gap-2 flex-wrap">
                            {p.certs.map((c) => (
                              <Badge key={c} className="px-3 py-1" style={{ background: "#fefce8", color: "#166534", border: "2px solid #166534" }}>{c}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Ingredient Sourcing */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#166534" }}>INGREDIENT SOURCING</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {INGREDIENTS.map((ing, i) => (
            <AccordionItem key={ing.name} value={`item-${i}`} className="border-b-2 border-green-200">
              <AccordionTrigger className="text-lg font-black hover:text-green-700">{ing.name}</AccordionTrigger>
              <AccordionContent>
                <Reveal>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">ORIGIN</p>
                      <p className="text-lg font-bold" style={{ color: "#166534" }}>{ing.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">EFFICACY</p>
                      <Progress value={ing.efficacy} className="h-3 mb-2" />
                      <p className="text-lg font-bold" style={{ color: "#166534" }}>{ing.efficacy}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">BENEFITS</p>
                      <p className="text-lg font-bold" style={{ color: "#166534" }}>{ing.benefits}</p>
                    </div>
                  </div>
                </Reveal>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Subscription Builder */}
      <section className="py-24 px-6 max-w-4xl mx-auto bg-green-50 rounded-lg">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#166534" }}>BUILD YOUR SUBSCRIPTION</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-8">
            <div>
              <p className="font-bold mb-4">Delivery Frequency</p>
              <div className="flex gap-4">
                {["Weekly", "Monthly", "Quarterly"].map((f) => (
                  <button key={f} onClick={() => setFrequency(f)} className={`px-6 py-3 rounded font-bold transition-all ${frequency === f ? "text-white" : "text-green-900 border-2"}`} style={{ background: frequency === f ? "#166534" : "transparent", borderColor: "#166534" }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-bold mb-4">Quantity (boxes)</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 border-2" style={{ borderColor: "#166534" }}>−</button>
                <span className="text-3xl font-black" style={{ color: "#166534" }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 border-2" style={{ borderColor: "#166534" }}>+</button>
              </div>
            </div>

            <Card className="bg-white border-2 border-green-600">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-lg">Total Savings</p>
                  <p className="text-3xl font-black" style={{ color: "#166534" }}>€{savingsCalc}</p>
                </div>
                <p className="text-sm text-gray-600">You save up to 30% with regular subscriptions</p>
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Lab Testing */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#166534" }}>THIRD-PARTY TESTING</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTING.map((t, i) => (
            <Reveal key={t.test} delay={i * 0.1}>
              <Card className="bg-white border-2 border-green-200 text-center">
                <CardContent className="p-8">
                  <p className="text-sm text-gray-600 mb-2">TEST</p>
                  <p className="text-2xl font-black mb-4" style={{ color: "#166534" }}>{t.test}</p>
                  <p className="text-lg font-bold mb-4">{t.result}</p>
                  <Badge className="px-4 py-2 bg-green-100 text-green-900 border-green-600">{t.status}</Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 500000, label: "Happy Customers", suffix: "K" },
            { num: 50, label: "Products", suffix: "" },
            { num: 100, label: "Certified Organic", suffix: "%" },
            { num: 4.9, label: "Rating", suffix: "★" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="text-5xl font-black mb-2" style={{ color: "#166534" }}>
                  <Counter target={Math.floor(stat.num)} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Practitioner Endorsements */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#166534" }}>TRUSTED BY PRACTITIONERS</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {PRACTITIONERS.map((p, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Reveal>
                  <Card className="bg-white border-2 border-green-200 overflow-hidden">
                    <div className="relative h-48">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-black mb-2" style={{ color: "#166534" }}>{p.name}</h3>
                      <p className="text-gray-600 mb-4">{p.title}</p>
                      <Badge className="px-3 py-1 bg-green-100 text-green-900 border-green-600">{p.cred}</Badge>
                    </CardContent>
                  </Card>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center" style={{ color: "#166534" }}>FAQS</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "What dosages do you recommend?", a: "Check product labels or consult our practitioners for personalized guidance." },
            { q: "Any drug interactions?", a: "Always consult your doctor before starting supplements, especially if on medications." },
            { q: "Are products vegan?", a: "Yes, all our products are 100% plant-based and vegan-certified." },
            { q: "Can I see certificates?", a: "Yes, all certificates are available on product pages and via our quality portal." },
            { q: "What's your return policy?", a: "30-day satisfaction guarantee, no questions asked." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-green-200">
              <AccordionTrigger className="hover:text-green-700">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6" style={{ color: "#166534" }}>Start Your Wellness Journey</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn className="px-16 py-5 text-xl font-bold text-white" style={{ background: "#166534", border: "none", cursor: "pointer" }} onClick={() => setDialogOpen(true)}>
            SHOP NOW
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-2 border-green-600">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black" style={{ color: "#166534" }}>GET STARTED</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-2 rounded border-2 border-green-300 placeholder:text-gray-500" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded border-2 border-green-300 placeholder:text-gray-500" />
            <select className="w-full px-4 py-2 rounded border-2 border-green-300 bg-white">
              <option>Interested in...</option>
              <option>Adaptogens</option>
              <option>Vitamins</option>
              <option>Proteins</option>
              <option>Teas</option>
              <option>Bundles</option>
            </select>
            <button className="w-full py-3 font-black rounded text-white" style={{ background: "#166534" }}>
              SUBSCRIBE
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
