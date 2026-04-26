"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Utensils, Clock, MapPin, X, Check, Users, Calendar, ChefHat } from "lucide-react";

const MENU_DATA = {
  Entrees: [
    { name: "Roasted Beetroot", desc: "Whipped goat cheese, candied walnuts, balsamic reduction.", price: 16 },
    { name: "Scallop Carpaccio", desc: "Citrus dressing, chili, micro-herbs.", price: 22 },
    { name: "Wild Mushroom Arancini", desc: "Truffle aioli, parmesan snow.", price: 18 },
  ],
  Plats: [
    { name: "Pan-Seared Sea Bass", desc: "Lemon risotto, asparagus, caper butter sauce.", price: 34 },
    { name: "Herb-Crusted Lamb Rack", desc: "Dauphinoise potatoes, mint jus, heirloom carrots.", price: 42 },
    { name: "Truffle Tagliatelle", desc: "Handmade pasta, wild mushrooms, aged parmesan.", price: 28 },
  ],
  Desserts: [
    { name: "Dark Chocolate Fondant", desc: "Salted caramel core, vanilla bean gelato.", price: 14 },
    { name: "Lemon Myrtle Posset", desc: "Shortbread crumble, fresh berries.", price: 12 },
    { name: "Selection of Fine Cheeses", desc: "Quince paste, artisan crackers.", price: 18 },
  ]
};

export function RestaurantTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";
  
  const [activeTab, setActiveTab] = useState<keyof typeof MENU_DATA>("Entrees");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={formData.heroImageUrl || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=80"} 
            className="w-full h-full object-cover brightness-50" 
          />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl px-6">
          <Reveal>
            <div className="w-20 h-[1px] bg-white/40 mx-auto mb-8" />
            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter uppercase italic leading-none">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light italic mb-12 max-w-2xl mx-auto">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => setIsBookingOpen(true)}
                style={{ background: brand }}
                className="px-10 py-5 text-white font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-2xl"
              >
                Reserve a Table
              </button>
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-100 transition-all"
              >
                View The Menu
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-12 bg-zinc-900 text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50"><MapPin className="w-4 h-4 text-white" /> {formData.city}</div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50"><Clock className="w-4 h-4 text-white" /> Tue - Sun: 18:00 - 23:00</div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50"><Utensils className="w-4 h-4 text-white" /> Fine Dining</div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-6">Our Story // Heritage</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">Culinary Art In Every Plate.</h2>
              <p className="text-xl text-zinc-500 leading-relaxed italic mb-12">
                {c?.aboutText}
              </p>
              <div className="flex gap-12 items-center">
                <div className="flex flex-col gap-2">
                  <div className="text-4xl font-black italic">12</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Years Exp</div>
                </div>
                <div className="w-[1px] h-12 bg-zinc-200" />
                <div className="flex flex-col gap-2">
                  <div className="text-4xl font-black italic">4.9</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Stars Rating</div>
                </div>
              </div>
            </Reveal>
            
            <div className="flex gap-6 h-[600px]">
              <motion.div 
                whileHover={{ flex: 1.5 }}
                className="flex-1 h-full overflow-hidden rounded-3xl transition-all duration-700"
              >
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                whileHover={{ flex: 1.5 }}
                className="flex-1 h-full overflow-hidden rounded-3xl transition-all duration-700"
              >
                <img src="https://images.unsplash.com/photo-1550966841-3ee7adac1668?w=800&q=80" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">Seasonal Menu</h2>
            <div className="flex justify-center gap-10 border-b">
              {Object.keys(MENU_DATA).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-black' : 'text-zinc-300'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-black" 
                    />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {MENU_DATA[activeTab].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                  <div className="text-left">
                    <h3 className="text-xl font-bold uppercase group-hover:italic transition-all">{item.name}</h3>
                    <p className="text-zinc-400 font-light italic text-sm">{item.desc}</p>
                  </div>
                  <div className="w-full md:w-auto flex items-center gap-4">
                    <div className="hidden md:block flex-1 h-[1px] bg-zinc-100 min-w-[50px] group-hover:min-w-[100px] transition-all" />
                    <span className="text-xl font-black" style={{ color: brand }}>${item.price}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="fixed inset-0 bg-black/80 z-[2000] backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white z-[2001] rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-12">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-6 h-6" style={{ color: brand }} />
                    <span className="font-black uppercase tracking-widest">Table Reservation</span>
                  </div>
                  <button onClick={() => setIsBookingOpen(false)} className="hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>
                </div>

                {bookingStep === 1 ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Date</label>
                        <div className="flex items-center gap-3 p-4 bg-zinc-50 border rounded-xl">
                          <Calendar className="w-4 h-4" />
                          <input type="date" className="bg-transparent text-sm font-bold outline-none w-full" defaultValue="2026-05-20" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Guests</label>
                        <div className="flex items-center gap-3 p-4 bg-zinc-50 border rounded-xl">
                          <Users className="w-4 h-4" />
                          <select className="bg-transparent text-sm font-bold outline-none w-full">
                            <option>2 People</option>
                            <option>4 People</option>
                            <option>6 People</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setBookingStep(2)}
                      style={{ background: brand }}
                      className="w-full py-5 text-white font-bold uppercase tracking-[0.2em] text-xs shadow-xl hover:brightness-110 transition-all"
                    >
                      Check Availability
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-emerald-50 text-emerald-500">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Table Confirmed!</h3>
                    <p className="text-zinc-400 mb-12">We&apos;ve sent a confirmation email to your inbox.<br/>See you at {formData.businessName}.</p>
                    <button 
                      onClick={() => { setIsBookingOpen(false); setBookingStep(1); }}
                      className="px-12 py-4 border font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 transition-colors"
                    >
                      Back to Site
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ThemeWrapper>
  );
}
