import { Prisma, DegreeLevel, IntakePeriod } from '@prisma/client';
import { NotFoundError } from '@mge/shared';
import { PaginationParams } from '@mge/types';
import { calculatePagination } from '@mge/utils';
import { prisma } from '../../database/prisma';
import { buildPaginationQuery } from '../../shared/utils/pagination';

export interface CourseSearchParams extends PaginationParams {
  query?: string;
  countryId?: string;
  universityId?: string;
  degreeLevel?: DegreeLevel;
  tuitionMin?: number;
  tuitionMax?: number;
  intake?: IntakePeriod;
}

export class CourseRepository {
  async search(params: CourseSearchParams) {
    const { skip, take, orderBy } = buildPaginationQuery(params);
    const where: Prisma.CourseWhereInput = { isActive: true };

    if (params.query) {
      where.OR = [
        { name: { contains: params.query, mode: 'insensitive' } },
        { description: { contains: params.query, mode: 'insensitive' } },
      ];
    }
    if (params.universityId) where.universityId = params.universityId;
    if (params.degreeLevel) where.degreeLevel = params.degreeLevel;
    if (params.tuitionMin || params.tuitionMax) {
      where.tuition = {};
      if (params.tuitionMin) where.tuition.gte = params.tuitionMin;
      if (params.tuitionMax) where.tuition.lte = params.tuitionMax;
    }
    if (params.intake) where.intakePeriods = { has: params.intake };
    if (params.countryId) {
      where.university = { countryId: params.countryId };
    }

    const [data, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          university: { include: { country: true } },
          scholarships: { where: { isActive: true }, take: 1 },
        },
      }),
      prisma.course.count({ where }),
    ]);

    return { data, meta: calculatePagination(total, params) };
  }

  async findBySlug(slug: string) {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        university: { include: { country: true } },
        scholarships: { where: { isActive: true } },
      },
    });
    if (!course) throw new NotFoundError('Course');
    return course;
  }
}
