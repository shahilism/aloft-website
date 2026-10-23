import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { Enquiry } from '@prisma/client';
import {
  buildingTypeOptions,
  enquiryFieldLabels,
  enquiryServiceOptions,
  labelFor,
  projectStageOptions,
} from '@aloft/content';
import { createTransport, type Transporter } from 'nodemailer';
import { AppConfigService } from '../config/app-config.service';

/**
 * Sends a plain-text notification to ALOFT for each new enquiry.
 * Optional: when SMTP is not configured, enquiries are still stored.
 */
@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;

  constructor(private readonly config: AppConfigService) {}

  onModuleInit(): void {
    if (!this.config.mailEnabled) {
      this.logger.warn('SMTP is not configured: enquiries will be stored but no notification email is sent.');
      return;
    }
    this.transporter = createTransport({
      host: this.config.get('SMTP_HOST'),
      port: this.config.get('SMTP_PORT') ?? 587,
      secure: this.config.get('SMTP_SECURE') ?? false,
      auth: this.config.get('SMTP_USER')
        ? { user: this.config.get('SMTP_USER'), pass: this.config.get('SMTP_PASS') }
        : undefined,
    });
  }

  get enabled(): boolean {
    return this.transporter !== null;
  }

  async sendEnquiryNotification(enquiry: Enquiry): Promise<boolean> {
    if (!this.transporter) return false;
    const service = labelFor(enquiryServiceOptions, enquiry.service);
    await this.transporter.sendMail({
      from: this.config.get('MAIL_FROM'),
      to: this.config.get('ENQUIRY_NOTIFY_TO'),
      replyTo: { name: enquiry.fullName, address: enquiry.email },
      subject: `New website enquiry: ${service} — ${enquiry.fullName}`,
      text: formatEnquiry(enquiry),
    });
    return true;
  }
}

export function formatEnquiry(e: Enquiry): string {
  const rows: [string, string | null][] = [
    [enquiryFieldLabels.fullName, e.fullName],
    ['Company name', e.companyName],
    [enquiryFieldLabels.email, e.email],
    [enquiryFieldLabels.phone, e.phone],
    [enquiryFieldLabels.projectLocation, e.projectLocation],
    [enquiryFieldLabels.service, labelFor(enquiryServiceOptions, e.service)],
    [enquiryFieldLabels.buildingType, labelFor(buildingTypeOptions, e.buildingType)],
    [enquiryFieldLabels.approxArea, e.approxArea],
    [enquiryFieldLabels.projectStage, labelFor(projectStageOptions, e.projectStage)],
    ['Sent from page', e.sourcePath],
    ['Received', e.createdAt.toISOString()],
    ['Reference', e.id],
  ];
  const lines = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  return `${lines.join('\n')}\n\n${enquiryFieldLabels.message}:\n${e.message}\n`;
}
