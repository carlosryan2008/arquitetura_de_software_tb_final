import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { NotFound } from '../errors/NotFound';
import { PrivateMessageService } from '../services/PrivateMessageService';
import { PrivateMessageRepository } from '../repositories/PrivateMessageRepository';

const createMessageSchema = z.object({
  senderId: z.string().uuid(),
  receiverId: z.string().uuid(),
  courseId: z.string().uuid().optional(),
  subject: z.string().optional(),
  content: z.string().min(1),
});

const privateMessageRepository = new PrivateMessageRepository();
const privateMessageService = new PrivateMessageService(privateMessageRepository);

export async function createPrivateMessageController(req: Request, res: Response) {
  try {
    const data = createMessageSchema.parse(req.body);
    const message = await privateMessageService.create(data);
    return res.status(201).json(message);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', issues: error.issues });
    }
    throw error;
  }
}

export async function getPrivateMessageController(req: Request, res: Response) {
  try {
    const message = await privateMessageService.findById(req.params.id as string);
    return res.status(200).json(message);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({ error: error.message });
    }
    throw error;
  }
}

export async function getPrivateMessagesByUserController(req: Request, res: Response) {
  const messages = await privateMessageService.findByUserId(req.params.userId as string);
  return res.status(200).json(messages);
}

export async function markMessageAsReadController(req: Request, res: Response) {
  try {
    const message = await privateMessageService.markAsRead(req.params.id as string);
    return res.status(200).json(message);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({ error: error.message });
    }
    throw error;
  }
}

