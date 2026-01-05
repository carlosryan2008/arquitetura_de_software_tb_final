import { SignUpTeacherController } from '../application/controllers/SignUpTeacherController';
import { makeSignUpTeacherUseCase } from './makeSignUpTeacherUseCase';

export function makeSignUpTeacherController() {
  const signUpTeacherUseCase = makeSignUpTeacherUseCase();

  return new SignUpTeacherController(signUpTeacherUseCase);
}
