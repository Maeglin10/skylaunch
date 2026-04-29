'use client';

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Heart, ChevronDown, Camera, Globe, MapPin } from 'lucide-react';
import Link from 'next/link';

/* === UTILITY COMPONENTS === */

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
};

const Counter = ({ target, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += target / 30;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black" style={{ color: '#d4a96a' }}>
        {count}{suffix}
      </div>
      <p className="text-sm uppercase tracking-widest mt-2 text-[#f5f0e8]" style={{ letterSpacing: '2px' }}>
        {label}
      </p>
    </div>
  );
};

const MagneticBtn = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      onClick={onClick}
      className="px-8 py-3 rounded-lg font-black uppercase text-sm transition-all bg-[#d4a96a] text-[#0d1117] hover:bg-[#e8b97d] tracking-widest"
    >
      {children}
    </motion.button>
  );
};

const Accordion = ({ title, content, isOpen, onClick }) => (
  <div style={{ borderBottom: '1px solid #d4a96a40' }}>
    <button onClick={onClick} className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5">
      <span className="font-bold text-[#f5f0e8] uppercase text-sm tracking-wide">{title}</span>
      <ChevronDown style={{ color: '#d4a96a', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="px-6 pb-4 text-[#f5f0e8]/70">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Marquee = ({ items }) => (
  <div style={{ overflow: 'hidden', display: 'flex', width: '100%' }}>
    <motion.div animate={{ x: [0, -1200] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="flex gap-12 whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-lg font-black uppercase tracking-wider text-[#d4a96a]">
          {item} •
        </span>
      ))}
    </motion.div>
  </div>
);

/* === MAIN COMPONENT === */

export default function NomadLens() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePortfolioTab, setActivePortfolioTab] = useState('Portraits');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [printSize, setPrintSize] = useState('50cm');
  const [openAccordion, setOpenAccordion] = useState(null);

  const portfolio = {
    Portraits: [
      { id: 1, title: 'Portrait Study', location: 'Tokyo' },
      { id: 2, title: 'Street Vendor', location: 'Bangkok' },
      { id: 3, title: 'Local Guide', location: 'Morocco' },
      { id: 4, title: 'Farmer', location: 'Peru' },
    ],
    Landscapes: [
      { id: 5, title: 'Mountain Peak', location: 'Nepal' },
      { id: 6, title: 'Desert Dawn', location: 'Egypt' },
      { id: 7, title: 'Tropical Forest', location: 'Costa Rica' },
      { id: 8, title: 'Arctic Lights', location: 'Iceland' },
    ],
    Street: [
      { id: 9, title: 'Market Life', location: 'India' },
      { id: 10, title: 'Urban Energy', location: 'New York' },
      { id: 11, title: 'Quiet Moment', location: 'Paris' },
      { id: 12, title: 'Night Bazaar', location: 'Turkey' },
    ],
  };

  const workshops = [
    { id: 1, title: 'Destination Workshop', duration: '7 Days', locations: ['Iceland', 'Morocco', 'Japan'], price: '$3,500' },
    { id: 2, title: 'Online Course', duration: '6 Weeks', focus: 'Advanced Composition', price: '$299' },
    { id: 3, title: '1:1 Mentorship', duration: 'Ongoing', focus: 'Personal Coaching', price: '$150/session' },
  ];

  const behindScenes = [
    { id: 1, location: 'Japanese Alps', story: 'Hiking at dawn to capture the perfect golden hour light' },
    { id: 2, location: 'Moroccan Market', story: 'Waiting 6 hours for the right moment with natural light' },
    { id: 3, location: 'Icelandic Waterfall', story: 'Standing in freezing water for pristine compositions' },
    { id: 4, location: 'Peruvian Highlands', story: 'Building trust with local communities for authentic shots' },
  ];

  const prints = [
    { id: 1, title: 'Mountain Majesty', sizes: ['30cm', '50cm', '70cm', '100cm'], basePrice: 49 },
    { id: 2, title: 'Forest Serenity', sizes: ['30cm', '50cm', '70cm', '100cm'], basePrice: 49 },
    { id: 3, title: 'Urban Dreams', sizes: ['30cm', '50cm', '70cm', '100cm'], basePrice: 49 },
    { id: 4, title: 'Golden Hour', sizes: ['30cm', '50cm', '70cm', '100cm'], basePrice: 49 },
  ];

  const gearGuide = [
    { category: 'Camera Bodies', content: 'Canon 5D Mark IV, Sony A7IV, Nikon Z6 II. Each has unique strengths.' },
    { category: 'Lenses', content: 'Prime lenses (35mm, 85mm, 135mm) for versatility. Wide angles for landscapes.' },
    { category: 'Bags', content: 'Peak Design, Lowepro, and Manfrotto make excellent travel photography bags.' },
    { category: 'Accessories', content: 'Tripods, filters, spare batteries, memory cards, and cleaning kits are essential.' },
  ];

  const testimonials = [
    { name: 'James M.', quote: 'The best photography mentorship I could ask for. Took my work to another level.' },
    { name: 'Sofia L.', quote: 'The Iceland workshop was life-changing. Worth every penny and then some.' },
    { name: 'Marcus K.', quote: 'Alex taught me how to tell stories through images. Game-changing insights.' },
    { name: 'Emma T.', quote: 'Professional, patient, and incredibly knowledgeable. Highly recommend!' },
  ];

  const faqs = [
    { title: 'What gear do I need to start?', content: 'You can start with a smartphone. What matters is learning composition, light, and storytelling.' },
    { title: 'Are your workshops beginner-friendly?', content: 'Yes! We have beginner, intermediate, and advanced tracks. Everyone learns at their own pace.' },
    { title: 'Can I use my own camera on workshops?', content: 'Absolutely. We teach with whatever camera you have. The principles are universal.' },
    { title: 'Do you offer print licensing?', content: 'Yes. Limited editions, licensing, and commercial use available. Contact us for details.' },
  ];

  const printPrices = {
    '30cm': 35,
    '50cm': 49,
    '70cm': 75,
    '100cm': 120,
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: '#0d1117', color: '#f5f0e8', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: '#0d1117dd', backdropFilter: 'blur(10px)', borderBottom: '1px solid #d4a96a30' }} className="py-4 px-6 md:px-12 flex justify-between items-center">
        <h1 style={{ color: '#d4a96a', fontSize: '1.5rem', fontWeight: 'black', letterSpacing: '2px' }} className="uppercase">
          NOMAD LENS
        </h1>
        <nav className="hidden md:flex gap-8">
          {['Portfolio', 'Workshops', 'Shop', 'FAQ'].map((item) => (
            <Link key={item} href="#" className="hover:text-[#d4a96a] transition-colors uppercase font-bold text-xs tracking-wide">
              {item}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ backgroundColor: '#0d1117', zIndex: 40, marginTop: '60px' }} className="md:hidden py-4 px-6 border-b border-[#d4a96a30]">
            {['Portfolio', 'Workshops', 'Shop', 'FAQ'].map((item) => (
              <p key={item} className="py-2 text-[#f5f0e8] uppercase font-bold text-xs tracking-wide">
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', marginTop: '60px', background: 'linear-gradient(135deg, #0d1117, #1a1f26)' }}>
        <motion.div style={{ y: parallaxY }}>
          <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200" alt="Landscape" fill unoptimized style={{ objectFit: 'cover', opacity: 0.2 }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 10 }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: 'black', marginBottom: '1rem', color: '#f5f0e8', letterSpacing: '-2px' }}>
              NOMAD LENS
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#d4a96a', fontWeight: 'bold' }}>Travel Photography & Workshops</p>
          </Reveal>
          <Reveal delay={0.3}>
            <motion.div className="flex gap-4">
              <MagneticBtn onClick={() => {}}>View Portfolio</MagneticBtn>
              <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '0.75rem 2rem', border: '2px solid #d4a96a', color: '#d4a96a', backgroundColor: 'transparent', borderRadius: '0.5rem', fontWeight: 'black', letterSpacing: '1px' }}>
                Book Workshop
              </motion.button>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* PORTFOLIO TABS & MASONRY */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#d4a96a', letterSpacing: '1px' }}>
            PORTFOLIO
          </h3>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {['Portraits', 'Landscapes', 'Street'].map((style) => (
            <motion.button
              key={style}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActivePortfolioTab(style)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activePortfolioTab === style ? '#d4a96a' : 'transparent',
                color: activePortfolioTab === style ? '#0d1117' : '#d4a96a',
                border: `2px solid ${activePortfolioTab === style ? '#d4a96a' : '#d4a96a40'}`,
                borderRadius: '0.5rem',
                fontWeight: 'black',
                cursor: 'pointer',
              }}
            >
              {style}
            </motion.button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {portfolio[activePortfolioTab].map((photo, idx) => (
            <Reveal key={photo.id} delay={idx * 0.05}>
              <motion.div
                whileHover={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(photo)}
                style={{ cursor: 'pointer', position: 'relative', borderRadius: '1rem', overflow: 'hidden', background: 'linear-gradient(135deg, #d4a96a, #9d7d4c)', aspectRatio: '1' }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0d1117/80' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
                  <h4 style={{ fontWeight: 'black', marginBottom: '0.5rem', fontSize: '1.25rem', color: '#f5f0e8' }}>{photo.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d4a96a' }}>
                    <MapPin size={16} />
                    <p style={{ fontSize: '0.9rem' }}>{photo.location}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WORKSHOPS */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#d4a96a' }}>
            WORKSHOPS & COURSES
          </h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {workshops.map((workshop, idx) => (
            <Reveal key={workshop.id} delay={idx * 0.1}>
              <div style={{ backgroundColor: '#1a1f26', padding: '2rem', borderRadius: '1rem', border: '1px solid #d4a96a30', textAlign: 'center' }}>
                <h4 style={{ fontWeight: 'black', marginBottom: '1rem', color: '#d4a96a', fontSize: '1.25rem' }}>{workshop.title}</h4>
                <p style={{ color: '#f5f0e8/80', marginBottom: '1rem' }}>{workshop.duration}</p>
                {workshop.locations && <p style={{ color: '#d4a96a', fontSize: '0.9rem', marginBottom: '1rem' }}>{workshop.locations.join(' • ')}</p>}
                {workshop.focus && <p style={{ color: '#f5f0e8/60', fontSize: '0.9rem', marginBottom: '1rem' }}>Focus: {workshop.focus}</p>}
                <p style={{ color: '#d4a96a', fontWeight: 'black', marginBottom: '1.5rem', fontSize: '1.5rem' }}>{workshop.price}</p>
                <motion.button whileHover={{ scale: 1.05 }} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#d4a96a', color: '#0d1117', borderRadius: '0.5rem', fontWeight: 'black', cursor: 'pointer' }}>
                  Enroll Now
                </motion.button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEHIND THE SCENES CAROUSEL */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#1a1f26', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#d4a96a' }}>
            BEHIND THE SCENES
          </h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {behindScenes.map((scene, idx) => (
            <Reveal key={scene.id} delay={idx * 0.1}>
              <div style={{ backgroundColor: '#0d1117', padding: '2rem', borderRadius: '1rem', border: '1px solid #d4a96a30' }}>
                <h4 style={{ fontWeight: 'black', marginBottom: '0.5rem', color: '#d4a96a' }}>{scene.location}</h4>
                <p style={{ color: '#f5f0e8/80', fontSize: '0.9rem' }}>{scene.story}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <Counter target={50} label="Thousand Photos" suffix="K+" />
          <Counter target={40} label="Countries" />
          <Counter target={200} label="Workshops" suffix="+" />
          <Counter target={15} label="Awards Won" />
        </div>
      </section>

      {/* MARQUEE */}
      <section style={{ padding: '3rem 0', backgroundColor: '#1a1f26', overflow: 'hidden' }}>
        <Marquee items={['Award Winning', 'Travel Stories', 'Expert Mentorship', 'Gallery Prints', 'World Explorer']} />
      </section>

      {/* GEAR GUIDE ACCORDION */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '2rem', textAlign: 'center', color: '#d4a96a' }}>
            GEAR GUIDE
          </h3>
        </Reveal>
        {gearGuide.map((gear, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <Accordion
              title={gear.category}
              content={gear.content}
              isOpen={openAccordion === `gear-${idx}`}
              onClick={() => setOpenAccordion(openAccordion === `gear-${idx}` ? null : `gear-${idx}`)}
            />
          </Reveal>
        ))}
      </section>

      {/* PRINT SHOP WITH SLIDER */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#1a1f26', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#d4a96a' }}>
            PRINT SHOP
          </h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {prints.map((print, idx) => (
            <Reveal key={print.id} delay={idx * 0.1}>
              <div style={{ backgroundColor: '#0d1117', padding: '2rem', borderRadius: '1rem', border: '1px solid #d4a96a30', textAlign: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'linear-gradient(135deg, #d4a96a, #9d7d4c)', borderRadius: '0.5rem', marginBottom: '1rem' }} />
                <h4 style={{ fontWeight: 'black', marginBottom: '1rem', color: '#f5f0e8' }}>{print.title}</h4>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#d4a96a', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    Select Size
                  </label>
                  <select
                    value={printSize}
                    onChange={(e) => setPrintSize(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      backgroundColor: '#1a1f26',
                      color: '#f5f0e8',
                      borderRadius: '0.5rem',
                      border: '1px solid #d4a96a30',
                      fontWeight: 'bold',
                    }}
                  >
                    {print.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <p style={{ color: '#d4a96a', fontWeight: 'black', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  ${printPrices[printSize]}
                </p>
                <motion.button whileHover={{ scale: 1.05 }} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#d4a96a', color: '#0d1117', borderRadius: '0.5rem', fontWeight: 'black', cursor: 'pointer' }}>
                  Add to Cart
                </motion.button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '3rem', textAlign: 'center', color: '#d4a96a' }}>
            CLIENT TESTIMONIALS
          </h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {testimonials.map((testimonial, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div style={{ backgroundColor: '#1a1f26', padding: '2rem', borderRadius: '1rem', border: '1px solid #d4a96a30' }}>
                <p style={{ color: '#d4a96a', marginBottom: '1rem', fontStyle: 'italic', fontWeight: 'bold' }}>"{testimonial.quote}"</p>
                <p style={{ fontWeight: 'black', color: '#f5f0e8' }}>— {testimonial.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '2rem', textAlign: 'center', color: '#d4a96a' }}>
            FAQ
          </h3>
        </Reveal>
        {faqs.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <Accordion title={faq.title} content={faq.content} isOpen={openAccordion === `faq-${idx}`} onClick={() => setOpenAccordion(openAccordion === `faq-${idx}` ? null : `faq-${idx}`)} />
          </Reveal>
        ))}
      </section>

      {/* NEWSLETTER CTA */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#1a1f26', color: '#0d1117', textAlign: 'center' }}>
        <Reveal>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 'black', marginBottom: '1rem', letterSpacing: '1px', color: '#d4a96a' }}>
            JOIN THE NOMAD COMMUNITY
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#f5f0e8' }}>Get exclusive tips, location guides, and workshop updates</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: '#f5f0e8',
                color: '#0d1117',
                outline: 'none',
                border: 'none',
              }}
            />
            <MagneticBtn onClick={() => {}}>Subscribe</MagneticBtn>
          </div>
        </Reveal>
      </section>

      {/* PHOTO DETAIL MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)} style={{ position: 'fixed', inset: 0, backgroundColor: '#00000080', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 60 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#1a1f26', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '90%', border: '1px solid #d4a96a30' }}>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 'black', marginBottom: '1rem', color: '#d4a96a' }}>{selectedPhoto?.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#d4a96a' }}>
                <MapPin size={18} />
                <p style={{ fontWeight: 'bold' }}>{selectedPhoto?.location}</p>
              </div>
              <p style={{ marginBottom: '1.5rem', color: '#f5f0e8/80', fontSize: '0.9rem' }}>Professional photography from a global expedition across 40+ countries.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setSelectedPhoto(null)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#d4a96a', color: '#0d1117', borderRadius: '0.5rem', fontWeight: 'black', cursor: 'pointer' }}>
                  View Print
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setSelectedPhoto(null)} style={{ flex: 1, padding: '0.75rem', backgroundColor: 'transparent', border: '2px solid #d4a96a', color: '#d4a96a', borderRadius: '0.5rem', fontWeight: 'black', cursor: 'pointer' }}>
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
