import { Response, NextFunction, Request } from 'express';
import { scholarshipSearchSchema } from '@mge/shared';
import { validateQuery } from '../../middlewares/validate.middleware';
import { sendSuccess } from '../../shared/utils/response';
import { scholarshipService } from './scholarship.service';

export class ScholarshipController {
  search = [
    validateQuery(scholarshipSearchSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await scholarshipService.search(req.query as never);
        sendSuccess(res, result);
      } catch (error) {
        next(error);
      }
    },
  ];

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scholarship = await scholarshipService.findById(String(req.params.id));
      sendSuccess(res, scholarship);
    } catch (error) {
      next(error);
    }
  };
}

export const scholarshipController = new ScholarshipController();
