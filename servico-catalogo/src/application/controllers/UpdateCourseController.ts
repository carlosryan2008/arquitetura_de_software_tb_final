import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { CourseNotFound } from '../errors/CourseNotFound';
import { CourseService } from '../services/CourseService';
import { CourseRepository } from '../repositories/CourseRepository';

const moduleSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    order: z.number().int().min(0),
    content: z.string().min(1),
});

const schema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    value: z.number().positive().optional(),
    category: z.string().min(1).optional(),
    level: z.string().min(1).optional(),
    duration: z.number().int().positive().optional(),
    modules: z.array(moduleSchema).optional(),
});

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

export async function updateCourseController(req: Request, res: Response) {
    try {
        const data = schema.parse(req.body);
        const course = await courseService.update(req.params.id as string, data);
        return res.status(200).json(course);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'Validation error',
                issues: error.issues,
            });
        }
        if (error instanceof CourseNotFound) {
            return res.status(404).json({
                error: 'Course not found.',
            });
        }
        throw error;
    }
}
