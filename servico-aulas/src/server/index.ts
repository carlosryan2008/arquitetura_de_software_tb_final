import express from 'express';
import cors from 'cors';
import { env } from '../application/config/env';
import {
  createLessonController,
  getLessonController,
  listLessonsController,
  updateLessonController,
  deleteLessonController,
} from '../application/controllers/LessonController';
import {
  createLiveSessionController,
  getLiveSessionController,
  listLiveSessionsController,
  updateLiveSessionController,
  deleteLiveSessionController,
} from '../application/controllers/LiveSessionController';

const app = express();

app.use(express.json());
app.use(cors());

// Rotas de Aulas (Lessons)
app.get('/lessons', listLessonsController);
app.get('/lessons/:id', getLessonController);
app.post('/lessons', createLessonController);
app.put('/lessons/:id', updateLessonController);
app.delete('/lessons/:id', deleteLessonController);

// Rotas de Sessões ao Vivo (Live Sessions)
app.get('/live-sessions', listLiveSessionsController);
app.get('/live-sessions/:id', getLiveSessionController);
app.post('/live-sessions', createLiveSessionController);
app.put('/live-sessions/:id', updateLiveSessionController);
app.delete('/live-sessions/:id', deleteLiveSessionController);

app.listen(parseInt(env.port), () => {
  console.log(`Serviço de Conteúdo de Aulas rodando na porta ${env.port}`);
});

