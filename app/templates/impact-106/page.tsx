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

const PRODUCTS = [
  { id: 1, name: "Notebooks", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop", variants: 8 },
  { id: 2, name: "Cards", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop", variants: 12 },
  { id: 3, name: "Journals", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop", variants: 6 },
  { id: 4, name: "Gift Wrap", image: "https://images.unsplash.com/photo-1577720643272-265f434e5a08?w=600&auto=format&fit=crop", variants: 15 },
  { id: 5, name: "Custom", image: "https://images.unsplash.com/photo-1616043512151-1c0fdc4b4e4d?w=600&auto=format&fit=crop", variants: "∞" },
]

const GIFTWRAP = [
  { name: "Forest Sage", image: "https://images.unsplash.com/photo-1577720643272-265f434e5a08?w=300&auto=format&fit=crop" },
  { name: "Ocean Blue", image: "https://images.unsplash.com/photo-1599598810694-b5ac4dd33cad?w=300&auto=format&fit=crop" },
  { name: "Gold Luxury", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&auto=format&fit=crop" },
]

const TESTIMONIALS = [
  { text: "The quality is exceptional. Every detail matters.", author: "Eleanor R." },
  { text: "Finally, stationery that feels like an investment.", author: "Marcus T." },
]

const WHOLESALE = [
  { tier: "Standard", moq: "500 units", lead: "8 weeks", discount: "20% off" },
  { tier: "Premium", moq: "1000 units", lead: "10 weeks", discount: "25% off" },
  { tier: "Custom", moq: "Negotiable", lead: "12-16 weeks", discount: "Custom" },
]

export default function PressedBoundPage() {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [isProductOpen, setIsProductOpen] = useState(false)
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen" style={{ background: "#faf7f2" }}>
      {/* Hero with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1600&auto=format&fit=crop"
          alt="Pressed & Bound"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <motion.div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-7xl md:text-8xl font-light text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>PRESSED & BOUND</h1>
            <p className="text-xl text-white/80">Artisan Stationery • Handcrafted Excellence • Sustainable Design</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Shop Tabs */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#faf7f2" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-16" style={{ color: "#1e3a5f" }}>Shop Collections</h2>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-12" style={{ background: "transparent" }}>
                {PRODUCTS.map((p, idx) => (
                  <TabsTrigger key={idx} value={`${idx}`} style={{ color: "#c9a84c" }}>
                    {p.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {PRODUCTS.map((product, idx) => (
                <TabsContent key={idx} value={`${idx}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(idx)
                        setIsProductOpen(true)
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={400}
                        className="w-full rounded-lg"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-4xl font-light mb-6" style={{ color: "#1e3a5f" }}>{product.name}</h3>
                      <div className="space-y-4 mb-8">
                        <div>
                          <p className="text-sm opacity-60" style={{ color: "#7d9b76" }}>Available Variants</p>
                          <p className="text-2xl font-light" style={{ color: "#1e3a5f" }}>{product.variants} options</p>
                        </div>
                        <p style={{ color: "#7d9b76" }}>Hand-selected papers, premium finishes, and sustainable materials for the discerning stationer.</p>
                      </div>
                      <Dialog>
                        <motion.button
                          className="w-full px-8 py-4 font-light text-white"
                          style={{ background: "#c9a84c" }}
                          whileHover={{ scale: 1.02 }}
                        >
                          View Details
                        </motion.button>
                        <DialogContent style={{ background: "#faf7f2" }}>
                          <DialogHeader>
                            <DialogTitle>{product.name} Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm opacity-60">Paper Weight</p>
                              <p className="text-lg">120-300 gsm premium stock</p>
                            </div>
                            <div>
                              <p className="text-sm opacity-60">Texture Options</p>
                              <p className="text-lg">Smooth, laid, wove, felt finishes</p>
                            </div>
                            <button className="w-full py-3 text-white font-light" style={{ background: "#c9a84c" }}>Add to Cart</button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Reveal>
      </section>

      {/* Customization Wizard */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#e8e0d5" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-center" style={{ color: "#1e3a5f" }}>Custom Creations</h2>
            <div className="bg-white p-12 rounded-lg">
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`h-2 flex-1 mx-1 rounded ${s <= step ? "bg-c9a84c" : "bg-gray-200"}`} style={{ background: s <= step ? "#c9a84c" : "#e8e0d5" }} />
                  ))}
                </div>
              </div>

              <Dialog>
                <div className="space-y-6">
                  {step === 1 && (
                    <div>
                      <h3 className="text-2xl font-light mb-4" style={{ color: "#1e3a5f" }}>Choose Cover</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {["Leather", "Linen", "Vegan"].map(opt => (
                          <button key={opt} className="p-4 border-2 rounded" style={{ borderColor: "#c9a84c" }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      <motion.button onClick={() => setStep(2)} className="w-full mt-6 py-3 text-white font-light" style={{ background: "#c9a84c" }}>Next</motion.button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="text-2xl font-light mb-4" style={{ color: "#1e3a5f" }}>Select Paper</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {["Smooth", "Laid", "Felt"].map(opt => (
                          <button key={opt} className="p-4 border-2 rounded" style={{ borderColor: "#c9a84c" }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-6">
                        <motion.button onClick={() => setStep(1)} className="flex-1 py-3 font-light border-2" style={{ borderColor: "#c9a84c", color: "#c9a84c" }}>Back</motion.button>
                        <motion.button onClick={() => setStep(3)} className="flex-1 py-3 text-white font-light" style={{ background: "#c9a84c" }}>Next</motion.button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="text-2xl font-light mb-4" style={{ color: "#1e3a5f" }}>Choose Binding</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {["Saddle", "Perfect", "Spiral"].map(opt => (
                          <button key={opt} className="p-4 border-2 rounded" style={{ borderColor: "#c9a84c" }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-6">
                        <motion.button onClick={() => setStep(2)} className="flex-1 py-3 font-light border-2" style={{ borderColor: "#c9a84c", color: "#c9a84c" }}>Back</motion.button>
                        <motion.button className="flex-1 py-3 text-white font-light" style={{ background: "#c9a84c" }}>Create</motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Craft Story */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#faf7f2" }}>
        <Reveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-8" style={{ color: "#1e3a5f" }}>Our Craft</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#7d9b76" }}>
              Pressed & Bound was founded in 2015 with a simple belief: exceptional stationery transforms the everyday into something meaningful. Each product is thoughtfully designed, responsibly sourced, and crafted with precision.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "#7d9b76" }}>
              We partner with mills that champion sustainable forestry, use eco-friendly inks, and maintain rigorous labor standards. Stationery that feels good and does good.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#c9a84c" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
              <div><div className="text-5xl font-light mb-2">Est. 2015</div><p className="text-sm opacity-80">Founded</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={50000} suffix="K" /></div><p className="text-sm opacity-80">Orders Shipped</p></div>
              <div><div className="text-5xl font-light mb-2">100%</div><p className="text-sm opacity-80">Recycled Paper</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={49} suffix="/10" /></div><p className="text-sm opacity-80">Customer Rating</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Gift Wrap Carousel */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#faf7f2" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#1e3a5f" }}>Gift Wrap Collection</h2>
            <Carousel>
              <CarouselContent>
                {GIFTWRAP.map((g, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2">
                    <Image
                      src={g.image}
                      alt={g.name}
                      width={400}
                      height={300}
                      className="w-full rounded-lg"
                    />
                    <p className="mt-4 font-light text-lg" style={{ color: "#1e3a5f" }}>{g.name}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#e8e0d5" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-center" style={{ color: "#1e3a5f" }}>Loved by Writers</h2>
            <Carousel>
              <CarouselContent>
                {TESTIMONIALS.map((t, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-12 rounded-lg text-center" style={{ background: "#faf7f2" }}>
                      <p className="text-xl italic mb-6" style={{ color: "#7d9b76" }}>"{t.text}"</p>
                      <p className="font-light" style={{ color: "#1e3a5f" }}>— {t.author}</p>
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

      {/* Wholesale */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#1e3a5f" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-center text-white">Wholesale Opportunities</h2>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12" style={{ background: "transparent" }}>
                {WHOLESALE.map((w, idx) => (
                  <TabsTrigger key={idx} value={`${idx}`} style={{ color: "#c9a84c" }}>
                    {w.tier}
                  </TabsTrigger>
                ))}
              </TabsList>

              {WHOLESALE.map((tier, idx) => (
                <TabsContent key={idx} value={`${idx}`} className="text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div><p className="text-sm opacity-70 mb-2">Minimum Order</p><p className="text-2xl font-light">{tier.moq}</p></div>
                    <div><p className="text-sm opacity-70 mb-2">Lead Time</p><p className="text-2xl font-light">{tier.lead}</p></div>
                    <div><p className="text-sm opacity-70 mb-2">Discount</p><p className="text-2xl font-light">{tier.discount}</p></div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#faf7f2" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#1e3a5f" }}>FAQ</h2>
            <Accordion type="single" collapsible>
              {[
                { q: "What makes your paper sustainable?", a: "All papers are FSC-certified from responsibly managed forests. We use 100% recycled content options for many products." },
                { q: "Do you offer rush orders?", a: "Yes, rush orders available for custom work. Contact our team for rush pricing and availability." },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger style={{ color: "#1e3a5f" }}>{item.q}</AccordionTrigger>
                  <AccordionContent style={{ color: "#7d9b76" }}>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-8 md:px-20 text-center" style={{ background: "#c9a84c" }}>
        <Reveal>
          <h2 className="text-5xl font-light text-white mb-8">Get 10% Off Your First Order</h2>
          <p className="text-white/80 mb-8">Subscribe for new collections, sustainability updates, and exclusive offerings.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 rounded" style={{ background: "white" }} />
            <button className="px-8 py-3 text-white font-light" style={{ background: "#1e3a5f" }}>Subscribe</button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
