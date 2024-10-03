import { NextFunction, Request, Response } from "express";
import { DetailedError } from "../../error/model/model";
import { container } from "tsyringe";
import { createTransactionValidation } from "../validation/transaction";
import { CreateTransaction } from "../services/createTransaction";
import { transactionSerializer } from "../serializer";

export default class TransactionController {

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validateBody = await createTransactionValidation.validate(request.body, { abortEarly: false }).catch(errors => {
                const schemaErrors = errors.inner.map((err: any) => {
                    return { field: err.path, message: err.message };
                })
                throw new DetailedError (
                    409,
                    schemaErrors
                )
            })

            const { value, transactionType } = validateBody;
            const createTransaction = container.resolve(CreateTransaction);
            const transaction = await createTransaction.execute({ value, accountId: 1, transactionType });
            response.locals.data = transactionSerializer(transaction);
            response.locals.status = 200;
            next();
        } catch (err) {
            next(err);
        }
    }
}