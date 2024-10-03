import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repository/IUserRepository";
import { UserRepository } from "../../modules/user/repository/user";
import { ITransactionRepository } from "../../modules/transaction/repository/ITransactionRepository";
import { TransactionRepository } from "../../modules/transaction/repository/transaction";
import { IAccountRepository } from "../../modules/account/repository/IAccountRepository";
import { AccountRepository } from "../../modules/account/repository/account";

container.registerInstance<IUserRepository>('UserRepository', new UserRepository());
container.registerInstance<ITransactionRepository>('TransactionRepository', new TransactionRepository());
container.registerInstance<IAccountRepository>('AccountRepository', new AccountRepository());