import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repository/IUserRepository";
import { UserRepository } from "../../modules/user/repository/user";
import { ITransactionRepository } from "../../modules/transaction/repository/ITransactionRepository";
import { TransactionRepository } from "../../modules/transaction/repository/transaction";
import { IAccountRepository } from "../../modules/account/repository/IAccountRepository";
import { AccountRepository } from "../../modules/account/repository/account";
import { CryptoTransactionRepository } from "../../modules/cryptoTransaction/repository/cryptoTransaction";
import { ICryptoTransactionRepository } from "../../modules/cryptoTransaction/repository/ICryptoTransactionRepository";
import { AxiosRequestProvider } from "../provider/http/AxiosRequestProvider";
import { ILoggerRepository } from "../../modules/logger/repository/ILoggerRepository";
import { LoggerRepository } from "../../modules/logger/repository/logger";

container.registerInstance<IUserRepository>(
  "UserRepository",
  new UserRepository(),
);
container.registerInstance<ITransactionRepository>(
  "TransactionRepository",
  new TransactionRepository(),
);
container.registerInstance<ICryptoTransactionRepository>(
  "CryptoTransactionRepository",
  new CryptoTransactionRepository(),
);
container.registerInstance<IAccountRepository>(
  "AccountRepository",
  new AccountRepository(),
);
container.registerInstance<AxiosRequestProvider>(
  "AxiosRequestProvider",
  new AxiosRequestProvider(),
);
container.registerInstance<ILoggerRepository>(
  "LoggerRepository",
  new LoggerRepository(),
);
