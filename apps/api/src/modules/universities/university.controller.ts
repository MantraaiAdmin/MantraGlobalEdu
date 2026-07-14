import { Response, NextFunction } from 'express';
import { Request } from 'express';
import { paginationSchema } from '@mge/shared';
import { validateQuery, validateParams } from '../../middlewares/validate.middleware';
import { sendSuccess } from '../../shared/utils/response';
import { universityService } from './university.service';
import { z } from 'zod';

const slugSchema = z.object({ slug: z.string() });
const idSchema = z.object({ id: z.string().uuid() });

const listQuerySchema = paginationSchema.extend({
  countryId: z.string().uuid().optional(),
  search: z.string().optional(),
  tuitionMin: z.coerce.number().optional(),
  tuitionMax: z.coerce.number().optional(),
  sortBy: z.enum(['worldRanking', 'tuitionMin', 'name', 'createdAt']).optional(),
});

export class UniversityController {
  list = [
    validateQuery(listQuerySchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await universityService.getAll(req.query as never);
        sendSuccess(res, result);
      } catch (error) {
        next(error);
      }
    },
  ];

  getBySlug = [
    validateParams(slugSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const university = await universityService.getBySlug(req.params.slug as string);
        sendSuccess(res, university);
      } catch (error) {
        next(error);
      }
    },
  ];

  getById = [
    validateParams(idSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const university = await universityService.getById(req.params.id as string);
        sendSuccess(res, university);
      } catch (error) {
        next(error);
      }
    },
  ];
}

export const universityController = new UniversityController();
