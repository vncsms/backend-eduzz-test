import { database } from "../../../shared/database/connection";
import { DataType } from "sequelize-typescript";
import CryptoTransactionModel from "../model/model";
import { ICryptoTransactionRepository } from "./ICryptoTransactionRepository";
import { ICreateCryptoTransactionDTO } from "./ICreateCryptoTransactionDTO";
import { IListCryptoTransactionDTO } from "./IListCryptoTransactionDTO";

export class CryptoTransactionRepository implements ICryptoTransactionRepository {
    private cryptoTransactionRepository;

    constructor() {
        this.cryptoTransactionRepository = database.define<CryptoTransactionModel>('crypto_transaction_table', {
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
            quantity: {
                type: DataType.NUMBER
            },
            executionPrice: {
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

    public async create(cryptoTransactionData: ICreateCryptoTransactionDTO): Promise<CryptoTransactionModel> {
        return this.cryptoTransactionRepository.create(cryptoTransactionData);
    }

    public async count(countData: IListCryptoTransactionDTO): Promise<number> {
        return this.cryptoTransactionRepository.count({where: {accountId: countData.accountId}});
    }

    public async list(listData: IListCryptoTransactionDTO): Promise<CryptoTransactionModel[]> {
        return this.cryptoTransactionRepository.findAll({
            offset: 0,
            limit: 10,
            attributes: ['createdAt', 'value', 'executionPrice', 'quantity'],
            where: {accountId: listData.accountId}});
    }
}