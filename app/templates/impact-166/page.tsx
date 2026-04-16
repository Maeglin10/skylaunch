import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "../premium.css";

export default function EssentialPhotography() {
  return (
    <div className="bg-[#111] text-white min-h-screen font-sans">
      {/* HEADER BLOCK */}
      <header className="px-6 py-8 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="font-bold tracking-widest text-lg uppercase">N.Studio</Link>
        <nav className="flex gap-6 text-xs uppercase tracking-widest text-white/50">
          <Link href="#" className="hover:text-white transition-colors">Portraits</Link>
          <Link href="#" className="hover:text-white transition-colors">Landscapes</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </nav>
      </header>

      {/* GALLERY BLOCK */}
      <main className="p-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
                "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1516106649774-4b533e7216a9?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1528612198083-d34346808795?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1506744626753-1fa44df31c2f?auto=format&fit=crop&q=80&w=800"
            ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative group overflow-hidden bg-white/5 break-inside-avoid">
                    <Image src={img} alt="Photograph" width={800} height={1200} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white text-xs tracking-[0.2em] uppercase font-bold border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer">View Image</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </main>

      <footer className="text-center py-12 text-white/40 text-xs tracking-widest uppercase">
        <p>&copy; 2026 N.Studio Photography</p>
      </footer>
    </div>
  );
}
