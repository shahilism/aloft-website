import { describe, expect, it } from 'vitest';
import { toMailto, toSubmission, validateEnquiry, type EnquiryFormValues } from './enquiry-validation';

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

  it('rejects options the form does not offer', () => {
    expect(validateEnquiry({ ...valid, service: 'furnace-repair' }).service).toBeDefined();
  });
});

describe('toSubmission', () => {
  it('labels every answer and omits blank optional fields', () => {
    const sub = toSubmission({ ...valid, fullName: '  Anil Kumar ', companyName: '  ' }, '/contact');
    expect(sub._subject).toBe('Website enquiry: VRF / VRV installation — Anil Kumar');
    expect(sub['Full name']).toBe('Anil Kumar');
    expect(sub.email).toBe('facilities@example.com');
    expect(sub['Building type']).toBe('Commercial office');
    expect(sub['Sent from page']).toBe('/contact');
    expect(sub).not.toHaveProperty('Company name');
    expect(sub).not.toHaveProperty('Approximate built-up area');
  });
});

describe('toMailto', () => {
  it('builds an encoded email with subject and readable body', () => {
    const href = toMailto('aloftac@gmail.com', toSubmission(valid, '/contact'));
    expect(href.startsWith('mailto:aloftac@gmail.com?subject=')).toBe(true);
    const body = decodeURIComponent(href.split('&body=')[1]);
    expect(body).toContain('Business email: facilities@example.com');
    expect(body).toContain('Message / project requirements:\nThree floors');
    expect(body).not.toContain('_subject');
  });
});
