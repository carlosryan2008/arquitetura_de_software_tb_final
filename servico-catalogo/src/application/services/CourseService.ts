import { CourseNotFound } from '../errors/CourseNotFound';
import { CourseRepository, CreateCourseData, UpdateCourseData, ListCoursesFilters } from '../repositories/CourseRepository';

export class CourseService {
    constructor(private readonly courseRepository: CourseRepository) { }

    async create(data: CreateCourseData) {
        return await this.courseRepository.create(data);
    }

    async findById(id: string) {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new CourseNotFound();
        }
        return course;
    }

    async list(filters: ListCoursesFilters) {
        const { courses, total } = await this.courseRepository.list(filters);
        return {
            courses,
            total,
            page: filters.page || 1,
            limit: filters.limit || 10,
        };
    }

    async update(id: string, data: UpdateCourseData) {
        const courseExists = await this.courseRepository.findById(id);
        if (!courseExists) {
            throw new CourseNotFound();
        }
        return await this.courseRepository.update(id, data);
    }

    async delete(id: string) {
        const courseExists = await this.courseRepository.findById(id);
        if (!courseExists) {
            throw new CourseNotFound();
        }
        return await this.courseRepository.delete(id);
    }
}

