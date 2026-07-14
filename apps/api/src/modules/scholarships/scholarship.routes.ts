import { Router } from 'express';
import { scholarshipController } from './scholarship.controller';

const router = Router();

router.get('/', ...scholarshipController.search);
router.get('/:id', scholarshipController.findById);

export default router;
