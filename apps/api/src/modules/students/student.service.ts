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
    meta: { name: string; type: string; applicationId?: string }
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
    });
  }
}

export const studentService = new StudentService();
