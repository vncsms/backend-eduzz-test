import { database } from "../../../shared/database/connection";
import { DataType } from "sequelize-typescript";
import { ITransactionRepository } from "./ITransactionRepository";
import TransactionModel from "../model/model";
import { ICreateTransactionDTO } from "./ICreateTransactionDTO";
import { IGetAllTransactionDTO } from "./IGetAllTransactionDTO";
import moment from "moment";
import { Op } from "sequelize";

export class TransactionRepository implements ITransactionRepository {
  private transactionRepository;

  constructor() {
    this.transactionRepository = database.define<TransactionModel>(
      "transaction_table",
      {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        value: {
          type: DataType.DOUBLE,
        },
        accountId: {
          type: DataType.INTEGER,
        },
        createdAt: {
          type: DataType.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: DataType.DATE,
          allowNull: true,
        },
      },
    );
  }

  public async create(
    transactionData: ICreateTransactionDTO,
  ): Promise<TransactionModel> {
    return this.transactionRepository.create(transactionData);
  }

  public async getAll(
    accountData: IGetAllTransactionDTO,
  ): Promise<TransactionModel[]> {
    return this.transactionRepository.findAll({
      where: {
        accountId: accountData.id,
        createdAt: {
          [Op.gte]: moment().subtract(accountData.days, "days").toDate(),
        },
      },
    });
  }
}
