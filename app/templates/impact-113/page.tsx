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
  { id: 1, title: "Luminous Serum", cat: "Serums", types: "All", price: "$125", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
  { id: 2, title: "Velvet Moisturizer", cat: "Moisturisers", types: "Dry/Combination", price: "$95", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
  { id: 3, title: "Radiance Mask", cat: "Masks", types: "Oily/Sensitive", price: "$65", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
  { id: 4, title: "Silk Body Oil", cat: "Body", types: "All", price: "$85", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
  { id: 5, title: "Luxury Set", cat: "Sets", types: "All", price: "$240", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
  { id: 6, title: "Essence Toner", cat: "Serums", types: "All", price: "$55", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
  { id: 7, title: "Night Recovery", cat: "Moisturisers", types: "All", price: "$110", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
  { id: 8, title: "Glow Starter", cat: "Sets", types: "All", price: "$160", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" },
]

const INGREDIENTS = [
  { name: "Hyaluronic Acid", source: "Sustainable Fermentation", efficacy: 95 },
  { name: "Retinol Complex", source: "Plant-Derived", efficacy: 88 },
  { name: "Niacinamide", source: "Clean Beauty", efficacy: 92 },
  { name: "Peptide Blend", source: "Lab-Synthesized", efficacy: 85 },
  { name: "Vitamin C", source: "Botanical Extract", efficacy: 90 },
  { name: "Squalane", source: "Olive-Derived", efficacy: 87 },
]

export default function AuraBeauty() {
  const [activeProduct, setActiveProduct] = useState(0)
  const [productDialog, setProductDialog] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [quizOpen, setQuizOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="min-h-screen bg-[#fafaf8]" style={{ color: "#1a0f0a" }}>
      <motion.section style={{ y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1600" alt="Luxury Skincare" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-light mb-6">
            AURA
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl font-light">
            Luxury Skincare & Wellness
          </motion.p>
        </div>
      </motion.section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Our Collections</h2>
        </Reveal>
        <Tabs defaultValue="Serums" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-[#c4887a]/20">
            {["Serums", "Moisturisers", "Masks", "Body", "Sets"].map((cat) => (
              <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-[#c4887a] data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {["Serums", "Moisturisers", "Masks", "Body", "Sets"].map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {PRODUCTS.filter(p => p.cat === cat).map((prod, idx) => (
                  <Reveal key={prod.id} delay={idx * 0.1}>
                    <motion.div className="cursor-pointer group" whileHover={{ y: -8 }}>
                      <div className="relative h-96 overflow-hidden rounded-lg mb-4 bg-[#f9ede8]">
                        <Image src={prod.img + "?w=400"} alt={prod.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="flex justify-between items-start mb-3">
                        <div onClick={() => { setActiveProduct(PRODUCTS.indexOf(prod)); setProductDialog(true); }}>
                          <h3 className="text-lg font-light text-[#1a0f0a]">{prod.title}</h3>
                          <p className="text-sm text-[#1a0f0a]/60">{prod.price}</p>
                        </div>
                        <button onClick={() => setWishlist(w => w.includes(prod.id) ? w.filter(x => x !== prod.id) : [...w, prod.id])} className="text-xl">
                          {wishlist.includes(prod.id) ? "❤️" : "🤍"}
                        </button>
                      </div>
                      <Badge className="bg-[#d4a94a] text-[#1a0f0a]">{prod.types}</Badge>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Dialog open={productDialog} onOpenChange={setProductDialog}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-3xl" style={{ color: "#1a0f0a" }}>{PRODUCTS[activeProduct]?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-lg overflow-hidden bg-[#f9ede8]">
              <Image src={PRODUCTS[activeProduct]?.img + "?w=500"} alt={PRODUCTS[activeProduct]?.title} fill className="object-cover" />
            </div>
            <div>
              <p className="text-2xl font-light mb-6" style={{ color: "#c4887a" }}>{PRODUCTS[activeProduct]?.price}</p>
              <Accordion type="single" collapsible>
                <AccordionItem value="ingredients">
                  <AccordionTrigger>Key Ingredients</AccordionTrigger>
                  <AccordionContent>Hyaluronic Acid, Peptide Complex, Botanical Extracts</AccordionContent>
                </AccordionItem>
                <AccordionItem value="compatibility">
                  <AccordionTrigger>Skin Type Compatibility</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div><span className="font-light">Oily: </span><Progress value={85} className="h-2" /></div>
                      <div><span className="font-light">Dry: </span><Progress value={78} className="h-2" /></div>
                      <div><span className="font-light">Sensitive: </span><Progress value={92} className="h-2" /></div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="usage">
                  <AccordionTrigger>How to Use</AccordionTrigger>
                  <AccordionContent>Apply 2-3 drops to cleansed skin morning and evening. Follow with moisturizer.</AccordionContent>
                </AccordionItem>
              </Accordion>
              <button onClick={() => setProductDialog(false)} className="mt-8 w-full py-3 rounded-lg font-light transition-colors" style={{ backgroundColor: "#c4887a", color: "white" }}>
                Add to Cart
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-24 px-6 md:px-12 bg-[#f9ede8]/30">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Skin Quiz</h2>
        </Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-[#1a0f0a]/70 mb-8">Discover your personalized routine in 3 questions</p>
          <button onClick={() => setQuizOpen(true)} className="px-12 py-4 rounded-lg font-light text-white transition-colors" style={{ backgroundColor: "#c4887a" }}>
            Start Quiz
          </button>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Ingredient Transparency</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INGREDIENTS.map((ing, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border border-[#c4887a]/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light text-[#1a0f0a] mb-2">{ing.name}</h3>
                  <Badge variant="outline" className="mb-4 border-[#c4887a] text-[#c4887a]">{ing.source}</Badge>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#1a0f0a]/60">Efficacy</span>
                    <span className="text-[#c4887a] font-light">{ing.efficacy}%</span>
                  </div>
                  <Progress value={ing.efficacy} className="mt-2 bg-[#c4887a]/20" />
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>By The Numbers</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Happy Customers", value: 500, suffix: "K+" },
            { label: "Products Offered", value: 15 },
            { label: "Clean Beauty Certified", value: 100, suffix: "%" },
            { label: "Customer Rating", value: 49, suffix: "/5" },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-light mb-2" style={{ color: "#c4887a" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-[#1a0f0a]/60">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Dermatologist Endorsements</h2>
        </Reveal>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {[1, 2, 3].map((idx) => (
              <CarouselItem key={idx}>
                <Card className="bg-[#f9ede8]/50 border-none">
                  <CardContent className="p-8">
                    <p className="text-lg text-[#1a0f0a] mb-6 italic">"AURA formulations are clinically validated and dermatologist-tested. The results speak for themselves."</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12" style={{ backgroundColor: "#c4887a", color: "white" }}>
                        <AvatarFallback>D{idx}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-light text-[#1a0f0a]">Dr. Sarah {["Chen", "Patel", "Williams"][idx-1]}</p>
                        <p className="text-sm text-[#1a0f0a]/60">Dermatologist</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#f9ede8]/30">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Before & After</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {[1, 2].map((idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#f9ede8]">
                    <Image src={`https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=50`} alt="Before" fill className="object-cover" />
                    <p className="relative z-10 text-white font-light p-4">Before</p>
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#f9ede8]">
                    <Image src={`https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400`} alt="After" fill className="object-cover" />
                    <p className="relative z-10 text-white font-light p-4">After</p>
                  </div>
                </div>
                <p className="text-[#1a0f0a]/70">4-week results with AURA Luminous Serum. Clinically visible improvement in radiance.</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="max-w-2xl">
          {[
            { q: "Are your products vegan?", a: "98% of our products are vegan. Check product pages for specific details." },
            { q: "What is your shipping policy?", a: "Free shipping on orders over $150. Standard shipping takes 3-5 business days." },
            { q: "Do you offer returns?", a: "Yes, 60-day money-back guarantee if you're not satisfied with your purchase." },
            { q: "Can I use multiple serums together?", a: "Yes, layer serums from lightest to heaviest texture. Consult our routine guides." },
          ].map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-[#1a0f0a]">{item.q}</AccordionTrigger>
              <AccordionContent className="text-[#1a0f0a]/70">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#f9ede8]/30">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>The AURA Story</h2>
        </Reveal>
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-lg text-[#1a0f0a]/70 mb-6">Founded by skincare scientists and beauty experts, AURA emerged from a simple belief: luxury skincare doesn't require harsh chemicals or false promises. We blend cutting-edge dermatological science with nature's most potent ingredients to create transformative formulations.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-[#1a0f0a]/70 mb-6">Every product is rigorously tested, clinically validated, and formulated for real results. Our commitment to clean beauty, sustainability, and ethical sourcing sets AURA apart in the luxury skincare landscape.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-[#1a0f0a]/70">Join a community of 500K+ women who've discovered their best skin with AURA.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Sustainability & Ethics</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Ethical Sourcing", desc: "100% ethically sourced ingredients with fair-trade partnerships in developing regions." },
            { title: "Eco Packaging", desc: "Recyclable/biodegradable packaging made from 80% post-consumer recycled materials." },
            { title: "Cruelty-Free", desc: "Never tested on animals. Certified by Leaping Bunny and PETA." },
          ].map((value, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <div className="text-4xl mb-4">
                  {idx === 0 && "🌍"}
                  {idx === 1 && "♻️"}
                  {idx === 2 && "🐰"}
                </div>
                <h3 className="text-xl font-light text-[#1a0f0a] mb-3">{value.title}</h3>
                <p className="text-[#1a0f0a]/70">{value.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#f9ede8]/30">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Routine Builder</h2>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-center text-[#1a0f0a]/70 mb-12">Custom skincare routines built for your unique skin. Answer a few questions and receive personalized product recommendations.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1. Cleanse", products: "Gentle, effective cleansing for daily use" },
              { step: "2. Treat", products: "Serums and treatments targeting specific concerns" },
              { step: "3. Protect", products: "Moisturizers and SPF for hydration and protection" },
            ].map((routine, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Card className="bg-white border-[#c4887a]/10">
                  <CardContent className="p-6">
                    <p className="font-light text-[#c4887a] text-sm mb-2">{routine.step}</p>
                    <p className="text-[#1a0f0a]/70">{routine.products}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Research & Innovation</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <div>
              <h3 className="text-2xl font-light text-[#1a0f0a] mb-6">Our Lab</h3>
              <p className="text-[#1a0f0a]/70 mb-4">AURA operates a dedicated research and development laboratory in Switzerland, where our team of 15 PhD-level chemists and dermatologists continuously innovate.</p>
              <p className="text-[#1a0f0a]/70">We invest 12% of revenue back into R&D, ensuring we're always at the forefront of skincare science.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="text-2xl font-light text-[#1a0f0a] mb-6">Clinical Trials</h3>
              <p className="text-[#1a0f0a]/70 mb-4">Every product undergoes rigorous clinical testing with independent third-party labs. Our studies involve 100-500 participants over 8-12 weeks.</p>
              <p className="text-[#1a0f0a]/70">Results are published and available for review. Transparency is core to our mission.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#f9ede8]/30">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Contact & Support</h2>
        </Reveal>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-[#1a0f0a]/70 mb-6">Our customer success team is available 24/7 to support your AURA journey.</p>
          <div className="space-y-4 text-[#1a0f0a]/70 mb-8">
            <div>
              <p className="font-light text-[#c4887a] text-sm">Email</p>
              <p>support@aurabeauty.com</p>
            </div>
            <div>
              <p className="font-light text-[#c4887a] text-sm">Phone</p>
              <p>1-800-AURA-GLOW</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <Reveal>
          <h2 className="text-5xl font-light mb-12" style={{ color: "#c4887a" }}>Join AURA</h2>
        </Reveal>
        <div className="text-center">
          <p className="text-lg text-[#1a0f0a]/70 mb-8">Discover your best skin. Subscribe for exclusive offers, skincare tips, and early access to new launches.</p>
          <MagneticBtn className="px-12 py-4 rounded-lg font-light text-white transition-colors" style={{ backgroundColor: "#c4887a" }}>
            Subscribe Now
          </MagneticBtn>
        </div>
      </section>
    </div>
  )
}
