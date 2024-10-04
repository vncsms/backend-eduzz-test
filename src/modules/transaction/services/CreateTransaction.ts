import { inject, injectable } from "tsyringe";
import { ITransactionRepository } from "../repository/ITransactionRepository";
import TransactionModel from "../model/model";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";

export interface IRequest {
    value: number,
    userId: number,
    transactionType: number,
}

@injectable()
export class CreateTransaction {
    constructor(
        @inject("TransactionRepository") private transactionRepository: ITransactionRepository,
        @inject("AccountRepository") private accountRepository: IAccountRepository
    ) {}

    public execute = async ({value, userId, transactionType}: IRequest): Promise<TransactionModel> => {
        const account = await this.accountRepository.get({userId});
        if (account?.dataValues?.id) {
            const transaction = await this.transactionRepository.create({value, accountId: account.dataValues.id ,transactionType});
            if (transaction) {
                await this.accountRepository.updateBalance({account, value});
            }
            return transaction;
        } else
            throw new UnauthorizedError();
    }
}
