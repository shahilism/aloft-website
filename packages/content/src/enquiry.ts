/**
 * Enquiry form definition: the field options, labels and limits the form
 * renders and validates against.
 */

export interface Option<T extends string = string> {
  value: T;
  label: string;
}

export const enquiryServiceOptions = [
  { value: 'hvac-design', label: 'HVAC design and consultation' },
  { value: 'vrf-vrv', label: 'VRF / VRV installation' },
  { value: 'ducting', label: 'Ductable AC and ducting' },
  { value: 'chilled-water', label: 'Chilled-water systems' },
  { value: 'amc', label: 'HVAC maintenance / AMC' },
  { value: 'upgrade', label: 'System upgrade or replacement' },
  { value: 'other', label: 'Other commercial HVAC requirement' },
] as const satisfies readonly Option[];

export const buildingTypeOptions = [
  { value: 'office', label: 'Commercial office' },
  { value: 'coworking', label: 'Coworking space' },
  { value: 'education', label: 'Educational institution' },
  { value: 'hospitality', label: 'Hospitality property' },
  { value: 'retail', label: 'Retail space' },
  { value: 'healthcare', label: 'Healthcare facility' },
  { value: 'industrial', label: 'Industrial facility' },
  { value: 'other', label: 'Other building type' },
] as const satisfies readonly Option[];

export const projectStageOptions = [
  { value: 'planning', label: 'Planning or design stage' },
  { value: 'construction', label: 'Under construction' },
  { value: 'upgrade', label: 'Existing building — upgrade or replacement' },
  { value: 'maintenance', label: 'Existing building — maintenance' },
  { value: 'unsure', label: 'Not sure yet' },
] as const satisfies readonly Option[];

export type EnquiryService = (typeof enquiryServiceOptions)[number]['value'];
export type BuildingType = (typeof buildingTypeOptions)[number]['value'];
export type ProjectStage = (typeof projectStageOptions)[number]['value'];

export const enquiryServiceValues = enquiryServiceOptions.map((o) => o.value) as EnquiryService[];
export const buildingTypeValues = buildingTypeOptions.map((o) => o.value) as BuildingType[];
export const projectStageValues = projectStageOptions.map((o) => o.value) as ProjectStage[];

export const enquiryLimits = {
  fullName: { min: 2, max: 100 },
  companyName: { max: 120 },
  email: { max: 254 },
  phone: { min: 7, max: 20 },
  projectLocation: { min: 2, max: 120 },
  approxArea: { max: 60 },
  message: { min: 10, max: 3000 },
} as const;

/** Digits, spaces, dashes, brackets and an optional leading plus. */
export const phonePattern = /^\+?[0-9][0-9\s\-()]{5,18}[0-9]$/;

export interface EnquiryPayload {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  projectLocation: string;
  service: EnquiryService;
  buildingType: BuildingType;
  approxArea?: string;
  projectStage: ProjectStage;
  message: string;
  /** Page the enquiry was sent from, e.g. "/services/hvac-amc". */
  sourcePath?: string;
  /** Honeypot: must stay empty. */
  website?: string;
  /** Epoch ms when the form was first rendered (bot timing check). */
  startedAt?: number;
}

export const enquiryFieldLabels: Record<keyof Omit<EnquiryPayload, 'website' | 'startedAt' | 'sourcePath'>, string> = {
  fullName: 'Full name',
  companyName: 'Company name (optional)',
  email: 'Business email',
  phone: 'Phone number',
  projectLocation: 'Project location',
  service: 'Service required',
  buildingType: 'Building type',
  approxArea: 'Approximate built-up area',
  projectStage: 'Project stage',
  message: 'Message / project requirements',
};

export function labelFor(options: readonly Option[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

/** Maps a service page slug to the enquiry option it should pre-select. */
export const serviceSlugToEnquiry: Record<string, EnquiryService> = {
  'hvac-design': 'hvac-design',
  'vrf-vrv-systems': 'vrf-vrv',
  'hvac-ducting': 'ducting',
  'chilled-water-systems': 'chilled-water',
  'hvac-amc': 'amc',
};
