import { BUSINESS_CONTACT } from '@mge/config';

/**
 * Legal page content. Written to reflect what the website actually collects.
 * These texts have NOT been reviewed by a lawyer — see
 * docs/seo/BUSINESS-VERIFICATION.md before relying on them.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalPage {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

const UPDATED = '2026-10-22';
const CONTACT_LINE = `${BUSINESS_CONTACT.name}, ${BUSINESS_CONTACT.city}, ${BUSINESS_CONTACT.region}, India · Email: ${BUSINESS_CONTACT.email} · Phone: ${BUSINESS_CONTACT.phoneDisplay}`;

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy | Mantra Global Education',
    description: 'How Mantra Global Education collects, uses and protects personal information submitted through this website.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `This website is operated by ${BUSINESS_CONTACT.name}, a study abroad counselling service based in ${BUSINESS_CONTACT.city}, ${BUSINESS_CONTACT.region}, India. For any privacy question, contact us using the details at the end of this policy.`,
        ],
      },
      {
        heading: 'Information we collect',
        list: [
          'Counselling requests: your name, phone number, email, preferred counselling mode, country of interest, intended study level and intake, and any optional details you choose to add (qualification, academic result, English test status, funding preference, preferred date and message).',
          'Contact messages: your name, email, optional phone number, subject and message.',
          'Student portal accounts: your account details and any documents you choose to upload for your application, if you are a registered student.',
          'Technical information: basic server logs needed to run and secure the website. Optional analytics data is collected only if you accept analytics cookies.',
        ],
      },
      {
        heading: 'How we use your information',
        list: [
          'To respond to your enquiry and arrange counselling',
          'To provide the services you ask us for, such as application or visa documentation guidance',
          'To send you occasional updates, only if you opted in',
          'To keep the website secure and understand how it is used (analytics only with consent)',
        ],
      },
      {
        heading: 'What we do not ask for',
        paragraphs: [
          'Our enquiry forms do not ask for passport, Aadhaar, bank account or other financial identity details. Please do not send these through the website forms.',
        ],
      },
      {
        heading: 'Sharing your information',
        paragraphs: [
          'We do not sell your personal information. If you ask us to help with an application, we share only the information needed with the universities, scholarship providers or other parties involved in that application, with your knowledge. We use service providers to host the website, store data and send email, and they process data on our behalf.',
        ],
      },
      {
        heading: 'How long we keep information',
        paragraphs: [
          'We keep enquiry records for as long as needed to respond and to provide any services you take up, and for a reasonable period afterwards for record-keeping. You can ask us to delete your information at any time, subject to any legal obligations to retain it.',
        ],
      },
      {
        heading: 'Your choices and rights',
        paragraphs: [
          'You can ask us to access, correct or delete your personal information, or withdraw consent for marketing messages, by emailing us. You can change your analytics cookie choice by clearing this site’s data in your browser, after which we will ask again.',
        ],
      },
      { heading: 'Contact', paragraphs: [CONTACT_LINE] },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    seoTitle: 'Cookie Policy | Mantra Global Education',
    description: 'The cookies and browser storage used by the Mantra Global Education website and how to control them.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Essential cookies and storage',
        paragraphs: ['These are needed for the website to work and are not used for tracking.'],
        list: [
          'mge_token and mge_role — keep registered students, counsellors and administrators signed in to the portal (set only when you log in; expire after 7 days).',
          'Course shortlist — stored in your browser’s local storage so you can save and compare courses without an account.',
          'mge_analytics_consent — stored in your browser to remember whether you accepted or declined analytics.',
        ],
      },
      {
        heading: 'Optional analytics cookies',
        paragraphs: [
          'If analytics is enabled on this site and you click “Accept analytics”, Google Analytics 4 sets cookies (such as _ga) to help us understand how pages are used. Analytics is off by default and no analytics cookies are set unless you accept. We do not use advertising cookies.',
        ],
      },
      {
        heading: 'Changing your choice',
        paragraphs: [
          'To change your analytics choice, clear this site’s cookies and local storage in your browser settings; the consent banner will appear again on your next visit.',
        ],
      },
      { heading: 'Contact', paragraphs: [CONTACT_LINE] },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    seoTitle: 'Terms of Use | Mantra Global Education',
    description: 'The terms that apply to using the Mantra Global Education website and its tools.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Using this website',
        paragraphs: [
          'By using this website you agree to these terms. The website provides general information about studying abroad and tools such as a course finder, cost estimator and document checklist.',
        ],
      },
      {
        heading: 'Information on this website',
        paragraphs: [
          'We aim to keep information accurate, but university requirements, fees, scholarships and immigration rules change frequently. Course, fee and scholarship information in our tools is indicative and may be out of date. Always confirm details with the university, scholarship provider or government authority before making decisions.',
        ],
      },
      {
        heading: 'No guarantee of outcomes',
        paragraphs: [
          'Admission, scholarship, visa and loan decisions are made by third parties. We do not guarantee any admission, scholarship, visa, loan, internship, job or salary outcome.',
        ],
      },
      {
        heading: 'Services',
        paragraphs: [
          'Specific services, fees (if any) and responsibilities are agreed separately with each student before work begins.',
        ],
      },
      {
        heading: 'Acceptable use',
        list: [
          'Do not submit false information or information about another person without their permission',
          'Do not attempt to disrupt, overload or gain unauthorised access to the website',
          'Do not copy substantial parts of the website content for commercial use without permission',
        ],
      },
      {
        heading: 'External links',
        paragraphs: ['We link to official and third-party websites for reference. We are not responsible for their content.'],
      },
      { heading: 'Contact', paragraphs: [CONTACT_LINE] },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    seoTitle: 'Disclaimer | Mantra Global Education',
    description: 'Important information about the limits of the guidance provided by Mantra Global Education.',
    updated: UPDATED,
    sections: [
      {
        heading: 'General information only',
        paragraphs: [
          'Content on this website is general information to help you plan your studies abroad. It is not legal, immigration, tax or financial advice.',
        ],
      },
      {
        heading: 'Decisions by third parties',
        paragraphs: [
          'Universities decide admissions. Governments decide visas and immigration permissions. Scholarship providers decide awards. Lenders decide loans. Mantra Global Education provides guidance and application support and cannot guarantee any of these outcomes.',
        ],
      },
      {
        heading: 'Changing rules and fees',
        paragraphs: [
          'Requirements, fees, immigration rules and university policies change. Our guides show when they were last reviewed and link to official sources; always check those sources for the latest information.',
        ],
      },
      {
        heading: 'Course and scholarship data',
        paragraphs: [
          'Tuition, intake and scholarship details in our course finder and scholarship listings were recorded from published sources and may not reflect the current academic year.',
        ],
      },
      { heading: 'Contact', paragraphs: [CONTACT_LINE] },
    ],
  },
];

export function getLegalPage(slug: string) {
  return LEGAL_PAGES.find((page) => page.slug === slug) ?? null;
}
