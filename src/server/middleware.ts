import express, { NextFunction, Request, response, Response } from "express";
import { BaseError } from "../modules/error/model/model";
import { container } from "tsyringe";
import { WriteLog } from "../modules/logger/service/WriteLog";

export const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, _next: NextFunction): Promise<express.Response<any, Record<string, any>>> => {
    
    const writeErrorLog = container.resolve(WriteLog);
    await writeErrorLog.execute({
        level: 'error',
        request: JSON.stringify({body: req.body, route: req.route}),
        response: '',
        error: JSON.stringify(err)
    });
    
    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({message: err.messageError});
    }

    return res.status(500).json({ message: 'Internal server error'});
}

export const successHandlerMiddleware = async (req: Request, res: Response, _next: NextFunction): Promise<express.Response<any, Record<string, any>>> => {

    const writeSuccessLog = container.resolve(WriteLog);
    await writeSuccessLog.execute({
        level: 'info',
        request: JSON.stringify({body: req.body, route: req.route}),
        response: JSON.stringify(response),
        error: ''
    });

    res.json(res.locals.data).status(res.locals.status);

    return res;
}

export const preHandlerMiddleware = async (req: Request, res: Response, _next: NextFunction) => {
    // Future log
    _next();
}
