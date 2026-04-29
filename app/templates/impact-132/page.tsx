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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
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
    const t = setInterval(() => setCount((c) => Math.min(c + step, target)), 16)
    return () => clearInterval(t)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
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
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

const TOPICS = ["Technology", "Business", "Culture", "Science", "Politics"]
const ARTICLES = [
  { id: 1, title: "The Future of AI Journalism", topic: "Technology", reading: "8 min", img: "https://images.unsplash.com/photo-1677442d019cecf8d3cb45e44f0d7bbb?q=80&w=500" },
  { id: 2, title: "Global Markets Shift East", topic: "Business", reading: "12 min", img: "https://images.unsplash.com/photo-1642254060782-1fc53d30c63d?q=80&w=500" },
  { id: 3, title: "Digital Culture Wars", topic: "Culture", reading: "15 min", img: "https://images.unsplash.com/photo-1678301183122-82d3979c7a23?q=80&w=500" },
  { id: 4, title: "Climate Science Breakthrough", topic: "Science", reading: "10 min", img: "https://images.unsplash.com/photo-1581092162080-8cbc2521d7dd?q=80&w=500" },
  { id: 5, title: "Elections 2024 Forecast", topic: "Politics", reading: "18 min", img: "https://images.unsplash.com/photo-1582038927897-db5d7cff4b5f?q=80&w=500" },
  { id: 6, title: "Web3 Reality Check", topic: "Technology", reading: "11 min", img: "https://images.unsplash.com/photo-1605792657660-73886e3f55ca?q=80&w=500" },
  { id: 7, title: "Startup Unicorns Crash", topic: "Business", reading: "13 min", img: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?q=80&w=500" },
  { id: 8, title: "TikTok Generation Leaders", topic: "Culture", reading: "9 min", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500" },
]

const NEWSLETTERS = [
  { id: 1, name: "Daily Brief", subs: "2.4M", desc: "Morning digest of essential news" },
  { id: 2, name: "Weekly Deep-Dive", subs: "890K", desc: "In-depth investigative pieces" },
  { id: 3, name: "Weekend Edition", subs: "1.2M", desc: "Long-form culture & analysis" },
]

const WRITERS = [
  { id: 1, name: "Sarah Chen", beat: "Technology", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
  { id: 2, name: "Marcus Thompson", beat: "Politics", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
  { id: 3, name: "Elena Rodriguez", beat: "Culture", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" },
  { id: 4, name: "James Liu", beat: "Science", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" },
]

export default function AtlasMediaLanding() {
  const [currentTopic, setCurrentTopic] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState("Tech")
  const [showArticleDialog, setShowArticleDialog] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<(typeof ARTICLES)[0] | null>(null)
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopic((prev) => (prev + 1) % TOPICS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-orange-50 to-white pt-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
              The News <br /> That
              <motion.span
                key={currentTopic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-orange-500 block"
              >
                {TOPICS[currentTopic]} Matters
              </motion.span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Curated journalism across technology, business, culture, science, and politics. Read deeper. Think faster.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <MagneticBtn
              onClick={() => setShowSubscribeDialog(true)}
              className="px-12 py-4 bg-orange-500 text-white text-lg font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              Subscribe Free
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Publication Tabs */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Featured Stories</h2>
          </Reveal>

          <Tabs defaultValue="Tech" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12 bg-white border border-gray-200">
              {["Tech", "Business", "Culture", "Science", "Politics"].map((topic) => (
                <TabsTrigger
                  key={topic}
                  value={topic}
                  className="font-semibold data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  {topic}
                </TabsTrigger>
              ))}
            </TabsList>

            {["Tech", "Business", "Culture", "Science", "Politics"].map((topic) => (
              <TabsContent key={topic} value={topic} className="mt-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {ARTICLES.filter((a) => a.topic === topic)
                    .slice(0, 4)
                    .map((article, i) => (
                      <Reveal key={article.id} delay={i * 0.1}>
                        <Card
                          className="group cursor-pointer hover:shadow-xl transition-shadow"
                          onClick={() => {
                            setSelectedArticle(article)
                            setShowArticleDialog(true)
                          }}
                        >
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-200">
                              <Image
                                src={article.img}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="p-6 space-y-4">
                              <div className="flex gap-2">
                                <Badge variant="secondary">{article.topic}</Badge>
                                <Badge variant="outline">{article.reading}</Badge>
                              </div>
                              <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-sm text-gray-500">By Atlas Media Editorial</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Reveal>
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Newsletter Showcase */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Our Newsletters</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWSLETTERS.map((nl, i) => (
              <Reveal key={nl.id} delay={i * 0.1}>
                <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-white">
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{nl.name}</h3>
                      <Badge className="bg-orange-500">{nl.subs} subscribers</Badge>
                    </div>
                    <p className="text-gray-600">{nl.desc}</p>
                    <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                      Subscribe
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Writer Spotlight */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Meet Our Writers</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {WRITERS.map((writer) => (
                <CarouselItem key={writer.id} className="basis-1/2 md:basis-1/4">
                  <Reveal>
                    <Card className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 space-y-4">
                        <Avatar className="w-20 h-20 mx-auto border-2 border-orange-500">
                          <AvatarImage src={writer.img} />
                          <AvatarFallback>{writer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">{writer.name}</h3>
                          <Badge variant="outline">{writer.beat}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: 2000000, suffix: "", label: "Global Readers" },
              { value: 50, suffix: "", label: "Active Newsletters" },
              { value: 8, suffix: " years", label: "Publishing" },
              { value: 4.8, suffix: "★", label: "Reader Rating" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-orange-100">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">What Readers Say</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {[
                { name: "Alexandra K.", quote: "Best journalism I've found. Sharp insights without the noise." },
                { name: "Michael S.", quote: "Finally a newsletter I actually read every morning." },
                { name: "Jessica P.", quote: "Deep-dive pieces that TV news can't touch." },
              ].map((testi, i) => (
                <CarouselItem key={i} className="basis-full md:basis-1/2">
                  <Reveal>
                    <Card className="bg-gradient-to-br from-gray-50 to-white">
                      <CardContent className="p-8 space-y-4">
                        <p className="text-xl italic text-gray-700">"{testi.quote}"</p>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{testi.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testi.name}</p>
                            <p className="text-sm text-gray-500">Atlas Subscriber</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-12">Advertise with Atlas</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="formats" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="font-semibold">Ad Formats & Pricing</AccordionTrigger>
              <AccordionContent className="space-y-2 text-gray-600">
                <p>Sponsored Articles: $15,000 | Native Ad Spots: $8,000 | Banner Placements: $5,000</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="audience" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="font-semibold">Audience Insights</AccordionTrigger>
              <AccordionContent className="space-y-2 text-gray-600">
                <p>2M+ engaged readers | 68% college-educated | 72% household income $100k+</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cases" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="font-semibold">Case Studies</AccordionTrigger>
              <AccordionContent className="space-y-2 text-gray-600">
                <p>TechCorp: 34% increase in brand awareness | FinanceX: 12K qualified leads</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-12">FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "Do I need an account?", a: "No, Atlas is free without an account. Create one to personalize your feed." },
              { q: "Can I gift a subscription?", a: "Yes, gift annual subscriptions to newsletter for $49." },
              { q: "Is RSS available?", a: "Full RSS feeds for all publications at atlas.media/rss" },
              { q: "How do I unsubscribe?", a: "Click 'Manage Preferences' in any newsletter or email support." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Article Dialog */}
      <Dialog open={showArticleDialog} onOpenChange={setShowArticleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-6">
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={selectedArticle.img}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Badge>{selectedArticle.topic}</Badge>
                <Badge variant="outline">{selectedArticle.reading}</Badge>
              </div>
              <p className="text-gray-600 leading-relaxed">
                This is a preview of the article. Read the full story by subscribing to Atlas Media. Our writers dive deep into the stories that matter most.
              </p>
              <MagneticBtn
                onClick={() => setShowSubscribeDialog(true)}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Subscribe to Read Full Article
              </MagneticBtn>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Subscribe Dialog */}
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Join 2M Readers</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-gray-600">Get daily news that matters delivered to your inbox. Free forever.</p>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <MagneticBtn className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Start Reading
            </MagneticBtn>
            <p className="text-xs text-gray-500 text-center">No spam. Unsubscribe anytime. Privacy policy.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
