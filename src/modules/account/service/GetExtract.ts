import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { ITransactionRepository } from "../../transaction/repository/ITransactionRepository";
import { UnauthorizedError } from "../../error/model/model";
import TransactionModel from "../../transaction/model/model";
import CryptoTransactionModel from "../../cryptoTransaction/model/model";
import { ICryptoTransactionRepository } from "../../cryptoTransaction/repository/ICryptoTransactionRepository";

export interface IRequest {
    userId: number,
    days: number
}

export interface IResponse {
    deposits: TransactionModel[],
    investments: CryptoTransactionModel[],
    cryptoSales: CryptoTransactionModel[],
}

@injectable()
export class GetExtract {
    constructor(
        @inject("AccountRepository") private accountRepository: IAccountRepository,
        @inject("TransactionRepository") private transactionRepository: ITransactionRepository,
        @inject("CryptoTransactionRepository") private cryptoTransactionRepository: ICryptoTransactionRepository,
    ) {}

    public execute = async ({userId, days}: IRequest): Promise<any> => {
        const account = await this.accountRepository.get({userId});

        if (!account?.id)
            throw new UnauthorizedError();

        const deposits = await this.transactionRepository.getAll({id: account.id, days});
        const investments = await this.cryptoTransactionRepository.listAllInvestments({accountId: account.id});
        const cryptoSales = await this.cryptoTransactionRepository.listAllCryptoSales({accountId: account.id});

        return {deposits, investments, cryptoSales};
    }
}