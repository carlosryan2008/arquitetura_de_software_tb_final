import { NotFound } from '../errors/NotFound';
import { LiveSessionRepository, CreateLiveSessionData, UpdateLiveSessionData, ListLiveSessionsFilters } from '../repositories/LiveSessionRepository';

export class LiveSessionService {
  constructor(private readonly liveSessionRepository: LiveSessionRepository) {}

  async create(data: CreateLiveSessionData) {
    return await this.liveSessionRepository.create(data);
  }

  async findById(id: string) {
    const session = await this.liveSessionRepository.findById(id);
    if (!session) {
      throw new NotFound('LiveSession');
    }
    return session;
  }

  async list(filters: ListLiveSessionsFilters) {
    return await this.liveSessionRepository.list(filters);
  }

  async update(id: string, data: UpdateLiveSessionData) {
    const sessionExists = await this.liveSessionRepository.findById(id);
    if (!sessionExists) {
      throw new NotFound('LiveSession');
    }
    return await this.liveSessionRepository.update(id, data);
  }

  async delete(id: string) {
    const sessionExists = await this.liveSessionRepository.findById(id);
    if (!sessionExists) {
      throw new NotFound('LiveSession');
    }
    return await this.liveSessionRepository.delete(id);
  }
}

