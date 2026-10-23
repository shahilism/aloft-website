import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FieldError {
  @ApiProperty({ example: 'email' })
  field: string;

  @ApiProperty({ example: ['Enter a valid business email address.'] })
  messages: string[];
}

/** Shape of every error response returned by the API. */
export class ApiErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 'Validation failed' })
  message: string;

  @ApiPropertyOptional({ type: [FieldError] })
  details?: FieldError[];

  @ApiProperty({ example: '/api/v1/contact' })
  path: string;

  @ApiProperty({ example: '2026-10-22T10:00:00.000Z' })
  timestamp: string;
}
