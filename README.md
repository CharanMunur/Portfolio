# Charan Munur — Portfolio

A minimal, editorial developer portfolio built with React 19, Vite, TypeScript, and Tailwind CSS v4. Features responsive case-study detail pages, open-source contribution tracking, technical writing archive, interactive GitHub activity graph, and privacy-preserving visitor counter.

---

## Stack

- **Framework & Build**: React 19, Vite, TypeScript
- **Styling & UI**: Tailwind CSS v4, shadcn/ui, Radix UI primitives
- **Motion & Animation**: motion/react, Framer Motion, Lenis smooth scroll
- **Routing**: React Router v7
- **Theming**: `next-themes` (system, light, and dark mode support)
- **Backend & API**: Vercel Serverless Functions (`api/`)
- **Database**: Supabase (privacy-preserving visitor tracking)
- **Package Manager**: Bun

---

## Routes

- `/` — Homepage (Hero, Skills, Featured Projects, Open Source Timeline, Blogs, Uses preview, GitHub Activity, Quote)
- `/projects` — All projects index
- `/projects/:slug` — Project detail & case study
- `/opensource` — Open source contributions index
- `/opensource/:slug` — Open source contribution detail & PR/Issue list
- `/blogs` — Technical articles & writing archive
- `/blogs/:slug` — Blog article reader with Markdown rendering
- `/uses` — Developer setup, hardware, editor configuration & tools
- `/contact` — Contact page & social links

---

## Features & Architecture

- **Editorial Layout**: Narrow `max-w-3xl` reading column for high legibility across mobile and desktop.
- **Monochrome Utility Aesthetic**: Low-weight typography, dashed borders, clean line tabs, and subtle motion reveals.
- **Data-Driven Content**: All portfolio content (projects, open source PRs, blogs, uses, tech stack) is decoupled into `src/data/*.ts`.
- **Responsive Typography System**: Proportional font scaling across small mobile screens (`< sm`) and desktop screens.
- **Visitor Tracking**: Client-side hashed fingerprint (`src/lib/fingerprint.ts`) sent to Vercel serverless function (`api/visitors.ts`) backed by Supabase.
- **GitHub Activity Graph**: Interactive contribution grid with month labels, tooltip popovers, and expandable repository panel.

---

## Local Development

### Prerequisites

- [Bun](https://bun.sh)
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for running local serverless API endpoints)

### Setup

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Environment Variables** (Optional, for visitor counter & GitHub rate limits):
   Create `.env` in the root directory:
   ```env
   SUPABASE_URL=https://<your-project-ref>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
   # GITHUB_TOKEN=<your-github-personal-access-token> # Optional: raises API rate limit to 5000 req/hr
   ```

3. **Start Frontend Dev Server**:
   ```bash
   bun run dev
   ```

4. **Start Vercel API** (Optional, for visitor counter endpoint):
   ```bash
   vercel dev --listen 3000
   ```

### Production Build

```bash
bun run build
```

---

## Project Structure

```
portfolio/
├── api/                  # Vercel serverless API functions
│   ├── github.ts        # GitHub contribution data fetcher
│   └── visitors.ts      # Visitor counter endpoint (Supabase)
├── public/
│   └── images/          # Static assets & dark/light SVG logos
└── src/
    ├── components/       # Reusable UI & section components
    │   ├── ui/          # Radix & shadcn primitives (tabs, accordion, button)
    │   └── helpers/     # FadeIn animation, TechIcon, SmoothScroll
    ├── data/            # Portfolio content (projects, opensource, blogs, uses)
    ├── lib/             # Shared utilities & fingerprint generator
    ├── pages/            # Route page components
    ├── main.tsx          # Application entrypoint & Router config
    └── index.css        # Global CSS variables & keyframe animations
```
