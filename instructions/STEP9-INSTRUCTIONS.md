# 🎖️ STEP 9 — ADMIN DASHBOARD (Secret Protected)

---

## FOLDERS BANAO

```bash
mkdir -p src/app/admin/dashboard/projects
mkdir -p src/app/admin/dashboard/visitors
mkdir -p src/app/admin/dashboard/contacts
mkdir -p src/app/admin/dashboard/analytics
mkdir -p src/app/api/admin
```

---

## FILES KAHAN RAKHNI HAIN

### 1. `admin-page.tsx` → NAYA FILE
**Rename karo:** `page.tsx`
**Paste karo:** `src/app/admin/page.tsx`
**Kya hai:** Admin login page — secret password enter karo

### 2. `auth-route.ts` → NAYA FILE
**Rename karo:** `route.ts`
**Paste karo:** `src/app/api/admin/route.ts`
**Kya hai:** API route jo password check karta hai `.env.local` se

### 3. `dashboard-layout.tsx` → NAYA FILE
**Rename karo:** `layout.tsx`
**Paste karo:** `src/app/admin/dashboard/layout.tsx`
**Kya hai:** Admin sidebar layout — Overview, Projects, Visitors, Contacts, Analytics links

### 4. `dashboard-page.tsx` → NAYA FILE
**Rename karo:** `page.tsx`
**Paste karo:** `src/app/admin/dashboard/page.tsx`
**Kya hai:** Overview page — stat cards (visitors, contacts, projects) + recent visitors + recent contacts

### 5. `projects-page.tsx` → NAYA FILE
**Rename karo:** `page.tsx`
**Paste karo:** `src/app/admin/dashboard/projects/page.tsx`
**Kya hai:** Projects CRUD — add, edit, delete projects with full form (title, description, category, tech stack, GitHub URL, video URL, featured toggle)

### 6. `visitors-page.tsx` → NAYA FILE
**Rename karo:** `page.tsx`
**Paste karo:** `src/app/admin/dashboard/visitors/page.tsx`
**Kya hai:** Visitor list table — name, purpose, company, date. Search bar. From ARIA chat data.

### 7. `contacts-page.tsx` → NAYA FILE
**Rename karo:** `page.tsx`
**Paste karo:** `src/app/admin/dashboard/contacts/page.tsx`
**Kya hai:** Contact requests — message cards with status (unread/read/replied/archived), mark read, reply via email, archive buttons

### 8. `analytics-page.tsx` → NAYA FILE
**Rename karo:** `page.tsx`
**Paste karo:** `src/app/admin/dashboard/analytics/page.tsx`
**Kya hai:** Analytics — stat cards (page views, downloads, chats, clicks) + event log table

---

## ⚠️ IMPORTANT — FILE RENAME KARNA HAI!

Download hone ke baad files ka naam change karna padega:

| Downloaded File Name | Rename To | Paste Location |
|---------------------|-----------|----------------|
| `admin-page.tsx` | `page.tsx` | `src/app/admin/page.tsx` |
| `auth-route.ts` | `route.ts` | `src/app/api/admin/route.ts` |
| `dashboard-layout.tsx` | `layout.tsx` | `src/app/admin/dashboard/layout.tsx` |
| `dashboard-page.tsx` | `page.tsx` | `src/app/admin/dashboard/page.tsx` |
| `projects-page.tsx` | `page.tsx` | `src/app/admin/dashboard/projects/page.tsx` |
| `visitors-page.tsx` | `page.tsx` | `src/app/admin/dashboard/visitors/page.tsx` |
| `contacts-page.tsx` | `page.tsx` | `src/app/admin/dashboard/contacts/page.tsx` |
| `analytics-page.tsx` | `page.tsx` | `src/app/admin/dashboard/analytics/page.tsx` |

---

## FOLDER STRUCTURE AFTER STEP 9

```
src/app/
├── admin/
│   ├── page.tsx                              ← Login page
│   └── dashboard/
│       ├── layout.tsx                        ← Sidebar layout
│       ├── page.tsx                          ← Overview
│       ├── projects/
│       │   └── page.tsx                      ← Projects CRUD
│       ├── visitors/
│       │   └── page.tsx                      ← Visitor list
│       ├── contacts/
│       │   └── page.tsx                      ← Contact requests
│       └── analytics/
│           └── page.tsx                      ← Analytics
├── api/
│   └── admin/
│       └── route.ts                          ← Auth API
├── page.tsx                                   ← Portfolio home
├── layout.tsx
└── globals.css
```

---

## PASSWORD SETUP

`.env.local` mein yeh line check karo:
```
ADMIN_SECRET_KEY=shivam_admin_2025_secret
```

Yeh default password hai. Change karna ho toh `.env.local` mein change karo.

---

## DEV SERVER

```bash
npm run dev
```

Browser: `http://localhost:3000/admin`

---

## AB KYA DIKHEGA

### ✅ Login Page (`/admin`)
- Military-themed login — Shield icon, "CLASSIFIED" label
- Password field with show/hide toggle
- AUTHENTICATE button → validates against `.env.local`
- Error: "ACCESS DENIED" animation
- Success → redirect to `/admin/dashboard`

### ✅ Dashboard Overview (`/admin/dashboard`)
- 3 stat cards — Visitors, Contacts, Projects (from Supabase)
- Recent Visitors list (from ARIA chats)
- Recent Contact Requests (from contact form)

### ✅ Projects Manager (`/admin/dashboard/projects`)
- "ADD PROJECT" button → opens form
- Form: Title, Slug, Description, Long Description, Category dropdown, Tech Stack, GitHub URL, Live URL, Video URL, Featured checkbox
- Project list with category badge, featured star
- Edit & Delete buttons per project

### ✅ Visitors (`/admin/dashboard/visitors`)
- Searchable table — Name, Purpose, Company, Date
- Purpose badges (Hiring=gold, Freelance=green, Collaboration=cyan)
- Refresh button

### ✅ Contacts (`/admin/dashboard/contacts`)
- Message cards with unread indicator (gold dot)
- Subject, message, email, date
- Actions: Mark Read, Reply (opens email), Archive
- Unread count in header

### ✅ Analytics (`/admin/dashboard/analytics`)
- 4 stat cards — Page Views, Resume Downloads, Avatar Chats, Project Clicks
- Event log table (recent 50 events)

### ✅ Sidebar Navigation
- Overview, Projects, Visitors, Contacts, Analytics
- "VIEW PORTFOLIO" link → goes back to main site
- "LOGOUT" button → clears auth

---

## NOTE

Dashboard Supabase se data fetch karta hai. Agar Supabase abhi configured nahi hai toh:
- Empty states dikhenge ("No visitors yet", "No projects yet")
- Koi crash nahi hoga
- Supabase setup karne ke baad automatically data aane lagega

---

## AAGE STEP 10 MEIN

**Deployment & Final Polish** — Vercel deploy, SEO, OG images, performance, final testing.

**Jab Admin dashboard sahi kaam kare (login ho, pages dikhen), bol "Step 10"!** 🫡
