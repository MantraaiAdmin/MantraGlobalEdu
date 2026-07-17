import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SEED_ADMIN_EMAIL } from '@mge/config';
import {
  COUNTRY_DATA,
  UNIVERSITIES,
  COUNTRY_SCHOLARSHIPS,
  FOCUS_COUNTRY_CODES,
} from './destinations-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'ChangeMeOnFirstLogin!2026';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: SEED_ADMIN_EMAIL },
    update: {
      role: UserRole.ADMIN,
      emailVerified: true,
      firstName: 'Vinodhini',
      lastName: 'Y.',
      passwordHash,
    },
    create: {
      email: SEED_ADMIN_EMAIL,
      passwordHash,
      firstName: 'Vinodhini',
      lastName: 'Y.',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'counselor@mantraglobaleducation.com' },
    update: {},
    create: {
      email: 'counselor@mantraglobaleducation.com',
      passwordHash,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: UserRole.COUNSELOR,
      emailVerified: true,
      counselor: {
        create: {
          department: 'International Admissions',
          bio: 'Experienced study abroad counselor specialising in global university admissions across 19+ countries.',
          specialties: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Ireland', 'Singapore', 'Netherlands'],
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'student@mantraglobaleducation.com' },
    update: {},
    create: {
      email: 'student@mantraglobaleducation.com',
      passwordHash,
      firstName: 'Rahul',
      lastName: 'Sharma',
      role: UserRole.STUDENT,
      emailVerified: true,
      student: {
        create: {
          nationality: 'Indian',
          academicScore: 85,
          preferredCountries: ['US', 'GB', 'CA', 'AU', 'DE'],
        },
      },
    },
  });

  // Activate all supported study destinations
  await prisma.country.updateMany({
    where: { code: { notIn: [...FOCUS_COUNTRY_CODES] } },
    data: { isActive: false },
  });

  const countryMap = new Map<string, string>();

  for (const country of COUNTRY_DATA) {
    const record = await prisma.country.upsert({
      where: { code: country.code },
      update: {
        name: country.name,
        flag: country.flag,
        description: country.description,
        tuitionRange: country.tuitionRange,
        livingCost: country.livingCost,
        visaRequirements: country.visaRequirements,
        intakePeriods: country.intakePeriods,
        graduateOpportunities: country.graduateOpportunities,
        isActive: true,
      },
      create: { ...country, isActive: true },
    });
    countryMap.set(country.code, record.id);
  }

  // Deactivate universities not in our focus dataset
  const focusSlugs = UNIVERSITIES.map((u) => u.slug);
  await prisma.university.updateMany({
    where: { slug: { notIn: focusSlugs } },
    data: { isActive: false },
  });

  const courseSlugToId = new Map<string, string>();

  for (const uni of UNIVERSITIES) {
    const countryId = countryMap.get(uni.countryCode)!;

    const university = await prisma.university.upsert({
      where: { slug: uni.slug },
      update: {
        name: uni.name,
        countryId,
        worldRanking: uni.worldRanking,
        tuitionMin: uni.tuitionMin,
        tuitionMax: uni.tuitionMax,
        acceptanceRate: uni.acceptanceRate,
        description: uni.description,
        website: uni.website,
        popularPrograms: uni.popularPrograms,
        isActive: true,
      },
      create: {
        name: uni.name,
        slug: uni.slug,
        countryId,
        worldRanking: uni.worldRanking,
        tuitionMin: uni.tuitionMin,
        tuitionMax: uni.tuitionMax,
        acceptanceRate: uni.acceptanceRate,
        description: uni.description,
        website: uni.website,
        popularPrograms: uni.popularPrograms,
        isActive: true,
      },
    });

    for (const course of uni.courses) {
      const record = await prisma.course.upsert({
        where: { slug: course.slug },
        update: {
          name: course.name,
          universityId: university.id,
          degreeLevel: course.degreeLevel,
          duration: course.duration,
          tuition: course.tuition,
          currency: course.currency,
          intakePeriods: course.intakePeriods,
          eligibility: course.eligibility,
          description: `${course.description} Source: ${course.sourceUrl}`,
          isActive: true,
        },
        create: {
          name: course.name,
          slug: course.slug,
          universityId: university.id,
          degreeLevel: course.degreeLevel,
          duration: course.duration,
          tuition: course.tuition,
          currency: course.currency,
          intakePeriods: course.intakePeriods,
          eligibility: course.eligibility,
          description: `${course.description} Source: ${course.sourceUrl}`,
          isActive: true,
        },
      });
      courseSlugToId.set(course.slug, record.id);
    }

    for (const scholarship of uni.scholarships) {
      const courseId = scholarship.courseSlug
        ? courseSlugToId.get(scholarship.courseSlug)
        : undefined;

      await prisma.scholarship.upsert({
        where: { id: scholarship.id },
        update: {
          name: scholarship.name,
          universityId: university.id,
          countryId,
          courseId,
          awardAmount: scholarship.awardAmount,
          currency: scholarship.currency,
          deadline: new Date(scholarship.deadline),
          eligibility: scholarship.eligibility,
          requirements: `${scholarship.requirements} Source: ${scholarship.sourceUrl}`,
          isActive: true,
        },
        create: {
          id: scholarship.id,
          name: scholarship.name,
          universityId: university.id,
          countryId,
          courseId,
          awardAmount: scholarship.awardAmount,
          currency: scholarship.currency,
          deadline: new Date(scholarship.deadline),
          eligibility: scholarship.eligibility,
          requirements: `${scholarship.requirements} Source: ${scholarship.sourceUrl}`,
          isActive: true,
        },
      });
    }
  }

  for (const scholarship of COUNTRY_SCHOLARSHIPS) {
    const countryId = countryMap.get(scholarship.countryCode)!;
    await prisma.scholarship.upsert({
      where: { id: scholarship.id },
      update: {
        name: scholarship.name,
        countryId,
        awardAmount: scholarship.awardAmount,
        currency: scholarship.currency,
        deadline: new Date(scholarship.deadline),
        eligibility: scholarship.eligibility,
        requirements: `${scholarship.requirements} Source: ${scholarship.sourceUrl}`,
        isActive: true,
      },
      create: {
        id: scholarship.id,
        name: scholarship.name,
        countryId,
        awardAmount: scholarship.awardAmount,
        currency: scholarship.currency,
        deadline: new Date(scholarship.deadline),
        eligibility: scholarship.eligibility,
        requirements: `${scholarship.requirements} Source: ${scholarship.sourceUrl}`,
        isActive: true,
      },
    });
  }

  await Promise.all([
    prisma.contentArticle.upsert({
      where: { slug: 'complete-guide-study-usa-2026' },
      update: {},
      create: {
        title: 'Complete Guide to Studying in the USA (2026)',
        slug: 'complete-guide-study-usa-2026',
        excerpt: 'Everything you need to know about applying to US universities.',
        content: 'A comprehensive guide covering university selection, applications, visas, and more.',
        category: 'guides',
        author: 'Sarah Johnson',
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
    prisma.contentArticle.upsert({
      where: { slug: 'uk-student-visa-updates-2026' },
      update: {},
      create: {
        title: 'UK Student Visa Updates for 2026',
        slug: 'uk-student-visa-updates-2026',
        excerpt: 'Latest changes to UK student visa requirements and processing times.',
        content: 'Overview of recent UK visa policy changes affecting international students.',
        category: 'visa',
        author: 'Admin User',
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
    prisma.contentArticle.upsert({
      where: { slug: 'study-australia-guide-2026' },
      update: {},
      create: {
        title: 'Study in Australia — Complete Guide 2026',
        slug: 'study-australia-guide-2026',
        excerpt: 'University options, tuition fees, scholarships, and post-study work rights in Australia.',
        content: 'Guide to applying to Australian universities, visa requirements, and scholarship opportunities.',
        category: 'guides',
        author: 'Sarah Johnson',
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
  ]);

  const stats = await Promise.all([
    prisma.country.count({ where: { isActive: true } }),
    prisma.university.count({ where: { isActive: true } }),
    prisma.course.count({ where: { isActive: true } }),
    prisma.scholarship.count({ where: { isActive: true } }),
  ]);

  // Student journey demo data
  const studentUser = await prisma.user.findUnique({
    where: { email: 'student@mantraglobaleducation.com' },
    include: { student: true },
  });
  const counselor = await prisma.counselor.findFirst({
    include: { user: true },
  });

  if (studentUser?.student && counselor) {
    await prisma.counselorStudent.upsert({
      where: {
        counselorId_studentId: {
          counselorId: counselor.id,
          studentId: studentUser.student.id,
        },
      },
      update: {},
      create: {
        counselorId: counselor.id,
        studentId: studentUser.student.id,
      },
    });

    const mit = await prisma.university.findUnique({ where: { slug: 'massachusetts-institute-of-technology' } });
    const oxford = await prisma.university.findUnique({ where: { slug: 'university-of-oxford' } });
    const melbourne = await prisma.university.findUnique({ where: { slug: 'university-of-melbourne' } });
    const mitCourse = await prisma.course.findUnique({ where: { slug: 'mit-ms-eecs' } });
    const oxfordCourse = await prisma.course.findUnique({ where: { slug: 'oxford-msc-computer-science' } });

    if (mit && mitCourse) {
      const existingApp = await prisma.application.findFirst({
        where: { studentId: studentUser.student.id, courseId: mitCourse.id },
      });
      if (!existingApp) {
        await prisma.application.create({
          data: {
            studentId: studentUser.student.id,
            universityId: mit.id,
            courseId: mitCourse.id,
            status: 'UNDER_REVIEW',
            visaStatus: 'DOCUMENTS_PREPARING',
            submittedAt: new Date(),
          },
        });
      } else {
        await prisma.application.update({
          where: { id: existingApp.id },
          data: { visaStatus: 'DOCUMENTS_PREPARING' },
        });
      }
    }

    if (oxford && oxfordCourse) {
      const existingApp = await prisma.application.findFirst({
        where: { studentId: studentUser.student.id, courseId: oxfordCourse.id },
      });
      if (!existingApp) {
        await prisma.application.create({
          data: {
            studentId: studentUser.student.id,
            universityId: oxford.id,
            courseId: oxfordCourse.id,
            status: 'DRAFT',
            visaStatus: 'NOT_STARTED',
          },
        });
      } else {
        await prisma.application.update({
          where: { id: existingApp.id },
          data: { visaStatus: 'NOT_STARTED' },
        });
      }
    }

    if (melbourne) {
      await prisma.favorite.upsert({
        where: {
          studentId_universityId: {
            studentId: studentUser.student.id,
            universityId: melbourne.id,
          },
        },
        update: {},
        create: {
          studentId: studentUser.student.id,
          universityId: melbourne.id,
        },
      });
    }

    const existingAppt = await prisma.appointment.findFirst({
      where: { studentId: studentUser.student.id },
    });
    if (!existingAppt) {
      const scheduledAt = new Date();
      scheduledAt.setDate(scheduledAt.getDate() + 3);
      scheduledAt.setHours(14, 0, 0, 0);
      await prisma.appointment.create({
        data: {
          studentId: studentUser.student.id,
          counselorId: counselor.id,
          title: 'Study Abroad Counseling Session',
          description: 'Initial counseling with Mantra advisor',
          scheduledAt,
          status: 'CONFIRMED',
          duration: 45,
        },
      });
    }

    const existingDocs = await prisma.document.count({
      where: { studentId: studentUser.student.id },
    });
    if (existingDocs === 0) {
      await prisma.document.createMany({
        data: [
          {
            studentId: studentUser.student.id,
            name: 'Academic Transcript',
            type: 'transcript',
            checklistItemKey: 'transcript',
            url: '/uploads/demo/transcript.pdf',
            mimeType: 'application/pdf',
            size: 245000,
            isVerified: true,
          },
          {
            studentId: studentUser.student.id,
            name: 'Statement of Purpose (Draft)',
            type: 'sop',
            checklistItemKey: 'sop',
            url: '/uploads/demo/sop.pdf',
            mimeType: 'application/pdf',
            size: 128000,
            isVerified: false,
          },
          {
            studentId: studentUser.student.id,
            name: 'IELTS Score Report',
            type: 'test_score',
            checklistItemKey: 'english_test',
            url: '/uploads/demo/ielts.pdf',
            mimeType: 'application/pdf',
            size: 98000,
            isVerified: true,
          },
        ],
      });
    } else {
      const docUpdates: Array<{ name: string; key: string }> = [
        { name: 'Academic Transcript', key: 'transcript' },
        { name: 'Statement of Purpose (Draft)', key: 'sop' },
        { name: 'IELTS Score Report', key: 'english_test' },
      ];
      for (const item of docUpdates) {
        await prisma.document.updateMany({
          where: { studentId: studentUser.student.id, name: item.name },
          data: { checklistItemKey: item.key },
        });
      }
    }

    const existingNotifs = await prisma.notification.count({
      where: { userId: studentUser.id },
    });
    if (existingNotifs === 0) {
      await prisma.notification.createMany({
        data: [
          {
            userId: studentUser.id,
            title: 'Application Update',
            message: 'Your MIT MS EECS application is now under review.',
            type: 'application',
            link: '/portal/student/applications',
          },
          {
            userId: studentUser.id,
            title: 'Counseling Confirmed',
            message: 'Your counseling session has been confirmed. Check appointments for details.',
            type: 'appointment',
            link: '/portal/student/appointments',
          },
          {
            userId: studentUser.id,
            title: 'Document Verified',
            message: 'Your academic transcript has been verified by your counselor.',
            type: 'document',
            isRead: true,
          },
        ],
      });
    }
  }

  console.log('Seed completed successfully!');
  console.log(`  Countries: ${stats[0]} (19+ global destinations)`);
  console.log(`  Universities: ${stats[1]}`);
  console.log(`  Courses: ${stats[2]}`);
  console.log(`  Scholarships: ${stats[3]}`);
  console.log('Demo accounts seeded. Admin email:', SEED_ADMIN_EMAIL);
  console.log('Set ADMIN_INITIAL_PASSWORD in environment before running seed in production.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
