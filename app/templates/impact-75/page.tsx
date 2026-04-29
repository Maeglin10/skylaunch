"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ====== REVEAL COMPONENT ====== */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ====== COUNTER COMPONENT ====== */
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const increment = target / 100;
    const interval = setInterval(() => {
      setCount((c) => (c < target ? c + increment : target));
    }, 20);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <div ref={ref}>{Math.floor(count)}</div>;
}

/* ====== WAVE AUDIO VISUALIZATION ====== */
function WaveBar() {
  return (
    <div className="flex items-end gap-1 h-12">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-[#7c5cbf] rounded-sm"
          animate={{ height: ["20%", "80%", "40%"] }}
          transition={{ duration: 0.8, delay: i * 0.05, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ====== FLOATING PARTICLE DOTS ====== */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#7c5cbf] rounded-full"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0.3,
          }}
          animate={{
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 6 + i, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ====== INFINITE MARQUEE ====== */
function InfiniteMarquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden bg-[#0f0d1a] border-y border-[#7c5cbf]/20 py-6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[#7c5cbf] font-bold text-lg tracking-widest flex-shrink-0">
            ✦ {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ====== TESTIMONIALS CAROUSEL ====== */
function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Array<{ name: string; role: string; text: string }>;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center px-6"
        >
          <p className="text-2xl mb-6 italic opacity-80">&quot;{testimonials[current].text}&quot;</p>
          <p className="text-lg font-black text-[#7c5cbf]">{testimonials[current].name}</p>
          <p className="text-sm opacity-60">{testimonials[current].role}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 justify-center mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-[#7c5cbf] w-8" : "bg-[#7c5cbf]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ====== PRICING CARD ====== */
function PricingCard({
  tier,
  price,
  features,
  cta,
}: {
  tier: string;
  price: string;
  features: string[];
  cta: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="border border-[#7c5cbf]/20 rounded-2xl p-8 hover:border-[#7c5cbf] transition-all"
    >
      <h3 className="text-2xl font-black mb-2 text-[#7c5cbf]">{tier}</h3>
      <div className="mb-6">
        {price === "Free" ? (
          <p className="text-3xl font-black text-white">{price}</p>
        ) : (
          <>
            <p className="text-4xl font-black text-white">{price}</p>
            <p className="text-sm opacity-60">/month</p>
          </>
        )}
      </div>
      <div className="space-y-3 mb-8">
        {features.map((f, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-[#7c5cbf] font-black mt-1">✓</span>
            <span className="opacity-70">{f}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-3 bg-[#7c5cbf] text-white font-black rounded-lg hover:bg-[#6a4fb0] transition-colors">
        {cta}
      </button>
    </motion.div>
  );
}

/* ====== FAQ ACCORDION ====== */
function FAQAccordion({
  items,
}: {
  items: Array<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div key={i} className="border border-[#7c5cbf]/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-4 flex justify-between items-center bg-[#0f0d1a] text-white hover:bg-[#1a1820] transition-colors"
          >
            <span className="font-bold text-left">{item.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }}>
              ▼
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#1a1820] px-6 py-4 text-white/70 border-t border-[#7c5cbf]/10"
              >
                {item.a}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

/* ====== MAIN PAGE ====== */
export default function StillMeditation() {
  const sessions = [
    { name: "Sleep", color: "#7c5cbf", desc: "Deep sleep journeys" },
    { name: "Breathe", color: "#9366d9", desc: "Breathing techniques" },
    { name: "Focus", color: "#7c5cbf", desc: "Concentration sessions" },
    { name: "Move", color: "#9366d9", desc: "Mindful movement" },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Meditation Enthusiast",
      text: "Still has transformed my daily routine. I sleep better and feel more focused than ever.",
    },
    {
      name: "Marcus L.",
      role: "Busy Professional",
      text: "Finally found a meditation app that fits my schedule. Just 10 minutes a day makes a difference.",
    },
    {
      name: "Jessica K.",
      role: "Yoga Instructor",
      text: "Recommend Still to all my students. The quality of guidance is exceptional.",
    },
  ];

  const faqs = [
    {
      q: "Do I need meditation experience?",
      a: "No! Still is designed for beginners and experienced meditators alike. Start with any session that appeals to you.",
    },
    {
      q: "How long are sessions?",
      a: "Sessions range from 5 to 45 minutes. Choose what fits your schedule.",
    },
    {
      q: "Can I download sessions?",
      a: "Premium members can download sessions for offline access.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0f0d1a] to-[#1a1820] text-[#f8f7ff] min-h-screen overflow-x-hidden">
      {/* Hero with Floating Particles */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-12">
        <FloatingParticles />

        <div className="relative z-10 text-center">
          <Reveal>
            <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              Still
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-2xl opacity-70 font-light max-w-2xl mx-auto">
              Meditation for modern life. Find your calm, build your practice.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16 max-w-md mx-auto">
              <WaveBar />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Session Categories */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Session Types
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sessions.map((session, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border border-[#7c5cbf]/20 rounded-2xl p-8 hover:border-[#7c5cbf] transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#7c5cbf]/20 mb-4 flex items-center justify-center group-hover:bg-[#7c5cbf]/40 transition-colors">
                  <span className="text-[#7c5cbf] font-black">♫</span>
                </div>
                <h3 className="text-2xl font-black mb-2 text-[#7c5cbf]">{session.name}</h3>
                <p className="opacity-60">{session.desc}</p>
                <div className="mt-6 pt-6 border-t border-[#7c5cbf]/10">
                  <WaveBar />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 30-Day Streak Stats */}
      <section className="py-20 px-12 bg-[#1a1820]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
              Your Progress
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="text-center border border-[#7c5cbf]/20 rounded-lg p-8">
                <div className="text-5xl font-black text-[#7c5cbf] mb-2">
                  <Counter target={30} />
                </div>
                <p className="text-sm opacity-60 uppercase tracking-widest">Day Streak</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center border border-[#7c5cbf]/20 rounded-lg p-8">
                <div className="text-5xl font-black text-[#7c5cbf] mb-2">
                  <Counter target={127} />
                </div>
                <p className="text-sm opacity-60 uppercase tracking-widest">Sessions Complete</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="text-center border border-[#7c5cbf]/20 rounded-lg p-8">
                <div className="text-5xl font-black text-[#7c5cbf] mb-2">
                  <Counter target={1250} />
                </div>
                <p className="text-sm opacity-60 uppercase tracking-widest">Minutes Meditated</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-12 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            What People Say
          </h2>
        </Reveal>
        <div className="border border-[#7c5cbf]/20 rounded-2xl p-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Daily Inspiration Marquee */}
      <InfiniteMarquee
        items={[
          "Breathe",
          "Be Present",
          "Find Peace",
          "Let Go",
          "Embrace Calm",
        ]}
      />

      {/* Pricing */}
      <section className="py-20 px-12 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Choose Your Plan
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal delay={0.1}>
            <PricingCard
              tier="Free"
              price="Free"
              features={["3 sessions/week", "Basic library", "Mobile app"]}
              cta="Get Started"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <PricingCard
                tier="Premium"
                price="$9.99"
                features={[
                  "Unlimited sessions",
                  "Full library",
                  "Offline downloads",
                  "Ad-free",
                  "Personalized playlists",
                ]}
                cta="Start Free Trial"
              />
            </motion.div>
          </Reveal>
          <Reveal delay={0.3}>
            <PricingCard
              tier="Teams"
              price="$29.99"
              features={[
                "Up to 10 users",
                "All Premium features",
                "Team analytics",
                "Priority support",
                "Custom sessions",
              ]}
              cta="Contact Sales"
            />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-12 bg-[#1a1820] max-w-4xl mx-auto w-full">
        <Reveal>
          <h2 className="text-5xl font-black mb-12 text-center uppercase tracking-tighter">
            Questions?
          </h2>
        </Reveal>
        <FAQAccordion items={faqs} />
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-12 bg-gradient-to-t from-[#7c5cbf]/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">
              Download Still Today
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl opacity-60 mb-12 max-w-xl mx-auto">
              Available on iOS and Android. Start your 14-day free trial.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex gap-6 justify-center flex-wrap">
              <button className="px-8 py-4 bg-[#7c5cbf] text-white font-black uppercase text-sm tracking-[0.1em] rounded-full hover:shadow-[0_0_40px_rgba(124,92,191,0.3)] transition-shadow">
                App Store
              </button>
              <button className="px-8 py-4 border border-[#7c5cbf] text-[#7c5cbf] font-black uppercase text-sm tracking-[0.1em] rounded-full hover:bg-[#7c5cbf] hover:text-white transition-all">
                Google Play
              </button>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
