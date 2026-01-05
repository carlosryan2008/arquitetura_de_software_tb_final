import { ZodError, z } from 'zod';

import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { SignUpTeacherUseCase } from '../useCases/SignUpTeacherUseCase';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignUpTeacherController implements IController {
  constructor(private readonly signUpTeacherUseCase: SignUpTeacherUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = schema.parse(body);

      await this.signUpTeacherUseCase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'This email is already in use.',
          },
        };
      }

      throw error;
    }
  }
}
