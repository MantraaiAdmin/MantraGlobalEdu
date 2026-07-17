import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { validateBody } from '../../middlewares/validate.middleware';
import { sendSuccess, sendCreated } from '../../shared/utils/response';
import { studentService } from './student.service';

export class StudentController {
  dashboard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await studentService.getDashboard(req.user!.sub);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  applications = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await studentService.getApplications(req.user!.sub);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  createApplication = [
    validateBody(z.object({
      universityId: z.string().uuid(),
      courseId: z.string().uuid(),
    })),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
        const app = await studentService.createApplication(
          req.user!.sub,
          req.body.universityId,
          req.body.courseId
        );
        sendCreated(res, app, 'Application created');
      } catch (error) {
        next(error);
      }
    },
  ];

  documents = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await studentService.getDocuments(req.user!.sub);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  appointments = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await studentService.getAppointments(req.user!.sub);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  favorites = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await studentService.getFavorites(req.user!.sub);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  addFavorite = [
    validateBody(z.object({ universityId: z.string().uuid() })),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
        const fav = await studentService.addFavorite(req.user!.sub, req.body.universityId);
        sendCreated(res, fav, 'University saved');
      } catch (error) {
        next(error);
      }
    },
  ];

  removeFavorite = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await studentService.removeFavorite(req.user!.sub, String(req.params.universityId));
      sendSuccess(res, null, 'University removed from shortlist');
    } catch (error) {
      next(error);
    }
  };

  notifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await studentService.getNotifications(req.user!.sub);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  documentWorkspace = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await studentService.getDocumentWorkspace(req.user!.sub);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  uploadDocument = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: 'No file uploaded' });
        return;
      }
      const { name, type, applicationId, checklistItemKey } = req.body;
      if (!type) {
        res.status(400).json({ success: false, error: 'Document type is required' });
        return;
      }
      const doc = await studentService.uploadDocument(req.user!.sub, req.file, {
        name: name || req.file.originalname,
        type,
        applicationId: applicationId || undefined,
        checklistItemKey: checklistItemKey || undefined,
      });
      sendCreated(res, doc, 'Document uploaded successfully');
    } catch (error) {
      next(error);
    }
  };
}

export const studentController = new StudentController();
