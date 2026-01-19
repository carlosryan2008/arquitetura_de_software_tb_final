import { prismaClient } from '../libs/prismaClient';

export interface CreateLiveSessionData {
  userId: string;
  moduleId: string;
  name: string;
  description?: string;
  link: string;
  duration: number;
  scheduledAt: Date;
}

export interface UpdateLiveSessionData {
  name?: string;
  description?: string;
  link?: string;
  duration?: number;
  scheduledAt?: Date;
}

export interface ListLiveSessionsFilters {
  userId?: string;
  moduleId?: string;
}

export class LiveSessionRepository {
  async create(data: CreateLiveSessionData) {
    return await prismaClient.liveSession.create({
      data,
    });
  }

  async findById(id: string) {
    return await prismaClient.liveSession.findUnique({
      where: { id },
    });
  }

  async list(filters: ListLiveSessionsFilters) {
    const where: any = {};
    if (filters.userId) where.userId = filters.userId;
    if (filters.moduleId) where.moduleId = filters.moduleId;

    return await prismaClient.liveSession.findMany({
      where,
      orderBy: {
        scheduledAt: 'asc',
      },
    });
  }

  async update(id: string, data: UpdateLiveSessionData) {
    return await prismaClient.liveSession.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prismaClient.liveSession.delete({
      where: { id },
    });
  }
}

