import express from 'express';

import { routeAdapter } from './adapters/routeAdapter';

import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '../factories/makeAuthorizationMiddleware';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignUpTeacherController } from '../factories/makeSignUpTeacherController';
import { middlewareAdapter } from './adapters/middlewareAdapter';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.post('/sign-up/teacher',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
  routeAdapter(makeSignUpTeacherController())
);

// Rotas de leads removidas

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
});
