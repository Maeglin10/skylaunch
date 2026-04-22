"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const CONSENT_KEY = "aevia-cookie-consent";

const T = {
  fr: { text: "Nous utilisons des cookies fonctionnels pour améliorer votre expérience. Aucun cookie de tracking sans votre accord.", more: "En savoir plus", accept: "Accepter", reject: "Refuser", close: "Fermer" },
  en: { text: "We use functional cookies to improve your experience. No tracking cookies without your consent.", more: "Learn more", accept: "Accept", reject: "Decline", close: "Close" },
  es: { text: "Usamos cookies funcionales para mejorar tu experiencia. Sin cookies de rastreo sin tu consentimiento.", more: "Más información", accept: "Aceptar", reject: "Rechazar", close: "Cerrar" },
  de: { text: "Wir verwenden funktionale Cookies, um Ihre Erfahrung zu verbessern. Keine Tracking-Cookies ohne Ihre Zustimmung.", more: "Mehr erfahren", accept: "Akzeptieren", reject: "Ablehnen", close: "Schließen" },
  pt: { text: "Usamos cookies funcionais para melhorar sua experiência. Sem cookies de rastreamento sem seu consentimento.", more: "Saber mais", accept: "Aceitar", reject: "Recusar", close: "Fechar" },
};

export function CookieBanner() {
  const { locale } = useLang();
  const t = T[locale as keyof typeof T] ?? T.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
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
          aria-label={t.text}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-zinc-300 text-sm leading-relaxed">
                {t.text}{" "}
                <a href="/legal/cookies" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
                  {t.more}
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleChoice("declined")}
                className="px-4 py-2 rounded-full border border-zinc-600 text-zinc-300 hover:text-white hover:border-zinc-400 text-sm font-medium transition-colors"
              >
                {t.reject}
              </button>
              <button
                onClick={() => handleChoice("accepted")}
                className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
              >
                {t.accept}
              </button>
              <button
                onClick={() => setVisible(false)}
                className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={t.close}
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
