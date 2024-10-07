import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { createTransactionValidation } from "../validation/transaction";
import { CreateTransaction } from "../services/CreateTransaction";
import { transactionSerializer } from "../serializer";
import { validateBody } from "../../../shared/utils/validation";
import { jwtValidation } from "../../../shared/utils/tokenAuthenticator";

export default class TransactionController {

    public async create(request: Request, response: Response, next: NextFunction) {
        try {

            const userInfo =  jwtValidation(request);
            const validatedBody = await validateBody(createTransactionValidation, request);

            const { value } = validatedBody;
            const createTransaction = container.resolve(CreateTransaction);
            const transaction = await createTransaction.execute({ value, userId: userInfo.id });
            response.locals.data = transactionSerializer(transaction);
            response.locals.status = 200;
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}