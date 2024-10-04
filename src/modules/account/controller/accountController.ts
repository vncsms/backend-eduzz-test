import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { jwtValidation } from "../../../shared/utils/tokenAuthenticator";
import { GetBalance } from "../service/GetBalance";
import { balanceSerializer } from "../serializer";

export default class AccountController {

    public async getBalance(request: Request, response: Response, next: NextFunction) {
        try {

            const userInfo =  jwtValidation(request);
            const getBalance = container.resolve(GetBalance);
            const balance = await getBalance.execute({userId: userInfo.id});
            response.locals.data = balanceSerializer(balance);
            response.locals.status = 200;
            next();
        } catch (err) {
            next(err);
        }
    }
}