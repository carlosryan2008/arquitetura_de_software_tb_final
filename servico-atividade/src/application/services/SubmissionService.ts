import { NotFound } from '../errors/NotFound';
import { SubmissionRepository, CreateSubmissionData } from '../repositories/SubmissionRepository';
import { AssessmentRepository } from '../repositories/AssessmentRepository';

export class SubmissionService {
  constructor(
    private readonly submissionRepository: SubmissionRepository,
    private readonly assessmentRepository: AssessmentRepository
  ) {}

  async create(data: CreateSubmissionData) {
    // Verifica se a avaliação existe
    const assessment = await this.assessmentRepository.findById(data.assessmentId);
    if (!assessment) {
      throw new NotFound('Assessment');
    }

    // Verifica se está dentro do prazo
    const now = new Date();
    if (now < assessment.startDate || now > assessment.endDate) {
      throw new Error('Assessment is not available at this time');
    }

    return await this.submissionRepository.create(data);
  }

  async findById(id: string) {
    const submission = await this.submissionRepository.findById(id);
    if (!submission) {
      throw new NotFound('Submission');
    }
    return submission;
  }

  async findByAssessmentId(assessmentId: string) {
    return await this.submissionRepository.findByAssessmentId(assessmentId);
  }

  async findByUserId(userId: string) {
    return await this.submissionRepository.findByUserId(userId);
  }
}

