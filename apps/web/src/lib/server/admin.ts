import { Prisma } from '@prisma/client';
import { UserRole } from '@mge/types';
import { requireDatabase } from './auth';
import { prisma } from './prisma';

type ListOptions = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  role?: string;
  status?: 'active' | 'inactive' | 'all';
  filterStatus?: string;
  countryId?: string;
  universityId?: string;
};

function paginateMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };
}

export async function getAdminDashboardStats() {
  requireDatabase();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [
    totalStudents,
    totalCounselors,
    activeApplications,
    appointmentsToday,
    newLeads,
    applicationsByStatus,
    recentLeads,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT', isActive: true } }),
    prisma.user.count({ where: { role: 'COUNSELOR', isActive: true } }),
    prisma.application.count({
      where: { status: { notIn: ['REJECTED', 'WITHDRAWN', 'ACCEPTED', 'DRAFT'] } },
    }),
    prisma.appointment.count({
      where: { scheduledAt: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.application.groupBy({
      by: ['status'],
      _count: { status: true },
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        countryOfInterest: true,
        createdAt: true,
      },
    }),
  ]);

  const convertedLeads = await prisma.lead.count({ where: { status: 'CONVERTED' } });
  const totalLeads = await prisma.lead.count();
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return {
    stats: {
      totalStudents,
      totalCounselors,
      activeApplications,
      appointmentsToday,
      newLeads,
      conversionRate,
    },
    pipeline: applicationsByStatus.map((row) => ({
      status: row.status,
      count: row._count.status,
    })),
    recentLeads: recentLeads.map((lead) => ({
      ...lead,
      createdAt: lead.createdAt.toISOString(),
    })),
  };
}

export async function listAdminStudents(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;
  const sortOrder = options.sortOrder ?? 'desc';

  const where: Prisma.StudentWhereInput = {};
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { user: { email: { contains: q, mode: 'insensitive' } } },
      { user: { firstName: { contains: q, mode: 'insensitive' } } },
      { user: { lastName: { contains: q, mode: 'insensitive' } } },
      { user: { phone: { contains: q.replace(/\D/g, '') } } },
    ];
  }
  if (options.status === 'active') where.user = { isActive: true };
  if (options.status === 'inactive') where.user = { isActive: false };

  const orderBy: Prisma.StudentOrderByWithRelationInput =
    options.sortBy === 'email'
      ? { user: { email: sortOrder } }
      : options.sortBy === 'name'
        ? { user: { firstName: sortOrder } }
        : { createdAt: sortOrder };

  const [rows, total] = await Promise.all([
    prisma.student.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            isActive: true,
            lastLoginAt: true,
            createdAt: true,
          },
        },
        _count: { select: { applications: true, documents: true } },
      },
    }),
    prisma.student.count({ where }),
  ]);

  return {
    data: rows.map((s) => ({
      id: s.id,
      userId: s.user.id,
      registrationNo: s.id.slice(0, 8).toUpperCase(),
      email: s.user.email,
      firstName: s.user.firstName,
      lastName: s.user.lastName,
      phone: s.user.phone,
      isActive: s.user.isActive,
      preferredCountries: s.preferredCountries,
      applicationCount: s._count.applications,
      documentCount: s._count.documents,
      lastLoginAt: s.user.lastLoginAt?.toISOString() || null,
      createdAt: s.createdAt.toISOString(),
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminCounselors(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;
  const sortOrder = options.sortOrder ?? 'desc';

  const where: Prisma.CounselorWhereInput = {};
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { user: { email: { contains: q, mode: 'insensitive' } } },
      { user: { firstName: { contains: q, mode: 'insensitive' } } },
      { user: { lastName: { contains: q, mode: 'insensitive' } } },
      { department: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (options.status === 'active') where.user = { isActive: true };
  if (options.status === 'inactive') where.user = { isActive: false };

  const [rows, total] = await Promise.all([
    prisma.counselor.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: sortOrder },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            isActive: true,
            lastLoginAt: true,
          },
        },
        _count: { select: { students: true, appointments: true } },
      },
    }),
    prisma.counselor.count({ where }),
  ]);

  return {
    data: rows.map((c) => ({
      id: c.id,
      userId: c.user.id,
      email: c.user.email,
      firstName: c.user.firstName,
      lastName: c.user.lastName,
      phone: c.user.phone,
      department: c.department,
      isAvailable: c.isAvailable,
      isActive: c.user.isActive,
      studentCount: c._count.students,
      appointmentCount: c._count.appointments,
      lastLoginAt: c.user.lastLoginAt?.toISOString() || null,
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminApplications(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;
  const sortOrder = options.sortOrder ?? 'desc';

  const where: Prisma.ApplicationWhereInput = {};
  if (options.filterStatus) {
    where.status = options.filterStatus as Prisma.EnumApplicationStatusFilter['equals'];
  }
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { student: { user: { email: { contains: q, mode: 'insensitive' } } } },
      { student: { user: { firstName: { contains: q, mode: 'insensitive' } } } },
      { student: { user: { lastName: { contains: q, mode: 'insensitive' } } } },
      { university: { name: { contains: q, mode: 'insensitive' } } },
      { course: { name: { contains: q, mode: 'insensitive' } } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.application.findMany({
      where,
      skip,
      take: limit,
      orderBy: { updatedAt: sortOrder },
      include: {
        student: {
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        },
        university: { include: { country: true } },
        course: true,
      },
    }),
    prisma.application.count({ where }),
  ]);

  return {
    data: rows.map((a) => ({
      id: a.id,
      status: a.status,
      visaStatus: a.visaStatus,
      submittedAt: a.submittedAt?.toISOString() || null,
      student: {
        id: a.student.id,
        name: `${a.student.user.firstName} ${a.student.user.lastName}`,
        email: a.student.user.email,
      },
      university: a.university.name,
      country: a.university.country.name,
      course: a.course.name,
      updatedAt: a.updatedAt.toISOString(),
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminAppointments(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;

  const where: Prisma.AppointmentWhereInput = {};
  if (options.filterStatus) {
    where.status = options.filterStatus as Prisma.EnumAppointmentStatusFilter['equals'];
  }
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { student: { user: { firstName: { contains: q, mode: 'insensitive' } } } },
      { student: { user: { lastName: { contains: q, mode: 'insensitive' } } } },
      { counselor: { user: { firstName: { contains: q, mode: 'insensitive' } } } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { scheduledAt: options.sortOrder ?? 'asc' },
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
        counselor: { include: { user: { select: { firstName: true, lastName: true } } } },
      },
    }),
    prisma.appointment.count({ where }),
  ]);

  return {
    data: rows.map((a) => ({
      id: a.id,
      title: a.title,
      status: a.status,
      scheduledAt: a.scheduledAt.toISOString(),
      duration: a.duration,
      student: `${a.student.user.firstName} ${a.student.user.lastName}`,
      studentEmail: a.student.user.email,
      counselor: `${a.counselor.user.firstName} ${a.counselor.user.lastName}`,
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminLeads(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;

  const where: Prisma.LeadWhereInput = {};
  if (options.filterStatus) {
    where.status = options.filterStatus as Prisma.EnumLeadStatusFilter['equals'];
  }
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q.replace(/\D/g, '') } },
      { countryOfInterest: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: options.sortOrder ?? 'desc' },
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    data: rows.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      phone: l.phone,
      status: l.status,
      source: l.source,
      countryOfInterest: l.countryOfInterest,
      createdAt: l.createdAt.toISOString(),
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminCountries(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;

  const where: Prisma.CountryWhereInput = {};
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { code: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (options.status === 'active') where.isActive = true;
  if (options.status === 'inactive') where.isActive = false;

  const [rows, total] = await Promise.all([
    prisma.country.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: options.sortOrder ?? 'asc' },
      include: { _count: { select: { universities: true, scholarships: true } } },
    }),
    prisma.country.count({ where }),
  ]);

  return {
    data: rows.map((c) => ({
      id: c.id,
      code: c.code,
      name: c.name,
      flag: c.flag,
      isActive: c.isActive,
      universityCount: c._count.universities,
      scholarshipCount: c._count.scholarships,
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminUniversities(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;

  const where: Prisma.UniversityWhereInput = {};
  if (options.countryId) where.countryId = options.countryId;
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { slug: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.university.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: options.sortOrder ?? 'asc' },
      include: {
        country: { select: { id: true, name: true, code: true } },
        _count: { select: { courses: true, applications: true } },
      },
    }),
    prisma.university.count({ where }),
  ]);

  return {
    data: rows.map((u) => ({
      id: u.id,
      slug: u.slug,
      name: u.name,
      country: u.country.name,
      countryCode: u.country.code,
      worldRanking: u.worldRanking,
      isActive: u.isActive,
      courseCount: u._count.courses,
      applicationCount: u._count.applications,
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminCourses(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;

  const where: Prisma.CourseWhereInput = {};
  if (options.universityId) where.universityId = options.universityId;
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { slug: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: options.sortOrder ?? 'asc' },
      include: {
        university: { select: { id: true, name: true, slug: true } },
        _count: { select: { applications: true } },
      },
    }),
    prisma.course.count({ where }),
  ]);

  return {
    data: rows.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      degreeLevel: c.degreeLevel,
      tuition: c.tuition,
      currency: c.currency,
      university: c.university.name,
      isActive: c.isActive,
      applicationCount: c._count.applications,
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminScholarships(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;

  const where: Prisma.ScholarshipWhereInput = {};
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.name = { contains: q, mode: 'insensitive' };
  }

  const [rows, total] = await Promise.all([
    prisma.scholarship.findMany({
      where,
      skip,
      take: limit,
      orderBy: { deadline: options.sortOrder ?? 'asc' },
      include: {
        university: { select: { name: true } },
        country: { select: { name: true, code: true } },
      },
    }),
    prisma.scholarship.count({ where }),
  ]);

  return {
    data: rows.map((s) => ({
      id: s.id,
      name: s.name,
      awardAmount: s.awardAmount,
      currency: s.currency,
      deadline: s.deadline.toISOString(),
      university: s.university?.name || '—',
      country: s.country?.name || '—',
      isActive: s.isActive,
    })),
    meta: paginateMeta(total, page, limit),
  };
}

export async function listAdminTasks(options: ListOptions = {}) {
  requireDatabase();
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const skip = (page - 1) * limit;

  const where: Prisma.TaskWhereInput = {};
  if (options.filterStatus === 'completed') where.isCompleted = true;
  if (options.filterStatus === 'pending') where.isCompleted = false;
  if (options.search?.trim()) {
    where.title = { contains: options.search.trim(), mode: 'insensitive' };
  }

  const [rows, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { dueDate: options.sortOrder ?? 'asc' },
      include: {
        counselor: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
      },
    }),
    prisma.task.count({ where }),
  ]);

  return {
    data: rows.map((t) => ({
      id: t.id,
      title: t.title,
      priority: t.priority,
      isCompleted: t.isCompleted,
      dueDate: t.dueDate?.toISOString() || null,
      counselor: `${t.counselor.user.firstName} ${t.counselor.user.lastName}`,
    })),
    meta: paginateMeta(total, page, limit),
  };
}
