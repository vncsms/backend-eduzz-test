import { ICreateTransactionDTO } from "./ICreateTransactionDTO";
import TransactionModel from "../model/model";
import { IGetAllTransactionDTO } from "./IGetAllTransactionDTO";

export interface ITransactionRepository {
    create(transactionData: ICreateTransactionDTO): Promise<TransactionModel>,
    getAll(accountData: IGetAllTransactionDTO): Promise<TransactionModel[]>,
}