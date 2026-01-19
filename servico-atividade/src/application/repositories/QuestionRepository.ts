import { prismaClient } from '../libs/prismaClient';
import { QuestionType } from '../../../generated/prisma/client';

export interface CreateQuestionData {
  assessmentId: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  order: number;
}

export class QuestionRepository {
  async create(data: CreateQuestionData) {
    return await prismaClient.question.create({
      data,
    });
  }

  async findById(id: string) {
    return await prismaClient.question.findUnique({
      where: { id },
    });
  }

  async findByAssessmentId(assessmentId: string) {
    return await prismaClient.question.findMany({
      where: { assessmentId },
      orderBy: {
        order: 'asc',
      },
    });
  }
}

