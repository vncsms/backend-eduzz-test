import { database } from "../../../shared/database/connection";
import { DataType } from "sequelize-typescript";
import { ITransactionRepository } from "./ITransactionRepository";
import TransactionModel from "../model/model";
import { ICreateTransactionDTO } from "./ICreateTransactionDTO";

export class TransactionRepository implements ITransactionRepository {
    private transactionRepository;

    constructor() {
        this.transactionRepository = database.define<TransactionModel>('transaction_table', {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            value: {
                type: DataType.NUMBER
            },
            accountId: {
                type: DataType.NUMBER
            },
            transactionType: {
                type: DataType.NUMBER
            },
            createdAt: {
                type: DataType.DATE,
                allowNull: true
            },
            updatedAt: {
                type: DataType.DATE,
                allowNull: true
            }
        });
    }

    public async create(transactionData: ICreateTransactionDTO): Promise<TransactionModel> {
        return this.transactionRepository.create(transactionData);
    }
}