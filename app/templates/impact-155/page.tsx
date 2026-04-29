"use client"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Heart, Users } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>{children}</motion.div>
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 90
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
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
    x.set((e.clientX - r.left - r.width/2) * 0.3)
    y.set((e.clientY - r.top - r.height/2) * 0.3)
  }
  return <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} className={`cursor-pointer ${className}`}>{children}</motion.button>
}

const doctors = [
  { name: "Dr. Sarah Mitchell", specialty: "Fertility Specialist", hospital: "Columbia Medical", book: true, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. James Chen", specialty: "OB/GYN", hospital: "Mt. Sinai", book: true, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. Maria Gonzalez", specialty: "Prenatal Care", hospital: "NYU Langone", book: true, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. Lisa Wang", specialty: "Menopausal Health", hospital: "Cornell Medical", book: true, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
]

export default function MiraHealth() {
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }} className="min-h-screen bg-[#fdf8f0] text-[#2d2d2d] font-sans">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=2000" alt="hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdf8f0] via-transparent to-[#fdf8f0]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-8xl font-black tracking-tight mb-6 text-[#9b2335]">
            Mira Health
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-2xl text-[#2d2d2d]/60 max-w-2xl mx-auto mb-12">
            Women's health & fertility care that listens
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setOpen(true)} className="px-8 py-4 bg-[#9b2335] text-white font-bold cursor-pointer hover:bg-[#2d2d2d] hover:text-[#9b2335] transition-all duration-200">
            Schedule Appointment
          </motion.button>
        </div>
      </section>

      {/* CARE PATHWAY */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Our Care Services</h2>
        </Reveal>

        <Tabs defaultValue="fertility" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-12 bg-transparent">
            <TabsTrigger value="fertility" className="cursor-pointer">Fertility</TabsTrigger>
            <TabsTrigger value="gynecology" className="cursor-pointer">Gynecology</TabsTrigger>
            <TabsTrigger value="prenatal" className="cursor-pointer">Prenatal</TabsTrigger>
            <TabsTrigger value="postpartum" className="cursor-pointer">Postpartum</TabsTrigger>
            <TabsTrigger value="menopause" className="cursor-pointer">Menopause</TabsTrigger>
          </TabsList>

          {[
            { value: "fertility", services: ["Fertility Testing", "IVF Treatment", "Egg Freezing", "Male Factor Evaluation"] },
            { value: "gynecology", services: ["Annual Exams", "Contraception", "Pap Smears", "Hormonal Management"] },
            { value: "prenatal", services: ["Obstetric Care", "Ultrasounds", "Genetic Testing", "Nutrition Counseling"] },
            { value: "postpartum", services: ["Postpartum Check-ups", "Lactation Support", "Mental Health Screening", "Recovery Care"] },
            { value: "menopause", services: ["Hormone Therapy", "Symptom Management", "Bone Health", "Wellness Support"] }
          ].map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tab.services.map((service, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <Card className="bg-white border-[#fde8e8]/50 hover:border-[#9b2335]/50 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-3">{service}</h3>
                        <div className="flex gap-2">
                          <Badge className="bg-[#6b8f71] text-white cursor-pointer text-xs">In-Person</Badge>
                          <Badge className="bg-[#9b2335] text-white cursor-pointer text-xs">Telehealth</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* DOCTOR TEAM */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Our Physicians</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="text-center hover:scale-105 transition-transform duration-300">
                <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-[#9b2335]">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold mb-1">{doctor.name}</h3>
                <Badge variant="outline" className="mb-3 cursor-pointer">{doctor.specialty}</Badge>
                <div className="text-xs text-[#2d2d2d]/60 mb-4">
                  <p>{doctor.hospital}</p>
                </div>
                <button onClick={() => { setSelectedDoctor(doctor); setOpen(true); }} className="text-[#9b2335] font-bold text-sm cursor-pointer hover:text-[#2d2d2d] transition-colors">
                  Book Appointment →
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PATIENT JOURNEY */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Your Journey With Us</h2>
        </Reveal>
        <div className="space-y-6">
          {[
            { step: 1, title: "Initial Consultation", desc: "Meet with our physicians to discuss your health goals" },
            { step: 2, title: "Comprehensive Testing", desc: "Personalized diagnostic testing and health assessment" },
            { step: 3, title: "Treatment Plan", desc: "Customized care plan tailored to your needs" },
            { step: 4, title: "Ongoing Support", desc: "Continuous monitoring and wellness support" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#9b2335] text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-[#2d2d2d]/60">{item.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#9b2335] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Reveal><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={10000} />+</div><p className="text-sm opacity-60">Patients Served</p></div></Reveal>
          <Reveal delay={0.1}><div><div className="text-4xl md:text-5xl font-black mb-2"><Counter target={15} /></div><p className="text-sm opacity-60">Board-Certified Physicians</p></div></Reveal>
          <Reveal delay={0.2}><div><div className="text-4xl md:text-5xl font-black mb-2">4.9<span className="text-2xl">★</span></div><p className="text-sm opacity-60">Patient Rating</p></div></Reveal>
          <Reveal delay={0.3}><div><div className="text-4xl md:text-5xl font-black mb-2">98<span className="text-2xl">%</span></div><p className="text-sm opacity-60">Recommendation</p></div></Reveal>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">What to Expect</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { title: "First Visit", description: "Comprehensive health history, physical exam, and personalized consultation (60-90 minutes)" },
            { title: "Testing", description: "Blood work, imaging, or specialized testing based on your needs. Results typically within 3-5 business days" },
            { title: "Treatment Plans", description: "Detailed discussion of options, timelines, costs, and next steps tailored to your goals" },
            { title: "Ongoing Care", description: "Regular follow-ups, monitoring, and adjustments to ensure optimal outcomes" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`item-${i}`} className="border-b border-[#2d2d2d]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#9b2335] transition-colors">{item.title}</AccordionTrigger>
                <AccordionContent className="text-[#2d2d2d]/60 py-4">{item.description}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* INSURANCE & BILLING */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">Insurance & Billing</h2>
        </Reveal>
        <div className="mb-12">
          <h3 className="font-bold mb-6 text-lg">We Accept</h3>
          <div className="flex flex-wrap gap-4">
            {["Aetna", "Blue Cross", "Cigna", "Empire", "Medicaid", "Medicare"].map((ins, i) => (
              <Badge key={i} className="bg-[#fde8e8] text-[#9b2335] cursor-pointer">{ins}</Badge>
            ))}
          </div>
        </div>
        <Accordion type="single" collapsible>
          {[
            { title: "Insurance Coverage", description: "Most preventive care, fertility treatments, and office visits are covered. Verify your plan for specifics." },
            { title: "FSA/HSA", description: "We accept FSA and HSA cards for eligible expenses. Ask our billing team for details." },
            { title: "Payment Plans", description: "Flexible payment plans available for out-of-pocket costs. We work with you on affordability." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`billing-${i}`} className="border-b border-[#2d2d2d]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#9b2335] transition-colors">{item.title}</AccordionTrigger>
                <AccordionContent className="text-[#2d2d2d]/60 py-4">{item.description}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#fdf8f0]">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">Patient Stories</h2>
        </Reveal>
        <div className="max-w-4xl mx-auto">
          <Carousel>
            <CarouselContent>
              {[
                { text: "The team at Mira Health made my fertility journey manageable and hopeful. I'm now a proud mother of twins!", author: "Jennifer M." },
                { text: "Compassionate care with cutting-edge medicine. Every question was answered. Thank you, Mira!", author: "Amanda T." },
                { text: "Best gynecology experience I've had. They genuinely listen and care about your health.", author: "Rachel K." }
              ].map((testimonial, i) => (
                <CarouselItem key={i} className="md:basis-full">
                  <Card className="bg-white border-[#fde8e8]/50">
                    <CardContent className="p-8 text-center">
                      <p className="text-lg mb-6 italic text-[#2d2d2d]/60">"{testimonial.text}"</p>
                      <p className="font-bold text-[#9b2335]">{testimonial.author}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-12">FAQ</h2>
        </Reveal>
        <Accordion type="single" collapsible>
          {[
            { q: "Do you offer telehealth appointments?", a: "Yes, telehealth is available for consultations, follow-ups, and certain procedures." },
            { q: "Do I need a referral?", a: "No referral needed to schedule an appointment. Many insurance plans don't require one." },
            { q: "What are your office hours?", a: "Monday-Friday 8am-6pm, Saturday 9am-2pm. After-hours urgent care available." },
            { q: "Can international patients be treated?", a: "Yes, we welcome international patients. We can arrange remote consultations initially." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <AccordionItem value={`faq-${i}`} className="border-b border-[#2d2d2d]/10">
                <AccordionTrigger className="cursor-pointer py-4 hover:text-[#9b2335] transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-[#2d2d2d]/60 py-4">{item.a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </section>

      {/* APPOINTMENT DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule Your Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedDoctor && (
              <div className="bg-[#fde8e8] p-4 rounded">
                <p className="text-sm opacity-60 mb-2">Selected Physician</p>
                <p className="font-bold">{selectedDoctor.name}</p>
                <p className="text-sm text-[#2d2d2d]/60">{selectedDoctor.specialty}</p>
              </div>
            )}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-2">Preferred Service</label>
                <select className="w-full border border-[#2d2d2d]/20 p-2 rounded cursor-pointer">
                  <option>Select a service...</option>
                  <option>Initial Consultation</option>
                  <option>Follow-up Visit</option>
                  <option>Testing</option>
                  <option>Telehealth</option>
                </select>
              </div>
            </div>
            <MagneticBtn className="w-full px-6 py-3 bg-[#9b2335] text-white font-bold hover:bg-[#2d2d2d] transition-all duration-300">
              Continue Booking
            </MagneticBtn>
          </div>
        </DialogContent>
      </Dialog>

      {/* FOOTER CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#9b2335] text-white text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Your health journey starts here</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Compassionate, expert care tailored to your unique needs</p>
          <MagneticBtn className="px-8 py-4 bg-white text-[#9b2335] font-bold cursor-pointer hover:bg-[#2d2d2d] hover:text-white transition-all duration-200">
            Book Your Appointment Today
          </MagneticBtn>
        </Reveal>
      </section>
    </div>
  )
}