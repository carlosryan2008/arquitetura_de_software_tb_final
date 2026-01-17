import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';
import { CourseRepository } from '../repositories/CourseRepository';

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

export async function listCoursesController(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const category = req.query.category as string;
    const level = req.query.level as string;
    const teacherId = req.query.teacherId as string;

    const result = await courseService.list({
        page,
        limit,
        category,
        level,
        teacherId,
    });

    return res.status(200).json(result);
}
