/**
 * Home page copy (content draft, page 1). Headings are set in sentence case
 * per the brand guideline (board 08: "Sentence case everywhere except labels").
 */

export type FeatureIcon =
  | 'design'
  | 'install'
  | 'chilled-water'
  | 'maintain'
  | 'brief'
  | 'commission'
  | 'coordination'
  | 'access'
  | 'lifecycle'
  | 'inspection'
  | 'calendar';

export interface Feature {
  icon: FeatureIcon;
  title: string;
  body: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  body: string;
  button?: { label: string; href: string };
}

export const home = {
  seoTitle: 'ALOFT | Commercial HVAC & Centralized Cooling Solutions in Kerala',
  metaDescription:
    'ALOFT provides commercial HVAC design, centralized air conditioning, VRF/VRV installation, ducting and HVAC maintenance solutions in Kerala.',

  hero: {
    eyebrow: 'Centralized cooling solutions',
    titleLead: 'Engineering better cooling for ',
    titleAccent: 'modern buildings',
    titleEnd: '.',
    subtitle: "Commercial HVAC design, installation and maintenance engineered around your building's needs.",
    body: 'From VRF/VRV systems to ducting and chilled-water solutions, ALOFT helps businesses create dependable indoor environments through considered engineering and professional execution.',
    primary: { label: 'Get a project quote', href: '/contact' },
    secondary: { label: 'Explore services', href: '#services' },
    image: {
      src: '/images/hero-commercial-interior.jpg',
      alt: 'Modern commercial space with exposed architectural HVAC ductwork and centralized climate control',
      width: 1024,
      height: 576,
    },
  },

  trustStrip: {
    title: 'Commercial HVAC expertise',
    pillars: ['Design', 'Install', 'Maintain'],
  },

  whoWeAre: {
    eyebrow: 'Who we are',
    title: 'Cooling solutions built on engineering.',
    body: 'Founded in 2017, ALOFT provides centralized cooling solutions for commercial buildings and businesses. We bring together HVAC planning, installation and maintenance to help clients make informed decisions about their cooling infrastructure.',
    statement:
      'Our focus goes beyond equipment selection. We consider the building, its usage, the system configuration and the practical requirements of long-term operation.',
    button: { label: 'Discover ALOFT', href: '/about' },
  },

  /** Replaces the template's statistics — no invented metrics. */
  proofPoints: [
    { icon: 'design', title: 'HVAC design', body: 'Plan around project requirements.' },
    { icon: 'install', title: 'System installation', body: 'Coordinate equipment and execution.' },
    { icon: 'chilled-water', title: 'Centralized cooling', body: 'Solutions for suitable building types.' },
    { icon: 'maintain', title: 'Ongoing maintenance', body: 'Support beyond installation.' },
  ] satisfies Feature[],

  services: {
    eyebrow: 'Our services',
    title: 'Comprehensive HVAC solutions.',
    body: 'From the first design decision to ongoing system maintenance, ALOFT provides cooling solutions tailored to the demands of commercial spaces.',
    button: { label: 'View all services', href: '/services' },
  } satisfies SectionIntro,

  process: {
    eyebrow: 'Our process',
    title: 'From project brief to reliable operation.',
    body: "A structured approach helps align the cooling system with your building's requirements, project scope and operating needs.",
  } satisfies SectionIntro,

  difference: {
    eyebrow: 'The ALOFT difference',
    title: 'Engineering that looks beyond installation.',
    body: 'The value of an HVAC system lies not only in its equipment, but also in how well it is planned, installed and maintained.',
    button: { label: 'Learn about our approach', href: '/about' },
  } satisfies SectionIntro,

  differenceItems: [
    {
      icon: 'design',
      title: 'Engineering-led decisions',
      body: 'Cooling requirements and site constraints inform system selection.',
    },
    {
      icon: 'coordination',
      title: 'Coordinated execution',
      body: 'Equipment, piping, ductwork and building services need to work together.',
    },
    {
      icon: 'access',
      title: 'Practical maintainability',
      body: 'Service access and future maintenance are considered where possible.',
    },
    {
      icon: 'lifecycle',
      title: 'Lifecycle perspective',
      body: "We consider the system's operation beyond project handover.",
    },
  ] satisfies Feature[],

  showcase: {
    eyebrow: 'Visual proof',
    title: 'Built for real-world cooling challenges.',
    body: 'Explore selected ALOFT HVAC installations, upgrades and mechanical services projects, with the building requirements, the scope delivered and the engineering considerations behind each one.',
    button: { label: 'Explore our projects', href: '/projects' },
  } satisfies SectionIntro,

  maintenance: {
    eyebrow: 'Maintenance & AMC',
    title: 'Planned maintenance for your cooling infrastructure.',
    body: 'A well-defined maintenance plan helps identify developing faults and supports more predictable facility operations.',
  } satisfies SectionIntro,

  /** Enquiry-led service options instead of the template's prices. */
  maintenanceCards: [
    {
      label: 'One-time service',
      title: 'HVAC inspection',
      body: 'An assessment of your existing cooling system, its condition and maintenance requirements.',
      points: ['Existing system review', 'Condition assessment', 'Maintenance requirements'],
      cta: { label: 'Request an assessment', href: '/contact?service=amc' },
      highlighted: false,
    },
    {
      label: 'Ongoing support',
      title: 'Annual maintenance contract',
      body: 'Planned HVAC maintenance based on equipment, site requirements and agreed service terms.',
      points: [
        'Scheduled inspections',
        'Equipment and operating-condition checks',
        'Fault reporting and repair recommendations',
        'Maintenance records and planned service visits',
      ],
      cta: { label: 'Request an AMC proposal', href: '/contact?service=amc' },
      highlighted: true,
    },
  ],

  /**
   * "Who we work with" replaces testimonials until real, approved client
   * stories exist (content draft, section 10).
   */
  whoWeWorkWith: {
    eyebrow: 'Who we work with',
    title: 'Who we work with.',
    body: 'Our target applications include commercial offices, coworking spaces, educational institutions, hospitality properties, retail spaces and other suitable buildings.',
    button: { label: 'Discuss your project', href: '/contact' },
  } satisfies SectionIntro,

  sectors: [
    'Commercial offices',
    'Coworking spaces',
    'Educational institutions',
    'Hospitality properties',
    'Retail spaces',
    'Other suitable buildings',
  ],

  /** Audience messages from the brand guideline (board 02). */
  audiences: [
    {
      audience: 'Architects and consultants',
      message: 'Bring us in before the ceiling is drawn.',
      focus: 'Coordination, shafts, access, plant space.',
    },
    {
      audience: 'Building owners',
      message: 'The cheapest quotation is rarely the cheapest system.',
      focus: 'Lifecycle cost, reliability, comfort.',
    },
    {
      audience: 'Facility managers',
      message: 'Do not wait for the breakdown.',
      focus: 'Uptime, schedules, service records.',
    },
  ],

  faq: {
    eyebrow: 'Knowledge base',
    title: 'Frequently asked questions.',
    asideTitle: 'Not sure which cooling system suits your project?',
    asideBody: 'Share your building requirements with our team.',
    button: { label: 'Ask our HVAC team', href: '/contact' },
  },

  finalCta: {
    title: "Let's engineer the right cooling solution.",
    body: 'Planning a new commercial building, upgrading an existing AC system or looking for a long-term HVAC maintenance partner? Start a conversation with ALOFT.',
    primary: { label: 'Discuss your project', href: '/contact' },
    secondary: { label: 'Contact ALOFT', href: '/contact' },
  },
};

export const processSteps: Feature[] = [
  {
    icon: 'brief',
    title: 'Understand the requirements',
    body: 'We assess the building type, usage, cooling needs, project stage and technical constraints.',
  },
  {
    icon: 'design',
    title: 'Plan the solution',
    body: 'We evaluate appropriate HVAC configurations, equipment and installation requirements for the agreed scope.',
  },
  {
    icon: 'commission',
    title: 'Install and commission',
    body: 'We execute the agreed installation scope and carry out applicable testing and commissioning activities.',
  },
  {
    icon: 'maintain',
    title: 'Maintain the system',
    body: 'Where contracted, maintenance and service support help keep equipment in suitable operating condition.',
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What HVAC services does ALOFT provide?',
    answer:
      'ALOFT provides HVAC design and consultation, VRF/VRV systems, ductable air conditioning, ducting, chilled-water solutions and HVAC maintenance, subject to project scope.',
  },
  {
    question: 'Which buildings can ALOFT support?',
    answer:
      'Our target applications include commercial offices, coworking spaces, educational institutions, hospitality properties, retail spaces and other suitable buildings.',
  },
  {
    question: 'Can ALOFT help select the right cooling system?',
    answer:
      "Yes. We can assess the building's intended use, cooling requirements, infrastructure and project constraints to help evaluate suitable system options.",
  },
  {
    question: 'Does ALOFT provide HVAC AMC services?',
    answer:
      'We offer maintenance and AMC solutions according to equipment type, site requirements and agreed contract terms.',
  },
  {
    question: 'How do I request a project quotation?',
    answer:
      'Share the project location, building type, approximate area, project stage and any available HVAC drawings. Our team can review the requirements and advise on the next steps.',
  },
];
