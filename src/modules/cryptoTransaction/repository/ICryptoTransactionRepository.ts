import { ICreateCryptoTransactionDTO } from "./ICreateCryptoTransactionDTO";
import CryptoTransactionModel from "../model/model";
import { IListCryptoTransactionDTO } from "./IListCryptoTransactionDTO";

export interface ICryptoTransactionRepository {
    create(cryptoTransactionData: ICreateCryptoTransactionDTO): Promise<CryptoTransactionModel>,
    list(listlistData: IListCryptoTransactionDTO): Promise<CryptoTransactionModel[]>,
    count(countData: IListCryptoTransactionDTO): Promise<number>,
}