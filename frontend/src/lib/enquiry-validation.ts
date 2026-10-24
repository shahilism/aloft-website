import {
  buildingTypeOptions,
  buildingTypeValues,
  enquiryFieldLabels,
  enquiryServiceOptions,
  enquiryLimits as L,
  enquiryServiceValues,
  phonePattern,
  labelFor,
  projectStageOptions,
  projectStageValues,
  type EnquiryPayload,
} from '@aloft/content';

export type EnquiryFormValues = Required<
  Pick<
    EnquiryPayload,
    | 'fullName'
    | 'companyName'
    | 'email'
    | 'phone'
    | 'projectLocation'
    | 'approxArea'
    | 'message'
  >
> & { service: string; buildingType: string; projectStage: string };

export type FieldErrors = Partial<Record<keyof EnquiryFormValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates the enquiry before it is sent, using the limits and options in @aloft/content.
 */
export function validateEnquiry(v: EnquiryFormValues): FieldErrors {
  const e: FieldErrors = {};
  const len = (s: string) => s.trim().length;

  if (len(v.fullName) < L.fullName.min || len(v.fullName) > L.fullName.max) e.fullName = 'Enter your full name.';
  if (len(v.companyName) > L.companyName.max) e.companyName = `Use ${L.companyName.max} characters or fewer.`;
  if (!EMAIL.test(v.email.trim()) || len(v.email) > L.email.max) e.email = 'Enter a valid business email address.';
  if (!phonePattern.test(v.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (len(v.projectLocation) < L.projectLocation.min || len(v.projectLocation) > L.projectLocation.max)
    e.projectLocation = 'Enter the project location.';
  if (!(enquiryServiceValues as string[]).includes(v.service)) e.service = 'Select the service required.';
  if (!(buildingTypeValues as string[]).includes(v.buildingType)) e.buildingType = 'Select the building type.';
  if (len(v.approxArea) > L.approxArea.max) e.approxArea = `Use ${L.approxArea.max} characters or fewer.`;
  if (!(projectStageValues as string[]).includes(v.projectStage)) e.projectStage = 'Select the project stage.';
  if (len(v.message) < L.message.min) e.message = 'Tell us a little about your project requirements.';
  else if (len(v.message) > L.message.max) e.message = `Use ${L.message.max} characters or fewer.`;
  return e;
}

/**
 * The enquiry as labelled fields, ready for a hosted form service: the
 * notification ALOFT receives lists each answer under its form label.
 * `email` and `_subject` follow the common reply-to/subject conventions.
 */
export function toSubmission(v: EnquiryFormValues, sourcePath: string): Record<string, string> {
  const t = (s: string) => s.trim();
  const out: Record<string, string> = {
    _subject: `Website enquiry: ${labelFor(enquiryServiceOptions, v.service)} — ${t(v.fullName)}`,
    [enquiryFieldLabels.fullName]: t(v.fullName),
    'Company name': t(v.companyName),
    email: t(v.email),
    [enquiryFieldLabels.phone]: t(v.phone),
    [enquiryFieldLabels.projectLocation]: t(v.projectLocation),
    [enquiryFieldLabels.service]: labelFor(enquiryServiceOptions, v.service),
    [enquiryFieldLabels.buildingType]: labelFor(buildingTypeOptions, v.buildingType),
    [enquiryFieldLabels.approxArea]: t(v.approxArea),
    [enquiryFieldLabels.projectStage]: labelFor(projectStageOptions, v.projectStage),
    [enquiryFieldLabels.message]: t(v.message),
    'Sent from page': sourcePath,
  };
  return Object.fromEntries(Object.entries(out).filter(([, value]) => value !== ''));
}

/** Fallback when no form service is configured: a pre-filled email to ALOFT. */
export function toMailto(to: string, submission: Record<string, string>): string {
  const { _subject, ...fields } = submission;
  const lines = Object.entries(fields).map(([key, value]) => {
    if (key === enquiryFieldLabels.message) return `\n${key}:\n${value}\n`;
    return `${key === 'email' ? enquiryFieldLabels.email : key}: ${value}`;
  });
  return `mailto:${to}?subject=${encodeURIComponent(_subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
