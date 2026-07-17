import { buildChecklistProgress, DESTINATIONS } from '@mge/config';
import { UserRole } from '@mge/types';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { prisma } from './prisma';
import { AuthError, getUserFromAccessToken } from './auth';
import {
  buildDocumentFileUrl,
  resolveDocumentType,
  useDatabaseFileStorage,
  validateUploadFile,
} from './document-storage';

export async function getStudentDocumentWorkspace(accessToken: string) {
  const user = await getUserFromAccessToken(accessToken);
  if (user.role !== UserRole.STUDENT) {
    throw new AuthError('Student access required', 403, 'FORBIDDEN');
  }

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
      applications: {
        orderBy: { updatedAt: 'desc' },
        include: {
          university: { include: { country: true } },
          course: true,
        },
      },
      documents: {
        orderBy: { uploadedAt: 'desc' },
        include: {
          application: {
            select: { id: true, status: true, visaStatus: true },
          },
        },
      },
    },
  });

  if (!student) {
    throw new AuthError('Student profile not found', 404, 'NOT_FOUND');
  }

  const preferredCountries = student.preferredCountries.map((code) => {
    const match = DESTINATIONS.find((d) => d.code === code);
    return {
      code,
      name: match?.name || code,
      flag: match?.flag || '🌍',
    };
  });

  const checklist = buildChecklistProgress(
    student.documents.map((doc) => ({
      id: doc.id,
      name: doc.name,
      checklistItemKey: doc.checklistItemKey,
      isVerified: doc.isVerified,
      uploadedAt: doc.uploadedAt.toISOString(),
      url: doc.fileData ? buildDocumentFileUrl(doc.id) : doc.url,
      mimeType: doc.mimeType,
      size: doc.size,
    }))
  );

  const applications = student.applications.map((app) => ({
    id: app.id,
    status: app.status,
    visaStatus: app.visaStatus,
    submittedAt: app.submittedAt?.toISOString() || null,
    offerReceivedAt: app.offerReceivedAt?.toISOString() || null,
    university: {
      id: app.university.id,
      name: app.university.name,
      slug: app.university.slug,
    },
    course: {
      id: app.course.id,
      name: app.course.name,
      degreeLevel: app.course.degreeLevel,
    },
    country: {
      code: app.university.country.code,
      name: app.university.country.name,
      flag: app.university.country.flag || '🌍',
    },
    documentCount: student.documents.filter((d) => d.applicationId === app.id).length,
  }));

  const appliedCountries = Array.from(
    new Map(applications.map((a) => [a.country.code, a.country])).values()
  );

  return {
    student: {
      id: student.id,
      registrationNo: student.id.slice(0, 8).toUpperCase(),
      preferredCountries,
      appliedCountries,
      profile: student.user,
    },
    summary: checklist.summary,
    checklist,
    applications,
    documents: student.documents.map((doc) => ({
      ...doc,
      url: doc.fileData ? buildDocumentFileUrl(doc.id) : doc.url,
    })),
  };
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_');
}

export async function uploadStudentDocument(
  accessToken: string,
  file: File,
  meta: { name: string; type: string; checklistItemKey?: string; applicationId?: string }
) {
  const user = await getUserFromAccessToken(accessToken);
  if (user.role !== UserRole.STUDENT) {
    throw new AuthError('Student access required', 403, 'FORBIDDEN');
  }

  const mimeType = validateUploadFile(file);

  const student = await prisma.student.findUnique({ where: { userId: user.id } });
  if (!student) {
    throw new AuthError('Student profile not found', 404, 'NOT_FOUND');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const checklistItemKey = meta.checklistItemKey || null;
  const docType = meta.type || (checklistItemKey ? resolveDocumentType(checklistItemKey) : 'other');

  if (useDatabaseFileStorage()) {
    const document = await prisma.document.create({
      data: {
        studentId: student.id,
        applicationId: meta.applicationId || null,
        checklistItemKey,
        name: meta.name || file.name,
        type: docType,
        url: 'pending',
        mimeType,
        size: file.size,
        fileData: buffer,
      },
    });

    const url = buildDocumentFileUrl(document.id);
    const updated = await prisma.document.update({
      where: { id: document.id },
      data: { url },
    });

    return {
      ...updated,
      url,
    };
  }

  const filename = `${Date.now()}-${sanitizeFilename(file.name)}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'students', student.id);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  const url = `/uploads/students/${student.id}/${filename}`;

  return prisma.document.create({
    data: {
      studentId: student.id,
      applicationId: meta.applicationId || null,
      checklistItemKey,
      name: meta.name || file.name,
      type: docType,
      url,
      mimeType,
      size: file.size,
    },
  });
}

export async function getStudentDocumentFile(accessToken: string, documentId: string) {
  const user = await getUserFromAccessToken(accessToken);

  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { student: { select: { userId: true } } },
  });

  if (!document) {
    throw new AuthError('Document not found', 404, 'NOT_FOUND');
  }

  const isOwner = user.role === UserRole.STUDENT && document.student.userId === user.id;
  const isStaff = user.role === UserRole.ADMIN || user.role === UserRole.COUNSELOR;

  if (!isOwner && !isStaff) {
    throw new AuthError('Access denied', 403, 'FORBIDDEN');
  }

  if (!document.fileData) {
    throw new AuthError('Document file is not available in storage', 404, 'NOT_FOUND');
  }

  return {
    buffer: Buffer.from(document.fileData),
    mimeType: document.mimeType,
    name: document.name,
  };
}
