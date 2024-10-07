import { database } from "../../../shared/database/connection";
import UserModel from "../model/model";
import { ICreateUserDTO } from "./ICreateUserDTO";
import { IGetUserDTO } from "./IGetUserDTO";
import { ILoginnUserDTO } from "./ILoginUserDTO";
import { IUserRepository } from "./IUserRepository";
import { DataType } from "sequelize-typescript";


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
            name: {
                type: DataType.STRING
            },
            email: {
                type: DataType.STRING,
                unique: true,
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
        return this.userRepository.create(userData);
    }

    public async get(credentials: IGetUserDTO): Promise<UserModel | null> {
        return this.userRepository.findOne({ where: { email: credentials.email } });
    }

    public async login(credentials: ILoginnUserDTO) : Promise<UserModel | null> {
        return this.userRepository.findOne({attributes: ['id', 'name', 'email', 'password'],
            where: { email: credentials.email } });
    }
}