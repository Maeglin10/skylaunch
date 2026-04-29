"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"

const COLLECTIONS = [
  { id: 1, name: "Rings", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop", pieces: [{ title: "Solitaire Diamond", carat: "1.5ct", material: "18k Gold" }] },
  { id: 2, name: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500&auto=format&fit=crop", pieces: [{ title: "Heritage Pendant", carat: "Multi-gemstone", material: "Platinum" }] },
  { id: 3, name: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop", pieces: [{ title: "Tennis Bracelet", carat: "5ct", material: "Platinum" }] },
  { id: 4, name: "Earrings", image: "https://images.unsplash.com/photo-1599551419256-ca3be0dbec37?q=80&w=500&auto=format&fit=crop", pieces: [{ title: "Pearl Drops", carat: "Natural Pearl", material: "18k Gold" }] },
  { id: 5, name: "Bespoke", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop", pieces: [{ title: "Custom Creation", carat: "Bespoke", material: "Your Choice" }] },
]

const MATERIALS = [
  { title: "18k Gold", desc: "Pure and timeless, refined for elegance.", certs: ["Hallmark", "Assay"] },
  { title: "Platinum", desc: "Ultimate luxury, 95% pure. Hypoallergenic.", certs: ["GIA", "Purity"] },
  { title: "Ethically Sourced Gems", desc: "Diamonds, rubies, sapphires. Certified origin.", certs: ["GIA", "Origin", "Treatment"] },
]

const ARTISANS = [
  { name: "Isabelle Fontaine", role: "Master Craftsperson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", bio: "40 years excellence" },
  { name: "Henri Beaumont", role: "Gemstone Curator", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", bio: "Ethical sourcing pioneer" },
  { name: "Claire Moreau", role: "Design Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", bio: "Contemporary legacy" },
  { name: "Michel Rousseau", role: "Finishing Master", image: "https://images.unsplash.com/photo-1517849845537-1d51a20414de?q=80&w=200&auto=format&fit=crop", bio: "Precision perfectionist" },
]

const TESTIMONIALS = [
  { text: "The most exquisite engagement ring. Worth every moment of anticipation.", author: "Sophie, Client" },
  { text: "Lumière Bijoux doesn't just craft jewelry—they craft memories.", author: "Antoine, Client" },
]

const STATS = [{ value: 1978, label: "Est." }, { value: 12000, label: "Pieces" }, { value: 45, label: "Countries" }, { value: 4.9, label: "Rating" }]

const FAQ_ITEMS = [
  { q: "Can I customize my piece?", a: "Absolutely. Full bespoke design services tailored to your exact vision and preferences." },
  { q: "What sizing options?", a: "Ring sizing for all collections. Expert resizing and adjustments guaranteed." },
  { q: "Do you provide certificates?", a: "Yes. All pieces include official hallmark certification and authenticity documentation." },
  { q: "Shipping process?", a: "Insured international shipping with white-glove delivery and full insurance." },
]

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
  return <span ref={ref}>{count}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

export default function LumiereBijoux() {
  const [selectedTab, setSelectedTab] = useState("Rings")
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <div className="bg-[#fdf8f0] text-[#080808] overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/60 backdrop-blur-md border-b border-[#d4af37]/10 z-50 flex items-center justify-between px-6">
        <div className="text-2xl font-bold tracking-wider text-[#d4af37]">LUMIÈRE BIJOUX</div>
        <div className="hidden md:flex gap-8 text-sm text-[#080808]">
          <Link href="#collections" className="hover:text-[#d4af37] transition">Collections</Link>
          <Link href="#bespoke" className="hover:text-[#d4af37] transition">Bespoke</Link>
          <Link href="#heritage" className="hover:text-[#d4af37] transition">Artisans</Link>
        </div>
      </nav>

      <motion.section style={{ opacity: heroOpacity, y: heroY }} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop" alt="Jewelry" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            FINE JEWELRY ATELIER
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Timeless elegance crafted by master artisans since 1978.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Dialog>
              <DialogTrigger asChild>
                <MagneticBtn className="px-8 py-4 bg-[#d4af37] text-[#080808] font-bold rounded-full hover:bg-[#c99d2f] transition">
                  Explore Collections
                </MagneticBtn>
              </DialogTrigger>
              <DialogContent className="bg-[#fdf8f0] border-[#d4af37]/20 max-w-md">
                <DialogTitle>Discover Collections</DialogTitle>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-white border border-[#d4af37]/30 rounded text-[#080808]" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-2 bg-white border border-[#d4af37]/30 rounded text-[#080808]" />
                  <input type="text" placeholder="Collection Interest" className="w-full px-4 py-2 bg-white border border-[#d4af37]/30 rounded text-[#080808]" />
                  <button type="submit" className="w-full px-4 py-3 bg-[#d4af37] text-[#080808] font-bold rounded hover:bg-[#c99d2f] transition">
                    Request Consultation
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </motion.section>

      <section id="collections" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="text-5xl font-bold mb-4 text-center text-[#080808]">Collections</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Curated selections of timeless pieces for every occasion and dream.</p>
        </Reveal>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 bg-white border border-[#d4af37]/20 mb-8">
            {["Rings", "Necklaces", "Bracelets", "Earrings", "Bespoke"].map((type) => (
              <TabsTrigger key={type} value={type} className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#080808]">
                {type}
              </TabsTrigger>
            ))}
          </TabsList>

          {COLLECTIONS.map((collection) => (
            <TabsContent key={collection.id} value={collection.name} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[collection].map((col, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="bg-white border-[#d4af37]/20 cursor-pointer hover:border-[#d4af37]/50 transition overflow-hidden group">
                        <div className="relative h-72 overflow-hidden">
                          <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-105 transition" unoptimized />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-xl mb-2 text-[#080808]">{col.name}</h3>
                          <Badge className="bg-[#d4af37] text-[#080808]">{col.pieces[0].title}</Badge>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="bg-[#fdf8f0] border-[#d4af37]/20 max-w-2xl">
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-[#080808]">{col.pieces[0].title}</h2>
                        <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                          <Image src={col.image} alt={col.pieces[0].title} width={500} height={280} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-600 text-sm">Material</p>
                            <p className="font-bold text-[#080808]">{col.pieces[0].material}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Carat/Weight</p>
                            <p className="font-bold text-[#d4af37]">{col.pieces[0].carat}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Reveal>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section id="bespoke" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1} className="mb-16">
            <h2 className="text-5xl font-bold text-center mb-4 text-[#080808]">Bespoke Experience</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">Our 4-step design process brings your dream piece to life.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Consultation", desc: "Discuss vision with master designer" },
              { step: 2, title: "Design Sketches", desc: "Detailed drawings and material selection" },
              { step: 3, title: "Craftsmanship", desc: "Expert artisans create your piece" },
              { step: 4, title: "Delivery", desc: "White-glove handoff and certification" },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">{item.step}</div>
                  <h3 className="font-bold text-lg mb-2 text-[#080808]">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal delay={0.1} className="mb-16">
          <h2 className="text-5xl font-bold text-center mb-4 text-[#080808]">Materials & Certifications</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATERIALS.map((mat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#d4af37]/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#d4af37]">{mat.title}</h3>
                  <p className="text-gray-600 mb-6">{mat.desc}</p>
                  <div className="space-y-2">
                    {mat.certs.map((cert, i) => (
                      <Badge key={i} variant="outline" className="border-[#d4af37]/30 text-[#d4af37]">{cert}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="heritage" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal delay={0.1} className="mb-16">
            <h2 className="text-5xl font-bold text-center mb-4 text-[#080808]">Artisan Masters</h2>
            <p className="text-gray-600 text-center">Generations of excellence at your service.</p>
          </Reveal>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {ARTISANS.map((artisan) => (
                <CarouselItem key={artisan.name} className="basis-full md:basis-1/2">
                  <Card className="bg-[#fdf8f0] border-[#d4af37]/20 text-center">
                    <CardContent className="p-6">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage src={artisan.image} alt={artisan.name} />
                        <AvatarFallback>{artisan.name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg text-[#080808]">{artisan.name}</h3>
                      <p className="text-sm text-[#d4af37] mb-2">{artisan.role}</p>
                      <p className="text-sm text-gray-600">{artisan.bio}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-[#d4af37]/30" />
            <CarouselNext className="border-[#d4af37]/30" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#fdf8f0]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="text-center">
              <div className="text-4xl font-bold text-[#d4af37] mb-2"><Counter target={stat.value} /></div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal delay={0.1} className="mb-12">
            <h2 className="text-5xl font-bold text-center mb-4 text-[#080808]">Customer Care</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-[#d4af37]/20">
                <AccordionTrigger className="text-lg font-semibold text-[#080808] hover:text-[#d4af37] transition">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-6 text-center bg-[#fdf8f0]">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#080808]">Begin Your Bespoke Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Schedule a private consultation with our master designers.</p>
          <Dialog>
            <DialogTrigger asChild>
              <MagneticBtn className="px-8 py-4 bg-[#d4af37] text-[#080808] font-bold rounded-full hover:bg-[#c99d2f] transition">
                Request Consultation
              </MagneticBtn>
            </DialogTrigger>
            <DialogContent className="bg-[#fdf8f0] border-[#d4af37]/20">
              <DialogTitle>Bespoke Consultation</DialogTitle>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 bg-white border border-[#d4af37]/30 rounded text-[#080808]" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-2 bg-white border border-[#d4af37]/30 rounded text-[#080808]" />
                <textarea placeholder="Describe your vision..." className="w-full px-4 py-2 bg-white border border-[#d4af37]/30 rounded text-[#080808] h-24" />
                <button type="submit" className="w-full px-4 py-3 bg-[#d4af37] text-[#080808] font-bold rounded hover:bg-[#c99d2f] transition">
                  Book Consultation
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
