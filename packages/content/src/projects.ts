/**
 * Project case studies, rendered statically by the website.
 *
 * Publish only verified, client-approved projects with real site photographs
 * (content draft, page 5). Until then the list stays empty and the site shows
 * an honest "case studies are being documented" state.
 *
 * To add one, append an object like this (images live in
 * frontend/public/images/projects/):
 *
 *   {
 *     slug: 'office-vrf-malappuram',
 *     title: 'VRF / VRV installation',
 *     summary: 'One-paragraph summary approved for publication.',
 *     buildingType: 'Commercial office',
 *     location: 'Malappuram, Kerala',
 *     system: 'VRF / VRV',
 *     capacity: null,                       // only if verified and approved
 *     servicesProvided: ['System selection', 'Refrigerant piping', 'Testing and commissioning'],
 *     serviceSlugs: ['vrf-vrv-systems'],
 *     challenge: 'The original requirement, constraints or documented issue.',
 *     solution: 'The selected system, engineering considerations and scope delivered.',
 *     execution: 'Installation and coordination work.',
 *     outcome: 'Measured or verifiable outcomes only.',
 *     images: [
 *       { url: '/images/projects/office-vrf-before.jpg', alt: '...', kind: 'before', width: 1600, height: 1200 },
 *       { url: '/images/projects/office-vrf-after.jpg', alt: '...', kind: 'after', width: 1600, height: 1200 },
 *     ],
 *     completedAt: '2026-03-01',
 *   },
 */

export type ProjectImageKind = 'cover' | 'before' | 'after' | 'gallery';

export interface ProjectImage {
  url: string;
  alt: string;
  kind: ProjectImageKind;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  buildingType: string;
  location: string;
  system: string;
  capacity: string | null;
  servicesProvided: string[];
  serviceSlugs: string[];
  challenge: string;
  solution: string;
  execution: string;
  outcome: string;
  images: ProjectImage[];
  completedAt: string | null;
}

export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectImage(p: Project, kind: ProjectImageKind): ProjectImage | null {
  return p.images.find((i) => i.kind === kind) ?? null;
}

/** Cover photo: an explicit cover, else the "after" photo, else the first image. */
export function projectCover(p: Project): ProjectImage | null {
  return projectImage(p, 'cover') ?? projectImage(p, 'after') ?? p.images[0] ?? null;
}
