import { NotFound } from '../errors/NotFound';
import { PrivateMessageRepository, CreatePrivateMessageData } from '../repositories/PrivateMessageRepository';

export class PrivateMessageService {
  constructor(private readonly privateMessageRepository: PrivateMessageRepository) {}

  async create(data: CreatePrivateMessageData) {
    return await this.privateMessageRepository.create(data);
  }

  async findById(id: string) {
    const message = await this.privateMessageRepository.findById(id);
    if (!message) {
      throw new NotFound('PrivateMessage');
    }
    return message;
  }

  async findByUserId(userId: string) {
    return await this.privateMessageRepository.findByUserId(userId);
  }

  async markAsRead(id: string) {
    const message = await this.privateMessageRepository.findById(id);
    if (!message) {
      throw new NotFound('PrivateMessage');
    }
    return await this.privateMessageRepository.markAsRead(id);
  }
}

