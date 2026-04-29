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
import { Progress } from "@/components/ui/progress"
import { Menu, X, ShoppingCart, Zap, Dumbbell, Package, Badge as BadgeIcon, TrendingUp } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const step = target / (duration / 16)
    const t = setInterval(() => setCount(c => { const next = c + step; if (next >= target) { clearInterval(t); return target; } return next; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{Math.floor(count).toLocaleString()}{suffix}</span>
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
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`cursor-pointer transition-all duration-200 ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default function VertxFitness() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const timer = setTimeout(() => setLoadingProgress(100), 800)
    return () => clearTimeout(timer)
  }, [])

  const products = {
    racks: [
      { id: 1, name: "Power Rack Pro", price: "$1,299", specs: "2x2\" steel, 1000lb capacity" },
      { id: 2, name: "Squat Rack Elite", price: "$899", specs: "11-gauge, safety bars" },
      { id: 3, name: "Half Rack Plus", price: "$599", specs: "Compact, 800lb capacity" },
      { id: 4, name: "Bench Combo", price: "$799", specs: "Adjustable 7-position" },
      { id: 5, name: "Smith Machine Pro", price: "$1,499", specs: "Guided motion system" },
      { id: 6, name: "Functional Trainer", price: "$2,499", specs: "Dual stack 300lb each" },
      { id: 7, name: "Multi-Station", price: "$3,999", specs: "8-station comprehensive" },
      { id: 8, name: "Cable Machine", price: "$1,799", specs: "Single stack 300lb" },
    ],
    dumbbells: [
      { id: 9, name: "EcoFlex Dumbbell Set", price: "$599", specs: "5-50lb pairs" },
      { id: 10, name: "Adjustable Dumbbells", price: "$399", specs: "5-25lb per hand" },
      { id: 11, name: "Rubber Hex Pairs", price: "$199", specs: "10-100lb" },
    ],
  }

  const features = [
    { icon: <Zap className="w-6 h-6" />, name: "SmartCoach™", desc: "AI-powered form analysis" },
    { icon: <TrendingUp className="w-6 h-6" />, name: "HydraSteel™", desc: "Advanced alloy durability" },
    { icon: <Dumbbell className="w-6 h-6" />, name: "EcoFlex™", desc: "100% sustainable material" },
    { icon: <Badge as="div" className="w-6 h-6" />, name: "ConnectSync™", desc: "App integration suite" },
  ]

  const programs = [
    { name: "Strength 101", level: "Beginner", duration: "8 weeks", equipment: "Rack, Dumbbells" },
    { name: "Hypertrophy Build", level: "Intermediate", duration: "12 weeks", equipment: "Full setup" },
    { name: "Power & Conditioning", level: "Advanced", duration: "16 weeks", equipment: "Complete station" },
    { name: "Powerlifting Prep", level: "Advanced", duration: "20 weeks", equipment: "Competition gear" },
    { name: "CrossFit Fusion", level: "Intermediate", duration: "10 weeks", equipment: "Cardio + weights" },
    { name: "Recovery & Mobility", level: "All", duration: "6 weeks", equipment: "Minimal gear" },
  ]

  const stats = [
    { num: 50000, label: "Athletes Using VERTX" },
    { num: 30, label: "Countries Served" },
    { num: 4.9, suffix: "★", label: "Customer Rating" },
    { num: 25, suffix: " year", label: "Warranty" },
  ]

  return (
    <div style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#090909] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        body { font-family: 'Sora', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Space Mono', monospace; font-weight: bold; }
      `}</style>

      {/* Mobile Nav */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button className="fixed top-6 left-6 z-50 md:hidden cursor-pointer transition-all duration-200 bg-white/10 backdrop-blur p-2 rounded-lg hover:bg-white/20">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#1a1a1a] border-[#dc2626]/20">
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="#products" className="text-lg font-semibold text-[#dc2626] cursor-pointer hover:text-white">Products</Link>
            <Link href="#features" className="text-lg font-semibold text-[#dc2626] cursor-pointer hover:text-white">Features</Link>
            <Link href="#programs" className="text-lg font-semibold text-[#dc2626] cursor-pointer hover:text-white">Programs</Link>
            <Link href="#faq" className="text-lg font-semibold text-[#dc2626] cursor-pointer hover:text-white">FAQ</Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero with Loading Bar */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" alt="Gym Equipment" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Animated Loading Bar */}
        <motion.div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-[#dc2626] via-white to-[#dc2626]"
          initial={{ width: "0%" }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 2 }}
        />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4">
              <Badge className="bg-[#dc2626] text-white text-xs">NEW COLLECTION</Badge>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">VERTX</h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-[#dc2626] w-32 mx-auto mb-8"
            />
            <p className="text-xl md:text-2xl text-white/90 mb-8 uppercase tracking-wider">BUILD YOUR BEST</p>
            <MagneticBtn className="px-8 py-4 bg-[#dc2626] text-white rounded-none font-bold hover:bg-[#991818] uppercase tracking-wider">Shop Now</MagneticBtn>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-white mb-4 uppercase">Equipment</h2>
          <p className="text-lg text-[#999] mb-12">Premium strength training solutions for serious athletes</p>
        </Reveal>

        <Tabs defaultValue="racks" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-[#dc2626]/20 rounded-none p-1">
            <TabsTrigger value="racks" className="cursor-pointer uppercase text-xs">Racks</TabsTrigger>
            <TabsTrigger value="dumbbells" className="cursor-pointer uppercase text-xs">Dumbbells</TabsTrigger>
            <TabsTrigger value="cardio" className="cursor-pointer uppercase text-xs">Cardio</TabsTrigger>
            <TabsTrigger value="accessories" className="cursor-pointer uppercase text-xs">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="racks" className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.racks.map((prod, idx) => (
                <Reveal key={prod.id} delay={idx * 0.08}>
                  <Card className="bg-white/5 border-[#dc2626]/20 hover:border-[#dc2626]/60 hover:shadow-2xl hover:scale-105 cursor-pointer transition-all duration-300 group overflow-hidden"
                    onClick={() => { setSelectedProduct(prod); setDialogOpen(true); }}>
                    <CardContent className="p-6">
                      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-[#1a1a1a] group-hover:bg-[#2a2a2a] transition-colors">
                        <Image src={`https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop`} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="font-bold text-white mb-2 uppercase text-sm">{prod.name}</h3>
                      <p className="text-xs text-[#999] mb-4">{prod.specs}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[#dc2626]">{prod.price}</span>
                        <button className="p-2 bg-[#dc2626] text-white rounded-none hover:bg-[#991818] transition-all cursor-pointer">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dumbbells" className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.dumbbells.map((prod, idx) => (
                <Reveal key={prod.id} delay={idx * 0.1}>
                  <Card className="bg-white/5 border-[#dc2626]/20 hover:border-[#dc2626]/60 cursor-pointer transition-all duration-300 group overflow-hidden">
                    <CardContent className="p-6">
                      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-[#1a1a1a]">
                        <Image src={`https://images.unsplash.com/photo-1638801429407-f5f06e9c9c13?q=80&w=400&auto=format&fit=crop`} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="font-bold text-white mb-2 uppercase text-sm">{prod.name}</h3>
                      <p className="text-xs text-[#999] mb-4">{prod.specs}</p>
                      <span className="text-lg font-bold text-[#dc2626]">{prod.price}</span>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto bg-white/5 rounded-2xl">
        <Reveal>
          <h2 className="text-5xl font-bold text-white mb-12 uppercase">Innovation</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white/5 border-[#dc2626]/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#dc2626] rounded-none flex items-center justify-center mb-4 text-white">
                    {feat.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2 uppercase text-sm">{feat.name}</h3>
                  <Badge variant="outline" className="border-[#dc2626] text-[#dc2626] text-xs">{feat.desc}</Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div>
                <p className="text-5xl font-bold text-[#dc2626] mb-2"><Counter target={stat.num} suffix={stat.suffix || ""} /></p>
                <p className="text-[#999] uppercase text-sm font-semibold tracking-wider">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-white mb-12 uppercase">Training Programs</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {programs.map((prog, idx) => (
            <AccordionItem key={idx} value={`prog-${idx}`} className="border border-[#dc2626]/20 rounded-none px-6 bg-white/5">
              <AccordionTrigger className="text-white font-bold cursor-pointer hover:text-[#dc2626] transition-colors uppercase text-sm">
                <div className="flex justify-between w-full items-center">
                  <span>{prog.name}</span>
                  <Badge variant="outline" className="border-[#dc2626] text-[#dc2626] text-xs ml-4">{prog.level}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[#999]">
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs font-semibold text-[#dc2626] uppercase mb-1">Duration</p>
                    <p className="text-white">{prog.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#dc2626] uppercase mb-1">Equipment</p>
                    <p className="text-white text-sm">{prog.equipment}</p>
                  </div>
                  <button className="px-4 py-2 bg-[#dc2626] text-white rounded-none hover:bg-[#991818] transition-all font-semibold uppercase text-xs cursor-pointer">Start</button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-white mb-12 uppercase">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "What's the shipping timeframe?", a: "Orders ship within 3-5 business days. Delivery typically 7-14 days depending on location." },
            { q: "Do you offer assembly service?", a: "Yes. Premium assembly available for $149-$299 depending on equipment complexity." },
            { q: "What's your warranty coverage?", a: "25-year structural warranty on all equipment. Covers defects in materials and craftsmanship." },
            { q: "Do you offer financing?", a: "Yes. 0% APR financing available for purchases over $2,000 with approved credit." },
            { q: "Can I return equipment?", a: "30-day return window. Free return shipping on defective items. Restocking fee 10% on returns." },
            { q: "Do you have showrooms?", a: "Yes. We have demo spaces in major cities where you can test equipment before purchase." },
          ].map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border border-[#dc2626]/20 rounded-none px-6 bg-white/5">
              <AccordionTrigger className="text-white font-bold cursor-pointer hover:text-[#dc2626] transition-colors">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-[#999]">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#dc2626] to-[#991818] rounded-none p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4 uppercase">Start Your Transformation</h2>
            <p className="text-lg mb-8 opacity-90">Build the home gym of champions. Free trial included.</p>
            <MagneticBtn className="px-8 py-3 bg-white text-[#dc2626] rounded-none font-bold hover:bg-[#f0f0f0] uppercase tracking-wider">Get Free Trial</MagneticBtn>
          </div>
        </Reveal>
      </section>

      {/* Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#dc2626]/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white uppercase tracking-wider">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image src={`https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop`} alt={selectedProduct.name} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-white font-bold text-2xl">{selectedProduct.price}</p>
                  <Badge className="bg-[#dc2626] text-white">In Stock</Badge>
                </div>
                <p className="text-[#999]">{selectedProduct.specs}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="number" placeholder="Quantity" defaultValue="1" className="px-4 py-2 bg-white/10 border border-[#dc2626]/20 rounded-none text-white" />
                  <button className="px-4 py-2 bg-[#dc2626] text-white rounded-none hover:bg-[#991818] font-bold uppercase cursor-pointer">Add to Cart</button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-black border-t border-[#dc2626]/20 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4 uppercase font-bold tracking-wider text-white">VERTX FITNESS</p>
          <p className="text-sm text-[#666]">Premium equipment for serious athletes © 2024</p>
        </div>
      </footer>
    </div>
  )
}
