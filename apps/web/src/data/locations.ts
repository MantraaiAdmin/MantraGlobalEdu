/**
 * City landing pages. Only Coimbatore is a verified base. Other cities are
 * served through online counselling and must never be described as having an
 * office, address or local branch. Each page needs genuinely local content —
 * do not clone pages for more cities just to target keywords.
 */

export interface CityPage {
  slug: string;
  city: string;
  path: string;
  /** True only where the business is actually based. */
  isBase: boolean;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroDescription: string;
  intro: string[];
  whoWeHelp: string[];
  delivery: { heading: string; text: string };
  local?: { heading: string; paragraphs: string[] };
  faqs: { q: string; a: string }[];
}

const SHARED_FAQS = [
  {
    q: 'Can parents join the counselling session?',
    a: 'Yes, and we encourage it. Studying abroad is a family decision and parents often have important questions about cost, safety and timelines.',
  },
  {
    q: 'Can you guarantee admission, a scholarship or a visa?',
    a: 'No. Universities, scholarship providers and governments make those decisions. We help you prepare strong, complete applications and understand your options.',
  },
];

export const CITY_PAGES: CityPage[] = [
  {
    slug: 'coimbatore',
    city: 'Coimbatore',
    path: '/study-abroad-consultants-coimbatore',
    isBase: true,
    seoTitle: 'Study Abroad Consultants in Coimbatore: Counselling & Support | Mantra',
    metaDescription:
      'Study abroad counselling for Coimbatore students and parents: country and course selection, applications, scholarships, visa documents and profile support.',
    eyebrow: 'Coimbatore, Tamil Nadu',
    h1: 'Personalised Study Abroad Counselling in Coimbatore',
    heroDescription:
      'Mantra Global Education is a Coimbatore-based study abroad consultancy. We help students and parents choose the right country, course and university, and support them through applications, scholarships and visa preparation.',
    intro: [
      'Coimbatore has a strong tradition of engineering, science and business education, and every year many students from the city and the wider Kongu region consider continuing their studies overseas. Choosing well means weighing course content, total cost, intakes, visa rules and career goals — and that is where personal counselling helps.',
      'Our counselling is led by our founder, and we work with families through online sessions as well as in-person meetings by arrangement. Because Mantra Global Education is the education vertical of Mantra.Ai, an IT services company, students can also get help building a technology portfolio alongside their applications.',
    ],
    whoWeHelp: [
      'Class 11 and 12 students in Coimbatore planning an undergraduate degree abroad',
      'Engineering, science, commerce and arts graduates considering a master’s abroad',
      'Working professionals from Coimbatore’s IT, manufacturing and textile sectors looking at postgraduate study',
      'Parents who want clear, honest information about costs, timelines and risks',
    ],
    delivery: {
      heading: 'Online and in-person counselling',
      text: 'Online counselling lets you speak with us from home, college or work, and makes it easy for both parents to join. If you would like to meet in person in Coimbatore, get in touch to arrange a time.',
    },
    faqs: [
      {
        q: 'Do I need to visit an office for counselling?',
        a: 'No. Counselling is available online, so you can work with us from anywhere in Coimbatore, Tamil Nadu or the rest of India. If you would prefer to meet in person, call us to discuss arrangements.',
      },
      ...SHARED_FAQS,
      {
        q: 'How early should students in Coimbatore start planning?',
        a: 'Ideally 12 to 18 months before the intended start date. That leaves time for English tests, applications, scholarship deadlines and visa preparation.',
      },
    ],
  },
  {
    slug: 'chennai',
    city: 'Chennai',
    path: '/study-abroad-consultants-chennai',
    isBase: false,
    seoTitle: 'Study Abroad Consultants for Chennai Students | Mantra',
    metaDescription:
      'Online study abroad counselling for Chennai students and parents: country and course selection, applications, scholarships and visa document guidance.',
    eyebrow: 'Chennai, Tamil Nadu',
    h1: 'Study Abroad Counselling for Students in Chennai',
    heroDescription:
      'Mantra Global Education works with students and families in Chennai through online counselling — from choosing a country and course to applications, scholarships and visa preparation.',
    intro: [
      'Chennai is one of India’s largest education and technology hubs, with a strong pool of engineering, medical, science and commerce graduates who go on to study abroad every year. Many Chennai students aim for master’s degrees in computer science, data, engineering, business and health — and the choice of country and course has a big effect on cost and career options.',
      'We counsel Chennai students and parents online, so you get the same one-to-one guidance as students who meet us in Coimbatore, without travelling. Through Mantra.Ai, our IT services company, students in technical fields can also get help building a project portfolio alongside their applications.',
    ],
    whoWeHelp: [
      'Class 11 and 12 students in Chennai planning an undergraduate degree abroad',
      'Engineering, science, commerce and health graduates considering a master’s abroad',
      'Working professionals in Chennai’s IT, manufacturing, finance and healthcare sectors planning postgraduate study',
      'Parents who want clear, honest information about costs, timelines and risks',
    ],
    delivery: {
      heading: 'Online counselling for Chennai families',
      text: 'Sessions take place online by video call or phone, at a time that suits you. We do not have an office in Chennai; our team is based in Coimbatore and works with Chennai families remotely throughout the application process.',
    },
    local: {
      heading: 'Visa appointments for Chennai students',
      paragraphs: [
        'Living in Chennai can make parts of the visa process easier. The U.S. Consulate General in Chennai conducts student visa interviews, and several countries’ visa application centres operate in the city for biometrics and document submission.',
        'Appointment availability and procedures change, so always book through the official website for your destination country. We help you prepare documents and practise for interviews; visa decisions are made only by the relevant government.',
      ],
    },
    faqs: [
      {
        q: 'Do you have an office in Chennai?',
        a: 'No. We are based in Coimbatore and counsel Chennai students online by video call or phone. Everything from shortlisting to visa document preparation can be done remotely.',
      },
      ...SHARED_FAQS,
      {
        q: 'Where do Chennai students attend US visa interviews?',
        a: 'Many Chennai applicants attend the U.S. Consulate General in Chennai, though appointments can be booked at other U.S. consular posts in India. Book through the official U.S. visa appointment system and check the current requirements there.',
      },
    ],
  },
];

export function getCityPage(slug: string) {
  return CITY_PAGES.find((page) => page.slug === slug) ?? null;
}
