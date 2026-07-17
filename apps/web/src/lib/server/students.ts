import { AuthError, getUserFromAccessToken, requireDatabase } from './auth';
import { prisma } from './prisma';

async function findStudentByUserId(userId: string) {
  requireDatabase();
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
  if (!student) {
    throw new AuthError('Student profile not found', 404, 'NOT_FOUND');
  }
  return student;
}

export async function getStudentDashboard(accessToken: string) {
  const user = await getUserFromAccessToken(accessToken);
  const student = await findStudentByUserId(user.id);

  const [applications, appointments, documents, notifications, favorites, activeApplications] =
    await Promise.all([
      prisma.application.count({ where: { studentId: student.id } }),
      prisma.appointment.count({
        where: { studentId: student.id, status: { in: ['SCHEDULED', 'CONFIRMED'] } },
      }),
      prisma.document.count({ where: { studentId: student.id } }),
      prisma.notification.count({ where: { userId: user.id, isRead: false } }),
      prisma.favorite.count({ where: { studentId: student.id } }),
      prisma.application.count({
        where: {
          studentId: student.id,
          status: { notIn: ['REJECTED', 'WITHDRAWN', 'ACCEPTED'] },
        },
      }),
    ]);

  return {
    student: {
      id: student.id,
      registrationNo: student.id.slice(0, 8).toUpperCase(),
      preferredCountries: student.preferredCountries,
      profile: student.user,
    },
    stats: {
      totalApplications: applications,
      activeApplications,
      upcomingAppointments: appointments,
      documentsUploaded: documents,
      unreadNotifications: notifications,
      savedUniversities: favorites,
    },
  };
}

export async function getStudentApplications(accessToken: string) {
  const user = await getUserFromAccessToken(accessToken);
  const student = await findStudentByUserId(user.id);

  const applications = await prisma.application.findMany({
    where: { studentId: student.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      university: { include: { country: true } },
      course: true,
    },
  });

  return applications.map((app) => ({
    id: app.id,
    status: app.status,
    visaStatus: app.visaStatus,
    submittedAt: app.submittedAt?.toISOString() || null,
    offerReceivedAt: app.offerReceivedAt?.toISOString() || null,
    university: app.university,
    course: app.course,
  }));
}

export async function getStudentDocuments(accessToken: string) {
  const user = await getUserFromAccessToken(accessToken);
  const student = await findStudentByUserId(user.id);

  const documents = await prisma.document.findMany({
    where: { studentId: student.id },
    orderBy: { uploadedAt: 'desc' },
    include: { application: { select: { id: true, status: true } } },
  });

  return documents.map((doc) => ({
    id: doc.id,
    name: doc.name,
    type: doc.type,
    checklistItemKey: doc.checklistItemKey,
    isVerified: doc.isVerified,
    uploadedAt: doc.uploadedAt.toISOString(),
    url: doc.url,
    mimeType: doc.mimeType,
    size: doc.size,
  }));
}

export async function getStudentAppointments(accessToken: string) {
  const user = await getUserFromAccessToken(accessToken);
  const student = await findStudentByUserId(user.id);

  const appointments = await prisma.appointment.findMany({
    where: { studentId: student.id },
    orderBy: { scheduledAt: 'asc' },
    include: {
      counselor: {
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
        },
      },
    },
  });

  return appointments.map((appt) => ({
    id: appt.id,
    title: appt.title,
    description: appt.description,
    scheduledAt: appt.scheduledAt.toISOString(),
    status: appt.status,
    duration: appt.duration,
    counselor: appt.counselor,
  }));
}

export async function getStudentNotifications(accessToken: string) {
  const user = await getUserFromAccessToken(accessToken);

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return notifications.map((n) => ({
    id: n.id,
    title: n.title,
    message: n.message,
    type: n.type,
    isRead: n.isRead,
    createdAt: n.createdAt.toISOString(),
    link: n.link,
  }));
}

export async function syncStudentFavorite(accessToken: string, universityId: string) {
  const user = await getUserFromAccessToken(accessToken);
  const student = await findStudentByUserId(user.id);

  return prisma.favorite.upsert({
    where: { studentId_universityId: { studentId: student.id, universityId } },
    update: {},
    create: { studentId: student.id, universityId },
    include: { university: { include: { country: true } } },
  });
}
