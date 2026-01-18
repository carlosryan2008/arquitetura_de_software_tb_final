import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { NotFound } from '../errors/NotFound';
import { AssessmentService } from '../services/AssessmentService';
import { AssessmentRepository } from '../repositories/AssessmentRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { SubmissionRepository } from '../repositories/SubmissionRepository';
import { GradeRepository } from '../repositories/GradeRepository';
import { SubmissionService } from '../services/SubmissionService';

const createAssessmentSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

const createQuestionSchema = z.object({
  assessmentId: z.string().uuid(),
  type: z.enum(['OBJECTIVE', 'ESSAY']),
  question: z.string().min(1),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
  points: z.number().positive(),
  order: z.number().int().min(0),
});

const createSubmissionSchema = z.object({
  assessmentId: z.string().uuid(),
  userId: z.string().uuid(),
  answers: z.array(z.object({
    questionId: z.string().uuid(),
    answer: z.string().min(1),
  })),
});

const assessmentRepository = new AssessmentRepository();
const questionRepository = new QuestionRepository();
const submissionRepository = new SubmissionRepository();
const gradeRepository = new GradeRepository();
const assessmentService = new AssessmentService(
  assessmentRepository,
  submissionRepository,
  questionRepository,
  gradeRepository
);
const submissionService = new SubmissionService(submissionRepository, assessmentRepository);

// Assessment
export async function createAssessmentController(req: Request, res: Response) {
  try {
    const data = createAssessmentSchema.parse(req.body);
    const assessment = await assessmentService.create({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
    return res.status(201).json(assessment);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', issues: error.issues });
    }
    throw error;
  }
}

export async function getAssessmentController(req: Request, res: Response) {
  try {
    const assessment = await assessmentService.findById(req.params.id as string);
    return res.status(200).json(assessment);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({ error: error.message });
    }
    throw error;
  }
}

export async function getAssessmentsByCourseController(req: Request, res: Response) {
  const assessments = await assessmentService.findByCourseId(req.params.courseId as string);
  return res.status(200).json(assessments);
}

// Question
export async function createQuestionController(req: Request, res: Response) {
  try {
    const data = createQuestionSchema.parse(req.body);
    const question = await questionRepository.create(data);
    return res.status(201).json(question);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', issues: error.issues });
    }
    throw error;
  }
}

export async function getQuestionsByAssessmentController(req: Request, res: Response) {
  const questions = await questionRepository.findByAssessmentId(req.params.assessmentId as string);
  return res.status(200).json(questions);
}

// Submission
export async function createSubmissionController(req: Request, res: Response) {
  try {
    const data = createSubmissionSchema.parse(req.body);
    const submission = await submissionService.create(data);
    
    // Processa correção automática
    const grade = await assessmentService.submitAssessment(submission.id);
    
    return res.status(201).json({
      ...submission,
      grade,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', issues: error.issues });
    }
    if (error instanceof NotFound) {
      return res.status(404).json({ error: error.message });
    }
    if (error instanceof Error && error.message.includes('not available')) {
      return res.status(403).json({ error: error.message });
    }
    throw error;
  }
}

export async function getSubmissionController(req: Request, res: Response) {
  try {
    const submission = await submissionService.findById(req.params.id as string);
    return res.status(200).json(submission);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({ error: error.message });
    }
    throw error;
  }
}

export async function getSubmissionsByAssessmentController(req: Request, res: Response) {
  const submissions = await submissionService.findByAssessmentId(req.params.assessmentId as string);
  return res.status(200).json(submissions);
}

export async function getSubmissionsByUserController(req: Request, res: Response) {
  const submissions = await submissionService.findByUserId(req.params.userId as string);
  return res.status(200).json(submissions);
}

