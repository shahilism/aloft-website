import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { createValidationPipe } from './common/validation';
import { AppConfigService } from './config/app-config.service';

export const API_PREFIX = 'api';
export const DOCS_PATH = `${API_PREFIX}/docs`;

/** Applies the global HTTP configuration. Shared by main.ts and the e2e tests. */
export function configureApp(app: NestExpressApplication): void {
  const config = app.get(AppConfigService);

  app.set('trust proxy', config.get('TRUST_PROXY'));
  app.disable('x-powered-by');
  app.useBodyParser('json', { limit: '20kb' });

  const strictHelmet = helmet();
  const docsHelmet = helmet({ contentSecurityPolicy: false });
  app.use((req: { path: string }, res: unknown, next: () => void) =>
    (req.path.startsWith(`/${DOCS_PATH}`) ? docsHelmet : strictHelmet)(req as never, res as never, next),
  );

  app.enableCors({
    origin: config.corsOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    maxAge: 600,
  });

  app.setGlobalPrefix(API_PREFIX);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(createValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();
}

export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const doc = new DocumentBuilder()
    .setTitle('ALOFT Website API')
    .setDescription(
      'Public REST API behind the ALOFT Centralized Cooling Solutions website: project case studies, service content, enquiries and health.',
    )
    .setVersion('1.0')
    .build();
  return SwaggerModule.createDocument(app, doc);
}

export async function createApp(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true, bodyParser: false });
  app.useLogger(app.get(Logger));
  configureApp(app);
  if (app.get(AppConfigService).get('SWAGGER_ENABLED')) {
    SwaggerModule.setup(DOCS_PATH, app, () => buildOpenApiDocument(app), { jsonDocumentUrl: `${DOCS_PATH}/openapi.json` });
  }
  return app;
}
