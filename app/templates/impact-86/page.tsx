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
import {
  Menu, X, ArrowRight, Check, Star, Leaf, Heart, Award, ShoppingBag,
  Truck, RotateCcw, Globe, TreePine, Droplets, Wind, Users, Recycle,
  ChevronRight, Instagram, Twitter
} from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const NAV_LINKS = ["Collections", "Impact", "Materials", "About", "Journal"]

const STATS = [
  { label: "Carbon Neutral Since", value: "2021", icon: Wind, isText: true },
  { label: "GOTS-Certified Cotton", value: 100, suffix: "%", icon: Leaf },
  { label: "Trees Planted", value: 287000, suffix: "", icon: TreePine },
  { label: "Water Saved vs. Conventional", value: 74, suffix: "% less", icon: Droplets },
  { label: "B Corp Score", value: 143, suffix: "/200", icon: Award },
  { label: "Garments Upcycled", value: 52000, suffix: "+", icon: Recycle },
]

const COLLECTIONS = [
  { id: "essentials", label: "Essentials", icon: ShoppingBag },
  { id: "outerwear", label: "Outerwear", icon: Wind },
  { id: "denim", label: "Denim", icon: Leaf },
  { id: "accessories", label: "Accessories", icon: Heart },
]

const COLLECTION_DATA: Record<string, { headline: string; description: string; bullets: string[]; products: { name: string; price: string; material: string; img: string }[] }> = {
  essentials: {
    headline: "Basics That Outlast Trends",
    description: "Our Essentials line is built around a radical proposition: buy less, buy better. Each piece is engineered to a 500-wash standard using GOTS-certified organic pima cotton sourced exclusively from Fair Trade farms in Peru.",
    bullets: [
      "GOTS-certified organic pima cotton — 40% stronger than conventional",
      "Natural dye process — zero synthetic chemicals, fully biodegradable",
      "Reinforced seams with 200% standard thread density",
      "Lifetime repair guarantee — free mending at any partner tailor",
    ],
    products: [
      { name: "The Foundation Tee", price: "$68", material: "Organic Pima Cotton", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
      { name: "The Perfect Crew", price: "$95", material: "Merino Wool Blend", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80" },
      { name: "The Wide Leg Pant", price: "$145", material: "Organic Linen", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
    ],
  },
  outerwear: {
    headline: "Protection. Zero Compromise.",
    description: "Every Threadline jacket uses recycled post-consumer materials — from the shell to the lining — without sacrificing the performance you'd expect from a $600 technical garment.",
    bullets: [
      "Shell: 100% recycled PET from certified ocean plastic partners",
      "Fill: 650-fill recycled down, traceable to RDS-certified farms",
      "DWR coating: PFAS-free fluorocarbon alternative, 40-wash rated",
      "Carbon offset: every jacket plants 3 trees via One Tree Planted",
    ],
    products: [
      { name: "The Commuter Shell", price: "$298", material: "Recycled Ocean Plastic", img: "https://images.unsplash.com/photo-1539533057592-4ee29e8b254e?w=800&q=80" },
      { name: "The Mountain Puffer", price: "$345", material: "Recycled Down Fill", img: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=800&q=80" },
      { name: "The Trucker Jacket", price: "$225", material: "Hemp-Cotton Canvas", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" },
    ],
  },
  denim: {
    headline: "Denim That Doesn't Cost the Earth",
    description: "Traditional denim production uses 3,781 liters of water per pair of jeans. Ours uses 312 — a 92% reduction — achieved through our waterless dyeing partnership with Archroma.",
    bullets: [
      "Archroma Earth Colors waterless dyeing — 92% water reduction vs. conventional",
      "Organic cotton blended with hemp for natural stretch without elastane",
      "Ozone-finished washes — replaces 85% of traditional chemical processes",
      "End-of-life take-back: return worn jeans for 20% off your next pair",
    ],
    products: [
      { name: "The Selvedge Straight", price: "$195", material: "Japanese Selvedge Denim", img: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&q=80" },
      { name: "The Wide Leg Jean", price: "$175", material: "Organic Hemp-Cotton", img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80" },
      { name: "The Denim Jacket", price: "$215", material: "Deadstock Denim", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80" },
    ],
  },
  accessories: {
    headline: "Every Detail. Every Intention.",
    description: "Our accessories are made from forgotten materials — deadstock leather, reclaimed cork, and plant-tanned hides from tanneries with zero wastewater discharge.",
    bullets: [
      "Vegetable-tanned leather: chromium-free, biodegradable after 10 years",
      "Cork accessories: annually harvested without felling the tree",
      "Deadstock fabrics: rescued from fashion industry overproduction",
      "Packaging: 100% recycled kraft paper, zero plastic fill",
    ],
    products: [
      { name: "The Cork Tote", price: "$165", material: "Harvested Cork", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
      { name: "The Veg-Tan Belt", price: "$95", material: "Vegetable-Tanned Leather", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
      { name: "The Canvas Bucket Hat", price: "$72", material: "Organic Canvas", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80" },
    ],
  },
}

const TESTIMONIALS = [
  {
    name: "Emma Rodriguez",
    role: "Creative Director, Studio Nine",
    avatar: "ER",
    rating: 5,
    quote: "I've spent $3,000 on 'sustainable' fashion that fell apart in two seasons. The Foundation Tee is the first piece I've bought in years that I'm confident will outlive my other clothes.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    name: "James Park",
    role: "Environmental Policy Advisor",
    avatar: "JP",
    rating: 5,
    quote: "I review sustainability claims for a living. Threadline is one of maybe four brands in the world where the supply chain transparency lives up to the marketing. The B Corp score is real.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Naomi Asante",
    role: "Fashion Editor, Le Magazine",
    avatar: "NA",
    rating: 5,
    quote: "The Commuter Shell has been on my body through Paris, Tokyo, and three film festivals. It still looks like I just bought it. That's not fashion — that's engineering.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Dr. Marcus Chen",
    role: "Marine Biologist, Scripps Institute",
    avatar: "MC",
    rating: 5,
    quote: "The Mountain Puffer uses plastic from beaches we've studied. It's not performative — Threadline publishes the GPS coordinates of their collection points. That's integrity.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    name: "Léa Fontaine",
    role: "Architect & Slow Fashion Advocate",
    avatar: "LF",
    rating: 5,
    quote: "The sizing is generous without being vague, and the natural dyes age with absolute grace. My harvest-dyed crewneck looks better at 18 months than the day I bought it.",
    img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80",
  },
]

const PLANS = [
  {
    name: "Pay-As-You-Go",
    price: "Free",
    period: "",
    badge: null,
    description: "Shop individual pieces with standard free shipping on orders over $150.",
    features: [
      "Free shipping on orders over $150",
      "30-day returns on unworn items",
      "Access to all collections",
      "Digital impact report per order",
    ],
    cta: "Shop Now",
    highlighted: false,
  },
  {
    name: "Threadline Circle",
    price: "$12",
    period: "/mo",
    badge: "Most Value",
    description: "For the conscious wardrobe builder. Exclusive access, early drops, and 20% off every order.",
    features: [
      "20% off every order, forever",
      "Early access to new collections (48h)",
      "Free express shipping, always",
      "Free lifetime repairs",
      "Quarterly impact report with your name",
      "Access to sample sales and archive drops",
      "One free styling consultation/year",
    ],
    cta: "Join Circle",
    highlighted: true,
  },
  {
    name: "Wardrobe Curation",
    price: "$49",
    period: "/mo",
    badge: null,
    description: "A seasonal capsule wardrobe curated by our stylists, delivered to your door.",
    features: [
      "Everything in Circle",
      "Quarterly seasonal box (5–7 pieces)",
      "Personal stylist assigned",
      "Bespoke tailoring on 2 items/year",
      "VIP access to runway previews",
      "Carbon offset certificate (framed)",
    ],
    cta: "Apply for Curation",
    highlighted: false,
  },
]

const MATERIALS = [
  { name: "Organic Pima Cotton", cert: "GOTS Certified", progress: 100, color: "#2d5a3d", desc: "Grown in Peru under Fair Trade standards. No synthetic pesticides. Farmer wages 40% above local average." },
  { name: "Recycled Ocean Plastic", cert: "GRS Certified", progress: 94, color: "#2d5a3d", desc: "HDPE recovered from coastal communities in Indonesia and the Philippines via Plastic Bank partnerships." },
  { name: "Hemp Fiber", cert: "Oeko-Tex 100", progress: 97, color: "#2d5a3d", desc: "EU-grown industrial hemp. Sequesters 1.6 tonnes of CO₂ per hectare. Requires zero irrigation." },
  { name: "Vegetable-Tanned Leather", cert: "LWG Gold", progress: 88, color: "#2d5a3d", desc: "Chromium-free. Tanned using chestnut oak and mimosa bark. Fully biodegradable after product end-of-life." },
]

const FAQS = [
  {
    q: "What certifications does Threadline hold?",
    a: "We hold GOTS (Global Organic Textile Standard) certification for our cotton, GRS (Global Recycled Standard) for recycled materials, B Corp certification with a score of 143.2, and LWG Gold for our leather. All certifications are independently audited annually and available on our Transparency Portal.",
  },
  {
    q: "How does your carbon neutrality work?",
    a: "We first reduce emissions at source — our supply chain has cut Scope 3 emissions by 62% since 2019 through renewable energy partnerships and logistical optimization. Residual emissions are offset via Gold Standard-certified reforestation projects in Madagascar and Costa Rica. We publish our full carbon accounting annually.",
  },
  {
    q: "What is your return and repair policy?",
    a: "We offer 30-day free returns on unworn items. More importantly, we offer a Lifetime Repair Guarantee: if any Threadline garment develops a defect from normal wear, bring it to any of our 40+ partner tailors globally for free repair. Our Circle members also receive free shipping on all repairs.",
  },
  {
    q: "How do you ensure fair wages in your supply chain?",
    a: "All tier-1 manufacturing partners (the factories making your clothes) are Fair Trade certified and subject to annual third-party audits by Bureau Veritas. We publish the name and location of every tier-1 and tier-2 supplier on our Supply Chain Map, updated quarterly.",
  },
  {
    q: "What happens to my clothes at end of life?",
    a: "We run a free take-back program. Return any worn Threadline garment and receive 20% off your next purchase. Items in good condition are donated to partner nonprofits. Those beyond repair are mechanically shredded and re-spun into yarn via our partner Recover Brands — zero to landfill.",
  },
  {
    q: "How is Threadline different from other 'sustainable' brands?",
    a: "Most sustainable fashion brands optimize one or two dimensions — organic cotton or recycled materials. We operate across all five: materials sourcing, manufacturing conditions, dyeing processes, logistics, and end-of-life. Our Transparency Portal publishes the environmental data behind every product SKU. We don't do greenwashing — we do accounting.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes. We ship to 68 countries. For Circle members, international shipping is always free. For standard orders, we partner with DHL GoGreen for carbon-neutral international shipping. Duties and taxes are calculated at checkout with no surprises on delivery.",
  },
]

export default function ThreadlineSustainable() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("essentials")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<null | { name: string; price: string; material: string; img: string }>(null)
  const { scrollY } = useScroll()
  const heroParallaxY = useTransform(scrollY, [0, 700], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5])

  const toggleWishlist = (name: string) =>
    setWishlist(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])

  return (
    <div style={{ backgroundColor: "#f5f0e6", color: "#1a1a1a", minHeight: "100vh", overflowX: "hidden", scrollBehavior: "smooth" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(245,240,230,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(45,90,61,0.12)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2rem", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Leaf size={22} color="#2d5a3d" />
            <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em" }}>THREADLINE</span>
          </Link>

          <div className="hidden md:flex" style={{ gap: "2.5rem", alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(26,26,26,0.6)", textDecoration: "none" }}
                className="transition-all duration-200 hover:text-[#2d5a3d] cursor-pointer">{l}</a>
            ))}
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "0.55rem 1.4rem", background: "#2d5a3d", border: "none", borderRadius: 8, color: "#f5f0e6", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
              className="transition-all duration-200"
            >
              Shop Now
            </motion.button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer" style={{ background: "none", border: "none", color: "#2d5a3d" }}>
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "#f5f0e6", borderLeft: "1px solid rgba(45,90,61,0.12)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "3rem", padding: "0 1rem" }}>
                {NAV_LINKS.map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                    style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2d5a3d", textDecoration: "none" }} className="cursor-pointer">{l}</a>
                ))}
                <button style={{ padding: "0.8rem 1.5rem", background: "#2d5a3d", border: "none", borderRadius: 8, color: "#f5f0e6", fontWeight: 700, cursor: "pointer" }}>
                  Shop Now
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", paddingTop: 70 }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroParallaxY, opacity: heroOpacity }}>
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
            alt="Sustainable fashion"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(245,240,230,1) 0%, rgba(245,240,230,0.4) 50%, transparent 100%)" }} />
        </motion.div>

        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 2rem 8rem", width: "100%" }}>
          <Reveal>
            <Badge style={{ backgroundColor: "#2d5a3d", color: "#f5f0e6", border: "none", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "1.5rem" }}>
              B Corp Certified · Carbon Neutral Since 2021
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(3rem,8vw,6.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1.5rem", maxWidth: 800 }}>
              Wear what<br />
              <span style={{ color: "#2d5a3d" }}>the planet</span><br />
              approves of.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.15rem", color: "rgba(26,26,26,0.65)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 540 }}>
              Threadline makes the clothes you'll own for a decade — from organic materials, by fairly paid people, verified at every step. No greenwash. Just evidence.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "#2d5a3d", border: "none", borderRadius: 10, color: "#f5f0e6", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}
                className="transition-all duration-200"
              >
                Explore Collections <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "transparent", border: "1.5px solid rgba(45,90,61,0.4)", borderRadius: 10, color: "#2d5a3d", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
                className="transition-all duration-200 hover:border-[#2d5a3d]"
              >
                Our Impact Report
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section id="impact" style={{ background: "#2d5a3d", padding: "3.5rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "2rem" }}>
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ textAlign: "center" }}>
                  <Icon size={20} style={{ color: "rgba(245,240,230,0.6)", margin: "0 auto 0.6rem" }} />
                  <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f5f0e6", letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {stat.isText ? stat.value : (
                      <>
                        <span>{stat.value as number}</span>
                        {stat.suffix && <span style={{ fontSize: "1.1rem" }}>{stat.suffix}</span>}
                      </>
                    )}
                  </div>
                  <p style={{ fontSize: "0.73rem", color: "rgba(245,240,230,0.55)", marginTop: "0.4rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ── COLLECTIONS TABS ── */}
      <section id="collections" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2d5a3d", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Collections</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
              Four reasons to stop buying fast fashion.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: "1.05rem", color: "rgba(26,26,26,0.55)", marginBottom: "3.5rem", maxWidth: 560 }}>
              Each collection is built around a single obsession: making the best version of that garment that also happens to be the most responsible.
            </p>
          </Reveal>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList style={{ background: "rgba(45,90,61,0.07)", border: "1px solid rgba(45,90,61,0.12)", borderRadius: 12, padding: "0.3rem", display: "flex", gap: "0.25rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              {COLLECTIONS.map(col => {
                const Icon = col.icon
                return (
                  <TabsTrigger
                    key={col.id} value={col.id}
                    className="transition-all duration-200 cursor-pointer"
                    style={{ borderRadius: 8, padding: "0.6rem 1.2rem", fontWeight: 700, fontSize: "0.85rem", display: "flex", gap: "0.4rem", alignItems: "center" }}
                  >
                    <Icon size={15} />{col.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {Object.entries(COLLECTION_DATA).map(([key, data]) => (
              <TabsContent key={key} value={key}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start", marginBottom: "3rem" }} className="grid-cols-1 md:grid-cols-[1fr_2fr]">
                    <div>
                      <h3 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem", color: "#1a1a1a" }}>
                        {data.headline}
                      </h3>
                      <p style={{ fontSize: "0.93rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.75, marginBottom: "2rem" }}>
                        {data.description}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                        {data.bullets.map((b, i) => (
                          <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#2d5a3d20", border: "1px solid #2d5a3d40", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                              <Check size={11} color="#2d5a3d" />
                            </div>
                            <p style={{ fontSize: "0.87rem", color: "rgba(26,26,26,0.72)", lineHeight: 1.55 }}>{b}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
                      {data.products.map((product, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -6 }}
                          className="cursor-pointer transition-all duration-200"
                          style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(45,90,61,0.1)", boxShadow: "0 2px 12px rgba(45,90,61,0.06)" }}
                        >
                          <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                            <Image src={product.img} alt={product.name} fill style={{ objectFit: "cover" }} />
                            <motion.button
                              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                              onClick={() => toggleWishlist(product.name)}
                              className="cursor-pointer transition-all duration-200"
                              style={{ position: "absolute", top: "0.75rem", right: "0.75rem", width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <Heart size={15} fill={wishlist.includes(product.name) ? "#2d5a3d" : "none"} color="#2d5a3d" />
                            </motion.button>
                          </div>
                          <div style={{ padding: "1rem" }}>
                            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2d5a3d", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{product.material}</p>
                            <p style={{ fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.4rem", color: "#1a1a1a" }}>{product.name}</p>
                            <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "#2d5a3d" }}>{product.price}</p>
                            <motion.button
                              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                              onClick={() => setQuickViewProduct(product)}
                              className="cursor-pointer transition-all duration-200"
                              style={{ width: "100%", marginTop: "0.75rem", padding: "0.55rem", background: "#2d5a3d", border: "none", borderRadius: 8, color: "#f5f0e6", fontWeight: 700, fontSize: "0.8rem" }}
                            >
                              Quick View
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section id="materials" style={{ padding: "8rem 2rem", background: "#ede8dc" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2d5a3d", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Materials Transparency</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
                Know exactly what's in your clothes.
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(26,26,26,0.55)", maxWidth: 560 }}>
                Every material Threadline uses is published with its origin, certification, and environmental impact score. No mystery fabrics.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {MATERIALS.map((mat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="transition-all duration-200 cursor-pointer" style={{ background: "#fff", border: "1px solid rgba(45,90,61,0.1)", borderRadius: 16 }}>
                  <CardContent style={{ padding: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <div>
                        <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.3rem" }}>{mat.name}</h3>
                        <Badge style={{ background: "#2d5a3d15", color: "#2d5a3d", border: "1px solid #2d5a3d30", fontSize: "0.7rem", fontWeight: 700 }}>{mat.cert}</Badge>
                      </div>
                      <Leaf size={24} style={{ color: "#2d5a3d", flexShrink: 0 }} />
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.65, marginBottom: "1.5rem" }}>{mat.desc}</p>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(26,26,26,0.5)" }}>Sustainability Score</p>
                        <p style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2d5a3d" }}>{mat.progress}%</p>
                      </div>
                      <Progress value={mat.progress} style={{ height: 6 }} />
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2d5a3d", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Customer Stories</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>
                They checked the certifications. Then they bought the jacket.
              </h2>
            </div>
          </Reveal>
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent style={{ padding: "0 0.5rem" }}>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} style={{ paddingLeft: "1.5rem", flex: "0 0 380px" }}>
                  <Card style={{ background: "#fff", border: "1px solid rgba(45,90,61,0.1)", borderRadius: 16, height: "100%", boxShadow: "0 4px 24px rgba(45,90,61,0.06)" }}>
                    <CardContent style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#2d5a3d" color="#2d5a3d" />)}
                      </div>
                      <p style={{ fontSize: "0.93rem", color: "rgba(26,26,26,0.75)", lineHeight: 1.75, flex: 1 }}>"{t.quote}"</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <Avatar>
                          <AvatarImage src={t.img} alt={t.name} />
                          <AvatarFallback style={{ background: "#2d5a3d", color: "#f5f0e6", fontWeight: 700 }}>{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1a1a1a" }}>{t.name}</p>
                          <p style={{ fontSize: "0.78rem", color: "rgba(26,26,26,0.45)" }}>{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2.5rem" }}>
              <CarouselPrevious className="cursor-pointer" style={{ position: "static", transform: "none", background: "rgba(45,90,61,0.08)", border: "1px solid rgba(45,90,61,0.15)", color: "#2d5a3d" }} />
              <CarouselNext className="cursor-pointer" style={{ position: "static", transform: "none", background: "rgba(45,90,61,0.08)", border: "1px solid rgba(45,90,61,0.15)", color: "#2d5a3d" }} />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "8rem 2rem", background: "#ede8dc" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2d5a3d", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Membership</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
                The more you invest in quality,<br />the more you save.
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
            {PLANS.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    padding: "2.5rem",
                    borderRadius: 18,
                    border: plan.highlighted ? "2px solid #2d5a3d" : "1px solid rgba(45,90,61,0.12)",
                    background: plan.highlighted ? "#2d5a3d" : "#fff",
                    position: "relative",
                  }}
                >
                  {plan.badge && (
                    <Badge style={{ position: "absolute", top: "-0.75rem", right: "1.5rem", background: "#f5f0e6", color: "#2d5a3d", fontWeight: 700, border: "none" }}>
                      {plan.badge}
                    </Badge>
                  )}
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: plan.highlighted ? "rgba(245,240,230,0.6)" : "rgba(26,26,26,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>{plan.name}</p>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, color: plan.highlighted ? "#f5f0e6" : "#1a1a1a" }}>{plan.price}</span>
                    {plan.period && <span style={{ fontSize: "0.9rem", color: plan.highlighted ? "rgba(245,240,230,0.5)" : "rgba(26,26,26,0.4)", marginBottom: "0.4rem" }}>{plan.period}</span>}
                  </div>
                  <p style={{ fontSize: "0.87rem", color: plan.highlighted ? "rgba(245,240,230,0.65)" : "rgba(26,26,26,0.5)", marginBottom: "2rem", lineHeight: 1.55 }}>{plan.description}</p>
                  <Separator style={{ borderColor: plan.highlighted ? "rgba(245,240,230,0.15)" : "rgba(45,90,61,0.1)", marginBottom: "2rem" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2.5rem" }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <Check size={15} style={{ color: plan.highlighted ? "#f5f0e6" : "#2d5a3d", flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: "0.88rem", color: plan.highlighted ? "rgba(245,240,230,0.8)" : "rgba(26,26,26,0.7)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="transition-all duration-200 cursor-pointer"
                    style={{ width: "100%", padding: "0.85rem", background: plan.highlighted ? "#f5f0e6" : "#2d5a3d", border: "none", borderRadius: 10, color: plan.highlighted ? "#2d5a3d" : "#f5f0e6", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer" }}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2d5a3d", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Transparency</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>
                Ask us anything. We'll answer honestly.
              </h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} style={{ borderBottom: "1px solid rgba(45,90,61,0.12)" }}>
                <AccordionTrigger className="cursor-pointer transition-all duration-200" style={{ fontSize: "1rem", fontWeight: 700, padding: "1.5rem 0", color: "#1a1a1a", textAlign: "left" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{ fontSize: "0.93rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.75, paddingBottom: "1.5rem" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal>
            <div style={{ padding: "5rem 4rem", borderRadius: 24, background: "#2d5a3d", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.07),transparent)", pointerEvents: "none" }} />
              <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "rgba(245,240,230,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Join the Movement</p>
              <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f5f0e6", marginBottom: "1.25rem" }}>
                287,000 trees planted.<br />52,000 garments rescued.<br />You're next.
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(245,240,230,0.65)", marginBottom: "3rem", maxWidth: 520, margin: "0 auto 3rem" }}>
                Every Threadline purchase plants 3 trees, offsets your shipping carbon, and supports Fair Trade farmers. Shop better. Feel it.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.95rem 2.25rem", background: "#f5f0e6", border: "none", borderRadius: 10, color: "#2d5a3d", fontWeight: 800, fontSize: "1rem", cursor: "pointer" }}
                  className="transition-all duration-200"
                >
                  Shop Collections <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.95rem 2.25rem", background: "transparent", border: "1.5px solid rgba(245,240,230,0.3)", borderRadius: 10, color: "#f5f0e6", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}
                  className="transition-all duration-200"
                >
                  Join Circle — $12/mo
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(45,90,61,0.12)", padding: "5rem 2rem 3rem", background: "#1a1a1a", color: "#f5f0e6" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3,1fr)", gap: "4rem", marginBottom: "4rem" }} className="grid-cols-1 md:grid-cols-4">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Leaf size={22} color="#6dbb8a" />
                <span style={{ fontSize: "1.25rem", fontWeight: 900, letterSpacing: "-0.03em" }}>THREADLINE</span>
              </div>
              <p style={{ fontSize: "0.87rem", color: "rgba(245,240,230,0.45)", lineHeight: 1.7, maxWidth: 280 }}>
                B Corp Certified. Carbon Neutral Since 2021. GOTS, GRS, and Fair Trade certified supply chain.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                {[Instagram, Twitter, Globe].map((Icon, j) => (
                  <div key={j} className="cursor-pointer transition-all duration-200 hover:opacity-100" style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(245,240,230,0.06)", border: "1px solid rgba(245,240,230,0.1)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6 }}>
                    <Icon size={16} color="#f5f0e6" />
                  </div>
                ))}
              </div>
            </div>
            {[
              { heading: "Shop", links: ["Essentials", "Outerwear", "Denim", "Accessories", "Sale"] },
              { heading: "Company", links: ["About", "Impact", "Supply Chain", "Careers", "Press"] },
              { heading: "Help", links: ["Sizing Guide", "Shipping", "Returns & Repairs", "Circle Membership", "Contact"] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontWeight: 700, fontSize: "0.82rem", color: "rgba(245,240,230,0.9)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.heading}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {col.links.map(l => (
                    <a key={l} href="#" className="cursor-pointer transition-all duration-200 hover:text-white" style={{ fontSize: "0.87rem", color: "rgba(245,240,230,0.4)", textDecoration: "none" }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Separator style={{ borderColor: "rgba(245,240,230,0.08)", marginBottom: "1.5rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "rgba(245,240,230,0.3)" }}>© 2026 Threadline Inc. All rights reserved.</p>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {["B Corp", "GOTS", "Fair Trade", "1% Planet"].map(badge => (
                <Badge key={badge} style={{ background: "rgba(109,187,138,0.12)", color: "#6dbb8a", border: "1px solid rgba(109,187,138,0.2)", fontSize: "0.65rem", fontWeight: 700 }}>{badge}</Badge>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── QUICK VIEW DIALOG ── */}
      <Dialog open={!!quickViewProduct} onOpenChange={() => setQuickViewProduct(null)}>
        <DialogContent style={{ background: "#fff", border: "1px solid rgba(45,90,61,0.15)", borderRadius: 16, maxWidth: 580 }}>
          {quickViewProduct && (
            <>
              <DialogHeader>
                <DialogTitle style={{ color: "#1a1a1a", fontSize: "1.4rem", fontWeight: 900 }}>{quickViewProduct.name}</DialogTitle>
              </DialogHeader>
              <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", marginBottom: "1.5rem" }}>
                <Image src={quickViewProduct.img} alt={quickViewProduct.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2d5a3d", letterSpacing: "0.06em", textTransform: "uppercase" }}>{quickViewProduct.material}</p>
                  <p style={{ fontSize: "1.75rem", fontWeight: 900, color: "#1a1a1a" }}>{quickViewProduct.price}</p>
                </div>
                <Badge style={{ background: "#2d5a3d15", color: "#2d5a3d", border: "1px solid #2d5a3d30", fontWeight: 700 }}>Lifetime Repair Guarantee</Badge>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "0.9rem", background: "#2d5a3d", border: "none", borderRadius: 10, color: "#f5f0e6", fontWeight: 800, cursor: "pointer", fontSize: "0.95rem" }}
                className="transition-all duration-200"
              >
                Add to Bag <ArrowRight size={16} style={{ display: "inline", marginLeft: 6 }} />
              </motion.button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
