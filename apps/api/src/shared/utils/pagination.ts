import { Prisma } from '@prisma/client';
import { PaginationParams } from '@mge/types';
import { getSkipTake } from '@mge/utils';

export interface FindManyOptions {
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
  include?: Prisma.UserInclude;
}

export function buildPaginationQuery(params: PaginationParams) {
  const { skip, take } = getSkipTake(params);
  const orderBy = params.sortBy
    ? { [params.sortBy]: params.sortOrder || 'desc' }
    : { createdAt: 'desc' as const };
  return { skip, take, orderBy };
}
