# Prompt d'élévation templates — Skylaunch Impact Vault

## Contexte

Tu travailles dans le projet Next.js situé à `/Users/milliandvalentin/skylaunch`.

Il s'agit d'une galerie de thèmes premium pour un site builder IA. Chaque template est un fichier `app/templates/impact-XX/page.tsx` qui représente une vraie landing page de qualité professionnelle.

**Objectif :** Réécrire chaque template ci-dessous pour atteindre le niveau "$10k website" — des sites qui ressemblent à des productions agences à 10 000€.

---

## Standards de qualité ($10k level)

### Cible : 700–900 lignes par fichier

### Sections obligatoires (les 9, dans cet ordre) :
1. **Navbar sticky** — logo + liens nav + CTA button + menu mobile via `<Sheet>`
2. **Hero avec parallax** — `useScroll` + `useTransform` sur le background Y, headline animé en stagger, 2 boutons CTA, floating stat cards glassmorphism
3. **Stats bar** — 5-6 métriques réelles et spécifiques au secteur
4. **Features avec Tabs** — 3+ onglets, chacun avec icon Lucide + titre + description + liste à puces
5. **Testimonials Carousel** — 4-5 témoignages avec `<Avatar>`, nom, rôle, étoiles rating
6. **Pricing** — 3 tiers avec listes de features, tier recommandé mis en avant
7. **FAQ Accordion** — 6+ questions réalistes et spécifiques au secteur
8. **CTA Banner** — gradient bold, texte percutant, bouton primary
9. **Footer** — logo + colonnes liens + icônes sociales Lucide

### Ce qui rend un site $10k :
- **Parallax hero** : `useScroll` + `useTransform` → le background scroll à vitesse différente
- **Micro-interactions** : hover `scale + glow + color shift` sur tous les éléments cliquables
- **Spring physics** : `useSpring` + `useMotionValue` pour les animations magnétiques
- **Données ultra-réelles** : noms de sociétés inventés mais crédibles, % précis, montants $, noms de personnes pour les témoignages
- **Glassmorphism** : `bg-white/10 backdrop-blur-md` sur les cards flottantes
- **Depth** : shadows, borders subtiles `border-white/10`, gradient meshes en arrière-plan

---

## Stack obligatoire (chaque fichier commence par exactement ceci)

```tsx
"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
```

## Composant Reveal (inclure dans chaque fichier)

```tsx
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

## Règles UI/UX

- `cursor-pointer` sur TOUS les éléments cliquables
- `style={{ overflowX: "hidden", scrollBehavior: "smooth" }}` sur le wrapper div principal
- `transition-all duration-200` sur tous les états hover
- **Icônes Lucide uniquement** — jamais d'emoji comme icônes
- Contraste texte : `white` sur fond sombre, `slate-900` sur fond clair (minimum 4.5:1)
- Images : `https://images.unsplash.com/photo-[ID_VALIDE]?w=800&q=80`

---

## Templates restants à élever (31 au total)

> **Important** : lire le fichier existant avant de réécrire pour conserver le thème/secteur/brand. Juste tout élever dramatiquement.

### Batch 1 — impact-55, 56, 57, 58, 59
```
/Users/milliandvalentin/skylaunch/app/templates/impact-55/page.tsx  (Maison Aurum — montres de luxe)
/Users/milliandvalentin/skylaunch/app/templates/impact-56/page.tsx  (Château Vestige — vins fins)
/Users/milliandvalentin/skylaunch/app/templates/impact-57/page.tsx  (Stryde Tech — sports performance)
/Users/milliandvalentin/skylaunch/app/templates/impact-58/page.tsx  (VOID Agency — agence créative)
/Users/milliandvalentin/skylaunch/app/templates/impact-59/page.tsx  (Luminal Retreats — wellness retreats)
```
→ `git add app/templates/impact-5{5,6,7,8,9} && git commit -m "feat: elevate impact-55-59 to $10k level" && git push`

### Batch 2 — impact-62, 63, 70, 72, 75
```
/Users/milliandvalentin/skylaunch/app/templates/impact-62/page.tsx  (Satori — restaurant gastronomique)
/Users/milliandvalentin/skylaunch/app/templates/impact-63/page.tsx  (KryptaX — crypto trading)
/Users/milliandvalentin/skylaunch/app/templates/impact-70/page.tsx  (lire le fichier)
/Users/milliandvalentin/skylaunch/app/templates/impact-72/page.tsx  (lire le fichier)
/Users/milliandvalentin/skylaunch/app/templates/impact-75/page.tsx  (lire le fichier)
```
→ `git commit -m "feat: elevate impact-62-75 batch"`

### Batch 3 — impact-87, 88, 91, 95, 96
```
/Users/milliandvalentin/skylaunch/app/templates/impact-87/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-88/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-91/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-95/page.tsx
```
→ `git commit -m "feat: elevate impact-87-95 batch"`

### Batch 4 — impact-113, 114, 115, 126, 130
```
/Users/milliandvalentin/skylaunch/app/templates/impact-113/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-114/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-115/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-126/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-130/page.tsx
```
→ `git commit -m "feat: elevate impact-113-130 batch"`

### Batch 5 — impact-131, 133, 135, 136, 140
```
/Users/milliandvalentin/skylaunch/app/templates/impact-131/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-133/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-135/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-136/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-140/page.tsx
```
→ `git commit -m "feat: elevate impact-131-140 batch"`

### Batch 6 — impact-141, 145, 147, 148, 149
```
/Users/milliandvalentin/skylaunch/app/templates/impact-141/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-145/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-147/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-148/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-149/page.tsx
```
→ `git commit -m "feat: elevate impact-141-149 batch"`

### Batch 7 — impact-150, 151
```
/Users/milliandvalentin/skylaunch/app/templates/impact-150/page.tsx
/Users/milliandvalentin/skylaunch/app/templates/impact-151/page.tsx
```
→ `git commit -m "feat: elevate impact-150-151 batch"`

---

## Après chaque batch : mettre à jour app/themes/page.tsx

Dans le fichier `app/themes/page.tsx`, trouve la constante `HIDDEN_IMPACT` et **supprime les IDs des templates que tu viens d'élever** (ceux qui atteignent 650+ lignes). Cela les rend visibles dans la galerie.

### IDs actuellement dans HIDDEN à retirer progressivement :
```
"impact-55","impact-56","impact-57","impact-58","impact-59",
"impact-62","impact-63","impact-70","impact-72","impact-75",
"impact-87","impact-88","impact-91","impact-95",
"impact-113","impact-114","impact-115",
"impact-126","impact-130","impact-131","impact-133","impact-135","impact-136",
"impact-140","impact-141","impact-145","impact-147","impact-148","impact-149","impact-150","impact-151",
```

---

## Vérification finale

Après chaque template réécrit :
```bash
wc -l /Users/milliandvalentin/skylaunch/app/templates/impact-XX/page.tsx
# Doit être >= 650 lignes
```

Si < 650 lignes → continuer à enrichir (ajouter des données, des sections, des témoignages supplémentaires).

---

*Généré le 2026-05-03 — Skylaunch Impact Vault Elevation Project*
