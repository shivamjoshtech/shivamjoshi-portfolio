# 🎖️ STEP 4 — ABOUT, EDUCATION, EXPERIENCE & ACHIEVEMENTS (Individual Files)

---

## NAYA FOLDER BANAO

```bash
mkdir -p src/components/sections
```
(Agar Step 3 mein `src/components/sections/hero/` bana liya tha toh `sections` folder already hoga — bas confirm karo)

---

## FILES KAHAN RAKHNI HAIN

### 1. `AboutSection.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/AboutSection.tsx`
**Kya hai:** Full about section — profile summary, core competencies grid (4 cards), quick intel sidebar with facts

### 2. `EducationSection.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/EducationSection.tsx`
**Kya hai:** Education timeline — BCA from Graphic Era + XII from Masters School, animated timeline dots

### 3. `ExperienceSection.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/ExperienceSection.tsx`
**Kya hai:** Full experience timeline — TCS (with sub-roles, 5 key operations, tech deployed) + Outlier AI (4 highlights), animated reveal

### 4. `AchievementsSection.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/AchievementsSection.tsx`
**Kya hai:** 4 hackathon cards with emoji ranks, dates, locations, durations — winner highlight effect on Hack'24 & TechSprint

### 5. `constants.ts` → REPLACE
**Replace karo:** `src/data/constants.ts`
**Kya hua:** NAV_ITEMS mein `education` add ho gaya (EDU shortLabel ke saath)

### 6. `Navbar.tsx` → REPLACE
**Replace karo:** `src/components/ui/Navbar.tsx`
**Kya hua:** GraduationCap icon add hua education ke liye ICONS mapping mein

### 7. `page.tsx` → REPLACE
**Replace karo:** `src/app/page.tsx`
**Kya hua:** About, Education, Experience, Achievements — sab inline placeholders hata ke proper section components import ho gaye

---

## FOLDER STRUCTURE AFTER STEP 4

```
src/
├── components/
│   ├── sections/
│   │   ├── hero/
│   │   │   ├── ParticleField.tsx
│   │   │   ├── RadarPing.tsx
│   │   │   ├── RankInsignia.tsx
│   │   │   ├── HeroStats.tsx
│   │   │   └── FloatingTerminal.tsx
│   │   ├── AboutSection.tsx         ← NEW
│   │   ├── EducationSection.tsx     ← NEW
│   │   ├── ExperienceSection.tsx    ← NEW
│   │   └── AchievementsSection.tsx  ← NEW
│   └── ui/
│       ├── Navbar.tsx               ← REPLACED
│       └── (baaki sab same)
├── app/
│   └── page.tsx                     ← REPLACED
├── data/
│   └── constants.ts                 ← REPLACED
└── ...
```

---

## DEV SERVER

```bash
npm run dev
```

Browser: `http://localhost:3000`

---

## AB KYA DIKHEGA

Scroll karte jaao hero ke baad:

### ✅ ABOUT SECTION
- Left side: Full profile paragraph (terminal header style)
- Right side: Quick Intel card — Location, Role, Specialization, Primary Lang, Impact
- Neeche: 4 Core Competency cards — AI/ML, Geospatial, Data Viz, Knowledge Graphs
- Tags: Full AI Lifecycle, Production Deployment, Geospatial Intelligence, etc.

### ✅ EDUCATION SECTION
- Timeline style — vertical line with glowing dots
- BCA — Graphic Era University (2022-2025)
- XII CBSE — Masters School Haldwani (2021, 84.2%)
- Each with details, location, badges

### ✅ EXPERIENCE SECTION
- Timeline style — detailed cards
- **TCS** — Full card with:
  - 3 sub-roles listed (Primary, Secondary, Foundation)
  - 5 KEY OPERATIONS with icons (each highlight animated)
  - Tech deployed tags (Python, LangChain, Flask, etc.)
  - "ACTIVE DUTY" pulsing badge
- **Outlier AI** — 4 highlights, tech tags

### ✅ ACHIEVEMENTS SECTION
- Summary line: 1 Win, 1 Finalist, 4 Total
- 4 cards — Hack'24 (Winner 🥇), SIH (⭐), Hack-Wars (⚔️), TechSprint (🏆)
- Each with date, duration, location, description
- Winner cards have subtle gold shimmer effect

### ✅ NAVIGATION
- Sidebar ab Education bhi show karega with GraduationCap icon
- Scroll spy sab sections pe kaam karega

---

## AAGE STEP 5 MEIN

Full **Tech Arsenal / Skills** section — categorized grid with real framework logos, proficiency bars, hover effects.

**Jab Step 4 sahi dikh jaye, bol "Step 5"!** 🫡
