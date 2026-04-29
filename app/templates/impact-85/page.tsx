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
import { X, Menu, ChevronDown, ArrowRight, Music, Play, Calendar } from "lucide-react"

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

const artists = [
  { id: 1, name: "CIPHER", genre: "Electronic", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=400&auto=format&fit=crop", bio: "Pioneering electronic sound designer with 8 releases on NEON." },
  { id: 2, name: "APEX", genre: "Hip-Hop", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop", bio: "Grammy-nominated producer pushing hip-hop boundaries." },
  { id: 3, name: "LUNA", genre: "Ambient", img: "https://images.unsplash.com/photo-1516430536063-6f3314ca4e1b?q=80&w=400&auto=format&fit=crop", bio: "Ambient experimentalist creating immersive soundscapes." },
  { id: 4, name: "VOLT", genre: "Electronic", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop", bio: "Techno visionary blending live instrumentation and digital." },
  { id: 5, name: "SONIC", genre: "Indie", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop", bio: "Indie rock innovator with cinematic production style." },
  { id: 6, name: "ECHO", genre: "Hip-Hop", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop", bio: "Lyrical virtuoso with intricate wordplay and production." },
  { id: 7, name: "PRISM", genre: "Ambient", img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=400&auto=format&fit=crop", bio: "Experimental composer reshaping ambient music." },
  { id: 8, name: "NEON", genre: "Electronic", img: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=400&auto=format&fit=crop", bio: "Synth pop maestro with a cult following worldwide." },
]

const faqs = [
  { q: "How do I submit music to NEON?", a: "Apply via our submissions portal with your artist name, bio, 3-5 tracks, and press kit. We review applications monthly." },
  { q: "What's the royalty split?", a: "50/50 split on all streaming revenue. Direct payment monthly via Wise or bank transfer." },
  { q: "Can I perform at NEON events?", a: "Yes! Our artists get booking priority for live shows and festival appearances. Revenue share on all door/ticket sales." },
  { q: "How do I pre-order merchandise?", a: "Merch drops quarterly. Join our mailing list for early access to limited releases and exclusive items." },
]

export default function NeonCollective() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null)
  const [bookingModal, setBookingModal] = useState(false)
  const [contactEmail, setContactEmail] = useState("")
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const genres = ["All", "Electronic", "Hip-Hop", "Indie", "Ambient"]
  const filteredArtists = selectedGenre === "All" ? artists : artists.filter(a => a.genre === selectedGenre)

  // Pulsing neon particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    duration: 3 + i * 0.5,
  }))

  return (
    <div style={{ backgroundColor: "#000000", color: "#ffffff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(0,0,0,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #ec489940" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#ec4899", letterSpacing: "-0.02em" }}>NEON</h1>
          <div style={{ display: "none", gap: "2.5rem" }} className="md:flex">
            {["Artists", "Releases", "Events", "Merch"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#ffffff", opacity: 0.7, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button style={{ display: "none", cursor: "pointer", background: "none", border: "none", padding: 0 }} className="md:hidden">
                <Menu size={24} color="#ec4899" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "#000" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
                {["Artists", "Releases", "Events", "Merch"].map((item) => (
                  <a key={item} href="#" style={{ fontSize: "1rem", fontWeight: "600", color: "#ec4899", textDecoration: "none" }}>{item}</a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HERO WITH PULSING PARTICLES */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* FLOATING PARTICLES */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(p.id) * 100, 0],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#ec4899",
              boxShadow: "0 0 20px rgba(236, 72, 153, 0.8)",
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative", textAlign: "center", padding: "2rem", zIndex: 10 }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.85rem", fontWeight: "900", letterSpacing: "0.12em", color: "#ec4899", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>
              Music Label & Community
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.h2
              animate={{ opacity: [0.5, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                fontSize: "clamp(2.5rem, 12vw, 7rem)",
                fontWeight: "900",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                maxWidth: "900px",
                color: "#ec4899",
                textShadow: "0 0 40px rgba(236, 72, 153, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)",
              }}
            >
              NEON COLLECTIVE
            </motion.h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.1rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "650px" }}>
              Where electronic meets revolution. 24 artists. 50M+ streams. 8 years of cultural impact.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <ChevronDown size={28} style={{ color: "#ec4899" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* ARTIST GRID WITH TABS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem", textAlign: "center" }}>Artist Roster</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.6, textAlign: "center", marginBottom: "3rem" }}>Discover our diverse collective of groundbreaking artists</p>
          </Reveal>

          {/* GENRE FILTER */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "3rem", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
            {genres.map((genre) => (
              <motion.button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.65rem 1.25rem",
                  backgroundColor: selectedGenre === genre ? "#ec4899" : "transparent",
                  color: selectedGenre === genre ? "white" : "#ffffff",
                  border: `2px solid ${selectedGenre === genre ? "#ec4899" : "#444"}`,
                  borderRadius: "9999px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
              >
                {genre}
              </motion.button>
            ))}
          </div>

          {/* ARTISTS GRID */}
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2rem" }}>
            <AnimatePresence mode="wait">
              {filteredArtists.map((artist, i) => (
                <motion.div
                  key={artist.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedArtist(artist)}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    aspectRatio: "1",
                    group: "group",
                  }}
                >
                  <Image src={artist.img} alt={artist.name} fill style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "all 0.5s ease" }} />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 70%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#ec4899",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Play size={24} fill="white" color="white" />
                    </motion.button>
                  </motion.div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", color: "white" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "900", marginBottom: "0.25rem" }}>{artist.name}</h3>
                    <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>{artist.genre}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* RELEASES TIMELINE */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a0a0a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Latest Releases</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { title: "FREQUENCY", artist: "CIPHER", date: "Apr 28", streams: "2.3M", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop" },
              { title: "VOID ECHO", artist: "LUNA", date: "Apr 21", streams: "1.8M", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop" },
              { title: "NEON NIGHTS", artist: "VOLT", date: "Apr 14", streams: "3.1M", img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=300&auto=format&fit=crop" },
              { title: "PULSE", artist: "APEX", date: "Apr 7", streams: "2.7M", img: "https://images.unsplash.com/photo-1516430536063-6f3314ca4e1b?q=80&w=300&auto=format&fit=crop" },
            ].map((release, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 12 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    gap: "2rem",
                    padding: "1.5rem",
                    backgroundColor: "#1a1a1a",
                    borderRadius: "0.5rem",
                    border: "1px solid #333",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "1", borderRadius: "0.35rem", overflow: "hidden" }}>
                    <Image src={release.img} alt={release.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "900", marginBottom: "0.25rem", color: "#ec4899" }}>
                      {release.title}
                    </h3>
                    <p style={{ opacity: 0.7, fontSize: "0.9rem", marginBottom: "0.25rem" }}>by {release.artist}</p>
                    <p style={{ fontSize: "0.8rem", opacity: 0.5 }}>{release.streams} streams</p>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>{release.date}</p>
                    <Play size={20} style={{ color: "#ec4899", marginLeft: "auto" }} fill="#ec4899" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {[
            { label: "Total Streams", value: 50, suffix: "M" },
            { label: "Artists", value: 24, suffix: "" },
            { label: "Years Active", value: 8, suffix: "" },
            { label: "Annual Shows", value: 120, suffix: "" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.8rem", fontWeight: "900", marginBottom: "0.5rem", color: "#ec4899" }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p style={{ fontSize: "0.8rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600" }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TOUR DATES */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a0a0a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Tour Dates</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { date: "May 10", city: "Tokyo", venue: "Shibuya Club" },
              { date: "May 17", city: "Berlin", venue: "Berghain" },
              { date: "May 24", city: "New York", venue: "Terminal 5" },
              { date: "Jun 2", city: "London", venue: "Electric Ballroom" },
            ].map((tour, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setBookingModal(true)}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "0.5rem",
                    color: "white",
                    cursor: "pointer",
                    display: "grid",
                    gridTemplateColumns: "150px 1fr auto",
                    gap: "2rem",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "900", color: "#ec4899", fontSize: "1.05rem" }}>{tour.date}</p>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: "700" }}>{tour.city}</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>{tour.venue}</p>
                  </div>
                  <div style={{ color: "#ec4899" }}>
                    <ArrowRight size={20} />
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>FAQs</h2>
          </Reveal>

          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger style={{ fontSize: "1rem", fontWeight: "700", padding: "1.25rem", color: "white" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{ padding: "0 1.25rem 1.25rem", fontSize: "0.95rem", opacity: 0.8, color: "rgba(255,255,255,0.8)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ARTIST BIO MODAL */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtist(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: "2rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#0a0a0a",
                borderRadius: "0.75rem",
                overflow: "hidden",
                maxWidth: "600px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "1px solid #ec489950",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "1" }}>
                <Image src={selectedArtist.img} alt={selectedArtist.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <motion.button
                  onClick={() => setSelectedArtist(null)}
                  style={{ alignSelf: "flex-end", background: "none", border: "none", cursor: "pointer", color: "#ec4899", padding: 0 }}
                >
                  <X size={24} />
                </motion.button>
                <div>
                  <p style={{ fontSize: "0.8rem", opacity: 0.6, textTransform: "uppercase", fontWeight: "600", marginBottom: "0.75rem" }}>
                    {selectedArtist.genre}
                  </p>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "1rem", color: "#ec4899" }}>{selectedArtist.name}</h3>
                  <p style={{ opacity: 0.7, marginBottom: "1.5rem", lineHeight: 1.6 }}>{selectedArtist.bio}</p>
                </div>
                <MagneticBtn className="px-6 py-2 bg-[#ec4899] text-white font-bold uppercase text-sm tracking-wider rounded">
                  Listen Now
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {bookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBookingModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 70,
              padding: "2rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#0a0a0a",
                borderRadius: "0.75rem",
                padding: "2.5rem",
                maxWidth: "450px",
                width: "100%",
                position: "relative",
                border: "1px solid #ec489950",
              }}
            >
              <motion.button
                onClick={() => setBookingModal(false)}
                style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#ec4899" }}
              >
                <X size={24} />
              </motion.button>
              <h3 style={{ fontSize: "1.6rem", fontWeight: "900", marginBottom: "0.75rem", color: "#ec4899" }}>Book Artist</h3>
              <p style={{ opacity: 0.7, marginBottom: "2rem", fontSize: "0.95rem" }}>Inquire about booking our artists for your event.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <input
                  type="text"
                  placeholder="Event Name"
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "0.35rem",
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "0.35rem",
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                />
                <input
                  type="date"
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "0.35rem",
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
              <motion.button
                whileHover={{ backgroundColor: "#db2777" }}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  backgroundColor: "#ec4899",
                  color: "white",
                  fontWeight: "900",
                  borderRadius: "0.35rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                }}
              >
                Send Inquiry
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA FOOTER */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a0a0a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem" }}>Join the Collective</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.7, marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
              Submit your music, join our community, and reach millions of listeners worldwide.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.button
              onClick={() => setBookingModal(true)}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "0.9rem 2.25rem",
                backgroundColor: "#ec4899",
                color: "white",
                fontWeight: "900",
                fontSize: "0.9rem",
                borderRadius: "0.35rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                gap: "0.75rem",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              Book Now <ArrowRight size={18} />
            </motion.button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
