# ALOFT website API

NestJS REST API, versioned under `/api/v1`. The full OpenAPI 3 document is [`openapi.json`](openapi.json) (regenerate with `npm run openapi:export -w backend`); interactive docs are served at `/api/docs` when `SWAGGER_ENABLED=true`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/v1/health` | Liveness and database check. `200 {status:"ok"}` or `503 {status:"degraded"}` |
| GET | `/api/v1/services` | All five services (same source as the website pages) |
| GET | `/api/v1/services/:slug` | One service, or `404` |
| GET | `/api/v1/projects?service=<slug>` | Published case studies, optionally filtered by related service |
| GET | `/api/v1/projects/:slug` | One published case study, or `404` |
| POST | `/api/v1/contact` | Submit an enquiry |

## Responses

Success: `{ "data": ... }`, plus `"meta": { "count": n }` for lists.

Errors always use this shape:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": [{ "field": "email", "messages": ["Enter a valid business email address."] }],
  "path": "/api/v1/contact",
  "timestamp": "2026-10-22T10:00:00.000Z"
}
```

Internal error details are logged server-side and never returned.

## POST /api/v1/contact

```json
{
  "fullName": "Anil Kumar",
  "companyName": "Example Developers",
  "email": "facilities@example.com",
  "phone": "+91 95449 27508",
  "projectLocation": "Perinthalmanna",
  "service": "chilled-water",
  "buildingType": "hospitality",
  "approxArea": "40,000 sq ft",
  "projectStage": "planning",
  "message": "New hotel block, evaluating chilled-water versus VRF.",
  "sourcePath": "/services/chilled-water-systems",
  "website": "",
  "startedAt": 1792658000000
}
```

- `service`: `hvac-design | vrf-vrv | ducting | chilled-water | amc | upgrade | other`
- `buildingType`: `office | coworking | education | hospitality | retail | healthcare | industrial | other`
- `projectStage`: `planning | construction | upgrade | maintenance | unsure`
- `companyName`, `approxArea`, `sourcePath` are optional. Unknown fields are rejected.

| Status | Meaning |
|---|---|
| 201 | Stored. `{ data: { id, receivedAt } }` |
| 400 | Validation failed; see `details` |
| 413 | Body over 20 KB |
| 429 | Rate limit (default 5 per client per 10 minutes) |
| 503 | Could not be stored; nothing was saved |

Spam protection: a honeypot field (`website`) and a minimum fill time (`startedAt`, default 3 s). Suspected bots get a normal-looking 201 but nothing is stored or emailed. Client IPs are stored only as salted SHA-256 hashes.

When SMTP is configured, ALOFT receives a plain-text email per enquiry with reply-to set to the enquirer; a failed email never fails the request (`notifiedAt` stays null).

## Security

Helmet headers, CORS restricted to `CORS_ORIGINS` (GET/POST only), strict DTO validation with whitelisting, control-character filtering on single-line fields, 20 KB body limit, global rate limit of 120 requests/minute, env validation at startup (the API refuses to boot on bad configuration).
