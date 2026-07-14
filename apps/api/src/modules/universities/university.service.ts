import { UniversitySearchParams, UniversityRepository } from './university.repository';

export class UniversityService {
  constructor(private readonly repository = new UniversityRepository()) {}

  async getAll(params: UniversitySearchParams) {
    return this.repository.findMany(params);
  }

  async getBySlug(slug: string) {
    return this.repository.findBySlug(slug);
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }
}

export const universityService = new UniversityService();
