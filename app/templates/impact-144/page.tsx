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
import { Separator } from "@/components/ui/separator"
import { Scissors, Zap, MapPin, Leaf, Award, FileText, ChevronDown, ArrowRight, Needle } from "lucide-react"

const COLLECTIONS = [
  { name: "Suiting", desc: "Bespoke tailored suits", img: "https://images.unsplash.com/photo-1559414691-cee479f47b8e?w=400" },
  { name: "Shirting", desc: "Custom dress shirts", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { name: "Outerwear", desc: "Coats & jackets", img: "https://images.unsplash.com/photo-1539533057687-6b3c3a0dba4d?w=400" },
  { name: "Accessories", desc: "Ties, cufflinks & more", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
  { name: "Bespoke", desc: "Fully customized pieces", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400" },
  { name: "Heritage", desc: "Heirloom collection", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
  { name: "Casual", desc: "Relaxed menswear", img: "https://images.unsplash.com/photo-1552062407-6685c1b3b7d3?w=400" },
  { name: "Evening", desc: "Formal & black tie", img: "https://images.unsplash.com/photo-1517631008897-20770a87a17d?w=400" },
]

const MASTERS = [
  { name: "Giuseppe Moretti", exp: "52 years", specialty: "Suiting & Structure", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { name: "Karl Hoffmann", exp: "38 years", specialty: "Pattern-Making", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { name: "Akiko Tanaka", exp: "31 years", specialty: "Hand-Finishing", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
]

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  )
}

const Counter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
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

const MagneticBtn = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * 0.3)
    y.set((e.clientY - r.top - r.height/2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
    onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

export default function LoomThread() {
  const [openConsult, setOpenConsult] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="bg-gradient-to-b from-[#fdf8f0] via-[#fffbf7] to-[#fdf8f0] text-[#1e2d40] min-h-screen font-sans">
      {/* Parallax Hero */}
      <motion.div style={{ opacity }} className="relative h-screen flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
          alt="Luxury Tailoring"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdf8f0] via-transparent to-[#fdf8f0]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <h1 className="text-6xl md:text-7xl font-black mb-6" style={{ color: '#bf5b2a' }}>
              LOOM<br />& THREAD
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-[#6b5344] max-w-2xl mb-8 font-light">
              Bespoke tailoring since 1952. Hand-crafted by master artisans. Every garment is a legacy.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-8 py-4 bg-[#c9a84c] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#c9a84c]/50 transition-all">
              Schedule Consultation
            </MagneticBtn>
          </Reveal>
        </div>
      </motion.div>

      {/* Collections Grid */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#bf5b2a' }}>Collections</h2>
          <p className="text-[#6b5344] mb-12 text-lg">Curated fabrics from the world's finest mills</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col, idx) => (
            <Reveal key={col.name} delay={idx * 0.1}>
              <Card className="bg-white border-[#c9a84c]/30 hover:border-[#c9a84c] transition-all group overflow-hidden cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={col.img}
                    alt={col.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-1">{col.name}</h3>
                  <p className="text-sm text-[#6b5344]">{col.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bespoke Process */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#bf5b2a' }}>The Bespoke Journey</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              step: "1. Consultation & Vision",
              desc: "Meet with our tailoring experts. Discuss your style, lifestyle, and vision for the perfect garment. All conversations are confidential."
            },
            {
              step: "2. Measurement & Fit",
              desc: "Precise measurements taken by certified tailors. 40+ points of measurement ensure absolute precision. We travel internationally."
            },
            {
              step: "3. Fabric Selection",
              desc: "Choose from 500+ luxury fabrics. Loro Piana, Zegna, Scabal, Holland & Sherry. Our experts guide every choice."
            },
            {
              step: "4. Pattern & First Fitting",
              desc: "Master pattern-makers create your unique blocks. First fitting at 60% completion. Fine-tuning ensures perfection."
            },
          ].map((item, idx) => (
            <Reveal key={item.step} delay={idx * 0.1}>
              <AccordionItem value={`process-${idx}`} className="border-[#c9a84c]/30">
                <AccordionTrigger className="hover:text-[#bf5b2a] transition-colors text-lg font-bold">
                  {item.step}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b5344]">
                  {item.desc}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* Material Sourcing */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#bf5b2a' }}>Global Sourcing</h2>
          <p className="text-[#6b5344] mb-12 text-lg">Finest mills from Europe to Asia</p>
        </Reveal>

        <div className="overflow-hidden bg-white rounded-lg border border-[#c9a84c]/30 p-8">
          <div className="flex gap-8 md:gap-12 items-center overflow-x-auto pb-4">
            {["Loro Piana", "Ermenegildo Zegna", "Scabal", "Holland & Sherry", "Dormeuil", "Vitale Barberis", "Cachapoal"].map((mill, idx) => (
              <Reveal key={mill} delay={idx * 0.1}>
                <span className="font-bold text-[#bf5b2a] whitespace-nowrap">{mill}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Master Tailors */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#bf5b2a' }}>Master Craftspeople</h2>
          <p className="text-[#6b5344] mb-12 text-lg">Three generations of excellence</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MASTERS.map((master, idx) => (
            <Reveal key={master.name} delay={idx * 0.1}>
              <Card className="bg-white border-[#c9a84c]/30 hover:border-[#c9a84c] transition-all">
                <CardContent className="p-8">
                  <Avatar className="w-16 h-16 mb-4 border-2 border-[#c9a84c]">
                    <AvatarImage src={master.img} />
                    <AvatarFallback>{master.name.split(" ")[0][0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{master.name}</h3>
                  <p className="text-sm text-[#c9a84c] mb-2">{master.exp} experience</p>
                  <p className="text-sm text-[#6b5344]">{master.specialty}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tasting Notes Template */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-4" style={{ color: '#bf5b2a' }}>Fabric Details</h2>
          <p className="text-[#6b5344] mb-12 text-lg">Understanding luxury textiles</p>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { fabric: "Loro Piana Storm System", specs: "Weight: 300gsm | Thread count: 120s | Origin: Italy" },
            { fabric: "Ermenegildo Zegna Super 200s", specs: "Weight: 280gsm | Thread count: 200s | Origin: Italy" },
            { fabric: "Scabal Royal Twill", specs: "Weight: 320gsm | Thread count: 140s | Origin: Belgium" },
            { fabric: "Holland & Sherry 100s", specs: "Weight: 250gsm | Thread count: 100s | Origin: UK" },
          ].map((item, idx) => (
            <Reveal key={item.fabric} delay={idx * 0.1}>
              <AccordionItem value={`fabric-${idx}`} className="border-[#c9a84c]/30">
                <AccordionTrigger className="hover:text-[#bf5b2a] transition-colors">
                  {item.fabric}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b5344] font-mono">
                  {item.specs}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Est.", value: 1952 },
              { label: "Garments Made", value: 10, suffix: "K+" },
              { label: "Countries Served", value: 40 },
              { label: "Craftspeople", value: 3, suffix: "-Gen" },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 0.1}>
                <div className="text-center p-6 bg-white rounded-lg border border-[#c9a84c]/30">
                  <div className="text-4xl font-black mb-2" style={{ color: '#c9a84c' }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[#6b5344]">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12" style={{ color: '#bf5b2a' }}>FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            { q: "What is the lead time for bespoke?", a: "Typically 8-12 weeks. Rush options available for additional fee." },
            { q: "How many fittings are needed?", a: "Minimum 2 fittings: one at 60% and final check. International clients: virtual consultations available." },
            { q: "Can you travel for measurements?", a: "Yes. We travel to London, Paris, New York, Dubai, Tokyo, and Hong Kong quarterly." },
            { q: "What about alterations later?", a: "Lifetime alterations included for no additional charge. Garments are designed to last generations." },
          ].map((item, idx) => (
            <Reveal key={item.q} delay={idx * 0.1}>
              <AccordionItem value={`faq-${idx}`} className="border-[#c9a84c]/30">
                <AccordionTrigger className="hover:text-[#bf5b2a] transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b5344]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-5xl font-black mb-6" style={{ color: '#bf5b2a' }}>Commission Your Garment</h2>
          <p className="text-[#6b5344] mb-8 text-lg max-w-2xl mx-auto">
            Every piece is a collaboration. Let's create something extraordinary together.
          </p>
          <MagneticBtn
            onClick={() => setOpenConsult(true)}
            className="px-10 py-4 bg-[#c9a84c] text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-[#c9a84c]/50 transition-all"
          >
            Start Your Bespoke Journey
          </MagneticBtn>
        </Reveal>
      </section>

      <Dialog open={openConsult} onOpenChange={setOpenConsult}>
        <DialogContent className="bg-[#fdf8f0] border-[#c9a84c]/30">
          <DialogHeader>
            <DialogTitle style={{ color: '#bf5b2a' }}>Schedule Consultation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input placeholder="Full Name" className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#1e2d40] placeholder-[#6b5344]" />
            <input placeholder="Email" type="email" className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#1e2d40] placeholder-[#6b5344]" />
            <select className="w-full px-4 py-2 bg-white border border-[#c9a84c]/30 rounded text-[#1e2d40]">
              <option>Suiting</option>
              <option>Shirting</option>
              <option>Outerwear</option>
              <option>Full Wardrobe</option>
            </select>
            <button className="w-full py-3 bg-[#c9a84c] text-white font-bold rounded hover:opacity-90 transition-opacity">
              Request Consultation
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
