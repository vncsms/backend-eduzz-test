import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';


export default interface AccountModel extends Model<InferAttributes<AccountModel>, InferCreationAttributes<AccountModel>> {
    id?: number;
    balance?: number;
    userId: number;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}