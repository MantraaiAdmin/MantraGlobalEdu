import { buildChecklistProgress, DESTINATIONS, UPLOAD_CONFIG } from '@mge/config';
import { UserRole } from '@mge/types';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { prisma } from './prisma';
import { AuthError, getUserFromAccessToken } from './auth';

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
      url: doc.url,
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
    documents: student.documents,
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

  if (file.size > UPLOAD_CONFIG.maxFileSize) {
    throw new AuthError(`File exceeds maximum size of ${UPLOAD_CONFIG.maxFileSizeLabel}`, 400, 'VALIDATION');
  }

  if (!UPLOAD_CONFIG.allowedMimeTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedMimeTypes)[number])) {
    throw new AuthError('File type not allowed. Accepted: PDF, JPEG, PNG, WebP, DOC, DOCX', 400, 'VALIDATION');
  }

  const student = await prisma.student.findUnique({ where: { userId: user.id } });
  if (!student) {
    throw new AuthError('Student profile not found', 404, 'NOT_FOUND');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${sanitizeFilename(file.name)}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'students', student.id);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  const url = `/uploads/students/${student.id}/${filename}`;

  return prisma.document.create({
    data: {
      studentId: student.id,
      applicationId: meta.applicationId || null,
      checklistItemKey: meta.checklistItemKey || null,
      name: meta.name || file.name,
      type: meta.type,
      url,
      mimeType: file.type,
      size: file.size,
    },
  });
}
