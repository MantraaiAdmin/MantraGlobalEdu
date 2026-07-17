import { Response, NextFunction, Request } from 'express';
import { contactSchema, counselingBookingSchema, costEstimateSchema } from '@mge/shared';
import { NotFoundError } from '@mge/shared';
import { validateBody } from '../../middlewares/validate.middleware';
import { sendSuccess, sendCreated } from '../../shared/utils/response';
import { calculateCostEstimate } from '@mge/utils';
import { prisma } from '../../database/prisma';

async function createCounselingBookingRecord(body: {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  countryOfInterest?: string;
  message?: string;
}) {
  const preferredDate = body.preferredDate ? new Date(body.preferredDate) : null;

  const booking = await prisma.counselingBooking.create({
    data: {
      ...body,
      email: body.email.toLowerCase(),
      preferredDate: preferredDate ?? undefined,
    },
  });

  await prisma.lead.create({
    data: {
      name: body.name,
      email: body.email.toLowerCase(),
      phone: body.phone,
      source: 'Book Counseling',
      status: 'NEW',
      countryOfInterest: body.countryOfInterest || null,
      notes: [
        preferredDate ? `Preferred slot: ${preferredDate.toISOString()}` : null,
        body.message ? `Notes: ${body.message}` : null,
        `Booking ID: ${booking.id}`,
      ]
        .filter(Boolean)
        .join('\n'),
      assignedTo: 'vinodhini@mantraglobaledu.com',
    },
  });

  return booking;
}

export class PublicController {
  submitContact = [
    validateBody(contactSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const inquiry = await prisma.contactInquiry.create({ data: req.body });
        sendCreated(res, inquiry, 'Message sent successfully');
      } catch (error) {
        next(error);
      }
    },
  ];

  bookCounseling = [
    validateBody(counselingBookingSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const booking = await createCounselingBookingRecord(req.body);
        sendCreated(res, booking, 'Counseling session booked successfully');
      } catch (error) {
        next(error);
      }
    },
  ];

  estimateCost = [
    validateBody(costEstimateSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const estimate = calculateCostEstimate(req.body);
        sendSuccess(res, estimate);
      } catch (error) {
        next(error);
      }
    },
  ];

  getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = req.query.category as string | undefined;
      const articles = await prisma.contentArticle.findMany({
        where: { isPublished: true, ...(category ? { category } : {}) },
        orderBy: { publishedAt: 'desc' },
        take: 20,
      });
      sendSuccess(res, articles);
    } catch (error) {
      next(error);
    }
  };

  getArticleBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await prisma.contentArticle.findFirst({
        where: { slug: String(req.params.slug), isPublished: true },
      });
      if (!article) {
        throw new NotFoundError('Article');
      }
      sendSuccess(res, article);
    } catch (error) {
      next(error);
    }
  };
}

export const publicController = new PublicController();
