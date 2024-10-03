import AccountModel from "../model/model";
import { ICreateAccountDTO } from "./ICreateAccountDTO";

export interface IAccountRepository {
    create(accountData: ICreateAccountDTO): Promise<AccountModel>,
}