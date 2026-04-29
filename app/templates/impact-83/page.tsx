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
import { X, Menu, ChevronDown, ArrowRight, Zap, Battery, Gauge } from "lucide-react"

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

const specs = [
  { label: "Range", value: 500, max: 600, unit: "km", icon: Zap },
  { label: "0-100 km/h", value: 3.2, max: 5, unit: "s", icon: Gauge },
  { label: "Battery Capacity", value: 85, max: 100, unit: "kWh", icon: Battery },
]

const models = [
  { id: "s", name: "VOLTA S", price: "$45K", range: "400 km", accel: "4.2s", seats: 5, warranty: "5 years" },
  { id: "x", name: "VOLTA X", price: "$65K", range: "500 km", accel: "3.2s", seats: 5, warranty: "8 years" },
  { id: "gt", name: "VOLTA GT", price: "$89K", range: "600 km", accel: "2.8s", seats: 4, warranty: "10 years" },
]

const faqs = [
  { q: "How does range anxiety work with 500km?", a: "Real-world range is 450–550km depending on conditions. You can drive 5+ hours without charging. Most owners charge overnight at home." },
  { q: "What's the charging infrastructure like?", a: "850+ Volta Fast Charge stations across North America. 10% charge in 15 min, 80% in 45 min. Home charging adds 80km in 2 hours." },
  { q: "Are batteries covered under warranty?", a: "Full 8–10 year battery warranty depending on model. Covers degradation, defects, and replacement." },
  { q: "How do I pre-order?", a: "Secure your reservation with $5,000 deposit on our platform. Full payment due 30 days before delivery. Financing available." },
]

export default function VoltaMotors() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("x")
  const [showPreorderModal, setShowPreorderModal] = useState(false)
  const [chargeLevel, setChargeLevel] = useState(80)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  const rangeAtCharge = Math.round((chargeLevel / 100) * 500)

  return (
    <div style={{ backgroundColor: "#050c0a", color: "#ffffff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(5,12,10,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #00d97e30" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#00d97e", letterSpacing: "-0.02em" }}>VOLTA</h1>
          <div style={{ display: "none", gap: "2.5rem" }} className="md:flex">
            {["Models", "Technology", "Charging", "Order"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#ffffff", opacity: 0.7, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button style={{ display: "none", cursor: "pointer", background: "none", border: "none", padding: 0 }} className="md:hidden">
                <Menu size={24} color="#00d97e" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "#050c0a" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
                {["Models", "Technology", "Charging", "Order"].map((item) => (
                  <a key={item} href="#" style={{ fontSize: "1rem", fontWeight: "600", color: "#00d97e", textDecoration: "none" }}>{item}</a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* HERO */}
      <motion.section style={{ height: "100vh", position: "relative", overflow: "hidden", marginTop: "60px" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <Image src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1600&auto=format&fit=crop" alt="Electric Car" fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,12,10,0.85) 0%, rgba(0,217,126,0.08) 100%)" }} />
        </motion.div>
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
          <Reveal>
            <motion.span style={{ fontSize: "0.85rem", fontWeight: "900", letterSpacing: "0.12em", color: "#00d97e", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>
              Premium Electric Vehicles
            </motion.span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: "clamp(2.5rem, 12vw, 7rem)", fontWeight: "900", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "900px" }}>
              Electric <span style={{ color: "#00d97e" }}>Redefined</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontSize: "1.1rem", opacity: 0.7, marginBottom: "3rem", maxWidth: "650px" }}>
              500km range. 3.2s acceleration. Zero emissions. Pure electric performance.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <ChevronDown size={28} style={{ color: "#00d97e" }} />
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* PERFORMANCE SPEC BARS */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "0.5rem" }}>Performance Specs</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ opacity: 0.6, marginBottom: "3rem" }}>Volta X benchmark performance</p>
          </Reveal>

          {specs.map((spec, i) => {
            const IconComp = spec.icon
            return (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                    <IconComp size={20} style={{ color: "#00d97e" }} />
                    <span style={{ fontWeight: "700", fontSize: "0.95rem" }}>{spec.label}</span>
                    <span style={{ color: "#00d97e", fontWeight: "900", marginLeft: "auto" }}>
                      {spec.value}{spec.unit}
                    </span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "#1a2825", borderRadius: "9999px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(spec.value / spec.max) * 100}%` }}
                      transition={{ duration: 1.2, delay: i * 0.15 }}
                      viewport={{ once: true }}
                      style={{ height: "100%", backgroundColor: "#00d97e", borderRadius: "9999px" }}
                    />
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* RANGE CALCULATOR */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem", textAlign: "center" }}>Range Calculator</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ opacity: 0.6, textAlign: "center", marginBottom: "3rem" }}>
              Adjust battery charge to see real-time range
            </p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              padding: "3rem",
              backgroundColor: "#0a1410",
              borderRadius: "1rem",
              border: "1px solid #00d97e30",
            }}
          >
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", alignItems: "center" }}>
                <span style={{ fontWeight: "700" }}>Battery Charge</span>
                <span style={{ color: "#00d97e", fontWeight: "900", fontSize: "1.5rem" }}>{chargeLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={chargeLevel}
                onChange={(e) => setChargeLevel(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "#1a2825",
                  outline: "none",
                  WebkitAppearance: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
              <style>{`
                input[type="range"]::-webkit-slider-thumb {
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #00d97e;
                  cursor: pointer;
                  box-shadow: 0 0 20px rgba(0, 217, 126, 0.6);
                }
                input[type="range"]::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #00d97e;
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 0 20px rgba(0, 217, 126, 0.6);
                }
              `}</style>
            </div>

            <motion.div
              key={chargeLevel}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                padding: "2.5rem",
                backgroundColor: "#050c0a",
                borderRadius: "0.75rem",
                border: "2px solid #00d97e",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.75rem", textTransform: "uppercase", fontWeight: "700" }}>
                Estimated Range
              </div>
              <div style={{ fontSize: "3.5rem", fontWeight: "900", color: "#00d97e" }}>
                {rangeAtCharge} <span style={{ fontSize: "1.25rem", opacity: 0.6 }}>km</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MODEL TABS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Compare Models</h2>
          </Reveal>

          <Tabs value={selectedModel} onValueChange={setSelectedModel}>
            <TabsList style={{ display: "flex", justifyContent: "center", gap: "1rem", backgroundColor: "transparent", padding: "1rem" }}>
              {models.map((model) => (
                <TabsTrigger key={model.id} value={model.id} style={{ padding: "0.75rem 1.5rem", borderRadius: "0.35rem" }}>
                  {model.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {models.map((model) => (
              <TabsContent key={model.id} value={model.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "2rem",
                    marginTop: "2rem",
                  }}
                >
                  {[
                    { label: "Price", value: model.price },
                    { label: "Range", value: model.range },
                    { label: "0-100 km/h", value: model.accel },
                    { label: "Seats", value: model.seats },
                  ].map((spec, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        style={{
                          padding: "2rem",
                          backgroundColor: "#050c0a",
                          borderRadius: "0.75rem",
                          border: "1px solid #00d97e30",
                          textAlign: "center",
                        }}
                      >
                        <p style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.75rem", textTransform: "uppercase" }}>
                          {spec.label}
                        </p>
                        <p style={{ fontSize: "1.8rem", fontWeight: "900", color: "#00d97e" }}>
                          {spec.value}
                        </p>
                      </motion.div>
                    </Reveal>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CHARGING STATS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Charging Network</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { label: "Fast Charge Stations", value: 850, icon: Zap },
              { label: "Charge Time (10–80%)", value: 45, suffix: " min", icon: Battery },
              { label: "Countries Covered", value: 12, icon: Gauge },
              { label: "Home Charge Rate", value: 80, suffix: " km/2h", icon: Battery },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "#0a1410",
                    borderRadius: "0.75rem",
                    border: "1px solid #00d97e30",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#00d97e", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                    <stat.icon size={32} />
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "900", color: "#00d97e", marginBottom: "0.5rem" }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p style={{ fontSize: "0.8rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY COUNTERS */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem", textAlign: "center" }}>Environmental Impact</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.6, textAlign: "center", marginBottom: "3rem" }}>Every Volta prevents CO2 emissions</p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { label: "CO2 Saved Per Vehicle", value: 45, suffix: " tons/life" },
              { label: "Battery Recycling Rate", value: 95, suffix: "%" },
              { label: "Renewable Energy Used", value: 100, suffix: "%" },
              { label: "Manufacturing Carbon Neutral", value: 2023, suffix: "" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "0.5rem", color: "#00d97e" }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p style={{ fontSize: "0.8rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Owner Stories</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { quote: "The Volta X changed my daily commute. 500km range means I charge once a week.", author: "Alex Kumar", role: "Volta X Owner" },
              { quote: "Acceleration is insane. Zero to 100 in 3.2 seconds never gets old.", author: "Jordan Lee", role: "Volta GT Owner" },
              { quote: "Best investment I've made. Zero maintenance, zero fuel costs, infinite peace of mind.", author: "Sam Chen", role: "Volta S Owner" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    padding: "2rem",
                    backgroundColor: "#0a1410",
                    borderLeft: "3px solid #00d97e",
                    borderRadius: "0.25rem",
                  }}
                >
                  <p style={{ fontSize: "1rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <p style={{ fontWeight: "900", fontSize: "0.95rem" }}>— {t.author}</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.5 }}>{t.role}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "3rem", textAlign: "center" }}>Frequently Asked</h2>
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

      {/* PRE-ORDER MODAL */}
      <AnimatePresence>
        {showPreorderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreorderModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
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
                backgroundColor: "#050c0a",
                borderRadius: "0.75rem",
                padding: "2.5rem",
                maxWidth: "450px",
                width: "100%",
                position: "relative",
                border: "1px solid #00d97e30",
              }}
            >
              <motion.button
                onClick={() => setShowPreorderModal(false)}
                style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#00d97e" }}
              >
                <X size={24} />
              </motion.button>
              <h3 style={{ fontSize: "1.6rem", fontWeight: "900", marginBottom: "0.75rem", color: "#00d97e" }}>Reserve Your Volta</h3>
              <p style={{ opacity: 0.7, marginBottom: "2rem", fontSize: "0.95rem" }}>$5,000 deposit secures your reservation. Balance due 30 days before delivery.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#0a1410",
                    border: "1px solid #00d97e30",
                    borderRadius: "0.35rem",
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#0a1410",
                    border: "1px solid #00d97e30",
                    borderRadius: "0.35rem",
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                />
                <select style={{
                  padding: "0.75rem",
                  backgroundColor: "#0a1410",
                  border: "1px solid #00d97e30",
                  borderRadius: "0.35rem",
                  color: "white",
                  fontSize: "0.95rem",
                }}>
                  <option style={{ color: "#0a0a0a" }}>Select Model</option>
                  <option style={{ color: "#0a0a0a" }}>Volta S</option>
                  <option style={{ color: "#0a0a0a" }}>Volta X</option>
                  <option style={{ color: "#0a0a0a" }}>Volta GT</option>
                </select>
              </div>
              <motion.button
                whileHover={{ backgroundColor: "#00b366" }}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  backgroundColor: "#00d97e",
                  color: "#050c0a",
                  fontWeight: "900",
                  borderRadius: "0.35rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                }}
              >
                Secure Reservation
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA FOOTER */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "#0a1410" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "1rem" }}>Ready to Go Electric?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "1rem", opacity: 0.7, marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
              Secure your Volta today with a $5,000 deposit. Flexible financing available.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.button
              onClick={() => setShowPreorderModal(true)}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "0.9rem 2.25rem",
                backgroundColor: "#00d97e",
                color: "#050c0a",
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
              Pre-Order Now <Zap size={18} />
            </motion.button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
