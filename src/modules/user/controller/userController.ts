import { NextFunction, Request, Response } from "express";
import { createUserValidation, loginUserValidation } from "../validation/user";
import { UnauthorizedError } from "../../error/model/model";
import { authSerializer, userSerializer } from "../serializer";
import { CreateUser } from "../services/CreateUser";
import { container } from "tsyringe";
import { LoginUser } from "../services/LoginUser";
import { validateBody } from "../../../shared/utils/validation";

export default class UserController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const validatedBody = await validateBody(createUserValidation, request);
      const { nome, password, email } = validatedBody;
      const createUser = container.resolve(CreateUser);
      const user = await createUser.execute({ nome, password, email });
      response.locals.data = userSerializer(user);
      response.locals.status = 200;
      next();
    } catch (err) {
      next(err);
    }
  }

  public async login(request: Request, response: Response, next: NextFunction) {
    try {
      const validatedBody = await validateBody(loginUserValidation, request);

      const { password, email } = validatedBody;
      const loginUser = container.resolve(LoginUser);
      const auth = await loginUser.execute({ password, email });
      if (auth) {
        response.locals.data = authSerializer(auth);
        response.locals.status = 200;
      } else {
        throw new UnauthorizedError();
      }

      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
