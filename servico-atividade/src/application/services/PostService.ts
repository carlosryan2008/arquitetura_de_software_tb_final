import { NotFound } from '../errors/NotFound';
import { PostRepository, CreatePostData } from '../repositories/PostRepository';

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(data: CreatePostData) {
    return await this.postRepository.create(data);
  }

  async findById(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFound('Post');
    }
    return post;
  }

  async findByTopicId(topicId: string) {
    return await this.postRepository.findByTopicId(topicId);
  }
}

