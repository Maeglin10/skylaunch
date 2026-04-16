import { motion } from "framer-motion";
import Link from "next/link";
import "../premium.css";

export default function EssentialSaaS() {
  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      {/* HEADER BLOCK */}
      <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-blue-600">TaskFlow</Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <Link href="#" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Testimonials</Link>
          </nav>
          <div className="flex gap-4">
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">Sign In</button>
            <button className="text-sm font-semibold bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Get Started</button>
          </div>
        </div>
      </header>

      {/* HERO BLOCK */}
      <section className="pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">v2.0 is now live</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
              Manage your team's work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">effortlessly.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              TaskFlow brings all your tasks, teammates, and tools together in one place. Keep everything organized and hit your deadlines with ease.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">Start 14-Day Free Trial</button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">Book a Demo</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE GRID BLOCK */}
      <section className="py-24 bg-slate-50 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">Powerful features to help your team move faster and stay aligned.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600 font-bold">0{i}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Collaboration</h3>
                <p className="text-slate-500 leading-relaxed">Work together with your team in real-time. See changes as they happen and never overlap on tasks again.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-blue-600/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to boost your productivity?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Join over 10,000 teams that use TaskFlow to manage their work and stay organized.</p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">Get Started for Free</button>
         </div>
      </section>
    </div>
  );
}
