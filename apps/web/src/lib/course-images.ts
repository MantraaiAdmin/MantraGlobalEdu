export const COURSE_FINDER_IMAGES = {
  hero: {
    src: '/images/hero-campus-group.jpg',
    alt: 'Students walking through a university campus on their study abroad journey',
  },
  empty: {
    src: '/images/campus-students-group.jpg',
    alt: 'Group of students walking together on campus',
  },
} as const;

const DEGREE_IMAGES: Record<string, string> = {
  BACHELORS: '/images/campus-walking-usa.jpg',
  MASTERS: '/images/hero-campus-walking.jpg',
  PHD: '/images/campus-walking-uk.jpg',
  DIPLOMA: '/images/campus-walking-path.jpg',
  CERTIFICATE: '/images/campus-students-group.jpg',
};

const COUNTRY_IMAGES: Record<string, string> = {
  US: '/images/campus-walking-usa.jpg',
  GB: '/images/campus-walking-uk.jpg',
  AU: '/images/hero-campus-group.jpg',
};

export function getCourseCardImage(degreeLevel: string, countryCode?: string | null): string {
  if (countryCode && COUNTRY_IMAGES[countryCode]) {
    return COUNTRY_IMAGES[countryCode];
  }
  return DEGREE_IMAGES[degreeLevel] || DEGREE_IMAGES.MASTERS;
}
