import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { API_CONFIG } from '@mge/config';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { connectDatabase } from './database/prisma';
import { env } from './config/env';

import authRoutes from './modules/authentication/auth.routes';
import universityRoutes from './modules/universities/university.routes';
import countryRoutes from './modules/countries/country.routes';
import courseRoutes from './modules/courses/course.routes';
import scholarshipRoutes from './modules/scholarships/scholarship.routes';
import { studentRoutes } from './modules/students';
import publicRoutes from './modules/cms/public.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: API_CONFIG.rateLimitWindowMs,
  max: API_CONFIG.rateLimitMax,
  message: { success: false, error: 'Too many requests', code: 'RATE_LIMIT' },
});
app.use(limiter);

app.use('/uploads', express.static(path.resolve(env.UPLOAD_DIR)));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/universities', universityRoutes);
apiRouter.use('/countries', countryRoutes);
apiRouter.use('/courses', courseRoutes);
apiRouter.use('/scholarships', scholarshipRoutes);
apiRouter.use('/students', studentRoutes);
apiRouter.use('/public', publicRoutes);

app.use(API_CONFIG.prefix, apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await connectDatabase();
    app.listen(env.API_PORT, () => {
      console.log(`API server running on ${env.API_URL}${API_CONFIG.prefix}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;
