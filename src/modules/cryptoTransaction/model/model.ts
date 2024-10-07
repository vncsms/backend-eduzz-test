import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';


export default interface CryptoTransactionModel extends Model<InferAttributes<CryptoTransactionModel>, InferCreationAttributes<CryptoTransactionModel>> {
    id?: number;
    value: number;
    accountId: number;
    quantity: number;
    transactionType?: number;
    executionPrice: number;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}