import { prismaClient } from '../libs/prismaClient';

export interface CreateLessonData {
  userId: string;
  moduleId: string;
  name: string;
  description?: string;
  url: string;
  duration: number;
}

export interface UpdateLessonData {
  name?: string;
  description?: string;
  url?: string;
  duration?: number;
}

export interface ListLessonsFilters {
  userId?: string;
  moduleId?: string;
}

export class LessonRepository {
  async create(data: CreateLessonData) {
    return await prismaClient.lesson.create({
      data,
    });
  }

  async findById(id: string) {
    return await prismaClient.lesson.findUnique({
      where: { id },
    });
  }

  async list(filters: ListLessonsFilters) {
    const where: any = {};
    if (filters.userId) where.userId = filters.userId;
    if (filters.moduleId) where.moduleId = filters.moduleId;

    return await prismaClient.lesson.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, data: UpdateLessonData) {
    return await prismaClient.lesson.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prismaClient.lesson.delete({
      where: { id },
    });
  }
}

