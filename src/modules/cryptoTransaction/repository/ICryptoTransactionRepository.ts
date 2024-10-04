import { ICreateCryptoTransactionDTO } from "./ICreateCryptoTransactionDTO";
import CryptoTransactionModel from "../model/model";

export interface ICryptoTransactionRepository {
    create(cryptoTransactionData: ICreateCryptoTransactionDTO): Promise<CryptoTransactionModel>,
}