import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { COUNTRY_DATA, UNIVERSITIES } from '../database/seed/destinations-data';

type CatalogCountry = {
  id: string;
  code: string;
  name: string;
  flag: string;
  description: string;
  tuitionRange: string;
  livingCost: string;
  visaRequirements: string;
  intakePeriods: string[];
  graduateOpportunities: string;
};

const countries: CatalogCountry[] = COUNTRY_DATA.map((country) => ({
  id: `country-${country.code.toLowerCase()}`,
  code: country.code,
  name: country.name,
  flag: country.flag,
  description: country.description,
  tuitionRange: country.tuitionRange,
  livingCost: country.livingCost,
  visaRequirements: country.visaRequirements,
  intakePeriods: country.intakePeriods.map(String),
  graduateOpportunities: country.graduateOpportunities,
}));

const countryByCode = Object.fromEntries(countries.map((country) => [country.code, country]));

const universities = UNIVERSITIES.map((university) => {
  const country = countryByCode[university.countryCode];
  return {
    id: `uni-${university.slug}`,
    name: university.name,
    slug: university.slug,
    countryId: country.id,
    logo: null,
    campusImage: null,
    worldRanking: university.worldRanking,
    tuitionMin: university.tuitionMin,
    tuitionMax: university.tuitionMax,
    acceptanceRate: university.acceptanceRate,
    description: university.description,
    website: university.website,
    popularPrograms: university.popularPrograms,
    country,
  };
});

const universityBySlug = Object.fromEntries(universities.map((university) => [university.slug, university]));

const courses = UNIVERSITIES.flatMap((university) => {
  const uni = universityBySlug[university.slug];
  return university.courses.map((course) => ({
    id: `course-${course.slug}`,
    name: course.name,
    slug: course.slug,
    universityId: uni.id,
    degreeLevel: String(course.degreeLevel),
    duration: course.duration,
    tuition: course.tuition,
    currency: course.currency,
    intakePeriods: course.intakePeriods.map(String),
    eligibility: course.eligibility,
    description: course.description,
    university: uni,
    scholarships: university.scholarships
      .filter((scholarship) => !scholarship.courseSlug || scholarship.courseSlug === course.slug)
      .map((scholarship) => ({
        id: scholarship.id,
        name: scholarship.name,
        awardAmount: scholarship.awardAmount,
        currency: scholarship.currency,
      })),
  }));
});

const scholarships = UNIVERSITIES.flatMap((university) => {
  const uni = universityBySlug[university.slug];
  return university.scholarships.map((scholarship) => ({
    id: scholarship.id,
    name: scholarship.name,
    awardAmount: scholarship.awardAmount,
    currency: scholarship.currency,
    deadline: scholarship.deadline,
    eligibility: scholarship.eligibility,
    requirements: scholarship.requirements,
    universityId: uni.id,
    countryId: uni.countryId,
    courseId: scholarship.courseSlug ? `course-${scholarship.courseSlug}` : null,
    university: uni,
    country: uni.country,
    course: scholarship.courseSlug
      ? courses.find((course) => course.slug === scholarship.courseSlug) ?? null
      : null,
  }));
});

const catalog = {
  generatedAt: new Date().toISOString(),
  countries,
  universities,
  courses,
  scholarships,
};

const outputPath = join(__dirname, '../apps/web/src/data/catalog.json');
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Wrote catalog with ${countries.length} countries, ${universities.length} universities, ${courses.length} courses to ${outputPath}`);
