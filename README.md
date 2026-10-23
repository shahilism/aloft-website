# ALOFT Centralized Cooling Solutions — website

Production website for ALOFT, built on the layout of the [Tempra](https://tempra.framer.website) template with ALOFT's approved content and brand guideline.

| Part | Stack | Folder |
|---|---|---|
| Website | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion | [`frontend/`](frontend) |
| API | NestJS 11, TypeScript, class-validator, Swagger, Pino | [`backend/`](backend) |
| Database | PostgreSQL + Prisma 6 (schema, migrations, seed) | [`database/`](database) |
| Shared content | Approved copy, service data, enquiry options, API types | [`packages/content/`](packages/content) |

Docs: [content map](docs/CONTENT_MAP.md) · [API](docs/API.md) · [OpenAPI](docs/openapi.json) · [image credits](docs/image-credits.json)

## How it fits together

- **Pages are static or ISR.** Home, about, services and legal pages are prerendered from `@aloft/content`, so they never depend on the API being up.
- **Projects come from the API.** `/projects` and the home showcase fetch `GET /api/v1/projects` and revalidate every 5 minutes. If the API is unreachable they show an "unavailable" state instead of breaking.
- **Enquiries go to the API.** The browser posts to `POST /api/v1/contact`; the API validates, stores in PostgreSQL and optionally emails ALOFT. The site shows the confirmation only after a successful store.
- Copy is edited in one place (`packages/content/src`) and used by both apps.

## Requirements

- Node.js 20.11+ (22 recommended, see `.nvmrc`) and npm 10+
- PostgreSQL 14+ (or Docker: `docker compose up -d db`)
- Network access during `next build` (it downloads the Jost and JetBrains Mono fonts once, then self-hosts them)

## Local development

```bash
npm install                                  # installs all workspaces and builds @aloft/content

cp backend/.env.example backend/.env         # set DATABASE_URL
cp frontend/.env.example frontend/.env.local

docker compose up -d db                      # or point DATABASE_URL at your own PostgreSQL
npm run db:deploy                            # apply migrations
npm run db:seed                              # optional: unpublished case-study templates

npm run dev:backend                          # http://localhost:4000  (docs at /api/docs)
npm run dev:frontend                         # http://localhost:3000
```

To preview the project-card layouts with the seeded templates, set `PROJECTS_INCLUDE_DRAFTS=true` in `backend/.env`. Drafts are marked "Draft template — not published" and `noindex`. **Never enable this in production.**

After editing `packages/content`, run `npm run build:content` (the apps read its compiled output).

## Tests and checks

```bash
npm test             # content rules + backend unit + backend e2e
npm run test -w frontend
npm run lint
npm run typecheck
npm run build
```

| Suite | Covers |
|---|---|
| `packages/content` (7) | Slugs match the draft URLs, every service is complete, unique meta descriptions within length, brand writing rules (no `!`, no 24/7, no `$` prices), phone format |
| backend unit (24) | Enquiry storage, honeypot and timing spam guard, IP hashing, email failure tolerance, 503 on DB failure, DTO validation and header-injection safety, project visibility and mapping |
| backend e2e (13) | Every endpoint over HTTP: health ok/degraded, services, published-only projects, contact 201/400/413/429/503, security headers and CORS |
| frontend (4) | Client-side enquiry validation and payload shaping |

## Managing content

- **Copy, services, FAQs, contact details:** `packages/content/src/*.ts`, then rebuild.
- **Enquiries:** stored in the `enquiries` table. Browse with `npm run prisma:studio -w backend`, and/or set the SMTP variables so each enquiry is emailed to `ENQUIRY_NOTIFY_TO`.
- **Publishing a case study:** in the `projects` table, replace every bracketed placeholder with verified, client-approved details, add rows to `project_images` (kinds `COVER`, `BEFORE`, `AFTER`, `GALLERY`, with alt text), then set `published = true`. It appears within 5 minutes. Images on another host need that host in `PROJECT_IMAGE_HOSTS`.

## Deployment

Any Node host works; Docker images are provided.

```bash
docker compose up -d --build     # db + api (port 4000) + web (port 3000)
```

Production checklist:

1. **Database:** managed PostgreSQL; set `DATABASE_URL`. The API container runs `prisma migrate deploy` on start.
2. **API** (`backend/Dockerfile`): set `NODE_ENV=production`, a long random `IP_HASH_SALT`, `CORS_ORIGINS=https://aloftac.com`, `TRUST_PROXY=1` behind a load balancer, SMTP variables, and decide whether to keep `SWAGGER_ENABLED`. Health check: `GET /api/v1/health`.
3. **Website** (`frontend/Dockerfile`, standalone output): `NEXT_PUBLIC_*` values are baked in at build time, so pass them as build args. Set `API_INTERNAL_URL` if the server can reach the API on a private address.
4. **Domain and SEO:** serve over HTTPS, submit `https://<domain>/sitemap.xml` in Google Search Console (`NEXT_PUBLIC_GSC_VERIFICATION`), add `NEXT_PUBLIC_GA_ID` for analytics (enquiries fire a `generate_lead` event). Use `NEXT_PUBLIC_NOINDEX=true` on staging.
5. **Redirects:** if an older site existed at the domain, add 301 redirects from its URLs.

## Before launch — needs ALOFT's input

- **Confirm contact details.** Phone `+91 95449 27508`, email `aloftac@gmail.com` and Perinthalmanna, Malappuram are taken from ALOFT's own proposals. A business-domain email is recommended. Working hours are hidden until supplied (`site.ts`).
- **Real case studies and photographs.** The projects section shows an honest empty state until at least one verified, client-approved project is published.
- **Legal review** of the privacy policy and terms (`legal.ts`), as the content draft requires.
- **Team section** (About) can be added once real names, roles and photos are supplied.
- **Client logos or testimonials** only with written permission.
- **Logo files:** the site uses the supplied PNG masters (`logo-colour` and `logo-reversed` equivalents). An SVG master would render sharper on very large screens.
