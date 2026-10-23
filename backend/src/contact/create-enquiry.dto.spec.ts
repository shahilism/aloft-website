import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateEnquiryDto } from './create-enquiry.dto';

const base = {
  fullName: '  Anil   Kumar ',
  email: ' Facilities@Example.com ',
  phone: '+91 95449 27508',
  projectLocation: 'Perinthalmanna, Malappuram',
  service: 'amc',
  buildingType: 'retail',
  projectStage: 'maintenance',
  message: 'We need an AMC for 12 ductable units in a retail store.',
};

async function check(input: Record<string, unknown>) {
  const dto = plainToInstance(CreateEnquiryDto, input);
  const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
  return { dto, fields: errors.map((e) => e.property) };
}

describe('CreateEnquiryDto', () => {
  it('accepts a complete enquiry and normalizes whitespace and email case', async () => {
    const { dto, fields } = await check(base);
    expect(fields).toEqual([]);
    expect(dto.fullName).toBe('Anil Kumar');
    expect(dto.email).toBe('facilities@example.com');
  });

  it('treats blank optional fields as absent', async () => {
    const { dto, fields } = await check({ ...base, companyName: '   ', approxArea: '' });
    expect(fields).toEqual([]);
    expect(dto.companyName).toBeUndefined();
    expect(dto.approxArea).toBeUndefined();
  });

  it.each([
    ['email', { email: 'not-an-email' }],
    ['phone', { phone: 'call me' }],
    ['service', { service: 'furnace-repair' }],
    ['buildingType', { buildingType: 'castle' }],
    ['projectStage', { projectStage: 'later' }],
    ['message', { message: 'short' }],
    ['fullName', { fullName: 'A' }],
    ['fullName', { fullName: 'Anil\u0000Kumar' }],
    ['sourcePath', { sourcePath: 'https://evil.example' }],
  ])('rejects an invalid %s', async (field, override) => {
    const { fields } = await check({ ...base, ...override });
    expect(fields).toContain(field);
  });

  it('flattens line breaks in single-line fields so they cannot inject email headers', async () => {
    const { dto, fields } = await check({ ...base, fullName: 'Anil\r\nBcc: victim@example.com' });
    expect(fields).toEqual([]);
    expect(dto.fullName).toBe('Anil Bcc: victim@example.com');
    expect(dto.fullName).not.toMatch(/[\r\n]/);
  });

  it('rejects unknown fields', async () => {
    const { fields } = await check({ ...base, isAdmin: true });
    expect(fields).toContain('isAdmin');
  });

  it('allows line breaks in the message', async () => {
    const { fields } = await check({ ...base, message: 'Line one of the brief.\nLine two of the brief.' });
    expect(fields).toEqual([]);
  });
});
