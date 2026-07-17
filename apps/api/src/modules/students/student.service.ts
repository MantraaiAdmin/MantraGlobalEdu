import { buildChecklistProgress, DESTINATIONS } from '@mge/config';
import { StudentRepository } from './student.repository';

export class StudentService {
  constructor(private readonly repository = new StudentRepository()) {}

  async getDashboard(userId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    const stats = await this.repository.getDashboardStats(student.id, userId);
    return { student, stats };
  }

  async getApplications(userId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    return this.repository.getApplications(student.id);
  }

  async getDocuments(userId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    return this.repository.getDocuments(student.id);
  }

  async getAppointments(userId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    return this.repository.getAppointments(student.id);
  }

  async getFavorites(userId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    return this.repository.getFavorites(student.id);
  }

  async addFavorite(userId: string, universityId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    return this.repository.addFavorite(student.id, universityId);
  }

  async removeFavorite(userId: string, universityId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    await this.repository.removeFavorite(student.id, universityId);
  }

  async getNotifications(userId: string) {
    return this.repository.getNotifications(userId);
  }

  async createApplication(userId: string, universityId: string, courseId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    return this.repository.createApplication({
      studentId: student.id,
      universityId,
      courseId,
    });
  }

  async uploadDocument(
    userId: string,
    file: Express.Multer.File,
    meta: { name: string; type: string; applicationId?: string; checklistItemKey?: string }
  ) {
    const student = await this.repository.findStudentByUserId(userId);
    const url = `/uploads/${file.filename}`;
    return this.repository.createDocument({
      studentId: student.id,
      name: meta.name || file.originalname,
      type: meta.type,
      url,
      mimeType: file.mimetype,
      size: file.size,
      applicationId: meta.applicationId,
      checklistItemKey: meta.checklistItemKey,
    });
  }

  async getDocumentWorkspace(userId: string) {
    const student = await this.repository.findStudentByUserId(userId);
    const [documents, applications] = await Promise.all([
      this.repository.getDocuments(student.id),
      this.repository.getApplications(student.id),
    ]);

    const preferredCountries = student.preferredCountries.map((code) => {
      const match = DESTINATIONS.find((d) => d.code === code);
      return {
        code,
        name: match?.name || code,
        flag: match?.flag || '🌍',
      };
    });

    const checklist = buildChecklistProgress(
      documents.map((doc) => ({
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

    const mappedApplications = applications.map((app) => ({
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
      documentCount: documents.filter((d) => d.applicationId === app.id).length,
    }));

    return {
      student: {
        id: student.id,
        registrationNo: student.id.slice(0, 8).toUpperCase(),
        preferredCountries,
        appliedCountries: Array.from(
          new Map(mappedApplications.map((a) => [a.country.code, a.country])).values()
        ),
        profile: student.user,
      },
      summary: checklist.summary,
      checklist,
      applications: mappedApplications,
      documents,
    };
  }
}

export const studentService = new StudentService();
