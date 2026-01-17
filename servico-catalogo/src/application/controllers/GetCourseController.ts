import { Request, Response } from 'express';
import { CourseNotFound } from '../errors/CourseNotFound';
import { CourseService } from '../services/CourseService';
import { CourseRepository } from '../repositories/CourseRepository';

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

export async function getCourseController(req: Request, res: Response) {
    try {
        const course = await courseService.findById(req.params.id as string);
        return res.status(200).json(course);
    } catch (error) {
        if (error instanceof CourseNotFound) {
            return res.status(404).json({
                error: 'Course not found.',
            });
        }
        throw error;
    }
}
