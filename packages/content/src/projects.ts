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

export const projects: Project[] = [
  {
    slug: 'hyper-budget',
    title: 'Hyper Budget',
    summary:
      'Commercial centralized cooling and multi-zone VRF installation for Hyper Budget commercial and retail facilities in Manjeri (Rajiv Gandhi Bypass Road) and Malappuram.',
    buildingType: 'Commercial complex',
    location: 'Manjeri (Rajiv Gandhi Bypass Road) & Malappuram, Kerala',
    system: 'VRF / VRV and ducted cooling',
    capacity: 'Multi-zone commercial setup',
    servicesProvided: [
      'System selection and configuration',
      'Refrigerant piping and indoor unit installation',
      'Air distribution ductwork',
      'Testing and commissioning',
    ],
    serviceSlugs: ['vrf-vrv-systems', 'hvac-ducting'],
    challenge:
      'The multi-storey facilities across Manjeri (Rajiv Gandhi Bypass Road) and Malappuram required independent temperature control across retail and office zones with high operating efficiency and quiet indoor sound levels.',
    solution:
      'ALOFT engineered multi-zone VRF configurations paired with ductable indoor fan coils, delivering balanced air distribution, zoned thermostat control and optimized outdoor unit placement.',
    execution:
      'Refrigerant piping, acoustic insulation, sheet-metal ductwork and indoor units were installed in tight coordination with ceiling frameworks and electrical services across both locations.',
    outcome:
      'Dependable climate control across all operational zones with responsive multi-zone temperature regulation and streamlined ongoing service access.',
    images: [
      {
        url: '/images/projects/hyper-budget-malappuram.webp',
        alt: 'Exterior facade and commercial building of Hyper Budget on Rajiv Gandhi Bypass Road, Manjeri, with centralized HVAC air conditioning',
        kind: 'cover',
        width: 1360,
        height: 928,
      },
      {
        url: '/images/Hyper Budget Supermarket Plaza.png',
        alt: 'Hyper Budget Supermarket Plaza retail interior and air conditioning ductwork in Malappuram',
        kind: 'gallery',
        width: 1586,
        height: 992,
      },
    ],
    completedAt: '2025-11-15',
  },
  {
    slug: 'milan-theatre-mannarkkad',
    title: 'Milan Theatre, Mannarkkad',
    summary:
      'Centralized auditorium air conditioning and acoustic ventilation installation for Milan Theatre in Mannarkkad, Palakkad.',
    buildingType: 'Cinema auditorium',
    location: 'Mannarkkad, Palakkad, Kerala',
    system: 'Centralized ducted cooling',
    capacity: 'High-capacity auditorium cooling',
    servicesProvided: [
      'Auditorium HVAC engineering',
      'Acoustic ductwork fabrication',
      'Airflow balancing',
      'Commissioning and testing',
    ],
    serviceSlugs: ['hvac-ducting', 'vrf-vrv-systems'],
    challenge:
      'Cinema auditoriums demand high cooling capacity for packed screenings under strict acoustic limits to prevent mechanical equipment noise from intruding into the movie experience.',
    solution:
      'Engineered a centralized air distribution layout with internally lined acoustic ductwork, low-velocity supply diffusers and strategically routed return air paths to keep noise criteria within cinema industry targets.',
    execution:
      'Installed heavy-gauge acoustic ducting, vibration isolation mountings for primary equipment, and precision dampers to ensure uniform air delivery across tiered auditorium seating.',
    outcome:
      'Comfortable, draft-free auditorium climate with ultra-quiet acoustic performance and uniform temperature distribution throughout the screening hall.',
    images: [
      {
        url: '/images/projects/milan-theatre-mannarkkad.webp',
        alt: 'Exterior facade of Milan Theatre cinema complex in Mannarkkad with central HVAC cooling installation',
        kind: 'cover',
        width: 1360,
        height: 1020,
      },
    ],
    completedAt: '2025-08-20',
  },
  {
    slug: 'okaz-theatre-mannarkkad',
    title: 'Okaz Theatre, Mannarkkad',
    summary:
      'Centralized cooling, ducting and mechanical ventilation execution for the Okaz Theatre entertainment complex in Mannarkkad.',
    buildingType: 'Cinema & multiplex',
    location: 'Mannarkkad, Palakkad, Kerala',
    system: 'Centralized air conditioning & ventilation',
    capacity: 'Auditorium and lobby cooling system',
    servicesProvided: [
      'Central plant coordination',
      'High-volume ducting fabrication',
      'Acoustic sound attenuation',
      'Testing and commissioning',
    ],
    serviceSlugs: ['hvac-ducting', 'chilled-water-systems'],
    challenge:
      'Managing high occupant heat loads during peak showtimes while delivering adequate fresh air ventilation and addressing distinct cooling needs between the open entrance lobby and the main auditorium.',
    solution:
      'Engineered a dual-zone air distribution layout separating the high-traffic lobby from the screening auditorium, complete with acoustic treatment and dedicated fresh air intake.',
    execution:
      'Positioned high-efficiency cooling equipment on structural plant platforms, installed insulated ductwork with acoustic dampers, and balanced air registers across audience levels.',
    outcome:
      'Rapid cooldown response between back-to-back screenings, quiet operation during screenings, and reliable humidity management across all seasons.',
    images: [
      {
        url: '/images/installation-crew-chiller-lift.jpg',
        alt: 'HVAC installation team positioning central plant cooling equipment for Okaz Theatre in Mannarkkad',
        kind: 'cover',
        width: 1800,
        height: 1200,
      },
    ],
    completedAt: '2025-05-10',
  },
];

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
