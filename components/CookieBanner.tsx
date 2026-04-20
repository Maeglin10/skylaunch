"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const CONSENT_KEY = "aevia-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          role="dialog"
          aria-live="polite"
          aria-label="Gestion des cookies"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-zinc-300 text-sm leading-relaxed">
                Nous utilisons des cookies fonctionnels pour améliorer votre expérience. Aucun cookie de tracking sans votre accord.{" "}
                <a
                  href="/legal/cookies"
                  className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
                >
                  En savoir plus
                </a>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleChoice("declined")}
                className="px-4 py-2 rounded-full border border-zinc-600 text-zinc-300 hover:text-white hover:border-zinc-400 text-sm font-medium transition-colors"
                aria-label="Refuser les cookies"
              >
                Refuser
              </button>
              <button
                onClick={() => handleChoice("accepted")}
                className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
                aria-label="Accepter les cookies"
              >
                Accepter
              </button>
              <button
                onClick={() => setVisible(false)}
                className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
