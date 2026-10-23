// Must run before any app module is imported: some limits are read at load time.
// Values set here take precedence over any local .env file.
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.CORS_ORIGINS = 'http://localhost:3000';
process.env.SWAGGER_ENABLED = 'false';
process.env.PROJECTS_INCLUDE_DRAFTS = 'false';
process.env.CONTACT_RATE_LIMIT = '4';
process.env.CONTACT_RATE_TTL_SECONDS = '600';
process.env.CONTACT_MIN_FILL_MS = '3000';
process.env.SMTP_HOST = '';
