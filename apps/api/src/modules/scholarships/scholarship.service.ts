import { ScholarshipSearchParams, ScholarshipRepository } from './scholarship.repository';

export class ScholarshipService {
  constructor(private readonly repository = new ScholarshipRepository()) {}

  async search(params: ScholarshipSearchParams) {
    return this.repository.search(params);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }
}

export const scholarshipService = new ScholarshipService();
