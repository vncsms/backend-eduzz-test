import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { BaseError, UnauthorizedError } from "../../error/model/model";
import { IRequestProvider } from "../../../shared/provider/http/IRequestProvider";
import { ICryptoTransactionRepository } from "../repository/ICryptoTransactionRepository";
import { CRYPTO_API_URL } from "../../../shared/utils/settings";

export interface IRequest {
    userId: number,
    quantity: number,
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

        if (!account?.id)
            throw new UnauthorizedError();

        var quantityTotal = 0;
        var soldTransitions: number[] = [];

        const response = await this.requestProvider.sendRequest(CRYPTO_API_URL || '');

        const executionPrice = parseFloat(response.data.ticker.sell);

        const transactions = await this.cryptoTransactionRepository.listAllInvestments({accountId: account?.id});

        if (!transactions.length)
            throw new BaseError(422, 'No transactions');

        for (var i = 0 ; i < transactions.length; i++) {

            quantityTotal += transactions[i].quantity;
            soldTransitions.push(transactions[i].id || 0);

            if (quantity <= quantityTotal) {
                const diff = quantityTotal - quantity;
                quantityTotal = quantity;
                if (diff != 0) {
                    await this.cryptoTransactionRepository.create({
                        value: diff * transactions[i].executionPrice,
                        accountId: account.id,
                        quantity: diff,
                        executionPrice: transactions[i].executionPrice});
                }
                break;
            }
        }

        if (quantityTotal < quantity)
            throw new BaseError(422, 'Insufficient crypto balance');
        
        this.accountRepository.updateBalance({account, value: quantityTotal * executionPrice});

        await this.cryptoTransactionRepository.changeCryptoTransactionType({transactionsId: soldTransitions});
    }
}
