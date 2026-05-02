# 🎖️ STEP 6 — PROJECTS SHOWCASE (Individual Files)

---

## FILES KAHAN RAKHNI HAIN

### 1. `ProjectsSection.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/ProjectsSection.tsx`
**Kya hai:** Full projects showcase — 4 projects with categories, tech stack, expandable details, highlights, GitHub/live links, video placeholder, filter system

### 2. `page.tsx` → REPLACE
**Replace karo:** `src/app/page.tsx` (purani delete, naya paste)
**Kya hua:** Projects placeholder hata ke `<ProjectsSection />` add hua. Section order bhi updated: About → Education → Experience → Skills → Projects → Achievements → Contact

---

## DEV SERVER

```bash
npm run dev
```

Browser: `http://localhost:3000` → scroll to Projects

---

## AB KYA DIKHEGA

### ✅ Project Stats Bar
- "4 Projects | 2 Featured | ALL DEPLOYED"

### ✅ Filter Chips
- ALL (4) | MAJOR (2) | MINI (1) | INVENTED (1)
- Click karke filter karo, dubara click = reset

### ✅ 4 Project Cards

**GeoGenie** ⭐ FEATURED
- Category: MAJOR PROJECT
- Tech: Python, LangChain, Nominatim, ESRI, Census API, rapidfuzz, usaddress, LLM, REST APIs
- Click "VIEW DETAILS" → expands with 4 key features
- Bottom: green/gold gradient accent line

**GEO-HAZARD** ⭐ FEATURED
- Category: MAJOR PROJECT
- Tech: Python, Flask, SegFormer, ESRI Tiles, OpenTopography, WeatherAPI, Gemini 2.5 Flash, Leaflet, Bootstrap
- 5 key features on expand

**GeoElevation**
- Category: MINI PROJECT
- Tech: Python, OpenTopography API, COP30 DEM, NumPy, REST APIs, JSON

**SafarTravels**
- Category: SELF-INVENTED
- Tech: Next.js 14, Supabase, Razorpay, Vercel, n8n, Twilio WhatsApp API, React, TypeScript

### ✅ Each Card Has:
- Category badge (color-coded)
- Featured star badge (gold)
- Description text
- Expandable "VIEW DETAILS" → long description + key features
- Tech stack tags
- GitHub / Live Demo buttons (managed from Admin later)
- Bottom gradient accent line

### ✅ Features:
- Cards animate in on scroll
- Expand/collapse with smooth animation
- Expanded card takes full width (md:col-span-2)
- Filter chips with counts
- Featured projects have enhanced border glow

---

## PROJECTS ADD KAISE KARENGE BAAD MEIN?

Abhi projects hardcoded hain `ProjectsSection.tsx` mein. Step 9 (Admin Dashboard) mein:
- Admin se projects add/edit/delete hoga
- Supabase database se fetch hoga
- Video URL, GitHub URL, Live URL sab admin se manage hoga

---

## AAGE STEP 7 MEIN

**AI Cartoon Avatar (ARIA)** — visitor se naam puche, AI conversation kare, data Supabase mein store kare.

**Jab Projects section sahi dikh jaye with filters aur expand, bol "Step 7"!** 🫡
