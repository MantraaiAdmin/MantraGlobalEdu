import { Router } from 'express';
import { courseController } from './course.controller';

const router = Router();

router.get('/', ...courseController.search);
router.get('/:slug', ...courseController.getBySlug);

export default router;
