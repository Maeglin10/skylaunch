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
  Satellite, Globe, Menu, ArrowRight, ChevronDown, Rocket,
  Radio, Shield, Star, Check, Zap, Activity, Database,
  Twitter, Linkedin, Github, MapPin, Wifi
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

function Counter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 80
    const t = setInterval(() => setCount(c => {
      const next = c + step
      if (next >= target) { clearInterval(t); return target }
      return next
    }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} onClick={onClick} className={`cursor-pointer ${className}`}>
      {children}
    </motion.button>
  )
}

const SATELLITES = [
  { id: "APEX-1", orbit: "LEO 550km", capacity: "2.8 TB/day", instruments: "SAR + Multispectral", status: "Operational", uptime: 99.9, launched: "Mar 2020", img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80" },
  { id: "APEX-2", orbit: "GEO 35,786km", capacity: "1.9 TB/day", instruments: "Thermal IR + SAR", status: "Operational", uptime: 99.7, launched: "Sep 2021", img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80" },
  { id: "APEX-3", orbit: "LEO 480km", capacity: "3.4 TB/day", instruments: "Hyperspectral 240-band", status: "Operational", uptime: 99.8, launched: "Feb 2022", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80" },
  { id: "APEX-4", orbit: "MEO 8,000km", capacity: "1.1 TB/day", instruments: "Radiation Monitor", status: "Commissioning", uptime: 98.2, launched: "Dec 2024", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80" },
]

const TESTIMONIALS = [
  { name: "Dr. Elena Vasquez", role: "Director of Earth Observation, ESA", text: "APEX Orbital&apos;s SAR-optical fusion data has fundamentally transformed our climate monitoring capabilities. The 0.47m GSD resolution and 23-minute delivery latency are genuinely unmatched in the commercial sector.", avatar: "EV", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", rating: 5 },
  { name: "James Okafor", role: "VP Geospatial Intelligence, Palantir Technologies", text: "From acquisition to delivery in 23 minutes flat. We&apos;ve built entire defense intelligence platforms on APEX data streams — the uptime record over 4 years gives us the reliability our clients demand.", avatar: "JO", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", rating: 5 },
  { name: "Dr. Sarah Lim", role: "Chief Science Officer, CNSA Collaboration Division", text: "APEX&apos;s hyperspectral payload quality on APEX-3 exceeds what we achieved with our own Gaofen missions in the same spectral range. The 240-band configuration is a significant technical achievement.", avatar: "SL", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", rating: 5 },
  { name: "Brigadier Thomas Walsh", role: "Director NGA, US National Geospatial-Intelligence Agency", text: "APEX&apos;s 45-minute priority tasking guarantee and ITAR-compliant data pipeline made them our preferred commercial augmentation source. Replaced two legacy government contracts.", avatar: "TW", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", rating: 5 },
  { name: "Prof. Anya Petrov", role: "Lead Researcher, Climate Change Institute Oxford", text: "The multitemporal change detection capability at 0.5m resolution has opened entirely new research methodologies for us. Our Arctic ice-melt paper relied entirely on APEX-1 SAR data.", avatar: "AP", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", rating: 5 },
]

const PLANS = [
  { name: "Research", price: "$4,200", period: "/mo", desc: "Academic & research institutions", features: ["3 TB data/month", "APEX-1 + APEX-3 access", "SAR + Optical bands", "REST API access", "30-day archive access", "Academic licensing terms", "Python + JS SDK"], highlight: false, cta: "Apply for Access" },
  { name: "Enterprise", price: "$18,500", period: "/mo", desc: "Commercial & government organizations", features: ["Unlimited data volume", "Full 4-satellite access", "All sensor modalities", "Priority 45-min tasking", "Real-time streaming API", "Dedicated support SLA", "Custom processing pipeline", "STAC-compliant delivery"], highlight: true, cta: "Start Enterprise Trial" },
  { name: "Mission Partner", price: "Custom", period: "", desc: "Joint mission and payload development", features: ["Co-branded payload capacity", "Instrument hosting on APEX-5", "Ground station co-location", "Mission operations support", "Custom orbit design", "IP co-ownership agreement", "Revenue sharing structure"], highlight: false, cta: "Discuss Partnership" },
]

const FAQS = [
  { q: "What is the minimum ground sample distance (GSD) achievable?", a: "APEX-3 delivers 0.47m GSD in panchromatic mode and 2.1m multispectral. Our SAR sensor on APEX-1 achieves 0.5m Stripmap resolution in all weather, day or night. APEX-2 thermal IR provides 3m GSD for heat signature applications." },
  { q: "How quickly can you task a satellite for specific area coverage?", a: "Standard tasking is confirmed within 4 hours. Enterprise priority queue guarantees satellite look-angle confirmation within 45 minutes. Emergency national security tasking is handled under dedicated bilateral SLA contracts with response under 8 minutes." },
  { q: "What data formats and delivery methods do you support?", a: "We deliver GeoTIFF, HDF5, NetCDF4, and STAC-compliant COG formats. Delivery via REST API, AWS S3 bucket mirror, SFTP, or real-time WebSocket stream. Average acquisition-to-delivery latency is 23 minutes for standard orders." },
  { q: "How does APEX handle data security and sovereignty requirements?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256-GCM). We operate sovereign data centers in the US, EU, and Singapore. ITAR/EAR compliance is built into the access control layer for all US government clients. FedRAMP authorization in progress." },
  { q: "Can we integrate APEX data with existing GIS and analytics platforms?", a: "Yes. Native connectors for ArcGIS, QGIS, Google Earth Engine, Palantir Foundry, and Esri Living Atlas. Our Python SDK supports Jupyter, Dask, and Xarray. JavaScript SDK supports Node.js and browser environments. Typical integration takes under one business day." },
  { q: "What is the planned constellation expansion timeline?", a: "APEX-5 (hyperspectral + LiDAR fusion) is scheduled for launch Q3 2026 on SpaceX Transporter-14. APEX-6 through APEX-12 follow across 2027-2028, bringing global revisit time from the current 14 minutes to under 4 hours for any point on Earth." },
]

const PARTNERS = ["NASA", "ESA", "ISRO", "JAXA", "Airbus Defence", "Thales Alenia", "Boeing Space", "Lockheed Martin", "Palantir", "Maxar", "Planet Labs", "NGA"]

export default function ApexOrbital() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedSat, setSelectedSat] = useState<typeof SATELLITES[0] | null>(null)
  const [liveGB, setLiveGB] = useState(847293)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setLiveGB(c => c + Math.floor(Math.random() * 12) + 3), 800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  const NAV_LINKS = ["Constellation", "Missions", "Data", "Pricing", "Partners"]

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#030b1a] text-[#e8f0fe] min-h-screen">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-[#030b1a]/95 backdrop-blur-xl border-b border-[#0066ff]/15 shadow-[0_4px_40px_rgba(0,102,255,0.06)]" : "bg-transparent border-b border-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066ff] to-[#003399] flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              <Satellite className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <span className="font-black text-xl tracking-tight text-white">APEX <span className="text-[#4d9fff]">ORBITAL</span></span>
          </div>
          <div className="hidden md:flex gap-10">
            {NAV_LINKS.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-white/60 hover:text-[#4d9fff] transition-all duration-200 cursor-pointer">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-5 py-2.5 border border-[#0066ff]/50 rounded-md text-[#4d9fff] font-bold text-sm hover:bg-[#0066ff]/10 transition-all duration-200 cursor-pointer">Request Data</button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden cursor-pointer text-white"><Menu size={24} /></button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#030b1a] border-l border-[#0066ff]/15">
                <div className="flex flex-col gap-6 mt-12">
                  {NAV_LINKS.map((item, i) => (
                    <motion.a key={item} href={`#${item.toLowerCase()}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-[#4d9fff] cursor-pointer hover:text-white transition-all duration-200">{item}</motion.a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="h-screen relative overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80" alt="Space constellation" fill style={{ objectFit: "cover", opacity: 0.35 }} priority unoptimized />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,255,0.12)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030b1a]" />
        </motion.div>

        {/* Animated orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[280, 420, 560].map((size, i) => (
            <motion.div key={i} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 24 + i * 12, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid rgba(0,102,255,${0.07 + i * 0.03})` }} />
          ))}
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-3 h-3 rounded-full bg-[#0066ff] shadow-[0_0_24px_rgba(0,102,255,0.9)]" />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-[72px]">
          <Reveal>
            <Badge className="mb-6 bg-[#0066ff]/15 border border-[#0066ff]/40 text-[#4d9fff] text-xs tracking-[0.15em] px-4 py-1.5 rounded-full">
              ESTABLISHED 2018 · 42 MISSIONS COMPLETE · 4 ACTIVE SATELLITES
            </Badge>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="text-[clamp(3rem,11vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] mb-6 max-w-[900px]">
              ORBITAL<br />
              <span className="bg-gradient-to-r from-[#4d9fff] to-[#0066ff] bg-clip-text text-transparent">INTELLIGENCE</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl text-white/65 max-w-[600px] leading-relaxed mb-10">
              Advanced satellite constellation management. 0.47m resolution. 23-minute acquisition-to-delivery. Trusted by NASA, ESA, and 21 national defense agencies.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="flex gap-4 flex-wrap justify-center">
              <MagneticBtn className="px-8 py-4 bg-gradient-to-br from-[#0066ff] to-[#003399] text-white font-bold text-sm rounded-lg border-none shadow-[0_8px_32px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_48px_rgba(0,102,255,0.6)] transition-all duration-200 flex items-center gap-2">
                Explore Constellation <ArrowRight size={16} />
              </MagneticBtn>
              <button className="px-8 py-4 bg-white/5 text-white font-semibold text-sm rounded-lg border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer flex items-center gap-2">
                <Radio size={16} className="text-[#4d9fff]" /> Watch Mission Reel
              </button>
            </div>
          </Reveal>

          {/* Live data floating card */}
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-14 px-8 py-5 bg-[#0066ff]/8 backdrop-blur-2xl border border-[#0066ff]/25 rounded-2xl flex gap-10 flex-wrap justify-center shadow-[0_0_60px_rgba(0,102,255,0.1)]">
              {[
                { label: "Active Satellites", val: "4 / 4", color: "#00ff88" },
                { label: "Data Transmitted Today", val: `${liveGB.toLocaleString()} GB`, color: "#4d9fff" },
                { label: "Ground Contacts/Day", val: "287", color: "#a78bfa" },
                { label: "Avg Delivery Latency", val: "23 min", color: "#fbbf24" },
              ].map((d, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black" style={{ color: d.color }}>{d.val}</div>
                  <div className="text-xs text-white/45 tracking-[0.08em] mt-1 uppercase">{d.label}</div>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#00ff88]" />
                <span className="text-xs font-bold text-[#00ff88] tracking-widest">LIVE</span>
              </div>
            </motion.div>
          </Reveal>
        </motion.div>

        <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <ChevronDown size={28} className="text-[#4d9fff]/50" />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="py-16 px-6 md:px-14 bg-gradient-to-br from-[#0066ff]/8 to-[#003399]/12 border-t border-b border-[#0066ff]/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { label: "Missions Launched", val: 42, suffix: "" },
            { label: "Mission Success Rate", val: 99.7, suffix: "%", decimals: 1 },
            { label: "Ground Stations", val: 14, suffix: "" },
            { label: "Partner Agencies", val: 23, suffix: "" },
            { label: "TB Delivered Daily", val: 9.4, suffix: "", decimals: 1 },
            { label: "Countries Served", val: 47, suffix: "" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="text-center">
                <div className="text-4xl font-black text-[#4d9fff] tracking-tight mb-1">
                  <Counter target={s.val} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="text-xs text-white/45 uppercase tracking-[0.1em]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <div className="overflow-hidden bg-[#0066ff]/5 border-b border-[#0066ff]/10 py-5">
        <motion.div className="flex gap-16 whitespace-nowrap" animate={{ x: [0, -1800] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="text-sm font-black tracking-[0.2em] text-[#4d9fff]/50 flex-shrink-0 uppercase">{p}</span>
          ))}
        </motion.div>
      </div>

      {/* CONSTELLATION TABS */}
      <section id="constellation" className="py-28 px-6 md:px-14">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] text-[#4d9fff] font-bold mb-3 uppercase">Orbital Architecture</p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight mb-4">Active Constellation</h2>
            <p className="text-white/50 max-w-[560px] mx-auto text-lg leading-relaxed">Four operational satellites across LEO, MEO, and GEO orbits providing continuous global coverage with sub-15-minute revisit times.</p>
          </Reveal>

          <Tabs defaultValue="leo">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-[#0066ff]/8 border border-[#0066ff]/15 rounded-xl p-1.5">
                {[{ id: "leo", label: "LEO Orbit" }, { id: "geo", label: "GEO Orbit" }, { id: "meo", label: "MEO Orbit" }].map(t => (
                  <TabsTrigger key={t.id} value={t.id} className="rounded-lg px-6 py-2.5 font-bold text-sm cursor-pointer transition-all duration-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0066ff] data-[state=active]:to-[#003399] data-[state=active]:text-white">{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </div>

            {[
              { id: "leo", sats: SATELLITES.filter(s => s.orbit.includes("LEO")) },
              { id: "geo", sats: SATELLITES.filter(s => s.orbit.includes("GEO")) },
              { id: "meo", sats: SATELLITES.filter(s => s.orbit.includes("MEO")) },
            ].map(tab => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.sats.length === 0 ? (
                  <p className="text-center py-16 text-white/35 text-lg">No satellites in this orbital tier — check back after the 2026 launch manifest.</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tab.sats.map((sat, i) => (
                      <Reveal key={sat.id} delay={i * 0.1}>
                        <motion.div whileHover={{ y: -8, boxShadow: "0 24px 64px rgba(0,102,255,0.2)" }} onClick={() => setSelectedSat(sat)}
                          className="bg-white/[0.02] border border-[#0066ff]/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group">
                          <div className="relative h-52">
                            <Image src={sat.img} alt={sat.id} fill style={{ objectFit: "cover" }} unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030b1a]/90 via-transparent to-transparent" />
                            <div className="absolute top-4 right-4">
                              <Badge className={`text-xs font-bold ${sat.status === "Operational" ? "bg-[#00ff88]/15 border-[#00ff88]/40 text-[#00ff88]" : "bg-orange-500/15 border-orange-500/40 text-orange-400"}`}>
                                {sat.status}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 left-5">
                              <div className="text-2xl font-black text-white">{sat.id}</div>
                              <div className="text-sm text-white/55 flex items-center gap-1.5 mt-0.5"><MapPin size={12} />{sat.orbit}</div>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="grid grid-cols-2 gap-4 mb-5">
                              <div><div className="text-[10px] text-white/35 uppercase tracking-widest mb-1">Data Capacity</div><div className="font-bold text-sm">{sat.capacity}</div></div>
                              <div><div className="text-[10px] text-white/35 uppercase tracking-widest mb-1">Instruments</div><div className="font-bold text-sm">{sat.instruments}</div></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-2"><span className="text-white/45">System Uptime</span><span className="text-[#4d9fff] font-bold">{sat.uptime}%</span></div>
                              <Progress value={sat.uptime} className="h-1.5 bg-[#0066ff]/15 [&>div]:bg-gradient-to-r [&>div]:from-[#4d9fff] [&>div]:to-[#0066ff]" />
                            </div>
                          </div>
                        </motion.div>
                      </Reveal>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="missions" className="py-24 px-6 md:px-14 bg-[#0066ff]/[0.03] border-t border-b border-[#0066ff]/10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs tracking-[0.25em] text-[#4d9fff] font-bold mb-3 uppercase">Client Testimonials</p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight">Trusted by World Leaders</h2>
          </Reveal>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="bg-[#0066ff]/5 border border-[#0066ff]/15 rounded-2xl h-full hover:border-[#0066ff]/35 transition-all duration-200">
                      <CardContent className="p-7 flex flex-col h-full">
                        <div className="flex gap-1 mb-5">
                          {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#0066ff" className="text-[#0066ff]" />)}
                        </div>
                        <p className="text-white/70 text-sm leading-[1.75] mb-6 flex-1 italic">&ldquo;{t.text}&rdquo;</p>
                        <Separator className="bg-[#0066ff]/10 mb-5" />
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-[#0066ff]/25">
                            <AvatarImage src={t.img} />
                            <AvatarFallback className="bg-[#0066ff]/15 text-[#4d9fff] text-xs font-black">{t.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-black text-sm text-white">{t.name}</div>
                            <div className="text-xs text-white/45">{t.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-[#0066ff]/15 border-[#0066ff]/30 text-[#4d9fff] hover:bg-[#0066ff]/25 cursor-pointer transition-all duration-200" />
            <CarouselNext className="bg-[#0066ff]/15 border-[#0066ff]/30 text-[#4d9fff] hover:bg-[#0066ff]/25 cursor-pointer transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 px-6 md:px-14 bg-[#0066ff]/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] text-[#4d9fff] font-bold mb-3 uppercase">Data Access Plans</p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight">Choose Your Tier</h2>
            <p className="text-white/45 mt-4 max-w-[480px] mx-auto">Scalable access to Earth intelligence — from research grants to full constellation enterprise agreements.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -10, boxShadow: plan.highlight ? "0 28px 80px rgba(0,102,255,0.35)" : "0 20px 60px rgba(0,102,255,0.12)" }}
                  className={`relative rounded-2xl p-8 border-2 transition-all duration-200 ${plan.highlight ? "bg-gradient-to-br from-[#0066ff]/20 to-[#003399]/20 border-[#0066ff]/60" : "bg-white/[0.02] border-[#0066ff]/15 hover:border-[#0066ff]/30"}`}>
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0066ff] to-[#003399] px-5 py-1.5 rounded-full text-xs font-black tracking-[0.1em] whitespace-nowrap">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-xs tracking-[0.2em] text-[#4d9fff] font-bold mb-3 uppercase">{plan.name}</div>
                  <div className="flex items-end gap-1.5 mb-2">
                    <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                    <span className="text-white/35 pb-2">{plan.period}</span>
                  </div>
                  <p className="text-white/45 text-sm mb-6">{plan.desc}</p>
                  <Separator className="bg-[#0066ff]/10 mb-6" />
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                        <Check size={15} className="text-[#4d9fff] mt-0.5 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-[0.05em] transition-all duration-200 cursor-pointer ${plan.highlight ? "bg-gradient-to-r from-[#0066ff] to-[#003399] text-white hover:opacity-90" : "bg-[#0066ff]/10 border border-[#0066ff]/30 text-[#4d9fff] hover:bg-[#0066ff]/20"}`}>
                    {plan.cta}
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="data" className="py-24 px-6 md:px-14">
        <div className="max-w-[860px] mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs tracking-[0.25em] text-[#4d9fff] font-bold mb-3 uppercase">Technical FAQ</p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight">Common Questions</h2>
          </Reveal>
          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`f${i}`} className="border-b border-[#0066ff]/12">
                <AccordionTrigger className="text-base font-bold text-white hover:text-[#4d9fff] py-5 cursor-pointer transition-all duration-200 [&[data-state=open]]:text-[#4d9fff]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-5 text-sm leading-[1.75]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-28 px-6 md:px-14 bg-gradient-to-br from-[#0066ff]/10 to-[#003399]/15 border-t border-[#0066ff]/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(0,102,255,0.08)_0%,transparent_70%)]" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <Reveal>
            <Rocket size={52} className="text-[#4d9fff] mx-auto mb-6" />
            <h2 className="text-[clamp(2rem,7vw,5rem)] font-black tracking-tight mb-5 leading-[0.9]">Ready to Launch?</h2>
            <p className="text-white/55 text-lg mb-12 max-w-[520px] mx-auto leading-relaxed">Join 23 space agencies and Fortune 500 companies reshaping Earth intelligence with APEX constellation data.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex gap-4 justify-center flex-wrap">
              <MagneticBtn className="px-8 py-4 bg-gradient-to-br from-[#0066ff] to-[#003399] text-white font-bold text-base rounded-xl shadow-[0_8px_32px_rgba(0,102,255,0.5)] hover:shadow-[0_12px_48px_rgba(0,102,255,0.7)] transition-all duration-200 flex items-center gap-2">
                Request Mission Brief <ArrowRight size={18} />
              </MagneticBtn>
              <button className="px-8 py-4 bg-transparent border border-[#0066ff]/40 rounded-xl text-[#4d9fff] font-bold text-base hover:bg-[#0066ff]/10 transition-all duration-200 cursor-pointer flex items-center gap-2">
                <Database size={16} /> Download Data Catalog
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 px-6 md:px-14 border-t border-[#0066ff]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer">
                <Satellite size={18} className="text-[#4d9fff]" />
                <span className="font-black tracking-tight text-white">APEX <span className="text-[#4d9fff]">ORBITAL</span></span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">Advanced satellite intelligence for Earth observation, defense, and climate science.</p>
            </div>
            {[
              { title: "Platform", links: ["Constellation", "Data Products", "API Access", "SDK Downloads"] },
              { title: "Solutions", links: ["Government", "Commercial", "Academic", "Defense"] },
              { title: "Company", links: ["About", "Missions", "Careers", "Press", "Security"] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#4d9fff]/50 mb-4 font-bold">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-sm text-white/30 hover:text-[#4d9fff] transition-all duration-200 cursor-pointer">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-[#0066ff]/10 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/25">© 2026 Apex Orbital Systems Inc. — ISO 27001 · ITAR Registered · SOC 2 Type II</p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github, Globe].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg border border-[#0066ff]/15 flex items-center justify-center text-white/30 hover:text-[#4d9fff] hover:border-[#0066ff]/40 transition-all duration-200 cursor-pointer">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* SATELLITE DIALOG */}
      <Dialog open={!!selectedSat} onOpenChange={() => setSelectedSat(null)}>
        <DialogContent className="bg-[#050d1a] border border-[#0066ff]/25 rounded-2xl max-w-[560px] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#4d9fff]">{selectedSat?.id} — Satellite Detail</DialogTitle>
          </DialogHeader>
          {selectedSat && (
            <div className="flex flex-col gap-4 mt-3">
              <div className="rounded-xl overflow-hidden h-[180px] relative">
                <Image src={selectedSat.img} alt={selectedSat.id} fill style={{ objectFit: "cover" }} unoptimized />
              </div>
              {[{ l: "Orbital Altitude", v: selectedSat.orbit }, { l: "Data Capacity", v: selectedSat.capacity }, { l: "Instruments", v: selectedSat.instruments }, { l: "Launch Date", v: selectedSat.launched }, { l: "System Uptime", v: `${selectedSat.uptime}%` }].map((row, i) => (
                <div key={i} className="flex justify-between border-b border-[#0066ff]/10 pb-3">
                  <span className="text-white/40 text-sm">{row.l}</span>
                  <span className="font-bold text-[#4d9fff] text-sm">{row.v}</span>
                </div>
              ))}
              <button onClick={() => setSelectedSat(null)} className="w-full py-3.5 bg-gradient-to-r from-[#0066ff] to-[#003399] rounded-xl font-bold text-sm cursor-pointer hover:opacity-90 transition-all duration-200">
                Request Tasking
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
