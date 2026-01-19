import { prismaClient } from '../libs/prismaClient';

export interface CreateGradeData {
  submissionId: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  feedback?: string;
}

export class GradeRepository {
  async create(data: CreateGradeData) {
    return await prismaClient.grade.create({
      data,
      include: {
        submission: {
          include: {
            assessment: true,
          },
        },
      },
    });
  }

  async findBySubmissionId(submissionId: string) {
    return await prismaClient.grade.findUnique({
      where: { submissionId },
      include: {
        submission: {
          include: {
            assessment: true,
          },
        },
      },
    });
  }
}

