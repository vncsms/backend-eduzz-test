import { database } from "../../../shared/database/connection";
import { DataType, Sequelize } from "sequelize-typescript";
import CryptoTransactionModel from "../model/model";
import { ICryptoTransactionRepository } from "./ICryptoTransactionRepository";
import { ICreateCryptoTransactionDTO } from "./ICreateCryptoTransactionDTO";
import { IListCryptoTransactionDTO } from "./IListCryptoTransactionDTO";
import { ICountCryptoTransactionDTO } from "./ICountCryptoTransactionDTO";
import { IListAllCryptoTransactionDTO } from "./IListAllCryptoTransactionDTO";
import { IChangeCryptoTransactionTypeDTO } from "./IChangeCryptoTransactionType";

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
                type: DataType.NUMBER,
                defaultValue: 1,
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

    public async count(countData: ICountCryptoTransactionDTO): Promise<number> {
        return this.cryptoTransactionRepository.count({where: {accountId: countData.accountId}});
    }

    public async list(listData: IListCryptoTransactionDTO): Promise<CryptoTransactionModel[]> {
        return this.cryptoTransactionRepository.findAll({
            offset: listData.offset,
            limit: listData.limit,
            attributes: ['createdAt', 'value', 'executionPrice', 'quantity'],
            where: {accountId: listData.accountId, transactionType: 1}});
    }

    public async listAllInvestments(listData: IListAllCryptoTransactionDTO): Promise<CryptoTransactionModel[]> {
        return this.cryptoTransactionRepository.findAll({
            where: {accountId: listData.accountId, transactionType: 1}});
    }

    public async listAllRetrieves(listData: IListAllCryptoTransactionDTO): Promise<CryptoTransactionModel[]> {
        return this.cryptoTransactionRepository.findAll({
            where: {accountId: listData.accountId, transactionType: 2}});
    }

    public async changeCryptoTransactionType(updateData: IChangeCryptoTransactionTypeDTO): Promise<any> {
        return this.cryptoTransactionRepository.update(
            { transactionType : 2 },
            {
                where: {
                    id: updateData.transactionsId
                }
            }
        );
    }
}