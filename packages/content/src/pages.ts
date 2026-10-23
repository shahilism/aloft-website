import type { Feature } from './home';

/** About page (content draft, page 2). No team or awards until verified. */
export const about = {
  seoTitle: 'About ALOFT | HVAC Engineering Company in Kerala',
  metaDescription:
    'Learn about ALOFT, a centralized cooling solutions company providing HVAC design, installation and maintenance for commercial buildings.',
  hero: {
    titleLead: 'The engineering behind ',
    titleAccent: 'better cooling',
    titleEnd: '.',
    body: 'ALOFT is a centralized cooling solutions company focused on HVAC design, installation and maintenance for commercial buildings and businesses.',
  },
  journey: {
    eyebrow: 'Our journey',
    title: 'Founded on the need for better HVAC execution.',
    lead: 'As buildings become more complex, cooling solutions need to be evaluated as part of the wider building infrastructure—not as standalone equipment decisions.',
    subtitle: 'Established in 2017.',
    body: 'Established in 2017, ALOFT set out to bring a more structured, engineering-focused approach to cooling projects. Our work centres on connecting technical planning, installation execution and maintenance support to address the practical needs of each building.',
    image: {
      src: '/images/installation-crew-chiller-lift.jpg',
      alt: 'Installation crew in safety helmets guiding an air-cooled chiller into position during a lift',
      width: 1800,
      height: 1200,
    },
  },
  mission:
    'To deliver dependable, thoughtfully engineered cooling solutions that support comfortable and functional indoor environments.',
  vision:
    'To become a trusted HVAC engineering and service partner for commercial buildings and businesses across our operating markets.',
  values: {
    eyebrow: 'Core values',
    title: 'Engineer every system around the building, then stay responsible for it.',
    body: 'Calculated loads, clean installation, documented commissioning and preventive maintenance.',
  },
  valueItems: [
    {
      icon: 'design',
      title: 'Engineering integrity',
      body: 'Recommend solutions that fit the actual project requirements.',
    },
    {
      icon: 'install',
      title: 'Execution quality',
      body: 'Focus on technical coordination and installation standards.',
    },
    {
      icon: 'brief',
      title: 'Accountability',
      body: 'Maintain clear communication about scope, cost and service commitments.',
    },
    {
      icon: 'lifecycle',
      title: 'Long-term thinking',
      body: 'Consider maintainability and system operation beyond handover.',
    },
  ] satisfies Feature[],
  cta: {
    title: "Let's discuss your next project.",
    body: 'Tell us about your building and cooling requirements.',
  },
};

/** Projects page (content draft, page 5). */
export const projectsPage = {
  seoTitle: 'Commercial HVAC Projects in Kerala | ALOFT',
  metaDescription:
    "Explore ALOFT's commercial HVAC projects, installations and system upgrades, with verified project details and photographs.",
  h1: 'Real projects. Practical engineering. Better cooling.',
  intro:
    'Explore selected HVAC installations, system upgrades and mechanical services delivered by ALOFT. Discover the requirements behind each project, the scope of work and the engineering decisions that shaped the solution.',
  button: { label: 'Discuss your project', href: '/contact' },
  empty: {
    title: 'Case studies are being documented.',
    body: 'We publish case studies only once project details and site photographs are verified and approved for publication. To discuss a similar requirement, share your project details with our team.',
  },
  unavailable: {
    title: 'Projects could not be loaded right now.',
    body: 'Please try again shortly, or contact our team directly to discuss your requirements.',
  },
  detail: {
    challenge: 'The challenge',
    solution: 'The ALOFT solution',
    execution: 'Execution',
    outcome: 'Project outcome',
    scope: 'Scope delivered',
    more: { eyebrow: 'More projects', title: 'Explore similar work.' },
    cta: 'Have a similar project? Talk to ALOFT.',
  },
};

/** Contact page (content draft, page 6). */
export const contactPage = {
  seoTitle: 'Contact ALOFT | Commercial HVAC Enquiries Kerala',
  metaDescription:
    'Contact ALOFT to discuss commercial HVAC installation, centralized cooling, system upgrades or maintenance requirements in Kerala.',
  h1: "Let's talk about your cooling requirements.",
  intro:
    'Planning a new installation, upgrading an existing cooling system or looking for an HVAC maintenance partner? Share your requirements with ALOFT.',
  formTitle: 'Discuss your project',
  submit: 'Request a project consultation',
  confirmation:
    'Thank you for contacting ALOFT. Your enquiry has been received. Our team will review your requirements and get in touch using the contact details provided.',
  detailsTitle: 'Contact ALOFT directly',
};

export const notFoundPage = {
  title: "Looks like we've lost the connection.",
  body: "The page you're looking for may have moved or no longer exists. Let's get you back to the right place.",
  primary: { label: 'Back to home', href: '/' },
  secondary: { label: 'Contact ALOFT', href: '/contact' },
};
