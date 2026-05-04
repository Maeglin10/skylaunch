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
  Beer, Menu, X, Star, MapPin, Clock, Phone, Award, Leaf, Flame, Droplets,
  Instagram, Twitter, Facebook, Youtube, ChevronRight, Medal, Wheat, ThumbsUp
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "fill-[#d4890a] text-[#d4890a]" : "text-[#d4890a]/30"}`} />
      ))}
    </div>
  )
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  useEffect(() => {
    if (!isInView) return
    let current = 0
    const step = Math.ceil(target / 60)
    const interval = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(current)
      if (current >= target) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [isInView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function GoldenRidgeBrewing() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tourDialogOpen, setTourDialogOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 600], [0, 180])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  const navLinks = ["Our Beers", "Tap Rooms", "Brewery", "Events", "Shop"]

  const stats = [
    { value: 2012, suffix: "", label: "Founded" },
    { value: 47, suffix: "+", label: "Unique Beers Brewed" },
    { value: 8, suffix: "", label: "Competition Medals" },
    { value: 3, suffix: "", label: "Tap Room Locations" },
    { value: 12000, suffix: "+", label: "Barrels Produced / Year" },
    { value: 96, suffix: "%", label: "Local Ingredients" },
  ]

  const tabFeatures = [
    {
      value: "ipa",
      label: "IPA & Hoppy",
      icon: Flame,
      title: "West Coast & New England IPAs",
      description: "Our hop-forward lineup showcases the finest Pacific Northwest hops, dry-hopped to peak aromatic intensity.",
      bullets: [
        "Ridge Hopper IPA — 6.8% ABV, 65 IBU, mosaic & citra hops",
        "Hazy Valley NEIPA — 7.1% ABV, 45 IBU, soft tropical finish",
        "Double Ridgeline DIPA — 8.4% ABV, 85 IBU, resinous pine backbone",
        "Session Hop — 4.2% ABV, 35 IBU, all-day crushability",
      ],
    },
    {
      value: "dark",
      label: "Dark & Roasted",
      icon: Beer,
      title: "Stouts, Porters & Dark Ales",
      description: "Barrel-aged complexity meets artisanal roasting. Each dark beer is a story told in chocolate, coffee, and vanilla.",
      bullets: [
        "Midnight Ridge Imperial Stout — 10.2% ABV, aged 12 months in bourbon barrels",
        "Cold Brew Coffee Porter — 6.4% ABV, brewed with Ecuadorian single-origin beans",
        "Velvet Brown Ale — 5.3% ABV, English-style with toffee and caramel notes",
        "Smoked Barleywine — 11.8% ABV, limited seasonal release each November",
      ],
    },
    {
      value: "lager",
      label: "Lagers & Wheat",
      icon: Wheat,
      title: "Crisp, Clean & Refreshing",
      description: "Traditional European brewing methods applied to California terroir. Cold-conditioned for minimum 6 weeks.",
      bullets: [
        "Golden Pils — 5.2% ABV, Bohemian-style with Saaz hops, noble and dry",
        "Ridge Hefeweizen — 5.5% ABV, Bavarian yeast, banana and clove aromatics",
        "Kölsch Collection — 4.8% ABV, served unfiltered in traditional 0.2L Stangen",
        "Mexican-Style Lager — 4.4% ABV, light, bright, pairs with everything",
      ],
    },
    {
      value: "sour",
      label: "Sours & Wild Ales",
      icon: Droplets,
      title: "Spontaneous & Kettle-Soured",
      description: "Our wild fermentation program features locally foraged fruits and cultures captured from the valley itself.",
      bullets: [
        "Sour Sunset Gose — 5.8% ABV, tart raspberry, sea salt balance",
        "Valley Lambic — 6.1% ABV, spontaneous fermentation, 18-month aging",
        "Peach Berliner Weisse — 4.0% ABV, refreshing, low-ABV summer sipper",
        "Blackberry Wild Ale — 6.6% ABV, foraged local berries, funky complexity",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Marcus Thornton",
      role: "Beer Judge, Pacific Coast Homebrew Competition",
      avatar: "MT",
      rating: 5,
      text: "Golden Ridge's barrel program is among the finest I've evaluated in 12 years of judging. The Midnight Ridge Imperial Stout genuinely rivals output from nationally recognized craft breweries.",
    },
    {
      name: "Sofia Reyes",
      role: "Food & Beverage Director, The Grand Cliff Hotel",
      avatar: "SR",
      rating: 5,
      text: "We've featured Golden Ridge on our craft beer menu exclusively for two years. Our guests constantly ask about the Ridge Hopper — it outsells every other beer we carry by 3 to 1.",
    },
    {
      name: "Daniel Park",
      role: "Certified Cicerone, Regional Beer Educator",
      avatar: "DP",
      rating: 5,
      text: "I take every brewing course cohort I teach on a visit to Golden Ridge. The fermentation facility and their commitment to water chemistry education is unmatched in the region.",
    },
    {
      name: "Annika Johansson",
      role: "Travel Writer, Craft Beer Enthusiast",
      avatar: "AJ",
      rating: 5,
      text: "Flew in specifically for the Autumn Harvest Festival and stayed three days. The barrel-aged tasting flight alone was worth the trip. Golden Ridge is a legitimate beer destination.",
    },
    {
      name: "Robert Callahan",
      role: "Local Restaurateur, Owner of Callahan's Kitchen",
      avatar: "RC",
      rating: 4,
      text: "We've partnered with Golden Ridge for tap takeovers every quarter. Their team brings incredible knowledge and the customer response has been phenomenal every single time.",
    },
  ]

  const pricingTiers = [
    {
      name: "Explorer",
      price: "$15",
      period: "/ tasting flight",
      description: "Perfect for first-time visitors",
      features: [
        "5-beer curated flight",
        "Printed tasting notes",
        "Guided pour explanation",
        "Souvenir tasting glass",
        "10% merch discount same day",
      ],
      cta: "Book Tasting",
      highlighted: false,
    },
    {
      name: "Enthusiast",
      price: "$89",
      period: "/ month",
      description: "Our most popular membership",
      features: [
        "2 x 6-pack monthly allocation",
        "Early access to seasonal releases",
        "1 free brewery tour per month",
        "20% off all tap room purchases",
        "Member-only Discord community",
        "Quarterly barrel-aged exclusive",
      ],
      cta: "Join Club",
      highlighted: true,
    },
    {
      name: "Connoisseur",
      price: "$199",
      period: "/ month",
      description: "For the serious beer devotee",
      features: [
        "Full case monthly allocation",
        "First access to limited & barrel-aged",
        "Private blending session (1x / quarter)",
        "30% off all tap room purchases",
        "Name on Founder's Wall",
        "Annual harvest experience invitation",
        "Priority event reservations",
      ],
      cta: "Apply Now",
      highlighted: false,
    },
  ]

  const faqs = [
    {
      q: "What makes Golden Ridge different from other craft breweries?",
      a: "We operate our own 40-acre hop farm just 8 miles from the brewery, meaning we control quality from rhizome to pint. Our head brewer Callum Hester has 18 years of experience across Germany, Belgium, and California, bringing a genuinely international perspective to every recipe.",
    },
    {
      q: "Do you offer brewery tours and how do I book?",
      a: "Yes — we run guided tours every Saturday at 1 PM and 3 PM, and Sundays at 2 PM. Tours include the full production floor, fermentation tanks, barrel room, and canning line, followed by a 4-sample tasting flight. Tickets are $25/person and sell out 2–3 weeks in advance. Book online or call any tap room directly.",
    },
    {
      q: "Where can I buy Golden Ridge beer outside your tap rooms?",
      a: "Our canned beers are distributed to 340+ retail locations across California, Oregon, and Nevada. Use the store locator on our website to find the closest retailer. We also ship nationwide through our online store (select states only). Our most limited releases are tap room and members-club exclusive.",
    },
    {
      q: "Do you accommodate large groups and private events?",
      a: "Absolutely. Our Barrel Room can be reserved for private events of up to 80 guests and includes dedicated staff, customizable tasting menus, and AV setup. Our Hayfield Terrace accommodates up to 200 for outdoor events. Contact our events team at least 6 weeks in advance for availability.",
    },
    {
      q: "Are your ingredients organic and locally sourced?",
      a: "96% of our barley, hops, and adjuncts are sourced within 200 miles of the brewery. Our Cascade and Centennial hops are estate-grown. We use a certified organic grain bill for our Heritage Series. We publish a full sourcing report annually on our website.",
    },
    {
      q: "What food is available at the tap rooms?",
      a: "All three locations serve a rotating kitchen menu developed by Chef Mara Vincenti, focused on beer-forward pairings — think pretzel boards with beer-cheese fondue, smash burgers on brioche, and seasonal flatbreads. The Riverside location has a full kitchen open daily until 9 PM.",
    },
    {
      q: "Do you have non-alcoholic options?",
      a: "Yes — we brew a rotating NA lineup under our 'Calm Ridge' series, currently including a craft-hopped sparkling water, a malt-forward NA amber, and a tart NA Berliner Weisse. All available on tap and in 4-packs.",
    },
  ]

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#1a1209] text-[#f5f0e8] min-h-screen">

      {/* ===== NAVBAR ===== */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1209]/80 backdrop-blur-xl border-b border-[#d4890a]/15"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-[#d4890a] flex items-center justify-center group-hover:scale-110 transition-all duration-200">
              <Beer className="w-5 h-5 text-[#1a1209]" />
            </div>
            <span className="font-black text-xl tracking-tight text-[#f5f0e8] group-hover:text-[#d4890a] transition-all duration-200">
              GoldenRidge
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-[#f5f0e8]/70 hover:text-[#d4890a] transition-all duration-200 cursor-pointer">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTourDialogOpen(true)}
              className="hidden md:block px-5 py-2.5 bg-[#d4890a] text-[#1a1209] font-bold text-sm rounded-full hover:bg-[#e8a020] hover:scale-105 hover:shadow-[0_0_24px_rgba(212,137,10,0.4)] transition-all duration-200 cursor-pointer">
              Book Tour
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-[#f5f0e8] hover:text-[#d4890a] transition-all duration-200 cursor-pointer">
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1a1209] border-[#d4890a]/20 text-[#f5f0e8] w-72">
                <div className="flex flex-col gap-6 mt-12">
                  {navLinks.map((link) => (
                    <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-semibold hover:text-[#d4890a] transition-all duration-200 cursor-pointer">
                      {link}
                    </a>
                  ))}
                  <button
                    onClick={() => { setTourDialogOpen(true); setMobileOpen(false) }}
                    className="mt-4 px-6 py-3 bg-[#d4890a] text-[#1a1209] font-bold rounded-full hover:bg-[#e8a020] transition-all duration-200 cursor-pointer">
                    Book Tour
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* ===== HERO WITH PARALLAX ===== */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
            alt="GoldenRidge Brewing — craft beer taproom"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1209]/50 via-[#1a1209]/20 to-[#1a1209]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1209]/60 via-transparent to-[#1a1209]/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }}
          className="relative h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}>
            <Badge className="mb-6 bg-[#d4890a]/20 text-[#d4890a] border border-[#d4890a]/30 backdrop-blur-sm px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
              Est. 2012 · Craft Brewery
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-6 text-[#f5f0e8]">
            Golden
            <br />
            <span className="text-[#d4890a]">Ridge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-[#f5f0e8]/70 font-light max-w-2xl mb-10 leading-relaxed">
            47 handcrafted beers. Estate-grown hops. Three tap rooms where every pint tells a story of the valley.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setTourDialogOpen(true)}
              className="px-8 py-4 bg-[#d4890a] text-[#1a1209] font-black uppercase text-sm tracking-widest rounded-full hover:bg-[#e8a020] hover:scale-105 hover:shadow-[0_0_40px_rgba(212,137,10,0.5)] transition-all duration-200 cursor-pointer">
              Book a Tour
            </button>
            <a href="#our-beers"
              className="px-8 py-4 border-2 border-[#f5f0e8]/30 text-[#f5f0e8] font-bold uppercase text-sm tracking-widest rounded-full hover:border-[#d4890a] hover:text-[#d4890a] hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2">
              Explore Beers <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Glassmorphism stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center px-6">
            {[
              { label: "Beers on Tap", value: "24+" },
              { label: "Gold Medals", value: "8" },
              { label: "Est.", value: "2012" },
            ].map((card, i) => (
              <div key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center hover:bg-white/15 hover:scale-105 transition-all duration-200 cursor-default">
                <div className="text-2xl font-black text-[#d4890a]">{card.value}</div>
                <div className="text-xs text-[#f5f0e8]/60 uppercase tracking-widest mt-0.5">{card.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-16 bg-[#d4890a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center cursor-default">
                  <div className="text-3xl md:text-4xl font-black text-[#1a1209]">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-bold text-[#1a1209]/60 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES WITH TABS ===== */}
      <section id="our-beers" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#d4890a]/15 text-[#d4890a] border border-[#d4890a]/25 px-4 py-1 text-xs tracking-widest uppercase">
                The Lineup
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#f5f0e8] mb-4">
                Our Beer <span className="text-[#d4890a]">Styles</span>
              </h2>
              <p className="text-[#f5f0e8]/60 max-w-xl mx-auto text-lg">
                From estate-hopped IPAs to spontaneously fermented wild ales — there's a GoldenRidge beer for every palate and every moment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Tabs defaultValue="ipa" className="w-full">
              <TabsList className="w-full flex flex-wrap h-auto bg-[#2a2015] border border-[#d4890a]/20 rounded-2xl p-2 gap-2 mb-12">
                {tabFeatures.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger key={tab.value} value={tab.value}
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 rounded-xl text-[#f5f0e8]/50 data-[state=active]:bg-[#d4890a] data-[state=active]:text-[#1a1209] data-[state=active]:font-black transition-all duration-200 cursor-pointer hover:text-[#d4890a]">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{tab.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {tabFeatures.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsContent key={tab.value} value={tab.value}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="grid md:grid-cols-2 gap-10 items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#d4890a]/15 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#d4890a]" />
                          </div>
                          <h3 className="text-2xl font-black text-[#f5f0e8]">{tab.title}</h3>
                        </div>
                        <p className="text-[#f5f0e8]/60 text-lg leading-relaxed mb-8">{tab.description}</p>
                        <div className="space-y-3">
                          {tab.bullets.map((bullet, bi) => (
                            <div key={bi} className="flex items-start gap-3 p-4 bg-[#2a2015] rounded-xl border border-[#d4890a]/10 hover:border-[#d4890a]/30 hover:bg-[#2a2015]/80 transition-all duration-200 cursor-default">
                              <Beer className="w-4 h-4 text-[#d4890a] mt-0.5 flex-shrink-0" />
                              <span className="text-[#f5f0e8]/80 text-sm leading-relaxed">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#d4890a]/20">
                        <Image
                          src={`https://images.unsplash.com/photo-${tab.value === "ipa" ? "1558618666-fcd25c85cd64" : tab.value === "dark" ? "1467226912746-c3dbf2e1f584" : tab.value === "lager" ? "1532634993-15f421e8d6b0" : "1558618666-fcd25c85cd64"}?w=800&q=80`}
                          alt={tab.title}
                          fill
                          className="object-cover hover:scale-105 transition-all duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1209]/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6">
                          <Badge className="bg-[#d4890a] text-[#1a1209] font-black px-3 py-1">{tab.label}</Badge>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section className="py-24 px-6 bg-[#2a2015]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#d4890a]/15 text-[#d4890a] border border-[#d4890a]/25 px-4 py-1 text-xs tracking-widest uppercase">
                What People Say
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#f5f0e8] mb-4">
                Trusted by <span className="text-[#d4890a]">Beer Lovers</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-[#1a1209] border-[#d4890a]/20 hover:border-[#d4890a]/50 transition-all duration-200 cursor-default h-full">
                      <CardContent className="p-8 flex flex-col h-full">
                        <StarRating rating={t.rating} />
                        <p className="text-[#f5f0e8]/75 mt-4 mb-6 leading-relaxed text-sm flex-1 italic">
                          &ldquo;{t.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                          <Avatar className="w-10 h-10 border-2 border-[#d4890a]/30">
                            <AvatarFallback className="bg-[#d4890a]/20 text-[#d4890a] text-xs font-bold">
                              {t.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-[#f5f0e8] text-sm">{t.name}</div>
                            <div className="text-[#f5f0e8]/45 text-xs">{t.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-[#d4890a] border-none text-[#1a1209] hover:bg-[#e8a020] hover:scale-110 transition-all duration-200 cursor-pointer -left-5" />
              <CarouselNext className="bg-[#d4890a] border-none text-[#1a1209] hover:bg-[#e8a020] hover:scale-110 transition-all duration-200 cursor-pointer -right-5" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ===== BREWERY SECTION ===== */}
      <section id="brewery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <Badge className="mb-4 bg-[#d4890a]/15 text-[#d4890a] border border-[#d4890a]/25 px-4 py-1 text-xs tracking-widest uppercase">
                  Our Story
                </Badge>
                <h2 className="text-5xl font-black uppercase tracking-tighter text-[#f5f0e8] mb-6 leading-tight">
                  Brewed From the <span className="text-[#d4890a]">Ground Up</span>
                </h2>
                <p className="text-[#f5f0e8]/65 text-lg leading-relaxed mb-8">
                  In 2012, head brewer Callum Hester left a career in commercial brewing to pursue something truer — a brewery rooted in one place, one valley, one set of ingredients grown with intention. Today GoldenRidge farms 40 acres of Cascade and Centennial hops, mills its own grain, and sources water from the same underground aquifer that carved the valley over 10,000 years.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Leaf, label: "Estate Hops", value: "40 acres" },
                    { icon: Award, label: "GABF Medals", value: "8 awards" },
                    { icon: Medal, label: "Craft Beer Rank", value: "Top 50 US" },
                    { icon: ThumbsUp, label: "Untappd Rating", value: "4.31 avg" },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-center gap-3 p-4 bg-[#2a2015] rounded-xl border border-[#d4890a]/15 hover:border-[#d4890a]/35 hover:scale-[1.02] transition-all duration-200 cursor-default">
                        <div className="w-9 h-9 rounded-lg bg-[#d4890a]/15 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#d4890a]" />
                        </div>
                        <div>
                          <div className="text-[#d4890a] font-black text-sm">{item.value}</div>
                          <div className="text-[#f5f0e8]/45 text-xs">{item.label}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#d4890a]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1467226912746-c3dbf2e1f584?w=800&q=80"
                    alt="GoldenRidge Brewing — production facility"
                    fill
                    className="object-cover hover:scale-105 transition-all duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1209]/40 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#d4890a] rounded-2xl p-5 shadow-2xl">
                  <div className="text-[#1a1209] font-black text-2xl">18+</div>
                  <div className="text-[#1a1209]/70 text-xs font-bold uppercase tracking-wider">Years Brewing</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-24 px-6 bg-[#2a2015]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#d4890a]/15 text-[#d4890a] border border-[#d4890a]/25 px-4 py-1 text-xs tracking-widest uppercase">
                Membership & Experiences
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#f5f0e8] mb-4">
                Join the <span className="text-[#d4890a]">Ridge Club</span>
              </h2>
              <p className="text-[#f5f0e8]/60 max-w-xl mx-auto text-lg">
                From single tasting visits to full connoisseur memberships — find the level of access that's right for you.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8, scale: tier.highlighted ? 1.02 : 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`relative rounded-3xl p-8 border cursor-pointer h-full flex flex-col ${
                    tier.highlighted
                      ? "bg-[#d4890a] border-[#d4890a] text-[#1a1209] shadow-[0_0_60px_rgba(212,137,10,0.3)]"
                      : "bg-[#1a1209] border-[#d4890a]/20 hover:border-[#d4890a]/50 text-[#f5f0e8]"
                  }`}>
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#1a1209] text-[#d4890a] border border-[#d4890a] font-black px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-lg font-black uppercase tracking-widest mb-1 ${tier.highlighted ? "text-[#1a1209]" : "text-[#d4890a]"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-4 ${tier.highlighted ? "text-[#1a1209]/70" : "text-[#f5f0e8]/50"}`}>
                      {tier.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-black ${tier.highlighted ? "text-[#1a1209]" : "text-[#f5f0e8]"}`}>
                        {tier.price}
                      </span>
                      <span className={`text-sm ${tier.highlighted ? "text-[#1a1209]/60" : "text-[#f5f0e8]/40"}`}>
                        {tier.period}
                      </span>
                    </div>
                  </div>
                  <Separator className={`mb-6 ${tier.highlighted ? "bg-[#1a1209]/20" : "bg-[#d4890a]/15"}`} />
                  <div className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${tier.highlighted ? "bg-[#1a1209]/15" : "bg-[#d4890a]/15"}`}>
                          <Beer className={`w-3 h-3 ${tier.highlighted ? "text-[#1a1209]" : "text-[#d4890a]"}`} />
                        </div>
                        <span className={`text-sm leading-relaxed ${tier.highlighted ? "text-[#1a1209]/80" : "text-[#f5f0e8]/65"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    tier.highlighted
                      ? "bg-[#1a1209] text-[#d4890a] hover:bg-[#0e0905] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                      : "bg-[#d4890a] text-[#1a1209] hover:bg-[#e8a020] hover:shadow-[0_0_24px_rgba(212,137,10,0.3)]"
                  }`}>
                    {tier.cta}
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION ===== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#d4890a]/15 text-[#d4890a] border border-[#d4890a]/25 px-4 py-1 text-xs tracking-widest uppercase">
                FAQ
              </Badge>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-[#f5f0e8] mb-4">
                Common <span className="text-[#d4890a]">Questions</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}
                  className="border border-[#d4890a]/15 rounded-2xl overflow-hidden bg-[#2a2015] px-2 hover:border-[#d4890a]/35 transition-all duration-200">
                  <AccordionTrigger className="text-left font-bold text-[#f5f0e8] hover:text-[#d4890a] px-4 py-5 transition-all duration-200 cursor-pointer hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-[#f5f0e8]/65 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4890a] via-[#c47a00] to-[#8b5500]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #fff 0%, transparent 60%), radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#1a1209] mb-6 leading-tight">
              Your Next Great
              <br />
              <span className="italic">Pint Awaits</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[#1a1209]/70 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              47 beers on rotation, 3 tap room locations, and tours every weekend. Come see how the valley tastes.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setTourDialogOpen(true)}
                className="px-10 py-5 bg-[#1a1209] text-[#d4890a] font-black uppercase text-sm tracking-widest rounded-full hover:bg-[#0e0905] hover:scale-105 hover:shadow-2xl transition-all duration-200 cursor-pointer">
                Book Your Tour
              </button>
              <a href="#our-beers"
                className="px-10 py-5 border-2 border-[#1a1209]/30 text-[#1a1209] font-black uppercase text-sm tracking-widest rounded-full hover:bg-[#1a1209]/10 hover:scale-105 transition-all duration-200 cursor-pointer">
                View Beer Menu
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0e0905] border-t border-[#d4890a]/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#d4890a] flex items-center justify-center">
                  <Beer className="w-5 h-5 text-[#1a1209]" />
                </div>
                <span className="font-black text-xl tracking-tight text-[#f5f0e8]">GoldenRidge</span>
              </div>
              <p className="text-[#f5f0e8]/45 text-sm leading-relaxed mb-6">
                Craft brewery rooted in the valley since 2012. Estate-grown hops, artisanal technique, zero shortcuts.
              </p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#2a2015] flex items-center justify-center text-[#f5f0e8]/40 hover:bg-[#d4890a] hover:text-[#1a1209] hover:scale-110 transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Visit Us",
                links: ["Riverside Tap Room", "Downtown Tap Room", "Hillside Tap Room", "Book a Tour", "Events Calendar"],
              },
              {
                title: "Our Beers",
                links: ["IPA & Hoppy", "Dark & Roasted", "Lagers & Wheat", "Sours & Wild Ales", "Seasonal & Limited"],
              },
              {
                title: "Company",
                links: ["Our Story", "Sustainability", "Careers", "Wholesale", "Press & Media"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black text-[#f5f0e8] text-sm uppercase tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[#f5f0e8]/45 text-sm hover:text-[#d4890a] transition-all duration-200 cursor-pointer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-[#d4890a]/10 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-[#f5f0e8]/30 text-xs">
              <span>© 2026 GoldenRidge Brewing Co. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Use", "Accessibility"].map((link) => (
                <a key={link} href="#" className="text-[#f5f0e8]/30 text-xs hover:text-[#d4890a] transition-all duration-200 cursor-pointer">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ===== TOUR DIALOG ===== */}
      <Dialog open={tourDialogOpen} onOpenChange={setTourDialogOpen}>
        <DialogContent className="bg-[#1a1209] border border-[#d4890a]/20 text-[#f5f0e8] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#d4890a] font-black text-2xl">Book a Brewery Tour</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-[#f5f0e8]/65 text-sm leading-relaxed">
              Tours run every Saturday at 1 PM & 3 PM, and Sundays at 2 PM. Each tour includes a full production walk-through and a 4-sample tasting flight.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Sat · 1 PM", "Sat · 3 PM", "Sun · 2 PM", "Private Group"].map((slot) => (
                <button key={slot}
                  className="p-3 border border-[#d4890a]/25 rounded-xl text-sm font-semibold hover:bg-[#d4890a] hover:text-[#1a1209] hover:border-[#d4890a] transition-all duration-200 cursor-pointer">
                  {slot}
                </button>
              ))}
            </div>
            <button className="w-full py-4 bg-[#d4890a] text-[#1a1209] font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-[#e8a020] transition-all duration-200 cursor-pointer">
              Confirm Reservation
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
