import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/app-config.service';
import { ContactModule } from './contact/contact.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        pinoHttp: {
          level: config.get('NODE_ENV') === 'test' ? 'silent' : config.get('LOG_LEVEL'),
          transport: config.isProduction ? undefined : { target: 'pino-pretty', options: { singleLine: true } },
          redact: ['req.headers.authorization', 'req.headers.cookie'],
          // Request bodies (enquiry contents) are never logged.
          serializers: {
            req: (req: { method: string; url: string; id: unknown }) => ({ id: req.id, method: req.method, url: req.url }),
          },
          autoLogging: { ignore: (req) => req.url?.endsWith('/health') ?? false },
        },
      }),
    }),
    // Generous global default; the contact endpoint applies a much stricter limit.
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 120 }]),
    PrismaModule,
    MailModule,
    HealthModule,
    ServicesModule,
    ProjectsModule,
    ContactModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
