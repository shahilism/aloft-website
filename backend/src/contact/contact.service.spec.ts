import { ServiceUnavailableException } from '@nestjs/common';
import type { AppConfigService } from '../config/app-config.service';
import type { MailService } from '../mail/mail.service';
import type { PrismaService } from '../prisma/prisma.service';
import { ContactService } from './contact.service';
import type { CreateEnquiryDto } from './create-enquiry.dto';

const validDto = (): CreateEnquiryDto => ({
  fullName: 'Anil Kumar',
  email: 'facilities@example.com',
  phone: '+91 95449 27508',
  projectLocation: 'Malappuram',
  service: 'vrf-vrv',
  buildingType: 'office',
  projectStage: 'planning',
  message: 'Three-floor office, looking at VRF options.',
  startedAt: Date.now() - 60_000,
});

function setup() {
  const stored = { id: '0b8f3c1e-0000-4000-8000-000000000001', createdAt: new Date('2026-10-22T10:00:00Z') };
  const prisma = {
    enquiry: {
      create: jest.fn().mockResolvedValue({ ...stored, service: 'vrf-vrv' }),
      update: jest.fn().mockResolvedValue({}),
    },
  };
  const mail = { sendEnquiryNotification: jest.fn().mockResolvedValue(true) };
  const values: Record<string, unknown> = { CONTACT_MIN_FILL_MS: 3000, IP_HASH_SALT: 'test-salt-123456789' };
  const config = { get: (k: string) => values[k] };
  const service = new ContactService(
    prisma as unknown as PrismaService,
    mail as unknown as MailService,
    config as unknown as AppConfigService,
  );
  return { service, prisma, mail, stored };
}

describe('ContactService', () => {
  it('stores the enquiry, hashes the IP and sends a notification', async () => {
    const { service, prisma, mail, stored } = setup();
    const receipt = await service.createEnquiry(validDto(), { ip: '203.0.113.7', userAgent: 'jest' });

    expect(receipt).toEqual({ id: stored.id, receivedAt: stored.createdAt.toISOString() });
    const data = prisma.enquiry.create.mock.calls[0][0].data;
    expect(data).not.toHaveProperty('website');
    expect(data).not.toHaveProperty('startedAt');
    expect(data.ipHash).toMatch(/^[a-f0-9]{64}$/);
    expect(data.ipHash).not.toContain('203.0.113.7');
    expect(mail.sendEnquiryNotification).toHaveBeenCalledTimes(1);
    expect(prisma.enquiry.update).toHaveBeenCalledWith({
      where: { id: stored.id },
      data: { notifiedAt: expect.any(Date) },
    });
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const { service, prisma, mail } = setup();
    const receipt = await service.createEnquiry({ ...validDto(), website: 'http://spam.example' }, {});
    expect(receipt.id).toBeDefined();
    expect(prisma.enquiry.create).not.toHaveBeenCalled();
    expect(mail.sendEnquiryNotification).not.toHaveBeenCalled();
  });

  it('silently drops submissions completed implausibly fast', async () => {
    const { service, prisma } = setup();
    await service.createEnquiry({ ...validDto(), startedAt: Date.now() - 500 }, {});
    expect(prisma.enquiry.create).not.toHaveBeenCalled();
  });

  it('still succeeds when the notification email fails', async () => {
    const { service, mail, prisma, stored } = setup();
    mail.sendEnquiryNotification.mockRejectedValue(new Error('SMTP down'));
    const receipt = await service.createEnquiry(validDto(), {});
    expect(receipt.id).toBe(stored.id);
    expect(prisma.enquiry.update).not.toHaveBeenCalled();
  });

  it('reports 503 when the enquiry cannot be stored', async () => {
    const { service, prisma, mail } = setup();
    prisma.enquiry.create.mockRejectedValue(new Error('connection refused'));
    await expect(service.createEnquiry(validDto(), {})).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(mail.sendEnquiryNotification).not.toHaveBeenCalled();
  });
});
