import { database } from "../../../shared/database/connection";
import { DataType } from "sequelize-typescript";
import AccountModel from "../model/model";
import { IAccountRepository } from "./IAccountRepository";
import { ICreateAccountDTO } from "./ICreateAccountDTO";
import { IGetAccountDTO } from "./IGetAccountDTO";
import { IUpdateAccountDTO } from "./IUpdateAccountDTO";

export class AccountRepository implements IAccountRepository {
  private accountRepository;

  constructor() {
    this.accountRepository = database.define<AccountModel>("account_table", {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      balance: {
        type: DataType.DOUBLE,
        defaultValue: 0,
      },
      userId: {
        type: DataType.DOUBLE,
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: true,
      },
    });
  }

  public async create(accountData: ICreateAccountDTO): Promise<AccountModel> {
    return this.accountRepository.create(accountData);
  }

  public async get(userData: IGetAccountDTO): Promise<AccountModel | null> {
    return this.accountRepository.findOne({
      where: { userId: userData.userId },
    });
  }

  public async updateBalance(
    accountData: IUpdateAccountDTO,
  ): Promise<AccountModel> {
    return accountData.account.increment({ balance: accountData.value });
  }
}
