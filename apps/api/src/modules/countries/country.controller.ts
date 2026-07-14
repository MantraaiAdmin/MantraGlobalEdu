import { Response, NextFunction, Request } from 'express';
import { paginationSchema } from '@mge/shared';
import { validateQuery, validateParams } from '../../middlewares/validate.middleware';
import { sendSuccess } from '../../shared/utils/response';
import { countryService } from './country.service';
import { z } from 'zod';

const codeSchema = z.object({ code: z.string() });

export class CountryController {
  list = [
    validateQuery(paginationSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await countryService.getAll(req.query as never);
        sendSuccess(res, result);
      } catch (error) {
        next(error);
      }
    },
  ];

  getByCode = [
    validateParams(codeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const country = await countryService.getByCode(req.params.code as string);
        sendSuccess(res, country);
      } catch (error) {
        next(error);
      }
    },
  ];
}

export const countryController = new CountryController();
