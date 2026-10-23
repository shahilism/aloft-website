/**
 * Writes the OpenAPI document to a file without starting the HTTP server or
 * touching the database: `npm run openapi:export -w backend`.
 */
import 'reflect-metadata';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

process.env.DATABASE_URL ??= 'postgresql://unused:unused@localhost:5432/unused';
process.env.NODE_ENV ??= 'development';
process.env.LOG_LEVEL ??= 'warn';

async function run(): Promise<void> {
  const { NestFactory } = await import('@nestjs/core');
  const { AppModule } = await import('../app.module');
  const { buildOpenApiDocument, configureApp } = await import('../app.factory');
  const app = await NestFactory.create(AppModule, { logger: false, bodyParser: false });
  configureApp(app as never);
  await app.init();
  const out = resolve(process.argv[2] ?? 'openapi.json');
  writeFileSync(out, JSON.stringify(buildOpenApiDocument(app), null, 2) + '\n');
  await app.close();
  console.log(`OpenAPI document written to ${out}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
