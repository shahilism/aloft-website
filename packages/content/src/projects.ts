/**
 * Project API contract plus the case-study templates from the content draft.
 * The templates are seeded as unpublished drafts: they hold placeholders, not
 * ALOFT project facts, and must never be published as they are.
 */

export type ProjectImageKind = 'cover' | 'before' | 'after' | 'gallery';

export interface ProjectImage {
  url: string;
  alt: string;
  kind: ProjectImageKind;
  width: number | null;
  height: number | null;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  summary: string;
  buildingType: string;
  location: string;
  system: string;
  capacity: string | null;
  servicesProvided: string[];
  serviceSlugs: string[];
  coverImage: ProjectImage | null;
  beforeImage: ProjectImage | null;
  afterImage: ProjectImage | null;
  isDraft: boolean;
}

export interface ProjectDetail extends ProjectSummary {
  challenge: string;
  solution: string;
  execution: string;
  outcome: string;
  images: ProjectImage[];
  completedAt: string | null;
  updatedAt: string;
}

export interface ApiList<T> {
  data: T[];
  meta: { count: number };
}

export interface ApiItem<T> {
  data: T;
}

export interface ProjectSeed {
  slug: string;
  title: string;
  summary: string;
  buildingType: string;
  location: string;
  system: string;
  capacity: string | null;
  scope: string;
  servicesProvided: string[];
  serviceSlugs: string[];
  challenge: string;
  solution: string;
  execution: string;
  outcome: string;
  sortOrder: number;
}

export const projectDraftTemplates: ProjectSeed[] = [
  {
    slug: 'commercial-hvac-installation',
    title: 'Commercial HVAC installation',
    summary: '[Short summary of the verified project, approved for publication]',
    buildingType: '[Verified building type]',
    location: '[Actual project location]',
    system: '[Installed HVAC system]',
    capacity: null,
    scope: '[Work completed by ALOFT]',
    servicesProvided: ['[Scope item 1]', '[Scope item 2]', '[Scope item 3]'],
    serviceSlugs: ['hvac-design', 'hvac-ducting'],
    challenge:
      "[Explain the client's original cooling requirement, building constraints or documented system issue.]",
    solution:
      '[Describe the selected system, engineering considerations, equipment and actual scope delivered.]',
    execution: '[Explain the installation or coordination work, with actual site photographs.]',
    outcome:
      '[Measured or verifiable outcomes only — completed capacity, area served, commissioning status or documented operational improvements.]',
    sortOrder: 1,
  },
  {
    slug: 'vrf-vrv-installation',
    title: 'VRF / VRV installation',
    summary: '[Short summary of the verified project, approved for publication]',
    buildingType: '[Verified building type]',
    location: '[Actual project location]',
    system: 'VRF / VRV',
    capacity: '[Verified capacity, if approved]',
    scope: '[Actual installation scope]',
    servicesProvided: ['[Scope item 1]', '[Scope item 2]', '[Scope item 3]'],
    serviceSlugs: ['vrf-vrv-systems'],
    challenge:
      "[Explain the client's original cooling requirement, building constraints or documented system issue.]",
    solution:
      '[Describe the selected system, engineering considerations, equipment and actual scope delivered.]',
    execution: '[Explain the installation or coordination work, with actual site photographs.]',
    outcome:
      '[Measured or verifiable outcomes only — completed capacity, area served, commissioning status or documented operational improvements.]',
    sortOrder: 2,
  },
  {
    slug: 'hvac-system-upgrade',
    title: 'HVAC system upgrade',
    summary: '[Short summary of the verified project, approved for publication]',
    buildingType: '[Verified building type]',
    location: '[Actual project location]',
    system: '[Upgraded HVAC system]',
    capacity: null,
    scope: '[Verified work completed]',
    servicesProvided: ['[Scope item 1]', '[Scope item 2]', '[Scope item 3]'],
    serviceSlugs: ['hvac-amc'],
    challenge: '[Documented issue with the existing system.]',
    solution: '[Verified work completed.]',
    execution: '[Explain the installation or coordination work, with actual site photographs.]',
    outcome:
      '[Measured or verifiable outcomes only — completed capacity, area served, commissioning status or documented operational improvements.]',
    sortOrder: 3,
  },
];
