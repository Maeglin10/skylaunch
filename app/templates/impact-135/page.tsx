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
import { Gamepad2, Star } from "lucide-react"

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

const GAMES = [
  { id: 1, title: "Void Runners", genre: "Action-RPG", platform: "PC/Console", rating: 9.1, img: "https://images.unsplash.com/photo-1538481143235-5d63c50f1ead?q=80&w=500" },
  { id: 2, title: "Neon Cipher", genre: "Cyberpunk", platform: "Mobile", rating: 8.7, img: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=500" },
  { id: 3, title: "Lost Echoes", genre: "Adventure", platform: "PC/VR", rating: 9.3, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500" },
  { id: 4, title: "Synthesis", genre: "Puzzle", platform: "Web", rating: 8.4, img: "https://images.unsplash.com/photo-1489599849228-13e203deeb60?q=80&w=500" },
  { id: 5, title: "Ember War", genre: "Strategy", platform: "Console", rating: 8.9, img: "https://images.unsplash.com/photo-1575259741184-5a91247f020b?q=80&w=500" },
  { id: 6, title: "Whispered Paths", genre: "Narrative", platform: "All", rating: 9.2, img: "https://images.unsplash.com/photo-1578482767083-f5f9d649e5e1?q=80&w=500" },
]

const SERVICES = [
  { title: "Full Development", desc: "End-to-end game creation from concept to launch" },
  { title: "Co-Development", desc: "Partnership on specific features or content" },
  { title: "QA & Testing", desc: "Rigorous quality assurance and bug fixing" },
  { title: "Porting & Optimization", desc: "Platform adaptation and performance tuning" },
]

const TECH_STACK = ["Unity", "Unreal", "Godot", "C++", "C#", "WebGL", "Multiplayer", "AI"]

const TEAM = [
  { id: 1, name: "Emma Chen", role: "Art Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
  { id: 2, name: "Marcus Brown", role: "Lead Programmer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
  { id: 3, name: "Lisa Rodriguez", role: "Game Designer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" },
  { id: 4, name: "James Park", role: "Audio Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" },
  { id: 5, name: "Sophie Martin", role: "QA Lead", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" },
  { id: 6, name: "David Kumar", role: "Project Manager", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
]

export default function NovaStudiosLanding() {
  const [selectedGame, setSelectedGame] = useState<(typeof GAMES)[0] | null>(null)
  const [showGameDialog, setShowGameDialog] = useState(false)
  const [showInquiryDialog, setShowInquiryDialog] = useState(false)

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-500 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-546819?w=800&q=80"
            alt="Game development"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 space-y-8">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Games That<br />Define Eras
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              25+ award-winning titles. 50M+ players worldwide. Full development, co-dev, QA, and porting for every platform.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <MagneticBtn
              onClick={() => setShowInquiryDialog(true)}
              className="px-12 py-4 bg-gradient-to-r from-violet-600 to-green-600 text-white text-lg font-semibold rounded-lg hover:from-violet-500 hover:to-green-500 transition-all"
            >
              Start Your Project
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* Game Portfolio */}
      <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Game Portfolio</h2>
          </Reveal>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12 bg-gray-900 border border-gray-800">
              {["All", "PC", "Console", "Mobile", "VR"].map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat.toLowerCase()}
                  className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-green-600"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {GAMES.map((game, i) => (
                  <Reveal key={game.id} delay={i * 0.1}>
                    <Card
                      className="group cursor-pointer hover:shadow-2xl transition-all border-gray-800 bg-gray-900/50 hover:bg-gray-900 overflow-hidden"
                      onClick={() => {
                        setSelectedGame(game)
                        setShowGameDialog(true)
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden bg-gray-800">
                          <Image
                            src={game.img}
                            alt={game.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex gap-2">
                            <Badge className="bg-violet-600">{game.genre}</Badge>
                            <Badge variant="outline" className="border-gray-700">{game.platform}</Badge>
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">
                            {game.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-bold">{game.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </motion.div>
            </TabsContent>

            {["pc", "console", "mobile", "vr"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-12">
                <p className="text-center text-gray-500 py-12">Filtering by platform...</p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Studio Services */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Studio Services</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <Card className="hover:shadow-lg transition-shadow border-gray-800 bg-gradient-to-br from-violet-900/20 to-green-900/20 hover:from-violet-900/40 hover:to-green-900/40">
                  <CardContent className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-green-400">{service.title}</h3>
                    <p className="text-gray-300">{service.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-900/5 to-black">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Tech Stack</h2>
          </Reveal>

          <div className="flex flex-wrap gap-4 justify-center">
            {TECH_STACK.map((tech, i) => (
              <Reveal key={tech} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-green-600 rounded-full font-semibold text-white cursor-pointer hover:shadow-lg transition-shadow"
                >
                  {tech}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-gradient-to-r from-violet-900 to-green-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: 25, suffix: "", label: "Games Released" },
              { value: 12, suffix: " years", label: "Studio Founded" },
              { value: 50000000, suffix: "+", label: "Players Worldwide" },
              { value: 15, suffix: "", label: "Award Wins" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-white">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-green-100">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Our Team</h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {TEAM.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.08}>
                <Card className="text-center hover:shadow-lg transition-shadow border-gray-800 bg-gray-900/50 hover:bg-gray-900">
                  <CardContent className="p-4 space-y-3">
                    <Avatar className="w-16 h-16 mx-auto border-2 border-green-500">
                      <AvatarImage src={member.img} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-sm">{member.name}</h3>
                      <Badge variant="outline" className="border-green-600 text-green-400 text-xs">{member.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-16">Client Stories</h2>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {[
                { company: "PixelWorks Inc", quote: "Nova took our vision and made it reality. Professional, creative, on budget." },
                { company: "Global Games Ltd", quote: "Best co-dev partner we've had. Delivered quality code ahead of schedule." },
                { company: "Indie Studios UA", quote: "Ported our game to 5 platforms flawlessly. Highly recommended." },
              ].map((testi, i) => (
                <CarouselItem key={i} className="basis-full md:basis-1/2">
                  <Reveal>
                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-8 space-y-4">
                        <p className="text-lg italic text-gray-300">"{testi.quote}"</p>
                        <p className="font-semibold text-green-400">{testi.company}</p>
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

      {/* FAQ */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold mb-12">FAQ</h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "How long does development take?", a: "Depends on scope. Small projects 3-6 months, AAA titles 2-3 years." },
              { q: "Do you retain IP?", a: "No. You own 100% of your game. We're a service provider." },
              { q: "What's your budget flexibility?", a: "We work with all budgets. From indie to enterprise-scale projects." },
              { q: "Do you handle publishing?", a: "We advise on publishing strategies and can facilitate connections." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-800 rounded-lg px-6">
                <AccordionTrigger className="font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Game Dialog */}
      <Dialog open={showGameDialog} onOpenChange={setShowGameDialog}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{selectedGame?.title}</DialogTitle>
          </DialogHeader>
          {selectedGame && (
            <div className="space-y-6">
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-800">
                <Image
                  src={selectedGame.img}
                  alt={selectedGame.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Badge className="bg-violet-600">{selectedGame.genre}</Badge>
                <Badge variant="outline" className="border-gray-700">{selectedGame.platform}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-bold">{selectedGame.rating}</span>
              </div>
              <p className="text-gray-300">
                A groundbreaking title that pushed the boundaries of game design. Featuring cutting-edge graphics, immersive storytelling, and innovative gameplay mechanics.
              </p>
              <MagneticBtn className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-green-600 text-white rounded-lg hover:from-violet-500 hover:to-green-500 transition-all font-semibold">
                View Game Details
              </MagneticBtn>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Inquiry Dialog */}
      <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
        <DialogContent className="max-w-md bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Start Your Game Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Project name"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Select service</option>
              {SERVICES.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Tell us about your project"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
            />
            <MagneticBtn className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-green-600 text-white rounded-lg hover:from-violet-500 hover:to-green-500 transition-all font-semibold">
              Submit Inquiry
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
