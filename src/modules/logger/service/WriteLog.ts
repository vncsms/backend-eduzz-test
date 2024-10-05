import { inject, injectable } from "tsyringe";
import LoggerModel from "../model/model";
import { ILoggerRepository } from "../repository/ILoggerRepository";

export interface IRequest {
    level: string,
    request: string,
    response: string,
    error: string
}

@injectable()
export class GetExecutionPrice {
    constructor(
        @inject("LoggerRepository") private loggerRepository: ILoggerRepository,
    ) {}

    public execute = async ({level, request, response, error}: IRequest): Promise<LoggerModel> => {
        return this.loggerRepository.create({level, request, response, error});
    }
}
