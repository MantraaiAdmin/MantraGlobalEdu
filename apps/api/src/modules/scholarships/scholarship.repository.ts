import { Prisma } from '@prisma/client';
import { NotFoundError } from '@mge/shared';
import { PaginationParams } from '@mge/types';
import { calculatePagination } from '@mge/utils';
import { prisma } from '../../database/prisma';
import { buildPaginationQuery } from '../../shared/utils/pagination';

export interface ScholarshipSearchParams extends PaginationParams {
  countryId?: string;
  universityId?: string;
  courseId?: string;
  academicScore?: number;
  budget?: number;
}

export class ScholarshipRepository {
  async search(params: ScholarshipSearchParams) {
    const { skip, take, orderBy } = buildPaginationQuery(params);
    const where: Prisma.ScholarshipWhereInput = { isActive: true };

    if (params.countryId) where.countryId = params.countryId;
    if (params.universityId) where.universityId = params.universityId;
    if (params.courseId) where.courseId = params.courseId;
    if (params.budget) where.awardAmount = { lte: params.budget };

    const [data, total] = await Promise.all([
      prisma.scholarship.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          university: true,
          country: true,
          course: true,
        },
      }),
      prisma.scholarship.count({ where }),
    ]);

    return { data, meta: calculatePagination(total, params) };
  }

  async findById(id: string) {
    const scholarship = await prisma.scholarship.findFirst({
      where: { id, isActive: true },
      include: {
        university: { include: { country: true } },
        country: true,
        course: true,
      },
    });
    if (!scholarship) throw new NotFoundError('Scholarship');
    return scholarship;
  }
}
