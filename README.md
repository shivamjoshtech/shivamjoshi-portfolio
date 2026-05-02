# 🎖️ SHIVAM JOSHI — Tactical Portfolio

> **AI Engineer | GenAI Developer | Multi-Agent Pipeline Architect**

A next-level, military-themed portfolio built with cutting-edge web technologies. Features an AI-powered avatar assistant (ARIA), real-time visitor analytics, secret admin dashboard, interactive project showcase, and immersive tactical UI effects.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=flat-square&logo=supabase)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=flat-square&logo=framer)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)

---

## 🚀 Features

### 🎯 Portfolio Sections
- **Hero** — Cinematic landing with particle constellation, radar sweep, rank insignia, typing animation, animated stat counters
- **About** — Full profile with core competencies and quick intel sidebar
- **Education** — Animated timeline (BCA + XII)
- **Experience** — Detailed work history with sub-roles, highlights, tech tags (TCS + Outlier AI)
- **Tech Arsenal** — Categorized skill grid with real framework logos and hover effects
- **Projects** — Filterable showcase with expandable details, tech stack, GitHub links
- **Achievements** — Hackathon cards with ranks and winner highlights
- **Contact** — Form (Supabase-backed), direct links, resume download, meeting scheduler

### 🤖 ARIA — AI Assistant
- Floating chat widget (bottom-right)
- Collects visitor name and purpose
- Smart keyword-based responses about projects, skills, experience
- Visitor data stored in Supabase

### 🔐 Admin Dashboard (`/admin`)
- Password-protected access
- **Overview** — Stat cards, recent visitors, recent contacts
- **Projects** — Full CRUD (add, edit, delete)
- **Visitors** — Searchable table from ARIA interactions
- **Contacts** — Message management (read, reply, archive)
- **Analytics** — Event tracking and stats

### 🎨 Design
- **Theme:** GitHub Dark × Military Tactical
- **Effects:** Particle field, radar sweep, scan lines, noise texture, vignette, glitch text
- **Typography:** Orbitron (display), Rajdhani (body), JetBrains Mono (code), Share Tech Mono (tactical)
- **Colors:** Tactical Green, Command Gold, HUD Cyan, Alert Red
- **Responsive:** Desktop sidebar + Mobile hamburger menu

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| State | Zustand |
| Icons | Lucide React + React Icons |
| Hosting | Vercel (Free) |
| Fonts | Google Fonts (Orbitron, Rajdhani, JetBrains Mono, Share Tech Mono) |

---

## 📦 Quick Start

```bash
# Clone
git clone https://github.com/shivamjoshtech/shivam-portfolio.git
cd shivam-portfolio

# Install
npm install

# Environment setup
cp .env.local.example .env.local
# Edit .env.local with your Supabase keys

# Run
npm run dev

# Open
http://localhost:3000
```

---

## 🗄️ Supabase Setup

1. Create free project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → Run `supabase-schema.sql`
3. Copy API keys to `.env.local`

---

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Add environment variables
4. Deploy!

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Tactical theme CSS
│   ├── admin/                # Admin dashboard
│   └── api/                  # API routes
├── components/
│   ├── ui/                   # Reusable components
│   ├── sections/             # Page sections
│   │   ├── hero/             # Hero sub-components
│   │   ├── AboutSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   └── ContactSection.tsx
│   └── avatar/               # ARIA AI assistant
├── lib/                      # Supabase, Zustand store
├── data/                     # Constants
└── types/                    # TypeScript interfaces
```

---

## 👤 Author

**Shivam Joshi**
- 🏢 AI Engineer @ TCS (GIS Center of Excellence)
- 📧 joshishivam586@gmail.com
- 📱 +91 7668624575
- 💼 [LinkedIn](https://www.linkedin.com/in/shivam-joshi-499335246/)
- 🐙 [GitHub](https://github.com/shivamjoshtech)

---

## 📜 License

This project is proprietary. All rights reserved © 2026 Shivam Joshi.