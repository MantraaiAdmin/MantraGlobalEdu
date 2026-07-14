import { PaginationParams } from '@mge/types';
import { CountryRepository } from './country.repository';

export class CountryService {
  constructor(private readonly repository = new CountryRepository()) {}

  async getAll(params: PaginationParams) {
    return this.repository.findMany(params);
  }

  async getByCode(code: string) {
    return this.repository.findByCode(code);
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }
}

export const countryService = new CountryService();
