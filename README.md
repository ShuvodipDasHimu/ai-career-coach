# AI Career Coach (Next.js + TypeScript)

Rebuilt from the original Vite/React mockup into a working full-stack app. Accent colour everywhere is **Tailwind `indigo-500`**.

## What was fixed

| Problem in the original | Fix |
| --- | --- |
| Resume analysis, roadmaps and chat were hardcoded `setTimeout` fakes | Real AI via server routes (`app/api/*`) using the Anthropic API, with zod-validated JSON output |
| `Settings.jsx` imported `framer-motion`, which wasn't in `package.json` (build breaker) | Settings rewritten without it |
| Login/Register did nothing; social buttons were dead | Working demo auth with per-user workspaces; dead buttons removed |
| Dashboard/History/Jobs showed static sample data | Everything is generated from your profile + resume and persisted per user |
| Settings tabs (notifications, 2FA, etc.) did nothing | Replaced with Profile + Privacy & Data (export / delete) |
| JavaScript, Vite SPA, React Router | Next.js 15 App Router + strict TypeScript |
| Mixed purples (`#6260ec`, indigo-400/600) and blue avatars | One accent: `indigo-500` |
| Fixed 256px sidebar broke on mobile, `bg-opacity-*` (Tailwind v3 syntax) | Responsive sidebar/drawer, Tailwind v4 syntax |

## Features

- **Resume Analyzer** – PDF / DOCX / TXT (≤ 4 MB). PDFs are read natively by Claude (so formatting/ATS issues are visible). Score, ATS %, strengths, gaps, rewrites, extracted skills. Downloadable report.
- **Roadmap Generator** – any target role, level, weekly hours → phased plan with checkable skills and progress tracking. Export as text.
- **Career Q&A** – streaming chat that uses your profile as context.
- **Job Recommendations** – AI role matches with skill-gap chips, filters, saved roles, and links to search live openings. (No live job board is connected, so no fake companies are invented.)
- **Dashboard** – real stats from your roadmap/resume, AI career recommendations.
- **History / Settings** – search, filter, export, delete.

## Run it

```bash
npm install
cp .env.example .env.local   # then add ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000. `npm run typecheck` and `npm run build` should both pass.

### AI provider
Set `GEMINI_API_KEY` to run on Gemini (free tier), or `ANTHROPIC_API_KEY` for Claude. Gemini wins if both are set. Optional overrides: `GEMINI_MODEL`, `ANTHROPIC_MODEL`.

### Social sign-in (Google + LinkedIn)
Sign in / Sign up with Google and LinkedIn run on Auth.js v5 (`auth.ts`, `app/api/auth/[...nextauth]`). Both flows are the same OAuth redirect; the account is created on first sign-in. Required env vars are listed in `.env.example`. Redirect URIs to register with each provider: `{origin}/api/auth/callback/google` and `{origin}/api/auth/callback/linkedin`.

### Deploy to Vercel
Import the repo, set `ANTHROPIC_API_KEY` (and optionally `ANTHROPIC_MODEL`) in Project Settings → Environment Variables. Function bodies are limited to ~4.5 MB on Vercel, which is why uploads are capped at 4 MB.

## Architecture

```
app/
  (marketing)/    landing, login, register
  (app)/          authenticated shell + 7 pages
  api/            resume | roadmap | careers | jobs | chat (streaming)
lib/
  ai.ts           Anthropic client, JSON generation + zod validation + one auto-retry
  schemas.ts      single source of truth for request/response types
  auth.tsx        demo auth provider
  app-data.tsx    per-user persisted store
```

## Known limitations (be upfront in your demo)

- **Auth is demo-grade**: accounts and data live in browser `localStorage`; it is not secure and doesn't sync across devices. Swap `lib/auth.tsx` + `lib/app-data.tsx` for Auth.js/Clerk/Firebase + a database for production. Nothing else depends on the storage layer.
- The API routes are unauthenticated (rate-limited per IP in memory). Add session checks and a shared limiter (e.g. Upstash) before public launch.
- Salary/demand figures are model estimates, not market data.
