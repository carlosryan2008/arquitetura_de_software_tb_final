import { prismaClient } from '../libs/prismaClient';
import { SubmissionStatus } from '../../../generated/prisma/client';

export interface CreateSubmissionData {
  assessmentId: string;
  userId: string;
  answers: Array<{
    questionId: string;
    answer: string;
  }>;
}

export class SubmissionRepository {
  async create(data: CreateSubmissionData) {
    return await prismaClient.submission.create({
      data: {
        assessmentId: data.assessmentId,
        userId: data.userId,
        answers: {
          create: data.answers.map((answer) => ({
            questionId: answer.questionId,
            answer: answer.answer,
          })),
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        grade: true,
      },
    });
  }

  async findById(id: string) {
    return await prismaClient.submission.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        grade: true,
      },
    });
  }

  async findByAssessmentId(assessmentId: string) {
    return await prismaClient.submission.findMany({
      where: { assessmentId },
      include: {
        grade: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByUserId(userId: string) {
    return await prismaClient.submission.findMany({
      where: { userId },
      include: {
        assessment: true,
        grade: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(id: string, status: SubmissionStatus) {
    return await prismaClient.submission.update({
      where: { id },
      data: {
        status,
        submittedAt: status === SubmissionStatus.PENDING ? null : new Date(),
      },
    });
  }
}

