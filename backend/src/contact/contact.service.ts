import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { createHash, randomUUID } from 'node:crypto';
import { AppConfigService } from '../config/app-config.service';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateEnquiryDto, EnquiryReceipt } from './create-enquiry.dto';

export interface RequestMeta {
  ip?: string;
  userAgent?: string;
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly config: AppConfigService,
  ) {}

  async createEnquiry(dto: CreateEnquiryDto, meta: RequestMeta): Promise<EnquiryReceipt> {
    if (this.looksAutomated(dto)) {
      // Respond like a success so bots learn nothing, but store and send nothing.
      this.logger.warn('Suppressed an enquiry that failed the honeypot or timing check');
      return { id: randomUUID(), receivedAt: new Date().toISOString() };
    }

    const { website: _website, startedAt: _startedAt, ...fields } = dto;
    let enquiry;
    try {
      enquiry = await this.prisma.enquiry.create({
        data: {
          ...fields,
          ipHash: meta.ip ? this.hashIp(meta.ip) : null,
          userAgent: meta.userAgent?.slice(0, 300) ?? null,
        },
      });
    } catch (err) {
      this.logger.error(`Failed to store enquiry: ${err instanceof Error ? err.message : String(err)}`);
      throw new ServiceUnavailableException(
        'We could not submit your enquiry right now. Please try again shortly or contact us by phone or email.',
      );
    }

    // The enquiry is safely stored; a failed notification must not fail the request.
    try {
      if (await this.mail.sendEnquiryNotification(enquiry)) {
        await this.prisma.enquiry.update({ where: { id: enquiry.id }, data: { notifiedAt: new Date() } });
      }
    } catch (err) {
      this.logger.error(
        `Enquiry ${enquiry.id} stored but notification failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    this.logger.log(`Enquiry ${enquiry.id} received (${enquiry.service})`);
    return { id: enquiry.id, receivedAt: enquiry.createdAt.toISOString() };
  }

  private looksAutomated(dto: CreateEnquiryDto): boolean {
    if (dto.website && dto.website.trim() !== '') return true;
    if (typeof dto.startedAt === 'number') {
      const elapsed = Date.now() - dto.startedAt;
      if (elapsed < this.config.get('CONTACT_MIN_FILL_MS')) return true;
    }
    return false;
  }

  private hashIp(ip: string): string {
    return createHash('sha256').update(`${this.config.get('IP_HASH_SALT')}:${ip}`).digest('hex');
  }
}
