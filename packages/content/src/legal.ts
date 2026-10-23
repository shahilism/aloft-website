import { formattedAddress, site } from './site';

/**
 * Legal page text, structured per the content draft (pages 7 and 8).
 * The draft requires review by a qualified professional against ALOFT's
 * actual data practices before launch.
 */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPage {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const contactLine = `${site.legalName}, ${formattedAddress}. Email: ${site.contact.email}. Phone: ${site.contact.phoneDisplay}.`;

export const privacyPolicy: LegalPage = {
  seoTitle: 'Privacy Policy | ALOFT',
  metaDescription:
    'How ALOFT collects, uses, stores and protects information submitted through the website.',
  h1: 'Privacy policy',
  intro:
    'This policy explains how ALOFT collects, uses, stores and protects information submitted through this website.',
  lastUpdated: '2026-10-22',
  sections: [
    {
      heading: 'Information collected through enquiry forms and communications',
      paragraphs: [
        'When you submit an enquiry, we collect the details you provide: your name, company name (optional), business email, phone number, project location, the service required, building type, approximate built-up area, project stage and your message.',
        'We also record the page the enquiry was sent from and the time it was received. If you contact us by email, phone or WhatsApp, we keep the details of that correspondence.',
      ],
    },
    {
      heading: 'How information is used',
      paragraphs: [
        'We use this information to respond to your enquiry, assess your project requirements, prepare proposals or quotations, and provide and support the services you engage us for.',
        'We do not sell your personal information or use it for unrelated marketing without your consent.',
      ],
    },
    {
      heading: 'Sharing with authorized service providers',
      paragraphs: [
        'Where necessary, we share information with service providers who help us operate the website and our business, such as hosting, database and email providers. They may only use it to provide those services to us.',
        'We may also disclose information where required by law or to protect our legal rights.',
      ],
    },
    {
      heading: 'Data retention and security',
      paragraphs: [
        'We keep enquiry information only for as long as it is needed for the purposes above, including any resulting project or maintenance relationship and our legal and accounting obligations.',
        'We use reasonable technical and organizational measures to protect information against unauthorized access, loss or misuse. No method of transmission or storage is completely secure.',
      ],
    },
    {
      heading: 'Cookies, analytics and website technologies',
      paragraphs: [
        'The website uses only the cookies and similar technologies needed for it to work. If website analytics are enabled, they are used to understand how the site is used and to measure enquiries, and may set analytics cookies.',
        'You can control cookies through your browser settings.',
      ],
    },
    {
      heading: 'Your privacy rights',
      paragraphs: [
        "Subject to applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may ask to access, correct or erase the personal information we hold about you, or withdraw consent you have given. We will respond within a reasonable time.",
      ],
    },
    {
      heading: 'Contact for privacy-related requests',
      paragraphs: [`For any privacy question or request, contact ${contactLine}`],
    },
  ],
};

export const termsOfService: LegalPage = {
  seoTitle: 'Website Terms of Service | ALOFT',
  metaDescription:
    'Terms governing the use of the ALOFT website, enquiries and published service information.',
  h1: 'Website terms of service',
  intro: `These terms govern your use of this website, operated by ${site.legalName}. By using the website, you agree to them.`,
  lastUpdated: '2026-10-22',
  sections: [
    {
      heading: 'Website purpose and acceptable use',
      paragraphs: [
        'This website provides information about ALOFT and its HVAC services and lets you send project enquiries.',
        'You agree not to misuse the website, including by submitting false or misleading information, attempting to gain unauthorized access, interfering with its operation or sending unsolicited commercial messages through its forms.',
      ],
    },
    {
      heading: 'Accuracy and limitations of service information',
      paragraphs: [
        'Service descriptions on this website are general information. Suitable systems, equipment and scope depend on each building and are confirmed only after the project requirements have been assessed.',
      ],
    },
    {
      heading: 'Enquiries and quotations',
      paragraphs: [
        'Submitting an enquiry does not create a contract or oblige either party to proceed. Any quotation we provide is based on the information available at the time and is valid only on the terms stated in it.',
      ],
    },
    {
      heading: 'Project scope, pricing and timelines',
      paragraphs: [
        'Project scope, pricing, timelines, warranties and maintenance terms are governed solely by separate written agreements, such as signed proposals, work orders, HVAC contracts and AMC agreements. These website terms do not replace or amend any such agreement.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'The ALOFT name, logo, text and other website materials belong to ALOFT or its licensors. You may view and print pages for your own reference, but you may not reproduce, modify or use them commercially without written permission.',
      ],
    },
    {
      heading: 'Third-party links and services',
      paragraphs: [
        'The website may link to or use third-party websites and services. We are not responsible for their content, availability or privacy practices.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'The website is provided on an "as available" basis. To the extent permitted by law, ALOFT is not liable for any loss arising from reliance on general website information or from the website being unavailable.',
      ],
    },
    {
      heading: 'Governing law and contact',
      paragraphs: [
        'These terms are governed by the laws of India. Any dispute is subject to the jurisdiction of the courts of Malappuram, Kerala.',
        `Questions about these terms: ${contactLine}`,
      ],
    },
  ],
};
