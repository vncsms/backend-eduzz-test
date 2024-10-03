import { NextFunction, Request, Response } from "express";
import { createUserValidation, loginUserValidation } from "../validation/user";
import { DetailedError } from "../../error/model/model";
import { authSerializer, userSerializer } from "../serializer";
import { CreateUser } from "../services/CreateUser";
import { container } from "tsyringe";
import { LoginUser } from "../services/LoginUser";

export default class UserController {

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validateBody = await createUserValidation.validate(request.body, { abortEarly: false }).catch(errors => {
                const schemaErrors = errors.inner.map((err: any) => {
                    return { field: err.path, message: err.message };
                })
                throw new DetailedError (
                    409,
                    schemaErrors
                )
            })

            const { nome, password, email } = validateBody;
            const createUser = container.resolve(CreateUser);
            const user = await createUser.execute({nome, password, email});
            response.locals.data = userSerializer(user);
            response.locals.status = 200;
            next();
        } catch (err) {
            next(err);
        }
    }

    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const validateBody = await loginUserValidation.validate(request.body, { abortEarly: false }).catch(errors => {
                const schemaErrors = errors.inner.map((err: any) => {
                    return { field: err.path, message: err.message };
                })
                throw new DetailedError (
                    409,
                    schemaErrors
                )
            })

            const { password, email } = validateBody;
            const loginUser = container.resolve(LoginUser);
            const auth = await loginUser.execute({password, email});
            if (auth) {
                response.locals.data = authSerializer(auth);
                response.locals.status = 200;
            } else {
                response.locals.data = { data: 'Auth Error'};
                response.locals.status = 401;
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}