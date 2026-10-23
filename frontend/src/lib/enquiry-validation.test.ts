import { describe, expect, it } from 'vitest';
import { toPayload, validateEnquiry, type EnquiryFormValues } from './enquiry-validation';

const valid: EnquiryFormValues = {
  fullName: 'Anil Kumar',
  companyName: '',
  email: 'facilities@example.com',
  phone: '+91 95449 27508',
  projectLocation: 'Malappuram',
  service: 'vrf-vrv',
  buildingType: 'office',
  approxArea: '',
  projectStage: 'planning',
  message: 'Three floors of offices, around 18,000 sq ft.',
};

describe('validateEnquiry', () => {
  it('accepts a complete enquiry', () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it('flags every missing required field', () => {
    const errors = validateEnquiry({
      ...valid,
      fullName: '',
      email: 'x',
      phone: '12',
      projectLocation: '',
      service: '',
      buildingType: '',
      projectStage: '',
      message: 'hi',
    });
    expect(Object.keys(errors).sort()).toEqual(
      ['buildingType', 'email', 'fullName', 'message', 'phone', 'projectLocation', 'projectStage', 'service'].sort(),
    );
  });

  it('rejects options that the API does not accept', () => {
    expect(validateEnquiry({ ...valid, service: 'furnace-repair' }).service).toBeDefined();
  });
});

describe('toPayload', () => {
  it('trims values and omits blank optional fields', () => {
    const payload = toPayload({ ...valid, fullName: '  Anil Kumar ', companyName: '  ' }, { sourcePath: '/contact' });
    expect(payload.fullName).toBe('Anil Kumar');
    expect(payload.companyName).toBeUndefined();
    expect(payload.approxArea).toBeUndefined();
    expect(payload.sourcePath).toBe('/contact');
  });
});
