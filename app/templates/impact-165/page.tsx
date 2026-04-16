import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialAppPromo() {
  return (
    <div className="bg-[#f4f7f6] text-[#2c3e50] min-h-screen font-sans selection:bg-[#1abc9c] selection:text-white">
      {/* HEADER BLOCK */}
      <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="w-10 h-10 bg-[#1abc9c] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#1abc9c]/30">V</div>
        <nav className="hidden md:flex gap-6 font-semibold text-sm">
            <Link href="#" className="hover:text-[#1abc9c] transition-colors">Features</Link>
            <Link href="#" className="hover:text-[#1abc9c] transition-colors">Reviews</Link>
            <Link href="#" className="hover:text-[#1abc9c] transition-colors">Support</Link>
        </nav>
        <button className="bg-[#2c3e50] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#1abc9c] transition-colors">Get the App</button>
      </header>

      {/* HERO BLOCK */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">Track your habits.<br/>Transform your life.</h1>
            <p className="text-xl text-[#7f8c8d] mb-10 leading-relaxed">Vita helps you build positive routines with beautiful tracking, detailed analytics, and gentle reminders.</p>
            <div className="flex gap-4">
                <button className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M15.155,15.748 c-0.12,0.197-0.373,0.258-0.57,0.138c-1.879-1.144-4.246-1.402-7.037-0.768c-0.222,0.05-0.443-0.089-0.493-0.312 c-0.05-0.223,0.089-0.443,0.312-0.493c3.042-0.693,5.644-0.395,7.747,0.887C15.311,15.319,15.372,15.572,15.155,15.748z M16.425,12.78 c-0.151,0.247-0.473,0.324-0.721,0.173c-2.146-1.32-5.438-1.705-8.082-0.932c-0.278,0.081-0.569-0.078-0.649-0.355 c-0.081-0.278,0.078-0.569,0.355-0.649c3.023-0.885,6.812-0.447,9.27,1.065C16.845,12.233,16.921,12.556,16.425,12.78z M16.541,9.658 C13.931,8.109,9.458,7.954,6.444,8.87c-0.334,0.102-0.69-0.086-0.792-0.42c-0.102-0.334,0.086-0.69,0.42-0.792 c3.461-1.049,8.411-0.875,11.391,0.895c0.301,0.179,0.401,0.569,0.223,0.87C17.509,9.724,17.119,9.824,16.541,9.658z"/></svg>
                    <div className="text-left font-sans">
                        <div className="text-[10px] leading-tight">Download on the</div>
                        <div className="text-sm font-bold leading-tight">App Store</div>
                    </div>
                </button>
            </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center">
            {/* Phone Mockup Placeholder */}
            <div className="w-[300px] h-[600px] bg-white rounded-[3rem] shadow-2xl border-8 border-white p-2 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-white rounded-b-xl shrink-0 z-10" />
                <Image src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600" alt="App Screen" fill className="object-cover rounded-[2.2rem]" />
            </div>
            
            {/* Floating generic widgets */}
            <div className="absolute top-24 -left-12 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce">
                <div className="w-10 h-10 bg-[#1abc9c]/20 rounded-full flex items-center justify-center text-[#1abc9c]">🔥</div>
                <div>
                    <div className="text-sm font-bold">12 Day Streak!</div>
                    <div className="text-xs text-[#7f8c8d]">Keep it up</div>
                </div>
            </div>
        </motion.div>
      </section>

      {/* THREE STEPS BLOCK */}
      <section className="bg-white py-24 px-6 border-y border-[#ecf0f1]">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-16">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                    { title: "1. Set Goals", desc: "Choose habits you want to build or break. Keep them realistic." },
                    { title: "2. Track Daily", desc: "Log your progress with a single tap. It takes 2 seconds." },
                    { title: "3. See Results", desc: "Watch your consistency grow through beautiful charts." }
                ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#f4f7f6] rounded-2xl flex items-center justify-center text-[#1abc9c] font-bold text-2xl mb-6">{i+1}</div>
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-[#7f8c8d]">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
