import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { NotFound } from '../errors/NotFound';
import { LiveSessionService } from '../services/LiveSessionService';
import { LiveSessionRepository } from '../repositories/LiveSessionRepository';

const createSchema = z.object({
  userId: z.string().uuid(),
  moduleId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  link: z.string().url(),
  duration: z.number().int().positive(),
  scheduledAt: z.string().datetime(),
});

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  link: z.string().url().optional(),
  duration: z.number().int().positive().optional(),
  scheduledAt: z.string().datetime().optional(),
});

const liveSessionRepository = new LiveSessionRepository();
const liveSessionService = new LiveSessionService(liveSessionRepository);

export async function createLiveSessionController(req: Request, res: Response) {
  try {
    const data = createSchema.parse(req.body);
    const session = await liveSessionService.create({
      ...data,
      scheduledAt: new Date(data.scheduledAt),
    });
    return res.status(201).json(session);
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

export async function getLiveSessionController(req: Request, res: Response) {
  try {
    const session = await liveSessionService.findById(req.params.id as string);
    return res.status(200).json(session);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({
        error: error.message,
      });
    }
    throw error;
  }
}

export async function listLiveSessionsController(req: Request, res: Response) {
  const userId = req.query.userId as string;
  const moduleId = req.query.moduleId as string;

  const sessions = await liveSessionService.list({ userId, moduleId });
  return res.status(200).json(sessions);
}

export async function updateLiveSessionController(req: Request, res: Response) {
  try {
    const data = updateSchema.parse(req.body);
    const updateData: any = { ...data };
    if (data.scheduledAt) {
      updateData.scheduledAt = new Date(data.scheduledAt);
    }
    const session = await liveSessionService.update(req.params.id as string, updateData);
    return res.status(200).json(session);
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

export async function deleteLiveSessionController(req: Request, res: Response) {
  try {
    await liveSessionService.delete(req.params.id as string);
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

