import { NotFound } from '../errors/NotFound';
import { AssessmentRepository, CreateAssessmentData } from '../repositories/AssessmentRepository';
import { SubmissionRepository } from '../repositories/SubmissionRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { GradeRepository } from '../repositories/GradeRepository';
import { SubmissionStatus } from '../../../generated/prisma/client';

export class AssessmentService {
  constructor(
    private readonly assessmentRepository: AssessmentRepository,
    private readonly submissionRepository: SubmissionRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly gradeRepository: GradeRepository
  ) {}

  async create(data: CreateAssessmentData) {
    return await this.assessmentRepository.create(data);
  }

  async findById(id: string) {
    const assessment = await this.assessmentRepository.findById(id);
    if (!assessment) {
      throw new NotFound('Assessment');
    }
    return assessment;
  }

  async findByCourseId(courseId: string) {
    return await this.assessmentRepository.findByCourseId(courseId);
  }

  async submitAssessment(submissionId: string) {
    const submission = await this.submissionRepository.findById(submissionId);
    if (!submission) {
      throw new NotFound('Submission');
    }

    // Marca como submetida
    await this.submissionRepository.updateStatus(submissionId, SubmissionStatus.PENDING);

    // Correção automática
    const questions = await this.questionRepository.findByAssessmentId(submission.assessmentId);
    let totalScore = 0;
    let maxScore = 0;

    for (const question of questions) {
      maxScore += question.points;
      const answer = submission.answers.find(a => a.questionId === question.id);
      
      if (answer && question.type === 'OBJECTIVE' && question.correctAnswer) {
        if (answer.answer.trim().toUpperCase() === question.correctAnswer.trim().toUpperCase()) {
          totalScore += question.points;
        }
      }
    }

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // Cria a nota
    const grade = await this.gradeRepository.create({
      submissionId,
      totalScore,
      maxScore,
      percentage,
    });

    // Atualiza status da submissão
    await this.submissionRepository.updateStatus(submissionId, SubmissionStatus.GRADED);

    return grade;
  }
}

