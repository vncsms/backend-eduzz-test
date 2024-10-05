import LoggerModel from "../model/model";
import { ICreateLoggerDTO } from "./ICreateLoggerDTO";

export interface ILoggerRepository {
    create(loggerData: ICreateLoggerDTO): Promise<LoggerModel>,
}