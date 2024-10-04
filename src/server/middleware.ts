import express, { NextFunction, Request, Response } from "express";
import { BaseError } from "../modules/error/model/model";

export const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, _next: NextFunction): Promise<express.Response<any, Record<string, any>>> => {
    if (err instanceof BaseError) {
        // Future Log
        return res.status(err.statusCode)
        .json({status: err.messageError, message: err.messageError});
    }

    return res.status(500).json({ error: 'error', message: 'Internal server error'});
}

export const successHandlerMiddleware = async (req: Request, res: Response, _next: NextFunction): Promise<express.Response<any, Record<string, any>>> => {
    res.json(res.locals.data).status(res.locals.status);
    // Future Log
    return res;
}

export const preHandlerMiddleware = async (req: Request, res: Response, _next: NextFunction) => {
    // Future log
    _next();
}
