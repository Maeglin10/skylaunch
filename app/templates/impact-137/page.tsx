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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Heart, Menu, X, Star, MapPin, Clock, Users, ChevronRight, Leaf } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const step = target / (duration / 16)
    const t = setInterval(() => setCount(c => { const next = c + step; if (next >= target) { clearInterval(t); return target; } return next; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`cursor-pointer transition-all duration-200 ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default function SolsticeYoga() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState("")
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8])

  const classes = {
    hatha: [
      { time: "08:00 AM", instructor: "Maya", level: "Beginner", spots: 5 },
      { time: "10:30 AM", instructor: "Dev", level: "Intermediate", spots: 2 },
      { time: "04:00 PM", instructor: "Priya", level: "Beginner", spots: 8 },
    ],
    vinyasa: [
      { time: "09:00 AM", instructor: "Arjun", level: "Advanced", spots: 1 },
      { time: "05:30 PM", instructor: "Aisha", level: "Intermediate", spots: 4 },
    ],
    yin: [
      { time: "07:00 PM", instructor: "Hari", level: "All", spots: 6 },
      { time: "06:00 AM", instructor: "Nala", level: "All", spots: 3 },
    ],
    restorative: [
      { time: "06:00 PM", instructor: "Sora", level: "All", spots: 8 },
      { time: "02:00 PM", instructor: "Kavi", level: "Beginner", spots: 5 },
    ],
    prenatal: [
      { time: "11:00 AM", instructor: "Devi", level: "Prenatal", spots: 4 },
      { time: "03:00 PM", instructor: "Sage", level: "Prenatal", spots: 3 },
    ],
  }

  const instructors = [
    { name: "Maya Patel", bio: "Founder & 200-hour RYT. Specializes in Hatha & breath work. 12 years experience.", certs: ["RYT-200", "Prenatal"] },
    { name: "Arjun Singh", bio: "Power Vinyasa specialist. Former athlete turned yoga guide. 8 years teaching.", certs: ["RYT-500", "Ashtanga"] },
    { name: "Aisha Noor", bio: "Flow & meditation coach. Creates transformative sequences. 10 years experience.", certs: ["RYT-200", "Yin"] },
    { name: "Dev Kumar", bio: "Alignment expert. Works with injuries & mobility. 15 years background.", certs: ["RYT-500", "Therapy"] },
  ]

  const retreats = [
    { name: "Weekend Escape", price: "€299", duration: "3 days", includes: ["5 classes", "2 meals daily", "Accommodation"] },
    { name: "Week Retreat", price: "€799", duration: "7 days", includes: ["15 classes", "Meals", "Spa", "Workshops"] },
    { name: "Month Immersion", price: "€1,999", duration: "30 days", includes: ["60+ classes", "Full board", "Mentoring", "Cert path"] },
  ]

  const studios = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555597673-b3292f5eba13?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506399773649-6f3ee62b8b21?q=80&w=400&auto=format&fit=crop",
  ]

  return (
    <div style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-gradient-to-b from-[#f5f0e6] to-[#f9f5ef] text-[#1a1a1a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* Mobile Nav */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button className="fixed top-6 left-6 z-50 md:hidden cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur p-2 rounded-lg hover:bg-white">
            <Menu className="w-6 h-6 text-[#1a1a1a]" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#f5f0e6] border-[#c2714f]/20">
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="#classes" className="text-lg font-semibold text-[#c2714f] cursor-pointer hover:text-[#5c7a5e] transition-colors">Classes</Link>
            <Link href="#instructors" className="text-lg font-semibold text-[#c2714f] cursor-pointer hover:text-[#5c7a5e] transition-colors">Instructors</Link>
            <Link href="#retreats" className="text-lg font-semibold text-[#c2714f] cursor-pointer hover:text-[#5c7a5e] transition-colors">Retreats</Link>
            <Link href="#faq" className="text-lg font-semibold text-[#c2714f] cursor-pointer hover:text-[#5c7a5e] transition-colors">FAQ</Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero with Parallax */}
      <motion.section style={{ opacity: headerOpacity }} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop" alt="Yoga Studio" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">Solstice</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">Premium Yoga Studio & Wellness Sanctuary</p>
            <MagneticBtn className="px-8 py-4 bg-[#c2714f] text-white rounded-full font-semibold hover:bg-[#a8593d] shadow-lg">Join Our Studio</MagneticBtn>
          </motion.div>
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute w-8 h-8 opacity-20" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}>
            <Leaf className="w-8 h-8 text-[#5c7a5e]" />
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 360] }} transition={{ duration: 6 + i, repeat: Infinity }} />
          </motion.div>
        ))}
      </motion.section>

      {/* Classes Section */}
      <section id="classes" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-4">Class Schedule</h2>
          <p className="text-lg text-[#666] mb-12">Find the perfect class for your practice</p>
        </Reveal>

        <Tabs defaultValue="hatha" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border border-[#c2714f]/20 rounded-xl p-1">
            <TabsTrigger value="hatha" className="cursor-pointer">Hatha</TabsTrigger>
            <TabsTrigger value="vinyasa" className="cursor-pointer">Vinyasa</TabsTrigger>
            <TabsTrigger value="yin" className="cursor-pointer">Yin</TabsTrigger>
            <TabsTrigger value="restorative" className="cursor-pointer">Restorative</TabsTrigger>
            <TabsTrigger value="prenatal" className="cursor-pointer">Prenatal</TabsTrigger>
          </TabsList>

          {Object.entries(classes).map(([key, slots]) => (
            <TabsContent key={key} value={key} className="mt-8 space-y-4">
              {slots.map((slot, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <Card className="bg-white border-[#c2714f]/20 hover:shadow-lg cursor-pointer transition-all duration-200 overflow-hidden">
                    <CardContent className="p-6 flex justify-between items-center">
                      <div className="flex items-center gap-6">
                        <Clock className="w-5 h-5 text-[#c2714f]" />
                        <div>
                          <p className="font-semibold text-[#1a1a1a]">{slot.time}</p>
                          <p className="text-sm text-[#666]">with {slot.instructor}</p>
                        </div>
                        <Badge variant="outline" className="border-[#5c7a5e] text-[#5c7a5e]">{slot.level}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#5c7a5e]">{slot.spots} spots</p>
                        <button onClick={() => { setSelectedClass(slot.time); setDialogOpen(true); }} className="mt-2 px-4 py-2 bg-[#c2714f] text-white rounded-full text-sm hover:bg-[#a8593d] transition-all duration-200">Book</button>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Instructors */}
      <section id="instructors" className="py-20 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl my-12">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12">Our Instructors</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-gradient-to-br from-white to-[#f9f5ef] border-[#c2714f]/20 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-[#c2714f]">
                    <AvatarFallback className="bg-[#c2714f] text-white text-lg">{inst.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-[#1a1a1a] mb-2">{inst.name}</h3>
                  <p className="text-sm text-[#666] mb-4 line-clamp-3">{inst.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {inst.certs.map((cert, i) => (
                      <Badge key={i} variant="secondary" className="bg-[#5c7a5e]/20 text-[#5c7a5e] text-xs">{cert}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Retreat Packages */}
      <section id="retreats" className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12">Retreat Packages</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {retreats.map((retreat, idx) => (
            <Reveal key={idx} delay={idx * 0.15}>
              <Card className="bg-white border-[#c2714f]/20 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c2714f] to-[#5c7a5e]" />
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{retreat.name}</h3>
                  <p className="text-4xl font-bold text-[#c2714f] mb-1">{retreat.price}</p>
                  <p className="text-sm text-[#666] mb-6">{retreat.duration}</p>
                  <ul className="space-y-2 mb-8">
                    {retreat.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#666]">
                        <ChevronRight className="w-4 h-4 text-[#5c7a5e]" /> {inc}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-[#c2714f] text-white rounded-full font-semibold hover:bg-[#a8593d] transition-all duration-200">Book Retreat</button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: 5000, suffix: "+", label: "Students Served" },
            { num: 12, label: "Certified Instructors" },
            { num: 8, label: "Years in Practice" },
            { num: 4.9, suffix: "★", label: "Average Rating" },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div>
                <p className="text-5xl font-bold text-[#c2714f] mb-2"><Counter target={stat.num} suffix={stat.suffix || ""} /></p>
                <p className="text-[#666]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Studio Photos */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12">Studio Space</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studios.map((photo, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group">
                <Image src={photo} alt={`Studio ${idx + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12">What Students Say</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah M.", class: "Vinyasa", text: "Transformed my practice in just 3 months. The instructors truly understand alignment.", rating: 5 },
            { name: "James P.", class: "Hatha", text: "Best yoga experience I've had. The serene atmosphere is unmatched.", rating: 5 },
            { name: "Elena L.", class: "Prenatal", text: "Perfect preparation for motherhood. The prenatal classes are exceptional.", rating: 5 },
          ].map((test, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="bg-white border-[#c2714f]/20 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c2714f] text-[#c2714f]" />
                    ))}
                  </div>
                  <p className="text-[#666] mb-4">"{test.text}"</p>
                  <div className="border-t border-[#c2714f]/10 pt-4">
                    <p className="font-semibold text-[#1a1a1a]">{test.name}</p>
                    <Badge variant="outline" className="border-[#5c7a5e] text-[#5c7a5e] text-xs mt-2">{test.class}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-12">Philosophy & FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { title: "The 8 Limbs of Yoga", desc: "Yoga isn't just physical postures. It encompasses ethical principles, breathing techniques, meditation, and philosophy. Our classes integrate all dimensions." },
            { title: "Ayurveda & Wellness", desc: "We blend traditional Ayurvedic wisdom with modern yoga science to create personalized wellness plans for each student." },
            { title: "Breathwork (Pranayama)", desc: "Breath is life energy. Our instructors teach specific techniques to calm the mind, energize the body, and balance your nervous system." },
            { title: "Meditation Practice", desc: "Starting with just 5 minutes daily, meditation builds mental clarity and emotional resilience. We guide beginners through every step." },
            { title: "For Beginners", desc: "Absolutely. We have beginner-specific classes that meet you exactly where you are. No yoga experience necessary." },
            { title: "Props & Modifications", desc: "Props aren't crutches—they're tools. We provide mats, blocks, straps, and blankets. Every pose can be modified for your needs." },
            { title: "Dress Code", desc: "Comfortable, breathable clothing. Avoid tight restrictive wear. Go barefoot or wear socks. We provide yoga mats." },
            { title: "Private Sessions", desc: "Yes! One-on-one coaching available for personalized attention and faster progress. Contact us for rates." },
          ].map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border border-[#c2714f]/20 rounded-lg px-6">
              <AccordionTrigger className="text-[#1a1a1a] font-semibold cursor-pointer hover:text-[#c2714f] transition-colors">{faq.title}</AccordionTrigger>
              <AccordionContent className="text-[#666]">{faq.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Newsletter & CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#c2714f] to-[#5c7a5e] rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8 opacity-90">Get wellness tips, class updates, and exclusive retreat offers directly to your inbox.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 px-6 py-3 rounded-full text-[#1a1a1a] focus:outline-none" />
              <MagneticBtn className="px-8 py-3 bg-white text-[#c2714f] rounded-full font-semibold hover:bg-[#f5f0e6] shadow-lg">Subscribe</MagneticBtn>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Booking Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-[#c2714f]/20">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a1a]">Book Class: {selectedClass}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input type="text" placeholder="Your name" className="w-full px-4 py-2 border border-[#c2714f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2714f]" />
            <input type="email" placeholder="Your email" className="w-full px-4 py-2 border border-[#c2714f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2714f]" />
            <input type="tel" placeholder="Phone number" className="w-full px-4 py-2 border border-[#c2714f]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2714f]" />
            <button className="w-full py-3 bg-[#c2714f] text-white rounded-full font-semibold hover:bg-[#a8593d] transition-all duration-200">Confirm Booking</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">Solstice Yoga Studio © 2024</p>
          <p className="text-sm text-[#999]">Creating sacred space for transformation | Located in your city</p>
        </div>
      </footer>
    </div>
  )
}
