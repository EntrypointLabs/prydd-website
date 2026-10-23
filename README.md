# PRYDD

The marketing and waitlist site for [PRYDD](https://prydd.co) — a dollar account for everyday life. Hold dollars on your phone, send to anyone by username in seconds for cents, and fund from local currency.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://prydd.co)

## Overview

This is a [Next.js](https://nextjs.org) app (App Router) that serves the public PRYDD site: the landing page, the waitlist form, and legal pages (Terms of Service, Privacy Policy). Waitlist signups are stored in Postgres via Prisma and confirmed by email via [Resend](https://resend.com).

## Tech stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui (Radix primitives)
- **Data:** Prisma ORM + PostgreSQL (Supabase)
- **Email:** Resend + React Email
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
DIRECT_URL="postgresql://user:password@host:5432/database"
RESEND_API_KEY="re_your_resend_api_key"
```

- `DATABASE_URL` — pooled Postgres connection string (from your Supabase project's Database settings)
- `DIRECT_URL` — direct (non-pooled) Postgres connection string, used for migrations
- `RESEND_API_KEY` — API key from your [Resend dashboard](https://resend.com/api-keys)

For local testing without a verified domain, Resend's default `onboarding@resend.dev` sender works out of the box. For production, `prydd.co` must be verified as a sending domain in Resend — `lib/emails/send-email.ts` sends from `onboarding@prydd.co`, and waitlist confirmations fail until that domain is verified.

### 3. Run database migrations

```bash
npx prisma migrate dev
```

This applies the schema in `prisma/schema.prisma` — a single `users` table backing the waitlist (`id`, `email`, `createdAt`, `isWaitlistUser`).

### 4. Start the dev server

```bash
pnpm dev
```

The app runs at [http://localhost:4030](http://localhost:4030).

## Project structure

```
app/
  page.tsx              Home page (renders components/prydd)
  opengraph-image.tsx   Open Graph card, generated at build time
  waitlist/             Waitlist signup flow
  legal/                Terms of Service & Privacy Policy
  api/waitlist/         Waitlist server action
components/prydd/       The homepage: globe hero, scroll handoff, story sections
components/             Shared chrome (navbar, footer, wordmark, legal shell)
components/ui/          shadcn/ui primitives
lib/emails/             Transactional email templates and sending
lib/og-fonts/           Static font instances for the Open Graph card
prisma/                 Database schema and migrations
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local dev server (port 4030) |
| `pnpm build` | Generate the Prisma client and build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Lint the codebase |

## Links

- Site: [prydd.co](https://prydd.co)
- Litepaper: [prydd.co/litepaper.pdf](https://prydd.co/litepaper.pdf)
- X: [@xend_global](https://x.com/xend_global) (handle not yet renamed)

## Brand

The site is PRYDD. A few identifiers deliberately still read `xend`, because they are bound to things outside this repo and renaming them breaks those things:

- `com.giftedborg.xend` in `public/.well-known/assetlinks.json` and `apple-app-site-association` is the mobile app's bundle ID. Renaming it breaks Android deep links and passkey sign-in. Note that the apps' associated-domains entitlements must now list `prydd.co` for these files to be read at all.
- `@xend_global` on X is a live account; there is no PRYDD handle to point at yet.
- `Entrypoint Labs, Inc.` is the legal entity behind the product, not the brand, and stays as-is in the Terms and Privacy Policy.
