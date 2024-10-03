import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repository/IUserRepository";
import { UserRepository } from "../../modules/user/repository/user";
import { ITransactionRepository } from "../../modules/transaction/repository/ITransactionRepository";
import { TransactionRepository } from "../../modules/transaction/repository/transaction";

container.registerInstance<IUserRepository>('UserRepository', new UserRepository());
container.registerInstance<ITransactionRepository>('TransactionRepository', new TransactionRepository());