import express, { NextFunction, Request, Response } from "express";
import { DetailedError } from "../modules/error/model/model";

export const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, _next: NextFunction): Promise<express.Response<any, Record<string, any>>> => {
    if (err instanceof DetailedError) {
        // Future Log
        return res.status(err.statusCode)
        .json({status: 'error', message: err.schemaErrors});
    }

    return res.status(500).json({ error: 'error', message: 'Internal server error'});
}

export const successHandlerMiddleware = async (req: Request, res: Response, _next: NextFunction): Promise<express.Response<any, Record<string, any>>> => {
    res.json(res.locals.data).status(res.locals.status);
    // Future Log
    return res;
}
