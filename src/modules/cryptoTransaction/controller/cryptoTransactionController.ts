import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransaction } from "../services/CreateCryptoTransaction";
import { cryptoTransactionSerializer } from "../serializer";
import { validateBody } from "../../../shared/utils/validation";
import { jwtValidation } from "../../../shared/utils/tokenAuthenticator";
import { createCryptoTransactionValidation } from "../validation/transaction";

export default class CryptoTransactionController {

    public async create(request: Request, response: Response, next: NextFunction) {
        try {

            const userInfo =  jwtValidation(request);
            const validatedBody = await validateBody(createCryptoTransactionValidation, request);

            const { value, transactionType } = validatedBody;
            const createCryptoTransaction = container.resolve(CreateTransaction);
            const cryptoTransaction = await createCryptoTransaction.execute({ value, userId: userInfo.id, transactionType });
            response.locals.data = cryptoTransactionSerializer(cryptoTransaction);
            response.locals.status = 200;
            next();
        } catch (err) {
            next(err);
        }
    }
}