import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";
import { ICryptoTransactionRepository } from "../repository/ICryptoTransactionRepository";
import CryptoTransactionModel from "../model/model";

export interface IRequest {
    value: number,
    userId: number,
    transactionType: number,
}

@injectable()
export class CreateTransaction {
    constructor(
        @inject("CryptoTransactionRepository") private cryptoTransactionRepository: ICryptoTransactionRepository,
        @inject("AccountRepository") private accountRepository: IAccountRepository
    ) {}

    public execute = async ({value, userId, transactionType}: IRequest): Promise<CryptoTransactionModel> => {
        const account = await this.accountRepository.get({userId});
        if (account?.dataValues?.id) {
            const cryptoTransaction = await this.cryptoTransactionRepository.create({
                value, 
                accountId: account.dataValues.id,
                quantity: 1,
                executionPrice: 1,
                transactionType});
            if (cryptoTransaction) {
                await this.accountRepository.updateBalance({account, value: -value});
            }
            return cryptoTransaction;
        } else
            throw new UnauthorizedError();
    }
}
