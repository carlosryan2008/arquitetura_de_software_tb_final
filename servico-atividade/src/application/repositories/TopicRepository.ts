import { prismaClient } from '../libs/prismaClient';

export interface CreateTopicData {
  forumId: string;
  userId: string;
  title: string;
  content: string;
}

export class TopicRepository {
  async create(data: CreateTopicData) {
    return await prismaClient.topic.create({
      data,
      include: {
        posts: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prismaClient.topic.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async findByForumId(forumId: string) {
    return await prismaClient.topic.findMany({
      where: { forumId },
      include: {
        posts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

