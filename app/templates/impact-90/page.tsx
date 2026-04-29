"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, MapPin, Users, Check, ChevronDown } from "lucide-react";

const SPACE_TYPES = [
  { type: "Hot Desk", price: "$299/mo", capacity: "Unlimited access", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
  { type: "Dedicated", price: "$599/mo", capacity: "Reserved desk", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop" },
  { type: "Private Office", price: "$1,299/mo", capacity: "Up to 6 people", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
  { type: "Event Space", price: "Custom", capacity: "50-200 people", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  { author: "Sarah Chen", company: "TechStart", text: "The community here is incredible. Found my co-founder at the coffee bar!" },
  { author: "Marcus Brown", company: "Consulting Co", text: "Excellent facilities, fantastic support team. Best workspace investment." },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(target / 50);
      if (current > target) current = target;
      setCount(current);
      if (current === target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#d97706]">{count.toLocaleString()}</div>
      <div className="text-sm text-gray-600 mt-2">{label}</div>
    </div>
  );
}

function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = (ref.current as HTMLDivElement).getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="px-8 py-3 bg-[#d97706] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#d97706]/30 transition-shadow"
    >
      {children}
    </motion.button>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "What's the contract term?", a: "Flexible month-to-month for hot desks, 12-month for dedicated desks. Cancel anytime with 30 days notice." },
    { q: "Is parking included?", a: "Yes! Unlimited parking in our 5-level garage. Reserved spots available for dedicated members." },
    { q: "Can we host client meetings?", a: "Absolutely. Private meeting rooms available for hourly booking or included with memberships." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <motion.div key={i} className="border-2 border-[#d97706]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full p-4 flex justify-between items-center bg-white hover:bg-orange-50 transition-colors"
          >
            <span className="text-left font-semibold text-[#1e293b]">{faq.q}</span>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5 text-[#d97706]" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-orange-50 border-t-2 border-[#d97706]/10 p-4"
              >
                <p className="text-gray-700">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function StudioHivePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCity, setActiveCity] = useState("San Francisco");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const cities = [
    { name: "San Francisco", members: 450, events: 12, amenities: ["WiFi", "Parking", "Kitchen"] },
    { name: "New York", members: 520, events: 15, amenities: ["WiFi", "Parking", "Gym"] },
    { name: "Austin", members: 380, events: 10, amenities: ["WiFi", "Kitchen", "Phone Booths"] },
  ];

  const amenities = [
    { name: "High-Speed WiFi", icon: "📡" },
    { name: "Parking Included", icon: "🅿️" },
    { name: "Professional Kitchen", icon: "🍽️" },
    { name: "Meeting Rooms", icon: "🤝" },
    { name: "Phone Booths", icon: "☎️" },
    { name: "Lounge Areas", icon: "🛋️" },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#fafaf8] text-[#1e293b] overflow-x-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 opacity-15"
        style={{ y: backgroundY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
          alt="bg"
          fill
          className="object-cover"
          unoptimized
        />
      </motion.div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/95 backdrop-blur-xl border-b border-[#d97706]/10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Users className="w-6 h-6 text-[#d97706]" />
            <span className="font-bold text-lg">STUDIO HIVE</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#spaces" className="hover:text-[#d97706] transition-colors">Spaces</a>
            <a href="#locations" className="hover:text-[#d97706] transition-colors">Locations</a>
            <a href="#community" className="hover:text-[#d97706] transition-colors">Community</a>
            <a href="#faq" className="hover:text-[#d97706] transition-colors">FAQ</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 flex flex-col gap-4 text-sm">
              <a href="#spaces">Spaces</a>
              <a href="#locations">Locations</a>
              <a href="#community">Community</a>
              <a href="#faq">FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="text-[#d97706] text-sm font-bold mb-4">MODERN COWORKING SPACES</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Where Teams <span className="text-[#d97706]">Grow Together</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">1,200 members. 3 locations. 50+ events per month. Your space to succeed.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <MagneticBtn>TOUR NOW</MagneticBtn>
            </Reveal>
          </div>
        </section>

        {/* Space Types */}
        <section id="spaces" className="py-20 px-6 bg-gradient-to-b from-[#fafaf8] to-white">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">WORKSPACE OPTIONS</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SPACE_TYPES.map((space, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-[#d97706]/10 hover:border-[#d97706]/30 transition-colors shadow-lg hover:shadow-2xl"
                  >
                    <div className="relative h-40 bg-gray-200">
                      <Image
                        src={space.img}
                        alt={space.type}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{space.type}</h3>
                      <p className="text-sm text-gray-600 mb-4">{space.capacity}</p>
                      <p className="text-2xl font-bold text-[#d97706] mb-4">{space.price}</p>
                      <button
                        onClick={() => setShowBookingModal(true)}
                        className="w-full py-2 bg-[#d97706] text-white rounded-lg hover:bg-[#b45309] transition-colors font-semibold"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">INCLUDED AMENITIES</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {amenities.map((amenity, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white border-2 border-[#d97706]/20 rounded-xl text-center hover:border-[#d97706] transition-colors"
                  >
                    <div className="text-3xl mb-3">{amenity.icon}</div>
                    <p className="font-semibold text-sm">{amenity.name}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section id="locations" className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-8 text-center">OUR LOCATIONS</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-3 mb-8 flex-wrap justify-center">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => setActiveCity(city.name)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeCity === city.name
                        ? "bg-[#d97706] text-white"
                        : "border-2 border-[#d97706]/30 hover:border-[#d97706]"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-gradient-to-br from-[#fafaf8] to-white p-8 rounded-2xl border-2 border-[#d97706]/20">
                {cities.map((city) => (
                  activeCity === city.name && (
                    <motion.div key={city.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="text-2xl font-bold mb-4">{city.name}</h3>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-[#d97706] font-bold text-lg">{city.members}</p>
                          <p className="text-gray-600">Active Members</p>
                        </div>
                        <div>
                          <p className="text-[#d97706] font-bold text-lg">{city.events}</p>
                          <p className="text-gray-600">Events/Month</p>
                        </div>
                        <div>
                          <p className="text-[#d97706] font-bold">98%</p>
                          <p className="text-gray-600">Satisfaction</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {city.amenities.map((amenity, i) => (
                          <div key={i} className="flex gap-2 items-center text-sm">
                            <Check className="w-4 h-4 text-[#d97706]" />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Reveal delay={0}>
                <Counter target={1200} label="Members" />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#d97706]">3</div>
                  <div className="text-sm text-gray-600 mt-2">Locations</div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#d97706]">50</div>
                  <div className="text-sm text-gray-600 mt-2">Events/Month</div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#d97706]">98%</div>
                  <div className="text-sm text-gray-600 mt-2">Satisfaction</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Community Testimonials */}
        <section id="community" className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">MEMBER STORIES</h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-white border-2 border-[#d97706]/20 rounded-xl">
                    <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                    <p className="font-bold text-[#1e293b]">{testimonial.author}</p>
                    <p className="text-sm text-[#d97706]">{testimonial.company}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Virtual Tour */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl font-bold mb-6">Experience Our Spaces</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-700 mb-8">Take a 360° virtual tour of our facilities and see where you'll work.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <button
                onClick={() => setShowTourModal(true)}
                className="px-8 py-3 bg-[#d97706] text-white rounded-lg font-bold hover:shadow-lg transition-shadow"
              >
                START VIRTUAL TOUR
              </button>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold mb-12 text-center">QUESTIONS?</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion />
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold mb-6">Ready to Join the Hive?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticBtn>BOOK A TOUR TODAY</MagneticBtn>
          </Reveal>
        </section>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4">Book Your Tour</h3>
              <p className="text-gray-600 mb-6">Select a date and time that works best for you.</p>
              <input type="date" className="w-full p-3 border-2 border-[#d97706]/20 rounded-lg mb-4" />
              <input type="time" className="w-full p-3 border-2 border-[#d97706]/20 rounded-lg mb-6" />
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-full py-3 bg-[#d97706] text-white rounded-lg font-bold"
              >
                CONFIRM BOOKING
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Modal */}
      <AnimatePresence>
        {showTourModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4">Virtual Tour Starting...</h3>
              <p className="text-gray-600 mb-6">Exploring Studio Hive San Francisco</p>
              <div className="w-full aspect-video bg-gray-300 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-600">360° Video Player</span>
              </div>
              <button
                onClick={() => setShowTourModal(false)}
                className="w-full py-3 bg-[#d97706] text-white rounded-lg font-bold"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #fafaf8; }
        ::-webkit-scrollbar-thumb { background: #d97706; border-radius: 4px; }
      `}</style>
    </div>
  );
}
