import { plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateIf,
  validateSync,
} from 'class-validator';

const toBool = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? ['1', 'true', 'yes'].includes(value.toLowerCase()) : value;
const toInt = ({ value }: { value: unknown }) => (value === undefined || value === '' ? undefined : Number(value));

export class EnvironmentVariables {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: 'development' | 'production' | 'test' = 'development';

  @Transform(toInt)
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT = 4000;

  @IsString()
  @MinLength(1)
  DATABASE_URL: string;

  /** Comma-separated list of allowed browser origins, e.g. "https://aloftac.com". */
  @IsString()
  CORS_ORIGINS = 'http://localhost:3000';

  /** Number of trusted reverse proxies in front of the API (for client IPs). */
  @Transform(toInt)
  @IsInt()
  @Min(0)
  TRUST_PROXY = 0;

  @IsIn(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
  LOG_LEVEL = 'info';

  @Transform(toBool)
  @IsBoolean()
  SWAGGER_ENABLED = true;

  /** Local layout preview only: also serve unpublished draft projects. Never enable in production. */
  @Transform(toBool)
  @IsBoolean()
  PROJECTS_INCLUDE_DRAFTS = false;

  @ValidateIf((env: EnvironmentVariables) => env.NODE_ENV === 'production')
  @IsString()
  @MinLength(16, { message: 'IP_HASH_SALT must be at least 16 characters in production' })
  IP_HASH_SALT = 'dev-only-salt-change-me';

  @Transform(toInt)
  @IsInt()
  @Min(1)
  CONTACT_RATE_LIMIT = 5;

  @Transform(toInt)
  @IsInt()
  @Min(1)
  CONTACT_RATE_TTL_SECONDS = 600;

  /** Submissions completed faster than this are treated as automated. */
  @Transform(toInt)
  @IsInt()
  @Min(0)
  CONTACT_MIN_FILL_MS = 3000;

  @IsOptional()
  @IsString()
  SMTP_HOST?: string;

  @Transform(toInt)
  @IsOptional()
  @IsInt()
  SMTP_PORT?: number;

  @Transform(toBool)
  @IsOptional()
  @IsBoolean()
  SMTP_SECURE?: boolean;

  @IsOptional()
  @IsString()
  SMTP_USER?: string;

  @IsOptional()
  @IsString()
  SMTP_PASS?: string;

  @ValidateIf((env: EnvironmentVariables) => Boolean(env.SMTP_HOST))
  @IsString()
  MAIL_FROM?: string;

  @ValidateIf((env: EnvironmentVariables) => Boolean(env.SMTP_HOST))
  @IsEmail()
  ENQUIRY_NOTIFY_TO?: string;
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  const validated = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: false });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    const details = errors.map((e) => `${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`).join('\n  ');
    throw new Error(`Invalid environment configuration:\n  ${details}`);
  }
  return validated;
}
