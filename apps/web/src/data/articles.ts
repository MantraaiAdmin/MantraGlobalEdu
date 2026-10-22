import type { GuideSource } from './country-guides';

export type ResourceCategoryId =
  | 'study-abroad-guides'
  | 'scholarships'
  | 'visa-updates'
  | 'university-guides'
  | 'application-guides'
  | 'career-guides';

export interface ResourceCategory {
  id: ResourceCategoryId;
  title: string;
  seoTitle: string;
  description: string;
}

export const RESOURCE_CATEGORY_PAGES: ResourceCategory[] = [
  {
    id: 'study-abroad-guides',
    title: 'Study Abroad Guides',
    seoTitle: 'Study Abroad Guides for Indian Students | Mantra',
    description: 'Step-by-step guides to planning your studies abroad — choosing a country, shortlisting universities and building a realistic timeline.',
  },
  {
    id: 'scholarships',
    title: 'Scholarship Guides',
    seoTitle: 'Study Abroad Scholarship Guides | Mantra Global Education',
    description: 'How to find scholarships, check eligibility and prepare stronger funding applications for study abroad.',
  },
  {
    id: 'visa-updates',
    title: 'Visa Guidance',
    seoTitle: 'Student Visa Guidance & Document Preparation | Mantra',
    description: 'Practical guidance on preparing student visa applications, with links to the official government sources for each country.',
  },
  {
    id: 'university-guides',
    title: 'University Guides',
    seoTitle: 'How to Evaluate Universities Abroad | Mantra Global Education',
    description: 'How to evaluate universities and programmes abroad beyond headline rankings.',
  },
  {
    id: 'application-guides',
    title: 'Application Guides',
    seoTitle: 'University Application Guides: SOP, LOR & Checklists | Mantra',
    description: 'Guides to statements of purpose, letters of recommendation, application checklists and common mistakes.',
  },
  {
    id: 'career-guides',
    title: 'Career Guides',
    seoTitle: 'Career Guides for Students Studying Abroad | Mantra',
    description: 'Planning skills, projects and experience so your studies abroad support your long-term career.',
  },
];

export interface ArticleSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  category: ResourceCategoryId;
  title: string;
  seoTitle: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  sections: ArticleSection[];
  sources?: GuideSource[];
  relatedCountries: string[];
  relatedServices: string[];
}

const AUTHOR = 'Mantra Global Education editorial team';
const PUBLISHED = '2026-10-22';

export const ARTICLES: Article[] = [
  {
    slug: 'how-to-choose-a-country-for-your-masters',
    category: 'study-abroad-guides',
    title: 'How to Choose a Country for Your Master’s',
    seoTitle: 'How to Choose a Country for Your Master’s Abroad | Mantra',
    description: 'A practical framework for comparing study destinations by course length, total cost, intakes, visa rules and post-study options.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: 'Start with the course, not the country',
        paragraphs: [
          'It is tempting to begin with a country you have heard good things about. A better starting point is the subject you want to study and the kind of work you want to do afterwards. Some fields — for example, specific engineering specialisations or research-led programmes — are offered in many places, while others are concentrated in a few countries.',
          'Write down two or three course titles or specialisations you are considering, then look at which destinations offer strong programmes in those areas.',
        ],
      },
      {
        heading: 'Compare total cost, not just tuition',
        paragraphs: [
          'Tuition is only one part of the cost. Course length changes the total significantly: a one-year master’s in the UK or Ireland may cost less overall than a two-year programme elsewhere, even if annual tuition is higher. Living costs vary sharply between cities.',
        ],
        list: [
          'Tuition for the full course',
          'Living costs for the full course length, based on the city',
          'Visa fees, health insurance or health surcharges',
          'Travel and initial set-up costs',
          'Funds you must show for the visa',
        ],
      },
      {
        heading: 'Check intakes and timelines',
        paragraphs: [
          'Most destinations have a main intake (often September or February) and a smaller secondary intake. If you are planning late, a destination with a January or July intake may give you more time to prepare a strong application.',
        ],
      },
      {
        heading: 'Understand visa and post-study rules — and that they change',
        paragraphs: [
          'Each country has its own student visa requirements and its own rules for working during and after study. These rules have changed in several major destinations in recent years. Use them as one factor, check the official government website, and avoid basing your whole decision on a rule that could change before you graduate.',
        ],
      },
      {
        heading: 'Consider language, lifestyle and support',
        paragraphs: [
          'Even on an English-taught programme, the local language affects part-time work, internships and daily life. Think about climate, distance from home, and whether there is a student community you would feel comfortable in.',
        ],
      },
      {
        heading: 'A simple comparison exercise',
        list: [
          'Shortlist three countries that offer your course',
          'For each, note course length, total estimated cost, main intakes and English test requirements',
          'Add the official visa page and post-study work page for each',
          'Discuss the trade-offs with your family and a counsellor before applying',
        ],
      },
    ],
    relatedCountries: ['uk', 'usa', 'germany', 'australia', 'canada', 'ireland'],
    relatedServices: ['study-abroad-counselling', 'career-guidance'],
  },
  {
    slug: 'how-to-shortlist-universities-abroad',
    category: 'study-abroad-guides',
    title: 'How to Shortlist Universities Abroad',
    seoTitle: 'How to Shortlist Universities Abroad: A Step-by-Step Guide | Mantra',
    description: 'Build a balanced shortlist of universities using course content, entry requirements, cost and fit — not rankings alone.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 5,
    sections: [
      {
        heading: 'Why a balanced shortlist matters',
        paragraphs: [
          'Applying only to very competitive universities is risky; applying only to easy options may mean missing a better fit. A balanced list usually includes a few ambitious choices, several realistic options that match your profile, and one or two safer options.',
        ],
      },
      {
        heading: 'Step 1: Read the course structure',
        paragraphs: [
          'Look at the modules or courses you will actually take, the balance of compulsory and optional subjects, and whether there is a project, dissertation, placement or internship component. Two programmes with similar titles can be very different in practice.',
        ],
      },
      {
        heading: 'Step 2: Check entry requirements honestly',
        paragraphs: [
          'Compare your grades, background subjects and test scores with what each university publishes for applicants from India. If you are well below the stated requirement, the university may not be a realistic option this cycle.',
        ],
      },
      {
        heading: 'Step 3: Compare cost and funding',
        paragraphs: [
          'Note the tuition fee, typical living costs in the city and any scholarships for which you may be eligible. Remember that published fees can change each year.',
        ],
      },
      {
        heading: 'Step 4: Use rankings carefully',
        paragraphs: [
          'Rankings measure different things, such as research output or reputation surveys, and may not reflect the quality of a specific taught programme. Use them as one input alongside course content, location and cost.',
        ],
      },
      {
        heading: 'Step 5: Note deadlines and documents',
        list: ['Application opening and closing dates', 'Scholarship deadlines', 'Required documents (SOP, LORs, CV, portfolio)', 'Test score requirements and validity'],
      },
    ],
    relatedCountries: ['uk', 'usa', 'canada', 'australia'],
    relatedServices: ['university-admissions', 'study-abroad-counselling'],
  },
  {
    slug: 'study-abroad-application-checklist',
    category: 'application-guides',
    title: 'Study Abroad Application Checklist',
    seoTitle: 'Study Abroad Application Checklist: Documents & Steps | Mantra',
    description: 'A step-by-step checklist of the documents and actions most university applications abroad require, from transcripts to offer acceptance.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 5,
    sections: [
      {
        heading: 'Before you apply',
        list: [
          'Final shortlist of universities and courses',
          'Deadlines for each application and any scholarship',
          'Passport valid well beyond your intended course end date',
          'English test booked or completed, if required',
          'Any entrance tests required by your programmes (for example GRE, GMAT or SAT)',
        ],
      },
      {
        heading: 'Academic documents',
        list: [
          'Class 10 and Class 12 mark sheets',
          'Degree certificate and semester-wise transcripts (for postgraduate applications)',
          'Provisional certificate if your degree is not yet complete',
          'Any credential evaluation or verification your destination requires',
        ],
      },
      {
        heading: 'Supporting documents',
        list: [
          'Statement of purpose or personal statement, tailored to each programme',
          'Letters of recommendation, if required',
          'CV or résumé',
          'Portfolio or writing sample for relevant programmes',
          'Work experience letters, if relevant',
        ],
      },
      {
        heading: 'After you apply',
        paragraphs: [
          'Track each application portal for requests for more information. When offers arrive, read the conditions carefully, note acceptance and deposit deadlines, and keep copies of every document you submit — you will need them again for your visa application.',
        ],
      },
    ],
    relatedCountries: ['uk', 'usa', 'canada', 'australia', 'germany', 'ireland'],
    relatedServices: ['university-admissions', 'sop-lor-support', 'visa-documentation'],
  },
  {
    slug: 'how-to-write-a-strong-sop',
    category: 'application-guides',
    title: 'How to Write a Strong Statement of Purpose',
    seoTitle: 'How to Write a Strong SOP for Universities Abroad | Mantra',
    description: 'What admissions teams look for in a statement of purpose, a clear structure you can follow, and common mistakes to avoid.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: 'What an SOP is for',
        paragraphs: [
          'A statement of purpose explains why you want to study a particular programme, what has prepared you for it, and what you plan to do afterwards. Admissions teams use it to judge motivation, fit and clarity of thinking.',
          'Always follow the university’s prompt and word limit. If a programme asks specific questions, answer those questions directly.',
        ],
      },
      {
        heading: 'A structure that works',
        list: [
          'Opening: a specific moment, problem or interest that connects to the subject',
          'Academic preparation: relevant courses, projects and results',
          'Practical experience: internships, work, research or independent projects',
          'Why this programme: specific modules, faculty research or facilities — not generic praise',
          'Goals: what you want to do after the course and how the programme helps',
        ],
      },
      {
        heading: 'Show, don’t list',
        paragraphs: [
          'Instead of saying you are passionate about data science, describe a project you built, what you learned and what you would like to explore further. Specific examples are more convincing than adjectives.',
        ],
      },
      {
        heading: 'Common mistakes',
        list: [
          'Repeating your CV line by line',
          'Using the same statement for every university without tailoring',
          'Generic statements about the university’s reputation',
          'Exceeding the word limit',
          'Submitting text written by someone else — many universities check for this',
        ],
      },
      {
        heading: 'Getting feedback',
        paragraphs: [
          'Ask a teacher, mentor or counsellor to read your draft for clarity and structure. Feedback should help you improve your own writing; the final statement must be yours.',
        ],
      },
    ],
    relatedCountries: ['usa', 'uk', 'canada'],
    relatedServices: ['sop-lor-support', 'university-admissions'],
  },
  {
    slug: 'letter-of-recommendation-guide',
    category: 'application-guides',
    title: 'Letter of Recommendation Guide',
    seoTitle: 'Letters of Recommendation for Study Abroad: A Guide | Mantra',
    description: 'Who to ask for a letter of recommendation, how to ask, and how to help your referees write a useful letter.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 4,
    sections: [
      {
        heading: 'Choose referees who know your work',
        paragraphs: [
          'A useful letter comes from someone who can describe your work in detail — a professor who taught you in a relevant subject, a project guide, or a manager who supervised you. A detailed letter from someone who knows you well is usually more helpful than a brief one from a senior person who does not.',
        ],
      },
      {
        heading: 'Ask early and make it easy',
        list: [
          'Ask at least four to six weeks before the deadline',
          'Share the list of programmes and deadlines',
          'Provide your CV and a short summary of the work they supervised',
          'Explain how the letter will be submitted (many universities email referees directly)',
          'Send a polite reminder a week before the deadline',
        ],
      },
      {
        heading: 'Letters must be genuine',
        paragraphs: [
          'Recommendation letters should be written and submitted by the referee. Writing your own letter or submitting it on the referee’s behalf can lead to an application being rejected or an offer withdrawn.',
        ],
      },
    ],
    relatedCountries: ['usa', 'uk', 'canada'],
    relatedServices: ['sop-lor-support', 'university-admissions'],
  },
  {
    slug: 'common-study-abroad-application-mistakes',
    category: 'application-guides',
    title: 'Common Study Abroad Application Mistakes',
    seoTitle: 'Common Study Abroad Application Mistakes to Avoid | Mantra',
    description: 'The most common mistakes we see in study abroad applications, from missed deadlines to inconsistent documents, and how to avoid them.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 4,
    sections: [
      {
        heading: 'Starting too late',
        paragraphs: ['Tests, transcripts, references and scholarship applications all take time. Starting 12 months ahead leaves room for retakes and changes of plan.'],
      },
      {
        heading: 'Applying without checking requirements',
        paragraphs: ['Every programme publishes entry requirements. Applying far below them uses application fees without improving your chances.'],
      },
      {
        heading: 'Inconsistent information',
        paragraphs: ['Dates, grades, names and financial details should match across your application, documents and later visa application. Inconsistencies can cause delays or refusals.'],
      },
      {
        heading: 'Generic statements',
        paragraphs: ['A statement of purpose that could be sent to any university rarely stands out. Tailor each one to the programme.'],
      },
      {
        heading: 'Ignoring total cost',
        paragraphs: ['Plan for tuition, living costs and visa requirements for the whole course — not only the first year.'],
      },
      {
        heading: 'Relying on outdated information',
        paragraphs: ['Visa and immigration rules change. Always check official government websites and university pages for the current cycle.'],
      },
    ],
    relatedCountries: ['uk', 'usa', 'canada', 'australia'],
    relatedServices: ['university-admissions', 'study-abroad-counselling'],
  },
  {
    slug: 'how-to-find-study-abroad-scholarships',
    category: 'scholarships',
    title: 'How to Find Study Abroad Scholarships as an Indian Student',
    seoTitle: 'How to Find Study Abroad Scholarships for Indian Students | Mantra',
    description: 'Where study abroad scholarships come from, how to check eligibility and deadlines, and how to prepare a competitive application.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 6,
    sections: [
      {
        heading: 'Types of funding',
        list: [
          'University scholarships — merit or need-based awards, often partial tuition reductions',
          'Government scholarships — such as the UK’s Chevening, Germany’s DAAD programmes or Fulbright-Nehru for the USA',
          'Foundation and private scholarships',
          'Assistantships — teaching or research roles at some graduate schools, common in the USA',
        ],
      },
      {
        heading: 'Where to look',
        paragraphs: [
          'Start with the funding pages of the universities on your shortlist, then check government scholarship websites for your destination. Our scholarship listings link to each programme’s official page so you can confirm current details.',
        ],
      },
      {
        heading: 'Check eligibility carefully',
        paragraphs: [
          'Scholarships often restrict eligibility by nationality, subject, study level, academic record or work experience. Some require you to have an admission offer first; others require you to apply before you have one.',
        ],
      },
      {
        heading: 'Plan around deadlines',
        paragraphs: [
          'Many scholarships close months before course application deadlines. Note them alongside your university deadlines and work backwards to plan essays and references.',
        ],
      },
      {
        heading: 'Make your application specific',
        paragraphs: [
          'Scholarship committees want to understand your goals and how the award will help you achieve them. Use concrete examples and answer every question asked.',
        ],
      },
      {
        heading: 'Be cautious',
        paragraphs: [
          'Genuine scholarships do not ask you to pay a fee to receive an award. Always confirm a scholarship on the provider’s official website.',
        ],
      },
    ],
    sources: [
      { label: 'Chevening Scholarships', url: 'https://www.chevening.org' },
      { label: 'DAAD scholarship database', url: 'https://www.daad.de/en/' },
      { label: 'United States-India Educational Foundation (Fulbright-Nehru)', url: 'https://www.usief.org.in' },
    ],
    relatedCountries: ['uk', 'germany', 'usa', 'australia'],
    relatedServices: ['scholarship-assistance', 'education-loan-assistance'],
  },
  {
    slug: 'student-visa-documents-guide',
    category: 'visa-updates',
    title: 'Preparing Your Student Visa Documents',
    seoTitle: 'Student Visa Documents: How to Prepare Your Application | Mantra',
    description: 'The documents most student visa applications require, how to keep them consistent, and where to find the official rules for each country.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 5,
    sections: [
      {
        heading: 'Always start with the official source',
        paragraphs: [
          'Student visa requirements are set by each country’s government and change regularly. Use this guide to organise your preparation, and confirm the current list of documents on the official website for your destination before you apply.',
        ],
      },
      {
        heading: 'Documents most applications need',
        list: [
          'A valid passport',
          'Proof of admission — for example a CAS (UK), Form I-20 (USA), letter of acceptance (Canada) or CoE (Australia)',
          'Proof of funds for tuition and living costs, in the form the country accepts',
          'Academic documents and English test results, if required',
          'Health insurance or health surcharge payment, depending on the country',
          'Passport-size photographs and biometrics as instructed',
        ],
      },
      {
        heading: 'Financial documents',
        paragraphs: [
          'Most countries specify how funds must be shown — for example how long money must have been held, which accounts are acceptable, and whether education loan sanction letters can be used. Read these rules carefully; this is a common reason for delays.',
        ],
      },
      {
        heading: 'Keep everything consistent',
        paragraphs: [
          'Names, dates of birth, course details and amounts should match across your offer, financial documents and visa form. If something has changed — such as a name spelling — address it before applying.',
        ],
      },
      {
        heading: 'Interviews',
        paragraphs: [
          'Some routes, such as the US F-1 visa, include an interview. Be ready to explain your course choice, how you will fund your studies and your plans after graduation, honestly and clearly.',
        ],
      },
    ],
    sources: [
      { label: 'UK — Student visa (GOV.UK)', url: 'https://www.gov.uk/student-visa' },
      { label: 'USA — Student visas (U.S. Department of State)', url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html' },
      { label: 'Canada — Study permits (IRCC)', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html' },
      { label: 'Australia — Student visa subclass 500', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' },
    ],
    relatedCountries: ['uk', 'usa', 'canada', 'australia'],
    relatedServices: ['visa-documentation', 'pre-departure-support'],
  },
  {
    slug: 'how-to-evaluate-a-university-abroad',
    category: 'university-guides',
    title: 'How to Evaluate a University Abroad Beyond Rankings',
    seoTitle: 'How to Evaluate a University Abroad Beyond Rankings | Mantra',
    description: 'Questions to ask about course content, teaching, location, support and outcomes when comparing universities abroad.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 5,
    sections: [
      {
        heading: 'What rankings do and do not tell you',
        paragraphs: [
          'University rankings combine measures such as research output, citations, reputation surveys and staff-to-student ratios. They can be a useful starting point, but they rarely measure the quality of a particular taught master’s programme or how well it fits your goals.',
        ],
      },
      {
        heading: 'Questions to ask about the programme',
        list: [
          'Which modules are compulsory and which are optional?',
          'Is there a project, dissertation, placement or industry component?',
          'Is the programme accredited by a relevant professional body, if that matters for your field?',
          'How is the course assessed — exams, coursework or projects?',
        ],
      },
      {
        heading: 'Questions to ask about the university',
        list: [
          'What support is available for international students?',
          'What careers support does the university offer, and does it publish graduate outcomes?',
          'Where is the campus, and what are living costs in that city?',
          'Is accommodation guaranteed or easy to find?',
        ],
      },
      {
        heading: 'Check that the institution is recognised',
        paragraphs: [
          'Confirm that the institution and programme are properly recognised in the destination country — for example CRICOS registration in Australia or Designated Learning Institution status in Canada.',
        ],
      },
    ],
    relatedCountries: ['uk', 'usa', 'australia', 'canada'],
    relatedServices: ['university-admissions', 'study-abroad-counselling'],
  },
  {
    slug: 'building-a-tech-portfolio-while-studying-abroad',
    category: 'career-guides',
    title: 'Building a Tech Portfolio While Studying Abroad',
    seoTitle: 'Building a Tech Portfolio While Studying Abroad | Mantra',
    description: 'How students in computing, data and engineering can build a portfolio of real projects before and during their studies abroad.',
    author: AUTHOR,
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    readingMinutes: 5,
    sections: [
      {
        heading: 'Why a portfolio helps',
        paragraphs: [
          'For technical roles, a portfolio of real work shows what you can do in a way a transcript cannot. It also gives you concrete examples for statements of purpose, scholarship essays and interviews.',
        ],
      },
      {
        heading: 'Start before you leave',
        list: [
          'Pick one or two areas related to your target programme (for example web development, data analysis or machine learning)',
          'Build small projects that solve a real problem and document them clearly',
          'Publish code on GitHub with a readable README',
          'Keep your CV and LinkedIn profile consistent with your projects',
        ],
      },
      {
        heading: 'Use your course projects',
        paragraphs: [
          'Coursework and dissertation projects can become portfolio pieces. Where your university’s rules allow, write up what you built, the decisions you made and what you learned.',
        ],
      },
      {
        heading: 'Quality over quantity',
        paragraphs: [
          'Three well-documented, working projects are more useful than many unfinished ones. Focus on clear explanations, tested code and honest descriptions of your role in team projects.',
        ],
      },
      {
        heading: 'How Mantra.Ai can help',
        paragraphs: [
          'Mantra Global Education is the education vertical of Mantra.Ai, an IT services company. Students can get guidance on choosing projects, structuring code and presenting their work. A portfolio strengthens your profile, but it does not guarantee admission or employment.',
        ],
      },
    ],
    relatedCountries: ['usa', 'uk', 'germany', 'canada'],
    relatedServices: ['tech-portfolio', 'career-guidance'],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug) ?? null;
}

export function getArticlesByCategory(category: ResourceCategoryId) {
  return ARTICLES.filter((article) => article.category === category);
}

export function getResourceCategory(id: string) {
  return RESOURCE_CATEGORY_PAGES.find((category) => category.id === id) ?? null;
}

export function articlePath(article: Pick<Article, 'category' | 'slug'>) {
  return `/resources/${article.category}/${article.slug}`;
}
