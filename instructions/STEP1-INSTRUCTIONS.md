# 🎖️ STEP 1 — FOUNDATION SETUP INSTRUCTIONS
## Shivam Joshi Tactical Portfolio

---

## A) PREREQUISITES — Yeh pehle install hona chahiye

### 1. Node.js Install karo (v18+)
```bash
# Check karo already hai ya nahi
node --version

# Agar nahi hai toh download karo: https://nodejs.org
# LTS version download karo (v18 ya v20)
```

### 2. Git Install karo
```bash
# Check karo
git --version

# Agar nahi hai: https://git-scm.com/downloads
```

### 3. VS Code (ya koi bhi code editor)
- https://code.visualstudio.com/

---

## B) PROJECT SETUP — Step by Step

### 1. Archive Extract karo
```bash
# Jo tar.gz file download hui hai, usse extract karo
# Windows pe 7-Zip ya WinRAR use karo
# Mac/Linux pe terminal mein:
tar -xzf shivam-portfolio-step1.tar.gz
cd shivam-portfolio
```

### 2. Dependencies Install karo
```bash
npm install
```
> Yeh sab packages install karega — Next.js, React, Tailwind, Supabase, Framer Motion, etc.

### 3. Environment File Setup karo
```bash
# .env.local.example ko copy karke .env.local banao
cp .env.local.example .env.local
```
> Abhi ke liye `.env.local` mein kuch change nahi karna. Supabase Step 2 ke baad setup karenge.

### 4. Dev Server Start karo
```bash
npm run dev
```
> Browser mein jaao: **http://localhost:3000**
> Tujhe Tactical Theme wala landing page dikhega with:
> - Dark background + Green grid pattern
> - Scan line effect
> - "SHIVAM JOSHI" heading with tactical glow
> - HUD coordinates top-left and top-right
> - CLASSIFIED watermark
> - "STEP 1 COMPLETE" verification message

---

## C) SUPABASE SETUP (Free Database)

### 1. Supabase Account banao
- Jaao: **https://supabase.com**
- GitHub se sign up karo (easiest)
- "New Project" click karo
- Project name: `shivam-portfolio`
- Password set karo (yaad rakhna!)
- Region: **Mumbai (ap-south-1)** — closest to India
- "Create new project" click karo

### 2. Database Schema Run karo
- Supabase dashboard mein jaao
- Left sidebar mein **"SQL Editor"** click karo
- **"New Query"** click karo
- `supabase-schema.sql` file ka saara content copy-paste karo wahan
- **"Run"** button click karo (ya Ctrl+Enter)
- Green success message aayega — sab tables ban jayenge with seed data

### 3. API Keys Copy karo
- Supabase dashboard → **Settings** (gear icon left sidebar)
- **API** section click karo
- Copy karo:
  - **Project URL** → `.env.local` mein `NEXT_PUBLIC_SUPABASE_URL` mein paste karo
  - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY` mein paste karo
  - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` mein paste karo

### 4. Verify karo
- `.env.local` file save karo
- Terminal mein dev server restart karo (`Ctrl+C` karke phir `npm run dev`)

---

## D) GITHUB REPO SETUP

### 1. GitHub pe new repo banao
- https://github.com/new
- Name: `shivam-portfolio` (ya jo bhi chahe)
- **Private** rakhna abhi
- Create karo

### 2. Local repo setup karo
```bash
cd shivam-portfolio
git init
git add .
git commit -m "🎖️ Step 1: Foundation — Tactical Portfolio Setup"
git branch -M main
git remote add origin https://github.com/shivamjoshtech/shivam-portfolio.git
git push -u origin main
```

---

## E) FOLDER STRUCTURE SAMJHO

```
shivam-portfolio/
├── public/
│   ├── assets/          ← Images, icons, avatar assets
│   ├── videos/          ← Project demo videos
│   └── resume/          ← Resume PDF
│
├── src/
│   ├── app/
│   │   ├── layout.tsx   ← Root layout (fonts, overlays, metadata)
│   │   ├── page.tsx     ← Home page (temporary — Step 2 mein replace hoga)
│   │   ├── globals.css  ← All tactical CSS (grid, scan, glow, badges)
│   │   ├── admin/       ← Admin dashboard pages (Step 9)
│   │   ├── api/         ← API routes (contact, auth, analytics)
│   │   ├── projects/    ← Project detail pages
│   │   ├── about/       ← About page
│   │   ├── skills/      ← Skills page
│   │   ├── contact/     ← Contact page
│   │   └── schedule/    ← Meeting scheduler page
│   │
│   ├── components/
│   │   ├── ui/          ← Reusable UI components (buttons, cards, badges)
│   │   ├── sections/    ← Page sections (hero, about, projects, etc.)
│   │   ├── avatar/      ← AI cartoon avatar (ARIA)
│   │   └── admin/       ← Admin dashboard components
│   │
│   ├── lib/
│   │   ├── supabase.ts  ← Supabase client setup
│   │   └── store.ts     ← Zustand global state
│   │
│   ├── hooks/           ← Custom React hooks
│   ├── styles/          ← Additional style files
│   ├── data/
│   │   └── constants.ts ← Site config, nav items, section names
│   └── types/
│       └── index.ts     ← TypeScript interfaces for all data
│
├── supabase-schema.sql  ← Database schema (run in Supabase SQL Editor)
├── .env.local.example   ← Environment variables template
├── tailwind.config.ts   ← Theme colors, fonts, animations
├── package.json         ← Dependencies
└── tsconfig.json        ← TypeScript config
```

---

## F) KYA KYA BAN GAYA STEP 1 MEIN

| Item | Status |
|------|--------|
| Next.js 14 project structure | ✅ Done |
| Tailwind CSS with military theme | ✅ Done |
| Custom colors (tactical green, command gold, hud cyan) | ✅ Done |
| Custom fonts (Orbitron, Rajdhani, JetBrains Mono, Share Tech Mono) | ✅ Done |
| Animations (scan, glow, grid-flow, glitch, radar, slide) | ✅ Done |
| Tactical CSS components (frame, cards, badges, buttons, dividers) | ✅ Done |
| Visual effects (scan lines, noise, vignette, grid background) | ✅ Done |
| Supabase schema (9 tables with RLS + seed data) | ✅ Done |
| TypeScript types for all data models | ✅ Done |
| Zustand state management | ✅ Done |
| Root layout with overlays | ✅ Done |
| Temporary landing page (verification) | ✅ Done |
| Environment config template | ✅ Done |
| Site constants & navigation config | ✅ Done |

---

## G) AAGE KYA HOGA — STEP 2 PREVIEW

Step 2 mein banayenge:
- **Full Navigation System** (tactical sidebar with section links)
- **Premium Layout System** (responsive grid, section containers)
- **Page Routing** (smooth scroll ya multi-page)
- **Reusable UI Components** (TacticalCard, SectionHeader, GlowBadge, etc.)
- **Loading Screen** (cinematic boot-up animation)

---

> **Jab yeh sab complete ho jaye aur localhost pe landing page dikh jaye, tab bol "Step 2" — mai next level build karunga! 🫡**
