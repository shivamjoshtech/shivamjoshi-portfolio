# 🎖️ STEP 3 — HERO SECTION UPGRADE (Individual Files)

---

## NAYE FOLDERS BANAO

Pehle yeh folder create karo apne project mein:
```
src/components/sections/hero/
```

Terminal mein (project root se):
```bash
mkdir -p src/components/sections/hero
```

---

## FILES KAHAN RAKHNI HAIN

### 1. `ParticleField.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/hero/ParticleField.tsx`
**Kya hai:** Interactive particle/constellation background — mouse move pe particles react karte hain, connections banti hain

### 2. `RadarPing.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/hero/RadarPing.tsx`
**Kya hai:** Rotating radar sweep animation with blips — military command center feel

### 3. `RankInsignia.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/hero/RankInsignia.tsx`
**Kya hai:** Animated hexagonal rank badge with "SJ" — rotating outer ring, pulsing dots

### 4. `HeroStats.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/hero/HeroStats.tsx`
**Kya hai:** Animated number counters — 200+ Man-Hours Saved, 8+ Months, 4 Hackathons, 30+ Tech

### 5. `FloatingTerminal.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/hero/FloatingTerminal.tsx`
**Kya hai:** Bottom-right floating terminal widget — auto-types commands like `whoami`, `cat skills.txt` etc.

### 6. `page.tsx` → REPLACE (PURANI FILE DELETE KARO)
**Replace karo:** `src/app/page.tsx`
**Kya hua:** Hero section mein sab naye components integrate ho gaye — ParticleField, RadarPing, RankInsignia, HeroStats, FloatingTerminal + glitch text effect on name

---

## FOLDER STRUCTURE AFTER STEP 3

```
src/
├── components/
│   ├── sections/
│   │   └── hero/
│   │       ├── ParticleField.tsx    ← NEW
│   │       ├── RadarPing.tsx        ← NEW
│   │       ├── RankInsignia.tsx     ← NEW
│   │       ├── HeroStats.tsx        ← NEW
│   │       └── FloatingTerminal.tsx ← NEW
│   └── ui/
│       └── (pehle wale sab files)
├── app/
│   ├── page.tsx                     ← REPLACED
│   ├── layout.tsx
│   └── globals.css
└── ...
```

---

## DEV SERVER

```bash
npm run dev
```

Browser mein `http://localhost:3000` kholo.

---

## AB KYA DIKHEGA

Hero section ab NEXT LEVEL hoga:

✅ **Particle constellation background** — dots floating, connecting, mouse se react karte hain
✅ **Radar sweep** — subtle rotating scan behind the content
✅ **Hexagonal rank insignia** — animated "SJ" badge with rotating ring
✅ **Glitch text effect** — "SHIVAM JOSHI" pe subtle glitch animation
✅ **Animated stat counters** — numbers count up (200+, 8+, 4, 30+)
✅ **Floating terminal** — bottom-right pe auto-typing commands (desktop only)
✅ **Corner brackets** — decorative military frame corners
✅ **Enhanced buttons** — "View Mission Files" + "Download Dossier"
✅ All previous features (typing animation, social links, scroll indicator) bhi intact hain

---

## TROUBLESHOOTING

Agar error aaye toh check karo:
1. Folder path sahi hai? `src/components/sections/hero/` exists?
2. `page.tsx` purana delete kiya? Naya paste kiya?
3. `npm run dev` restart kiya?

---

## AAGE STEP 4 MEIN

About section (full profile), Education timeline, Experience timeline with highlights, Achievements section — sab complete detailed sections banenge.

**Jab Hero section sahi dikh jaye with particles aur animations, bol "Step 4"!** 🫡
