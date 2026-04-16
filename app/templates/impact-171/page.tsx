import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialMedical() {
  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      {/* TOP BAR */}
      <div className="bg-emerald-600 text-white text-sm py-2 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <div>Emergency: (555) 123-4567</div>
        <div className="hidden md:block">Mon-Fri: 8am - 8pm | Sat-Sun: 9am - 2pm</div>
      </div>

      {/* HEADER */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto border-b border-slate-100 sticky top-0 bg-white z-50">
        <Link href="/" className="font-bold text-2xl text-emerald-800 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded uppercase text-lg">+</div> NovaClinic
        </Link>
        <nav className="hidden md:flex gap-6 font-semibold text-slate-600">
          <Link href="#" className="hover:text-emerald-600">Specialties</Link>
          <Link href="#" className="hover:text-emerald-600">Our Doctors</Link>
          <Link href="#" className="hover:text-emerald-600">Patient Info</Link>
        </nav>
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition">Book Appointment</button>
      </header>

      {/* HERO SECTION */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Welcome to NovaClinic</span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">Advanced Care.<br/>Compassionate Healing.</h1>
                <p className="text-lg text-slate-600">Your health is our priority. We offer comprehensive medical services with a focus on patient-centered care and modern technology.</p>
                <div className="flex gap-4 pt-4">
                    <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200">Our Services</button>
                    <button className="bg-white text-emerald-700 border border-emerald-200 px-8 py-3 rounded-lg font-bold hover:bg-slate-50">Find a Doctor</button>
                </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=1000" alt="Doctor" fill className="object-cover" />
            </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Centers of Excellence</h2>
            <p className="text-slate-600">We provide specialized care across multiple medical disciplines using state-of-the-art facilities.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Cardiology", desc: "Advanced heart care including diagnostics, interventional procedures, and rehabilitation." },
                { title: "Neurology", desc: "Expert treatment for brain, spinal cord, and nervous system disorders." },
                { title: "Pediatrics", desc: "Comprehensive healthcare for infants, children, and adolescents." },
                { title: "Orthopedics", desc: "Specialized care for bones, joints, ligaments, tendons, and muscles." },
                { title: "Oncology", desc: "Cutting-edge cancer treatments and compassionate support services." },
                { title: "General Surgery", desc: "Minimally invasive and standard surgical procedures." }
            ].map((service, i) => (
                <div key={i} className="p-8 border border-slate-200 rounded-xl hover:shadow-lg transition flex flex-col gap-4 bg-white cursor-pointer group">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition">H</div>
                    <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                    <div className="mt-auto pt-4 text-emerald-600 font-bold text-sm">Learn more &rarr;</div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
