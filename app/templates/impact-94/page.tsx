"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ExternalLink, ChevronRight, Heart } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
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

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export default function InkSoul() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("All")
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null)
  const [bookingStep, setBookingStep] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [selectedBookingStyle, setSelectedBookingStyle] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showToast, setShowToast] = useState<string | null>(null)

  const filters = ["All", "Traditional", "Japanese", "Blackwork", "Realism", "Geometric"]

  const artists = [
    { id: 1, name: "Marcus Steel", specialty: "Blackwork & Realism", years: 12, instagram: "@marcus_steel", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
    { id: 2, name: "Yuki Tanaka", specialty: "Japanese Traditional", years: 18, instagram: "@yuki_ink", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
    { id: 3, name: "Sofia Rossi", specialty: "Geometric & Fine Line", years: 15, instagram: "@sofia_geometric", img: "https://images.unsplash.com/photo-1535713566543-0ca82e64d466?q=80&w=400" },
    { id: 4, name: "Alex Chen", specialty: "Color & Realism", years: 10, instagram: "@alex_chen_ink", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  ]

  const flashes = [
    { id: 1, style: "Traditional", price: "$150", design: "Rose & Snake" },
    { id: 2, style: "Japanese", price: "$200", design: "Koi Wave" },
    { id: 3, style: "Blackwork", price: "$120", design: "Geometric Lines" },
    { id: 4, style: "Realism", price: "$250", design: "Portrait Frame" },
    { id: 5, style: "Geometric", price: "$180", design: "Sacred Geometry" },
    { id: 6, style: "Traditional", price: "$160", design: "Anchor & Chain" },
  ]

  const testimonials = [
    { name: "James Wilson", style: "Sleeve Piece", text: "Marcus brought my entire vision to life. Absolutely flawless execution.", rating: 5 },
    { name: "Emma Thompson", style: "Geometric", text: "Sofia's precision and creativity are unmatched. Best decision ever.", rating: 5 },
    { name: "David Park", style: "Japanese", text: "Yuki's knowledge of traditional Japanese symbolism elevated my piece.", rating: 5 },
  ]

  const faqs = [
    { q: "What is your consultation process?", a: "Initial consultations are 30 minutes and completely free. We discuss your design vision, placement, size, and any concerns. Book online or walk in." },
    { q: "How long does a tattoo take?", a: "Depends on size and complexity. Small pieces: 30min-1hr. Medium: 2-3hrs. Large sleeves: multiple sessions. We break longer pieces into sessions." },
    { q: "Can I bring my own design?", a: "Yes! We love custom designs. Bring reference images and we'll work with you. Our artists will refine and perfect your concept." },
    { q: "How is pain managed during the session?", a: "Most clients tolerate the pain well. We take breaks, and some areas hurt more than others. Topical numbing cream available upon request." },
    { q: "What if I need touch-ups later?", a: "Free touch-ups within 60 days. After that, we offer discounted rates. We stand behind our work and want it to age beautifully." },
  ]

  const handleBooking = () => {
    if (bookingStep === 2 && selectedDate) {
      setShowToast("Booking confirmed! Check your email for details.")
      setTimeout(() => {
        setSelectedArtwork(null)
        setBookingStep(0)
        setSelectedBookingStyle(null)
        setSelectedArtist(null)
        setSelectedDate(null)
        setShowToast(null)
      }, 2000)
    }
  }

  return (
    <div ref={containerRef} style={{ backgroundColor: "#0a0a0a", color: "#f5f0e8", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#0a0a0add", backdropFilter: "blur(10px)", borderBottom: "1px solid #b91c1c20" }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: "#b91c1c", fontSize: "1.5rem", fontWeight: "bold" }}>INK & SOUL</h1>
        <nav className="hidden md:flex gap-8">
          {["Portfolio", "Artists", "Flash", "FAQ"].map((item) => (
            <Link key={item} href="#" style={{ color: "#f5f0e8" }} className="hover:text-[#b91c1c] transition-colors text-sm font-medium">{item}</Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ color: "#b91c1c" }}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ backgroundColor: "#1a1a1a", zIndex: 40, marginTop: "60px", borderBottom: "1px solid #b91c1c20" }} className="md:hidden py-4 px-6">
            {["Portfolio", "Artists", "Flash", "FAQ"].map((item) => (
              <p key={item} style={{ color: "#f5f0e8" }} className="py-2 font-medium">{item}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ y: parallaxY }}>
          <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop" alt="Tattoo Studio" fill unoptimized priority style={{ objectFit: "cover" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10 }}>
          <Reveal delay={0.1}><h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#b91c1c" }}>PERMANENT ART</h2></Reveal>
          <Reveal delay={0.2}><p style={{ fontSize: "1.25rem", marginBottom: "2rem", color: "#f5f0e8" }}>15 years. 8 artists. 40K stories permanently written.</p></Reveal>
          <Reveal delay={0.3}><MagneticBtn className="px-8 py-3 rounded-full font-bold uppercase text-sm" style={{ color: "#0a0a0a", backgroundColor: "#b91c1c" } as any}>Book Consultation</MagneticBtn></Reveal>
        </div>
      </section>

      {/* Portfolio Gallery with Filters */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#b91c1c" }}>Portfolio Gallery</h3></Reveal>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
          {filters.map((filter) => (
            <motion.button key={filter} onClick={() => setActiveTab(filter)} whileHover={{ scale: 1.05 }} style={{ padding: "0.75rem 1.75rem", border: `2px solid ${activeTab === filter ? "#b91c1c" : "#b91c1c40"}`, borderRadius: "30px", backgroundColor: activeTab === filter ? "#b91c1c" : "transparent", color: activeTab === filter ? "#0a0a0a" : "#b91c1c", cursor: "pointer", fontWeight: "bold", transition: "all 0.3s" }}>{filter}</motion.button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <motion.div whileHover={{ y: -5 }} onClick={() => setSelectedArtwork(idx + 1)} style={{ cursor: "pointer", position: "relative" }}>
                <div style={{ position: "relative", aspectRatio: "1", borderRadius: "0.75rem", overflow: "hidden", marginBottom: "0.75rem", border: "2px solid #b91c1c" }}>
                  <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop" alt={`Tattoo ${idx + 1}`} fill unoptimized style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a, transparent)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: "1rem" }} onMouseEnter={(e) => { (e.target as any).style.opacity = "1" }} onMouseLeave={(e) => { (e.target as any).style.opacity = "0" }}>
                    <span style={{ color: "#b91c1c", fontWeight: "bold", fontSize: "0.875rem" }}>View Details</span>
                  </div>
                </div>
                <h4 style={{ fontWeight: "bold", color: "#b91c1c", marginBottom: "0.25rem" }}>{filters[Math.floor(Math.random() * (filters.length - 1)) + 1]}</h4>
                <p style={{ color: "#d4a017", fontSize: "0.875rem" }}>by {artists[Math.floor(Math.random() * artists.length)].name}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Artist Roster */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#b91c1c" }}>Meet Our Artists</h3></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {artists.map((artist, idx) => (
              <Reveal key={artist.id} delay={idx * 0.1}>
                <motion.div whileHover={{ y: -10 }} style={{ textAlign: "center", padding: "1.5rem", backgroundColor: "#0a0a0a", borderRadius: "1rem", border: "2px solid #b91c1c20" }}>
                  <div style={{ position: "relative", aspectRatio: "1", borderRadius: "1rem", overflow: "hidden", marginBottom: "1.5rem", border: "2px solid #b91c1c" }}>
                    <Image src={artist.img} alt={artist.name} fill unoptimized style={{ objectFit: "cover" }} />
                  </div>
                  <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#f5f0e8" }}>{artist.name}</h4>
                  <p style={{ color: "#b91c1c", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "bold" }}>{artist.specialty}</p>
                  <p style={{ color: "#d4a017", marginBottom: "1rem", fontSize: "0.875rem" }}>{artist.years} years experience</p>
                  <a href={`https://instagram.com/${artist.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#b91c1c", textDecoration: "none", fontWeight: "bold", fontSize: "0.875rem" }}>
                    {artist.instagram} <ExternalLink size={14} />
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Booking Flow */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#b91c1c" }}>Book Your Tattoo</h3></Reveal>
        <Reveal delay={0.1}>
          <div style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "1rem", border: "2px solid #b91c1c20" }}>
            {/* Progress Indicator */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem", position: "relative" }}>
              <div style={{ position: "absolute", top: "20px", left: 0, right: 0, height: "2px", backgroundColor: "#b91c1c20" }} />
              <div style={{ position: "absolute", top: "20px", left: 0, height: "2px", backgroundColor: "#b91c1c", width: `${bookingStep * 50}%`, transition: "width 0.3s" }} />
              {["Style", "Artist", "Date"].map((label, i) => (
                <div key={i} style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: i <= bookingStep ? "#b91c1c" : "#333", border: "2px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", color: i <= bookingStep ? "#0a0a0a" : "#f5f0e8", fontWeight: "bold" }}>
                    {i + 1}
                  </div>
                  <p style={{ color: "#f5f0e8", fontSize: "0.875rem", fontWeight: "bold" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Step 0: Style Selection */}
            {bookingStep === 0 && (
              <div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#f5f0e8" }}>Select your preferred style:</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {["Traditional", "Japanese", "Blackwork", "Realism", "Geometric", "Fine Line"].map((style) => (
                    <button key={style} onClick={() => { setSelectedBookingStyle(style); setBookingStep(1) }} style={{ padding: "1rem", backgroundColor: "#0a0a0a", border: "2px solid #b91c1c40", color: "#f5f0e8", borderRadius: "0.75rem", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={(e) => { (e.target as any).style.borderColor = "#b91c1c"; (e.target as any).style.backgroundColor = "#b91c1c20" }} onMouseLeave={(e) => { (e.target as any).style.borderColor = "#b91c1c40"; (e.target as any).style.backgroundColor = "#0a0a0a" }}>
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Artist Selection */}
            {bookingStep === 1 && (
              <div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#f5f0e8" }}>Choose your artist:</h4>
                <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                  {artists.map((artist) => (
                    <button key={artist.id} onClick={() => { setSelectedArtist(artist.id); setBookingStep(2) }} style={{ padding: "1rem", backgroundColor: "#0a0a0a", border: "2px solid #b91c1c40", color: "#f5f0e8", borderRadius: "0.75rem", textAlign: "left", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={(e) => { (e.target as any).style.borderColor = "#b91c1c"; (e.target as any).style.backgroundColor = "#b91c1c20" }} onMouseLeave={(e) => { (e.target as any).style.borderColor = "#b91c1c40"; (e.target as any).style.backgroundColor = "#0a0a0a" }}>
                      <p style={{ marginBottom: "0.25rem" }}>{artist.name}</p>
                      <p style={{ fontSize: "0.875rem", color: "#b91c1c" }}>{artist.specialty} • {artist.years} years</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {bookingStep === 2 && (
              <div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#f5f0e8" }}>Select a date:</h4>
                <input type="date" value={selectedDate || ""} onChange={(e) => setSelectedDate(e.target.value)} style={{ width: "100%", padding: "1rem", marginBottom: "1.5rem", borderRadius: "0.75rem", border: "2px solid #b91c1c", backgroundColor: "#0a0a0a", color: "#f5f0e8", fontWeight: "bold", cursor: "pointer" }} />
                <textarea placeholder="Tell us about your tattoo idea..." style={{ width: "100%", padding: "1rem", marginBottom: "1.5rem", borderRadius: "0.75rem", border: "2px solid #b91c1c40", backgroundColor: "#0a0a0a", color: "#f5f0e8", fontFamily: "inherit", minHeight: "100px", resize: "vertical" }} />
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              {bookingStep > 0 && (
                <button onClick={() => setBookingStep(bookingStep - 1)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "transparent", border: "2px solid #b91c1c", color: "#b91c1c", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer" }}>
                  Back
                </button>
              )}
              {bookingStep < 2 ? (
                <button onClick={() => setBookingStep(bookingStep + 1)} disabled={!((bookingStep === 0 && selectedBookingStyle) || (bookingStep === 1 && selectedArtist))} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#b91c1c", color: "#0a0a0a", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none", opacity: (bookingStep === 0 && !selectedBookingStyle) || (bookingStep === 1 && !selectedArtist) ? 0.5 : 1 }}>
                  Continue
                </button>
              ) : (
                <motion.button whileHover={{ scale: 1.05 }} onClick={handleBooking} disabled={!selectedDate} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#b91c1c", color: "#0a0a0a", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none", opacity: !selectedDate ? 0.5 : 1 }}>
                  Confirm Booking
                </motion.button>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Aftercare & Style Guide Accordion */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center", color: "#b91c1c" }}>Aftercare Guide</h3></Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <div style={{ borderBottom: "2px solid #b91c1c40", marginBottom: "1rem" }}>
              <button onClick={() => setOpenAccordion(openAccordion === `q${idx}` ? null : `q${idx}`)} style={{ width: "100%", padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: "#f5f0e8", fontWeight: "bold", fontSize: "1rem" }}>
                {faq.q}
                <motion.div animate={{ rotate: openAccordion === `q${idx}` ? 180 : 0 }} style={{ color: "#b91c1c" }}><ChevronRight size={20} /></motion.div>
              </button>
              <AnimatePresence>
                {openAccordion === `q${idx}` && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                    <p style={{ paddingBottom: "1rem", color: "#f5f0e880", lineHeight: "1.6" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Flash Designs */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "#b91c1c" }}>Flash Designs</h3></Reveal>
          <Reveal delay={0.05}><p style={{ textAlign: "center", marginBottom: "3rem", color: "#f5f0e880" }}>Pre-drawn designs available today. Walk-in friendly.</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {flashes.map((flash, idx) => (
              <Reveal key={flash.id} delay={idx * 0.05}>
                <motion.div whileHover={{ y: -5 }} style={{ position: "relative", borderRadius: "0.75rem", overflow: "hidden", aspectRatio: "1", border: "2px solid #b91c1c" }}>
                  <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop" alt={flash.design} fill unoptimized style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a, transparent)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem", color: "#f5f0e8" }}>
                    <div>
                      <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", backgroundColor: "#b91c1c", color: "#0a0a0a", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", marginBottom: "0.75rem" }}>{flash.style}</span>
                      <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{flash.design}</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <span style={{ color: "#d4a017", fontWeight: "bold", fontSize: "1.125rem" }}>{flash.price}</span>
                      <motion.button whileHover={{ scale: 1.1 }} style={{ padding: "0.5rem", backgroundColor: "#b91c1c", color: "#0a0a0a", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                        <Heart size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          <Reveal><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#b91c1c" }}><Counter target={15} /></div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#f5f0e8" }}>Years Experience</p></div></Reveal>
          <Reveal delay={0.1}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#b91c1c" }}><Counter target={8} /></div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#f5f0e8" }}>Master Artists</p></div></Reveal>
          <Reveal delay={0.2}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#b91c1c" }}><Counter target={40} />K</div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#f5f0e8" }}>Tattoos</p></div></Reveal>
          <Reveal delay={0.3}><div style={{ textAlign: "center" }}><div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#b91c1c" }}>4.9</div><p style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "#f5f0e8" }}>Average Rating</p></div></Reveal>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section style={{ padding: "6rem 1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
        <Reveal><h3 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center", color: "#b91c1c" }}>Client Stories</h3></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {testimonials.map((testimonial, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -5 }} style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "1rem", border: "2px solid #b91c1c20" }}>
                <div style={{ marginBottom: "1rem" }}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} style={{ color: "#b91c1c", fontSize: "1.25rem" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#f5f0e8", marginBottom: "1.5rem", lineHeight: "1.6", fontSize: "0.95rem" }}>{testimonial.text}</p>
                <div>
                  <p style={{ fontWeight: "bold", color: "#f5f0e8" }}>{testimonial.name}</p>
                  <p style={{ color: "#b91c1c", fontSize: "0.875rem" }}>{testimonial.style}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "6rem 1.5rem", textAlign: "center", backgroundColor: "#b91c1c", color: "#0a0a0a" }}>
        <Reveal><h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Ready for Ink?</h3></Reveal>
        <Reveal delay={0.1}><p style={{ marginBottom: "2rem", fontSize: "1.125rem" }}>Book a free 30-minute consultation with one of our master artists</p></Reveal>
        <Reveal delay={0.2}>
          <MagneticBtn className="px-8 py-3 rounded-full font-bold uppercase text-sm" style={{ color: "#b91c1c", backgroundColor: "#0a0a0a" } as any}>Schedule Consultation</MagneticBtn>
        </Reveal>
      </section>

      {/* Artwork Lightbox Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArtwork(null)} style={{ position: "fixed", inset: 0, backgroundColor: "#00000095", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 60, padding: "1.5rem" }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", border: "3px solid #b91c1c", maxWidth: "600px", width: "100%", aspectRatio: "1" }}>
              <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" alt={`Artwork ${selectedArtwork}`} fill unoptimized style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, #0a0a0a, transparent)", padding: "2rem", color: "#f5f0e8" }}>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Tattoo Piece {selectedArtwork}</h4>
                <p style={{ color: "#d4a017", marginBottom: "1rem", fontWeight: "bold" }}>by {artists[Math.floor(Math.random() * artists.length)].name}</p>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => { setSelectedArtwork(null) }} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#b91c1c", color: "#0a0a0a", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", border: "none" }}>
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ position: "fixed", bottom: "2rem", right: "2rem", backgroundColor: "#b91c1c", color: "#0a0a0a", padding: "1rem 1.5rem", borderRadius: "0.5rem", fontWeight: "bold", zIndex: 70 }}>
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
