import { NotFound } from '../errors/NotFound';
import { ForumRepository, CreateForumData } from '../repositories/ForumRepository';

export class ForumService {
  constructor(private readonly forumRepository: ForumRepository) {}

  async create(data: CreateForumData) {
    return await this.forumRepository.create(data);
  }

  async findById(id: string) {
    const forum = await this.forumRepository.findById(id);
    if (!forum) {
      throw new NotFound('Forum');
    }
    return forum;
  }

  async findByCourseId(courseId: string) {
    return await this.forumRepository.findByCourseId(courseId);
  }
}

