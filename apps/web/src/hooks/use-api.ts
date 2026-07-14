'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchUniversities,
  fetchUniversityBySlug,
  fetchCountries,
  fetchCountryByCode,
  fetchCourses,
  fetchCourseBySlug,
  fetchScholarships,
  fetchScholarshipById,
  fetchArticles,
  type UniversityFilters,
  type CourseFilters,
  type ScholarshipFilters,
} from '@/services/api.service';

export function useUniversities(filters: UniversityFilters) {
  return useQuery({
    queryKey: ['universities', filters],
    queryFn: () => fetchUniversities(filters),
  });
}

export function useUniversity(slug: string) {
  return useQuery({
    queryKey: ['university', slug],
    queryFn: () => fetchUniversityBySlug(slug),
    enabled: !!slug,
  });
}

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(),
  });
}

export function useCountry(code: string) {
  return useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code),
    enabled: !!code,
  });
}

export function useCourses(filters: CourseFilters) {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => fetchCourses(filters),
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => fetchCourseBySlug(slug),
    enabled: !!slug,
  });
}

export function useScholarships(filters: ScholarshipFilters) {
  return useQuery({
    queryKey: ['scholarships', filters],
    queryFn: () => fetchScholarships(filters),
  });
}

export function useScholarship(id: string) {
  return useQuery({
    queryKey: ['scholarship', id],
    queryFn: () => fetchScholarshipById(id),
    enabled: !!id,
  });
}

export function useArticles(category?: string) {
  return useQuery({
    queryKey: ['articles', category],
    queryFn: () => fetchArticles(category),
  });
}
