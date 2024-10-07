import AccountModel from "../model/model";
import { ICreateAccountDTO } from "./ICreateAccountDTO";
import { IGetAccountDTO } from "./IGetAccountDTO";
import { IUpdateAccountDTO } from "./IUpdateAccountDTO";

export interface IAccountRepository {
  create(accountData: ICreateAccountDTO): Promise<AccountModel>;
  get(userData: IGetAccountDTO): Promise<AccountModel | null>;
  updateBalance(accountData: IUpdateAccountDTO): Promise<AccountModel>;
}
