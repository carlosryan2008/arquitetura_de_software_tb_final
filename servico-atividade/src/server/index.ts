import express from 'express';
import cors from 'cors';
import { env } from '../application/config/env';
import {
  createForumController,
  getForumController,
  getForumsByCourseController,
  createTopicController,
  getTopicController,
  getTopicsByForumController,
  createPostController,
  getPostsByTopicController,
} from '../application/controllers/ForumController';
import {
  createPrivateMessageController,
  getPrivateMessageController,
  getPrivateMessagesByUserController,
  markMessageAsReadController,
} from '../application/controllers/PrivateMessageController';
import {
  createAssessmentController,
  getAssessmentController,
  getAssessmentsByCourseController,
  createQuestionController,
  getQuestionsByAssessmentController,
  createSubmissionController,
  getSubmissionController,
  getSubmissionsByAssessmentController,
  getSubmissionsByUserController,
} from '../application/controllers/AssessmentController';

const app = express();

app.use(express.json());
app.use(cors());

// Rotas de Fóruns
app.post('/forums', createForumController);
app.get('/forums/:id', getForumController);
app.get('/courses/:courseId/forums', getForumsByCourseController);

// Rotas de Tópicos
app.post('/topics', createTopicController);
app.get('/topics/:id', getTopicController);
app.get('/forums/:forumId/topics', getTopicsByForumController);

// Rotas de Postagens
app.post('/posts', createPostController);
app.get('/topics/:topicId/posts', getPostsByTopicController);

// Rotas de Mensagens Privadas
app.post('/private-messages', createPrivateMessageController);
app.get('/private-messages/:id', getPrivateMessageController);
app.get('/users/:userId/private-messages', getPrivateMessagesByUserController);
app.patch('/private-messages/:id/read', markMessageAsReadController);

// Rotas de Avaliações
app.post('/assessments', createAssessmentController);
app.get('/assessments/:id', getAssessmentController);
app.get('/courses/:courseId/assessments', getAssessmentsByCourseController);

// Rotas de Questões
app.post('/questions', createQuestionController);
app.get('/assessments/:assessmentId/questions', getQuestionsByAssessmentController);

// Rotas de Submissões
app.post('/submissions', createSubmissionController);
app.get('/submissions/:id', getSubmissionController);
app.get('/assessments/:assessmentId/submissions', getSubmissionsByAssessmentController);
app.get('/users/:userId/submissions', getSubmissionsByUserController);

app.listen(parseInt(env.port), () => {
  console.log(`Serviço de Atividades e Comunicação rodando na porta ${env.port}`);
});

