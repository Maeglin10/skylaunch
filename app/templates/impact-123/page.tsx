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

function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>
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

const COURSES = [
  { id: 1, title: "Startup Fundamentals", level: "Beginner", rating: 4.9, duration: "4 weeks", category: "Business", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400" },
  { id: 2, title: "React Mastery", level: "Advanced", rating: 4.8, duration: "8 weeks", category: "Tech", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" },
  { id: 3, title: "UI/UX Principles", level: "Intermediate", rating: 4.9, duration: "6 weeks", category: "Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" },
  { id: 4, title: "Digital Marketing", level: "Beginner", rating: 4.7, duration: "5 weeks", category: "Marketing", img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400" },
  { id: 5, title: "Finance Basics", level: "Beginner", rating: 4.8, duration: "4 weeks", category: "Finance", img: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8b04e?w=400" },
  { id: 6, title: "Data Science Pro", level: "Advanced", rating: 4.9, duration: "10 weeks", category: "Tech", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400" },
  { id: 7, title: "Brand Strategy", level: "Intermediate", rating: 4.8, duration: "6 weeks", category: "Marketing", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 8, title: "Investment 101", level: "Beginner", rating: 4.9, duration: "5 weeks", category: "Finance", img: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8b04e?w=400" }
]

const INSTRUCTORS = [
  { name: "Dr. Sarah Johnson", expertise: "Tech & Entrepreneurship", students: "50K+", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { name: "James Chen", expertise: "Frontend Development", students: "80K+", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Maya Patel", expertise: "Design Systems", students: "45K+", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  { name: "Alex Rivera", expertise: "Business Strategy", students: "60K+", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" }
]

const PATHS = [
  { title: "Beginner", courses: 15, duration: "12 weeks", desc: "Start your learning journey", color: "from-[#f97316] to-orange-500" },
  { title: "Intermediate", courses: 25, duration: "24 weeks", desc: "Build professional skills", color: "from-[#0f172a] to-blue-900" },
  { title: "Advanced", courses: 35, duration: "36 weeks", desc: "Master your discipline", color: "from-[#fef9f0] to-yellow-100" }
]

export default function RiseAcademy() {
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#0f172a] via-blue-950 to-[#1e293b] text-white overflow-hidden">
      {/* Parallax Hero */}
      <section className="relative h-screen overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200"
            alt="Learning"
            fill
            className="object-cover brightness-40"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]" />

        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center z-10">
          <Reveal>
            <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#f97316] via-orange-400 to-yellow-300">
              Rise Academy
            </motion.h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-12 max-w-3xl">Master cutting-edge skills. Learn from industry experts. Transform your career.</p>
            <motion.div whileHover={{ x: 5 }} className="inline-flex items-center gap-3 px-8 py-4 bg-[#f97316] text-white rounded-lg font-semibold cursor-pointer hover:bg-[#f97316]/90">
              Explore Courses →
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Course Tabs */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Course Catalog</h2>
        </Reveal>

        <Tabs defaultValue="Business" className="w-full">
          <TabsList className="grid w-full grid-cols-5 gap-2 bg-blue-900/30 p-2 rounded-lg mb-12">
            {["Business", "Tech", "Design", "Marketing", "Finance"].map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-sm font-semibold text-orange-400 data-[state=active]:text-white">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {["Business", "Tech", "Design", "Marketing", "Finance"].map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-4 gap-6">
                {COURSES.filter(c => c.category === category).map((course, i) => (
                  <Reveal key={course.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      onClick={() => { setSelectedCourse(course); setDialogOpen(true) }}
                      className="group cursor-pointer"
                    >
                      <Card className="border border-orange-500/20 hover:border-[#f97316]/50 overflow-hidden transition-all h-full bg-blue-900/20">
                        <div className="relative h-40 overflow-hidden">
                          <Image src={course.img} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <Badge className="bg-[#f97316]">{course.level}</Badge>
                            <span className="text-[#f97316] font-bold">{course.rating}★</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                          <p className="text-sm text-gray-300 mb-3">{course.duration}</p>
                          <Progress value={Math.random() * 100} className="h-1" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Reveal>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl bg-[#0f172a] border-[#f97316]/20">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl">{selectedCourse?.title}</DialogTitle>
            </DialogHeader>
            {selectedCourse && (
              <div className="space-y-6 text-gray-200">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image src={selectedCourse.img} alt={selectedCourse.title} fill className="object-cover" />
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-blue-900/40 p-4 rounded-lg">
                    <p className="text-xs text-orange-400 uppercase font-semibold">Level</p>
                    <p className="text-lg font-bold mt-1">{selectedCourse.level}</p>
                  </div>
                  <div className="bg-blue-900/40 p-4 rounded-lg">
                    <p className="text-xs text-orange-400 uppercase font-semibold">Duration</p>
                    <p className="text-lg font-bold mt-1">{selectedCourse.duration}</p>
                  </div>
                  <div className="bg-blue-900/40 p-4 rounded-lg">
                    <p className="text-xs text-orange-400 uppercase font-semibold">Rating</p>
                    <p className="text-lg font-bold mt-1">{selectedCourse.rating}★</p>
                  </div>
                  <div className="bg-blue-900/40 p-4 rounded-lg">
                    <p className="text-xs text-orange-400 uppercase font-semibold">Category</p>
                    <p className="text-lg font-bold mt-1">{selectedCourse.category}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">Curriculum</h4>
                  <Accordion type="single" collapsible className="space-y-2">
                    {["Module 1: Fundamentals", "Module 2: Intermediate", "Module 3: Advanced"].map((mod, i) => (
                      <AccordionItem key={i} value={String(i)} className="border border-orange-500/20">
                        <AccordionTrigger className="text-sm font-semibold text-orange-400">{mod}</AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          <ul className="space-y-2">
                            <li>• Lesson overview and objectives</li>
                            <li>• Practical examples and exercises</li>
                            <li>• Real-world case studies</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="flex items-center gap-4 bg-blue-900/40 p-4 rounded-lg">
                  <Avatar>
                    <AvatarImage src={INSTRUCTORS[0].img} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-white">{INSTRUCTORS[0].name}</p>
                    <p className="text-sm text-gray-400">{INSTRUCTORS[0].expertise}</p>
                  </div>
                </div>

                <MagneticBtn className="w-full py-3 bg-[#f97316] text-white rounded-lg font-bold hover:bg-[#f97316]/90">
                  Enroll Now
                </MagneticBtn>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Instructors */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Expert Instructors</h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8">
          {INSTRUCTORS.map((instructor, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="border border-orange-500/20 bg-blue-900/20 overflow-hidden hover:border-[#f97316]/50 transition-colors">
                <div className="relative h-48">
                  <Image src={instructor.img} alt={instructor.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                  <p className="text-sm text-[#f97316] font-semibold mb-3">{instructor.expertise}</p>
                  <p className="text-sm text-gray-300">{instructor.students} students</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Learning Paths</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {PATHS.map((path, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -10 }} className="group">
                <Card className={`border border-orange-500/20 bg-gradient-to-br ${path.color} text-white overflow-hidden`}>
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold mb-4">{path.title}</h3>
                    <div className="space-y-3 mb-8">
                      <p className="text-sm opacity-90">{path.courses} courses</p>
                      <p className="text-sm opacity-90">{path.duration}</p>
                    </div>
                    <p className="text-lg font-semibold mb-6">{path.desc}</p>
                    <MagneticBtn className="w-full py-2 bg-white text-current rounded-lg font-bold hover:bg-gray-200">
                      Start Learning
                    </MagneticBtn>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-blue-900/30 rounded-2xl border border-orange-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[{ v: 50, l: "K+ Students" }, { v: 200, l: "Courses" }, { v: 5, s: "★", l: "Avg Rating" }, { v: 95, s: "%", l: "Completion" }].map((stat, i) => (
            <Reveal key={i}>
              <div>
                <p className="text-5xl font-bold text-[#f97316]"><Counter target={stat.v} suffix={stat.s || ""} /></p>
                <p className="text-gray-300 mt-2">{stat.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">Student Success</h2>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3, 4].map((i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Card className="border border-orange-500/20 bg-blue-900/20">
                  <CardContent className="p-8">
                    <div className="flex gap-2 mb-4">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-[#f97316]">★</span>)}
                    </div>
                    <Badge className="mb-4 bg-[#f97316]">Completed {i} Courses</Badge>
                    <p className="text-gray-200 mb-6 italic">"Rise Academy transformed my career. The instructors are world-class and the community is incredibly supportive."</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`https://images.unsplash.com/photo-150${i}?w=100`} />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white">Student Name</p>
                        <p className="text-xs text-gray-400">Course Grad {i}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16 text-center">FAQ</h2>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: "How do I access the courses?", a: "Once enrolled, you get lifetime access to course materials, updates, and community resources." },
            { q: "Can I get a certificate?", a: "Yes! Complete a course and earn a verified certificate to showcase on LinkedIn and your resume." },
            { q: "What's your refund policy?", a: "30-day money-back guarantee. If you're not satisfied, full refund no questions asked." },
            { q: "Are group discounts available?", a: "Yes, we offer special pricing for teams and organizations. Contact our sales team for details." }
          ].map((item, i) => (
            <AccordionItem key={i} value={String(i)} className="border border-orange-500/20 px-6 rounded-lg bg-blue-900/20">
              <AccordionTrigger className="font-semibold text-orange-400">{item.q}</AccordionTrigger>
              <AccordionContent className="text-gray-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-[#f97316] to-orange-500 rounded-2xl p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Start Learning Today</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Join 50,000+ students already transforming their careers with Rise Academy.</p>
            <MagneticBtn className="px-12 py-4 bg-white text-[#f97316] rounded-lg font-bold cursor-pointer hover:bg-gray-100">
              Explore All Courses
            </MagneticBtn>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
