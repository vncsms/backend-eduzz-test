import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export default interface LoggerModel
  extends Model<
    InferAttributes<LoggerModel>,
    InferCreationAttributes<LoggerModel>
  > {
  id?: number;
  level?: string;
  request: string;
  response?: string;
  error?: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}
