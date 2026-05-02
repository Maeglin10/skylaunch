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
  Users, MapPin, Wifi, Coffee, Menu, Star, Check, Calendar,
  Zap, Dumbbell, Phone, Monitor, Car, Shield, Award,
  ChevronRight, Building, TrendingUp, Twitter, Instagram,
  Linkedin, Globe, ArrowRight
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

const SPACES = [
  {
    type: "Hot Desk",
    price: "$299",
    period: "/month",
    tagline: "Work from the best seat in the room — today.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    features: ["Unlimited access — any desk, any time", "24/7 building entry", "4 hours meeting room credits", "High-speed 1Gbps fiber", "Coffee, cold brew & snacks included"],
  },
  {
    type: "Dedicated Desk",
    price: "$549",
    period: "/month",
    tagline: "Your name. Your desk. Your setup.",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    features: ["Reserved desk — yours permanently", "Locked storage pedestal", "8 hours meeting room credits", "Mail + package handling", "Dedicated Gigabit ethernet port"],
  },
  {
    type: "Private Office",
    price: "$1,299",
    period: "/month",
    tagline: "A real office without the 10-year lease.",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    features: ["4-person lockable private office", "Floor-to-ceiling glass walls", "16 hours meeting room credits", "Custom signage + branding", "Dedicated phone line included"],
  },
  {
    type: "Team Suite",
    price: "$3,800",
    period: "/month",
    tagline: "For teams of 8–20 who mean business.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    features: ["Up to 20-person suite — fully furnished", "Private server closet", "Unlimited meeting room access", "Dedicated enterprise IT support", "Custom interior design options"],
  },
]

const LOCATIONS = [
  {
    city: "San Francisco",
    address: "345 Spear St, SoMa District",
    members: 487,
    desks: 340,
    events: 14,
    openSince: "2018",
    img: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80",
    amenities: ["Rooftop terrace", "Podcast studio", "Bike storage", "Shower rooms"],
  },
  {
    city: "New York",
    address: "180 Maiden Lane, Financial District",
    members: 622,
    desks: 480,
    events: 18,
    openSince: "2019",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    amenities: ["33rd-floor skyline views", "Wellness room", "Game lounge", "Catering kitchen"],
  },
  {
    city: "Austin",
    address: "600 Congress Ave, Downtown",
    members: 391,
    desks: 290,
    events: 11,
    openSince: "2021",
    img: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80",
    amenities: ["Outdoor co-working deck", "Music studio", "Dog-friendly", "EV charging"],
  },
]

const TESTIMONIALS = [
  {
    name: "Sarah Chen", role: "Co-founder, Fieldnote AI", avatar: "SC", rating: 5,
    text: "I met my co-founder at the coffee bar on my second day. Two years later we've raised $4.2M and we still work out of Studio Hive. The serendipity here is unlike any other coworking space I've tried."
  },
  {
    name: "Marcus Brown", role: "Principal, Resonant Consulting", avatar: "MB", rating: 5,
    text: "The private offices are genuinely nicer than the WeWork suite we were paying three times as much for. The IT team resolved a critical firewall issue for us within 20 minutes on a Sunday. Exceptional."
  },
  {
    name: "Leila Farabi", role: "Head of Growth, Dune Health", avatar: "LF", rating: 5,
    text: "Our team scaled from 4 to 17 people in 14 months. Studio Hive let us expand desk-by-desk without signing a new lease every time we hired. That flexibility was worth more than any perk."
  },
  {
    name: "Tom Vickers", role: "Freelance Creative Director", avatar: "TV", rating: 5,
    text: "I've worked from studios in Brooklyn, Shoreditch, and Berlin. Studio Hive Austin is the first coworking space that doesn't feel like a WeWork clone. The outdoor deck alone makes Monday mornings something to look forward to."
  },
  {
    name: "Nina Kostov", role: "VP Engineering, Parallel Labs", avatar: "NK", rating: 5,
    text: "1 Gbps fiber, zero packet loss, and a dedicated server closet for our rack. Sounds basic but you'd be shocked how hard it is to find a coworking space that can actually support a distributed engineering team. Studio Hive nails it."
  },
]

const STATS = [
  { value: "1,500+", label: "Active Members", icon: Users },
  { value: "3", label: "Prime Locations", icon: MapPin },
  { value: "43", label: "Events / Month", icon: Calendar },
  { value: "98.2%", label: "Member Satisfaction", icon: Star },
  { value: "$0", label: "Security Deposit", icon: Shield },
  { value: "24/7", label: "Building Access", icon: Zap },
]

const AMENITIES_TABS = [
  {
    value: "workspace",
    label: "Workspace",
    icon: Monitor,
    title: "Productivity-Designed Spaces",
    desc: "Every square foot of Studio Hive is engineered for deep focus. Biophilic design, acoustic panels tuned to 40dB, and lighting calibrated to 5,500K cool white to keep you in flow state.",
    bullets: [
      "1Gbps fiber — dedicated, not shared",
      "Standing desks with Humanscale Leap V2 chairs",
      "40dB acoustic treatment in focus zones",
      "Cisco enterprise WiFi — 500+ concurrent devices",
      "4K monitors available for daily checkout",
    ]
  },
  {
    value: "community",
    label: "Community",
    icon: Users,
    title: "A Network, Not Just a Floor Plan",
    desc: "43 curated events per month — from VC office hours and investor dinners to yoga and hackathons. Our Community team matches members for introductions every week.",
    bullets: [
      "Weekly founder dinners with guest VCs",
      "Monthly demo days — pitch to real investors",
      "Slack community with 3,200+ active members",
      "1-on-1 member matchmaking via our team",
      "Perks worth $12,000/year (AWS, Stripe, Notion)",
    ]
  },
  {
    value: "wellness",
    label: "Wellness",
    icon: Dumbbell,
    title: "Work Hard. Recover Harder.",
    desc: "Studio Hive was the first coworking network to build wellness infrastructure into every location — because we believe your best work comes from your best self.",
    bullets: [
      "On-site gym with Peloton bikes",
      "Meditation and nap rooms",
      "Cold plunge tub (SF and NYC)",
      "Healthy snack bar — protein, fresh fruit, kombucha",
      "Partnerships with Calm, Headspace, and Whoop",
    ]
  },
]

const PRICING = [
  {
    tier: "Starter",
    price: "$99",
    period: "/month",
    description: "5 days of drop-in access per month. Perfect for freelancers and remote workers who need a great space part-time.",
    features: [
      "5 drop-in days per month",
      "Access to all 3 locations",
      "2 hours meeting room credits",
      "Community Slack access",
      "Coffee & tea included",
    ],
    cta: "Book a Tour",
    highlighted: false,
  },
  {
    tier: "Hot Desk",
    price: "$299",
    period: "/month",
    description: "Unlimited access to any hot desk across all locations. Most popular with remote-first startup employees.",
    features: [
      "Unlimited hot desk access",
      "24/7 building entry",
      "4 hours meeting room credits",
      "Community events included",
      "Mail + package handling",
      "Gym & wellness access",
      "Guest passes (2/month)",
    ],
    cta: "Start Now",
    highlighted: true,
  },
  {
    tier: "Dedicated",
    price: "$549",
    period: "/month",
    description: "Your own reserved desk with locked storage. For professionals who need permanence and personalization.",
    features: [
      "Everything in Hot Desk",
      "Reserved desk — always yours",
      "Locked storage pedestal",
      "8 hours meeting room credits",
      "Dedicated ethernet port",
      "Guest passes (5/month)",
    ],
    cta: "Book a Tour",
    highlighted: false,
  },
]

const FAQS = [
  {
    q: "Is there a minimum contract term?",
    a: "No. Hot desks and dedicated desks are month-to-month — cancel with 30 days' notice. Private offices and team suites require a 6-month minimum. We believe in earning your business every month."
  },
  {
    q: "Is parking included with my membership?",
    a: "All Studio Hive locations have negotiated discounted parking in adjacent garages — $75/month vs. the standard $180–$240/month. Reserved underground spots are available for dedicated desk and above members at $120/month."
  },
  {
    q: "Can I host client meetings in your spaces?",
    a: "Absolutely. Every membership tier includes meeting room credits. Rooms seat 4 to 20 people and are equipped with 4K displays, Zoom Rooms, and whiteboards. Additional room time is $15–$25/hour."
  },
  {
    q: "Do you offer day passes for visiting guests?",
    a: "Yes. Day passes are $35 and include full amenity access. Members can purchase guest passes in bulk at $25 each. Quarterly enterprise accounts get unlimited guest access."
  },
  {
    q: "How does the new member onboarding work?",
    a: "After signing up online, you'll receive your fob and a 60-minute orientation tour within 48 hours. Our Community Manager will introduce you to 5 members we think you should know within your first week."
  },
  {
    q: "Can we customize our private office or team suite?",
    a: "Yes. Private offices can have custom signage, paint colors, and furniture within our design guidelines. Team suites (12-month+) are fully customizable — we work with an interior design partner to build your dream office."
  },
]

export default function StudioHivePage() {
  const [activeCity, setActiveCity] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [tourCity, setTourCity] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 20, stiffness: 300 })
  const springY = useSpring(y, { damping: 20, stiffness: 300 })

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="min-h-screen bg-[#fafaf8] text-[#0f172a]"
    >
      {/* Subtle texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #d97706 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/90 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-all duration-200">
            <div className="w-8 h-8 bg-gradient-to-br from-[#d97706] to-[#f59e0b] rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base tracking-tight text-[#0f172a]">STUDIO HIVE</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748b]">
            {["Spaces", "Locations", "Amenities", "Pricing", "FAQ"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#d97706] transition-all duration-200 cursor-pointer">
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-semibold text-[#64748b] hover:text-[#0f172a] transition-all duration-200 cursor-pointer px-4 py-2">
              Sign In
            </button>
            <button
              onClick={() => { setOpenDialog(true); setTourCity("") }}
              className="px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-white text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer"
            >
              Book a Tour
            </button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer hover:opacity-80 transition-all duration-200">
                <Menu className="w-5 h-5 text-[#0f172a]" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#fafaf8] border-black/5 text-[#0f172a] w-72">
              <div className="flex flex-col gap-6 pt-8">
                {["Spaces", "Locations", "Amenities", "Pricing", "FAQ"].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-lg font-semibold hover:text-[#d97706] transition-all duration-200 cursor-pointer">
                    {link}
                  </a>
                ))}
                <Separator className="bg-black/10" />
                <button
                  onClick={() => { setOpenDialog(true); setTourCity("") }}
                  className="w-full py-3 bg-[#d97706] rounded-lg font-bold text-sm text-white cursor-pointer hover:bg-[#b45309] transition-all duration-200"
                >
                  Book a Tour
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
              alt="Studio Hive coworking"
              fill
              className="object-cover opacity-20"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fafaf8]/40 via-transparent to-[#fafaf8]" />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d97706]/30 bg-[#d97706]/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span className="text-[#d97706] text-xs font-bold tracking-widest uppercase">
                  3 Locations · 1,500+ Members · $0 Security Deposit
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.92] tracking-tight mb-6 text-[#0f172a]">
                Where Your Best
                <br />
                <span className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] bg-clip-text text-transparent">
                  Work Happens.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[#64748b] text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Premium coworking spaces in San Francisco, New York, and Austin. No 10-year leases, no deposits, no compromises on quality.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                <button
                  onClick={() => { setOpenDialog(true); setTourCity("") }}
                  className="px-8 py-4 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-[#d97706]/30 hover:shadow-[#d97706]/50"
                >
                  Book Your Free Tour
                </button>
                <a href="#spaces" className="flex items-center gap-2 px-6 py-4 border border-black/15 hover:border-[#d97706]/40 rounded-xl font-semibold text-sm text-[#64748b] hover:text-[#d97706] transition-all duration-200 cursor-pointer">
                  View Spaces <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            {/* Floating stat cards */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: "Avg. Payback", value: "8 months" },
                  { label: "Team Growth", value: "3.2× faster" },
                  { label: "Net Promoter", value: "NPS 74" },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                    className="px-5 py-3 bg-white border border-black/8 shadow-sm rounded-xl text-center"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-[#94a3b8] mb-0.5">{card.label}</div>
                    <div className="text-sm font-black text-[#d97706]">{card.value}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="py-16 border-y border-black/5 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {STATS.map((stat, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="text-center">
                    <stat.icon className="w-5 h-5 text-[#d97706] mx-auto mb-2 opacity-70" />
                    <div className="text-3xl font-black text-[#0f172a] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#94a3b8] uppercase tracking-widest">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPACES ── */}
        <section id="spaces" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge className="bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20 mb-4">Workspace Options</Badge>
                <h2 className="text-5xl font-black tracking-tight mb-4 text-[#0f172a]">
                  A Space for <span className="text-[#d97706]">Every Phase.</span>
                </h2>
                <p className="text-[#64748b] text-lg max-w-xl mx-auto">
                  From solo freelancers to 20-person startups — scale up or down with 30 days' notice.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPACES.map((space, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-black/8 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={space.img}
                        alt={space.type}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-5">
                        <div className="text-white/60 text-xs mb-0.5">{space.tagline}</div>
                        <div className="text-white font-black text-xl">{space.type}</div>
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#d97706] rounded-lg">
                        <span className="text-white font-black text-sm">{space.price}</span>
                        <span className="text-white/70 text-xs">{space.period}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-2.5 mb-5">
                        {space.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#d97706] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[#475569]">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => { setOpenDialog(true); setTourCity(space.type) }}
                        className="w-full py-3 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        Book a Tour for {space.type}
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── AMENITIES WITH TABS ── */}
        <section id="amenities" className="py-24 px-6 bg-white border-y border-black/5">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="bg-[#0f172a]/5 text-[#0f172a] border-[#0f172a]/10 mb-4">Everything Included</Badge>
                <h2 className="text-5xl font-black tracking-tight text-[#0f172a]">
                  Built for <span className="text-[#d97706]">Real Work.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Tabs defaultValue="workspace" className="w-full">
                <TabsList className="bg-[#f1f5f9] border border-black/5 rounded-xl p-1 w-full grid grid-cols-3 mb-10">
                  {AMENITIES_TABS.map(tab => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-lg text-[#64748b] data-[state=active]:bg-[#d97706] data-[state=active]:text-white font-semibold text-sm cursor-pointer transition-all duration-200"
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {AMENITIES_TABS.map(tab => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <Card className="bg-[#fafaf8] border-black/5 rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="p-8 md:p-10">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#d97706]/10 mb-6">
                              <tab.icon className="w-6 h-6 text-[#d97706]" />
                            </div>
                            <h3 className="text-2xl font-black mb-3 text-[#0f172a]">{tab.title}</h3>
                            <p className="text-[#64748b] leading-relaxed mb-6">{tab.desc}</p>
                            <ul className="space-y-3">
                              {tab.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2.5">
                                  <Check className="w-4 h-4 text-[#d97706] mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-[#475569]">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="relative min-h-[280px] bg-gradient-to-br from-[#d97706]/10 to-[#f59e0b]/5 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                              <tab.icon className="w-64 h-64 text-[#d97706]" />
                            </div>
                            <div className="relative z-10 text-center p-8">
                              <div className="text-6xl font-black text-[#d97706] mb-2">
                                {tab.value === "workspace" ? "1G" : tab.value === "community" ? "43" : "NPS"}
                              </div>
                              <div className="text-sm text-[#94a3b8]">
                                {tab.value === "workspace" ? "Fiber — Dedicated" : tab.value === "community" ? "Events / Month" : "Score: 74"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </Reveal>
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section id="locations" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20 mb-4">Our Locations</Badge>
                <h2 className="text-5xl font-black tracking-tight mb-4 text-[#0f172a]">
                  3 Cities. <span className="text-[#d97706]">One Community.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {LOCATIONS.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCity(i)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                      activeCity === i
                        ? "bg-[#d97706] text-white shadow-md shadow-[#d97706]/30"
                        : "border border-black/10 text-[#64748b] hover:border-[#d97706]/40 hover:text-[#d97706]"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.city}
                  </button>
                ))}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCity}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-black/8 shadow-sm">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-72 md:h-auto min-h-[280px]">
                      <Image
                        src={LOCATIONS[activeCity].img}
                        alt={LOCATIONS[activeCity].city}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    </div>
                    <div className="p-8 md:p-10">
                      <Badge className="bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20 mb-4">
                        Open since {LOCATIONS[activeCity].openSince}
                      </Badge>
                      <h3 className="text-3xl font-black mb-1 text-[#0f172a]">{LOCATIONS[activeCity].city}</h3>
                      <p className="text-[#94a3b8] text-sm mb-6 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {LOCATIONS[activeCity].address}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { label: "Members", value: LOCATIONS[activeCity].members },
                          { label: "Total Desks", value: LOCATIONS[activeCity].desks },
                          { label: "Events/Month", value: LOCATIONS[activeCity].events },
                        ].map((stat, j) => (
                          <div key={j} className="text-center p-3 bg-[#fafaf8] rounded-xl">
                            <div className="text-2xl font-black text-[#d97706]">{stat.value}</div>
                            <div className="text-xs text-[#94a3b8]">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 mb-6">
                        {LOCATIONS[activeCity].amenities.map((a, j) => (
                          <div key={j} className="flex items-center gap-2.5 text-sm text-[#475569]">
                            <Check className="w-4 h-4 text-[#d97706]" />
                            {a}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => { setOpenDialog(true); setTourCity(LOCATIONS[activeCity].city) }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        Book a Tour in {LOCATIONS[activeCity].city}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── TESTIMONIALS CAROUSEL ── */}
        <section className="py-24 px-6 bg-white border-y border-black/5">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="bg-[#0f172a]/5 text-[#0f172a] border-[#0f172a]/10 mb-4">Member Stories</Badge>
                <h2 className="text-5xl font-black tracking-tight text-[#0f172a]">
                  1,500 Members.{" "}
                  <span className="text-[#d97706]">Real Results.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {TESTIMONIALS.map((t, i) => (
                    <CarouselItem key={i} className="md:basis-1/2 pl-4">
                      <Card className="bg-[#fafaf8] border-black/5 rounded-2xl h-full">
                        <CardContent className="p-7">
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: t.rating }).map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#d97706] text-[#d97706]" />
                            ))}
                          </div>
                          <p className="text-[#475569] leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-[#d97706]/20 text-[#d97706] text-xs font-bold">
                                {t.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-bold text-[#0f172a]">{t.name}</div>
                              <div className="text-xs text-[#94a3b8]">{t.role}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white border-black/10 text-[#0f172a] hover:bg-[#d97706]/5 hover:border-[#d97706]/30 cursor-pointer -left-4" />
                <CarouselNext className="bg-white border-black/10 text-[#0f172a] hover:bg-[#d97706]/5 hover:border-[#d97706]/30 cursor-pointer -right-4" />
              </Carousel>
            </Reveal>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-14">
                <Badge className="bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20 mb-4">Pricing</Badge>
                <h2 className="text-5xl font-black tracking-tight mb-3 text-[#0f172a]">
                  Month-to-Month. <span className="text-[#d97706]">Always.</span>
                </h2>
                <p className="text-[#64748b]">No deposits. No annual lock-ins. Scale with your team.</p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {PRICING.map((plan, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`relative rounded-2xl p-7 h-full flex flex-col transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-[#d97706]/15 to-[#f59e0b]/5 border-2 border-[#d97706] shadow-xl shadow-[#d97706]/15"
                      : "bg-white border border-black/8 shadow-sm"
                  }`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-[#d97706] text-white border-0 font-bold text-xs px-3">Most Popular</Badge>
                      </div>
                    )}
                    <div className="mb-6">
                      <div className="text-sm font-bold text-[#94a3b8] uppercase tracking-widest mb-2">{plan.tier}</div>
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-4xl font-black text-[#0f172a]">{plan.price}</span>
                        <span className="text-[#94a3b8] text-sm mb-1">{plan.period}</span>
                      </div>
                      <p className="text-sm text-[#64748b] leading-relaxed">{plan.description}</p>
                    </div>
                    <Separator className="bg-black/5 mb-6" />
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-[#d97706]" : "text-[#94a3b8]"}`} />
                          <span className="text-sm text-[#475569]">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => { setOpenDialog(true); setTourCity(plan.tier) }}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                        plan.highlighted
                          ? "bg-[#d97706] hover:bg-[#b45309] text-white shadow-lg shadow-[#d97706]/20"
                          : "border border-black/10 hover:border-[#d97706]/40 text-[#0f172a] hover:text-[#d97706]"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24 px-6 bg-white border-y border-black/5">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Badge className="bg-[#0f172a]/5 text-[#0f172a] border-[#0f172a]/10 mb-4">FAQ</Badge>
                <h2 className="text-5xl font-black tracking-tight text-[#0f172a]">Any Questions?</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-[#fafaf8] border border-black/5 rounded-xl px-5 cursor-pointer hover:border-[#d97706]/30 transition-all duration-200"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#0f172a] hover:text-[#d97706] transition-all duration-200 hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#64748b] leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#d97706] to-[#f59e0b] p-12 text-center">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }} />
                <div className="relative z-10">
                  <Building className="w-10 h-10 text-white mx-auto mb-6 opacity-90" />
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
                    Ready to Join the Hive?
                  </h2>
                  <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                    Book a free 30-minute tour and walk away knowing exactly where your team belongs.
                  </p>
                  <button
                    onClick={() => { setOpenDialog(true); setTourCity("") }}
                    className="px-10 py-4 bg-white hover:bg-[#fafaf8] text-[#d97706] font-black text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-xl shadow-black/20"
                  >
                    Book Your Free Tour Today
                  </button>
                  <p className="text-white/50 text-xs mt-4">No commitment required. Tours take 30 minutes.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-black/5 py-16 px-6 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#d97706] to-[#f59e0b] rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-base text-white">STUDIO HIVE</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                  Premium coworking in SF, NYC, and Austin. No leases. No compromises.
                </p>
                <div className="flex gap-4 mt-5">
                  {[Twitter, Instagram, Linkedin, Globe].map((Icon, i) => (
                    <button key={i} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#d97706]/30 flex items-center justify-center transition-all duration-200 cursor-pointer">
                      <Icon className="w-4 h-4 text-white/40 hover:text-white" />
                    </button>
                  ))}
                </div>
              </div>

              {[
                { title: "Spaces", links: ["Hot Desk", "Dedicated Desk", "Private Office", "Team Suite", "Event Space"] },
                { title: "Locations", links: ["San Francisco", "New York", "Austin", "Coming Soon: LA"] },
                { title: "Company", links: ["About", "Careers", "Press", "Blog", "Contact"] },
              ].map(col => (
                <div key={col.title}>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">{col.title}</div>
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-sm text-white/40 hover:text-white transition-all duration-200 cursor-pointer">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Separator className="bg-white/5 mb-6" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
              <span>© 2025 Studio Hive Inc. All rights reserved.</span>
              <div className="flex gap-5">
                {["Privacy Policy", "Terms of Service", "Accessibility"].map(link => (
                  <a key={link} href="#" className="hover:text-white/60 transition-all duration-200 cursor-pointer">{link}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ── TOUR BOOKING DIALOG ── */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white border-black/10 text-[#0f172a] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#0f172a]">
              {tourCity ? `Book a Tour — ${tourCity}` : "Book Your Free Tour"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-[#64748b] text-sm">30-minute guided tour with a Community Manager. No commitment required.</p>
            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-[#fafaf8] border border-black/10 rounded-xl text-[#0f172a] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#d97706]/50 transition-all duration-200" />
            <input type="email" placeholder="Work Email" className="w-full px-4 py-3 bg-[#fafaf8] border border-black/10 rounded-xl text-[#0f172a] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#d97706]/50 transition-all duration-200" />
            <select className="w-full px-4 py-3 bg-[#fafaf8] border border-black/10 rounded-xl text-[#0f172a] text-sm focus:outline-none focus:border-[#d97706]/50 transition-all duration-200 cursor-pointer">
              <option value="">Select a location</option>
              <option>San Francisco — SoMa</option>
              <option>New York — Financial District</option>
              <option>Austin — Downtown</option>
            </select>
            <button
              onClick={() => setOpenDialog(false)}
              className="w-full py-3 bg-[#d97706] hover:bg-[#b45309] text-white font-bold rounded-xl transition-all duration-200 cursor-pointer"
            >
              Request My Tour
            </button>
            <div className="flex items-center justify-center gap-5 text-xs text-[#94a3b8]">
              {["No commitment", "30 minutes", "Free coffee"].map(item => (
                <div key={item} className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#d97706]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fafaf8; }
        ::-webkit-scrollbar-thumb { background: #d97706; border-radius: 3px; }
      `}</style>
    </div>
  )
}
