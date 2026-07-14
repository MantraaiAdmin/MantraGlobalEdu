import { CourseSearchParams, CourseRepository } from './course.repository';

export class CourseService {
  constructor(private readonly repository = new CourseRepository()) {}

  async search(params: CourseSearchParams) {
    return this.repository.search(params);
  }

  async getBySlug(slug: string) {
    return this.repository.findBySlug(slug);
  }
}

export const courseService = new CourseService();
