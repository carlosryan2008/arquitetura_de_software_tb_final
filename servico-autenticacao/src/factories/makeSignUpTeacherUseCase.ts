import { SignUpTeacherUseCase } from '../application/useCases/SignUpTeacherUseCase';

export function makeSignUpTeacherUseCase() {
  const SALT = 10;

  return new SignUpTeacherUseCase(SALT);
}
