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
import { Instagram, ExternalLink, Star, Clock, MapPin, ChevronRight, ArrowRight, Menu, X, Heart, Award, Zap, Users } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
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
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={className} onClick={onClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  )
}

const ARTISTS = [
  { id: 1, name: "Marcus Steel", specialty: "Blackwork & Realism", years: 12, instagram: "@marcus_steel_ink", booked: "6 weeks out", rating: 5.0, pieces: 3200, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { id: 2, name: "Yuki Tanaka", specialty: "Japanese Traditional", years: 18, instagram: "@yuki_horimono", booked: "10 weeks out", rating: 5.0, pieces: 4800, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" },
  { id: 3, name: "Sofia Rossi", specialty: "Geometric & Fine Line", years: 9, instagram: "@sofia_geometric_ink", booked: "4 weeks out", rating: 4.9, pieces: 1900, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80" },
  { id: 4, name: "Diego Vega", specialty: "Neo-Traditional Color", years: 14, instagram: "@diego_vega_tattoo", booked: "8 weeks out", rating: 5.0, pieces: 3600, img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80" },
]

const STYLES = ["All", "Traditional", "Japanese", "Blackwork", "Realism", "Geometric", "Fine Line", "Neo-Traditional"]

const GALLERY = [
  { id: 1, style: "Japanese", artist: "Yuki Tanaka", title: "Koi & Lotus Sleeve", img: "https://images.unsplash.com/photo-1509840841025-9b8f58a68cc7?w=800&q=80" },
  { id: 2, style: "Blackwork", artist: "Marcus Steel", title: "Botanical Chest Piece", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
  { id: 3, style: "Geometric", artist: "Sofia Rossi", title: "Sacred Geometry Arm", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80" },
  { id: 4, style: "Realism", artist: "Diego Vega", title: "Portrait — Mother", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80" },
  { id: 5, style: "Traditional", artist: "Marcus Steel", title: "Eagle & Roses Back", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" },
  { id: 6, style: "Fine Line", artist: "Sofia Rossi", title: "Hummingbird Collarbone", img: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=800&q=80" },
  { id: 7, style: "Japanese", artist: "Yuki Tanaka", title: "Hannya & Peony Full Back", img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80" },
  { id: 8, style: "Neo-Traditional", artist: "Diego Vega", title: "Wolf & Mountains Thigh", img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80" },
  { id: 9, style: "Blackwork", artist: "Marcus Steel", title: "Mandala Spine", img: "https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?w=800&q=80" },
]

const TESTIMONIALS = [
  { name: "James Wilson", location: "New York, NY", style: "Full Sleeve — Japanese", text: "Yuki brought my entire vision to life. I'd waited 3 years for the right artist and she was absolutely worth it. The shading on my koi piece is breathtaking.", rating: 5, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
  { name: "Emma Thompson", location: "Brooklyn, NY", style: "Geometric Forearm", text: "Sofia's precision is on another level. She mapped out my geometric sleeve and every angle is perfectly aligned. This studio is the real deal.", rating: 5, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
  { name: "David Park", location: "Hoboken, NJ", style: "Realism Portrait", text: "Diego captured my daughter's face in a way I didn't think was possible in tattoo art. I had tears when I saw it. Absolute master of his craft.", rating: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
  { name: "Sarah Chen", location: "Queens, NY", style: "Fine Line Floral", text: "The cleanest fine line work I've seen. Sofia's linework doesn't tremble — it flows. My ribcage piece healed perfectly and I'm already booking my next one.", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
]

const PRICING = [
  { tier: "Small Piece", size: "Under 4\"", time: "1–2 hours", price: "$200–$400", desc: "Fine line florals, small symbols, single-element designs", popular: false },
  { tier: "Medium Piece", size: "4\"–8\"", time: "2–5 hours", price: "$400–$900", desc: "Detailed single subjects, medium sleeves sections, color work", popular: true },
  { tier: "Large Piece", size: "8\"–16\"", time: "5–12 hours", price: "$900–$2,400", desc: "Half sleeves, back pieces, thigh work, complex compositions", popular: false },
]

const FLASH = [
  { id: 1, title: "Rose & Dagger", style: "Traditional", price: "$250", available: 3, img: "https://images.unsplash.com/photo-1509840841025-9b8f58a68cc7?w=400&q=80" },
  { id: 2, title: "Koi Ascending", style: "Japanese", price: "$350", available: 2, img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&q=80" },
  { id: 3, title: "Geometric Sun", style: "Geometric", price: "$200", available: 5, img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
  { id: 4, title: "Wolf Portrait", style: "Realism", price: "$480", available: 1, img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80" },
  { id: 5, title: "Sacred Heart", style: "Traditional", price: "$280", available: 4, img: "https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?w=400&q=80" },
  { id: 6, title: "Hummingbird", style: "Fine Line", price: "$180", available: 6, img: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&q=80" },
]

export default function InkSoul() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeStyle, setActiveStyle] = useState("All")
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(0)
  const [selectedArtist, setSelectedArtist] = useState<typeof ARTISTS[0] | null>(null)
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [artistDialogOpen, setArtistDialogOpen] = useState(false)
  const [galleryItem, setGalleryItem] = useState<typeof GALLERY[0] | null>(null)
  const [toast, setToast] = useState("")
  const [wishlist, setWishlist] = useState<number[]>([])

  const filtered = activeStyle === "All" ? GALLERY : GALLERY.filter(g => g.style === activeStyle)

  const handleBookingComplete = () => {
    setToast("Booking request sent! We'll confirm within 24 hours.")
    setTimeout(() => { setBookingOpen(false); setBookingStep(0); setToast("") }, 3000)
  }

  return (
    <div ref={containerRef} style={{ backgroundColor: "#080808", color: "#f5ede0", minHeight: "100vh", overflowX: "hidden", scrollBehavior: "smooth" }}>
      {/* HEADER */}
      <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(16px)", backgroundColor: "rgba(8,8,8,0.85)", borderBottom: "1px solid rgba(185,28,28,0.2)" }}
        className="px-6 md:px-12 py-4 flex justify-between items-center"
      >
        <div>
          <span style={{ color: "#b91c1c", fontWeight: 900, fontSize: "1.4rem", letterSpacing: "0.08em" }}>INK</span>
          <span style={{ color: "#f5ede0", fontWeight: 300, fontSize: "1.4rem", letterSpacing: "0.08em" }}> & SOUL</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          {["Portfolio", "Artists", "Flash", "Pricing", "FAQ"].map(item => (
            <Link key={item} href="#" style={{ color: "#f5ede0", opacity: 0.8, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }} className="hover:opacity-100 hover:text-[#b91c1c] transition-all duration-200">{item}</Link>
          ))}
        </nav>
        <MagneticBtn onClick={() => setBookingOpen(true)} className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-200 hover:opacity-90" style={{ backgroundColor: "#b91c1c", color: "#fff" }}>
          Book Now <ArrowRight size={14} />
        </MagneticBtn>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden cursor-pointer" style={{ color: "#f5ede0" }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 40, backgroundColor: "#0f0f0f", borderBottom: "1px solid rgba(185,28,28,0.15)" }}
            className="px-6 py-4 space-y-3 md:hidden"
          >
            {["Portfolio", "Artists", "Flash", "Pricing", "FAQ"].map(item => (
              <p key={item} onClick={() => setMobileOpen(false)} style={{ color: "#f5ede0", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.85rem" }} className="cursor-pointer hover:text-[#b91c1c] transition-all duration-200 py-1">{item}</p>
            ))}
            <button onClick={() => { setBookingOpen(true); setMobileOpen(false) }} className="w-full py-3 rounded-full font-bold cursor-pointer mt-2" style={{ backgroundColor: "#b91c1c", color: "#fff" }}>Book Consultation</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <motion.div style={{ y: heroY, position: "absolute", inset: "-10% 0 -10% 0" }}>
          <Image src="https://images.unsplash.com/photo-1572483219656-7855d8e8eef5?w=800&q=80" alt="Ink & Soul Studio" fill priority unoptimized style={{ objectFit: "cover" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.85) 100%)" }} />

        {/* Floating stat cards */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
          style={{ position: "absolute", top: "28%", right: "6%", backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(185,28,28,0.25)", borderRadius: "1rem", padding: "1.25rem 1.5rem", zIndex: 10 }}
          className="hidden md:block"
        >
          <p style={{ color: "#b91c1c", fontSize: "1.8rem", fontWeight: 900 }}>4.97</p>
          <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#b91c1c" color="#b91c1c" />)}</div>
          <p style={{ color: "#f5ede0", opacity: 0.6, fontSize: "0.72rem", letterSpacing: "0.06em" }}>2,800+ reviews</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.7 }}
          style={{ position: "absolute", bottom: "20%", left: "5%", backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(185,28,28,0.25)", borderRadius: "1rem", padding: "1.25rem 1.5rem", zIndex: 10 }}
          className="hidden md:block"
        >
          <div className="flex items-center gap-2 mb-1">
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e" }} />
            <span style={{ color: "#22c55e", fontSize: "0.72rem", fontWeight: 700 }}>ACCEPTING BOOKINGS</span>
          </div>
          <p style={{ color: "#f5ede0", fontSize: "0.8rem" }}>Next slot: 2 weeks</p>
        </motion.div>

        <motion.div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", paddingLeft: "clamp(1.5rem, 8vw, 7rem)", zIndex: 10, opacity: heroOpacity }}>
          <Reveal delay={0.1}>
            <Badge style={{ backgroundColor: "rgba(185,28,28,0.15)", color: "#b91c1c", border: "1px solid rgba(185,28,28,0.3)", marginBottom: "1.5rem", letterSpacing: "0.12em", fontSize: "0.72rem" }}>
              NEW YORK'S PREMIER TATTOO STUDIO — EST. 2009
            </Badge>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: "1.5rem", color: "#f5ede0" }}>
              PERMANENT<br /><span style={{ color: "#b91c1c" }}>ART.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(245,237,224,0.7)", maxWidth: "480px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
              15 years. 4 master artists. 40,000+ stories permanently written into skin.
              Your next chapter starts here.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex gap-4 flex-wrap">
              <MagneticBtn onClick={() => setBookingOpen(true)} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold cursor-pointer text-sm transition-all duration-200 hover:opacity-90" style={{ backgroundColor: "#b91c1c", color: "#fff", letterSpacing: "0.06em" }}>
                Book Free Consultation <ArrowRight size={15} />
              </MagneticBtn>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold cursor-pointer text-sm transition-all duration-200"
                style={{ backgroundColor: "transparent", border: "2px solid rgba(245,237,224,0.3)", color: "#f5ede0" }}
              >
                View Portfolio
              </motion.button>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section style={{ backgroundColor: "#b91c1c", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem" }}>
          {[
            { icon: Award, label: "Years in Business", value: 15, suffix: "" },
            { icon: Users, label: "Master Artists", value: 4, suffix: "" },
            { icon: Zap, label: "Tattoos Completed", value: 40, suffix: "K+" },
            { icon: Star, label: "Avg Rating", value: 497, suffix: "" },
          ].map(({ icon: Icon, label, value, suffix }, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div className="flex justify-center mb-2"><Icon size={20} color="rgba(255,255,255,0.7)" /></div>
                <p style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                  {i === 3 ? "4.97" : <Counter target={value} suffix={suffix} />}
                </p>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.3rem" }}>{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PORTFOLIO GALLERY */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1300px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ color: "#b91c1c", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Our Work</p>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#f5ede0", letterSpacing: "-0.02em" }}>Portfolio Gallery</h2>
            </div>
          </div>
        </Reveal>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {STYLES.map(s => (
            <motion.button key={s} onClick={() => setActiveStyle(s)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="cursor-pointer transition-all duration-200"
              style={{ padding: "0.5rem 1.25rem", borderRadius: "2rem", border: `1px solid ${activeStyle === s ? "#b91c1c" : "rgba(185,28,28,0.25)"}`, backgroundColor: activeStyle === s ? "#b91c1c" : "transparent", color: activeStyle === s ? "#fff" : "rgba(245,237,224,0.7)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em" }}
            >{s}</motion.button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8 }} onClick={() => setGalleryItem(item)}
                style={{ cursor: "pointer", position: "relative", borderRadius: "1rem", overflow: "hidden", aspectRatio: "1", border: "1px solid rgba(185,28,28,0.15)" }}
                className="group"
              >
                <Image src={item.img} alt={item.title} fill unoptimized style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" />
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.25 }}
                  style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 50%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}
                >
                  <Badge style={{ backgroundColor: "#b91c1c", color: "#fff", alignSelf: "flex-start", marginBottom: "0.5rem", fontSize: "0.7rem" }}>{item.style}</Badge>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>{item.title}</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem" }}>by {item.artist}</p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ARTISTS */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#0d0d0d" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ color: "#b91c1c", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>The Team</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#f5ede0", letterSpacing: "-0.02em", marginBottom: "3rem" }}>Meet Our Artists</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2rem" }}>
            {ARTISTS.map((artist, i) => (
              <Reveal key={artist.id} delay={i * 0.1}>
                <motion.div whileHover={{ y: -10 }} onClick={() => { setSelectedArtist(artist); setArtistDialogOpen(true) }}
                  style={{ backgroundColor: "#111", borderRadius: "1.25rem", overflow: "hidden", border: "1px solid rgba(185,28,28,0.15)", cursor: "pointer" }}
                  className="group"
                >
                  <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                    <Image src={artist.img} alt={artist.name} fill unoptimized style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #111 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                      <Badge style={{ backgroundColor: "rgba(185,28,28,0.85)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "0.68rem" }}>
                        {artist.booked}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#f5ede0", marginBottom: "0.25rem" }}>{artist.name}</h3>
                    <p style={{ color: "#b91c1c", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.75rem" }}>{artist.specialty}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} color="rgba(245,237,224,0.5)" />
                        <span style={{ color: "rgba(245,237,224,0.5)", fontSize: "0.75rem" }}>{artist.years} yrs exp</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} fill="#b91c1c" color="#b91c1c" />
                        <span style={{ color: "#f5ede0", fontSize: "0.78rem", fontWeight: 700 }}>{artist.rating}</span>
                      </div>
                    </div>
                    <Separator style={{ backgroundColor: "rgba(185,28,28,0.15)", margin: "1rem 0" }} />
                    <div className="flex items-center gap-1.5">
                      <Instagram size={13} color="#b91c1c" />
                      <span style={{ color: "#b91c1c", fontSize: "0.75rem" }}>{artist.instagram}</span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH DESIGNS */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ color: "#b91c1c", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Walk-in Friendly</p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#f5ede0", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Flash Designs</h2>
          <p style={{ color: "rgba(245,237,224,0.55)", marginBottom: "3rem", maxWidth: "500px" }}>Pre-drawn designs available for immediate booking. First come, first served.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {FLASH.map((flash, i) => (
            <Reveal key={flash.id} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }}
                style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(185,28,28,0.2)", backgroundColor: "#0d0d0d" }}
              >
                <div style={{ position: "relative", height: "220px" }}>
                  <Image src={flash.img} alt={flash.title} fill unoptimized style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 55%)" }} />
                  <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                    <Badge style={{ backgroundColor: "#b91c1c", color: "#fff", fontSize: "0.68rem" }}>{flash.style}</Badge>
                  </div>
                  <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                    <motion.button
                      whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                      onClick={() => setWishlist(w => w.includes(flash.id) ? w.filter(x => x !== flash.id) : [...w, flash.id])}
                      style={{ padding: "0.4rem", borderRadius: "50%", backgroundColor: "rgba(8,8,8,0.7)", backdropFilter: "blur(8px)", cursor: "pointer", border: "none" }}
                    >
                      <Heart size={16} fill={wishlist.includes(flash.id) ? "#b91c1c" : "none"} color={wishlist.includes(flash.id) ? "#b91c1c" : "#f5ede0"} />
                    </motion.button>
                  </div>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 style={{ fontWeight: 800, color: "#f5ede0", fontSize: "1rem" }}>{flash.title}</h4>
                      <p style={{ color: "rgba(245,237,224,0.45)", fontSize: "0.75rem", marginTop: "0.2rem" }}>{flash.available} available</p>
                    </div>
                    <p style={{ color: "#b91c1c", fontWeight: 900, fontSize: "1.1rem" }}>{flash.price}</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setBookingOpen(true)}
                    className="cursor-pointer w-full mt-3 py-2.5 rounded-lg font-bold text-sm transition-all duration-200"
                    style={{ backgroundColor: "rgba(185,28,28,0.1)", border: "1px solid rgba(185,28,28,0.3)", color: "#b91c1c" }}
                  >
                    Claim This Design
                  </motion.button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#0d0d0d" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ color: "#b91c1c", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Transparent Rates</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#f5ede0", letterSpacing: "-0.02em", marginBottom: "3rem" }}>Pricing Guide</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8, borderColor: "rgba(185,28,28,0.5)" }}
                  style={{ borderRadius: "1.25rem", border: `2px solid ${tier.popular ? "#b91c1c" : "rgba(185,28,28,0.15)"}`, backgroundColor: tier.popular ? "rgba(185,28,28,0.06)" : "#111", padding: "2rem", position: "relative" }}
                >
                  {tier.popular && (
                    <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)" }}>
                      <Badge style={{ backgroundColor: "#b91c1c", color: "#fff", borderRadius: "0 0 0.5rem 0.5rem", fontSize: "0.68rem", letterSpacing: "0.08em" }}>MOST POPULAR</Badge>
                    </div>
                  )}
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#f5ede0", marginBottom: "0.25rem" }}>{tier.tier}</h3>
                  <p style={{ color: "rgba(245,237,224,0.45)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>{tier.size} · {tier.time}</p>
                  <p style={{ color: "#b91c1c", fontWeight: 900, fontSize: "2rem", letterSpacing: "-0.02em", marginBottom: "1rem" }}>{tier.price}</p>
                  <p style={{ color: "rgba(245,237,224,0.6)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{tier.desc}</p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setBookingOpen(true)}
                    className="w-full py-3 rounded-lg font-bold text-sm cursor-pointer transition-all duration-200"
                    style={{ backgroundColor: tier.popular ? "#b91c1c" : "transparent", border: `2px solid ${tier.popular ? "#b91c1c" : "rgba(185,28,28,0.3)"}`, color: tier.popular ? "#fff" : "#b91c1c" }}
                  >
                    Book This Size
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ color: "#b91c1c", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Client Stories</p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#f5ede0", letterSpacing: "-0.02em", marginBottom: "3rem" }}>What They Say</h2>
        </Reveal>
        <Carousel className="w-full">
          <CarouselContent>
            {TESTIMONIALS.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                <Reveal delay={i * 0.1}>
                  <motion.div whileHover={{ y: -4 }}
                    style={{ backgroundColor: "#0d0d0d", borderRadius: "1.25rem", border: "1px solid rgba(185,28,28,0.15)", padding: "2rem", height: "100%" }}
                  >
                    <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#b91c1c" color="#b91c1c" />)}</div>
                    <p style={{ color: "rgba(245,237,224,0.8)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.75rem", fontStyle: "italic" }}>"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-11 h-11">
                        <AvatarImage src={t.img} />
                        <AvatarFallback style={{ backgroundColor: "#b91c1c", color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>{t.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p style={{ fontWeight: 800, color: "#f5ede0", fontSize: "0.9rem" }}>{t.name}</p>
                        <p style={{ color: "rgba(245,237,224,0.45)", fontSize: "0.75rem" }}>{t.style}</p>
                      </div>
                      <div className="ml-auto">
                        <Badge style={{ backgroundColor: "rgba(185,28,28,0.1)", color: "#b91c1c", border: "1px solid rgba(185,28,28,0.2)", fontSize: "0.68rem" }}>
                          <MapPin size={9} className="mr-1" />{t.location}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious style={{ backgroundColor: "#111", border: "1px solid rgba(185,28,28,0.3)", color: "#b91c1c" }} />
          <CarouselNext style={{ backgroundColor: "#111", border: "1px solid rgba(185,28,28,0.3)", color: "#b91c1c" }} />
        </Carousel>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#0d0d0d" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#f5ede0", letterSpacing: "-0.02em", marginBottom: "3rem" }}>Frequently Asked Questions</h2>
          </Reveal>
          <Accordion type="single" collapsible>
            {[
              { q: "What is your consultation process?", a: "All consultations are free and run 30–45 minutes. We review your reference images, discuss placement, sizing, and style. Walk-ins welcome, or book online for a reserved slot." },
              { q: "How long does a tattoo session take?", a: "Small pieces (under 3 inches) take 1–2 hours. Medium work runs 2–5 hours. Larger sleeves and back pieces are split across multiple sessions of 4–6 hours each." },
              { q: "Can I bring my own design?", a: "Absolutely. We welcome custom references. Your artist will refine and adapt your concept into a design built specifically for your body's natural contours." },
              { q: "How should I prepare for my session?", a: "Eat a full meal 2 hours before, stay hydrated, avoid alcohol for 24 hours, and wear loose, comfortable clothing that allows easy access to the tattooed area." },
              { q: "What is your touch-up policy?", a: "Free touch-ups are included for 90 days post-session. Any healing irregularities are corrected at no charge. After 90 days, we offer discounted rates for our returning clients." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} style={{ borderBottom: "1px solid rgba(185,28,28,0.15)" }}>
                <AccordionTrigger style={{ color: "#f5ede0", fontWeight: 700, fontSize: "0.95rem", textAlign: "left" }} className="hover:text-[#b91c1c] transition-all duration-200">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent style={{ color: "rgba(245,237,224,0.65)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(185,28,28,0.2) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, color: "#f5ede0", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
              YOUR STORY<br /><span style={{ color: "#b91c1c" }}>DESERVES INK.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ color: "rgba(245,237,224,0.6)", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
              Book a free 30-minute consultation with one of our master artists. No commitment. Just a conversation.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <MagneticBtn onClick={() => setBookingOpen(true)} className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold cursor-pointer text-sm transition-all duration-200" style={{ backgroundColor: "#b91c1c", color: "#fff", letterSpacing: "0.06em" }}>
              Book Free Consultation <ArrowRight size={16} />
            </MagneticBtn>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="flex items-center justify-center gap-3 mt-5">
              <MapPin size={14} color="rgba(245,237,224,0.4)" />
              <p style={{ color: "rgba(245,237,224,0.4)", fontSize: "0.8rem" }}>140 Orchard Street, Lower East Side, New York, NY 10002</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#080808", borderTop: "1px solid rgba(185,28,28,0.12)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <span style={{ color: "#b91c1c", fontWeight: 900, fontSize: "1.2rem" }}>INK</span>
            <span style={{ color: "#f5ede0", fontWeight: 300, fontSize: "1.2rem" }}> & SOUL</span>
            <p style={{ color: "rgba(245,237,224,0.3)", fontSize: "0.75rem", marginTop: "0.25rem" }}>Est. 2009 · New York City</p>
          </div>
          <p style={{ color: "rgba(245,237,224,0.25)", fontSize: "0.75rem" }}>© 2026 Ink & Soul Studio. All rights reserved.</p>
        </div>
      </footer>

      {/* BOOKING DIALOG */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent style={{ backgroundColor: "#111", border: "1px solid rgba(185,28,28,0.25)", borderRadius: "1.25rem", maxWidth: "500px" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "#f5ede0", fontSize: "1.4rem", fontWeight: 900 }}>Book a Consultation</DialogTitle>
          </DialogHeader>
          {/* Progress */}
          <div className="flex gap-2 mb-6">
            {["Style", "Artist", "Date"].map((label, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: "3px", borderRadius: "2px", backgroundColor: i <= bookingStep ? "#b91c1c" : "rgba(185,28,28,0.2)", marginBottom: "0.4rem" }} />
                <span style={{ fontSize: "0.7rem", color: i <= bookingStep ? "#b91c1c" : "rgba(245,237,224,0.3)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
              </div>
            ))}
          </div>
          {bookingStep === 0 && (
            <div>
              <p style={{ color: "rgba(245,237,224,0.7)", marginBottom: "1rem", fontSize: "0.9rem" }}>What style interests you?</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {["Traditional", "Japanese", "Blackwork", "Realism", "Geometric", "Fine Line"].map(s => (
                  <button key={s} onClick={() => { setSelectedStyle(s); setBookingStep(1) }}
                    style={{ padding: "0.9rem", backgroundColor: selectedStyle === s ? "rgba(185,28,28,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${selectedStyle === s ? "#b91c1c" : "rgba(185,28,28,0.15)"}`, borderRadius: "0.75rem", color: "#f5ede0", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                    className="hover:border-[#b91c1c] transition-all duration-200"
                  >{s}</button>
                ))}
              </div>
            </div>
          )}
          {bookingStep === 1 && (
            <div>
              <p style={{ color: "rgba(245,237,224,0.7)", marginBottom: "1rem", fontSize: "0.9rem" }}>Select your artist</p>
              <div className="space-y-3">
                {ARTISTS.map(a => (
                  <button key={a.id} onClick={() => { setSelectedArtist(a); setBookingStep(2) }}
                    style={{ width: "100%", padding: "1rem", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(185,28,28,0.15)", borderRadius: "0.75rem", color: "#f5ede0", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}
                    className="hover:border-[#b91c1c] transition-all duration-200"
                  >
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{a.name}</p>
                    <p style={{ color: "#b91c1c", fontSize: "0.78rem" }}>{a.specialty} · {a.booked}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {bookingStep === 2 && (
            <div className="space-y-4">
              <p style={{ color: "rgba(245,237,224,0.7)", fontSize: "0.9rem" }}>Choose a preferred date</p>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                style={{ width: "100%", padding: "0.9rem", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(185,28,28,0.2)", borderRadius: "0.75rem", color: "#f5ede0", fontSize: "0.9rem", cursor: "pointer" }}
              />
              <textarea placeholder="Tell us about your tattoo vision..." rows={4}
                style={{ width: "100%", padding: "0.9rem", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(185,28,28,0.2)", borderRadius: "0.75rem", color: "#f5ede0", fontSize: "0.9rem", resize: "none", fontFamily: "inherit" }}
              />
              <MagneticBtn onClick={handleBookingComplete} className="w-full py-3.5 rounded-xl font-bold cursor-pointer transition-all duration-200" style={{ backgroundColor: "#b91c1c", color: "#fff" }}>
                Confirm Booking Request
              </MagneticBtn>
            </div>
          )}
          {bookingStep > 0 && (
            <button onClick={() => setBookingStep(bookingStep - 1)} style={{ color: "rgba(245,237,224,0.45)", fontSize: "0.8rem", cursor: "pointer", background: "none", border: "none", marginTop: "0.5rem", textAlign: "center", width: "100%" }}>
              Back
            </button>
          )}
        </DialogContent>
      </Dialog>

      {/* ARTIST DETAIL DIALOG */}
      <Dialog open={artistDialogOpen} onOpenChange={setArtistDialogOpen}>
        <DialogContent style={{ backgroundColor: "#111", border: "1px solid rgba(185,28,28,0.25)", borderRadius: "1.25rem", maxWidth: "580px" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "#f5ede0", fontSize: "1.4rem", fontWeight: 900 }}>{selectedArtist?.name}</DialogTitle>
          </DialogHeader>
          {selectedArtist && (
            <div>
              <div style={{ position: "relative", height: "280px", borderRadius: "1rem", overflow: "hidden", marginBottom: "1.5rem" }}>
                <Image src={selectedArtist.img} alt={selectedArtist.name} fill unoptimized style={{ objectFit: "cover" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                {[
                  { label: "Specialty", val: selectedArtist.specialty },
                  { label: "Experience", val: `${selectedArtist.years} years` },
                  { label: "Availability", val: selectedArtist.booked },
                ].map(({ label, val }) => (
                  <div key={label} style={{ backgroundColor: "rgba(185,28,28,0.07)", borderRadius: "0.75rem", padding: "0.9rem", border: "1px solid rgba(185,28,28,0.15)" }}>
                    <p style={{ color: "#b91c1c", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{label}</p>
                    <p style={{ color: "#f5ede0", fontSize: "0.85rem", fontWeight: 600 }}>{val}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <MagneticBtn onClick={() => { setArtistDialogOpen(false); setBookingOpen(true) }} className="flex-1 py-3 rounded-xl font-bold cursor-pointer transition-all duration-200" style={{ backgroundColor: "#b91c1c", color: "#fff" }}>
                  Book with {selectedArtist.name.split(" ")[0]}
                </MagneticBtn>
                <a href={`https://instagram.com/${selectedArtist.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 1.5rem", borderRadius: "0.75rem", border: "1px solid rgba(185,28,28,0.3)", color: "#b91c1c", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
                  className="hover:bg-[rgba(185,28,28,0.08)] transition-all duration-200"
                >
                  <Instagram size={15} /> Instagram
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* GALLERY LIGHTBOX */}
      <Dialog open={!!galleryItem} onOpenChange={() => setGalleryItem(null)}>
        <DialogContent style={{ backgroundColor: "#080808", border: "1px solid rgba(185,28,28,0.2)", borderRadius: "1.25rem", maxWidth: "680px" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "#f5ede0", fontWeight: 900 }}>{galleryItem?.title}</DialogTitle>
          </DialogHeader>
          {galleryItem && (
            <div>
              <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", aspectRatio: "1", marginBottom: "1rem" }}>
                <Image src={galleryItem.img} alt={galleryItem.title} fill unoptimized style={{ objectFit: "cover" }} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Badge style={{ backgroundColor: "#b91c1c", color: "#fff", marginRight: "0.5rem" }}>{galleryItem.style}</Badge>
                  <span style={{ color: "rgba(245,237,224,0.5)", fontSize: "0.82rem" }}>by {galleryItem.artist}</span>
                </div>
                <MagneticBtn onClick={() => { setGalleryItem(null); setBookingOpen(true) }} className="flex items-center gap-2 px-5 py-2 rounded-full font-bold cursor-pointer text-sm transition-all duration-200" style={{ backgroundColor: "#b91c1c", color: "#fff" }}>
                  Book Similar <ArrowRight size={13} />
                </MagneticBtn>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            style={{ position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", backgroundColor: "#b91c1c", color: "#fff", padding: "1rem 2rem", borderRadius: "2rem", fontWeight: 700, zIndex: 100, boxShadow: "0 8px 32px rgba(185,28,28,0.4)", whiteSpace: "nowrap" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
