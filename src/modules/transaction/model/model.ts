import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';


export default interface TransactionModel extends Model<InferAttributes<TransactionModel>, InferCreationAttributes<TransactionModel>> {
    id?: number;
    value: number;
    accountId?: number;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}