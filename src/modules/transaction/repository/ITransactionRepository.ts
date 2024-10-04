import { promises } from "dns";
import { ICreateTransactionDTO } from "./ICreateTransactionDTO";
import TransactionModel from "../model/model";

export interface ITransactionRepository {
    create(transactionData: ICreateTransactionDTO): Promise<TransactionModel>,
}