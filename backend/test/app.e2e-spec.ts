import { Test } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import type { App } from 'supertest/types';
import { configureApp } from '../src/app.factory';
import { AppModule } from '../src/app.module';
import { MailService } from '../src/mail/mail.service';
import { PrismaService } from '../src/prisma/prisma.service';

/** In-memory stand-in for the parts of Prisma the API uses. */
function createFakePrisma() {
  const enquiries: Record<string, unknown>[] = [];
  const projects = [
    {
      id: 'p1',
      slug: 'published-project',
      title: 'Published project',
      summary: 'A verified case study',
      buildingType: 'Commercial office',
      location: 'Malappuram',
      system: 'VRF',
      capacity: null,
      scope: 'Scope',
      servicesProvided: ['Refrigerant piping'],
      serviceSlugs: ['vrf-vrv-systems'],
      challenge: 'c',
      solution: 's',
      execution: 'e',
      outcome: 'o',
      published: true,
      sortOrder: 1,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
    },
    { slug: 'draft-project', published: false, serviceSlugs: [], images: [] },
  ];
  const matches = (p: (typeof projects)[number], where: Record<string, unknown> = {}) =>
    (where.published === undefined || p.published === where.published) &&
    (where.slug === undefined || p.slug === where.slug);
  let dbUp = true;
  return {
    enquiries,
    setDbUp: (v: boolean) => (dbUp = v),
    fake: {
      isHealthy: async () => dbUp,
      $disconnect: async () => undefined,
      enquiry: {
        create: async ({ data }: { data: Record<string, unknown> }) => {
          if (!dbUp) throw new Error('db down');
          const row = { id: `00000000-0000-4000-8000-00000000000${enquiries.length + 1}`, createdAt: new Date(), ...data };
          enquiries.push(row);
          return row;
        },
        update: async () => ({}),
      },
      project: {
        findMany: async ({ where }: { where: Record<string, unknown> }) => projects.filter((p) => matches(p, where)),
        findFirst: async ({ where }: { where: Record<string, unknown> }) =>
          projects.find((p) => matches(p, where)) ?? null,
      },
    },
  };
}

const validEnquiry = () => ({
  fullName: 'Anil Kumar',
  companyName: 'Example Developers',
  email: 'facilities@example.com',
  phone: '+91 95449 27508',
  projectLocation: 'Perinthalmanna',
  service: 'chilled-water',
  buildingType: 'hospitality',
  approxArea: '40,000 sq ft',
  projectStage: 'planning',
  message: 'New hotel block, evaluating chilled-water versus VRF.',
  sourcePath: '/services/chilled-water-systems',
  website: '',
  startedAt: Date.now() - 30_000,
});

describe('ALOFT API (e2e)', () => {
  let app: NestExpressApplication;
  let server: App;
  let db: ReturnType<typeof createFakePrisma>;

  beforeAll(async () => {
    db = createFakePrisma();
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(db.fake)
      .overrideProvider(MailService)
      .useValue({ sendEnquiryNotification: async () => false, enabled: false })
      .compile();
    app = moduleRef.createNestApplication<NestExpressApplication>({ bodyParser: false });
    configureApp(app);
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/health', () => {
    it('reports ok when the database is reachable', async () => {
      const res = await request(server).get('/api/v1/health').expect(200);
      expect(res.body).toMatchObject({ status: 'ok', checks: { database: 'up' } });
    });

    it('reports 503 degraded when the database is down', async () => {
      db.setDbUp(false);
      const res = await request(server).get('/api/v1/health').expect(503);
      expect(res.body.status).toBe('degraded');
      db.setDbUp(true);
    });
  });

  describe('services', () => {
    it('lists all five services in page order', async () => {
      const res = await request(server).get('/api/v1/services').expect(200);
      expect(res.body.meta.count).toBe(5);
      expect(res.body.data[0].slug).toBe('hvac-design');
      expect(res.body.data[0].path).toBe('/services/hvac-design');
    });

    it('returns one service and 404s for unknown slugs', async () => {
      await request(server).get('/api/v1/services/hvac-amc').expect(200);
      const res = await request(server).get('/api/v1/services/furnace-repair').expect(404);
      expect(res.body).toMatchObject({ statusCode: 404, error: 'Not Found', path: '/api/v1/services/furnace-repair' });
    });
  });

  describe('projects', () => {
    it('serves published projects only', async () => {
      const res = await request(server).get('/api/v1/projects').expect(200);
      expect(res.body.data.map((p: { slug: string }) => p.slug)).toEqual(['published-project']);
    });

    it('hides draft projects from detail lookups', async () => {
      await request(server).get('/api/v1/projects/published-project').expect(200);
      await request(server).get('/api/v1/projects/draft-project').expect(404);
    });

    it('validates the service filter', async () => {
      await request(server).get('/api/v1/projects?service=DROP%20TABLE').expect(400);
    });
  });

  describe('POST /api/v1/contact', () => {
    it('rejects invalid input with per-field details', async () => {
      const res = await request(server)
        .post('/api/v1/contact')
        .send({ ...validEnquiry(), email: 'nope', service: 'heating' })
        .expect(400);
      expect(res.body.message).toBe('Validation failed');
      const fields = res.body.details.map((d: { field: string }) => d.field);
      expect(fields).toEqual(expect.arrayContaining(['email', 'service']));
      expect(db.enquiries).toHaveLength(0);

      const missing = await request(server).post('/api/v1/contact').send({}).expect(400);
      const byField = Object.fromEntries(
        missing.body.details.map((d: { field: string; messages: string[] }) => [d.field, d.messages[0]]),
      );
      expect(byField.fullName).toBe('Enter your full name.');
      expect(byField.email).toBe('Enter a valid business email address.');
      expect(byField.projectLocation).toBe('Enter the project location.');
    });

    it('stores a valid enquiry and returns a receipt', async () => {
      const res = await request(server).post('/api/v1/contact').send(validEnquiry()).expect(201);
      expect(res.body.data.id).toMatch(/^[0-9a-f-]{36}$/);
      expect(db.enquiries).toHaveLength(1);
      expect(db.enquiries[0]).toMatchObject({ service: 'chilled-water', sourcePath: '/services/chilled-water-systems' });
    });

    it('returns 503 when the enquiry cannot be stored', async () => {
      db.setDbUp(false);
      const res = await request(server).post('/api/v1/contact').send(validEnquiry()).expect(503);
      expect(res.body.message).toMatch(/could not submit/);
      db.setDbUp(true);
    });

    it('rate-limits repeated submissions', async () => {
      // Limit is 4 per window (see setup-env); four requests were already made above.
      const res = await request(server).post('/api/v1/contact').send(validEnquiry()).expect(429);
      expect(res.body.statusCode).toBe(429);
    });

    it('rejects oversized payloads', async () => {
      await request(server)
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ message: 'x'.repeat(30_000) }))
        .expect(413);
    });
  });

  it('applies security headers and CORS', async () => {
    const res = await request(server).get('/api/v1/services').set('Origin', 'http://localhost:3000').expect(200);
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(res.headers['x-powered-by']).toBeUndefined();

    const blocked = await request(server).get('/api/v1/services').set('Origin', 'https://evil.example');
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined();
  });
});
