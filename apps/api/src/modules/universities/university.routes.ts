import { Router } from 'express';
import { universityController } from './university.controller';

const router = Router();

router.get('/', ...universityController.list);
router.get('/slug/:slug', ...universityController.getBySlug);
router.get('/:id', ...universityController.getById);

export default router;
