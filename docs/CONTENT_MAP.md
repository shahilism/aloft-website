# Content map

How each part of the **Website content draft** maps onto the **Tempra** reference layout, and where the copy lives in code. All copy is in [`packages/content/src`](../packages/content/src); components only render it.

Conventions applied everywhere (brand guideline, boards 02 and 08):

- Headings and buttons in **sentence case**; labels in uppercase JetBrains Mono. Meaning and wording are otherwise unchanged from the draft.
- No exclamation marks, no unverified 24/7 claims, no prices, no invented metrics, testimonials, team members or awards. A test in `packages/content` enforces the first three.
- Copper is used for the page's primary action only.

## Global

| Element | Source | Template equivalent | Code |
|---|---|---|---|
| Header: logo, Services · Projects · Contact · About, "Discuss your project" | Brief (primary CTA); brand board 20 | Tempra header with "24/7 Emergency Call" button | `components/layout/Header.tsx`, `site.ts` |
| Closing band: headline, copy, direct contact, enquiry form | Page 1 §12; Page 6 form | Tempra blue "Ready to master your indoor climate?" band | `components/sections/CtaBand.tsx` |
| Footer: contact, page links, services, legal, tagline | Page 1 §12 footer | Tempra footer with giant wordmark (official lockup used instead) | `components/layout/Footer.tsx` |
| Contact details | ALOFT proposals/work orders (phone, email, Perinthalmanna, Malappuram) | Tempra Seattle address (removed) | `site.ts` |

## Page 1 — Home `/`

SEO title: *ALOFT \| Commercial HVAC & Centralized Cooling Solutions in Kerala* · Meta: draft Page 10 table · Primary CTA: Get a project quote / Discuss your project

| § | Draft section | Tempra section | Assets | Notes |
|---|---|---|---|---|
| 1 | Hero | Split hero + wide photo | `hero-ahu-plant-room.jpg` | Accent on "modern buildings", as Tempra accents its last words |
| 2 | Trust strip | "Trusted by 20+ companies" logo marquee | Service line icons | Uses service pillars, per draft (no unverified client count) |
| 3 | Who we are | Who we are + large quote | — | Second paragraph set as the large statement |
| 4 | Proof points | Four statistics | Line icons | Four proof points; no numbers |
| 5 | Our services | Service cards (image left) | `service-*.jpg` | VRF, ducting, chilled water, AMC; bullets are the first three "What we cover" items |
| 6 | Our process | Sticky intro + step cards | Line-icon tiles | Icon tiles replace stock photos |
| 7 | ALOFT difference | Four value cards | Line icons | |
| 8 | Visual proof | Project cards with before/after slider | From API | Shows published projects only; honest empty state until real case studies exist |
| 9 | Maintenance / AMC | Two pricing cards | — | Enquiry-led, no prices; heading and intro from the AMC service page (4E) |
| 10 | Testimonials → **Who we work with** | Testimonial carousel | Sector icons | Draft instructs this replacement; sectors from the FAQ, audience lines from brand board 02 (not presented as quotes) |
| 11 | FAQ | FAQ with help card | — | All five Q&As; FAQPage structured data |
| 12 | Final CTA | Closing band | — | Primary and secondary CTAs |

## Page 2 — About `/about`

SEO: *About ALOFT \| HVAC Engineering Company in Kerala*

| Draft section | Tempra section | Notes |
|---|---|---|
| Hero | About hero with accent | |
| Our journey | "Our journey" header + image + list | Image `installation-crew-chiller-lift.jpg`; mission and vision as the list rows |
| Core values | "The Tempra standard" cards | Section title is the mission line from brand board 01 |
| Meet the team | Leadership grid | **Omitted** until real photos, names and roles are supplied (draft instruction) |
| — | Awards | **Omitted** (Tempra's awards are fictional) |
| CTA | Closing band | "Let's discuss your next project." |

## Page 3 — Services `/services`

SEO: *HVAC Services in Kerala \| ALOFT*. Hero, five service cards (HVAC design first), closing band with "Request HVAC consultation" as the submit label.

## Page 4 — Service details `/services/[slug]`

One reusable layout (Tempra's CMS service page): H1 + summary + CTA, wide image, "What we cover" sidebar, introduction, delivery process, related services, closing band with the service's own CTA and the form's service pre-selected.

| Slug | H1 | CTA | Image |
|---|---|---|---|
| `hvac-design` | HVAC design that starts with your building. | Discuss your HVAC design requirements | `service-design.jpg` |
| `vrf-vrv-systems` | Flexible multi-zone cooling for commercial buildings. | Request a VRF / VRV project quote | `service-vrf-rooftop.jpg` |
| `hvac-ducting` | Engineered air distribution for commercial spaces. | Discuss your ducting project | `service-ducting.jpg` |
| `chilled-water-systems` | Centralized cooling for demanding building requirements. | Discuss your chilled-water project | `service-chilled-water.jpg` |
| `hvac-amc` | Planned maintenance for your cooling infrastructure. | Request an AMC proposal | `service-maintenance.jpg` |

## Page 5 — Projects `/projects`, `/projects/[slug]`

Served by the NestJS API from PostgreSQL. The draft's three case-study structures are seeded as **unpublished drafts** with placeholders; they are never shown publicly. Detail layout follows Tempra: hero, before/after slider, fact bar (building type, location, system, capacity), The challenge / The ALOFT solution / Execution / Project outcome, scope sidebar, more projects, closing band ("Have a similar project? Talk to ALOFT.").

## Page 6 — Contact `/contact`

All ten form fields and seven service options from the draft; "Request a project consultation" submit; the confirmation message appears **only after the API confirms the enquiry was stored**.

## Pages 7–9 — Legal and 404

`/privacy-policy` and `/terms` follow the draft's section outlines (text in `legal.ts`, **pending legal review**). 404 uses the draft copy.

## Page 10 — SEO

Every indexable page has a unique title and description (from the draft table), canonical URL, Open Graph and Twitter cards, one H1, sitemap entry, and structured data: HVACBusiness (all pages), FAQPage (home), Service and BreadcrumbList (service pages), BreadcrumbList (projects).

## Imagery

All photographs are public-domain or CC0 files from Wikimedia Commons, colour-graded toward Petrol per the brand's "cool grade" rule. They illustrate equipment types only and are **not presented as ALOFT projects**. Sources and authors are listed in [`image-credits.json`](image-credits.json). Replace them with ALOFT site photography as projects are documented (brand board 11).
