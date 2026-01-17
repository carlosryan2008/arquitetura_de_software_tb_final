import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { NotFound } from '../errors/NotFound';
import { LessonService } from '../services/LessonService';
import { LessonRepository } from '../repositories/LessonRepository';

const createSchema = z.object({
  userId: z.string().uuid(),
  moduleId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url(),
  duration: z.number().int().positive(),
});

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  duration: z.number().int().positive().optional(),
});

const lessonRepository = new LessonRepository();
const lessonService = new LessonService(lessonRepository);

export async function createLessonController(req: Request, res: Response) {
  try {
    const data = createSchema.parse(req.body);
    const lesson = await lessonService.create(data);
    return res.status(201).json(lesson);
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

export async function getLessonController(req: Request, res: Response) {
  try {
    const lesson = await lessonService.findById(req.params.id as string);
    return res.status(200).json(lesson);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function listLessonsController(req: Request, res: Response) {
  const userId = req.query.userId as string;
  const moduleId = req.query.moduleId as string;

  const lessons = await lessonService.list({ userId, moduleId });
  return res.status(200).json(lessons);
}

export async function updateLessonController(req: Request, res: Response) {
  try {
    const data = updateSchema.parse(req.body);
    const lesson = await lessonService.update(req.params.id as string, data);
    return res.status(200).json(lesson);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        issues: error.issues,
      });
    }
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function deleteLessonController(req: Request, res: Response) {
  try {
    await lessonService.delete(req.params.id as string);
    return res.status(204).json(null);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

