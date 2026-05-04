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
  Menu, Star, Check, ChevronRight, ArrowRight,
  Clock, Gem, Shield, Award, Wrench, Globe,
  Twitter, Instagram, Youtube, Linkedin
} from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let cur = 0
    const step = to / 70
    const t = setInterval(() => {
      cur += step
      if (cur >= to) { setCount(to); clearInterval(t) } else { setCount(Math.floor(cur)) }
    }, 16)
    return () => clearInterval(t)
  }, [isInView, to])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const COLLECTIONS = [
  {
    id: 1, name: "Tourbillon Noir", ref: "MA-TC-001", price: "CHF 48,000",
    material: "18K Rose Gold", diameter: "42mm", reserve: "96 hours",
    components: 412, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    badge: "Masterpiece",
    desc: "Our most complex in-house calibre. 412 components hand-assembled over nine months by a single maître horloger. The flying tourbillon cage rotates once per minute, visible through the sapphire caseback. A statement of absolute mastery.",
  },
  {
    id: 2, name: "Perpétuel Blanc", ref: "MA-PC-002", price: "CHF 32,000",
    material: "Platinum 950", diameter: "40mm", reserve: "72 hours",
    components: 348, img: "https://images.unsplash.com/photo-1547996160-b51adfe84e78?w=800&q=80",
    badge: "New 2026",
    desc: "A perpetual calendar movement with instantaneous date jump at midnight. The dial is crafted from a single piece of Grand Feu white enamel, fired at 850°C and hand-painted with a chapter ring by our enamel specialist in Geneva.",
  },
  {
    id: 3, name: "Chrono Eclipse", ref: "MA-CE-003", price: "CHF 22,500",
    material: "Grade 5 Titanium", diameter: "44mm", reserve: "80 hours",
    components: 286, img: "https://images.unsplash.com/photo-1594534475808-8d75a8394c35?w=800&q=80",
    badge: "Limited 150",
    desc: "A column-wheel split-seconds chronograph built for precision timing at the highest level. The open-worked dial reveals the beating heart of the movement in real time. Grade 5 titanium case with a tensioned anti-glare sapphire crystal.",
  },
]

const FEATURES_TABS = [
  {
    val: "movement", label: "Movement", icon: Clock,
    title: "In-House Calibres",
    subtitle: "Every component conceived, machined, and finished within our Geneva atelier.",
    desc: "Maison Aurum has never sourced a movement from an external supplier. Each calibre is developed over 18 to 36 months by our team of 14 maîtres horlogers — specialists whose combined experience exceeds 340 years of haute horlogerie.",
    bullets: [
      "Swiss lever escapement with 28,800 vph frequency",
      "Minimum 72-hour power reserve on all references",
      "14-step manual finishing: anglage, perlage, côtes de Genève",
      "Chronometer-certified to COSC +4/−6 seconds per day",
      "Exhibition sapphire caseback on all tourbillon pieces",
      "Bi-directional winding rotor in 22K gold",
    ],
    stats: [{ val: "412", label: "Components, Tourbillon Noir" }, { val: "340+", label: "Years combined expertise" }],
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    val: "finishing", label: "Finishing", icon: Gem,
    title: "Haute Finissage",
    subtitle: "Each case undergoes 240 hours of artisanal hand-finishing before delivery.",
    desc: "Our finishing atelier is entirely separate from the movement workshop. Cases pass through 14 distinct stages: rough grinding, filing, surface preparation, anglage of every visible edge, satin brushing on flat surfaces, and mirror-polishing of all chamfers. The process takes four to six weeks per case.",
    bullets: [
      "240 hours of hand-finishing per timepiece",
      "14 distinct finishing stages for each case",
      "Mirror polish achieved with elm wood and chromium oxide",
      "All anglage performed with hand-held files — no CNC",
      "Dial finishing includes sunray, guilloché, and Grand Feu enamel",
      "Every piece inspected under ×100 magnification",
    ],
    stats: [{ val: "240h", label: "Per timepiece finishing" }, { val: "14", label: "Finishing stages" }],
    img: "https://images.unsplash.com/photo-1547996160-b51adfe84e78?w=800&q=80",
  },
  {
    val: "bespoke", label: "Bespoke", icon: Award,
    title: "Haute Horlogerie Programme",
    subtitle: "Twelve commissions per year. One watchmaker. Eighteen months minimum.",
    desc: "The Maison Aurum Haute Horlogerie Programme accepts a maximum of twelve bespoke commissions annually. Each begins with a private consultation in Geneva, where our Creative Directress and your assigned maître horloger explore the brief together. No catalogue references are permitted.",
    bullets: [
      "Maximum 12 commissions per calendar year",
      "Private consultation in Geneva — travel arranged",
      "Dedicated single watchmaker for the full duration",
      "18–36 month production timeline",
      "Proprietary complication design available",
      "Lifetime service at cost of materials only",
    ],
    stats: [{ val: "12", label: "Commissions per year" }, { val: "18–36", label: "Months production" }],
    img: "https://images.unsplash.com/photo-1594534475808-8d75a8394c35?w=800&q=80",
  },
]

const TESTIMONIALS = [
  {
    name: "Édouard de Vienne", role: "Collector, Geneva", avatar: "EV", rating: 5,
    quote: "The Tourbillon Noir is a feat of engineering that borders on sculpture. I have worn Patek and Vacheron for thirty years — Maison Aurum stands confidently among them. The movement finishing is without peer at any price point.",
  },
  {
    name: "Naomi Ashcroft", role: "Senior Editor, Hodinkee", avatar: "NA", rating: 5,
    quote: "Rarely does a new maison arrive with such maturity of execution. The dial work on the Perpétuel Blanc alone justifies every franc. But it is the movement architecture that will be discussed for decades.",
  },
  {
    name: "Carlos Ibáñez Ruiz", role: "CEO, Ibáñez Capital Partners", avatar: "CI", rating: 5,
    quote: "I acquired the Perpétuel Blanc for my twentieth wedding anniversary. My wife has never once removed it. That, to me, is the finest review a watchmaker could receive.",
  },
  {
    name: "Yuki Tanaka", role: "Head Curator, Tokyo Watch Museum", avatar: "YT", rating: 5,
    quote: "We acquired the Tourbillon Noir for our permanent collection. In forty years of curating horology, I have seen perhaps six movements of comparable quality. The anglage on the bridges is truly extraordinary.",
  },
  {
    name: "Sophie Laroche", role: "Managing Partner, Laroche Advisory", avatar: "SL", rating: 5,
    quote: "The bespoke commission process was unlike anything I expected. Three private sessions in Geneva, total access to the workshop, and a piece that will not exist anywhere else on earth. Worth every centime.",
  },
]

const PRICING = [
  {
    name: "Atelier", price: "CHF 18,500", period: "from", highlight: false,
    desc: "Entry to our universe. Three-hand movements with in-house calibres and full hand-finishing.",
    features: [
      "In-house lever escapement calibre",
      "14-step hand-finishing programme",
      "Sapphire front crystal and caseback",
      "5-year international warranty",
      "Complimentary 24-month service",
      "Certificate of origin and finishing report",
    ],
  },
  {
    name: "Grand Complication", price: "CHF 32,000", period: "from", highlight: true,
    desc: "Perpetual calendar, moonphase, or chronograph complications. Our most celebrated tier.",
    features: [
      "All Atelier tier inclusions",
      "Complex complication of your choice",
      "Grand Feu enamel dial option",
      "Exhibition sapphire caseback",
      "Private presentation in Geneva",
      "Numbered edition (max 50 per reference)",
      "Lifetime service guarantee at cost",
    ],
  },
  {
    name: "Haute Horlogerie", price: "Bespoke", period: "", highlight: false,
    desc: "Twelve commissions per year. One watchmaker. Your vision rendered in metal and sapphire.",
    features: [
      "All Grand Complication inclusions",
      "Proprietary movement architecture",
      "Dedicated single maître horloger",
      "18–36 month production timeline",
      "Private Geneva workshop sessions",
      "Exclusive — one piece in existence",
      "Estate valuation and insurance support",
    ],
  },
]

const FAQS_DATA = [
  {
    q: "What movements power your timepieces?",
    a: "Every Maison Aurum watch is equipped with in-house calibres designed and assembled entirely within our Geneva atelier on the Rue de la Corraterie. We employ 14 maîtres horlogers with a combined experience exceeding 340 years. All movements use Swiss lever escapements, operate at 28,800 vph, and achieve a minimum 72-hour power reserve. We have never outsourced a movement in 133 years of production.",
  },
  {
    q: "Do you offer bespoke commissions?",
    a: "Our Haute Horlogerie Programme accepts a maximum of twelve bespoke commissions per calendar year. Each engagement begins with a private consultation at our Geneva maison — we arrange travel and accommodation. A single maître horloger is assigned for the full duration, typically 18 to 36 months. No existing catalogue references are reproduced; each commission is an entirely original work.",
  },
  {
    q: "How is each case finished?",
    a: "Cases undergo a 14-stage hand-finishing process requiring 240 hours per timepiece. Stages alternate between rough preparation, anglage of all visible edges with hand files, satin brushing of flat surfaces, and mirror polishing of chamfers using elm wood and chromium oxide. Every completed piece is inspected under ×100 magnification before proceeding to movement casing.",
  },
  {
    q: "What is your warranty and service policy?",
    a: "All timepieces carry a five-year international warranty covering mechanical defects and normal wear to gaskets and crown seal. We offer complimentary first service at 24 months at any of our twelve authorised ateliers worldwide. Grand Complication and Haute Horlogerie pieces carry a lifetime service guarantee at cost of materials only — no labour fees, ever.",
  },
  {
    q: "How are your movements rated for accuracy?",
    a: "All production movements are submitted to the COSC (Contrôle Officiel Suisse des Chronomètres) for independent certification, with a tolerance of +4/−6 seconds per day. Our in-house testing protocol is stricter: we accept only movements achieving +2/−3 seconds per day across five positions and three temperature ranges before they leave the timing department.",
  },
  {
    q: "What is your policy on secondary market valuations?",
    a: "Maison Aurum partners with Christie's, Phillips, and Sotheby's for secondary market authentication and valuation. All timepieces carry a unique case reference engraved on the inner caseback flange, verifiable against our production archive. We provide current and historical valuation certificates upon request for insurance and estate purposes.",
  },
]

const STATS_DATA = [
  { label: "Years of Mastery", to: 133, suffix: "", icon: Clock },
  { label: "Components, Tourbillon", to: 412, suffix: "+", icon: Gem },
  { label: "Hours of Finishing", to: 240, suffix: "h", icon: Wrench },
  { label: "Ateliers Worldwide", to: 12, suffix: "", icon: Globe },
  { label: "Pieces per Year", to: 600, suffix: "", icon: Shield },
  { label: "Warranty (Years)", to: 5, suffix: "", icon: Award },
]

const NAV_LINKS = ["Collections", "Atelier", "Heritage", "Bespoke", "Contact"]

const MARQUEE_WORDS = ["MAISON AURUM", "HAUTE HORLOGERIE", "GENÈVE", "EST. 1891", "TOURBILLON", "PERPÉTUEL", "CHRONOMÈTRE", "SAVOIR-FAIRE", "IN-HOUSE CALIBRE", "GRAND FEU"]

export default function MaisonAurumPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [activeCollection, setActiveCollection] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#0a0905] text-[#c9a84c] min-h-screen">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0905]/95 backdrop-blur-xl border-b border-[#c9a84c]/10 py-4" : "py-7"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <span className="text-sm font-bold uppercase tracking-[0.35em] text-[#c9a84c]" style={{ fontFamily: "'Georgia', serif" }}>
              Maison Aurum
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="cursor-pointer text-[10px] uppercase tracking-[0.28em] text-[#c9a84c]/45 hover:text-[#c9a84c] transition-all duration-200"
                style={{ fontFamily: "'Georgia', serif" }}>
                {l}
              </a>
            ))}
          </div>
          <a href="#bespoke"
            className="cursor-pointer hidden md:block px-6 py-2.5 border border-[#c9a84c]/35 text-[#c9a84c] text-[9px] uppercase tracking-[0.35em] hover:bg-[#c9a84c] hover:text-[#0a0905] transition-all duration-200"
            style={{ fontFamily: "'Georgia', serif" }}>
            Private Appointment
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer text-[#c9a84c] hover:text-[#f0d990] transition-all duration-200">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0905] border-l border-[#c9a84c]/10 w-72">
              <div className="flex flex-col gap-8 pt-14">
                {NAV_LINKS.map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`}
                    className="cursor-pointer text-2xl uppercase tracking-[0.3em] text-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-200"
                    style={{ fontFamily: "'Georgia', serif" }}>
                    {l}
                  </a>
                ))}
                <Separator className="bg-[#c9a84c]/10" />
                <a href="#bespoke"
                  className="cursor-pointer px-6 py-4 bg-[#c9a84c] text-[#0a0905] text-[9px] uppercase tracking-[0.35em] font-bold text-center hover:bg-[#f0d990] transition-all duration-200"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  Private Appointment
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} id="collections" className="relative h-screen overflow-hidden flex items-end pb-28 px-6 md:px-14">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
            alt="Maison Aurum tourbillon"
            fill unoptimized
            className="object-cover object-center"
            style={{ filter: "sepia(25%) brightness(0.6)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0905] via-[#0a0905]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0905]/70 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-[9px] uppercase tracking-[0.5em] text-[#c9a84c]/50 mb-7"
            style={{ fontFamily: "'Georgia', serif" }}>
            Genève · Haute Horlogerie · Fondée en 1891
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[8vw] font-bold leading-[0.88] uppercase tracking-tight text-[#f0d990] mb-9"
            style={{ fontFamily: "'Georgia', serif" }}>
            Time is<br />the ultimate<br />luxury.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="text-sm text-[#c9a84c]/55 max-w-md mb-10 leading-relaxed"
            style={{ fontFamily: "'Georgia', serif" }}>
            In-house calibres. 133 years of uninterrupted manufacture. Every timepiece conceived, assembled, and finished by a single maître horloger in Geneva.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-4">
            <a href="#collections"
              className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-[#0a0905] text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-[#f0d990] transition-all duration-200"
              style={{ fontFamily: "'Georgia', serif" }}>
              Discover Collections <ChevronRight className="w-3.5 h-3.5" />
            </a>
            <a href="#bespoke"
              className="cursor-pointer flex items-center gap-2 px-8 py-4 border border-[#c9a84c]/35 text-[#c9a84c] text-[9px] uppercase tracking-[0.4em] hover:bg-[#c9a84c]/10 transition-all duration-200"
              style={{ fontFamily: "'Georgia', serif" }}>
              Private Appointment
            </a>
          </motion.div>
        </div>

        {/* Floating glassmorphism stat cards */}
        <div className="absolute right-8 md:right-14 bottom-28 hidden lg:flex flex-col gap-3 z-10">
          {[
            { label: "Power Reserve", val: "96h" },
            { label: "Components", val: "412+" },
            { label: "Finishing Hours", val: "240h" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 + i * 0.15 }}
              className="bg-white/10 backdrop-blur-md border border-[#c9a84c]/20 px-5 py-3 flex items-center gap-5"
            >
              <span className="text-2xl font-bold text-[#f0d990]" style={{ fontFamily: "'Georgia', serif" }}>{stat.val}</span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-[#c9a84c]/50" style={{ fontFamily: "'Georgia', serif" }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-4 border-y border-[#c9a84c]/12 bg-[#0c0a06]">
        <motion.div
          animate={{ x: [0, -3000] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-14 whitespace-nowrap"
        >
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.45em] text-[#c9a84c]/25 shrink-0" style={{ fontFamily: "'Georgia', serif" }}>
              {w} <span className="text-[#c9a84c]/12 mx-5">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── STATS BAR ── */}
      <section className="py-20 px-6 md:px-14 bg-[#0c0a06] border-b border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {STATS_DATA.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <s.icon className="w-4 h-4 text-[#c9a84c]/30 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold text-[#f0d990] mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]/35 leading-snug" style={{ fontFamily: "'Georgia', serif" }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── COLLECTIONS GRID ── */}
      <section className="py-32 px-6 md:px-14" id="atelier">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a84c]/35 mb-4" style={{ fontFamily: "'Georgia', serif" }}>2026 Collections</p>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#f0d990] mb-20 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              The Timepieces
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLECTIONS.map((w, i) => (
              <Reveal key={w.id} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.01 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-pointer"
                  onClick={() => setActiveCollection(i)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 border border-[#c9a84c]/10">
                    <Image
                      src={w.img} alt={w.name} fill unoptimized
                      className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                      style={{ filter: "sepia(20%) brightness(0.75)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0905]/90 via-[#0a0905]/15 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#c9a84c] text-[#0a0905] rounded-none text-[8px] uppercase tracking-[0.35em] font-bold px-3 py-1">
                        {w.badge}
                      </Badge>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]/55" style={{ fontFamily: "'Georgia', serif" }}>{w.material}</span>
                      <span className="text-xl font-bold text-[#f0d990]" style={{ fontFamily: "'Georgia', serif" }}>{w.price}</span>
                    </div>
                  </div>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a84c]/35 mb-1" style={{ fontFamily: "'Georgia', serif" }}>{w.ref}</p>
                  <h3 className="text-lg uppercase tracking-[0.18em] text-[#f0d990] font-bold group-hover:text-[#c9a84c] transition-all duration-200" style={{ fontFamily: "'Georgia', serif" }}>{w.name}</h3>
                  <p className="text-xs text-[#c9a84c]/40 mt-1.5 leading-relaxed line-clamp-2" style={{ fontFamily: "'Georgia', serif" }}>{w.desc.slice(0, 85)}...</p>
                  <div className="flex items-center gap-1.5 mt-3 text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]/35 group-hover:text-[#c9a84c] transition-all duration-200 cursor-pointer" style={{ fontFamily: "'Georgia', serif" }}>
                    View Details <ChevronRight className="w-3 h-3" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTION MODAL ── */}
      <Dialog open={activeCollection !== null} onOpenChange={() => setActiveCollection(null)}>
        <DialogContent className="bg-[#100e07] border border-[#c9a84c]/15 text-[#c9a84c] max-w-3xl rounded-none p-0 overflow-hidden">
          {activeCollection !== null && (
            <>
              <div className="relative aspect-video overflow-hidden">
                <Image src={COLLECTIONS[activeCollection].img} alt={COLLECTIONS[activeCollection].name} fill unoptimized
                  className="object-cover"
                  style={{ filter: "sepia(20%) brightness(0.8)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100e07] to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[#c9a84c] text-[#0a0905] rounded-none text-[8px] uppercase tracking-[0.35em] font-bold px-3 py-1">
                  {COLLECTIONS[activeCollection].badge}
                </Badge>
              </div>
              <div className="p-8 md:p-10">
                <DialogHeader>
                  <p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a84c]/35 mb-1.5" style={{ fontFamily: "'Georgia', serif" }}>
                    {COLLECTIONS[activeCollection].ref} · {COLLECTIONS[activeCollection].material}
                  </p>
                  <DialogTitle className="text-3xl font-bold uppercase tracking-[0.12em] text-[#f0d990]" style={{ fontFamily: "'Georgia', serif" }}>
                    {COLLECTIONS[activeCollection].name}
                  </DialogTitle>
                  <p className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: "'Georgia', serif" }}>{COLLECTIONS[activeCollection].price}</p>
                </DialogHeader>
                <p className="text-sm text-[#c9a84c]/55 leading-relaxed mt-5 mb-6 italic" style={{ fontFamily: "'Georgia', serif" }}>
                  {COLLECTIONS[activeCollection].desc}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    ["Case Material", COLLECTIONS[activeCollection].material],
                    ["Diameter", COLLECTIONS[activeCollection].diameter],
                    ["Components", COLLECTIONS[activeCollection].components.toString()],
                    ["Power Reserve", COLLECTIONS[activeCollection].reserve],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[10px] border-b border-[#c9a84c]/10 pb-2">
                      <span className="text-[#c9a84c]/35 uppercase tracking-[0.22em]" style={{ fontFamily: "'Georgia', serif" }}>{k}</span>
                      <span className="text-[#c9a84c]/70 font-bold" style={{ fontFamily: "'Georgia', serif" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <a href="#bespoke"
                  className="cursor-pointer w-full block text-center py-4 bg-[#c9a84c] text-[#0a0905] text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-[#f0d990] transition-all duration-200"
                  onClick={() => setActiveCollection(null)}
                  style={{ fontFamily: "'Georgia', serif" }}>
                  Request Private Viewing
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── FEATURES WITH TABS ── */}
      <section className="py-32 px-6 md:px-14 bg-[#0c0a06] border-t border-[#c9a84c]/10" id="heritage">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a84c]/35 mb-4" style={{ fontFamily: "'Georgia', serif" }}>Our Craft</p>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#f0d990] mb-16 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              The Artisan's<br />Standard.
            </h2>
          </Reveal>
          <Tabs defaultValue="movement" className="w-full">
            <TabsList className="bg-transparent border border-[#c9a84c]/12 rounded-none p-0 mb-14 w-full md:w-auto flex">
              {FEATURES_TABS.map(({ val, label, icon: Icon }) => (
                <TabsTrigger key={val} value={val}
                  className="cursor-pointer rounded-none flex-1 md:flex-none px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]/35 data-[state=active]:bg-[#c9a84c] data-[state=active]:text-[#0a0905] data-[state=active]:font-bold transition-all duration-200 flex items-center gap-2"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  <Icon className="w-3.5 h-3.5" /><span className="hidden md:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {FEATURES_TABS.map(({ val, title, subtitle, desc, bullets, stats, img }) => (
              <TabsContent key={val} value={val} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div>
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-[#f0d990] mb-3" style={{ fontFamily: "'Georgia', serif" }}>{title}</h3>
                    <p className="text-sm text-[#c9a84c]/60 italic mb-6 leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>{subtitle}</p>
                    <p className="text-sm text-[#c9a84c]/50 leading-relaxed mb-9" style={{ fontFamily: "'Georgia', serif" }}>{desc}</p>
                    <ul className="space-y-3 mb-10">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[11px] text-[#c9a84c]/55 uppercase tracking-[0.12em]" style={{ fontFamily: "'Georgia', serif" }}>
                          <Check className="w-3.5 h-3.5 text-[#c9a84c] mt-0.5 shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((s) => (
                        <div key={s.label} className="border-t border-[#c9a84c]/12 pt-5">
                          <div className="text-3xl font-bold text-[#f0d990] mb-1" style={{ fontFamily: "'Georgia', serif" }}>{s.val}</div>
                          <div className="text-[9px] uppercase tracking-[0.32em] text-[#c9a84c]/35" style={{ fontFamily: "'Georgia', serif" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden border border-[#c9a84c]/10">
                    <Image src={img} alt={title} fill unoptimized
                      className="object-cover hover:scale-105 transition-transform duration-[2s]"
                      style={{ filter: "sepia(25%) brightness(0.75)" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a06]/60 to-transparent" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-32 px-6 md:px-14 border-t border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a84c]/35 mb-4 text-center" style={{ fontFamily: "'Georgia', serif" }}>Collectors & Connoisseurs</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#f0d990] mb-16 text-center" style={{ fontFamily: "'Georgia', serif" }}>
              What They Say.
            </h2>
          </Reveal>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-transparent border-[#c9a84c]/10 rounded-none h-full hover:border-[#c9a84c]/25 transition-all duration-200">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 text-[#c9a84c] fill-[#c9a84c]" />
                        ))}
                      </div>
                      <p className="text-sm text-[#c9a84c]/55 leading-relaxed italic flex-1 mb-6" style={{ fontFamily: "'Georgia', serif" }}>"{t.quote}"</p>
                      <Separator className="bg-[#c9a84c]/10 mb-5" />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 rounded-none">
                          <AvatarFallback className="bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold rounded-none" style={{ fontFamily: "'Georgia', serif" }}>{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.25em] text-[#f0d990] font-bold" style={{ fontFamily: "'Georgia', serif" }}>{t.name}</p>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#c9a84c]/35" style={{ fontFamily: "'Georgia', serif" }}>{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 bg-[#0a0905] border-[#c9a84c]/20 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0905] rounded-none transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-4 bg-[#0a0905] border-[#c9a84c]/20 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0905] rounded-none transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-32 px-6 md:px-14 bg-[#0c0a06] border-t border-[#c9a84c]/10" id="bespoke">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a84c]/35 mb-4 text-center" style={{ fontFamily: "'Georgia', serif" }}>Acquisition</p>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-[#f0d990] mb-4 text-center" style={{ fontFamily: "'Georgia', serif" }}>
              Three Tiers of Excellence.
            </h2>
            <p className="text-sm text-[#c9a84c]/45 text-center max-w-md mx-auto mb-20 leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
              Every acquisition begins with a private consultation in Geneva. No purchase is made through a website.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#c9a84c]/12">
            {PRICING.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div className={`p-9 h-full flex flex-col border-r border-[#c9a84c]/12 last:border-r-0 cursor-pointer transition-all duration-200 ${tier.highlight ? "bg-[#c9a84c]/6 border-[#c9a84c]/20" : "hover:bg-[#c9a84c]/3"}`}>
                  {tier.highlight && (
                    <Badge className="bg-[#c9a84c] text-[#0a0905] rounded-none text-[8px] font-bold uppercase tracking-[0.35em] px-3 py-1 mb-5 w-fit">
                      Most Requested
                    </Badge>
                  )}
                  <p className="text-[9px] uppercase tracking-[0.45em] text-[#c9a84c]/35 mb-2" style={{ fontFamily: "'Georgia', serif" }}>{tier.period ? tier.period + " " : ""}</p>
                  <div className="text-2xl font-bold text-[#f0d990] mb-3 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>{tier.price}</div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#c9a84c]/40 font-bold mb-2" style={{ fontFamily: "'Georgia', serif" }}>{tier.name}</p>
                  <p className="text-xs text-[#c9a84c]/40 leading-relaxed mb-8 italic" style={{ fontFamily: "'Georgia', serif" }}>{tier.desc}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[11px] text-[#c9a84c]/50 uppercase tracking-[0.1em]" style={{ fontFamily: "'Georgia', serif" }}>
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tier.highlight ? "text-[#c9a84c]" : "text-[#c9a84c]/35"}`} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`cursor-pointer w-full py-4 text-[9px] uppercase tracking-[0.4em] font-bold transition-all duration-200 ${tier.highlight ? "bg-[#c9a84c] text-[#0a0905] hover:bg-[#f0d990]" : "border border-[#c9a84c]/25 text-[#c9a84c] hover:border-[#c9a84c]/60 hover:bg-[#c9a84c]/10"}`}
                    style={{ fontFamily: "'Georgia', serif" }}>
                    Request Appointment
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-6 md:px-14" id="contact">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a84c]/35 mb-4" style={{ fontFamily: "'Georgia', serif" }}>Questions</p>
            <h2 className="text-4xl font-bold uppercase tracking-tight text-[#f0d990] mb-16" style={{ fontFamily: "'Georgia', serif" }}>Frequently Asked</h2>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-0">
            {FAQS_DATA.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#c9a84c]/10 border-t-0">
                <AccordionTrigger
                  className="cursor-pointer text-left text-sm text-[#f0d990]/80 hover:text-[#f0d990] hover:no-underline transition-all duration-200 py-6 tracking-[0.05em] font-medium"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#c9a84c]/50 leading-relaxed pb-6 italic" style={{ fontFamily: "'Georgia', serif" }}>
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-32 px-6 md:px-14 relative overflow-hidden border-t border-[#c9a84c]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a84c]/35 mb-7" style={{ fontFamily: "'Georgia', serif" }}>
              Genève · Paris · New York · Tokyo · Hong Kong · Dubai
            </p>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tight text-[#f0d990] mb-6 leading-[0.85]" style={{ fontFamily: "'Georgia', serif" }}>
              Begin your<br />acquisition.
            </h2>
            <p className="text-[#c9a84c]/45 mb-12 text-sm max-w-md mx-auto leading-relaxed italic" style={{ fontFamily: "'Georgia', serif" }}>
              Every acquisition begins with a private consultation. We come to you — Geneva, Paris, or any city in the world.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#bespoke"
                className="cursor-pointer flex items-center gap-2 px-12 py-5 bg-[#c9a84c] text-[#0a0905] text-[9px] uppercase tracking-[0.45em] font-bold hover:bg-[#f0d990] transition-all duration-200"
                style={{ fontFamily: "'Georgia', serif" }}>
                Request Private Appointment <ArrowRight className="w-4 h-4" />
              </a>
              <button
                className="cursor-pointer px-12 py-5 border border-[#c9a84c]/30 text-[#c9a84c] text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-[#c9a84c]/10 transition-all duration-200"
                style={{ fontFamily: "'Georgia', serif" }}>
                Download Catalogue
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#c9a84c]/10 bg-[#080704]">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <span className="text-base font-bold uppercase tracking-[0.35em] mb-5 block text-[#c9a84c]" style={{ fontFamily: "'Georgia', serif" }}>
                Maison Aurum
              </span>
              <p className="text-[11px] text-[#c9a84c]/30 leading-relaxed max-w-xs mb-7 italic" style={{ fontFamily: "'Georgia', serif" }}>
                Haute horlogerie depuis 1891. In-house calibres, 240 hours of finishing, and twelve bespoke commissions per year. Geneva, Switzerland.
              </p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <button key={i} className="cursor-pointer w-8 h-8 border border-[#c9a84c]/15 flex items-center justify-center text-[#c9a84c]/25 hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-200">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Collections", links: ["Tourbillon Noir", "Perpétuel Blanc", "Chrono Eclipse", "Bespoke Programme"] },
              { title: "Maison", links: ["Heritage", "Atelier", "Maîtres Horlogers", "Press"] },
              { title: "Contact", links: ["Geneva Atelier", "Private Appointments", "After-Sales Service", "Reseller Network"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a84c]/30 mb-5 font-bold" style={{ fontFamily: "'Georgia', serif" }}>{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="cursor-pointer text-[10px] uppercase tracking-[0.15em] text-[#c9a84c]/28 hover:text-[#c9a84c] transition-all duration-200" style={{ fontFamily: "'Georgia', serif" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-[#c9a84c]/8 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] uppercase tracking-[0.35em] text-[#c9a84c]/20" style={{ fontFamily: "'Georgia', serif" }}>
            <span>Maison Aurum · Genève · Est. 1891</span>
            <span>© 2026 Maison Aurum SA. All rights reserved.</span>
            <span className="flex gap-6">
              <a href="#" className="cursor-pointer hover:text-[#c9a84c] transition-all duration-200">Privacy</a>
              <a href="#" className="cursor-pointer hover:text-[#c9a84c] transition-all duration-200">Legal</a>
            </span>
          </div>
        </div>
      </footer>

      <style>{`::-webkit-scrollbar{width:5px;background:#0a0905}::-webkit-scrollbar-thumb{background:#c9a84c22} * { font-family: 'Georgia', 'Times New Roman', serif; }`}</style>
    </div>
  )
}
