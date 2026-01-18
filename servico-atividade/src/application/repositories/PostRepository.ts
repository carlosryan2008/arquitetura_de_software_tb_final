import { prismaClient } from '../libs/prismaClient';

export interface CreatePostData {
  topicId: string;
  userId: string;
  content: string;
}

export class PostRepository {
  async create(data: CreatePostData) {
    return await prismaClient.post.create({
      data,
    });
  }

  async findById(id: string) {
    return await prismaClient.post.findUnique({
      where: { id },
    });
  }

  async findByTopicId(topicId: string) {
    return await prismaClient.post.findMany({
      where: { topicId },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}

