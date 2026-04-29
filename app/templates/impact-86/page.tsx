"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
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
import { X, Menu, ChevronDown, ArrowRight, Heart, Leaf, Award } from "lucide-react"

function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} >
      {children}
    </motion.div>
  )
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

const products = [
  { id: 1, name: "Organic Cotton Tee", collection: "Basics", price: "$45", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Hemp Overshirt", collection: "Outerwear", price: "$89", img: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Linen Trousers", collection: "Basics", price: "$79", img: "https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Wool Beanie", collection: "Accessories", price: "$34", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Canvas Tote", collection: "Accessories", price: "$56", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Recycled Puffer", collection: "Outerwear", price: "$129", img: "https://images.unsplash.com/photo-1539533057592-4ee29e8b254e?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "Bamboo Basics Set", collection: "Basics", price: "$65", img: "https://images.unsplash.com/photo-1506629082847-11d3e44e6b85?q=80&w=400&auto=format&fit=crop" },
  { id: 8, name: "Cork Belt", collection: "Accessories", price: "$42", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop" },
]

const faqs = [
  { q: "What makes Threadline truly sustainable?", a: "100% GOTS-certified organic cotton, zero synthetic dyes, carbon-neutral shipping, B Corp certified, and 1% of revenue to environmental nonprofits." },
  { q: "What's your return policy?", a: "30-day returns for unworn items. Free shipping on returns. We offset the carbon footprint of returns through verified projects." },
  { q: "How do I find my perfect size?", a: "Use our interactive size guide, or request a personalized consultation. We offer free styling calls for all customers." },
  { q: "Do you offer gift cards?", a: "Yes! Digital and physical gift cards available. Give the gift of sustainable style." },
]

export default function ThreadlineSustainable() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState("All")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showProductModal, setShowProductModal] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [email, setEmail] = useState("")
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const collections = ["All", "Basics", "Outerwear", "Accessories"]
  const filteredProducts = selectedCollection === "All" ? products : products.filter(p => p.collection === selectedCollection)

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const lookbook = [
    "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529148482759-b649efde8876?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539533057592-4ee29e8b254e?q=80&w=600&auto=format&fit=crop",
  ]

  return (
    <div style={{ backgroundColor: "#f5f0e6", color: "#1a1a1a", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(245,240,230,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2d5a3d40" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#2d5a3d", letterSpacing: "-0.02em" }}>THREADLINE</h1>
          <div style={{ display: "none", gap: "2.5rem" }} className="md:flex">
            {["Collections", "About", "Impact", "Contact"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1a1a1a", opacity: 0.7, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button style={{ display: "none", cursor: "pointer", background: "none", border: "none", padding: 0 }} className="md:hidden">
                <Menu size={24} color="#2d5a3d" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "#f5f0e6" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
                {["Collections", "About", "Impact", "Contact"].map((item) => (
                  <a key={item} href="#" style={{ fontSize: "1rem", fontWeight: "600", color: "#2d5a3d", textDecoration: "none" }}>{item}</a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HERO */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop" alt="Sustainable Fashion" fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(245,240,230,0.88) 0%, rgba(245,240,230,0.65) 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.85rem", fontWeight: "900", letterSpacing: "0.12em", color: "#2d5a3d", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>
              Sustainable Fashion For Good
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: "clamp(2.5rem, 12vw, 7rem)", fontWeight: "900", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "900px", color: "#1a1a1a" }}>
              Wear Your <span style={{ color: "#2d5a3d" }}>Values</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.1rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "650px", color: "#1a1a1a" }}>
              100% organic, ethically made, B Corp certified. Every piece tells a story of sustainability.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <ChevronDown size={28} style={{ color: "#2d5a3d" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* IMPACT STATS */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#2d5a3d", color: "#f5f0e6" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {[
            { label: "Organic Certified", value: 100, suffix: "%" },
            { label: "Synthetic Dyes Used", value: 0, suffix: "%" },
            { label: "Trees Planted", value: 50, suffix: "K" },
            { label: "B Corp Certified", value: 1, suffix: "✓" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.8rem", fontWeight: "900", marginBottom: "0.5rem", color: "#f5f0e6" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p style={{ fontSize: "0.8rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600" }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem", textAlign: "center" }}>Collections</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.6, textAlign: "center", marginBottom: "3rem" }}>Handpicked sustainable pieces for every season</p>
          </Reveal>

          {/* FILTER */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "3rem", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
            {collections.map((coll) => (
              <motion.button
                key={coll}
                onClick={() => setSelectedCollection(coll)}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.65rem 1.25rem",
                  backgroundColor: selectedCollection === coll ? "#2d5a3d" : "transparent",
                  color: selectedCollection === coll ? "white" : "#1a1a1a",
                  border: `2px solid ${selectedCollection === coll ? "#2d5a3d" : "#d4cfc5"}`,
                  borderRadius: "9999px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
              >
                {coll}
              </motion.button>
            ))}
          </div>

          {/* PRODUCTS */}
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2rem" }}>
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    position: "relative",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    backgroundColor: "white",
                    border: "1px solid #e8dfc5",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                    <Image src={product.img} alt={product.name} fill style={{ objectFit: "cover" }} />
                    <motion.button
                      onClick={() => toggleWishlist(product.id)}
                      whileHover={{ scale: 1.15 }}
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Heart size={20} fill={wishlist.includes(product.id) ? "#2d5a3d" : "none"} color={wishlist.includes(product.id) ? "#2d5a3d" : "#1a1a1a"} />
                    </motion.button>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "900", marginBottom: "0.25rem" }}>{product.name}</h3>
                    <p style={{ fontSize: "0.85rem", opacity: 0.6, marginBottom: "0.75rem" }}>{product.collection}</p>
                    <p style={{ fontSize: "1.25rem", fontWeight: "700", color: "#2d5a3d" }}>{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MATERIALS SECTION */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f0e8d5" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem", textAlign: "center" }}>Materials Transparency</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.6, textAlign: "center", marginBottom: "3rem" }}>Know exactly what you're wearing</p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {[
              { name: "Organic Cotton", cert: "GOTS Certified", desc: "Grown without synthetic pesticides. Fair wages for farmers.", progress: 100 },
              { name: "Hemp Fiber", cert: "Fair Trade", desc: "Water-efficient. Requires no pesticides. Carbon-negative.", progress: 95 },
              { name: "Recycled Polyester", cert: "GRS Certified", desc: "Recovered plastic bottles. Reduced water & energy usage.", progress: 88 },
              { name: "Natural Dyes", cert: "Oeko-Tex Certified", desc: "Plant-based colors. Zero chemical waste. Biodegradable.", progress: 92 },
            ].map((material, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    border: "1px solid #e8dfc5",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                    <Leaf size={24} style={{ color: "#2d5a3d", marginTop: "0.25rem" }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "900", marginBottom: "0.25rem" }}>{material.name}</h3>
                      <p style={{ fontSize: "0.8rem", fontWeight: "700", color: "#2d5a3d", marginBottom: "0.5rem" }}>
                        {material.cert}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "1rem" }}>{material.desc}</p>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <Progress value={material.progress} style={{ flex: 1 }} />
                    <p style={{ fontSize: "0.8rem", fontWeight: "700", color: "#2d5a3d", minWidth: "35px" }}>{material.progress}%</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Lookbook</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {lookbook.map((img, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setLightboxIndex(i)
                    setLightboxOpen(true)
                  }}
                  style={{
                    position: "relative",
                    aspectRatio: "1",
                    cursor: "pointer",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                  }}
                >
                  <Image src={img} alt={`Lookbook ${i + 1}`} fill style={{ objectFit: "cover" }} />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "90vw",
                height: "90vh",
                maxWidth: "800px",
              }}
            >
              <Image src={lookbook[lightboxIndex]} alt="Lookbook" fill style={{ objectFit: "contain" }} />
              <button
                onClick={() => setLightboxOpen(false)}
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: 0,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "2rem",
                }}
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f0e8d5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Customer Stories</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { quote: "I love knowing exactly where my clothes come from. Threadline makes sustainable accessible.", author: "Emma Rodriguez", role: "Designer" },
              { quote: "The quality is unmatched. These pieces last for years without losing shape or color.", author: "James Park", role: "Architect" },
              { quote: "Supporting B Corp and watching my impact grows. This is conscious consumption done right.", author: "Sarah Chen", role: "Activist" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "white",
                    borderLeft: "4px solid #2d5a3d",
                    borderRadius: "0.25rem",
                  }}
                >
                  <p style={{ fontSize: "1rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <p style={{ fontWeight: "900", fontSize: "0.95rem" }}>— {t.author}</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>{t.role}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Questions</h2>
          </Reveal>

          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger style={{ fontSize: "1rem", fontWeight: "700", padding: "1.25rem", color: "#1a1a1a" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{ padding: "0 1.25rem 1.25rem", fontSize: "0.95rem", opacity: 0.8, color: "#1a1a1a" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* B CORP & CERTIFICATIONS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#f0e8d5" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Certifications & Impact</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {[
              { name: "B Corp Certified", desc: "Meets highest standards of social and environmental responsibility" },
              { name: "Fair Trade Certified", desc: "Ensures fair wages and safe working conditions" },
              { name: "Carbon Neutral", desc: "All production and shipping offset through verified projects" },
              { name: "1% for the Planet", desc: "1% of revenue goes to environmental nonprofits" },
            ].map((cert, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    border: "1px solid #e8dfc5",
                    textAlign: "center",
                  }}
                >
                  <Award size={32} style={{ color: "#2d5a3d", margin: "0 auto 1rem" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "900", marginBottom: "0.5rem" }}>{cert.name}</h3>
                  <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>{cert.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#2d5a3d", color: "#f5f0e6" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem" }}>Join Our Community</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "2rem" }}>
              Get sustainability tips, new collection releases, and an exclusive 15% off your first order.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", maxWidth: "450px", margin: "0 auto 2rem" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "0.35rem",
                  color: "white",
                  fontSize: "0.95rem",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#f5f0e6",
                  color: "#2d5a3d",
                  fontWeight: "900",
                  borderRadius: "0.35rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <MagneticBtn className="px-6 py-2 bg-[#f5f0e6] text-[#2d5a3d] font-bold uppercase text-sm tracking-wider rounded">
              Shop Now <ArrowRight size={16} />
            </MagneticBtn>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
