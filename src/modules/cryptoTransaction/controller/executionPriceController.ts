import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { executionPriceSerializer } from "../serializer";
import { jwtValidation } from "../../../shared/utils/tokenAuthenticator";
import { GetExecutionPrice } from "../services/GetExecutionPriceCryptoTransaction";

export default class ExecutionPriceController {

    public async get(request: Request, response: Response, next: NextFunction) {
        try {

            const userInfo =  jwtValidation(request);
            const getExecutionPrice = container.resolve(GetExecutionPrice);
            const executionPrice = await getExecutionPrice.execute({userId: userInfo.id });
            response.locals.data = executionPriceSerializer(executionPrice);
            response.locals.status = 200;
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}