import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialConsultantCV() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-indigo-600 selection:text-white">
      <main className="max-w-4xl mx-auto bg-white min-h-screen shadow-xl shadow-slate-200/50">
        {/* HEADER PROFILE */}
        <header className="px-8 py-16 md:px-16 border-b border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg shrink-0 border-4 border-white">
                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" alt="Profile" fill className="object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-slate-900">David Mitchell</h1>
                <h2 className="text-xl text-indigo-600 font-semibold mb-6">Fractional CMO & Strategy Consultant</h2>
                <p className="text-slate-600 leading-relaxed mb-6">Partnering with series A/B SaaS startups to build scalable growth engines, establish market positioning, and lead high-performing marketing teams.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button className="bg-slate-900 text-white px-6 py-2 rounded font-bold text-sm hover:bg-indigo-600 transition-colors">Book Consultation</button>
                    <button className="border border-slate-200 text-slate-700 px-6 py-2 rounded font-bold text-sm hover:bg-slate-50 transition-colors">Download CV</button>
                </div>
            </div>
        </header>

        <div className="flex flex-col md:flex-row">
            {/* MAIN CONTENT COLUMN */}
            <div className="flex-[2] p-8 md:p-16 border-r border-slate-100">
                <section className="mb-16">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-indigo-600"></span> Experience
                    </h3>
                    <div className="space-y-10">
                        {[
                            { role: "Fractional CMO", comp: "TechFlow Inc.", time: "2023 - Present", desc: "Led go-to-market strategy for enterprise tier. Scaled marketing pipeline by 150% in 12 months." },
                            { role: "VP of Marketing", comp: "CloudSync", time: "2020 - 2023", desc: "Managed a team of 15 across demand gen, product marketing, and brand. Instrumental in series B raise." },
                            { role: "Director of Growth", comp: "DataNova", time: "2017 - 2020", desc: "Built the initial growth loop resulting in 1M+ active users within first two years." }
                        ].map((job, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-100 pb-2">
                                <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7px] top-2 border-2 border-white"></div>
                                <h4 className="text-lg font-bold text-slate-900">{job.role}</h4>
                                <div className="text-sm text-slate-500 font-semibold mb-3">{job.comp} • {job.time}</div>
                                <p className="text-slate-600 text-sm leading-relaxed">{job.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-indigo-600"></span> Selected Case Studies
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: "Scaling from $1M to $10M ARR", desc: "Implemented a PLG + Sales Assist hybrid model." },
                            { title: "Brand Repositioning", desc: "Moved from mid-market to enterprise focus." }
                        ].map((caseStudy, i) => (
                            <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                                <h4 className="font-bold mb-2">{caseStudy.title}</h4>
                                <p className="text-sm text-slate-600">{caseStudy.desc}</p>
                                <div className="mt-4 text-indigo-600 text-sm font-bold">Read Case Study →</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* SIDEBAR COLUMN */}
            <div className="flex-1 p-8 md:p-12 bg-slate-50/50">
                <section className="mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Expertise</h3>
                    <div className="space-y-4">
                        {[
                            { skill: "Go-to-Market Strategy", level: "95%" },
                            { skill: "Team Leadership", level: "90%" },
                            { skill: "Demand Generation", level: "85%" },
                            { skill: "Product Marketing", level: "80%" }
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm font-semibold mb-1 text-slate-700">
                                    <span>{s.skill}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: s.level }} viewport={{ once: true }} className="h-full bg-indigo-600 rounded-full"></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Contact & Connect</h3>
                    <div className="space-y-3 text-sm font-semibold text-slate-700">
                        <div className="flex items-center gap-3"><span className="w-5 text-indigo-600">@</span> david@example.com</div>
                        <div className="flex items-center gap-3"><span className="w-5 text-indigo-600">in</span> linkedin.com/in/david</div>
                        <div className="flex items-center gap-3"><span className="w-5 text-indigo-600">t</span> @davidm_growth</div>
                    </div>
                </section>
            </div>
        </div>
      </main>
    </div>
  );
}
