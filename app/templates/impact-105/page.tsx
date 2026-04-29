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
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>
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
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 })
  const sy = useSpring(y, { stiffness: 500, damping: 25 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={className}>{children}</motion.button>
}

function PulsingVital() {
  return (
    <motion.div
      className="w-4 h-4 rounded-full"
      style={{ background: "#0284c7" }}
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  )
}

const SPECIALTIES = [
  { name: "Primary Care", icon: "🏥", description: "General health, preventive care, chronic management" },
  { name: "Mental Health", icon: "🧠", description: "Therapy, counseling, stress management" },
  { name: "Dermatology", icon: "💆", description: "Skin conditions, acne, anti-aging consultation" },
  { name: "Nutrition", icon: "🥗", description: "Diet planning, metabolic health, supplements" },
  { name: "Pediatrics", icon: "👶", description: "Child health, development, vaccinations" },
]

const DOCTORS = [
  { name: "Dr. Sarah Chen", specialty: "Primary Care", rating: 4.9, image: "https://i.pravatar.cc/150?img=13", credentials: "MD, Board Certified" },
  { name: "Dr. James Wilson", specialty: "Mental Health", rating: 4.8, image: "https://i.pravatar.cc/150?img=14", credentials: "PhD Psychology" },
  { name: "Dr. Lisa Rodriguez", specialty: "Dermatology", rating: 5.0, image: "https://i.pravatar.cc/150?img=15", credentials: "MD Dermatology" },
  { name: "Dr. Ahmed Patel", specialty: "Nutrition", rating: 4.7, image: "https://i.pravatar.cc/150?img=16", credentials: "RD, CNS" },
]

const INSURANCE = [
  { name: "United Healthcare", status: "Accepted" },
  { name: "Blue Cross Blue Shield", status: "Accepted" },
  { name: "Aetna", status: "Accepted" },
  { name: "Self-pay", status: "$50 flat fee" },
]

export default function HelioHealthPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(0)
  const [isDoctorOpen, setIsDoctorOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      {/* Hero with Pulsing Vitals */}
      <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)" }}>
        <motion.div className="absolute top-20 right-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <PulsingVital />
            <span style={{ color: "#0284c7", fontSize: "0.875rem" }}>Vitals: Optimal</span>
          </div>
        </motion.div>

        <motion.div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-8xl font-light mb-4" style={{ color: "#0f172a", fontFamily: "Georgia, serif" }}>HELIO HEALTH</h1>
            <p className="text-xl" style={{ color: "#0284c7" }}>Telemedicine • 24/7 Care • Board-Certified Doctors</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Specialties Tabs with Doctor Cards */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8fafc" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-16" style={{ color: "#0f172a" }}>Our Specialties</h2>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-12" style={{ background: "transparent" }}>
                {SPECIALTIES.map((s, idx) => (
                  <TabsTrigger key={idx} value={`${idx}`} style={{ color: "#0284c7" }}>
                    {s.icon} {s.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {SPECIALTIES.map((specialty, idx) => (
                <TabsContent key={idx} value={`${idx}`}>
                  <div className="mb-12">
                    <p className="text-lg mb-8" style={{ color: "#16a34a" }}>{specialty.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {DOCTORS.slice(0, 2).map((d, i) => (
                        <motion.div
                          key={i}
                          className="p-8 rounded-lg cursor-pointer group"
                          style={{ background: "#e0f2fe", border: "1px solid #0284c7" }}
                          onClick={() => {
                            setSelectedDoctor(i)
                            setIsDoctorOpen(true)
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={d.image} />
                              <AvatarFallback>{d.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-light text-lg" style={{ color: "#0f172a" }}>{d.name}</p>
                              <Badge style={{ background: "#0284c7", color: "white" }}>{d.credentials}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span style={{ color: "#16a34a" }}>★ {d.rating}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Reveal>
      </section>

      {/* Doctor Dialog */}
      <Dialog open={isDoctorOpen} onOpenChange={setIsDoctorOpen}>
        <DialogContent className="max-w-2xl" style={{ background: "#f8fafc" }}>
          <DialogHeader>
            <DialogTitle className="text-3xl font-light">{DOCTORS[selectedDoctor].name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={DOCTORS[selectedDoctor].image} />
                <AvatarFallback>{DOCTORS[selectedDoctor].name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Badge style={{ background: "#0284c7", color: "white" }} className="mb-2">{DOCTORS[selectedDoctor].credentials}</Badge>
                <p className="text-lg font-light mb-2">{DOCTORS[selectedDoctor].specialty}</p>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#16a34a" }}>★ {DOCTORS[selectedDoctor].rating} avg rating</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Availability</p>
              <p className="font-light">Monday - Friday: 9 AM - 6 PM</p>
              <p className="font-light">Saturday: 10 AM - 2 PM</p>
            </div>
            <button className="w-full py-3 text-white font-light" style={{ background: "#0284c7" }}>Schedule Appointment</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* How It Works */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#e0f2fe" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-light mb-16" style={{ color: "#0f172a" }}>How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "1", title: "Book", description: "Select your doctor, date, and time within minutes" },
                { step: "2", title: "Connect", description: "Join video call from home, work, or anywhere" },
                { step: "3", title: "Get Care", description: "Receive diagnosis, prescriptions, and follow-up" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-light mb-4" style={{ color: "#0284c7" }}>{item.step}</div>
                  <h3 className="text-2xl font-light mb-2" style={{ color: "#0f172a" }}>{item.title}</h3>
                  <p style={{ color: "#64748b" }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#0284c7" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
              <div><div className="text-5xl font-light mb-2"><Counter target={50000} suffix="K" /></div><p className="text-sm opacity-80">Patients Served</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={500} /></div><p className="text-sm opacity-80">Doctors</p></div>
              <div><div className="text-5xl font-light mb-2">24/7</div><p className="text-sm opacity-80">Availability</p></div>
              <div><div className="text-5xl font-light mb-2"><Counter target={49} suffix="/10" /></div><p className="text-sm opacity-80">Avg Rating</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Insurance */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8fafc" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#0f172a" }}>Insurance & Pricing</h2>
            <Accordion type="single" collapsible>
              {INSURANCE.map((ins, idx) => (
                <AccordionItem key={idx} value={`ins-${idx}`} style={{ borderColor: "#0284c7" }}>
                  <AccordionTrigger style={{ color: "#0f172a" }}>{ins.name}</AccordionTrigger>
                  <AccordionContent style={{ color: "#0284c7" }}>{ins.status}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* Security & Trust */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#e0f2fe" }}>
        <Reveal>
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#0f172a" }}>Trust & Security</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {["HIPAA Compliant", "End-to-End Encrypted", "SSL Secure", "FDA Approved", "CLIA Certified", "24/7 Support"].map((item, idx) => (
                <Badge key={idx} style={{ background: "#16a34a", color: "white", padding: "1rem" }} className="text-center justify-center">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8fafc" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12 text-center" style={{ color: "#0f172a" }}>Patient Testimonials</h2>
            <Carousel>
              <CarouselContent>
                {[
                  { text: "Incredibly convenient. No more waiting rooms, just quality care.", author: "Jennifer M." },
                  { text: "The doctors are thorough and compassionate. Highly recommend.", author: "Robert K." },
                ].map((t, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-12 rounded-lg text-center" style={{ background: "#e0f2fe" }}>
                      <p className="text-xl italic mb-6" style={{ color: "#0284c7" }}>"{t.text}"</p>
                      <p className="font-light" style={{ color: "#0f172a" }}>— {t.author}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 md:px-20" style={{ background: "#f8fafc" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light mb-12" style={{ color: "#0f172a" }}>FAQ</h2>
            <Accordion type="single" collapsible>
              {[
                { q: "Is telemedicine as effective as in-person visits?", a: "Yes, for most conditions. Video consultations allow thorough assessment and treatment." },
                { q: "How are prescriptions handled?", a: "Prescriptions are sent directly to your pharmacy for pickup or delivery." },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger style={{ color: "#0f172a" }}>{item.q}</AccordionTrigger>
                  <AccordionContent style={{ color: "#0284c7" }}>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-20 text-center" style={{ background: "#0284c7" }}>
        <Reveal>
          <h2 className="text-5xl font-light text-white mb-8">Start Your Consultation Today</h2>
          <Dialog>
            <MagneticBtn className="px-12 py-4 bg-white text-center font-light" style={{ color: "#0284c7" }}>
              Book Appointment
            </MagneticBtn>
            <DialogContent style={{ background: "#f8fafc" }}>
              <DialogHeader>
                <DialogTitle>Schedule Your Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full p-3 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                <select className="w-full p-3 border rounded">
                  <option>Select Specialty</option>
                  {SPECIALTIES.map(s => <option key={s.name}>{s.name}</option>)}
                </select>
                <button className="w-full py-3 text-white font-light" style={{ background: "#0284c7" }}>Continue Booking</button>
              </div>
            </DialogContent>
          </Dialog>
        </Reveal>
      </section>
    </div>
  )
}
