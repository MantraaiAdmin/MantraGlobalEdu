import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UPLOAD_CONFIG } from '@mge/config';
import { env } from '../config/env';

const uploadDir = path.resolve(env.UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: UPLOAD_CONFIG.maxFileSize },
  fileFilter: (_req, file, cb) => {
    if (UPLOAD_CONFIG.allowedMimeTypes.includes(file.mimetype as typeof UPLOAD_CONFIG.allowedMimeTypes[number])) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed. Accepted: PDF, JPEG, PNG, WebP, DOC, DOCX`));
    }
  },
});
