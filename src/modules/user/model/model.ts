import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';


export default interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id?: number;
    name: string;
    password: string;
    email: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}