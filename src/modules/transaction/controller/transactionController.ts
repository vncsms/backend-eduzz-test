import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { createTransactionValidation } from "../validation/transaction";
import { CreateTransaction } from "../services/CreateTransaction";
import { transactionSerializer } from "../serializer";
import { validateBody } from "../../../shared/utils/validation";

export default class TransactionController {

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            var token = request.headers.authorization;
            token = token?.split(' ')[1] || '';
            const arrayToken = token?.split('.');
            const tokenPayload = JSON.parse(atob(arrayToken[1]));

            const validatedBody = await validateBody(createTransactionValidation, request);

            const { value, transactionType } = validatedBody;
            const createTransaction = container.resolve(CreateTransaction);
            const transaction = await createTransaction.execute({ value, userId: tokenPayload.id, transactionType });
            response.locals.data = transactionSerializer(transaction);
            response.locals.status = 200;
            next();
        } catch (err) {
            next(err);
        }
    }
}