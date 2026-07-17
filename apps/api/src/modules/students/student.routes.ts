import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { uploadMiddleware } from '../../middlewares/upload.middleware';
import { UserRole } from '@mge/types';
import { studentController } from './student.controller';

const router = Router();

router.use(authenticate, authorize(UserRole.STUDENT));

router.get('/dashboard', studentController.dashboard);
router.get('/applications', studentController.applications);
router.post('/applications', ...studentController.createApplication);
router.get('/documents/checklist', studentController.documentWorkspace);
router.get('/documents', studentController.documents);
router.post(
  '/documents/upload',
  (req, res, next) => {
    uploadMiddleware.single('file')(req, res, (err) => {
      if (err) return next(err);
      return studentController.uploadDocument(req, res, next);
    });
  }
);
router.get('/appointments', studentController.appointments);
router.get('/favorites', studentController.favorites);
router.post('/favorites', ...studentController.addFavorite);
router.delete('/favorites/:universityId', studentController.removeFavorite);
router.get('/notifications', studentController.notifications);

export default router;
