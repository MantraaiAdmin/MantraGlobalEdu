/**
 * Destination guides for the priority country pages.
 *
 * Visa, fee and work-right rules change. Content here deliberately avoids
 * precise figures that move often and points readers to the official source.
 * Update `lastReviewed` whenever a guide is checked against its sources.
 */

export interface GuideSource {
  label: string;
  url: string;
}

export interface CountryGuide {
  slug: string;
  code: string;
  name: string;
  /** Short name for titles, e.g. "the UK" */
  inName: string;
  seoTitle: string;
  metaDescription: string;
  overview: string[];
  whyConsider: string[];
  popularFields: string[];
  qualifications: string[];
  entryRequirements: string;
  englishRequirements: string;
  intakes: string;
  timeline: string[];
  costGuidance: string;
  scholarshipGuidance: string;
  visaOverview: string;
  workRules: string;
  postStudy: string;
  cities: string[];
  selectionTips: string[];
  faqs: { q: string; a: string }[];
  sources: GuideSource[];
  lastReviewed: string;
}

const REVIEWED = '2026-10-22';

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    slug: 'uk',
    code: 'GB',
    name: 'United Kingdom',
    inName: 'the UK',
    seoTitle: 'Study in the UK: Universities, Costs & Intakes | Mantra',
    metaDescription:
      'Plan your UK studies: one-year master’s, UCAS applications, intakes, Student visa basics, costs and the Graduate route, with expert counselling.',
    overview: [
      'The UK is one of the most popular destinations for Indian students, largely because many taught master’s degrees are completed in about one year and undergraduate degrees in England usually take three years. Shorter programmes can reduce total tuition and living costs compared with longer degrees elsewhere.',
      'UK universities set their own entry requirements, so two courses with similar names can ask for quite different academic backgrounds. Shortlisting carefully — and checking each university’s published requirements — matters more than relying on rankings alone.',
    ],
    whyConsider: [
      'One-year taught master’s programmes in many subjects',
      'Three-year bachelor’s degrees in England, Wales and Northern Ireland (usually four in Scotland)',
      'A wide choice of universities, from large research-intensive institutions to specialist and modern universities',
      'A post-study route for eligible graduates (see “After graduation” below)',
    ],
    popularFields: ['Computer science and data science', 'Business, management and finance', 'Engineering', 'Public health and life sciences', 'Law', 'Design and media'],
    qualifications: ['Bachelor’s (BA, BSc, BEng)', 'Taught master’s (MSc, MA, MBA, LLM)', 'Research master’s (MRes)', 'PhD', 'Foundation and pre-master’s pathway programmes'],
    entryRequirements:
      'Undergraduate applications are made through UCAS and are assessed on Class 12 results and subject choices. For postgraduate study you apply directly to each university, which will look at your bachelor’s degree classification, relevant subjects, statement of purpose and references. Each university publishes how it treats Indian qualifications — check the course page for the exact grade it expects.',
    englishRequirements:
      'Most universities accept IELTS Academic and several other approved tests; some accept Class 12 English results for certain courses. The required score depends on the course. If you need a Student visa, make sure the test and score you take are accepted for both the university and the visa.',
    intakes:
      'The main intake is September/October. Many universities also offer a January intake for selected postgraduate courses, and a small number start some courses in spring or summer.',
    timeline: [
      '12–15 months before start: shortlist courses and universities, check entry requirements',
      '9–12 months before: prepare SOP and references; book an English test if needed',
      '6–9 months before: submit applications (UCAS has fixed undergraduate deadlines)',
      'After an offer: meet any conditions, pay a deposit if required, receive your CAS',
      '3 months before: apply for the Student visa and arrange accommodation',
    ],
    costGuidance:
      'Tuition for international students varies widely by university and subject; laboratory-based and clinical courses usually cost more. Living costs are generally higher in London than elsewhere. The Student visa also requires you to show you can cover course fees and living costs — check the current amounts on GOV.UK.',
    scholarshipGuidance:
      'Funding includes government schemes such as Chevening, university scholarships for international students, and department-level awards. Most are competitive and many have deadlines well before the course application deadline.',
    visaOverview:
      'To study a full degree you normally need a Student visa. You apply after a licensed sponsor (your university) issues a Confirmation of Acceptance for Studies (CAS). You will typically need to show proof of funds, an accepted English level, and pay the Immigration Health Surcharge. Under rules introduced in January 2024, most taught postgraduate students can no longer bring dependants.',
    workRules:
      'Degree-level students on a Student visa can usually work part-time during term time and full-time during official vacations, within limits set on the visa. Your exact permission is printed on your visa — check it before accepting work.',
    postStudy:
      'Eligible graduates can apply for the Graduate route to stay and work after completing a degree. Its length and conditions are set by the Home Office and have been reviewed in recent years, so confirm the current rules on GOV.UK before you plan around it.',
    cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 'Leeds', 'Nottingham', 'Coventry'],
    selectionTips: [
      'Compare course modules, not just course titles — UK master’s programmes are short, so content matters',
      'Check whether a course has professional accreditation if you need it for your career',
      'Look at total cost (tuition + living + visa) for the full course length',
    ],
    faqs: [
      { q: 'Is a one-year UK master’s recognised in India?', a: 'UK master’s degrees from recognised universities are widely accepted. If you plan to work in a regulated profession or a government role in India, check the specific recognition rules for that profession.' },
      { q: 'Do I need IELTS for the UK?', a: 'Not always. Some universities accept other tests or Class 12 English marks for some courses. The requirement depends on the university, the course and your visa route.' },
      { q: 'When should I apply for a September intake?', a: 'Ideally start shortlisting a year ahead. Popular courses can fill early, and scholarship deadlines are often months before the course starts.' },
    ],
    sources: [
      { label: 'GOV.UK — Student visa', url: 'https://www.gov.uk/student-visa' },
      { label: 'GOV.UK — Graduate visa', url: 'https://www.gov.uk/graduate-visa' },
      { label: 'UCAS — undergraduate applications', url: 'https://www.ucas.com' },
      { label: 'UKCISA — advice for international students', url: 'https://www.ukcisa.org.uk' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'usa',
    code: 'US',
    name: 'United States',
    inName: 'the USA',
    seoTitle: 'Study in the USA: Universities, Costs & Intakes | Mantra',
    metaDescription:
      'Plan your US studies: choosing universities, Fall and Spring intakes, GRE/SAT and English tests, F-1 visa steps, costs and OPT.',
    overview: [
      'The United States has the largest higher-education system in the world, with thousands of accredited institutions ranging from large research universities to small liberal-arts colleges. That choice is an advantage, but it also makes careful shortlisting essential.',
      'US degrees tend to be flexible: undergraduates often explore subjects before declaring a major, and many master’s programmes combine coursework with projects, research or internships. Indian students most often consider the US for STEM master’s degrees.',
    ],
    whyConsider: [
      'Very wide choice of universities and specialisations',
      'Flexible curricula and strong research opportunities',
      'Practical training options for F-1 students during and after study (CPT and OPT)',
      'Funding options such as assistantships at some graduate schools',
    ],
    popularFields: ['Computer science and software engineering', 'Data science and analytics', 'Electrical and mechanical engineering', 'Business analytics and MBA', 'Biotechnology and life sciences'],
    qualifications: ['Associate degree (community colleges)', 'Bachelor’s (usually 4 years)', 'Master’s (often 1.5–2 years)', 'PhD', 'Graduate certificates'],
    entryRequirements:
      'Admission is holistic: universities consider academic records, test scores where required, essays, recommendation letters and relevant experience. Many undergraduate programmes are now test-optional for the SAT/ACT, and some graduate programmes have dropped the GRE or GMAT — but others still require them. Always check each programme’s current policy.',
    englishRequirements:
      'Most universities accept TOEFL iBT and IELTS Academic, and many also accept the Duolingo English Test. Minimum scores vary by university and programme, and some graduate departments set higher requirements than the university minimum.',
    intakes:
      'Fall (August/September) is the main intake with the most programmes and funding options. Spring (January) is available at many universities, and a few programmes start in summer.',
    timeline: [
      '12–18 months before: research programmes, plan any required tests (GRE/GMAT/SAT, English)',
      '9–12 months before: write essays/SOP and request recommendation letters',
      '6–10 months before: submit applications (many Fall deadlines fall between December and February)',
      'After admission: submit financial documents and receive Form I-20',
      'Pay the SEVIS fee, complete the DS-160 and attend the visa interview',
    ],
    costGuidance:
      'Tuition differs greatly between public and private universities, and between programmes. Living costs depend heavily on the city. Your I-20 will show the university’s own estimate of total annual cost, which you must be able to document for the visa.',
    scholarshipGuidance:
      'Funding at graduate level often comes as departmental scholarships, tuition waivers, or teaching and research assistantships. Undergraduate aid for international students varies a lot by institution. External programmes such as Fulbright-Nehru have their own eligibility rules.',
    visaOverview:
      'Most degree students use the F-1 visa. After your university (an SEVP-certified school) issues Form I-20, you pay the SEVIS I-901 fee, complete the DS-160 online application and attend an interview at a US embassy or consulate in India. Consular officers decide each case individually.',
    workRules:
      'F-1 students can usually work on campus within limits during term. Off-campus work is restricted and normally only possible through authorised practical training such as Curricular Practical Training (CPT). Speak to your university’s international student office before taking any job.',
    postStudy:
      'Optional Practical Training (OPT) allows eligible F-1 students to gain work experience related to their field, and graduates in eligible STEM fields may apply for a STEM OPT extension. Rules are set by US authorities and can change — check USCIS and your university’s guidance.',
    cities: ['Boston', 'New York', 'San Francisco Bay Area', 'Chicago', 'Los Angeles', 'Seattle', 'Dallas', 'Atlanta'],
    selectionTips: [
      'Check whether the programme is STEM-designated if post-study training matters to you',
      'Compare total cost of attendance, not tuition alone',
      'Look for programme-level outcomes data published by the university',
    ],
    faqs: [
      { q: 'Is the GRE still required for US master’s programmes?', a: 'It depends on the programme. Many have made the GRE optional, while others — especially some competitive engineering and quantitative programmes — still require or recommend it.' },
      { q: 'Can I apply for the Spring intake?', a: 'Yes, many universities offer Spring entry, though fewer programmes and funding options are available than in Fall.' },
      { q: 'What is the difference between CPT and OPT?', a: 'CPT is work authorised as part of your curriculum while you study. OPT is practical training related to your field, used during or after your programme, subject to eligibility and approval.' },
    ],
    sources: [
      { label: 'U.S. Department of State — Student visas', url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html' },
      { label: 'Study in the States (DHS)', url: 'https://studyinthestates.dhs.gov' },
      { label: 'USCIS — Optional Practical Training', url: 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students' },
      { label: 'EducationUSA', url: 'https://educationusa.state.gov' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'canada',
    code: 'CA',
    name: 'Canada',
    inName: 'Canada',
    seoTitle: 'Study in Canada: Colleges, Universities & Intakes | Mantra',
    metaDescription:
      'Plan your studies in Canada: universities vs colleges, intakes, study permits, attestation letters, costs and post-graduation work options.',
    overview: [
      'Canada offers study options at both universities (degrees and research) and colleges (diplomas, advanced diplomas and postgraduate certificates). Choosing between the two is one of the first decisions to make, because it affects cost, programme length and post-study eligibility.',
      'Canada has changed its international student rules several times since 2024, including caps on study permits and new requirements for some applicants. Plans should be based on the current rules published by Immigration, Refugees and Citizenship Canada (IRCC).',
    ],
    whyConsider: [
      'Choice of university degrees and career-focused college programmes',
      'Co-op programmes that combine study with paid work terms at many institutions',
      'Post-graduation work permit options for eligible graduates',
      'Large, established Indian student communities in many cities',
    ],
    popularFields: ['Computer science and IT', 'Engineering', 'Business and supply chain management', 'Data analytics', 'Healthcare and nursing pathways', 'Hospitality'],
    qualifications: ['College diplomas and advanced diplomas', 'Postgraduate certificates', 'Bachelor’s (usually 4 years)', 'Master’s (course-based or thesis-based)', 'PhD'],
    entryRequirements:
      'Universities assess your academic record and, for graduate programmes, your bachelor’s degree, SOP and references. Colleges usually focus on relevant academic background and English level. You must be accepted by a Designated Learning Institution (DLI) to apply for a study permit.',
    englishRequirements:
      'IELTS Academic and other recognised tests are widely accepted. Institutions set their own minimum scores, and some study permit streams have specific test requirements — check both before booking a test.',
    intakes:
      'September (Fall) is the main intake. January (Winter) is widely available, and some colleges also offer May intakes.',
    timeline: [
      '12 months before: choose between university and college routes; shortlist DLIs',
      '8–12 months before: prepare documents and English test',
      '6–9 months before: apply; many programmes fill early',
      'After acceptance: obtain any required provincial/territorial attestation letter',
      'Apply for the study permit with proof of funds and other documents',
    ],
    costGuidance:
      'College programmes are usually less expensive than university degrees. Living costs vary by city — Toronto and Vancouver are typically the most expensive. IRCC sets a minimum amount of funds you must show, which has been revised in recent years.',
    scholarshipGuidance:
      'Entrance scholarships are offered by many universities, often automatically considered with your application. Graduate funding is more common for thesis-based programmes. College scholarships for international students tend to be smaller.',
    visaOverview:
      'You need a study permit for most programmes longer than six months. Applicants generally need a letter of acceptance from a DLI, proof of funds, and — for many applicants — a provincial or territorial attestation letter (PAL/TAL). Check IRCC for whether the attestation requirement applies to your programme level.',
    workRules:
      'Eligible students can work off campus up to a weekly limit during regular academic sessions and full-time during scheduled breaks. The limit has changed recently, so check the current IRCC rule.',
    postStudy:
      'The Post-Graduation Work Permit (PGWP) allows eligible graduates to work in Canada. Eligibility depends on your institution, programme length and, for some college programmes, field of study. Confirm eligibility before you accept an offer.',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary', 'Waterloo', 'Halifax'],
    selectionTips: [
      'Check PGWP eligibility for the exact programme before applying',
      'Compare co-op availability and how work terms are arranged',
      'Factor in housing costs, which vary sharply between cities',
    ],
    faqs: [
      { q: 'Should I choose a college or a university in Canada?', a: 'It depends on your goals. Colleges offer shorter, career-focused programmes; universities offer degrees and research. Post-study eligibility can differ, so compare both carefully.' },
      { q: 'What is a PAL/TAL?', a: 'A provincial or territorial attestation letter confirms a place under Canada’s study permit allocation. Many applicants need one; IRCC lists who is exempt.' },
      { q: 'Can I work while studying in Canada?', a: 'Eligible students can work off campus within a weekly limit during term and full-time during scheduled breaks. Check the current conditions on IRCC.' },
    ],
    sources: [
      { label: 'IRCC — Study in Canada', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html' },
      { label: 'IRCC — Work after graduation (PGWP)', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html' },
      { label: 'EduCanada', url: 'https://www.educanada.ca' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'australia',
    code: 'AU',
    name: 'Australia',
    inName: 'Australia',
    seoTitle: 'Study in Australia: Universities, Costs & Intakes | Mantra',
    metaDescription:
      'Plan your studies in Australia: February and July intakes, the subclass 500 Student visa, Genuine Student requirement, costs and graduate visas.',
    overview: [
      'Australia combines internationally recognised universities with a well-regulated system for international students. Every provider and course offered to international students must be registered on CRICOS, which gives students a clear way to check a course before applying.',
      'Many Indian students choose Australia for master’s degrees in IT, engineering, business and health. Course length, credit for prior study and campus location can all affect cost and post-study options.',
    ],
    whyConsider: [
      'Two main intakes each year (February and July)',
      'Registered courses with consumer protections for international students (ESOS framework)',
      'Practical, industry-linked programmes at many universities',
      'A temporary graduate visa pathway for eligible graduates',
    ],
    popularFields: ['Information technology', 'Engineering', 'Business and accounting', 'Nursing and public health', 'Data science', 'Education'],
    qualifications: ['Bachelor’s (usually 3 years; 4 for some honours and professional degrees)', 'Graduate certificates and diplomas', 'Master’s by coursework (often 1.5–2 years)', 'Master’s by research and PhD'],
    entryRequirements:
      'Universities assess your previous studies against course-specific requirements and may give credit for related prior study. For postgraduate coursework, many programmes look at your bachelor’s discipline and grades; some also consider work experience.',
    englishRequirements:
      'IELTS Academic, PTE Academic, TOEFL iBT and other tests are accepted by most universities. The score you need is set by the course, and the Department of Home Affairs also lists accepted tests for visa purposes.',
    intakes:
      'Semester 1 starts in February/March and Semester 2 in July. Some universities run additional trimester intakes, for example in November.',
    timeline: [
      '10–12 months before: shortlist CRICOS-registered courses',
      '6–9 months before: apply with academic documents and English scores',
      'After an offer: accept, pay deposit and arrange Overseas Student Health Cover (OSHC)',
      'Receive your Confirmation of Enrolment (CoE)',
      'Apply for the Student visa (subclass 500)',
    ],
    costGuidance:
      'Tuition varies by university and course. Living costs depend on the city, with Sydney and Melbourne typically the most expensive. The Student visa requires evidence of funds, and the required amount is set by Home Affairs.',
    scholarshipGuidance:
      'Most scholarships for international students are offered by universities themselves and are often partial tuition reductions. Government-funded options such as Australia Awards are limited to specific countries and programmes.',
    visaOverview:
      'Most international students apply for the Student visa (subclass 500) after receiving a Confirmation of Enrolment. You must meet the Genuine Student requirement, show financial capacity, meet English requirements and hold OSHC for your stay.',
    workRules:
      'Student visa holders can usually work a limited number of hours per fortnight while their course is in session and unlimited hours during scheduled breaks. Check the current limit on the Home Affairs website.',
    postStudy:
      'The Temporary Graduate visa (subclass 485) allows eligible graduates to live and work in Australia temporarily. Its streams, age limits and duration depend on your qualification and current rules.',
    cities: ['Melbourne', 'Sydney', 'Brisbane', 'Adelaide', 'Perth', 'Canberra'],
    selectionTips: [
      'Check the course on CRICOS and confirm the campus you will attend',
      'Ask whether you are eligible for credit for prior learning — it can shorten your course',
      'Compare regional and metropolitan campuses on cost and post-study considerations',
    ],
    faqs: [
      { q: 'What is the Genuine Student requirement?', a: 'It replaced the earlier Genuine Temporary Entrant requirement in 2024. You must show that you genuinely intend to study in Australia, usually through written answers and supporting documents.' },
      { q: 'Is OSHC mandatory?', a: 'Yes. Student visa holders must maintain Overseas Student Health Cover for the duration of their stay.' },
      { q: 'Which intake is better — February or July?', a: 'February usually has the widest course choice. July works well if you need more time to prepare, and many courses are available in both intakes.' },
    ],
    sources: [
      { label: 'Home Affairs — Student visa (subclass 500)', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' },
      { label: 'Home Affairs — Temporary Graduate visa (subclass 485)', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485' },
      { label: 'Study Australia (Australian Government)', url: 'https://www.studyaustralia.gov.au' },
      { label: 'CRICOS course register', url: 'https://cricos.education.gov.au' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'germany',
    code: 'DE',
    name: 'Germany',
    inName: 'Germany',
    seoTitle: 'Study in Germany: Public Universities, APS & Intakes | Mantra',
    metaDescription:
      'Plan your studies in Germany: low-tuition public universities, English-taught master’s, APS certificate, blocked account, intakes and job search.',
    overview: [
      'Germany is known for strong engineering and technical education and for public universities that charge low or no tuition for most programmes. Students still pay a semester contribution, and some federal states — such as Baden-Württemberg — charge tuition to most non-EU students.',
      'Many master’s programmes are taught in English, but most bachelor’s programmes are in German. Even on an English-taught course, learning German improves everyday life and job prospects considerably.',
    ],
    whyConsider: [
      'Low or no tuition at most public universities',
      'Strong engineering, technology and research ecosystem',
      'English-taught master’s options in many technical subjects',
      'A residence permit option to look for work after graduation',
    ],
    popularFields: ['Mechanical and automotive engineering', 'Electrical engineering', 'Computer science', 'Data science and AI', 'Renewable energy', 'Management'],
    qualifications: ['Bachelor’s (usually 3–3.5 years)', 'Master’s (usually 2 years)', 'PhD', 'Programmes at universities of applied sciences (Fachhochschulen)'],
    entryRequirements:
      'Universities check whether your previous qualification is equivalent to the German requirement. Indian Class 12 results alone often do not give direct entry to a bachelor’s programme, so some students first complete a year of university study in India or a preparatory course. Many universities use uni-assist to pre-check applications.',
    englishRequirements:
      'English-taught programmes usually accept IELTS or TOEFL. German-taught programmes require proof of German, such as TestDaF or DSH. Requirements are set by each programme.',
    intakes:
      'The winter semester (starting around October) is the main intake. Some programmes also admit for the summer semester (starting around April). Application windows are often months earlier.',
    timeline: [
      '12–18 months before: shortlist programmes and check eligibility (DAAD database)',
      'Apply for the APS certificate early — it can take time',
      '6–9 months before: submit applications (often via uni-assist)',
      'After admission: open a blocked account and arrange health insurance',
      'Book and attend your national visa appointment',
    ],
    costGuidance:
      'Even where tuition is free, you must budget for the semester contribution and living costs. Proof of funds for the visa is usually shown through a blocked account (Sperrkonto); the required amount is set by the German authorities and is updated periodically.',
    scholarshipGuidance:
      'The DAAD offers scholarships for international students, alongside foundation scholarships (Stiftungen) and university awards. Many are aimed at master’s and doctoral students and have early deadlines.',
    visaOverview:
      'Indian students apply for a national (D) visa for study through the German missions in India. Indian applicants must obtain an APS certificate (Akademische Prüfstelle) verifying their academic documents before applying. You will also need admission, proof of funds and health insurance.',
    workRules:
      'International students can work within an annual limit on working days, and student assistant jobs at universities may be treated differently. Check the latest rules on Make it in Germany.',
    postStudy:
      'Graduates can apply for a residence permit of up to 18 months to look for work related to their qualification, and may then move to a work-based residence permit.',
    cities: ['Munich', 'Berlin', 'Aachen', 'Hamburg', 'Frankfurt', 'Stuttgart', 'Karlsruhe', 'Dresden'],
    selectionTips: [
      'Check the language of instruction and any German requirement for internships',
      'Confirm whether your state charges non-EU tuition',
      'Plan your APS appointment and blocked account early',
    ],
    faqs: [
      { q: 'Is studying in Germany really free?', a: 'Most public universities charge no or low tuition, but students pay a semester contribution and must cover living costs. Some states charge tuition to non-EU students, and private universities charge full fees.' },
      { q: 'Do I need to know German?', a: 'Not for many English-taught master’s programmes, but German is very helpful for part-time jobs, internships and life after study.' },
      { q: 'What is the APS certificate?', a: 'It is a verification of academic documents issued by the Academic Evaluation Centre (APS) at the German Embassy in New Delhi, required for Indian students applying for a German student visa.' },
    ],
    sources: [
      { label: 'DAAD — Study in Germany', url: 'https://www.daad.de/en/' },
      { label: 'Make it in Germany (Federal Government)', url: 'https://www.make-it-in-germany.com/en/' },
      { label: 'APS India', url: 'https://www.aps-india.de' },
      { label: 'German Missions in India', url: 'https://india.diplo.de' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'ireland',
    code: 'IE',
    name: 'Ireland',
    inName: 'Ireland',
    seoTitle: 'Study in Ireland: Universities, Visa & Intakes | Mantra',
    metaDescription:
      'Plan your studies in Ireland: one-year master’s, September intake, study visa and Stamp 2, part-time work and the Third Level Graduate Programme.',
    overview: [
      'Ireland is an English-speaking country with a compact higher-education system and many one-year taught master’s programmes. Dublin hosts the European offices of many technology, pharmaceutical and finance companies, which is one reason the country is popular for postgraduate study.',
      'Living costs — particularly accommodation in Dublin — are a significant part of the budget, so it is worth comparing cities and arranging housing early.',
    ],
    whyConsider: [
      'One-year taught master’s degrees in many subjects',
      'English-speaking environment within the EU',
      'Part-time work allowed for eligible students',
      'A graduate permission (Stamp 1G) for eligible graduates',
    ],
    popularFields: ['Computer science and data analytics', 'Business and finance', 'Pharmaceutical and biomedical sciences', 'Engineering', 'Marketing'],
    qualifications: ['Bachelor’s (Level 8, usually 3–4 years)', 'Postgraduate diploma', 'Taught master’s (Level 9, often 1 year)', 'PhD (Level 10)'],
    entryRequirements:
      'Universities set their own academic requirements. Postgraduate programmes usually ask for a relevant bachelor’s degree with a minimum classification; some business programmes value work experience.',
    englishRequirements:
      'IELTS Academic and other recognised tests are accepted. Universities publish the minimum scores for each programme.',
    intakes: 'September is the main intake. A smaller number of programmes start in January.',
    timeline: [
      '10–12 months before: shortlist programmes',
      '6–9 months before: apply (some programmes use rolling admission)',
      'After an offer: pay the deposit and arrange accommodation',
      'Apply for the study visa with proof of funds and fees',
      'After arrival: register with immigration and receive your residence permission',
    ],
    costGuidance:
      'Tuition for non-EU students varies by university and programme. Accommodation in Dublin is expensive and in high demand. Immigration rules require you to show access to a set amount of funds — check the current figure with Irish Immigration Service Delivery.',
    scholarshipGuidance:
      'Funding includes the Government of Ireland International Education Scholarships and university awards such as merit-based fee reductions for international students.',
    visaOverview:
      'Indian nationals need a study visa (long stay D) to study in Ireland for more than three months. After arrival you register your permission (Stamp 2) with immigration. You must show acceptance on an eligible programme, payment of fees and access to funds.',
    workRules:
      'Students with Stamp 2 permission on eligible full-time programmes may work part-time during term and full-time during set holiday periods. Check the conditions on the Irish Immigration website.',
    postStudy:
      'The Third Level Graduate Programme (Stamp 1G) allows eligible graduates to remain in Ireland to look for work. The length depends on the level of your qualification.',
    cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Maynooth'],
    selectionTips: [
      'Arrange accommodation as early as possible',
      'Check that your programme is on the Interim List of Eligible Programmes (ILEP)',
      'Compare one-year master’s content carefully, as there is little room for electives',
    ],
    faqs: [
      { q: 'Is a one-year master’s in Ireland enough to apply for jobs?', a: 'Many graduates apply for roles after a one-year master’s. Outcomes depend on your field, experience and the job market; no programme guarantees employment.' },
      { q: 'What is Stamp 2?', a: 'Stamp 2 is the immigration permission given to non-EU students on eligible full-time programmes.' },
      { q: 'Is Dublin the only option?', a: 'No. Cork, Galway and Limerick have well-regarded universities and are often less expensive to live in.' },
    ],
    sources: [
      { label: 'Irish Immigration Service Delivery', url: 'https://www.irishimmigration.ie' },
      { label: 'Education in Ireland', url: 'https://www.educationinireland.com' },
      { label: 'Higher Education Authority — Government of Ireland Scholarships', url: 'https://hea.ie' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'france',
    code: 'FR',
    name: 'France',
    inName: 'France',
    seoTitle: 'Study in France: Universities, Campus France & Visa | Mantra',
    metaDescription:
      'Plan your studies in France: public universities and grandes écoles, English-taught programmes, Campus France, the VLS-TS visa and work rights.',
    overview: [
      'France offers public universities with regulated fees as well as grandes écoles — selective engineering and business schools that set their own fees. A growing number of master’s and MBA programmes are taught entirely in English.',
      'Indian students apply through the Campus France “Études en France” procedure, which brings the academic application and visa process together.',
    ],
    whyConsider: [
      'Public universities with regulated tuition',
      'Internationally known business and engineering schools',
      'English-taught master’s and MBA options',
      'Part-time work allowance for students',
    ],
    popularFields: ['Business and management', 'Luxury and fashion management', 'Engineering', 'Hospitality and culinary arts', 'Data science', 'Aerospace'],
    qualifications: ['Licence (bachelor’s, 3 years)', 'Master (2 years)', 'Programme Grande École', 'MBA and MSc programmes at business schools', 'Doctorate'],
    entryRequirements:
      'Requirements depend on the institution. Business schools often consider academic results, interviews and sometimes GMAT/GRE; public universities assess academic fit with the programme.',
    englishRequirements:
      'English-taught programmes usually accept IELTS or TOEFL. French-taught programmes require a French test such as DELF/DALF or TCF.',
    intakes: 'September is the main intake. Some business schools also run January intakes.',
    timeline: [
      '10–12 months before: shortlist programmes and create your Campus France account',
      '6–9 months before: apply to institutions (via Études en France where applicable)',
      'Attend the Campus France interview',
      'After acceptance: apply for the long-stay student visa (VLS-TS)',
      'After arrival: validate your VLS-TS online',
    ],
    costGuidance:
      'Fees at public universities are set nationally, while business and engineering schools set their own fees. Paris is considerably more expensive to live in than most other cities.',
    scholarshipGuidance:
      'The French Embassy in India and Campus France promote scholarship programmes for Indian students, and many schools offer merit scholarships.',
    visaOverview:
      'Students typically apply for the long-stay student visa equivalent to a residence permit (VLS-TS) after completing the Campus France procedure. Applications are submitted through France-Visas.',
    workRules:
      'Students holding a valid student residence permit may work part-time up to an annual hour limit (around 60% of normal full-time working hours). Check the current rule on official French sites.',
    postStudy:
      'Graduates of eligible master’s-level programmes can apply for a temporary residence permit to look for work or start a business. Conditions are set by French authorities.',
    cities: ['Paris', 'Lyon', 'Toulouse', 'Lille', 'Grenoble', 'Nice'],
    selectionTips: [
      'Check whether a programme is state-recognised (for example, a diplôme visé or grade de master)',
      'Learn basic French even for English-taught programmes',
      'Compare business-school fees and scholarship availability carefully',
    ],
    faqs: [
      { q: 'Can I study in France in English?', a: 'Yes. Many master’s, MSc and MBA programmes are fully taught in English.' },
      { q: 'What is Campus France?', a: 'Campus France is the French agency that promotes higher education and manages the application procedure for students from India.' },
      { q: 'Are French public universities free?', a: 'They are not free for non-EU students, but fees are regulated and generally lower than at private schools.' },
    ],
    sources: [
      { label: 'Campus France India', url: 'https://www.inde.campusfrance.org' },
      { label: 'France-Visas', url: 'https://france-visas.gouv.fr' },
      { label: 'Campus France', url: 'https://www.campusfrance.org/en' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'new-zealand',
    code: 'NZ',
    name: 'New Zealand',
    inName: 'New Zealand',
    seoTitle: 'Study in New Zealand: Universities, Visa & Intakes | Mantra',
    metaDescription:
      'Plan your studies in New Zealand: eight universities, February and July intakes, student visa basics, part-time work and post-study work options.',
    overview: [
      'New Zealand has eight universities, all of which appear in major international rankings, plus institutes of technology and polytechnics. Class sizes are often smaller than in larger destinations, and the country has a reputation for a safe, welcoming environment.',
      'Programmes are practical and research-led, and many postgraduate options can be completed in one to two years.',
    ],
    whyConsider: [
      'All eight universities are internationally ranked',
      'Smaller class sizes and supportive campuses',
      'Part-time work options for eligible students',
      'A post-study work visa for eligible graduates',
    ],
    popularFields: ['Information technology', 'Engineering', 'Agriculture and environmental science', 'Business', 'Hospitality and tourism', 'Health sciences'],
    qualifications: ['Bachelor’s (usually 3 years)', 'Postgraduate diploma and certificate', 'Master’s (1–2 years)', 'PhD'],
    entryRequirements:
      'Universities assess your previous study against programme requirements. For postgraduate programmes, a relevant bachelor’s degree with a set grade average is usually required.',
    englishRequirements:
      'IELTS Academic, TOEFL iBT, PTE Academic and other tests are accepted by most institutions; programmes set minimum scores.',
    intakes: 'The main intakes are February (Semester 1) and July (Semester 2). Some programmes have additional start dates.',
    timeline: [
      '10–12 months before: shortlist programmes',
      '6–9 months before: apply',
      'After an offer: pay fees or deposit as required',
      'Apply for the student visa through Immigration New Zealand',
      'Arrange insurance and accommodation',
    ],
    costGuidance:
      'Tuition varies by institution and programme. Auckland is typically the most expensive city. Immigration New Zealand sets the minimum funds you must show for living costs.',
    scholarshipGuidance:
      'Universities offer international student scholarships, and the New Zealand Government has offered some scholarship schemes for Indian students. Check eligibility for each cycle.',
    visaOverview:
      'You need a student visa to study full-time. You will need an offer of place from an approved education provider, evidence of tuition payment, proof of funds and health requirements as applicable.',
    workRules:
      'Some students can work part-time during term and full-time in scheduled holidays, depending on their programme and visa conditions. Check your visa conditions with Immigration New Zealand.',
    postStudy:
      'The Post Study Work Visa allows eligible graduates to work in New Zealand. Eligibility and length depend on your qualification and where you studied.',
    cities: ['Auckland', 'Wellington', 'Christchurch', 'Dunedin', 'Hamilton'],
    selectionTips: [
      'Check whether your qualification is eligible for the post-study work visa',
      'Compare costs between Auckland and other cities',
      'Look at industry links and placements within the programme',
    ],
    faqs: [
      { q: 'How many universities are there in New Zealand?', a: 'There are eight universities, along with institutes of technology, polytechnics and private training establishments.' },
      { q: 'Can I work while studying in New Zealand?', a: 'Many students can work part-time during term, depending on their visa conditions.' },
      { q: 'Which intake should I choose?', a: 'February offers the widest choice; July is a good alternative for many programmes.' },
    ],
    sources: [
      { label: 'Immigration New Zealand', url: 'https://www.immigration.govt.nz' },
      { label: 'Study with New Zealand (Education New Zealand)', url: 'https://www.studywithnewzealand.govt.nz' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'netherlands',
    code: 'NL',
    name: 'Netherlands',
    inName: 'the Netherlands',
    seoTitle: 'Study in the Netherlands: Universities & Intakes | Mantra',
    metaDescription:
      'Plan your studies in the Netherlands: research vs applied sciences universities, Studielink, residence permits and the orientation year.',
    overview: [
      'The Netherlands offers one of the largest selections of English-taught degree programmes in continental Europe. Higher education is split between research universities, which focus on academic and research-oriented programmes, and universities of applied sciences, which focus on professional practice.',
      'Most applications are made through the national Studielink portal, and the university usually applies for your residence permit on your behalf.',
    ],
    whyConsider: [
      'Many English-taught bachelor’s and master’s programmes',
      'Choice between research-oriented and practice-oriented institutions',
      'University-led residence permit process',
      'An orientation year permit for eligible graduates',
    ],
    popularFields: ['Engineering and technology', 'Business and economics', 'Data science and AI', 'Logistics and supply chain', 'Design', 'Life sciences'],
    qualifications: ['Bachelor’s (3 years at research universities; 4 at universities of applied sciences)', 'Master’s (1–2 years)', 'PhD'],
    entryRequirements:
      'Research universities often require strong academic results and specific subjects. Some bachelor’s programmes are selective (numerus fixus) with early deadlines.',
    englishRequirements: 'IELTS Academic and TOEFL iBT are widely accepted; programmes set the minimum score.',
    intakes: 'September is the main intake. A limited number of programmes start in February.',
    timeline: [
      '12 months before: shortlist programmes and check selective deadlines',
      '6–10 months before: register on Studielink and apply',
      'After admission: provide documents for the university’s visa application',
      'The university applies for your MVV/residence permit with the IND',
      'Arrange accommodation early — housing is in short supply in many cities',
    ],
    costGuidance:
      'Non-EU students pay institutional tuition fees set by each university. Housing shortages in cities such as Amsterdam and Utrecht can make accommodation the hardest part of planning.',
    scholarshipGuidance:
      'Options include university excellence scholarships and programmes listed on Study in NL. Many are competitive and limited in number.',
    visaOverview:
      'Your university, as a recognised sponsor, normally applies to the Immigration and Naturalisation Service (IND) for your entry visa (MVV) and residence permit. You must show sufficient funds for the period of study.',
    workRules:
      'Non-EU students can work a limited number of hours during the academic year or full-time during summer months, and the employer usually needs a work permit for you. Check the IND for current rules.',
    postStudy:
      'The orientation year (zoekjaar hoogopgeleiden) residence permit lets eligible graduates stay to look for work or start a business.',
    cities: ['Amsterdam', 'Delft', 'Rotterdam', 'Eindhoven', 'Utrecht', 'Groningen', 'Leiden'],
    selectionTips: [
      'Decide between a research university and a university of applied sciences first',
      'Watch for early deadlines on selective programmes',
      'Start your housing search as soon as you accept an offer',
    ],
    faqs: [
      { q: 'What is the difference between a research university and a university of applied sciences?', a: 'Research universities focus on academic and research training; universities of applied sciences focus on professional, practice-oriented education.' },
      { q: 'Do I apply for the visa myself?', a: 'Usually your university applies to the IND on your behalf as a recognised sponsor.' },
      { q: 'Is accommodation difficult to find?', a: 'In several cities, yes. Start early and use university housing services where available.' },
    ],
    sources: [
      { label: 'Study in NL (Nuffic)', url: 'https://www.studyinnl.org' },
      { label: 'IND — Immigration and Naturalisation Service', url: 'https://ind.nl/en' },
      { label: 'Studielink', url: 'https://www.studielink.nl' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    slug: 'singapore',
    code: 'SG',
    name: 'Singapore',
    inName: 'Singapore',
    seoTitle: 'Study in Singapore: Universities, Student’s Pass & Costs | Mantra',
    metaDescription:
      'Plan your studies in Singapore: autonomous universities, private institutions, the Student’s Pass, tuition grant obligations and work passes.',
    overview: [
      'Singapore is a regional hub for business, finance and technology, and is close to India. Its autonomous universities are highly selective, and the city also hosts private institutions, some of which deliver degrees in partnership with overseas universities.',
      'Because it is a city-state, students experience a single, compact, English-speaking environment with strong public transport and safety.',
    ],
    whyConsider: [
      'Proximity to India and an English-speaking environment',
      'Highly ranked autonomous universities',
      'Strong links with business and technology industries',
      'Shorter travel times and costs compared with many Western destinations',
    ],
    popularFields: ['Computer science', 'Business and finance', 'Engineering', 'Data analytics', 'Hospitality'],
    qualifications: ['Bachelor’s (3–4 years)', 'Master’s (often 1–2 years)', 'PhD', 'Diplomas and degrees at private education institutions'],
    entryRequirements:
      'Autonomous universities are competitive and assess academic results closely; some programmes require interviews or tests. Private institutions have varied requirements — check that they are registered with the Committee for Private Education.',
    englishRequirements: 'IELTS or TOEFL is usually required if your previous education was not in English; requirements vary by institution.',
    intakes: 'Autonomous universities mainly admit in August. Private institutions often have several intakes a year.',
    timeline: [
      '10–12 months before: shortlist universities and check application windows',
      '6–9 months before: apply',
      'After an offer: register on the ICA’s system for the Student’s Pass',
      'Receive in-principle approval and complete formalities on arrival',
    ],
    costGuidance:
      'Fees vary by institution. Some autonomous university programmes offer a Ministry of Education tuition grant, which comes with an obligation to work in Singapore for a period after graduation — read the terms carefully.',
    scholarshipGuidance:
      'Universities offer merit scholarships, and the MOE Tuition Grant (with a service obligation) is available for eligible programmes.',
    visaOverview:
      'International full-time students need a Student’s Pass issued by the Immigration & Checkpoints Authority (ICA) after acceptance by an approved institution.',
    workRules:
      'Only students at approved institutions may work part-time during term, within limits, and full-time during vacations. Check the Ministry of Manpower rules.',
    postStudy:
      'Singapore does not have a dedicated post-study work visa. Graduates who want to work in Singapore need an employer-sponsored work pass such as an Employment Pass.',
    cities: ['Singapore'],
    selectionTips: [
      'Check whether a private institution is registered and how its degree is awarded',
      'Understand any tuition grant obligation before accepting it',
      'Compare cost of living — housing is a significant expense',
    ],
    faqs: [
      { q: 'Is there a post-study work visa in Singapore?', a: 'No. Graduates need to secure a job with an employer who applies for a work pass.' },
      { q: 'What is the MOE Tuition Grant?', a: 'A Ministry of Education subsidy for eligible programmes that requires recipients to work in Singapore for a set period after graduation.' },
      { q: 'Are private institutions in Singapore recognised?', a: 'Check that the institution is registered with the Committee for Private Education and confirm which university awards the degree.' },
    ],
    sources: [
      { label: 'ICA — Student’s Pass', url: 'https://www.ica.gov.sg/reside/STP' },
      { label: 'Ministry of Manpower', url: 'https://www.mom.gov.sg' },
      { label: 'Ministry of Education — Tuition Grant', url: 'https://www.moe.gov.sg' },
    ],
    lastReviewed: REVIEWED,
  },
];

export function getCountryGuide(slug: string) {
  return COUNTRY_GUIDES.find((guide) => guide.slug === slug) ?? null;
}
