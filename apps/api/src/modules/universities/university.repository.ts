import { Prisma } from '@prisma/client';
import { NotFoundError } from '@mge/shared';
import { PaginationParams } from '@mge/types';
import { calculatePagination } from '@mge/utils';
import { prisma } from '../../database/prisma';
import { buildPaginationQuery } from '../../shared/utils/pagination';

export interface UniversitySearchParams extends PaginationParams {
  countryId?: string;
  search?: string;
  tuitionMin?: number;
  tuitionMax?: number;
}

export class UniversityRepository {
  async findMany(params: UniversitySearchParams) {
    const { skip, take } = buildPaginationQuery(params);
    const where: Prisma.UniversityWhereInput = { isActive: true };

    if (params.countryId) where.countryId = params.countryId;
    if (params.search) {
      const search = params.search.trim();
      const searchLower = search.toLowerCase();
      const aliases: Record<string, string[]> = {
        mit: ['massachusetts institute of technology'],
        uoft: ['university of toronto'],
        oxford: ['university of oxford'],
      };
      const aliasMatches = aliases[searchLower] || [];

      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { slug: { contains: searchLower.replace(/\s+/g, '-'), mode: 'insensitive' } },
        ...aliasMatches.map((alias) => ({
          name: { contains: alias, mode: 'insensitive' as const },
        })),
      ];
    }
    if (params.tuitionMin !== undefined || params.tuitionMax !== undefined) {
      where.tuitionMin = {};
      if (params.tuitionMin !== undefined) where.tuitionMin.gte = params.tuitionMin;
      if (params.tuitionMax !== undefined) where.tuitionMax = { lte: params.tuitionMax };
    }

    const orderBy = params.sortBy === 'worldRanking'
      ? { worldRanking: params.sortOrder || 'asc' }
      : params.sortBy === 'tuitionMin'
        ? { tuitionMin: params.sortOrder || 'asc' }
        : params.sortBy === 'name'
          ? { name: params.sortOrder || 'asc' }
          : { worldRanking: 'asc' as const };

    const [data, total] = await Promise.all([
      prisma.university.findMany({
        where,
        skip,
        take,
        orderBy,
        include: { country: true },
      }),
      prisma.university.count({ where }),
    ]);

    return { data, meta: calculatePagination(total, params) };
  }

  async findBySlug(slug: string) {
    const university = await prisma.university.findUnique({
      where: { slug },
      include: {
        country: true,
        courses: { where: { isActive: true }, take: 10 },
        scholarships: { where: { isActive: true }, take: 5 },
      },
    });
    if (!university) throw new NotFoundError('University');
    return university;
  }

  async findById(id: string) {
    const university = await prisma.university.findUnique({
      where: { id },
      include: { country: true },
    });
    if (!university) throw new NotFoundError('University');
    return university;
  }
}
