import { prismaClient } from '../libs/prismaClient';

export interface CreateAssessmentData {
  courseId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

export class AssessmentRepository {
  async create(data: CreateAssessmentData) {
    return await prismaClient.assessment.create({
      data,
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prismaClient.assessment.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        submissions: {
          include: {
            grade: true,
          },
        },
      },
    });
  }

  async findByCourseId(courseId: string) {
    return await prismaClient.assessment.findMany({
      where: { courseId },
      include: {
        questions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

