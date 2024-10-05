import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../account/repository/IAccountRepository";
import { UnauthorizedError } from "../../error/model/model";
import CryptoTransactionModel from "../../cryptoTransaction/model/model";
import { ICryptoTransactionRepository } from "../../cryptoTransaction/repository/ICryptoTransactionRepository";

export interface IRequest {
    userId: number,
}

export interface IResponseGetVolume {
    bought: number,
    sold: number,
}

@injectable()
export class GetVolume {
    constructor(
        @inject("AccountRepository") private accountRepository: IAccountRepository,
        @inject("CryptoTransactionRepository") private cryptoTransactionRepository: ICryptoTransactionRepository,
    ) {}

    public execute = async ({userId}: IRequest): Promise<IResponseGetVolume> => {
        const account = await this.accountRepository.get({userId});

        if (!account?.id)
            throw new UnauthorizedError();

        const investments = await this.cryptoTransactionRepository.listAllInvestments({accountId: account.id});
        const cryptoSales = await this.cryptoTransactionRepository.listAllCryptoSales({accountId: account.id});

        return {
            bought: investments.reduce((sum: number, element: CryptoTransactionModel): number => {
                return sum + element.quantity
            }, 0),
            sold: cryptoSales.reduce((sum: number, element: CryptoTransactionModel): number => {
                return sum + element.quantity
            }, 0),
        };
    }
}