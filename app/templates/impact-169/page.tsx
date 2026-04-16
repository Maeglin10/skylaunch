import { motion } from "framer-motion";
import Link from "next/link";
import "../premium.css";

export default function EssentialNewsletter() {
  return (
    <div className="bg-[#FAF9F6] text-[#2c3e50] min-h-screen font-serif flex flex-col justify-center items-center px-6">
      <main className="max-w-2xl w-full mx-auto text-center py-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 mx-auto mb-8 bg-[#2c3e50] text-[#FAF9F6] rounded-full flex items-center justify-center font-bold text-2xl italic">L.</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">Better writing.<br/>Better thinking.</h1>
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed font-sans max-w-lg mx-auto">
                Join 15,000+ readers getting a weekly dispatch on clarity, creativity, and the craft of writing. Sent every Sunday.
            </p>
            
            <form className="max-w-md mx-auto mb-6 flex flex-col sm:flex-row gap-3">
                <input 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    className="flex-1 px-5 py-4 border border-gray-300 rounded-lg outline-none font-sans focus:border-[#2c3e50] focus:ring-1 focus:ring-[#2c3e50] transition-all"
                />
                <button type="submit" className="bg-[#2c3e50] text-white px-8 py-4 rounded-lg font-bold font-sans hover:bg-black transition-colors">Subscribe</button>
            </form>
            <p className="text-sm text-gray-400 font-sans">No spam. Unsubscribe anytime.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-24 pt-12 border-t border-gray-200">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 font-sans mb-8">Recently Published</h2>
            <div className="space-y-6 text-left max-w-lg mx-auto">
                {["The Illusion of Writer's Block", "Why We Read (And Why We Forget)", "Structuring the Messy Middle"].map((title, i) => (
                    <Link href="#" key={i} className="block group">
                        <h3 className="text-lg font-bold group-hover:text-amber-700 transition-colors">{title}</h3>
                        <p className="text-sm text-gray-500 font-sans">Read in 4 minutes</p>
                    </Link>
                ))}
            </div>
        </motion.div>
      </main>
    </div>
  );
}
