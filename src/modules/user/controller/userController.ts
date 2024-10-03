import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { createUserValidation } from "../validation/user";
import { DetailedError } from "../../error/model/model";
import { userSerializer } from "../serializer";
import { CreateUser } from "../services/CreateUser";
import { container } from "tsyringe";

export default class UserController {

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            console.log(request.body);
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
}