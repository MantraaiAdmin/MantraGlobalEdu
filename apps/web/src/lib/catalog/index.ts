import catalogData from '@/data/catalog.json';
import { calculatePagination } from '@mge/utils';
import type { PaginationParams } from '@mge/types';

export type CatalogCountry = (typeof catalogData.countries)[number];
export type CatalogUniversity = (typeof catalogData.universities)[number];
export type CatalogCourse = (typeof catalogData.courses)[number];
export type CatalogScholarship = (typeof catalogData.scholarships)[number];

const { countries, universities, courses, scholarships } = catalogData;

export function getCatalogCountries(params: PaginationParams = {}) {
  const meta = calculatePagination(countries.length, params);
  const { skip, take } = getSlice(params);
  return { data: countries.slice(skip, skip + take), meta };
}

export function getCatalogCountryByCode(code: string) {
  const country = countries.find((item) => item.code.toUpperCase() === code.toUpperCase());
  if (!country) return null;

  const countryUniversities = universities
    .filter((university) => university.countryId === country.id)
    .sort((a, b) => (a.worldRanking ?? 999) - (b.worldRanking ?? 999))
    .slice(0, 10);

  return { ...country, universities: countryUniversities };
}

export function getCatalogUniversities(params: {
  page?: number;
  limit?: number;
  countryId?: string;
  search?: string;
  tuitionMin?: number;
  tuitionMax?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}) {
  let filtered = [...universities];

  if (params.countryId) {
    filtered = filtered.filter((university) => university.countryId === params.countryId);
  }

  if (params.search) {
    const search = params.search.trim().toLowerCase();
    filtered = filtered.filter(
      (university) =>
        university.name.toLowerCase().includes(search) ||
        university.slug.includes(search) ||
        (university.description?.toLowerCase().includes(search) ?? false)
    );
  }

  if (params.tuitionMin !== undefined) {
    filtered = filtered.filter((university) => (university.tuitionMin ?? 0) >= params.tuitionMin!);
  }

  if (params.tuitionMax !== undefined) {
    filtered = filtered.filter((university) => (university.tuitionMax ?? 0) <= params.tuitionMax!);
  }

  filtered.sort((a, b) => {
    const order = params.sortOrder === 'desc' ? -1 : 1;
    if (params.sortBy === 'name') return a.name.localeCompare(b.name) * order;
    if (params.sortBy === 'tuitionMin') {
      return ((a.tuitionMin ?? 0) - (b.tuitionMin ?? 0)) * order;
    }
    return ((a.worldRanking ?? 999) - (b.worldRanking ?? 999)) * order;
  });

  const meta = calculatePagination(filtered.length, params);
  const { skip, take } = getSlice(params);
  return { data: filtered.slice(skip, skip + take), meta };
}

export function getCatalogUniversityBySlug(slug: string) {
  const university = universities.find((item) => item.slug === slug);
  if (!university) return null;

  const universityCourses = courses.filter((course) => course.universityId === university.id).slice(0, 10);
  const universityScholarships = scholarships
    .filter((scholarship) => scholarship.universityId === university.id)
    .slice(0, 5);

  return {
    ...university,
    courses: universityCourses,
    scholarships: universityScholarships,
  };
}

export function getCatalogCourses(params: {
  page?: number;
  limit?: number;
  query?: string;
  countryId?: string;
  universityId?: string;
  degreeLevel?: string;
  tuitionMin?: number;
  tuitionMax?: number;
  intake?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}) {
  let filtered = [...courses];

  if (params.universityId) {
    filtered = filtered.filter((course) => course.universityId === params.universityId);
  }

  if (params.countryId) {
    filtered = filtered.filter((course) => course.university.countryId === params.countryId);
  }

  if (params.degreeLevel) {
    filtered = filtered.filter((course) => course.degreeLevel === params.degreeLevel);
  }

  if (params.query) {
    const query = params.query.trim().toLowerCase();
    filtered = filtered.filter(
      (course) =>
        course.name.toLowerCase().includes(query) ||
        (course.description?.toLowerCase().includes(query) ?? false)
    );
  }

  if (params.tuitionMin !== undefined) {
    filtered = filtered.filter((course) => course.tuition >= params.tuitionMin!);
  }

  if (params.tuitionMax !== undefined) {
    filtered = filtered.filter((course) => course.tuition <= params.tuitionMax!);
  }

  if (params.intake) {
    filtered = filtered.filter((course) => course.intakePeriods.includes(params.intake!));
  }

  filtered.sort((a, b) => {
    const order = params.sortOrder === 'desc' ? -1 : 1;
    if (params.sortBy === 'tuition') return (a.tuition - b.tuition) * order;
    if (params.sortBy === 'name') return a.name.localeCompare(b.name) * order;
    return a.name.localeCompare(b.name) * order;
  });

  const meta = calculatePagination(filtered.length, params);
  const { skip, take } = getSlice(params);
  return { data: filtered.slice(skip, skip + take), meta };
}

export function getCatalogCourseBySlug(slug: string) {
  const course = courses.find((item) => item.slug === slug);
  if (!course) return null;

  const courseScholarships = scholarships.filter((scholarship) => scholarship.courseId === course.id);
  return { ...course, scholarships: courseScholarships };
}

export function getCatalogScholarships(params: {
  page?: number;
  limit?: number;
  countryId?: string;
  universityId?: string;
  courseId?: string;
  budget?: number;
} = {}) {
  let filtered = [...scholarships];

  if (params.countryId) {
    filtered = filtered.filter((scholarship) => scholarship.countryId === params.countryId);
  }

  if (params.universityId) {
    filtered = filtered.filter((scholarship) => scholarship.universityId === params.universityId);
  }

  if (params.courseId) {
    filtered = filtered.filter((scholarship) => scholarship.courseId === params.courseId);
  }

  if (params.budget !== undefined) {
    filtered = filtered.filter((scholarship) => scholarship.awardAmount <= params.budget!);
  }

  const meta = calculatePagination(filtered.length, params);
  const { skip, take } = getSlice(params);
  return { data: filtered.slice(skip, skip + take), meta };
}

export function getCatalogScholarshipById(id: string) {
  return scholarships.find((scholarship) => scholarship.id === id) ?? null;
}

export function getUniversityCountByCountryCode(code: string): number {
  const country = countries.find((item) => item.code === code);
  if (!country) return 0;
  return universities.filter((university) => university.countryId === country.id).length;
}

function getSlice(params: PaginationParams) {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? 20));
  return { skip: (page - 1) * limit, take: limit };
}
