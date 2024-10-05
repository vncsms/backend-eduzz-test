import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { jwtValidation } from "../../../shared/utils/tokenAuthenticator";
import { GetBalance } from "../service/GetBalance";
import { balanceSerializer, extractSerializer } from "../serializer";
import { GetExtract } from "../service/GetExtract";

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

    public async getExtract(request: Request, response: Response, next: NextFunction) {
        try {
            const userInfo =  jwtValidation(request);

            const days = parseInt(request.query?.days as string, 90) || 90;

            const getExtract = container.resolve(GetExtract);
            const extract = await getExtract.execute({userId: userInfo.id, days});
            response.locals.data = extractSerializer(extract);
            response.locals.status = 200;
            next();
        } catch (err) {
            next(err);
        }
    }
}