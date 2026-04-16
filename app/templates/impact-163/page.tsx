import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialPersonalBlog() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-serif selection:bg-gray-200">
      {/* HEADER BLOCK */}
      <header className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center border-b border-gray-200 mb-12">
        <Link href="/" className="text-4xl font-black tracking-tight mb-4 text-center">Julian Parker.</Link>
        <p className="text-gray-500 italic text-lg text-center">Thoughts on design, minimalism, and digital life.</p>
        <nav className="flex gap-6 mt-8 text-sm font-sans font-bold uppercase tracking-widest text-gray-400">
          <Link href="#" className="hover:text-gray-900 transition-colors">Articles</Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">About</Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">Newsletter</Link>
        </nav>
      </header>

      {/* MAIN CONTENT BLOCK */}
      <main className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 pb-24">
         
         {/* ARTICLE LIST */}
         <div className="md:col-span-2 space-y-16">
            {[
                { title: "The Quiet Art of Doing Less", date: "April 12, 2026", excerpt: "In a world screaming for our attention, sometimes the most radical act is to simply pause and remove the non-essential." },
                { title: "Typography as Interface", date: "April 05, 2026", excerpt: "How the spaces between letters can communicate more about your brand than the actual words you write." },
                { title: "Reflections on Remote Work", date: "March 28, 2026", excerpt: "Three years into the great remote experiment, what have we actually learned about asynchronous communication?" }
            ].map((post, i) => (
                <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <span className="text-sm text-gray-400 font-sans tracking-widest uppercase mb-2 block">{post.date}</span>
                    <h2 className="text-3xl font-bold mb-4 hover:underline cursor-pointer decoration-gray-300">{post.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
                    <Link href="#" className="text-sm font-sans font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors">Read More &rarr;</Link>
                </motion.article>
            ))}
         </div>

         {/* SIDEBAR */}
         <aside className="space-y-12">
            <div>
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm text-gray-400 mb-6 pb-2 border-b border-gray-200">About Me</h3>
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                    <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" alt="Julian Parker" fill className="object-cover grayscale" />
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">I'm a designer and writer living in Portland. I write about finding clarity through subtraction.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm text-gray-900 mb-2">Subscribe</h3>
                <p className="text-gray-500 text-sm mb-4">Get new essays delivered to your inbox.</p>
                <input type="email" placeholder="Your email address" className="w-full px-4 py-2 text-sm border border-gray-200 rounded mb-3 font-sans focus:outline-none focus:border-gray-400" />
                <button className="w-full bg-gray-900 text-white font-sans font-bold text-xs uppercase tracking-widest py-3 rounded hover:bg-gray-700 transition-colors">Subscribe</button>
            </div>
         </aside>
      </main>

      <footer className="border-t border-gray-200 py-12 text-center">
        <p className="text-sm text-gray-400 font-sans">&copy; 2026 Julian Parker. All rights reserved.</p>
      </footer>
    </div>
  );
}
