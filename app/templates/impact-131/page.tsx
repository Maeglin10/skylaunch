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

const PRODUCTS = [
  { id: 1, name: "Aria Pendant", category: "Pendants", lumens: "800", temp: "2700K-5000K", smart: true, img: "https://images.unsplash.com/photo-1565182999555-f51a37a3eb7d?w=500" },
  { id: 2, name: "Solaris Floor", category: "Floor Lamps", lumens: "1200", temp: "3000K", smart: true, img: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500" },
  { id: 3, name: "Ember Wall", category: "Wall Sconces", lumens: "600", temp: "Warm", smart: false, img: "https://images.unsplash.com/photo-1567095761054-7ce3e73adfda?w=500" },
  { id: 4, name: "Nightfall Outdoor", category: "Outdoor", lumens: "500", temp: "Neutral", smart: true, img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500" },
  { id: 5, name: "Aurora Smart Hub", category: "Smart Systems", lumens: "System", temp: "All", smart: true, img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500" },
  { id: 6, name: "Moonlight Wall", category: "Wall Sconces", lumens: "450", temp: "2700K", smart: false, img: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500" },
  { id: 7, name: "Zenith Track", category: "Lighting", lumens: "900", temp: "4000K", smart: true, img: "https://images.unsplash.com/photo-1567095761054-7ce3e73adfda?w=500" },
  { id: 8, name: "Infinity Chandelier", category: "Pendants", lumens: "1500", temp: "Tunable", smart: true, img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500" },
]

const COLLABS = [
  { designer: "Nendo Studio", piece: "Geometric Serenity", avatar: "NS" },
  { designer: "Tom Dixon", piece: "Industrial Elegance", avatar: "TD" },
  { designer: "Yabu Pushelberg", piece: "Architectural Grace", avatar: "YP" },
]

const TESTIMONIALS = [
  { name: "Isabella Romano", role: "Architect", quote: "Luminos lighting is the soul of our spaces." },
  { name: "James Pettitt", role: "Interior Designer", quote: "The only brand our premium clients accept." },
  { name: "Elena Volkov", role: "Project Manager", quote: "Smart controls that just disappear." },
]

export default function LuminosPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null)
  const [customOpen, setCustomOpen] = useState(false)
  const [showroomOpen, setShowroomOpen] = useState(false)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <div className="min-h-screen bg-[#08080a] text-[#fdf8f0]">
      {/* Dramatic Hero */}
      <section className="relative h-[100vh] overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-209977?w=800&q=80"
            alt="Dramatic Lighting"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-transparent to-[#08080a]/80" />
        <div className="relative h-full flex items-center px-8 md:px-16 z-10">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[#d4a017] mb-4 uppercase tracking-widest text-sm font-light">Luxury Lighting Design</p>
              <h1 className="text-6xl md:text-8xl font-light text-[#fdf8f0] mb-6 leading-tight">LUMINOS</h1>
              <p className="text-2xl text-[#fdf8f0]/70 mb-8 font-light">
                Light that transforms. Intelligence that listens. Design that endures.
              </p>
              <motion.button className="px-8 py-4 border-2 border-[#d4a017] text-[#d4a017] font-light uppercase tracking-wider hover:bg-[#d4a017] hover:text-[#08080a] transition">
                Explore Designs
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product Collections */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-[#fdf8f0]">Collections</h2>
        </Reveal>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-12 bg-[#1e293b] p-2 rounded-none">
            {["All", "Pendants", "Floor", "Wall", "Outdoor", "Smart"].map(cat => (
              <TabsTrigger
                key={cat}
                value={cat.toLowerCase()}
                className="data-[state=active]:bg-[#d4a017] data-[state=active]:text-black text-xs md:text-sm"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {["all", "pendants", "floor", "wall", "outdoor", "smart"].map(cat => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {PRODUCTS.filter(p => cat === "all" || p.category.toLowerCase().includes(cat)).map((prod, i) => (
                  <Reveal key={prod.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -12 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProduct(prod)}
                    >
                      <div className="relative h-72 mb-4 rounded-lg overflow-hidden bg-[#1e293b] border border-[#d4a017]/20 group-hover:border-[#d4a017]">
                        <Image src={prod.img} alt={prod.name} fill className="object-cover group-hover:scale-110 transition duration-500" />
                      </div>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <Badge className="bg-[#d4a017]/80 text-black text-xs">{prod.lumens} lm</Badge>
                        {prod.smart && <Badge className="bg-[#d4a017]/40 text-white text-xs">Smart</Badge>}
                      </div>
                      <h3 className="text-lg font-light text-[#fdf8f0] mb-2">{prod.name}</h3>
                      <p className="text-sm text-[#d4a017]/70 mb-2">Color Temp: {prod.temp}</p>
                      <p className="text-xs text-[#fdf8f0]/40 font-light">{prod.category}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl bg-[#1e293b] border border-[#d4a017]/30">
          <DialogHeader>
            <DialogTitle className="text-[#d4a017]">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="relative h-80 rounded-lg overflow-hidden bg-[#08080a]">
                <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
              </div>
              <Carousel className="w-full">
                <CarouselContent>
                  {[1, 2, 3].map(i => (
                    <CarouselItem key={i} className="md:basis-1/2">
                      <div className="relative h-48 bg-[#08080a] rounded-lg border border-[#d4a017]/20">
                        <Image
                          src={`https://images.unsplash.com/photo-${1565814000000 + i * 50000}?w=500`}
                          alt="Room setting"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-[#d4a017]" />
                <CarouselNext className="text-[#d4a017]" />
              </Carousel>
              <div className="space-y-4 pt-4 border-t border-[#d4a017]/20">
                <div>
                  <p className="text-sm text-[#d4a017]/60 mb-2">Specifications</p>
                  <ul className="space-y-2 text-[#fdf8f0]/70 text-sm font-light">
                    <li>Lumens: {selectedProduct.lumens}</li>
                    <li>Color Temperature: {selectedProduct.temp}</li>
                    <li>Smart Home: {selectedProduct.smart ? "HomeKit, Alexa, Google Home" : "No"}</li>
                    <li>Material: Precision-cast brass & frosted glass</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Smart Home Integration */}
      <section className="py-24 px-8 md:px-16 bg-[#1e293b]/50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-light mb-12 text-[#fdf8f0]">Smart Home Compatible</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {["HomeKit", "Alexa", "Google Home", "Matter"].map((platform, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="bg-[#08080a] border-[#d4a017]/20">
                  <CardContent className="pt-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#d4a017]/10 flex items-center justify-center mx-auto">
                      <span className="text-2xl">🔌</span>
                    </div>
                    <p className="font-light text-[#fdf8f0]">{platform}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Designer Collaborations */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-16 text-[#fdf8f0]">Collaborations</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {COLLABS.map((collab, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Reveal>
                  <div className="relative h-96 rounded-lg overflow-hidden border border-[#d4a017]/20 group">
                    <Image
                      src={`https://images.unsplash.com/photo-${1543000000000 + i * 100000}?w=600`}
                      alt={collab.piece}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12 border-2 border-[#d4a017]">
                          <AvatarFallback className="bg-[#d4a017] text-black font-light">{collab.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-light text-[#fdf8f0]">{collab.designer}</p>
                          <p className="text-xs text-[#d4a017] font-light">{collab.piece}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-[#d4a017]" />
          <CarouselNext className="text-[#d4a017]" />
        </Carousel>
      </section>

      {/* Customization */}
      <section className="py-32 px-8 md:px-16 bg-[#1e293b]/30">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl font-light mb-8 text-[#fdf8f0]">Bespoke Customization</h2>
            <p className="text-xl text-[#fdf8f0]/60 mb-12 font-light">
              Design your perfect light. Choose shape, finish, and size from limitless combinations.
            </p>
          </Reveal>
          <MagneticBtn
            onClick={() => setCustomOpen(true)}
            className="px-8 py-4 border-2 border-[#d4a017] text-[#d4a017] font-light uppercase tracking-wider hover:bg-[#d4a017] hover:text-[#08080a] transition"
          >
            Configure Your Design
          </MagneticBtn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { number: 50, label: "Installations", suffix: "K+" },
            { number: 20, label: "Years", suffix: "" },
            { number: 40, label: "Countries", suffix: "" },
            { number: 49, label: "Rating", suffix: "★" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-5xl font-light text-[#d4a017] mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-[#fdf8f0]/60 font-light">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* B2B Trade Program */}
      <section className="py-32 px-8 md:px-16 bg-[#1e293b]/50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-light mb-12 text-[#fdf8f0]">Interior Designer Program</h2>
          </Reveal>
          <Tabs defaultValue="trade" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-[#08080a] p-2 rounded-none">
              {["Trade Program", "Project Pricing", "Samples"].map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(" ", "")}
                  className="data-[state=active]:bg-[#d4a017] data-[state=active]:text-black"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {[
              { label: "Trade Program", content: "Exclusive 40% discount on bulk orders. Free design consulting. Priority production." },
              { label: "Project Pricing", content: "Customized pricing for 20+ unit projects. White-glove project management." },
              { label: "Samples", content: "Free sample library. Try before you specify. Expedited shipping available." },
            ].map(tab => (
              <TabsContent key={tab.label} value={tab.label.toLowerCase().replace(" ", "")}>
                <Reveal>
                  <Card className="bg-[#08080a] border-[#d4a017]/20">
                    <CardContent className="pt-8 space-y-4">
                      <p className="text-lg text-[#fdf8f0]/70 font-light">{tab.content}</p>
                      <motion.button className="text-[#d4a017] font-light underline hover:no-underline">
                        Learn More →
                      </motion.button>
                    </CardContent>
                  </Card>
                </Reveal>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-light mb-16 text-[#fdf8f0]">Designer Stories</h2>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((test, i) => (
                <CarouselItem key={i} className="md:basis-1/2">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#1e293b] border-[#d4a017]/20">
                      <CardContent className="pt-8 space-y-6">
                        <p className="text-xl italic font-light text-[#fdf8f0]/70">"{test.quote}"</p>
                        <div>
                          <p className="font-light text-[#d4a017]">{test.name}</p>
                          <p className="text-sm text-[#fdf8f0]/40 font-light">{test.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-[#d4a017]" />
            <CarouselNext className="text-[#d4a017]" />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-8 md:px-16 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-light mb-12 text-[#fdf8f0]">FAQ</h2>
        </Reveal>
        <Accordion className="space-y-4">
          {["How do I install Luminos lights?", "Can I dim the lights?", "Smart home setup?", "What's your warranty?"].map((q, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-[#d4a017]/20 rounded-none px-6">
              <AccordionTrigger className="text-lg font-light text-[#fdf8f0] hover:text-[#d4a017]">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-[#fdf8f0]/60 font-light">
                Every Luminos fixture comes with comprehensive installation guides and lifetime technical support from our engineers.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Customization Dialog */}
      <Dialog open={customOpen} onOpenChange={setCustomOpen}>
        <DialogContent className="max-w-md bg-[#1e293b] border border-[#d4a017]/30">
          <DialogHeader>
            <DialogTitle className="text-[#d4a017]">Design Your Fixture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#d4a017]/60 mb-2 font-light">Shape</p>
              <select className="w-full px-4 py-2 bg-[#08080a] border border-[#d4a017]/20 rounded-none text-[#fdf8f0] focus:outline-none focus:border-[#d4a017]">
                <option>Pendant</option>
                <option>Floor Lamp</option>
                <option>Wall Sconce</option>
                <option>Chandelier</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-[#d4a017]/60 mb-2 font-light">Finish</p>
              <div className="flex gap-2">
                {["Brass", "Matte Black", "Chrome", "Gold"].map(f => (
                  <button key={f} className="px-3 py-2 border border-[#d4a017]/20 rounded-none text-xs font-light text-[#fdf8f0] hover:border-[#d4a017] transition">
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-[#d4a017]/60 mb-2 font-light">Size</p>
              <select className="w-full px-4 py-2 bg-[#08080a] border border-[#d4a017]/20 rounded-none text-[#fdf8f0] focus:outline-none focus:border-[#d4a017]">
                <option>Small (30cm)</option>
                <option>Medium (45cm)</option>
                <option>Large (60cm)</option>
                <option>Custom</option>
              </select>
            </div>
            <MagneticBtn className="w-full py-3 border-2 border-[#d4a017] text-[#d4a017] font-light rounded-none hover:bg-[#d4a017] hover:text-[#08080a] transition">
              Get Price Quote
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>

      {/* Showroom Booking */}
      <section className="py-32 px-8 md:px-16 bg-black text-[#fdf8f0]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl font-light mb-8">Visit Our Showrooms</h2>
            <p className="text-xl text-[#fdf8f0]/60 mb-12 font-light">
              Experience Luminos in person. Book a private consultation with our lighting experts.
            </p>
          </Reveal>
          <MagneticBtn
            onClick={() => setShowroomOpen(true)}
            className="px-8 py-4 border-2 border-[#d4a017] text-[#d4a017] font-light uppercase tracking-wider hover:bg-[#d4a017] hover:text-black transition"
          >
            Book Showroom Visit
          </MagneticBtn>
        </div>
      </section>

      {/* Showroom Dialog */}
      <Dialog open={showroomOpen} onOpenChange={setShowroomOpen}>
        <DialogContent className="max-w-md bg-[#1e293b] border border-[#d4a017]/30">
          <DialogHeader>
            <DialogTitle className="text-[#d4a017]">Schedule Showroom Visit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <select className="w-full px-4 py-2 bg-[#08080a] border border-[#d4a017]/20 rounded-none text-[#fdf8f0] focus:outline-none focus:border-[#d4a017]">
              <option>New York</option>
              <option>Los Angeles</option>
              <option>London</option>
              <option>Tokyo</option>
              <option>Milan</option>
            </select>
            <input
              type="date"
              className="w-full px-4 py-2 bg-[#08080a] border border-[#d4a017]/20 rounded-none text-[#fdf8f0] focus:outline-none focus:border-[#d4a017]"
            />
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-[#08080a] border border-[#d4a017]/20 rounded-none text-[#fdf8f0] placeholder-gray-500 focus:outline-none focus:border-[#d4a017]"
            />
            <MagneticBtn className="w-full py-3 bg-[#d4a017] text-black font-light rounded-none hover:bg-[#e5b020] transition">
              Book Appointment
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
