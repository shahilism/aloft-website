import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import type { FieldError } from './api-error';

function flatten(errors: ValidationError[], parent = ''): FieldError[] {
  return errors.flatMap((e) => {
    const field = parent ? `${parent}.${e.property}` : e.property;
    const own = e.constraints ? [{ field, messages: Object.values(e.constraints) }] : [];
    return [...own, ...flatten(e.children ?? [], field)];
  });
}

/** Strict validation: unknown fields are rejected, values are transformed to DTO types. */
export function createValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    stopAtFirstError: true,
    exceptionFactory: (errors) =>
      new BadRequestException({ message: 'Validation failed', details: flatten(errors) }),
  });
}
