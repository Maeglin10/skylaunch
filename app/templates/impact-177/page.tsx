import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialPodcast() {
  return (
    <div className="bg-[#1e1b4b] text-indigo-50 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      {/* HEADER */}
      <header className="px-6 py-8 flex justify-between items-center max-w-5xl mx-auto border-b border-indigo-900">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
            </div>
            <div className="font-black text-xl italic tracking-tight">AudioWaves</div>
        </div>
        <nav className="flex gap-6 text-sm font-bold uppercase tracking-widest text-indigo-300">
            <Link href="#" className="hover:text-white transition">Episodes</Link>
            <Link href="#" className="hover:text-white transition">About</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 py-20 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/50 border-4 border-indigo-800">
             <Image src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Podcast Cover" fill className="object-cover" />
        </motion.div>
        <div className="flex-1 text-center md:text-left">
            <div className="bg-indigo-900 text-indigo-200 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-6">New Episode Out Now</div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Deep conversations with creators.</h1>
            <p className="text-lg text-indigo-200 mb-10 leading-relaxed">Join us every week as we deconstruct the habits, routines, and workflows of world-class designers and engineers.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-400 transition-colors flex items-center gap-2">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                     Listen Latest
                </button>
                <button className="bg-indigo-900 border border-indigo-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-800 transition-colors">Subscribe</button>
            </div>
        </div>
      </section>

      {/* EPISODES LIST */}
      <section className="bg-indigo-950 py-24 px-6 border-t border-indigo-900">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Recent Episodes</h2>
            <div className="space-y-6">
                {[
                    { ep: "042", title: "Building in Public with Sarah Drasner", date: "Oct 12, 2026", dur: "45 min" },
                    { ep: "041", title: "The Future of React & Next.js", date: "Oct 05, 2026", dur: "52 min" },
                    { ep: "040", title: "Design Systems at Scale", date: "Sep 28, 2026", dur: "38 min" },
                    { ep: "039", title: "Mental Health for Indie Hackers", date: "Sep 21, 2026", dur: "60 min" }
                ].map((ep, i) => (
                    <div key={i} className="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-800 hover:bg-indigo-800/50 flex flex-col sm:flex-row gap-6 sm:items-center cursor-pointer transition-colors group">
                        <div className="w-16 h-16 bg-indigo-950 rounded-xl flex items-center justify-center font-black text-xl text-indigo-400 shrink-0">
                            {ep.ep}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{ep.title}</h3>
                            <div className="text-sm font-semibold text-indigo-400">{ep.date} • {ep.dur}</div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-indigo-500 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
