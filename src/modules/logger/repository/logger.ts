import { DataType } from "sequelize-typescript";
import { database } from "../../../shared/database/connection";
import LoggerModel from "../model/model";
import { ILoggerRepository } from "./ILoggerRepository";
import { ICreateLoggerDTO } from "./ICreateLoggerDTO";

export class LoggerRepository implements ILoggerRepository {
  private loggerRepository;

  constructor() {
    this.loggerRepository = database.define<LoggerModel>("logger_table", {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      level: {
        type: DataType.STRING,
      },
      error: {
        type: DataType.STRING,
      },
      request: {
        type: DataType.STRING,
      },
      response: {
        type: DataType.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: true,
      },
    });
  }

  public async create(loggerData: ICreateLoggerDTO): Promise<LoggerModel> {
    return this.loggerRepository.create(loggerData);
  }
}
