import { Router } from 'express';
import { publicController } from './public.controller';

const router = Router();

router.post('/contact', ...publicController.submitContact);
router.post('/counseling', ...publicController.bookCounseling);
router.post('/cost-estimate', ...publicController.estimateCost);
router.get('/articles', publicController.getArticles);
router.get('/articles/:slug', publicController.getArticleBySlug);

export default router;
