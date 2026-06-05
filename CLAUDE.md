# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev         # Start development server on localhost:3000
npm run build       # Build production application
npm run start       # Start production server
npm run lint        # Run ESLint for code quality
```

## Architecture Overview

A Next.js 15 (App Router) personal site for Binu Babu. Currently a static portfolio; being extended into a dynamic platform with an admin panel, AI-assisted blog creator, public blog, and newsletter.

**Deployed on Vercel** (Node server runtime). Despite the repo name `binubdaniel.github.io`, this is NOT a GitHub Pages site — there is no static-export config or GH Pages workflow, and the server-side features below require a Node host.

### Core Stack
- **Next.js 15 + React 19** with the App Router (`app/` directory)
- **TypeScript** (strict mode)
- **Tailwind CSS 3 + Radix UI** for styling/primitives
- **Framer Motion** for animation
- **Supabase** for database + auth (configured via env)
- **Vercel Analytics**

### Key Directories
- `app/`: routes, layouts, and API routes
- `components/homepage/`: portfolio sections (Hero, Experience, Projects, Contact, etc.)
- `components/ui/`: reusable Radix-based primitives
- `lib/`: utilities (`utils.ts` — `cn`, `formatDate`)

### Current Routes
- `/` — portfolio homepage (`app/page.tsx`)
- `/product-playbook` — consulting methodology guide

### Planned Architecture (blog + newsletter initiative)
- **Admin panel** (`/admin/*`): single-admin auth via Supabase Auth, protected by middleware
- **AI blog creator**: type thoughts → iterative AI editing → publish. Provider is **switchable between OpenAI and Anthropic** via env var (do not hardcode one vendor)
- **Public blog**: `/blog` (index) and `/blog/[slug]` (markdown rendered with react-markdown + @tailwindcss/typography)
- **Newsletter**: public signup → **Resend Audiences** (managed contacts + Broadcasts); send a broadcast when a post is published
- **Data**: a `posts` table in Supabase with RLS (anon reads `published`, authenticated admin writes)

### Environment Variables
```bash
# Supabase (already configured in .env.local)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=   # new Supabase key format (sb_publishable_…); replaces the legacy anon JWT
DATABASE_URL=
DIRECT_URL=
SUPABASE_SERVICE_ROLE_KEY=   # for server-side admin writes (add when needed)

# AI (switchable provider)
OPENAI_API_KEY=              # already configured
ANTHROPIC_API_KEY=           # add if using Claude
AI_PROVIDER=                 # "openai" | "anthropic"

# Newsletter (add at the newsletter phase)
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
RESEND_FROM=
```

### Conventions
- Server secrets are read via `process.env` in server code only — never expose them through `next.config` `env` (that inlines them into the client bundle)
- `NEXT_PUBLIC_*` vars are the only ones safe for the browser
- Follow TypeScript strict mode; prefer editing existing files over adding new ones
