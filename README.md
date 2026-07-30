# Azra Safdar Foundation

Website for Azra Safdar Foundation, a non-profit working across Pakistan.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and shadcn/ui.
Hosted on Vercel. Firebase is used only for Firestore, which archives contact
and volunteer form submissions.

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
2. **Photography** — the site ships with no photography. Placeholder artwork
   and the gallery page were removed, and every layout was reflowed to be
   text-led, so nothing looks unfinished. See "Adding photography back" below.
3. **Project copy and figures** — `src/lib/projects.ts` contains the five
   project descriptions. Unverified achievement statistics have been removed
   from the site, so the only remaining figures are the indicative `costs`
   amounts on each project and the donate page. Replace those with real
   amounts, and add impact statistics only once they are audited.
4. **Email addresses** — `site.email` and `site.volunteerEmail` in
   `src/lib/site.ts` are temporarily a personal Gmail address. They are shown
   publicly and are where form submissions are delivered, so replace them with
   a mailbox on `azrasafdar.org` once one exists.
5. **Form email delivery** — see below.

## Forms

There are two: contact (`src/lib/actions/contact.ts`) and volunteer
(`src/lib/actions/volunteer.ts`). Both post to a Server Action that validates
with Zod and emails the submission via [Resend](https://resend.com). A hidden
honeypot field catches most bot submissions.

Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Azra Safdar Foundation <website@yourdomain.org>"
```

`RESEND_FROM_EMAIL` must be on a domain verified in your Resend account.

Without an API key the forms log submissions to the server console in
development and return an error in production, so they fail loudly rather than
silently dropping an enquiry.

Enquiries go to `site.email`, applications to `site.volunteerEmail`.

### Firestore archive

Email is the delivery mechanism; Firestore is the durable record, so a bounced
or misconfigured email doesn't lose a submission. After a Server Action
reports success, the browser writes the same validated data to Firestore via
the web SDK (`src/lib/firebase/submissions.ts`).

| Collection | Written from |
| --- | --- |
| `contactEnquiries` | Contact form |
| `volunteerApplications` | Volunteer form |

Archiving is best-effort: if Firestore is unreachable or unconfigured, the
error is logged and the visitor still sees the success message they earned
when the email went out.

Read submissions in the [Firestore console](https://console.firebase.google.com/project/azrasafdar-org/firestore).

## Firebase

Firebase is used for Firestore only — no hosting, no auth. It runs entirely
within the free Spark plan; nothing here requires the Blaze plan.

Because writes come straight from the browser, `firestore.rules` is the only
thing guarding the database. Both collections are **write-only to the public**:
anyone may create a submission whose shape exactly matches the Zod schema,
and nobody may read, edit or delete one. Everything else is denied.

The rules duplicate the field constraints in `src/lib/contact.ts` and
`src/lib/volunteer.ts`. **If you change a schema, change the rules to match**,
or valid submissions will start being rejected.

Deploy rules after any change:

```bash
firebase deploy --only firestore:rules
```

The six `NEXT_PUBLIC_FIREBASE_*` values in `.env.example` are public
identifiers, not credentials. Without them the forms still email, they just
skip the archive.

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

## Adding photography back

The site was deliberately built without images, so adding them is additive
rather than a rewrite. The places designed to take a photo again:

| Location | What it was |
| --- | --- |
| `src/components/home/hero.tsx` | Two-column split, image beside the headline |
| `src/app/about/page.tsx` | Portrait panel beside the founding story |
| `src/app/projects/page.tsx` | Card header, with the icon and stat overlaid |
| `src/app/projects/[slug]/page.tsx` | Image beside the project title |
| `src/components/news-card.tsx` | Card header, with the category badge overlaid |

Use `next/image` with explicit `sizes`, and put files under `public/images/`.
`npm run placeholders` regenerates the old placeholder artwork if you want
something to lay out against before real photos arrive.

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

Hosted on Vercel, which needs no build configuration for Next.js. Import
`github.com/mazanaqvi/azrasafdar` at [vercel.com/new](https://vercel.com/new)
and push to `main` to deploy.

`vercel.json` pins Vercel Functions to Mumbai (`bom1`), the closest region to
Pakistan. Builds always run in Washington regardless; only request handling is
affected.

Set these in Vercel under Settings → Environment Variables, for Production,
Preview and Development:

```
RESEND_API_KEY
RESEND_FROM_EMAIL
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

The `NEXT_PUBLIC_` values are inlined at build time, so changing one needs a
redeploy, not just a restart. Values are in `.env.local`.

### Domain

`azrasafdar.org` is registered with GoDaddy, and `site.url` in
`src/lib/site.ts` already points at it — that value feeds the sitemap,
robots.txt and share metadata.

The apex domain is the primary; `www` redirects to it. To connect it, add both
`azrasafdar.org` and `www.azrasafdar.org` in Vercel under Settings → Domains,
then copy the **A record IP and CNAME target Vercel shows you** into GoDaddy's
DNS manager. Do not reuse values from a guide: Vercel assigns each project its
own Anycast IP and its own `*.vercel-dns-*.com` CNAME target.

In GoDaddy, delete the parked-page records GoDaddy creates by default (an `A`
record on `@` pointing at their holding page, and the `www` CNAME), or they
will conflict.

If you ever add a CAA record to the domain, it must include
`0 issue "letsencrypt.org"` or Vercel cannot issue the SSL certificate.

> Firebase App Hosting was the original plan but requires the Blaze
> pay-as-you-go plan. Vercel's free tier runs this app in full, Server Actions
> included, and Firestore stays free on Spark.
