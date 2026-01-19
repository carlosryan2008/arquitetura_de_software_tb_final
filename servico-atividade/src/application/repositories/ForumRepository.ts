import { prismaClient } from '../libs/prismaClient';

export interface CreateForumData {
  courseId: string;
  name: string;
  description?: string;
}

export class ForumRepository {
  async create(data: CreateForumData) {
    return await prismaClient.forum.create({
      data,
      include: {
        topics: {
          include: {
            posts: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prismaClient.forum.findUnique({
      where: { id },
      include: {
        topics: {
          include: {
            posts: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async findByCourseId(courseId: string) {
    return await prismaClient.forum.findMany({
      where: { courseId },
      include: {
        topics: {
          include: {
            posts: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
}

