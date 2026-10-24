# ALOFT Centralized Cooling Solutions — website

Website for ALOFT, built on the layout of the [Tempra](https://tempra.framer.website) template with ALOFT's approved content and brand guideline. It is a static Next.js site with no backend or database of its own.

| Part | Stack | Folder |
|---|---|---|
| Website | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion | [`frontend/`](frontend) |
| Content | Approved copy, services, projects, enquiry options | [`packages/content/`](packages/content) |

Docs: [content map](docs/CONTENT_MAP.md) · [image credits](docs/image-credits.json)

## How it works

- **Every page is prerendered** from `packages/content` at build time. Changing copy, services or projects means editing that package and redeploying.
- **Enquiries** are validated in the browser, then sent one of two ways:
  - **With `NEXT_PUBLIC_FORM_ENDPOINT` set** (recommended): posted as JSON to a hosted form service such as [Formspree](https://formspree.io), which emails ALOFT each enquiry with every answer labelled. The confirmation message shows only after the service accepts it.
  - **Without it:** the visitor's email app opens with the enquiry pre-filled and addressed to ALOFT, and the page tells them to press send. No confirmation is claimed, because the site can't know whether it was sent.
- Basic spam protection runs in the browser (hidden honeypot field and a minimum fill time). Hosted form services add their own filtering.

## Local development

Requires Node.js 20.11+ (22 recommended, see `.nvmrc`). `next build` needs network access once to download the Jost and JetBrains Mono fonts, which are then self-hosted.

```bash
npm install                                  # installs workspaces and builds packages/content
cp frontend/.env.example frontend/.env.local
npm run dev                                  # http://localhost:3000
```

After editing `packages/content`, run `npm run build:content` (the site reads its compiled output).

## Checks

```bash
npm test          # content rules (7) + form validation and submission helpers (5)
npm run lint
npm run typecheck
npm run build
```

The content tests enforce the brand writing rules (no `!`, no 24/7 claims, no `$` prices), unique metadata, complete service pages, and that any published project has no `[placeholders]` and has alt text on every image.

## Managing content

- **Copy, services, FAQs, contact details:** `packages/content/src/*.ts`.
- **Publishing a case study:** add an entry to `projects` in `packages/content/src/projects.ts` (the file shows a complete example) and put its photos in `frontend/public/images/projects/`. Publish only verified, client-approved projects. Its page, sitemap entry and home-page card appear automatically.

## Deployment (Vercel)

The repo is set up for Vercel: the root `vercel-build` script builds the content package and the site.

1. Project root: repository root; framework: Next.js; output: `frontend/.next`.
2. Environment variables: `NEXT_PUBLIC_SITE_URL` (e.g. `https://aloftac.com`), `NEXT_PUBLIC_FORM_ENDPOINT`, and optionally `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`. Set `NEXT_PUBLIC_NOINDEX=true` on preview deployments. These are baked in at build time, so redeploy after changing them.
3. After the domain is live, submit `https://<domain>/sitemap.xml` in Google Search Console. With analytics on, enquiries fire a `generate_lead` event.

## Before launch — needs ALOFT's input

- **Set up the enquiry form service** (create a Formspree form sending to ALOFT's inbox and set `NEXT_PUBLIC_FORM_ENDPOINT`). Until then enquiries rely on the visitor sending the pre-filled email.
- **Confirm contact details.** Phone `+91 95449 27508`, email `aloftac@gmail.com` and Perinthalmanna, Malappuram come from ALOFT's own proposals. Working hours are hidden until supplied (`site.ts`).
- **Real case studies and photographs.** The projects section shows an honest empty state until one is published.
- **Legal review** of the privacy policy and terms (`legal.ts`). If a form service is used, the privacy policy should name it as a provider that processes enquiry data.
- **Team section** (About) once real names, roles and photos are supplied; client logos or testimonials only with written permission.
