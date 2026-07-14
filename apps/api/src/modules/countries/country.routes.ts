import { Router } from 'express';
import { countryController } from './country.controller';

const router = Router();

router.get('/', ...countryController.list);
router.get('/:code', ...countryController.getByCode);

export default router;
