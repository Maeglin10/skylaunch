"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { X, Menu, ChevronDown, ArrowRight, Star, Globe, MapPin, Mail, Phone, Calendar, Users } from "lucide-react"

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const initial =
    direction === "left" ? { opacity: 0, x: -40 } :
    direction === "right" ? { opacity: 0, x: 40 } :
    { opacity: 0, y: 30 }
  const animate =
    direction === "left" || direction === "right" ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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
    const step = Math.ceil(target / 60)
    const t = setInterval(() => setCount(c => Math.min(c + step, target)), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}

const artists = [
  { id: 1, name: "Elena Rossi", category: "Painting", country: "Italy", img: "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?q=80&w=400&auto=format&fit=crop", bio: "Contemporary painter exploring color theory and abstraction through large-scale installations.", works: 24, price: "from $8,000" },
  { id: 2, name: "Marcus Chen", category: "Sculpture", country: "Taiwan", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop", bio: "Award-winning sculptor blending traditional techniques with modern industrial materials.", works: 18, price: "from $15,000" },
  { id: 3, name: "Sophia Wells", category: "Photography", country: "UK", img: "https://images.unsplash.com/photo-1552053831-71594a27c62d?q=80&w=400&auto=format&fit=crop", bio: "Documentary photographer capturing fleeting urban landscapes and profound human connection.", works: 42, price: "from $3,200" },
  { id: 4, name: "David Park", category: "Digital", country: "South Korea", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=400&auto=format&fit=crop", bio: "Digital artist pioneering generative NFT and blockchain integration in contemporary fine art.", works: 31, price: "from $5,000" },
  { id: 5, name: "Amara Okafor", category: "Painting", country: "Nigeria", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", bio: "Vibrant expressionist creating powerful cultural narratives through richly layered acrylic.", works: 28, price: "from $12,000" },
  { id: 6, name: "James Mitchell", category: "Sculpture", country: "USA", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", bio: "Installation artist transforming public spaces into immersive sensory environments.", works: 15, price: "from $20,000" },
  { id: 7, name: "Lucia Moretti", category: "Photography", country: "Argentina", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop", bio: "Fashion and portrait photographer blending surrealist fine art with commercial aesthetics.", works: 36, price: "from $4,500" },
  { id: 8, name: "Jin Zhang", category: "Digital", country: "China", img: "https://images.unsplash.com/photo-1517070213202-1332aab541fe?q=80&w=400&auto=format&fit=crop", bio: "New media artist exploring the intersection of technology, ecology, and cultural identity.", works: 22, price: "from $6,500" },
]

const galleries = ["Gagosian", "White Cube", "Thaddaeus Ropac", "Perrotin", "David Castillo", "Hauser & Wirth", "Saatchi", "Pace Gallery"]

const testimonials = [
  { quote: "Meridian introduced me to artists who fundamentally changed my perspective on contemporary art. The curation is simply impeccable.", author: "Victoria Chen", role: "Private Collector, Hong Kong" },
  { quote: "The investment advisory team helped me build a collection I'm proud of. Every purchase has appreciated significantly.", author: "Robert Blackwell", role: "Art Investor, London" },
  { quote: "A gateway to emerging and established talent that galleries and institutions trust year after year.", author: "Sarah Nguyen", role: "Gallery Director, Paris" },
]

const faqs = [
  { q: "How do I purchase artwork?", a: "Browse our curated gallery, click 'Inquire' on any piece, and our expert team handles authentication, provenance verification, insurance, and white-glove delivery—globally." },
  { q: "Is there a VIP preview event?", a: "Absolutely. Join our exclusive VIP circle for 48-hour early access before the public launch, plus private viewings with featured artists and a champagne reception." },
  { q: "What about international shipping?", a: "We ship globally with climate-controlled transport, full fine-art insurance, and dedicated customs clearance support for every purchased piece." },
  { q: "Can I commission custom work?", a: "Yes—many of our artists accept commissions. Contact our curatorial team and we'll connect you directly with the artist for bespoke project discussions and pricing." },
  { q: "Do you offer payment plans?", a: "Flexible payment plans are available for acquisitions over $5,000. We also offer financing through our vetted partner network, with interest-free options for VIP members." },
]

const schedule = [
  { name: "VIP Preview Night", date: "May 16", time: "6 PM – 9 PM", access: "VIP Only", color: "#c0392b" },
  { name: "Grand Opening", date: "May 17", time: "10 AM – 10 PM", access: "All Welcome", color: "#1e293b" },
  { name: "Weekend Programme", date: "May 18–19", time: "9 AM – 6 PM", access: "All Welcome", color: "#1e293b" },
  { name: "Closing Day", date: "May 20", time: "10 AM – 5 PM", access: "Final Day", color: "#64748b" },
]

export default function MeridianArtFair() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null)
  const [showVipModal, setShowVipModal] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [vipEmail, setVipEmail] = useState("")
  const [vipName, setVipName] = useState("")
  const [vipRole, setVipRole] = useState("Collector")
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 180])

  const categories = ["All", "Painting", "Sculpture", "Digital", "Photography"]
  const filteredArtists = selectedCategory === "All" ? artists : artists.filter(a => a.category === selectedCategory)

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5500)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#0a0a0a", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(255,255,255,0.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid #c0392b20" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#c0392b", letterSpacing: "-0.03em", lineHeight: 1 }}>MERIDIAN</h1>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", opacity: 0.45, textTransform: "uppercase" }}>International Art Fair</p>
          </div>
          <div style={{ display: "none", gap: "2.5rem", alignItems: "center" }} className="md:flex">
            {["Gallery", "Schedule", "Artists", "About"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0a0a0a", opacity: 0.65, textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.65")}>
                {item}
              </a>
            ))}
            <motion.button onClick={() => setShowVipModal(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "0.625rem 1.25rem", backgroundColor: "#c0392b", color: "white", border: "none", borderRadius: "0.375rem", fontWeight: "700", fontSize: "0.8125rem", cursor: "pointer" }}>
              VIP Access
            </motion.button>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }} className="md:hidden">
                <Menu size={24} color="#c0392b" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "white" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginTop: "2.5rem" }}>
                {["Gallery", "Schedule", "Artists", "About"].map((item) => (
                  <a key={item} href="#" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0a0a0a", textDecoration: "none" }}>{item}</a>
                ))}
                <button onClick={() => setShowVipModal(true)} style={{ marginTop: "1rem", padding: "0.875rem", backgroundColor: "#c0392b", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: "700", cursor: "pointer", fontSize: "1rem" }}>
                  Join VIP Circle
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HERO */}
      <motion.section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", paddingTop: "72px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <Image src="https://images.unsplash.com/photo-1541367777708-7905fe3296c0?q=80&w=1600&auto=format&fit=crop" alt="Meridian Art Fair" fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.72) 55%, rgba(255,255,255,0.2) 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", minHeight: "calc(100vh - 72px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem", padding: "0.375rem 0.875rem", backgroundColor: "#c0392b12", border: "1px solid #c0392b30", borderRadius: "9999px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#c0392b", display: "inline-block" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.12em", color: "#c0392b", textTransform: "uppercase" }}>May 16–20, 2025 · Paris</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 style={{ fontSize: "clamp(2.75rem, 11vw, 7rem)", fontWeight: "900", lineHeight: 1.0, marginBottom: "2rem", letterSpacing: "-0.03em" }}>
              Where <span style={{ color: "#c0392b" }}>Art</span><br />Transcends<br /><span style={{ color: "#c0392b" }}>Boundaries</span>
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontSize: "1.125rem", opacity: 0.65, marginBottom: "2.75rem", maxWidth: "540px", lineHeight: 1.7 }}>
              Discover masterworks from 200 emerging and established artists across 40 countries. Fifteen years of uncompromising curatorial excellence.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <MagneticBtn
                onClick={() => setShowVipModal(true)}
                className="px-8 py-3 bg-[#c0392b] text-white font-black uppercase text-sm tracking-wider rounded hover:bg-[#a93221] transition-colors"
              >
                Join VIP Circle
              </MagneticBtn>
              <button style={{ padding: "0.875rem 2rem", backgroundColor: "transparent", color: "#0a0a0a", border: "2px solid #0a0a0a", borderRadius: "0.375rem", fontWeight: "700", fontSize: "0.875rem", cursor: "pointer" }}>
                Explore Gallery
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
              {[{ value: "200+", label: "Artists" }, { value: "40", label: "Countries" }, { value: "12K+", label: "Visitors" }, { value: "15", label: "Years" }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "2rem", fontWeight: "900", color: "#c0392b", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <motion.div style={{ position: "absolute", bottom: "2rem", left: "50%", x: "-50%" }} animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <ChevronDown size={28} style={{ color: "#c0392b" }} />
        </motion.div>
      </motion.section>

      {/* STATS BANNER */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#0a0a0a", color: "#ffffff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {[
            { label: "Featured Artists", value: 200, suffix: "" },
            { label: "Countries", value: 40, suffix: "" },
            { label: "Annual Visitors", value: 12, suffix: "K" },
            { label: "Years of Excellence", value: 15, suffix: "" },
            { label: "Pieces Sold", value: 850, suffix: "+" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "0.5rem", color: "#c0392b" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p style={{ fontSize: "0.75rem", opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600" }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ARTIST GRID */}
      <section style={{ padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <Reveal>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", color: "#c0392b", textTransform: "uppercase", marginBottom: "0.5rem" }}>2025 Edition</p>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: "900", letterSpacing: "-0.02em" }}>Featured Artists</h2>
                <p style={{ fontSize: "0.95rem", opacity: 0.55, marginTop: "0.5rem" }}>Click any artist to explore their portfolio</p>
              </div>
            </Reveal>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  style={{
                    padding: "0.625rem 1.25rem",
                    backgroundColor: selectedCategory === cat ? "#c0392b" : "transparent",
                    color: selectedCategory === cat ? "white" : "#0a0a0a",
                    border: `2px solid ${selectedCategory === cat ? "#c0392b" : "#d4d4d8"}`,
                    borderRadius: "9999px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    transition: "all 0.25s ease",
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            <AnimatePresence>
              {filteredArtists.map((artist, i) => (
                <motion.div
                  key={artist.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedArtist(artist)}
                  whileHover={{ y: -6 }}
                  style={{
                    cursor: "pointer",
                    borderRadius: "0.875rem",
                    overflow: "hidden",
                    border: "1px solid #e4e4e7",
                    backgroundColor: "white",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                    <Image src={artist.img} alt={artist.name} fill style={{ objectFit: "cover", filter: "grayscale(30%)", transition: "all 0.5s ease" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.7) 100%)" }} />
                    <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                      <span style={{ padding: "0.25rem 0.75rem", backgroundColor: "#c0392b", color: "white", fontSize: "0.7rem", fontWeight: "700", borderRadius: "9999px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {artist.category}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                        <Globe size={11} /> {artist.country}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: "900" }}>{artist.name}</h3>
                      <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "#c0392b" }}>{artist.price}</span>
                    </div>
                    <p style={{ fontSize: "0.8125rem", opacity: 0.6, lineHeight: 1.55, marginBottom: "1rem" }}>{artist.bio}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", opacity: 0.45 }}>{artist.works} works</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#c0392b", fontSize: "0.8125rem", fontWeight: "700" }}>
                        View Portfolio <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* PROGRAM TABS */}
      <section style={{ padding: "7rem 2rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", color: "#c0392b", textTransform: "uppercase", marginBottom: "0.75rem" }}>Plan Your Visit</p>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: "900" }}>Event Programs</h2>
            </div>
          </Reveal>

          <Tabs defaultValue="exhibitions">
            <TabsList style={{ display: "flex", justifyContent: "center", gap: "0.75rem", backgroundColor: "transparent", padding: "0.5rem", flexWrap: "wrap" }}>
              {["Exhibitions", "Talks", "Workshops", "VIP"].map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase()} style={{ padding: "0.75rem 1.5rem", borderRadius: "9999px", fontWeight: "600" }}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {[
              {
                id: "exhibitions", items: [
                  { title: "Main Gallery", desc: "200 curated works across all mediums, spanning four interconnected halls.", time: "Daily 10 AM – 6 PM" },
                  { title: "Emerging Artists Platform", desc: "A dedicated showcase for 50 breakthrough voices not yet seen at scale.", time: "Daily 10 AM – 6 PM" },
                  { title: "Digital & NFT Wing", desc: "Immersive new-media installations and a verified digital art marketplace.", time: "Daily 10 AM – 8 PM" },
                ]
              },
              {
                id: "talks", items: [
                  { title: "Artist Conversations", desc: "Direct dialogue with featured artists in an intimate 60-person setting.", time: "Daily 2 PM & 4 PM" },
                  { title: "Curator Panels", desc: "Leading curators from MoMA, Tate, and Pompidou share market insights.", time: "Daily 3 PM" },
                  { title: "Collectors Forum", desc: "Closed-door roundtable on emerging investment trends in contemporary art.", time: "May 18, 11 AM" },
                ]
              },
              {
                id: "workshops", items: [
                  { title: "Collecting 101", desc: "Authentication, pricing, and building a coherent collection from scratch.", time: "May 17 & 18" },
                  { title: "Art Business Bootcamp", desc: "Strategies for emerging galleries, dealers, and independent artists.", time: "May 19" },
                  { title: "Conservation Masterclass", desc: "Expert guidance on protecting and preserving acquired works long-term.", time: "May 20, 9 AM" },
                ]
              },
              {
                id: "vip", items: [
                  { title: "Preview Night", desc: "Exclusive 48-hour early access with champagne reception and artist meet-and-greet.", time: "May 16, 6 PM" },
                  { title: "Artist Dinners", desc: "Intimate curated dinners for eight collectors and one featured artist.", time: "May 17–19" },
                  { title: "Private Viewing Rooms", desc: "Appointment-only rooms for high-value acquisitions with full advisory support.", time: "By Request" },
                ]
              },
            ].map((tab) => (
              <TabsContent key={tab.id} value={tab.id} style={{ marginTop: "2.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                  {tab.items.map((item, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        style={{ padding: "2rem", backgroundColor: "white", borderRadius: "0.875rem", border: "1px solid #e4e4e7", borderTop: "3px solid #c0392b" }}
                      >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "900", marginBottom: "0.625rem" }}>{item.title}</h3>
                        <p style={{ fontSize: "0.875rem", opacity: 0.65, marginBottom: "1.25rem", lineHeight: 1.6 }}>{item.desc}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Calendar size={14} style={{ color: "#c0392b" }} />
                          <span style={{ fontSize: "0.8125rem", fontWeight: "700", color: "#c0392b" }}>{item.time}</span>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* GALLERY PARTNERS MARQUEE */}
      <section style={{ padding: "3rem 2rem", backgroundColor: "#f0f0f0", overflow: "hidden" }}>
        <Reveal>
          <p style={{ fontSize: "0.75rem", fontWeight: "700", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.5, marginBottom: "1.75rem" }}>
            Represented by World-Leading Galleries
          </p>
        </Reveal>
        <div style={{ overflow: "hidden" }}>
          <motion.div animate={{ x: [0, -1600] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap" }}>
            {[...galleries, ...galleries, ...galleries].map((g, i) => (
              <div key={i} style={{ fontSize: "1rem", fontWeight: "700", opacity: 0.5, minWidth: "fit-content" }}>{g}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COLLECTOR SERVICES */}
      <section style={{ padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", color: "#c0392b", textTransform: "uppercase", marginBottom: "0.75rem" }}>White-Glove</p>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: "900" }}>Collector Services</h2>
            </div>
          </Reveal>

          <Accordion type="single" collapsible>
            {[
              { trigger: "Acquisition & Authentication", content: "Our expert team manages the entire acquisition process—provenance verification, certificate of authenticity, fine-art insurance, and white-glove delivery from gallery wall to your home anywhere in the world." },
              { trigger: "Investment Advisory", content: "Portfolio consultations with specialist art market advisors. We provide performance tracking, diversification strategy, secondary market analysis, and access to private sale opportunities not listed publicly." },
              { trigger: "Appraisal & Documentation", content: "Professional appraisals for insurance and estate planning purposes. Each report includes complete documentation, high-resolution image archive, and certificates of authenticity from our accredited appraisers." },
              { trigger: "Storage & Conservation", content: "Access to our climate-controlled fine-art storage facilities in Paris, London, and New York. Professional conservation, restoration, and condition-reporting services available on request." },
              { trigger: "VIP Concierge", content: "Dedicated relationship manager for VIP members. Priority access to private previews, artist studios, exclusive auction viewings, and curated travel experiences around the global art calendar." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`service-${i}`}>
                <AccordionTrigger style={{ fontSize: "1rem", fontWeight: "700", padding: "1.375rem" }}>
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent style={{ padding: "0 1.375rem 1.375rem", fontSize: "0.9375rem", opacity: 0.75, lineHeight: 1.7 }}>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "7rem 2rem", backgroundColor: "#0a0a0a", color: "white" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", color: "#c0392b", textTransform: "uppercase", marginBottom: "0.75rem" }}>Collector Stories</p>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: "900" }}>What They Say</h2>
            </div>
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              style={{ padding: "3rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "1.25rem", borderLeft: "4px solid #c0392b", textAlign: "center" }}
            >
              <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginBottom: "2rem" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#c0392b" color="#c0392b" />)}
              </div>
              <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontStyle: "italic", lineHeight: 1.7, marginBottom: "2rem", opacity: 0.9 }}>
                "{testimonials[activeTestimonial].quote}"
              </p>
              <p style={{ fontWeight: "900", fontSize: "1rem" }}>{testimonials[activeTestimonial].author}</p>
              <p style={{ fontSize: "0.8125rem", opacity: 0.5, marginTop: "0.25rem" }}>{testimonials[activeTestimonial].role}</p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2.5rem" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 32 : 8, height: 8, borderRadius: "9999px", backgroundColor: i === activeTestimonial ? "#c0392b" : "#374151", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "7rem 2rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", color: "#c0392b", textTransform: "uppercase", marginBottom: "0.75rem" }}>Got Questions?</p>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: "900" }}>Frequently Asked</h2>
            </div>
          </Reveal>

          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger style={{ fontSize: "1rem", fontWeight: "700", padding: "1.375rem" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{ padding: "0 1.375rem 1.375rem", fontSize: "0.9375rem", opacity: 0.75, lineHeight: 1.7 }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* VENUE */}
      <section style={{ padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "5rem", alignItems: "center" }}>
          <Reveal direction="left">
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.15em", color: "#c0392b", textTransform: "uppercase", marginBottom: "1rem" }}>Venue</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: "900", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>Grand Palais, Paris</h2>
              <p style={{ fontSize: "1rem", opacity: 0.65, lineHeight: 1.75, marginBottom: "2.5rem" }}>
                Set within the iconic iron-and-glass architecture of the Grand Palais, Meridian 2025 unfolds across 14,000 square metres of curated galleries, immersive installations, and live artist spaces.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: <MapPin size={18} />, text: "3 Avenue du Général Eisenhower, 75008 Paris" },
                  { icon: <Calendar size={18} />, text: "May 16–20, 2025" },
                  { icon: <Mail size={18} />, text: "hello@meridianartfair.com" },
                  { icon: <Phone size={18} />, text: "+33 1 58 00 01 02" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", backgroundColor: "#c0392b12", display: "flex", alignItems: "center", justifyContent: "center", color: "#c0392b", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: "0.9375rem", opacity: 0.7 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "1.5rem", overflow: "hidden" }}>
              <Image src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=900&auto=format&fit=crop" alt="Grand Palais Paris" fill style={{ objectFit: "cover" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "7rem 2rem", backgroundColor: "#c0392b", color: "white", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: 400, height: 400, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "8%", width: 250, height: 250, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "900", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>Ready to Collect?</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: "1.125rem", opacity: 0.85, marginBottom: "3rem", maxWidth: "520px", margin: "0 auto 3rem", lineHeight: 1.65 }}>
              Join our VIP circle for early access, exclusive previews, and personalized acquisition support from our expert team.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button onClick={() => setShowVipModal(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ padding: "1rem 2.5rem", backgroundColor: "white", color: "#c0392b", fontWeight: "900", fontSize: "1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", display: "inline-flex", gap: "0.75rem", alignItems: "center", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Join VIP <ArrowRight size={20} />
              </motion.button>
              <button style={{ padding: "1rem 2.5rem", backgroundColor: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.45)", fontWeight: "700", borderRadius: "0.5rem", cursor: "pointer" }}>
                Learn More
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ARTIST DETAIL MODAL */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtist(null)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: "1.5rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: "white", borderRadius: "1.25rem", overflow: "hidden", maxWidth: "660px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <div style={{ position: "relative", minHeight: "320px" }}>
                <Image src={selectedArtist.img} alt={selectedArtist.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column" }}>
                <button onClick={() => setSelectedArtist(null)} style={{ alignSelf: "flex-end", background: "none", border: "none", cursor: "pointer", marginBottom: "1rem" }}>
                  <X size={22} />
                </button>
                <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#c0392b", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.5rem" }}>{selectedArtist.category}</span>
                <h3 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "0.375rem" }}>{selectedArtist.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", opacity: 0.5, fontSize: "0.8125rem", marginBottom: "1.25rem" }}>
                  <Globe size={13} /> {selectedArtist.country}
                </div>
                <p style={{ opacity: 0.65, fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "0.75rem", flex: 1 }}>{selectedArtist.bio}</p>
                <p style={{ fontSize: "0.8125rem", opacity: 0.45, marginBottom: "1.75rem" }}>{selectedArtist.works} works · {selectedArtist.price}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button style={{ padding: "0.875rem", backgroundColor: "#c0392b", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: "700", cursor: "pointer", textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.06em" }}>
                    View Portfolio
                  </button>
                  <button style={{ padding: "0.875rem", backgroundColor: "transparent", color: "#0a0a0a", border: "2px solid #e4e4e7", borderRadius: "0.5rem", fontWeight: "700", cursor: "pointer" }}>
                    Inquire About Works
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIP MODAL */}
      <AnimatePresence>
        {showVipModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVipModal(false)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 70, padding: "1.5rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: "white", borderRadius: "1.25rem", padding: "3rem", maxWidth: "480px", width: "100%", position: "relative" }}
            >
              <button onClick={() => setShowVipModal(false)} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", cursor: "pointer" }}>
                <X size={22} />
              </button>
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c0392b" color="#c0392b" />)}
              </div>
              <h3 style={{ fontSize: "1.875rem", fontWeight: "900", marginBottom: "0.75rem" }}>Join MERIDIAN VIP</h3>
              <p style={{ opacity: 0.65, marginBottom: "2rem", lineHeight: 1.6, fontSize: "0.9375rem" }}>
                Get exclusive early access, private viewings with featured artists, and personalised acquisition support from our curatorial team.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={vipName}
                  onChange={(e) => setVipName(e.target.value)}
                  style={{ padding: "0.875rem", border: "2px solid #e4e4e7", borderRadius: "0.5rem", fontSize: "0.9375rem", outline: "none" }}
                  onFocus={e => (e.target.style.borderColor = "#c0392b")}
                  onBlur={e => (e.target.style.borderColor = "#e4e4e7")}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={vipEmail}
                  onChange={(e) => setVipEmail(e.target.value)}
                  style={{ padding: "0.875rem", border: "2px solid #e4e4e7", borderRadius: "0.5rem", fontSize: "0.9375rem", outline: "none" }}
                  onFocus={e => (e.target.style.borderColor = "#c0392b")}
                  onBlur={e => (e.target.style.borderColor = "#e4e4e7")}
                />
                <select
                  value={vipRole}
                  onChange={(e) => setVipRole(e.target.value)}
                  style={{ padding: "0.875rem", border: "2px solid #e4e4e7", borderRadius: "0.5rem", fontSize: "0.9375rem", outline: "none", color: "#0a0a0a" }}
                >
                  <option>Collector</option>
                  <option>Gallery Director</option>
                  <option>Art Advisor</option>
                  <option>Investor</option>
                  <option>Press / Media</option>
                  <option>Other</option>
                </select>
              </div>
              <motion.button
                whileHover={{ backgroundColor: "#a93221" }}
                style={{ width: "100%", padding: "1rem", backgroundColor: "#c0392b", color: "white", fontWeight: "900", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                Confirm & Join VIP
              </motion.button>
              <p style={{ fontSize: "0.75rem", opacity: 0.4, textAlign: "center", marginTop: "1rem" }}>Your data is never shared. Unsubscribe at any time.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
