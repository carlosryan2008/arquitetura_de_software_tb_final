import { prismaClient } from '../libs/prismaClient';

export interface CreatePrivateMessageData {
  senderId: string;
  receiverId: string;
  courseId?: string;
  subject?: string;
  content: string;
}

export class PrivateMessageRepository {
  async create(data: CreatePrivateMessageData) {
    return await prismaClient.privateMessage.create({
      data,
    });
  }

  async findById(id: string) {
    return await prismaClient.privateMessage.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return await prismaClient.privateMessage.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(id: string) {
    return await prismaClient.privateMessage.update({
      where: { id },
      data: { read: true },
    });
  }
}

