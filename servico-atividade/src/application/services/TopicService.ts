import { NotFound } from '../errors/NotFound';
import { TopicRepository, CreateTopicData } from '../repositories/TopicRepository';

export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async create(data: CreateTopicData) {
    return await this.topicRepository.create(data);
  }

  async findById(id: string) {
    const topic = await this.topicRepository.findById(id);
    if (!topic) {
      throw new NotFound('Topic');
    }
    return topic;
  }

  async findByForumId(forumId: string) {
    return await this.topicRepository.findByForumId(forumId);
  }
}

