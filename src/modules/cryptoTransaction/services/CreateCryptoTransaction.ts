import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";
import { ICryptoTransactionRepository } from "../repository/ICryptoTransactionRepository";
import CryptoTransactionModel from "../model/model";
import { IRequestProvider } from "../../../shared/provider/http/IRequestProvider";

export interface IRequest {
    quantity: number,
    userId: number,
}

@injectable()
export class CreateTransaction {
    constructor(
        @inject("CryptoTransactionRepository") private cryptoTransactionRepository: ICryptoTransactionRepository,
        @inject("AccountRepository") private accountRepository: IAccountRepository,
        @inject("AxiosRequestProvider") private requestProvider: IRequestProvider
    ) {}

    public execute = async ({quantity, userId}: IRequest): Promise<CryptoTransactionModel> => {
        const account = await this.accountRepository.get({userId});

        if (!account?.dataValues.balance) {
            throw new UnauthorizedError();
        }

        const response = await this.requestProvider.sendRequest('https://www.mercadobitcoin.net/api/BTC/ticker/');

        const executionPrice = parseFloat(response.data.ticker.sell);

        const cryptoPrice = quantity * executionPrice;

        if (cryptoPrice > account?.dataValues.balance) {
            throw new UnauthorizedError();
        }

        if (account?.dataValues?.id) {
            const cryptoTransaction = await this.cryptoTransactionRepository.create({
                value: cryptoPrice,
                accountId: account.dataValues.id,
                quantity: quantity,
                executionPrice});
            if (cryptoTransaction) {
                await this.accountRepository.updateBalance({account, value: -cryptoPrice});
            }
            return cryptoTransaction;
        } else
            throw new UnauthorizedError();
    }
}
