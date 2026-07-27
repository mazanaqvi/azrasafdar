# Azra Safdar Foundation

Website for Azra Safdar Foundation, a non-profit working across Pakistan.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and shadcn/ui.
Every page is statically prerendered, so the site can be hosted free on Vercel
or Cloudflare Pages.

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check:form` | Smoke-test volunteer form validation rules |
| `npm run placeholders` | Regenerate placeholder imagery |
| `npm run logo` | Regenerate logo assets from `brand/logo-master.png` |

## Before launch

These need real values. Each is marked with a `TODO` comment in the source.

1. **Foundation details** — `src/lib/site.ts` holds the name, contact email,
   phone, address and social links. The bank transfer details shown on the
   donate page are in the same file.
2. **Photography** — everything under `public/images/` is generated
   placeholder artwork. Replace with real photos, then update the captions and
   `alt` text in `src/lib/gallery.ts`. Keep the `width` and `height` values
   accurate to each file so the gallery masonry reserves the right space.
3. **Program copy and figures** — `src/lib/programs.ts` contains the four
   program descriptions and the impact statistics. The numbers are
   placeholders and should be replaced with audited figures.
4. **Domain** — set `site.url` in `src/lib/site.ts`. It feeds the sitemap,
   robots.txt and social share metadata.
5. **Volunteer form email** — see below.

## Volunteer form

The form posts to a Server Action at `src/lib/actions/volunteer.ts`, which
validates with Zod and emails the application via [Resend](https://resend.com).

Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Azra Safdar Foundation <website@yourdomain.org>"
```

`RESEND_FROM_EMAIL` must be on a domain verified in your Resend account.

Without an API key the form logs submissions to the server console in
development and returns an error in production, so it fails loudly rather than
silently dropping a volunteer.

Applications are delivered to `site.volunteerEmail`. A hidden honeypot field
catches most bot submissions.

## Editing content

### News posts

Each post is a Markdown file in `src/content/news/`. The filename becomes the
URL slug. Frontmatter is validated at build time, so a typo fails the build
rather than shipping a broken page.

```markdown
---
title: "120 students join our 2026 scholarship cohort"
date: "2026-06-18"
excerpt: "One-sentence summary shown in listings."
category: "Education"
image: "/images/news/scholarships.jpg"
imageAlt: "Description of what is in the photo"
author: "Foundation Team"
---

Body copy in Markdown. Tables, lists and links all work.
```

`category` must be one of `Education`, `Healthcare`, `Relief`, `Livelihoods`
or `Foundation`. To add another, extend the enum in `src/lib/news.ts`.

### Gallery

Add the image to `public/images/gallery/` and append an entry to
`galleryImages` in `src/lib/gallery.ts`.

## Brand

The palette is sampled from the logo and defined once as CSS custom properties
in `src/app/globals.css`:

| Token | Colour |
| --- | --- |
| `--primary` | deep forest green, `#005424` |
| `--lime` | bright accent green, `#6ca824` |
| `--brand-deep` / `--brand-deeper` | dark section backgrounds |
| `--brand-tint` | pale green wash |

Headings use Source Serif 4 to echo the serif wordmark in the logo; body and
UI text use Inter.

Logo assets in `public/` and the favicons in `src/app/` are generated from
`brand/logo-master.png` by `npm run logo`, which recovers transparency from
the white-background master artwork.

## Adding online donations later

The donate page currently shows bank transfer details only. Stripe and PayPal
cannot receive payments into Pakistani accounts, so for local donations the
realistic options are Safepay or PayFast Pakistan. Both need a server route to
handle the payment callback, which means adding a Node runtime to the
deployment — the rest of the site can stay static.

## Deployment

Push to a Git remote and import the repository into Vercel or Cloudflare
Pages. No build configuration is needed beyond the environment variables above.
