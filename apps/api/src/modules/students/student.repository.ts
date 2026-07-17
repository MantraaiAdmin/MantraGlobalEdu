import { NotFoundError } from '@mge/shared';
import { prisma } from '../../database/prisma';

export class StudentRepository {
  async findStudentByUserId(userId: string) {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
    if (!student) throw new NotFoundError('Student profile');
    return student;
  }

  async getDashboardStats(studentId: string, userId: string) {
    const [applications, appointments, documents, notifications, favorites, activeApplications] =
      await Promise.all([
        prisma.application.count({ where: { studentId } }),
        prisma.appointment.count({
          where: { studentId, status: { in: ['SCHEDULED', 'CONFIRMED'] } },
        }),
        prisma.document.count({ where: { studentId } }),
        prisma.notification.count({ where: { userId, isRead: false } }),
        prisma.favorite.count({ where: { studentId } }),
        prisma.application.count({
          where: {
            studentId,
            status: { notIn: ['REJECTED', 'WITHDRAWN', 'ACCEPTED'] },
          },
        }),
      ]);

    return {
      totalApplications: applications,
      activeApplications,
      upcomingAppointments: appointments,
      documentsUploaded: documents,
      unreadNotifications: notifications,
      savedUniversities: favorites,
    };
  }

  async getApplications(studentId: string) {
    return prisma.application.findMany({
      where: { studentId },
      orderBy: { updatedAt: 'desc' },
      include: {
        university: { include: { country: true } },
        course: true,
      },
    });
  }

  async getDocuments(studentId: string) {
    return prisma.document.findMany({
      where: { studentId },
      orderBy: { uploadedAt: 'desc' },
      include: { application: { select: { id: true, status: true } } },
    });
  }

  async getAppointments(studentId: string) {
    return prisma.appointment.findMany({
      where: { studentId },
      orderBy: { scheduledAt: 'asc' },
      include: {
        counselor: {
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        },
      },
    });
  }

  async getFavorites(studentId: string) {
    return prisma.favorite.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
      include: {
        university: { include: { country: true } },
      },
    });
  }

  async addFavorite(studentId: string, universityId: string) {
    return prisma.favorite.upsert({
      where: { studentId_universityId: { studentId, universityId } },
      update: {},
      create: { studentId, universityId },
      include: { university: { include: { country: true } } },
    });
  }

  async removeFavorite(studentId: string, universityId: string) {
    await prisma.favorite.deleteMany({ where: { studentId, universityId } });
  }

  async getNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async createApplication(data: {
    studentId: string;
    universityId: string;
    courseId: string;
  }) {
    return prisma.application.create({
      data: { ...data, status: 'DRAFT' },
      include: {
        university: { include: { country: true } },
        course: true,
      },
    });
  }

  async createDocument(data: {
    studentId: string;
    name: string;
    type: string;
    url: string;
    mimeType: string;
    size: number;
    applicationId?: string;
    checklistItemKey?: string;
  }) {
    return prisma.document.create({
      data: {
        studentId: data.studentId,
        name: data.name,
        type: data.type,
        url: data.url,
        mimeType: data.mimeType,
        size: data.size,
        applicationId: data.applicationId,
        checklistItemKey: data.checklistItemKey,
      },
    });
  }
}

export const studentRepository = new StudentRepository();
