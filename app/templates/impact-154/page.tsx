"use client"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Beer, Flame } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>{children}</motion.div>
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 90
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * 0.3)
    y.set((e.clientY - r.top - r.height/2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

const beers = [
  { name: "Crisp IPA", abv: "6.2%", ibu: "68", flavor: "Citrus, pine, crisp finish", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" },
  { name: "Midnight Stout", abv: "7.8%", ibu: "45", flavor: "Coffee, chocolate, roast", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" },
  { name: "Golden Lager", abv: "4.5%", ibu: "22", flavor: "Clean, malty, refreshing", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" },
  { name: "Sour Grapefruit", abv: "5.1%", ibu: "15", flavor: "Tart, citrus, bright", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" },
  { name: "Autumn Harvest", abv: "6.8%", ibu: "52", flavor: "Spice, fruit, warming", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" },
  { name: "Berry Wheat", abv: "5.4%", ibu: "28", flavor: "Berry, wheat, smooth", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" },
  { name: "Double Hops", abv: "8.2%", ibu: "85", flavor: "Bold, hoppy, bold finish", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" },
  { name: "Honey Session", abv: "4.2%", ibu: "18", flavor: "Honey, subtle malt", image: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=400" }
]

const brewerStories = [
  { name: "Marcus Sterling", role: "Head Brewer", style: "IPA Specialist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Sarah Chen", role: "Barrel Master", style: "Stout Expert", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { name: "James O'Brien", role: "Master Brewer", style: "Lager Craftsman", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
]

export default function KinfolkBrewing() {
  const [selectedBeer, setSelectedBeer] = useState<typeof beers[0] | null>(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#fdf6ec] text-[#1a0d00] font-sans">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=2000" alt="hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdf6ec] via-transparent to-[#fdf6ec]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-8xl font-black tracking-tight mb-6 text-[#1a0d00]">
            Kinfolk Brewing
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-2xl text-[#1a0d00]/60 max-w-2xl mx-auto mb-12">
            Craft beer crafted with intention. Est. 2014.
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setOpen(true)} className="px-8 py-4 bg-[#d97706] text-white font-bold cursor-pointer hover:bg-[#1a0d00] hover:text-[#d97706] transition-all duration-200">
            Book Taproom Tour
          </motion.button>
        </div>
      </section>

      {/* BEER CATALOG */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Our Beer Selection</h2>
        </Reveal>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-12 bg-transparent">
            <TabsTrigger value="all" className="cursor-pointer">All</TabsTrigger>
            <TabsTrigger value="ipas" className="cursor-pointer">IPAs</TabsTrigger>
            <TabsTrigger value="stouts" className="cursor-pointer">Stouts</TabsTrigger>
            <TabsTrigger value="lagers" className="cursor-pointer">Lagers</TabsTrigger>
            <TabsTrigger value="seasonals" className="cursor-pointer">Seasonals</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {beers.map((beer, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div onClick={() => { setSelectedBeer(beer); setOpen(true); }} className="group relative cursor-pointer overflow-hidden bg-white border border-[#d97706]/20 hover:border-[#d97706] transition-all duration-300">
                    <div className="relative h-64 overflow-hidden bg-[#fdf6ec]">
                      <Image src={beer.image} alt={beer.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{beer.name}</h3>
                      <div className="flex gap-2 mb-3">
                        <Badge className="bg-[#d97706] text-white cursor-pointer text-xs">{beer.abv}</Badge>
                        <Badge className="bg-[#2d5a3d] text-white cursor-pointer text-xs">{beer.ibu} IBU</Badge>
                      </div>
                      <p className="text-sm text-[#1a0d00]/60 mb-3">{beer.flavor}</p>
                      <motion.div className="flex items-center gap-2 text-[#d97706] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Learn More <span className="ml-auto">→</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* TAPROOM GALLERY */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#2d5a3d] text-white">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Visit Our Taprooms</h2>
        </Reveal>
        <Carousel>
          <CarouselContent>
            {[
              "https://images.unsplash.com/photo-1608715174306-e6835065d75d?auto=format&fit=crop&q=80&w=1200",
              "https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=1200",
              "https://images.unsplash.com/photo-1577720643272-265b434fb4f5?auto=format&fit=crop&q=80&w=1200"
            ].map((img, i) => (
              <CarouselItem key={i} className="md:basis-full">
                <div className="relative h-96 w-full">
                  <Image src={img} alt={`Taproom ${i}`} fill className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer" />
          <CarouselNext className="cursor-pointer" />
        </Carousel>
      </section>

      {/* BREWING PROCESS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">The Brewing Process</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { title: "Milling", description: "Grain preparation and crushing for optimal extraction and flavor development" },
            { title: "Mashing", description: "Temperature-controlled steeping to convert starches into fermentable sugars" },
            { title: "Fermenting", description: "Yeast activation and fermentation over 7-14 days depending on beer style" },
            { title: "Conditioning", description: "Carbonation and aging to develop complexity and achieve peak flavor" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`item-${i}`} className="border-b border-[#1a0d00]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#d97706] transition-colors">{item.title}</AccordionTrigger>
                <AccordionContent className="text-[#1a0d00]/60 py-4">{item.description}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* SEASONAL RELEASES */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Seasonal Releases</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { season: "Spring", beer: "Wildflower Pale", date: "March 15" },
            { season: "Summer", beer: "Citrus Crush", date: "June 1" },
            { season: "Fall", beer: "Pumpkin Spice Porter", date: "September 1" },
            { season: "Winter", beer: "Holiday Blend", date: "December 1" }
          ].map((release, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-white border-[#d97706]/20 hover:border-[#d97706] transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Badge className="mb-4 bg-[#d97706] text-white cursor-pointer">{release.season}</Badge>
                  <h3 className="font-bold mb-2">{release.beer}</h3>
                  <p className="text-sm text-[#1a0d00]/60">Available {release.date}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEER SCHOOL */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Beer School</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Tasting 101", desc: "Learn proper tasting techniques and flavor identification" },
            { title: "Beer Pairing", desc: "Discover perfect food and beer combinations" },
            { title: "Home Brew Kit", desc: "Start your own brewing journey at home" }
          ].map((course, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="bg-white border-[#2d5a3d]/20 hover:border-[#2d5a3d] transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <p className="text-[#1a0d00]/60 mb-4">{course.desc}</p>
                  <Link href="#" className="text-[#d97706] font-bold cursor-pointer hover:text-[#2d5a3d] transition-colors">Learn More →</Link>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#1a0d00] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Reveal><div><div className="text-4xl md:text-5xl font-black mb-2">Est.<br/><Counter target={2014} /></div><p className="text-sm opacity-60">Founded</p></div></Reveal>
          <Reveal delay={0.1}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={45} /></div><p className="text-sm opacity-60">Total Beers</p></div></Reveal>
          <Reveal delay={0.2}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={8} /></div><p className="text-sm opacity-60">Gold Medals</p></div></Reveal>
          <Reveal delay={0.3}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={2} /></div><p className="text-sm opacity-60">Taprooms</p></div></Reveal>
        </div>
      </section>

      {/* BREWERS */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Meet the Brewers</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brewerStories.map((brewer, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="text-center hover:scale-105 transition-transform duration-300">
                <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-[#d97706]">
                  <AvatarImage src={brewer.image} alt={brewer.name} />
                  <AvatarFallback>{brewer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold mb-1">{brewer.name}</h3>
                <Badge variant="outline" className="mb-3 cursor-pointer">{brewer.role}</Badge>
                <p className="text-sm text-[#1a0d00]/60">{brewer.style}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "Where can I find your beers?", a: "Available at 300+ retailers and our two taproom locations in downtown and riverside" },
            { q: "Do you offer brewery tours?", a: "Yes! Tours available Tuesday-Sunday, booking required. $15 per person includes samples." },
            { q: "Can I order online?", a: "Limited online ordering available for growlers and merchandise. Shipping restrictions apply." },
            { q: "Do you host private events?", a: "Absolutely! Contact our events team for private taproom bookings and catering options." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`faq-${i}`} className="border-b border-[#1a0d00]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#d97706] transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-[#1a0d00]/60 py-4">{item.a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* BEER DETAIL DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedBeer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBeer.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative h-64 w-full">
                  <Image src={selectedBeer.image} alt={selectedBeer.name} fill className="object-cover rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#d97706]/10 p-4 rounded">
                    <p className="text-xs opacity-60 mb-1">ABV</p>
                    <p className="text-2xl font-bold text-[#d97706]">{selectedBeer.abv}</p>
                  </div>
                  <div className="bg-[#2d5a3d]/10 p-4 rounded">
                    <p className="text-xs opacity-60 mb-1">IBU</p>
                    <p className="text-2xl font-bold text-[#2d5a3d]">{selectedBeer.ibu}</p>
                  </div>
                </div>
                <div><p className="text-sm font-bold opacity-60 mb-2">Flavor Profile</p><p>{selectedBeer.flavor}</p></div>
                <MagneticBtn className="w-full px-6 py-3 bg-[#d97706] text-white font-bold hover:bg-[#1a0d00] transition-all duration-300">
                  Find Near You
                </MagneticBtn>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* FOOTER CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#1a0d00] text-white text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Craft Your Next Experience</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Visit one of our taprooms or order a growler for home</p>
          <MagneticBtn className="px-8 py-4 bg-[#d97706] text-white font-bold cursor-pointer hover:bg-white hover:text-[#d97706] transition-all duration-200">
            Book Your Taproom Visit
          </MagneticBtn>
        </Reveal>
      </section>
    </div>
  )
}