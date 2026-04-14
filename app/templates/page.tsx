"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TEMPLATES_REGISTRY } from "@/lib/templates/registry";
import "./premium.css";

export default function TemplatesGallery() {
  return (
    <div className="premium-theme bg-black text-white min-h-screen p-12 md:p-24">
      <header className="mb-24 flex justify-between items-end">
        <div>
          <span className="text-premium-accent text-xs uppercase tracking-[0.5em] font-bold mb-4 block">Premium Assets</span>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter">
            Template <br /> <span className="italic opacity-30 italic">Vault.</span>
          </h1>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-4xl font-bold mb-2">160 / 200</div>
          <div className="text-[10px] uppercase tracking-widest opacity-40">Active Prototypes</div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES_REGISTRY.map((template, index) => {
          const isImplemented = ["impact-01", "impact-02", "impact-03", "impact-04", "impact-05", "impact-06", "impact-07", "impact-08", "impact-09", "impact-10", "impact-11", "impact-12", "impact-13", "impact-14", "impact-15", "impact-16", "impact-17", "impact-18", "impact-19", "impact-20", "impact-21", "impact-22", "impact-23", "impact-24", "impact-25", "impact-26", "impact-27", "impact-28", "impact-29", "impact-30", "impact-31", "impact-32", "impact-33", "impact-34", "impact-35", "impact-36", "impact-37", "impact-38", "impact-39", "impact-40", "impact-41", "impact-42", "impact-43", "impact-44", "impact-45", "impact-46", "impact-47", "impact-48", "impact-49", "impact-50", "impact-51", "impact-52", "impact-53", "impact-54", "impact-55", "impact-56", "impact-57", "impact-58", "impact-59", "impact-60", "impact-61", "impact-62", "impact-63", "impact-64", "impact-65", "impact-66", "impact-67", "impact-68", "impact-69", "impact-70", "impact-71", "impact-72", "impact-73", "impact-74", "impact-75", "impact-76", "impact-77", "impact-78", "impact-79", "impact-80", "impact-81", "impact-82", "impact-83", "impact-84", "impact-85", "impact-86", "impact-87", "impact-88", "impact-89", "impact-90", "impact-91", "impact-92", "impact-93", "impact-94", "impact-95", "impact-96", "impact-97", "impact-98", "impact-99", "impact-100", "impact-101", "impact-102", "impact-103", "impact-104", "impact-105", "impact-106", "impact-107", "impact-108", "impact-109", "impact-110", "impact-111", "impact-112", "impact-113", "impact-114", "impact-115", "impact-116", "impact-117", "impact-118", "impact-119", "impact-120", "impact-121", "impact-122", "impact-123", "impact-124", "impact-125", "impact-126", "impact-127", "impact-128", "impact-129", "impact-130", "impact-131", "impact-132", "impact-133", "impact-134", "impact-135", "impact-136", "impact-137", "impact-138", "impact-139", "impact-140", "impact-141", "impact-142", "impact-143", "impact-144", "impact-145", "impact-146", "impact-147", "impact-148", "impact-149", "impact-150", "impact-151", "impact-152", "impact-153", "impact-154", "impact-155", "impact-156", "impact-157", "impact-158", "impact-159", "impact-160"].includes(template.id);
          
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group glass p-8 flex flex-col justify-between min-h-[400px] border-white/5 transition-all duration-500 ${
                isImplemented ? "hover:border-premium-accent/50 hover:bg-premium-accent/5" : "opacity-40 grayscale pointer-events-none"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white/10 rounded-full">
                    {template.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest opacity-40">
                    ID: {template.id}
                  </span>
                </div>
                <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter group-hover:text-premium-accent transition-colors">
                  {template.name}
                </h2>
                <p className="text-sm opacity-60 leading-relaxed max-w-xs capitalize">
                  {template.description}
                </p>
              </div>

              <div className="flex justify-between items-end mt-12">
                <div className="flex gap-2">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase tracking-widest opacity-30">#{tag}</span>
                  ))}
                </div>
                {isImplemented ? (
                  <Link 
                    href={`/templates/${template.id}`}
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-30">In Development</div>
                )}
              </div>
            </motion.div>
          );
        })}
        
        {/* Placeholder for scaling */}
        <div className="md:col-span-2 lg:col-span-3 h-48 border border-dashed border-white/10 flex items-center justify-center">
            <div className="text-center">
                <div className="text-xs uppercase tracking-[0.5em] opacity-20 mb-4 italic">Next 195 templates in generation queue...</div>
                <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/4 h-full bg-premium-accent animate-scan"></div>
                </div>
            </div>
        </div>
      </div>

      <footer className="mt-48 pt-12 border-t border-white/10 flex justify-between items-center opacity-40 text-[10px] uppercase tracking-widest font-black">
        <div>AeviaLaunch Premium Assets</div>
        <div>Spring 2026 Collection</div>
      </footer>
    </div>
  );
}
