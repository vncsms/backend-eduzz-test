import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";
import { IRequestProvider } from "../../../shared/provider/http/IRequestProvider";
import CryptoTransactionModel from "../model/model";
import { ICryptoTransactionRepository } from "../repository/ICryptoTransactionRepository";
import { CRYPTO_API_URL } from "../../../shared/utils/settings";

export interface IRequest {
  userId: number;
  page: number;
  limit: number;
}

export interface IResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: ITransacation[];
}

export interface ITransacation {
  value: number;
  executionPrice: number;
  createdAt?: Date;
  percentage: number;
  newValue: number;
}

@injectable()
export class ListCryptoTransaction {
  constructor(
    @inject("AccountRepository") private accountRepository: IAccountRepository,
    @inject("AxiosRequestProvider") private requestProvider: IRequestProvider,
    @inject("CryptoTransactionRepository")
    private cryptoTransactionRepository: ICryptoTransactionRepository,
  ) {}

  public execute = async ({
    userId,
    page,
    limit,
  }: IRequest): Promise<IResponse> => {
    const account = await this.accountRepository.get({ userId });

    if (!account?.id) throw new UnauthorizedError();

    const offset = (page - 1) * limit;

    const total = await this.cryptoTransactionRepository.count({
      accountId: account?.id,
    });

    const response = await this.requestProvider.sendRequest(
      CRYPTO_API_URL || "",
    );

    const executionPriceSell = parseFloat(response.data.ticker.sell);

    const transactions = await this.cryptoTransactionRepository.list({
      accountId: account?.id,
      offset,
      limit,
    });

    const cryptoTransactions: ITransacation[] = transactions.map(
      (transaction: CryptoTransactionModel) => {
        return {
          value: transaction.value,
          executionPrice: transaction.executionPrice,
          createdAt: transaction.createdAt,
          percentage: transaction.executionPrice / executionPriceSell,
          newValue: executionPriceSell * transaction.quantity,
        };
      },
    );

    const res: IResponse = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: cryptoTransactions,
    };
    return res;
  };
}
