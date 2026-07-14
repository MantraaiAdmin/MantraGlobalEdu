import { Response, NextFunction, Request } from 'express';
import { courseSearchSchema } from '@mge/shared';
import { validateQuery, validateParams } from '../../middlewares/validate.middleware';
import { sendSuccess } from '../../shared/utils/response';
import { courseService } from './course.service';
import { z } from 'zod';

const slugSchema = z.object({ slug: z.string() });

export class CourseController {
  search = [
    validateQuery(courseSearchSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await courseService.search(req.query as never);
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
        const course = await courseService.getBySlug(req.params.slug as string);
        sendSuccess(res, course);
      } catch (error) {
        next(error);
      }
    },
  ];
}

export const courseController = new CourseController();
