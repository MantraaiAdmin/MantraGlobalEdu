export interface ServiceContent {
  slug: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  intro: string[];
  whoFor: string[];
  whatWeProvide: string[];
  notGuaranteed: string;
  process: { title: string; detail: string }[];
  countries: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  relatedArticles: string[];
}

const ALL_PRIORITY = ['uk', 'usa', 'canada', 'australia', 'germany', 'ireland'];

export const SERVICE_PAGES: ServiceContent[] = [
  {
    slug: 'study-abroad-counselling',
    name: 'Study Abroad Counselling',
    seoTitle: 'Study Abroad Counselling in Coimbatore, Chennai & Online | Mantra',
    metaDescription:
      'One-to-one counselling to choose a country, course and universities that fit your goals and budget — in Coimbatore, Chennai or online across India.',
    h1: 'Study Abroad Counselling',
    summary: 'One-to-one guidance to choose the right country, course and universities for your goals and budget.',
    intro: [
      'Study abroad counselling is where your plan starts. In a counselling session we look at your academic background, the career direction you are interested in, your budget and your timeline, and turn that into a realistic shortlist of countries and courses.',
      'The aim is to help you make an informed decision — including understanding the trade-offs between destinations — before you spend money on applications or tests.',
    ],
    whoFor: [
      'Class 11–12 students considering an undergraduate degree abroad',
      'Graduates and working professionals planning a master’s',
      'Parents who want a clear picture of costs, timelines and risks',
      'Students unsure which country or course suits them',
    ],
    whatWeProvide: [
      'A structured review of your academic profile and goals',
      'Country comparison covering course length, cost, intakes and post-study rules',
      'An initial course and university shortlist with reasons for each option',
      'A timeline for tests, applications, scholarships and visa preparation',
      'Clear next steps — whether or not you continue with our application support',
    ],
    notGuaranteed:
      'Counselling gives you guidance based on published information and our experience. Admission, scholarship and visa decisions are made by universities and authorities, and we cannot guarantee them.',
    process: [
      { title: 'Book a session', detail: 'Choose online or in-person counselling and share your basic details.' },
      { title: 'Profile discussion', detail: 'We discuss your academics, interests, budget and timeline.' },
      { title: 'Options and trade-offs', detail: 'We compare suitable countries and course types.' },
      { title: 'Your action plan', detail: 'You leave with a shortlist and a timeline of next steps.' },
    ],
    countries: ALL_PRIORITY,
    faqs: [
      { q: 'Can counselling be done online?', a: 'Yes. Sessions can be held online, so you can join from anywhere in India.' },
      { q: 'What should I bring to a counselling session?', a: 'Your mark sheets or a summary of grades, any test scores you already have, and an idea of your budget. It is fine if you are still unsure about some details.' },
    ],
    related: ['university-admissions', 'scholarship-assistance', 'career-guidance'],
    relatedArticles: ['how-to-choose-a-country-for-your-masters', 'how-to-shortlist-universities-abroad'],
  },
  {
    slug: 'university-admissions',
    name: 'University Admissions',
    seoTitle: 'University Application & Admissions Assistance | Mantra',
    metaDescription:
      'Help with university shortlisting, application forms, document preparation and deadlines for universities abroad, from first application to offer comparison.',
    h1: 'University Admissions & Application Assistance',
    summary: 'Shortlisting, applications, documents and deadlines — managed with you from first form to offer comparison.',
    intro: [
      'Each university has its own application portal, document rules and deadlines. Our admissions support helps you prepare complete, accurate applications and keep track of every requirement.',
      'We work with you on the application itself — you remain the applicant, and every statement in your application must be your own and true.',
    ],
    whoFor: [
      'Students who have chosen a destination and want help applying',
      'Applicants applying to several universities with different deadlines',
      'Students who want a second check on documents before submission',
    ],
    whatWeProvide: [
      'A final shortlist balanced across ambitious, realistic and safer options',
      'A deadline and document tracker for each university',
      'Guidance on completing application forms accurately',
      'Review of transcripts, CV and supporting documents for completeness',
      'Help comparing offers and understanding offer conditions',
    ],
    notGuaranteed:
      'Universities make admission decisions independently. We help you submit strong, complete applications but cannot guarantee an offer from any institution.',
    process: [
      { title: 'Shortlist', detail: 'Confirm the universities and courses you will apply to.' },
      { title: 'Prepare documents', detail: 'Gather transcripts, test scores, CV, SOP and references.' },
      { title: 'Submit', detail: 'Complete and submit applications before each deadline.' },
      { title: 'Offers', detail: 'Track decisions, meet conditions and compare offers.' },
    ],
    countries: ALL_PRIORITY,
    faqs: [
      { q: 'How many universities should I apply to?', a: 'It depends on the country and your profile, but most students apply to a balanced list of several universities rather than one or two.' },
      { q: 'Do you submit the application for me?', a: 'We guide you through each step. You remain responsible for the accuracy of the information you submit.' },
      { q: 'What is a conditional offer?', a: 'An offer that becomes final once you meet stated conditions, such as final grades or an English test score.' },
    ],
    related: ['sop-lor-support', 'scholarship-assistance', 'visa-documentation'],
    relatedArticles: ['study-abroad-application-checklist', 'common-study-abroad-application-mistakes'],
  },
  {
    slug: 'scholarship-assistance',
    name: 'Scholarship Assistance',
    seoTitle: 'Study Abroad Scholarship Assistance for Indian Students | Mantra',
    metaDescription:
      'Find scholarships you may be eligible for, understand deadlines and requirements, and prepare stronger scholarship applications for study abroad.',
    h1: 'Scholarship Assistance',
    summary: 'Identify scholarships you may be eligible for and prepare complete, well-timed applications.',
    intro: [
      'Scholarships can make a real difference to the cost of studying abroad, but they are competitive and often have deadlines months before course applications close.',
      'We help you find scholarships that match your profile and destination, understand what each one requires, and plan your applications so you do not miss key dates.',
    ],
    whoFor: [
      'Students with strong academic records looking for merit awards',
      'Applicants who want to understand university and government funding options',
      'Families planning a budget that depends partly on funding',
    ],
    whatWeProvide: [
      'A shortlist of scholarships relevant to your destination and course',
      'An explanation of eligibility, award type and application requirements',
      'Deadline planning alongside your university applications',
      'Feedback on scholarship essays and supporting documents',
    ],
    notGuaranteed:
      'Scholarships are awarded by universities, governments and foundations. We help you prepare applications but cannot guarantee that any scholarship will be awarded.',
    process: [
      { title: 'Eligibility check', detail: 'Match your profile to available scholarships.' },
      { title: 'Plan', detail: 'Set a timeline that fits scholarship and course deadlines.' },
      { title: 'Prepare', detail: 'Draft essays and gather required documents.' },
      { title: 'Submit and follow up', detail: 'Submit on time and track outcomes.' },
    ],
    countries: ['uk', 'usa', 'germany', 'australia', 'ireland', 'france'],
    faqs: [
      { q: 'Are there full scholarships for Indian students?', a: 'Some fully funded schemes exist, such as certain government scholarships, but they are highly competitive. Most university scholarships are partial.' },
      { q: 'When should I start looking for scholarships?', a: 'Ideally 12 months before your intended start date, because many deadlines are early.' },
      { q: 'Do I need an admission offer before applying for a scholarship?', a: 'For some scholarships yes, for others no. Each scheme sets its own rules.' },
    ],
    related: ['university-admissions', 'education-loan-assistance', 'sop-lor-support'],
    relatedArticles: ['how-to-find-study-abroad-scholarships'],
  },
  {
    slug: 'visa-documentation',
    name: 'Visa Documentation',
    seoTitle: 'Student Visa Documentation Guidance | Mantra Global Education',
    metaDescription:
      'Understand student visa requirements, organise financial and academic documents, and prepare for visa interviews — with guidance from Mantra Global Education.',
    h1: 'Student Visa Documentation Guidance',
    summary: 'Organise the documents your student visa needs and prepare for interviews where required.',
    intro: [
      'Student visa applications are document-heavy, and requirements differ by country. We help you understand what your visa route requires and organise your documents so that your application is complete and consistent.',
      'We guide you based on the official requirements published by each government. We are not immigration lawyers, and the final application and its contents are your responsibility.',
    ],
    whoFor: [
      'Students who have an offer and are preparing a visa application',
      'Families organising financial documents and sponsorship evidence',
      'Applicants preparing for a visa interview',
    ],
    whatWeProvide: [
      'A country-specific document checklist based on official guidance',
      'Guidance on financial documents and how they should be presented',
      'Consistency checks across your application, offer and financial evidence',
      'Mock interview practice where an interview is part of the process',
    ],
    notGuaranteed:
      'Visa decisions are made solely by the relevant government authority. We cannot guarantee visa approval or processing times.',
    process: [
      { title: 'Requirements', detail: 'Confirm your visa type and the current official requirements.' },
      { title: 'Document checklist', detail: 'Gather academic, financial and identity documents.' },
      { title: 'Review', detail: 'Check documents for completeness and consistency.' },
      { title: 'Submit and prepare', detail: 'Submit your application and prepare for any interview.' },
    ],
    countries: ALL_PRIORITY,
    faqs: [
      { q: 'Can you guarantee my visa?', a: 'No. Only the relevant government authority can decide a visa application.' },
      { q: 'How early should I apply for my visa?', a: 'As early as the rules allow after receiving your offer documents, because processing times vary by season.' },
      { q: 'Do you help with visa interviews?', a: 'Yes, we offer interview preparation where an interview is part of the process, such as for the US F-1 visa.' },
    ],
    related: ['pre-departure-support', 'education-loan-assistance', 'university-admissions'],
    relatedArticles: ['student-visa-documents-guide'],
  },
  {
    slug: 'sop-lor-support',
    name: 'SOP & LOR Support',
    seoTitle: 'SOP and LOR Assistance for Study Abroad | Mantra',
    metaDescription:
      'Guidance on writing your statement of purpose and requesting strong letters of recommendation — structure, feedback and review, written in your own voice.',
    h1: 'SOP & LOR Support',
    summary: 'Structure, feedback and review to help you write a clear statement of purpose and request strong references.',
    intro: [
      'Your statement of purpose (SOP) and letters of recommendation (LORs) are often the only parts of your application that show who you are beyond grades. We help you plan, structure and refine them.',
      'We do not write your SOP for you. Admissions teams expect your statement to be your own work, and many universities check for this. Our role is to guide and give feedback.',
    ],
    whoFor: [
      'Applicants writing an SOP or personal statement for the first time',
      'Students who have a draft and want structured feedback',
      'Applicants unsure whom to ask for recommendations or how to ask',
    ],
    whatWeProvide: [
      'A brainstorming session to identify your strongest material',
      'Guidance on structure tailored to each university’s prompt',
      'Rounds of feedback on clarity, specificity and length',
      'Advice on choosing referees and briefing them effectively',
    ],
    notGuaranteed:
      'A well-written SOP strengthens an application but does not guarantee admission. Statements must be your own work.',
    process: [
      { title: 'Brainstorm', detail: 'Identify experiences, motivations and goals worth including.' },
      { title: 'Outline', detail: 'Plan a structure that answers the university’s prompt.' },
      { title: 'Draft and feedback', detail: 'You write; we review and suggest improvements.' },
      { title: 'Finalise', detail: 'Proofread and tailor for each university.' },
    ],
    countries: ALL_PRIORITY,
    faqs: [
      { q: 'Will you write my SOP?', a: 'No. We guide and review, but the statement must be written by you.' },
      { q: 'Who should write my letters of recommendation?', a: 'People who know your academic or professional work well, such as professors or managers, usually write the most useful letters.' },
      { q: 'Can I use the same SOP for every university?', a: 'You can reuse core material, but each statement should be tailored to the programme and the university’s prompt.' },
    ],
    related: ['university-admissions', 'scholarship-assistance', 'career-guidance'],
    relatedArticles: ['how-to-write-a-strong-sop', 'letter-of-recommendation-guide'],
  },
  {
    slug: 'education-loan-assistance',
    name: 'Education Loan Assistance',
    seoTitle: 'Education Loan Guidance for Study Abroad | Mantra',
    metaDescription:
      'Understand overseas education loan options, documentation and timelines so you can plan funding for your studies abroad with confidence.',
    h1: 'Education Loan Assistance',
    summary: 'Understand loan options, documents and timelines so funding is ready when you need it.',
    intro: [
      'Many families fund overseas study partly through an education loan. Loan terms, collateral requirements and processing times vary between lenders, and the timing needs to fit your visa application.',
      'We help you understand the options and prepare the documents lenders typically ask for. We are not a lender or a financial adviser, and we do not recommend specific financial products.',
    ],
    whoFor: [
      'Families considering an education loan for overseas study',
      'Students who need loan sanction letters for visa applications',
      'Applicants comparing secured and unsecured loan options',
    ],
    whatWeProvide: [
      'An overview of common loan types and the questions to ask lenders',
      'A documentation checklist for loan applications',
      'Timeline planning so funds or sanction letters are ready for your visa',
    ],
    notGuaranteed:
      'Loan approval, amount and terms are decided by the lender. We do not guarantee loan approval and do not provide financial advice.',
    process: [
      { title: 'Estimate costs', detail: 'Work out total tuition and living costs.' },
      { title: 'Understand options', detail: 'Review loan types and lender requirements.' },
      { title: 'Prepare documents', detail: 'Gather admission, income and collateral documents.' },
      { title: 'Apply', detail: 'You apply directly to your chosen lender.' },
    ],
    countries: ALL_PRIORITY,
    faqs: [
      { q: 'Do you provide loans?', a: 'No. We guide you through the process; loans are provided by banks and other lenders.' },
      { q: 'When should I apply for an education loan?', a: 'Usually once you have an admission offer, leaving enough time for sanction before your visa application.' },
      { q: 'Is collateral always required?', a: 'Not always. Requirements depend on the lender, the loan amount and the course.' },
    ],
    related: ['scholarship-assistance', 'visa-documentation', 'study-abroad-counselling'],
    relatedArticles: ['how-to-find-study-abroad-scholarships', 'student-visa-documents-guide'],
  },
  {
    slug: 'pre-departure-support',
    name: 'Pre-Departure Support',
    seoTitle: 'Pre-Departure Support for Students Going Abroad | Mantra',
    metaDescription:
      'Prepare for life abroad: accommodation, travel, forex, health insurance, packing and arrival planning — practical pre-departure guidance from Mantra Global Education.',
    h1: 'Pre-Departure Support',
    summary: 'Practical preparation for accommodation, travel, money and your first weeks abroad.',
    intro: [
      'Once your visa is approved, there is still a lot to arrange. Pre-departure support helps you plan accommodation, travel, money and insurance so your first weeks abroad go smoothly.',
    ],
    whoFor: ['Students with a visa or an approved offer preparing to travel', 'Parents who want a checklist for the move'],
    whatWeProvide: [
      'A pre-departure checklist tailored to your destination',
      'Guidance on accommodation options and what to check before paying',
      'Information on forex, banking and health insurance basics',
      'Arrival planning: airport travel, registration and orientation',
    ],
    notGuaranteed:
      'Accommodation, travel and banking services are provided by third parties. We share guidance but do not guarantee third-party services.',
    process: [
      { title: 'Checklist', detail: 'Review what needs to be done before you fly.' },
      { title: 'Accommodation and travel', detail: 'Plan where you will stay and how you will get there.' },
      { title: 'Money and insurance', detail: 'Arrange forex, banking and required cover.' },
      { title: 'Arrival', detail: 'Know what to do in your first week.' },
    ],
    countries: ALL_PRIORITY,
    faqs: [
      { q: 'When should I book accommodation?', a: 'As soon as your offer is confirmed, especially in cities with housing shortages.' },
      { q: 'What documents should I carry when travelling?', a: 'Typically your passport and visa, offer letter, financial evidence and insurance documents — check your destination’s guidance.' },
    ],
    related: ['visa-documentation', 'career-guidance', 'study-abroad-counselling'],
    relatedArticles: ['student-visa-documents-guide'],
  },
  {
    slug: 'career-guidance',
    name: 'Career Guidance',
    seoTitle: 'Career Guidance for Study Abroad Students | Mantra',
    metaDescription:
      'Connect your course choice to your career goals: understand roles, skills and post-study options before you choose where and what to study.',
    h1: 'Career Guidance for Students Planning to Study Abroad',
    summary: 'Link your course and country choice to realistic career goals and the skills employers look for.',
    intro: [
      'The right course depends on where you want your career to go. Career guidance helps you think through roles, industries and skills before committing to a course and country.',
      'We focus on helping you make informed choices. Career outcomes depend on many factors — including your own effort and the job market — and cannot be guaranteed.',
    ],
    whoFor: [
      'Students choosing between courses or specialisations',
      'Professionals considering a master’s to change or grow their career',
      'Students who want to understand post-study work rules before choosing a country',
    ],
    whatWeProvide: [
      'Discussion of career paths related to your interests and background',
      'Guidance on skills and experience to build during your studies',
      'An overview of post-study work rules by destination',
    ],
    notGuaranteed:
      'We do not guarantee jobs, internships, salaries or post-study work outcomes.',
    process: [
      { title: 'Explore', detail: 'Discuss your interests, strengths and goals.' },
      { title: 'Map', detail: 'Connect roles to courses and skills.' },
      { title: 'Plan', detail: 'Build a skills and experience plan for your studies.' },
    ],
    countries: ALL_PRIORITY,
    faqs: [
      { q: 'Can you guarantee a job after I graduate?', a: 'No. We help you plan, but employment depends on many factors outside our control.' },
      { q: 'Should I choose a country based on post-study work rules?', a: 'They are an important factor, but course fit, cost and your long-term plans matter too — and rules can change.' },
    ],
    related: ['tech-portfolio', 'study-abroad-counselling', 'sop-lor-support'],
    relatedArticles: ['building-a-tech-portfolio-while-studying-abroad', 'how-to-choose-a-country-for-your-masters'],
  },
  {
    slug: 'tech-portfolio',
    name: 'Mantra.Ai Tech Portfolio',
    seoTitle: 'Tech Portfolio & Profile Development with Mantra.Ai | Mantra',
    metaDescription:
      'Build a technology portfolio while you prepare for and pursue study abroad — projects, skills and a professional profile, supported by Mantra.Ai.',
    h1: 'Tech Portfolio & Profile Development with Mantra.Ai',
    summary: 'Build projects, skills and a professional profile with support from Mantra.Ai, our technology company.',
    intro: [
      'Mantra Global Education is the education vertical of Mantra.Ai, an IT services company. That connection lets us offer something most consultancies do not: help building a practical technology portfolio alongside your admissions journey.',
      'A portfolio of real projects can strengthen applications for technical programmes and gives you material to discuss with future employers. The work is yours — we provide structure, guidance and review.',
    ],
    whoFor: [
      'Students applying for computer science, data, IT or engineering programmes',
      'Students who want practical project experience before or during their master’s',
      'Applicants who want a stronger professional profile (CV, GitHub, LinkedIn)',
    ],
    whatWeProvide: [
      'Guidance on choosing portfolio projects relevant to your target field',
      'Feedback on project structure, code quality and documentation',
      'Help presenting your work on your CV and professional profiles',
      'Ongoing guidance during your studies where agreed',
    ],
    notGuaranteed:
      'Portfolio support helps you build skills and evidence of your work. It does not guarantee admission, internships, employment or salary outcomes.',
    process: [
      { title: 'Assess', detail: 'Review your current skills and target field.' },
      { title: 'Plan', detail: 'Agree projects and milestones.' },
      { title: 'Build', detail: 'You build; we review and guide.' },
      { title: 'Present', detail: 'Showcase your work on your CV and profiles.' },
    ],
    countries: ['usa', 'uk', 'germany', 'canada', 'ireland', 'australia'],
    faqs: [
      { q: 'What is Mantra.Ai?', a: 'Mantra.Ai is the IT services company behind Mantra Global Education.' },
      { q: 'Do I need coding experience?', a: 'Not necessarily. We start from your current level and plan projects accordingly.' },
      { q: 'Does a portfolio guarantee a job?', a: 'No, but it gives you concrete evidence of your skills to share with universities and employers.' },
    ],
    related: ['career-guidance', 'sop-lor-support', 'university-admissions'],
    relatedArticles: ['building-a-tech-portfolio-while-studying-abroad'],
  },
];

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((service) => service.slug === slug) ?? null;
}
