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
  { id: 1, name: "Cedarwood Chair", category: "Furniture", material: "Solid Oak", score: 95, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
  { id: 2, name: "Linen Throw", category: "Textiles", material: "100% Linen", score: 92, img: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500" },
  { id: 3, name: "Pendant Light", category: "Lighting", material: "Brass & Glass", score: 98, img: "https://images.unsplash.com/photo-1565193566173-7ace0ee75587?w=500" },
  { id: 4, name: "Ceramic Bowl Set", category: "Decor", material: "Handmade Clay", score: 96, img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500" },
  { id: 5, name: "Wool Rug", category: "Textiles", material: "Organic Wool", score: 94, img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500" },
  { id: 6, name: "Kitchen Knives", category: "Kitchen", material: "Stainless Steel", score: 97, img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500" },
  { id: 7, name: "Plant Pot", category: "Decor", material: "Terracotta", score: 90, img: "https://images.unsplash.com/photo-1578914328862-85c6ff4e4b64?w=500" },
  { id: 8, name: "Floor Lamp", category: "Lighting", material: "Oak & Linen", score: 99, img: "https://images.unsplash.com/photo-1565182999555-f51a37a3eb7d?w=500" },
]

const ROOMS = [
  { id: 1, name: "Minimalist Living", tags: ["Scandinavian", "Neutral"], img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" },
  { id: 2, name: "Warm Kitchen", tags: ["Rustic", "Functional"], img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600" },
  { id: 3, name: "Cozy Bedroom", tags: ["Comfort", "Sustainable"], img: "https://images.unsplash.com/photo-1587474260584-136574528b8f?w=600" },
  { id: 4, name: "Garden Retreat", tags: ["Outdoor", "Natural"], img: "https://images.unsplash.com/photo-1585806998841-0dd09ac53bc6?w=600" },
]

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Interior Designer", quote: "HABITAT transformed my design workflow. Quality is impeccable.", avatar: "SC" },
  { name: "James Wilson", role: "Architect", quote: "Each piece tells a story. Sustainability without compromise.", avatar: "JW" },
  { name: "Marina Rodriguez", role: "Homeowner", quote: "Finally furniture that lasts. Beautiful and responsible.", avatar: "MR" },
]

export default function HabitatPage() {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null)
  const [consultationOpen, setConsultationOpen] = useState(false)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a1209]">
      {/* Hero with Parallax */}
      <section className="relative h-[100vh] overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600"
            alt="Hero"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf6f0] via-transparent to-transparent" />
        <div className="relative h-full flex items-end pb-16 px-8 md:px-16 z-10">
          <Reveal>
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-bold text-[#1a1209] mb-6 leading-tight">
                Habitat
              </h1>
              <p className="text-xl text-[#6b8f71] mb-8">
                Sustainable living for the modern home. Every piece crafted with intention.
              </p>
              <motion.button className="px-8 py-4 bg-[#c2714f] text-white font-semibold rounded-lg hover:bg-[#b05f3f] transition">
                Explore Collection
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-[#1a1209]">Shop by Category</h2>
        </Reveal>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-12 bg-[#f0ebe4] p-2 rounded-lg">
            {["All", "Furniture", "Textiles", "Lighting", "Kitchen"].map(cat => (
              <TabsTrigger key={cat} value={cat.toLowerCase()} className="data-[state=active]:bg-[#c2714f] data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {["all", "furniture", "textiles", "lighting", "kitchen"].map(cat => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {PRODUCTS.filter(p => cat === "all" || p.category.toLowerCase() === cat).map((prod, i) => (
                  <Reveal key={prod.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProduct(prod)}
                    >
                      <div className="relative h-64 mb-4 rounded-xl overflow-hidden bg-[#f0ebe4]">
                        <Image src={prod.img} alt={prod.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
                        <button
                          onClick={(e) => { e.stopPropagation(); setWishlist(w => w.includes(prod.id) ? w.filter(x => x !== prod.id) : [...w, prod.id]) }}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
                        >
                          <span className="text-xl">{wishlist.includes(prod.id) ? "♥" : "♡"}</span>
                        </button>
                      </div>
                      <div className="space-y-2">
                        <Badge className="bg-[#6b8f71] text-white">{prod.category}</Badge>
                        <h3 className="font-semibold text-lg text-[#1a1209]">{prod.name}</h3>
                        <p className="text-sm text-[#6b8f71]">{prod.material}</p>
                        <div className="flex items-center gap-2 pt-2">
                          <Progress value={prod.score} className="flex-1" />
                          <span className="text-sm font-semibold text-[#c2714f]">{prod.score}%</span>
                        </div>
                      </div>
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
        <DialogContent className="max-w-2xl bg-[#faf6f0]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1209]">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#6b8f71] mb-2">Material & Craftsmanship</p>
                  <p className="font-semibold text-[#1a1209]">{selectedProduct.material}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6b8f71] mb-2">Sustainability Score</p>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedProduct.score} className="flex-1" />
                    <span className="font-semibold text-[#c2714f]">{selectedProduct.score}%</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#c2714f]/20">
                  <p className="text-[#6b8f71]">FSC certified. Carbon-neutral shipping. 5-year warranty.</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Room Inspiration */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-[#1a1209]">Room Inspiration</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {ROOMS.map((room, i) => (
              <CarouselItem key={room.id} className="md:basis-1/2">
                <Reveal delay={i * 0.1}>
                  <div className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer">
                    <Image src={room.img} alt={room.name} fill className="object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <h3 className="text-2xl font-bold text-white mb-3">{room.name}</h3>
                      <div className="flex gap-2 flex-wrap">
                        {room.tags.map(tag => (
                          <Badge key={tag} className="bg-[#c2714f]/90 text-white cursor-pointer hover:bg-[#c2714f]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2" />
          <CarouselNext className="absolute right-0 top-1/2" />
        </Carousel>
      </section>

      {/* Sustainability */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-12 text-[#1a1209]">Our Commitment</h2>
        </Reveal>
        <Accordion defaultValue="item-0" className="space-y-4">
          {["Sourcing", "Manufacturing", "Packaging", "Shipping", "Returns"].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-[#c2714f]/20 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-[#1a1209] hover:text-[#c2714f]">
                {item}
              </AccordionTrigger>
              <AccordionContent className="text-[#6b8f71]">
                We partner with suppliers who share our values. Every material is traceable, sustainably harvested, and ethically sourced. Our facility runs on 100% renewable energy, and we offset all shipping emissions.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 md:px-16 bg-[#6b8f71]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { number: 200, label: "Customers", suffix: "K+" },
            { number: 500, label: "Products", suffix: "" },
            { number: 100, label: "Carbon Neutral", suffix: "%" },
            { number: 49, label: "Rating", suffix: "★" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#c2714f] mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-[#6b8f71] font-semibold">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Design Consultation */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-12 text-[#1a1209]">Design Consultation</h2>
          <p className="text-xl text-[#6b8f71] mb-12">Our process in 3 steps:</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { step: "1", title: "Discovery", desc: "We learn about your lifestyle and space" },
            { step: "2", title: "Curation", desc: "We select pieces that fit your needs" },
            { step: "3", title: "Styling", desc: "We bring it together harmoniously" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="border-[#c2714f]/20 bg-white">
                <CardContent className="pt-8 space-y-4">
                  <div className="text-5xl font-bold text-[#c2714f]">{item.step}</div>
                  <h3 className="text-xl font-semibold text-[#1a1209]">{item.title}</h3>
                  <p className="text-[#6b8f71]">{item.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <MagneticBtn
          onClick={() => setConsultationOpen(true)}
          className="px-8 py-4 bg-[#c2714f] text-white font-semibold rounded-lg hover:bg-[#b05f3f] transition w-full md:w-auto"
        >
          Book a Consultation
        </MagneticBtn>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-16 bg-[#f0ebe4]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16 text-[#1a1209]">Loved by Designers</h2>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((test, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.1}>
                    <Card className="border-[#c2714f]/20 bg-white">
                      <CardContent className="pt-8 space-y-6">
                        <p className="text-lg italic text-[#6b8f71]">"{test.quote}"</p>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-[#c2714f] text-white">{test.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-[#1a1209]">{test.name}</p>
                            <p className="text-sm text-[#6b8f71]">{test.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 md:px-16 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-12 text-[#1a1209]">Frequently Asked</h2>
        </Reveal>
        <Accordion className="space-y-4">
          {["How long does delivery take?", "Can I assemble it myself?", "What's your return policy?", "Do you offer custom orders?"].map((q, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-[#c2714f]/20 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-[#1a1209] hover:text-[#c2714f]">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-[#6b8f71]">
                We provide detailed care instructions with every purchase. Our team is always happy to help via email or phone.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Consultation Dialog */}
      <Dialog open={consultationOpen} onOpenChange={setConsultationOpen}>
        <DialogContent className="max-w-md bg-[#faf6f0]">
          <DialogHeader>
            <DialogTitle className="text-[#1a1209]">Interior Consultation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-[#6b8f71]">Let's create your perfect space. Fill in a few details and we'll be in touch within 24 hours.</p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-[#c2714f]/20 rounded-lg focus:outline-none focus:border-[#c2714f]"
            />
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border border-[#c2714f]/20 rounded-lg focus:outline-none focus:border-[#c2714f]"
            />
            <MagneticBtn className="w-full py-3 bg-[#c2714f] text-white font-semibold rounded-lg hover:bg-[#b05f3f] transition">
              Request Consultation
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
