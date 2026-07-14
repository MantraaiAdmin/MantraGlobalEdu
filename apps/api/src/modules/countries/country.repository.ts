import { Prisma } from '@prisma/client';
import { NotFoundError } from '@mge/shared';
import { PaginationParams } from '@mge/types';
import { calculatePagination } from '@mge/utils';
import { prisma } from '../../database/prisma';
import { buildPaginationQuery } from '../../shared/utils/pagination';

export class CountryRepository {
  async findMany(params: PaginationParams) {
    const { skip, take, orderBy } = buildPaginationQuery(params);
    const where: Prisma.CountryWhereInput = { isActive: true };

    const [data, total] = await Promise.all([
      prisma.country.findMany({ where, skip, take, orderBy }),
      prisma.country.count({ where }),
    ]);

    return { data, meta: calculatePagination(total, params) };
  }

  async findByCode(code: string) {
    const country = await prisma.country.findUnique({
      where: { code },
      include: {
        universities: { where: { isActive: true }, take: 10, orderBy: { worldRanking: 'asc' } },
      },
    });
    if (!country) throw new NotFoundError('Country');
    return country;
  }

  async findById(id: string) {
    const country = await prisma.country.findUnique({ where: { id } });
    if (!country) throw new NotFoundError('Country');
    return country;
  }
}
