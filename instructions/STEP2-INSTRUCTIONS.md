# 🎖️ STEP 2 — NAVIGATION, LAYOUT & UI COMPONENTS

---

## Kya Karna Hai

### 1. Naye Files Copy Karo
ZIP extract karo aur apne existing project mein yeh files overwrite/add karo:

**New Files (copy karo `src/components/ui/` mein):**
```
src/components/ui/LoadingScreen.tsx    ← Cinematic boot-up animation
src/components/ui/Navbar.tsx           ← Tactical sidebar + mobile nav
src/components/ui/SectionHeader.tsx    ← Military style section titles
src/components/ui/SectionWrapper.tsx   ← Section container with scroll detection
src/components/ui/TacticalCard.tsx     ← Glowing hover card
src/components/ui/GlowBadge.tsx        ← Tag/badge component
src/components/ui/TacticalButton.tsx   ← Styled button with variants
src/components/ui/Timeline.tsx         ← Timeline for experience/education
src/components/ui/HudOverlay.tsx       ← HUD corners with clock & coords
src/components/ui/ScrollProgress.tsx   ← Green progress bar at top
src/components/ui/index.ts            ← Barrel export
```

**Updated Files (overwrite karo):**
```
src/app/page.tsx                       ← Full page with all sections
```

### 2. Dev Server Restart Karo
```bash
npm run dev
```

### 3. Browser mein Dekho — http://localhost:3000
Ab tujhe dikhega:
- ✅ Cinematic boot-up screen (terminal-style loading)
- ✅ Green progress bar boot animation
- ✅ Left sidebar navigation (desktop) with section links
- ✅ Mobile hamburger menu (responsive)
- ✅ HUD overlay — clock, coordinates, location
- ✅ Hero section — Name, typing animation, social links, CTA buttons
- ✅ About section — Operator profile card
- ✅ Experience section — TCS & Outlier cards
- ✅ Skills section — Grid of tech skills
- ✅ Projects section — 4 project cards (placeholder)
- ✅ Achievements section — 4 hackathon cards
- ✅ Contact section — Email & WhatsApp
- ✅ Scroll progress bar at very top
- ✅ Active section highlight in sidebar (scroll spy)
- ✅ Smooth scroll on nav click

---

## Step 2 Mein Kya Bana

| Component | Purpose |
|-----------|---------|
| LoadingScreen | Terminal-style boot animation with progress bar |
| Navbar | Left sidebar (desktop) + hamburger (mobile) with scroll spy |
| SectionHeader | "// SECTION_NAME" military header with divider |
| SectionWrapper | Section container that tracks scroll position |
| TacticalCard | Glowing card with corner accents |
| GlowBadge | Colored tag/badge (tactical/command/hud/alert) |
| TacticalButton | Styled button with 3 variants |
| Timeline | Vertical timeline for experience/education |
| HudOverlay | Clock, coordinates, location in corners |
| ScrollProgress | Top green progress bar on scroll |

---

## Aage Step 3 Mein Kya Hoga

Step 3 mein Hero section ko NEXT LEVEL banayenge:
- Particle/constellation background effect
- Animated rank/insignia graphic
- Staggered reveal animations
- Interactive elements
- Mobile-perfect responsive design

**Jab Step 2 wala page sahi dikh jaye, bol "Step 3"!** 🫡
