import {
  buildingTypeValues,
  enquiryLimits as L,
  enquiryServiceValues,
  phonePattern,
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
 * Client-side checks mirroring the API's DTO, for immediate feedback.
 * The API remains the authority and re-validates everything.
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

export function toPayload(v: EnquiryFormValues, extra: Pick<EnquiryPayload, 'sourcePath' | 'website' | 'startedAt'>) {
  const optional = (s: string) => (s.trim() === '' ? undefined : s.trim());
  return {
    fullName: v.fullName.trim(),
    companyName: optional(v.companyName),
    email: v.email.trim(),
    phone: v.phone.trim(),
    projectLocation: v.projectLocation.trim(),
    service: v.service,
    buildingType: v.buildingType,
    approxArea: optional(v.approxArea),
    projectStage: v.projectStage,
    message: v.message.trim(),
    ...extra,
  };
}
