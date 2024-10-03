import { database } from "../../../shared/database/connection";
import { DataType } from "sequelize-typescript";
import AccountModel from "../model/model";
import { IAccountRepository } from "./IAccountRepository";
import { ICreateAccountDTO } from "./ICreateAccountDTO";

export class AccountRepository implements IAccountRepository {
    private accountRepository;

    constructor() {
        this.accountRepository = database.define<AccountModel>('account_table', {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            balance: {
                type: DataType.NUMBER,
                defaultValue: 0,
            },
            userId: {
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

    public async create(accountData: ICreateAccountDTO): Promise<AccountModel> {
        return this.accountRepository.create(accountData);
    }
}