import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { CourseService } from '../services/CourseService';
import { CourseRepository } from '../repositories/CourseRepository';

const moduleSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    order: z.number().int().min(0),
    content: z.string().min(1),
});

const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    value: z.number().positive(),
    teacherId: z.string().uuid(),
    category: z.string().min(1),
    level: z.string().min(1),
    duration: z.number().int().positive(),
    modules: z.array(moduleSchema).min(1),
});

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

export async function createCourseController(req: Request, res: Response) {
    try {
        const data = schema.parse(req.body);
        const course = await courseService.create(data);
        return res.status(201).json(course);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'Validation error',
                issues: error.issues,
            });
        }
        throw error;
    }
}
