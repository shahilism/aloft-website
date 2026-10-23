import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { ApiErrorResponse } from '../common/api-error';
import { ContactService } from './contact.service';
import { CreateEnquiryDto, EnquiryReceiptResponse } from './create-enquiry.dto';

// Read at load time because decorator arguments are static.
const LIMIT = Number(process.env.CONTACT_RATE_LIMIT ?? 5);
const TTL_MS = Number(process.env.CONTACT_RATE_TTL_SECONDS ?? 600) * 1000;

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: LIMIT, ttl: TTL_MS } })
  @ApiOperation({
    summary: 'Submit a project enquiry',
    description: `Validates and stores an enquiry, then notifies ALOFT by email when SMTP is configured. Limited to ${LIMIT} submissions per client every ${TTL_MS / 60000} minutes.`,
  })
  @ApiCreatedResponse({ type: EnquiryReceiptResponse })
  @ApiBadRequestResponse({ type: ApiErrorResponse, description: 'Validation failed; see details per field.' })
  @ApiTooManyRequestsResponse({ type: ApiErrorResponse })
  @ApiServiceUnavailableResponse({ type: ApiErrorResponse, description: 'The enquiry could not be stored.' })
  async create(@Body() dto: CreateEnquiryDto, @Req() req: Request): Promise<EnquiryReceiptResponse> {
    const data = await this.contact.createEnquiry(dto, {
      ip: req.ip,
      userAgent: req.get('user-agent') ?? undefined,
    });
    return { data };
  }
}
