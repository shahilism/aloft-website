/** Icon keys map to the brand's line-icon set (board 13). */
export type ServiceIcon = 'design' | 'vrf' | 'ducting' | 'chilled-water' | 'amc';

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  slug: string;
  /** Position on /services (HVAC design is the fifth card, listed first). */
  order: number;
  /** Position in the home page list; null when not shown on home. */
  homeIndex: number | null;
  name: string;
  shortName: string;
  icon: ServiceIcon;
  /** Card copy on the home page (content draft, page 1 section 5). */
  homeSummary: string | null;
  /** Card copy on /services (content draft, page 3). */
  summary: string;
  linkLabel: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  covers: string[];
  cta: string;
  image: ContentImage;
}

export const services: Service[] = [
  {
    slug: 'hvac-design',
    order: 1,
    homeIndex: null,
    name: 'HVAC design & consultation',
    shortName: 'HVAC Design',
    icon: 'design',
    homeSummary: null,
    summary: 'System planning, cooling-load assessment and equipment selection.',
    linkLabel: 'Explore HVAC design',
    seoTitle: 'HVAC Design & Consultation in Kerala | ALOFT',
    metaDescription:
      'Explore HVAC design and consultation services for commercial buildings, including cooling-load assessment and system planning.',
    h1: 'HVAC design that starts with your building.',
    intro:
      'Good cooling starts with understanding the building. ALOFT helps assess HVAC requirements and evaluate suitable systems based on intended use, cooling demand, layout and project constraints.',
    covers: [
      'Cooling-load assessment',
      'HVAC system selection and planning',
      'Equipment and layout coordination',
      'Ducting, piping and service-access considerations',
      'Installation and maintenance planning',
    ],
    cta: 'Discuss your HVAC design requirements',
    image: {
      src: '/images/service-design.jpg',
      alt: 'Three-dimensional building model showing mechanical spaces used for HVAC coordination',
      width: 1534,
      height: 1024,
    },
  },
  {
    slug: 'vrf-vrv-systems',
    order: 2,
    homeIndex: 1,
    name: 'VRF / VRV systems',
    shortName: 'VRF/VRV',
    icon: 'vrf',
    homeSummary:
      'Flexible multi-zone air conditioning for suitable commercial buildings, offices and institutional spaces.',
    summary: 'Multi-zone cooling for suitable commercial applications.',
    linkLabel: 'Explore VRF / VRV',
    seoTitle: 'VRF / VRV Installation in Kerala | ALOFT',
    metaDescription:
      'Explore VRF/VRV air-conditioning solutions for suitable commercial buildings, including system selection, installation and maintenance.',
    h1: 'Flexible multi-zone cooling for commercial buildings.',
    intro:
      'VRF/VRV systems can provide zoned cooling and flexible configurations for suitable offices, commercial interiors and institutional buildings. ALOFT supports system selection, installation and maintenance according to project requirements.',
    covers: [
      'System selection and configuration',
      'Indoor and outdoor unit coordination',
      'Refrigerant piping installation',
      'Testing and commissioning',
      'Maintenance and fault diagnosis',
    ],
    cta: 'Request a VRF / VRV project quote',
    image: {
      src: '/images/service-vrf-rooftop.jpg',
      alt: 'Outdoor air-conditioning equipment installed on a commercial roof',
      width: 1471,
      height: 974,
    },
  },
  {
    slug: 'hvac-ducting',
    order: 3,
    homeIndex: 2,
    name: 'Ductable AC & ducting',
    shortName: 'Ducting',
    icon: 'ducting',
    homeSummary: 'Integrated air conditioning and air distribution solutions for commercial interiors.',
    summary: 'Air conditioning equipment and air distribution.',
    linkLabel: 'Explore ducting',
    seoTitle: 'Commercial AC Ducting Contractor in Kerala | ALOFT',
    metaDescription:
      'Discover commercial HVAC ducting and air distribution solutions from ALOFT, including installation coordination and insulation.',
    h1: 'Engineered air distribution for commercial spaces.',
    intro:
      'Ductwork is a critical part of an air-conditioning system. ALOFT provides ductable AC and ducting solutions with attention to airflow requirements, routing, insulation and coordination with other building services.',
    covers: [
      'Ductable air-conditioning installation',
      'Ductwork fabrication and installation, as contracted',
      'Insulation and air distribution components',
      'Coordination with ceilings and other services',
      'Testing and balancing where included in scope',
    ],
    cta: 'Discuss your ducting project',
    image: {
      src: '/images/service-ducting.jpg',
      alt: 'Installers in safety helmets and high-visibility vests fitting a section of sheet-metal ductwork',
      width: 2000,
      height: 1330,
    },
  },
  {
    slug: 'chilled-water-systems',
    order: 4,
    homeIndex: 3,
    name: 'Chilled-water systems',
    shortName: 'Chilled Water',
    icon: 'chilled-water',
    homeSummary:
      'Central plant cooling solutions for buildings with suitable capacity and infrastructure requirements.',
    summary: 'Centralized cooling for suitable building infrastructure.',
    linkLabel: 'Explore chilled water',
    seoTitle: 'Chilled-Water HVAC Systems in Kerala | ALOFT',
    metaDescription:
      'Explore chilled-water HVAC systems for suitable commercial buildings, including equipment coordination, piping and maintenance.',
    h1: 'Centralized cooling for demanding building requirements.',
    intro:
      'Chilled-water systems can suit buildings with appropriate cooling loads, plant space and supporting infrastructure. ALOFT helps address the technical coordination involved in planning and implementing these systems.',
    covers: [
      'System and equipment coordination',
      'Chiller, pump and piping scope, as contracted',
      'Insulation and mechanical integration',
      'Testing and commissioning',
      'Maintenance support',
    ],
    cta: 'Discuss your chilled-water project',
    image: {
      src: '/images/service-chilled-water.jpg',
      alt: 'Air-cooled chiller installed on a rooftop',
      width: 2000,
      height: 1125,
    },
  },
  {
    slug: 'hvac-amc',
    order: 5,
    homeIndex: 4,
    name: 'HVAC maintenance & AMC',
    shortName: 'AMC',
    icon: 'amc',
    homeSummary: 'Preventive servicing and maintenance contracts designed around equipment and site needs.',
    summary: 'Planned maintenance and agreed service support.',
    linkLabel: 'Explore AMC',
    seoTitle: 'Commercial HVAC Maintenance & AMC in Kerala | ALOFT',
    metaDescription:
      'Request commercial HVAC maintenance and AMC services from ALOFT, tailored to your equipment and building requirements.',
    h1: 'Planned maintenance for your cooling infrastructure.',
    intro:
      'A well-defined maintenance plan helps identify developing faults and supports more predictable facility operations. ALOFT offers HVAC maintenance and AMC arrangements based on equipment, site conditions and agreed service scope.',
    covers: [
      'Scheduled inspections',
      'Equipment and operating-condition checks',
      'Filter, coil and drainage maintenance where applicable',
      'Fault reporting and repair recommendations',
      'Maintenance records and planned service visits',
    ],
    cta: 'Request an AMC proposal',
    image: {
      src: '/images/service-maintenance.jpg',
      alt: 'Technician wearing safety glasses and gloves cleaning a refrigeration compressor assembly',
      width: 2000,
      height: 1333,
    },
  },
];

export const servicesByOrder = [...services].sort((a, b) => a.order - b.order);

export const homeServices = services
  .filter((s): s is Service & { homeIndex: number; homeSummary: string } => s.homeIndex !== null)
  .sort((a, b) => a.homeIndex - b.homeIndex);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Overview page copy (content draft, page 3). */
export const servicesPage = {
  seoTitle: 'HVAC Services in Kerala | ALOFT',
  metaDescription:
    "Explore ALOFT's HVAC services, including VRF/VRV systems, ductable AC, ducting, chilled-water systems and AMC in Kerala.",
  h1: 'Commercial HVAC services, planned around your building.',
  intro:
    'From HVAC consultation and system installation to ductwork and ongoing maintenance, ALOFT helps businesses address their cooling requirements through coordinated engineering and execution.',
  cta: {
    title: 'Not sure which cooling system suits your project?',
    body: 'Share your building requirements with our team.',
    button: 'Request HVAC consultation',
  },
};
