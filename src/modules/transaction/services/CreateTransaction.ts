import { inject, injectable } from "tsyringe";
import { ITransactionRepository } from "../repository/ITransactionRepository";
import TransactionModel from "../model/model";

export interface IRequest {
    value: number,
    accountId: number,
    transactionType: number,
}

@injectable()
export class CreateTransaction {
    constructor(@inject("TransactionRepository") private transactionRepository: ITransactionRepository) {}

    public execute = async ({value, accountId, transactionType}: IRequest): Promise<TransactionModel> => {
        return this.transactionRepository.create({value, transactionType})
    }
}
