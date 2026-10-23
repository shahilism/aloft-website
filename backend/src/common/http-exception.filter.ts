import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import type { ApiErrorResponse, FieldError } from './api-error';

/**
 * Converts every thrown error into the documented ApiErrorResponse shape.
 * Unexpected errors are logged in full but never exposed to clients.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred. Please try again later.';
    let details: FieldError[] | undefined;

    if (exception instanceof ThrottlerException) {
      status = HttpStatus.TOO_MANY_REQUESTS;
      message = 'Too many requests. Please wait a few minutes and try again.';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else if (body && typeof body === 'object') {
        const b = body as { message?: unknown; details?: FieldError[] };
        message = Array.isArray(b.message) ? b.message.join('; ') : String(b.message ?? exception.message);
        details = b.details;
      }
    } else if (isClientError(exception)) {
      // body-parser errors (malformed JSON, payload too large) carry a safe status and message.
      status = exception.status;
      message = status === HttpStatus.PAYLOAD_TOO_LARGE ? 'Request body is too large.' : 'Malformed request body.';
    } else {
      this.logger.error(exception instanceof Error ? exception.stack : String(exception), `${req.method} ${req.url}`);
    }

    const payload: ApiErrorResponse = {
      statusCode: status,
      error: HttpStatus[status]
        ? HttpStatus[status]
            .toLowerCase()
            .split('_')
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(' ')
        : 'Error',
      message,
      ...(details ? { details } : {}),
      path: req.originalUrl ?? req.url,
      timestamp: new Date().toISOString(),
    };
    res.status(status).json(payload);
  }
}

function isClientError(e: unknown): e is { status: number; expose: true } {
  if (!e || typeof e !== 'object') return false;
  const { status, expose } = e as { status?: unknown; expose?: unknown };
  return expose === true && typeof status === 'number' && status >= 400 && status < 500;
}
