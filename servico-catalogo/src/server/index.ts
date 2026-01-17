import express from 'express';
import cors from 'cors';
import { env } from '../application/config/env';
import { createCourseController } from '../application/controllers/CreateCourseController';
import { getCourseController } from '../application/controllers/GetCourseController';
import { listCoursesController } from '../application/controllers/ListCoursesController';
import { updateCourseController } from '../application/controllers/UpdateCourseController';
import { deleteCourseController } from '../application/controllers/DeleteCourseController';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/courses', listCoursesController);
app.get('/courses/:id', getCourseController);
app.post('/courses', createCourseController);
app.put('/courses/:id', updateCourseController);
app.delete('/courses/:id', deleteCourseController);

app.listen(parseInt(env.port), () => {
    console.log(`Serviço de Catálogo de Cursos rodando na porta ${env.port}`);
});
