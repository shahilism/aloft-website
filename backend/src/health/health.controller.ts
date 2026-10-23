import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiServiceUnavailableResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

class HealthChecks {
  @ApiProperty({ enum: ['up', 'down'] })
  database: 'up' | 'down';
}

export class HealthResponse {
  @ApiProperty({ enum: ['ok', 'degraded'] })
  status: 'ok' | 'degraded';

  @ApiProperty({ example: 1234.5, description: 'Process uptime in seconds' })
  uptime: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty({ type: HealthChecks })
  checks: HealthChecks;
}

@ApiTags('Health')
@SkipThrottle()
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: HealthResponse, description: 'API and database are available.' })
  @ApiServiceUnavailableResponse({ type: HealthResponse, description: 'Database is unreachable.' })
  async check(@Res({ passthrough: true }) res: Response): Promise<HealthResponse> {
    const dbUp = await this.prisma.isHealthy();
    if (!dbUp) res.status(HttpStatus.SERVICE_UNAVAILABLE);
    return {
      status: dbUp ? 'ok' : 'degraded',
      uptime: Math.round(process.uptime() * 10) / 10,
      timestamp: new Date().toISOString(),
      checks: { database: dbUp ? 'up' : 'down' },
    };
  }
}
