import { Request } from "express";
import { UnauthorizedError } from "../../modules/error/model/model";
import jwt, { JwtPayload } from "jsonwebtoken";

export const jwtValidation = (req: Request): JwtPayload => {

    var bearerToken = req.headers.authorization;
    const [, token] = bearerToken?.split(' ') || ['',''];

    const userData = jwt.verify(token, 'secret');

    const userInfo = typeof userData != 'string' ? userData : {};

    if (!userInfo)
        throw new UnauthorizedError();

    // const arrayToken = token?.split('.');
    // const tokenPayload = JSON.parse(atob(arrayToken[1]));

    return userInfo;
}
