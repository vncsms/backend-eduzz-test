import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";
import { IRequestProvider } from "../../../shared/provider/http/IRequestProvider";
import { ICryptoTransactionRepository } from "../repository/ICryptoTransactionRepository";

export interface IRequest {
    userId: number,
    quantity: number,
}

export interface IResponse {
    quantity: number,
    balance: number,
}

@injectable()
export class SellCryptoTransaction {
    constructor(
        @inject("AccountRepository") private accountRepository: IAccountRepository,
        @inject("AxiosRequestProvider") private requestProvider: IRequestProvider,
        @inject("CryptoTransactionRepository") private cryptoTransactionRepository: ICryptoTransactionRepository,
    ) {}

    public execute = async ({userId, quantity}: IRequest): Promise<any> => {
        const account = await this.accountRepository.get({userId});

        if (!account?.dataValues.id) {
            throw new UnauthorizedError();
        }

        var quantityTotal = 0;
        var soldTransitions: number[] = [];

        const response = await this.requestProvider.sendRequest('https://www.mercadobitcoin.net/api/BTC/ticker/');

        const executionPrice = parseFloat(response.data.ticker.sell);

        const transactions = await this.cryptoTransactionRepository.listAllInvestments({accountId: account?.dataValues.id});

        for (var i = 0 ; i < transactions.length; i++) {

            quantityTotal += transactions[i].dataValues.quantity;
            soldTransitions.push(transactions[i].dataValues.id || 0);

            if (quantity <= quantityTotal  ) {
                const diff = quantityTotal - quantity;
                quantityTotal = quantity;
                await this.cryptoTransactionRepository.create({
                    value: diff * transactions[i].dataValues.executionPrice,
                    accountId: account.dataValues.id,
                    quantity: diff,
                    executionPrice: transactions[i].dataValues.executionPrice});
                break;
            }
        }
        
        this.accountRepository.updateBalance({account ,value: quantityTotal * executionPrice});

        await this.cryptoTransactionRepository.changeCryptoTransactionType({transactionsId: soldTransitions});

        return {
            quantity: quantityTotal * executionPrice,
            balance: account.balance || 0 + quantityTotal * executionPrice
        };
    }
}
