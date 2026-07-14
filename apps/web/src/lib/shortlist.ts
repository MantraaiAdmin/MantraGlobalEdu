const UNIVERSITY_KEY = 'gem_shortlist_universities';
const COURSE_KEY = 'gem_shortlist_courses';

export interface ShortlistUniversity {
  id: string;
  slug: string;
  name: string;
  country?: string;
  flag?: string;
}

export interface ShortlistCourse {
  id: string;
  slug: string;
  name: string;
  universityName?: string;
  degreeLevel?: string;
  tuition?: number;
  currency?: string;
}

function read<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') as T[];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new Event('gem-shortlist-change'));
}

export function getUniversityShortlist(): ShortlistUniversity[] {
  return read<ShortlistUniversity>(UNIVERSITY_KEY);
}

export function toggleUniversityShortlist(item: ShortlistUniversity): boolean {
  const list = getUniversityShortlist();
  const exists = list.some((u) => u.id === item.id);
  if (exists) {
    write(UNIVERSITY_KEY, list.filter((u) => u.id !== item.id));
    return false;
  }
  write(UNIVERSITY_KEY, [...list, item]);
  return true;
}

export function isUniversityShortlisted(id: string): boolean {
  return getUniversityShortlist().some((u) => u.id === id);
}

export function getCourseShortlist(): ShortlistCourse[] {
  return read<ShortlistCourse>(COURSE_KEY);
}

export function toggleCourseShortlist(item: ShortlistCourse): boolean {
  const list = getCourseShortlist();
  const exists = list.some((c) => c.id === item.id);
  if (exists) {
    write(COURSE_KEY, list.filter((c) => c.id !== item.id));
    return false;
  }
  if (list.length >= 3) {
    write(COURSE_KEY, [...list.slice(1), item]);
    return true;
  }
  write(COURSE_KEY, [...list, item]);
  return true;
}

export function isCourseShortlisted(id: string): boolean {
  return getCourseShortlist().some((c) => c.id === id);
}

export function removeFromShortlist(type: 'university' | 'course', id: string) {
  if (type === 'university') {
    write(UNIVERSITY_KEY, getUniversityShortlist().filter((u) => u.id !== id));
  } else {
    write(COURSE_KEY, getCourseShortlist().filter((c) => c.id !== id));
  }
}

export function getShortlistCount(): number {
  return getUniversityShortlist().length + getCourseShortlist().length;
}
