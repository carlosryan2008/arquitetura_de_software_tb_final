import { NotFound } from '../errors/NotFound';
import { LessonRepository, CreateLessonData, UpdateLessonData, ListLessonsFilters } from '../repositories/LessonRepository';

export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async create(data: CreateLessonData) {
    return await this.lessonRepository.create(data);
  }

  async findById(id: string) {
    const lesson = await this.lessonRepository.findById(id);
    if (!lesson) {
      throw new NotFound('Lesson');
    }
    return lesson;
  }

  async list(filters: ListLessonsFilters) {
    return await this.lessonRepository.list(filters);
  }

  async update(id: string, data: UpdateLessonData) {
    const lessonExists = await this.lessonRepository.findById(id);
    if (!lessonExists) {
      throw new NotFound('Lesson');
    }
    return await this.lessonRepository.update(id, data);
  }

  async delete(id: string) {
    const lessonExists = await this.lessonRepository.findById(id);
    if (!lessonExists) {
      throw new NotFound('Lesson');
    }
    return await this.lessonRepository.delete(id);
  }
}

