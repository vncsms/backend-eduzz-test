import { database } from "../../../shared/database/connection";
import UserModel from "../model/model";
import { ICreateUserDTO } from "./ICreateUserDTO";
import { IUserRepository } from "./IUserRepository";
import { DataType, UpdatedAt } from "sequelize-typescript";


export class UserRepository implements IUserRepository {
    private userRepository;

    constructor() {
        this.userRepository = database.define<UserModel>('user_table', {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                type: DataType.STRING
            },
            email: {
                type: DataType.STRING
            },
            password: {
                type: DataType.STRING
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

    public async create(userData: ICreateUserDTO): Promise<UserModel> {
        const res = this.userRepository.create(userData);
        console.log(res);
        return res;
    }
}